"use client";

import {
  ArrowRightIcon,
  CalendarIcon,
  GlobeIcon,
  MailIcon,
  MessageSquareIcon,
  VideoIcon,
} from "lucide-react";
import * as React from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// ─── Capabilities ─────────────────────────────────────────────────────────────

const CAPABILITIES = [
  {
    id: "teams" as const,
    number: "01",
    label: "Teams",
    headline: "Distribute meetings across the right people.",
    body: "Round Robin, collective booking, and fair assignment — Cal.com routes every incoming request to the right host automatically.",
  },
  {
    id: "routing" as const,
    number: "02",
    label: "Routing",
    headline: "Route every request to the right destination.",
    body: "Qualify leads with booking questions, apply routing rules, and send each request to the right team — with valid availability confirmed.",
  },
  {
    id: "workflows" as const,
    number: "03",
    label: "Workflows",
    headline: "Automate what happens around every meeting.",
    body: "Trigger confirmations, reminders, and follow-ups across email and SMS — at exactly the right moment in the meeting lifecycle.",
  },
  {
    id: "insights" as const,
    number: "04",
    label: "Insights",
    headline: "See what's getting booked — and what isn't.",
    body: "Track booking volume, team distribution, and event performance to understand how scheduling is actually working across your organisation.",
  },
] as const;

type CapabilityId = (typeof CAPABILITIES)[number]["id"];

// ─── useFadeIn ────────────────────────────────────────────────────────────────

function useFadeIn(isActive: boolean): boolean {
  const [visible, setVisible] = React.useState(isActive);
  React.useEffect(() => {
    if (!isActive) {
      setVisible(false);
      return;
    }
    const id = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(id);
  }, [isActive]);
  return visible;
}

// ─── CapabilitiesSection ──────────────────────────────────────────────────────

export function CapabilitiesSection() {
  const [active, setActive] = React.useState<CapabilityId>("teams");

  return (
    <section
      aria-label="Built for when scheduling gets complex"
      className="w-full bg-background"
    >
      <div className="mx-auto max-w-[1200px] border-l border-r border-border px-10">
        <div className="py-20 lg:py-28">
          {/* Section header */}
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
              Beyond simple scheduling
            </p>
            <h2 className="mt-4 text-[1.875rem] font-bold leading-tight tracking-tight text-foreground lg:text-[2.25rem]">
              Built for when scheduling gets complex.
            </h2>
            <p className="mt-4 text-[0.9375rem] leading-relaxed text-muted-foreground">
              Coordinate people, route every request, automate the meeting
              lifecycle, and understand how scheduling is performing — all in
              one system.
            </p>
          </div>

          {/* Nav + stage */}
          <div className="mt-14 grid grid-cols-1 items-start gap-8 lg:mt-16 lg:grid-cols-[200px_1fr] lg:gap-10 xl:grid-cols-[220px_1fr] xl:gap-14">
            {/* Capability nav */}
            <div
              role="tablist"
              aria-label="Product capabilities"
              className="flex flex-row gap-1 overflow-x-auto pb-1 lg:flex-col lg:overflow-x-visible lg:pb-0"
            >
              {CAPABILITIES.map((cap) => {
                const isActive = active === cap.id;
                return (
                  <button
                    key={cap.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-controls={`cap-panel-${cap.id}`}
                    id={`cap-tab-${cap.id}`}
                    onClick={() => setActive(cap.id)}
                    className={cn(
                      "group relative flex shrink-0 items-center gap-2.5 rounded-xl border px-3 py-3 text-left transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring lg:w-full lg:px-4 lg:py-3.5",
                      isActive
                        ? "border-border bg-muted/50"
                        : "border-transparent hover:bg-muted/30",
                    )}
                  >
                    {isActive && (
                      <span
                        aria-hidden="true"
                        className="absolute inset-y-3 left-0 hidden w-0.5 rounded-r-full bg-foreground lg:block"
                      />
                    )}
                    <span
                      className={cn(
                        "font-mono text-[10px] font-semibold tabular-nums transition-colors",
                        isActive
                          ? "text-foreground"
                          : "text-muted-foreground/40",
                      )}
                    >
                      {cap.number}
                    </span>
                    <span
                      className={cn(
                        "text-xs font-semibold transition-colors lg:text-sm",
                        isActive ? "text-foreground" : "text-muted-foreground",
                      )}
                    >
                      {cap.label}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Right column: copy + product stage */}
            <div className="flex flex-col gap-6">
              {/* Capability headline — crossfades */}
              <div className="grid">
                {CAPABILITIES.map((cap) => {
                  const isActive = active === cap.id;
                  return (
                    <div
                      key={cap.id}
                      style={{ gridArea: "1 / 1" }}
                      className={cn(
                        "transition-opacity duration-200",
                        isActive
                          ? "relative z-10 opacity-100"
                          : "pointer-events-none z-0 opacity-0",
                      )}
                    >
                      <h3 className="text-lg font-semibold tracking-tight text-foreground lg:text-xl">
                        {cap.headline}
                      </h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                        {cap.body}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* Product stage — crossfades */}
              <div className="grid">
                {CAPABILITIES.map((cap) => {
                  const isActive = active === cap.id;
                  return (
                    <div
                      key={cap.id}
                      role="tabpanel"
                      id={`cap-panel-${cap.id}`}
                      aria-labelledby={`cap-tab-${cap.id}`}
                      aria-hidden={!isActive}
                      style={{ gridArea: "1 / 1" }}
                      className={cn(
                        "transition-opacity duration-200",
                        isActive
                          ? "relative z-10 opacity-100"
                          : "pointer-events-none z-0 opacity-0",
                      )}
                    >
                      {cap.id === "teams" && <TeamsPanel isActive={isActive} />}
                      {cap.id === "routing" && (
                        <RoutingPanel isActive={isActive} />
                      )}
                      {cap.id === "workflows" && (
                        <WorkflowsPanel isActive={isActive} />
                      )}
                      {cap.id === "insights" && (
                        <InsightsPanel isActive={isActive} />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── TeamsPanel ───────────────────────────────────────────────────────────────

type TeamMember = {
  initials: string;
  name: string;
  role: string;
  status: string;
  statusVariant: "success" | "neutral" | "muted";
  assigned: boolean;
};

const TEAM_MEMBERS: TeamMember[] = [
  {
    initials: "SC",
    name: "Sarah Chen",
    role: "Account Executive",
    status: "Next available",
    statusVariant: "success",
    assigned: true,
  },
  {
    initials: "ML",
    name: "Marcus Lee",
    role: "Account Executive",
    status: "2 bookings today",
    statusVariant: "neutral",
    assigned: false,
  },
  {
    initials: "PP",
    name: "Priya Patel",
    role: "Solutions Engineer",
    status: "Available",
    statusVariant: "neutral",
    assigned: false,
  },
  {
    initials: "AV",
    name: "Alex Vega",
    role: "Account Executive",
    status: "Away",
    statusVariant: "muted",
    assigned: false,
  },
];

function TeamsPanel({ isActive }: { isActive: boolean }) {
  const visible = useFadeIn(isActive);

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-background">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border px-6 py-5">
        <div>
          <p className="text-sm font-semibold text-foreground">
            Team Sales Call
          </p>
          <div className="mt-0.5 flex items-center gap-1.5 text-xs text-muted-foreground">
            <VideoIcon className="size-3 opacity-60" aria-hidden="true" />
            <span>Video call · 30 min</span>
          </div>
        </div>
        <Badge variant="secondary" size="sm">
          Round Robin
        </Badge>
      </div>

      {/* Two-column inner layout */}
      <div className="grid grid-cols-1 divide-y divide-border sm:grid-cols-2 sm:divide-x sm:divide-y-0">
        {/* Incoming booking */}
        <div className="px-6 py-5">
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground/60">
            Incoming booking
          </p>
          <div className="rounded-lg border border-border bg-muted/30 p-4">
            <div className="flex items-center gap-3">
              <Avatar className="size-8">
                <AvatarFallback className="bg-neutral-100 text-xs font-semibold text-neutral-700">
                  AJ
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium text-foreground">
                  Alex Johnson
                </p>
                <p className="text-xs text-muted-foreground">Acme Corp</p>
              </div>
            </div>
            <div className="mt-3 space-y-1.5 text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <CalendarIcon
                  className="size-3 shrink-0 opacity-60"
                  aria-hidden="true"
                />
                <span>Tue, Oct 14 · 10:00 AM</span>
              </div>
              <div className="flex items-center gap-2">
                <GlobeIcon
                  className="size-3 shrink-0 opacity-60"
                  aria-hidden="true"
                />
                <span>Europe/Berlin</span>
              </div>
            </div>
          </div>
        </div>

        {/* Eligible hosts */}
        <div className="px-4 py-5">
          <p className="mb-2 px-2 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground/60">
            Eligible hosts
          </p>
          <div className="space-y-0.5">
            {TEAM_MEMBERS.map((member, i) => (
              <div
                key={member.initials}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-2 py-2.5 transition-[opacity,transform,background-color] duration-300",
                  member.assigned ? "bg-muted/70" : "",
                )}
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? "none" : "translateY(6px)",
                  transitionDelay: visible ? `${i * 60}ms` : "0ms",
                }}
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
                        ? "text-muted-foreground/50"
                        : "text-muted-foreground",
                  )}
                >
                  {member.status}
                </span>
              </div>
            ))}
          </div>

          {/* Assignment result */}
          <div
            className="mt-3 flex items-center gap-2 rounded-lg border border-border bg-muted/30 px-3 py-2.5 transition-opacity duration-300"
            style={{
              opacity: visible ? 1 : 0,
              transitionDelay: visible
                ? `${TEAM_MEMBERS.length * 60 + 60}ms`
                : "0ms",
            }}
          >
            <span
              className="size-2 shrink-0 rounded-full bg-success"
              aria-hidden="true"
            />
            <span className="text-xs font-medium text-foreground">
              Assigned to Sarah Chen
            </span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-border bg-muted/20 px-6 py-3">
        <p className="text-[10px] text-muted-foreground">
          Cal.com routes to the least-busy eligible host · resets daily
        </p>
      </div>
    </div>
  );
}

// ─── RoutingPanel ─────────────────────────────────────────────────────────────

const FORM_FIELDS = [
  { label: "Company size", value: "75 employees" },
  { label: "Role", value: "VP of Sales" },
  { label: "Interest", value: "Product demo" },
] as const;

function RoutingPanel({ isActive }: { isActive: boolean }) {
  const visible = useFadeIn(isActive);

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-background">
      {/* Header */}
      <div className="border-b border-border px-6 py-5">
        <p className="text-sm font-semibold text-foreground">Booking Router</p>
        <p className="mt-0.5 text-xs text-muted-foreground">
          Route incoming requests to the right team automatically
        </p>
      </div>

      {/* Flow: form → rule → destination */}
      <div className="px-6 py-6">
        <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-start">
          {/* Step 1: Form response */}
          <div
            className="min-w-0 flex-1 transition-[opacity,transform] duration-300"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "none" : "translateX(-8px)",
              transitionDelay: visible ? "0ms" : "0ms",
            }}
          >
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground/60">
              Booking form
            </p>
            <div className="space-y-2 rounded-lg border border-border bg-muted/30 p-3.5">
              {FORM_FIELDS.map((field) => (
                <div key={field.label}>
                  <p className="text-[9px] font-semibold uppercase tracking-wide text-muted-foreground/50">
                    {field.label}
                  </p>
                  <p className="mt-0.5 text-xs font-medium text-foreground">
                    {field.value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Arrow connector */}
          <div
            className="flex shrink-0 items-center justify-center pt-0 sm:pt-7 transition-opacity duration-300"
            style={{
              opacity: visible ? 1 : 0,
              transitionDelay: visible ? "100ms" : "0ms",
            }}
            aria-hidden="true"
          >
            <ArrowRightIcon className="size-4 rotate-90 text-muted-foreground/30 sm:rotate-0" />
          </div>

          {/* Step 2: Rule */}
          <div
            className="min-w-0 flex-1 transition-[opacity,transform] duration-300"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "none" : "translateY(8px)",
              transitionDelay: visible ? "120ms" : "0ms",
            }}
          >
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground/60">
              Rule
            </p>
            <div className="rounded-lg border border-border bg-muted/30 p-3.5">
              <p className="mb-2 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground/50">
                When
              </p>
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="rounded border border-border bg-background px-2 py-0.5 text-[11px] font-medium text-foreground">
                  Company size
                </span>
                <span className="text-[11px] text-muted-foreground">
                  is greater than
                </span>
                <span className="rounded border border-border bg-background px-2 py-0.5 text-[11px] font-medium text-foreground">
                  50
                </span>
              </div>
            </div>
          </div>

          {/* Arrow connector */}
          <div
            className="flex shrink-0 items-center justify-center pt-0 sm:pt-7 transition-opacity duration-300"
            style={{
              opacity: visible ? 1 : 0,
              transitionDelay: visible ? "220ms" : "0ms",
            }}
            aria-hidden="true"
          >
            <ArrowRightIcon className="size-4 rotate-90 text-muted-foreground/30 sm:rotate-0" />
          </div>

          {/* Step 3: Destination */}
          <div
            className="min-w-0 flex-1 transition-[opacity,transform] duration-300"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "none" : "translateX(8px)",
              transitionDelay: visible ? "240ms" : "0ms",
            }}
          >
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground/60">
              Route to
            </p>
            <div className="rounded-lg border border-border bg-muted/30 p-3.5">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    Enterprise Sales
                  </p>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    Round robin
                  </p>
                </div>
                <Badge variant="secondary" size="sm" className="shrink-0">
                  Team
                </Badge>
              </div>
              <div className="mt-3 flex items-center gap-2 border-t border-border pt-3">
                <Avatar className="size-6 shrink-0">
                  <AvatarFallback className="bg-neutral-100 text-[8px] font-semibold text-neutral-700">
                    SC
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-[11px] font-medium text-foreground">
                    Sarah Chen
                  </p>
                  <p className="text-[10px] text-success-foreground">
                    Next available
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Default fallback */}
        <div
          className="mt-4 flex items-center gap-2 text-xs text-muted-foreground transition-opacity duration-300"
          style={{
            opacity: visible ? 1 : 0,
            transitionDelay: visible ? "340ms" : "0ms",
          }}
        >
          <span className="text-muted-foreground/30">↓</span>
          <span>Default fallback</span>
          <span className="text-muted-foreground/30">→</span>
          <span className="font-medium text-foreground">General Enquiries</span>
        </div>
      </div>
    </div>
  );
}

// ─── WorkflowsPanel ───────────────────────────────────────────────────────────

type WorkflowStep = {
  id: string;
  trigger: string;
  action: string;
  channel: string | null;
  Icon: React.ElementType;
  isMilestone: boolean;
};

const WORKFLOW_STEPS: WorkflowStep[] = [
  {
    id: "booked",
    trigger: "When booking is confirmed",
    action: "Send confirmation",
    channel: "Email",
    Icon: MailIcon,
    isMilestone: false,
  },
  {
    id: "reminder-24h",
    trigger: "24 hours before",
    action: "Send reminder",
    channel: "Email",
    Icon: MailIcon,
    isMilestone: false,
  },
  {
    id: "reminder-1h",
    trigger: "1 hour before",
    action: "Send reminder",
    channel: "SMS",
    Icon: MessageSquareIcon,
    isMilestone: false,
  },
  {
    id: "meeting",
    trigger: "Meeting time",
    action: "Join meeting",
    channel: null,
    Icon: VideoIcon,
    isMilestone: true,
  },
  {
    id: "followup",
    trigger: "24 hours after",
    action: "Send follow-up",
    channel: "Email",
    Icon: MailIcon,
    isMilestone: false,
  },
];

function WorkflowsPanel({ isActive }: { isActive: boolean }) {
  const visible = useFadeIn(isActive);

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-background">
      {/* Header */}
      <div className="border-b border-border px-6 py-5">
        <p className="text-sm font-semibold text-foreground">
          30 Minute Meeting
        </p>
        <p className="mt-0.5 text-xs text-muted-foreground">
          Automated workflow · {WORKFLOW_STEPS.length} actions configured
        </p>
      </div>

      {/* Workflow steps */}
      <div className="px-6 py-5">
        <div className="relative">
          {/* Vertical connector line */}
          <div
            aria-hidden="true"
            className="absolute bottom-5 left-5 top-5 w-px -translate-x-px bg-border"
          />

          <div className="space-y-1">
            {WORKFLOW_STEPS.map((step, i) => {
              const { Icon } = step;
              return (
                <div
                  key={step.id}
                  className="relative flex items-center gap-4 py-2 transition-[opacity,transform] duration-300"
                  style={{
                    opacity: visible ? 1 : 0,
                    transform: visible ? "none" : "translateY(6px)",
                    transitionDelay: visible ? `${i * 80}ms` : "0ms",
                  }}
                >
                  {/* Step icon */}
                  <span
                    className={cn(
                      "relative z-10 flex size-10 shrink-0 items-center justify-center rounded-full border",
                      step.isMilestone
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-background text-muted-foreground",
                    )}
                  >
                    <Icon className="size-4" aria-hidden="true" />
                  </span>

                  {/* Step content */}
                  <div className="flex min-w-0 flex-1 items-center justify-between gap-4 rounded-lg border border-border bg-muted/30 px-4 py-3">
                    <div className="min-w-0">
                      <p className="text-[10px] font-medium text-muted-foreground">
                        {step.trigger}
                      </p>
                      <p className="mt-0.5 text-sm font-medium text-foreground">
                        {step.action}
                      </p>
                    </div>
                    {step.channel && (
                      <Badge variant="secondary" size="sm" className="shrink-0">
                        {step.channel}
                      </Badge>
                    )}
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

// ─── InsightsPanel ────────────────────────────────────────────────────────────

type WeeklyPoint = { day: string; value: number };
type TeamBooking = {
  initials: string;
  name: string;
  bookings: number;
};

const WEEKLY_DATA: WeeklyPoint[] = [
  { day: "Mon", value: 18 },
  { day: "Tue", value: 24 },
  { day: "Wed", value: 31 },
  { day: "Thu", value: 27 },
  { day: "Fri", value: 19 },
];

const TEAM_BOOKINGS: TeamBooking[] = [
  { initials: "SC", name: "Sarah Chen", bookings: 42 },
  { initials: "ML", name: "Marcus Lee", bookings: 28 },
  { initials: "PP", name: "Priya Patel", bookings: 21 },
  { initials: "AV", name: "Alex Vega", bookings: 16 },
];

const WEEKLY_MAX = Math.max(...WEEKLY_DATA.map((d) => d.value));
const TEAM_MAX = Math.max(...TEAM_BOOKINGS.map((m) => m.bookings));

function InsightsPanel({ isActive }: { isActive: boolean }) {
  const visible = useFadeIn(isActive);

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-background">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border px-6 py-5">
        <div>
          <p className="text-sm font-semibold text-foreground">
            Bookings overview
          </p>
          <p className="mt-0.5 text-xs text-muted-foreground">
            Enterprise Sales team · October 2025
          </p>
        </div>
        <div
          className="text-right transition-opacity duration-300"
          style={{
            opacity: visible ? 1 : 0,
            transitionDelay: visible ? "60ms" : "0ms",
          }}
        >
          <p className="text-2xl font-bold tabular-nums text-foreground">127</p>
          <p className="text-xs text-muted-foreground">total bookings</p>
        </div>
      </div>

      {/* Two-column inner */}
      <div className="grid grid-cols-1 divide-y divide-border sm:grid-cols-2 sm:divide-x sm:divide-y-0">
        {/* Weekly bar chart */}
        <div className="px-6 py-5">
          <p className="mb-4 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground/60">
            Bookings this week
          </p>
          <div className="flex h-28 items-end gap-2" aria-hidden="true">
            {WEEKLY_DATA.map((d, i) => (
              <div
                key={d.day}
                className="flex flex-1 flex-col items-center gap-1.5"
              >
                <div className="flex w-full flex-1 items-end">
                  <div
                    className="w-full rounded-t bg-foreground/[0.12] transition-[height] duration-500 ease-out"
                    style={{
                      height: visible
                        ? `${(d.value / WEEKLY_MAX) * 100}%`
                        : "0%",
                      transitionDelay: visible ? `${i * 60}ms` : "0ms",
                    }}
                  />
                </div>
                <span className="text-[10px] text-muted-foreground/60">
                  {d.day}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Team distribution */}
        <div className="px-6 py-5">
          <p className="mb-4 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground/60">
            By team member
          </p>
          <div className="space-y-3.5">
            {TEAM_BOOKINGS.map((member, i) => (
              <div
                key={member.initials}
                className="flex items-center gap-3 transition-[opacity,transform] duration-300"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? "none" : "translateX(8px)",
                  transitionDelay: visible ? `${i * 60 + 80}ms` : "0ms",
                }}
              >
                <Avatar className="size-6 shrink-0">
                  <AvatarFallback className="bg-neutral-100 text-[8px] font-semibold text-neutral-700">
                    {member.initials}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <div className="mb-1.5 flex items-center justify-between">
                    <span className="text-[11px] font-medium text-foreground">
                      {member.name}
                    </span>
                    <span className="text-[10px] tabular-nums text-muted-foreground">
                      {member.bookings}
                    </span>
                  </div>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-foreground/25 transition-[width] duration-500 ease-out"
                      style={{
                        width: visible
                          ? `${(member.bookings / TEAM_MAX) * 100}%`
                          : "0%",
                        transitionDelay: visible ? `${i * 60 + 120}ms` : "0ms",
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer note */}
      <div className="border-t border-border bg-muted/20 px-6 py-3">
        <p className="text-[10px] text-muted-foreground">
          Sample data · illustrative booking volume
        </p>
      </div>
    </div>
  );
}
