"use client";

import { useState } from "react";
import { Reveal } from "@/components/ui/reveal";

const workflows = [
  {
    id: "lead",
    title: "Lead → Customer",
    steps: [
      "Website enquiry",
      "Lead captured",
      "AI qualification",
      "CRM updated",
      "Sales notification",
      "Follow-up sequence",
      "Appointment",
    ],
  },
  {
    id: "onboarding",
    title: "Customer Onboarding",
    steps: [
      "Payment received",
      "Customer created",
      "Welcome email",
      "Documents requested",
      "Project created",
      "Team assigned",
      "Kickoff scheduled",
    ],
  },
  {
    id: "documents",
    title: "AI Document Processing",
    steps: [
      "Customer uploads document",
      "AI reads document",
      "Information extracted",
      "Data validated",
      "CRM/database updated",
      "Team notified",
    ],
  },
];

export function WorkflowsSection() {
  const [active, setActive] = useState(workflows[0].id);
  const current = workflows.find((w) => w.id === active) ?? workflows[0];

  return (
    <section id="workflows" className="border-y border-border bg-surface-elevated">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <Reveal>
          <h2 className="font-display text-3xl text-ink sm:text-4xl">
            What we can automate
          </h2>
        </Reveal>

        <div className="mt-8 flex flex-wrap gap-2">
          {workflows.map((w) => (
            <button
              key={w.id}
              type="button"
              onClick={() => setActive(w.id)}
              className={`rounded-md border px-4 py-2 text-sm transition-colors ${
                active === w.id
                  ? "border-accent bg-accent-soft text-accent"
                  : "border-border bg-surface text-slate hover:border-border-strong hover:text-ink"
              }`}
              aria-pressed={active === w.id}
            >
              {w.title}
            </button>
          ))}
        </div>

        <Reveal key={current.id}>
          <div className="mt-8 overflow-hidden rounded-xl border border-border bg-surface p-5 sm:p-8">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-slate-muted">
                  Product demo
                </p>
                <h3 className="mt-1 text-lg font-semibold text-ink">
                  {current.title}
                </h3>
              </div>
              <span className="hidden rounded-md border border-border bg-surface-elevated px-2 py-1 text-xs text-slate sm:inline">
                Automated pipeline
              </span>
            </div>
            <div className="flex flex-col gap-2 md:flex-row md:flex-wrap md:items-center md:gap-0">
              {current.steps.map((step, i) => (
                <div key={step} className="flex items-center gap-2 md:gap-0">
                  <div
                    className="workflow-node min-w-0 flex-1 rounded-lg border border-border bg-surface-elevated px-3 py-2.5 text-sm font-medium text-ink shadow-sm md:flex-none md:px-4"
                    style={{ animationDelay: `${i * 70}ms` }}
                  >
                    {step}
                  </div>
                  {i < current.steps.length - 1 && (
                    <span
                      className="mx-1 hidden text-accent md:mx-2 md:inline"
                      aria-hidden
                    >
                      →
                    </span>
                  )}
                  {i < current.steps.length - 1 && (
                    <span className="text-accent md:hidden" aria-hidden>
                      ↓
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
