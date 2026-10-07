"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";

const faqs = [
  {
    q: "What kinds of problems are a good fit?",
    a: "Repetitive or disconnected processes across Shopify and other tools, and product surfaces that feel dated or hard to use. Common fits: abandoned carts, fulfilment updates, inventory alerts, support replies, and storefront or admin UI that needs a clearer experience.",
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
    q: "When do you recommend custom software?",
    a: "When the workflow is important to your business and existing products create too many workarounds. Even then, we focus the first version on the smallest useful scope.",
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
