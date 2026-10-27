import type { NextConfig } from "next";
import path from "path";
import { fileURLToPath } from "url";

const projectRoot = path.dirname(fileURLToPath(import.meta.url));
const emptyPolyfill = path.join(projectRoot, "src/lib/empty-polyfill.js");

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // No trailing slash (Next default). WordPress /page/ → /page via 308, which
  // consolidates SEO onto one URL. Do not set trailingSlash: true — Vercel/host
  // already strips slashes and that would fight a redirect loop.
  trailingSlash: false,
  // Legacy WP redirects temporarily handled in src/middleware.ts for debug logging.
  // Restored to next.config after verification.
  async redirects() {
    return [];
  },
  outputFileTracingRoot: projectRoot,
  // Drop Next's always-on Baseline polyfill module (Lighthouse "Legacy JavaScript").
  // Safe for Chrome/Edge/Firefox 111+ and Safari 16.4+ (Next 16 default targets).
  // Turbopack resolves the relative key from next/dist/client; keep both aliases.
  turbopack: {
    resolveAlias: {
      "../build/polyfills/polyfill-module": "./src/lib/empty-polyfill.js",
      "next/dist/build/polyfills/polyfill-module": "./src/lib/empty-polyfill.js",
    },
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "../build/polyfills/polyfill-module": false,
      "next/dist/build/polyfills/polyfill-module": emptyPolyfill,
    };
    return config;
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "naethra.com" },
      { protocol: "https", hostname: "data.naethra.com" },
      { protocol: "https", hostname: "**.naethra.com" },
      { protocol: "https", hostname: "d8j0ntlcm91z4.cloudfront.net" },
      { protocol: "https", hostname: "**.cloudfront.net" },
      { protocol: "https", hostname: "**.wp.com" },
      { protocol: "https", hostname: "**.wordpress.com" },
      { protocol: "https", hostname: "i0.wp.com" },
      { protocol: "https", hostname: "i1.wp.com" },
      { protocol: "https", hostname: "i2.wp.com" },
      { protocol: "https", hostname: "secure.gravatar.com" },
    ],
  },
};

export default nextConfig;
