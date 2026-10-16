"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
} from "motion/react";
import {
  Check,
  CreditCard,
  LifeBuoy,
  Package,
  ShoppingCart,
  UserPlus,
  type LucideIcon,
} from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { LightWave } from "@/components/motion/light-wave";
import { GlowOrb } from "@/components/motion/glow-orb";
import { EASE_OUT } from "@/components/motion/easing";

type Workflow = {
  id: string;
  /** Who it's for — rotates in the heading */
  label: string;
  title: string;
  icon: LucideIcon;
  summary: string;
  steps: string[];
  replaces: { text: string; tools: string[] };
  result: string;
};

const workflows: Workflow[] = [
  {
    id: "cart",
    label: "Shopify stores",
    title: "Abandoned cart recovery",
    icon: ShoppingCart,
    summary:
      "Turn unfinished checkouts into orders — without chasing them by hand.",
    steps: [
      "Cart abandoned",
      "Wait window",
      "Reminder email / SMS",
      "Customer returns",
      "Order completed",
    ],
    replaces: {
      text: "Chasing abandoned carts by hand",
      tools: ["shopify", "slack"],
    },
    result: "Recovers checkouts on autopilot",
  },
  {
    id: "orders",
    label: "DTC brands",
    title: "Order → fulfilment",
    icon: Package,
    summary:
      "From payment to shipment updates without copy-pasting between tools.",
    steps: [
      "Order placed",
      "Payment confirmed",
      "Inventory updated",
      "Shipping label created",
      "Tracking email sent",
    ],
    replaces: {
      text: "Copy-pasting orders into sheets and emails",
      tools: ["shopify", "stripe", "googlesheets"],
    },
    result: "Every order flows through untouched",
  },
  {
    id: "leads",
    label: "Sales teams",
    title: "Lead capture → follow-up",
    icon: UserPlus,
    summary:
      "Website enquiries land in the right place and get a reply before they go cold.",
    steps: [
      "Form submitted",
      "Lead scored",
      "Added to CRM",
      "Owner alerted",
      "Follow-up sent",
    ],
    replaces: {
      text: "Leads sitting unanswered in an inbox",
      tools: ["hubspot", "slack"],
    },
    result: "Replies go out before leads go cold",
  },
  {
    id: "onboarding",
    label: "Service businesses",
    title: "Client onboarding",
    icon: CreditCard,
    summary:
      "Payment to kickoff without chasing docs, accounts, or internal handoffs.",
    steps: [
      "Payment received",
      "Account created",
      "Docs requested",
      "Project created",
      "Kickoff sent",
    ],
    replaces: {
      text: "Chasing documents and setting up accounts manually",
      tools: ["stripe", "notion", "slack"],
    },
    result: "Payment to kickoff, no chasing",
  },
  {
    id: "support",
    label: "Support teams",
    title: "Support & returns",
    icon: LifeBuoy,
    summary:
      "Handle “Where’s my order?” and returns without burying your inbox.",
    steps: [
      "Customer message",
      "Order looked up",
      "AI drafts a reply",
      "Tracking / return link sent",
      "Ticket closed",
    ],
    replaces: {
      text: "Answering “where’s my order?” all day",
      tools: ["shopify", "openai"],
    },
    result: "Routine tickets resolve themselves",
  },
];

const STEP_MS = 850;
const HOLD_MS = 2200;

function ToolLogo({ name }: { name: string }) {
  return (
    <span className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03]">
      <Image
        src={`/tech/${name}.svg`}
        alt=""
        width={14}
        height={14}
        className="h-3.5 w-3.5 opacity-70 brightness-0 invert"
        unoptimized
      />
    </span>
  );
}

export function WorkflowsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { amount: 0.3 });
  const reduce = !!useReducedMotion();
  const [active, setActive] = useState(0);
  const [done, setDone] = useState(0);
  const [run, setRun] = useState(0);
  const [userPicked, setUserPicked] = useState(false);

  const current = workflows[active];
  const total = current.steps.length;
  const showAll = reduce;
  const doneCount = showAll ? total : done;

  // Play the current workflow step by step; then hold and (unless the visitor
  // has picked one themselves) move on to the next.
  useEffect(() => {
    if (reduce || !inView) return;
    setDone(0);
    const timers = current.steps.map((_, i) =>
      window.setTimeout(() => setDone(i + 1), (i + 1) * STEP_MS),
    );
    if (!userPicked) {
      timers.push(
        window.setTimeout(
          () => setActive((a) => (a + 1) % workflows.length),
          total * STEP_MS + HOLD_MS,
        ),
      );
    }
    return () => timers.forEach((t) => window.clearTimeout(t));
  }, [active, run, inView, reduce, userPicked, current.steps, total]);

  const pick = (i: number) => {
    setUserPicked(true);
    setActive(i);
    setRun((r) => r + 1);
  };

  const Icon = current.icon;

  return (
    <section
      ref={sectionRef}
      id="workflows"
      className="relative overflow-hidden border-y border-hairline bg-surface-elevated/40"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <GlowOrb className="-right-48 top-10" size={560} opacity={0.16} />
      </div>
      <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-28">
        <Reveal>
          <h2 className="font-display text-[2rem] leading-[1.08] text-ink sm:text-5xl">
            Workflows we automate for{" "}
            <span
              className="relative inline-grid align-bottom text-accent"
              aria-live="polite"
            >
              <AnimatePresence initial={false}>
                <motion.span
                  key={current.id}
                  className="inline-block whitespace-nowrap [grid-area:1/1]"
                  initial={{ opacity: 0, y: "40%", filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: "0%", filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: "-40%", filter: "blur(8px)" }}
                  transition={{ duration: 0.45, ease: EASE_OUT }}
                >
                  {current.label}
                </motion.span>
              </AnimatePresence>
            </span>
          </h2>
        </Reveal>

        <div className="mt-8 grid grid-cols-[minmax(0,1fr)] gap-6 sm:mt-12 lg:grid-cols-[minmax(0,300px)_minmax(0,1fr)] lg:gap-10">
          {/* Tabs: swipeable row on phones/tablets, vertical list on laptop */}
          <Reveal delayMs={100}>
            <div
              role="tablist"
              aria-label="Workflow examples"
              className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:mx-0 sm:px-0 lg:flex-col lg:overflow-visible lg:pb-0 [&::-webkit-scrollbar]:hidden"
            >
              {workflows.map((w, i) => {
                const isActive = i === active;
                const TabIcon = w.icon;
                return (
                  <button
                    key={w.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => pick(i)}
                    className={`relative flex shrink-0 items-center gap-3 overflow-hidden rounded-full border px-3.5 py-2 text-left transition-colors duration-300 lg:rounded-2xl lg:px-4 lg:py-3.5 ${
                      isActive
                        ? "border-accent/40"
                        : "border-hairline hover:border-border-strong"
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="wf-tab-bg"
                        className="absolute inset-0 -z-0 bg-accent-soft/50"
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 34,
                        }}
                      />
                    )}
                    <span
                      className={`relative hidden h-9 w-9 shrink-0 items-center justify-center rounded-xl border transition-colors lg:flex ${
                        isActive
                          ? "border-accent/50 bg-accent text-surface"
                          : "border-hairline bg-white/[0.03] text-slate"
                      }`}
                    >
                      <TabIcon className="h-4 w-4" />
                    </span>
                    <span className="relative min-w-0">
                      <span
                        className={`block whitespace-nowrap text-[13px] font-medium sm:text-sm ${
                          isActive ? "text-ink" : "text-slate"
                        }`}
                      >
                        {w.title}
                      </span>
                      <span className="hidden text-xs text-slate-muted lg:block">
                        {w.label}
                      </span>
                    </span>
                    {/* Run progress on the active tab (laptop) */}
                    {isActive && !reduce && (
                      <motion.span
                        key={`${w.id}-${run}-${inView}`}
                        aria-hidden
                        className="absolute bottom-0 left-0 hidden h-[2px] origin-left bg-accent lg:block"
                        style={{ width: "100%" }}
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: inView ? 1 : 0 }}
                        transition={{
                          duration: (total * STEP_MS) / 1000,
                          ease: "linear",
                        }}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </Reveal>

          {/* Running workflow */}
          <LightWave className="rounded-3xl">
            <div className="card-glass overflow-hidden rounded-3xl">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={current.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3, ease: EASE_OUT }}
                >
                  <div className="p-5 sm:p-8">
                    <div className="flex items-start gap-4">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-accent/40 bg-accent-soft/60 text-accent">
                        <Icon className="h-5 w-5" />
                      </span>
                      <div className="min-w-0">
                        <h3 className="text-xl font-medium text-ink sm:text-2xl">
                          {current.title}
                        </h3>
                        <p className="mt-1.5 text-sm text-slate sm:text-base">
                          {current.summary}
                        </p>
                      </div>
                    </div>

                    {/* Timeline */}
                    <ol className="mt-7 sm:mt-8">
                      {current.steps.map((step, i) => {
                        const isDone = i < doneCount;
                        const isRunning =
                          !isDone && i === doneCount && !showAll;
                        const last = i === total - 1;
                        return (
                          <li
                            key={step}
                            className="relative flex gap-4 pb-4 last:pb-0 sm:pb-5"
                          >
                            {!last && (
                              <span
                                aria-hidden
                                className="absolute bottom-0 left-[15px] top-8 w-px bg-white/10"
                              >
                                <motion.span
                                  className="absolute inset-0 origin-top bg-accent"
                                  initial={false}
                                  animate={{
                                    scaleY:
                                      i < doneCount - 1 ||
                                      (isDone && doneCount === total)
                                        ? 1
                                        : 0,
                                  }}
                                  transition={{
                                    duration: 0.35,
                                    ease: EASE_OUT,
                                  }}
                                />
                              </span>
                            )}
                            <span
                              className={`relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full border font-mono text-[11px] transition-colors duration-300 ${
                                isDone
                                  ? "border-accent bg-accent text-surface"
                                  : isRunning
                                    ? "border-accent text-accent"
                                    : "border-white/10 text-slate-muted"
                              }`}
                            >
                              {isRunning && (
                                <motion.span
                                  aria-hidden
                                  className="absolute inset-0 rounded-full border border-accent"
                                  animate={{
                                    scale: [1, 1.6],
                                    opacity: [0.7, 0],
                                  }}
                                  transition={{ duration: 1, repeat: Infinity }}
                                />
                              )}
                              {isDone ? (
                                <Check
                                  className="h-3.5 w-3.5"
                                  strokeWidth={3}
                                />
                              ) : (
                                String(i + 1).padStart(2, "0")
                              )}
                            </span>
                            <div className="flex min-h-8 flex-1 items-center justify-between gap-3">
                              <p
                                className={`text-sm font-medium transition-colors duration-300 sm:text-[15px] ${
                                  isDone || isRunning
                                    ? "text-ink"
                                    : "text-slate-muted"
                                }`}
                              >
                                {step}
                              </p>
                              {isRunning && (
                                <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-accent">
                                  Running
                                </span>
                              )}
                            </div>
                          </li>
                        );
                      })}
                    </ol>
                  </div>

                  {/* Replaces → Result */}
                  <div className="grid border-t border-hairline sm:grid-cols-2">
                    <div className="flex items-center justify-between gap-3 px-5 py-4 sm:px-8">
                      <div className="min-w-0">
                        <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-slate-muted">
                          Replaces
                        </p>
                        <p className="mt-1 text-sm text-slate line-through decoration-[var(--danger)]/50">
                          {current.replaces.text}
                        </p>
                      </div>
                      <div className="flex shrink-0 gap-1.5">
                        {current.replaces.tools.map((t) => (
                          <ToolLogo key={t} name={t} />
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-3 border-t border-hairline px-5 py-4 sm:border-l sm:border-t-0 sm:px-8">
                      <motion.span
                        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent text-surface"
                        initial={false}
                        animate={{
                          scale: doneCount === total ? 1 : 0.85,
                          opacity: doneCount === total ? 1 : 0.4,
                        }}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 20,
                        }}
                      >
                        <Check className="h-3.5 w-3.5" strokeWidth={3} />
                      </motion.span>
                      <div>
                        <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-slate-muted">
                          Result
                        </p>
                        <p
                          className={`mt-1 text-sm font-medium transition-colors duration-500 ${
                            doneCount === total
                              ? "text-accent"
                              : "text-ink-soft"
                          }`}
                        >
                          {current.result}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </LightWave>
        </div>
      </div>
    </section>
  );
}
