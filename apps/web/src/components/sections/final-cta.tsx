"use client";

import { Check } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { useContact } from "@/components/contact/contact-provider";
import { useChat } from "@/components/chat/chat-provider";

const covers = [
  "Checkout & cart recovery",
  "Order & fulfilment flow",
  "Inventory & restocking",
  "Support & returns",
  "Apps you already pay for",
  "Reporting gaps",
];

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
      <div className="relative mx-auto max-w-3xl px-4 py-24 text-center sm:px-6 lg:px-8">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">
            Business systems audit
          </p>
          <h2 className="mt-3 font-display text-3xl text-ink sm:text-4xl lg:text-5xl">
            Not sure what to automate first?
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base text-slate sm:text-lg">
            Tell us what is slow between your store, inventory, email and
            support. In a short discovery call we&apos;ll recommend the smallest
            change that would actually move the needle.
          </p>

          <ul className="mx-auto mt-8 grid max-w-lg gap-2 text-left sm:grid-cols-2">
            {covers.map((item) => (
              <li
                key={item}
                className="flex items-start gap-2 rounded-lg border border-border bg-surface-elevated/80 px-3 py-2.5 text-sm text-ink-soft"
              >
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden />
                <span>{item}</span>
              </li>
            ))}
          </ul>

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
