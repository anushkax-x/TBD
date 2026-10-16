"use client";

import { type ReactNode } from "react";
import { motion } from "motion/react";
import { EASE_OUT } from "./easing";

/**
 * Orchid "light-wave" reveal: a mint light line opens in width first, then
 * the glow and panel open in height 100ms later, when it scrolls into view.
 */
export function LightWave({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={`relative ${className}`}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -15% 0px" }}
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -inset-x-8 -top-20 z-0 h-40"
        style={{
          background:
            "radial-gradient(ellipse 50% 50% at center, rgba(43,179,163,0.3), transparent 70%)",
          filter: "blur(16px)",
        }}
        variants={{
          hidden: { scaleY: 0, opacity: 0 },
          show: { scaleY: 1, opacity: 1 },
        }}
        transition={{ duration: 1.4, ease: EASE_OUT, delay: 0.1 }}
      />
      <motion.div
        className="relative z-10 h-full"
        variants={{
          hidden: { opacity: 0, clipPath: "inset(0% 0% 100% 0%)" },
          show: { opacity: 1, clipPath: "inset(0% 0% 0% 0%)" },
        }}
        transition={{ duration: 1.1, ease: EASE_OUT, delay: 0.1 }}
      >
        {children}
      </motion.div>
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-x-6 top-0 z-20 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(63,196,180,0.9), transparent)",
        }}
        variants={{
          hidden: { scaleX: 0, opacity: 0 },
          show: { scaleX: 1, opacity: 1 },
        }}
        transition={{ duration: 1, ease: EASE_OUT }}
      />
    </motion.div>
  );
}
