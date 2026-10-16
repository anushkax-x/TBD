"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { MessToOrder } from "./mess-to-order";
import { PulseDashboard } from "./pulse-dashboard";

/**
 * Hero card visual: alternates between "Mess → Order" and the autopilot
 * dashboard. Each stays up long enough to finish its story, ending on its
 * resolved state, then crossfades to the other (each restarts on mount).
 */
const views = [
  { id: "mess", node: <MessToOrder />, ms: 5200 },
  { id: "dashboard", node: <PulseDashboard />, ms: 5600 },
];

export function HeroVisual() {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const id = window.setTimeout(
      () => setIndex((i) => (i + 1) % views.length),
      views[index].ms,
    );
    return () => window.clearTimeout(id);
  }, [index, reduce]);

  const view = views[index];

  return (
    // Fixed min height = the taller view, so the hero doesn't shift on swap
    <div className="grid min-h-[352px] items-center">
      <AnimatePresence initial={false}>
        <motion.div
          key={view.id}
          className="[grid-area:1/1]"
          initial={{ opacity: 0, y: 14, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -14, filter: "blur(6px)" }}
          transition={{ duration: 0.5 }}
        >
          {view.node}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
