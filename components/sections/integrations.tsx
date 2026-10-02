"use client";

import { ArrowRightIcon } from "lucide-react";
import NextImage from "next/image";
import * as React from "react";
import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";

// ─── Hub data ─────────────────────────────────────────────────────────────────

// All six outer containers are uniform — Cal centre node remains dominant.
const CONTAINER_SIZE = 64;

const HUB_SPOKES = [
  {
    src: "/icons/google-calendar.svg",
    name: "Google Calendar",
    left: "26%",
    top: "22%",
    iconSize: 32,
  },
  {
    src: "/icons/zoom.svg",
    name: "Zoom",
    left: "74%",
    top: "22%",
    iconSize: 30,
  },
  {
    src: "/icons/slack.svg",
    name: "Slack",
    left: "16%",
    top: "50%",
    iconSize: 30,
  },
  {
    src: "/icons/salesforce.svg",
    name: "Salesforce",
    left: "84%",
    top: "50%",
    iconSize: 32,
  },
  {
    src: "/icons/hubspot.svg",
    name: "HubSpot",
    left: "26%",
    top: "78%",
    iconSize: 26,
  },
  {
    src: "/icons/microsoft-teams.svg",
    name: "Microsoft Teams",
    left: "74%",
    top: "78%",
    iconSize: 30,
  },
] as const;

// Per-icon sizes calibrated for optical consistency inside the 48×48 tile.
const ADDITIONAL_LOGOS = [
  { src: "/icons/outlook-calendar.svg", name: "Outlook Calendar", size: 22 },
  { src: "/icons/google-meet.svg", name: "Google Meet", size: 24 },
  { src: "/icons/apple-calendar.svg", name: "Apple Calendar", size: 22 },
  { src: "/icons/zapier.svg", name: "Zapier", size: 22 },
  { src: "/icons/notion.svg", name: "Notion", size: 19 },
  { src: "/icons/whatsapp.svg", name: "WhatsApp", size: 28 },
  { src: "/icons/stripe.svg", name: "Stripe", size: 22 },
  { src: "/icons/intercom.svg", name: "Intercom", size: 22 },
  { src: "/icons/google-sheets.svg", name: "Google Sheets", size: 20 },
] as const;

// 1600ms heartbeat — calmer sequential cadence, no travelling elements.
const CYCLE_MS = 1600;

// ─── Hub visual ───────────────────────────────────────────────────────────────

function IntegrationsHub() {
  const [activeSpoke, setActiveSpoke] = React.useState(0);
  const [liftedSpoke, setLiftedSpoke] = React.useState<number | null>(null);
  const [inView, setInView] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useMediaQuery(
    "(prefers-reduced-motion: reduce)",
  );

  // Pause when section scrolls out of view.
  React.useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.1 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Sequential heartbeat — advances one spoke every CYCLE_MS while in view.
  React.useEffect(() => {
    if (prefersReducedMotion || !inView) return;
    const id = setInterval(() => {
      setActiveSpoke((s) => (s + 1) % HUB_SPOKES.length);
    }, CYCLE_MS);
    return () => clearInterval(id);
  }, [prefersReducedMotion, inView]);

  // Delayed lift — 500ms after spoke becomes active, lift logo and show name.
  React.useEffect(() => {
    setLiftedSpoke(null);
    if (prefersReducedMotion || !inView) return;
    const t = setTimeout(() => setLiftedSpoke(activeSpoke), 500);
    return () => clearTimeout(t);
  }, [activeSpoke, prefersReducedMotion, inView]);

  const animated = !prefersReducedMotion;

  return (
    <div
      ref={containerRef}
      className="relative h-[400px] w-full lg:h-[440px]"
      role="img"
      aria-label="Cal.com connects to Google Calendar, Zoom, Slack, Salesforce, HubSpot and Microsoft Teams"
    >
      {/* All six connectors remain dashed. Active spoke deepens opacity ~25%→~60% over 500ms. */}
      <svg
        className="absolute inset-0 h-full w-full pointer-events-none z-0"
        aria-hidden="true"
        preserveAspectRatio="none"
      >
        <title>Integration connector lines</title>
        {HUB_SPOKES.map(({ name, left, top }, i) => (
          <line
            key={name}
            x1="50%"
            y1="50%"
            x2={left}
            y2={top}
            strokeWidth="1.25"
            strokeLinecap="round"
            strokeDasharray="2 5"
            style={{
              stroke:
                animated && i === activeSpoke
                  ? "color-mix(in srgb, var(--color-muted-foreground) 60%, transparent)"
                  : "color-mix(in srgb, var(--color-muted-foreground) 25%, transparent)",
              transition: "stroke 500ms ease",
            }}
          />
        ))}
      </svg>

      {/* Cal.com centre — dominant node, at true vertical centre of hub div */}
      <div
        className="absolute z-20 -translate-x-1/2 -translate-y-1/2"
        style={{ left: "50%", top: "50%" }}
      >
        <NextImage
          src="/icons/cal-logo.svg"
          alt="Cal.com"
          width={80}
          height={80}
        />
      </div>

      {/* Integration logos — 500ms after spoke activates: lifts 2px, name appears */}
      {HUB_SPOKES.map(({ src, name, left, top, iconSize }, i) => {
        const isLifted = animated && liftedSpoke === i;
        return (
          <div
            key={name}
            className={cn(
              "absolute -translate-x-1/2 -translate-y-1/2",
              isLifted ? "z-20" : "z-10",
            )}
            style={{ left, top }}
          >
            <div className="relative">
              <div
                className="flex items-center justify-center rounded-2xl border border-border bg-card"
                style={{
                  width: CONTAINER_SIZE,
                  height: CONTAINER_SIZE,
                  transform: isLifted ? "translateY(-2px)" : "translateY(0)",
                  transition: "transform 500ms ease",
                }}
              >
                <NextImage
                  src={src}
                  alt={name}
                  width={iconSize}
                  height={iconSize}
                  className="object-contain"
                />
              </div>
              {/* Name label — appears below card when lifted */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute left-1/2 whitespace-nowrap"
                style={{
                  top: "calc(100% + 8px)",
                  opacity: isLifted ? 1 : 0,
                  transform: isLifted
                    ? "translateX(-50%) translateY(0)"
                    : "translateX(-50%) translateY(-4px)",
                  transition: "opacity 500ms ease, transform 500ms ease",
                }}
              >
                <span className="rounded-lg bg-muted/50 px-2.5 py-1 text-xs text-muted-foreground">
                  {name}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─── Section ─────────────────────────────────────────────────────────────────

export function IntegrationsSection() {
  return (
    <section aria-label="Integrations" className="w-full bg-background">
      <div className="mx-auto max-w-[1200px] px-10">
        <div className="pt-16 pb-20 lg:pt-20 lg:pb-28">
          {/* Two-column: copy | hub */}
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center lg:gap-8">
            {/* Left: copy */}
            <div className="flex flex-col gap-6 lg:gap-7">
              <span className="text-xs font-semibold uppercase tracking-widest text-foreground">
                Integrations
              </span>

              <h2 className="text-4xl sm:text-5xl font-bold leading-[1.05] tracking-tight text-foreground">
                Keep your meetings in sync with the tools you already use.
              </h2>

              <p className="max-w-sm text-base leading-relaxed text-muted-foreground">
                Bring Slack, Salesforce, Google Calendar, Zoom and the rest of
                your stack into every booking.
              </p>

              <a
                href="https://app.cal.com/apps"
                className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-foreground transition-opacity hover:opacity-70"
              >
                Explore apps
                <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>

            {/* Right: hub */}
            <div>
              <IntegrationsHub />
            </div>
          </div>

          {/* Additional row — py-2/-my-2 gives shadow room without adding visible space */}
          <div className="mt-12 -my-2 flex justify-center overflow-x-auto py-2 lg:mt-12">
            <div className="flex items-center gap-4">
              <span className="shrink-0 text-sm text-muted-foreground">
                And 100+ more apps
              </span>
              <div className="flex flex-wrap gap-2 lg:flex-nowrap">
                {ADDITIONAL_LOGOS.map(({ src, name, size }) => (
                  <div
                    key={name}
                    className="flex size-12 items-center justify-center rounded-lg border border-border bg-card transition-transform duration-150 hover:-translate-y-px"
                    title={name}
                  >
                    <NextImage
                      src={src}
                      alt={name}
                      width={size}
                      height={size}
                      className="object-contain"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
