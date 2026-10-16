"use client";

import { useRef, type ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import { GlowOrb } from "@/components/motion/glow-orb";
import { SplitText } from "@/components/motion/split-text";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { TextScrub } from "@/components/motion/text-scrub";

const svgProps = {
  viewBox: "0 0 120 56",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  className: "h-14 w-full max-w-[150px]",
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

type Service = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  items: string[];
  cta: string;
  href: string;
  art: ReactNode;
  /** Pinned-layout placement: left %, start/length of travel in section progress, tilt */
  pos: { left: string; start: number; length: number; tilt: number };
};

const services: Service[] = [
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
    pos: { left: "26%", start: 0.0, length: 0.52, tilt: -2 },
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
    pos: { left: "68%", start: 0.06, length: 0.48, tilt: 2 },
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
    pos: { left: "5%", start: 0.15, length: 0.56, tilt: 1.5 },
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
    pos: { left: "52%", start: 0.23, length: 0.5, tilt: -1.5 },
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
    pos: { left: "73%", start: 0.33, length: 0.54, tilt: 2 },
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
    pos: { left: "22%", start: 0.42, length: 0.52, tilt: -2 },
  },
];

const EYEBROW = "What we build";
const HEADING = "Built for teams that have outgrown spreadsheets and inbox chasing.";
const INTRO =
  "Automate busywork, connect your stack, refresh the interface, ship custom solutions, and grow a stronger online presence.";

function ServiceCard({ s, className = "" }: { s: Service; className?: string }) {
  const label = s.cta.replace(/\s*→$/, "");
  return (
    <article
      className={`card-glass group flex h-full flex-col rounded-3xl p-7 transition-[border-color,box-shadow] duration-300 hover:border-accent/40 hover:shadow-[0_0_0_1px_rgba(43,179,163,0.15),0_30px_80px_-30px_rgba(43,179,163,0.45)] ${className}`}
    >
      <div className="flex items-start justify-between">
        <span className="inline-flex h-14 w-14 items-center justify-center rounded-full border border-accent/40 bg-accent-soft/60 font-mono text-sm font-medium text-accent shadow-[0_0_28px_-6px_var(--accent-glow)]">
          {s.eyebrow}
        </span>
      </div>
      <div className="my-8 text-accent/80 transition-colors duration-300 group-hover:text-accent">
        {s.art}
      </div>
      <h3 className="text-lg font-medium leading-snug text-ink">{s.title}</h3>
      <p className="mt-3 text-[15px] leading-relaxed">
        <span className="text-ink">{s.description}</span>{" "}
        <span className="text-slate">{s.items.join(" · ")}.</span>
      </p>
      <a
        href={s.href}
        className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-medium text-accent hover:text-accent-hover"
      >
        {label}
        <ArrowRight
          className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
          aria-hidden
        />
      </a>
    </article>
  );
}

function FloatingCard({ s, progress }: { s: Service; progress: MotionValue<number> }) {
  const { start, length, tilt, left } = s.pos;
  const range = [start, start + length];
  const y = useTransform(progress, range, ["100vh", "-115vh"]);
  const rotate = useTransform(progress, range, [tilt, -tilt]);
  const scale = useTransform(
    progress,
    [start, start + length / 2, start + length],
    [0.94, 1, 0.97],
  );
  return (
    <motion.div
      className="absolute top-0 w-[21rem] xl:w-[22rem]"
      style={{ left, y, rotate, scale }}
    >
      <ServiceCard s={s} />
    </motion.div>
  );
}

function PinnedServices() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const progress = useSpring(scrollYProgress, { stiffness: 220, damping: 40, mass: 0.4 });
  const headingScale = useTransform(progress, [0, 0.9, 1], [1, 1, 0.96]);

  return (
    <div ref={ref} className="relative h-[360vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <GlowOrb className="-left-48 top-1/4" size={620} opacity={0.22} parallax={0} />
          <GlowOrb className="-right-40 bottom-0" size={520} opacity={0.16} parallax={0} duration={22} />
        </div>

        <motion.div
          className="relative z-0 flex h-full flex-col items-center justify-center px-6 text-center"
          style={{ scale: headingScale }}
        >
          <p className="eyebrow eyebrow-pill">{EYEBROW}</p>
          <h2 className="mt-8 max-w-5xl font-display text-5xl leading-[1.05] text-ink xl:text-[4.25rem]">
            <TextScrub text={HEADING} progress={progress} range={[0, 0.32]} />
          </h2>
          <p className="mt-8 max-w-2xl text-xl leading-relaxed text-ink-soft">
            <TextScrub text={INTRO} progress={progress} range={[0.18, 0.45]} dim={0.15} />
          </p>
        </motion.div>

        <div className="absolute inset-0 z-10">
          {services.map((s) => (
            <FloatingCard key={s.id} s={s} progress={progress} />
          ))}
        </div>
      </div>
    </div>
  );
}

function StackedServices({ className = "" }: { className?: string }) {
  return (
    <div className={`relative mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:px-8 ${className}`}>
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <GlowOrb className="-left-40 top-0" size={420} opacity={0.18} parallax={0} />
      </div>
      <div className="relative text-center">
        <p className="eyebrow eyebrow-pill">{EYEBROW}</p>
        <h2 className="mx-auto mt-6 max-w-3xl font-display text-4xl leading-[1.08] text-ink sm:text-5xl">
          <SplitText text={HEADING} />
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-slate sm:text-lg">
          {INTRO}
        </p>
      </div>
      <Stagger className="relative mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s) => (
          <StaggerItem key={s.id} className="h-full">
            <ServiceCard s={s} />
          </StaggerItem>
        ))}
      </Stagger>
    </div>
  );
}

export function ServicesSection() {
  const reduce = useReducedMotion();

  return (
    <section id="services" className="relative scroll-mt-0 bg-surface">
      {reduce ? (
        <StackedServices />
      ) : (
        <>
          <div className="hidden lg:block">
            <PinnedServices />
          </div>
          <StackedServices className="lg:hidden" />
        </>
      )}
    </section>
  );
}
