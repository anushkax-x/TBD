"use client";

import { BUSINESS_NAME } from "@consultancy/shared";
import { motion } from "motion/react";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { EASE_OUT } from "@/components/motion/easing";

const services = [
  { href: "#services", label: "Workflow automation" },
  { href: "#services", label: "UI / UX" },
  { href: "#services", label: "Manage your tech" },
  { href: "#services", label: "Grow online presence" },
];

const explore = [
  { href: "#workflows", label: "Workflows" },
  { href: "#about", label: "About" },
  { href: "#services", label: "What we build" },
  { href: "#faq", label: "FAQ" },
];

const legal = [
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
];

const columns = [
  { title: "Services", items: services },
  { title: "Explore", items: explore },
  { title: "Legal", items: legal },
];

const linkClass = "text-sm text-slate transition-colors hover:text-accent";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-hairline bg-surface text-ink">
      <div className="mx-auto max-w-6xl px-4 pt-12 sm:px-6 sm:pt-16 lg:px-8">
        <Stagger className="grid grid-cols-2 gap-10 sm:grid-cols-3">
          {columns.map((col, i) => (
            <StaggerItem
              key={col.title}
              className={i === 2 ? "col-span-2 sm:col-span-1" : ""}
            >
              <p className="eyebrow">{col.title}</p>
              <ul className="mt-5 space-y-3">
                {col.items.map((item) => (
                  <li key={item.label}>
                    <a href={item.href} className={linkClass}>
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </StaggerItem>
          ))}
        </Stagger>
      </div>

      <motion.p
        aria-hidden
        className="pointer-events-none mt-12 select-none pb-2 text-center font-display text-[21vw] font-semibold leading-[0.9] tracking-[-0.06em] sm:mt-16 sm:pb-0 sm:leading-[0.8] lg:text-[16rem]"
        style={{
          background:
            "linear-gradient(180deg, rgba(43,179,163,0.22) 0%, rgba(43,179,163,0) 85%)",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          color: "transparent",
        }}
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, ease: EASE_OUT }}
      >
        {BUSINESS_NAME}
      </motion.p>

      <div className="relative border-t border-hairline">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-5 text-xs text-slate-muted sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>
            © {year} {BUSINESS_NAME}. All rights reserved.
          </p>
          <p className="hidden font-mono uppercase tracking-[0.14em] sm:block">
            Automation · UI/UX · Custom solutions · Online presence
          </p>
        </div>
      </div>
    </footer>
  );
}
