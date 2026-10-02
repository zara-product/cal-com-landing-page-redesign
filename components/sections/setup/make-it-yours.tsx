import { ChevronsUpDownIcon, LinkIcon } from "lucide-react";
import type * as React from "react";

export function MakeItYoursCard({
  title,
  description,
  visual,
}: {
  title: string;
  description: string;
  visual: React.ReactNode;
}) {
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl bg-card p-6">
      <div className="flex min-h-7 w-full items-start">{visual}</div>
      <div className="mt-6">
        <p className="text-lg font-bold leading-snug text-foreground">
          {title}
        </p>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
      </div>
    </div>
  );
}

export function BookingLinkVisual() {
  return (
    <div className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-2.5 py-1">
      <LinkIcon
        className="size-3 shrink-0 text-muted-foreground"
        aria-hidden="true"
      />
      <span className="text-xs">
        <span className="text-muted-foreground">cal.com/</span>
        <span className="font-semibold text-foreground">ewa</span>
      </span>
    </div>
  );
}

export function YourLookVisual() {
  return (
    <div className="flex items-center gap-2">
      {/* Black — selected */}
      <span
        aria-hidden="true"
        className="block h-5 w-5 rounded-full bg-foreground ring-2 ring-foreground ring-offset-2"
      />
      {/* Example brand colours — not UI tokens */}
      <span
        aria-hidden="true"
        className="block h-5 w-5 rounded-full bg-neutral-500"
      />
      <span
        aria-hidden="true"
        className="block h-5 w-5 rounded-full bg-neutral-300"
      />
      {/* White */}
      <span
        aria-hidden="true"
        className="block h-5 w-5 rounded-full border border-border bg-card"
      />
    </div>
  );
}

export function TimeSlotsVisual() {
  return (
    <div className="flex w-full flex-wrap items-center justify-between gap-y-1.5">
      <div className="flex items-center gap-1.5">
        <span className="rounded-lg border border-border bg-card px-2.5 py-1 text-xs text-foreground">
          9:00
        </span>
        <span className="rounded-lg border border-border bg-card px-2.5 py-1 text-xs text-foreground">
          9:30
        </span>
        <span className="rounded-lg bg-foreground px-2.5 py-1 text-xs font-medium text-background">
          10:00
        </span>
      </div>
      <div className="flex shrink-0 items-center gap-1 rounded-lg border border-border bg-card px-2.5 py-1 text-xs text-foreground">
        <span>Europe/Warsaw</span>
        <ChevronsUpDownIcon
          className="size-3 text-muted-foreground"
          aria-hidden="true"
        />
      </div>
    </div>
  );
}
