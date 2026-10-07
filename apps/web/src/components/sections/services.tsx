"use client";

import { Reveal } from "@/components/ui/reveal";

const services = [
  {
    id: "automate",
    eyebrow: "01 · STORE OPERATIONS",
    title: "Take repetitive store work off your plate.",
    description:
      "Cart recovery, fulfilment updates, restock alerts and the admin tasks that eat evenings.",
    examples: [
      "Abandoned cart sequences",
      "Order status updates",
      "Low-stock alerts",
      "Review requests",
      "Internal notifications",
    ],
    cta: "See store workflows →",
    href: "#workflows",
  },
  {
    id: "convert",
    eyebrow: "02 · SALES & RETENTION",
    title: "Turn more browsers into repeat buyers.",
    description:
      "Tighten the path from product view to purchase—and keep customers coming back without manual chasing.",
    examples: [
      "Checkout recovery",
      "Post-purchase follow-up",
      "Win-back campaigns",
      "VIP / repeat-buyer flows",
      "Sales performance views",
    ],
    cta: "Book a discovery call →",
    href: "#cta",
  },
  {
    id: "connect",
    eyebrow: "03 · CONNECT YOUR STACK",
    title: "Make Shopify talk to the rest of your tools.",
    description:
      "Connect the apps you already pay for—or build a small custom piece when nothing fits.",
    examples: [
      "Shopify ↔ email / SMS",
      "Shopify ↔ accounting",
      "Orders ↔ warehouse",
      "Support ↔ order data",
      "Sheets ↔ live inventory",
    ],
    cta: "See tools we work with →",
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
            Three ways we help businesses run smoother.
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate">
            Start with the bottleneck in your store—then automate, connect or
            build only what you need.
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
