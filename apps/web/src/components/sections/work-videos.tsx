"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import { ArrowUpRight, Instagram, TrendingUp } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { SplitText } from "@/components/motion/split-text";
import {
  getVisibleTestimonials,
  TestimonialCard,
} from "./testimonials";

type CaseStudy = {
  id: string;
  client: string;
  title: string;
  result: string;
  tags: string[];
  href: string;
  linkLabel: string;
};

const sites: (CaseStudy & { image: string; domain: string })[] = [
  {
    id: "copperheads",
    client: "Copperheads · PCB fabrication",
    title: "Custom tool for business and UI revamp",
    result:
      "Rebuilt copperheads.in and shipped a custom ordering tool for Tanay Gupta’s PCB fab.",
    tags: ["UI revamp", "Custom tool"],
    href: "https://copperheads.in/",
    linkLabel: "Visit copperheads.in",
    image: "/customers/copperheads/cover.jpg",
    domain: "copperheads.in",
  },
  {
    id: "anoree",
    client: "Anoree · Online jewellery brand",
    title: "Custom workflows and tools",
    result:
      "Built custom workflows and tools so Anoree can run ops cleaner behind the storefront.",
    tags: ["Automation", "Custom tools"],
    href: "https://anoree.in/",
    linkLabel: "Visit anoree.in",
    image: "/customers/anoree/cover.jpg",
    domain: "anoree.in",
  },
  {
    id: "realty-ai",
    client: "Harsh · Real estate manager",
    title: "Custom dashboard for real estate",
    result:
      "Built Realty AI — listings, bids, sales performance and market RSS in one owner dashboard.",
    tags: ["Custom dashboard", "Ops tool"],
    href: "#stories",
    linkLabel: "Realty AI dashboard",
    image: "/customers/realty-ai/cover.jpg",
    domain: "Realty AI",
  },
];

const creator: CaseStudy & { avatar: string; handle: string } = {
  id: "anika",
  client: "Content creator",
  title: "Online presence & growth",
  result:
    "Helping @itsaniiikaa grow views and strengthen her Instagram presence as a creator.",
  tags: ["Online presence", "Growth"],
  href: "https://www.instagram.com/itsaniiikaa/",
  linkLabel: "View on Instagram",
  avatar: "/customers/itsaniiikaa/profile.jpg",
  handle: "@itsaniiikaa",
};

function Tags({ tags }: { tags: string[] }) {
  return (
    <ul className="flex flex-wrap gap-1.5">
      {tags.map((t) => (
        <li
          key={t}
          className="rounded-full border border-accent/30 bg-accent-soft/30 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-accent"
        >
          {t}
        </li>
      ))}
    </ul>
  );
}

function CardLink({ label }: { label: string }) {
  return (
    <span className="mt-auto inline-flex items-center gap-1 pt-3.5 text-[13px] font-medium text-accent">
      {label}
      <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
    </span>
  );
}

const cardClass =
  "card-glass group flex h-full w-[280px] shrink-0 snap-start flex-col overflow-hidden rounded-2xl transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-[0_24px_60px_-28px_rgba(34,154,148,0.35)] sm:w-[300px]";

function SiteCard({ c }: { c: (typeof sites)[number] }) {
  const isExternal = c.href.startsWith("http");
  const inner = (
    <>
      <div className="p-2.5 pb-0 sm:p-3 sm:pb-0">
        <div className="overflow-hidden rounded-t-xl border border-b-0 border-white/10 bg-[#0e2624]">
          <div className="flex items-center gap-2 border-b border-white/10 px-2.5 py-1.5">
            <span className="flex gap-1">
              {[0, 1, 2].map((i) => (
                <span key={i} className="h-1.5 w-1.5 rounded-full bg-white/15" />
              ))}
            </span>
            <span className="mx-auto rounded-md bg-white/5 px-2.5 py-0.5 font-mono text-[9px] text-slate">
              {c.domain}
            </span>
            <span className="w-6" />
          </div>
          <div className="relative aspect-[2.2/1] overflow-hidden">
            <Image
              src={c.image}
              alt={`${c.domain} homepage`}
              fill
              sizes="300px"
              className="object-cover object-left-top transition-transform duration-700 group-hover:scale-[1.04]"
              unoptimized
            />
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col border-t border-hairline p-4 sm:p-5">
        <p className="text-[11px] text-slate-muted">{c.client}</p>
        <h3 className="mt-1 text-base font-medium leading-snug text-ink">
          {c.title}
        </h3>
        <p className="mt-1.5 line-clamp-3 text-[13px] leading-relaxed text-slate">
          {c.result}
        </p>
        <div className="mt-3">
          <Tags tags={c.tags} />
        </div>
        {isExternal ? <CardLink label={c.linkLabel} /> : null}
      </div>
    </>
  );

  if (isExternal) {
    return (
      <a
        href={c.href}
        target="_blank"
        rel="noopener noreferrer"
        className={cardClass}
      >
        {inner}
      </a>
    );
  }

  return <article className={cardClass}>{inner}</article>;
}

function CreatorCard() {
  const c = creator;
  return (
    <a
      href={c.href}
      target="_blank"
      rel="noopener noreferrer"
      className={cardClass}
    >
      <div className="p-2.5 pb-0 sm:p-3 sm:pb-0">
        <div className="overflow-hidden rounded-t-xl border border-b-0 border-white/10 bg-[#0e2624]">
          <div className="flex items-center gap-2 border-b border-white/10 px-2.5 py-1.5">
            <span className="flex gap-1">
              {[0, 1, 2].map((i) => (
                <span key={i} className="h-1.5 w-1.5 rounded-full bg-white/15" />
              ))}
            </span>
            <span className="mx-auto rounded-md bg-white/5 px-2.5 py-0.5 font-mono text-[9px] text-slate">
              instagram.com/{c.handle.slice(1)}
            </span>
            <span className="w-6" />
          </div>
          <div className="relative aspect-[2.2/1] overflow-hidden">
            <Image
              src={c.avatar}
              alt={c.handle}
              fill
              sizes="300px"
              className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.04]"
              unoptimized
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"
            />
            <span className="absolute bottom-2.5 left-2.5 flex items-center gap-1.5 rounded-full border border-white/15 bg-black/50 px-2 py-1 text-[10px] font-medium text-ink backdrop-blur-sm">
              <Instagram className="h-3 w-3" />
              {c.handle}
            </span>
            <span className="absolute bottom-2.5 right-2.5 flex items-center gap-1 rounded-full border border-accent/30 bg-accent/20 px-2 py-1 text-[10px] font-medium text-accent backdrop-blur-sm">
              <TrendingUp className="h-3 w-3" />
              Growing
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col border-t border-hairline p-4 sm:p-5">
        <p className="text-[11px] text-slate-muted">
          {c.handle} · {c.client}
        </p>
        <h3 className="mt-1 text-base font-medium leading-snug text-ink">
          {c.title}
        </h3>
        <p className="mt-1.5 line-clamp-3 text-[13px] leading-relaxed text-slate">
          {c.result}
        </p>
        <div className="mt-3">
          <Tags tags={c.tags} />
        </div>
        <CardLink label={c.linkLabel} />
      </div>
    </a>
  );
}

type ScrollItem = {
  kind: "site" | "creator" | "review";
  key: string;
  node: ReactNode;
};

function buildScrollItems(): ScrollItem[] {
  const reviews = getVisibleTestimonials();
  const projectNodes: ScrollItem[] = [
    ...sites.map((c) => ({
      kind: "site" as const,
      key: c.id,
      node: <SiteCard c={c} />,
    })),
    {
      kind: "creator" as const,
      key: creator.id,
      node: <CreatorCard />,
    },
  ];
  const reviewNodes: ScrollItem[] = reviews.map((t) => ({
    kind: "review" as const,
    key: `review-${t.name}`,
    node: (
      <TestimonialCard
        t={t}
        className="h-full w-[280px] shrink-0 snap-start sm:w-[300px]"
      />
    ),
  }));

  // Interleave project → review so the row feels mixed while scrolling
  const out: ScrollItem[] = [];
  const max = Math.max(projectNodes.length, reviewNodes.length);
  for (let i = 0; i < max; i++) {
    if (projectNodes[i]) out.push(projectNodes[i]);
    if (reviewNodes[i]) out.push(reviewNodes[i]);
  }
  return out;
}

/** Real client work + testimonials in one scrollable row. */
export function WorkVideosSection() {
  const scrollItems = buildScrollItems();

  return (
    <section
      id="stories"
      className="theme-sand relative overflow-hidden"
      aria-labelledby="work-videos-heading"
    >
      <div className="mx-auto max-w-6xl px-4 pt-16 sm:px-6 sm:pt-20 lg:px-8 lg:pt-28">
        <div className="text-center">
          <Reveal>
            <p className="eyebrow eyebrow-pill">Work &amp; customers</p>
          </Reveal>
          <h2
            id="work-videos-heading"
            className="mx-auto mt-6 max-w-4xl text-balance font-display text-[2.4rem] leading-[1.02] text-ink sm:text-[3.5rem]"
          >
            <SplitText text="Recent projects and happy customers." />
          </h2>
        </div>
      </div>

      <div className="mt-10 pb-16 sm:mt-12 sm:pb-20 lg:pb-28">
        <div
          className="theme-night flex snap-x snap-mandatory items-stretch gap-3 overflow-x-auto px-4 pb-3 scroll-smooth sm:gap-4 sm:px-6 lg:px-[max(2rem,calc((100vw-72rem)/2+2rem))] [scrollbar-width:thin] [scrollbar-color:rgba(15,107,107,0.35)_transparent]"
          role="list"
          aria-label="Projects and customer reviews"
        >
          {scrollItems.map((item) => (
            <div
              key={item.key}
              role="listitem"
              className="flex shrink-0 self-stretch"
            >
              {item.node}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
