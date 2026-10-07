import { Reveal } from "@/components/ui/reveal";

const groups = [
  {
    title: "Shopify brands",
    items: "DTC · Apparel · Beauty · Home · Specialty retail",
  },
  {
    title: "Growing ecommerce teams",
    items: "Founder-led stores · 5–50 person ops · Multi-channel sellers",
  },
  {
    title: "Ops-heavy stores",
    items: "High order volume · Complex SKUs · Support-heavy catalogues",
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
          Built for stores that have outgrown spreadsheets and inbox chasing.
        </h2>
      </Reveal>
      <div className="mt-10 grid gap-4 md:grid-cols-3 md:items-stretch">
        {groups.map((g, i) => (
          <Reveal key={g.title} delayMs={i * 50} className="h-full">
            <div className="flex h-full min-h-[140px] flex-col rounded-xl border border-border bg-surface-elevated p-6">
              <h3 className="text-base font-semibold text-ink">{g.title}</h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-slate">
                {g.items}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
      <Reveal>
        <p className="mt-8 max-w-2xl text-base text-slate">
          Best fit: a Shopify-based business with clear operational bottlenecks
          and a team ready to adopt a cleaner way of working.
        </p>
      </Reveal>
    </section>
  );
}
