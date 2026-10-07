"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { BUSINESS_NAME } from "@consultancy/shared";
import { Button } from "@/components/ui/button";
import { useChat } from "@/components/chat/chat-provider";

const links = [
  { href: "#services", label: "What We Build" },
  { href: "#workflows", label: "How It Works" },
  { href: "#examples", label: "Example Solutions" },
  { href: "#about", label: "About" },
  { href: "#faq", label: "FAQ" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { openChat } = useChat();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all ${
        scrolled
          ? "border-b border-border bg-surface/95 backdrop-blur-sm"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav
        className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8"
        aria-label="Primary"
      >
        <a
          href="#top"
          className="text-xl font-semibold tracking-tight text-ink sm:text-2xl"
        >
          {BUSINESS_NAME}
        </a>

        <ul className="hidden items-center gap-6 lg:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm text-slate transition-colors hover:text-ink"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden lg:block">
          <Button onClick={() => openChat("navbar")}>
            Check Your Idea
          </Button>
        </div>

        <button
          type="button"
          className="rounded-md p-2 text-ink lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {open && (
        <div
          id="mobile-menu"
          className="border-t border-border bg-surface-elevated px-4 py-4 lg:hidden"
        >
          <ul className="space-y-3">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="block py-2 text-sm text-ink"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <Button
            className="mt-4 w-full"
            onClick={() => {
              setOpen(false);
              openChat("navbar_mobile");
            }}
          >
            Check Your Idea With Our AI
          </Button>
        </div>
      )}
    </header>
  );
}
