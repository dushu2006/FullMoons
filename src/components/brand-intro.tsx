"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { brandArtwork } from "@/components/brand-artwork";

const COMPLETED_KEY = "fullmoons:brand-intro:complete:v1";
const LOGO_SRC = "/images/full-moons-logo.png";

const TIMING = {
  pointIn: 220,
  lotusDraw: 1_450,
  lotusFill: 140,
  moonApproach: 90,
  moonDraw: 760,
  moonFill: 120,
  markTravel: 220,
  fullLogoReveal: 410,
  logoHold: 200,
  headerTravel: 1_130,
} as const;

type Point = { x: number; y: number };
type Rect = { left: number; top: number; width: number; height: number };
type RoutePath = {
  kind: "path";
  element: SVGPathElement;
  length: number;
  start: Point;
  end: Point;
};
type RouteMove = { kind: "move"; length: number; start: Point; end: Point };
type RouteSegment = RoutePath | RouteMove;
type Route = {
  segments: RouteSegment[];
  length: number;
  start: Point;
  end: Point;
};

function clamp(value: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

function easeInOutCubic(value: number) {
  const progress = clamp(value);
  return progress < 0.5 ? 4 * progress ** 3 : 1 - (-2 * progress + 2) ** 3 / 2;
}

function pointDistance(start: Point, end: Point) {
  return Math.hypot(end.x - start.x, end.y - start.y);
}

function createRoute(elements: Array<SVGPathElement | null>): Route | null {
  const segments: RouteSegment[] = [];
  let previous: Point | null = null;

  for (const element of elements) {
    if (!element) continue;

    const length = element.getTotalLength();
    if (!Number.isFinite(length) || length <= 0) continue;

    const startAt = element.getPointAtLength(0);
    const endAt = element.getPointAtLength(length);
    const start = { x: startAt.x, y: startAt.y };
    const end = { x: endAt.x, y: endAt.y };

    element.style.strokeDasharray = `${length} ${length}`;
    element.style.strokeDashoffset = `${length}`;
    element.style.opacity = "0";

    if (previous) {
      const distance = pointDistance(previous, start);
      if (distance > 0.01) {
        segments.push({
          kind: "move",
          length: distance,
          start: previous,
          end: start,
        });
      }
    }

    segments.push({ kind: "path", element, length, start, end });
    previous = end;
  }

  const length = segments.reduce((total, segment) => total + segment.length, 0);
  const first = segments[0];
  const last = segments[segments.length - 1];

  if (!first || !last || length <= 0) return null;

  return {
    segments,
    length,
    start: first.start,
    end: last.end,
  };
}

function drawRoute(
  route: Route,
  progress: number,
  dot: SVGCircleElement | null,
) {
  let remaining = clamp(progress) * route.length;
  let currentPoint = route.start;

  for (const segment of route.segments) {
    const travelled = clamp(remaining, 0, segment.length);

    if (segment.kind === "path") {
      segment.element.style.strokeDashoffset = `${segment.length - travelled}`;
      segment.element.style.opacity = travelled > 0 ? "1" : "0";

      if (remaining <= segment.length) {
        const point = segment.element.getPointAtLength(travelled);
        currentPoint = { x: point.x, y: point.y };
      } else {
        currentPoint = segment.end;
      }
    } else {
      const moveProgress =
        segment.length === 0 ? 1 : travelled / segment.length;
      currentPoint = {
        x: segment.start.x + (segment.end.x - segment.start.x) * moveProgress,
        y: segment.start.y + (segment.end.y - segment.start.y) * moveProgress,
      };
    }

    remaining -= segment.length;
    if (remaining <= 0) break;
  }

  if (dot) {
    dot.setAttribute("cx", `${currentPoint.x}`);
    dot.setAttribute("cy", `${currentPoint.y}`);
  }
}

function setRect(element: HTMLElement | SVGSVGElement, rect: Rect) {
  element.style.left = `${rect.left}px`;
  element.style.top = `${rect.top}px`;
  element.style.width = `${rect.width}px`;
  element.style.height = `${rect.height}px`;
  element.style.transform = "none";
}

function readRect(element: Element): Rect {
  const rect = element.getBoundingClientRect();
  return {
    left: rect.left,
    top: rect.top,
    width: rect.width,
    height: rect.height,
  };
}

function interpolateRect(start: Rect, end: Rect, progress: number): Rect {
  return {
    left: start.left + (end.left - start.left) * progress,
    top: start.top + (end.top - start.top) * progress,
    width: start.width + (end.width - start.width) * progress,
    height: start.height + (end.height - start.height) * progress,
  };
}

function hasCompletedIntro() {
  try {
    return window.sessionStorage.getItem(COMPLETED_KEY) === "1";
  } catch {
    return false;
  }
}

function rememberCompletion() {
  try {
    window.sessionStorage.setItem(COMPLETED_KEY, "1");
  } catch {
    // Storage can be disabled; this page still completes idempotently in memory.
  }
}

export function BrandIntro() {
  const [visible, setVisible] = useState(true);
  const overlayRef = useRef<HTMLDivElement>(null);
  const skipButtonRef = useRef<HTMLButtonElement>(null);
  const artworkRef = useRef<SVGSVGElement>(null);
  const lotusFillRef = useRef<SVGImageElement>(null);
  const moonFillRef = useRef<SVGImageElement>(null);
  const lotusPathRefs = useRef<Array<SVGPathElement | null>>([]);
  const moonPathRefs = useRef<Array<SVGPathElement | null>>([]);
  const dotRef = useRef<SVGCircleElement>(null);
  const haloRef = useRef<SVGCircleElement>(null);
  const fullLogoRef = useRef<HTMLImageElement>(null);
  const finishRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    const overlay = overlayRef.current;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (hasCompletedIntro() || reducedMotion.matches) {
      rememberCompletion();
      if (overlay) overlay.style.display = "none";
      return;
    }

    const artwork = artworkRef.current;
    const fullLogo = fullLogoRef.current;
    const skipButton = skipButtonRef.current;
    const lotusFill = lotusFillRef.current;
    const moonFill = moonFillRef.current;
    const dot = dotRef.current;
    const halo = haloRef.current;
    const headerLogo = document.querySelector<HTMLElement>("[data-brand-logo]");
    const body = document.body;
    const pageElements = Array.from(body.children).filter(
      (element) =>
        element !== overlay &&
        !["SCRIPT", "STYLE", "NOSCRIPT"].includes(element.tagName) &&
        !element.contains(overlay),
    );

    if (!overlay || !artwork || !fullLogo || !skipButton || !headerLogo) {
      rememberCompletion();
      if (overlay) overlay.style.display = "none";
      return;
    }

    let frame = 0;
    let failSafe = 0;
    let finished = false;
    const root = document.documentElement;
    const originalOverflow = root.style.overflow;
    const originalPaddingRight = body.style.paddingRight;
    const originalInert = pageElements.map((element) => ({
      element,
      inert: element.hasAttribute("inert"),
    }));
    const hadRunningClass = body.classList.contains("brand-intro-running");
    const scrollbarWidth = Math.max(0, window.innerWidth - root.clientWidth);

    const restorePage = () => {
      root.style.overflow = originalOverflow;
      body.style.paddingRight = originalPaddingRight;
      for (const { element, inert } of originalInert) {
        if (inert) element.setAttribute("inert", "");
        else element.removeAttribute("inert");
      }
      if (!hadRunningClass) body.classList.remove("brand-intro-running");
    };

    const finish = () => {
      if (finished) return;
      finished = true;
      window.cancelAnimationFrame(frame);
      window.clearTimeout(failSafe);
      rememberCompletion();
      restorePage();
      setVisible(false);

      if (document.activeElement === skipButton) {
        document
          .querySelector<HTMLElement>("[data-brand-logo-link]")
          ?.focus({ preventScroll: true });
      }
    };

    finishRef.current = finish;

    const animate = (startTime: number) => {
      const lotusRoute = createRoute(lotusPathRefs.current);
      const moonRoute = createRoute(moonPathRefs.current);

      if (!lotusRoute || !moonRoute) {
        finish();
        return;
      }

      const lotusStart = startTime + TIMING.pointIn;
      const lotusEnd = lotusStart + TIMING.lotusDraw;
      const lotusFillEnd = lotusEnd + TIMING.lotusFill;
      const moonApproachEnd = lotusFillEnd + TIMING.moonApproach;
      const moonEnd = moonApproachEnd + TIMING.moonDraw;
      const moonFillEnd = moonEnd + TIMING.moonFill;
      const markTravelStart = moonFillEnd;
      const markTravelEnd = markTravelStart + TIMING.markTravel;
      const logoRevealEnd = markTravelEnd + TIMING.fullLogoReveal;
      const logoHoldEnd = logoRevealEnd + TIMING.logoHold;
      const flightEnd = logoHoldEnd + TIMING.headerTravel;
      const firstMoonPoint = moonRoute.start;
      let artworkStartRect: Rect | null = null;
      let flightStartRect: Rect | null = null;

      const renderFrame = (now: number) => {
        if (finished) return;

        const pointOpacity = clamp((now - startTime) / TIMING.pointIn);
        if (dot) dot.style.opacity = `${pointOpacity}`;
        if (halo) halo.style.opacity = `${pointOpacity * 0.34}`;

        if (now >= lotusStart && now < lotusEnd) {
          drawRoute(lotusRoute, (now - lotusStart) / TIMING.lotusDraw, dot);
        } else if (now >= lotusEnd) {
          drawRoute(lotusRoute, 1, dot);
        }

        const lotusFillProgress = clamp((now - lotusEnd) / TIMING.lotusFill);
        if (lotusFill) lotusFill.style.opacity = `${lotusFillProgress}`;
        if (now >= lotusEnd) {
          for (const path of lotusPathRefs.current) {
            if (path) path.style.opacity = `${1 - lotusFillProgress}`;
          }
        }

        if (now >= lotusFillEnd && now < moonApproachEnd) {
          const approach = easeInOutCubic(
            (now - lotusFillEnd) / TIMING.moonApproach,
          );
          const x =
            lotusRoute.end.x + (firstMoonPoint.x - lotusRoute.end.x) * approach;
          const y =
            lotusRoute.end.y + (firstMoonPoint.y - lotusRoute.end.y) * approach;
          if (dot) {
            dot.setAttribute("cx", `${x}`);
            dot.setAttribute("cy", `${y}`);
          }
        }

        if (now >= moonApproachEnd && now < moonEnd) {
          drawRoute(moonRoute, (now - moonApproachEnd) / TIMING.moonDraw, dot);
        } else if (now >= moonEnd) {
          drawRoute(moonRoute, 1, dot);
        }

        const moonFillProgress = clamp((now - moonEnd) / TIMING.moonFill);
        if (moonFill) moonFill.style.opacity = `${moonFillProgress}`;
        if (now >= moonEnd) {
          for (const path of moonPathRefs.current) {
            if (path) path.style.opacity = `${1 - moonFillProgress}`;
          }
        }

        if (now >= moonFillEnd && now < markTravelEnd) {
          const fade = 1 - (now - moonFillEnd) / TIMING.markTravel;
          if (dot) dot.style.opacity = `${pointOpacity * fade}`;
          if (halo) halo.style.opacity = `${pointOpacity * fade * 0.34}`;
        }

        if (now >= markTravelStart) {
          const logoRect = readRect(fullLogo);
          const cropRect: Rect = {
            left:
              logoRect.left +
              (brandArtwork.markCrop.x / brandArtwork.source.width) *
                logoRect.width,
            top:
              logoRect.top +
              (brandArtwork.markCrop.y / brandArtwork.source.height) *
                logoRect.height,
            width:
              (brandArtwork.markCrop.width / brandArtwork.source.width) *
              logoRect.width,
            height:
              (brandArtwork.markCrop.height / brandArtwork.source.height) *
              logoRect.height,
          };
          artworkStartRect ??= readRect(artwork);

          if (now < markTravelEnd) {
            const progress = easeInOutCubic(
              (now - markTravelStart) / TIMING.markTravel,
            );
            setRect(
              artwork,
              interpolateRect(artworkStartRect, cropRect, progress),
            );
            fullLogo.style.opacity = "1";
            fullLogo.style.clipPath = `circle(0% at ${((brandArtwork.logoLotusCenter.x / brandArtwork.source.width) * 100).toFixed(3)}% ${((brandArtwork.logoLotusCenter.y / brandArtwork.source.height) * 100).toFixed(3)}%)`;
            artwork.style.opacity = "1";
          } else if (now < logoRevealEnd) {
            const reveal = easeInOutCubic(
              (now - markTravelEnd) / TIMING.fullLogoReveal,
            );
            const radius = 160 * reveal;
            setRect(artwork, cropRect);
            fullLogo.style.opacity = "1";
            fullLogo.style.clipPath = `circle(${radius.toFixed(2)}% at ${((brandArtwork.logoLotusCenter.x / brandArtwork.source.width) * 100).toFixed(3)}% ${((brandArtwork.logoLotusCenter.y / brandArtwork.source.height) * 100).toFixed(3)}%)`;
            artwork.style.opacity = `${1 - reveal}`;
          } else {
            setRect(artwork, cropRect);
            fullLogo.style.opacity = "1";
            fullLogo.style.clipPath = "none";
            artwork.style.opacity = "0";
          }

          if (now >= logoHoldEnd) {
            const progress = clamp((now - logoHoldEnd) / TIMING.headerTravel);
            const eased = easeInOutCubic(progress);
            flightStartRect ??= readRect(fullLogo);
            const targetRect = readRect(headerLogo);
            setRect(
              fullLogo,
              interpolateRect(flightStartRect, targetRect, eased),
            );
            fullLogo.style.clipPath = "none";
            overlay.style.backgroundColor = `rgba(23, 23, 21, ${1 - eased})`;
            skipButton.style.opacity = `${1 - eased}`;

            if (now >= flightEnd) {
              finish();
              return;
            }
          }
        }

        frame = window.requestAnimationFrame(renderFrame);
      };

      frame = window.requestAnimationFrame(renderFrame);
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        finish();
      } else if (event.key === "Tab") {
        event.preventDefault();
        skipButton.focus({ preventScroll: true });
      }
    };

    const handleMotionChange = () => {
      if (reducedMotion.matches) finish();
    };
    const supportsMediaQueryEvents =
      typeof reducedMotion.addEventListener === "function";

    root.style.overflow = "hidden";
    if (scrollbarWidth > 0) body.style.paddingRight = `${scrollbarWidth}px`;
    for (const element of pageElements) element.setAttribute("inert", "");
    body.classList.add("brand-intro-running");
    skipButton.focus({ preventScroll: true });

    window.addEventListener("keydown", handleKeyDown);
    if (supportsMediaQueryEvents) {
      reducedMotion.addEventListener("change", handleMotionChange);
    } else {
      reducedMotion.addListener(handleMotionChange);
    }

    const startTime = performance.now();
    failSafe = window.setTimeout(finish, 6_500);
    frame = window.requestAnimationFrame(() => {
      try {
        animate(startTime);
      } catch {
        finish();
      }
    });

    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(failSafe);
      window.removeEventListener("keydown", handleKeyDown);
      if (supportsMediaQueryEvents) {
        reducedMotion.removeEventListener("change", handleMotionChange);
      } else {
        reducedMotion.removeListener(handleMotionChange);
      }
      restorePage();
      if (finishRef.current === finish) finishRef.current = null;
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      ref={overlayRef}
      className="brand-intro"
      role="dialog"
      aria-modal="true"
      aria-label="FULL MOONs Family Restaurant logo introduction"
      data-brand-intro
    >
      <button
        ref={skipButtonRef}
        type="button"
        className="brand-intro-skip"
        onClick={() => finishRef.current?.()}
      >
        Skip intro
      </button>

      <svg
        ref={artworkRef}
        className="brand-intro-artwork"
        viewBox={brandArtwork.markViewBox}
        width="246"
        height="270"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <mask
            id="brand-intro-lotus-mask"
            maskUnits="userSpaceOnUse"
            x="0"
            y="0"
            width="1200"
            height="355"
          >
            <rect width="1200" height="355" fill="black" />
            <rect {...brandArtwork.lotusReveal} fill="white" />
          </mask>
          <mask
            id="brand-intro-moon-mask"
            maskUnits="userSpaceOnUse"
            x="0"
            y="0"
            width="1200"
            height="355"
          >
            <rect width="1200" height="355" fill="black" />
            {brandArtwork.moonPaths.map((path) => (
              <path key={path.name} d={path.d} fill="white" />
            ))}
          </mask>
          <filter
            id="brand-intro-dot-glow"
            x="-100%"
            y="-100%"
            width="300%"
            height="300%"
          >
            <feGaussianBlur stdDeviation="2.2" />
          </filter>
        </defs>

        <image
          ref={lotusFillRef}
          href={LOGO_SRC}
          x="0"
          y="0"
          width={brandArtwork.source.width}
          height={brandArtwork.source.height}
          mask="url(#brand-intro-lotus-mask)"
          opacity="0"
          preserveAspectRatio="none"
        />
        <image
          ref={moonFillRef}
          href={LOGO_SRC}
          x="0"
          y="0"
          width={brandArtwork.source.width}
          height={brandArtwork.source.height}
          mask="url(#brand-intro-moon-mask)"
          opacity="0"
          preserveAspectRatio="none"
        />

        {brandArtwork.lotusPaths.map((path, index) => (
          <path
            key={path.name}
            ref={(element) => {
              lotusPathRefs.current[index] = element;
            }}
            d={path.d}
            fill="none"
            stroke="#d7b477"
            strokeWidth={path.strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0"
          />
        ))}
        {brandArtwork.moonPaths.map((path, index) => (
          <path
            key={path.name}
            ref={(element) => {
              moonPathRefs.current[index] = element;
            }}
            d={path.d}
            fill="none"
            stroke="#d7b477"
            strokeWidth={path.strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0"
          />
        ))}

        <circle
          ref={haloRef}
          cx={862}
          cy={103}
          r={4.4}
          fill="#d7b477"
          opacity="0"
          filter="url(#brand-intro-dot-glow)"
        />
        <circle
          ref={dotRef}
          cx={862}
          cy={103}
          r={1.7}
          fill="#f3d18a"
          opacity="0"
        />
      </svg>

      <Image
        ref={fullLogoRef}
        src={LOGO_SRC}
        alt=""
        aria-hidden="true"
        width={brandArtwork.source.width}
        height={brandArtwork.source.height}
        sizes="(max-width: 1100px) 88vw, 980px"
        unoptimized
        draggable={false}
        className="brand-intro-full-logo"
        data-brand-intro-logo
        onError={() => finishRef.current?.()}
      />
    </div>
  );
}
