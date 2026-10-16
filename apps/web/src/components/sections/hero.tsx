"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Button } from "@/components/ui/button";
import { useContact } from "@/components/contact/contact-provider";
import { useChat } from "@/components/chat/chat-provider";
import { GlowOrb } from "@/components/motion/glow-orb";
import { Magnetic } from "@/components/motion/magnetic";
import { SplitText } from "@/components/motion/split-text";
import { EASE_OUT } from "@/components/motion/easing";
import { HeroVisual } from "./hero-visuals/hero-visual";

const rise = (delay: number) => ({
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 1, ease: EASE_OUT, delay },
});

export function HeroSection() {
  const { handlePrimaryCta } = useContact();
  const { openChat } = useChat();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const visualY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const copyY = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0.2]);

  return (
    <section
      ref={ref}
      className="relative -mt-[76px] overflow-hidden pt-[76px]"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="bg-grid absolute inset-0" />
        <GlowOrb className="-right-40 top-0" size={680} opacity={0.32} />
        <GlowOrb
          className="-left-60 top-1/2"
          size={520}
          opacity={0.18}
          duration={24}
        />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-surface" />
      </div>

      <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 pb-12 pt-10 sm:px-6 sm:pb-20 sm:pt-16 lg:gap-14 lg:min-h-[88vh] lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:px-8 lg:pb-28 lg:pt-20">
        <motion.div style={{ y: copyY, opacity: fade }}>
          {/* Phones: compact chips. sm+: single pill */}
          <motion.ul
            className="flex flex-wrap gap-1.5 sm:hidden"
            aria-label="Services"
            {...rise(0)}
          >
            {["Automation", "UI/UX", "Custom solutions", "Online presence"].map(
              (s) => (
                <li
                  key={s}
                  className="rounded-full border border-accent/30 bg-accent-soft/30 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.1em] text-accent"
                >
                  {s}
                </li>
              ),
            )}
          </motion.ul>
          <motion.p
            className="eyebrow eyebrow-pill hidden sm:inline-flex"
            {...rise(0)}
          >
            Automation · UI/UX · Custom solutions · Online presence
          </motion.p>
          <h1 className="mt-6 font-display text-[3.4rem] leading-[0.98] text-ink sm:mt-7 sm:text-7xl sm:leading-[1.02] lg:text-[5.5rem]">
            <SplitText
              onMount
              delay={0.2}
              text="Your business, on autopilot."
              highlight={["autopilot"]}
            />
          </h1>
          <motion.p
            className="mt-5 max-w-xl text-[17px] leading-relaxed text-slate sm:mt-7 sm:text-xl"
            {...rise(0.55)}
          >
            Less admin. More customers. Systems that keep up.
          </motion.p>
          <motion.div
            className="mt-8 flex flex-col items-center gap-4 sm:mt-9 sm:flex-row sm:gap-3"
            {...rise(0.7)}
          >
            <Magnetic className="w-full sm:w-auto">
              <Button
                arrow
                className="w-full py-3.5 text-[15px] sm:w-auto sm:py-3 sm:text-sm"
                onClick={() => openChat("hero_primary")}
              >
                Check Your Idea With Our AI
              </Button>
            </Magnetic>
            {/* Phones: quiet text link (navbar already has "Book a call") */}
            <button
              type="button"
              onClick={() => handlePrimaryCta("hero_secondary")}
              className="text-sm font-medium text-ink-soft underline decoration-accent/50 underline-offset-4 sm:hidden"
            >
              or book a free discovery call
            </button>
            <span className="hidden sm:inline-flex">
              <Button
                variant="secondary"
                onClick={() => handlePrimaryCta("hero_secondary")}
              >
                Book a Free Discovery Call
              </Button>
            </span>
          </motion.div>
        </motion.div>

        <motion.div
          style={{ y: visualY }}
          aria-label="Business systems visualization"
        >
          <motion.div
            className="card-glass rounded-3xl p-5 sm:p-8"
            initial={{ opacity: 0, scale: 0.92, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.3, ease: EASE_OUT, delay: 0.45 }}
          >
            <HeroVisual />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
