// Used only for the static GitHub Pages export (see next.config.ts):
// next/image would otherwise emit "/images/…" URLs that miss the
// "/FullMoons" subpath the project site is served from.
export default function imageLoader({ src }: { src: string }): string {
  return src.startsWith("/") ? `/FullMoons${src}` : src;
}
