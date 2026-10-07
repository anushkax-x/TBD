"use client";

import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { useContact } from "@/components/contact/contact-provider";
import { useChat } from "@/components/chat/chat-provider";

export function FinalCtaSection() {
  const { handlePrimaryCta } = useContact();
  const { openChat } = useChat();

  return (
    <section id="cta" className="relative overflow-hidden border-t border-border">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 80% at 50% 100%, rgba(43, 179, 163, 0.16) 0%, transparent 60%), #070b10",
        }}
        aria-hidden
      />
      <div className="relative mx-auto max-w-2xl px-4 py-24 text-center sm:px-6 lg:px-8">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">
            Ready when you are
          </p>
          <h2 className="mt-3 font-display text-3xl text-ink sm:text-4xl lg:text-5xl">
            Let&apos;s find the smallest change worth making.
          </h2>
          <p className="mx-auto mt-5 max-w-md text-base text-slate sm:text-lg">
            Bring the bottleneck. We&apos;ll tell you what to automate, connect,
            redesign, or leave alone.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button onClick={() => openChat("final_primary")}>
              Check Your Idea With Our AI
            </Button>
            <Button
              variant="secondary"
              onClick={() => handlePrimaryCta("final_secondary")}
            >
              Book a Free Discovery Call
            </Button>
          </div>
          <p className="mt-4 text-xs text-slate-muted">
            Free · 30 minutes · No pitch deck required
          </p>
        </Reveal>
      </div>
    </section>
  );
}
