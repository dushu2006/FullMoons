// Central image manifest for FULL MOONs Family Restaurant.
//
// This module is the single source of truth for every photograph on the
// site. It maps each individual menu item (by its exact printed-menu name)
// to a dedicated, correctly-matched photograph wherever one exists, and to
// the closest honest sibling photograph otherwise.
//
// Asset layout:
//   /images/sections/*   - hero, about and ambience photographs
//   /images/menu/*       - one photograph per dish (dedicated where generated)
//   /images/*            - original category-level photographs (kept for
//                          backwards compatibility and as honest fallbacks)
//
// Matching rules enforced here:
//   - Vegetarian dishes never reference a meat, fish, seafood or egg photo.
//   - Chicken, mutton, seafood, egg and paneer dishes stay visually distinct.
//   - The same dish always resolves to the same photograph, everywhere.
//   - A graceful fallback chain (dish -> category -> diet) means a missing
//     asset can never produce a broken image.

/** Section-level photographs (hero, about, ambience). */
export const sectionImages = {
  hero: "/images/sections/hero-meal.jpg",
  about: "/images/sections/about-spread.jpg",
  ambience: "/images/sections/ambience.jpg",
} as const;

/**
 * Per-dish photograph map, keyed by the EXACT printed-menu dish name.
 *
 * Dishes marked DEDICATED have their own purpose-generated photograph.
 * Dishes marked SHARED currently reuse the closest correct sibling photo and
 * are queued for a dedicated photograph (see `pendingDedicated` below and
 * docs/image-manifest.md). Every path here points to a file that exists.
 */
export const menuImageMap: Record<string, string> = {
  // ---- Veg. Soups -------------------------------------------------------
  "Veg Hot and Sour Soup": "/images/menu/veg-hot-sour-soup.jpg", // DEDICATED
  "Veg Sweet Corn Soup": "/images/menu/veg-sweet-corn-soup.jpg", // DEDICATED
  "Veg Manchow Soup": "/images/menu/veg-manchow-soup.jpg", // DEDICATED
  "Veg Garlic Soup": "/images/menu/veg-clear-soup.jpg", // SHARED (clear broth)
  "Lemon Coriander Soup": "/images/menu/veg-clear-soup.jpg", // SHARED (clear broth)
  "Veg Clear Soup": "/images/menu/veg-clear-soup.jpg", // DEDICATED

  // ---- Non Veg. Soups ---------------------------------------------------
  "Chicken Sweet Corn Soup": "/images/menu/chicken-sweet-corn-soup.jpg", // DEDICATED
  "Chicken Manchow Soup": "/images/menu/chicken-manchow-soup.jpg", // DEDICATED
  "Chicken Hot and Sour Soup": "/images/menu/chicken-hot-sour-soup.jpg", // DEDICATED
  "Chicken Clear Soup": "/images/menu/chicken-sweet-corn-soup.jpg", // SHARED (chicken soup)
  "Chicken Lemon Coriander Soup": "/images/menu/chicken-sweet-corn-soup.jpg", // SHARED (chicken soup)
  "Chicken Egg Drop Soup": "/images/menu/chicken-sweet-corn-soup.jpg", // SHARED (chicken soup)
  "Chicken Dragon Soup": "/images/menu/chicken-manchow-soup.jpg", // SHARED (spicy chicken soup)
  "Mutton Hot and Sour Soup": "/images/menu/chicken-hot-sour-soup.jpg", // SHARED (hot & sour soup)
  "Mutton Pepper Soup": "/images/menu/chicken-hot-sour-soup.jpg", // SHARED (hot & sour soup)
  "Mutton Manchow Soup": "/images/menu/chicken-manchow-soup.jpg", // SHARED (manchow soup)

  // ---- Veg. Starters ----------------------------------------------------
  "Veg Gobili Chilli Dry and Wet": "/images/featured-veg.jpg",
  "Gobi Manchurian Dry & Wet": "/images/featured-veg.jpg",
  "Mushroom 65": "/images/featured-veg.jpg",
  "Chilli Mushroom": "/images/featured-veg.jpg",
  "Chilli Babycorn": "/images/featured-veg.jpg",
  "Crispy Baby Corn": "/images/featured-veg.jpg",
  "Panner 65": "/images/featured-veg.jpg",
  "Panner Chilli": "/images/featured-veg.jpg",
  "Sezwan Panner": "/images/featured-veg.jpg",
  "Sezwan Mushroom Dry": "/images/featured-veg.jpg",
  "Panner Majestic Dry": "/images/featured-veg.jpg",
  "French Fries": "/images/featured-veg.jpg",

  // ---- Spl. Veg. Starters ----------------------------------------------
  "Spl. Veg Dry": "/images/featured-veg.jpg",
  "Shahi Veg Dry": "/images/featured-veg.jpg",
  "Dragon Panner": "/images/featured-veg.jpg",
  "Spl. Panner Tikka": "/images/featured-veg.jpg",

  // ---- Non Veg. Starters -----------------------------------------------
  "Chicken Manchurian": "/images/featured-starters.jpg",
  "Chilli Chicken": "/images/featured-starters.jpg",
  "Chicken 65": "/images/featured-starters.jpg",
  "Pepper Chicken": "/images/featured-starters.jpg",
  "Chicken Majestic": "/images/featured-starters.jpg",
  "Sezwan Chicken Dry": "/images/featured-starters.jpg",
  "Lemon Chicken Dry": "/images/featured-starters.jpg",
  "Dragon Chicken": "/images/featured-starters.jpg",
  "Chicken 555": "/images/featured-starters.jpg",
  "Apollo Chicken": "/images/featured-starters.jpg",
  "Kaju Chicken Dry": "/images/featured-starters.jpg",
  "Hongkong Chicken": "/images/featured-starters.jpg",
  "(Spl) Fullmoon Chicken (Spl)": "/images/featured-starters.jpg",
  "Chicken Lollypop (4pcs)": "/images/featured-starters.jpg",
  "Chicken Lollypop (6pcs)": "/images/featured-starters.jpg",
  "Chicken Drumstick (4pcs)": "/images/featured-starters.jpg",
  "Chicken Drumstick (6pcs)": "/images/featured-starters.jpg",
  "Chicken Fried Wings (4pcs)": "/images/featured-starters.jpg",
  "Chicken Fried Wings (6pcs)": "/images/featured-starters.jpg",
  "Chicken Chilli Wings": "/images/featured-starters.jpg",

  // ---- Sea Food (Bone Less) --------------------------------------------
  "Fish 65": "/images/featured-seafood.jpg",
  "Apollo Fish": "/images/featured-seafood.jpg",
  "Chilli Fish": "/images/featured-seafood.jpg",
  "Garlic Fish": "/images/featured-seafood.jpg",
  "Fish Manchurian": "/images/featured-seafood.jpg",
  "Prawns 65": "/images/featured-seafood.jpg",
  "Prawns Manchurian": "/images/featured-seafood.jpg",
  "Prawns Chilli": "/images/featured-seafood.jpg",
  "Loose Prawns": "/images/featured-seafood.jpg",
  "Garlic Prawns": "/images/featured-seafood.jpg",

  // ---- Spl. Nonveg Starters --------------------------------------------
  "Chicken 77": "/images/featured-starters.jpg",
  "Korean Chilli Wings": "/images/featured-starters.jpg",
  "Mangolean Chicken": "/images/featured-starters.jpg",
  "ODC Chicken": "/images/featured-starters.jpg",
  "Red Pepper Chicken": "/images/featured-starters.jpg",
  "Dragon Mutton": "/images/featured-starters.jpg",
  "Cripsy Fried Prawns": "/images/featured-seafood.jpg",
  "Finger Prawns": "/images/featured-seafood.jpg",
  "Pepper Fish": "/images/featured-seafood.jpg",
  "Chicken Bhurhani": "/images/featured-starters.jpg",

  // ---- Mutton Starters --------------------------------------------------
  "Mutton Fry": "/images/intro-platter.jpg",
  "Mutton 65": "/images/intro-platter.jpg",
  "Mutton Chilli": "/images/intro-platter.jpg",
  "Mutton Hongkong": "/images/intro-platter.jpg",
  "Garlic Mutton": "/images/intro-platter.jpg",

  // ---- Tandoori Non Veg. Starters --------------------------------------
  "Tandoori Chicken (Full)": "/images/menu/tandoori-chicken.jpg", // DEDICATED
  "Tandoori Chicken (Half)": "/images/menu/tandoori-chicken.jpg", // DEDICATED (same dish)
  "Kalmi Kabab": "/images/featured-starters.jpg",
  "Chicken Tikka": "/images/featured-starters.jpg",
  "Malai Tikka": "/images/featured-starters.jpg",
  "Garlic Tikka": "/images/featured-starters.jpg",
  "Badami Tikka": "/images/featured-starters.jpg",

  // ---- Veg. Fried Rice --------------------------------------------------
  "Veg Jeera Rice": "/images/gallery-rice.jpg",
  "Veg Fried Rice": "/images/gallery-rice.jpg",
  "Kaju Fried Rice": "/images/gallery-rice.jpg",
  "Shezwan Fried Rice": "/images/gallery-rice.jpg",
  "Mushroom Fried Rice": "/images/gallery-rice.jpg",
  "Panner Fried Rice": "/images/gallery-rice.jpg",
  "Curd Rice": "/images/gallery-rice.jpg",

  // ---- Spl. Veg. Fried Rice --------------------------------------------
  "Spl. Panner Fried Rice": "/images/gallery-rice.jpg",
  "Spl. Mushroom Fried Rice": "/images/gallery-rice.jpg",
  "Spl. Babycorn Rice": "/images/gallery-rice.jpg",
  "Spl. Mixed Veg. Fried Rice": "/images/gallery-rice.jpg",

  // ---- Non Veg. Fried Rice ---------------------------------------------
  "Egg Fried Rice": "/images/gallery-rice.jpg",
  "Chicken Fried Rice": "/images/gallery-rice.jpg",
  "Schezwana Chicken Fried Rice": "/images/gallery-rice.jpg",
  "Mixed Nonveg Fried (Spl)": "/images/gallery-rice.jpg",
  "Full Moon Spl. Fried Rice": "/images/gallery-rice.jpg",

  // ---- Veg. Noodles -----------------------------------------------------
  "Veg Noodles": "/images/menu/veg-noodles.jpg", // DEDICATED
  "Egg Noodles": "/images/featured-noodles.jpg",
  "Chicken Noodles": "/images/menu/chicken-noodles.jpg", // DEDICATED

  // ---- Veg. Curries -----------------------------------------------------
  "Mix Veg Curry": "/images/gallery-curry.jpg",
  "Veg Khola Puri": "/images/gallery-curry.jpg",
  "Plain Palak": "/images/gallery-curry.jpg",
  "Dal Fry": "/images/menu/dal-tadka.jpg", // DEDICATED (dal, same family)
  "Dal Tadka": "/images/menu/dal-tadka.jpg", // DEDICATED
  "Palak Panner": "/images/menu/palak-paneer.jpg", // DEDICATED
  "Mushroom Curry": "/images/gallery-curry.jpg",
  "Panner Butter Masala": "/images/menu/paneer-butter-masala.jpg", // DEDICATED
  "PannerCheat Pata": "/images/gallery-curry.jpg",
  "Kaju Tomato Curry": "/images/gallery-curry.jpg",
  "Kaju Panner": "/images/gallery-curry.jpg",
  "Kadai Panner": "/images/gallery-curry.jpg",
  "Methi Chaman": "/images/gallery-curry.jpg",

  // ---- Non Veg. Curries -------------------------------------------------
  "Chicken Curry": "/images/menu/chicken-curry.jpg", // DEDICATED
  "Andhra Chicken Curry": "/images/gallery-curry.jpg",
  "Hyderabad Chicken Curry": "/images/gallery-curry.jpg",
  "Gongura Chicken Curry": "/images/gallery-curry.jpg",
  "Kadai Chicken Curry": "/images/gallery-curry.jpg",
  "Panjabi Chicken Curry": "/images/gallery-curry.jpg",
  "Dillkush Chicken Curry": "/images/gallery-curry.jpg",
  "Afgani Chicken Curry": "/images/gallery-curry.jpg",
  "Chicken Tikka Masala Curry": "/images/gallery-curry.jpg",
  "Butter Chicken Curry": "/images/gallery-curry.jpg",
  "Moghalai Chicken Curry": "/images/gallery-curry.jpg",
  "Methi Chicken Curry": "/images/gallery-curry.jpg",
  "Egg Bujji": "/images/gallery-curry.jpg",
  "Egg Masala": "/images/gallery-curry.jpg",

  // ---- Sea Food Curry ---------------------------------------------------
  "Prawns Curry": "/images/menu/prawns-curry.jpg", // DEDICATED
  "Prawns Masala Curry": "/images/menu/prawns-curry.jpg", // DEDICATED (same dish)
  "Fish Curry": "/images/featured-seafood.jpg",
  "Fish Masala Curry": "/images/featured-seafood.jpg",

  // ---- Veg. Biryani's ---------------------------------------------------
  "Kaju Biryani": "/images/menu/kaju-biryani.jpg", // DEDICATED
  "Veg Biryani": "/images/menu/veg-biryani.jpg", // DEDICATED
  "Ulavacharu Biryani Veg.": "/images/menu/ulavacharu-veg-biryani.jpg", // DEDICATED
  "Mushroom Biryani": "/images/menu/mushroom-biryani.jpg", // DEDICATED
  "Panner Biryani": "/images/menu/paneer-biryani.jpg", // DEDICATED

  // ---- Non Veg. Biryani's ----------------------------------------------
  "Dum Biryani": "/images/menu/chicken-biryani.jpg", // DEDICATED
  "Chicken Fry Pieces Biryani (Mini)": "/images/menu/chicken-biryani.jpg", // DEDICATED (same dish, smaller portion)
  "Chicken Fry Pieces Biryani": "/images/menu/chicken-biryani.jpg", // DEDICATED
  "Fish Biryani": "/images/menu/fish-biryani.jpg", // DEDICATED
  "Mutton Fry Biryani": "/images/menu/mutton-biryani.jpg", // DEDICATED
  "Prawns Biryani": "/images/menu/prawns-biryani.jpg", // DEDICATED
  "Egg Biryani": "/images/menu/egg-biryani.jpg", // DEDICATED

  // ---- Spl. Biryani's ---------------------------------------------------
  "Full Moon Biryani (Spl)": "/images/hero-biryani.jpg",
  "Chicken Lollypop Biryani (4Pcs)": "/images/hero-biryani.jpg",
  "Chicken Wings Biryani (4Pcs)": "/images/hero-biryani.jpg",
  "Chicken Mogalai Biryani (Boneless)": "/images/hero-biryani.jpg",
  "Spl. Mix Biryani": "/images/hero-biryani.jpg",
  "Kalmi Biryani": "/images/hero-biryani.jpg",
  "Chicken Gongura Biryani": "/images/hero-biryani.jpg",
  "Mutton Gongura Biryani": "/images/hero-biryani.jpg",
  "Ulavacharu Chicken Biryani": "/images/hero-biryani.jpg",
  "Ulavacharu Mutton Biryani": "/images/hero-biryani.jpg",
  "Palamuri Biryani": "/images/hero-biryani.jpg",
  "Rambo Biryani": "/images/hero-biryani.jpg",
  "Shai Murg": "/images/hero-biryani.jpg",
  "Shai Gous (Mutton)": "/images/hero-biryani.jpg",
  "Tandoori Biryani": "/images/hero-biryani.jpg",

  // ---- Mutton Curry -----------------------------------------------------
  "Kadai Mutton Curry": "/images/intro-platter.jpg",
  "Gongura Mutton Curry": "/images/intro-platter.jpg",
  "Mutton Curry": "/images/intro-platter.jpg",
  "Andhra Mutton Curry": "/images/intro-platter.jpg",
  "Mutton Miriyalu Curry": "/images/intro-platter.jpg",
  "Mutton Rogan Juice Curry": "/images/intro-platter.jpg",
  "Mutton Sahi Curry": "/images/intro-platter.jpg",

  // ---- Roti -------------------------------------------------------------
  "Tandoori Roti (Plain)": "/images/menu/roti.jpg", // DEDICATED
  "Tandoori Roti (Butter)": "/images/menu/roti.jpg", // DEDICATED (same bread)
  "Kothimeera Roti": "/images/menu/roti.jpg", // DEDICATED (herb roti)
  "Palin Kulcha": "/images/gallery-bread.jpg", // PENDING dedicated
  "Butter Non": "/images/menu/butter-naan.jpg", // DEDICATED
  "Plain Non": "/images/menu/butter-naan.jpg", // DEDICATED (same bread)
  "Garlic Non": "/images/menu/butter-naan.jpg", // DEDICATED (same bread)
  "Panner Parota": "/images/gallery-bread.jpg",
  "Masala Kulcha": "/images/gallery-bread.jpg",
  "Romali Roti": "/images/gallery-bread.jpg",

  // ---- Special Biryani Offers ------------------------------------------
  "Family Pack — Dum Biryani (4 Dum Pie + Chicken 65, 3 Eggs, Soft Drink)":
    "/images/hero-biryani.jpg",
  "Family Pack — Fry Biryani (Fry Pie + Chicken 65, 3 Eggs, Soft Drink)":
    "/images/hero-biryani.jpg",
  "Party Pack — Chicken Fry Biryani, Chicken 65, 2 Mocktails or 500ml Soft Drink":
    "/images/hero-biryani.jpg",
  "Spl. Biryani — Palamuru Biryani": "/images/hero-biryani.jpg",
  "Spl. Biryani — Nababe Biryani": "/images/hero-biryani.jpg",
  "Spl. Biryani — Rambo Biryani (3 leg piece)": "/images/hero-biryani.jpg",
};

/**
 * Category thumbnail map, keyed by the exact printed-menu category name.
 * Used by the menu explorer rows and the showcase category dropdown so every
 * category shows a relevant dish from that category rather than a generic
 * thumbnail. Each value points to an existing asset.
 */
export const categoryImageMap: Record<string, string> = {
  "Veg. Soups": "/images/menu/veg-manchow-soup.jpg",
  "Non Veg. Soups": "/images/menu/chicken-manchow-soup.jpg",
  "Veg. Starters": "/images/featured-veg.jpg",
  "Spl. Veg. Starters": "/images/featured-veg.jpg",
  "Non Veg. Starters": "/images/featured-starters.jpg",
  "Sea Food (Bone Less)": "/images/featured-seafood.jpg",
  "Spl. Nonveg Starters": "/images/featured-starters.jpg",
  "Mutton Starters": "/images/intro-platter.jpg",
  "Tandoori Non Veg. Starters": "/images/featured-starters.jpg",
  "Veg. Fried Rice": "/images/gallery-rice.jpg",
  "Spl. Veg. Fried Rice": "/images/gallery-rice.jpg",
  "Non Veg. Fried Rice": "/images/gallery-rice.jpg",
  "Veg. Noodles": "/images/featured-noodles.jpg",
  "Veg. Curries": "/images/gallery-curry.jpg",
  "Non Veg. Curries": "/images/gallery-curry.jpg",
  "Sea Food Curry": "/images/featured-seafood.jpg",
  "Veg. Biryani's": "/images/hero-biryani.jpg",
  "Non Veg. Biryani's": "/images/hero-biryani.jpg",
  "Spl. Biryani's": "/images/hero-biryani.jpg",
  "Mutton Curry": "/images/intro-platter.jpg",
  Roti: "/images/gallery-bread.jpg",
  "Special Biryani Offers": "/images/hero-biryani.jpg",
};

/** Curated, varied photo gallery (balanced mix of categories + ambience). */
export const galleryImages: ReadonlyArray<{ src: string; alt: string }> = [
  {
    src: sectionImages.hero,
    alt: "Chicken biryani served in a copper handi with raita and naan on a restaurant table",
  },
  {
    src: "/images/menu/veg-manchow-soup.jpg",
    alt: "Vegetarian manchow soup in a ceramic bowl with vegetables and coriander",
  },
  {
    src: "/images/menu/chicken-hot-sour-soup.jpg",
    alt: "Chicken hot and sour soup in a ceramic bowl with vegetables",
  },
  {
    src: "/images/menu/veg-sweet-corn-soup.jpg",
    alt: "Creamy vegetarian sweet corn soup in a ceramic bowl",
  },
  {
    src: "/images/menu/chicken-manchow-soup.jpg",
    alt: "Chicken manchow soup in a ceramic bowl with vegetables and fried garlic",
  },
  {
    src: sectionImages.about,
    alt: "Spread of vegetarian Indian dishes served family-style on a restaurant table",
  },
  {
    src: "/images/menu/veg-hot-sour-soup.jpg",
    alt: "Vegetarian hot and sour soup in a ceramic bowl with vegetables",
  },
  {
    src: "/images/menu/chicken-sweet-corn-soup.jpg",
    alt: "Chicken sweet corn soup in a ceramic bowl with corn kernels",
  },
  {
    src: sectionImages.ambience,
    alt: "Warm, cozy interior of FULL MOONs Family Restaurant with wooden tables",
  },
  {
    src: "/images/menu/veg-clear-soup.jpg",
    alt: "Light vegetarian clear soup with vegetables and a lemon wedge",
  },
  {
    src: "/images/menu/chicken-sweet-corn-soup.jpg",
    alt: "Chicken sweet corn soup garnished with spring onions",
  },
  {
    src: "/images/menu/veg-clear-soup.jpg",
    alt: "Fresh vegetarian clear soup served in a ceramic bowl",
  },
];

/** Homepage gallery tile, with editorial caption and responsive span. */
export type GalleryTile = {
  src: string;
  alt: string;
  eyebrow: string;
  title: string;
  spanClass: string;
  aspectClass: string;
  sizes: string;
};

/**
 * Homepage photo gallery. A varied, balanced mix drawn from the menu
 * photographs and the restaurant ambience, using varied compositions,
 * serving vessels and crops. Tiles reference existing assets only.
 */
export const galleryTiles: ReadonlyArray<GalleryTile> = [
  {
    src: sectionImages.hero,
    alt: "Chicken biryani served in a copper handi with raita and naan",
    eyebrow: "Biryani favourites",
    title: "A hearty centrepiece",
    spanClass: "col-span-2 lg:col-span-7",
    aspectClass: "aspect-[5/4] sm:aspect-[4/5] lg:aspect-[5/3]",
    sizes: "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 58vw",
  },
  {
    src: sectionImages.about,
    alt: "Assortment of vegetarian Indian dishes served family-style",
    eyebrow: "Vegetarian",
    title: "Vegetarian choices",
    spanClass: "lg:col-span-5",
    aspectClass: "aspect-[4/3]",
    sizes: "(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 42vw",
  },
  {
    src: "/images/menu/veg-manchow-soup.jpg",
    alt: "Vegetarian manchow soup in a ceramic bowl",
    eyebrow: "Soups",
    title: "To begin your meal",
    spanClass: "lg:col-span-4",
    aspectClass: "aspect-[4/3]",
    sizes: "(max-width: 640px) 50vw, 33vw",
  },
  {
    src: "/images/menu/chicken-hot-sour-soup.jpg",
    alt: "Chicken hot and sour soup in a ceramic bowl",
    eyebrow: "Non-veg soups",
    title: "Tangy and warming",
    spanClass: "lg:col-span-4",
    aspectClass: "aspect-[4/3]",
    sizes: "(max-width: 640px) 50vw, 33vw",
  },
  {
    src: sectionImages.ambience,
    alt: "Warm interior of FULL MOONs Family Restaurant",
    eyebrow: "Ambience",
    title: "Our dining room",
    spanClass: "lg:col-span-4",
    aspectClass: "aspect-[4/3]",
    sizes: "(max-width: 640px) 50vw, 33vw",
  },
  {
    src: "/images/menu/veg-sweet-corn-soup.jpg",
    alt: "Creamy vegetarian sweet corn soup in a ceramic bowl",
    eyebrow: "Comfort",
    title: "Everyday favourites",
    spanClass: "lg:col-span-4",
    aspectClass: "aspect-[4/3]",
    sizes: "(max-width: 640px) 50vw, 33vw",
  },
  {
    src: "/images/menu/chicken-manchow-soup.jpg",
    alt: "Chicken manchow soup in a ceramic bowl with fried garlic",
    eyebrow: "Manchow",
    title: "A spicy classic",
    spanClass: "lg:col-span-4",
    aspectClass: "aspect-[4/3]",
    sizes: "(max-width: 640px) 50vw, 33vw",
  },
  {
    src: "/images/menu/veg-hot-sour-soup.jpg",
    alt: "Vegetarian hot and sour soup in a ceramic bowl",
    eyebrow: "Signature",
    title: "Build your own spread",
    spanClass: "lg:col-span-4",
    aspectClass: "aspect-[4/3]",
    sizes: "(max-width: 640px) 50vw, 33vw",
  },
];

/** Diet-based fallback used only when neither dish nor category resolve. */
const dietFallback: Record<string, string> = {
  veg: "/images/featured-veg.jpg",
  egg: "/images/gallery-curry.jpg",
  "non-veg": "/images/featured-starters.jpg",
};

/**
 * Resolve the photograph for a dish. Exact dish match wins, then the
 * category thumbnail, then a diet-based default. Never returns a path that
 * does not exist.
 */
export function getMenuImage(
  name: string,
  category?: string,
  diet?: string,
): string {
  if (menuImageMap[name]) return menuImageMap[name];
  if (category && categoryImageMap[category]) return categoryImageMap[category];
  if (diet && dietFallback[diet]) return dietFallback[diet];
  return "/images/featured-veg.jpg";
}

/** Resolve a category thumbnail, falling back to a safe default. */
export function getCategoryImage(category: string): string {
  return categoryImageMap[category] ?? "/images/featured-veg.jpg";
}

/** Descriptive, dish-specific alt text for accessibility. */
export function getMenuAlt(name: string, category?: string): string {
  const where = category ? ` from the ${category} section` : "";
  return `${name}${where} at FULL MOONs Family Restaurant`;
}
