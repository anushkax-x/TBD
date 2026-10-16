"use client";

import { type ReactNode } from "react";
import { motion, type Variants } from "motion/react";
import { EASE_OUT } from "./easing";

const parent: Variants = {
  hidden: {},
  show: (custom: { stagger: number; delay: number }) => ({
    transition: {
      staggerChildren: custom.stagger,
      delayChildren: custom.delay,
    },
  }),
};

const child: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 1, ease: EASE_OUT } },
};

/**
 * Children wrapped in <StaggerItem> rise in one after another once the group
 * scrolls into view (Orchid's ScrollTrigger.batch pattern).
 */
export function Stagger({
  children,
  className = "",
  stagger = 0.12,
  delay = 0.1,
  as = "div",
  onMount = false,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
  as?: "div" | "ul" | "ol";
  /** Animate immediately on mount instead of on scroll into view */
  onMount?: boolean;
}) {
  const Comp = motion[as];
  return (
    <Comp
      className={className}
      variants={parent}
      custom={{ stagger, delay }}
      initial="hidden"
      {...(onMount
        ? { animate: "show" }
        : {
            whileInView: "show",
            viewport: { once: true, margin: "0px 0px -10% 0px" },
          })}
    >
      {children}
    </Comp>
  );
}

export function StaggerItem({
  children,
  className = "",
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "li";
}) {
  const Comp = motion[as];
  return (
    <Comp className={className} variants={child}>
      {children}
    </Comp>
  );
}
