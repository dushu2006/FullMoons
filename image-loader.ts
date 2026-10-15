// Used only for the static GitHub Pages export (see next.config.ts):
// next/image would otherwise emit "/images/…" URLs that miss the
// subpath the project site is served from.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "/FullMoons";

export default function imageLoader({ src }: { src: string }): string {
  return src.startsWith("/") ? `${basePath}${src}` : src;
}
