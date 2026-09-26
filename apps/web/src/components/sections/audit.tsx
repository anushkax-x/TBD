"use client";

import { Check } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { useContact } from "@/components/contact/contact-provider";

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

  return (
    <section id="audit" className="border-y border-border bg-ink text-white">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <Reveal>
          <h2 className="font-display text-3xl sm:text-4xl">
            Not sure what you should automate?
          </h2>
          <p className="mt-3 text-lg text-white/80">
            Start with a Business Automation Audit.
          </p>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/70">
            We&apos;ll look at how your business currently captures leads,
            manages sales, communicates with customers and moves information
            between systems — then identify the highest-impact opportunities for
            automation.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {covers.map((item, i) => (
            <Reveal key={item} delayMs={i * 30}>
              <div className="flex items-start gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-3 text-sm">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden />
                <span>{item}</span>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <p className="mt-10 max-w-2xl text-base text-white/75">
            You&apos;ll leave with a prioritized list of opportunities and a
            clear recommendation on what to implement first.
          </p>
          <div className="mt-6">
            <Button
              className="bg-white text-ink hover:bg-surface"
              onClick={() => handlePrimaryCta("audit")}
            >
              Book a Discovery Call →
            </Button>
            <p className="mt-3 text-xs text-white/50">
              30 minutes · No obligation · No technical knowledge required
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
