"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

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
  support: "bg-neutral-wash text-foreground",
  hiring: "border border-border bg-card text-foreground",
};

const ORG_LEGEND_SWATCH: Record<OrgTeam, string> = {
  sales: "bg-foreground",
  support: "bg-avatar-bg",
  hiring: "border border-border bg-card",
};

const ORG_DAY_LABELS = ["Mon", "Tue", "Wed", "Thu", "Fri"] as const;
const ORG_HOUR_LABELS = [9, 10, 11, 12] as const;

export function OrgsPanel({
  isActive,
  prefersReducedMotion,
}: {
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
            {ORG_DAY_LABELS.map((day) => (
              <div
                key={day}
                className="pb-1.5 text-center text-2xs font-medium text-muted-foreground/60"
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
                className="flex items-start pt-0.5 text-2xs leading-none text-muted-foreground/50"
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
                  className={cn(
                    !prefersReducedMotion &&
                      "transition-[opacity,transform] duration-450 ease-out",
                  )}
                  style={{
                    gridColumn: meeting.day + 1,
                    gridRow: `${meeting.startHour - 8} / span ${meeting.span}`,
                    padding: "2px 3px",
                    zIndex: 1,
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? "none" : "translateY(4px)",
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
