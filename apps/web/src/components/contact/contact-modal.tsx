"use client";

import { useEffect } from "react";
import { X } from "lucide-react";
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
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, closeContact]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-modal-title"
    >
      <button
        type="button"
        className="absolute inset-0 bg-black/70"
        aria-label="Close dialog"
        onClick={closeContact}
      />
      <div className="relative z-10 max-h-[92vh] w-full overflow-y-auto rounded-t-2xl border border-border bg-surface-elevated p-6 shadow-xl sm:max-w-xl sm:rounded-2xl sm:p-8">
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <h2
              id="contact-modal-title"
              className="font-display text-2xl text-ink"
            >
              Book a Discovery Call
            </h2>
            <p className="mt-2 text-sm text-slate">
              Tell us what you&apos;re currently doing manually. We&apos;ll help
              you figure out what can be automated.
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
      </div>
    </div>
  );
}
