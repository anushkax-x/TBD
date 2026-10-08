"use client";

import { useEffect, useState, type ReactNode } from "react";
import { Reveal } from "@/components/ui/reveal";

const ROTATE_MS = 5000;
const VISIBLE = 3;

const svgProps = {
  viewBox: "0 0 120 56",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  className: "h-11 w-full max-w-[120px]",
  "aria-hidden": true,
};

function AutomateArt() {
  return (
    <svg {...svgProps}>
      <circle cx="20" cy="28" r="8" />
      <path d="M28 28 H44" strokeDasharray="3 3" />
      <rect x="44" y="16" width="32" height="24" rx="4" />
      <path d="M76 28 H92" strokeDasharray="3 3" />
      <path d="M92 28 L108 16 M92 28 L108 28 M92 28 L108 40" />
    </svg>
  );
}

function ConvertArt() {
  return (
    <svg {...svgProps}>
      <path d="M16 44 L40 44 L52 20 L68 32 L84 8 L104 8" />
      <circle cx="104" cy="8" r="4" fill="currentColor" stroke="none" />
      <circle cx="40" cy="44" r="3" />
      <circle cx="68" cy="32" r="3" />
    </svg>
  );
}

function ConnectArt() {
  return (
    <svg {...svgProps}>
      <rect x="10" y="14" width="28" height="28" rx="6" />
      <rect x="46" y="14" width="28" height="28" rx="6" />
      <rect x="82" y="14" width="28" height="28" rx="6" />
      <path d="M38 28 H46 M74 28 H82" />
      <circle cx="24" cy="28" r="3" fill="currentColor" stroke="none" />
      <circle cx="60" cy="28" r="3" fill="currentColor" stroke="none" />
      <circle cx="96" cy="28" r="3" fill="currentColor" stroke="none" />
    </svg>
  );
}

function ExperienceArt() {
  return (
    <svg {...svgProps}>
      <rect x="8" y="6" width="40" height="44" rx="4" opacity="0.45" />
      <line x1="14" y1="16" x2="42" y2="16" opacity="0.4" />
      <line x1="14" y1="24" x2="36" y2="24" opacity="0.3" />
      <path d="M54 28 H66" strokeDasharray="3 3" />
      <rect x="72" y="6" width="40" height="44" rx="4" />
      <line x1="80" y1="18" x2="104" y2="18" />
      <line x1="80" y1="28" x2="96" y2="28" opacity="0.7" />
      <rect x="80" y="36" width="20" height="8" rx="2" />
    </svg>
  );
}

function CustomArt() {
  return (
    <svg {...svgProps}>
      <rect x="18" y="10" width="84" height="36" rx="4" />
      <path d="M34 28 H54 M66 22 V34 M78 28 H98" />
      <circle cx="60" cy="28" r="5" />
    </svg>
  );
}

function PresenceArt() {
  return (
    <svg {...svgProps}>
      <circle cx="60" cy="28" r="18" opacity="0.35" />
      <circle cx="60" cy="28" r="10" />
      <path d="M60 10 V18 M60 38 V46 M42 28 H50 M70 28 H78" />
      <circle cx="88" cy="14" r="3" fill="currentColor" stroke="none" />
      <circle cx="96" cy="36" r="2.5" fill="currentColor" stroke="none" />
      <circle cx="28" cy="40" r="2.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

const services: {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  items: string[];
  cta: string;
  href: string;
  art: ReactNode;
}[] = [
  {
    id: "automate",
    eyebrow: "01",
    title: "Workflow automation",
    description: "Cart recovery, fulfilment updates, restock alerts and admin.",
    items: [
      "Abandoned cart sequences",
      "Order & stock alerts",
      "Internal notifications",
    ],
    cta: "See workflows →",
    href: "#workflows",
    art: <AutomateArt />,
  },
  {
    id: "experience",
    eyebrow: "02",
    title: "UI / UX",
    description: "Clearer screens that build trust and reduce drop-off.",
    items: [
      "UI audits & redesigns",
      "Checkout & funnel clarity",
      "On-brand dashboards",
    ],
    cta: "Discuss UI →",
    href: "#faq",
    art: <ExperienceArt />,
  },
  {
    id: "connect",
    eyebrow: "03",
    title: "Manage your tech",
    description: "Link apps you pay for—or build a small piece when nothing fits.",
    items: [
      "Store ↔ email / SMS",
      "Orders ↔ warehouse",
      "Support ↔ order data",
    ],
    cta: "See tools →",
    href: "#technology",
    art: <ConnectArt />,
  },
  {
    id: "presence",
    eyebrow: "04",
    title: "Grow online presence",
    description: "A stronger digital presence that brings customers in.",
    items: [
      "Marketing sites & landings",
      "Conversion-focused structure",
      "Search-ready web presence",
    ],
    cta: "Grow online →",
    href: "#faq",
    art: <PresenceArt />,
  },
  {
    id: "convert",
    eyebrow: "05",
    title: "Improve sales",
    description: "From browse to purchase—and back again without manual chasing.",
    items: [
      "Checkout recovery",
      "Post-purchase follow-up",
      "Win-back campaigns",
    ],
    cta: "Book a call →",
    href: "#faq",
    art: <ConvertArt />,
  },
  {
    id: "custom",
    eyebrow: "06",
    title: "Build custom tools",
    description: "Focused custom tools when off-the-shelf forces workarounds.",
    items: [
      "Internal tools & portals",
      "Workflow-specific apps",
      "APIs and data layers",
    ],
    cta: "Custom build →",
    href: "#faq",
    art: <CustomArt />,
  },
];

/** Two pages of three: 0 = first trio, 1 = second trio */
const PAGES = Math.ceil(services.length / VISIBLE);

export function ServicesSection() {
  const [page, setPage] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const onChange = () => setReduceMotion(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (paused || reduceMotion) return;
    const id = window.setInterval(() => {
      setPage((p) => (p + 1) % PAGES);
    }, ROTATE_MS);
    return () => window.clearInterval(id);
  }, [paused, reduceMotion]);

  const visible = services.slice(page * VISIBLE, page * VISIBLE + VISIBLE);

  return (
    <section id="services" className="border-y border-border bg-surface-elevated">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">
            What we build
          </p>
          <h2 className="mt-3 font-display text-3xl text-ink sm:text-4xl">
            Built for teams that have outgrown spreadsheets and inbox chasing.
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate">
            Automate busywork, connect your stack, refresh the interface, ship
            custom solutions, and grow a stronger online presence.
          </p>
        </Reveal>

        <div
          className="mt-10"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div
            key={page}
            className={`grid gap-5 sm:grid-cols-2 lg:grid-cols-3 ${
              reduceMotion ? "" : "animate-fade-up"
            }`}
          >
            {visible.map((s) => (
              <article
                key={s.id}
                className="flex h-full flex-col rounded-xl border border-border bg-surface p-5 transition-colors hover:border-border-strong"
              >
                <div className="mb-3 text-accent">{s.art}</div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-accent">
                  {s.eyebrow}
                </p>
                <h3 className="mt-2 text-base font-semibold leading-snug text-ink">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate">
                  {s.description}
                </p>
                <ul className="mt-4 flex-1 space-y-1.5">
                  {s.items.map((item) => (
                    <li key={item} className="text-sm leading-snug text-ink-soft">
                      <span className="mr-1.5 text-accent">·</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <a
                  href={s.href}
                  className="mt-5 inline-flex text-sm font-medium text-accent hover:text-accent-hover"
                >
                  {s.cta}
                </a>
              </article>
            ))}
          </div>

          <div className="mt-8 flex items-center justify-center gap-3">
            {Array.from({ length: PAGES }, (_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Show services ${i * VISIBLE + 1}–${Math.min((i + 1) * VISIBLE, services.length)}`}
                aria-current={page === i ? "true" : undefined}
                onClick={() => {
                  setPage(i);
                  setPaused(true);
                }}
                className={`h-1.5 rounded-full transition-all ${
                  page === i
                    ? "w-7 bg-accent"
                    : "w-1.5 bg-border hover:bg-border-strong"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
