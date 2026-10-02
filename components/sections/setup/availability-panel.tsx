"use client";

import { CopyIcon, GlobeIcon, PlusIcon, XIcon } from "lucide-react";
import * as React from "react";
import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";
import { VisualSwitch } from "./visual-switch";

const DAYS = [
  { key: "sun", label: "Sunday", short: "Sun", start: null, end: null },
  {
    key: "mon",
    label: "Monday",
    short: "Mon",
    start: "9:00 AM",
    end: "5:00 PM",
  },
  {
    key: "tue",
    label: "Tuesday",
    short: "Tue",
    start: "9:00 AM",
    end: "5:00 PM",
  },
  {
    key: "wed",
    label: "Wednesday",
    short: "Wed",
    start: "9:00 AM",
    end: "5:00 PM",
  },
  {
    key: "thu",
    label: "Thursday",
    short: "Thu",
    start: "9:00 AM",
    end: "5:00 PM",
  },
  {
    key: "fri",
    label: "Friday",
    short: "Fri",
    start: "9:00 AM",
    end: "5:00 PM",
  },
  { key: "sat", label: "Saturday", short: "Sat", start: null, end: null },
] as const;

export function AvailabilityPanel({ isActive }: { isActive: boolean }) {
  const prefersReducedMotion = useMediaQuery(
    "(prefers-reduced-motion: reduce)",
  );
  const [activeDays, setActiveDays] = React.useState<Set<string>>(new Set());

  React.useEffect(() => {
    if (!isActive) {
      const t = setTimeout(() => {
        setActiveDays(new Set());
      }, 300);
      return () => clearTimeout(t);
    }

    const weekdays = DAYS.filter((d) => d.start !== null);

    if (prefersReducedMotion) {
      setActiveDays(new Set(weekdays.map((d) => d.key)));
      return;
    }

    const timers: ReturnType<typeof setTimeout>[] = [];

    for (let i = 0; i < weekdays.length; i++) {
      const { key } = weekdays[i];
      timers.push(
        setTimeout(
          () => {
            setActiveDays((prev) => new Set([...prev, key]));
          },
          350 + i * 380,
        ),
      );
    }

    return () => {
      for (const t of timers) clearTimeout(t);
    };
  }, [isActive, prefersReducedMotion]);

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 border-b border-border px-6 py-4">
        <div>
          <p className="text-sm font-semibold text-foreground">
            Your availability
          </p>
          <p className="mt-0.5 text-xs text-muted-foreground">
            When can people book time with you?
          </p>
        </div>
        <span className="flex shrink-0 items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs text-muted-foreground">
          <GlobeIcon className="size-3 opacity-60" aria-hidden="true" />
          Europe / Berlin
        </span>
      </div>

      {/* Day rows — weekdays activate sequentially; weekend stays muted */}
      <div className="divide-y divide-border/50">
        {DAYS.map((day) => {
          const unavailable = day.start === null;
          const on = !unavailable && activeDays.has(day.key);
          return (
            <div key={day.key} className="flex items-center gap-3 px-6 py-1.5">
              <VisualSwitch checked={on} />
              <span
                className={cn(
                  "w-24 shrink-0 text-sm font-medium transition-colors duration-250",
                  on ? "text-foreground" : "text-muted-foreground/40",
                )}
              >
                <span className="hidden sm:inline">{day.label}</span>
                <span className="sm:hidden">{day.short}</span>
              </span>

              {/* Middle: time controls or unavailable label */}
              <div className="flex flex-1 items-center">
                {unavailable ? (
                  <span className="text-xs text-muted-foreground/40">
                    Unavailable
                  </span>
                ) : (
                  <div
                    className={cn(
                      "flex items-center gap-1.5 text-xs",
                      !prefersReducedMotion &&
                        "transition-[opacity,transform] duration-250 ease-out",
                    )}
                    style={
                      prefersReducedMotion
                        ? undefined
                        : {
                            opacity: on ? 1 : 0,
                            transform: on ? "none" : "translateX(-6px)",
                          }
                    }
                  >
                    <span className="rounded border border-border px-2 py-0.5 font-medium text-foreground">
                      {day.start}
                    </span>
                    <span className="text-muted-foreground/40">–</span>
                    <span className="rounded border border-border px-2 py-0.5 font-medium text-foreground">
                      {day.end}
                    </span>
                    <span
                      aria-hidden="true"
                      className="ml-1 text-muted-foreground/30"
                    >
                      <XIcon className="size-3" />
                    </span>
                  </div>
                )}
              </div>

              {/* Right-side actions — always visible on every row */}
              <div
                aria-hidden="true"
                className="flex shrink-0 items-center gap-1 text-muted-foreground/30"
              >
                <PlusIcon className="size-3" />
                <CopyIcon className="size-3" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
