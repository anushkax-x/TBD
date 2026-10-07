"use client";

import { useState } from "react";
import { Reveal } from "@/components/ui/reveal";

const workflows = [
  {
    id: "cart",
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
    id: "inventory",
    title: "Inventory & restocking",
    summary:
      "Know what’s running low before you oversell or lose a week of sales.",
    steps: [
      "Stock drops",
      "Threshold hit",
      "Supplier alert",
      "Reorder drafted",
      "PO approved",
      "Stock synced",
      "Storefront updated",
    ],
  },
  {
    id: "support",
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
];

export function WorkflowsSection() {
  const [active, setActive] = useState(workflows[0].id);
  const current = workflows.find((w) => w.id === active) ?? workflows[0];

  return (
    <section id="workflows" className="border-y border-border bg-surface-elevated">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <Reveal>
          <h2 className="font-display text-3xl text-ink sm:text-4xl">
            What a Shopify store can automate
          </h2>
          <p className="mt-4 max-w-2xl text-base text-slate">
            If you sell online, most of the busywork sits between the store,
            email, inventory and support. These are the workflows owners ask us
            to fix first.
          </p>
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
            <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-slate-muted">
                  Example store workflow
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
                      <span className="my-1 w-px flex-1 min-h-[12px] bg-border" />
                    )}
                  </div>
                  <p className="workflow-node mb-3 rounded-lg border border-border bg-surface-elevated px-3 py-2.5 text-sm font-medium text-ink"
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
          </div>
        </Reveal>
      </div>
    </section>
  );
}
