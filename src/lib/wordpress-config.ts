const DEFAULT_WORDPRESS_API = "https://data.naethra.com/wp-json/wp/v2";

function readEnv(name: string) {
  const value = process.env[name];
  return typeof value === "string" ? value.trim() : "";
}

/** REST base from .env. Next inlines NEXT_PUBLIC_*; VITE_* is accepted as a fallback. */
export const WORDPRESS_API_BASE = (
  readEnv("NEXT_PUBLIC_WORDPRESS_API_URL") ||
  readEnv("VITE_WORDPRESS_API_URL") ||
  DEFAULT_WORDPRESS_API
).replace(/\/$/, "");

export const WORDPRESS_ORIGIN =
  WORDPRESS_API_BASE.replace(/\/wp-json\/wp\/v2\/?$/i, "") || "https://data.naethra.com";

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
