#!/usr/bin/env node
/**
 * Generates docs/IMAGE-MANIFEST.md — the auditable image manifest —
 * directly from the menu data (src/config/site.ts) and the image
 * manifest (src/config/menu-images.ts), so the documentation can
 * never drift from the code. Run: npm run docs:images
 */

import fs from "node:fs";
import path from "node:path";
import ts from "typescript";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

function loadModule(file) {
  const source = fs.readFileSync(path.join(root, file), "utf8");
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
  });
  const tmp = path.join(root, ".cache", path.basename(file, ".ts") + ".cjs");
  fs.mkdirSync(path.dirname(tmp), { recursive: true });
  fs.writeFileSync(tmp, outputText);
  return import(tmp);
}

const { menuImageMap, categoryImageMap, galleryImages, heroImage, introImage, dishImagePairs } =
  await loadModule("src/config/menu-images.ts");

// Parse site.ts menu data
const siteTs = fs.readFileSync(path.join(root, "src/config/site.ts"), "utf8");
const menuBlock = siteTs.slice(siteTs.indexOf("menuOverview:"), siteTs.indexOf("  ],\n\n} as const;"));
const categories = [];
const categoryRe = /category: "([^"]+)"[\s\S]*?items: \[([\s\S]*?)\],\s*\},/g;
let match;
while ((match = categoryRe.exec(menuBlock)) !== null) {
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
  categories.push({ category: match[1], items });
}

// Photo → dishes using it (shared groups)
const slugToDishes = new Map();
for (const [dish, slug] of dishImagePairs) {
  if (!slugToDishes.has(slug)) slugToDishes.set(slug, []);
  slugToDishes.get(slug).push(dish);
}

const exists = (p) => fs.existsSync(path.join(root, "public", p));
const slugOf = (src) => path.basename(src, ".jpg");

let md = "";
md += "# FULL MOONs — Image Manifest\n\n";
md += `Generated on ${new Date().toISOString()} by \`scripts/build-image-manifest-docs.mjs\` from the live menu data. `;
md += "This document is the auditable record of every photograph on the website and the dish it represents.\n\n";

md += "## Section imagery\n\n";
md += "| Location | File | Subject | Status |\n|---|---|---|---|\n";
md += `| Homepage hero | ${heroImage.src} | ${heroImage.alt} | ${exists(heroImage.src) ? "✅ generated" : "⏳ pending"} |\n`;
md += `| About section | ${introImage.src} | ${introImage.alt} | ${exists(introImage.src) ? "✅ generated" : "⏳ pending"} |\n`;
for (const g of galleryImages) {
  md += `| Gallery tile | ${g.src} | ${g.alt} | ${exists(g.src) ? "✅ generated" : "⏳ pending"} |\n`;
}
md += "\n> While a photograph is pending generation, the affected dish card shows the closest existing photograph from the same category (see `src/config/menu-image-availability.ts`), so no dish card is ever broken or misrepresented as a different dish.\n";
md += "\n## Category thumbnails (menu dropdowns)\n\n";
md += "| Category | Thumbnail | Status |\n|---|---|---|\n";
for (const { category } of categories) {
  const src = categoryImageMap[category];
  md += `| ${category} | ${src} | ${exists(src) ? "✅" : "⏳ pending"} |\n`;
}
md += "\n## Dish-by-dish assignments\n\n";
let pending = 0;
for (const { category, items } of categories) {
  md += `### ${category}\n\n`;
  md += "| Dish | Diet | Price | Photograph | Status |\n|---|---|---|---|---|\n";
  for (const item of items) {
    const src = menuImageMap[item.name];
    const ok = exists(src);
    if (!ok) pending++;
    const shared = slugToDishes.get(slugOf(src)).length > 1 ? " (shared group)" : "";
    md += `| ${item.name} | ${item.diet} | ₹${item.price} | \`${path.basename(src)}\`${shared} | ${ok ? "✅" : "⏳ pending"} |\n`;
  }
  md += "\n";
}

md += "## Shared photograph groups\n\n";
md += "These dishes are genuinely equivalent presentations of the same preparation, so they share one photograph rather than near-duplicate shots:\n\n";
for (const [slug, dishes] of [...slugToDishes.entries()].filter(([, d]) => d.length > 1)) {
  md += `- **${slug}.jpg** — ${dishes.join(", ")}\n`;
}
md += "\n## Coverage summary\n\n";
const totalDishes = categories.reduce((n, c) => n + c.items.length, 0);
const distinctPhotos = new Set(Object.values(menuImageMap)).size;
md += `- Menu dishes: **${totalDishes}**\n`;
md += `- Dishes with a manifest mapping: **${Object.keys(menuImageMap).length}**\n`;
md += `- Distinct dish photographs: **${distinctPhotos}**\n`;
md += `- Photographs still to generate: **${pending}**\n`;

fs.mkdirSync(path.join(root, "docs"), { recursive: true });
fs.writeFileSync(path.join(root, "docs/IMAGE-MANIFEST.md"), md);
console.log(`Wrote docs/IMAGE-MANIFEST.md (${totalDishes} dishes, ${distinctPhotos} distinct photos, ${pending} pending)`);
