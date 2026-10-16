"use client";

import { useEffect } from "react";
import { X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useContact } from "./contact-provider";
import { ContactForm } from "./contact-form";

export function ContactModal() {
  const { isOpen, closeContact } = useContact();

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeContact();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [isOpen, closeContact]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center"
          role="dialog"
          aria-modal="true"
          aria-labelledby="contact-modal-title"
          data-lenis-prevent
        >
          <motion.button
            type="button"
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            aria-label="Close dialog"
            onClick={closeContact}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          />
          <motion.div
            className="relative z-10 max-h-[92vh] w-full overflow-y-auto rounded-t-3xl border border-hairline bg-surface-elevated p-6 shadow-xl sm:max-w-md sm:rounded-3xl sm:p-7"
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 320, damping: 30 }}
          >
            <div className="mb-5 flex items-start justify-between gap-3">
              <div>
                <p className="eyebrow">Discovery call</p>
                <h2
                  id="contact-modal-title"
                  className="mt-1 font-display text-2xl text-ink"
                >
                  Pick a time. We&apos;ll do the rest.
                </h2>
                <p className="mt-2 text-sm text-slate">
                  Three fields. Thirty minutes. Clear next steps for your
                  business.
                </p>
              </div>
              <button
                type="button"
                onClick={closeContact}
                className="rounded-md p-2 text-slate hover:bg-surface hover:text-ink"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <ContactForm onSuccess={closeContact} />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
