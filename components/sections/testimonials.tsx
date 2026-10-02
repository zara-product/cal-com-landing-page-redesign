"use client";

import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import NextImage from "next/image";
import * as React from "react";
import {
  SectionEyebrow,
  SectionHeading,
} from "@/components/ui/section-heading";
import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";

// ─── Data ─────────────────────────────────────────────────────────────────────

const TESTIMONIALS = [
  {
    id: "flo",
    company: "Mintlify",
    quote:
      "More elegant than Calendly, more open than SavvyCal, Cal.com works and it feels just right.",
    name: "Flo Merian",
    role: "Product Marketing, Mintlify",
    portrait: "/avatars/testimonials/fmerian.png",
  },
  {
    id: "guillermo",
    company: "Vercel",
    quote:
      "I think Cal.com has a very good chance of creating a new category around being both great and well designed.",
    name: "Guillermo Rauch",
    role: "CEO, Vercel",
    portrait: "/avatars/testimonials/rauchg.png",
  },
  {
    id: "kent",
    company: "EpicWeb.dev",
    quote: "I just migrated from Calendly to Cal.com.",
    name: "Kent C. Dodds",
    role: "Founder, EpicWeb.dev",
    portrait: "/avatars/testimonials/kentcdodds.png",
  },
  {
    id: "aria",
    company: "Theatre.JS",
    quote:
      "Just gave it a go and it's definitely the easiest meeting I've ever scheduled!",
    name: "Aria Minaei",
    role: "CEO, Theatre.JS",
    portrait: "/avatars/testimonials/ariaminaei.png",
  },
  {
    id: "ant",
    company: "Supabase",
    quote:
      "I finally made the move to Cal.com after I couldn't find how to edit events in the Calendly dashboard.",
    name: "Ant Wilson",
    role: "Co-Founder & CTO, Supabase",
    portrait: "/avatars/testimonials/awalias.png",
  },
  {
    id: "micah",
    company: "Navi",
    quote:
      "At Navi, protecting personal health information is a non-negotiable, so choosing Cal.com for scheduling just makes sense.",
    name: "Micah Friedland",
    role: "CEO & Founder, Navi",
    portrait: null,
  },
] as const;

const COUNT = TESTIMONIALS.length; // 6

// Two clones on each side so the clone's neighbor always renders a real card.
// Layout: [clone(Ant), clone(Micah), Flo…Micah, clone(Flo), clone(Guillermo)]
// Index:        0           1         2…7          8             9
const REAL_START = 2; // index of first real slide
const REAL_END = COUNT + 1; // index of last real slide (= 7)

const SLIDES = [
  TESTIMONIALS[COUNT - 2], // 0: clone of Ant
  TESTIMONIALS[COUNT - 1], // 1: clone of Micah
  ...TESTIMONIALS, // 2–7: real slides
  TESTIMONIALS[0], // 8: clone of Flo
  TESTIMONIALS[1], // 9: clone of Guillermo
];
const SLIDE_KEYS = [
  "clone-prev-2",
  "clone-prev-1",
  ...TESTIMONIALS.map((t) => t.id),
  "clone-next-1",
  "clone-next-2",
];

// Gap wide enough to place the arrow between the neighboring card and the
// active card with clear breathing room on both sides.
const GAP = 80;
const AUTOPLAY_MS = 4500;
const SWIPE_THRESHOLD = 50;
const TILE_SIZE = 96;
const TILE_GAP = 12;
const TILE_COLS = 10;
const TILE_ROWS = 10;

// ─── TileCluster ──────────────────────────────────────────────────────────────

function tileOpacity(row: number, col: number): number {
  const v = (row * 7 + col * 13) % 17;
  if (v < 2) return 0.07;
  if (v < 5) return 0.04;
  return 0.02;
}

function tileBorder(row: number, col: number): number {
  const v = (row * 7 + col * 13) % 17;
  if (v < 2) return 0.07;
  if (v < 5) return 0.05;
  return 0.04;
}

function TileCluster() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
      style={{
        maskImage:
          "radial-gradient(ellipse 75% 85% at 100% 0%, black 10%, transparent 65%)",
        WebkitMaskImage:
          "radial-gradient(ellipse 75% 85% at 100% 0%, black 10%, transparent 65%)",
      }}
    >
      <div
        style={{
          position: "absolute",
          right: "-10%",
          top: "-25%",
          width: "70%",
          transform: "rotate(-8deg)",
          display: "grid",
          gridTemplateColumns: `repeat(${TILE_COLS}, ${TILE_SIZE}px)`,
          gap: `${TILE_GAP}px`,
        }}
      >
        {Array.from({ length: TILE_ROWS * TILE_COLS }).map((_, idx) => {
          const row = Math.floor(idx / TILE_COLS);
          const col = idx % TILE_COLS;
          return (
            <div
              key={`${row}-${col}`}
              style={{
                width: `${TILE_SIZE}px`,
                height: `${TILE_SIZE}px`,
                borderRadius: "16px",
                background: `oklch(from var(--color-inverse-foreground) l c h / ${tileOpacity(row, col)})`,
                border: `1px solid oklch(from var(--color-inverse-foreground) l c h / ${tileBorder(row, col)})`,
              }}
            />
          );
        })}
      </div>
    </div>
  );
}

// ─── PortraitSlot ─────────────────────────────────────────────────────────────
// Priority: genuine portrait image → company-name wordmark fallback.
// The wordmark fallback is intentional design, not a placeholder —
// used whenever no verified person image is available.

function PortraitSlot({
  portrait,
  name,
  company,
}: {
  portrait: string | null;
  name: string;
  company: string;
}) {
  if (portrait) {
    return (
      <NextImage
        src={portrait}
        alt={name}
        fill
        sizes="(min-width: 1024px) 200px, (min-width: 640px) 160px, 140px"
        className="object-cover"
      />
    );
  }

  return (
    <div className="flex h-full w-full items-center justify-center bg-foreground p-8">
      <span className="select-none text-center text-2xl font-bold uppercase tracking-[0.18em] text-inverse-foreground">
        {company}
      </span>
    </div>
  );
}

// ─── TestimonialsSection ──────────────────────────────────────────────────────

export function TestimonialsSection() {
  // virtualActive: position in SLIDES (0–1 = left clones, 2–7 = real, 8–9 = right clones)
  const [virtualActive, setVirtualActive] = React.useState(REAL_START);
  // animated: false during the silent snap from clone → real position
  const [animated, setAnimated] = React.useState(true);
  const [cardHovered, setCardHovered] = React.useState(false);
  const [isDragging, setIsDragging] = React.useState(false);
  const [hasFocus, setHasFocus] = React.useState(false);
  const [containerW, setContainerW] = React.useState(1440);
  const [inView, setInView] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const [ariaLive, setAriaLive] = React.useState<"off" | "polite">("off");
  const sectionRef = React.useRef<HTMLElement>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const timerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const progressRafRef = React.useRef<number | null>(null);
  const progressStartRef = React.useRef<number | null>(null);
  const dragStartX = React.useRef<number | null>(null);
  // Prevents overlapping transitions from rapid clicks / autoplay races.
  const transitioningRef = React.useRef(false);
  const prefersReducedMotion = useMediaQuery(
    "(prefers-reduced-motion: reduce)",
  );

  const isPaused = cardHovered || isDragging || hasFocus;
  // displayActive: 0–5, maps virtual position to real testimonial for pagination
  const displayActive = (virtualActive - REAL_START + COUNT) % COUNT;

  React.useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setContainerW(el.clientWidth));
    ro.observe(el);
    setContainerW(el.clientWidth);
    return () => ro.disconnect();
  }, []);

  // Pause autoplay and progress when the section is scrolled out of view.
  React.useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.1 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Autoplay — restarts whenever slide changes or pause state changes.
  // biome-ignore lint/correctness/useExhaustiveDependencies: virtualActive restarts the countdown after each slide advance
  React.useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (isPaused || prefersReducedMotion || !inView) return;
    timerRef.current = setTimeout(() => {
      if (!transitioningRef.current) {
        transitioningRef.current = true;
        // Advance to the first right-side clone at most; onTransitionEnd snaps back.
        setVirtualActive((v) => Math.min(v + 1, REAL_END + 1));
      }
    }, AUTOPLAY_MS);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [virtualActive, isPaused, prefersReducedMotion, inView]);

  // Progress fill for the active pagination dot — mirrors the autoplay timer.
  // biome-ignore lint/correctness/useExhaustiveDependencies: displayActive resets progress on each real slide change
  React.useEffect(() => {
    if (progressRafRef.current !== null) {
      cancelAnimationFrame(progressRafRef.current);
      progressRafRef.current = null;
    }
    setProgress(0);
    progressStartRef.current = null;

    if (isPaused || prefersReducedMotion || !inView) return;

    const tick = (now: number) => {
      if (progressStartRef.current === null) progressStartRef.current = now;
      const pct = Math.min(
        ((now - progressStartRef.current) / AUTOPLAY_MS) * 100,
        100,
      );
      setProgress(pct);
      if (pct < 100) {
        progressRafRef.current = requestAnimationFrame(tick);
      } else {
        progressRafRef.current = null;
      }
    };

    progressRafRef.current = requestAnimationFrame(tick);

    return () => {
      if (progressRafRef.current !== null) {
        cancelAnimationFrame(progressRafRef.current);
        progressRafRef.current = null;
      }
    };
  }, [displayActive, isPaused, prefersReducedMotion, inView]);

  // Re-enable transition on the frame after a silent snap; release the lock.
  React.useEffect(() => {
    if (!animated) {
      const id = requestAnimationFrame(() => {
        setAnimated(true);
        transitioningRef.current = false;
      });
      return () => cancelAnimationFrame(id);
    }
  }, [animated]);

  // prefersReducedMotion: snap instantly when hitting a clone boundary
  React.useEffect(() => {
    if (!prefersReducedMotion) return;
    if (virtualActive > REAL_END) {
      const offset = virtualActive - REAL_END;
      setVirtualActive(REAL_START + offset - 1);
    } else if (virtualActive < REAL_START) {
      const offset = REAL_START - virtualActive;
      setVirtualActive(REAL_END - offset + 1);
    }
  }, [virtualActive, prefersReducedMotion]);

  // Clear stale hover state when the active slide changes
  // biome-ignore lint/correctness/useExhaustiveDependencies: virtualActive triggers the reset — setCardHovered is stable
  React.useEffect(() => {
    setCardHovered(false);
  }, [virtualActive]);

  // navigate: guarded by transitioningRef so rapid clicks don't stack transitions
  const navigate = React.useCallback((delta: number) => {
    if (transitioningRef.current) return;
    transitioningRef.current = true;
    setAriaLive("polite");
    setVirtualActive((v) =>
      Math.max(0, Math.min(SLIDES.length - 1, v + delta)),
    );
  }, []);

  // Cancel the timer synchronously on mouseenter — the useEffect cleanup runs
  // after the next paint (~16ms), which is too late if the timer is about to fire.
  const handleCardMouseEnter = React.useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    setCardHovered(true);
  }, []);

  const handleCardMouseLeave = React.useCallback(() => {
    setCardHovered(false);
  }, []);

  const cardW = Math.min(860, containerW * 0.65);
  const translateX = containerW / 2 - virtualActive * (cardW + GAP) - cardW / 2;

  // Arrow centre sits exactly at the midpoint of the gap between the
  // neighbouring preview card and the active card edge.
  const arrowHalf = 24; // half of 48px hit target
  const arrowOutset = cardW / 2 + GAP / 2; // midpoint of the gap
  const leftArrowLeft = Math.max(8, containerW / 2 - arrowOutset - arrowHalf);
  const rightArrowLeft = Math.min(
    containerW - 8 - arrowHalf * 2,
    containerW / 2 + arrowOutset - arrowHalf,
  );

  // Snap silently when landing on a clone boundary.
  // virtualActive > REAL_END → we've gone past the last real slide into right clones.
  // virtualActive < REAL_START → we've gone past the first real slide into left clones.
  const onTrackTransitionEnd = (e: React.TransitionEvent<HTMLDivElement>) => {
    if (e.target !== e.currentTarget) return;
    if (virtualActive > REAL_END) {
      const offset = virtualActive - REAL_END;
      setAnimated(false);
      setVirtualActive(REAL_START + offset - 1);
      // transitioningRef is released in the !animated useEffect (after the snap RAF)
    } else if (virtualActive < REAL_START) {
      const offset = REAL_START - virtualActive;
      setAnimated(false);
      setVirtualActive(REAL_END - offset + 1);
    } else {
      // Normal transition completed — release the lock immediately
      transitioningRef.current = false;
      setAriaLive("off");
    }
  };

  const onPointerDown = (e: React.PointerEvent) => {
    dragStartX.current = e.clientX;
    setIsDragging(true);
  };
  const onPointerUp = (e: React.PointerEvent) => {
    if (dragStartX.current !== null) {
      const delta = dragStartX.current - e.clientX;
      if (Math.abs(delta) >= SWIPE_THRESHOLD) {
        navigate(delta > 0 ? 1 : -1);
      }
      dragStartX.current = null;
    }
    setIsDragging(false);
  };
  const onPointerLeave = () => {
    dragStartX.current = null;
    setIsDragging(false);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      navigate(-1);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      navigate(1);
    }
  };

  return (
    <section
      ref={sectionRef}
      aria-label="Customer testimonials"
      className="relative w-full overflow-hidden bg-inverse"
    >
      {/* Top-right concentrated tile cluster */}
      <TileCluster />

      {/* Section header — left-aligned */}
      <div className="relative mx-auto max-w-[1200px] px-10">
        <div className="pt-20 lg:pt-28">
          <div className="flex items-center gap-3">
            <SectionEyebrow tone="dark">Testimonials</SectionEyebrow>
          </div>

          <SectionHeading tone="dark" className="mt-4 max-w-2xl">
            Don&apos;t just take our word for it.
          </SectionHeading>

          <p className="mt-4 max-w-sm text-base leading-relaxed text-inverse-foreground/80">
            See how people and teams use Cal.com to make scheduling work the way
            they do.
          </p>
        </div>
      </div>

      {/* Carousel — full bleed */}
      {/* biome-ignore lint/a11y/useSemanticElements: section not usable here — the outer element is already a section landmark */}
      <div
        ref={containerRef}
        role="region"
        className="relative mt-14 pb-16 lg:pb-24"
        // biome-ignore lint/a11y/noNoninteractiveTabindex: keyboard navigation region for carousel
        tabIndex={0}
        aria-label="Testimonials carousel — use left and right arrow keys to navigate"
        aria-live={ariaLive}
        onKeyDown={onKeyDown}
        onFocus={() => setHasFocus(true)}
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget as Node)) {
            setHasFocus(false);
          }
        }}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerLeave}
        style={{ touchAction: "pan-y" }}
      >
        <div className="relative">
          {/* Chevron — previous */}
          <button
            type="button"
            aria-label="Previous testimonial"
            onClick={() => navigate(-1)}
            className="absolute z-20 flex h-12 w-12 items-center justify-center text-inverse-foreground/50 transition-opacity hover:text-inverse-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inverse-foreground/50 focus-visible:ring-offset-2 focus-visible:ring-offset-foreground"
            style={{
              left: `${leftArrowLeft}px`,
              top: "50%",
              transform: "translateY(-50%)",
            }}
          >
            <ChevronLeftIcon
              className="size-9"
              strokeWidth={1.75}
              aria-hidden="true"
            />
          </button>

          {/* Chevron — next */}
          <button
            type="button"
            aria-label="Next testimonial"
            onClick={() => navigate(1)}
            className="absolute z-20 flex h-12 w-12 items-center justify-center text-inverse-foreground/50 transition-opacity hover:text-inverse-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inverse-foreground/50 focus-visible:ring-offset-2 focus-visible:ring-offset-foreground"
            style={{
              left: `${rightArrowLeft}px`,
              top: "50%",
              transform: "translateY(-50%)",
            }}
          >
            <ChevronRightIcon
              className="size-9"
              strokeWidth={1.75}
              aria-hidden="true"
            />
          </button>

          {/* Card track */}
          <div
            className={cn(
              "flex select-none items-stretch py-4",
              !prefersReducedMotion &&
                animated &&
                "transition-transform duration-700 ease-emphasized",
            )}
            style={{
              gap: `${GAP}px`,
              transform: `translateX(${translateX}px)`,
            }}
            onTransitionEnd={onTrackTransitionEnd}
          >
            {SLIDES.map((t, i) => {
              const isActive = i === virtualActive;
              const dist = Math.abs(i - virtualActive);
              const isAdjacent = dist === 1;
              // Clone slides exist purely for visual continuity; hide from AT always.
              const isClone = i < REAL_START || i > REAL_END;
              return (
                // biome-ignore lint/a11y/useSemanticElements: role="group" is the correct ARIA role for a carousel slide
                <div
                  key={SLIDE_KEYS[i]}
                  role="group"
                  aria-label={`${t.name}, ${t.role}`}
                  aria-hidden={isClone || !isActive}
                  onClick={() => {
                    if (!isActive && !isClone && !transitioningRef.current) {
                      transitioningRef.current = true;
                      setVirtualActive(i);
                    }
                  }}
                  onMouseEnter={isActive ? handleCardMouseEnter : undefined}
                  onMouseLeave={isActive ? handleCardMouseLeave : undefined}
                  style={{ width: `${cardW}px`, flexShrink: 0 }}
                  className={cn(
                    "flex flex-col rounded-2xl bg-card sm:flex-row",
                    !prefersReducedMotion &&
                      animated &&
                      "transition-[opacity,transform] duration-700 ease-emphasized",
                    isActive
                      ? "scale-100 cursor-default opacity-100"
                      : isAdjacent
                        ? "scale-[0.93] cursor-pointer opacity-35 hover:opacity-45"
                        : "scale-[0.88] cursor-pointer opacity-15",
                  )}
                >
                  {/* Portrait column */}
                  <div className="flex shrink-0 items-center justify-center p-6 sm:p-8 sm:pr-0 lg:p-10 lg:pr-0">
                    <div className="relative">
                      <div
                        className="absolute inset-0 rounded-2xl bg-muted"
                        style={{
                          transform: "rotate(5deg) translate(15px, 6px)",
                        }}
                      />
                      <div className="relative aspect-square w-[140px] overflow-hidden rounded-2xl bg-muted sm:w-[160px] lg:w-[200px]">
                        <PortraitSlot
                          portrait={t.portrait}
                          name={t.name}
                          company={t.company}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Content column */}
                  <div className="flex flex-1 flex-col justify-center px-6 pb-8 pt-2 sm:px-8 sm:py-8 lg:px-10 lg:py-10">
                    <blockquote>
                      <p className="text-xl font-bold leading-snug tracking-tight text-foreground lg:text-2xl">
                        &ldquo;{t.quote}&rdquo;
                      </p>
                    </blockquote>

                    <div className="mt-7">
                      <p className="text-sm font-semibold text-foreground">
                        {t.name}
                      </p>
                      <p className="mt-0.5 text-sm text-muted-foreground">
                        {t.role}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Pagination dots — plain buttons, no tablist pattern */}
        <div className="mt-4 flex justify-center gap-2 pb-2">
          {TESTIMONIALS.map((t, i) => (
            <button
              key={t.id}
              type="button"
              aria-current={i === displayActive ? "true" : undefined}
              aria-label={`Go to testimonial ${i + 1}: ${t.name}`}
              onClick={() => {
                const target = REAL_START + i;
                if (target !== virtualActive && !transitioningRef.current) {
                  transitioningRef.current = true;
                  setAriaLive("polite");
                  setVirtualActive(target);
                }
              }}
              className="group flex min-h-6 min-w-6 items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inverse-foreground/50 focus-visible:ring-offset-2 focus-visible:ring-offset-foreground"
            >
              <span
                className={cn(
                  "relative block overflow-hidden h-1.5 rounded-full transition-[width,background-color] duration-250",
                  i === displayActive
                    ? "w-6 bg-card/30"
                    : "w-1.5 bg-card/30 group-hover:bg-card/50",
                )}
              >
                {i === displayActive && !prefersReducedMotion && (
                  <span
                    aria-hidden="true"
                    className="absolute inset-y-0 left-0 rounded-full bg-card"
                    style={{ width: `${progress}%` }}
                  />
                )}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
