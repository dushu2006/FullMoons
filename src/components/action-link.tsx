"use client";

import { useSyncExternalStore, type ReactNode } from "react";

/**
 * External action link (directions, tel:, WhatsApp, listings…).
 *
 * Standalone, http links open in a new tab as usual. But when the site is
 * embedded inside a preview frame, browsers silently block new-tab popups
 * and external-app hand-offs from framed pages, so taps appear to do
 * nothing. In that case we target the top-level page instead, which turns
 * the tap into a real redirect to Maps / the dialer / WhatsApp.
 */
export function ActionLink({
  href,
  className,
  ariaLabel,
  children,
}: {
  href: string;
  className?: string;
  ariaLabel?: string;
  children: ReactNode;
}) {
  const framed = useSyncExternalStore(
    () => () => {},
    () => {
      try {
        return window.self !== window.top;
      } catch {
        return true;
      }
    },
    () => false,
  );

  const opensNewTab = href.startsWith("http");
  const target = framed ? "_top" : opensNewTab ? "_blank" : undefined;

  return (
    <a
      href={href}
      target={target}
      rel={target === "_blank" ? "noopener noreferrer" : undefined}
      className={className}
      aria-label={ariaLabel}
      onClick={(event) => {
        if (!framed) return;
        // Belt and braces for frames that also restrict _top anchors:
        // navigate explicitly, falling back through every allowed route.
        event.preventDefault();
        try {
          (window.top ?? window).location.href = href;
          return;
        } catch {
          /* top navigation blocked — try the routes below */
        }
        const opened = window.open(href, "_blank", "noopener,noreferrer");
        if (!opened) window.location.href = href;
      }}
    >
      {children}
    </a>
  );
}
