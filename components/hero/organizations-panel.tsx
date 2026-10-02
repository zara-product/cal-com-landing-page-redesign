"use client";

import * as React from "react";
import type { OrgsContent, OrgTeamKey } from "@/content/hero";
import { cn } from "@/lib/utils";

const ORG_MEETING_DELAYS = [
  250, 510, 770, 1030, 1290, 1550, 1810, 2070,
] as const;

const ORG_TEAM_BLOCK: Record<OrgTeamKey, string> = {
  sales: "bg-foreground text-background",
  support: "bg-muted text-foreground",
  hiring: "border border-border bg-card text-foreground",
};

const ORG_LEGEND_SWATCH: Record<OrgTeamKey, string> = {
  sales: "bg-foreground",
  support: "bg-input",
  hiring: "border border-border bg-card",
};

export function OrgsPanel({
  isActive,
  prefersReducedMotion,
  content,
}: {
  isActive: boolean;
  prefersReducedMotion: boolean;
  content: OrgsContent;
}) {
  const [visibleCount, setVisibleCount] = React.useState(0);

  // biome-ignore lint/correctness/useExhaustiveDependencies: content is a stable module constant
  React.useEffect(() => {
    if (!isActive) {
      const t = setTimeout(() => setVisibleCount(0), 300);
      return () => clearTimeout(t);
    }

    setVisibleCount(0);

    if (prefersReducedMotion) {
      setVisibleCount(content.meetings.length);
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
        className={cn(
          "w-full max-w-[460px] overflow-hidden rounded-2xl border border-border bg-card",
          !prefersReducedMotion &&
            isActive &&
            "transition-transform duration-450 ease-out",
        )}
        style={
          prefersReducedMotion
            ? undefined
            : { transform: isActive ? "none" : "translateY(6px) scale(0.98)" }
        }
      >
        {/* Top bar */}
        <div className="flex items-center justify-between gap-3 border-b border-border px-3 py-2.5">
          <div className="flex min-w-0 items-center gap-2">
            <div
              className="flex h-5 w-5 shrink-0 items-center justify-center rounded-sm bg-foreground"
              aria-hidden="true"
            >
              <span className="text-micro font-bold text-background">
                {content.orgInitial}
              </span>
            </div>
            <span className="truncate text-xs font-medium text-foreground">
              {content.orgName} ·{" "}
              <span className="font-normal text-muted-foreground">
                {content.weekLabel}
              </span>
            </span>
          </div>
          <div className="flex shrink-0 items-center gap-3" aria-hidden="true">
            {content.teams.map((team) => (
              <div key={team} className="flex items-center gap-1">
                <span
                  className={cn(
                    "h-2.5 w-2.5 shrink-0 rounded-sm",
                    ORG_LEGEND_SWATCH[team],
                  )}
                />
                <span className="text-2xs capitalize text-muted-foreground">
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
            {content.dayLabels.map((day) => (
              <div
                key={day}
                className="pb-1.5 text-center text-2xs font-medium text-muted-foreground"
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
            {content.hourLabels.flatMap((_, rowIdx) =>
              [1, 2, 3, 4, 5].map((dayIdx) => (
                <div
                  key={`bg-${rowIdx}-${dayIdx}`}
                  style={{ gridColumn: dayIdx + 1, gridRow: rowIdx + 1 }}
                  className="border-l border-t border-border/[0.12]"
                />
              )),
            )}

            {/* Time labels */}
            {content.hourLabels.map((hour, i) => (
              <div
                key={hour}
                style={{ gridColumn: 1, gridRow: i + 1 }}
                className="flex items-start pt-0.5 text-2xs leading-none text-muted-foreground/50"
              >
                {hour}
              </div>
            ))}

            {/* Meeting blocks */}
            {content.meetings.map((meeting, idx) => {
              const isVisible = visibleCount > idx;
              return (
                <div
                  key={meeting.id}
                  className={cn(
                    !prefersReducedMotion &&
                      "transition-[opacity,transform] duration-450 ease-out",
                  )}
                  style={{
                    gridColumn: meeting.day + 1,
                    gridRow: `${meeting.startHour - 8} / span ${meeting.span}`,
                    padding: "2px 2px",
                    zIndex: 1,
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? "none" : "translateY(4px)",
                  }}
                >
                  <div
                    className={cn(
                      "h-full w-full overflow-hidden rounded-sm px-1 py-1 text-micro font-semibold leading-tight truncate",
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
