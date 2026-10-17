"use client";

import { useEffect } from "react";

/**
 * Progressive enhancement for scroll reveals. Content remains visible when
 * JavaScript is unavailable, and reduced-motion preferences are respected.
 */
export function ScrollReveal() {
  useEffect(() => {
    const targets = Array.from(document.querySelectorAll<HTMLElement>(".scroll-reveal"));
    if (!targets.length || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    if (!("IntersectionObserver" in window)) return;

    document.documentElement.classList.add("scroll-effects-ready");
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -48px 0px" },
    );

    targets.forEach((target) => observer.observe(target));
    return () => {
      observer.disconnect();
      document.documentElement.classList.remove("scroll-effects-ready");
    };
  }, []);

  return null;
}
