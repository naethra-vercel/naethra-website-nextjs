const DEFAULT_WP_API = "https://naethra.com/wp-json/wp/v2";

export function getWordpressApiUrl(): string {
  return import.meta.env.VITE_WORDPRESS_API_URL?.replace(/\/$/, "") || DEFAULT_WP_API;
}

export function getRecaptchaSiteKey(): string | undefined {
  const key = import.meta.env.VITE_RECAPTCHA_SITE_KEY?.trim();
  return key || undefined;
}
