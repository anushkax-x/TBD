"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "motion/react";
import { Button } from "@/components/ui/button";
import { useContact } from "@/components/contact/contact-provider";
import { Logo } from "@/components/layout/logo";
import { EASE_OUT } from "@/components/motion/easing";

const links = [
  { href: "#services", label: "What We Build" },
  { href: "#workflows", label: "Workflows" },
  { href: "#about", label: "Why Us" },
  { href: "#faq", label: "FAQ" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const { handlePrimaryCta } = useContact();
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 12);
    if (y <= 240 || open) setHidden(false);
    else if (y > prev) setHidden(true);
    else if (y < prev) setHidden(false);
  });

  return (
    <motion.header
      className="sticky top-0 z-50 px-3 pt-3 sm:px-4"
      animate={{ y: hidden ? "-120%" : "0%" }}
      transition={{ duration: 0.45, ease: EASE_OUT }}
    >
      <nav
        className={`mx-auto flex max-w-5xl items-center justify-between rounded-full border px-4 py-2.5 transition-all duration-300 sm:px-5 ${
          scrolled || open
            ? "border-hairline bg-surface/70 shadow-[0_12px_40px_-20px_rgba(0,0,0,0.9)] backdrop-blur-xl"
            : "border-transparent bg-transparent"
        }`}
        aria-label="Primary"
      >
        <a href="#top" className="inline-flex items-center" aria-label="FlowMint home">
          <Logo size={30} priority />
        </a>

        <ul
          className="hidden items-center gap-1 lg:flex"
          onMouseLeave={() => setHovered(null)}
        >
          {links.map((link) => (
            <li key={link.href} className="relative">
              <a
                href={link.href}
                onMouseEnter={() => setHovered(link.href)}
                className="relative z-10 block rounded-full px-4 py-2 text-sm text-slate transition-colors hover:text-ink"
              >
                {link.label}
              </a>
              {hovered === link.href && (
                <motion.span
                  layoutId="nav-hover"
                  className="absolute inset-0 rounded-full bg-white/[0.06]"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
            </li>
          ))}
        </ul>

        <div className="hidden lg:block">
          <Button className="px-5 py-2.5" arrow onClick={() => handlePrimaryCta("navbar")}>
            Book a Discovery Call
          </Button>
        </div>

        <button
          type="button"
          className="rounded-full p-2 text-ink lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="card-glass mx-auto mt-2 max-w-5xl overflow-hidden rounded-3xl lg:hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: EASE_OUT }}
          >
            <motion.ul
              className="space-y-1 px-5 pt-4"
              initial="hidden"
              animate="show"
              variants={{ show: { transition: { staggerChildren: 0.05, delayChildren: 0.1 } } }}
            >
              {links.map((link) => (
                <motion.li
                  key={link.href}
                  variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}
                >
                  <a
                    href={link.href}
                    className="block py-2.5 text-base text-ink"
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </motion.ul>
            <div className="px-5 pb-5">
              <Button
                className="mt-3 w-full"
                arrow
                onClick={() => {
                  setOpen(false);
                  handlePrimaryCta("navbar_mobile");
                }}
              >
                Book a Discovery Call
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
