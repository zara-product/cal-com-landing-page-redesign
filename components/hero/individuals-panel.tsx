"use client";

import { ClockIcon, GlobeIcon, VideoIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

// ─── Individuals animation thresholds (% of MODE_DURATION.individuals = 4000ms) ──
const IND_CALENDAR = 6.25; // 250ms — available dates illuminate; Oct 8 selected
const IND_SLOTS = [22.5, 24.0, 25.5, 27.0, 28.5, 30.0] as const; // 900–1200ms stagger
const IND_SELECT = 38.75; // 1550ms — 10:00 selected

const CAL_DAYS = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"] as const;

// October 2026: Oct 1 = Thursday (offset 4 in SUN-SAT grid)
const OCT_OFFSET = 4;
const OCT_CELLS = Array.from({ length: 35 }, (_, i) => {
  const d = i - OCT_OFFSET + 1;
  return d >= 1 && d <= 31 ? d : null;
});

const AVAILABLE_DAYS = new Set([
  5, 6, 7, 9, 12, 13, 14, 15, 16, 19, 20, 21, 22, 23, 26, 27,
]);
const SELECTED_DAY = 8;
const TIME_SLOTS = [
  "9:00",
  "9:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
] as const;
const SELECTED_SLOT = "10:00";

export function IndividualsPanel({
  progress,
  isActive,
  prefersReducedMotion,
}: {
  progress: number;
  isActive: boolean;
  prefersReducedMotion: boolean;
}) {
  const instant = prefersReducedMotion && isActive;
  const calIlluminated = instant || (isActive && progress >= IND_CALENDAR);
  const visibleSlotCount = instant
    ? TIME_SLOTS.length
    : isActive
      ? IND_SLOTS.filter((t) => progress >= t).length
      : 0;
  const slotSelected = instant || (isActive && progress >= IND_SELECT);

  return (
    <div className="relative min-w-0">
      {/* Main booking card */}
      <div
        style={
          prefersReducedMotion
            ? undefined
            : { transform: isActive ? "none" : "translateY(6px) scale(0.98)" }
        }
        className={cn(
          "overflow-hidden rounded-2xl border border-border bg-card shadow-sm",
          !prefersReducedMotion &&
            isActive &&
            "transition-transform duration-450 ease-out",
        )}
      >
        {/* Mobile-only compact host row */}
        <div className="flex items-center gap-2.5 border-b border-border p-3 sm:hidden">
          <Avatar className="size-7">
            <AvatarImage src="/avatars/individuals-ewa.png" alt="Ewa Nowak" />
            <AvatarFallback className="bg-avatar-bg text-[9px] font-semibold text-avatar-fg">
              EN
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1">
            <p className="text-2xs text-muted-foreground">Ewa Nowak</p>
            <p className="text-xs font-bold text-foreground">Intro call</p>
            <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-muted-foreground">
              <span className="flex items-center gap-1">
                <ClockIcon className="size-3 shrink-0" aria-hidden="true" />
                <span className="text-2xs">30m</span>
              </span>
              <span className="flex items-center gap-1">
                <VideoIcon className="size-3 shrink-0" aria-hidden="true" />
                <span className="text-2xs">Cal Video</span>
              </span>
              <span className="flex items-center gap-1">
                <GlobeIcon className="size-3 shrink-0" aria-hidden="true" />
                <span className="text-2xs">Warsaw</span>
              </span>
            </div>
          </div>
        </div>
        <div className="flex divide-x divide-border">
          {/* Left — host details */}
          <div className="hidden sm:flex w-[132px] shrink-0 flex-col gap-4 p-4">
            <Avatar className="size-8">
              <AvatarImage src="/avatars/individuals-ewa.png" alt="Ewa Nowak" />
              <AvatarFallback className="bg-avatar-bg text-[9px] font-semibold text-avatar-fg">
                EN
              </AvatarFallback>
            </Avatar>
            <div className="-mt-1">
              <p className="text-micro text-muted-foreground">Ewa Nowak</p>
              <p className="mt-0.5 text-sm font-bold text-foreground">
                Intro call
              </p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-1.5">
                <ClockIcon
                  className="size-3 shrink-0 text-muted-foreground"
                  aria-hidden="true"
                />
                <span className="text-micro text-muted-foreground">30m</span>
              </div>
              <div className="flex items-center gap-1.5">
                <VideoIcon
                  className="size-3 shrink-0 text-muted-foreground"
                  aria-hidden="true"
                />
                <span className="text-micro text-muted-foreground">
                  Cal Video
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <GlobeIcon
                  className="size-3 shrink-0 text-muted-foreground"
                  aria-hidden="true"
                />
                <span className="text-micro text-muted-foreground">
                  Europe/Warsaw
                </span>
              </div>
            </div>
          </div>

          {/* Middle — calendar */}
          <div className="min-w-0 flex-1 p-4">
            <div className="mb-3 flex items-baseline gap-1">
              <span className="text-sm font-bold text-foreground">October</span>
              <span className="text-sm text-muted-foreground">2026</span>
            </div>
            <div className="grid grid-cols-7" aria-hidden="true">
              {CAL_DAYS.map((d) => (
                <div
                  key={d}
                  className="pb-1.5 text-center text-[8px] font-medium tracking-wide text-muted-foreground/50"
                >
                  <span className="sm:hidden">{d[0]}</span>
                  <span className="hidden sm:inline">{d}</span>
                </div>
              ))}
              {OCT_CELLS.map((day, i) => {
                if (day === null) {
                  // biome-ignore lint/suspicious/noArrayIndexKey: static calendar offset — order never changes
                  return <div key={`e-${i}`} className="py-[3px]" />;
                }
                const isSelected = day === SELECTED_DAY;
                const isAvail = AVAILABLE_DAYS.has(day);
                return (
                  <div
                    key={day}
                    className="flex items-center justify-center py-[3px]"
                  >
                    <div
                      className={cn(
                        "flex size-5 items-center justify-center rounded-lg text-2xs transition-all duration-250 sm:size-7 sm:rounded-xl sm:text-micro",
                        isSelected
                          ? calIlluminated
                            ? "bg-foreground font-semibold text-background"
                            : "text-muted-foreground/30"
                          : isAvail
                            ? calIlluminated
                              ? "bg-neutral-wash font-medium text-foreground"
                              : "text-muted-foreground/30"
                            : "text-muted-foreground/30",
                      )}
                    >
                      {day}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right — time slots */}
          <div className="flex w-[60px] shrink-0 flex-col bg-muted/50 px-2 pb-2.5 pt-4 sm:w-[76px] sm:px-2.5">
            <p className="mb-4 text-xs" aria-hidden="true">
              <span className="font-normal text-muted-foreground">Thu </span>
              <span className="font-semibold text-foreground">08</span>
            </p>
            <div className="flex flex-col gap-1.5" aria-hidden="true">
              {TIME_SLOTS.map((slot, i) => {
                const isVisible = i < visibleSlotCount;
                const isSelected = slotSelected && slot === SELECTED_SLOT;
                return (
                  <div
                    key={slot}
                    style={
                      prefersReducedMotion
                        ? undefined
                        : {
                            opacity: isVisible ? 1 : 0,
                            transform: isVisible ? "none" : "translateY(4px)",
                          }
                    }
                    className={cn(
                      "rounded-lg py-1 text-center text-micro font-medium",
                      !prefersReducedMotion &&
                        "transition-[opacity,transform,background-color,color] duration-250 ease-out",
                      isSelected
                        ? "bg-foreground text-background"
                        : "border border-border bg-card text-foreground shadow-xs",
                    )}
                  >
                    {slot}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
