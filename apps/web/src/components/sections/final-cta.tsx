"use client";

import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { useContact } from "@/components/contact/contact-provider";

export function FinalCtaSection() {
  const { handlePrimaryCta, openContact } = useContact();

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
            Think your business could be running more efficiently?
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base text-slate sm:text-lg">
            Tell us what you&apos;re currently doing manually. We&apos;ll help
            you figure out what can be automated.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button onClick={() => handlePrimaryCta("final_primary")}>
              Book a Free Discovery Call →
            </Button>
            <Button
              variant="secondary"
              onClick={() => openContact("final_secondary")}
            >
              Tell Us What You Want To Improve
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
