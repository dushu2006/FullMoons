"use client";

import Image from "next/image";
import { MENU_CATEGORY_EVENT } from "@/components/menu-explorer";

type FeaturedItem = {
  title: string;
  menuCategory: string;
  description: string;
  image: string;
};

export function FeaturedGrid({ items }: { items: readonly FeaturedItem[] }) {
  const exploreCategory = (category: string) => {
    window.dispatchEvent(new CustomEvent(MENU_CATEGORY_EVENT, { detail: category }));
    document.querySelector("#menu")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
      {items.map((item) => (
        <article
          key={item.title}
          className="group overflow-hidden border border-[var(--color-border-dark)] bg-[var(--color-bg-secondary)]"
        >
          <Image
            src={item.image}
            alt={`Illustrative image representing ${item.title}`}
            width={900}
            height={650}
            className="aspect-[4/3] h-full w-full object-cover transition duration-300 group-hover:scale-[1.02]"
            loading="lazy"
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          />
          <div className="p-5">
            <h3 className="font-heading text-[clamp(1.4rem,2vw,1.7rem)] font-semibold text-[var(--color-text-light-primary)]">
              {item.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-light-secondary)]">{item.description}</p>
            <button
              type="button"
              onClick={() => exploreCategory(item.menuCategory)}
              className="mt-5 inline-flex text-sm font-semibold text-[var(--color-accent)] hover:text-[var(--color-accent-deep)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]"
              aria-label={`Explore ${item.title} in the menu`}
            >
              Explore Menu →
            </button>
          </div>
        </article>
      ))}
    </div>
  );
}
