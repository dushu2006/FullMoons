"use client";

import type { MouseEvent, ReactNode } from "react";
import { siteConfig } from "@/config/site";

/**
 * "Get Directions" link.
 *
 * A plain target="_blank" anchor silently does nothing when the site is
 * viewed inside an embedded preview frame, because those frames often
 * block popups. So when we're inside a frame we navigate explicitly:
 * try a new tab first, and if that is blocked, redirect the top page to
 * Google Maps. Viewed standalone, the normal new-tab behaviour applies.
 */
export function DirectionsLink({
  className,
  children,
  ariaLabel,
}: {
  className?: string;
  children: ReactNode;
  ariaLabel?: string;
}) {
  const url = siteConfig.links.directions;

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (window.self === window.top) return; // standalone: default new-tab behaviour

    event.preventDefault();
    const opened = window.open(url, "_blank", "noopener,noreferrer");
    if (!opened) {
      // Popup blocked by the embedding frame: redirect instead.
      (window.top ?? window).location.href = url;
    }
  };

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      aria-label={ariaLabel}
      onClick={handleClick}
    >
      {children}
    </a>
  );
}
