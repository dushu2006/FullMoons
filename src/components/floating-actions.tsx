"use client";

import { useEffect, useState } from "react";
import { siteConfig } from "@/config/site";

export function FloatingActions() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed bottom-4 right-4 z-30 flex flex-col items-end gap-2">
      {showTop ? (
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Back to top"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--color-accent)] bg-[var(--color-bg-primary)] text-[var(--color-accent)] shadow-lg transition hover:bg-[var(--color-bg-secondary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]"
        >
          ↑
        </button>
      ) : null}
      <a
        href={siteConfig.business.contact.whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with FULL MOONs on WhatsApp"
        className="inline-flex items-center gap-2 rounded-full bg-[#397653] px-5 py-3 text-sm font-bold text-white shadow-lg transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
      >
        <span aria-hidden="true">💬</span> WhatsApp us
      </a>
    </div>
  );
}
