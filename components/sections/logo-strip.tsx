"use client";

import * as React from "react";
import { useMediaQuery } from "@/hooks/use-media-query";

function VercelMark() {
  return (
    <span className="inline-flex items-center gap-[6px]">
      <svg
        width="14"
        height="12"
        viewBox="0 0 12 10"
        fill="currentColor"
        aria-hidden="true"
        focusable="false"
      >
        <path d="M6 0L12 10H0L6 0Z" />
      </svg>
      <span className="text-[15px] font-semibold leading-none tracking-tight">
        Vercel
      </span>
    </span>
  );
}

type LogoEntry = { name: string; node: React.ReactNode };

const LOGOS: LogoEntry[] = [
  {
    name: "Deel",
    node: (
      <span className="text-[15px] font-bold leading-none tracking-tight">
        deel
      </span>
    ),
  },
  {
    name: "Framer",
    node: (
      <span className="text-[15px] font-bold leading-none tracking-tight">
        Framer
      </span>
    ),
  },
  {
    name: "Ramp",
    node: <span className="text-[15px] font-bold leading-none">ramp</span>,
  },
  {
    name: "PlanetScale",
    node: (
      <span className="text-[15px] font-medium leading-none tracking-tight">
        PlanetScale
      </span>
    ),
  },
  {
    name: "Coinbase",
    node: <span className="text-[15px] font-bold leading-none">Coinbase</span>,
  },
  {
    name: "Storyblok",
    node: (
      <span className="text-[15px] font-semibold leading-none">Storyblok</span>
    ),
  },
  {
    name: "AngelList",
    node: (
      <span className="text-[15px] font-semibold leading-none tracking-tight">
        AngelList
      </span>
    ),
  },
  {
    name: "Raycast",
    node: (
      <span className="text-[15px] font-semibold leading-none">Raycast</span>
    ),
  },
  {
    name: "Vercel",
    node: <VercelMark />,
  },
  {
    name: "Supabase",
    node: (
      <span className="text-[15px] font-semibold leading-none">Supabase</span>
    ),
  },
  {
    name: "Udemy",
    node: <span className="text-[15px] font-bold leading-none">Udemy</span>,
  },
  {
    name: "Rho",
    node: (
      <span className="text-[15px] font-semibold leading-none tracking-widest">
        Rho
      </span>
    ),
  },
];

export function LogoStripSection() {
  const [isPaused, setIsPaused] = React.useState(false);
  const prefersReducedMotion = useMediaQuery(
    "(prefers-reduced-motion: reduce)",
  );

  return (
    <section
      aria-label="Trusted by companies worldwide"
      className="w-full bg-background"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={() => setIsPaused(false)}
    >
      <div className="mx-auto max-w-[1200px] border-l border-r border-border px-10">
        <div className="border-t border-border">
          <div className="flex flex-col gap-4 py-7 md:flex-row md:items-center md:gap-0 md:py-6">
            {/* Copy block */}
            <p className="shrink-0 text-xs leading-snug text-muted-foreground md:w-44">
              Trusted by fast-growing companies around the world
            </p>

            {/* Vertical separator — desktop only */}
            <div
              aria-hidden="true"
              className="mx-7 hidden h-7 w-px shrink-0 bg-border md:block"
            />

            {/* Logo viewport — clips the scrolling track */}
            <div className="relative min-w-0 flex-1 overflow-hidden">
              {/* Left-edge fade so logos dissolve before reaching the copy */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-y-0 left-0 z-10 w-14 bg-gradient-to-r from-background to-transparent"
              />
              {/* Right-edge fade */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-background to-transparent"
              />

              {prefersReducedMotion ? (
                /* Static scrollable row for reduced-motion users */
                <div className="flex items-center gap-10 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                  {LOGOS.map(({ name, node }) => (
                    <span key={name} className="shrink-0 text-foreground/50">
                      {node}
                    </span>
                  ))}
                </div>
              ) : (
                /* Continuously scrolling track: two identical sets; only the first is read by AT */
                <div
                  className="flex w-max items-center gap-12 animate-marquee"
                  style={{
                    animationPlayState: isPaused ? "paused" : "running",
                  }}
                >
                  {LOGOS.map(({ name, node }) => (
                    <span key={name} className="shrink-0 text-foreground/50">
                      {node}
                    </span>
                  ))}
                  {LOGOS.map(({ name, node }) => (
                    <span
                      key={`dup-${name}`}
                      aria-hidden="true"
                      className="shrink-0 text-foreground/50"
                    >
                      {node}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
