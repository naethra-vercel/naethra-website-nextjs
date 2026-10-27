import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const LEGACY_REDIRECTS: Array<{ test: RegExp; to: string | ((m: RegExpMatchArray) => string) }> = [
  { test: /^\/about-us\/?$/, to: "/about" },
  { test: /^\/blog\/?$/, to: "/blogs" },
  { test: /^\/blog\/([^/]+)\/?$/, to: (m) => `/blogs/${m[1]}` },
  { test: /^\/works\/?$/, to: "/portfolio" },
  { test: /^\/port\/?$/, to: "/portfolio" },
  { test: /^\/filemaker\/?$/, to: "/services/claris-filemaker-application" },
  { test: /^\/claris-filemaker-application\/?$/, to: "/services/claris-filemaker-application" },
  { test: /^\/aws-cloud-support\/?$/, to: "/services/aws-cloud-support" },
  { test: /^\/dot-net-application\/?$/, to: "/services/dot-net-application" },
  { test: /^\/custom-web-publishing\/?$/, to: "/services/custom-web-publishing" },
  { test: /^\/java-j2ee-applications\/?$/, to: "/services/java-j2ee-applications" },
  { test: /^\/php-mysql-applications\/?$/, to: "/services/php-mysql-applications" },
  { test: /^\/category(?:\/.*)?$/, to: "/blogs" },
  { test: /^\/tag(?:\/.*)?$/, to: "/blogs" },
];

function matchLegacy(pathname: string) {
  for (const rule of LEGACY_REDIRECTS) {
    const m = pathname.match(rule.test);
    if (!m) continue;
    return typeof rule.to === "function" ? rule.to(m) : rule.to;
  }
  return null;
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const destination = matchLegacy(pathname);
  const hasTrailingSlash = pathname.length > 1 && pathname.endsWith("/");

  // #region agent log
  fetch("http://127.0.0.1:7800/ingest/94ea0936-4433-4e8f-b586-7fcc797a61ea", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Debug-Session-Id": "f894e3",
    },
    body: JSON.stringify({
      sessionId: "f894e3",
      runId: "pre-fix",
      hypothesisId: destination ? "A" : hasTrailingSlash ? "C" : "E",
      location: "src/middleware.ts:legacy-check",
      message: "Incoming path classified",
      data: {
        pathname,
        destination,
        hasTrailingSlash,
        matchedLegacy: Boolean(destination),
      },
      timestamp: Date.now(),
    }),
  }).catch(() => {});
  // #endregion

  if (destination) {
    const url = request.nextUrl.clone();
    url.pathname = destination;
    // #region agent log
    fetch("http://127.0.0.1:7800/ingest/94ea0936-4433-4e8f-b586-7fcc797a61ea", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Debug-Session-Id": "f894e3",
      },
      body: JSON.stringify({
        sessionId: "f894e3",
        runId: "pre-fix",
        hypothesisId: "B",
        location: "src/middleware.ts:redirect",
        message: "Applying legacy 308 redirect",
        data: { from: pathname, to: destination },
        timestamp: Date.now(),
      }),
    }).catch(() => {});
    // #endregion
    return NextResponse.redirect(url, 308);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js|map)$).*)",
  ],
};
