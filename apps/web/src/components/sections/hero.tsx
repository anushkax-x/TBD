"use client";

import { Button } from "@/components/ui/button";
import { useContact } from "@/components/contact/contact-provider";
import { useChat } from "@/components/chat/chat-provider";
import { HeroMeshRotator } from "./hero-mesh-rotator";

export function HeroSection() {
  const { handlePrimaryCta } = useContact();
  const { openChat } = useChat();

  return (
    <section className="relative overflow-hidden border-b border-border">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.45]"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 55% 50% at 78% 40%, rgba(43, 179, 163, 0.16) 0%, transparent 60%), linear-gradient(180deg, #0b1118 0%, #0e1620 100%)",
        }}
        aria-hidden
      />
      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-14 lg:px-8 lg:py-24">
        <div className="animate-fade-up">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">
            Automation · Integrations · AI · Custom Software
          </p>
          <h1 className="mt-4 font-display text-4xl leading-[1.08] tracking-tight text-ink sm:text-5xl lg:text-[3.4rem]">
            Turn the manual work slowing your business down into a system that
            runs reliably.
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-slate sm:text-lg">
            We help growing businesses automate repetitive operations, connect
            disconnected tools and build practical software—so leads are
            followed up, information moves automatically and your team can focus
            on customers.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button onClick={() => openChat("hero_primary")}>
              Check Your Idea With Our AI
            </Button>
            <Button
              variant="secondary"
              onClick={() => handlePrimaryCta("hero_secondary")}
            >
              Book a 30-Minute Discovery Call
            </Button>
          </div>
          <p className="mt-5 max-w-lg text-xs leading-relaxed text-slate-muted">
            Not sure if your idea is feasible? Describe it to the AI assistant
            and get an initial recommendation in a few minutes.
          </p>
        </div>

        <div
          className="animate-fade-up"
          style={{ animationDelay: "120ms" }}
          aria-label="Business systems visualization"
        >
          <HeroMeshRotator />
          <p className="mt-4 max-w-sm text-xs leading-relaxed text-slate-muted">
            Systems designed around how your business actually runs — not
            another tool to manage.
          </p>
        </div>
      </div>
    </section>
  );
}
