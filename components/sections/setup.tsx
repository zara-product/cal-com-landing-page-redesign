"use client";

import * as React from "react";
import { SectionDivider } from "@/components/ui/page-rail";
import {
  SectionEyebrow,
  SectionHeading,
} from "@/components/ui/section-heading";
import { Tabs, TabsList, TabsPanel, TabsTab } from "@/components/ui/tabs";
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
  const rafRef = React.useRef<number | null>(null);
  const startTimeRef = React.useRef<number | null>(null);

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
          <Tabs
            value={activeStep}
            onValueChange={(v) => setActiveStep(v as StepId)}
            orientation="vertical"
            className="mt-8 grid grid-cols-1 items-start gap-6 lg:mt-10 lg:grid-cols-[360px_1fr] lg:items-center lg:gap-14 xl:gap-20"
          >
            {/* Step nav */}
            <TabsList
              aria-label="Setup steps"
              className="flex flex-col gap-1 rounded-none bg-transparent p-0 w-full [&_[data-slot=tab-indicator]]:hidden"
            >
              {STEPS.map((step) => (
                <TabsTab
                  key={step.id}
                  value={step.id}
                  className={cn(
                    "relative h-auto sm:h-auto w-full overflow-hidden rounded-xl",
                    "whitespace-normal justify-start items-start px-0 py-0 border-none",
                    "bg-transparent text-left",
                    "hover:bg-muted/20 hover:text-inherit",
                    "data-active:bg-card data-active:shadow-sm",
                    "transition-shadow duration-250",
                  )}
                >
                  {/* Progress fill — animates left-to-right inside active card */}
                  {activeStep === step.id && !prefersReducedMotion && (
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 bg-muted/50"
                      style={{ width: `${progress}%`, right: "auto" }}
                    />
                  )}

                  <div className="relative flex items-start gap-3 px-5 py-4 w-full">
                    <span className="shrink-0 tabular-nums text-xs font-semibold leading-snug text-muted-foreground">
                      {step.number}
                    </span>
                    <span className="min-w-0">
                      <span
                        className={cn(
                          "block text-base font-bold leading-snug transition-colors",
                          activeStep === step.id
                            ? "text-foreground"
                            : "text-muted-foreground",
                        )}
                      >
                        {step.title}
                      </span>
                      <span
                        className={cn(
                          "grid overflow-hidden transition-all duration-450",
                          activeStep === step.id
                            ? "grid-rows-[1fr]"
                            : "grid-rows-[0fr]",
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
                            activeStep === step.id
                              ? "opacity-100 mt-2"
                              : "opacity-0",
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
                </TabsTab>
              ))}
            </TabsList>

            {/* Product stage */}
            <div className="relative min-h-[460px]">
              {/* Ripple rings */}
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

              {STEPS.map((step) => (
                <TabsPanel
                  key={step.id}
                  value={step.id}
                  keepMounted
                  className={cn(
                    "absolute inset-0 flex items-center justify-center px-8 pt-8 pb-8",
                    "[&[hidden]]:block data-[hidden]:opacity-0 data-[hidden]:pointer-events-none data-[hidden]:z-0",
                    "data-[ending-style]:opacity-0 data-[ending-style]:translate-y-1",
                    "data-[starting-style]:opacity-0 data-[starting-style]:translate-y-1",
                    "z-10",
                    !prefersReducedMotion &&
                      "transition-[opacity,transform] duration-250 ease-out",
                  )}
                >
                  <div className="w-full max-w-[500px]">
                    {step.id === "connect" && (
                      <ConnectPanel isActive={activeStep === step.id} />
                    )}
                    {step.id === "availability" && (
                      <AvailabilityPanel isActive={activeStep === step.id} />
                    )}
                    {step.id === "meet" && (
                      <MeetPanel isActive={activeStep === step.id} />
                    )}
                  </div>
                </TabsPanel>
              ))}
            </div>
          </Tabs>
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
              description="Match your brand with custom colors, your logo and light or dark mode."
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
