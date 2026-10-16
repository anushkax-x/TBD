"use client";

import { useRef } from "react";
import { motion, useScroll } from "motion/react";
import { Reveal } from "@/components/ui/reveal";
import { GlowOrb } from "@/components/motion/glow-orb";
import { TextScrub } from "@/components/motion/text-scrub";

const proofs = [
  {
    n: "01",
    title: "You talk to who builds",
    body: "No sales relay. The same engineers who ship the work hear the problem first.",
  },
  {
    n: "02",
    title: "Operation before tooling",
    body: "We map how the work actually runs—and how the product feels to use—then recommend the smallest change that helps.",
  },
  {
    n: "03",
    title: "Lean by default",
    body: "Specialists join only when needed — you don’t fund a full in-house engineering or design bench.",
  },
];

function HandoffVisual() {
  return (
    <svg
      viewBox="0 0 320 240"
      className="mx-auto h-auto w-full max-w-md text-accent"
      aria-hidden
    >
      <defs>
        <radialGradient id="about-glow" cx="50%" cy="45%" r="55%">
          <stop offset="0%" stopColor="rgba(43, 179, 163, 0.2)" />
          <stop offset="100%" stopColor="rgba(43, 179, 163, 0)" />
        </radialGradient>
      </defs>
      <rect width="320" height="240" fill="url(#about-glow)" />

      {/* Old path — faded, broken */}
      <g className="about-old-path" opacity="0.35">
        <text
          x="24"
          y="28"
          fill="currentColor"
          className="fill-slate-muted"
          fontSize="9"
          letterSpacing="0.12em"
        >
          TYPICAL HANDOFF
        </text>
        {[
          { x: 36, label: "Sales" },
          { x: 118, label: "PM" },
          { x: 200, label: "Dev" },
        ].map((n, i) => (
          <g key={n.label}>
            <circle
              cx={n.x}
              cy="56"
              r="14"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.25"
              className="stroke-slate-muted"
            />
            <text
              x={n.x}
              y="59"
              textAnchor="middle"
              fill="currentColor"
              fontSize="8"
              className="fill-slate-muted"
            >
              {n.label}
            </text>
            {i < 2 && (
              <line
                x1={n.x + 16}
                y1="56"
                x2={n.x + 66}
                y2="56"
                stroke="currentColor"
                strokeWidth="1"
                strokeDasharray="3 3"
                className="stroke-slate-muted about-dash"
              />
            )}
          </g>
        ))}
        <g className="about-strike" stroke="currentColor" strokeWidth="1.75">
          <path d="M40 28 L220 84" className="stroke-slate-muted" />
          <path d="M220 28 L40 84" className="stroke-slate-muted" />
        </g>
      </g>

      {/* Direct path */}
      <text
        x="24"
        y="120"
        fill="currentColor"
        fontSize="9"
        letterSpacing="0.12em"
        className="fill-accent"
      >
        WITH FLOWMINT
      </text>

      <g className="about-direct">
        <circle
          cx="70"
          cy="168"
          r="28"
          fill="rgba(43, 179, 163, 0.12)"
          stroke="currentColor"
          strokeWidth="1.5"
          className="about-node"
        />
        <text
          x="70"
          y="165"
          textAnchor="middle"
          fill="currentColor"
          fontSize="10"
          fontWeight="600"
          className="fill-ink"
        >
          You
        </text>
        <text
          x="70"
          y="178"
          textAnchor="middle"
          fill="currentColor"
          fontSize="8"
          className="fill-slate"
        >
          Business
        </text>

        <path
          d="M102 168 H198"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeDasharray="6 5"
          className="about-link"
        />
        <circle cx="150" cy="168" r="3.5" fill="currentColor" className="about-pulse" />

        <circle
          cx="240"
          cy="168"
          r="28"
          fill="rgba(43, 179, 163, 0.18)"
          stroke="currentColor"
          strokeWidth="1.5"
          className="about-node"
          style={{ animationDelay: "0.2s" }}
        />
        <text
          x="240"
          y="165"
          textAnchor="middle"
          fill="currentColor"
          fontSize="10"
          fontWeight="600"
          className="fill-ink"
        >
          Engineers
        </text>
        <text
          x="240"
          y="178"
          textAnchor="middle"
          fill="currentColor"
          fontSize="8"
          className="fill-slate"
        >
          Who ship
        </text>
      </g>
    </svg>
  );
}

export function AboutSection() {
  const listRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ["start 85%", "end 60%"],
  });

  return (
    <section
      id="about"
      className="relative overflow-hidden border-y border-hairline bg-surface-elevated/40"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <GlowOrb className="-right-32 top-1/4" size={560} opacity={0.2} />
      </div>
      <div className="relative mx-auto grid max-w-6xl items-center gap-16 px-4 py-28 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20 lg:px-8">
        <div>
          <Reveal>
            <p className="eyebrow">Why FlowMint</p>
          </Reveal>
          <h2 className="mt-5 font-display text-4xl leading-[1.08] text-ink sm:text-5xl">
            <TextScrub text="Work directly with the engineers responsible for your solution." />
          </h2>
          <Reveal delayMs={100}>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-slate">
              A small engineering team for automation, UI/UX, custom solutions
              and online presence — not a sales funnel with builders somewhere
              downstream.
            </p>
          </Reveal>

          <ol ref={listRef} className="relative mt-12 space-y-8 pl-10">
            <span aria-hidden className="absolute bottom-2 left-[11px] top-2 w-px bg-hairline" />
            <motion.span
              aria-hidden
              className="absolute bottom-2 left-[11px] top-2 w-px origin-top bg-gradient-to-b from-accent to-accent/30"
              style={{ scaleY: scrollYProgress }}
            />
            {proofs.map((item, i) => (
              <Reveal key={item.n} delayMs={80 + i * 90}>
                <li className="relative">
                  <span className="absolute -left-10 top-0 flex h-6 w-6 items-center justify-center rounded-full border border-accent/40 bg-surface font-mono text-[10px] text-accent">
                    {item.n}
                  </span>
                  <h3 className="text-lg font-medium text-ink">{item.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate">
                    {item.body}
                  </p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>

        <Reveal delayMs={120} variant="scale" className="about-visual">
          <div className="card-glass rounded-3xl p-6 sm:p-8">
            <HandoffVisual />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
