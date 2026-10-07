import { Reveal } from "@/components/ui/reveal";

export function AboutSection() {
  return (
    <section id="about" className="border-y border-border bg-surface-elevated">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <Reveal>
          <div className="max-w-3xl">
            <h2 className="font-display text-3xl text-ink sm:text-4xl">
              Work directly with the engineers responsible for your solution.
            </h2>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-slate">
              <p>
                We are a small team of experienced engineers building production
                applications across frontend, backend, APIs, databases and cloud
                infrastructure.
              </p>
              <p>
                You won&apos;t be passed between salespeople and developers. We
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
          </div>
        </Reveal>
      </div>
    </section>
  );
}
