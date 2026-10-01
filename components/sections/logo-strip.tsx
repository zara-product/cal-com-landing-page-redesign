"use client";

import Image from "next/image";
import { useMediaQuery } from "@/hooks/use-media-query";

// ─── Logo data ────────────────────────────────────────────────────────────────
// h/w are optically calibrated per-logo to account for each image's internal
// whitespace. Widths are derived from each SVG's natural aspect ratio.

type LogoEntry = { name: string; src: string; h: number; w: number };

// All source SVGs are normalized to height 80. Display height is 30px for all;
// widths are derived from each SVG's natural aspect ratio (round(30 × w / 80)).
const LOGOS: LogoEntry[] = [
  { name: "Framer", src: "/logos/framer.svg", h: 30, w: 109 },
  { name: "Deel", src: "/logos/deel.svg", h: 30, w: 88 },
  { name: "Storyblok", src: "/logos/storyblok.svg", h: 30, w: 140 },
  { name: "Udemy", src: "/logos/udemy.svg", h: 30, w: 78 },
  { name: "Rho", src: "/logos/rho.svg", h: 26, w: 57 },
  { name: "Supabase", src: "/logos/supabase.svg", h: 30, w: 149 },
  { name: "Ramp", src: "/logos/ramp.svg", h: 30, w: 108 },
  { name: "Coinbase", src: "/logos/coinbase.svg", h: 26, w: 140 },
  { name: "Vercel", src: "/logos/vercel.svg", h: 26, w: 120 },
  { name: "Raycast", src: "/logos/raycast.svg", h: 30, w: 114 },
  { name: "PlanetScale", src: "/logos/planetscale.svg", h: 30, w: 179 },
  { name: "AngelList", src: "/logos/angellist.svg", h: 30, w: 81 },
];

// ─── LogoStripSection ─────────────────────────────────────────────────────────

export function LogoStripSection() {
  const prefersReducedMotion = useMediaQuery(
    "(prefers-reduced-motion: reduce)",
  );

  return (
    <section
      aria-label="Trusted by companies around the world"
      className="w-full bg-background"
    >
      <div className="mx-auto max-w-[1200px] px-10">
        <div>
          <div className="flex flex-col gap-4 pb-5 pt-6 md:flex-row md:items-center md:gap-0 md:pb-5 md:pt-6">
            {/* Copy block */}
            <p className="shrink-0 text-sm leading-snug text-muted-foreground md:w-40">
              Trusted by{" "}
              <span className="font-semibold text-foreground">1M+</span> users
              around the world
            </p>

            {/* Vertical separator — desktop only */}
            <div
              aria-hidden="true"
              className="mx-7 hidden h-7 w-px shrink-0 bg-border md:block"
            />

            {/* Logo viewport — clips the scrolling track */}
            <div className="relative min-w-0 flex-1 overflow-hidden">
              {/* Left-edge fade */}
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
                  {LOGOS.map(({ name, src, h, w }) => (
                    <Image
                      key={name}
                      src={src}
                      alt={name}
                      width={w}
                      height={h}
                      unoptimized
                      className="shrink-0 mix-blend-multiply"
                    />
                  ))}
                </div>
              ) : (
                /* Continuously scrolling track: two identical sets */
                <div
                  className="flex w-max items-center gap-12 animate-marquee"
                  style={{
                    animationPlayState: "running",
                  }}
                >
                  {LOGOS.map(({ name, src, h, w }) => (
                    <Image
                      key={name}
                      src={src}
                      alt={name}
                      width={w}
                      height={h}
                      unoptimized
                      className="shrink-0 mix-blend-multiply"
                    />
                  ))}
                  {LOGOS.map(({ name, src, h, w }) => (
                    <Image
                      key={`dup-${name}`}
                      src={src}
                      alt=""
                      aria-hidden="true"
                      width={w}
                      height={h}
                      unoptimized
                      className="shrink-0 mix-blend-multiply"
                    />
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
