import { ArrowRightIcon, WorkflowIcon } from "lucide-react";
import { DemoPanel } from "@/components/hero/demo-panel";
import { Button } from "@/components/ui/button";

// ─── Product Hunt award components ────────────────────────────────────────────

const PH_AWARDS = [
  { category: "Product of the Day", rank: "1st" },
  { category: "Product of the Week", rank: "1st" },
  { category: "Product of the Month", rank: "1st" },
] as const;

// Authentic laurel branch paths extracted from Cal.com's live Product Hunt badges.
// Full SVG: viewBox="0 0 120 36". Left branch occupies x 0-24; right x 97-120.

function PhLaurelLeft({ className }: { className?: string }) {
  return (
    <svg
      width={24}
      height={36}
      viewBox="0 0 24 36"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        fill="currentColor"
        d="M 17.586 35.305 C 21.692 36.895 23.362 35.389 23.362 34.438 C 21.907 34.316 18.432 34.116 17.586 35.305 Z M 12.374 34.005 C 14.48 35.553 17.396 35.348 19.266 33.522 C 17.864 33.132 14.039 32.671 12.374 34.005 Z M 19.32 30.915 C 19.164 32.893 21.19 34.005 23.377 34.166 C 22.978 32.176 20.936 31.288 19.32 30.915 Z M 15.398 29.092 C 15.166 29.937 15.485 32.232 18.631 33.143 C 18.496 31.593 17.672 29.575 15.398 29.092 Z M 9.158 31.393 C 10.823 33.054 13.437 33.288 15.371 31.948 C 14.11 31.298 11.082 30.421 9.158 31.393 Z M 12.483 26.814 C 12.052 27.647 11.96 30.02 14.746 31.448 C 14.908 29.921 14.294 27.308 12.483 26.814 Z M 5.591 27.736 C 6.121 28.779 7.056 29.559 8.177 29.893 C 9.287 30.22 10.484 30.064 11.475 29.465 C 9.719 27.814 6.917 27.181 5.591 27.736 Z M 9.756 23.312 C 8.506 25.492 9.827 27.981 11.201 29.003 C 11.812 26.977 11.251 24.77 9.757 23.312 Z M 3.274 23.218 C 3.123 26.603 6.658 26.419 8.318 26.441 C 7.795 25.73 4.891 23.152 3.274 23.218 Z M 7.633 20.056 C 6.976 20.779 5.99 23.557 8.173 25.824 C 8.857 24.185 9.008 21.668 7.634 20.056 Z M 1.421 18.555 C 1.308 21.289 3.609 22.673 5.829 22.652 C 5.161 21.334 3.377 18.795 1.421 18.555 Z M 6.077 16.672 C 4.606 17.538 4.773 20.334 5.641 21.79 C 6.616 20.434 7.344 18.75 6.077 16.672 Z M 1.324 14.11 C 0.596 16.6 2.735 18.284 4.018 18.428 C 3.689 17.239 3.258 15.133 1.323 14.11 Z M 5.806 13.282 C 4.185 14.094 3.416 16.037 4.023 17.789 C 5.155 16.877 6.518 14.949 5.806 13.282 Z M 1.248 10.27 C 0.246 13.299 2.547 14.288 3.403 14.531 C 3.301 13.243 2.482 10.675 1.248 10.27 Z M 5.742 9.475 C 5.085 9.664 3.21 11.204 3.549 13.96 C 4.783 13.265 6.281 11.942 5.742 9.475 Z M 1.927 5.68 C 0.806 9.403 2.676 10.931 3.29 11.236 C 3.388 10.059 3.506 7.308 1.927 5.68 Z M 6.076 5.774 C 4.902 6.101 3.42 8.258 3.49 10.331 C 4.653 9.798 6.394 7.58 6.076 5.774 Z M 5.726 0 C 2.999 2.818 2.617 5.04 3.414 7.78 C 4.649 6.669 5.634 3.334 5.726 0 Z"
      />
    </svg>
  );
}

function PhLaurelRight({ className }: { className?: string }) {
  return (
    <svg
      width={23}
      height={36}
      viewBox="97 0 23 36"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        fill="currentColor"
        d="M 103.116 35.305 C 99.01 36.895 97.34 35.389 97.34 34.438 C 98.795 34.316 102.27 34.116 103.116 35.305 Z M 108.327 34.005 C 106.221 35.553 103.305 35.348 101.435 33.522 C 102.837 33.132 106.662 32.671 108.327 34.005 Z M 101.381 30.915 C 101.537 32.893 99.511 34.005 97.324 34.166 C 97.723 32.176 99.765 31.288 101.381 30.915 Z M 105.304 29.092 C 105.536 29.937 105.217 32.232 102.071 33.143 C 102.206 31.593 103.03 29.575 105.304 29.092 Z M 111.544 31.393 C 109.879 33.054 107.264 33.288 105.331 31.948 C 106.592 31.298 109.62 30.421 111.544 31.393 Z M 108.219 26.814 C 108.65 27.647 108.741 30.02 105.956 31.448 C 105.794 29.921 106.408 27.308 108.219 26.814 Z M 115.111 27.736 C 114.581 28.779 113.646 29.559 112.525 29.893 C 111.415 30.22 110.218 30.064 109.227 29.465 C 110.983 27.814 113.785 27.181 115.111 27.736 Z M 110.946 23.312 C 112.196 25.492 110.875 27.981 109.501 29.003 C 108.89 26.977 109.451 24.77 110.945 23.312 Z M 117.428 23.218 C 117.579 26.603 114.044 26.419 112.384 26.441 C 112.907 25.73 115.811 23.152 117.428 23.218 Z M 113.069 20.056 C 113.726 20.779 114.712 23.557 112.529 25.824 C 111.845 24.185 111.694 21.668 113.068 20.056 Z M 119.282 18.555 C 119.394 21.289 117.093 22.673 114.874 22.652 C 115.542 21.334 117.326 18.795 119.282 18.555 Z M 114.626 16.672 C 116.097 17.538 115.93 20.334 115.062 21.79 C 114.087 20.434 113.359 18.75 114.626 16.672 Z M 119.378 14.11 C 120.106 16.6 117.967 18.284 116.684 18.428 C 117.013 17.239 117.444 15.133 119.379 14.11 Z M 114.895 13.282 C 116.517 14.094 117.286 16.037 116.679 17.789 C 115.547 16.877 114.184 14.949 114.895 13.282 Z M 119.454 10.27 C 120.456 13.299 118.155 14.288 117.299 14.531 C 117.401 13.243 118.22 10.675 119.454 10.27 Z M 114.96 9.475 C 115.617 9.664 117.492 11.204 117.153 13.96 C 115.919 13.265 114.421 11.942 114.96 9.475 Z M 118.775 5.68 C 119.896 9.403 118.026 10.931 117.412 11.236 C 117.314 10.059 117.196 7.308 118.775 5.68 Z M 114.626 5.774 C 115.8 6.101 117.282 8.258 117.212 10.331 C 116.048 9.798 114.308 7.58 114.626 5.774 Z M 114.976 0 C 117.703 2.818 118.085 5.04 117.288 7.78 C 116.053 6.669 115.068 3.334 114.976 0 Z"
      />
    </svg>
  );
}

function AwardBadge({ category, rank }: { category: string; rank: string }) {
  return (
    <div className="flex items-center gap-1">
      <PhLaurelLeft className="shrink-0 text-foreground/35" />
      <div className="flex flex-col items-center text-center">
        <span className="text-micro font-semibold uppercase leading-none tracking-[0.13em] text-muted-foreground">
          {category}
        </span>
        <span className="mt-1 text-lg font-bold leading-none tracking-tight text-foreground">
          {rank}
        </span>
      </div>
      <PhLaurelRight className="shrink-0 text-foreground/35" />
    </div>
  );
}

// ─── HeroSection ──────────────────────────────────────────────────────────────

export function HeroSection() {
  return (
    <section aria-label="Hero" className="w-full bg-background">
      <div className="mx-auto max-w-[1200px] px-10 pt-14 pb-10 lg:pt-20 lg:pb-16">
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

        {/* Product Hunt achievements — centred across full hero width */}
        <div className="mt-0 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          {PH_AWARDS.map((award) => (
            <AwardBadge
              key={award.category}
              category={award.category}
              rank={award.rank}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
