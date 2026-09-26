import { Reveal } from "@/components/ui/reveal";

const categories = [
  { title: "Web", items: "React · Next.js · TypeScript · Node.js" },
  { title: "Data", items: "PostgreSQL · MongoDB" },
  { title: "Automation", items: "n8n · Zapier · Make" },
  { title: "AI", items: "OpenAI · Claude · AI APIs" },
  { title: "Cloud", items: "AWS · Vercel" },
];

export function TechnologySection() {
  return (
    <section id="technology" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <Reveal>
        <h2 className="font-display text-2xl text-ink sm:text-3xl">
          Technology that fits the problem.
        </h2>
        <p className="mt-2 text-sm text-slate">
          We choose tools based on outcomes — not trends.
        </p>
      </Reveal>
      <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {categories.map((c) => (
          <div key={c.title} className="rounded-lg border border-border px-4 py-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-muted">
              {c.title}
            </p>
            <p className="mt-1.5 text-sm text-ink-soft">{c.items}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
