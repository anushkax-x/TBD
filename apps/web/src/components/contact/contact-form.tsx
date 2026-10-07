"use client";

import { FormEvent, useMemo, useState } from "react";
import { CalendarClock } from "lucide-react";
import { createLeadSchema } from "@consultancy/shared";
import { submitLead } from "@/lib/api";
import { useAnalytics } from "@/lib/analytics";
import { Button } from "@/components/ui/button";

type Props = {
  onSuccess?: () => void;
};

function minDateValue() {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  d.setHours(0, 0, 0, 0);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

function buildPreferredAt(date: string, time: string): string {
  return new Date(`${date}T${time}:00`).toISOString();
}

export function ContactForm({ onSuccess }: Props) {
  const { track } = useAnalytics();
  const [started, setStarted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const minDate = useMemo(() => minDateValue(), []);

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
    const nextErrors: Record<string, string> = {};
    if (!date) nextErrors.preferredAt = "Pick a date";
    else if (!time) nextErrors.preferredAt = "Pick a time";
    if (Object.keys(nextErrors).length) {
      setFieldErrors(nextErrors);
      return;
    }

    const raw = {
      name: String(form.get("name") ?? ""),
      email: String(form.get("email") ?? ""),
      note: String(form.get("note") ?? ""),
      preferredAt: buildPreferredAt(date, time),
      companyWebsite: String(form.get("companyWebsite") ?? ""),
    };

    const parsed = createLeadSchema.safeParse(raw);
    if (!parsed.success) {
      for (const issue of parsed.error.issues) {
        const key = String(issue.path[0] ?? "form");
        if (!nextErrors[key]) nextErrors[key] = issue.message;
      }
      setFieldErrors(nextErrors);
      return;
    }

    setSubmitting(true);
    try {
      const result = await submitLead({
        ...parsed.data,
        improvement: parsed.data.note,
      });
      if (!result.success) {
        setError(result.error.message);
        return;
      }
      track("contact_form_submitted");
      setSuccess(true);
      window.setTimeout(() => onSuccess?.(), 2000);
    } catch {
      setError("Unable to book your call. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (success) {
    return (
      <div
        className="rounded-xl border border-accent/30 bg-accent-soft/40 px-6 py-8 text-center"
        role="status"
      >
        <p className="font-display text-xl text-ink">You&apos;re on the list.</p>
        <p className="mt-2 text-sm text-slate">
          We&apos;ll confirm your discovery call shortly.
        </p>
      </div>
    );
  }

  const fieldClass =
    "mt-1.5 w-full rounded-lg border border-border bg-surface px-3.5 py-3 text-sm text-ink placeholder:text-slate-muted transition-colors focus:border-accent focus:outline-none";

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="space-y-5"
      onFocus={markStarted}
    >
      <div>
        <label htmlFor="name" className="text-sm font-medium text-ink">
          Name
        </label>
        <input
          id="name"
          name="name"
          required
          className={fieldClass}
          autoComplete="name"
          placeholder="Alex"
        />
        {fieldErrors.name && (
          <p className="mt-1 text-xs text-[var(--danger)]">{fieldErrors.name}</p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="text-sm font-medium text-ink">
          Work email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className={fieldClass}
          autoComplete="email"
          placeholder="alex@company.com"
        />
        {fieldErrors.email && (
          <p className="mt-1 text-xs text-[var(--danger)]">{fieldErrors.email}</p>
        )}
      </div>

      <div>
        <div className="mb-1.5 flex items-center justify-between gap-2">
          <label htmlFor="preferred-date" className="text-sm font-medium text-ink">
            Date &amp; time
          </label>
          <span className="text-xs text-slate-muted">30 min · local time</span>
        </div>

        <div className="overflow-hidden rounded-xl border border-border bg-surface">
          <div className="flex items-center gap-3 border-b border-border px-3.5 py-3">
            <CalendarClock
              className="h-4 w-4 shrink-0 text-accent"
              aria-hidden
            />
            <div className="min-w-0 flex-1">
              <p className="text-[11px] font-medium uppercase tracking-wide text-slate-muted">
                {date ? "1 · Date selected" : "1 · Choose a date"}
              </p>
              <input
                id="preferred-date"
                type="date"
                required
                min={minDate}
                value={date}
                onChange={(e) => {
                  setDate(e.target.value);
                  setTime("");
                }}
                className="datetime-theme mt-1 w-full border-0 bg-transparent p-0 text-sm text-ink focus:outline-none"
              />
            </div>
          </div>

          <div
            className={`grid transition-[grid-template-rows] duration-300 ease-out ${
              date ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
            }`}
          >
            <div className="overflow-hidden">
              <div className="flex items-center gap-3 px-3.5 py-3">
                <span
                  className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-accent/50 text-[9px] font-bold text-accent"
                  aria-hidden
                >
                  2
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-[11px] font-medium uppercase tracking-wide text-slate-muted">
                    2 · Choose a time
                  </p>
                  <input
                    id="preferred-time"
                    type="time"
                    aria-label="Choose a time"
                    required={Boolean(date)}
                    step={900}
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    disabled={!date}
                    className="datetime-theme mt-1 w-full border-0 bg-transparent p-0 text-sm text-ink focus:outline-none disabled:opacity-40"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {fieldErrors.preferredAt && (
          <p className="mt-1.5 text-xs text-[var(--danger)]">
            {fieldErrors.preferredAt}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="note" className="text-sm font-medium text-ink">
          What should we cover?{" "}
          <span className="font-normal text-slate-muted">(optional)</span>
        </label>
        <input
          id="note"
          name="note"
          className={fieldClass}
          placeholder="e.g. cart recovery, inventory alerts…"
          maxLength={500}
        />
      </div>

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

      <Button type="submit" disabled={submitting} className="w-full">
        {submitting ? "Booking…" : "Reserve my call →"}
      </Button>
      <p className="text-center text-xs text-slate-muted">
        Free · 30 minutes · No pitch deck required
      </p>
    </form>
  );
}
