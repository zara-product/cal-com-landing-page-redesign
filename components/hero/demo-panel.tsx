"use client";

import {
  Building2Icon,
  CheckIcon,
  ClockIcon,
  Code2Icon,
  GlobeIcon,
  ShuffleIcon,
  UserRoundIcon,
  UsersRoundIcon,
  VideoIcon,
} from "lucide-react";
import * as React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";

// ─── Constants ────────────────────────────────────────────────────────────────

const MODES = ["individuals", "teams", "organizations", "developers"] as const;
type Mode = (typeof MODES)[number];

// Each mode gets its own display duration so Individuals has enough room for
// the full booking choreography.
const MODE_DURATION: Record<Mode, number> = {
  individuals: 4000,
  teams: 4000,
  organizations: 4000,
  developers: 4000,
};

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

// ─── Individuals animation thresholds (% of MODE_DURATION.individuals = 4000ms) ──
const IND_CALENDAR = 6.25; // 250ms — available dates illuminate; Oct 8 selected
const IND_SLOTS = [22.5, 24.0, 25.5, 27.0, 28.5, 30.0] as const; // 900–1200ms stagger
const IND_SELECT = 38.75; // 1550ms — 10:00 selected
// ─── Teams animation thresholds (% of MODE_DURATION.teams = 4000ms) ──────────
const TMS_SHUFFLE = 6.25; // 250ms  — activate shuffle node
const TMS_SELECT = 25.0; // 1000ms — select Sofia (dim other avatars)
const TMS_REVEAL = 43.75; // 1750ms — reveal result card
const SOFIA_INDEX = 2; // 3rd avatar in the stack (0-based)

// ─── FadeOutBar ───────────────────────────────────────────────────────────────
// Renders a progress fill at a fixed width and fades it out over 175ms.
// Mounts at opacity 1, transitions to 0 after the first paint, then calls onDone.

function FadeOutBar({ width, onDone }: { width: number; onDone: () => void }) {
  const [gone, setGone] = React.useState(false);

  React.useEffect(() => {
    const t = setTimeout(() => setGone(true), 16);
    return () => clearTimeout(t);
  }, []);

  return (
    <span
      aria-hidden="true"
      className="pointer-events-none absolute inset-y-0 left-0 bg-foreground/[0.06]"
      style={{
        width: `${width}%`,
        opacity: gone ? 0 : 1,
        transition: "opacity 175ms ease-out",
      }}
      onTransitionEnd={onDone}
    />
  );
}

// ─── DemoPanel ────────────────────────────────────────────────────────────────

export function DemoPanel() {
  const [activeMode, setActiveMode] = React.useState<Mode>("individuals");
  const [progress, setProgress] = React.useState(0);
  const [inView, setInView] = React.useState(true); // hero is above-fold on load
  const [departingBar, setDepartingBar] = React.useState<{
    mode: Mode;
    width: number;
  } | null>(null);
  const prefersReducedMotion = useMediaQuery(
    "(prefers-reduced-motion: reduce)",
  );
  const tabsRef = React.useRef<HTMLDivElement>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const progressRef = React.useRef(0);

  // Pause auto-cycle when the hero is scrolled out of view.
  React.useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.1 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  React.useEffect(() => {
    if (prefersReducedMotion || !inView) return;

    const duration = MODE_DURATION[activeMode];
    // Resume from saved progress position after pause / inView change.
    const startOffset = (progressRef.current / 100) * duration;
    const startTime = performance.now() - startOffset;

    let raf: number;
    const tick = (now: number) => {
      const p = Math.min(((now - startTime) / duration) * 100, 100);
      progressRef.current = p;
      setProgress(p);
      if (p >= 100) {
        progressRef.current = 0;
        setDepartingBar({ mode: activeMode, width: 100 });
        setActiveMode((m) => MODES[(MODES.indexOf(m) + 1) % MODES.length]);
        return;
      }
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [activeMode, prefersReducedMotion, inView]);

  const switchMode = React.useCallback(
    (mode: Mode) => {
      if (mode === activeMode) return;
      setDepartingBar({ mode: activeMode, width: progressRef.current });
      progressRef.current = 0;
      setProgress(0);
      setActiveMode(mode);
    },
    [activeMode],
  );

  const resetProgress = React.useCallback(() => {
    setDepartingBar({ mode: activeMode, width: progressRef.current });
    progressRef.current = 0;
    setProgress(0);
  }, [activeMode]);

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

  return (
    <div ref={containerRef} className="flex flex-col gap-9">
      {/* Mode selector */}
      <div
        ref={tabsRef}
        role="tablist"
        aria-label="Product modes"
        className="flex gap-0.5 rounded-lg bg-muted/30 p-0.5"
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
                "relative overflow-hidden flex flex-1 items-center justify-center gap-1.5 rounded-md px-2.5 py-2 text-xs font-medium transition-[color,background-color,box-shadow] duration-150",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                isActive
                  ? "bg-card text-foreground shadow-xs/5"
                  : "text-muted-foreground hover:text-foreground/80",
              )}
            >
              {/* Progress fill — moves left → right inside the active tab */}
              {isActive && !prefersReducedMotion && (
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-y-0 left-0 bg-foreground/[0.06]"
                  style={{ width: `${progress}%` }}
                />
              )}
              {/* Fade-out fill when this tab's progress just completed */}
              {departingBar?.mode === mode &&
                !isActive &&
                !prefersReducedMotion && (
                  <FadeOutBar
                    width={departingBar.width}
                    onDone={() => setDepartingBar(null)}
                  />
                )}
              <Icon
                className="relative hidden size-3.5 shrink-0 sm:block"
                aria-hidden="true"
              />
              <span className="relative hidden sm:inline">
                {MODE_LABELS[mode]}
              </span>
              <span className="relative sm:hidden">{MODE_SHORT[mode]}</span>
            </button>
          );
        })}
      </div>

      {/* Product stage — fixed height on sm+; auto on mobile so it matches the tallest panel */}
      <div className="grid sm:h-[400px]">
        {MODES.map((mode) => {
          const isActive = activeMode === mode;
          return (
            <div
              key={mode}
              role="tabpanel"
              id={`hero-panel-${mode}`}
              aria-labelledby={`hero-tab-${mode}`}
              aria-hidden={!isActive}
              inert={!isActive}
              style={{ gridArea: "1 / 1" }}
              className={cn(
                !prefersReducedMotion && "transition-opacity duration-200",
                isActive
                  ? "opacity-100 z-10"
                  : "opacity-0 pointer-events-none z-0",
              )}
            >
              {mode === "individuals" && (
                <IndividualsPanel
                  progress={isActive ? progress : 0}
                  isActive={isActive}
                  prefersReducedMotion={prefersReducedMotion}
                />
              )}
              {mode === "teams" && (
                <TeamsPanel
                  progress={isActive ? progress : 0}
                  isActive={isActive}
                  prefersReducedMotion={prefersReducedMotion}
                />
              )}
              {mode === "organizations" && (
                <OrgsPanel
                  progress={isActive ? progress : 0}
                  isActive={isActive}
                  prefersReducedMotion={prefersReducedMotion}
                />
              )}
              {mode === "developers" && (
                <DevelopersPanel
                  isActive={isActive}
                  prefersReducedMotion={prefersReducedMotion}
                  onRestartProgress={resetProgress}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Panel: Individuals ───────────────────────────────────────────────────────

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

function IndividualsPanel({
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
    <div className="relative">
      {/* Main booking card */}
      <div
        style={
          prefersReducedMotion
            ? undefined
            : {
                transform: isActive ? "none" : "translateY(6px) scale(0.98)",
                transition: isActive ? "transform 450ms ease-out" : "none",
              }
        }
        className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm"
      >
        {/* Mobile-only compact host row */}
        <div className="flex items-center gap-2.5 border-b border-border p-3 sm:hidden">
          <Avatar className="size-7">
            <AvatarImage src="/avatars/individuals-ewa.png" alt="Ewa Nowak" />
            <AvatarFallback className="bg-neutral-200 text-[9px] font-semibold text-neutral-600">
              EN
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1">
            <p className="text-[10px] text-muted-foreground">Ewa Nowak</p>
            <p className="text-xs font-bold text-foreground">Intro call</p>
          </div>
          <div className="flex shrink-0 items-center gap-2 text-muted-foreground">
            <div className="flex items-center gap-1">
              <ClockIcon className="size-3 shrink-0" aria-hidden="true" />
              <span className="text-[10px]">30m</span>
            </div>
            <div className="flex items-center gap-1">
              <VideoIcon className="size-3 shrink-0" aria-hidden="true" />
              <span className="text-[10px]">Cal Video</span>
            </div>
            <div className="flex items-center gap-1">
              <GlobeIcon className="size-3 shrink-0" aria-hidden="true" />
              <span className="text-[10px]">Warsaw</span>
            </div>
          </div>
        </div>
        <div className="flex divide-x divide-border">
          {/* Left — host details */}
          <div className="hidden sm:flex w-[132px] shrink-0 flex-col gap-4 p-4">
            <Avatar className="size-8">
              <AvatarImage src="/avatars/individuals-ewa.png" alt="Ewa Nowak" />
              <AvatarFallback className="bg-neutral-200 text-[9px] font-semibold text-neutral-600">
                EN
              </AvatarFallback>
            </Avatar>
            <div className="-mt-1">
              <p className="text-[11px] text-muted-foreground">Ewa Nowak</p>
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
                <span className="text-[11px] text-muted-foreground">30m</span>
              </div>
              <div className="flex items-center gap-1.5">
                <VideoIcon
                  className="size-3 shrink-0 text-muted-foreground"
                  aria-hidden="true"
                />
                <span className="text-[11px] text-muted-foreground">
                  Cal Video
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <GlobeIcon
                  className="size-3 shrink-0 text-muted-foreground"
                  aria-hidden="true"
                />
                <span className="text-[11px] text-muted-foreground">
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
                        "flex size-7 items-center justify-center rounded-xl text-[11px] transition-all duration-300",
                        isSelected
                          ? calIlluminated
                            ? "bg-foreground font-semibold text-background"
                            : "text-muted-foreground/30"
                          : isAvail
                            ? calIlluminated
                              ? "bg-neutral-100 font-medium text-foreground"
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
          <div className="flex w-[76px] shrink-0 flex-col bg-muted/50 px-2.5 pb-2.5 pt-4">
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
                            transition:
                              "opacity 200ms ease-out, transform 200ms ease-out, background-color 250ms, color 250ms",
                          }
                    }
                    className={cn(
                      "rounded-lg py-1 text-center text-[11px] font-medium",
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

// ─── Panel: Teams ─────────────────────────────────────────────────────────────

const TEAM_AVATARS = [
  { key: "m1", src: "/avatars/teams-member-1.png" },
  { key: "m2", src: "/avatars/teams-member-2.png" },
  { key: "sofia", src: "/avatars/teams-sofia.png" },
  { key: "m4", src: "/avatars/teams-member-4.png" },
] as const;

function TeamsPanel({
  progress,
  isActive,
  prefersReducedMotion,
}: {
  progress: number;
  isActive: boolean;
  prefersReducedMotion: boolean;
}) {
  const instant = prefersReducedMotion && isActive;
  const shuffleActive = instant || (isActive && progress >= TMS_SHUFFLE);
  const sofiaSelected = instant || (isActive && progress >= TMS_SELECT);
  const resultRevealed = instant || (isActive && progress >= TMS_REVEAL);

  return (
    <div
      className="flex justify-center py-1"
      style={
        prefersReducedMotion
          ? undefined
          : {
              transform: isActive ? "none" : "translateY(6px) scale(0.98)",
              transition: isActive ? "transform 450ms ease-out" : "none",
            }
      }
    >
      <div className="flex w-full max-w-[400px] flex-col items-center">
        {/* ── Top card ──────────────────────────────────────────── */}
        <div className="w-full rounded-2xl border border-border bg-card px-4 py-3 shadow-sm">
          <div className="flex items-center gap-4">
            {/* Overlapping avatar stack */}
            <div className="flex shrink-0 -space-x-2.5">
              {TEAM_AVATARS.map(({ key, src }, i) => (
                <div
                  key={key}
                  className="relative"
                  style={{
                    zIndex: TEAM_AVATARS.length - i,
                    opacity: sofiaSelected ? (i === SOFIA_INDEX ? 1 : 0.4) : 1,
                    transition: prefersReducedMotion
                      ? undefined
                      : "opacity 500ms ease-out",
                  }}
                >
                  <Avatar className="size-8 ring-2 ring-card">
                    <AvatarImage src={src} alt="" />
                    <AvatarFallback className="bg-neutral-200" />
                  </Avatar>
                </div>
              ))}
            </div>

            {/* Event metadata */}
            <div className="min-w-0">
              <p className="text-sm font-semibold text-foreground">
                Product demo · Sales team
              </p>
              <div className="mt-1 flex items-center gap-1.5">
                <ShuffleIcon
                  className="size-3.5 shrink-0 text-muted-foreground"
                  aria-hidden="true"
                />
                <span className="text-xs text-muted-foreground">
                  Round robin · 45m
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Centre pipeline ───────────────────────────────────── */}
        <div
          className="relative flex w-full flex-col items-center"
          style={{
            backgroundImage:
              "radial-gradient(circle, oklch(0 0 0 / 0.055) 1px, transparent 1px)",
            backgroundSize: "14px 14px",
          }}
        >
          <div className="h-7 border-l border-dashed border-border" />

          {/* Shuffle node */}
          <div
            className="flex size-10 items-center justify-center rounded-full bg-card shadow-sm"
            style={{
              border: `1px solid ${shuffleActive ? "var(--border)" : "oklch(0 0 0 / 0.1)"}`,
              transform: shuffleActive ? "scale(1.05)" : "scale(1)",
              transition: prefersReducedMotion
                ? undefined
                : "transform 500ms ease-out, border-color 500ms ease-out",
            }}
          >
            <ShuffleIcon
              className="size-4"
              style={{
                opacity: shuffleActive ? 1 : 0.35,
                transition: prefersReducedMotion
                  ? undefined
                  : "opacity 500ms ease-out",
              }}
              aria-hidden="true"
            />
          </div>

          <div className="h-7 border-l border-dashed border-border" />
        </div>

        {/* ── Bottom result card ────────────────────────────────── */}
        <div
          className="w-full rounded-2xl border border-border bg-card px-4 py-4 shadow-sm"
          style={
            prefersReducedMotion
              ? undefined
              : {
                  opacity: resultRevealed ? 1 : 0.4,
                  transform: resultRevealed
                    ? "translateY(0)"
                    : "translateY(8px)",
                  transition:
                    "opacity 500ms ease-out, transform 500ms ease-out",
                }
          }
        >
          <div className="flex items-center gap-4">
            {/* Customer → check → Host */}
            <div className="shrink-0">
              {/* Labels */}
              <div className="mb-1.5 flex gap-3">
                <span className="w-10 text-center text-[10px] text-muted-foreground">
                  Customer
                </span>
                <span className="w-6" aria-hidden="true" />
                <span className="w-10 text-center text-[10px] text-muted-foreground">
                  Host
                </span>
              </div>
              {/* Avatars + check — items-center aligns check with avatar midlines */}
              <div className="flex items-center gap-3">
                <Avatar className="size-10">
                  <AvatarImage
                    src="/avatars/teams-customer.png"
                    alt="Customer"
                  />
                  <AvatarFallback className="bg-neutral-200" />
                </Avatar>
                <div className="flex size-6 items-center justify-center rounded-full border border-success/20 bg-success/10">
                  <CheckIcon
                    className="size-3 text-success"
                    aria-hidden="true"
                  />
                </div>
                <Avatar className="size-10">
                  <AvatarImage
                    src="/avatars/teams-sofia.png"
                    alt="Sofia Ruiz"
                  />
                  <AvatarFallback className="bg-neutral-200" />
                </Avatar>
              </div>
            </div>

            {/* Vertical divider */}
            <div
              className="h-12 w-px shrink-0 bg-border/60"
              aria-hidden="true"
            />

            {/* Result text */}
            <div className="min-w-0">
              <p className="text-sm font-semibold leading-snug text-foreground">
                This event is scheduled
              </p>
              <p className="mt-0.5 text-xs leading-snug text-muted-foreground">
                Sofia Ruiz · Thu 8 Oct, 10:00 · least booked this week
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Panel: Organizations ─────────────────────────────────────────────────────

const ORG_MEETING_DELAYS = [
  250, 510, 770, 1030, 1290, 1550, 1810, 2070,
] as const;

type OrgTeam = "sales" | "support" | "hiring";

const ORG_MEETINGS: Array<{
  id: number;
  day: number;
  startHour: number;
  span: number;
  team: OrgTeam;
  label: string;
}> = [
  { id: 1, day: 1, startHour: 9, span: 2, team: "sales", label: "Demo" },
  {
    id: 2,
    day: 2,
    startHour: 10,
    span: 1,
    team: "support",
    label: "Onboarding",
  },
  { id: 3, day: 3, startHour: 9, span: 1, team: "hiring", label: "Interview" },
  { id: 4, day: 4, startHour: 11, span: 2, team: "sales", label: "Discovery" },
  { id: 5, day: 5, startHour: 9, span: 1, team: "support", label: "Check-in" },
  { id: 6, day: 2, startHour: 12, span: 1, team: "hiring", label: "Interview" },
  { id: 7, day: 3, startHour: 11, span: 1, team: "support", label: "Support" },
  { id: 8, day: 5, startHour: 11, span: 2, team: "sales", label: "Demo" },
];

const ORG_TEAM_BLOCK: Record<OrgTeam, string> = {
  sales: "bg-foreground text-background",
  support: "bg-neutral-100 text-foreground",
  hiring: "border border-border bg-card text-foreground",
};

const ORG_LEGEND_SWATCH: Record<OrgTeam, string> = {
  sales: "bg-foreground",
  support: "bg-neutral-200",
  hiring: "border border-border bg-card",
};

const ORG_DAY_LABELS = ["Mon", "Tue", "Wed", "Thu", "Fri"] as const;
const ORG_HOUR_LABELS = [9, 10, 11, 12] as const;

function OrgsPanel({
  progress: _progress,
  isActive,
  prefersReducedMotion,
}: {
  progress: number;
  isActive: boolean;
  prefersReducedMotion: boolean;
}) {
  const [visibleCount, setVisibleCount] = React.useState(0);

  React.useEffect(() => {
    if (!isActive) {
      const t = setTimeout(() => setVisibleCount(0), 300);
      return () => clearTimeout(t);
    }

    setVisibleCount(0);

    if (prefersReducedMotion) {
      setVisibleCount(ORG_MEETINGS.length);
      return;
    }

    const timers: ReturnType<typeof setTimeout>[] = [];
    for (let i = 0; i < ORG_MEETING_DELAYS.length; i++) {
      const idx = i;
      timers.push(
        setTimeout(() => setVisibleCount(idx + 1), ORG_MEETING_DELAYS[idx]),
      );
    }
    return () => {
      for (const t of timers) clearTimeout(t);
    };
  }, [isActive, prefersReducedMotion]);

  return (
    <div className="flex justify-center">
      <div
        className="w-full max-w-[460px] overflow-hidden rounded-2xl border border-border bg-card"
        style={
          prefersReducedMotion
            ? undefined
            : {
                transform: isActive ? "none" : "translateY(6px) scale(0.98)",
                transition: isActive ? "transform 450ms ease-out" : "none",
              }
        }
      >
        {/* Top bar */}
        <div className="flex items-center justify-between gap-3 border-b border-border px-3 py-2.5">
          <div className="flex min-w-0 items-center gap-2">
            <div
              className="flex h-5 w-5 shrink-0 items-center justify-center rounded-sm bg-foreground"
              aria-hidden="true"
            >
              <span className="text-[9px] font-bold text-background">A</span>
            </div>
            <span className="truncate text-xs font-medium text-foreground">
              Acme ·{" "}
              <span className="font-normal text-muted-foreground">
                Week of 5 Oct
              </span>
            </span>
          </div>
          <div className="flex shrink-0 items-center gap-3" aria-hidden="true">
            {(["sales", "support", "hiring"] as OrgTeam[]).map((team) => (
              <div key={team} className="flex items-center gap-1">
                <span
                  className={cn(
                    "h-2.5 w-2.5 shrink-0 rounded-sm",
                    ORG_LEGEND_SWATCH[team],
                  )}
                />
                <span className="text-[10px] capitalize text-muted-foreground">
                  {team}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Calendar */}
        <div className="px-3 pb-3 pt-2">
          {/* Day header row */}
          <div
            className="grid"
            style={{ gridTemplateColumns: "24px repeat(5, 1fr)" }}
          >
            <div />
            {ORG_DAY_LABELS.map((day) => (
              <div
                key={day}
                className="pb-1.5 text-center text-[10px] font-medium text-muted-foreground/60"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Body: time labels + meeting grid */}
          <div
            className="relative grid"
            style={{
              gridTemplateColumns: "24px repeat(5, 1fr)",
              gridTemplateRows: "repeat(4, 34px)",
            }}
          >
            {/* Background cells — grid structure and borders */}
            {ORG_HOUR_LABELS.flatMap((_, rowIdx) =>
              [1, 2, 3, 4, 5].map((dayIdx) => (
                <div
                  key={`bg-${rowIdx}-${dayIdx}`}
                  style={{ gridColumn: dayIdx + 1, gridRow: rowIdx + 1 }}
                  className="border-l border-t border-border/[0.12]"
                />
              )),
            )}

            {/* Time labels */}
            {ORG_HOUR_LABELS.map((hour, i) => (
              <div
                key={hour}
                style={{ gridColumn: 1, gridRow: i + 1 }}
                className="flex items-start pt-0.5 text-[10px] leading-none text-muted-foreground/50"
              >
                {hour}
              </div>
            ))}

            {/* Meeting blocks */}
            {ORG_MEETINGS.map((meeting, idx) => {
              const isVisible = visibleCount > idx;
              return (
                <div
                  key={meeting.id}
                  style={{
                    gridColumn: meeting.day + 1,
                    gridRow: `${meeting.startHour - 8} / span ${meeting.span}`,
                    padding: "2px 3px",
                    zIndex: 1,
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? "none" : "translateY(4px)",
                    transition: prefersReducedMotion
                      ? "none"
                      : "opacity 500ms ease-out, transform 500ms ease-out",
                  }}
                >
                  <div
                    className={cn(
                      "flex h-full w-full items-start rounded-sm px-1.5 py-1 text-[9px] font-semibold leading-tight",
                      ORG_TEAM_BLOCK[meeting.team],
                    )}
                  >
                    {meeting.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Panel: Developers ────────────────────────────────────────────────────────

type DevTab = "atoms" | "apiv2" | "webhooks";
type CodeToken = { t: string; c: string };
type CodeEntry = { id: string; tokens: CodeToken[] };

const kw = (t: string): CodeToken => ({ t, c: "text-sky-400" });
const str = (t: string): CodeToken => ({ t, c: "text-orange-300" });
const tag = (t: string): CodeToken => ({ t, c: "text-rose-400" });
const att = (t: string): CodeToken => ({ t, c: "text-sky-300" });
const pln = (t: string): CodeToken => ({ t, c: "text-slate-200" });
const dim = (t: string): CodeToken => ({ t, c: "text-slate-400" });

const DEV_CODE: Record<DevTab, CodeEntry[]> = {
  atoms: [
    {
      id: "a0",
      tokens: [
        kw("import"),
        dim(" { "),
        pln("CalProvider"),
        dim(", "),
        pln("Booker"),
        dim(" } "),
        kw("from"),
        dim(" "),
        str('"@calcom/atoms"'),
      ],
    },
    { id: "a1", tokens: [] },
    {
      id: "a2",
      tokens: [
        tag("<CalProvider"),
        dim(" "),
        att("clientId"),
        dim("={"),
        pln("CAL_CLIENT_ID"),
        dim("}>"),
      ],
    },
    {
      id: "a3",
      tokens: [
        dim("  "),
        tag("<Booker"),
        dim(" "),
        att("username"),
        dim("="),
        str('"acme-health"'),
      ],
    },
    {
      id: "a4",
      tokens: [
        dim("      "),
        att("eventSlug"),
        dim("="),
        str('"consult"'),
        dim(" />"),
      ],
    },
    { id: "a5", tokens: [tag("</CalProvider>")] },
  ],
  apiv2: [
    {
      id: "v0",
      tokens: [
        pln("curl"),
        dim(" -X POST "),
        str("https://api.cal.com/v2/bookings"),
        dim(" \\"),
      ],
    },
    {
      id: "v1",
      tokens: [dim("  -H "), str('"Authorization: Bearer $TOKEN"'), dim(" \\")],
    },
    {
      id: "v2",
      tokens: [dim("  -H "), str('"cal-api-version: 2026-02-25"'), dim(" \\")],
    },
    {
      id: "v3",
      tokens: [
        dim("  -H "),
        str('"Content-Type: application/json"'),
        dim(" \\"),
      ],
    },
    {
      id: "v4",
      tokens: [
        dim("  -d '"),
        dim("{"),
        att('"start"'),
        dim(":"),
        str('"2026-10-08T08:00:00Z"'),
        dim(","),
      ],
    },
    {
      id: "v5",
      tokens: [
        dim("    "),
        att('"eventTypeId"'),
        dim(":"),
        pln("42"),
        dim(","),
        att('"attendee"'),
        dim(":{"),
      ],
    },
    {
      id: "v6",
      tokens: [
        dim("    "),
        att('"name"'),
        dim(":"),
        str('"Kai Nakamura"'),
        dim(","),
        att('"email"'),
        dim(":"),
        str('"kai@acme.co"'),
        dim(","),
      ],
    },
    {
      id: "v7",
      tokens: [
        dim("    "),
        att('"timeZone"'),
        dim(":"),
        str('"Asia/Tokyo"'),
        dim("}}}'"),
      ],
    },
  ],
  webhooks: [
    {
      id: "w0",
      tokens: [
        kw("export async function"),
        dim(" "),
        pln("POST"),
        dim("("),
        att("req"),
        dim(": "),
        pln("Request"),
        dim(") {"),
      ],
    },
    {
      id: "w1",
      tokens: [
        dim("  "),
        kw("const"),
        dim(" { "),
        pln("triggerEvent"),
        dim(", "),
        pln("payload"),
        dim(" } = "),
        kw("await"),
        dim(" req.json()"),
      ],
    },
    {
      id: "w2",
      tokens: [
        dim("  "),
        kw("if"),
        dim(" (triggerEvent !== "),
        str('"BOOKING_CREATED"'),
        dim(") "),
        kw("return"),
      ],
    },
    { id: "w3", tokens: [dim("  "), kw("await"), dim(" crm.createVisit({")] },
    {
      id: "w4",
      tokens: [
        dim("    "),
        att("contact"),
        dim(": payload.attendees["),
        pln("0"),
        dim("],"),
      ],
    },
    { id: "w5", tokens: [dim("  })")] },
  ],
};

const DEV_TAB_LABELS: Record<DevTab, string> = {
  atoms: "Atoms",
  apiv2: "API v2",
  webhooks: "Webhooks",
};

const DEV_TAB_FILES: Record<DevTab, string> = {
  atoms: "BookConsult.tsx",
  apiv2: "create-booking.sh",
  webhooks: "api/cal-webhook.ts",
};

const DEV_ORDERED_TABS: DevTab[] = ["atoms", "apiv2", "webhooks"];
const DEV_TIME_SLOTS = ["9:00", "9:30", "10:00"] as const;
const DEV_SELECTED_SLOT = "10:00";

function AtomsResult() {
  return (
    <div className="space-y-1.5 p-2">
      {/* Browser chrome — proves component is running inside customer's own domain */}
      <div className="flex items-center gap-2 rounded-md bg-muted/60 px-2 py-1">
        <div className="flex shrink-0 items-center gap-0.5" aria-hidden="true">
          <span className="size-1.5 rounded-full bg-foreground/20" />
          <span className="size-1.5 rounded-full bg-foreground/20" />
          <span className="size-1.5 rounded-full bg-foreground/20" />
        </div>
        <div className="flex flex-1 justify-center">
          <span className="rounded-full bg-background px-2 py-0.5 text-[9px] text-muted-foreground">
            acmehealth.com/visits/new
          </span>
        </div>
      </div>

      {/* Component tag — visually connects the code window to this rendered output */}
      <div className="flex items-center justify-between rounded-md border border-dashed border-border px-2 py-1">
        <div className="flex items-center gap-1">
          <Code2Icon
            className="size-3 shrink-0 text-muted-foreground"
            aria-hidden="true"
          />
          <span className="font-mono text-[10px] text-foreground">
            &lt;Booker /&gt;
          </span>
        </div>
        <span className="text-[9px] text-muted-foreground">Cal.com Atoms</span>
      </div>

      {/* Days row — Thu 8 selected */}
      <div className="flex gap-1.5">
        <div className="flex-1 rounded-md bg-foreground py-1 text-center text-[10px] font-semibold text-background">
          Thu 8
        </div>
        <div className="flex-1 rounded-md border border-border py-1 text-center text-[10px] text-muted-foreground">
          Fri 9
        </div>
        <div className="flex-1 rounded-md border border-border py-1 text-center text-[10px] text-muted-foreground">
          Mon 12
        </div>
      </div>

      {/* Time slots — 10:00 selected (crisp dark border) */}
      <div className="flex gap-1.5">
        {DEV_TIME_SLOTS.map((slot) => (
          <div
            key={slot}
            className={cn(
              "flex-1 rounded-md py-1 text-center text-[10px]",
              slot === DEV_SELECTED_SLOT
                ? "border-2 border-foreground font-semibold text-foreground"
                : "border border-border text-foreground",
            )}
          >
            {slot}
          </div>
        ))}
      </div>
    </div>
  );
}

function ApiV2Result() {
  return (
    <div className="flex flex-col gap-2 px-4 py-3.5">
      <div className="flex items-center gap-2">
        <span className="rounded-full bg-success/10 px-2 py-0.5 text-[11px] font-semibold text-success">
          201 Created
        </span>
        <span className="text-[11px] text-muted-foreground">142 ms</span>
      </div>
      <div className="flex flex-col gap-1 font-mono text-[11px]">
        <div>
          <span className="text-muted-foreground">status: </span>
          <span className="text-orange-400">"accepted"</span>
        </div>
        <div>
          <span className="text-muted-foreground">start (Tokyo): </span>
          <span className="text-foreground">Thu 8 Oct, 17:00</span>
        </div>
      </div>
      <div className="flex items-center gap-1.5 rounded-lg bg-muted/50 px-2.5 py-1.5">
        <VideoIcon
          className="size-3 shrink-0 text-muted-foreground"
          aria-hidden="true"
        />
        <span className="truncate font-mono text-[10px] text-muted-foreground">
          app.cal.com/video/9fJw3xT2pQ
        </span>
      </div>
    </div>
  );
}

function WebhooksResult() {
  return (
    <div className="flex flex-col gap-2.5 px-4 py-3.5">
      <div className="flex items-center gap-2">
        <span className="relative flex size-2 shrink-0">
          <span className="absolute inline-flex size-full animate-ping rounded-full bg-success opacity-75" />
          <span className="relative inline-flex size-2 rounded-full bg-success" />
        </span>
        <span className="text-xs font-semibold text-foreground">
          BOOKING_CREATED delivered
        </span>
        <span className="ml-auto rounded bg-success/10 px-1.5 py-0.5 text-[10px] font-semibold text-success">
          200
        </span>
      </div>
      <p className="text-[10px] leading-snug text-muted-foreground">
        Also:{" "}
        <span className="text-foreground/60">
          RESCHEDULED · CANCELLED · MEETING_ENDED
        </span>
      </p>
    </div>
  );
}

function DevelopersPanel({
  isActive,
  prefersReducedMotion,
  onRestartProgress,
}: {
  isActive: boolean;
  prefersReducedMotion: boolean;
  onRestartProgress: () => void;
}) {
  const [activeDevTab, setActiveDevTab] = React.useState<DevTab>("atoms");
  const [devKey, setDevKey] = React.useState(0);
  const [visibleLines, setVisibleLines] = React.useState(0);
  const [showResult, setShowResult] = React.useState(false);
  const devTabsRef = React.useRef<HTMLDivElement>(null);

  // Reset to Atoms each time the outer Developers tab becomes active
  React.useEffect(() => {
    if (isActive) {
      setActiveDevTab("atoms");
      setDevKey((k) => k + 1);
    }
  }, [isActive]);

  const lineCount = DEV_CODE[activeDevTab].length;

  // Line-by-line reveal with cursor; auto-advances on each tab change
  // biome-ignore lint/correctness/useExhaustiveDependencies: devKey is an intentional restart trigger
  React.useEffect(() => {
    if (!isActive) {
      setVisibleLines(0);
      setShowResult(false);
      return;
    }
    setVisibleLines(0);
    setShowResult(false);
    const count = DEV_CODE[activeDevTab].length;
    if (prefersReducedMotion) {
      setVisibleLines(count);
      setShowResult(true);
      return;
    }
    const timers: ReturnType<typeof setTimeout>[] = [];
    for (let i = 0; i < count; i++) {
      timers.push(setTimeout(() => setVisibleLines(i + 1), (i + 1) * 180));
    }
    timers.push(setTimeout(() => setShowResult(true), count * 180 + 200));
    return () => {
      for (const t of timers) clearTimeout(t);
    };
  }, [activeDevTab, devKey, isActive, prefersReducedMotion]);

  function handleTabClick(tab: DevTab) {
    setActiveDevTab(tab);
    setDevKey((k) => k + 1);
    onRestartProgress();
  }

  function handleDevKeyDown(
    e: React.KeyboardEvent<HTMLButtonElement>,
    tab: DevTab,
  ) {
    const idx = DEV_ORDERED_TABS.indexOf(tab);
    const buttons =
      devTabsRef.current?.querySelectorAll<HTMLButtonElement>("[role='tab']");
    const go = (i: number) => {
      const next = DEV_ORDERED_TABS[i];
      setActiveDevTab(next);
      setDevKey((k) => k + 1);
      onRestartProgress();
      buttons?.[i]?.focus();
    };
    if (e.key === "ArrowRight") {
      e.preventDefault();
      go((idx + 1) % DEV_ORDERED_TABS.length);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      go((idx - 1 + DEV_ORDERED_TABS.length) % DEV_ORDERED_TABS.length);
    } else if (e.key === "Home") {
      e.preventDefault();
      go(0);
    } else if (e.key === "End") {
      e.preventDefault();
      go(DEV_ORDERED_TABS.length - 1);
    }
  }

  const allLinesVisible = visibleLines >= lineCount;
  const showCursor =
    !prefersReducedMotion && !allLinesVisible && visibleLines > 0;

  return (
    <div
      style={
        prefersReducedMotion
          ? undefined
          : {
              transform: isActive ? "none" : "translateY(6px) scale(0.98)",
              transition: isActive ? "transform 450ms ease-out" : "none",
            }
      }
    >
      <div className="relative pb-32 pr-4">
        {/* Code window */}
        <div className="overflow-hidden rounded-xl border border-neutral-700/60 bg-neutral-900 shadow-sm">
          {/* Tab + filename bar */}
          <div className="flex items-center border-b border-neutral-700/60">
            <div
              ref={devTabsRef}
              role="tablist"
              aria-label="Developer examples"
              className="flex"
            >
              {DEV_ORDERED_TABS.map((tab) => {
                const isActiveTab = activeDevTab === tab;
                return (
                  <button
                    key={tab}
                    type="button"
                    role="tab"
                    aria-selected={isActiveTab}
                    aria-controls="dev-panel"
                    id={`dev-tab-${tab}`}
                    tabIndex={isActiveTab ? 0 : -1}
                    onClick={() => handleTabClick(tab)}
                    onKeyDown={(e) => handleDevKeyDown(e, tab)}
                    className={cn(
                      "px-3.5 py-2.5 text-xs font-medium transition-colors duration-150",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                      isActiveTab
                        ? "rounded-t bg-neutral-800 text-neutral-100"
                        : "text-neutral-500 hover:text-neutral-300",
                    )}
                  >
                    {DEV_TAB_LABELS[tab]}
                  </button>
                );
              })}
            </div>
            <span className="ml-auto pr-4 font-mono text-[10px] text-neutral-500">
              {DEV_TAB_FILES[activeDevTab]}
            </span>
          </div>

          {/* Code lines */}
          <div className="min-h-[196px] px-4 py-4" aria-hidden="true">
            {DEV_CODE[activeDevTab].map((entry, i) => (
              <div
                key={entry.id}
                className="flex"
                style={
                  prefersReducedMotion
                    ? undefined
                    : {
                        opacity: i < visibleLines ? 1 : 0,
                        transition: "opacity 150ms ease-out",
                      }
                }
              >
                <span className="w-7 select-none pr-3 text-right font-mono text-[12px] leading-[1.7] text-neutral-600">
                  {i + 1}
                </span>
                <span className="whitespace-pre font-mono text-[12px] leading-[1.7]">
                  {entry.tokens.map((tok, j) => (
                    // biome-ignore lint/suspicious/noArrayIndexKey: syntax tokens static per line
                    <span key={j} className={tok.c}>
                      {tok.t}
                    </span>
                  ))}
                  {showCursor && i === visibleLines - 1 && (
                    <span className="ml-0.5 inline-block h-[1em] w-[0.55em] translate-y-[1px] animate-pulse bg-neutral-400" />
                  )}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Result card — overlaps bottom-right of code window */}
        <div
          role="tabpanel"
          id="dev-panel"
          aria-labelledby={`dev-tab-${activeDevTab}`}
          aria-live="polite"
          className="pointer-events-none absolute bottom-0 right-0 z-10 w-[62%]"
          style={
            prefersReducedMotion
              ? { opacity: showResult ? 1 : 0 }
              : {
                  opacity: showResult ? 1 : 0,
                  transform: showResult ? "translateY(0)" : "translateY(8px)",
                  transition:
                    "opacity 500ms ease-out, transform 500ms ease-out",
                }
          }
        >
          <div className="pointer-events-auto overflow-hidden rounded-xl border border-border bg-card shadow-sm">
            {activeDevTab === "atoms" && <AtomsResult />}
            {activeDevTab === "apiv2" && <ApiV2Result />}
            {activeDevTab === "webhooks" && <WebhooksResult />}
          </div>
        </div>
      </div>
    </div>
  );
}
