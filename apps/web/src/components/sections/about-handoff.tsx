"use client";

import { useEffect, useState, type ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  Briefcase,
  Check,
  ClipboardList,
  Code2,
  User,
  type LucideIcon,
} from "lucide-react";

/** One loop of the race, in seconds. Both lanes share this clock. */
const CYCLE = 6.4;

const AGENCY_X = [8, 36, 64, 92];
const DIRECT_X = [8, 92];

// Agency lane: the brief stalls at every handoff
const AGENCY_HOPS: [number, number][] = [
  [0.3, 1.1],
  [1.9, 2.7],
  [3.5, 4.3],
];
const AGENCY_FADE = 5.9;

// Direct lane: brief → prototype → feedback → shipped in the same time
const DIRECT_TRIPS: {
  label: string;
  start: number;
  end: number;
  back: boolean;
}[] = [
  { label: "Your brief", start: 0.3, end: 1.0, back: false },
  { label: "Prototype", start: 1.6, end: 2.3, back: true },
  { label: "Feedback", start: 2.9, end: 3.6, back: false },
  { label: "Shipped", start: 4.2, end: 4.9, back: true },
];
const SHIPPED_AT = DIRECT_TRIPS[DIRECT_TRIPS.length - 1].end;

const t = (s: number) => Math.min(1, Math.max(0, s / CYCLE));
const pc = (n: number) => `${n}%`;

function Node({
  x,
  icon: Icon,
  label,
  tone,
  arriveAt = [],
  cycle,
  reduce,
  hub = false,
}: {
  x: number;
  icon: LucideIcon;
  label: string;
  tone: "muted" | "accent";
  arriveAt?: number[];
  cycle: number;
  reduce: boolean;
  hub?: boolean;
}) {
  const accent = tone === "accent";
  return (
    <div
      className="absolute top-0 z-20 flex w-16 -translate-x-1/2 flex-col items-center gap-1.5"
      style={{ left: pc(x) }}
    >
      <span
        className={`relative flex h-11 w-11 items-center justify-center rounded-full border ${
          accent
            ? "border-accent/50 bg-accent-soft/70 text-accent shadow-[0_0_24px_-6px_var(--accent-glow)]"
            : "border-hairline bg-surface-elevated text-slate-muted"
        }`}
      >
        {hub && !reduce && (
          <motion.span
            aria-hidden
            className="absolute -inset-1 rounded-full"
            style={{
              background:
                "conic-gradient(from 0deg, transparent 0deg, rgba(63,196,180,0.85) 70deg, transparent 150deg)",
              WebkitMask:
                "radial-gradient(circle, transparent 25px, #000 26px)",
              mask: "radial-gradient(circle, transparent 25px, #000 26px)",
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 2.6, repeat: Infinity, ease: "linear" }}
          />
        )}
        {!reduce &&
          arriveAt.map((at) => (
            <motion.span
              key={`${cycle}-${at}`}
              aria-hidden
              className={`absolute inset-0 rounded-full border ${
                accent ? "border-accent" : "border-slate-muted"
              }`}
              initial={{ scale: 1, opacity: 0 }}
              animate={{ scale: [1, 1.7], opacity: [0.7, 0] }}
              transition={{ delay: at, duration: 0.7, ease: "easeOut" }}
            />
          ))}
        <Icon className="relative h-4 w-4" />
      </span>
      <span
        className={`text-[11px] font-medium leading-none ${accent ? "text-ink" : "text-slate-muted"}`}
      >
        {label}
      </span>
    </div>
  );
}

function Token({
  children,
  tone,
  left,
  times,
  opacity,
  filter,
}: {
  children: ReactNode;
  tone: "muted" | "accent";
  left: number[];
  times: number[];
  opacity: number[];
  filter?: string[];
}) {
  return (
    <motion.span
      aria-hidden
      className={`absolute -top-3 z-30 inline-flex items-center gap-1 whitespace-nowrap rounded-full px-2.5 py-1 text-[10px] font-semibold ${
        tone === "accent"
          ? "bg-accent text-surface shadow-[0_6px_20px_-6px_var(--accent-glow)]"
          : "border border-border-strong bg-surface-elevated text-ink-soft"
      }`}
      style={{ x: "-50%", y: "-50%" }}
      initial={{ left: pc(left[0]), opacity: 0 }}
      animate={{ left: left.map(pc), opacity, ...(filter ? { filter } : {}) }}
      transition={{ duration: CYCLE, times, ease: "easeInOut" }}
    >
      {children}
    </motion.span>
  );
}

function Lane({
  title,
  status,
  tone,
  children,
}: {
  title: string;
  status: ReactNode;
  tone: "muted" | "accent";
  children: ReactNode;
}) {
  return (
    <div>
      <div className="flex items-center justify-between gap-3">
        <p
          className={`font-mono text-[10px] uppercase tracking-[0.16em] ${
            tone === "accent" ? "text-accent" : "text-slate-muted"
          }`}
        >
          {title}
        </p>
        <span
          className={`inline-flex min-w-[6.5rem] items-center justify-center gap-1 rounded-full border px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em] ${
            tone === "accent"
              ? "border-accent/40 bg-accent-soft/50 text-accent"
              : "border-hairline text-slate-muted"
          }`}
        >
          {status}
        </span>
      </div>
      <div className="relative mx-2 mt-7 h-[64px]">{children}</div>
    </div>
  );
}

export function AboutHandoff() {
  const reduce = !!useReducedMotion();
  const [cycle, setCycle] = useState(0);
  const [handoffs, setHandoffs] = useState(reduce ? 3 : 0);
  const [shipped, setShipped] = useState(reduce);

  useEffect(() => {
    if (reduce) {
      setHandoffs(3);
      setShipped(true);
      return;
    }
    setHandoffs(0);
    setShipped(false);
    const timers = [
      ...AGENCY_HOPS.map(([, end], i) =>
        window.setTimeout(() => setHandoffs(i + 1), end * 1000),
      ),
      window.setTimeout(() => setShipped(true), SHIPPED_AT * 1000),
      window.setTimeout(() => setCycle((c) => c + 1), CYCLE * 1000),
    ];
    return () => timers.forEach((id) => window.clearTimeout(id));
  }, [cycle, reduce]);

  // Agency token keyframes: hop, stall, hop, stall… and blur a little more each time
  const agencyTimes = [0, t(0.3)];
  const agencyLeft = [AGENCY_X[0], AGENCY_X[0]];
  const agencyOpacity = [0, 1];
  const agencyBlur = ["blur(0px)", "blur(0px)"];
  AGENCY_HOPS.forEach(([, end], i) => {
    const next = AGENCY_HOPS[i + 1]?.[0] ?? AGENCY_FADE;
    agencyTimes.push(t(end), t(next));
    agencyLeft.push(AGENCY_X[i + 1], AGENCY_X[i + 1]);
    agencyOpacity.push(1 - i * 0.12, 1 - i * 0.12);
    agencyBlur.push(`blur(${(i + 1) * 0.6}px)`, `blur(${(i + 1) * 0.6}px)`);
  });
  agencyTimes.push(t(AGENCY_FADE + 0.35), 1);
  agencyLeft.push(AGENCY_X[3], AGENCY_X[3]);
  agencyOpacity.push(0, 0);
  agencyBlur.push("blur(2px)", "blur(2px)");

  return (
    <div
      className="space-y-7"
      role="img"
      aria-label="Typical agency: your brief passes through sales, a project manager and developers. With FlowMint: you work directly with the engineers, from brief to shipped."
    >
      <Lane
        title="Typical agency"
        tone="muted"
        status={`${handoffs} ${handoffs === 1 ? "handoff" : "handoffs"}`}
      >
        <span
          aria-hidden
          className="absolute left-[8%] right-[8%] top-[22px] h-px"
          style={{
            backgroundImage:
              "repeating-linear-gradient(90deg, rgba(107,124,143,0.5) 0 4px, transparent 4px 9px)",
          }}
        />
        <Node
          x={AGENCY_X[0]}
          icon={User}
          label="You"
          tone="muted"
          cycle={cycle}
          reduce={reduce}
        />
        <Node
          x={AGENCY_X[1]}
          icon={Briefcase}
          label="Sales"
          tone="muted"
          arriveAt={[AGENCY_HOPS[0][1]]}
          cycle={cycle}
          reduce={reduce}
        />
        <Node
          x={AGENCY_X[2]}
          icon={ClipboardList}
          label="PM"
          tone="muted"
          arriveAt={[AGENCY_HOPS[1][1]]}
          cycle={cycle}
          reduce={reduce}
        />
        <Node
          x={AGENCY_X[3]}
          icon={Code2}
          label="Dev"
          tone="muted"
          arriveAt={[AGENCY_HOPS[2][1]]}
          cycle={cycle}
          reduce={reduce}
        />
        {!reduce && (
          <Token
            key={`agency-${cycle}`}
            tone="muted"
            left={agencyLeft}
            times={agencyTimes}
            opacity={agencyOpacity}
            filter={agencyBlur}
          >
            Your brief
          </Token>
        )}
      </Lane>

      <div className="h-px bg-hairline" />

      <Lane
        title="With FlowMint"
        tone="accent"
        status={
          shipped ? (
            <>
              <Check className="h-3 w-3" strokeWidth={3} /> Shipped
            </>
          ) : (
            "0 handoffs"
          )
        }
      >
        <motion.span
          aria-hidden
          className="absolute left-[8%] right-[8%] top-[21.5px] h-[2px] rounded-full"
          style={{
            backgroundImage:
              "repeating-linear-gradient(90deg, rgba(43,179,163,0.9) 0 8px, rgba(43,179,163,0.25) 8px 16px)",
            backgroundSize: "16px 2px",
          }}
          animate={
            reduce ? undefined : { backgroundPositionX: ["0px", "32px"] }
          }
          transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
        />
        <Node
          x={DIRECT_X[0]}
          icon={User}
          label="You"
          tone="accent"
          arriveAt={DIRECT_TRIPS.filter((d) => d.back).map((d) => d.end)}
          cycle={cycle}
          reduce={reduce}
        />
        <Node
          x={DIRECT_X[1]}
          icon={Code2}
          label="Engineers"
          tone="accent"
          hub
          arriveAt={DIRECT_TRIPS.filter((d) => !d.back).map((d) => d.end)}
          cycle={cycle}
          reduce={reduce}
        />
        {!reduce &&
          DIRECT_TRIPS.map((trip) => {
            const [from, to] = trip.back
              ? [DIRECT_X[1], DIRECT_X[0]]
              : [DIRECT_X[0], DIRECT_X[1]];
            return (
              <Token
                key={`${trip.label}-${cycle}`}
                tone="accent"
                left={[from, from, from, to, to, to]}
                times={[
                  0,
                  t(trip.start - 0.15),
                  t(trip.start),
                  t(trip.end),
                  t(trip.end + 0.3),
                  1,
                ]}
                opacity={[0, 0, 1, 1, 0, 0]}
              >
                {trip.label === "Shipped" && (
                  <Check className="h-3 w-3" strokeWidth={3} />
                )}
                {trip.label}
              </Token>
            );
          })}
      </Lane>
    </div>
  );
}
