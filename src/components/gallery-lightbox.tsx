"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type GalleryItem = {
  src: string;
  alt: string;
};

export function GalleryLightbox({ images }: { images: readonly GalleryItem[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const lastTriggerRef = useRef<HTMLElement | null>(null);
  const touchStartX = useRef<number | null>(null);

  const goTo = (index: number) =>
    setActiveIndex(((index % images.length) + images.length) % images.length);
  const goNext = () => setActiveIndex((prev) => (prev === null ? null : (prev + 1) % images.length));
  const goPrev = () =>
    setActiveIndex((prev) => (prev === null ? null : (prev - 1 + images.length) % images.length));

  const openAt = (index: number, trigger: HTMLElement) => {
    lastTriggerRef.current = trigger;
    setActiveIndex(index);
  };

  useEffect(() => {
    if (activeIndex === null) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveIndex(null);
      if (event.key === "ArrowRight") goNext();
      if (event.key === "ArrowLeft") goPrev();
      if (event.key === "Home") setActiveIndex(0);
      if (event.key === "End") setActiveIndex(images.length - 1);
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      // Return focus to the thumbnail that opened the lightbox.
      lastTriggerRef.current?.focus();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex !== null, images.length]);

  return (
    <>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
        {images.map((image, index) => (
          <button
            key={`${image.src}-${index}`}
            type="button"
            onClick={(e) => openAt(index, e.currentTarget)}
            className="group relative overflow-hidden border border-[var(--color-border-light)] bg-[var(--color-bg-cream)] text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]"
            aria-label={`Open image ${index + 1} in gallery`}
          >
            <Image
              src={image.src}
              alt={image.alt}
              width={700}
              height={520}
              className="aspect-[4/3] h-full w-full object-cover transition duration-300 group-hover:scale-[1.02]"
              loading="lazy"
              sizes="(max-width: 768px) 50vw, 33vw"
            />
            <span className="absolute inset-x-0 bottom-0 bg-black/55 px-3 py-2 text-xs font-semibold text-white opacity-0 transition group-hover:opacity-100 group-focus-visible:opacity-100">
              View larger ⤢
            </span>
          </button>
        ))}
      </div>

      {activeIndex !== null ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Image gallery lightbox"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) setActiveIndex(null);
          }}
          onTouchStart={(e) => {
            touchStartX.current = e.touches[0]?.clientX ?? null;
          }}
          onTouchEnd={(e) => {
            if (touchStartX.current === null) return;
            const delta = (e.changedTouches[0]?.clientX ?? touchStartX.current) - touchStartX.current;
            if (delta > 40) goPrev();
            if (delta < -40) goNext();
            touchStartX.current = null;
          }}
        >
          <button
            ref={closeButtonRef}
            type="button"
            onClick={() => setActiveIndex(null)}
            className="absolute right-4 top-4 z-10 inline-flex h-11 w-11 items-center justify-center border border-white/40 bg-black/40 text-white transition hover:border-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            aria-label="Close gallery"
          >
            ✕
          </button>

          <span className="absolute left-4 top-4 bg-black/40 px-3 py-2 text-sm font-semibold text-white" aria-live="polite">
            {activeIndex + 1} / {images.length}
          </span>

          <button
            type="button"
            onClick={goPrev}
            className="absolute left-4 top-1/2 z-10 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center border border-white/40 bg-black/40 text-white transition hover:border-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            aria-label="Previous image"
          >
            ‹
          </button>

          <figure className="mx-auto max-w-5xl">
            <Image
              key={images[activeIndex].src}
              src={images[activeIndex].src}
              alt={images[activeIndex].alt}
              width={1400}
              height={920}
              className="max-h-[76vh] w-auto max-w-full object-contain"
              priority
              sizes="90vw"
            />
            <figcaption className="mt-3 text-center text-sm text-white/85">
              {images[activeIndex].alt}
              <span className="mt-1 block text-xs text-white/60">
                Use ← → keys or swipe to browse · Esc to close · click outside to close
              </span>
            </figcaption>
            <div className="mt-3 flex justify-center gap-2">
              {images.map((image, index) => (
                <button
                  key={`dot-${image.src}-${index}`}
                  type="button"
                  onClick={() => goTo(index)}
                  aria-label={`Go to image ${index + 1}`}
                  aria-current={index === activeIndex ? "true" : undefined}
                  className={`h-2.5 w-2.5 rounded-full transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white ${
                    index === activeIndex ? "bg-white" : "bg-white/40 hover:bg-white/70"
                  }`}
                />
              ))}
            </div>
          </figure>

          <button
            type="button"
            onClick={goNext}
            className="absolute right-4 top-1/2 z-10 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center border border-white/40 bg-black/40 text-white transition hover:border-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            aria-label="Next image"
          >
            ›
          </button>
        </div>
      ) : null}
    </>
  );
}
