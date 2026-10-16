"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { Reveal } from "@/components/ui/reveal";
import { GlowOrb } from "@/components/motion/glow-orb";
import { SplitText } from "@/components/motion/split-text";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { EASE_OUT } from "@/components/motion/easing";

const faqs = [
  {
    q: "What kinds of problems are a good fit?",
    a: "Repetitive or disconnected processes, dated or confusing product UI, gaps that need a custom build, and a weak or outdated online presence. Common fits: abandoned carts, fulfilment updates, support replies, storefront or admin redesigns, internal tools, and marketing sites that need to convert better.",
  },
  {
    q: "Do I need to replace the software we already use?",
    a: "Usually not. We first look for a reliable way to connect and improve the tools you already pay for. We only recommend replacing software when it is the real constraint.",
  },
  {
    q: "Do you redesign existing websites and product interfaces?",
    a: "Yes. We modernise storefronts, checkout flows, dashboards and internal tools so they are clearer, more trustworthy and easier to use—without a full rebuild unless the underlying system truly needs it.",
  },
  {
    q: "When do you recommend a custom solution?",
    a: "When the workflow is important to your business and existing products create too many workarounds. Even then, we focus the first version on the smallest useful scope.",
  },
  {
    q: "Can you help grow our online presence?",
    a: "Yes. That can include marketing sites, landing pages and a clearer content structure so visitors understand what you offer and are more likely to enquire or buy.",
  },
  {
    q: "What happens on the first call?",
    a: "We discuss the current process, the people and tools involved, and what a successful improvement would look like. If there is a sensible fit, the next step is a scoped recommendation—not a high-pressure sales process.",
  },
  {
    q: "How long does a project take and what does it cost?",
    a: "It depends on the number of workflows, integrations and custom requirements. After discovery, you receive a clear scope and recommendation. We do not quote a generic package before understanding the problem.",
  },
  {
    q: "Do you provide ongoing support?",
    a: "Yes. Support can include monitoring, maintenance, fixing integration changes and improving the system as your process evolves.",
  },
  {
    q: "Where do you work with clients?",
    a: "The work is remote, so we can support businesses in the UK, US and other compatible time zones.",
  },
];

export function FaqSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="relative scroll-mt-24 overflow-hidden border-y border-hairline bg-surface-elevated/40"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <GlowOrb className="-left-48 bottom-0" size={520} opacity={0.14} />
      </div>
      <div className="relative mx-auto grid max-w-6xl gap-8 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20 lg:px-8 lg:py-28">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <Reveal>
            <p className="eyebrow">FAQ</p>
          </Reveal>
          <h2 className="mt-5 font-display text-[2rem] leading-[1.08] text-ink sm:text-5xl">
            <SplitText text="Frequently asked questions" />
          </h2>
        </div>
        <Stagger className="space-y-2 sm:space-y-3" stagger={0.06}>
          {faqs.map((item, i) => {
            const isOpen = open === i;
            return (
              <StaggerItem key={item.q}>
                <div
                  className={`rounded-2xl border transition-colors duration-300 ${
                    isOpen
                      ? "border-accent/35 bg-accent-soft/20"
                      : "border-hairline bg-white/[0.02] hover:border-border-strong"
                  }`}
                >
                  <button
                    type="button"
                    className="flex w-full items-center justify-between gap-4 px-4 py-4 text-left sm:px-6 sm:py-5"
                    aria-expanded={isOpen}
                    onClick={() => setOpen(isOpen ? null : i)}
                  >
                    <span className="text-[15px] font-medium text-ink sm:text-base">
                      {item.q}
                    </span>
                    <motion.span
                      className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border sm:h-8 sm:w-8 ${
                        isOpen
                          ? "border-accent/50 bg-accent text-surface"
                          : "border-hairline text-slate"
                      }`}
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 24,
                      }}
                    >
                      <ChevronDown className="h-4 w-4" aria-hidden />
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="answer"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.45, ease: EASE_OUT }}
                        className="overflow-hidden"
                      >
                        <p className="px-4 pb-4 text-sm leading-relaxed text-slate sm:px-6 sm:pb-6">
                          {item.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
