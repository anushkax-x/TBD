"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";

const faqs = [
  {
    q: "Do I need to replace my existing software?",
    a: "No. We usually work with the tools you already use and connect them where possible.",
  },
  {
    q: "Do you build custom software?",
    a: "Yes. If existing tools can't solve the problem, we can build a custom solution.",
  },
  {
    q: "Can you work with businesses in the US and UK?",
    a: "Yes.",
  },
  {
    q: "How much does a project cost?",
    a: "Projects vary based on complexity. We start by understanding the workflow and recommend the smallest solution capable of producing meaningful impact.",
  },
  {
    q: "Do you provide ongoing support?",
    a: "Yes. We can provide ongoing maintenance, improvements and technical support.",
  },
  {
    q: "Do you only work with large companies?",
    a: "No. We focus on growing businesses that need better systems but don't want to build an in-house engineering team.",
  },
];

export function FaqSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="border-y border-border bg-surface-elevated">
      <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8">
        <Reveal>
          <h2 className="font-display text-3xl text-ink sm:text-4xl">
            Frequently asked questions
          </h2>
        </Reveal>
        <div className="mt-10 divide-y divide-border border-y border-border">
          {faqs.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.q}>
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-4 py-5 text-left"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? null : i)}
                >
                  <span className="text-base font-medium text-ink">{item.q}</span>
                  <ChevronDown
                    className={`h-4 w-4 shrink-0 text-slate transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                    aria-hidden
                  />
                </button>
                {isOpen && (
                  <p className="pb-5 text-sm leading-relaxed text-slate">{item.a}</p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
