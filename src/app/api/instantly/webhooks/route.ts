import "server-only";

import {
  apiError,
  authorizeAndLimit,
  buildListQuery,
  callInstantly,
  getRequestIdHeader,
} from "@/lib/instantly";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const requestId = getRequestIdHeader(request);
  const blocked = authorizeAndLimit(request, requestId);
  if (blocked) return blocked;

  const query = buildListQuery(request, ["limit", "starting_after", "campaign", "event_type"]);
  if ("error" in query) return apiError(requestId, query.error, 400);
  return callInstantly({
    path: `/webhooks${query.query ? `?${query.query}` : ""}`,
    method: "GET",
    requestId,
  });
}
