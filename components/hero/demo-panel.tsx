"use client";

import {
  ArrowRightIcon,
  Building2Icon,
  ChevronLeftIcon,
  ChevronRightIcon,
  Code2Icon,
  GlobeIcon,
  StarIcon,
  UserRoundIcon,
  UsersRoundIcon,
  VideoIcon,
} from "lucide-react";
import * as React from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// ─── Constants ────────────────────────────────────────────────────────────────

const MODES = ["individuals", "teams", "organizations", "developers"] as const;
type Mode = (typeof MODES)[number];

const DURATION = 4000;

const MODE_LABELS: Record<Mode, string> = {
  individuals: "Individuals",
  teams: "Teams",
  organizations: "Organizations",
  developers: "Developers",
};

const MODE_SHORT: Record<Mode, string> = {
  individuals: "Individuals",
  teams: "Teams",
  organizations: "Orgs",
  developers: "Dev",
};

const MODE_ICONS: Record<Mode, React.ElementType> = {
  individuals: UserRoundIcon,
  teams: UsersRoundIcon,
  organizations: Building2Icon,
  developers: Code2Icon,
};

// ─── Hook ─────────────────────────────────────────────────────────────────────

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

// ─── DemoPanel ────────────────────────────────────────────────────────────────

export function DemoPanel() {
  const [activeMode, setActiveMode] = React.useState<Mode>("individuals");
  const [progress, setProgress] = React.useState(0);
  const [isPaused, setIsPaused] = React.useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();
  const tabsRef = React.useRef<HTMLDivElement>(null);
  const progressRef = React.useRef(0);

  // biome-ignore lint/correctness/useExhaustiveDependencies: activeMode resets the timer
  React.useEffect(() => {
    if (prefersReducedMotion || isPaused) return;

    // Resume from saved progress position after pause
    const startOffset = (progressRef.current / 100) * DURATION;
    const startTime = performance.now() - startOffset;

    let raf: number;
    const tick = (now: number) => {
      const p = Math.min(((now - startTime) / DURATION) * 100, 100);
      progressRef.current = p;
      setProgress(p);
      if (p >= 100) {
        progressRef.current = 0;
        setActiveMode((m) => MODES[(MODES.indexOf(m) + 1) % MODES.length]);
        return;
      }
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [activeMode, isPaused, prefersReducedMotion]);

  const switchMode = React.useCallback((mode: Mode) => {
    progressRef.current = 0;
    setProgress(0);
    setActiveMode(mode);
  }, []);

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLButtonElement>,
    mode: Mode,
  ) => {
    const idx = MODES.indexOf(mode);
    const buttons =
      tabsRef.current?.querySelectorAll<HTMLButtonElement>("[role='tab']");
    const go = (i: number) => {
      switchMode(MODES[i]);
      buttons?.[i]?.focus();
    };
    if (e.key === "ArrowRight") {
      e.preventDefault();
      go((idx + 1) % MODES.length);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      go((idx - 1 + MODES.length) % MODES.length);
    } else if (e.key === "Home") {
      e.preventDefault();
      go(0);
    } else if (e.key === "End") {
      e.preventDefault();
      go(MODES.length - 1);
    }
  };

  const handlePause = () => setIsPaused(true);
  const handleResume = () => setIsPaused(false);

  return (
    // biome-ignore lint/a11y/noStaticElementInteractions: pause/resume on hover is a UX enhancement only
    <div
      className="flex flex-col gap-4"
      onMouseEnter={handlePause}
      onMouseLeave={handleResume}
      onFocusCapture={handlePause}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
          handleResume();
        }
      }}
    >
      {/* Standalone mode selector */}
      <div
        ref={tabsRef}
        role="tablist"
        aria-label="Product modes"
        className="flex gap-0.5 rounded-lg bg-muted p-0.5"
      >
        {MODES.map((mode) => {
          const isActive = activeMode === mode;
          const Icon = MODE_ICONS[mode];
          return (
            <button
              key={mode}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-controls={`hero-panel-${mode}`}
              id={`hero-tab-${mode}`}
              onClick={() => switchMode(mode)}
              onKeyDown={(e) => handleKeyDown(e, mode)}
              tabIndex={isActive ? 0 : -1}
              className={cn(
                "relative flex flex-1 items-center justify-center gap-1.5 rounded-md px-2.5 py-2 text-xs font-medium transition-[color,background-color,box-shadow] duration-150",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                isActive
                  ? "bg-background text-foreground shadow-xs/5"
                  : "text-muted-foreground hover:text-foreground/80",
              )}
            >
              <Icon className="size-3.5 shrink-0" aria-hidden="true" />
              <span className="hidden sm:inline">{MODE_LABELS[mode]}</span>
              <span className="sm:hidden">{MODE_SHORT[mode]}</span>
              {/* Progress line */}
              {isActive && (
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 h-0.5 overflow-hidden rounded-b-md"
                >
                  <span
                    className="absolute inset-y-0 left-0 bg-primary"
                    style={{ width: `${progress}%` }}
                  />
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Product stage — grid-stacked for crossfade without fixed container */}
      <div className="grid min-h-[340px]">
        {MODES.map((mode) => {
          const isActive = activeMode === mode;
          return (
            <div
              key={mode}
              role="tabpanel"
              id={`hero-panel-${mode}`}
              aria-labelledby={`hero-tab-${mode}`}
              aria-hidden={!isActive}
              style={{ gridArea: "1 / 1" }}
              className={cn(
                !prefersReducedMotion && "transition-opacity duration-200",
                isActive
                  ? "opacity-100 z-10"
                  : "opacity-0 pointer-events-none z-0",
              )}
            >
              {mode === "individuals" && <IndividualsPanel />}
              {mode === "teams" && <TeamsPanel />}
              {mode === "organizations" && <OrgsPanel />}
              {mode === "developers" && <DevelopersPanel />}
            </div>
          );
        })}
      </div>

      {/* Trust row */}
      <TrustRow />
    </div>
  );
}

// ─── Trust Row ────────────────────────────────────────────────────────────────

function TrustRow() {
  return (
    <div className="flex items-center gap-4 border-t border-border pt-4">
      <div className="flex flex-1 flex-col items-center gap-0.5">
        <span className="text-[10px] font-semibold text-foreground">
          #1 Product of the Month
        </span>
        <span className="text-[9px] font-medium uppercase tracking-wide text-muted-foreground">
          Product Hunt
        </span>
      </div>

      <div className="h-7 w-px bg-border" aria-hidden="true" />

      <div className="flex flex-1 flex-col items-center gap-0.5">
        <div className="flex items-center gap-1">
          <StarIcon
            className="size-3 fill-foreground text-foreground"
            aria-hidden="true"
          />
          <span className="text-[10px] font-semibold text-foreground">
            4.6 / 5
          </span>
        </div>
        <span className="text-[9px] text-muted-foreground">
          G2 · 154 reviews
        </span>
      </div>

      <div className="h-7 w-px bg-border" aria-hidden="true" />

      <div className="flex flex-1 flex-col items-center gap-0.5">
        <div className="flex items-center gap-1">
          <StarIcon
            className="size-3 fill-foreground text-foreground"
            aria-hidden="true"
          />
          <span className="text-[10px] font-semibold text-foreground">
            4.7 / 5
          </span>
        </div>
        <span className="text-[9px] text-muted-foreground">
          Trustpilot · 413 reviews
        </span>
      </div>
    </div>
  );
}

// ─── Panel: Individuals ───────────────────────────────────────────────────────

const CAL_DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"] as const;

// October 2025: Oct 1 = Wednesday (offset 3), 31 days
const OCT_OFFSET = 3;
const OCT_CELLS = Array.from({ length: 35 }, (_, i) => {
  const d = i - OCT_OFFSET + 1;
  return d >= 1 && d <= 31 ? d : null;
});

const AVAILABLE_DAYS = new Set([
  6, 7, 8, 9, 10, 13, 14, 15, 16, 17, 20, 21, 22, 23, 24, 27, 28, 29, 30, 31,
]);
const SELECTED_DAY = 14;
const TIME_SLOTS = ["9:00 AM", "10:00 AM", "11:00 AM", "2:00 PM", "3:30 PM"];
const SELECTED_SLOT = "10:00 AM";

function IndividualsPanel() {
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-background">
      {/* Host identity header */}
      <div className="border-b border-border px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="relative shrink-0">
            <Avatar className="size-10">
              <AvatarFallback className="bg-neutral-100 text-sm font-semibold text-neutral-700">
                AM
              </AvatarFallback>
            </Avatar>
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

      {/* Date + time */}
      <div className="flex gap-0 divide-x divide-border">
        {/* Calendar */}
        <div className="min-w-0 flex-1 px-4 py-4">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-xs font-semibold text-foreground">
              October 2025
            </span>
            <div className="flex items-center gap-0.5">
              <button
                type="button"
                aria-label="Previous month"
                className="flex size-6 items-center justify-center rounded text-muted-foreground hover:bg-muted hover:text-foreground"
              >
                <ChevronLeftIcon className="size-3.5" />
              </button>
              <button
                type="button"
                aria-label="Next month"
                className="flex size-6 items-center justify-center rounded text-muted-foreground hover:bg-muted hover:text-foreground"
              >
                <ChevronRightIcon className="size-3.5" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-7 text-center" aria-hidden="true">
            {CAL_DAYS.map((d) => (
              <div
                key={d}
                className="flex h-7 items-center justify-center text-[10px] font-medium text-muted-foreground/60"
              >
                {d}
              </div>
            ))}
            {OCT_CELLS.map((day, i) => (
              <div
                key={day !== null ? `day-${day}` : `empty-${i}`}
                className={cn(
                  "mx-auto flex h-7 w-7 items-center justify-center rounded-full text-[11px]",
                  day === null
                    ? ""
                    : day === SELECTED_DAY
                      ? "bg-primary font-semibold text-primary-foreground"
                      : AVAILABLE_DAYS.has(day)
                        ? "cursor-pointer text-foreground hover:bg-muted"
                        : "text-muted-foreground/30",
                )}
              >
                {day}
              </div>
            ))}
          </div>
        </div>

        {/* Time slots */}
        <div className="flex w-[108px] shrink-0 flex-col gap-1.5 px-3 py-4">
          <p className="mb-1 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground/60">
            Tue, Oct 14
          </p>
          {TIME_SLOTS.map((slot) => (
            <button
              key={slot}
              type="button"
              aria-pressed={slot === SELECTED_SLOT}
              className={cn(
                "w-full rounded-lg border py-1.5 text-center text-xs font-medium transition-colors",
                slot === SELECTED_SLOT
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border text-foreground hover:bg-muted",
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

// ─── Panel: Teams ─────────────────────────────────────────────────────────────

const TEAM_MEMBERS = [
  {
    initials: "SC",
    name: "Sarah Chen",
    role: "Account Executive",
    assigned: true,
    status: "Next available",
    statusVariant: "success" as const,
  },
  {
    initials: "ML",
    name: "Marcus Lee",
    role: "Account Executive",
    assigned: false,
    status: "2 bookings today",
    statusVariant: "neutral" as const,
  },
  {
    initials: "PP",
    name: "Priya Patel",
    role: "Solutions Engineer",
    assigned: false,
    status: "Available",
    statusVariant: "neutral" as const,
  },
  {
    initials: "AV",
    name: "Alex Vega",
    role: "Account Executive",
    assigned: false,
    status: "Away",
    statusVariant: "muted" as const,
  },
];

function TeamsPanel() {
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-background">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border px-5 py-4">
        <div>
          <div className="flex items-center gap-2">
            <p className="text-sm font-semibold text-foreground">
              Team Sales Call
            </p>
          </div>
          <div className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
            <VideoIcon className="size-3 opacity-60" aria-hidden="true" />
            <span>Video call · 30 min</span>
          </div>
        </div>
        <Badge variant="secondary" size="sm" className="shrink-0">
          Round robin
        </Badge>
      </div>

      {/* Host list */}
      <div className="px-2 py-2">
        <p className="mb-1 px-3 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground/60">
          Eligible hosts
        </p>
        {TEAM_MEMBERS.map((member) => (
          <div
            key={member.initials}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2.5",
              member.assigned ? "bg-muted/70" : "",
            )}
          >
            <div className="relative shrink-0">
              <Avatar className="size-7">
                <AvatarFallback className="bg-neutral-100 text-[9px] font-semibold text-neutral-700">
                  {member.initials}
                </AvatarFallback>
              </Avatar>
              {member.assigned && (
                <span
                  className="absolute -bottom-0.5 -right-0.5 size-2.5 rounded-full border border-background bg-success"
                  aria-hidden="true"
                />
              )}
            </div>
            <div className="flex min-w-0 flex-1 flex-col">
              <span className="truncate text-xs font-medium text-foreground">
                {member.name}
              </span>
              <span className="truncate text-[10px] text-muted-foreground">
                {member.role}
              </span>
            </div>
            <span
              className={cn(
                "shrink-0 text-[10px] font-medium",
                member.statusVariant === "success"
                  ? "text-success-foreground"
                  : member.statusVariant === "muted"
                    ? "text-muted-foreground/60"
                    : "text-muted-foreground",
              )}
            >
              {member.status}
            </span>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="border-t border-border px-5 py-3">
        <p className="text-[10px] text-muted-foreground">
          Cal.com routes to the least-busy eligible host · resets daily
        </p>
      </div>
    </div>
  );
}

// ─── Panel: Organizations ─────────────────────────────────────────────────────

function OrgsPanel() {
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-background">
      {/* Header */}
      <div className="border-b border-border px-5 py-4">
        <p className="text-sm font-semibold text-foreground">Booking Router</p>
        <p className="mt-0.5 text-xs text-muted-foreground">
          Route bookings to the right team automatically
        </p>
      </div>

      {/* Routing rule */}
      <div className="px-5 py-5">
        {/* Condition */}
        <div className="rounded-lg border border-border bg-muted/40 px-4 py-3">
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground/60">
            When
          </p>
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="rounded border border-border bg-background px-2 py-0.5 text-xs font-medium text-foreground">
              Company size
            </span>
            <span className="text-xs text-muted-foreground">
              is greater than
            </span>
            <span className="rounded border border-border bg-background px-2 py-0.5 text-xs font-medium text-foreground">
              50
            </span>
          </div>
        </div>

        {/* Arrow connector */}
        <div className="flex items-center py-2 pl-4">
          <div className="flex flex-col items-center gap-0.5">
            <div className="h-3 w-px bg-border" />
            <div className="size-1.5 rotate-45 border-b border-r border-muted-foreground/40" />
          </div>
        </div>

        {/* Destination */}
        <div className="rounded-lg border border-border bg-muted/40 px-4 py-3">
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground/60">
            Route to
          </p>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-foreground">
                Enterprise Sales
              </p>
              <p className="mt-0.5 text-xs text-muted-foreground">
                Host: Available host · Round robin
              </p>
            </div>
            <Badge variant="secondary" size="sm">
              Team
            </Badge>
          </div>
        </div>

        {/* Default fallback */}
        <p className="mt-3 text-[10px] text-muted-foreground">
          Default fallback → General Enquiries
        </p>
      </div>
    </div>
  );
}

// ─── Panel: Developers ────────────────────────────────────────────────────────

const DEV_DAYS = [
  { label: "Mo", date: 13 },
  { label: "Tu", date: 14 },
  { label: "We", date: 15 },
  { label: "Th", date: 16 },
  { label: "Fr", date: 17 },
] as const;

const DEV_SLOTS = ["9:00", "10:00", "11:00", "14:00", "15:00"] as const;

function DevelopersPanel() {
  return (
    <div className="flex flex-col gap-3">
      {/* App shell */}
      <div className="overflow-hidden rounded-xl border border-border bg-background">
        {/* Chrome bar */}
        <div className="flex items-center gap-2 border-b border-border bg-muted/60 px-3 py-2">
          <div className="flex gap-1" aria-hidden="true">
            <span className="size-2 rounded-full bg-border" />
            <span className="size-2 rounded-full bg-border" />
            <span className="size-2 rounded-full bg-border" />
          </div>
          <span className="ml-1 text-[10px] font-semibold text-muted-foreground">
            Acme CRM
          </span>
          <div className="ml-auto flex gap-3">
            <span className="text-[10px] text-muted-foreground">Deals</span>
            <span className="text-[10px] text-muted-foreground">Contacts</span>
            <span className="text-[10px] font-semibold text-foreground underline underline-offset-2">
              Schedule
            </span>
          </div>
        </div>

        {/* Embedded booking */}
        <div className="p-4">
          <div className="mb-4 flex items-center gap-2.5">
            <Avatar className="size-9 shrink-0">
              <AvatarFallback className="bg-neutral-100 text-xs font-semibold text-neutral-700">
                CS
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-xs font-semibold text-foreground">
                Schedule with Customer Success
              </p>
              <p className="text-[10px] text-muted-foreground">
                30 min · Video call
              </p>
            </div>
          </div>

          {/* Day strip */}
          <div className="mb-3 flex gap-1" aria-hidden="true">
            {DEV_DAYS.map(({ label, date }, i) => (
              <div
                key={label}
                className={cn(
                  "flex flex-1 flex-col items-center gap-0.5 rounded-lg py-1.5",
                  i === 1
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted/80 text-muted-foreground",
                )}
              >
                <span className="text-[9px] font-medium">{label}</span>
                <span className="text-[11px] font-semibold">{date}</span>
              </div>
            ))}
          </div>

          {/* Time slots */}
          <div className="flex flex-wrap gap-1.5" aria-hidden="true">
            {DEV_SLOTS.map((slot, i) => (
              <span
                key={slot}
                className={cn(
                  "rounded-lg border px-2.5 py-1 text-[10px] font-medium",
                  i === 1
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border text-muted-foreground",
                )}
              >
                {slot}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Code hint */}
      <div className="flex items-center gap-2 rounded-lg border border-border bg-muted/50 px-3 py-2">
        <Code2Icon
          className="size-3.5 shrink-0 text-muted-foreground"
          aria-hidden="true"
        />
        <code className="font-mono text-[11px] text-foreground">
          {'<Cal namespace="support" />'}
        </code>
        <span className="ml-auto text-[9px] font-medium uppercase tracking-wide text-muted-foreground/60">
          React
        </span>
        <ArrowRightIcon
          className="size-3 text-muted-foreground/40"
          aria-hidden="true"
        />
      </div>
    </div>
  );
}
