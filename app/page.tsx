import { CapabilitiesSection } from "@/components/sections/capabilities";
import { HeroSection } from "@/components/sections/hero";
import { IntegrationsSection } from "@/components/sections/integrations";
import { LogoStripSection } from "@/components/sections/logo-strip";
import { QuestionsSection } from "@/components/sections/questions";
import { ReviewProofBanner } from "@/components/sections/review-proof-banner";
import { SetupSection } from "@/components/sections/setup";
import { TestimonialsSection } from "@/components/sections/testimonials";
import { WallOfLoveSection } from "@/components/sections/wall-of-love";
import { SectionDivider } from "@/components/ui/page-rail";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <HeroSection />
      <SectionDivider />
      <LogoStripSection />
      <SectionDivider />
      <SetupSection />
      <SectionDivider />
      <CapabilitiesSection />
      <SectionDivider variant="plain" />
      <TestimonialsSection />
      <SectionDivider variant="plain" />
      <IntegrationsSection />
      <SectionDivider variant="plain" />
      <ReviewProofBanner />
      <SectionDivider variant="plain" />
      <WallOfLoveSection />
      <SectionDivider />
      <QuestionsSection />
    </main>
  );
}
