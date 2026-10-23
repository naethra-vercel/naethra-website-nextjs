import "server-only";

import {
  apiError,
  authorizeAndLimit,
  callInstantly,
  getRequestIdHeader,
  isValidLeadPayload,
  readJsonBody,
} from "@/lib/instantly";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const requestId = getRequestIdHeader(request);
  const blocked = authorizeAndLimit(request, requestId);
  if (blocked) return blocked;

  let body: unknown;
  try {
    body = await readJsonBody(request);
  } catch (error) {
    const tooLarge = error instanceof Error && error.message === "body_too_large";
    return apiError(
      requestId,
      tooLarge ? "Request body is too large." : "Invalid JSON body.",
      tooLarge ? 413 : 400,
    );
  }
  if (!isValidLeadPayload(body)) {
    return apiError(
      requestId,
      "Provide either a campaign UUID and email, or a list UUID and at least an email, first name, or last name.",
      400,
    );
  }
  return callInstantly({ path: "/leads", method: "POST", requestId, body });
}
