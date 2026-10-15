import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow the dev server to serve its JS/HMR resources when the site is
  // opened through a proxied preview host (e.g. https://3000-<id>.e2b.app).
  // Without this, Next.js answers those requests with "403 Unauthorized",
  // the page never hydrates, and every interactive element (mobile menu,
  // menu explorer, gallery…) appears broken even though the HTML renders.
  allowedDevOrigins: ["*.e2b.app", "*.e2b.dev", "localhost", "127.0.0.1"],
};

export default nextConfig;
