#!/usr/bin/env node
/**
 * Optimises generated photographs for the web:
 * - Dish thumbnails (public/images/menu/): max 640px wide, q80
 *   (they display at ~238–476px, so 640px covers 2x DPR)
 * - Section imagery (public/images/*.jpg): max 1280px wide, q82
 * Writes files in place. Run after generating a batch:
 *   node scripts/optimize-images.mjs
 */

import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

async function processFile(file, maxWidth, quality) {
  const abs = path.join(root, "public", file);
  const before = fs.statSync(abs).size;
  const buffer = await sharp(abs)
    .rotate()
    .resize({ width: maxWidth, withoutEnlargement: true })
    .jpeg({ quality, mozjpeg: true })
    .toBuffer();
  fs.writeFileSync(abs, buffer);
  const after = fs.statSync(abs).size;
  console.log(`${file}: ${(before / 1024).toFixed(0)}KB → ${(after / 1024).toFixed(0)}KB`);
}

const menuDir = path.join(root, "public/images/menu");
const menuFiles = fs.existsSync(menuDir)
  ? fs.readdirSync(menuDir).filter((f) => f.endsWith(".jpg")).map((f) => `/images/menu/${f}`)
  : [];

const sectionFiles = [
  "/images/hero-biryani.jpg",
  "/images/intro-platter.jpg",
  "/images/gallery-interior.jpg",
  "/images/gallery-veg-thali.jpg",
  "/images/gallery-tandoor.jpg",
].filter((f) => fs.existsSync(path.join(root, "public", f)));

for (const file of menuFiles) {
  await processFile(file, 640, 80);
}
for (const file of sectionFiles) {
  await processFile(file, 1280, 82);
}
console.log(`Done: ${menuFiles.length} dish photos, ${sectionFiles.length} section photos.`);
