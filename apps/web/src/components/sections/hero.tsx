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
import { HeroAutomation } from "./hero-automation";

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
          <motion.p
            className="eyebrow eyebrow-pill gap-2 rounded-2xl px-3.5 py-2 text-[10px] leading-relaxed tracking-[0.12em] text-balance sm:gap-[0.6rem] sm:rounded-full sm:px-4 sm:py-[0.45rem] sm:text-[0.72rem] sm:leading-normal sm:tracking-[0.18em]"
            {...rise(0)}
          >
            Automation · UI/UX · Custom solutions · Online presence
          </motion.p>
          <h1 className="mt-7 font-display text-5xl leading-[1.02] text-ink sm:text-7xl lg:text-[5.5rem]">
            <SplitText
              onMount
              delay={0.2}
              text="Your business, on autopilot."
              highlight={["autopilot"]}
            />
          </h1>
          <motion.p
            className="mt-7 max-w-xl text-lg leading-relaxed text-slate sm:text-xl"
            {...rise(0.55)}
          >
            Less admin. More customers. Systems that keep up.
          </motion.p>
          <motion.div
            className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
            {...rise(0.7)}
          >
            <Magnetic>
              <Button
                arrow
                className="w-full sm:w-auto"
                onClick={() => openChat("hero_primary")}
              >
                Check Your Idea With Our AI
              </Button>
            </Magnetic>
            <Button
              variant="secondary"
              onClick={() => handlePrimaryCta("hero_secondary")}
            >
              Book a Free Discovery Call
            </Button>
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
            <HeroAutomation />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
