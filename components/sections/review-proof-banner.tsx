import type * as React from "react";

// ─── Tile cluster constants (mirrors Testimonials motif) ──────────────────────

const TILE_SIZE = 96;
const TILE_GAP = 12;
const TILE_COLS = 9;
const TILE_ROWS = 5;

function tileOpacity(row: number, col: number): number {
  const v = (row * 7 + col * 13) % 17;
  if (v < 2) return 0.07;
  if (v < 5) return 0.04;
  return 0.02;
}

function tileBorder(row: number, col: number): number {
  const v = (row * 7 + col * 13) % 17;
  if (v < 2) return 0.07;
  if (v < 5) return 0.05;
  return 0.04;
}

// ─── Left-side tile cluster ───────────────────────────────────────────────────
// Same rounded-square tiles as Testimonials, positioned left with rightward fade.

function BannerTileCluster() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-y-0 left-0 w-[52%] overflow-hidden"
      style={{
        maskImage:
          "radial-gradient(ellipse 80% 90% at 0% 50%, black 10%, transparent 65%)",
        WebkitMaskImage:
          "radial-gradient(ellipse 80% 90% at 0% 50%, black 10%, transparent 65%)",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: "-12%",
          top: "50%",
          transform: "translateY(-50%) rotate(-8deg)",
          display: "grid",
          gridTemplateColumns: `repeat(${TILE_COLS}, ${TILE_SIZE}px)`,
          gap: `${TILE_GAP}px`,
        }}
      >
        {Array.from({ length: TILE_ROWS * TILE_COLS }).map((_, idx) => {
          const row = Math.floor(idx / TILE_COLS);
          const col = idx % TILE_COLS;
          return (
            <div
              key={`${row}-${col}`}
              style={{
                width: `${TILE_SIZE}px`,
                height: `${TILE_SIZE}px`,
                borderRadius: "16px",
                background: `rgba(255,255,255,${tileOpacity(row, col)})`,
                border: `1px solid rgba(255,255,255,${tileBorder(row, col)})`,
              }}
            />
          );
        })}
      </div>
    </div>
  );
}

// ─── Source marks ──────────────────────────────────────────────────────────────

function G2Mark() {
  return (
    <span
      role="img"
      aria-label="G2"
      className="inline-flex items-center justify-center w-9 h-9 rounded-lg text-white text-sm font-bold tracking-tight shrink-0"
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
      className="inline-flex items-center justify-center w-9 h-9 rounded-lg text-white text-sm font-bold tracking-tight shrink-0"
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
        <svg key={i} viewBox="0 0 16 16" width="13" height="13" fill="#F59E0B">
          <path d="M8 1.5L9.47 5.98L14.18 5.99L10.38 8.77L11.82 13.26L8 10.5L4.18 13.26L5.62 8.77L1.82 5.99L6.53 5.98Z" />
        </svg>
      ))}
    </span>
  );
}

// ─── Review item: mark | rating value | stacked(stars + count) ───────────────

function ReviewSource({
  mark,
  score,
  label,
}: {
  mark: React.ReactNode;
  score: string;
  label: string;
}) {
  const [main, denom] = score.split("/");
  return (
    <div className="flex items-center gap-3">
      {mark}
      <span className="flex items-baseline gap-0.5">
        <span className="text-[1.625rem] font-bold leading-none tracking-tight text-background">
          {main}
        </span>
        <span className="text-sm font-medium leading-none text-background/40">
          /{denom}
        </span>
      </span>
      <div className="flex flex-col gap-1">
        <Stars />
        <span className="text-xs leading-none text-background/50">{label}</span>
      </div>
    </div>
  );
}

// ─── Section ───────────────────────────────────────────────────────────────────

export function ReviewProofBanner() {
  return (
    <div className="relative w-full overflow-hidden bg-neutral-950 py-10">
      <BannerTileCluster />
      <div className="relative mx-auto max-w-[1200px] px-10">
        <div className="flex flex-wrap items-center justify-center gap-10 sm:gap-16">
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
            label="400 reviews on Trustpilot"
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
    </div>
  );
}
