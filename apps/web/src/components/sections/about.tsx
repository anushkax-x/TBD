import { Reveal } from "@/components/ui/reveal";

const capabilities = [
  "React",
  "Node.js",
  "TypeScript",
  "APIs",
  "Cloud",
  "AI",
  "Automation",
  "Databases",
];

export function AboutSection() {
  return (
    <section id="about" className="border-y border-border bg-surface-elevated">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
          <Reveal>
            <h2 className="font-display text-3xl text-ink sm:text-4xl">
              Work directly with the engineer responsible for your solution.
            </h2>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-slate">
              <p>
                I&apos;m Anushka, a full-stack software engineer with 4+ years of
                experience building production applications across frontend,
                backend, APIs, databases and cloud infrastructure.
              </p>
              <p>
                You won&apos;t be passed between salespeople and developers. I
                first understand how the business works, then recommend and
                build the smallest reliable solution that can create meaningful
                operational value.
              </p>
              <p>
                When a project needs additional specialist support, it can be
                brought in without forcing you to maintain a full in-house
                engineering team.
              </p>
            </div>
          </Reveal>
          <Reveal delayMs={80}>
            <div className="rounded-xl border border-border bg-surface p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-muted">
                Capabilities
              </p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {capabilities.map((c) => (
                  <li
                    key={c}
                    className="rounded-md border border-border bg-surface-elevated px-3 py-1.5 text-sm text-ink-soft"
                  >
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
