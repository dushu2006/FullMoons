"use client";

import Image from "next/image";
import { useEffect, useMemo, useState, useSyncExternalStore } from "react";
import { buildWhatsAppHref, siteConfig } from "@/config/site";

type MenuItem = {
  name: string;
  description: string;
  diet: string;
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
      <div className="mb-8 border border-[var(--color-border-dark)] bg-[var(--color-bg-secondary)]/80 p-4 shadow-[0_18px_50px_rgba(0,0,0,0.35)] sm:p-5">
        <div className="flex flex-wrap items-end gap-3">
          <div className="min-w-[220px] flex-1">
            <label htmlFor="menu-search" className="eyebrow text-[var(--color-accent)]">
              Search menu highlights
            </label>
            <div className="relative mt-2">
              <span aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-muted)]">
                🔍
              </span>
              <input
                id="menu-search"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Try “biryani”, “paneer”, “noodles”…"
                className="w-full border border-[var(--color-border-dark)] bg-[var(--color-bg-primary)] py-3 pl-10 pr-4 text-[var(--color-text-light-primary)] placeholder:text-[var(--color-muted)] focus:border-[var(--color-accent)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
              />
            </div>
          </div>
          <label className="inline-flex cursor-pointer items-center gap-2 border border-[var(--color-border-dark)] bg-[var(--color-bg-primary)] px-4 py-3 text-sm font-semibold text-[var(--color-text-light-primary)] transition hover:border-[var(--color-accent)]">
            <input
              type="checkbox"
              checked={vegOnly}
              onChange={(e) => setVegOnly(e.target.checked)}
              className="h-4 w-4 accent-[#397653]"
            />
            <span aria-hidden="true" className="inline-block h-2.5 w-2.5 rounded-[2px] border-2 border-[#4caf7d]" />
            Veg only
          </label>
          {hasFilters ? (
            <button
              type="button"
              onClick={clearFilters}
              className="btn btn-secondary !min-h-[46px]"
            >
              Clear filters
            </button>
          ) : null}
        </div>

        <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Filter menu by category">
          {["All", ...categories.map((c) => c.category)].map((category) => (
            <button
              key={category}
              type="button"
              aria-pressed={selected === category}
              onClick={() => selectCategory(category)}
              className={`rounded-full border px-4 py-2 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] ${
                selected === category
                  ? "border-[var(--color-accent)] bg-[var(--color-accent)] text-[var(--color-bg-primary)] shadow-[0_6px_20px_rgba(215,180,119,0.35)]"
                  : "border-[var(--color-border-dark)] bg-[var(--color-bg-primary)] text-[var(--color-text-light-secondary)] hover:border-[var(--color-accent)] hover:text-[var(--color-text-light-primary)]"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <p aria-live="polite" className="mt-4 text-sm text-[var(--color-text-light-secondary)]">
          <span className="font-heading text-xl font-semibold text-[var(--color-accent)]">{resultCount}</span>{" "}
          highlight{resultCount === 1 ? "" : "s"} found
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
              className={`group overflow-hidden border text-left shadow-[0_12px_36px_rgba(0,0,0,0.3)] transition duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] ${
                isActive
                  ? "border-[var(--color-accent)] ring-2 ring-[var(--color-accent)]"
                  : "border-[var(--color-border-dark)] hover:-translate-y-1 hover:border-[var(--color-accent)]/70"
              }`}
            >
              <span className="relative block h-28 overflow-hidden">
                <Image
                  src={item.image}
                  alt=""
                  width={600}
                  height={300}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  loading="lazy"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
                <span className="absolute bottom-2 right-2 bg-black/65 px-2 py-1 text-[11px] font-bold uppercase tracking-wide text-[var(--color-accent)]">
                  {item.items.length} highlights
                </span>
                {isActive ? (
                  <span className="absolute left-2 top-2 bg-[var(--color-accent)] px-2 py-1 text-[11px] font-bold uppercase tracking-wide text-[var(--color-bg-primary)]">
                    ✓ Showing
                  </span>
                ) : null}
              </span>
              <span className="block bg-[var(--color-bg-secondary)] p-4">
                <span className="font-heading text-[clamp(1.35rem,1.8vw,1.55rem)] font-semibold leading-tight text-[var(--color-text-light-primary)]">
                  {item.category}
                </span>
                <span className="mt-1.5 block text-sm leading-relaxed text-[var(--color-text-light-secondary)]">{item.notes}</span>
                <span className="mt-3 block text-xs font-bold uppercase tracking-wide text-[var(--color-accent)]">
                  {isActive ? "Tap to show all →" : "Tap to view →"}
                </span>
              </span>
            </button>
          );
        })}
      </div>

      {/* Results */}
      {visibleCategories.length === 0 ? (
        <div className="mt-10 border border-[var(--color-border-dark)] bg-[var(--color-bg-secondary)] p-8 text-center">
          <p className="text-3xl" aria-hidden="true">🍽️</p>
          <p className="mt-2 font-heading text-2xl font-semibold text-[var(--color-text-light-primary)]">
            No highlights match your search
          </p>
          <p className="mx-auto mt-2 max-w-[52ch] text-sm text-[var(--color-text-light-secondary)]">
            Try a different word, or ask the restaurant directly — the full menu is available on call
            and WhatsApp.
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <button type="button" onClick={clearFilters} className="btn btn-primary">
              Clear search &amp; filters
            </button>
            <a href={siteConfig.business.contact.phoneHref} className="btn btn-secondary">
              Call {siteConfig.business.contact.phoneDisplay}
            </a>
          </div>
        </div>
      ) : (
        <div className="mt-10 space-y-10">
          {visibleCategories.map((category) => (
            <div key={category.category}>
              <div className="relative h-36 overflow-hidden border border-[var(--color-border-dark)] sm:h-44">
                <Image
                  src={category.image}
                  alt={`Illustrative image for ${category.category}`}
                  fill
                  className="object-cover"
                  loading="lazy"
                  sizes="100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/45 to-black/10" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <p className="eyebrow text-[var(--color-accent)]">{category.items.length} highlights</p>
                  <h3 className="mt-1 font-heading text-3xl font-semibold text-white sm:text-4xl">
                    {category.category}
                  </h3>
                  <p className="text-sm text-white/80">{category.notes}</p>
                </div>
              </div>
              <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {category.items.map((item) => (
                  <li
                    key={`${category.category}-${item.name}`}
                    className="group border border-[var(--color-border-dark)] bg-[var(--color-bg-secondary)] p-5 transition duration-300 hover:-translate-y-1 hover:border-[var(--color-accent)] hover:shadow-[0_16px_40px_rgba(0,0,0,0.4)]"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <p className="font-heading text-xl font-semibold leading-snug text-[var(--color-text-light-primary)]">{item.name}</p>
                      <span
                        className={`mt-0.5 shrink-0 rounded-full border px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide ${
                          item.diet === "veg"
                            ? "border-[#4caf7d]/60 bg-[#397653]/20 text-[#8fd0a8]"
                            : "border-[#e0655c]/50 bg-[#b43d35]/15 text-[#f0a49e]"
                        }`}
                      >
                        {dietLabel[item.diet] ?? item.diet}
                      </span>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-light-secondary)]">
                      {item.description}
                    </p>
                    <a
                      href={buildWhatsAppHref(
                        `Hello FULL MOONs Family Restaurant, I would like to enquire about ${item.name} (${category.category}). Please share today's availability and price.`,
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex text-sm font-semibold text-[var(--color-accent)] transition group-hover:gap-2 hover:text-[var(--color-accent-deep)] hover:underline"
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
