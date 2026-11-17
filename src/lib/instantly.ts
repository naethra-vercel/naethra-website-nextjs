import { createHash, randomUUID, timingSafeEqual } from "node:crypto";

const INSTANTLY_API_BASE = "https://api.instantly.ai/api/v2";
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 60;
const WEBHOOK_DEDUPE_TTL_MS = 24 * 60 * 60 * 1_000;
const WEBHOOK_DEDUPE_MAX_ENTRIES = 5_000;

type RateLimitEntry = { count: number; resetAt: number };
type WebhookEvent = {
  timestamp: string;
  event_type: string;
  workspace: string;
  campaign_id: string;
  campaign_name: string;
  [key: string]: unknown;
};

const rateLimitEntries = new Map<string, RateLimitEntry>();
const processedWebhookEvents = new Map<string, number>();

function response(requestId: string, payload: unknown, status: number, headers?: HeadersInit) {
  const responseHeaders = new Headers(headers);
  responseHeaders.set("Cache-Control", "no-store");
  responseHeaders.set("X-Request-Id", requestId);
  return Response.json(payload, { status, headers: responseHeaders });
}

function getRequestId(request: Request) {
  const provided = request.headers.get("x-request-id");
  return provided && /^[a-zA-Z0-9._-]{1,64}$/.test(provided) ? provided : randomUUID();
}

function matchesSecret(candidate: string, expected: string) {
  const candidateHash = createHash("sha256").update(candidate).digest();
  const expectedHash = createHash("sha256").update(expected).digest();
  return timingSafeEqual(candidateHash, expectedHash);
}

export function authorizeAndLimit(
  request: Request,
  requestId = getRequestId(request),
): Response | null {
  const expected = process.env["INSTANTLY_ADMIN_TOKEN"]?.trim();
  if (!expected || expected.length < 32) {
    console.error(
      JSON.stringify({
        event: "instantly.config_error",
        reason: "admin_token_missing_or_weak",
        request_id: requestId,
      }),
    );
    return response(requestId, { error: "Instantly integration is not configured." }, 503);
  }

  const authorization = request.headers.get("authorization") ?? "";
  const match = /^Bearer\s+(.+)$/i.exec(authorization);
  if (!match || !matchesSecret(match[1] ?? "", expected)) {
    return response(requestId, { error: "Unauthorized." }, 401);
  }

  const now = Date.now();
  for (const [key, entry] of rateLimitEntries) {
    if (entry.resetAt <= now) rateLimitEntries.delete(key);
  }
  const entry = rateLimitEntries.get("instantly-management");
  if (entry && entry.resetAt > now && entry.count >= RATE_LIMIT_MAX) {
    return response(requestId, { error: "Rate limit exceeded." }, 429, {
      "Retry-After": String(Math.ceil((entry.resetAt - now) / 1_000)),
    });
  }
  if (!entry || entry.resetAt <= now) {
    rateLimitEntries.set("instantly-management", { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
  } else {
    entry.count += 1;
  }
  return null;
}

export function getRequestIdHeader(request: Request) {
  return getRequestId(request);
}

export async function readJsonBody(request: Request, maxBytes = 256_000): Promise<unknown> {
  const text = await readTextBody(request, maxBytes);
  try {
    return JSON.parse(text) as unknown;
  } catch {
    throw new Error("invalid_json");
  }
}

export async function readTextBody(request: Request, maxBytes = 256_000): Promise<string> {
  const contentLength = request.headers.get("content-length");
  if (contentLength && (!/^\d+$/.test(contentLength) || Number(contentLength) > maxBytes)) {
    throw new Error("body_too_large");
  }
  if (!request.body) throw new Error("invalid_json");
  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let total = 0;
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    total += value.byteLength;
    if (total > maxBytes) {
      await reader.cancel();
      throw new Error("body_too_large");
    }
    chunks.push(value);
  }
  const bytes = new Uint8Array(total);
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return new TextDecoder().decode(bytes);
}

export function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function apiError(requestId: string, error: string, status: number) {
  return response(requestId, { error }, status);
}

export function isValidLeadPayload(value: unknown): value is Record<string, unknown> {
  if (!isRecord(value)) return false;
  const email = value["email"];
  const campaign = value["campaign"];
  const listId = value["list_id"];
  const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  const hasCampaign = typeof campaign === "string" && uuidPattern.test(campaign);
  const hasList = typeof listId === "string" && uuidPattern.test(listId);
  if ((campaign !== undefined && !hasCampaign) || (listId !== undefined && !hasList)) return false;
  if (hasCampaign === hasList) return false;
  if (
    email !== undefined &&
    (typeof email !== "string" || email.length > 320 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
  ) {
    return false;
  }
  if (hasCampaign && typeof email !== "string") return false;
  if (hasList && !email && !value["first_name"] && !value["last_name"]) return false;
  for (const field of ["first_name", "last_name"] as const) {
    const fieldValue = value[field];
    if (fieldValue !== undefined && (typeof fieldValue !== "string" || fieldValue.length > 200)) {
      return false;
    }
  }
  return true;
}

export function isValidCampaignPayload(value: unknown): value is Record<string, unknown> {
  return (
    isRecord(value) &&
    typeof value["name"] === "string" &&
    value["name"].trim().length > 0 &&
    value["name"].length <= 200
  );
}

export function buildListQuery(
  request: Request,
  allowed: readonly string[],
): { query: string } | { error: string } {
  const source = new URL(request.url).searchParams;
  for (const key of source.keys()) {
    if (!allowed.includes(key)) return { error: `Unsupported query parameter: ${key}` };
    if (source.getAll(key).length !== 1) return { error: `Duplicate ${key} parameter.` };
  }
  const query = new URLSearchParams();
  for (const key of allowed) {
    const value = source.get(key);
    if (value === null) continue;
    if (value.length === 0 || value.length > 500) return { error: `Invalid ${key} parameter.` };
    if (key === "limit" && (!/^\d+$/.test(value) || Number(value) < 1 || Number(value) > 100)) {
      return { error: "Limit must be between 1 and 100." };
    }
    if (key === "status" && !["1", "2", "3", "-1", "-2", "-3"].includes(value)) {
      return { error: "Invalid account status." };
    }
    if (key === "provider_code" && !["1", "2", "3", "4", "8", "11"].includes(value)) {
      return { error: "Invalid account provider code." };
    }
    if (key === "include_tags" && !["true", "false"].includes(value)) {
      return { error: "include_tags must be true or false." };
    }
    if (
      key === "campaign" &&
      !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(value)
    ) {
      return { error: "Invalid campaign UUID." };
    }
    query.set(key, value);
  }
  return { query: query.toString() };
}

export async function callInstantly(params: {
  path: string;
  method: "GET" | "POST";
  requestId: string;
  body?: Record<string, unknown>;
  fetcher?: typeof fetch;
}): Promise<Response> {
  const apiKey = process.env["INSTANTLY_API_KEY"]?.trim();
  if (!apiKey) {
    console.error(
      JSON.stringify({
        event: "instantly.config_error",
        reason: "api_key_missing",
        request_id: params.requestId,
      }),
    );
    return response(params.requestId, { error: "Instantly integration is not configured." }, 503);
  }

  const startedAt = Date.now();
  try {
    const upstream = await (params.fetcher ?? fetch)(`${INSTANTLY_API_BASE}${params.path}`, {
      method: params.method,
      headers: {
        Authorization: `Bearer ${apiKey}`,
        Accept: "application/json",
        ...(params.body ? { "Content-Type": "application/json" } : {}),
      },
      ...(params.body ? { body: JSON.stringify(params.body) } : {}),
      signal: AbortSignal.timeout(10_000),
      cache: "no-store",
    });
    const durationMs = Date.now() - startedAt;
    console.info(
      JSON.stringify({
        event: "instantly.api_response",
        request_id: params.requestId,
        method: params.method,
        path: params.path.split("?")[0],
        status: upstream.status,
        duration_ms: durationMs,
      }),
    );
    if (!upstream.ok) {
      const status = upstream.status === 429 ? 429 : 502;
      return response(params.requestId, { error: "Instantly API request failed." }, status);
    }
    const text = await upstream.text();
    if (!text) {
      const headers = new Headers({
        "Cache-Control": "no-store",
        "X-Request-Id": params.requestId,
      });
      return new Response(null, { status: upstream.status, headers });
    }
    try {
      const payload: unknown = JSON.parse(text);
      if (!isRecord(payload) && !Array.isArray(payload)) throw new Error("invalid_upstream_json");
      return response(params.requestId, payload, upstream.status);
    } catch {
      console.error(
        JSON.stringify({
          event: "instantly.api_error",
          request_id: params.requestId,
          reason: "invalid_upstream_response",
          duration_ms: Date.now() - startedAt,
        }),
      );
      return response(
        params.requestId,
        { error: "Instantly API returned an invalid response." },
        502,
      );
    }
  } catch (error) {
    console.error(
      JSON.stringify({
        event: "instantly.api_error",
        request_id: params.requestId,
        reason:
          error instanceof Error && error.name === "TimeoutError" ? "timeout" : "network_error",
        duration_ms: Date.now() - startedAt,
      }),
    );
    return response(params.requestId, { error: "Unable to reach the Instantly API." }, 502);
  }
}

export function validateWebhookEvent(value: unknown): value is WebhookEvent {
  return (
    isRecord(value) &&
    typeof value["timestamp"] === "string" &&
    !Number.isNaN(Date.parse(value["timestamp"])) &&
    typeof value["event_type"] === "string" &&
    value["event_type"].length > 0 &&
    value["event_type"].length <= 100 &&
    typeof value["workspace"] === "string" &&
    typeof value["campaign_id"] === "string" &&
    typeof value["campaign_name"] === "string" &&
    (value["lead_email"] === undefined ||
      (typeof value["lead_email"] === "string" &&
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value["lead_email"])))
  );
}

export function acceptWebhookEvent(event: WebhookEvent, rawBody: string): boolean {
  const now = Date.now();
  for (const [key, expiresAt] of processedWebhookEvents) {
    if (expiresAt <= now) processedWebhookEvents.delete(key);
  }
  const digest = createHash("sha256").update(rawBody).digest("hex");
  if (processedWebhookEvents.has(digest)) return false;
  if (processedWebhookEvents.size >= WEBHOOK_DEDUPE_MAX_ENTRIES) {
    const oldestKey = processedWebhookEvents.keys().next().value;
    if (oldestKey) processedWebhookEvents.delete(oldestKey);
  }
  processedWebhookEvents.set(digest, now + WEBHOOK_DEDUPE_TTL_MS);
  console.info(
    JSON.stringify({
      event: "instantly.webhook_received",
      event_type: event.event_type,
      event_hash: digest,
      timestamp: event.timestamp,
    }),
  );
  return true;
}

export function verifyWebhookAuthorization(request: Request): boolean {
  const expected = process.env["INSTANTLY_WEBHOOK_SECRET"]?.trim();
  const authorization = request.headers.get("authorization") ?? "";
  const match = /^Bearer\s+(.+)$/i.exec(authorization);
  return Boolean(
    expected && expected.length >= 32 && match && matchesSecret(match[1] ?? "", expected),
  );
}
