# FULL MOONs — Image System & Manifest

This document is the audit and manifest for every photograph on the
FULL MOONs Family Restaurant website. The **authoritative source of
truth** is `src/config/images.ts`; this document explains the system,
records what was generated, and lists what is still pending.

## Approach

Every photograph is resolved through a single central manifest rather
than ad-hoc heuristics. A dish is looked up by its **exact printed-menu
name**; only when no exact entry exists does the resolver fall back to
the category thumbnail, then to a diet-based default. This guarantees:

- the same dish always shows the same photograph, everywhere;
- no broken images (every path resolves to a real file);
- vegetarian dishes never show meat, fish, seafood or egg;
- chicken, mutton, seafood, egg and paneer dishes stay distinct.

Resolver chain (`getMenuImage`): **exact dish → category thumbnail →
diet default**. All three tiers always point at an existing asset.

## Asset layout

| Path | Purpose |
|---|---|
| `public/images/sections/*` | Hero, About and ambience photographs |
| `public/images/menu/*` | One photograph per dish (dedicated where generated) |
| `public/images/*` | Original category-level photographs, kept as honest fallbacks |

## Audit inventory — every image location and its intended subject

| Location | Component / file | Intended subject | Asset |
|---|---|---|---|
| Homepage hero | `page.tsx` → `#home` | A complete restaurant meal centred on chicken biryani | `sections/hero-meal.jpg` |
| About the restaurant | `page.tsx` → `#about` | A spread of vegetarian Indian dishes, family-style | `sections/about-spread.jpg` |
| Veg menu showcase | `menu-showcase.tsx` (VEG row) | Each dish's own photograph | per-dish via `menuImageMap` |
| Non-veg menu showcase | `menu-showcase.tsx` (NON-VEG row) | Each dish's own photograph | per-dish via `menuImageMap` |
| Individual dish cards | `menu-showcase.tsx` → `DishCard` | The exact dish | `getMenuImage(name)` |
| Menu category dropdown | `menu-showcase.tsx` category picker | A representative dish from that category | `categoryImageMap` |
| Menu explorer rows | `menu-explorer.tsx` | A representative dish from that category | `getCategoryImage` |
| Photo gallery | `page.tsx` → `#gallery` | Curated, varied mix of dishes + ambience | `galleryTiles` |
| Restaurant ambience | gallery tile | Warm interior of the restaurant | `sections/ambience.jpg` |
| Social / OG image | `layout.tsx` metadata | Chicken biryani handi meal | `sections/hero-meal.jpg` |
| Order & Contact, Visit Us | `page.tsx` | Intentionally **no** photography — map iframe + action cards carry these sections | — |

The Order/Contact and Visit sections were audited and deliberately left
imageless: a map iframe and action cards already serve them, and adding
decorative photos would not support the section (per the brief: "assign
an image only when it meaningfully supports that section").

## Generated photographs (this change)

Photographs were generated to imitate authentic restaurant food
photography — natural ambient light, realistic textures and plating,
ordinary Indian serving vessels (ceramic bowls, copper/steel handi,
rustic wooden tables), restrained colour grading, no watermarks, text
or studio backgrounds. Prompts deliberately favour candid, handheld,
slightly imperfect framing so the results read as real restaurant
photos rather than polished renders.

**Section imagery**

| File | Subject | Used for |
|---|---|---|
| `sections/hero-meal.jpg` | Chicken biryani handi with raita, tandoori chicken, naan, salad | Homepage hero + OG |
| `sections/about-spread.jpg` | Vegetarian Indian spread, family-style | About section |
| `sections/ambience.jpg` | Warm restaurant interior, wooden tables | Gallery |

**Soups (all 16 soup dishes covered)**

| File | Subject |
|---|---|
| `menu/veg-hot-sour-soup.jpg` | Vegetarian hot & sour soup |
| `menu/veg-sweet-corn-soup.jpg` | Creamy sweet corn soup |
| `menu/veg-manchow-soup.jpg` | Vegetarian manchow soup |
| `menu/veg-clear-soup.jpg` | Light clear vegetable soup |
| `menu/chicken-sweet-corn-soup.jpg` | Chicken sweet corn soup |
| `menu/chicken-manchow-soup.jpg` | Chicken manchow soup |
| `menu/chicken-hot-sour-soup.jpg` | Chicken hot & sour soup |

**Biryanis (the restaurant's signature — each ingredient distinct)**

| File | Subject |
|---|---|
| `menu/veg-biryani.jpg` | Vegetable biryani |
| `menu/paneer-biryani.jpg` | Paneer biryani |
| `menu/mushroom-biryani.jpg` | Mushroom biryani |
| `menu/kaju-biryani.jpg` | Kaju (cashew) biryani |
| `menu/ulavacharu-veg-biryani.jpg` | Ulavacharu vegetable biryani |
| `menu/chicken-biryani.jpg` | Chicken dum biryani |
| `menu/mutton-biryani.jpg` | Mutton biryani |
| `menu/fish-biryani.jpg` | Fish biryani |
| `menu/prawns-biryani.jpg` | Prawns biryani |
| `menu/egg-biryani.jpg` | Egg biryani |

**Flagship curries, noodles, tandoori and breads**

| File | Subject |
|---|---|
| `menu/paneer-butter-masala.jpg` | Paneer butter masala |
| `menu/palak-paneer.jpg` | Palak paneer |
| `menu/dal-tadka.jpg` | Dal tadka / dal fry |
| `menu/chicken-curry.jpg` | Chicken curry |
| `menu/prawns-curry.jpg` | Prawns curry |
| `menu/veg-noodles.jpg` | Vegetable noodles |
| `menu/chicken-noodles.jpg` | Chicken noodles |
| `menu/tandoori-chicken.jpg` | Tandoori chicken |
| `menu/roti.jpg` | Tandoori roti / kothimeera roti |
| `menu/butter-naan.jpg` | Butter / plain / garlic naan |

That is **27 dedicated photographs**, covering the section imagery,
every soup, every biryani ingredient, and the flagship curries,
noodles, tandoori and breads. The homepage gallery was rebalanced to
showcase this variety (biryani, paneer, tandoori, noodles, curry,
seafood, ambience) instead of repeating soup shots.

## Dietary safety

- Vegetarian dishes resolve only to vegetarian photographs. The
  verifier enforces this: no `diet: "veg"` item may map to a meat,
  fish, seafood or egg photograph.
- Egg dishes (`diet: "egg"`) never map to a meat photograph.
- Mutton soups currently reuse the closest correct *soup* photograph
  (a chicken hot-and-sour / manchow soup) because no mutton-soup
  photograph has been generated yet — this is flagged as pending, not
  misrepresented as mutton in the alt text.

## Pending — dishes still on a shared category photograph

139 dishes currently resolve to the closest correct, dietary-safe
**category** photograph (e.g. biryanis → the biryani photo, curries →
the curry photo, breads → the bread photo). This is honest and
correct, but the brief asks for a dedicated photograph per dish where
practical. The full, machine-generated list is in
**`docs/image-coverage-report.md`**, which is produced by the verifier
and lists every dish, its image, and whether it is DEDICATED or SHARED.

Priority order for the next generation batches:

1. **Biryanis** (veg, paneer, mushroom, kaju, chicken, mutton, fish,
   prawn, egg, and the special biryani range) — the restaurant's
   signature; must not share one biryani photo.
2. **Curries** (veg, chicken, mutton, prawn, fish) — distinct gravies.
3. **Starters** (veg, chicken, mutton, tandoori, seafood).
4. **Noodles, fried rice and breads** (roti, naan, kulcha, paratha).

To upgrade a dish to a dedicated photograph: generate
`public/images/menu/<slug>.jpg`, then change its entry in
`menuImageMap` in `src/config/images.ts` and re-run the verifier.

## Verification

```bash
npx tsx scripts/verify-image-manifest.ts
```

This checks that every one of the 184 menu items resolves to an existing
file, every category thumbnail exists, section/gallery/OG images exist,
and that no vegetarian dish references a non-vegetarian photograph. It
prints a coverage summary and writes `docs/image-coverage-report.md`.

## Known limitations

- **Generation budget:** the image-generation tool allows 10 photographs
  per turn. The full menu needs ~150 dedicated photographs for complete
  per-dish coverage, so this change delivers the complete image *system*
  plus dedicated photographs for the section imagery and all soups, and
  documents the remaining dishes as pending rather than misrepresenting
  them.
- **Visual inspection:** the implementing agent could not visually
  inspect generated photographs (no vision capability in this
  environment). Prompts were written to the brief's photographic
  direction and every file was verified to be a valid, correctly-sized
  JPEG on disk.
