"use client";

import { Check } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { useContact } from "@/components/contact/contact-provider";
import { useChat } from "@/components/chat/chat-provider";

const covers = [
  "Lead capture",
  "Sales workflow",
  "Customer onboarding",
  "Repetitive manual processes",
  "Existing software",
  "AI opportunities",
  "Reporting",
  "Integrations",
];

export function AuditSection() {
  const { handlePrimaryCta } = useContact();
  const { openChat } = useChat();

  return (
    <section
      id="audit"
      className="border-y border-border"
      style={{ background: "linear-gradient(180deg, #070b10 0%, #0b1118 100%)" }}
    >
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <Reveal>
          <h2 className="font-display text-3xl text-ink sm:text-4xl">
            Not sure what to automate—or whether your idea is worth building?
          </h2>
          <p className="mt-3 text-lg text-ink-soft">
            Start with a focused Business Systems Audit.
          </p>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate">
            We examine how work moves through your business, where it gets
            delayed and which tools are involved. You get a practical
            recommendation—not a generic list of AI ideas.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {covers.map((item, i) => (
            <Reveal key={item} delayMs={i * 30}>
              <div className="flex items-start gap-2 rounded-lg border border-border bg-surface-elevated px-3 py-3 text-sm text-ink-soft">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden />
                <span>{item}</span>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <p className="mt-10 max-w-2xl text-base text-slate">
            You&apos;ll leave knowing what to improve first, what kind of
            solution it needs and what should remain manual.
          </p>
          <div className="mt-6 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
            <Button onClick={() => handlePrimaryCta("audit")}>
              Book the Free Discovery Call
            </Button>
            <Button variant="secondary" onClick={() => openChat("audit")}>
              Check an Idea With Our AI
            </Button>
          </div>
          <p className="mt-3 text-xs text-slate-muted">
            30 minutes · No obligation · No technical knowledge required
          </p>
        </Reveal>
      </div>
    </section>
  );
}
