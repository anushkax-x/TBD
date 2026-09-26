import { Reveal } from "@/components/ui/reveal";

const steps = [
  {
    n: "01",
    title: "DISCOVER",
    body: "Understand how your business currently works and identify bottlenecks.",
  },
  {
    n: "02",
    title: "PRIORITIZE",
    body: "Focus on the opportunities with the greatest potential impact.",
  },
  {
    n: "03",
    title: "BUILD",
    body: "Implement the automation, integration or software solution.",
  },
  {
    n: "04",
    title: "IMPROVE",
    body: "Monitor, maintain and continuously improve your systems.",
  },
];

export function HowItWorksSection() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
      <Reveal>
        <h2 className="font-display text-3xl text-ink sm:text-4xl">
          From problem to solution
        </h2>
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
                <span className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border bg-white text-xs font-semibold text-accent">
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
