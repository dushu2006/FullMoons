# FULL MOONs Family Restaurant Website

Production-ready Next.js website for **FULL MOONs Family Restaurant** (New Gajuwaka, Visakhapatnam).

## Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS v4 (fonts are self-hosted via Fontsource, so builds work offline)
- Playwright (critical E2E journeys)

## Local setup

```bash
npm install
npm run dev
```

Open: `http://localhost:3000`

## Production build

```bash
npm run build
npm run start
```

## Environment variables

Copy `.env.example` to `.env` if you need them — both are optional:

```env
DATABASE_URL=postgresql://postgres:postgres@127.0.0.1:5432/app_db
NEXT_PUBLIC_SITE_URL=https://your-production-domain.com
```

Notes:
- `NEXT_PUBLIC_SITE_URL` is used for canonical metadata, robots, and sitemap URLs.
- No API keys are required for the current website feature set.
- The site builds and runs without a database. Only `/api/health` uses
  `DATABASE_URL`; without it that endpoint answers
  `{"ok": false, "database": "not_configured"}` (503) instead of crashing.

## Interactive features

- **Menu explorer** — search, category filters, a Veg-only toggle and
  per-dish WhatsApp enquiry links. Featured cards filter the menu too
  (deep-linkable, e.g. `/?category=Biryani#menu`). No prices are published
  online; visitors confirm today's price and availability directly.
- **Gallery lightbox** — keyboard (←/→/Esc/Home/End), swipe, backdrop-click
  and dot navigation, with a position counter.
- **Plan your visit** — a short helper in the Visit section that validates
  the date/guests and opens WhatsApp with the enquiry pre-filled. Nothing
  is stored on the website.
- **Quick actions** — copy-address button and a
  back-to-top button (appears after scrolling); the mobile menu closes on Escape or on resize to
  desktop.

## Automated browser tests

```bash
npx playwright install
npm test
```

The dev server is started automatically by Playwright (and reused if one
is already running on port 3000). Current coverage includes:

- Mobile menu open/close, Escape and section navigation (mobile project)
- Gallery lightbox open, next/previous (buttons and arrow keys), Escape
- Core contact and direction link validity
- Menu search / Veg-only / category filtering, featured-card filtering
- Visit planner validation and WhatsApp link generation
- `/api/health` always answering JSON, and every food image loading

## Content ownership and verification checklist

Before publishing live, owner should verify:

1. Business name format and preferred capitalization
2. Final approved address line format
3. Phone and WhatsApp number
4. Swiggy and Zomato exact listing URLs
5. Daily opening hours
6. Final menu item-level names and prices
7. Owner-approved food and restaurant photography
8. Final production domain in `NEXT_PUBLIC_SITE_URL`

## Image system

- Food photographs live in `public/images/menu/` (one photograph per
  dish or per genuinely equivalent dish group), with hero, About and
  gallery imagery in `public/images/`.
- `src/config/menu-images.ts` is the central image manifest: it maps
  every printed-menu dish name to its photograph, defines the
  category thumbnails used by the menu dropdowns, and curates the
  photo gallery. All components resolve images through this manifest
  (`getMenuImage`, `getCategoryImage`, `getMenuImageAlt`).
- `npm run verify:images` audits the manifest against the menu data
  and the files on disk (coverage, missing files, orphans, dietary
  mismatches). `npm run docs:images` regenerates the auditable
  `docs/IMAGE-MANIFEST.md`.
- Photographs are realistic restaurant-style shots; replace with
  owner-approved/licensed photos before final public launch if
  preferred.

## Maintenance notes

- Update all business data from `src/config/site.ts` (single source of truth)
- Keep links and contact details synced from the same config
- Avoid adding unverified claims (awards, ratings, testimonials)
- Re-run build and tests after any content or layout updates
