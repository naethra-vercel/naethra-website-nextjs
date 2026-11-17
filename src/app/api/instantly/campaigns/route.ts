import "server-only";

import {
  apiError,
  authorizeAndLimit,
  buildListQuery,
  callInstantly,
  getRequestIdHeader,
  isValidCampaignPayload,
  readJsonBody,
} from "@/lib/instantly";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const requestId = getRequestIdHeader(request);
  const blocked = authorizeAndLimit(request, requestId);
  if (blocked) return blocked;

  const query = buildListQuery(request, ["limit", "starting_after"]);
  if ("error" in query) return apiError(requestId, query.error, 400);
  return callInstantly({
    path: `/campaigns${query.query ? `?${query.query}` : ""}`,
    method: "GET",
    requestId,
  });
}

export async function POST(request: Request) {
  const requestId = getRequestIdHeader(request);
  const blocked = authorizeAndLimit(request, requestId);
  if (blocked) return blocked;

  let body: unknown;
  try {
    body = await readJsonBody(request);
  } catch (error) {
    return apiError(
      requestId,
      error instanceof Error && error.message === "body_too_large"
        ? "Request body is too large."
        : "Invalid JSON body.",
      error instanceof Error && error.message === "body_too_large" ? 413 : 400,
    );
  }
  if (!isValidCampaignPayload(body)) {
    return apiError(requestId, "A campaign name between 1 and 200 characters is required.", 400);
  }
  return callInstantly({ path: "/campaigns", method: "POST", requestId, body });
}
