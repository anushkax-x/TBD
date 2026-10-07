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
      <div className="relative z-10 max-h-[92vh] w-full overflow-y-auto rounded-t-2xl border border-border bg-surface-elevated p-6 shadow-xl sm:max-w-md sm:rounded-2xl sm:p-7">
        <div className="mb-5 flex items-start justify-between gap-3">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-accent">
              Discovery call
            </p>
            <h2
              id="contact-modal-title"
              className="mt-1 font-display text-2xl text-ink"
            >
              Pick a time. We&apos;ll do the rest.
            </h2>
            <p className="mt-2 text-sm text-slate">
              Three fields. Thirty minutes. Clear next steps for your business.
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
