"use client";

import { useState } from "react";
import { motion } from "motion/react";
import {
  Check,
  FileSpreadsheet,
  Mail,
  Phone,
  StickyNote,
  type LucideIcon,
} from "lucide-react";
import { useLoop } from "./use-loop";

type Item = {
  icon: LucideIcon;
  messy: string;
  done: string;
  /** Scattered position while messy: px offset + tilt */
  mess: { x: number; y: number; r: number };
};

const items: Item[] = [
  {
    icon: Mail,
    messy: "Re: re: where's my order??",
    done: "Customer updated",
    mess: { x: -8, y: 2, r: -6 },
  },
  {
    icon: FileSpreadsheet,
    messy: "orders_FINAL_v3.xlsx",
    done: "Synced to Sheets",
    mess: { x: 12, y: 56, r: 4 },
  },
  {
    icon: StickyNote,
    messy: "call supplier!!!",
    done: "Supplier notified",
    mess: { x: -4, y: 112, r: -3 },
  },
  {
    icon: Phone,
    messy: "Missed call · new lead",
    done: "Lead followed up",
    mess: { x: 10, y: 164, r: 6 },
  },
];

const ROW = 54;
const CYCLE = 7000;
const SWEEP_AT = 1800;
const SWEEP_MS = 1400;
const RESET_AT = 5000;

/** A messy pile of manual tasks gets swept into a clean, checked list. */
export function MessToOrder() {
  const [done, setDone] = useState<boolean[]>(items.map(() => false));
  const steps = [
    ...items.map((_, i) => ({
      at: SWEEP_AT + ((i + 0.5) / items.length) * SWEEP_MS,
      run: () => setDone((d) => d.map((v, j) => (j === i ? true : v))),
    })),
    { at: RESET_AT, run: () => setDone(items.map(() => false)) },
  ];
  const { cycle, reduce } = useLoop(CYCLE, steps);
  const allDone = reduce || done.every(Boolean);

  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="eyebrow">
          {allDone ? "On autopilot" : "Doing it by hand"}
        </p>
        <span
          className={`rounded-full border px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] transition-colors duration-500 ${
            allDone
              ? "border-accent/40 bg-accent-soft/50 text-accent"
              : "border-[var(--danger)]/40 bg-[var(--danger)]/10 text-[var(--danger)]"
          }`}
        >
          {allDone ? "0 to-dos" : `${done.filter((d) => !d).length} to-dos`}
        </span>
      </div>

      <div className="relative mt-5" style={{ height: ROW * items.length + 8 }}>
        {items.map((it, i) => {
          const isDone = reduce || done[i];
          const Icon = isDone ? Check : it.icon;
          return (
            <motion.div
              key={it.messy}
              className={`absolute inset-x-0 top-0 flex h-[46px] items-center gap-3 rounded-xl border px-3 text-[13px] transition-colors duration-300 ${
                isDone
                  ? "border-accent/30 bg-accent-soft/30 text-ink"
                  : "border-white/10 bg-[#111a24] text-ink-soft shadow-[0_10px_24px_-12px_rgba(0,0,0,0.9)]"
              }`}
              animate={
                isDone
                  ? { x: 0, y: i * ROW, rotate: 0, scale: 1 }
                  : {
                      x: it.mess.x,
                      y: it.mess.y,
                      rotate: it.mess.r,
                      scale: 0.92,
                    }
              }
              transition={{ type: "spring", stiffness: 260, damping: 24 }}
            >
              <span
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${
                  isDone ? "bg-accent text-surface" : "bg-white/5 text-slate"
                }`}
              >
                <Icon className="h-3.5 w-3.5" strokeWidth={isDone ? 3 : 2} />
              </span>
              <span className="truncate">{isDone ? it.done : it.messy}</span>
              {!isDone && (
                <span className="ml-auto h-2 w-2 shrink-0 rounded-full bg-[var(--danger)]" />
              )}
            </motion.div>
          );
        })}

        {/* Sweep line */}
        {!reduce && (
          <motion.div
            key={cycle}
            aria-hidden
            className="pointer-events-none absolute inset-x-[-8px] z-10 h-10"
            style={{
              background:
                "linear-gradient(180deg, transparent, rgba(43,179,163,0.18) 45%, rgba(63,196,180,0.9) 50%, rgba(43,179,163,0.18) 55%, transparent)",
            }}
            initial={{ top: -40, opacity: 0 }}
            animate={{
              top: [-40, -40, ROW * items.length, ROW * items.length],
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: (SWEEP_AT + SWEEP_MS + 300) / 1000,
              times: [
                0,
                SWEEP_AT / (SWEEP_AT + SWEEP_MS + 300),
                (SWEEP_AT + SWEEP_MS) / (SWEEP_AT + SWEEP_MS + 300),
                1,
              ],
              ease: "easeInOut",
            }}
          />
        )}
      </div>
    </div>
  );
}
