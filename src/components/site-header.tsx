"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { siteConfig } from "@/config/site";

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const [activeId, setActiveId] = useState("home");

  const navItems = useMemo(() => siteConfig.navigation, []);

  useEffect(() => {
    const sections = navItems
      .map((item) => document.querySelector(item.href))
      .filter(Boolean) as Element[];

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      {
        rootMargin: "-40% 0px -50% 0px",
        threshold: [0.2, 0.6],
      },
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
      observer.disconnect();
    };
  }, [navItems]);

  useEffect(() => {
    if (!menuOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    // If the viewport grows to desktop while the menu is open, close it —
    // otherwise the scroll lock above would freeze the page.
    const desktopQuery = window.matchMedia("(min-width: 768px)");
    const handleResize = () => {
      if (desktopQuery.matches) setMenuOpen(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    desktopQuery.addEventListener("change", handleResize);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      desktopQuery.removeEventListener("change", handleResize);
    };
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--color-border-dark)] bg-[var(--color-bg-primary)]/95 backdrop-blur">
      <div className="mx-auto flex h-[76px] w-full max-w-[1280px] items-center justify-between px-5 sm:px-6 md:px-8 lg:px-12">
        <Link
          href="#home"
          className="font-heading text-2xl font-semibold tracking-wide text-[var(--color-text-light-primary)]"
          aria-label="Go to home"
          onClick={() => setMenuOpen(false)}
        >
          FULL MOONs
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {navItems.map((item) => {
            const targetId = item.href.replace("#", "");
            const isActive = activeId === targetId;

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? "true" : undefined}
                className={`text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg-primary)] ${
                  isActive
                    ? "text-[var(--color-accent)]"
                    : "text-[var(--color-text-light-secondary)] hover:text-[var(--color-text-light-primary)]"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:block">
          <Link href={siteConfig.links.primaryCta} className="btn btn-primary">
            Explore Menu
          </Link>
        </div>

        <button
          ref={menuButtonRef}
          type="button"
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen((prev) => !prev)}
          className="inline-flex h-11 w-11 items-center justify-center border border-[var(--color-border-dark)] text-[var(--color-text-light-primary)] transition hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] md:hidden"
        >
          <span className="sr-only">Toggle navigation</span>
          {/* Three-bar icon built from spans so it always renders crisply
              (the old ☰ text glyph depended on fallback fonts). */}
          <span aria-hidden="true" className="flex w-5 flex-col items-stretch gap-[5px]">
            <span
              className={`block h-[2px] bg-current transition-transform duration-200 ${menuOpen ? "translate-y-[7px] rotate-45" : ""}`}
            />
            <span className={`block h-[2px] bg-current transition-opacity duration-200 ${menuOpen ? "opacity-0" : ""}`} />
            <span
              className={`block h-[2px] bg-current transition-transform duration-200 ${menuOpen ? "-translate-y-[7px] -rotate-45" : ""}`}
            />
          </span>
        </button>
      </div>

      <div id="mobile-nav" className={`md:hidden ${menuOpen ? "block" : "hidden"}`}>
        <div className="border-t border-[var(--color-border-dark)] bg-[var(--color-bg-primary)] px-5 pb-6 pt-4 sm:px-6">
          <nav className="flex flex-col gap-3" aria-label="Mobile Primary">
            {navItems.map((item) => {
              const isActive = activeId === item.href.replace("#", "");
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive ? "true" : undefined}
                  className={`rounded-sm px-1 py-2 text-base transition hover:text-[var(--color-accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] ${
                    isActive ? "text-[var(--color-accent)]" : "text-[var(--color-text-light-primary)]"
                  }`}
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </Link>
              );
            })}
            <Link href={siteConfig.links.primaryCta} className="btn btn-primary mt-2 w-full" onClick={() => setMenuOpen(false)}>
              Explore Menu
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
