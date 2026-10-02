"use client";

import NextImage from "next/image";
import * as React from "react";
import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";
import { VisualSwitch } from "./visual-switch";

function IconGoogleCalendar() {
  return (
    <NextImage
      src="/icons/google-calendar.svg"
      width={36}
      height={36}
      unoptimized
      alt=""
      aria-hidden="true"
      className="h-full w-full object-contain"
    />
  );
}

function IconOutlook() {
  return (
    <NextImage
      src="/icons/outlook-calendar.svg"
      width={36}
      height={36}
      unoptimized
      alt=""
      aria-hidden="true"
      className="h-full w-full object-contain"
    />
  );
}

function IconAppleCalendar() {
  return (
    <NextImage
      src="/icons/apple-calendar.svg"
      width={36}
      height={36}
      unoptimized
      alt=""
      aria-hidden="true"
      className="h-full w-full object-contain"
    />
  );
}

const CONNECT_CALENDARS = [
  {
    key: "google",
    name: "Google Calendar",
    accountLabel: "Personal",
    Icon: IconGoogleCalendar,
  },
  {
    key: "outlook",
    name: "Microsoft Outlook",
    accountLabel: "Work",
    Icon: IconOutlook,
  },
  {
    key: "apple",
    name: "Apple Calendar",
    accountLabel: "iCloud",
    Icon: IconAppleCalendar,
  },
] as const;

export function ConnectPanel({ isActive }: { isActive: boolean }) {
  const prefersReducedMotion = useMediaQuery(
    "(prefers-reduced-motion: reduce)",
  );
  const [entered, setEntered] = React.useState(false);
  const [googleOn, setGoogleOn] = React.useState(false);
  const [outlookOn, setOutlookOn] = React.useState(false);
  const [showConfirmation, setShowConfirmation] = React.useState(false);

  React.useEffect(() => {
    if (!isActive) {
      // Delay reset until the 300ms wrapper fade completes so the outgoing
      // composition holds its final state rather than snapping to empty.
      const t = setTimeout(() => {
        setEntered(false);
        setGoogleOn(false);
        setOutlookOn(false);
        setShowConfirmation(false);
      }, 300);
      return () => clearTimeout(t);
    }

    const rafId = requestAnimationFrame(() => setEntered(true));

    if (prefersReducedMotion) {
      setGoogleOn(true);
      setOutlookOn(true);
      setShowConfirmation(true);
      return () => cancelAnimationFrame(rafId);
    }

    const t1 = setTimeout(() => setGoogleOn(true), 300);
    const t2 = setTimeout(() => setOutlookOn(true), 1000);
    const t3 = setTimeout(() => setShowConfirmation(true), 1700);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [isActive, prefersReducedMotion]);

  const calStates = [
    { ...CONNECT_CALENDARS[0], on: googleOn },
    { ...CONNECT_CALENDARS[1], on: outlookOn },
    { ...CONNECT_CALENDARS[2], on: false },
  ] as const;

  return (
    <div className="relative">
      {/* Calendar card */}
      <div
        className={cn(
          "overflow-hidden rounded-xl border border-border bg-card",
          !prefersReducedMotion && "transition-transform duration-450 ease-out",
        )}
        style={
          prefersReducedMotion
            ? undefined
            : { transform: entered ? "none" : "translateY(6px) scale(0.98)" }
        }
      >
        <div className="border-b border-border px-6 py-5">
          <p className="text-sm font-semibold text-foreground">
            Connected calendars
          </p>
          <p className="mt-0.5 text-xs text-muted-foreground">
            Cal.com checks your existing events to prevent double-booking.
          </p>
        </div>

        <div className="divide-y divide-border/50">
          {calStates.map((cal) => (
            <div key={cal.key} className="flex items-center gap-4 px-6 py-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted/70">
                <span className="flex h-6 w-6">
                  <cal.Icon />
                </span>
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-foreground">
                  {cal.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {cal.accountLabel}
                </p>
              </div>
              <VisualSwitch checked={cal.on} />
            </div>
          ))}
        </div>
      </div>

      {/* Floating confirmation card — bottom-right corner, restrained right overhang */}
      <div
        aria-live="polite"
        className={cn(
          "pointer-events-none absolute z-10",
          !prefersReducedMotion &&
            "transition-[opacity,transform] duration-450 ease-out",
        )}
        style={
          prefersReducedMotion
            ? {
                right: "-52px",
                bottom: "-36px",
                opacity: showConfirmation ? 1 : 0,
              }
            : {
                right: "-52px",
                bottom: "-36px",
                opacity: showConfirmation ? 1 : 0,
                transform: showConfirmation
                  ? "translateY(0)"
                  : "translateY(10px)",
              }
        }
      >
        <div className="pointer-events-auto w-[264px] rounded-xl border border-border bg-card px-4 py-3.5 shadow-sm">
          <div className="flex items-center justify-between gap-3">
            <p className="text-xs font-semibold text-foreground">
              Calendars in sync
            </p>
            <span className="shrink-0 text-2xs text-muted-foreground">
              Just now
            </span>
          </div>
          <div className="my-2.5 border-t border-border" />
          <div className="flex items-center gap-2 rounded-lg bg-muted/50 px-2.5 py-1.5">
            <span
              aria-hidden="true"
              className="h-3.5 w-1 shrink-0 rounded-full bg-foreground/70"
            />
            <span className="text-xs font-medium text-foreground">Busy</span>
            <span className="text-xs text-muted-foreground">
              Thu 10:00 – 11:00 hidden
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
