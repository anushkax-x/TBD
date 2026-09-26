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
        <h2 className="font-display text-3xl text-ink sm:text-4xl">
          Where is your business losing time?
        </h2>
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
        <p className="mt-10 font-display text-2xl text-accent sm:text-3xl">
          We can automate it.
        </p>
      </Reveal>
    </section>
  );
}
