import { Reveal } from "@/components/ui/reveal";

const steps = [
  {
    n: "01",
    title: "UNDERSTAND",
    body: "Map the current workflow, the people involved, the tools in use and the outcome you need.",
  },
  {
    n: "02",
    title: "RECOMMEND",
    body: "Identify the highest-value improvement and define the smallest reliable solution.",
  },
  {
    n: "03",
    title: "BUILD",
    body: "Implement and test the automation, integration or software with real workflow scenarios.",
  },
  {
    n: "04",
    title: "SUPPORT",
    body: "Monitor the system, maintain integrations and improve it as your business changes.",
  },
];

export function HowItWorksSection() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
      <Reveal>
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">
          A practical delivery process
        </p>
        <h2 className="font-display text-3xl text-ink sm:text-4xl">
          Understand first. Build only what the workflow needs.
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate">
          Every engagement starts with the operation—not a preferred tool or a
          pre-packaged product.
        </p>
      </Reveal>

      <div className="mt-12">
        <ol className="relative grid gap-8 md:grid-cols-4 md:gap-4">
          <div
            className="absolute left-4 top-0 hidden h-full w-px bg-border md:left-0 md:top-5 md:block md:h-px md:w-full"
            aria-hidden
          />
          {steps.map((step, i) => (
            <Reveal key={step.n} delayMs={i * 60}>
              <li className="relative flex gap-4 md:flex-col md:gap-3">
                <span className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border bg-surface-elevated text-xs font-semibold text-accent">
                  {step.n}
                </span>
                <div>
                  <h3 className="text-sm font-semibold tracking-wide text-ink">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate">
                    {step.body}
                  </p>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
