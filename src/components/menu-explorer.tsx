"use client";

import { useEffect, useMemo, useState, useSyncExternalStore } from "react";
import { buildWhatsAppHref, siteConfig } from "@/config/site";

type MenuItem = {
  name: string;
  description: string;
  diet: string;
};

type MenuCategory = {
  category: string;
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
  const [selectedOverride, setSelectedOverride] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [vegOnly, setVegOnly] = useState(false);

  // Deep link: /?category=Biryani#menu pre-selects that category until the
  // visitor picks a filter themselves. useSyncExternalStore (with an "All"
  // server snapshot) keeps the full menu in the server-rendered HTML —
  // no suspense fallback — and applies the deep link right after hydration.
  const paramCategory = useSyncExternalStore(
    () => () => {},
    () => new URLSearchParams(window.location.search).get("category") ?? "All",
    () => "All",
  );
  const selected =
    selectedOverride ??
    (categories.some((c) => c.category === paramCategory) ? paramCategory : "All");
  const setSelected = (category: string) => setSelectedOverride(category);

  // Featured cards dispatch this event so exploring never needs a reload.
  useEffect(() => {
    const handler = (event: Event) => {
      const category = (event as CustomEvent<string>).detail;
      if (categories.some((c) => c.category === category)) {
        setSelected(category);
        setQuery("");
        window.history.replaceState(null, "", `?category=${encodeURIComponent(category)}#menu`);
      }
    };
    window.addEventListener(MENU_CATEGORY_EVENT, handler);
    return () => window.removeEventListener(MENU_CATEGORY_EVENT, handler);
  }, [categories]);

  const selectCategory = (category: string) => {
    setSelected(category);
    const url = category === "All" ? "#menu" : `?category=${encodeURIComponent(category)}#menu`;
    window.history.replaceState(null, "", url);
  };

  const visibleCategories = useMemo(() => {
    const q = query.trim().toLowerCase();
    return categories
      .filter((c) => selected === "All" || c.category === selected)
      .map((c) => ({
        ...c,
        items: c.items.filter((item) => {
          if (vegOnly && item.diet !== "veg") return false;
          if (!q) return true;
          return (
            item.name.toLowerCase().includes(q) ||
            item.description.toLowerCase().includes(q) ||
            c.category.toLowerCase().includes(q)
          );
        }),
      }))
      .filter((c) => c.items.length > 0);
  }, [categories, selected, query, vegOnly]);

  const resultCount = visibleCategories.reduce((total, c) => total + c.items.length, 0);
  const hasFilters = selected !== "All" || query.trim() !== "" || vegOnly;

  const clearFilters = () => {
    setQuery("");
    setVegOnly(false);
    selectCategory("All");
  };

  return (
    <div>
      {/* Controls */}
      <div className="mb-6 flex flex-col gap-4">
        <div className="flex flex-wrap items-end gap-3">
          <div className="min-w-[220px] flex-1">
            <label htmlFor="menu-search" className="eyebrow text-[var(--color-text-dark-secondary)]">
              Search menu highlights
            </label>
            <input
              id="menu-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Try “biryani”, “paneer”, “noodles”…"
              className="mt-2 w-full border border-[var(--color-border-light)] bg-white/70 px-4 py-3 text-[var(--color-text-dark-primary)] placeholder:text-[var(--color-text-dark-secondary)] focus:border-[var(--color-accent-deep)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
            />
          </div>
          <label className="inline-flex cursor-pointer items-center gap-2 border border-[var(--color-border-light)] bg-white/70 px-4 py-3 text-sm font-semibold text-[var(--color-text-dark-primary)]">
            <input
              type="checkbox"
              checked={vegOnly}
              onChange={(e) => setVegOnly(e.target.checked)}
              className="h-4 w-4 accent-[#397653]"
            />
            Veg only
          </label>
          {hasFilters ? (
            <button
              type="button"
              onClick={clearFilters}
              className="btn btn-dark-outline !min-h-[46px]"
            >
              Clear filters
            </button>
          ) : null}
        </div>

        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter menu by category">
          {["All", ...categories.map((c) => c.category)].map((category) => (
            <button
              key={category}
              type="button"
              aria-pressed={selected === category}
              onClick={() => selectCategory(category)}
              className={`border px-4 py-2 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-deep)] ${
                selected === category
                  ? "border-[var(--color-text-dark-primary)] bg-[var(--color-text-dark-primary)] text-[var(--color-bg-cream)]"
                  : "border-[var(--color-border-light)] bg-white/50 text-[var(--color-text-dark-primary)] hover:border-[var(--color-accent-deep)]"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <p aria-live="polite" className="text-sm text-[var(--color-text-dark-secondary)]">
          {resultCount} highlight{resultCount === 1 ? "" : "s"} found
          {selected !== "All" ? ` in ${selected}` : ""}. Prices and today&apos;s availability are
          confirmed on call or WhatsApp — no prices are published online.
        </p>
      </div>

      {/* Category cards (click to filter) */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((item) => {
          const isActive = selected === item.category;
          return (
            <button
              key={item.category}
              type="button"
              aria-pressed={isActive}
              onClick={() => selectCategory(isActive ? "All" : item.category)}
              className={`border p-5 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-deep)] ${
                isActive
                  ? "border-[var(--color-accent-deep)] bg-[var(--color-accent)]/15 ring-1 ring-[var(--color-accent-deep)]"
                  : "border-[var(--color-border-light)] bg-white/50 hover:border-[var(--color-accent-deep)]"
              }`}
            >
              <h3 className="font-heading text-[clamp(1.35rem,1.8vw,1.6rem)] font-semibold text-[var(--color-text-dark-primary)]">
                {item.category}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-dark-secondary)]">{item.notes}</p>
              <span className="mt-3 inline-block text-xs font-bold uppercase tracking-wide text-[var(--color-accent-deep)]">
                {isActive ? "Showing below ✓ — tap to show all" : `${item.items.length} highlights — tap to view`}
              </span>
            </button>
          );
        })}
      </div>

      {/* Results */}
      {visibleCategories.length === 0 ? (
        <div className="mt-8 border border-[var(--color-border-light)] bg-white/60 p-6 text-center">
          <p className="font-heading text-2xl font-semibold text-[var(--color-text-dark-primary)]">
            No highlights match your search
          </p>
          <p className="mx-auto mt-2 max-w-[52ch] text-sm text-[var(--color-text-dark-secondary)]">
            Try a different word, or ask the restaurant directly — the full menu is available on call
            and WhatsApp.
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <button type="button" onClick={clearFilters} className="btn btn-dark-outline">
              Clear search &amp; filters
            </button>
            <a
              href={siteConfig.business.contact.phoneHref}
              className="btn btn-dark-outline"
            >
              Call {siteConfig.business.contact.phoneDisplay}
            </a>
          </div>
        </div>
      ) : (
        <div className="mt-8 space-y-8">
          {visibleCategories.map((category) => (
            <div key={category.category}>
              <h3 className="font-heading text-2xl font-semibold text-[var(--color-text-dark-primary)]">
                {category.category}
                <span className="ml-3 align-middle text-sm font-normal text-[var(--color-text-dark-secondary)]">
                  {category.notes}
                </span>
              </h3>
              <ul className="mt-4 grid gap-4 sm:grid-cols-2">
                {category.items.map((item) => (
                  <li
                    key={`${category.category}-${item.name}`}
                    className="border border-[var(--color-border-light)] bg-white/60 p-4"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <p className="font-semibold text-[var(--color-text-dark-primary)]">{item.name}</p>
                      <span
                        className={`shrink-0 border px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide ${
                          item.diet === "veg"
                            ? "border-[#397653] text-[#397653]"
                            : "border-[#b43d35] text-[#b43d35]"
                        }`}
                      >
                        {dietLabel[item.diet] ?? item.diet}
                      </span>
                    </div>
                    <p className="mt-1 text-sm leading-relaxed text-[var(--color-text-dark-secondary)]">
                      {item.description}
                    </p>
                    <a
                      href={buildWhatsAppHref(
                        `Hello FULL MOONs Family Restaurant, I would like to enquire about ${item.name} (${category.category}). Please share today's availability and price.`,
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-flex text-sm font-semibold text-[var(--color-accent-deep)] hover:underline"
                      aria-label={`Enquire about ${item.name} on WhatsApp`}
                    >
                      Enquire on WhatsApp →
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
