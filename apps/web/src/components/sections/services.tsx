"use client";

import { useRef, type ReactNode } from "react";
import Image from "next/image";
import {
  ArrowRight,
  Bell,
  Check,
  CreditCard,
  Mail,
  MousePointer2,
  Search,
  ShoppingCart,
  TrendingUp,
} from "lucide-react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { GlowOrb } from "@/components/motion/glow-orb";
import { SplitText } from "@/components/motion/split-text";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { TextScrub } from "@/components/motion/text-scrub";

/* ------------------------------------------------------------------ */
/* Card visuals: small product-style UI mocks floating over a photo    */
/* ------------------------------------------------------------------ */

const glass =
  "rounded-xl border border-white/10 bg-[#0b1219]/90 shadow-[0_12px_32px_-12px_rgba(0,0,0,0.9)]";

function Chip({
  icon,
  children,
  accent = false,
  className = "",
}: {
  icon: ReactNode;
  children: ReactNode;
  accent?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`flex w-max items-center gap-2 rounded-full border py-1.5 pl-1.5 pr-3 text-[11px] font-medium ${
        accent
          ? "border-accent/50 bg-accent/90 text-surface shadow-[0_8px_24px_-8px_var(--accent-glow)]"
          : "border-white/10 bg-[#0b1219]/90 text-ink"
      } ${className}`}
    >
      <span
        className={`flex h-5 w-5 items-center justify-center rounded-full ${
          accent ? "bg-surface/15" : "bg-white/10"
        }`}
      >
        {icon}
      </span>
      {children}
    </div>
  );
}

function AutomationVisual() {
  return (
    <div className="flex flex-col items-start gap-2.5 pl-[12%]">
      <Chip icon={<ShoppingCart className="h-3 w-3" />}>Cart abandoned</Chip>
      <span className="ml-4 h-4 w-px bg-gradient-to-b from-white/30 to-accent" />
      <Chip icon={<Mail className="h-3 w-3" />} className="ml-6">
        Reminder sent
      </Chip>
      <span className="ml-10 h-4 w-px bg-gradient-to-b from-white/30 to-accent" />
      <Chip
        icon={<Check className="h-3 w-3" strokeWidth={3} />}
        accent
        className="ml-12"
      >
        Order recovered
      </Chip>
    </div>
  );
}

function DesignVisual() {
  return (
    <div className="relative mx-auto w-[82%]">
      <div className={`${glass} p-3`}>
        <div className="flex gap-1">
          <span className="h-1.5 w-1.5 rounded-full bg-white/25" />
          <span className="h-1.5 w-1.5 rounded-full bg-white/25" />
          <span className="h-1.5 w-1.5 rounded-full bg-white/25" />
        </div>
        <div className="relative mt-3 rounded-md border border-dashed border-accent px-2 py-1.5">
          <p className="text-[13px] font-medium leading-tight text-ink">
            Book in two clicks
          </p>
          {[
            "-left-1 -top-1",
            "-right-1 -top-1",
            "-bottom-1 -left-1",
            "-bottom-1 -right-1",
          ].map((pos) => (
            <span
              key={pos}
              className={`absolute ${pos} h-2 w-2 rounded-[2px] border border-accent bg-surface`}
            />
          ))}
        </div>
        <div className="mt-2 h-1.5 w-3/4 rounded-full bg-white/15" />
        <div className="mt-1.5 h-1.5 w-1/2 rounded-full bg-white/10" />
      </div>
      <div
        className={`${glass} absolute -right-3 -top-7 flex items-center gap-1.5 px-2 py-1.5`}
      >
        <span className="font-serif text-sm text-ink">Aa</span>
        {["#e8eef4", "#2bb3a3", "#14352f", "#0b1118"].map((c) => (
          <span
            key={c}
            className="h-4 w-2.5 rounded-sm"
            style={{ background: c }}
          />
        ))}
      </div>
      <span className="absolute -bottom-5 left-2 rounded-full bg-accent px-4 py-1.5 text-[11px] font-medium text-surface shadow-[0_8px_24px_-8px_var(--accent-glow)]">
        Get started
      </span>
      <MousePointer2 className="absolute -bottom-7 left-[5.5rem] h-4 w-4 fill-white text-white" />
    </div>
  );
}

function ConnectVisual() {
  const apps = ["shopify", "slack", "googlesheets", "hubspot"];
  const spots = [
    "left-[8%] top-[6%]",
    "right-[8%] top-[6%]",
    "left-[8%] bottom-[6%]",
    "right-[8%] bottom-[6%]",
  ];
  return (
    <div className="relative mx-auto aspect-[5/4] w-[78%]">
      <svg
        viewBox="0 0 100 80"
        className="absolute inset-0 h-full w-full"
        aria-hidden
      >
        {[
          [20, 16],
          [80, 16],
          [20, 64],
          [80, 64],
        ].map(([x, y]) => (
          <line
            key={`${x}-${y}`}
            x1={50}
            y1={40}
            x2={x}
            y2={y}
            stroke="rgba(43,179,163,0.7)"
            strokeWidth={0.8}
            strokeDasharray="2 2"
          />
        ))}
      </svg>
      {apps.map((a, i) => (
        <span
          key={a}
          className={`absolute ${spots[i]} flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-[#0b1219]/90`}
        >
          <Image
            src={`/tech/${a}.svg`}
            alt=""
            width={18}
            height={18}
            className="h-[18px] w-[18px] brightness-0 invert"
            unoptimized
          />
        </span>
      ))}
      <span className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-accent/60 bg-accent-soft shadow-[0_0_30px_-4px_var(--accent-glow)]">
        <Image src="/logo.svg" alt="" width={22} height={22} unoptimized />
      </span>
    </div>
  );
}

function PresenceVisual() {
  return (
    <div className="mx-auto flex w-[86%] flex-col gap-2.5">
      <div
        className={`${glass} flex items-center gap-2 rounded-full px-3 py-2`}
      >
        <Search className="h-3.5 w-3.5 text-slate" />
        <span className="text-[12px] text-ink">
          yourbrand<span className="animate-pulse text-accent">|</span>
        </span>
        <span className="ml-auto rounded-full bg-white/10 px-2 py-0.5 text-[10px] text-ink-soft">
          .com
        </span>
      </div>
      <div className={`${glass} p-3`}>
        <div className="flex items-center justify-between">
          <span className="text-[10px] text-slate">yourbrand.com</span>
          <span className="rounded-full bg-accent/20 px-1.5 py-0.5 font-mono text-[9px] text-accent">
            #1
          </span>
        </div>
        <p className="mt-1 text-[12px] font-medium text-accent">
          Your brand — exactly what they searched for
        </p>
        <div className="mt-1.5 h-1.5 w-4/5 rounded-full bg-white/10" />
      </div>
      <Chip
        icon={<TrendingUp className="h-3 w-3" />}
        accent
        className="self-end"
      >
        Visitors up
      </Chip>
    </div>
  );
}

function SalesVisual() {
  return (
    <div className="mx-auto flex w-[86%] flex-col gap-2">
      {[
        {
          icon: <CreditCard className="h-3.5 w-3.5" />,
          title: "Checkout recovered",
          sub: "Reminder → paid",
        },
        {
          icon: <Bell className="h-3.5 w-3.5" />,
          title: "Repeat order",
          sub: "Win-back email",
        },
      ].map((n, i) => (
        <div
          key={n.title}
          className={`${glass} flex items-center gap-2.5 p-2.5 ${i === 1 ? "ml-4 opacity-80" : ""}`}
        >
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-accent text-surface">
            {n.icon}
          </span>
          <div className="min-w-0">
            <p className="text-[12px] font-medium leading-tight text-ink">
              {n.title}
            </p>
            <p className="text-[10px] text-slate">{n.sub}</p>
          </div>
          <span className="ml-auto font-mono text-[9px] text-slate-muted">
            now
          </span>
        </div>
      ))}
      <svg viewBox="0 0 120 36" className="mt-1 h-9 w-full" aria-hidden>
        <path
          d="M2 32 L22 28 L38 30 L56 20 L72 22 L90 10 L118 4"
          fill="none"
          stroke="#2bb3a3"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx={118} cy={4} r={3} fill="#3fc4b4" />
      </svg>
    </div>
  );
}

function CustomVisual() {
  const rows = [
    { w: "w-16", status: "Done", tone: "bg-accent/20 text-accent" },
    {
      w: "w-12",
      status: "In progress",
      tone: "bg-amber-400/15 text-amber-300",
    },
    { w: "w-14", status: "Done", tone: "bg-accent/20 text-accent" },
  ];
  return (
    <div className={`${glass} mx-auto flex w-[86%] overflow-hidden p-0`}>
      <div className="flex w-9 flex-col items-center gap-2 border-r border-white/10 py-3">
        <Image src="/logo.svg" alt="" width={14} height={14} unoptimized />
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className={`h-1.5 w-4 rounded-full ${i === 0 ? "bg-accent" : "bg-white/15"}`}
          />
        ))}
      </div>
      <div className="flex-1 p-3">
        <p className="text-[11px] font-medium text-ink">Jobs</p>
        <div className="mt-2 space-y-1.5">
          {rows.map((r, i) => (
            <div
              key={i}
              className="flex items-center justify-between rounded-md bg-white/[0.04] px-2 py-1.5"
            >
              <span className={`h-1.5 ${r.w} rounded-full bg-white/25`} />
              <span
                className={`rounded-full px-1.5 py-0.5 text-[9px] font-medium ${r.tone}`}
              >
                {r.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Data                                                                */
/* ------------------------------------------------------------------ */

type Service = {
  id: string;
  title: string;
  description: string;
  cta: string;
  href: string;
  image: string;
  visual: ReactNode;
  /** Pinned-layout placement: x = 0..1 across the centred column, start/length of travel in section progress, tilt */
  pos: { x: number; start: number; length: number; tilt: number };
};

const services: Service[] = [
  {
    id: "automate",
    title: "Workflow automation",
    description: "Cart recovery, fulfilment updates, restock alerts and admin.",
    cta: "See workflows",
    href: "#workflows",
    image: "/work/automation.jpg",
    visual: <AutomationVisual />,
    pos: { x: 0.3, start: 0.0, length: 0.52, tilt: -2 },
  },
  {
    id: "experience",
    title: "UI / UX",
    description: "Clearer screens that build trust and reduce drop-off.",
    cta: "Discuss UI",
    href: "#faq",
    image: "/work/design.jpg",
    visual: <DesignVisual />,
    pos: { x: 0.92, start: 0.06, length: 0.48, tilt: 2 },
  },
  {
    id: "connect",
    title: "Manage your tech",
    description:
      "Link apps you pay for—or build a small piece when nothing fits.",
    cta: "See tools",
    href: "#technology",
    image: "/work/laptop.jpg",
    visual: <ConnectVisual />,
    pos: { x: 0.02, start: 0.15, length: 0.56, tilt: 1.5 },
  },
  {
    id: "presence",
    title: "Grow online presence",
    description: "A stronger digital presence that brings customers in.",
    cta: "Grow online",
    href: "#faq",
    image: "/work/mobile.jpg",
    visual: <PresenceVisual />,
    pos: { x: 0.62, start: 0.23, length: 0.5, tilt: -1.5 },
  },
  {
    id: "convert",
    title: "Improve sales",
    description:
      "From browse to purchase—and back again without manual chasing.",
    cta: "Book a call",
    href: "#faq",
    image: "/work/checkout.jpg",
    visual: <SalesVisual />,
    pos: { x: 1, start: 0.33, length: 0.54, tilt: 2 },
  },
  {
    id: "custom",
    title: "Build custom tools",
    description: "Focused custom tools when off-the-shelf forces workarounds.",
    cta: "Custom build",
    href: "#faq",
    image: "/work/dashboard.jpg",
    visual: <CustomVisual />,
    pos: { x: 0.18, start: 0.42, length: 0.52, tilt: -2 },
  },
];

const EYEBROW = "What we build";
const HEADING =
  "Built for teams that have outgrown spreadsheets and inbox chasing.";

/** Image-led card: title + one line on top, a UI mock over a photo, arrow link. */
function ServiceCard({
  s,
  className = "",
}: {
  s: Service;
  className?: string;
}) {
  return (
    <a
      href={s.href}
      aria-label={`${s.title}: ${s.cta}`}
      className={`group relative flex aspect-[3/4] w-full flex-col overflow-hidden rounded-2xl border border-hairline bg-surface-elevated shadow-[0_28px_55px_-16px_rgba(0,0,0,0.85)] transition-[border-color,box-shadow,transform] duration-300 hover:border-accent/40 hover:shadow-[0_0_0_1px_rgba(43,179,163,0.15),0_30px_80px_-30px_rgba(43,179,163,0.45)] sm:rounded-3xl sm:shadow-[0_24px_60px_-30px_rgba(0,0,0,0.9)] ${className}`}
    >
      <Image
        src={s.image}
        alt=""
        fill
        sizes="(min-width: 1024px) 280px, (min-width: 640px) 45vw, 68vw"
        className="object-cover opacity-45 saturate-[0.65] transition duration-700 group-hover:scale-105 group-hover:opacity-55"
        unoptimized
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-[#070d13]/95 via-[#070d13]/40 to-[#070d13]/70"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(80%_60%_at_50%_70%,rgba(43,179,163,0.18),transparent_70%)]"
      />

      <div className="relative p-3.5 sm:p-6">
        <h3 className="text-[15px] font-medium leading-snug text-white sm:text-xl">
          {s.title}
        </h3>
        <p className="mt-1 line-clamp-2 text-[12px] leading-relaxed text-ink-soft sm:mt-1.5 sm:line-clamp-none sm:text-sm">
          {s.description}
        </p>
      </div>

      <div className="relative flex flex-1 scale-[0.92] items-center pb-10 transition-transform duration-500 group-hover:-translate-y-1 sm:scale-100 sm:pb-12">
        <div className="w-full">{s.visual}</div>
      </div>

      <span className="absolute bottom-3 right-3 flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-black/50 text-white transition-colors duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-surface sm:bottom-4 sm:right-4 sm:h-9 sm:w-9">
        <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" aria-hidden />
      </span>
    </a>
  );
}

/**
 * Pinned timeline (0..1 of section scroll):
 * headline scrubs in alone → cards float through while the headline recedes
 * (fade + blur) → cards gone, headline returns into focus.
 * Card `pos.start/length` are relative to the card phase and remapped here.
 */
const HEADLINE_END = 0.16;
const CARDS_FROM = 0.2;
const CARDS_SPAN = 0.66;
const RECEDE = [0.18, 0.28] as const;
const RETURN = [0.86, 0.95] as const;

function FloatingCard({
  s,
  progress,
}: {
  s: Service;
  progress: MotionValue<number>;
}) {
  const { tilt, x } = s.pos;
  const start = CARDS_FROM + s.pos.start * CARDS_SPAN;
  const length = s.pos.length * CARDS_SPAN;
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
      className="absolute top-0 w-(--card-w) will-change-transform"
      style={{ left: `calc((100% - var(--card-w)) * ${x})`, y, rotate, scale }}
    >
      <ServiceCard s={s} />
    </motion.div>
  );
}

function PinnedServices() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  // Lenis already smooths scrolling, so drive everything from raw progress
  // (an extra spring here makes the cards lag behind the wheel).
  const progress = scrollYProgress;
  const keys = [RECEDE[0], RECEDE[1], RETURN[0], RETURN[1]];
  const headingScale = useTransform(progress, keys, [1, 0.94, 0.94, 1]);
  // Crossfade a sharp headline with a pre-blurred copy instead of animating
  // `filter: blur()` every frame (static blur is rasterised once).
  const sharpOpacity = useTransform(progress, keys, [1, 0, 0, 1]);
  const blurredOpacity = useTransform(progress, keys, [0, 1, 1, 0]);

  return (
    <div ref={ref} className="relative h-[440vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <GlowOrb
            className="-left-48 top-1/4"
            size={620}
            opacity={0.22}
            parallax={0}
          />
          <GlowOrb
            className="-right-40 bottom-0"
            size={520}
            opacity={0.16}
            parallax={0}
            duration={22}
          />
        </div>

        <motion.div
          className="relative z-0 h-full will-change-transform"
          style={{ scale: headingScale }}
        >
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
            style={{ opacity: sharpOpacity }}
          >
            <p className="eyebrow eyebrow-pill">{EYEBROW}</p>
            <h2 className="mt-8 max-w-5xl font-display text-5xl leading-[1.05] text-ink xl:text-[4.25rem]">
              <TextScrub
                text={HEADING}
                progress={progress}
                range={[0, HEADLINE_END]}
              />
            </h2>
          </motion.div>
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-6 text-center will-change-[opacity]"
            style={{ opacity: blurredOpacity }}
          >
            <div className="opacity-[0.15] blur-[10px]">
              <p className="eyebrow eyebrow-pill">{EYEBROW}</p>
              <p className="mt-8 max-w-5xl font-display text-5xl leading-[1.05] text-ink xl:text-[4.25rem]">
                {HEADING}
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* Cards float within a centred column, not the full viewport width */}
        <div className="absolute inset-y-0 left-1/2 z-10 w-full max-w-5xl -translate-x-1/2 px-8 [--card-w:16rem] xl:[--card-w:17rem]">
          <div className="relative h-full">
            {services.map((s) => (
              <FloatingCard key={s.id} s={s} progress={progress} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function StackedServices({ className = "" }: { className?: string }) {
  return (
    <div
      className={`relative mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24 ${className}`}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <GlowOrb
          className="-left-40 top-0"
          size={420}
          opacity={0.18}
          parallax={0}
        />
      </div>
      <div className="relative text-center">
        <p className="eyebrow eyebrow-pill">{EYEBROW}</p>
        <h2 className="mx-auto mt-6 max-w-3xl font-display text-[2rem] leading-[1.08] text-ink sm:text-5xl">
          <SplitText text={HEADING} />
        </h2>
      </div>
      {/*
        Mobile: smaller floating cards in a zig-zag (tilt + offset + overlap).
        sm+: normal flat grid.
      */}
      <Stagger className="relative mt-10 flex flex-col gap-0 sm:mt-12 sm:grid sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
        {services.map((s, i) => {
          const float =
            i === 0
              ? "self-center rotate-[2deg] z-[1]"
              : i % 2 === 1
                ? "self-start -ml-1 -rotate-[3deg] z-[2]"
                : "self-end -mr-1 rotate-[2.5deg] z-[3]";

          return (
            <StaggerItem
              key={s.id}
              className={`mb-[-1.25rem] w-[68%] max-w-[15.5rem] drop-shadow-[0_24px_40px_rgba(0,0,0,0.45)] last:mb-0 sm:mb-0 sm:ml-0 sm:mr-0 sm:w-auto sm:max-w-none sm:rotate-0 sm:self-auto sm:drop-shadow-none sm:z-auto ${float}`}
            >
              <ServiceCard s={s} />
            </StaggerItem>
          );
        })}
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
