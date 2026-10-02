import { Container } from "@/components/ui/container";
import {
  SectionEyebrow,
  SectionHeading,
} from "@/components/ui/section-heading";
import { TestimonialsCarousel } from "./carousel-track";
import { TileCluster } from "./tile-background";

export function TestimonialsSection() {
  return (
    <section
      aria-label="Customer testimonials"
      className="relative w-full overflow-hidden bg-inverse"
    >
      {/* Top-right concentrated tile cluster */}
      <TileCluster />

      {/* Section header — left-aligned */}
      <Container className="relative">
        <div className="pt-20 lg:pt-28">
          <div className="flex items-center gap-3">
            <SectionEyebrow tone="dark">Testimonials</SectionEyebrow>
          </div>

          <SectionHeading tone="dark" className="mt-4 max-w-2xl">
            Don&apos;t just take our word for it.
          </SectionHeading>

          <p className="mt-4 max-w-sm text-base leading-relaxed text-inverse-foreground/80">
            See how people and teams use Cal.com to make scheduling work the way
            they do.
          </p>
        </div>
      </Container>

      {/* Carousel — full bleed */}
      <TestimonialsCarousel />
    </section>
  );
}
