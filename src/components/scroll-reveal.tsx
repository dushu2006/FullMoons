"use client";

import { useEffect } from "react";

/**
 * Progressive enhancement for scroll reveals, including content mounted later
 * (for example, dishes inside an accordion opened after initial page load).
 */
export function ScrollReveal() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!("IntersectionObserver" in window)) return;

    const observed = new WeakSet<Element>();
    let observer: IntersectionObserver;

    const observeTargets = (root: ParentNode) => {
      root.querySelectorAll<HTMLElement>(".scroll-reveal").forEach((target) => {
        if (observed.has(target)) return;
        observed.add(target);
        observer.observe(target);
      });
    };

    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -24px 0px" },
    );

    document.documentElement.classList.add("scroll-effects-ready");
    observeTargets(document);

    // React renders accordion content after the first scan; observe it too.
    const mutations = new MutationObserver((records) => {
      for (const record of records) {
        record.addedNodes.forEach((node) => {
          if (node instanceof HTMLElement) {
            if (node.matches(".scroll-reveal")) {
              if (!observed.has(node)) {
                observed.add(node);
                observer.observe(node);
              }
            }
            observeTargets(node);
          }
        });
      }
    });
    mutations.observe(document.body, { childList: true, subtree: true });

    return () => {
      mutations.disconnect();
      observer.disconnect();
      document.documentElement.classList.remove("scroll-effects-ready");
    };
  }, []);

  return null;
}
