"use client";

import { MapPinIcon } from "lucide-react";
import NextImage from "next/image";
import * as React from "react";
import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";
import { VisualSwitch } from "./visual-switch";

function IconCalVideo() {
  return (
    <NextImage
      src="/icons/cal-video.svg"
      width={36}
      height={36}
      unoptimized
      alt=""
      aria-hidden="true"
      className="h-full w-full object-contain"
    />
  );
}

function IconGoogleMeet() {
  return (
    <NextImage
      src="/icons/google-meet.svg"
      width={36}
      height={36}
      unoptimized
      alt=""
      aria-hidden="true"
      className="h-full w-full object-contain"
    />
  );
}

function IconZoomVideo() {
  return (
    <NextImage
      src="/icons/zoom.svg"
      width={36}
      height={36}
      unoptimized
      alt=""
      aria-hidden="true"
      className="h-full w-full object-contain"
    />
  );
}

type IconComponent = React.FC<{ className?: string }>;

interface MeetingRow {
  key: string;
  label: string;
  description: string;
  Icon: IconComponent;
  isLogo: boolean;
}

const MEETING_TYPES: MeetingRow[] = [
  {
    key: "cal-video",
    label: "Cal Video",
    description: "Built-in video, no account needed",
    Icon: IconCalVideo as IconComponent,
    isLogo: true,
  },
  {
    key: "google-meet",
    label: "Google Meet",
    description: "Google Meet link sent with confirmation",
    Icon: IconGoogleMeet as IconComponent,
    isLogo: true,
  },
  {
    key: "zoom",
    label: "Zoom",
    description: "Zoom link sent with confirmation",
    Icon: IconZoomVideo as IconComponent,
    isLogo: true,
  },
  {
    key: "inperson",
    label: "In person",
    description: "Set a location",
    Icon: MapPinIcon as IconComponent,
    isLogo: false,
  },
];

const MEET_ACTIVATE_KEYS = ["cal-video", "zoom", "inperson"] as const;

export function MeetPanel({ isActive }: { isActive: boolean }) {
  const prefersReducedMotion = useMediaQuery(
    "(prefers-reduced-motion: reduce)",
  );
  const [enabledRows, setEnabledRows] = React.useState<Set<string>>(new Set());
  const [showBookerCard, setShowBookerCard] = React.useState(false);

  // Sequential activation: Cal Video → Zoom → In person → Booker card.
  React.useEffect(() => {
    if (!isActive) {
      const t = setTimeout(() => {
        setEnabledRows(new Set());
        setShowBookerCard(false);
      }, 300);
      return () => clearTimeout(t);
    }
    if (prefersReducedMotion) {
      setEnabledRows(new Set(MEET_ACTIVATE_KEYS));
      setShowBookerCard(true);
      return;
    }
    const timers: ReturnType<typeof setTimeout>[] = [];
    timers.push(
      setTimeout(
        () => setEnabledRows((p) => new Set([...p, "cal-video"])),
        400,
      ),
    );
    timers.push(
      setTimeout(() => setEnabledRows((p) => new Set([...p, "zoom"])), 1000),
    );
    timers.push(
      setTimeout(
        () => setEnabledRows((p) => new Set([...p, "inperson"])),
        1600,
      ),
    );
    timers.push(setTimeout(() => setShowBookerCard(true), 2200));
    return () => {
      for (const t of timers) clearTimeout(t);
    };
  }, [isActive, prefersReducedMotion]);

  return (
    <div className="relative">
      <div className="overflow-hidden rounded-xl border border-border bg-card">
        <div className="border-b border-border px-6 py-5">
          <p className="text-sm font-semibold text-foreground">
            How would you like to meet?
          </p>
          <p className="mt-0.5 text-xs text-muted-foreground">
            Choose the formats available for this event type
          </p>
        </div>

        <div className="divide-y divide-border/50">
          {MEETING_TYPES.map((row) => {
            const Icon = row.Icon;
            return (
              <div key={row.key} className="flex items-center gap-4 px-6 py-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted/70">
                  {row.isLogo ? (
                    <span className="flex h-6 w-6">
                      <Icon />
                    </span>
                  ) : (
                    <Icon
                      className="size-4 text-foreground/60"
                      aria-hidden="true"
                    />
                  )}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-foreground">
                    {row.label}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {row.description}
                  </p>
                </div>
                <VisualSwitch checked={enabledRows.has(row.key)} />
              </div>
            );
          })}
        </div>
      </div>

      {/* Floating Booker chooses card — bottom-right, consistent overlap offset */}
      <div
        aria-live="polite"
        className={cn(
          "pointer-events-none absolute z-10",
          !prefersReducedMotion &&
            "transition-[opacity,transform] duration-450 ease-out",
        )}
        style={
          prefersReducedMotion
            ? {
                right: "-52px",
                bottom: "-36px",
                opacity: showBookerCard ? 1 : 0,
              }
            : {
                right: "-52px",
                bottom: "-36px",
                opacity: showBookerCard ? 1 : 0,
                transform: showBookerCard
                  ? "translateY(0)"
                  : "translateY(10px)",
              }
        }
      >
        <div className="pointer-events-auto w-[264px] rounded-xl border border-border bg-card px-4 py-3.5 shadow-sm">
          <p className="mb-2.5 text-xs font-semibold text-foreground">
            Booker's choice
          </p>
          <div className="flex flex-wrap items-center gap-1.5">
            {/* Cal Video — always selected */}
            <span className="flex items-center gap-1.5 rounded-full bg-foreground px-2.5 py-1 text-xs font-medium text-background">
              <span className="flex h-3.5 w-3.5 shrink-0">
                <NextImage
                  src="/icons/cal-video.svg"
                  width={14}
                  height={14}
                  unoptimized
                  alt=""
                  aria-hidden="true"
                  className="h-full w-full object-contain"
                />
              </span>
              Cal Video
            </span>
            {/* Zoom — inactive option */}
            <span className="flex items-center gap-1.5 rounded-full bg-muted/60 px-2.5 py-1 text-xs font-medium text-foreground/70">
              <span className="flex h-3.5 w-3.5 shrink-0">
                <NextImage
                  src="/icons/zoom.svg"
                  width={14}
                  height={14}
                  unoptimized
                  alt=""
                  aria-hidden="true"
                  className="h-full w-full object-contain"
                />
              </span>
              Zoom
            </span>
            {/* In person — inactive option */}
            <span className="flex items-center gap-1.5 rounded-full bg-muted/60 px-2.5 py-1 text-xs font-medium text-foreground/70">
              <MapPinIcon
                className="size-3.5 shrink-0 text-foreground/60"
                aria-hidden="true"
              />
              In person
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
