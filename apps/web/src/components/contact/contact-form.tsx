"use client";

import { FormEvent, useState } from "react";
import { createLeadSchema } from "@consultancy/shared";
import { submitLead } from "@/lib/api";
import { useAnalytics } from "@/lib/analytics";
import { Button } from "@/components/ui/button";

const industries = [
  "Professional services",
  "Recruitment",
  "Real estate",
  "Accounting / bookkeeping",
  "Marketing agency",
  "Insurance",
  "Home services",
  "Ecommerce",
  "Consulting",
  "Other",
];

const countries = ["United States", "United Kingdom", "Other"];

type Props = {
  onSuccess?: () => void;
};

export function ContactForm({ onSuccess }: Props) {
  const { track } = useAnalytics();
  const [started, setStarted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const markStarted = () => {
    if (!started) {
      setStarted(true);
      track("contact_form_started");
    }
  };

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setFieldErrors({});

    const form = new FormData(e.currentTarget);
    const raw = {
      name: String(form.get("name") ?? ""),
      businessName: String(form.get("businessName") ?? ""),
      email: String(form.get("email") ?? ""),
      website: String(form.get("website") ?? ""),
      country: String(form.get("country") ?? ""),
      industry: String(form.get("industry") ?? ""),
      improvement: String(form.get("improvement") ?? ""),
      message: String(form.get("message") ?? ""),
      companyWebsite: String(form.get("companyWebsite") ?? ""),
    };

    const parsed = createLeadSchema.safeParse(raw);
    if (!parsed.success) {
      const next: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        const key = String(issue.path[0] ?? "form");
        if (!next[key]) next[key] = issue.message;
      }
      setFieldErrors(next);
      return;
    }

    setSubmitting(true);
    try {
      const result = await submitLead(parsed.data);
      if (!result.success) {
        setError(result.error.message);
        return;
      }
      track("contact_form_submitted");
      setSuccess(true);
      window.setTimeout(() => onSuccess?.(), 1800);
    } catch {
      setError("Unable to submit your enquiry. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (success) {
    return (
      <div
        className="rounded-lg border border-border bg-accent-soft/50 p-6 text-center"
        role="status"
      >
        <p className="font-medium text-ink">Thank you — we&apos;ve received your enquiry.</p>
        <p className="mt-2 text-sm text-slate">
          We&apos;ll be in touch shortly to schedule a discovery call.
        </p>
      </div>
    );
  }

  const fieldClass =
    "mt-1.5 w-full rounded-md border border-border bg-surface px-3 py-2.5 text-sm text-ink placeholder:text-slate-muted focus:border-accent";

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-4" onFocus={markStarted}>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="text-sm font-medium text-ink">
            Name
          </label>
          <input id="name" name="name" required className={fieldClass} autoComplete="name" />
          {fieldErrors.name && (
            <p className="mt-1 text-xs text-[var(--danger)]">{fieldErrors.name}</p>
          )}
        </div>
        <div>
          <label htmlFor="businessName" className="text-sm font-medium text-ink">
            Business name
          </label>
          <input
            id="businessName"
            name="businessName"
            required
            className={fieldClass}
            autoComplete="organization"
          />
          {fieldErrors.businessName && (
            <p className="mt-1 text-xs text-[var(--danger)]">
              {fieldErrors.businessName}
            </p>
          )}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="email" className="text-sm font-medium text-ink">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className={fieldClass}
            autoComplete="email"
          />
          {fieldErrors.email && (
            <p className="mt-1 text-xs text-[var(--danger)]">{fieldErrors.email}</p>
          )}
        </div>
        <div>
          <label htmlFor="website" className="text-sm font-medium text-ink">
            Website
          </label>
          <input
            id="website"
            name="website"
            className={fieldClass}
            placeholder="https://"
            autoComplete="url"
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="country" className="text-sm font-medium text-ink">
            Country
          </label>
          <select id="country" name="country" required className={fieldClass} defaultValue="">
            <option value="" disabled>
              Select country
            </option>
            {countries.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          {fieldErrors.country && (
            <p className="mt-1 text-xs text-[var(--danger)]">{fieldErrors.country}</p>
          )}
        </div>
        <div>
          <label htmlFor="industry" className="text-sm font-medium text-ink">
            Industry
          </label>
          <select id="industry" name="industry" className={fieldClass} defaultValue="">
            <option value="">Select industry</option>
            {industries.map((i) => (
              <option key={i} value={i}>
                {i}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="improvement" className="text-sm font-medium text-ink">
          What would you like to improve?
        </label>
        <textarea
          id="improvement"
          name="improvement"
          required
          rows={3}
          className={fieldClass}
          placeholder="e.g. Lead follow-ups, onboarding, reporting…"
        />
        {fieldErrors.improvement && (
          <p className="mt-1 text-xs text-[var(--danger)]">{fieldErrors.improvement}</p>
        )}
      </div>

      <div>
        <label htmlFor="message" className="text-sm font-medium text-ink">
          Optional message
        </label>
        <textarea id="message" name="message" rows={2} className={fieldClass} />
      </div>

      {/* Honeypot */}
      <div className="absolute -left-[9999px] opacity-0" aria-hidden="true">
        <label htmlFor="companyWebsite">Company website</label>
        <input
          id="companyWebsite"
          name="companyWebsite"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {error && (
        <p className="text-sm text-[var(--danger)]" role="alert">
          {error}
        </p>
      )}

      <Button type="submit" disabled={submitting} className="w-full sm:w-auto">
        {submitting ? "Sending…" : "Book a Discovery Call →"}
      </Button>
      <p className="text-xs text-slate-muted">
        30 minutes · No obligation · No technical knowledge required
      </p>
    </form>
  );
}
