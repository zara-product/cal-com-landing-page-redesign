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
        width: 20,
        height: 20,
        left: -10,
        top: -10,
      }}
    >
      {/* Horizontal arm */}
      <div
        style={{
          position: "absolute",
          left: 2,
          right: 2,
          top: 9.375,
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
          left: 9.375,
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
    // z-[20] lifts above PageRails (z-10) so the gap strips and plus render
    // in front of the vertical rail — creating real empty space at intersections.
    <div
      aria-hidden="true"
      className="relative z-[20] h-0"
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
          {/* Left rail intersection */}
          <div
            className="absolute"
            style={{ left: `calc(50% - ${RAIL_HALF}px)`, top: 0 }}
          >
            {/* Vertical gap strip — covers rail through the intersection zone */}
            <div
              style={{
                position: "absolute",
                width: 3,
                left: -1.5,
                top: -GAP_HALF,
                height: GAP_HALF * 2,
                background: "var(--color-background)",
              }}
            />
            <PlusMarker />
          </div>

          {/* Right rail intersection */}
          <div
            className="absolute"
            style={{ left: `calc(50% + ${RAIL_HALF}px)`, top: 0 }}
          >
            {/* Vertical gap strip */}
            <div
              style={{
                position: "absolute",
                width: 3,
                left: -1.5,
                top: -GAP_HALF,
                height: GAP_HALF * 2,
                background: "var(--color-background)",
              }}
            />
            <PlusMarker />
          </div>
        </>
      )}
    </div>
  );
}
