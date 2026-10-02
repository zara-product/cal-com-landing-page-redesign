"use client";

import { CheckIcon, ShuffleIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

// ─── Teams animation thresholds (% of MODE_DURATION.teams = 4000ms) ──────────
const TMS_SHUFFLE = 6.25; // 250ms  — activate shuffle node
const TMS_SELECT = 25.0; // 1000ms — select Sofia (dim other avatars)
const TMS_REVEAL = 43.75; // 1750ms — reveal result card
const SOFIA_INDEX = 2; // 3rd avatar in the stack (0-based)

const TEAM_AVATARS = [
  { key: "m1", src: "/avatars/teams-member-1.png" },
  { key: "m2", src: "/avatars/teams-member-2.png" },
  { key: "sofia", src: "/avatars/teams-sofia.png" },
  { key: "m4", src: "/avatars/teams-member-4.png" },
] as const;

export function TeamsPanel({
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
      className={cn(
        "flex justify-center py-1",
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
      <div className="flex w-full max-w-[400px] flex-col items-center">
        {/* ── Top card ──────────────────────────────────────────── */}
        <div className="w-full rounded-2xl border border-border bg-card px-4 py-3 shadow-sm">
          <div className="flex items-center gap-4">
            {/* Overlapping avatar stack */}
            <div className="flex shrink-0 -space-x-2.5">
              {TEAM_AVATARS.map(({ key, src }, i) => (
                <div
                  key={key}
                  className={cn(
                    "relative",
                    !prefersReducedMotion &&
                      "transition-opacity duration-450 ease-out",
                  )}
                  style={{
                    zIndex: TEAM_AVATARS.length - i,
                    opacity: sofiaSelected ? (i === SOFIA_INDEX ? 1 : 0.4) : 1,
                  }}
                >
                  <Avatar className="size-8 ring-2 ring-card">
                    <AvatarImage src={src} alt="" />
                    <AvatarFallback className="bg-input" />
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
              "radial-gradient(circle, var(--color-dot-fill) 1px, transparent 1px)",
            backgroundSize: "14px 14px",
          }}
        >
          <div className="h-7 border-l border-dashed border-border" />

          {/* Shuffle node */}
          <div
            className={cn(
              "flex size-10 items-center justify-center rounded-full bg-card shadow-sm",
              !prefersReducedMotion &&
                "transition-[transform,border-color] duration-450 ease-out",
            )}
            style={{
              border: `1px solid ${shuffleActive ? "var(--color-border)" : "var(--color-border-inactive)"}`,
              transform: shuffleActive ? "scale(1.05)" : "scale(1)",
            }}
          >
            <ShuffleIcon
              className={cn(
                "size-4",
                !prefersReducedMotion &&
                  "transition-opacity duration-450 ease-out",
              )}
              style={{ opacity: shuffleActive ? 1 : 0.35 }}
              aria-hidden="true"
            />
          </div>

          <div className="h-7 border-l border-dashed border-border" />
        </div>

        {/* ── Bottom result card ────────────────────────────────── */}
        <div
          className={cn(
            "w-full rounded-2xl border border-border bg-card px-4 py-4 shadow-sm",
            !prefersReducedMotion &&
              "transition-[opacity,transform] duration-450 ease-out",
          )}
          style={
            prefersReducedMotion
              ? undefined
              : {
                  opacity: resultRevealed ? 1 : 0.4,
                  transform: resultRevealed
                    ? "translateY(0)"
                    : "translateY(8px)",
                }
          }
        >
          <div className="flex items-center gap-4">
            {/* Customer → check → Host */}
            <div className="shrink-0">
              {/* Labels */}
              <div className="mb-1.5 flex gap-3">
                <span className="w-10 text-center text-2xs text-muted-foreground">
                  Customer
                </span>
                <span className="w-6" aria-hidden="true" />
                <span className="w-10 text-center text-2xs text-muted-foreground">
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
                  <AvatarFallback className="bg-input" />
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
                  <AvatarFallback className="bg-input" />
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
