"use client";

import { motion, type Variants } from "motion/react";
import { EASE_OUT } from "./easing";

const word: Variants = {
  hidden: { y: "110%" },
  show: { y: "0%", transition: { duration: 1, ease: EASE_OUT } },
};

/**
 * Masked word-by-word rise (Orchid's SplitText load). The whole sentence is
 * exposed to assistive tech via aria-label; word spans are aria-hidden.
 */
export function SplitText({
  text,
  className = "",
  delay = 0,
  stagger = 0.06,
  onMount = false,
  highlight = [],
}: {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  onMount?: boolean;
  /** Words (ignoring punctuation) rendered in the accent colour */
  highlight?: string[];
}) {
  const words = text.split(" ");
  return (
    <motion.span
      aria-label={text}
      role="text"
      className={`block ${className}`}
      initial="hidden"
      {...(onMount
        ? { animate: "show" }
        : {
            whileInView: "show",
            viewport: { once: true, margin: "0px 0px -10% 0px" },
          })}
      transition={{ staggerChildren: stagger, delayChildren: delay }}
    >
      {words.map((w, i) => (
        <span
          key={`${w}-${i}`}
          aria-hidden
          className="inline-block overflow-hidden pb-[0.12em] align-top -mb-[0.12em]"
        >
          <motion.span
            className={`inline-block ${
              highlight.includes(w.replace(/[^\p{L}\p{N}'-]/gu, ""))
                ? "text-accent"
                : ""
            }`}
            variants={word}
          >
            {w}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}
