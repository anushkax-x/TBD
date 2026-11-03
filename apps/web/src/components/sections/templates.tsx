"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  Monitor,
  Smartphone,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { SplitText } from "@/components/motion/split-text";
import { EASE_OUT } from "@/components/motion/easing";
import { useContact } from "@/components/contact/contact-provider";
import { useAnalytics } from "@/lib/analytics";

type Template = {
  id: string;
  name: string;
  industry: string;
  tagline: string;
  url: string;
  image: string;
  highlights: string[];
};

/** Concept sites we designed — live on Netlify, screenshots in /public/templates. */
const templates: Template[] = [
  {
    id: "lazy-susan",
    name: "Lazy Susan",
    industry: "Restaurant",
    tagline: "A menu you spin like the table itself.",
    url: "https://restaurant-template0.netlify.app",
    image: "/templates/lazy-susan.jpg",
    highlights: [
      "Scroll-to-turn menu that brings each dish forward",
      "Add-to-table order cart with a running total",
      "Reservations with party size, orders fire on arrival",
      "“Anatomy of a plate” story for the signature dish",
    ],
  },
  {
    id: "practice",
    name: "Your Practice",
    industry: "Psychology clinic",
    tagline: "Calm, clear and two minutes to book.",
    url: "https://med-site-proposal.netlify.app",
    image: "/templates/practice.jpg",
    highlights: [
      "“Start here” picker that routes visitors to the right first step",
      "Online booking for in-person or telehealth sessions",
      "Transparent fees, rebates and funding explained",
      "Crisis lines always one glance away",
    ],
  },
  {
    id: "teka",
    name: "Teka",
    industry: "Café & tea room",
    tagline: "Slow sips, told one scroll at a time.",
    url: "https://teka-matcha.netlify.app",
    image: "/templates/teka.jpg",
    highlights: [
      "Animated “ritual” that builds the signature drink as you scroll",
      "Swipeable house favourites with prices",
      "Workshop and wholesale enquiries straight to WhatsApp",
      "Menu, hours and directions without hunting",
    ],
  },
  {
    id: "blooming-cactus",
    name: "The Blooming Cactus",
    industry: "Fashion store",
    tagline: "An editorial storefront for slow fashion.",
    url: "https://thebloomingcatus-demo.netlify.app",
    image: "/templates/blooming-cactus.jpg",
    highlights: [
      "Shop by collection and by mood",
      "Festive edit with sale pricing up front",
      "New-arrivals carousel and quick product rows",
      "Newsletter club with a first-order discount",
    ],
  },
];

function hostOf(url: string) {
  return url.replace(/^https?:\/\//, "");
}

function TemplateTile({
  t,
  onOpen,
}: {
  t: Template;
  onOpen: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="group block w-full text-left"
      aria-label={`Take the tour of ${t.name}, a ${t.industry.toLowerCase()} concept site`}
    >
      <div className="overflow-hidden rounded-2xl border border-hairline bg-surface-elevated shadow-[0_30px_60px_-40px_rgba(18,49,47,0.55)] transition-[transform,box-shadow] duration-500 group-hover:-translate-y-1 group-hover:shadow-[0_40px_80px_-40px_rgba(18,49,47,0.7)]">
        <div className="flex items-center gap-2 border-b border-hairline px-3 py-2">
          <span className="flex gap-1">
            {[0, 1, 2].map((i) => (
              <span key={i} className="h-2 w-2 rounded-full bg-ink/15" />
            ))}
          </span>
          <span className="mx-auto truncate rounded-md bg-surface px-3 py-0.5 font-mono text-[10px] text-slate">
            {hostOf(t.url)}
          </span>
          <span className="w-7" />
        </div>
        <div className="relative aspect-[16/11] overflow-hidden bg-surface">
          {/* Hover slowly scrolls the captured page top → bottom */}
          <Image
            src={t.image}
            alt={`${t.name} homepage`}
            fill
            sizes="(min-width: 1024px) 560px, 100vw"
            className="object-cover object-top transition-[object-position] duration-700 ease-out group-hover:object-bottom group-hover:duration-[9000ms] group-hover:ease-linear"
            unoptimized
          />
          <span className="absolute bottom-3 right-3 inline-flex translate-y-2 items-center gap-1.5 rounded-full bg-[#12312f] px-3.5 py-2 text-xs font-medium text-[#fbf6ec] opacity-0 shadow-lg transition duration-300 [@media(hover:none)]:translate-y-0 [@media(hover:none)]:opacity-100 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
            Take the tour
            <ArrowUpRight className="h-3.5 w-3.5" />
          </span>
        </div>
      </div>
      <div className="mt-4 flex items-start justify-between gap-4 px-1">
        <div>
          <h3 className="font-display text-[1.7rem] leading-tight text-ink">
            {t.name}
          </h3>
          <p className="mt-1 text-sm text-slate">{t.tagline}</p>
        </div>
        <div className="flex shrink-0 flex-col items-end gap-1.5 pt-1.5">
          <span className="rounded-full border border-hairline px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-ink-soft">
            {t.industry}
          </span>
          <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-slate-muted">
            Concept demo
          </span>
        </div>
      </div>
    </button>
  );
}

type Device = "desktop" | "mobile";

function TemplateTour({
  index,
  onIndex,
  onClose,
}: {
  index: number;
  onIndex: (i: number) => void;
  onClose: () => void;
}) {
  const t = templates[index];
  const [device, setDevice] = useState<Device>("desktop");
  const [loaded, setLoaded] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const { handlePrimaryCta } = useContact();
  const { track } = useAnalytics();

  const step = useCallback(
    (dir: 1 | -1) =>
      onIndex((index + dir + templates.length) % templates.length),
    [index, onIndex],
  );

  useEffect(() => {
    setLoaded(false);
  }, [t.id]);

  useEffect(() => {
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [onClose]);

  const getSite = () => {
    track("template_cta_clicked", { template: t.id });
    onClose();
    handlePrimaryCta(`template_${t.id}`);
  };

  const iconBtn =
    "inline-flex h-9 w-9 items-center justify-center rounded-full border border-hairline text-ink-soft transition-colors hover:border-accent/50 hover:text-ink";

  return (
    <motion.div
      className="theme-night fixed inset-0 z-[100] flex flex-col bg-surface"
      role="dialog"
      aria-modal="true"
      aria-labelledby="template-tour-title"
      data-lenis-prevent
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: EASE_OUT }}
    >
      {/* Top bar */}
      <div className="flex items-center gap-3 border-b border-hairline px-4 py-3 sm:px-6">
        <div className="min-w-0 flex-1">
          <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-accent">
            {t.industry}
            <span className="hidden sm:inline"> · Concept demo</span>
          </p>
          <h2
            id="template-tour-title"
            className="truncate font-display text-2xl leading-tight text-ink"
          >
            {t.name}
          </h2>
        </div>

        <div
          className="hidden rounded-full border border-hairline p-1 lg:flex"
          role="group"
          aria-label="Preview size"
        >
          {(
            [
              ["desktop", Monitor, "Desktop"],
              ["mobile", Smartphone, "Mobile"],
            ] as const
          ).map(([d, Icon, label]) => (
            <button
              key={d}
              type="button"
              onClick={() => setDevice(d)}
              aria-pressed={device === d}
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                device === d
                  ? "bg-accent text-surface"
                  : "text-slate hover:text-ink"
              }`}
            >
              <Icon className="h-3.5 w-3.5" />
              {label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => step(-1)}
            className={iconBtn}
            aria-label="Previous template"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => step(1)}
            className={iconBtn}
            aria-label="Next template"
          >
            <ArrowRight className="h-4 w-4" />
          </button>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className={`${iconBtn} ml-1`}
            aria-label="Close tour"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="flex min-h-0 flex-1 flex-col lg:grid lg:grid-cols-[minmax(0,1fr)_340px]">
        {/* Stage */}
        <div className="relative flex min-h-0 flex-1 items-center justify-center bg-[#071715] lg:p-6">
          <div
            className={`relative h-full overflow-hidden bg-white transition-[width,border-radius] duration-500 ${
              device === "mobile"
                ? "lg:max-h-[844px] lg:w-[390px] lg:rounded-[2.25rem] lg:border-[10px] lg:border-[#1d3a37]"
                : "lg:rounded-xl lg:border lg:border-hairline"
            } w-full`}
          >
            {!loaded && (
              <Image
                src={t.image}
                alt=""
                fill
                sizes="100vw"
                className="object-cover object-top"
                unoptimized
              />
            )}
            <iframe
              key={t.id}
              src={t.url}
              title={`${t.name} live demo`}
              onLoad={() => setLoaded(true)}
              className={`absolute inset-0 h-full w-full transition-opacity duration-500 ${
                loaded ? "opacity-100" : "opacity-0"
              }`}
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
            />
            {!loaded && (
              <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#12312f]/90 px-4 py-2 text-xs font-medium text-[#fbf6ec] backdrop-blur">
                Loading live site…
              </span>
            )}
          </div>
        </div>

        {/* Details */}
        <aside className="border-t border-hairline p-4 sm:px-6 lg:overflow-y-auto lg:border-l lg:border-t-0 lg:p-7">
          <p className="hidden font-display text-[1.75rem] leading-tight text-ink lg:block">
            {t.tagline}
          </p>
          <ul className="mt-6 hidden space-y-3.5 lg:block">
            {t.highlights.map((h) => (
              <li key={h} className="flex gap-3 text-sm leading-relaxed text-ink-soft">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden />
                {h}
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-3 lg:mt-8 lg:flex-col lg:items-stretch">
            <Button arrow className="flex-1 lg:flex-none" onClick={getSite}>
              Get a site like this
            </Button>
            <a
              href={t.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 rounded-full px-3 py-3 text-sm font-medium text-ink-soft transition-colors hover:text-accent"
            >
              Open in new tab
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
          <p className="mt-6 hidden text-xs leading-relaxed text-slate-muted lg:block">
            Concept site designed by FlowMint. Names, dishes, products and
            reviews are illustrative — yours would use your real content.
          </p>
        </aside>
      </div>
    </motion.div>
  );
}

export function TemplatesSection() {
  const [open, setOpen] = useState<number | null>(null);
  const { track } = useAnalytics();

  const show = useCallback(
    (i: number) => {
      track("template_previewed", { template: templates[i].id });
      setOpen(i);
    },
    [track],
  );
  const close = useCallback(() => setOpen(null), []);

  return (
    <section
      id="templates"
      className="theme-sand scroll-mt-24"
      aria-labelledby="templates-heading"
    >
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-28">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Reveal>
              <p className="eyebrow">See it live</p>
            </Reveal>
            <h2
              id="templates-heading"
              className="mt-5 max-w-3xl font-display text-[2.6rem] leading-[1] text-ink sm:text-6xl lg:text-7xl"
            >
              <SplitText
                text="Websites that feel like yours."
                highlight={["yours"]}
              />
            </h2>
          </div>
          <Reveal delayMs={120}>
            <p className="max-w-sm text-base leading-relaxed text-slate lg:text-right">
              Live concept sites for a restaurant, a clinic, a café and a
              fashion store. Open any one to take the tour.
            </p>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-x-8 gap-y-12 sm:mt-16 md:grid-cols-2 lg:gap-x-10 lg:gap-y-16">
          {templates.map((t, i) => (
            <Reveal key={t.id} delayMs={(i % 2) * 120}>
              <TemplateTile t={t} onOpen={() => show(i)} />
            </Reveal>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {open !== null && (
          <TemplateTour key="tour" index={open} onIndex={show} onClose={close} />
        )}
      </AnimatePresence>
    </section>
  );
}
