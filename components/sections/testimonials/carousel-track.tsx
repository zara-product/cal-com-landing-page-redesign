"use client";

import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import * as React from "react";
import { useAutoplayProgress } from "@/hooks/use-autoplay-progress";
import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";
import {
  AUTOPLAY_MS,
  COUNT,
  GAP,
  REAL_END,
  REAL_START,
  SLIDE_KEYS,
  SLIDES,
  SWIPE_THRESHOLD,
  TESTIMONIALS,
} from "./data";
import { TestimonialCard } from "./testimonial-card";

export function TestimonialsCarousel() {
  // virtualActive: position in SLIDES (0–1 = left clones, 2–7 = real, 8–9 = right clones)
  const [virtualActive, setVirtualActive] = React.useState(REAL_START);
  // animated: false during the silent snap from clone → real position
  const [animated, setAnimated] = React.useState(true);
  const [cardHovered, setCardHovered] = React.useState(false);
  const [isDragging, setIsDragging] = React.useState(false);
  const [containerW, setContainerW] = React.useState(1440);
  const [ariaLive, setAriaLive] = React.useState<"off" | "polite">("off");
  const containerRef = React.useRef<HTMLDivElement>(null);
  const dragStartX = React.useRef<number | null>(null);
  // Prevents overlapping transitions from rapid clicks / autoplay races.
  const transitioningRef = React.useRef(false);
  const prefersReducedMotion = useMediaQuery(
    "(prefers-reduced-motion: reduce)",
  );

  const isPaused = cardHovered || isDragging;
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

  const onAdvance = React.useCallback(() => {
    if (!transitioningRef.current) {
      transitioningRef.current = true;
      setVirtualActive((v) => Math.min(v + 1, REAL_END + 1));
    }
  }, []);

  const { progress } = useAutoplayProgress({
    duration: AUTOPLAY_MS,
    onAdvance,
    containerRef,
    isPaused,
    prefersReducedMotion,
  });

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
    // biome-ignore lint/a11y/useSemanticElements: section not usable here — the outer element is already a section landmark
    <div
      ref={containerRef}
      role="region"
      className="relative mt-14 touch-pan-y pb-16 lg:pb-24"
      // biome-ignore lint/a11y/noNoninteractiveTabindex: keyboard navigation region for carousel
      tabIndex={0}
      aria-label="Testimonials carousel — use left and right arrow keys to navigate"
      aria-live={ariaLive}
      onKeyDown={onKeyDown}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerLeave}
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
              <TestimonialCard
                key={SLIDE_KEYS[i]}
                testimonial={t}
                slideKey={SLIDE_KEYS[i]}
                isActive={isActive}
                isAdjacent={isAdjacent}
                isClone={isClone}
                animated={animated}
                prefersReducedMotion={prefersReducedMotion}
                cardW={cardW}
                onMouseEnter={isActive ? handleCardMouseEnter : undefined}
                onMouseLeave={isActive ? handleCardMouseLeave : undefined}
                onClick={
                  !isActive && !isClone
                    ? () => {
                        if (!transitioningRef.current) {
                          transitioningRef.current = true;
                          setVirtualActive(i);
                        }
                      }
                    : undefined
                }
              />
            );
          })}
        </div>
      </div>

      {/* Pagination dots — display-only position indicators */}
      <div aria-hidden="true" className="mt-4 flex justify-center gap-2 pb-2">
        {TESTIMONIALS.map((t, i) => (
          <span
            key={t.id}
            className={cn(
              "relative block h-1.5 overflow-hidden rounded-full transition-[width] duration-250",
              i === displayActive ? "w-6 bg-card/30" : "w-1.5 bg-card/30",
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
        ))}
      </div>
    </div>
  );
}
