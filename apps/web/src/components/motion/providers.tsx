"use client";

import { type ReactNode } from "react";
import { ReactLenis } from "lenis/react";
import { MotionConfig, useReducedMotion } from "motion/react";
import { EASE } from "./easing";

const NAV_OFFSET = -96;

function SmoothScroll({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();
  if (reduce) return <>{children}</>;

  return (
    <ReactLenis
      root
      options={{
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        syncTouch: false,
        anchors: { offset: NAV_OFFSET },
        // Stops Lenis while a modal sets overflow:hidden on <html>
        autoToggle: true,
      }}
    >
      {children}
    </ReactLenis>
  );
}

export function MotionProviders({ children }: { children: ReactNode }) {
  return (
    <MotionConfig
      reducedMotion="user"
      transition={{ duration: 0.8, ease: EASE }}
    >
      <SmoothScroll>{children}</SmoothScroll>
    </MotionConfig>
  );
}
