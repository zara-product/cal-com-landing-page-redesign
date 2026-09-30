// Architectural rail constants — centred 1200px content column
const RAIL_HALF = 600; // half of max-width: 1200px
const GAP_HALF = 14; // half of the 28px gap at each rail/divider intersection

// Horizontal rule with real gaps punched at each rail position via linear-gradient.
// The last colour stop includes the closing ")" so .join alone produces valid CSS.
const LINE_GRADIENT = [
  "linear-gradient(to right",
  `var(--color-frame) calc(50% - ${RAIL_HALF + GAP_HALF}px)`,
  `transparent calc(50% - ${RAIL_HALF + GAP_HALF}px)`,
  `transparent calc(50% - ${RAIL_HALF - GAP_HALF}px)`,
  `var(--color-frame) calc(50% - ${RAIL_HALF - GAP_HALF}px)`,
  `var(--color-frame) calc(50% + ${RAIL_HALF - GAP_HALF}px)`,
  `transparent calc(50% + ${RAIL_HALF - GAP_HALF}px)`,
  `transparent calc(50% + ${RAIL_HALF + GAP_HALF}px)`,
  `var(--color-frame) calc(50% + ${RAIL_HALF + GAP_HALF}px))`,
].join(", ");

// ─── Plus marker ──────────────────────────────────────────────────────────────
// 10px arms, 1.25px stroke, transparent background.
// Positioned so its centre aligns with the rail/divider intersection.
// Floats in the 28px gap — no covering square or patch.

function PlusMarker() {
  return (
    <div
      style={{
        position: "absolute",
        width: 14,
        height: 14,
        left: -7,
        top: -7,
      }}
    >
      {/* Horizontal arm */}
      <div
        style={{
          position: "absolute",
          left: 2,
          right: 2,
          top: 6.375,
          height: 1.25,
          background: "var(--color-frame-strong)",
        }}
      />
      {/* Vertical arm */}
      <div
        style={{
          position: "absolute",
          top: 2,
          bottom: 2,
          left: 6.375,
          width: 1.25,
          background: "var(--color-frame-strong)",
        }}
      />
    </div>
  );
}

// ─── PageRails ────────────────────────────────────────────────────────────────
// Continuous 1px vertical hairlines at the left and right rail positions.
// Absolute overlay (z-10) inside a `relative` ancestor (body) so they remain
// visible through section backgrounds on viewports ≥ 1200px.
// pointer-events-none — never blocks interaction.

export function PageRails() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-10"
    >
      <div
        className="absolute inset-y-0 w-px"
        style={{
          left: `calc(50% - ${RAIL_HALF}px)`,
          background: "var(--color-frame)",
        }}
      />
      <div
        className="absolute inset-y-0 w-px"
        style={{
          left: `calc(50% + ${RAIL_HALF}px)`,
          background: "var(--color-frame)",
        }}
      />
    </div>
  );
}

// ─── SectionDivider ───────────────────────────────────────────────────────────
// "default" — hairline with 28px gaps at each rail intersection and a floating
//             plus marker centred in each gap.
// "plain"   — continuous hairline only; used at dark-section boundaries (e.g.
//             entering / leaving Testimonials) to keep transitions clean.

export function SectionDivider({
  variant = "default",
}: {
  variant?: "default" | "plain";
}) {
  return (
    <div
      aria-hidden="true"
      className="relative h-0"
      style={{ overflow: "visible" }}
    >
      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{
          background:
            variant === "plain" ? "var(--color-frame)" : LINE_GRADIENT,
        }}
      />

      {variant === "default" && (
        <>
          {/* Left rail intersection — plus floats in the real gap */}
          <div
            className="absolute"
            style={{ left: `calc(50% - ${RAIL_HALF}px)`, top: 0 }}
          >
            <PlusMarker />
          </div>

          {/* Right rail intersection */}
          <div
            className="absolute"
            style={{ left: `calc(50% + ${RAIL_HALF}px)`, top: 0 }}
          >
            <PlusMarker />
          </div>
        </>
      )}
    </div>
  );
}
