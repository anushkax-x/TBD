"use client";

import Image from "next/image";
import { ExternalLink, Instagram, Linkedin, Quote } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";

type Story = {
  id: string;
  type: "Project" | "Customer" | "Review";
  client: string;
  title: string;
  result: string;
  tone: string;
  /** Optional profile / cover image under /public */
  image?: string;
  /** Optional external profile (e.g. Instagram) */
  href?: string;
  handle?: string;
  /** Review author role / company line */
  role?: string;
};

function LinkIcon({ href }: { href: string }) {
  if (href.includes("instagram.com")) {
    return <Instagram className="h-3.5 w-3.5" aria-hidden />;
  }
  if (href.includes("linkedin.com")) {
    return <Linkedin className="h-3.5 w-3.5" aria-hidden />;
  }
  return <ExternalLink className="h-3.5 w-3.5" aria-hidden />;
}

const customers: Story[] = [
  {
    id: "anika",
    type: "Customer",
    client: "Content creator",
    title: "Online presence & growth",
    result:
      "Helping @itsaniiikaa grow views and strengthen her Instagram presence as a creator.",
    tone: "from-[#1a2824] to-[#0c1412]",
    image: "/customers/itsaniiikaa/profile.jpg",
    href: "https://www.instagram.com/itsaniiikaa/",
    handle: "@itsaniiikaa",
  },
  {
    id: "copperheads",
    type: "Customer",
    client: "Copperheads",
    title: "Custom tool for business and UI revamp",
    result:
      "Rebuilt copperheads.in and shipped a custom ordering tool for Tanay Gupta’s PCB fab.",
    tone: "from-[#2a2218] to-[#14100c]",
    image: "/customers/copperheads/cover.jpg",
    href: "https://copperheads.in/",
    handle: "Tanay Gupta",
  },
  {
    id: "anoree",
    type: "Customer",
    client: "Online jewellery brand",
    title: "Custom workflows and tools",
    result:
      "Built custom workflows and tools so Anoree can run ops cleaner behind the storefront.",
    tone: "from-[#2a1820] to-[#140c10]",
    image: "/customers/anoree/cover.jpg",
    href: "https://anoree.in/",
    handle: "Anoree",
  },
];

const reviews: Story[] = [
  {
    id: "review-meera",
    type: "Review",
    client: "Meera Kapoor",
    title:
      "ok honestly I was drowning in WhatsApp orders. they sorted it. not magic, just finally works and I’m not answering msgs at 11pm anymore",
    result: "skincare brand, Mumbai",
    role: "founder",
    tone: "from-[#1f2e2a] to-[#0e1614]",
    handle: "Meera",
  },
  {
    id: "review-arjun",
    type: "Review",
    client: "Arjun Desai",
    title:
      "we had sheets everywhere. the dashboard isn’t fancy but I can actually see what’s going on now which is all I wanted lol",
    result: "apparel, Bangalore",
    role: "ops",
    tone: "from-[#1a2834] to-[#0c141c]",
    handle: "Arjun",
  },
  {
    id: "review-sana",
    type: "Review",
    client: "Sana Rahman",
    title:
      "site looked like every other clinic before. now people actually book instead of dm-ing me ‘are you free saturday?’ so yeah, happy",
    result: "wellness studio, Gurgaon",
    role: "owner",
    tone: "from-[#2a2430] to-[#141018]",
    handle: "Sana",
  },
];

const projects: Story[] = [
  {
    id: "cart",
    type: "Project",
    client: "DTC skincare",
    title: "Cart recovery sequence",
    result: "Recovered checkouts without manual follow-up.",
    tone: "from-[#1a3330] to-[#0d1c1a]",
    image: "/work/checkout.jpg",
  },
  {
    id: "dash",
    type: "Project",
    client: "Founder-led SaaS",
    title: "Ops dashboard",
    result: "One view for leads, revenue and pipeline.",
    tone: "from-[#2a2438] to-[#14101c]",
    image: "/work/dashboard.jpg",
  },
  {
    id: "wh",
    type: "Project",
    client: "Home goods brand",
    title: "Warehouse sync",
    result: "Stock and storefront finally stayed in lockstep.",
    tone: "from-[#1e2a3a] to-[#0f1520]",
    image: "/work/automation.jpg",
  },
  {
    id: "ui",
    type: "Project",
    client: "B2B marketplace",
    title: "Checkout UI redesign",
    result: "Fewer drop-offs at the payment step.",
    tone: "from-[#1a2e2c] to-[#0c1816]",
    image: "/work/design.jpg",
  },
  {
    id: "onboard",
    type: "Project",
    client: "Agency studio",
    title: "Client onboarding",
    result: "Payment to kickoff without chasing docs.",
    tone: "from-[#243040] to-[#101820]",
    image: "/work/laptop.jpg",
  },
  {
    id: "portal",
    type: "Project",
    client: "Field services",
    title: "Technician portal",
    result: "Jobs, notes and photos in one custom tool.",
    tone: "from-[#1c2834] to-[#0e141c]",
    image: "/work/mobile.jpg",
  },
];

/** Build two marquee rows with a Customer / Project / Review rhythm. */
function buildRows(
  customerList: Story[],
  projectList: Story[],
  reviewList: Story[],
): [Story[], Story[]] {
  const p = projectList;
  // Both rows: C → P → R → P → C/P → R/P so types stay mixed while scrolling
  const rowA: Story[] = [
    customerList[0],
    p[0],
    reviewList[0],
    p[1],
    customerList[1],
    reviewList[1],
  ];
  const rowB: Story[] = [
    customerList[2],
    p[2],
    reviewList[2],
    p[3],
    p[4],
    p[5],
  ];
  return [rowA.filter(Boolean), rowB.filter(Boolean)];
}

function ReviewCard({ story }: { story: Story }) {
  return (
    <article
      className={`group relative flex h-[132px] w-[280px] shrink-0 flex-col justify-between overflow-hidden rounded-lg border border-accent/25 bg-gradient-to-br ${story.tone} px-3 py-3 sm:h-[140px] sm:w-[300px]`}
    >
      <div className="flex items-start justify-between gap-2">
        <span className="rounded border border-accent/30 bg-accent/10 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-accent">
          Review
        </span>
        <Quote
          className="h-4 w-4 shrink-0 text-accent/40 transition group-hover:text-accent/70"
          aria-hidden
        />
      </div>
      <p className="line-clamp-3 text-[12px] font-medium leading-snug text-ink">
        “{story.title}”
      </p>
      <div className="flex items-baseline justify-between gap-2 border-t border-white/10 pt-2">
        <div>
          <p className="text-[11px] font-semibold text-ink">
            {story.handle ?? story.client}
          </p>
          <p className="text-[10px] text-slate-muted">
            {story.role ? `${story.role} · ` : ""}
            {story.result}
          </p>
        </div>
      </div>
    </article>
  );
}

function StoryCard({ story }: { story: Story }) {
  if (story.type === "Review") {
    return <ReviewCard story={story} />;
  }

  const inner = (
    <>
      {story.image ? (
        <Image
          src={story.image}
          alt=""
          fill
          className="object-cover opacity-55 transition duration-500 group-hover:opacity-70 group-hover:scale-105"
          sizes="300px"
          unoptimized
        />
      ) : null}

      <div className="absolute left-3 top-3 z-10 flex items-center gap-2">
        <span className="rounded border border-white/10 bg-black/40 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-accent backdrop-blur-sm">
          {story.type}
        </span>
        <span className="text-[10px] text-slate-muted backdrop-blur-sm">
          {story.handle ?? story.client}
        </span>
      </div>

      {story.href && (
        <div className="absolute right-3 top-3 z-10 rounded-full border border-white/10 bg-black/40 p-1.5 text-ink backdrop-blur-sm">
          <LinkIcon href={story.href} />
        </div>
      )}

      <div className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-black/90 via-black/55 to-transparent px-3 pb-3 pt-10">
        <h3 className="text-sm font-semibold leading-snug text-ink">
          {story.title}
        </h3>
        <p className="mt-0.5 line-clamp-2 text-[11px] leading-snug text-slate">
          {story.result}
        </p>
      </div>
    </>
  );

  const className = `group relative flex h-[132px] w-[280px] shrink-0 overflow-hidden rounded-lg border border-border bg-gradient-to-br ${story.tone} sm:h-[140px] sm:w-[300px]`;

  if (story.href) {
    return (
      <a
        href={story.href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        aria-label={`${story.title} — ${story.handle ?? story.client}`}
      >
        {inner}
      </a>
    );
  }

  return <article className={className}>{inner}</article>;
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
  const [rowA, rowB] = buildRows(customers, projects, reviews);

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
            Automation, UI, custom tools and online presence—across brands and
            creators who needed to grow cleaner.
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
