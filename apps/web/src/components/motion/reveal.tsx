"use client";

import { type ReactNode } from "react";
import { motion, type Variants } from "motion/react";
import { EASE_OUT } from "./easing";

type Variant = "slide" | "fade" | "scale";

const variants: Record<Variant, Variants> = {
  slide: { hidden: { opacity: 0, y: 32 }, show: { opacity: 1, y: 0 } },
  fade: { hidden: { opacity: 0 }, show: { opacity: 1 } },
  scale: {
    hidden: { opacity: 0, scale: 0.94, y: 24 },
    show: { opacity: 1, scale: 1, y: 0 },
  },
};

export function Reveal({
  children,
  className = "",
  delayMs = 0,
  variant = "slide",
}: {
  children: ReactNode;
  className?: string;
  delayMs?: number;
  variant?: Variant;
}) {
  return (
    <motion.div
      className={className}
      variants={variants[variant]}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 1, ease: EASE_OUT, delay: delayMs / 1000 }}
    >
      {children}
    </motion.div>
  );
}
