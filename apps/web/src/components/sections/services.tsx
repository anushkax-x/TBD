import Image from "next/image";
import { Reveal } from "@/components/ui/reveal";
import type { ReactNode } from "react";

const svgProps = {
  viewBox: "0 0 120 56",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  className: "h-12 w-full max-w-[140px]",
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
    eyebrow: "01 · Operations",
    title: "Take repetitive work off your plate.",
    description:
      "Cart recovery, fulfilment updates, restock alerts and the admin that eats evenings.",
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
    id: "convert",
    eyebrow: "02 · Sales",
    title: "Turn more browsers into buyers.",
    description:
      "Tighten the path from browse to purchase—and keep customers coming back.",
    items: [
      "Checkout recovery",
      "Post-purchase follow-up",
      "Win-back campaigns",
    ],
    cta: "Book a discovery call →",
    href: "#cta",
    art: <ConvertArt />,
  },
  {
    id: "connect",
    eyebrow: "03 · Integrations",
    title: "Make your tools talk to each other.",
    description:
      "Connect the apps you already pay for—or build a small piece when nothing fits.",
    items: [
      "Store ↔ email / SMS",
      "Orders ↔ warehouse",
      "Support ↔ order data",
    ],
    cta: "See tools below →",
    href: "#technology",
    art: <ConnectArt />,
  },
  {
    id: "experience",
    eyebrow: "04 · Experience",
    title: "Modernise the product people use.",
    description:
      "Clear, polished interfaces that build trust and reduce drop-off.",
    items: [
      "UI audits & redesigns",
      "Checkout & funnel clarity",
      "Dashboards that feel on-brand",
    ],
    cta: "Discuss a UI revamp →",
    href: "#cta",
    art: <ExperienceArt />,
  },
];

const tools = [
  { name: "OpenAI", file: "openai", label: "ChatGPT" },
  { name: "Anthropic", file: "anthropic", label: "Claude" },
  { name: "Google Gemini", file: "googlegemini", label: "Gemini" },
  { name: "LangChain", file: "langchain", label: "LangGraph" },
  { name: "ElevenLabs", file: "elevenlabs", label: "ElevenLabs" },
  { name: "Shopify", file: "shopify", label: "Shopify" },
  { name: "HubSpot", file: "hubspot", label: "HubSpot" },
  { name: "Stripe", file: "stripe", label: "Stripe" },
  { name: "Slack", file: "slack", label: "Slack" },
  { name: "Notion", file: "notion", label: "Notion" },
  { name: "Zapier", file: "zapier", label: "Zapier" },
  { name: "Make", file: "make", label: "Make" },
  { name: "Airtable", file: "airtable", label: "Airtable" },
  { name: "Google Sheets", file: "googlesheets", label: "Sheets" },
] as const;

export function ServicesSection() {
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
            Four ways in: automate busywork, tighten sales, connect your stack,
            or refresh the interface people use every day.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {services.map((s, i) => (
            <Reveal key={s.id} delayMs={i * 60}>
              <article className="flex h-full flex-col rounded-xl border border-border bg-surface p-6 transition-colors hover:border-border-strong">
                <div className="mb-4 text-accent">{s.art}</div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">
                  {s.eyebrow}
                </p>
                <h3 className="mt-3 text-xl font-semibold text-ink">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate">
                  {s.description}
                </p>
                <ul className="mt-5 flex-1 space-y-1.5">
                  {s.items.map((item) => (
                    <li key={item} className="text-sm text-ink-soft">
                      <span className="mr-2 text-accent">·</span>
                      {item}
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

        <div id="technology" className="mt-16 scroll-mt-24">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-muted">
              Tools we connect
            </p>
            <p className="mt-2 max-w-lg text-sm text-slate">
              We work with the AI models and business tools your team already
              relies on.
            </p>
          </Reveal>
          <ul className="mt-8 grid grid-cols-3 gap-x-4 gap-y-6 sm:grid-cols-4 sm:gap-x-5 sm:gap-y-7 lg:grid-cols-7">
            {tools.map((tool) => (
              <li
                key={tool.file}
                className="group flex flex-col items-center gap-2.5 text-center"
              >
                <Image
                  src={`/tech/${tool.file}.svg`}
                  alt=""
                  width={32}
                  height={32}
                  className="h-8 w-8 opacity-75 brightness-0 invert transition duration-200 group-hover:opacity-100"
                  unoptimized
                />
                <span className="text-[11px] font-medium leading-tight text-slate">
                  {tool.label}
                </span>
                <span className="sr-only">{tool.name}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
