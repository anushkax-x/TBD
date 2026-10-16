"use client";

import { motion, useScroll, useTransform } from "motion/react";

/**
 * Large blurred mint orb that drifts slowly and parallaxes with page scroll.
 * Replaces Orchid's purple gradient SVGs.
 */
export function GlowOrb({
  className = "",
  size = 520,
  opacity = 0.35,
  parallax = 120,
  duration = 18,
}: {
  className?: string;
  size?: number;
  opacity?: number;
  /** px of vertical travel across the full page scroll */
  parallax?: number;
  duration?: number;
}) {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -parallax]);

  return (
    <motion.div
      aria-hidden
      className={`pointer-events-none absolute ${className}`}
      style={{ y, width: size, height: size }}
    >
      <motion.div
        className="h-full w-full rounded-full will-change-transform"
        style={{
          opacity,
          background:
            "radial-gradient(circle at 50% 50%, rgba(43,179,163,0.9) 0%, rgba(43,179,163,0.35) 35%, rgba(20,53,47,0) 70%)",
          filter: "blur(60px)",
        }}
        animate={{ x: [0, 40, -30, 0], y: [0, -30, 20, 0], scale: [1, 1.08, 0.95, 1] }}
        transition={{ duration, repeat: Infinity, ease: "easeInOut" }}
      />
    </motion.div>
  );
}
