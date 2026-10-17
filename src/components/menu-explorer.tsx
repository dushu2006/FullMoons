"use client";

import Image from "next/image";
import { useEffect, useMemo, useState, useSyncExternalStore } from "react";
import { ActionLink } from "@/components/action-link";
import { buildWhatsAppHref, siteConfig } from "@/config/site";

type MenuItem = {
  name: string;
  description: string;
  diet: string;
  price?: number;
};

type MenuCategory = {
  category: string;
  image: string;
  notes: string;
  items: readonly MenuItem[];
};

export const MENU_CATEGORY_EVENT = "fullmoons:select-menu-category";

const dietLabel: Record<string, string> = {
  veg: "Veg",
  "non-veg": "Non-veg",
  egg: "Egg",
};

export function MenuExplorer({ categories }: { categories: readonly MenuCategory[] }) {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [vegOnly, setVegOnly] = useState(false);

  const paramCategory = useSyncExternalStore(
    () => () => {},
    () => new URLSearchParams(window.location.search).get("category") ?? "",
    () => "",
  );

  useEffect(() => {
    if (categories.some((category) => category.category === paramCategory)) {
      setExpandedCategory(paramCategory);
    }
  }, [categories, paramCategory]);

  useEffect(() => {
    const handler = (event: Event) => {
      const category = (event as CustomEvent<string>).detail;
      if (!categories.some((item) => item.category === category)) return;
      setExpandedCategory((current) => current === category ? null : category);
      setQuery("");
      window.history.replaceState(null, "", `?category=${encodeURIComponent(category)}#menu`);
    };
    window.addEventListener(MENU_CATEGORY_EVENT, handler);
    return () => window.removeEventListener(MENU_CATEGORY_EVENT, handler);
  }, [categories]);

  const visibleCategories = useMemo(() => {
    const q = query.trim().toLowerCase();
    return categories
      .map((category) => ({
        ...category,
        items: category.items.filter((item) => {
          if (vegOnly && item.diet !== "veg") return false;
          if (!q) return true;
          return item.name.toLowerCase().includes(q) ||
            item.description.toLowerCase().includes(q) ||
            category.category.toLowerCase().includes(q);
        }),
      }))
      .filter((category) => category.items.length > 0);
  }, [categories, query, vegOnly]);

  useEffect(() => {
    if (query.trim() && visibleCategories.length === 1) {
      setExpandedCategory(visibleCategories[0].category);
    }
  }, [query, visibleCategories]);

  const clearFilters = () => {
    setQuery("");
    setVegOnly(false);
    setExpandedCategory(null);
    window.history.replaceState(null, "", "#menu");
  };

  return (
    <div>
      <div className="mb-6 border border-[var(--color-border-dark)] bg-[var(--color-bg-secondary)]/80 p-4 sm:p-5">
        <div className="flex flex-wrap items-end gap-3">
          <div className="min-w-[220px] flex-1">
            <label htmlFor="menu-search" className="eyebrow text-[var(--color-accent)]">
              Search dishes
            </label>
            <div className="relative mt-2">
              <span aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-muted)]">🔍</span>
              <input
                id="menu-search"
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Try biryani, paneer, noodles…"
                className="w-full border border-[var(--color-border-dark)] bg-[var(--color-bg-primary)] py-3 pl-10 pr-4 text-[var(--color-text-light-primary)] placeholder:text-[var(--color-muted)] focus:border-[var(--color-accent)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
              />
            </div>
          </div>
          <button
            type="button"
            role="switch"
            aria-checked={vegOnly}
            aria-label="Veg only"
            onClick={() => setVegOnly((value) => !value)}
            className={`inline-flex min-h-[46px] items-center gap-2 rounded-full border px-4 text-sm font-semibold transition ${vegOnly ? "border-[#4caf7d] bg-[#397653]/30 text-white" : "border-[var(--color-border-dark)] bg-[var(--color-bg-primary)] text-[var(--color-text-light-secondary)]"}`}
          >
            <span aria-hidden="true" className="flex h-5 w-5 items-center justify-center rounded-[4px] border-2 border-[#4caf7d] bg-[var(--color-bg-primary)]">
              <span className="h-2 w-2 rounded-full bg-[#4caf7d]" />
            </span>
            Veg only {vegOnly ? "✓" : ""}
          </button>
          {(query || vegOnly || expandedCategory) && (
            <button type="button" onClick={clearFilters} className="btn btn-secondary !min-h-[46px]">Reset</button>
          )}
        </div>
        <p aria-live="polite" className="mt-3 text-sm text-[var(--color-text-light-secondary)]">
          {visibleCategories.reduce((total, category) => total + category.items.length, 0)} dishes across {visibleCategories.length} sections · Prices from the printed menu
        </p>
      </div>

      <div className="space-y-3">
        {visibleCategories.map((category) => {
          const isExpanded = expandedCategory === category.category;
          return (
            <section key={category.category} className="overflow-hidden border border-[var(--color-border-dark)] bg-[var(--color-bg-secondary)]">
              <button
                type="button"
                aria-expanded={isExpanded}
                aria-controls={`menu-section-${category.category.replace(/[^a-z0-9]+/gi, "-").toLowerCase()}`}
                onClick={() => {
                  const next = isExpanded ? null : category.category;
                  setExpandedCategory(next);
                  window.history.replaceState(null, "", next ? `?category=${encodeURIComponent(next)}#menu` : "#menu");
                }}
                className="group flex w-full items-center gap-4 p-3 text-left transition hover:bg-[var(--color-bg-primary)] sm:p-4"
              >
                <span className="relative h-16 w-20 shrink-0 overflow-hidden sm:h-20 sm:w-28">
                  <Image src={category.image} alt="" fill sizes="112px" className="object-cover transition duration-300 group-hover:scale-105" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-heading text-xl font-semibold text-[var(--color-text-light-primary)] sm:text-2xl">{category.category}</span>
                  <span className="mt-1 block text-sm text-[var(--color-text-light-secondary)]">{category.notes}</span>
                  <span className="mt-1 block text-xs font-semibold uppercase tracking-wide text-[var(--color-accent)]">{category.items.length} dishes</span>
                </span>
                <span aria-hidden="true" className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[var(--color-border-dark)] text-xl text-[var(--color-accent)] transition-transform ${isExpanded ? "rotate-180" : ""}`}>⌄</span>
              </button>

              <div
                id={`menu-section-${category.category.replace(/[^a-z0-9]+/gi, "-").toLowerCase()}`}
                aria-hidden={!isExpanded}
                className={`grid transition-[grid-template-rows] duration-300 ease-in-out motion-reduce:transition-none ${isExpanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
              >
                <div className="min-h-0 overflow-hidden">
                  <div className="border-t border-[var(--color-border-dark)] p-3 sm:p-5">
                  <ul className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                    {category.items.map((item) => (
                      <li key={`${category.category}-${item.name}`} className="border border-[var(--color-border-dark)] bg-[var(--color-bg-primary)] p-4">
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <p className="font-heading text-lg font-semibold leading-snug text-[var(--color-text-light-primary)]">{item.name}</p>
                            {item.price !== undefined && <p className="mt-1 text-lg font-bold text-[var(--color-accent)]">₹{item.price}</p>}
                          </div>
                          <span className={`shrink-0 rounded-full border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${item.diet === "veg" ? "border-[#4caf7d]/60 bg-[#397653]/20 text-[#8fd0a8]" : "border-[#e0655c]/50 bg-[#b43d35]/15 text-[#f0a49e]"}`}>
                            {dietLabel[item.diet] ?? item.diet}
                          </span>
                        </div>
                        <ActionLink
                          href={buildWhatsAppHref(`Hello FULL MOONs Family Restaurant, I would like to enquire about ${item.name} (${category.category}). Please confirm availability.`)}
                          className="mt-3 inline-flex text-sm font-semibold text-[var(--color-accent)] hover:underline"
                          ariaLabel={`Enquire about ${item.name} on WhatsApp`}
                        >
                          Enquire on WhatsApp →
                        </ActionLink>
                      </li>
                    ))}
                  </ul>
                  </div>
                </div>
              </div>
            </section>
          );
        })}
        {visibleCategories.length === 0 && (
          <div className="border border-[var(--color-border-dark)] bg-[var(--color-bg-secondary)] p-8 text-center">
            <p className="font-heading text-2xl font-semibold text-[var(--color-text-light-primary)]">No dishes found</p>
            <p className="mt-2 text-sm text-[var(--color-text-light-secondary)]">Try another search or turn off the Veg only filter.</p>
            <button type="button" onClick={clearFilters} className="btn btn-primary mt-4">Reset filters</button>
          </div>
        )}
      </div>
    </div>
  );
}
