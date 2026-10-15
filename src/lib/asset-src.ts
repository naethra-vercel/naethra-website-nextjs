/** Normalize Vite image imports and plain URLs for use in <img src> / CSS url(). */
export function assetSrc(value: string | { src: string }): string {
  return typeof value === "string" ? value : value.src;
}
