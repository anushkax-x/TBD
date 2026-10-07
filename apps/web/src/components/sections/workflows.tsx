"use client";

import { useEffect, useState } from "react";
import { Reveal } from "@/components/ui/reveal";

const workflows = [
  {
    id: "shopify",
    label: "Shopify store",
    title: "Abandoned cart recovery",
    summary:
      "Turn unfinished checkouts into orders — without chasing them by hand.",
    steps: [
      "Cart abandoned",
      "Wait window",
      "Reminder email / SMS",
      "Discount if needed",
      "Customer returns",
      "Order completed",
      "Team notified",
    ],
  },
  {
    id: "orders",
    label: "DTC brand",
    title: "Order → fulfilment",
    summary:
      "From payment to shipment updates without copy-pasting between tools.",
    steps: [
      "Order placed",
      "Payment confirmed",
      "Inventory updated",
      "Fulfilment ticket",
      "Shipping label",
      "Tracking email",
      "Review request",
    ],
  },
  {
    id: "leads",
    label: "sales team",
    title: "Lead capture → follow-up",
    summary:
      "Website enquiries land in the right place and get a reply before they go cold.",
    steps: [
      "Form submitted",
      "Lead scored",
      "CRM created",
      "Owner assigned",
      "Welcome email",
      "Follow-up task",
      "Deal updated",
    ],
  },
  {
    id: "onboarding",
    label: "service business",
    title: "Client onboarding",
    summary:
      "Payment to kickoff without chasing docs, accounts, or internal handoffs.",
    steps: [
      "Payment received",
      "Account created",
      "Docs requested",
      "Intake complete",
      "Project created",
      "Team assigned",
      "Kickoff sent",
    ],
  },
  {
    id: "support",
    label: "support desk",
    title: "Support & returns",
    summary:
      "Handle “Where’s my order?” and returns without burying your inbox.",
    steps: [
      "Customer message",
      "Order looked up",
      "AI drafts reply",
      "Tracking / return link",
      "Ticket updated",
      "Refund if needed",
      "CRM note saved",
    ],
  },
  {
    id: "experience",
    label: "product team",
    title: "UI & UX redesign",
    summary:
      "From confusing screens to a clear journey that converts and feels on-brand.",
    steps: [
      "Audit current UI",
      "Map user journeys",
      "Simplify layout",
      "Refine visual system",
      "Build responsive UI",
      "Validate with users",
      "Ship & iterate",
    ],
  },
];

const ROTATE_MS = 5000;

export function WorkflowsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const onChange = () => setReduceMotion(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (paused || reduceMotion) return;
    const id = window.setInterval(() => {
      setActiveIndex((i) => (i + 1) % workflows.length);
    }, ROTATE_MS);
    return () => window.clearInterval(id);
  }, [paused, reduceMotion]);

  const current = workflows[activeIndex];

  return (
    <section id="workflows" className="border-y border-border bg-surface-elevated">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <Reveal>
          <h2 className="font-display text-3xl text-ink sm:text-4xl">
            What a{" "}
            <span
              className="relative inline-block text-accent"
              aria-live="polite"
            >
              <span
                key={current.id}
                className={
                  reduceMotion ? undefined : "inline-block animate-fade-up"
                }
              >
                {current.label}
              </span>
            </span>{" "}
            can automate
          </h2>
          <p className="mt-4 max-w-2xl text-base text-slate">
            Most busywork sits between the tools you already use. These are the
            workflows owners ask us to fix first — pick one or watch them rotate.
          </p>
        </Reveal>

        <div
          className="mt-8 flex flex-wrap gap-2"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
              setPaused(false);
            }
          }}
        >
          {workflows.map((w, i) => (
            <button
              key={w.id}
              type="button"
              onClick={() => {
                setActiveIndex(i);
                setPaused(true);
              }}
              className={`rounded-md border px-4 py-2 text-sm transition-colors ${
                activeIndex === i
                  ? "border-accent bg-accent-soft text-accent"
                  : "border-border bg-surface text-slate hover:border-border-strong hover:text-ink"
              }`}
              aria-pressed={activeIndex === i}
            >
              {w.title}
            </button>
          ))}
        </div>

        <div
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <Reveal key={current.id}>
            <div className="mt-8 overflow-hidden rounded-xl border border-border bg-surface p-5 sm:p-8">
              <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-muted">
                    Example · {current.label}
                  </p>
                  <h3 className="mt-1 text-lg font-semibold text-ink">
                    {current.title}
                  </h3>
                  <p className="mt-2 max-w-xl text-sm text-slate">
                    {current.summary}
                  </p>
                </div>
                <span className="hidden shrink-0 rounded-md border border-border bg-surface-elevated px-2 py-1 text-xs text-slate sm:inline">
                  Connected steps
                </span>
              </div>

              {/* Mobile: clean vertical timeline */}
              <ol className="space-y-0 md:hidden">
                {current.steps.map((step, i) => (
                  <li key={`${current.id}-${i}`} className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-border bg-surface-elevated text-[11px] font-semibold text-accent">
                        {i + 1}
                      </span>
                      {i < current.steps.length - 1 && (
                        <span className="my-1 w-px min-h-[12px] flex-1 bg-border" />
                      )}
                    </div>
                    <p
                      className="workflow-node mb-3 rounded-lg border border-border bg-surface-elevated px-3 py-2.5 text-sm font-medium text-ink"
                      style={{ animationDelay: `${i * 70}ms` }}
                    >
                      {step}
                    </p>
                  </li>
                ))}
              </ol>

              {/* Desktop: single-row flow that wraps with real gaps */}
              <ol className="hidden flex-wrap items-stretch gap-x-2 gap-y-4 md:flex">
                {current.steps.map((step, i) => (
                  <li
                    key={`${current.id}-d-${i}`}
                    className="flex items-center gap-2"
                  >
                    <div
                      className="workflow-node inline-flex min-h-[44px] max-w-[11rem] items-center rounded-lg border border-border bg-surface-elevated px-3.5 py-2.5 text-sm font-medium leading-snug text-ink"
                      style={{ animationDelay: `${i * 70}ms` }}
                    >
                      {step}
                    </div>
                    {i < current.steps.length - 1 && (
                      <span className="shrink-0 text-accent" aria-hidden>
                        →
                      </span>
                    )}
                  </li>
                ))}
              </ol>

              {/* Progress dots for rotation */}
              <div
                className="mt-8 flex justify-center gap-1.5"
                role="tablist"
                aria-label="Workflow examples"
              >
                {workflows.map((w, i) => (
                  <button
                    key={w.id}
                    type="button"
                    role="tab"
                    aria-selected={activeIndex === i}
                    aria-label={w.label}
                    onClick={() => {
                      setActiveIndex(i);
                      setPaused(true);
                    }}
                    className={`h-1.5 rounded-full transition-all ${
                      activeIndex === i
                        ? "w-6 bg-accent"
                        : "w-1.5 bg-border hover:bg-border-strong"
                    }`}
                  />
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
