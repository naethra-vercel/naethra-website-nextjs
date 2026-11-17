const DEFAULT_WORDPRESS_API = "https://data.naethra.com/wp-json/wp/v2";

function readEnv(name: string) {
  const value = process.env[name];
  return typeof value === "string" ? value.trim() : "";
}

/**
 * REST base from .env.
 * Prefer NEXT_PUBLIC_* so server and client share the same origin (avoids hydration
 * mismatches). VITE_* is server-only in Next and must not be the sole source.
 */
export const WORDPRESS_API_BASE = (
  readEnv("NEXT_PUBLIC_WORDPRESS_API_URL") ||
  // Server-only fallbacks — ignored in the browser bundle
  (typeof window === "undefined" ? readEnv("VITE_WORDPRESS_API_URL") : "") ||
  DEFAULT_WORDPRESS_API
).replace(/\/$/, "");

export const WORDPRESS_ORIGIN =
  WORDPRESS_API_BASE.replace(/\/wp-json\/wp\/v2\/?$/i, "") || "https://data.naethra.com";

// #region agent log
if (typeof window === "undefined") {
  fetch("http://127.0.0.1:7800/ingest/94ea0936-4433-4e8f-b586-7fcc797a61ea", {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-Debug-Session-Id": "f894e3" },
    body: JSON.stringify({
      sessionId: "f894e3",
      runId: "post-fix",
      hypothesisId: "H1",
      location: "src/lib/wordpress-config.ts:init",
      message: "WORDPRESS_ORIGIN resolved (server)",
      data: {
        side: "server",
        origin: WORDPRESS_ORIGIN,
        apiBase: WORDPRESS_API_BASE,
        hasNextPublic: Boolean(readEnv("NEXT_PUBLIC_WORDPRESS_API_URL")),
        hasVite: Boolean(readEnv("VITE_WORDPRESS_API_URL")),
      },
      timestamp: Date.now(),
    }),
  }).catch(() => {});
}
// #endregion

/**
 * Force every WordPress file / media URL onto the data host.
 * Covers plain URLs and Elementor-escaped forms (https:\/\/naethra.com\/wp-content\/...).
 * Public marketing page URLs on naethra.com are left unchanged.
 */
export function wordpressAssetUrl(value: string) {
  if (!value || !/naethra\.com/i.test(value)) return value;

  return value
    .replace(
      /https?:\\?\/\\?\/i\d\.wp\.com\\?\/(?:www\.)?naethra\.com(?=(?:\\?\/)wp-(?:content|includes)\b)/gi,
      WORDPRESS_ORIGIN,
    )
    .replace(
      /https?:\\?\/\\?\/(?:www\.)?naethra\.com(?=(?:\\?\/)wp-(?:content|includes)\b)/gi,
      WORDPRESS_ORIGIN,
    );
}
