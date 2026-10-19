import type { NextConfig } from "next";
import { createRequire } from "module";
import path from "path";
import { fileURLToPath } from "url";

const require = createRequire(import.meta.url);
const projectRoot = path.dirname(fileURLToPath(import.meta.url));
const emptyPolyfill = path.join(projectRoot, "src/lib/empty-polyfill.js");

const nextPolyfillModule = require.resolve("next/dist/build/polyfills/polyfill-module");

const nextConfig: NextConfig = {
  reactStrictMode: true,
  outputFileTracingRoot: projectRoot,
  // Drop Next's always-on Baseline polyfill module (Lighthouse "Legacy JavaScript").
  // Safe for Chrome/Edge/Firefox 111+ and Safari 16.4+ (Next 16 default targets).
  turbopack: {
    resolveAlias: {
      "next/dist/build/polyfills/polyfill-module": emptyPolyfill,
      [nextPolyfillModule]: emptyPolyfill,
    },
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "next/dist/build/polyfills/polyfill-module": emptyPolyfill,
      [nextPolyfillModule]: emptyPolyfill,
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
