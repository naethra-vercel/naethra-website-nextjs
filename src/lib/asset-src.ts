import type { StaticImageData } from "next/image";

/** Normalize Next static imports and plain URLs for use in <img src> / CSS url(). */
export function assetSrc(value: string | StaticImageData): string {
  return typeof value === "string" ? value : value.src;
}
