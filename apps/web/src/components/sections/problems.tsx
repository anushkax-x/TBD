"use client";

import { useEffect, useRef, useState } from "react";
import { Check } from "lucide-react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "motion/react";
import { Reveal } from "@/components/ui/reveal";
import { SplitText } from "@/components/motion/split-text";
import { TextScrub } from "@/components/motion/text-scrub";
import { problems } from "./problems-data";

/** "N problems left" pill; turns mint at zero */
function Counter({
  left,
  className = "",
}: {
  left: number;
  className?: string;
}) {
  return (
    <div
      aria-live="polite"
      className={`items-center gap-3 rounded-full border px-4 py-2 transition-colors duration-500 ${className} ${
        left === 0
          ? "border-accent/40 bg-accent-soft/80 text-accent"
          : "border-[var(--danger)]/40 bg-[#2a1416]/90 text-[var(--danger)]"
      }`}
    >
      <span className="relative inline-grid font-display text-2xl tabular-nums">
        <AnimatePresence initial={false}>
          <motion.span
            key={left}
            className="[grid-area:1/1]"
            initial={{ y: 14, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -14, opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {left}
          </motion.span>
        </AnimatePresence>
      </span>
      <span className="text-sm">
        {left === 0
          ? "problems left · all fixed"
          : left === 1
            ? "problem left"
            : "problems left"}
      </span>
    </div>
  );
}

/** Resting tilt of each "broken" card */
const TILTS = [-2.5, 1.8, -1.2, 2.2, -1.8, 1.4];

/**
 * "Scroll to fix": every card starts broken (red, tilted, showing the problem)
 * and snaps fixed — straight, mint, showing the fix — as the grid scrolls past.
 * A counter next to the headline ticks down to zero.
 */
export function ProblemSection() {
  const gridRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [healed, setHealed] = useState(0);
  const { scrollYProgress } = useScroll({
    target: gridRef,
    offset: ["start 55%", "end 35%"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const next = Math.floor(v * (problems.length + 0.5));
    setHealed(Math.min(problems.length, Math.max(0, next)));
  });

  // Gentler tilt on narrow screens
  const [tiltScale, setTiltScale] = useState(1);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 639px)");
    const apply = () => setTiltScale(mq.matches ? 0.45 : 1);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  const fixedCount = reduce ? problems.length : healed;
  const left = problems.length - fixedCount;

  return (
    <section className="relative overflow-x-clip">
      <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-28">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Reveal>
              <p className="eyebrow">Where we create value</p>
            </Reveal>
            <h2 className="mt-5 max-w-3xl font-display text-[2.25rem] leading-[1.05] text-ink sm:text-5xl lg:text-6xl">
              <SplitText text="If it relies on memory, it’s already broken." />
            </h2>
          </div>
          <Counter
            left={left}
            className="hidden self-start sm:flex lg:self-end"
          />
        </div>

        {/* Phones: counter pins to the top while the cards are fixed below */}
        <div className="sticky top-3 z-20 mt-8 flex justify-center sm:hidden">
          <Counter
            left={left}
            className="flex shadow-[0_10px_30px_-10px_rgba(0,0,0,0.9)] backdrop-blur-md"
          />
        </div>

        <div
          ref={gridRef}
          className="mt-5 grid gap-3 sm:mt-12 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3"
        >
          {problems.map((p, i) => {
            const fixed = i < fixedCount;
            return (
              <motion.article
                key={p.title}
                className={`relative overflow-hidden rounded-2xl border p-4 sm:rounded-3xl sm:p-6 ${
                  fixed
                    ? "border-accent/30 bg-[linear-gradient(180deg,rgba(20,53,47,0.45),rgba(10,16,23,0.7))]"
                    : "border-[var(--danger)]/30 bg-[linear-gradient(180deg,rgba(240,112,112,0.07),rgba(10,16,23,0.7))]"
                }`}
                initial={false}
                animate={{
                  rotate: fixed ? 0 : TILTS[i] * tiltScale,
                  scale: fixed ? 1 : 0.97,
                }}
                transition={{ type: "spring", stiffness: 260, damping: 18 }}
              >
                {/* Mint flash the moment it's fixed */}
                <AnimatePresence>
                  {fixed && !reduce && (
                    <motion.span
                      key="flash"
                      aria-hidden
                      className="pointer-events-none absolute inset-0 bg-accent/25"
                      initial={{ opacity: 1 }}
                      animate={{ opacity: 0 }}
                      transition={{ duration: 0.7 }}
                    />
                  )}
                </AnimatePresence>

                <div className="flex items-center gap-3 sm:justify-between sm:gap-0">
                  <div
                    data-active
                    className={`problem-card flex h-10 w-16 shrink-0 items-center justify-center rounded-xl border px-2 transition-colors duration-500 [&_svg]:h-6 sm:h-12 sm:w-24 sm:px-3 sm:[&_svg]:h-8 ${
                      fixed
                        ? "border-accent/30 bg-accent-soft/40 text-accent"
                        : "border-[var(--danger)]/30 bg-[var(--danger)]/[0.06] text-[var(--danger)]"
                    }`}
                  >
                    {p.art}
                  </div>
                  <h3 className="min-w-0 flex-1 text-base font-medium leading-snug text-ink sm:hidden">
                    {p.title}
                  </h3>
                  <span
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-colors duration-500 ${
                      fixed ? "bg-accent text-surface" : "bg-[var(--danger)]/15"
                    }`}
                  >
                    {fixed ? (
                      <Check className="h-3.5 w-3.5" strokeWidth={3} />
                    ) : (
                      <span className="h-2 w-2 animate-pulse rounded-full bg-[var(--danger)]" />
                    )}
                  </span>
                </div>

                <h3 className="mt-5 hidden text-lg font-medium text-ink sm:block">
                  {p.title}
                </h3>
                <div className="relative mt-3 min-h-[1.5rem] sm:mt-2 sm:min-h-[2.75rem]">
                  <AnimatePresence mode="popLayout" initial={false}>
                    {fixed ? (
                      <motion.p
                        key="fix"
                        className="flex items-center gap-2 text-[15px] font-medium text-accent"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Check className="h-4 w-4 shrink-0" strokeWidth={2.5} />
                        {p.fix}
                      </motion.p>
                    ) : (
                      <motion.p
                        key="problem"
                        className="text-sm leading-relaxed text-slate"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                      >
                        {p.body}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              </motion.article>
            );
          })}
        </div>

        <p className="mx-auto mt-16 max-w-5xl text-balance text-center font-display text-2xl leading-[1.2] text-accent sm:mt-20 sm:text-[2rem] lg:mt-28 lg:text-[2.6rem]">
          <TextScrub text="The goal is not more software. It is fewer manual steps and a clearer way of working." />
        </p>
      </div>
    </section>
  );
}
