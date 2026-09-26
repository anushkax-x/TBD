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
        <h2 className="font-display text-3xl text-ink sm:text-4xl">
          Built for growing businesses.
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
          If your business relies on leads, customers and repetitive workflows,
          there&apos;s probably something we can improve.
        </p>
      </Reveal>
    </section>
  );
}
