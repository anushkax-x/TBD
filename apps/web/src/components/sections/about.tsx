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
    <section id="about" className="border-y border-border bg-white">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
          <Reveal>
            <h2 className="font-display text-3xl text-ink sm:text-4xl">
              Built by an engineer who understands how software actually works.
            </h2>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-slate">
              <p>
                I&apos;m Anushka, a full-stack software engineer with 4+ years of
                experience building production applications and business systems.
              </p>
              <p>
                I&apos;ve worked across frontend, backend, APIs, databases, cloud
                infrastructure and integrations — and I&apos;m now applying that
                experience to helping growing businesses build better internal
                systems without the cost of maintaining a full engineering team.
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
                    className="rounded-md border border-border bg-white px-3 py-1.5 text-sm text-ink-soft"
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
