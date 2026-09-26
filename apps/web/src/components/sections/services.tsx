"use client";

import { Reveal } from "@/components/ui/reveal";

const services = [
  {
    id: "automate",
    eyebrow: "AUTOMATE",
    title: "Eliminate repetitive work.",
    description:
      "We design workflows that automatically move information, trigger actions and keep your team updated.",
    examples: [
      "Lead routing",
      "CRM updates",
      "Email sequences",
      "Customer onboarding",
      "Document processing",
      "Notifications",
      "Reporting",
    ],
    cta: "Explore Automation →",
    href: "#workflows",
  },
  {
    id: "convert",
    eyebrow: "CONVERT",
    title: "Turn more enquiries into customers.",
    description:
      "Build systems around your sales process so fewer leads are lost and your team spends more time closing.",
    examples: [
      "Lead capture",
      "Lead qualification",
      "Automated follow-ups",
      "Appointment booking",
      "Quote follow-ups",
      "Lead scoring",
      "Sales dashboards",
    ],
    cta: "Explore Sales Systems →",
    href: "#audit",
  },
  {
    id: "connect",
    eyebrow: "CONNECT",
    title: "Make your existing tools work together.",
    description:
      "Connect the software you already pay for instead of replacing everything.",
    examples: [
      "Website ↔ CRM",
      "CRM ↔ Email",
      "Stripe ↔ Accounting",
      "Forms ↔ Database",
      "Calendly ↔ CRM",
      "AI ↔ Internal systems",
    ],
    cta: "Explore Integrations →",
    href: "#technology",
  },
];

export function ServicesSection() {
  return (
    <section id="services" className="border-y border-border bg-white">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <Reveal>
          <h2 className="font-display text-3xl text-ink sm:text-4xl">
            Three ways we improve your business
          </h2>
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
