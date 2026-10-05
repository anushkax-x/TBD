"use client";

import { Reveal } from "@/components/ui/reveal";
import { useAnalytics } from "@/lib/analytics";

const projects = [
  {
    title: "Lead Management System",
    problem: "Sales teams manually manage website enquiries and follow-ups.",
    solution: "Automated lead capture + CRM + qualification + follow-up.",
    tech: "Next.js · Node.js · PostgreSQL · n8n · AI",
  },
  {
    title: "Automated Client Onboarding",
    problem: "New customers require multiple manual steps.",
    solution:
      "Payment → customer creation → document collection → project creation → team assignment.",
    tech: "Node.js · Stripe · CRM · Email automation",
  },
  {
    title: "Business Intelligence Dashboard",
    problem:
      "Business owners rely on spreadsheets to understand sales performance.",
    solution:
      "Centralized dashboard showing leads, conversion rate, revenue, pipeline and performance.",
    tech: "Next.js · PostgreSQL · Analytics APIs",
  },
  {
    title: "AI Document Processing",
    problem: "Employees manually read and enter information from documents.",
    solution:
      "AI extracts structured information and automatically updates internal systems.",
    tech: "AI APIs · Node.js · Database integrations",
  },
];

export function ExamplesSection() {
  const { track } = useAnalytics();

  return (
    <section id="examples" className="border-y border-border bg-surface-elevated">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">
            What we can build
          </p>
          <h2 className="mt-3 font-display text-3xl text-ink sm:text-4xl">
            Practical systems built around real business workflows.
          </h2>
          <p className="mt-3 max-w-2xl text-sm text-slate">
            These examples show the types of problems we can solve. Every
            implementation is scoped around the tools, team and process you
            already have.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {projects.map((p, i) => (
            <Reveal key={p.title} delayMs={i * 50}>
              <article
                className="h-full rounded-xl border border-border bg-surface p-6 transition-colors hover:border-border-strong"
                onMouseEnter={() =>
                  track("example_project_viewed", { project: p.title })
                }
              >
                <span className="inline-flex rounded-md border border-border bg-surface-elevated px-2 py-0.5 text-[11px] font-medium uppercase tracking-wide text-slate-muted">
                  Example capability
                </span>
                <h3 className="mt-4 text-lg font-semibold text-ink">{p.title}</h3>
                <p className="mt-4 text-sm">
                  <span className="font-medium text-ink">Problem: </span>
                  <span className="text-slate">{p.problem}</span>
                </p>
                <p className="mt-2 text-sm">
                  <span className="font-medium text-ink">Solution: </span>
                  <span className="text-slate">{p.solution}</span>
                </p>
                {p.tech && (
                  <p className="mt-4 text-xs text-slate-muted">{p.tech}</p>
                )}
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
