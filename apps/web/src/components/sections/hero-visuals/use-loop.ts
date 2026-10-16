"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";

/**
 * Runs a timeline once per `cycleMs`, calling `schedule(at)` for each step.
 * Returns the cycle count (use it as a React key to restart animations) and
 * whether motion is reduced (callers render a static end state).
 */
export function useLoop(
  cycleMs: number,
  steps: { at: number; run: () => void }[] = [],
) {
  const reduce = !!useReducedMotion();
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const timers = steps.map((s) => window.setTimeout(s.run, s.at));
    timers.push(window.setTimeout(() => setCycle((c) => c + 1), cycleMs));
    return () => timers.forEach((t) => window.clearTimeout(t));
    // steps are recreated each render; the cycle is what drives re-scheduling
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cycle, reduce, cycleMs]);

  return { cycle, reduce };
}
