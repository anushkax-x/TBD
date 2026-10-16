"use client";

import { useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Variants,
} from "motion/react";
import { Reveal } from "@/components/ui/reveal";
import { LightWave } from "@/components/motion/light-wave";
import { GlowOrb } from "@/components/motion/glow-orb";
import { EASE_OUT } from "@/components/motion/easing";

const workflows = [
  {
    id: "shopify",
    label: "Shopify store",
    title: "Abandoned cart recovery",
    summary:
      "Turn unfinished checkouts into orders — without chasing them by hand.",
    steps: [
      "Cart abandoned",
      "Wait window",
      "Reminder email / SMS",
      "Discount if needed",
      "Customer returns",
      "Order completed",
      "Team notified",
    ],
  },
  {
    id: "orders",
    label: "DTC brand",
    title: "Order → fulfilment",
    summary:
      "From payment to shipment updates without copy-pasting between tools.",
    steps: [
      "Order placed",
      "Payment confirmed",
      "Inventory updated",
      "Fulfilment ticket",
      "Shipping label",
      "Tracking email",
      "Review request",
    ],
  },
  {
    id: "leads",
    label: "sales team",
    title: "Lead capture → follow-up",
    summary:
      "Website enquiries land in the right place and get a reply before they go cold.",
    steps: [
      "Form submitted",
      "Lead scored",
      "CRM created",
      "Owner assigned",
      "Welcome email",
      "Follow-up task",
      "Deal updated",
    ],
  },
  {
    id: "onboarding",
    label: "service business",
    title: "Client onboarding",
    summary:
      "Payment to kickoff without chasing docs, accounts, or internal handoffs.",
    steps: [
      "Payment received",
      "Account created",
      "Docs requested",
      "Intake complete",
      "Project created",
      "Team assigned",
      "Kickoff sent",
    ],
  },
  {
    id: "support",
    label: "support desk",
    title: "Support & returns",
    summary:
      "Handle “Where’s my order?” and returns without burying your inbox.",
    steps: [
      "Customer message",
      "Order looked up",
      "AI drafts reply",
      "Tracking / return link",
      "Ticket updated",
      "Refund if needed",
      "CRM note saved",
    ],
  },
  {
    id: "experience",
    label: "product team",
    title: "UI & UX redesign",
    summary:
      "From confusing screens to a clear journey that converts and feels on-brand.",
    steps: [
      "Audit current UI",
      "Map user journeys",
      "Simplify layout",
      "Refine visual system",
      "Build responsive UI",
      "Validate with users",
      "Ship & iterate",
    ],
  },
  {
    id: "custom",
    label: "ops team",
    title: "Custom internal tool",
    summary:
      "Replace spreadsheet workarounds with a focused app built around your process.",
    steps: [
      "Map the process",
      "Define the core job",
      "Design the workflow",
      "Build the first version",
      "Connect existing tools",
      "Train the team",
      "Iterate from feedback",
    ],
  },
  {
    id: "presence",
    label: "growing brand",
    title: "Online presence",
    summary:
      "A clearer site and funnel so the right visitors find you and take the next step.",
    steps: [
      "Clarify the offer",
      "Structure the site",
      "Design key pages",
      "Improve conversion paths",
      "Make it search-ready",
      "Launch",
      "Measure & refine",
    ],
  },
];

const ROTATE_MS = 5500;

const stepList: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
};

const stepItem: Variants = {
  hidden: { opacity: 0, y: 16, filter: "blur(4px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: EASE_OUT },
  },
};

const connector: Variants = {
  hidden: { scaleX: 0 },
  show: {
    scaleX: 1,
    transition: { duration: 0.5, ease: EASE_OUT, delay: 0.1 },
  },
};

export function WorkflowsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (paused || reduceMotion) return;
    const id = window.setInterval(() => {
      setActiveIndex((i) => (i + 1) % workflows.length);
    }, ROTATE_MS);
    return () => window.clearInterval(id);
  }, [paused, reduceMotion]);

  const current = workflows[activeIndex];

  return (
    <section
      id="workflows"
      className="relative overflow-hidden border-y border-hairline bg-surface-elevated/40"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <GlowOrb className="-right-48 top-10" size={560} opacity={0.16} />
      </div>
      <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-28">
        <Reveal>
          <h2 className="font-display text-[2rem] leading-[1.08] text-ink sm:text-5xl">
            What a{" "}
            <span
              className="relative inline-grid align-bottom text-accent"
              aria-live="polite"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={current.id}
                  className="inline-block"
                  initial={{ opacity: 0, y: "40%", filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: "0%", filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: "-40%", filter: "blur(8px)" }}
                  transition={{ duration: 0.45, ease: EASE_OUT }}
                >
                  {current.label}
                </motion.span>
              </AnimatePresence>
            </span>{" "}
            can improve
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate">
            From operations and UI to custom tools and online presence—these are
            the paths owners ask us to fix first. Pick one or watch them rotate.
          </p>
        </Reveal>

        <Reveal delayMs={100}>
          <div
            className="-mx-4 mt-8 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:mx-0 sm:mt-10 sm:flex-wrap sm:overflow-visible sm:px-0 sm:pb-0 [&::-webkit-scrollbar]:hidden"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocusCapture={() => setPaused(true)}
            onBlurCapture={(e) => {
              if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
                setPaused(false);
              }
            }}
          >
            {workflows.map((w, i) => {
              const isActive = activeIndex === i;
              return (
                <button
                  key={w.id}
                  type="button"
                  onClick={() => {
                    setActiveIndex(i);
                    setPaused(true);
                  }}
                  className={`relative shrink-0 whitespace-nowrap rounded-full border px-3.5 py-1.5 text-[13px] transition-colors duration-300 sm:px-4 sm:py-2 sm:text-sm ${
                    isActive
                      ? "border-accent/50 text-surface"
                      : "border-hairline bg-white/[0.02] text-slate hover:border-border-strong hover:text-ink"
                  }`}
                  aria-pressed={isActive}
                >
                  {isActive && (
                    <motion.span
                      layoutId="wf-tab"
                      className="absolute inset-0 rounded-full bg-accent shadow-[0_8px_28px_-8px_var(--accent-glow)]"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 34,
                      }}
                    />
                  )}
                  <span className="relative z-10">{w.title}</span>
                </button>
              );
            })}
          </div>
        </Reveal>

        <div
          className="mt-6 sm:mt-10"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <LightWave className="rounded-3xl">
            <div className="card-glass overflow-hidden rounded-3xl p-5 sm:p-10">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={current.id}
                  initial="hidden"
                  animate="show"
                  exit={{ opacity: 0, y: -12, transition: { duration: 0.25 } }}
                >
                  <motion.div
                    className="mb-6 flex flex-col gap-3 sm:mb-10 sm:flex-row sm:items-start sm:justify-between"
                    variants={stepItem}
                  >
                    <div>
                      <p className="font-mono text-xs uppercase tracking-[0.16em] text-slate-muted">
                        Example · {current.label}
                      </p>
                      <h3 className="mt-2 text-xl font-medium text-ink sm:text-2xl">
                        {current.title}
                      </h3>
                      <p className="mt-2 max-w-xl text-sm text-slate sm:text-base">
                        {current.summary}
                      </p>
                    </div>
                    <span className="hidden shrink-0 rounded-full border border-hairline bg-white/[0.03] px-3 py-1 font-mono text-[11px] uppercase tracking-[0.14em] text-slate sm:inline">
                      Connected steps
                    </span>
                  </motion.div>

                  {/* Mobile: vertical timeline */}
                  <motion.ol
                    className="space-y-0 md:hidden"
                    variants={stepList}
                  >
                    {current.steps.map((step, i) => (
                      <motion.li
                        key={`${current.id}-${i}`}
                        className="flex gap-3"
                        variants={stepItem}
                      >
                        <div className="flex flex-col items-center">
                          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-accent/40 bg-accent-soft/50 font-mono text-[10px] font-medium text-accent">
                            {i + 1}
                          </span>
                          {i < current.steps.length - 1 && (
                            <span className="my-0.5 min-h-2 w-px flex-1 bg-gradient-to-b from-accent/50 to-border" />
                          )}
                        </div>
                        <p className="mb-2 flex-1 pt-0.5 text-sm font-medium text-ink">
                          {step}
                        </p>
                      </motion.li>
                    ))}
                  </motion.ol>

                  {/* Desktop: flowing chain with drawn connectors */}
                  <motion.ol
                    className="hidden flex-wrap items-center gap-y-5 md:flex"
                    variants={stepList}
                  >
                    {current.steps.map((step, i) => (
                      <motion.li
                        key={`${current.id}-d-${i}`}
                        className="flex items-center"
                        variants={stepItem}
                      >
                        <div className="inline-flex min-h-12 max-w-44 items-center gap-2.5 rounded-2xl border border-hairline bg-white/[0.03] px-4 py-3 text-sm font-medium leading-snug text-ink transition-colors duration-300 hover:border-accent/50 hover:bg-accent-soft/30">
                          <span className="font-mono text-[10px] text-accent">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          {step}
                        </div>
                        {i < current.steps.length - 1 && (
                          <motion.span
                            aria-hidden
                            className="mx-2 block h-px w-6 origin-left bg-gradient-to-r from-accent to-accent/20"
                            variants={connector}
                          />
                        )}
                      </motion.li>
                    ))}
                  </motion.ol>
                </motion.div>
              </AnimatePresence>

              {/* Progress dots for rotation */}
              <div
                className="mt-6 flex justify-center gap-1.5 sm:mt-10"
                role="tablist"
                aria-label="Workflow examples"
              >
                {workflows.map((w, i) => {
                  const isActive = activeIndex === i;
                  return (
                    <button
                      key={w.id}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      aria-label={w.label}
                      onClick={() => {
                        setActiveIndex(i);
                        setPaused(true);
                      }}
                      className={`relative h-1.5 overflow-hidden rounded-full transition-all duration-500 ${
                        isActive
                          ? "w-8 bg-accent/25"
                          : "w-1.5 bg-border-strong hover:bg-slate-muted"
                      }`}
                    >
                      {isActive &&
                        (paused || reduceMotion ? (
                          <span className="absolute inset-0 bg-accent" />
                        ) : (
                          <span
                            key={`wf-progress-${activeIndex}`}
                            className="pa-progress absolute inset-0 bg-accent"
                            style={{ animationDuration: `${ROTATE_MS}ms` }}
                          />
                        ))}
                    </button>
                  );
                })}
              </div>
            </div>
          </LightWave>
        </div>
      </div>
    </section>
  );
}
