import { ArrowRightIcon, WorkflowIcon } from "lucide-react";
import { DemoPanel } from "@/components/hero/demo-panel";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

// ─── HeroSection ──────────────────────────────────────────────────────────────

export function HeroSection() {
  return (
    <section aria-label="Hero" className="w-full bg-background">
      <Container className="pt-14 pb-6 lg:pt-20 lg:pb-10">
        <div className="grid grid-cols-1 items-start gap-12 xl:grid-cols-2 xl:gap-16">
          {/* Left: copy */}
          <div className="flex flex-col">
            {/* Eyebrow */}
            <a
              href="https://cal.com/blog/calcom-v6-9"
              target="_blank"
              rel="noopener noreferrer"
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
            <h1 className="mt-6 text-display font-bold leading-[1.08] tracking-tight text-foreground xl:text-display-xl">
              Scheduling made simple.
            </h1>

            {/* Body */}
            <p className="mt-5 max-w-md text-base leading-relaxed text-muted-foreground lg:text-body-lg">
              Make time easy to book, coordinate meetings across teams, automate
              what happens around them, or bring scheduling directly into your
              product.
            </p>

            {/* CTAs + reassurance grouped */}
            <div className="mt-7 flex flex-col gap-4">
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button
                  size="lg"
                  // biome-ignore lint/a11y/useAnchorContent: content is merged from Button children by Base UI render
                  render={<a href="https://app.cal.com/signup" />}
                >
                  Sign up for free
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  // biome-ignore lint/a11y/useAnchorContent: content is merged from Button children by Base UI render
                  render={<a href="https://cal.com/talk-to-sales" />}
                >
                  Book a demo
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Free forever for individuals
                <span className="mx-2 opacity-40" aria-hidden="true">
                  ·
                </span>
                No credit card required
                <span className="mx-2 opacity-40" aria-hidden="true">
                  ·
                </span>
                Unlimited event types
              </p>
            </div>
          </div>

          {/* Right: demo */}
          <div className="w-full">
            <DemoPanel />
          </div>
        </div>
      </Container>
    </section>
  );
}
