"use client";

import { useEffect, useState } from "react";
import { motion, useSpring, useTransform } from "motion/react";
import { useLoop } from "./use-loop";

const toggles = ["Auto follow-ups", "Order sync", "Weekly report"];
const CYCLE = 7000;
const TARGET = 128;

/** A mini control panel: switches flip on, the counter and chart climb. */
export function PulseDashboard() {
  const [on, setOn] = useState<boolean[]>(toggles.map(() => false));
  const [count, setCount] = useState(0);
  const { cycle, reduce } = useLoop(CYCLE, [
    { at: 0, run: () => (setOn(toggles.map(() => false)), setCount(0)) },
    ...toggles.map((_, i) => ({
      at: 600 + i * 650,
      run: () => setOn((o) => o.map((v, j) => (j === i ? true : v))),
    })),
    { at: 2600, run: () => setCount(TARGET) },
  ]);

  const spring = useSpring(0, { stiffness: 40, damping: 18 });
  const shown = useTransform(spring, (v) => Math.round(v).toString());
  useEffect(() => {
    if (reduce) spring.jump(TARGET);
    else if (count === 0) spring.jump(0);
    else spring.set(count);
  }, [count, reduce, spring]);

  const isOn = (i: number) => reduce || on[i];
  const chart =
    "M0 52 C 20 50, 30 46, 45 44 S 70 30, 85 32 S 110 18, 125 16 S 150 6, 160 4";

  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="eyebrow">This week</p>
        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-slate-muted">
          Autopilot
        </span>
      </div>

      <div className="mt-4 rounded-2xl border border-white/10 bg-[#0b1219] p-4">
        <p className="text-[11px] text-slate">Tasks handled for you</p>
        <motion.p className="mt-1 font-display text-4xl tabular-nums text-ink">
          {shown}
        </motion.p>
        <svg viewBox="0 0 160 56" className="mt-2 h-14 w-full" aria-hidden>
          <defs>
            <linearGradient id="pd-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(43,179,163,0.35)" />
              <stop offset="100%" stopColor="rgba(43,179,163,0)" />
            </linearGradient>
          </defs>
          <motion.path
            key={`fill-${cycle}`}
            d={`${chart} L160 56 L0 56 Z`}
            fill="url(#pd-fill)"
            initial={{ opacity: reduce ? 1 : 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.6, duration: 1 }}
          />
          <motion.path
            key={`line-${cycle}`}
            d={chart}
            fill="none"
            stroke="#2bb3a3"
            strokeWidth={2}
            strokeLinecap="round"
            initial={{ pathLength: reduce ? 1 : 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 2.4, duration: 1.6, ease: "easeOut" }}
          />
        </svg>
      </div>

      <ul className="mt-3 space-y-1.5">
        {toggles.map((t, i) => (
          <li
            key={t}
            className="flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.03] px-3 py-2.5 text-[12px] text-ink-soft"
          >
            {t}
            <span
              className={`relative h-5 w-9 rounded-full transition-colors duration-300 ${
                isOn(i) ? "bg-accent" : "bg-white/15"
              }`}
            >
              <motion.span
                className="absolute top-0.5 h-4 w-4 rounded-full bg-white shadow"
                animate={{ left: isOn(i) ? 18 : 2 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
