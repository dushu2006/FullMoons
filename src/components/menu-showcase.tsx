"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";

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

type ShowcaseDish = {
  key: string;
  name: string;
  price?: number;
  category: string;
  image: string;
};

type Diet = "veg" | "non-veg";

function resolveDishImage(name: string, category: string, diet: Diet): string {
  const text = `${name} ${category}`.toLowerCase();

  // Assign the closest available food photograph based on the actual dish
  // name rather than repeating a single thumbnail for an entire category.
  if (/fish|prawn|seafood|sea food/.test(text)) return "/images/featured-seafood.jpg";
  if (/biryani|biriyani/.test(text)) return diet === "veg" ? "/images/gallery-rice.jpg" : "/images/hero-biryani.jpg";
  if (/noodle/.test(text)) return "/images/featured-noodles.jpg";
  if (/fried rice|jeera rice|curd rice|rice/.test(text)) return "/images/gallery-rice.jpg";
  if (/roti|naan|kulcha|chapathi|chapati|paratha|indian bread/.test(text)) return "/images/gallery-bread.jpg";
  if (/soup/.test(text)) return diet === "veg" ? "/images/featured-veg.jpg" : "/images/featured-starters.jpg";
  if (/curry|masala|dal |palak|korma|butter|puri/.test(text)) return "/images/gallery-curry.jpg";
  if (/paneer|panner|gobi|gobili|mushroom|baby.?corn|veg\b|vegetable|dal/.test(text)) return "/images/featured-veg.jpg";
  if (/tandoori|tikka|kabab|kebab|lollypop|lollipop|drumstick|wings|chicken|mutton|egg/.test(text)) return "/images/featured-starters.jpg";
  return diet === "veg" ? "/images/featured-veg.jpg" : "/images/featured-starters.jpg";
}

function DishCard({ dish }: { dish: ShowcaseDish }) {
  return (
    <article className="menu-dish-card">
      <div className="menu-dish-image">
        <Image
          src={dish.image}
          alt={`Illustrative food image for ${dish.name}`}
          fill
          sizes="(max-width: 640px) 178px, (max-width: 1024px) 22vw, 238px"
          className="object-cover"
        />
      </div>
      <div className="menu-dish-copy">
        <p className="menu-dish-name">{dish.name}</p>
        <p className="menu-dish-category">{dish.category}</p>
        <p className="menu-dish-price">{dish.price !== undefined ? `₹${dish.price}` : "Ask for price"}</p>
      </div>
    </article>
  );
}

function DietShowcaseRow({
  label,
  diet,
  categories,
  dishes,
}: {
  label: string;
  diet: Diet;
  categories: readonly MenuCategory[];
  dishes: readonly ShowcaseDish[];
}) {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [categoryMenuOpen, setCategoryMenuOpen] = useState(false);
  const pickerRef = useRef<HTMLDivElement>(null);

  const availableCategories = useMemo(
    () => categories.filter((category) =>
      category.items.some((item) => diet === "veg" ? item.diet === "veg" : item.diet !== "veg"),
    ),
    [categories, diet],
  );

  const visibleDishes = useMemo(
    () => dishes.filter((dish) => selectedCategory === "all" || dish.category === selectedCategory),
    [dishes, selectedCategory],
  );

  useEffect(() => {
    if (!categoryMenuOpen) return;
    const onPointerDown = (event: PointerEvent) => {
      if (event.target instanceof Node && !pickerRef.current?.contains(event.target)) {
        setCategoryMenuOpen(false);
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setCategoryMenuOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [categoryMenuOpen]);

  const duration = `${Math.max(44, dishes.length * 1.8)}s`;
  const trackStyle = { "--menu-marquee-duration": duration } as CSSProperties;
  const isStatic = selectedCategory !== "all";
  const selectedLabel = isStatic ? selectedCategory : `All ${label} items`;

  const selectCategory = (category: string) => {
    setSelectedCategory(category);
    setCategoryMenuOpen(false);
  };

  return (
    <section className={`menu-showcase-row scroll-reveal ${categoryMenuOpen ? "category-open" : ""}`} aria-label={`${label} menu`}>
      <div className="menu-showcase-heading">
        <div className="menu-showcase-title">
          <span className={`menu-diet-indicator ${diet === "veg" ? "is-veg" : "is-nonveg"}`} aria-hidden="true" />
          <div>
            <h3 className="font-heading text-2xl font-semibold text-[var(--color-text-light-primary)] sm:text-3xl">{label}</h3>
            <p className="mt-1 text-sm text-[var(--color-text-light-secondary)]">
              {isStatic ? `${visibleDishes.length} dishes · paused for browsing` : `${dishes.length} dishes · moving showcase`}
            </p>
          </div>
        </div>

        <div className="menu-category-picker" ref={pickerRef}>
          <span className="eyebrow text-[var(--color-accent)]">Browse {label.toLowerCase()}</span>
          <button
            type="button"
            className="menu-category-trigger"
            aria-haspopup="listbox"
            aria-expanded={categoryMenuOpen}
            onClick={() => setCategoryMenuOpen((open) => !open)}
          >
            <span className="menu-category-trigger-copy">
              <span className="menu-category-trigger-current">{selectedLabel}</span>
              <span className="menu-category-trigger-subtitle">
                {isStatic ? "Selected category · tap to change" : "Choose a category"}
              </span>
            </span>
            <svg aria-hidden="true" viewBox="0 0 20 20" className={`menu-category-chevron ${categoryMenuOpen ? "is-open" : ""}`}>
              <path d="m5 7.5 5 5 5-5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          {categoryMenuOpen && (
            <div className="menu-category-popover" role="listbox" aria-label={`${label} categories`}>
              <button
                type="button"
                role="option"
                aria-selected={selectedCategory === "all"}
                className={`menu-category-option ${selectedCategory === "all" ? "is-selected" : ""}`}
                onClick={() => selectCategory("all")}
              >
                <span className="menu-category-option-image">
                  <Image src={diet === "veg" ? "/images/featured-veg.jpg" : "/images/featured-starters.jpg"} alt="" fill sizes="56px" />
                </span>
                <span className="menu-category-option-copy">
                  <span className="menu-category-option-name">All {label} items</span>
                  <span className="menu-category-option-meta">{dishes.length} dishes · Resume slideshow</span>
                </span>
                {selectedCategory === "all" && <span className="menu-category-check" aria-hidden="true">✓</span>}
              </button>

              {availableCategories.map((category) => {
                const categoryDishes = dishes.filter((dish) => dish.category === category.category);
                return (
                  <button
                    type="button"
                    role="option"
                    aria-selected={selectedCategory === category.category}
                    key={category.category}
                    className={`menu-category-option ${selectedCategory === category.category ? "is-selected" : ""}`}
                    onClick={() => selectCategory(category.category)}
                  >
                    <span className="menu-category-option-image">
                      <Image src={resolveDishImage(category.category, category.category, diet)} alt="" fill sizes="56px" />
                    </span>
                    <span className="menu-category-option-copy">
                      <span className="menu-category-option-name">{category.category}</span>
                      <span className="menu-category-option-meta">{categoryDishes.length} {categoryDishes.length === 1 ? "dish" : "dishes"}</span>
                    </span>
                    {selectedCategory === category.category && <span className="menu-category-check" aria-hidden="true">✓</span>}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {isStatic ? (
        <div className="menu-static-grid" aria-live="polite">
          {visibleDishes.map((dish) => <DishCard key={dish.key} dish={dish} />)}
        </div>
      ) : (
        <div className="menu-marquee" aria-label={`Scrolling ${label.toLowerCase()} dishes. Hover or focus to pause.`}>
          <div className="menu-marquee-track" style={trackStyle}>
            <div className="menu-marquee-group">
              {dishes.map((dish) => <DishCard key={dish.key} dish={dish} />)}
            </div>
            <div className="menu-marquee-group menu-marquee-copy" aria-hidden="true">
              {dishes.map((dish) => <DishCard key={`copy-${dish.key}`} dish={dish} />)}
            </div>
          </div>
        </div>
      )}

      <p className="menu-showcase-status">
        {isStatic
          ? "Category selected · slideshow paused. Choose All items to resume."
          : "Auto-scrolling right to left · hover or focus to pause."}
      </p>
    </section>
  );
}

export function MenuShowcase({ categories }: { categories: readonly MenuCategory[] }) {
  const showcaseData = useMemo(() => {
    const flatten = (diet: Diet) => categories.flatMap((category) =>
      category.items
        .filter((item) => diet === "veg" ? item.diet === "veg" : item.diet !== "veg")
        .map((item, index) => ({
          key: `${category.category}-${item.name}-${index}`,
          name: item.name,
          price: item.price,
          category: category.category,
          image: resolveDishImage(item.name, category.category, diet),
        })),
    );
    return { veg: flatten("veg"), nonVeg: flatten("non-veg") };
  }, [categories]);

  return (
    <div className="menu-showcase">
      <DietShowcaseRow label="VEG" diet="veg" categories={categories} dishes={showcaseData.veg} />
      <DietShowcaseRow label="NON-VEG" diet="non-veg" categories={categories} dishes={showcaseData.nonVeg} />
      <p className="text-xs leading-relaxed text-[var(--color-muted)]">
        Prices are transcribed from the printed menu and may change. Please confirm current prices and availability before ordering. Food images are representative previews and may not exactly match the individual dish.
      </p>
    </div>
  );
}
