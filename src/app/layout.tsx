import type { Metadata } from "next";
import type { ReactNode } from "react";
// Self-hosted fonts (same families/weights as before). The previous
// next/font/google setup fetched from Google at build time and made
// `next build` fail outright wherever Google Fonts was unreachable.
import "@fontsource/cormorant-garamond/500.css";
import "@fontsource/cormorant-garamond/600.css";
import "@fontsource/manrope/400.css";
import "@fontsource/manrope/500.css";
import "@fontsource/manrope/600.css";
import "@fontsource/manrope/700.css";
import "./globals.css";
import { ScrollReveal } from "@/components/scroll-reveal";

const metadataBase = new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase,
  title: "FULL MOONs Family Restaurant | New Gajuwaka, Visakhapatnam",
  description:
    "Explore menu categories, contact details and directions for FULL MOONs Family Restaurant on Main Road, New Gajuwaka, Visakhapatnam.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "FULL MOONs Family Restaurant",
    description:
      "Family restaurant in New Gajuwaka, Visakhapatnam. Browse menu categories, contact details and directions.",
    type: "website",
    images: [
      {
        url: "/images/sections/hero-meal.jpg",
        width: 1408,
        height: 768,
        alt: "Chicken biryani served in a copper handi with raita and naan",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FULL MOONs Family Restaurant",
    description:
      "Family restaurant in New Gajuwaka, Visakhapatnam. Browse menu categories, contact details and directions.",
    images: ["/images/sections/hero-meal.jpg"],
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-[var(--color-bg-primary)] font-body text-[var(--color-text-light-primary)] antialiased">
        <noscript>
          <style>{".brand-intro { display: none !important; }"}</style>
        </noscript>
        <ScrollReveal />
        {children}
      </body>
    </html>
  );
}
