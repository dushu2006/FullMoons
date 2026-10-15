import type { ReactNode } from "react";
import { ActionLink } from "@/components/action-link";
import { siteConfig } from "@/config/site";

/**
 * "Get Directions" link — an ActionLink to the Google Maps directions URL
 * (see action-link.tsx for why framed previews need special handling).
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
  return (
    <ActionLink href={siteConfig.links.directions} className={className} ariaLabel={ariaLabel}>
      {children}
    </ActionLink>
  );
}
