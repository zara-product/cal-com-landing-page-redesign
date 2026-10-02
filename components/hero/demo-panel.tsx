"use client";

import {
  Building2Icon,
  Code2Icon,
  UserRoundIcon,
  UsersRoundIcon,
} from "lucide-react";
import * as React from "react";
import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";
import { DevelopersPanel } from "./developers-panel";
import { IndividualsPanel } from "./individuals-panel";
import { OrgsPanel } from "./organizations-panel";
import { TeamsPanel } from "./teams-panel";

// ─── Constants ────────────────────────────────────────────────────────────────

const MODES = ["individuals", "teams", "organizations", "developers"] as const;
type Mode = (typeof MODES)[number];

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
      className="pointer-events-none absolute inset-y-0 left-0 bg-foreground/[0.06] transition-opacity duration-150 ease-out"
      style={{
        width: `${width}%`,
        opacity: gone ? 0 : 1,
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
                "min-w-0",
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
