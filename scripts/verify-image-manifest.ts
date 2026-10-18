// Audits the central image manifest against the menu data and the
// filesystem, and writes an auditable coverage report.
// Run with: npx tsx scripts/verify-image-manifest.ts
//
// Checks:
//   1. Every menu item resolves to an image file that exists on disk.
//   2. Every category thumbnail resolves to an existing file.
//   3. Section, gallery and OG images exist.
//   4. Dietary safety: vegetarian dishes never reference a photograph
//      of meat, fish, seafood or egg.
//   5. Reports dedicated vs shared photograph coverage.

import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { siteConfig } from "../src/config/site";
import {
  menuImageMap,
  categoryImageMap,
  sectionImages,
  galleryTiles,
  galleryImages,
  getMenuImage,
} from "../src/config/images";

const publicDir = join(process.cwd(), "public");
let failures = 0;
let warnings = 0;

const fail = (msg: string) => {
  failures++;
  console.log(`  ✗ FAIL  ${msg}`);
};
const warn = (msg: string) => {
  warnings++;
  console.log(`  ⚠ warn  ${msg}`);
};
const ok = (msg: string) => console.log(`  ✓ ${msg}`);

console.log("FULL MOONs — image manifest verification\n");

// Per-dish audit rows, used for the coverage report.
const auditRows: Array<{
  category: string;
  dish: string;
  diet: string;
  price: number | undefined;
  image: string;
  status: "DEDICATED" | "SHARED";
}> = [];

console.log("1) Every menu item resolves to an existing image file");
const usedImages = new Set<string>();
let dishCount = 0;

for (const category of siteConfig.menuOverview) {
  for (const item of category.items) {
    dishCount++;
    const src = getMenuImage(item.name, category.category, item.diet);
    if (!menuImageMap[item.name]) {
      warn(`"${item.name}" not in explicit manifest (used fallback)`);
    }
    usedImages.add(src);
    if (!existsSync(join(publicDir, src))) {
      fail(`missing file for "${item.name}" -> ${src}`);
    }
    const dedicated =
      src.startsWith("/images/menu/") || src.startsWith("/images/sections/");
    auditRows.push({
      category: category.category,
      dish: item.name,
      diet: item.diet,
      price: item.price,
      image: src,
      status: dedicated ? "DEDICATED" : "SHARED",
    });
  }
}
ok(`${dishCount} menu items checked`);

console.log("\n2) Category thumbnails resolve to existing files");
for (const category of siteConfig.menuOverview) {
  const src = categoryImageMap[category.category] ?? category.image;
  if (!existsSync(join(publicDir, src))) {
    fail(`missing category image for "${category.category}" -> ${src}`);
  }
  if (!categoryImageMap[category.category]) {
    warn(`category "${category.category}" has no entry in categoryImageMap`);
  }
}
ok(`${siteConfig.menuOverview.length} categories checked`);

console.log("\n3) Section, gallery and OG images exist");
for (const [key, src] of Object.entries(sectionImages)) {
  if (!existsSync(join(publicDir, src))) fail(`missing section image ${key} -> ${src}`);
}
for (const tile of galleryTiles) {
  if (!existsSync(join(publicDir, tile.src))) fail(`missing gallery tile -> ${tile.src}`);
}
for (const img of galleryImages) {
  if (!existsSync(join(publicDir, img.src))) fail(`missing gallery image -> ${img.src}`);
}
ok("section + gallery images checked");

console.log("\n4) Dietary safety — vegetarian dishes must never show meat/fish/seafood/egg");
const nonVegImages = new RegExp(
  [
    "hero-biryani",
    "featured-starters",
    "featured-seafood",
    "intro-platter",
    "/menu/chicken-",
    "/menu/mutton-",
    "/menu/prawns-",
    "/menu/fish-",
    "egg-",
  ].join("|"),
);
let dietIssues = 0;
for (const category of siteConfig.menuOverview) {
  for (const item of category.items) {
    if (item.diet !== "veg") continue;
    const src = getMenuImage(item.name, category.category, item.diet);
    if (nonVegImages.test(src)) {
      dietIssues++;
      fail(`veg dish "${item.name}" maps to non-veg photo ${src}`);
    }
  }
}
if (dietIssues === 0) ok("no vegetarian dish references a non-vegetarian photo");

// ---- Coverage report -------------------------------------------------
const dedicated = [...usedImages].filter(
  (p) => p.startsWith("/images/menu/") || p.startsWith("/images/sections/"),
);
const sharedDishes = auditRows.filter((r) => r.status === "SHARED");

console.log("\n5) Coverage summary");
console.log(`  Menu items:                  ${dishCount}`);
console.log(`  Categories:                  ${siteConfig.menuOverview.length}`);
console.log(`  Distinct photos referenced:  ${usedImages.size}`);
console.log(`  Dedicated new photos in use: ${dedicated.length}`);
console.log(`  Shared legacy photos in use: ${usedImages.size - dedicated.length}`);
console.log(`  Dishes on a dedicated photo: ${auditRows.length - sharedDishes.length}`);
console.log(`  Dishes on a shared photo:    ${sharedDishes.length}`);

const report: string[] = [];
report.push("# FULL MOONs — image coverage report");
report.push("");
report.push(`Generated: ${new Date().toISOString()}`);
report.push("");
report.push("## Summary");
report.push("");
report.push(`| Metric | Count |`);
report.push(`|---|---|`);
report.push(`| Menu items | ${dishCount} |`);
report.push(`| Categories | ${siteConfig.menuOverview.length} |`);
report.push(`| Distinct photos referenced | ${usedImages.size} |`);
report.push(`| Dedicated new photos in use | ${dedicated.length} |`);
report.push(`| Shared legacy photos in use | ${usedImages.size - dedicated.length} |`);
report.push(`| Dishes with a dedicated photo | ${auditRows.length - sharedDishes.length} |`);
report.push(`| Dishes on a shared category photo | ${sharedDishes.length} |`);
report.push("");
report.push("## Section photographs");
report.push("");
for (const [key, src] of Object.entries(sectionImages)) {
  report.push(`- **${key}** → \`${src}\``);
}
report.push("");
report.push("## Per-dish manifest (source of truth: `src/config/images.ts`)");
report.push("");
report.push("| Category | Dish | Diet | Price | Image | Status |");
report.push("|---|---|---|---|---|---|");
for (const row of auditRows) {
  report.push(
    `| ${row.category} | ${row.dish} | ${row.diet} | ₹${row.price ?? "—"} | \`${row.image}\` | ${row.status} |`,
  );
}
report.push("");
report.push("## Dishes awaiting a dedicated photograph");
report.push("");
report.push(
  "These dishes currently resolve to the closest correct, dietary-safe sibling photograph. They are queued for dedicated generation in the next batch.",
);
report.push("");
for (const row of sharedDishes) {
  report.push(`- **${row.dish}** (${row.category}) → ${row.image}`);
}
report.push("");

const docsDir = join(process.cwd(), "docs");
if (!existsSync(docsDir)) mkdirSync(docsDir, { recursive: true });
writeFileSync(join(docsDir, "image-coverage-report.md"), report.join("\n"));
console.log("\nWrote docs/image-coverage-report.md");

console.log("");
if (failures === 0) {
  console.log(`✓ PASS — no broken references, dietary rules satisfied (${warnings} warning(s)).`);
} else {
  console.log(`✗ FAIL — ${failures} problem(s), ${warnings} warning(s).`);
  process.exit(1);
}
