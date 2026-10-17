"use client";

import Image from "next/image";
import { useMemo, useState, type CSSProperties } from "react";

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

function DishCard({ dish }: { dish: ShowcaseDish }) {
  return (
    <article className="menu-dish-card">
      <div className="menu-dish-image">
        <Image src={dish.image} alt="" fill sizes="(max-width: 640px) 178px, (max-width: 1024px) 22vw, 238px" className="object-cover" />
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
  const duration = `${Math.max(44, dishes.length * 1.8)}s`;
  const trackStyle = { "--menu-marquee-duration": duration } as CSSProperties;
  const isStatic = selectedCategory !== "all";

  return (
    <section className="menu-showcase-row scroll-reveal" aria-label={`${label} menu`}>
      <div className="menu-showcase-heading">
        <div>
          <h3 className="font-heading text-2xl font-semibold text-[var(--color-text-light-primary)] sm:text-3xl">{label}</h3>
          <p className="mt-1 text-sm text-[var(--color-text-light-secondary)]">
            {isStatic ? `${visibleDishes.length} items in ${selectedCategory}` : `${dishes.length} dishes · moving showcase`}
          </p>
        </div>
        <label className="flex w-full flex-col gap-1.5 sm:w-auto">
          <span className="eyebrow text-[var(--color-accent)]">Choose a category</span>
          <select
            className="menu-showcase-select"
            aria-label={`Choose a ${label.toLowerCase()} menu category`}
            value={selectedCategory}
            onChange={(event) => setSelectedCategory(event.target.value)}
          >
            <option value="all">All {label} items · Auto-scroll</option>
            {availableCategories.map((category) => (
              <option key={category.category} value={category.category}>{category.category}</option>
            ))}
          </select>
        </label>
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
          : "Auto-scrolling from right to left · hover or focus this row to pause."}
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
          image: category.image,
        })),
    );
    return { veg: flatten("veg"), nonVeg: flatten("non-veg") };
  }, [categories]);

  return (
    <div className="menu-showcase">
      <DietShowcaseRow label="VEG" diet="veg" categories={categories} dishes={showcaseData.veg} />
      <DietShowcaseRow label="NON-VEG" diet="non-veg" categories={categories} dishes={showcaseData.nonVeg} />
      <p className="text-xs leading-relaxed text-[var(--color-muted)]">
        Prices are transcribed from the printed menu and may change. Please confirm current prices and availability before ordering. Item images are illustrative and may not show the exact dish presentation.
      </p>
    </div>
  );
}
