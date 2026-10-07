"use client";

import { useEffect, useState } from "react";

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

const ROTATE_MS = 3800;

export function HeroMeshRotator() {
  const [active, setActive] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const onChange = () => setReduceMotion(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (reduceMotion) return;
    const id = window.setInterval(() => {
      setActive((i) => (i + 1) % scenes.length);
    }, ROTATE_MS);
    return () => window.clearInterval(id);
  }, [reduceMotion]);

  const scene = scenes[active];

  return (
    <div
      className="relative mb-2 overflow-hidden"
      aria-live="polite"
      aria-label={`Animation: ${scene.label}`}
    >
      <p className="mb-1 text-[10px] font-medium uppercase tracking-[0.12em] text-accent">
        {scene.label}
      </p>

      <div className="relative mx-auto aspect-[16/10] w-full max-w-[320px]">
        {scenes.map((s, sceneIndex) => {
          const isActive = sceneIndex === active;
          return (
            <svg
              key={s.id}
              viewBox="0 0 100 100"
              className={`absolute inset-0 h-full w-full transition-opacity duration-700 ${
                isActive ? "opacity-100" : "pointer-events-none opacity-0"
              }`}
              aria-hidden={!isActive}
            >
              <defs>
                <radialGradient id={`glow-${s.id}`} cx="50%" cy="45%" r="55%">
                  <stop offset="0%" stopColor="rgba(43, 179, 163, 0.22)" />
                  <stop offset="100%" stopColor="rgba(43, 179, 163, 0)" />
                </radialGradient>
              </defs>
              <rect width="100" height="100" fill={`url(#glow-${s.id})`} />

              {s.edges.map(([a, b], i) => {
                const n1 = s.nodes[a];
                const n2 = s.nodes[b];
                return (
                  <line
                    key={`${s.id}-e-${i}`}
                    x1={n1.x}
                    y1={n1.y}
                    x2={n2.x}
                    y2={n2.y}
                    stroke="rgba(43, 179, 163, 0.45)"
                    strokeWidth="0.6"
                    className={isActive && !reduceMotion ? "mesh-edge" : undefined}
                    style={
                      isActive && !reduceMotion
                        ? { animationDelay: `${i * 0.12}s` }
                        : undefined
                    }
                  />
                );
              })}

              {s.nodes.map((n, i) => (
                <circle
                  key={`${s.id}-n-${i}`}
                  cx={n.x}
                  cy={n.y}
                  r={n.r ?? 1.8}
                  fill="#2bb3a3"
                  className={isActive && !reduceMotion ? "mesh-node" : undefined}
                  style={
                    isActive && !reduceMotion
                      ? { animationDelay: `${i * 0.15}s` }
                      : undefined
                  }
                />
              ))}
            </svg>
          );
        })}
      </div>
    </div>
  );
}
