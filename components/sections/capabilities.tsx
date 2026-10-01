import {
  ArrowRightIcon,
  CheckCircle2Icon,
  ClockIcon,
  MailIcon,
  MessageSquareIcon,
  ShieldIcon,
} from "lucide-react";
import type * as React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

// ─── CapabilitiesSection ──────────────────────────────────────────────────────

export function CapabilitiesSection() {
  return (
    <section aria-label="Built to grow" className="w-full bg-background">
      <div className="mx-auto max-w-[1200px] px-10">
        <div className="py-20 lg:py-28">
          {/* Section header */}
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-end lg:gap-16">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-foreground">
                Scheduling that grows with you
              </span>
              <h2 className="mt-4 text-5xl font-extrabold leading-[1.04] tracking-tight text-foreground lg:text-[3.5rem]">
                More capability.
                <br />
                Same simplicity.
              </h2>
            </div>
            <div className="border-l border-border pl-10 lg:pl-12">
              <p className="text-base leading-relaxed text-muted-foreground lg:text-[1.0625rem]">
                Start simple, then add more as you need it — with the same ease
                throughout.
              </p>
            </div>
          </div>

          {/* Bento grid */}
          <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
            {/* Row 1 — wide | narrow | narrow */}
            <div className="sm:col-span-2 lg:col-span-2">
              <BentoCard
                title="Route bookings"
                description="Ask the right questions, apply routing rules, and send each booking to the right person or team automatically."
                visual={<RouteBookingsVisual />}
              />
            </div>
            <div>
              <BentoCard
                title="Accept payments"
                description="Collect payment when someone books, without an extra step."
                visual={<AcceptPaymentsVisual />}
              />
            </div>
            <div>
              <BentoCard
                title="Automate the routine"
                description="Confirmations, reminders and follow-ups happen automatically."
                visual={<AutomateVisual />}
              />
            </div>

            {/* Row 2 — narrow | narrow | wide */}
            <div>
              <BentoCard
                title="Coordinate teams"
                description="Distribute meetings fairly across everyone who can take them."
                visual={<CoordinateTeamsVisual />}
              />
            </div>
            <div>
              <BentoCard
                title="Scale with control"
                description="Keep permissions and scheduling standards consistent as you grow."
                visual={<StayConsistentVisual />}
              />
            </div>
            <div className="sm:col-span-2 lg:col-span-2">
              <BentoCard
                title="Embed in your product"
                description="Bring scheduling into your site or app, without sending people somewhere else."
                visual={<EmbedVisual />}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── BentoCard ────────────────────────────────────────────────────────────────

function BentoCard({
  title,
  description,
  visual,
  className,
}: {
  title: string;
  description: string;
  visual: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex h-full min-h-[320px] flex-col rounded-2xl border border-border bg-card p-4 transition-shadow duration-200 hover:shadow-sm",
        className,
      )}
    >
      {/* Inner visual panel */}
      <div className="flex flex-1 items-center justify-center rounded-xl bg-muted/50 p-4">
        {visual}
      </div>
      <div className="mt-4 shrink-0">
        <p className="text-base font-bold leading-snug text-foreground">
          {title}
        </p>
        <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
      </div>
    </div>
  );
}

// ─── Visuals ──────────────────────────────────────────────────────────────────

function RouteBookingsVisual() {
  return (
    <div className="flex w-full items-stretch gap-2">
      {/* Question + answer — two-line card sets the row height */}
      <div className="min-w-0 flex-1 rounded-xl border border-border bg-card px-2.5 py-1.5">
        <p className="text-[10px] text-muted-foreground">Company size?</p>
        <p className="mt-0.5 text-sm font-semibold text-foreground">200+</p>
      </div>

      <ArrowRightIcon
        className="size-3 shrink-0 self-center text-muted-foreground/30"
        aria-hidden="true"
      />

      {/* Rule pill + fallback — centred in row */}
      <div className="min-w-0 flex-1 self-center">
        <div className="whitespace-nowrap rounded-lg bg-foreground px-2 py-1 text-[11px] font-medium text-background">
          200+ → Enterprise
        </div>
        <p className="mt-1 px-1 text-[10px] text-muted-foreground">
          Else → Self-serve
        </p>
      </div>

      <ArrowRightIcon
        className="size-3 shrink-0 self-center text-muted-foreground/30"
        aria-hidden="true"
      />

      {/* Destination — stretches to same height as left card */}
      <div className="flex min-w-0 flex-1 items-center gap-2 rounded-xl border border-border bg-card px-2.5 py-1.5">
        <Avatar className="size-6 shrink-0">
          <AvatarImage src="/avatars/marcus-lee.png" alt="Marcus Lee" />
          <AvatarFallback className="bg-neutral-200" />
        </Avatar>
        <span className="truncate text-xs font-medium text-foreground">
          Marcus Lee
        </span>
      </div>
    </div>
  );
}

function AcceptPaymentsVisual() {
  return (
    <div className="w-full rounded-xl border border-border bg-card px-4 py-2.5">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold text-foreground">Intro call</p>
          <p className="mt-0.5 text-[10px] text-muted-foreground">60 min</p>
        </div>
        <p className="text-xl font-bold tabular-nums text-foreground">€120</p>
      </div>
      <div className="mt-2.5 w-full rounded-full bg-foreground py-1.5 text-center text-xs font-semibold text-background">
        Pay and book
      </div>
    </div>
  );
}

const AUTOMATE_STEPS = [
  { Icon: MailIcon, label: "Confirmation", time: "Now" },
  { Icon: ClockIcon, label: "Reminder", time: "−24h" },
  { Icon: MessageSquareIcon, label: "Follow-up", time: "+1d" },
] as const;

function AutomateVisual() {
  return (
    <div className="w-full space-y-1.5">
      {AUTOMATE_STEPS.map(({ Icon, label, time }) => (
        <div
          key={label}
          className="flex items-center justify-between rounded-full border border-border bg-card px-3.5 py-1"
        >
          <div className="flex items-center gap-2.5">
            <Icon
              className="size-3.5 text-muted-foreground/60"
              aria-hidden="true"
            />
            <span className="text-xs text-foreground">{label}</span>
          </div>
          <span className="text-[10px] text-muted-foreground">{time}</span>
        </div>
      ))}
    </div>
  );
}

const TEAM_MEMBERS = [
  { src: "/avatars/sofia.png", name: "Sofia", active: true },
  { src: "/avatars/man-one.png", name: "Man One", active: false },
  { src: "/avatars/woman-one.png", name: "Woman One", active: false },
  { src: "/avatars/man-two.png", name: "Man Two", active: false },
] as const;

function CoordinateTeamsVisual() {
  return (
    <div className="w-full space-y-3">
      <div className="flex -space-x-2.5">
        {TEAM_MEMBERS.map(({ src, name, active }) => (
          <Avatar
            key={name}
            className={cn("size-10 ring-2 ring-card", !active && "opacity-40")}
          >
            <AvatarImage src={src} alt={name} />
            <AvatarFallback className="bg-neutral-300" />
          </Avatar>
        ))}
      </div>
      <div className="flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1">
        <CheckCircle2Icon
          className="size-3.5 shrink-0 text-success"
          aria-hidden="true"
        />
        <span className="text-xs text-foreground">
          <span className="font-medium">Sofia</span>
          <span className="text-muted-foreground"> · next in rotation</span>
        </span>
      </div>
    </div>
  );
}

function StayConsistentVisual() {
  return (
    <div className="w-full space-y-2">
      {/* Org header */}
      <div className="flex items-center justify-between rounded-xl border border-border bg-card px-3 py-1.5">
        <div className="flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded bg-foreground text-[10px] font-bold text-background">
            A
          </span>
          <span className="text-sm font-semibold text-foreground">
            Acme Inc.
          </span>
        </div>
        <ShieldIcon
          className="size-3.5 text-muted-foreground/40"
          aria-hidden="true"
        />
      </div>
      {/* Permission rows — indented with left accent line */}
      <div className="ml-2.5 flex items-stretch gap-2">
        <div
          className="w-px shrink-0 self-stretch rounded-full bg-border"
          aria-hidden="true"
        />
        <div className="flex-1 space-y-1.5">
          <div className="flex items-center justify-between rounded-xl border border-border bg-card px-3 py-1">
            <span className="text-xs font-medium text-foreground">Sales</span>
            <span className="text-[10px] text-muted-foreground">Admin</span>
          </div>
          <div className="flex items-center justify-between rounded-xl border border-border bg-card px-3 py-1">
            <span className="text-xs font-medium text-foreground">Support</span>
            <span className="text-[10px] text-muted-foreground">Member</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function EmbedVisual() {
  return (
    <div className="flex w-full gap-3">
      {/* Code block */}
      <div className="min-w-0 flex-1 rounded-lg bg-foreground p-4">
        <pre
          aria-hidden="true"
          className="whitespace-pre font-mono text-xs leading-relaxed text-background/70"
        >
          {'<Cal\n  calLink="acme/demo"\n  config={{ theme: "light" }}\n/>'}
        </pre>
      </div>
      {/* Booking preview */}
      <div className="min-w-0 flex-1 overflow-hidden rounded-lg border border-border bg-card">
        <div className="flex items-center gap-2 border-b border-border/60 px-3 py-2">
          <div className="flex gap-1" aria-hidden="true">
            <span className="block h-1.5 w-1.5 rounded-full bg-muted-foreground/25" />
            <span className="block h-1.5 w-1.5 rounded-full bg-muted-foreground/25" />
            <span className="block h-1.5 w-1.5 rounded-full bg-muted-foreground/25" />
          </div>
          <span className="text-[10px] text-muted-foreground">
            yourapp.com/book
          </span>
        </div>
        <div className="space-y-1.5 p-2.5">
          {(["9:00", "9:30"] as const).map((t) => (
            <div
              key={t}
              className="rounded-full border border-border py-1 text-center text-xs text-foreground"
            >
              {t}
            </div>
          ))}
          <div className="rounded-full bg-foreground py-1 text-center text-xs font-medium text-background">
            10:00
          </div>
        </div>
      </div>
    </div>
  );
}
