"use client";

import { useRef } from "react";
import { motion, useScroll } from "motion/react";
import { Reveal } from "@/components/ui/reveal";
import { GlowOrb } from "@/components/motion/glow-orb";
import { TextScrub } from "@/components/motion/text-scrub";
import { AboutHandoff } from "./about-handoff";

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
      <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20 lg:px-8 lg:py-28">
        <div>
          <Reveal>
            <p className="eyebrow">Why FlowMint</p>
          </Reveal>
          <h2 className="mt-5 font-display text-[2rem] leading-[1.08] text-ink sm:text-5xl">
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
            <span
              aria-hidden
              className="absolute bottom-2 left-[11px] top-2 w-px bg-hairline"
            />
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

        <Reveal delayMs={120} variant="scale">
          <div className="card-glass rounded-3xl p-5 sm:p-8">
            <AboutHandoff />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
