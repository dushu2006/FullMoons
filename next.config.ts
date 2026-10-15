import type { NextConfig } from "next";

// GitHub Pages serves this project from a subpath with no Node server, so
// its build opts into a fully static export. Normal dev/production
// hosting (next dev / next start) is completely unaffected.
const staticExport = process.env.STATIC_EXPORT === "1";

const nextConfig: NextConfig = {
  // Allow the dev server to serve its JS/HMR resources when the site is
  // opened through a proxied preview host (e.g. https://3000-<id>.e2b.app).
  // Without this, Next.js answers those requests with "403 Unauthorized",
  // the page never hydrates, and every interactive element (mobile menu,
  // menu explorer, gallery…) appears broken even though the HTML renders.
  allowedDevOrigins: ["*.e2b.app", "*.e2b.dev", "localhost", "127.0.0.1"],
  ...(staticExport
    ? {
        output: "export" as const,
        basePath: process.env.NEXT_PUBLIC_BASE_PATH || "/FullMoons",
        trailingSlash: true,
        images: { loader: "custom" as const, loaderFile: "./image-loader.ts" },
      }
    : {}),
};

export default nextConfig;
