import "server-only";

import {
  authorizeAndLimit,
  apiError,
  buildListQuery,
  callInstantly,
  getRequestIdHeader,
} from "@/lib/instantly";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const requestId = getRequestIdHeader(request);
  const blocked = authorizeAndLimit(request, requestId);
  if (blocked) return blocked;

  const query = buildListQuery(request, [
    "limit",
    "starting_after",
    "search",
    "status",
    "provider_code",
    "tag_ids",
    "tag_ids_all",
    "include_tags",
  ]);
  if ("error" in query) return apiError(requestId, query.error, 400);
  return callInstantly({
    path: `/accounts${query.query ? `?${query.query}` : ""}`,
    method: "GET",
    requestId,
  });
}
