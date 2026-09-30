import type * as React from "react";

// ─── Source marks ──────────────────────────────────────────────────────────────

function G2Mark() {
  return (
    <span
      role="img"
      aria-label="G2"
      className="inline-flex items-center justify-center w-9 h-9 rounded-lg text-white text-sm font-black tracking-tight shrink-0"
      style={{ background: "#FF492C" }}
    >
      G2
    </span>
  );
}

function TrustpilotMark() {
  return (
    <span
      role="img"
      aria-label="Trustpilot"
      className="inline-flex items-center justify-center w-9 h-9 rounded-lg shrink-0"
      style={{ background: "#00B67A" }}
    >
      <svg
        viewBox="0 0 24 24"
        width="20"
        height="20"
        fill="white"
        aria-hidden="true"
      >
        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
      </svg>
    </span>
  );
}

function ProductHuntMark() {
  return (
    <span
      role="img"
      aria-label="Product Hunt"
      className="inline-flex items-center justify-center w-9 h-9 rounded-lg text-white text-sm font-black tracking-tight shrink-0"
      style={{ background: "#DA552F" }}
    >
      P
    </span>
  );
}

// ─── Stars ─────────────────────────────────────────────────────────────────────

function Stars({ count = 5 }: { count?: number }) {
  return (
    <span className="flex gap-0.5" aria-hidden="true">
      {Array.from({ length: count }).map((_, i) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: static decorative display
        // biome-ignore lint/a11y/noSvgWithoutTitle: parent span is aria-hidden
        <svg key={i} viewBox="0 0 16 16" width="14" height="14" fill="#F59E0B">
          <path d="M8 1l1.85 3.75 4.15.6-3 2.93.71 4.13L8 10.25l-3.71 1.16.71-4.13-3-2.93 4.15-.6z" />
        </svg>
      ))}
    </span>
  );
}

// ─── Source entry ──────────────────────────────────────────────────────────────

function ReviewSource({
  mark,
  score,
  label,
}: {
  mark: React.ReactNode;
  score: string;
  label: string;
}) {
  return (
    <div className="flex items-center gap-3">
      {mark}
      <div className="flex flex-col gap-0.5">
        <div className="flex items-baseline gap-1">
          <span className="text-2xl font-extrabold text-background leading-none tracking-tight">
            {score.split("/")[0]}
          </span>
          <span className="text-sm text-background/50 leading-none">/5</span>
          <Stars />
        </div>
        <span className="text-xs text-background/50">{label}</span>
      </div>
    </div>
  );
}

// ─── Section ───────────────────────────────────────────────────────────────────

export function ReviewProofBanner() {
  return (
    <div className="w-full bg-foreground py-6 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1200px] border-l border-r border-background/10 px-10 flex flex-wrap items-center justify-center gap-10 sm:gap-16">
        <ReviewSource
          mark={<G2Mark />}
          score="4.6/5"
          label="154 reviews on G2"
        />
        <div
          className="hidden sm:block w-px h-8 bg-background/10"
          aria-hidden="true"
        />
        <ReviewSource
          mark={<TrustpilotMark />}
          score="4.7/5"
          label="413 reviews on Trustpilot"
        />
        <div
          className="hidden sm:block w-px h-8 bg-background/10"
          aria-hidden="true"
        />
        <ReviewSource
          mark={<ProductHuntMark />}
          score="4.8/5"
          label="86 reviews on Product Hunt"
        />
      </div>
    </div>
  );
}
