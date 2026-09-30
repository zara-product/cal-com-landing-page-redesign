import { CapabilitiesSection } from "@/components/sections/capabilities";
import { HeroSection } from "@/components/sections/hero";
import { LogoStripSection } from "@/components/sections/logo-strip";
import { SetupSection } from "@/components/sections/setup";
import { TestimonialsSection } from "@/components/sections/testimonials";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <HeroSection />
      <LogoStripSection />
      <SetupSection />
      <CapabilitiesSection />
      <TestimonialsSection />
    </main>
  );
}
