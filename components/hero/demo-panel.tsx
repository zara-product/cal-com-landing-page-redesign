"use client";

import {
  Building2Icon,
  Code2Icon,
  UserRoundIcon,
  UsersRoundIcon,
} from "lucide-react";
import * as React from "react";
import { Tabs, TabsList, TabsPanel, TabsTab } from "@/components/ui/tabs";
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
  const [inView, setInView] = React.useState(true);
  const [departingBar, setDepartingBar] = React.useState<{
    mode: Mode;
    width: number;
  } | null>(null);
  const prefersReducedMotion = useMediaQuery(
    "(prefers-reduced-motion: reduce)",
  );
  const containerRef = React.useRef<HTMLDivElement>(null);
  const progressRef = React.useRef(0);

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

  return (
    <div ref={containerRef} className="flex flex-col gap-9">
      <Tabs
        value={activeMode}
        onValueChange={(v) => switchMode(v as Mode)}
        className="flex flex-col gap-9"
      >
        {/* Mode selector */}
        <TabsList
          aria-label="Product modes"
          className="w-full gap-0.5 bg-muted/30 [&_[data-slot=tab-indicator]]:hidden"
        >
          {MODES.map((mode) => {
            const Icon = MODE_ICONS[mode];
            return (
              <TabsTab
                key={mode}
                value={mode}
                className="relative h-auto overflow-hidden px-2.5 py-2 text-xs sm:h-auto sm:text-xs hover:text-foreground/80 data-active:bg-card data-active:shadow-xs/5"
              >
                {/* Progress fill */}
                {activeMode === mode && !prefersReducedMotion && (
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-y-0 left-0 bg-foreground/[0.06]"
                    style={{ width: `${progress}%` }}
                  />
                )}
                {/* Fade-out fill when this tab's progress just completed */}
                {departingBar?.mode === mode &&
                  activeMode !== mode &&
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
              </TabsTab>
            );
          })}
        </TabsList>

        {/* Product stage */}
        <div className="grid sm:h-[400px]">
          {MODES.map((mode) => {
            const isActive = activeMode === mode;
            return (
              <TabsPanel
                key={mode}
                value={mode}
                keepMounted
                style={{ gridArea: "1 / 1" }}
                className={cn(
                  "min-w-0",
                  "[&[hidden]]:block data-[hidden]:opacity-0 data-[hidden]:pointer-events-none data-[hidden]:z-0",
                  "data-[ending-style]:opacity-0 data-[starting-style]:opacity-0",
                  "z-10",
                  !prefersReducedMotion && "transition-opacity duration-200",
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
              </TabsPanel>
            );
          })}
        </div>
      </Tabs>
    </div>
  );
}
