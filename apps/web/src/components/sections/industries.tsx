import { Reveal } from "@/components/ui/reveal";

const groups = [
  {
    title: "Professional Services",
    items: "Accountants · Consultants · Agencies · Legal",
  },
  {
    title: "Sales-driven Businesses",
    items: "Real Estate · Recruitment · Insurance · Home Services",
  },
  {
    title: "Online Businesses",
    items: "Ecommerce · SaaS · Digital Services",
  },
];

export function IndustriesSection() {
  return (
    <section id="solutions" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
      <Reveal>
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">
          Who this is for
        </p>
        <h2 className="font-display text-3xl text-ink sm:text-4xl">
          Growing teams whose operations have outgrown spreadsheets and manual
          handoffs.
        </h2>
      </Reveal>
      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {groups.map((g, i) => (
          <Reveal key={g.title} delayMs={i * 50}>
            <div className="rounded-xl border border-border bg-surface-elevated p-6">
              <h3 className="text-base font-semibold text-ink">{g.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate">{g.items}</p>
            </div>
          </Reveal>
        ))}
      </div>
      <Reveal>
        <p className="mt-8 max-w-2xl text-base text-slate">
          The strongest fit is a business with a repeatable process, a clear
          operational bottleneck and a team ready to adopt a better way of
          working.
        </p>
      </Reveal>
    </section>
  );
}
