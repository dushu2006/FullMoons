# Full Moons — Image Integration Report

Date: 2026-10-18 · Branch: `feat/food-photography-image-system`

## 1. Audit findings (before this change)

The menu data in `src/config/site.ts` contains **184 dishes across 22 printed-menu
categories** (soups, starters, fried rice, noodles, curries, biryanis, mutton curries,
breads, and special offers), each with name, price and diet (veg / non-veg / egg).

Image locations audited:

| Location | Before | Problem |
|---|---|---|
| Homepage hero | `/images/hero-biryani.jpg` | Generic placeholder-quality shot |
| About section | `/images/intro-platter.jpg` | Generic placeholder-quality shot |
| Veg / Non-veg showcase dish cards | `resolveDishImage()` regex guessing in `menu-showcase.tsx` | All 184 dishes cycled through only 8 generic photos; e.g. chicken curry and dal fry showed the same image; veg dishes showed non-veg starter photos and vice versa; "Veg Biryani" showed a rice photo while "Chicken Biryani" showed the hero |
| Category dropdown thumbnails | Same regex on the category name | Unrelated thumbnails (e.g. "Non Veg. Soups" → curry photo) |
| Photo gallery | 8 inline tiles | Only 5 distinct photos, several repeated twice |
| OpenGraph/Twitter card | hero photo | Same generic shot |

No dish had a dedicated, correctly matched photograph. Menu names, prices and
dietary tags were left untouched throughout this work.

## 2. What was built

- **`src/config/menu-images.ts`** — the central image manifest: every one of the
  184 dish names mapped to a dedicated photograph slug (92 distinct photographs;
  genuinely equivalent preparations such as "Chicken 65" / "Chicken 555" /
  "Apollo Chicken" deliberately share one shot, each group documented), 22
  category thumbnails, hero / About / gallery selections, and photographic
  captions used to build alt text.
- **`src/config/menu-image-availability.ts`** (generated) — runtime-safe paths.
  A dish whose dedicated photograph has not been generated yet resolves to the
  closest existing photograph (category representative → diet overview →
  diet-aware neutral fallback), so **no component can ever render a broken or
  diet-incorrect image**. Re-run `npm run sync:images` after each generation
  batch and the new photographs light up automatically.
- **`scripts/sync-image-availability.mjs`**, **`scripts/verify-image-manifest.mjs`**
  (`npm run verify:images`) and **`scripts/build-image-manifest-docs.mjs`**
  (`npm run docs:images`) — the systematic generation workflow: sync, audit
  (coverage, missing files, orphans, dietary sanity), and regenerate the
  auditable **`docs/IMAGE-MANIFEST.md`** dish-by-dish table.
- **`scripts/optimize-images.mjs`** — resizes dish photos to 640px/q80 and
  section photos to 1280px/q82 (dish cards display at ~238px).
- Component integration: `menu-showcase.tsx` (dish cards + dropdown thumbnails +
  alt text), `page.tsx` (hero, About, gallery now uses the existing
  `GalleryLightbox` component with a curated set of distinct photographs —
  biryani, tandoori chicken, prawns curry, paneer butter masala, veg soup,
  thali, ambience and tandoor-oven shots), `site.ts` (category thumbnails),
  `layout.tsx` (OG alt text). The marquee
  animation, category selection, pause behaviour, prices and responsive layout
  are unchanged.

## 3. Photographs generated this session (10)

| File | Subject |
|---|---|
| `public/images/hero-biryani.jpg` | Chicken dum biryani in a copper handi (hero + OG card) |
| `public/images/intro-platter.jpg` | Family-restaurant table spread (About section) |
| `public/images/gallery-interior.jpg` | Dining-room ambience (gallery tile) |
| `public/images/gallery-veg-thali.jpg` | Vegetarian thali (gallery tile) |
| `public/images/gallery-tandoor.jpg` | Tandoor oven with skewers (tandoori category thumbnail) |
| `public/images/menu/veg-hot-and-sour-soup.jpg` | Veg hot and sour soup |
| `public/images/menu/veg-sweet-corn-soup.jpg` | Veg sweet corn soup |
| `public/images/menu/veg-manchow-soup.jpg` | Veg manchow soup |
| `public/images/menu/veg-garlic-soup.jpg` | Veg garlic soup |
| `public/images/menu/veg-lemon-coriander-soup.jpg` | Lemon coriander soup |

All five veg-soup dishes now show their own dedicated photographs; hero, About
and category thumbnails for Veg. Soups and Tandoori starters are live.

## 4. Remaining limitation — 87 photographs pending

**The image-generation tool enforced a hard limit of 10 generated images for
this session.** Every subsequent attempt (retried across several hours, including
after long waits) returned: *"Image generation limit of 10 reached for this
turn."* The remaining 87 photographs listed dish-by-dish in
`docs/IMAGE-MANIFEST.md` (⏳ pending) could therefore not be created in this
session. Web image search was evaluated as an alternative but rejected: results
are low-resolution, watermarked stock previews that cannot be visually verified
in this environment and would violate the "no stock-photo catalogue, no
watermarks" visual direction.

Until each pending photo is generated, the affected dish cards show the closest
honest existing photograph from the same category (documented in
`src/config/menu-image-availability.ts` and marked ⏳ in the manifest doc).
**To finish the photo set:** run the generation workflow in batches (the
prompts/subjects for every pending slug are listed in `docs/IMAGE-MANIFEST.md`),
then `npm run sync:images && npm run docs:images`. No code changes are needed —
the manifest already maps every dish.

## 5. Checks performed

- `npm run verify:images` — 184/184 dishes mapped, 22/22 category thumbnails,
  every served image path exists on disk, no orphan files, dietary sanity
  (veg dishes never map to meat/fish/egg slugs and vice versa) ✓
- `npm run typecheck` ✓
- `npm run build` (static export + dev modes) ✓
- `npm run lint` — 2 pre-existing `react-hooks/set-state-in-effect` errors in
  the currently unreferenced `menu-explorer.tsx`; unrelated to this change and
  present on `main` before it
- Dev-server smoke test: all 13 distinct image URLs rendered on the homepage
  return HTTP 200 ✓
- Playwright E2E could not run: browser binaries cannot be downloaded in this
  sandbox (Playwright CDN is not allowlisted). Note the suite already referenced
  an older page structure (menu-explorer highlights, "Menu Overview" heading)
  and was failing before this change; the gallery lightbox feature it expects is
  now wired up and will pass once its six photographs are all generated.

## 6. Files changed

- Added: `src/config/menu-images.ts`, `src/config/menu-image-availability.ts`
  (generated), `scripts/sync-image-availability.mjs`,
  `scripts/verify-image-manifest.mjs`,
  `scripts/build-image-manifest-docs.mjs`, `scripts/optimize-images.mjs`,
  `docs/IMAGE-MANIFEST.md`, `docs/IMAGE-REPORT.md`,
  `public/images/menu/*.jpg` (5), `public/images/gallery-{interior,veg-thali,tandoor}.jpg`
- Modified: `src/components/menu-showcase.tsx`, `src/app/page.tsx`,
  `src/app/layout.tsx`, `src/config/site.ts`, `package.json` (3 scripts),
  `README.md`, `public/images/hero-biryani.jpg`, `public/images/intro-platter.jpg`
  (regenerated in place; originals preserved in git history)
