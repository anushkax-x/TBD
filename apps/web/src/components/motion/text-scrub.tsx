"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";

function Word({
  children,
  progress,
  range,
  dim,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
  dim: number;
}) {
  const opacity = useTransform(progress, range, [dim, 1]);
  return (
    <motion.span aria-hidden style={{ opacity }} className="inline">
      {children}
    </motion.span>
  );
}

/**
 * Words light up from dim to full as the element scrolls through the
 * viewport (Orchid's data-animate="text-scrub"). Pass `progress` to drive it
 * from an outer scroll container, e.g. a pinned section.
 */
export function TextScrub({
  text,
  className = "",
  progress: external,
  range = [0, 1],
  dim = 0.18,
}: {
  text: string;
  className?: string;
  progress?: MotionValue<number>;
  /** Portion of the progress over which the scrub happens */
  range?: [number, number];
  dim?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 85%", "end 50%"],
  });
  const progress = external ?? scrollYProgress;
  const words = text.split(" ");
  const span = range[1] - range[0];

  if (reduce) {
    return <span className={`block ${className}`}>{text}</span>;
  }

  return (
    <span ref={ref} aria-label={text} role="text" className={`block ${className}`}>
      {words.map((w, i) => {
        const start = range[0] + (i / words.length) * span;
        const end = range[0] + ((i + 1) / words.length) * span;
        return (
          <Word key={`${w}-${i}`} progress={progress} range={[start, end]} dim={dim}>
            {w + (i < words.length - 1 ? " " : "")}
          </Word>
        );
      })}
    </span>
  );
}
