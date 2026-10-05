import { Reveal } from "@/components/ui/reveal";

const problems = [
  {
    title: "Manual data entry",
    body: "Your team spends hours moving information between spreadsheets, emails, CRMs and other tools.",
  },
  {
    title: "Missed follow-ups",
    body: "Leads fall through the cracks because nobody has time to follow up consistently.",
  },
  {
    title: "Repetitive admin",
    body: "Your team spends valuable time doing work software could handle automatically.",
  },
  {
    title: "Disconnected tools",
    body: "Your website, CRM, payments, email and internal systems don't communicate.",
  },
  {
    title: "Manual reporting",
    body: "Someone spends hours every week compiling reports and spreadsheets.",
  },
  {
    title: "Customer onboarding",
    body: "New customers require a dozen manual steps before work can begin.",
  },
];

export function ProblemSection() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
      <Reveal>
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">
          Where we create value
        </p>
        <h2 className="font-display text-3xl text-ink sm:text-4xl">
          If work depends on someone remembering the next step, the process is
          costing you.
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate">
          We look for the repeated tasks, handoffs and disconnected tools that
          create delays, mistakes and missed opportunities.
        </p>
      </Reveal>
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {problems.map((p, i) => (
          <Reveal key={p.title} delayMs={i * 40}>
            <article className="h-full rounded-xl border border-border bg-surface-elevated p-5 transition-colors hover:border-border-strong">
              <h3 className="text-base font-semibold text-ink">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate">{p.body}</p>
            </article>
          </Reveal>
        ))}
      </div>
      <Reveal>
        <p className="mt-10 max-w-3xl font-display text-2xl text-accent sm:text-3xl">
          The goal is not more software. It is fewer manual steps and a clearer
          way of working.
        </p>
      </Reveal>
    </section>
  );
}
