import NextImage from "next/image";
import { cn } from "@/lib/utils";
import type { TESTIMONIALS } from "./data";

// ─── PortraitSlot ─────────────────────────────────────────────────────────────
// Priority: genuine portrait image → company-name wordmark fallback.
// The wordmark fallback is intentional design, not a placeholder —
// used whenever no verified person image is available.

function PortraitSlot({
  portrait,
  name,
  company,
}: {
  portrait: string | null;
  name: string;
  company: string;
}) {
  if (portrait) {
    return (
      <NextImage
        src={portrait}
        alt={name}
        fill
        sizes="(min-width: 1024px) 200px, (min-width: 640px) 160px, 140px"
        className="object-cover"
      />
    );
  }

  return (
    <div className="flex h-full w-full items-center justify-center bg-foreground p-8">
      <span className="select-none text-center text-2xl font-bold uppercase tracking-[0.18em] text-inverse-foreground">
        {company}
      </span>
    </div>
  );
}

// ─── TestimonialCard ──────────────────────────────────────────────────────────

type TestimonialCardProps = {
  testimonial: (typeof TESTIMONIALS)[number];
  slideKey: string;
  isActive: boolean;
  isAdjacent: boolean;
  isClone: boolean;
  animated: boolean;
  prefersReducedMotion: boolean;
  cardW: number;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onClick?: () => void;
};

export function TestimonialCard({
  testimonial: t,
  slideKey,
  isActive,
  isAdjacent,
  isClone,
  animated,
  prefersReducedMotion,
  cardW,
  onMouseEnter,
  onMouseLeave,
  onClick,
}: TestimonialCardProps) {
  return (
    // biome-ignore lint/a11y/useSemanticElements: role="group" is the correct ARIA role for a carousel slide
    <div
      key={slideKey}
      role="group"
      aria-label={`${t.name}, ${t.role}`}
      aria-hidden={isClone || !isActive}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{ width: `${cardW}px`, flexShrink: 0 }}
      className={cn(
        "flex flex-col rounded-2xl bg-card sm:flex-row",
        !prefersReducedMotion &&
          animated &&
          "transition-[opacity,transform] duration-700 ease-emphasized",
        isActive
          ? "scale-100 cursor-default opacity-100"
          : isAdjacent
            ? "scale-[0.93] cursor-pointer opacity-35 hover:opacity-45"
            : "scale-[0.88] cursor-pointer opacity-15",
      )}
    >
      {/* Portrait column */}
      <div className="flex shrink-0 items-center justify-center p-6 sm:p-8 sm:pr-0 lg:p-10 lg:pr-0">
        <div className="relative">
          <div
            className="absolute inset-0 rounded-2xl bg-muted"
            style={{
              transform: "rotate(5deg) translate(15px, 6px)",
            }}
          />
          <div className="relative aspect-square w-[140px] overflow-hidden rounded-2xl bg-muted sm:w-[160px] lg:w-[200px]">
            <PortraitSlot
              portrait={t.portrait}
              name={t.name}
              company={t.company}
            />
          </div>
        </div>
      </div>

      {/* Content column */}
      <div className="flex flex-1 flex-col justify-center px-6 pb-8 pt-2 sm:px-8 sm:py-8 lg:px-10 lg:py-10">
        <blockquote>
          <p className="text-xl font-bold leading-snug tracking-tight text-foreground lg:text-2xl">
            &ldquo;{t.quote}&rdquo;
          </p>
        </blockquote>

        <div className="mt-7">
          <p className="text-sm font-semibold text-foreground">{t.name}</p>
          <p className="mt-0.5 text-sm text-muted-foreground">{t.role}</p>
        </div>
      </div>
    </div>
  );
}
