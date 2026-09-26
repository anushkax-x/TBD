"use client";

import { Button } from "@/components/ui/button";
import { useContact } from "@/components/contact/contact-provider";

const steps = [
  "Website enquiry",
  "AI qualification",
  "CRM",
  "Sales notification",
  "Automated follow-up",
  "Appointment booked",
];

export function HeroSection() {
  const { handlePrimaryCta, openContact } = useContact();

  return (
    <section className="relative overflow-hidden border-b border-border">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.45]"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 70% 45% at 75% 0%, rgba(43, 179, 163, 0.18) 0%, transparent 55%), linear-gradient(180deg, #0b1118 0%, #0e1620 100%)",
        }}
        aria-hidden
      />
      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:py-24">
        <div className="animate-fade-up">
          <p className="font-display text-4xl leading-[1.1] tracking-tight text-ink sm:text-5xl lg:text-[3.25rem]">
            Your business shouldn&apos;t need more software. It needs better
            systems.
          </p>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-slate sm:text-lg">
            We automate repetitive workflows, improve lead and sales processes,
            and connect the tools your business already uses — helping growing
            companies operate more efficiently without hiring an in-house
            technical team.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button onClick={() => handlePrimaryCta("hero_primary")}>
              Find Your Automation Opportunities
            </Button>
            <Button
              variant="secondary"
              onClick={() => {
                document.getElementById("workflows")?.scrollIntoView({
                  behavior: "smooth",
                });
              }}
            >
              See What We Can Automate
            </Button>
          </div>
          <p className="mt-8 text-xs font-medium uppercase tracking-[0.14em] text-slate-muted">
            Automation · AI · Integrations · Custom Software
          </p>
        </div>

        <div
          className="animate-fade-up rounded-xl border border-border bg-surface-elevated p-5 shadow-sm sm:p-6"
          style={{ animationDelay: "120ms" }}
          aria-label="Example automation workflow"
        >
          <div className="mb-4 flex items-center justify-between border-b border-border pb-3">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-muted">
                Workflow
              </p>
              <p className="text-sm font-semibold text-ink">Lead to appointment</p>
            </div>
            <span className="rounded-md bg-accent-soft px-2 py-1 text-xs font-medium text-accent">
              Live system
            </span>
          </div>
          <ol className="space-y-0">
            {steps.map((step, i) => (
              <li
                key={step}
                className="workflow-node flex gap-3"
                style={{ animationDelay: `${180 + i * 90}ms` }}
              >
                <div className="flex flex-col items-center">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-surface-elevated text-xs font-semibold text-ink">
                    {i + 1}
                  </span>
                  {i < steps.length - 1 && (
                    <span className="my-1 h-5 w-px bg-border" aria-hidden />
                  )}
                </div>
                <div className="mb-2 flex-1 rounded-lg border border-border bg-surface px-3 py-2">
                  <p className="text-sm font-medium text-ink">{step}</p>
                </div>
              </li>
            ))}
          </ol>
          <button
            type="button"
            className="mt-4 w-full text-left text-xs text-slate hover:text-accent"
            onClick={() => openContact("hero_workflow")}
          >
            Want something like this for your business? →
          </button>
        </div>
      </div>
    </section>
  );
}
