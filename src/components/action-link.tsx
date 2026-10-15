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

  // No JS click handling on purpose: a native anchor with target="_top"
  // (inside frames) or "_blank" (standalone) is the most reliable way to
  // hand off to Maps / the dialer / WhatsApp — script-initiated popups and
  // location changes are blocked by embedded frames far more often.
  return (
    <a
      href={href}
      target={target}
      rel={target === "_blank" ? "noopener noreferrer" : undefined}
      className={className}
      aria-label={ariaLabel}
    >
      {children}
    </a>
  );
}
