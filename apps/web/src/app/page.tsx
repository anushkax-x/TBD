import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/components/sections/hero";
import { WorkVideosSection } from "@/components/sections/work-videos";
import { TemplatesSection } from "@/components/sections/templates";
import { ProblemSection } from "@/components/sections/problems";
import { ServicesSection } from "@/components/sections/services";
import { WorkflowsSection } from "@/components/sections/workflows";
import { AboutSection } from "@/components/sections/about";
import { TechnologySection } from "@/components/sections/technology";
import { FaqSection } from "@/components/sections/faq";

export default function HomePage() {
  return (
    <div id="top">
      <Navbar />
      <main>
        <HeroSection />
        <TemplatesSection />
        <ServicesSection />
        <ProblemSection />
        <WorkflowsSection />
        <WorkVideosSection />
        <AboutSection />
        <TechnologySection />
        <FaqSection />
      </main>
      <Footer />
    </div>
  );
}
