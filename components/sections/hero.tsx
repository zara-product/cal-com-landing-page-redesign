import { ArrowRightIcon, WorkflowIcon } from "lucide-react";
import { DemoPanel } from "@/components/hero/demo-panel";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section aria-label="Hero" className="w-full bg-background">
      <div className="mx-auto max-w-7xl px-6 pt-24 pb-16 lg:px-8 lg:pt-32 lg:pb-24">
        <div className="grid grid-cols-1 items-center gap-12 xl:grid-cols-2 xl:gap-16">
          {/* Left: copy */}
          <div className="flex flex-col">
            {/* Eyebrow */}
            <a
              href="#workflows-2"
              className="inline-flex w-fit items-center gap-2 rounded-full border border-border bg-muted/60 px-3 py-1.5 text-xs transition-colors hover:bg-muted"
            >
              <WorkflowIcon
                className="size-3.5 shrink-0 text-foreground/70"
                aria-hidden="true"
              />
              <span>
                <span className="font-semibold text-foreground">
                  New in Cal.com v6.9
                </span>
                <span className="mx-1.5 text-muted-foreground/50">—</span>
                <span className="text-muted-foreground">Workflows 2.0</span>
              </span>
              <ArrowRightIcon
                className="ml-0.5 size-3 text-muted-foreground/50"
                aria-hidden="true"
              />
            </a>

            {/* Headline */}
            <h1 className="mt-8 text-[2.5rem] font-bold leading-[1.08] tracking-tight text-foreground xl:text-[3.25rem]">
              Schedule simply.
              <br />
              Coordinate intelligently.
              <br />
              Scale without limits.
            </h1>

            {/* Body */}
            <p className="mt-5 max-w-md text-base leading-relaxed text-muted-foreground lg:text-[1.0625rem]">
              Make your time easy to book, coordinate meetings across teams,
              automate what happens around them, or bring scheduling directly
              into your product.
            </p>

            {/* CTAs + reassurance grouped */}
            <div className="mt-8 flex flex-col gap-3">
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button size="lg">Get started free</Button>
                <Button size="lg" variant="outline">
                  Book a demo
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Free for individuals
                <span className="mx-2 opacity-40" aria-hidden="true">
                  ·
                </span>
                No credit card required
                <span className="mx-2 opacity-40" aria-hidden="true">
                  ·
                </span>
                Your calendars stay in sync
              </p>
            </div>
          </div>

          {/* Right: demo */}
          <div className="w-full">
            <DemoPanel />
          </div>
        </div>
      </div>
    </section>
  );
}
