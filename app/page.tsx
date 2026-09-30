import { HeroSection } from "@/components/sections/hero";
import { LogoStripSection } from "@/components/sections/logo-strip";
import { SetupSection } from "@/components/sections/setup";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <HeroSection />
      <LogoStripSection />
      <SetupSection />
    </main>
  );
}
