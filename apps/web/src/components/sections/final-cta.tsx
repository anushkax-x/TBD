"use client";

import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { useContact } from "@/components/contact/contact-provider";
import { useChat } from "@/components/chat/chat-provider";

export function FinalCtaSection() {
  const { handlePrimaryCta } = useContact();
  const { openChat } = useChat();

  return (
    <section className="relative overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 80% at 50% 100%, rgba(43, 179, 163, 0.16) 0%, transparent 60%), #0b1118",
        }}
        aria-hidden
      />
      <div className="relative mx-auto max-w-3xl px-4 py-24 text-center sm:px-6 lg:px-8">
        <Reveal>
          <h2 className="font-display text-3xl text-ink sm:text-4xl lg:text-5xl">
            You do not need to know the technical solution to start.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base text-slate sm:text-lg">
            Tell us what is slow, repetitive or disconnected. We&apos;ll help
            determine whether automation, an integration or custom software is
            the right next step.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
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
            30 minutes · No obligation · No technical knowledge required
          </p>
        </Reveal>
      </div>
    </section>
  );
}
