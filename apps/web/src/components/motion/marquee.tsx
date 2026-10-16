"use client";

import { useRef, type ReactNode } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";

/**
 * Infinite horizontal marquee. Content is rendered twice and wrapped at 50%.
 * Hovering eases the speed down rather than stopping abruptly.
 */
export function Marquee({
  children,
  speed = 40,
  reverse = false,
  hoverSpeed = 0.15,
  className = "",
  gapClass = "gap-3",
}: {
  children: ReactNode;
  /** px per second */
  speed?: number;
  reverse?: boolean;
  /** Speed multiplier while hovered */
  hoverSpeed?: number;
  className?: string;
  gapClass?: string;
}) {
  const reduce = useReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);
  const offset = useMotionValue(0);
  const factorTarget = useMotionValue(1);
  const factor = useSpring(factorTarget, { stiffness: 60, damping: 20 });
  const x = useTransform(offset, (v) => `${v}px`);

  useAnimationFrame((_, delta) => {
    if (reduce || !trackRef.current) return;
    const half = trackRef.current.scrollWidth / 2;
    if (!half) return;
    const dir = reverse ? 1 : -1;
    let next = offset.get() + dir * speed * factor.get() * (delta / 1000);
    if (next <= -half) next += half;
    if (next > 0) next -= half;
    offset.set(next);
  });

  return (
    <div
      className={`relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)] ${className}`}
      onPointerEnter={() => factorTarget.set(hoverSpeed)}
      onPointerLeave={() => factorTarget.set(1)}
    >
      <motion.div ref={trackRef} className={`flex w-max ${gapClass}`} style={{ x }}>
        <div className={`flex shrink-0 ${gapClass}`}>{children}</div>
        <div className={`flex shrink-0 ${gapClass}`} aria-hidden>
          {children}
        </div>
      </motion.div>
    </div>
  );
}
