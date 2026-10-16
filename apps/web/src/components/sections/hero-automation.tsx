"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  Bell,
  Bot,
  Check,
  CreditCard,
  Database,
  FileText,
  FolderKanban,
  LifeBuoy,
  Mail,
  Package,
  Send,
  ShoppingCart,
  UserPlus,
  type LucideIcon,
} from "lucide-react";
import { EASE_OUT } from "@/components/motion/easing";

type Step = { label: string; icon: LucideIcon };
type Scenario = {
  id: string;
  label: string;
  trigger: Step;
  outputs: [Step, Step, Step];
};

/** Same workflows as the Workflows section, condensed to trigger → 3 actions */
const scenarios: Scenario[] = [
  {
    id: "orders",
    label: "Order → fulfilment",
    trigger: { label: "New order", icon: ShoppingCart },
    outputs: [
      { label: "Stock", icon: Package },
      { label: "Invoice", icon: FileText },
      { label: "Email", icon: Mail },
    ],
  },
  {
    id: "leads",
    label: "Lead capture → follow-up",
    trigger: { label: "New lead", icon: UserPlus },
    outputs: [
      { label: "CRM", icon: Database },
      { label: "Sales alert", icon: Bell },
      { label: "Follow-up", icon: Send },
    ],
  },
  {
    id: "support",
    label: "Support & returns",
    trigger: { label: "Support ticket", icon: LifeBuoy },
    outputs: [
      { label: "Order lookup", icon: Package },
      { label: "AI reply", icon: Bot },
      { label: "Resolved", icon: Check },
    ],
  },
  {
    id: "onboarding",
    label: "Client onboarding",
    trigger: { label: "Payment received", icon: CreditCard },
    outputs: [
      { label: "Account", icon: UserPlus },
      { label: "Docs", icon: FileText },
      { label: "Project", icon: FolderKanban },
    ],
  },
];

// Timeline (seconds) within one cycle
const PULSE_IN_AT = 0.5;
const PULSE_IN_DUR = 0.6;
const HUB_AT = PULSE_IN_AT + PULSE_IN_DUR;
const PULSE_OUT_AT = HUB_AT + 0.15;
const PULSE_OUT_DUR = 0.7;
const OUT_STAGGER = 0.18;
const DONE_AT = PULSE_OUT_AT + PULSE_OUT_DUR;
const CYCLE_MS = 4800;

// Geometry in a 400×300 box; HTML nodes use the same coordinates as percentages
const TRIGGER = { x: 200, y: 42 };
const HUB = { x: 200, y: 140 };
const OUT_X = [72, 200, 328];
const OUT_Y = 246;

type Pt = { x: number; y: number };

function quad(p0: Pt, c: Pt, p1: Pt, steps = 16) {
  const xs: number[] = [];
  const ys: number[] = [];
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const a = (1 - t) * (1 - t);
    const b = 2 * (1 - t) * t;
    const d = t * t;
    xs.push(a * p0.x + b * c.x + d * p1.x);
    ys.push(a * p0.y + b * c.y + d * p1.y);
  }
  return { xs, ys, d: `M${p0.x} ${p0.y} Q${c.x} ${c.y} ${p1.x} ${p1.y}` };
}

const inPath = quad(
  { x: TRIGGER.x, y: TRIGGER.y + 20 },
  { x: TRIGGER.x, y: (TRIGGER.y + HUB.y) / 2 },
  { x: HUB.x, y: HUB.y - 30 },
);
const outPaths = OUT_X.map((x) =>
  quad({ x: HUB.x, y: HUB.y + 30 }, { x, y: HUB.y + 40 }, { x, y: OUT_Y - 26 }),
);

const pct = (p: Pt) => ({
  left: `${(p.x / 400) * 100}%`,
  top: `${(p.y / 300) * 100}%`,
});

function Pulse({
  path,
  delay,
  duration,
}: {
  path: { xs: number[]; ys: number[]; d: string };
  delay: number;
  duration: number;
}) {
  return (
    <>
      <motion.path
        d={path.d}
        fill="none"
        stroke="url(#flow-line)"
        strokeWidth={1.6}
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: [0, 1, 1], opacity: [0, 1, 0] }}
        transition={{
          delay,
          duration: duration + 1.6,
          times: [0, 0.3, 1],
          ease: "easeOut",
        }}
      />
      <motion.circle
        r={4}
        fill="#3fc4b4"
        filter="url(#flow-glow)"
        initial={{ cx: path.xs[0], cy: path.ys[0], opacity: 0 }}
        animate={{ cx: path.xs, cy: path.ys, opacity: [0, 1, 1, 0] }}
        transition={{
          delay,
          duration,
          ease: "easeInOut",
          opacity: { delay, duration, times: [0, 0.1, 0.85, 1] },
        }}
      />
    </>
  );
}

export function HeroAutomation() {
  const reduce = useReducedMotion();
  const [cycle, setCycle] = useState(0);
  const scenario = scenarios[cycle % scenarios.length];

  useEffect(() => {
    if (reduce) return;
    const timer = window.setTimeout(() => setCycle((c) => c + 1), CYCLE_MS);
    return () => window.clearTimeout(timer);
  }, [cycle, reduce]);

  const TriggerIcon = scenario.trigger.icon;

  return (
    <div className="relative" aria-label={`Automation demo: ${scenario.label}`}>
      <div className="flex items-center justify-between">
        <div className="grid">
          <AnimatePresence initial={false}>
            <motion.p
              key={scenario.id}
              className="eyebrow [grid-area:1/1]"
              initial={{ opacity: 0, y: 8, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -8, filter: "blur(4px)" }}
              transition={{ duration: 0.35 }}
            >
              {scenario.label}
            </motion.p>
          </AnimatePresence>
        </div>
        <span className="hidden shrink-0 items-center gap-1.5 rounded-full sm:inline-flex border border-accent/30 bg-accent-soft/40 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-accent">
          <span className="relative flex h-1.5 w-1.5">
            {!reduce && (
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
            )}
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
          </span>
          Live
        </span>
      </div>

      {/* Flow diagram */}
      <div className="relative mt-3 aspect-[4/3] w-full">
        <svg
          viewBox="0 0 400 300"
          className="absolute inset-0 h-full w-full"
          aria-hidden
        >
          <defs>
            <linearGradient id="flow-line" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3fc4b4" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#2bb3a3" stopOpacity="0.5" />
            </linearGradient>
            <filter
              id="flow-glow"
              x="-200%"
              y="-200%"
              width="500%"
              height="500%"
            >
              <feGaussianBlur stdDeviation="3" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <radialGradient id="hub-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(43,179,163,0.28)" />
              <stop offset="100%" stopColor="rgba(43,179,163,0)" />
            </radialGradient>
          </defs>
          <circle cx={HUB.x} cy={HUB.y} r={110} fill="url(#hub-glow)" />

          {/* Static rails */}
          {[inPath, ...outPaths].map((p) => (
            <path
              key={p.d}
              d={p.d}
              fill="none"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth={1}
              strokeDasharray="3 5"
            />
          ))}

          {/* Pulses re-mount each cycle */}
          {!reduce && (
            <g key={cycle}>
              <Pulse
                path={inPath}
                delay={PULSE_IN_AT}
                duration={PULSE_IN_DUR}
              />
              {outPaths.map((p, i) => (
                <Pulse
                  key={p.d}
                  path={p}
                  delay={PULSE_OUT_AT + i * OUT_STAGGER}
                  duration={PULSE_OUT_DUR}
                />
              ))}
            </g>
          )}
        </svg>

        {/* Trigger */}
        <div className="absolute" style={pct(TRIGGER)}>
          <AnimatePresence initial={false}>
            <motion.div
              key={scenario.id}
              className="absolute left-0 top-0 flex items-center gap-2.5 whitespace-nowrap rounded-full border border-hairline bg-surface-elevated/90 py-1.5 pl-1.5 pr-4 shadow-[0_10px_30px_-12px_rgba(0,0,0,0.9)] backdrop-blur"
              initial={{ opacity: 0, x: "-50%", y: "-90%", scale: 0.95 }}
              animate={{ opacity: 1, x: "-50%", y: "-50%", scale: 1 }}
              exit={{ opacity: 0, x: "-50%", y: "-20%", scale: 0.97 }}
              transition={{ duration: 0.35, ease: EASE_OUT }}
            >
              <span className="relative flex h-7 w-7 items-center justify-center rounded-full bg-accent text-surface">
                <TriggerIcon className="h-3.5 w-3.5" />
                {!reduce && (
                  <motion.span
                    key={cycle}
                    className="absolute inset-0 rounded-full border border-accent"
                    initial={{ scale: 1, opacity: 0.8 }}
                    animate={{ scale: 1.9, opacity: 0 }}
                    transition={{ duration: 0.9, delay: 0.2 }}
                  />
                )}
              </span>
              <span className="text-sm font-medium text-ink">
                {scenario.trigger.label}
              </span>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Hub */}
        <div
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={pct(HUB)}
        >
          <div className="relative flex h-[60px] w-[60px] items-center justify-center">
            {!reduce && (
              <motion.span
                aria-hidden
                className="absolute inset-0 rounded-full"
                style={{
                  background:
                    "conic-gradient(from 0deg, transparent 0deg, rgba(63,196,180,0.9) 80deg, transparent 160deg)",
                  WebkitMask:
                    "radial-gradient(circle, transparent 27px, #000 28px)",
                  mask: "radial-gradient(circle, transparent 27px, #000 28px)",
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              />
            )}
            <span className="absolute inset-[3px] rounded-full border border-accent/40 bg-surface-elevated" />
            {!reduce && (
              <motion.span
                key={cycle}
                aria-hidden
                className="absolute inset-0 rounded-full bg-accent/30"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: [0.8, 1.5], opacity: [0, 0.7, 0] }}
                transition={{ delay: HUB_AT, duration: 0.7, ease: "easeOut" }}
              />
            )}
            <Image
              src="/logo.svg"
              alt=""
              width={26}
              height={26}
              className="relative"
              unoptimized
            />
          </div>
        </div>

        {/* Outputs */}
        {OUT_X.map((x, i) => {
          const out = scenario.outputs[i];
          const Icon = out.icon;
          const doneAt = DONE_AT + i * OUT_STAGGER;
          return (
            <div
              key={x}
              className="absolute w-[27%] -translate-x-1/2 -translate-y-1/2"
              style={pct({ x, y: OUT_Y })}
            >
              <motion.div
                key={`${cycle}-${i}`}
                className="relative flex flex-col items-center gap-1.5 overflow-hidden rounded-2xl border border-hairline bg-surface-elevated/80 px-1.5 py-2.5 text-center"
                initial={reduce ? false : { opacity: 0.55 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <motion.span
                  aria-hidden
                  className="absolute inset-0 rounded-2xl border border-accent/50 bg-accent-soft/40"
                  initial={reduce ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: doneAt, duration: 0.3 }}
                />
                <span className="relative flex h-8 w-8 items-center justify-center rounded-full border border-hairline bg-white/[0.04] text-accent">
                  <Icon className="h-4 w-4" />
                  <motion.span
                    className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-surface"
                    initial={reduce ? false : { scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      delay: doneAt + 0.05,
                      type: "spring",
                      stiffness: 500,
                      damping: 18,
                    }}
                  >
                    <Check className="h-2.5 w-2.5" strokeWidth={3} />
                  </motion.span>
                </span>
                <span className="relative whitespace-nowrap text-[11px] font-medium leading-tight text-ink sm:text-xs">
                  {out.label}
                </span>
              </motion.div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
