"use client";

import { Reveal } from "@/components/ui/reveal";

const services = [
  {
    id: "automate",
    eyebrow: "01 · AUTOMATE OPERATIONS",
    title: "Make recurring work happen automatically.",
    description:
      "We map the process, remove unnecessary handoffs and automate the steps that do not need human judgement.",
    examples: [
      "Lead routing",
      "CRM updates",
      "Email sequences",
      "Customer onboarding",
      "Document processing",
      "Notifications",
      "Reporting",
    ],
    cta: "See automation workflows →",
    href: "#workflows",
  },
  {
    id: "convert",
    eyebrow: "02 · IMPROVE SALES",
    title: "Respond faster and lose fewer opportunities.",
    description:
      "We build a reliable path from enquiry to follow-up, qualification and booking so every lead has a clear next step.",
    examples: [
      "Lead capture",
      "Lead qualification",
      "Automated follow-ups",
      "Appointment booking",
      "Quote follow-ups",
      "Lead scoring",
      "Sales dashboards",
    ],
    cta: "Explore a business systems audit →",
    href: "#audit",
  },
  {
    id: "connect",
    eyebrow: "03 · CONNECT & BUILD",
    title: "Connect what you have—or build what is missing.",
    description:
      "We integrate the software you already use and build focused internal tools when off-the-shelf products cannot fit the workflow.",
    examples: [
      "Website ↔ CRM",
      "CRM ↔ Email",
      "Stripe ↔ Accounting",
      "Forms ↔ Database",
      "Calendly ↔ CRM",
      "AI ↔ Internal systems",
    ],
    cta: "See our technology approach →",
    href: "#technology",
  },
];

export function ServicesSection() {
  return (
    <section id="services" className="border-y border-border bg-surface-elevated">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">
            What we build
          </p>
          <h2 className="font-display text-3xl text-ink sm:text-4xl">
            Better operations, from first enquiry to everyday delivery.
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate">
            We start with the business problem, then choose the smallest
            automation, integration or custom build that can solve it properly.
          </p>
        </Reveal>
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.id} delayMs={i * 60}>
              <article className="flex h-full flex-col rounded-xl border border-border bg-surface p-6 transition-shadow hover:shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">
                  {s.eyebrow}
                </p>
                <h3 className="mt-3 text-xl font-semibold text-ink">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate">
                  {s.description}
                </p>
                <ul className="mt-5 flex-1 space-y-1.5">
                  {s.examples.map((ex) => (
                    <li key={ex} className="text-sm text-ink-soft">
                      <span className="mr-2 text-accent">·</span>
                      {ex}
                    </li>
                  ))}
                </ul>
                <a
                  href={s.href}
                  className="mt-6 inline-flex text-sm font-medium text-accent hover:text-accent-hover"
                >
                  {s.cta}
                </a>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
