import { TILE_COLS, TILE_GAP, TILE_ROWS, TILE_SIZE } from "./data";

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

export function TileCluster() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
      style={{
        maskImage:
          "radial-gradient(ellipse 75% 85% at 100% 0%, black 10%, transparent 65%)",
        WebkitMaskImage:
          "radial-gradient(ellipse 75% 85% at 100% 0%, black 10%, transparent 65%)",
      }}
    >
      <div
        style={{
          position: "absolute",
          right: "-10%",
          top: "-25%",
          width: "70%",
          transform: "rotate(-8deg)",
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
                background: `oklch(from var(--color-inverse-foreground) l c h / ${tileOpacity(row, col)})`,
                border: `1px solid oklch(from var(--color-inverse-foreground) l c h / ${tileBorder(row, col)})`,
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
