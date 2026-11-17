import "server-only";

import {
  acceptWebhookEvent,
  apiError,
  getRequestIdHeader,
  isRecord,
  readTextBody,
  validateWebhookEvent,
  verifyWebhookAuthorization,
} from "@/lib/instantly";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const requestId = getRequestIdHeader(request);
  if ((process.env["INSTANTLY_WEBHOOK_SECRET"]?.trim().length ?? 0) < 32) {
    return apiError(requestId, "Instantly webhook is not configured.", 503);
  }
  if (!verifyWebhookAuthorization(request)) {
    return apiError(requestId, "Unauthorized.", 401);
  }

  let rawBody: string;
  try {
    rawBody = await readTextBody(request, 256_000);
  } catch (error) {
    const tooLarge = error instanceof Error && error.message === "body_too_large";
    return apiError(
      requestId,
      tooLarge ? "Request body is too large." : "Invalid request body.",
      tooLarge ? 413 : 400,
    );
  }

  let payload: unknown;
  try {
    payload = JSON.parse(rawBody) as unknown;
  } catch {
    return apiError(requestId, "Invalid JSON body.", 400);
  }
  if (!isRecord(payload) || !validateWebhookEvent(payload)) {
    return apiError(requestId, "Invalid Instantly webhook event.", 400);
  }

  const accepted = acceptWebhookEvent(payload, rawBody);
  return Response.json(
    { accepted: true, duplicate: !accepted },
    {
      status: accepted ? 202 : 200,
      headers: { "Cache-Control": "no-store", "X-Request-Id": requestId },
    },
  );
}
