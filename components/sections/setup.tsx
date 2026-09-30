"use client";

import {
  CheckIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  GlobeIcon,
  PlusIcon,
  VideoIcon,
} from "lucide-react";
import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// ─── Steps ────────────────────────────────────────────────────────────────────

const STEPS = [
  {
    id: "connect" as const,
    number: "1",
    label: "Connect",
    fullLabel: "Connect",
    description: "Link your calendars so Cal.com knows when you're busy.",
  },
  {
    id: "availability" as const,
    number: "2",
    label: "Availability",
    fullLabel: "Set availability",
    description: "Define the days and hours when people can book you.",
  },
  {
    id: "booked" as const,
    number: "3",
    label: "Get booked",
    fullLabel: "Get booked",
    description: "Share your link — anyone can find a time that works.",
  },
] as const;

type StepId = (typeof STEPS)[number]["id"];

// ─── useFadeIn ────────────────────────────────────────────────────────────────

function useFadeIn(isActive: boolean): boolean {
  // Start visible if initially active so the default step renders without animation delay.
  const [visible, setVisible] = React.useState(isActive);
  React.useEffect(() => {
    if (!isActive) {
      setVisible(false);
      return;
    }
    const id = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(id);
  }, [isActive]);
  return visible;
}

// ─── SetupSection ─────────────────────────────────────────────────────────────

export function SetupSection() {
  const [activeStep, setActiveStep] = React.useState<StepId>("connect");

  return (
    <section
      aria-label="Simple scheduling, set up in minutes"
      className="w-full bg-background"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="border-t border-border py-20 lg:py-28">
          {/* Section header */}
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
              This is where Cal.com starts
            </p>
            <h2 className="mt-4 text-[1.875rem] font-bold leading-tight tracking-tight text-foreground lg:text-[2.25rem]">
              Simple scheduling,
              <br />
              set up in minutes.
            </h2>
            <p className="mt-4 text-[0.9375rem] leading-relaxed text-muted-foreground">
              Connect your calendars, define when you&apos;re available, and let
              people book a time that works — without the back-and-forth.
            </p>
          </div>

          {/* Step nav + product stage */}
          <div className="mt-14 grid grid-cols-1 items-start gap-8 lg:mt-16 lg:grid-cols-[260px_1fr] lg:gap-10 xl:grid-cols-[280px_1fr] xl:gap-14">
            {/* Step nav */}
            <div
              role="tablist"
              aria-label="Setup steps"
              className="flex flex-row gap-1.5 lg:flex-col lg:gap-1"
            >
              {STEPS.map((step) => {
                const isActive = activeStep === step.id;
                return (
                  <button
                    key={step.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-controls={`setup-panel-${step.id}`}
                    id={`setup-tab-${step.id}`}
                    onClick={() => setActiveStep(step.id)}
                    className={cn(
                      "group relative flex flex-1 flex-col items-center gap-2 rounded-xl border px-3 py-3.5 text-center transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring lg:flex-none lg:flex-row lg:items-start lg:gap-3 lg:px-4 lg:py-4 lg:text-left",
                      isActive
                        ? "border-border bg-muted/50"
                        : "border-transparent hover:bg-muted/30",
                    )}
                  >
                    {/* Left accent — desktop only */}
                    {isActive && (
                      <span
                        aria-hidden="true"
                        className="absolute inset-y-3 left-0 hidden w-0.5 rounded-r-full bg-foreground lg:block"
                      />
                    )}

                    {/* Number pill */}
                    <span
                      className={cn(
                        "flex size-6 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold transition-colors",
                        isActive
                          ? "bg-foreground text-background"
                          : "bg-border text-muted-foreground",
                      )}
                    >
                      {step.number}
                    </span>

                    {/* Labels */}
                    <div className="min-w-0">
                      <p
                        className={cn(
                          "text-xs font-semibold transition-colors lg:text-sm",
                          isActive
                            ? "text-foreground"
                            : "text-muted-foreground",
                        )}
                      >
                        <span className="lg:hidden">{step.label}</span>
                        <span className="hidden lg:inline">
                          {step.fullLabel}
                        </span>
                      </p>
                      <p
                        className={cn(
                          "mt-0.5 hidden text-xs leading-snug transition-colors lg:block",
                          isActive
                            ? "text-muted-foreground"
                            : "text-muted-foreground/40",
                        )}
                      >
                        {step.description}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Product stage — grid-stacked for crossfade */}
            <div className="grid">
              {STEPS.map((step) => {
                const isActive = activeStep === step.id;
                return (
                  <div
                    key={step.id}
                    role="tabpanel"
                    id={`setup-panel-${step.id}`}
                    aria-labelledby={`setup-tab-${step.id}`}
                    aria-hidden={!isActive}
                    style={{ gridArea: "1 / 1" }}
                    className={cn(
                      "transition-opacity duration-200",
                      isActive
                        ? "relative z-10 opacity-100"
                        : "pointer-events-none z-0 opacity-0",
                    )}
                  >
                    {step.id === "connect" && (
                      <ConnectPanel isActive={isActive} />
                    )}
                    {step.id === "availability" && (
                      <AvailabilityPanel isActive={isActive} />
                    )}
                    {step.id === "booked" && (
                      <BookedPanel isActive={isActive} />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── ConnectPanel ─────────────────────────────────────────────────────────────

type CalendarEntry = {
  key: string;
  name: string;
  accountLabel: string | null;
  initial: string;
  connected: boolean;
};

const CALENDARS: CalendarEntry[] = [
  {
    key: "google",
    name: "Google Calendar",
    accountLabel: "Personal",
    initial: "G",
    connected: true,
  },
  {
    key: "apple",
    name: "Apple Calendar",
    accountLabel: "iCloud",
    initial: "A",
    connected: true,
  },
  {
    key: "outlook",
    name: "Microsoft Outlook",
    accountLabel: null,
    initial: "O",
    connected: false,
  },
];

function ConnectPanel({ isActive }: { isActive: boolean }) {
  const visible = useFadeIn(isActive);

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-background">
      {/* Header */}
      <div className="border-b border-border px-6 py-5">
        <p className="text-sm font-semibold text-foreground">Your calendars</p>
        <p className="mt-0.5 text-xs text-muted-foreground">
          Cal.com checks your existing events to prevent double-booking.
        </p>
      </div>

      {/* Calendar rows */}
      <div className="divide-y divide-border/50">
        {CALENDARS.map((cal, i) => (
          <div
            key={cal.key}
            className="flex items-center gap-4 px-6 py-4 transition-[opacity,transform] duration-300"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "none" : "translateY(8px)",
              transitionDelay: visible ? `${i * 60}ms` : "0ms",
            }}
          >
            {/* Initial badge */}
            <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted text-sm font-bold text-foreground/70">
              {cal.initial}
            </span>

            {/* Name + account */}
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-foreground">{cal.name}</p>
              {cal.accountLabel && (
                <p className="text-xs text-muted-foreground">
                  {cal.accountLabel}
                </p>
              )}
            </div>

            {/* Connection status */}
            {cal.connected ? (
              <Badge variant="success" size="sm">
                Connected
              </Badge>
            ) : (
              <button
                type="button"
                className="flex items-center gap-1 rounded-md border border-border px-2.5 py-1 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <PlusIcon className="size-3" aria-hidden="true" />
                Add
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Conflict checking footer */}
      <div
        className="flex items-center gap-3 border-t border-border bg-muted/30 px-6 py-4 transition-opacity duration-300"
        style={{
          opacity: visible ? 1 : 0,
          transitionDelay: visible ? `${CALENDARS.length * 60 + 60}ms` : "0ms",
        }}
      >
        <span
          className="flex size-5 shrink-0 items-center justify-center rounded-full bg-success/15 text-success-foreground"
          aria-hidden="true"
        >
          <CheckIcon className="size-3" />
        </span>
        <div>
          <p className="text-xs font-medium text-foreground">
            Conflict checking active
          </p>
          <p className="text-xs text-muted-foreground">
            Your existing events remain private
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── AvailabilityPanel ────────────────────────────────────────────────────────

type DayEntry = {
  key: string;
  label: string;
  short: string;
  enabled: boolean;
  start: string | null;
  end: string | null;
};

const DAYS: DayEntry[] = [
  {
    key: "mon",
    label: "Monday",
    short: "Mon",
    enabled: true,
    start: "9:00 AM",
    end: "5:00 PM",
  },
  {
    key: "tue",
    label: "Tuesday",
    short: "Tue",
    enabled: true,
    start: "9:00 AM",
    end: "5:00 PM",
  },
  {
    key: "wed",
    label: "Wednesday",
    short: "Wed",
    enabled: true,
    start: "9:00 AM",
    end: "5:00 PM",
  },
  {
    key: "thu",
    label: "Thursday",
    short: "Thu",
    enabled: true,
    start: "9:00 AM",
    end: "5:00 PM",
  },
  {
    key: "fri",
    label: "Friday",
    short: "Fri",
    enabled: true,
    start: "9:00 AM",
    end: "5:00 PM",
  },
  {
    key: "sat",
    label: "Saturday",
    short: "Sat",
    enabled: false,
    start: null,
    end: null,
  },
  {
    key: "sun",
    label: "Sunday",
    short: "Sun",
    enabled: false,
    start: null,
    end: null,
  },
];

function VisualSwitch({ checked }: { checked: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "inline-flex h-[18px] w-[30px] shrink-0 items-center rounded-full p-[2px] transition-colors duration-200",
        checked ? "bg-foreground" : "bg-border",
      )}
    >
      <span
        className={cn(
          "block size-[14px] rounded-full bg-background shadow-sm transition-transform duration-200",
          checked ? "translate-x-[12px]" : "translate-x-0",
        )}
      />
    </span>
  );
}

function AvailabilityPanel({ isActive }: { isActive: boolean }) {
  const visible = useFadeIn(isActive);

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-background">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 border-b border-border px-6 py-5">
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
          Europe/Berlin
        </span>
      </div>

      {/* Day rows */}
      <div className="divide-y divide-border/50">
        {DAYS.map((day, i) => (
          <div
            key={day.key}
            className="flex items-center gap-4 px-6 py-3.5 transition-[opacity,transform] duration-300"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "none" : "translateX(-8px)",
              transitionDelay: visible ? `${i * 45}ms` : "0ms",
            }}
          >
            <VisualSwitch checked={day.enabled} />

            <span
              className={cn(
                "w-24 shrink-0 text-sm font-medium",
                day.enabled ? "text-foreground" : "text-muted-foreground/40",
              )}
            >
              <span className="hidden sm:inline">{day.label}</span>
              <span className="sm:hidden">{day.short}</span>
            </span>

            {day.enabled && day.start && day.end ? (
              <div className="flex items-center gap-2 text-xs">
                <span className="rounded border border-border px-2.5 py-1 font-medium text-foreground">
                  {day.start}
                </span>
                <span className="text-muted-foreground/40">–</span>
                <span className="rounded border border-border px-2.5 py-1 font-medium text-foreground">
                  {day.end}
                </span>
              </div>
            ) : (
              <span className="text-xs text-muted-foreground/40">
                Unavailable
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── BookedPanel ──────────────────────────────────────────────────────────────

const CAL_DAYS_HDR = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"] as const;
const OCT_OFFSET = 3; // Oct 1 2025 is Wednesday (index 3)
const OCT_CELLS = Array.from({ length: 35 }, (_, i) => {
  const d = i - OCT_OFFSET + 1;
  return d >= 1 && d <= 31 ? d : null;
});
const AVAILABLE_DAYS = new Set([
  6, 7, 8, 9, 10, 13, 14, 15, 16, 17, 20, 21, 22, 23, 24, 27, 28, 29, 30, 31,
]);
const SELECTED_DAY = 14;
const TIME_SLOTS = [
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "2:00 PM",
  "3:30 PM",
] as const;
const SELECTED_SLOT = "10:00 AM";

function BookedPanel({ isActive }: { isActive: boolean }) {
  const visible = useFadeIn(isActive);

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-background">
      {/* Host identity */}
      <div className="border-b border-border px-6 py-5">
        <div className="flex items-center gap-3">
          <div className="relative shrink-0">
            <span className="flex size-10 items-center justify-center rounded-full bg-muted text-sm font-semibold text-foreground">
              AM
            </span>
            <span
              className="absolute -bottom-0.5 -right-0.5 size-3 rounded-full border-2 border-background bg-success"
              aria-hidden="true"
            />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-foreground">Alex Morgan</p>
            <p className="text-xs text-muted-foreground">30 Minute Meeting</p>
          </div>
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <VideoIcon className="size-3 opacity-60" aria-hidden="true" />
            Video call
          </span>
          <span aria-hidden="true" className="opacity-30">
            ·
          </span>
          <span>30 min</span>
          <span aria-hidden="true" className="opacity-30">
            ·
          </span>
          <span className="flex items-center gap-1">
            <GlobeIcon className="size-3 opacity-60" aria-hidden="true" />
            Europe/Berlin
          </span>
        </div>
      </div>

      {/* Calendar + time slots */}
      <div
        className="flex divide-x divide-border transition-opacity duration-300"
        style={{
          opacity: visible ? 1 : 0,
          transitionDelay: visible ? "40ms" : "0ms",
        }}
      >
        {/* Calendar */}
        <div className="flex-1 px-6 py-5" aria-hidden="true">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-xs font-semibold text-foreground">
              October 2025
            </span>
            <div className="flex items-center gap-0.5">
              <button
                type="button"
                aria-label="Previous month"
                tabIndex={-1}
                className="flex size-6 items-center justify-center rounded text-muted-foreground hover:bg-muted"
              >
                <ChevronLeftIcon className="size-3.5" aria-hidden="true" />
              </button>
              <button
                type="button"
                aria-label="Next month"
                tabIndex={-1}
                className="flex size-6 items-center justify-center rounded text-muted-foreground hover:bg-muted"
              >
                <ChevronRightIcon className="size-3.5" aria-hidden="true" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-7 text-center">
            {CAL_DAYS_HDR.map((d) => (
              <div
                key={d}
                className="flex h-8 items-center justify-center text-[10px] font-medium text-muted-foreground/60"
              >
                {d}
              </div>
            ))}
            {OCT_CELLS.map((day, i) => (
              <div
                key={day !== null ? `day-${day}` : `empty-${i}`}
                className={cn(
                  "mx-auto flex h-8 w-8 items-center justify-center rounded-full text-xs",
                  day === null
                    ? ""
                    : day === SELECTED_DAY
                      ? "bg-primary font-semibold text-primary-foreground"
                      : AVAILABLE_DAYS.has(day)
                        ? "cursor-default text-foreground"
                        : "text-muted-foreground/30",
                )}
              >
                {day}
              </div>
            ))}
          </div>
        </div>

        {/* Time slots */}
        <div
          className="flex w-36 shrink-0 flex-col gap-2 px-4 py-5 transition-[opacity,transform] duration-300"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "none" : "translateX(8px)",
            transitionDelay: visible ? "160ms" : "0ms",
          }}
        >
          <p className="mb-1 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground/60">
            Tue, Oct 14
          </p>
          {TIME_SLOTS.map((slot) => (
            <button
              key={slot}
              type="button"
              tabIndex={-1}
              aria-pressed={slot === SELECTED_SLOT}
              className={cn(
                "w-full rounded-lg border py-2 text-center text-xs font-medium transition-colors",
                slot === SELECTED_SLOT
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border text-foreground",
              )}
            >
              {slot}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
