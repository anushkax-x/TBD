import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { MobileStickyCta } from "@/components/layout/mobile-sticky-cta";
import { HeroSection } from "@/components/sections/hero";
import { IntroVideoSection } from "@/components/sections/intro-video";
import { ProblemSection } from "@/components/sections/problems";
import { ServicesSection } from "@/components/sections/services";
import { WorkflowsSection } from "@/components/sections/workflows";
import { AboutSection } from "@/components/sections/about";
import { FaqSection } from "@/components/sections/faq";
import { FinalCtaSection } from "@/components/sections/final-cta";

export default function HomePage() {
  return (
    <div id="top" className="pb-20 md:pb-0">
      <Navbar />
      <main>
        <HeroSection />
        <IntroVideoSection />
        <ProblemSection />
        <ServicesSection />
        <WorkflowsSection />
        <AboutSection />
        <FaqSection />
        <FinalCtaSection />
      </main>
      <Footer />
      <MobileStickyCta />
    </div>
  );
}
