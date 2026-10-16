"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

type MeshScene = {
  id: string;
  label: string;
  nodes: { x: number; y: number; r?: number }[];
  edges: [number, number][];
};

/** Constellation scenes — same visual language as the FlowMint intro video */
const scenes: MeshScene[] = [
  {
    id: "system",
    label: "Connected systems",
    nodes: [
      { x: 50, y: 18 },
      { x: 28, y: 32 },
      { x: 72, y: 30 },
      { x: 18, y: 52 },
      { x: 50, y: 48 },
      { x: 82, y: 54 },
      { x: 32, y: 72 },
      { x: 58, y: 78 },
      { x: 78, y: 76 },
    ],
    edges: [
      [0, 1],
      [0, 2],
      [1, 3],
      [1, 4],
      [2, 4],
      [2, 5],
      [3, 6],
      [4, 6],
      [4, 7],
      [5, 8],
      [6, 7],
      [7, 8],
    ],
  },
  {
    id: "growth",
    label: "Performance growth",
    nodes: [
      { x: 14, y: 78 },
      { x: 28, y: 62 },
      { x: 42, y: 54 },
      { x: 56, y: 40 },
      { x: 70, y: 28 },
      { x: 84, y: 16 },
      { x: 14, y: 88 },
      { x: 84, y: 88 },
    ],
    edges: [
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 4],
      [4, 5],
      [0, 6],
      [6, 7],
      [5, 7],
    ],
  },
  {
    id: "workflow",
    label: "Workflow automation",
    nodes: [
      { x: 12, y: 50 },
      { x: 30, y: 50 },
      { x: 48, y: 34 },
      { x: 48, y: 66 },
      { x: 66, y: 50 },
      { x: 84, y: 50 },
      { x: 48, y: 18 },
      { x: 48, y: 82 },
    ],
    edges: [
      [0, 1],
      [1, 2],
      [1, 3],
      [2, 4],
      [3, 4],
      [4, 5],
      [2, 6],
      [3, 7],
    ],
  },
  {
    id: "optimize",
    label: "Process optimization",
    nodes: [
      { x: 50, y: 16 },
      { x: 74, y: 28 },
      { x: 84, y: 52 },
      { x: 74, y: 76 },
      { x: 50, y: 86 },
      { x: 26, y: 76 },
      { x: 16, y: 52 },
      { x: 26, y: 28 },
      { x: 50, y: 50, r: 3.2 },
    ],
    edges: [
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 4],
      [4, 5],
      [5, 6],
      [6, 7],
      [7, 0],
      [0, 8],
      [2, 8],
      [4, 8],
      [6, 8],
    ],
  },
];

const ROTATE_MS = 4200;

export function HeroMeshRotator() {
  const [active, setActive] = useState(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) return;
    const id = window.setInterval(() => {
      setActive((i) => (i + 1) % scenes.length);
    }, ROTATE_MS);
    return () => window.clearInterval(id);
  }, [reduceMotion]);

  const scene = scenes[active];

  return (
    <div className="relative" aria-live="polite" aria-label={`Animation: ${scene.label}`}>
      <div className="flex items-center justify-between">
        <AnimatePresence mode="wait">
          <motion.p
            key={scene.id}
            className="eyebrow"
            initial={{ opacity: 0, y: 8, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -8, filter: "blur(4px)" }}
            transition={{ duration: 0.4 }}
          >
            {scene.label}
          </motion.p>
        </AnimatePresence>
        <div className="flex gap-1.5" aria-hidden>
          {scenes.map((s, i) => (
            <span
              key={s.id}
              className={`h-1 rounded-full transition-all duration-500 ${
                i === active ? "w-5 bg-accent" : "w-1.5 bg-border-strong"
              }`}
            />
          ))}
        </div>
      </div>

      <div className="relative mx-auto mt-4 aspect-[16/11] w-full">
        <AnimatePresence>
          <motion.svg
            key={scene.id}
            viewBox="0 0 100 100"
            className="absolute inset-0 h-full w-full"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.04 }}
            transition={{ duration: 0.8 }}
            aria-hidden
          >
            <defs>
              <radialGradient id={`glow-${scene.id}`} cx="50%" cy="50%" r="55%">
                <stop offset="0%" stopColor="rgba(43, 179, 163, 0.22)" />
                <stop offset="100%" stopColor="rgba(43, 179, 163, 0)" />
              </radialGradient>
            </defs>
            <rect width="100" height="100" fill={`url(#glow-${scene.id})`} />

            {scene.edges.map(([a, b], i) => {
              const n1 = scene.nodes[a];
              const n2 = scene.nodes[b];
              return (
                <motion.line
                  key={`${scene.id}-e-${i}`}
                  x1={n1.x}
                  y1={n1.y}
                  x2={n2.x}
                  y2={n2.y}
                  stroke="rgba(43, 179, 163, 0.5)"
                  strokeWidth="0.5"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 0.9, delay: 0.1 + i * 0.06, ease: "easeOut" }}
                />
              );
            })}

            {scene.nodes.map((n, i) => (
              <motion.circle
                key={`${scene.id}-n-${i}`}
                cx={n.x}
                cy={n.y}
                r={n.r ?? 1.7}
                fill="#2bb3a3"
                className={reduceMotion ? undefined : "mesh-node"}
                style={{ animationDelay: `${i * 0.15}s` }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
              />
            ))}
          </motion.svg>
        </AnimatePresence>
      </div>
    </div>
  );
}
