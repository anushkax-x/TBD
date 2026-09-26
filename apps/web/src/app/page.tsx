import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { MobileStickyCta } from "@/components/layout/mobile-sticky-cta";
import { HeroSection } from "@/components/sections/hero";
import { ProblemSection } from "@/components/sections/problems";
import { ServicesSection } from "@/components/sections/services";
import { BeforeAfterSection } from "@/components/sections/before-after";
import { WorkflowsSection } from "@/components/sections/workflows";
import { AiSection } from "@/components/sections/ai";
import { AuditSection } from "@/components/sections/audit";
import { HowItWorksSection } from "@/components/sections/how-it-works";
import { ExamplesSection } from "@/components/sections/examples";
import { IndustriesSection } from "@/components/sections/industries";
import { AboutSection } from "@/components/sections/about";
import { TechnologySection } from "@/components/sections/technology";
import { FaqSection } from "@/components/sections/faq";
import { FinalCtaSection } from "@/components/sections/final-cta";

export default function HomePage() {
  return (
    <div id="top" className="pb-20 md:pb-0">
      <Navbar />
      <main>
        <HeroSection />
        <ProblemSection />
        <ServicesSection />
        <BeforeAfterSection />
        <WorkflowsSection />
        <AiSection />
        <AuditSection />
        <HowItWorksSection />
        <ExamplesSection />
        <IndustriesSection />
        <AboutSection />
        <TechnologySection />
        <FaqSection />
        <FinalCtaSection />
      </main>
      <Footer />
      <MobileStickyCta />
    </div>
  );
}
