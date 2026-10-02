"use client";

import * as React from "react";
import { SectionDivider } from "@/components/ui/page-rail";
import {
  SectionEyebrow,
  SectionHeading,
} from "@/components/ui/section-heading";
import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";
import { AvailabilityPanel } from "./setup/availability-panel";
import { ConnectPanel } from "./setup/connect-panel";
import {
  BookingLinkVisual,
  MakeItYoursCard,
  TimeSlotsVisual,
  YourLookVisual,
} from "./setup/make-it-yours";
import { MeetPanel } from "./setup/meet-panel";

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
                      "relative w-full overflow-hidden rounded-xl text-left transition-shadow duration-250 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
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
                            "grid overflow-hidden transition-all duration-450",
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
                              "min-h-0 text-sm leading-relaxed text-muted-foreground transition-opacity duration-250",
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
                      "transition-[opacity,transform] duration-250 ease-out",
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
