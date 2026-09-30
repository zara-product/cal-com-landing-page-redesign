"use client";

import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import * as React from "react";
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
    portrait: "https://github.com/fmerian.png?size=400",
  },
  {
    id: "guillermo",
    company: "Vercel",
    quote:
      "I think Cal.com has a very good chance of creating a new category around being both great and well designed.",
    name: "Guillermo Rauch",
    role: "CEO, Vercel",
    portrait: "https://github.com/rauchg.png?size=400",
  },
  {
    id: "kent",
    company: "EpicWeb.dev",
    quote: "I just migrated from Calendly to Cal.com.",
    name: "Kent C. Dodds",
    role: "Founder, EpicWeb.dev",
    portrait: "https://github.com/kentcdodds.png?size=400",
  },
  {
    id: "aria",
    company: "Theatre.JS",
    quote:
      "Just gave it a go and it's definitely the easiest meeting I've ever scheduled!",
    name: "Aria Minaei",
    role: "CEO, Theatre.JS",
    portrait: "https://github.com/AriaMinaei.png?size=400",
  },
  {
    id: "ant",
    company: "Supabase",
    quote:
      "I finally made the move to Cal.com after I couldn't find how to edit events in the Calendly dashboard.",
    name: "Ant Wilson",
    role: "Co-Founder & CTO, Supabase",
    portrait: "https://github.com/awalias.png?size=400",
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

const COUNT = TESTIMONIALS.length;
const GAP = 32;
const AUTOPLAY_MS = 4000;
const SWIPE_THRESHOLD = 50;

// Large sparse rounded-tile pattern — quiet texture on dark background
const PATTERN_URL = `url("data:image/svg+xml,${encodeURIComponent(
  '<svg width="80" height="80" xmlns="http://www.w3.org/2000/svg"><rect x="4" y="4" width="72" height="72" rx="12" fill="white" fill-opacity="0.032"/></svg>',
)}")`;

// ─── usePrefersReducedMotion ──────────────────────────────────────────────────

function usePrefersReducedMotion(): boolean {
  const [prefers, setPrefers] = React.useState(false);
  React.useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefers(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefers(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return prefers;
}

// ─── PortraitSlot ─────────────────────────────────────────────────────────────

function PortraitSlot({
  portrait,
  name,
  company,
}: {
  portrait: string | null;
  name: string;
  company: string;
}) {
  const [failed, setFailed] = React.useState(false);

  if (portrait && !failed) {
    return (
      // biome-ignore lint/performance/noImgElement: V1 portrait images — migrate to next/image with remotePatterns in refinement
      <img
        src={portrait}
        alt={name}
        className="h-full w-full object-cover"
        onError={() => setFailed(true)}
      />
    );
  }

  // V1 fallback: company name label — swap for real logo in refinement pass
  return (
    <div className="flex h-full w-full items-center justify-center p-6">
      <span className="text-center text-xs font-semibold uppercase tracking-widest text-foreground/30">
        {company}
      </span>
    </div>
  );
}

// ─── TestimonialsSection ──────────────────────────────────────────────────────

export function TestimonialsSection() {
  const [active, setActive] = React.useState(0);
  const [isPaused, setIsPaused] = React.useState(false);
  const [containerW, setContainerW] = React.useState(1440);
  const containerRef = React.useRef<HTMLElement>(null);
  const timerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const dragStartX = React.useRef<number | null>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  React.useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setContainerW(el.clientWidth));
    ro.observe(el);
    setContainerW(el.clientWidth);
    return () => ro.disconnect();
  }, []);

  const scheduleNext = React.useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (prefersReducedMotion || isPaused) return;
    timerRef.current = setTimeout(
      () => setActive((a) => (a + 1) % COUNT),
      AUTOPLAY_MS,
    );
  }, [isPaused, prefersReducedMotion]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: active intentionally restarts the autoplay timer after each advance
  React.useEffect(() => {
    scheduleNext();
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [active, scheduleNext]);

  const go = React.useCallback((index: number) => {
    setActive(((index % COUNT) + COUNT) % COUNT);
  }, []);

  const cardW = Math.min(860, containerW * 0.65);
  const translateX = containerW / 2 - active * (cardW + GAP) - cardW / 2;

  const onPointerDown = (e: React.PointerEvent) => {
    dragStartX.current = e.clientX;
  };
  const onPointerUp = (e: React.PointerEvent) => {
    if (dragStartX.current === null) return;
    const delta = dragStartX.current - e.clientX;
    if (Math.abs(delta) >= SWIPE_THRESHOLD) {
      go(delta > 0 ? active + 1 : active - 1);
    }
    dragStartX.current = null;
  };
  const onPointerLeave = () => {
    dragStartX.current = null;
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      go(active - 1);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      go(active + 1);
    }
  };

  return (
    <section
      aria-label="Customer testimonials"
      className="relative w-full overflow-hidden bg-foreground"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={() => setIsPaused(false)}
    >
      {/* Sparse rounded-tile texture — fades downward from top centre */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: PATTERN_URL,
          maskImage:
            "radial-gradient(ellipse 100% 55% at 50% 0%, black 0%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 100% 55% at 50% 0%, black 0%, transparent 100%)",
        }}
      />

      {/* Section header — left-aligned, constrained width */}
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="border-t border-background/10 pt-20 lg:pt-28">
          <div className="flex items-center gap-3">
            <div className="h-px w-6 bg-background/35" aria-hidden="true" />
            <p className="text-[11px] font-semibold uppercase tracking-widest text-background/50">
              Testimonials
            </p>
          </div>

          <h2 className="mt-4 max-w-2xl text-[2.25rem] font-bold leading-tight tracking-tight text-background lg:text-[3rem]">
            Don&apos;t just take our word for it.
          </h2>

          <p className="mt-4 max-w-sm text-[0.9375rem] leading-relaxed text-background/55">
            See how people and teams use Cal.com to make scheduling work the way
            they do.
          </p>
        </div>
      </div>

      {/* Carousel — full bleed */}
      <section
        ref={containerRef}
        className="relative mt-14 pb-16 lg:pb-24"
        // biome-ignore lint/a11y/noNoninteractiveTabindex: keyboard navigation region for carousel
        tabIndex={0}
        aria-label="Testimonials carousel — use left and right arrow keys to navigate"
        aria-live="polite"
        onKeyDown={onKeyDown}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerLeave}
        style={{ touchAction: "pan-y" }}
      >
        {/* Chevron — previous */}
        <button
          type="button"
          aria-label="Previous testimonial"
          onClick={() => go(active - 1)}
          className="absolute left-3 top-1/2 z-20 -translate-y-1/2 p-2 text-background/45 transition-colors hover:text-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-background/50 focus-visible:ring-offset-2 focus-visible:ring-offset-foreground lg:left-6"
        >
          <ChevronLeftIcon className="size-7" aria-hidden="true" />
        </button>

        {/* Chevron — next */}
        <button
          type="button"
          aria-label="Next testimonial"
          onClick={() => go(active + 1)}
          className="absolute right-3 top-1/2 z-20 -translate-y-1/2 p-2 text-background/45 transition-colors hover:text-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-background/50 focus-visible:ring-offset-2 focus-visible:ring-offset-foreground lg:right-6"
        >
          <ChevronRightIcon className="size-7" aria-hidden="true" />
        </button>

        {/* Card track */}
        <div
          className={cn(
            "flex select-none items-stretch py-4",
            !prefersReducedMotion &&
              "transition-transform duration-300 ease-out",
          )}
          style={{
            gap: `${GAP}px`,
            transform: `translateX(${translateX}px)`,
          }}
        >
          {TESTIMONIALS.map((t, i) => {
            const isActive = i === active;
            const isAdjacent = Math.abs(i - active) === 1;
            return (
              // biome-ignore lint/a11y/useSemanticElements: role="group" is the correct ARIA role for a carousel slide
              <div
                key={t.id}
                role="group"
                aria-label={`${t.name}, ${t.role}`}
                aria-hidden={!isActive}
                onClick={() => !isActive && go(i)}
                style={{ width: `${cardW}px`, flexShrink: 0 }}
                className={cn(
                  "flex flex-col rounded-2xl bg-background transition-[opacity,transform] duration-300 sm:flex-row",
                  isActive
                    ? "scale-100 cursor-default opacity-100 shadow-2xl"
                    : isAdjacent
                      ? "scale-[0.93] cursor-pointer opacity-45 hover:opacity-55"
                      : "scale-[0.88] cursor-pointer opacity-20",
                )}
              >
                {/* Portrait column */}
                <div className="flex shrink-0 items-center justify-center p-6 sm:p-8 sm:pr-0 lg:p-10 lg:pr-0">
                  <div className="relative">
                    {/* Tilted backing rect — same size as portrait, peeks right and bottom-right */}
                    <div
                      className="absolute inset-0 rounded-2xl bg-neutral-100"
                      style={{
                        transform: "rotate(4deg) translate(12px, 10px)",
                      }}
                    />
                    {/* Portrait */}
                    <div className="relative aspect-square w-[140px] overflow-hidden rounded-2xl bg-neutral-100 sm:w-[160px] lg:w-[200px]">
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
                  {/* Quote first — no company label above */}
                  <blockquote>
                    <p className="text-[1.25rem] font-bold leading-snug tracking-tight text-foreground lg:text-[1.5rem]">
                      &ldquo;{t.quote}&rdquo;
                    </p>
                  </blockquote>

                  {/* Attribution: name then role, company */}
                  <div className="mt-7">
                    <p className="text-[0.9375rem] font-semibold text-foreground">
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

        {/* Pagination dots */}
        <div
          role="tablist"
          aria-label="Go to testimonial"
          className="mt-4 flex justify-center gap-2 pb-2"
        >
          {TESTIMONIALS.map((t, i) => (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={i === active}
              aria-label={`Testimonial ${i + 1}: ${t.name}`}
              onClick={() => go(i)}
              className={cn(
                "h-1.5 rounded-full transition-[width,background-color] duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-background/50 focus-visible:ring-offset-2 focus-visible:ring-offset-foreground",
                i === active
                  ? "w-6 bg-background"
                  : "w-1.5 bg-background/30 hover:bg-background/50",
              )}
            />
          ))}
        </div>
      </section>
    </section>
  );
}
