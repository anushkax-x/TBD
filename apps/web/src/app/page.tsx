import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { MobileStickyCta } from "@/components/layout/mobile-sticky-cta";
import { HeroSection } from "@/components/sections/hero";
import { WorkVideosSection } from "@/components/sections/work-videos";
import { ProblemSection } from "@/components/sections/problems";
import { ServicesSection } from "@/components/sections/services";
import { WorkflowsSection } from "@/components/sections/workflows";
import { AboutSection } from "@/components/sections/about";
import { TechnologySection } from "@/components/sections/technology";
import { FaqSection } from "@/components/sections/faq";

export default function HomePage() {
  return (
    <div id="top" className="pb-20 md:pb-0">
      <Navbar />
      <main>
        <HeroSection />
        <ServicesSection />
        <ProblemSection />
        <WorkflowsSection />
        <WorkVideosSection />
        <AboutSection />
        <TechnologySection />
        <FaqSection />
      </main>
      <Footer />
      <MobileStickyCta />
    </div>
  );
}
