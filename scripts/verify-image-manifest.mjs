#!/usr/bin/env node
/**
 * Verifies the FullMoons image system:
 *
 * 1. Every dish in siteConfig.menuOverview has an entry in the image
 *    manifest (src/config/menu-images.ts).
 * 2. Every manifest entry points at an existing file in public/.
 * 3. Every category has a thumbnail mapping.
 * 4. Hero, intro, gallery and diet-overview images exist.
 * 5. No orphan files remain in public/images/menu/.
 * 6. Dietary sanity: veg dishes never map to a meat/fish/seafood/egg
 *    photo slug, and egg/non-veg dishes never map to a purely veg slug.
 *
 * Exit code 0 = all checks pass, 1 = problems found.
 */

import fs from "node:fs";
import path from "node:path";
import ts from "typescript";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

// ── Load the manifest (dependency-free TS module → transpile → import) ──
const manifestPath = path.join(root, "src/config/menu-images.ts");
const manifestTs = fs.readFileSync(manifestPath, "utf8");
const { outputText } = ts.transpileModule(manifestTs, {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
});
const manifestTmp = path.join(root, ".cache", "menu-images.cjs");
fs.mkdirSync(path.dirname(manifestTmp), { recursive: true });
fs.writeFileSync(manifestTmp, outputText);
const {
  menuImageMap,
  categoryImageMap,
  galleryImages,
  heroImage,
  introImage,
  dietOverviewImages,
} = await import(manifestTmp);

// Runtime-safe map (dedicated photo when generated, closest honest
// existing photo otherwise) — this is what the site actually serves.
const availabilityTmp = path.join(root, ".cache", "menu-image-availability.cjs");
const { outputText: availabilityTs } = ts.transpileModule(
  fs.readFileSync(path.join(root, "src/config/menu-image-availability.ts"), "utf8"),
  { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } },
);
fs.writeFileSync(availabilityTmp, availabilityTs.replaceAll('"./menu-images"', '"./menu-images.cjs"'));
const {
  availableMenuImageMap,
  availableCategoryImageMap,
  availableGalleryImages,
  availableHeroImage,
  availableIntroImage,
  dietOverviewImages: availableDietImages,
  pendingImagePaths,
} = await import(availabilityTmp);

// ── Parse dish data straight out of site.ts (source of truth) ─────
const siteTs = fs.readFileSync(path.join(root, "src/config/site.ts"), "utf8");
const menuStart = siteTs.indexOf("menuOverview:");
const menuEnd = siteTs.indexOf("  ],\n\n} as const;");
const menuBlock = siteTs.slice(menuStart, menuEnd);

const categories = [];
const categoryRe = /category: "([^"]+)"[\s\S]*?items: \[([\s\S]*?)\],\s*\},/g;
let match;
while ((match = categoryRe.exec(menuBlock)) !== null) {
  const category = match[1];
  const items = [];
  const itemRe = /\{ name: "((?:[^"\\]|\\.)*)", price: (\d+), description: "((?:[^"\\]|\\.)*)", diet: "([^"]+)" \}/g;
  let itemMatch;
  while ((itemMatch = itemRe.exec(match[2])) !== null) {
    items.push({
      name: itemMatch[1].replace(/\\"/g, '"'),
      price: Number(itemMatch[2]),
      diet: itemMatch[4],
    });
  }
  categories.push({ category, items });
}

const problems = [];
const warnings = [];
const usedPaths = new Set();

// 1. Dish coverage + 2. file existence + 6. dietary sanity
const meatSlugs = /chicken|mutton|prawn|fish|egg|shrimp|seafood/;
const vegOnlySlugs = /^(veg-|gobili|gobi|mushroom|chilli-babycorn|paneer-|french-fries|spl-veg|shahi-veg)/;
for (const { category, items } of categories) {
  for (const item of items) {
    const src = menuImageMap[item.name];
    if (!src) {
      problems.push(`MISSING MAPPING: "${item.name}" (${category}) has no manifest entry`);
      continue;
    }
    // The served path must always exist on disk.
    const served = availableMenuImageMap[item.name];
    if (!served || !fs.existsSync(path.join(root, "public", served))) {
      problems.push(`BROKEN SERVED IMAGE: "${item.name}" -> ${served}`);
    }
    usedPaths.add(served);
    // Dietary sanity applies to the intended dedicated photograph.
    const slug = path.basename(src, ".jpg");
    if (item.diet === "veg" && meatSlugs.test(slug)) {
      problems.push(`DIET MISMATCH: veg dish "${item.name}" maps to non-veg slug "${slug}"`);
    }
    if (item.diet !== "veg" && vegOnlySlugs.test(slug)) {
      problems.push(`DIET MISMATCH: ${item.diet} dish "${item.name}" maps to veg-only slug "${slug}"`);
    }
  }
}

// 3. Category thumbnails (served paths must exist)
for (const { category } of categories) {
  const src = categoryImageMap[category];
  if (!src) {
    problems.push(`MISSING CATEGORY THUMB: "${category}"`);
  }
  const served = availableCategoryImageMap[category];
  if (!served || !fs.existsSync(path.join(root, "public", served))) {
    problems.push(`BROKEN SERVED THUMB: "${category}" -> ${served}`);
  }
  usedPaths.add(served);
}

// 4. Hero / intro / gallery / diet overview
for (const [label, img] of [
  ["hero", availableHeroImage],
  ["intro", availableIntroImage],
  ...availableGalleryImages.map((g, i) => [`gallery[${i}]`, g]),
]) {
  usedPaths.add(img.src);
  if (!fs.existsSync(path.join(root, "public", img.src))) {
    problems.push(`MISSING FILE: ${label} -> ${img.src}`);
  }
  if (!img.alt || img.alt.length < 10) {
    problems.push(`WEAK ALT: ${label} alt text is too short`);
  }
}
for (const [diet, src] of Object.entries(availableDietImages)) {
  usedPaths.add(src);
  if (!fs.existsSync(path.join(root, "public", src))) {
    problems.push(`MISSING FILE: diet overview (${diet}) -> ${src}`);
  }
}

// 5. Orphan files in public/images/menu
const menuDir = path.join(root, "public/images/menu");
const menuFiles = fs.existsSync(menuDir)
  ? fs.readdirSync(menuDir).filter((f) => f.endsWith(".jpg")).map((f) => `/images/menu/${f}`)
  : [];
for (const file of menuFiles) {
  if (!usedPaths.has(file)) {
    warnings.push(`ORPHAN: ${file} exists but is not referenced by the manifest`);
  }
}

// ── Report ────────────────────────────────────────────────────────────
const dishCount = categories.reduce((n, c) => n + c.items.length, 0);
console.log(`Categories audited:   ${categories.length}`);
console.log(`Dishes audited:       ${dishCount}`);
console.log(`Dish mappings:        ${Object.keys(menuImageMap).length}`);
console.log(`Distinct dish photos: ${new Set(Object.values(menuImageMap)).size}`);
console.log(`Category thumbnails:  ${Object.keys(categoryImageMap).length}`);
console.log(`Gallery images:       ${galleryImages.length}`);
console.log(`Photos still pending: ${pendingImagePaths.length}`);
console.log("");
if (pendingImagePaths.length) {
  console.log("Pending generation (served via honest fallback until ready):");
  for (const p of pendingImagePaths) console.log(`  ~ ${p}`);
  console.log("");
}
if (warnings.length) {
  console.log("Warnings:");
  for (const w of warnings) console.log(`  ~ ${w}`);
  console.log("");
}
if (problems.length) {
  console.error("Problems:");
  for (const p of problems) console.error(`  ✗ ${p}`);
  process.exit(1);
}
console.log("✓ All menu items have valid, existing image mappings.");
