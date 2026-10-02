"use client";

import {
  ChevronsUpDownIcon,
  CopyIcon,
  GlobeIcon,
  LinkIcon,
  MapPinIcon,
  PlusIcon,
  XIcon,
} from "lucide-react";
import NextImage from "next/image";
import * as React from "react";
import { SectionDivider } from "@/components/ui/page-rail";
import {
  SectionEyebrow,
  SectionHeading,
} from "@/components/ui/section-heading";
import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";

// ─── Steps ────────────────────────────────────────────────────────────────────

const STEPS = [
  {
    id: "connect" as const,
    number: "01",
    title: "Connect your calendar",
    description:
      "We'll check for conflicts across your calendars, so you don't have to worry about double-bookings.",
  },
  {
    id: "availability" as const,
    number: "02",
    title: "Set your availability",
    description:
      "Want to block off weekends? Add buffers or booking limits? We make that easy.",
  },
  {
    id: "meet" as const,
    number: "03",
    title: "Choose how to meet",
    description:
      "Video, phone or in person — set the option that fits the meeting.",
  },
] as const;

type StepId = (typeof STEPS)[number]["id"];
const STEP_IDS: StepId[] = ["connect", "availability", "meet"];
const AUTO_CYCLE_MS = 5200;

// ─── SetupSection ─────────────────────────────────────────────────────────────

export function SetupSection() {
  const [activeStep, setActiveStep] = React.useState<StepId>("connect");
  const [progress, setProgress] = React.useState(0);
  const [inView, setInView] = React.useState(false);
  const prefersReducedMotion = useMediaQuery(
    "(prefers-reduced-motion: reduce)",
  );
  const sectionRef = React.useRef<HTMLElement>(null);
  const tabsRef = React.useRef<HTMLDivElement>(null);
  const rafRef = React.useRef<number | null>(null);
  const startTimeRef = React.useRef<number | null>(null);

  // Start timer only once the section has scrolled into view
  React.useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.1 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  React.useEffect(() => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }

    if (!inView) return;

    // Read activeStep here so it's a real dep (no stale closure, satisfies lint)
    const nextStep =
      STEP_IDS[(STEP_IDS.indexOf(activeStep) + 1) % STEP_IDS.length];

    if (prefersReducedMotion) {
      const timer = setInterval(() => setActiveStep(nextStep), AUTO_CYCLE_MS);
      return () => clearInterval(timer);
    }

    startTimeRef.current = null;
    setProgress(0);

    const animate = (timestamp: number) => {
      if (startTimeRef.current === null) startTimeRef.current = timestamp;
      const pct = Math.min(
        (timestamp - startTimeRef.current) / AUTO_CYCLE_MS,
        1,
      );
      setProgress(pct * 100);
      if (pct < 1) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        rafRef.current = null;
        setActiveStep(nextStep);
      }
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [activeStep, prefersReducedMotion, inView]);

  function handleStepClick(id: StepId) {
    setActiveStep(id);
  }

  function handleStepKeyDown(
    e: React.KeyboardEvent<HTMLButtonElement>,
    id: StepId,
  ) {
    const idx = STEP_IDS.indexOf(id);
    const buttons =
      tabsRef.current?.querySelectorAll<HTMLButtonElement>("[role='tab']");
    const go = (i: number) => {
      setActiveStep(STEP_IDS[i]);
      buttons?.[i]?.focus();
    };
    if (e.key === "ArrowRight") {
      e.preventDefault();
      go((idx + 1) % STEP_IDS.length);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      go((idx - 1 + STEP_IDS.length) % STEP_IDS.length);
    } else if (e.key === "Home") {
      e.preventDefault();
      go(0);
    } else if (e.key === "End") {
      e.preventDefault();
      go(STEP_IDS.length - 1);
    }
  }

  return (
    <section
      ref={sectionRef}
      aria-label="Simple scheduling"
      className="w-full bg-background"
    >
      <div className="mx-auto max-w-[1200px] px-10">
        <div className="pt-20 pb-10 lg:pt-28 lg:pb-14">
          {/* Section header */}
          <div>
            <SectionEyebrow>Simple scheduling</SectionEyebrow>
            <SectionHeading className="mt-4">
              Share your availability.
              <br />
              Skip the back-and-forth.
            </SectionHeading>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground">
              Stay in control of your time while Cal.com takes care of the
              scheduling around it.
            </p>
          </div>

          {/* Step nav + product stage */}
          <div className="mt-8 grid grid-cols-1 items-start gap-6 lg:mt-10 lg:grid-cols-[360px_1fr] lg:items-center lg:gap-14 xl:gap-20">
            {/* Step nav */}
            <div
              ref={tabsRef}
              role="tablist"
              aria-label="Setup steps"
              className="flex flex-col gap-1"
            >
              {STEPS.map((step) => {
                const isActive = activeStep === step.id;
                return (
                  <button
                    key={step.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-controls={`setup-panel-${step.id}`}
                    id={`setup-tab-${step.id}`}
                    tabIndex={isActive ? 0 : -1}
                    onClick={() => handleStepClick(step.id)}
                    onKeyDown={(e) => handleStepKeyDown(e, step.id)}
                    className={cn(
                      "relative w-full overflow-hidden rounded-xl text-left transition-shadow duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                      isActive
                        ? "bg-card shadow-sm"
                        : "bg-transparent hover:bg-muted/20",
                    )}
                  >
                    {/* Progress fill — animates left-to-right inside active card */}
                    {isActive && !prefersReducedMotion && (
                      <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 bg-muted/50"
                        style={{ width: `${progress}%`, right: "auto" }}
                      />
                    )}

                    <div className="relative flex items-start gap-3 px-5 py-4">
                      <span
                        className={cn(
                          "shrink-0 tabular-nums text-xs font-semibold leading-snug",
                          isActive
                            ? "text-foreground/40"
                            : "text-muted-foreground/40",
                        )}
                      >
                        {step.number}
                      </span>
                      <span className="min-w-0">
                        <span
                          className={cn(
                            "block text-base font-bold leading-snug transition-colors",
                            isActive
                              ? "text-foreground"
                              : "text-muted-foreground",
                          )}
                        >
                          {step.title}
                        </span>
                        <span
                          className={cn(
                            "grid overflow-hidden transition-all duration-500",
                            isActive ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                          )}
                          style={
                            prefersReducedMotion
                              ? { transition: "none" }
                              : undefined
                          }
                        >
                          <span
                            className={cn(
                              "min-h-0 text-sm leading-relaxed text-muted-foreground transition-opacity duration-300",
                              isActive ? "opacity-100 mt-2" : "opacity-0",
                            )}
                            style={
                              prefersReducedMotion
                                ? { transition: "none" }
                                : undefined
                            }
                          >
                            {step.description}
                          </span>
                        </span>
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Product stage */}
            <div className="relative min-h-[460px]">
              {/* Ripple rings — behind all product UI, clipped to stage bounds */}
              {!prefersReducedMotion && (
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 overflow-hidden"
                >
                  {([0, 2, 4, 6] as const).map((delay) => (
                    <div
                      key={delay}
                      className="animate-ss-ripple absolute left-1/2 top-1/2 h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-foreground/[0.07]"
                      style={{
                        animationDelay: `${delay}s`,
                        animationFillMode: "backwards",
                      }}
                    />
                  ))}
                </div>
              )}

              {STEPS.map((step) => {
                const isActive = activeStep === step.id;
                return (
                  <div
                    key={step.id}
                    role="tabpanel"
                    id={`setup-panel-${step.id}`}
                    aria-labelledby={`setup-tab-${step.id}`}
                    aria-hidden={!isActive}
                    inert={!isActive}
                    className={cn(
                      "absolute inset-0 flex items-center justify-center px-8 pt-8 pb-8",
                      "transition-[opacity,transform] duration-300 ease-out",
                      isActive
                        ? "z-10 translate-y-0 opacity-100"
                        : "pointer-events-none z-0 translate-y-1 opacity-0",
                    )}
                    style={{
                      transition: prefersReducedMotion ? "none" : undefined,
                    }}
                  >
                    <div className="w-full max-w-[500px]">
                      {step.id === "connect" && (
                        <ConnectPanel isActive={isActive} />
                      )}
                      {step.id === "availability" && (
                        <AvailabilityPanel isActive={isActive} />
                      )}
                      {step.id === "meet" && <MeetPanel isActive={isActive} />}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <SectionDivider />

      <div className="mx-auto max-w-[1200px] px-10">
        <div className="py-14">
          {/* ── Make it yours ── */}
          <div className="mb-10">
            <SectionEyebrow>Make it yours</SectionEyebrow>
            <SectionHeading size="md" className="mt-4">
              Your link. Your look. Your way to schedule.
            </SectionHeading>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            <MakeItYoursCard
              title="Your own booking link"
              description="A short, clean link that's easy to share and remember."
              visual={<BookingLinkVisual />}
            />
            <MakeItYoursCard
              title="Your look"
              description="Match your brand with custom colours, your logo and light or dark mode."
              visual={<YourLookVisual />}
            />
            <MakeItYoursCard
              title="A better booking experience"
              description="Bookers see times in their own timezone and choose a time in a few clicks."
              visual={<TimeSlotsVisual />}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── ConnectPanel ─────────────────────────────────────────────────────────────

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

function ConnectPanel({ isActive }: { isActive: boolean }) {
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
        className="overflow-hidden rounded-xl border border-border bg-card"
        style={
          prefersReducedMotion
            ? undefined
            : {
                transform: entered ? "none" : "translateY(6px) scale(0.98)",
                transition: "transform 350ms ease-out",
              }
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
        className="pointer-events-none absolute z-10"
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
                transition: "opacity 400ms ease-out, transform 400ms ease-out",
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

// ─── AvailabilityPanel ────────────────────────────────────────────────────────

const DAYS = [
  { key: "sun", label: "Sunday", short: "Sun", start: null, end: null },
  {
    key: "mon",
    label: "Monday",
    short: "Mon",
    start: "9:00 AM",
    end: "5:00 PM",
  },
  {
    key: "tue",
    label: "Tuesday",
    short: "Tue",
    start: "9:00 AM",
    end: "5:00 PM",
  },
  {
    key: "wed",
    label: "Wednesday",
    short: "Wed",
    start: "9:00 AM",
    end: "5:00 PM",
  },
  {
    key: "thu",
    label: "Thursday",
    short: "Thu",
    start: "9:00 AM",
    end: "5:00 PM",
  },
  {
    key: "fri",
    label: "Friday",
    short: "Fri",
    start: "9:00 AM",
    end: "5:00 PM",
  },
  { key: "sat", label: "Saturday", short: "Sat", start: null, end: null },
] as const;

function VisualSwitch({ checked }: { checked: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "inline-flex h-[18px] w-[30px] shrink-0 items-center rounded-full p-[2px] transition-colors duration-200",
        checked ? "bg-foreground" : "bg-border",
      )}
    >
      <span
        className={cn(
          "block h-[14px] w-[14px] rounded-full bg-card shadow-sm transition-transform duration-200",
          checked ? "translate-x-[12px]" : "translate-x-0",
        )}
      />
    </span>
  );
}

function AvailabilityPanel({ isActive }: { isActive: boolean }) {
  const prefersReducedMotion = useMediaQuery(
    "(prefers-reduced-motion: reduce)",
  );
  const [activeDays, setActiveDays] = React.useState<Set<string>>(new Set());

  React.useEffect(() => {
    if (!isActive) {
      const t = setTimeout(() => {
        setActiveDays(new Set());
      }, 300);
      return () => clearTimeout(t);
    }

    const weekdays = DAYS.filter((d) => d.start !== null);

    if (prefersReducedMotion) {
      setActiveDays(new Set(weekdays.map((d) => d.key)));
      return;
    }

    const timers: ReturnType<typeof setTimeout>[] = [];

    for (let i = 0; i < weekdays.length; i++) {
      const { key } = weekdays[i];
      timers.push(
        setTimeout(
          () => {
            setActiveDays((prev) => new Set([...prev, key]));
          },
          350 + i * 380,
        ),
      );
    }

    return () => {
      for (const t of timers) clearTimeout(t);
    };
  }, [isActive, prefersReducedMotion]);

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 border-b border-border px-6 py-4">
        <div>
          <p className="text-sm font-semibold text-foreground">
            Your availability
          </p>
          <p className="mt-0.5 text-xs text-muted-foreground">
            When can people book time with you?
          </p>
        </div>
        <span className="flex shrink-0 items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs text-muted-foreground">
          <GlobeIcon className="size-3 opacity-60" aria-hidden="true" />
          Europe / Berlin
        </span>
      </div>

      {/* Day rows — weekdays activate sequentially; weekend stays muted */}
      <div className="divide-y divide-border/50">
        {DAYS.map((day) => {
          const unavailable = day.start === null;
          const on = !unavailable && activeDays.has(day.key);
          return (
            <div key={day.key} className="flex items-center gap-3 px-6 py-1.5">
              <VisualSwitch checked={on} />
              <span
                className={cn(
                  "w-24 shrink-0 text-sm font-medium transition-colors duration-300",
                  on ? "text-foreground" : "text-muted-foreground/40",
                )}
              >
                <span className="hidden sm:inline">{day.label}</span>
                <span className="sm:hidden">{day.short}</span>
              </span>

              {/* Middle: time controls or unavailable label */}
              <div className="flex flex-1 items-center">
                {unavailable ? (
                  <span className="text-xs text-muted-foreground/40">
                    Unavailable
                  </span>
                ) : (
                  <div
                    className="flex items-center gap-1.5 text-xs"
                    style={
                      prefersReducedMotion
                        ? undefined
                        : {
                            opacity: on ? 1 : 0,
                            transform: on ? "none" : "translateX(-6px)",
                            transition:
                              "opacity 250ms ease-out, transform 250ms ease-out",
                          }
                    }
                  >
                    <span className="rounded border border-border px-2 py-0.5 font-medium text-foreground">
                      {day.start}
                    </span>
                    <span className="text-muted-foreground/40">–</span>
                    <span className="rounded border border-border px-2 py-0.5 font-medium text-foreground">
                      {day.end}
                    </span>
                    <span
                      aria-hidden="true"
                      className="ml-1 text-muted-foreground/30"
                    >
                      <XIcon className="size-3" />
                    </span>
                  </div>
                )}
              </div>

              {/* Right-side actions — always visible on every row */}
              <div
                aria-hidden="true"
                className="flex shrink-0 items-center gap-1 text-muted-foreground/30"
              >
                <PlusIcon className="size-3" />
                <CopyIcon className="size-3" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── MeetPanel ────────────────────────────────────────────────────────────────

// Logo icon components for video conferencing services
function IconCalVideo({ className: _c }: { className?: string }) {
  return (
    <NextImage
      src="/icons/cal-video.svg"
      width={36}
      height={36}
      unoptimized
      alt=""
      aria-hidden="true"
      className="h-full w-full object-contain"
    />
  );
}

function IconGoogleMeet({ className: _c }: { className?: string }) {
  return (
    <NextImage
      src="/icons/google-meet.svg"
      width={36}
      height={36}
      unoptimized
      alt=""
      aria-hidden="true"
      className="h-full w-full object-contain"
    />
  );
}

function IconZoomVideo({ className: _c }: { className?: string }) {
  return (
    <NextImage
      src="/icons/zoom.svg"
      width={36}
      height={36}
      unoptimized
      alt=""
      aria-hidden="true"
      className="h-full w-full object-contain"
    />
  );
}

type IconComponent = React.FC<{ className?: string }>;

interface MeetingRow {
  key: string;
  label: string;
  description: string;
  Icon: IconComponent;
  isLogo: boolean;
  enabled: boolean;
}

const MEETING_TYPES: MeetingRow[] = [
  {
    key: "cal-video",
    label: "Cal Video",
    description: "Built-in video, no account needed",
    Icon: IconCalVideo,
    isLogo: true,
    enabled: true,
  },
  {
    key: "google-meet",
    label: "Google Meet",
    description: "Google Meet link sent with confirmation",
    Icon: IconGoogleMeet,
    isLogo: true,
    enabled: true,
  },
  {
    key: "zoom",
    label: "Zoom",
    description: "Zoom link sent with confirmation",
    Icon: IconZoomVideo,
    isLogo: true,
    enabled: true,
  },
  {
    key: "inperson",
    label: "In person",
    description: "Set a location",
    Icon: MapPinIcon as IconComponent,
    isLogo: false,
    enabled: true,
  },
];

const MEET_ACTIVATE_KEYS = ["cal-video", "zoom", "inperson"] as const;

// Booker card always shows Cal Video selected — it is a stable final state.
const BOOKER_SELECTED = "cal-video" as const;

function MeetPanel({ isActive }: { isActive: boolean }) {
  const prefersReducedMotion = useMediaQuery(
    "(prefers-reduced-motion: reduce)",
  );
  const [enabledRows, setEnabledRows] = React.useState<Set<string>>(new Set());
  const [showBookerCard, setShowBookerCard] = React.useState(false);

  // Sequential activation: Cal Video → Zoom → In person → Booker card.
  React.useEffect(() => {
    if (!isActive) {
      const t = setTimeout(() => {
        setEnabledRows(new Set());
        setShowBookerCard(false);
      }, 300);
      return () => clearTimeout(t);
    }
    if (prefersReducedMotion) {
      setEnabledRows(new Set(MEET_ACTIVATE_KEYS));
      setShowBookerCard(true);
      return;
    }
    const timers: ReturnType<typeof setTimeout>[] = [];
    timers.push(
      setTimeout(
        () => setEnabledRows((p) => new Set([...p, "cal-video"])),
        400,
      ),
    );
    timers.push(
      setTimeout(() => setEnabledRows((p) => new Set([...p, "zoom"])), 1000),
    );
    timers.push(
      setTimeout(
        () => setEnabledRows((p) => new Set([...p, "inperson"])),
        1600,
      ),
    );
    timers.push(setTimeout(() => setShowBookerCard(true), 2200));
    return () => {
      for (const t of timers) clearTimeout(t);
    };
  }, [isActive, prefersReducedMotion]);

  return (
    <div className="relative">
      <div className="overflow-hidden rounded-xl border border-border bg-card">
        <div className="border-b border-border px-6 py-5">
          <p className="text-sm font-semibold text-foreground">
            How would you like to meet?
          </p>
          <p className="mt-0.5 text-xs text-muted-foreground">
            Choose the formats available for this event type
          </p>
        </div>

        <div className="divide-y divide-border/50">
          {MEETING_TYPES.map((row) => {
            const Icon = row.Icon;
            return (
              <div key={row.key} className="flex items-center gap-4 px-6 py-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted/70">
                  {row.isLogo ? (
                    <span className="flex h-6 w-6">
                      <Icon />
                    </span>
                  ) : (
                    <Icon
                      className="size-4 text-foreground/60"
                      aria-hidden="true"
                    />
                  )}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-foreground">
                    {row.label}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {row.description}
                  </p>
                </div>
                <VisualSwitch checked={enabledRows.has(row.key)} />
              </div>
            );
          })}
        </div>
      </div>

      {/* Floating Booker chooses card — bottom-right, consistent overlap offset */}
      <div
        aria-live="polite"
        className="pointer-events-none absolute z-10"
        style={
          prefersReducedMotion
            ? {
                right: "-52px",
                bottom: "-36px",
                opacity: showBookerCard ? 1 : 0,
              }
            : {
                right: "-52px",
                bottom: "-36px",
                opacity: showBookerCard ? 1 : 0,
                transform: showBookerCard
                  ? "translateY(0)"
                  : "translateY(10px)",
                transition: "opacity 400ms ease-out, transform 400ms ease-out",
              }
        }
      >
        <div className="pointer-events-auto w-[264px] rounded-xl border border-border bg-card px-4 py-3.5 shadow-sm">
          <p className="mb-2.5 text-xs font-semibold text-foreground">
            Booker's choice
          </p>
          <div className="flex flex-wrap items-center gap-1.5">
            {/* Cal Video — always selected */}
            <span
              className={cn(
                "flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium",
                BOOKER_SELECTED === "cal-video"
                  ? "bg-foreground text-background"
                  : "bg-muted/60 text-foreground/70",
              )}
            >
              <span className="flex h-3.5 w-3.5 shrink-0">
                <NextImage
                  src="/icons/cal-video.svg"
                  width={14}
                  height={14}
                  unoptimized
                  alt=""
                  aria-hidden="true"
                  className="h-full w-full object-contain"
                />
              </span>
              Cal Video
            </span>
            {/* Zoom — inactive option */}
            <span className="flex items-center gap-1.5 rounded-full bg-muted/60 px-2.5 py-1 text-xs font-medium text-foreground/70">
              <span className="flex h-3.5 w-3.5 shrink-0">
                <NextImage
                  src="/icons/zoom.svg"
                  width={14}
                  height={14}
                  unoptimized
                  alt=""
                  aria-hidden="true"
                  className="h-full w-full object-contain"
                />
              </span>
              Zoom
            </span>
            {/* In person — inactive option */}
            <span className="flex items-center gap-1.5 rounded-full bg-muted/60 px-2.5 py-1 text-xs font-medium text-foreground/70">
              <MapPinIcon
                className="size-3.5 shrink-0 text-foreground/60"
                aria-hidden="true"
              />
              In person
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Make it yours ────────────────────────────────────────────────────────────

function MakeItYoursCard({
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

function BookingLinkVisual() {
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

function YourLookVisual() {
  return (
    <div className="flex items-center gap-2">
      {/* Black — selected */}
      <span
        aria-hidden="true"
        className="block h-5 w-5 rounded-full bg-foreground ring-2 ring-foreground ring-offset-2"
      />
      {/* Dark grey */}
      <span
        aria-hidden="true"
        className="block h-5 w-5 rounded-full bg-neutral-500"
      />
      {/* Light grey */}
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

function TimeSlotsVisual() {
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
