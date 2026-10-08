"use client";

import { Play } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";

type Story = {
  id: string;
  type: "Build" | "Customer";
  client: string;
  title: string;
  result: string;
  tone: string;
};

const stories: Story[] = [
  {
    id: "cart",
    type: "Build",
    client: "DTC skincare",
    title: "Cart recovery sequence",
    result: "Recovered checkouts without manual follow-up.",
    tone: "from-[#1a3330] to-[#0d1c1a]",
  },
  {
    id: "wh",
    type: "Customer",
    client: "Home goods brand",
    title: "Warehouse sync",
    result: "Stock and storefront finally stayed in lockstep.",
    tone: "from-[#1e2a3a] to-[#0f1520]",
  },
  {
    id: "dash",
    type: "Build",
    client: "Founder-led SaaS",
    title: "Ops dashboard",
    result: "One view for leads, revenue and pipeline.",
    tone: "from-[#2a2438] to-[#14101c]",
  },
  {
    id: "ui",
    type: "Customer",
    client: "B2B marketplace",
    title: "Checkout UI redesign",
    result: "Fewer drop-offs at the payment step.",
    tone: "from-[#1a2e2c] to-[#0c1816]",
  },
  {
    id: "onboard",
    type: "Build",
    client: "Agency studio",
    title: "Client onboarding",
    result: "Payment to kickoff without chasing docs.",
    tone: "from-[#243040] to-[#101820]",
  },
  {
    id: "support",
    type: "Customer",
    client: "Specialty retail",
    title: "Support triage",
    result: "“Where’s my order?” answered in seconds.",
    tone: "from-[#302820] to-[#181410]",
  },
  {
    id: "portal",
    type: "Build",
    client: "Field services",
    title: "Technician portal",
    result: "Jobs, notes and photos in one custom tool.",
    tone: "from-[#1c2834] to-[#0e141c]",
  },
  {
    id: "site",
    type: "Customer",
    client: "Wellness brand",
    title: "Marketing site rebuild",
    result: "Clearer offer. More qualified enquiries.",
    tone: "from-[#203028] to-[#101810]",
  },
  {
    id: "invoice",
    type: "Build",
    client: "Wholesale distributor",
    title: "Invoice automation",
    result: "Orders to accounting without copy-paste.",
    tone: "from-[#282430] to-[#141018]",
  },
  {
    id: "vip",
    type: "Customer",
    client: "Apparel label",
    title: "VIP retention flows",
    result: "Repeat buyers nudged without inbox spam.",
    tone: "from-[#1a3038] to-[#0c181c]",
  },
];

function StoryCard({ story }: { story: Story }) {
  return (
    <article
      className={`group relative flex h-[132px] w-[280px] shrink-0 overflow-hidden rounded-lg border border-border bg-gradient-to-br ${story.tone} sm:h-[140px] sm:w-[300px]`}
    >
      {/* Fake “frame” / timeline strip */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage:
            "linear-gradient(90deg, transparent 0%, rgba(43,179,163,0.5) 50%, transparent 100%)",
          backgroundSize: "200% 100%",
        }}
        aria-hidden
      />
      <div className="absolute left-3 top-3 flex items-center gap-2">
        <span className="rounded border border-white/10 bg-black/30 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-accent">
          {story.type}
        </span>
        <span className="text-[10px] text-slate-muted">{story.client}</span>
      </div>

      <div className="absolute inset-0 flex items-center justify-center opacity-40 transition group-hover:opacity-70">
        <span className="flex h-9 w-9 items-center justify-center rounded-full border border-accent/40 bg-accent/20 text-accent backdrop-blur-sm">
          <Play className="ml-0.5 h-3.5 w-3.5 fill-current" />
        </span>
      </div>

      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/50 to-transparent px-3 pb-3 pt-8">
        <h3 className="text-sm font-semibold leading-snug text-ink">
          {story.title}
        </h3>
        <p className="mt-0.5 line-clamp-2 text-[11px] leading-snug text-slate">
          {story.result}
        </p>
      </div>
    </article>
  );
}

function MarqueeRow({
  items,
  reverse = false,
}: {
  items: Story[];
  reverse?: boolean;
}) {
  const loop = [...items, ...items];
  return (
    <div className="work-marquee relative overflow-hidden">
      <div
        className={`work-marquee-track flex w-max gap-3 ${
          reverse ? "work-marquee-track-reverse" : ""
        }`}
      >
        {loop.map((story, i) => (
          <StoryCard key={`${story.id}-${i}`} story={story} />
        ))}
      </div>
    </div>
  );
}

export function WorkVideosSection() {
  const rowA = stories.filter((_, i) => i % 2 === 0);
  const rowB = stories.filter((_, i) => i % 2 === 1);

  return (
    <section
      id="stories"
      className="overflow-hidden border-b border-border bg-surface"
      aria-labelledby="work-videos-heading"
    >
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">
            Work &amp; customers
          </p>
          <h2
            id="work-videos-heading"
            className="mt-3 font-display text-3xl text-ink sm:text-4xl"
          >
            Recent builds and the teams behind them.
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate">
            Automation, UI, custom tools and online presence—across brands that
            needed operations to run cleaner.
          </p>
        </Reveal>
      </div>

      <div className="space-y-3 pb-16 sm:pb-20">
        <MarqueeRow items={rowA} />
        <MarqueeRow items={rowB} reverse />
      </div>
    </section>
  );
}
