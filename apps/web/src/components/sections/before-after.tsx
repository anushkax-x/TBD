import { Reveal } from "@/components/ui/reveal";

const before = [
  "Website enquiry",
  "Email inbox",
  "Employee notices it",
  "Copies data to spreadsheet",
  "Calls customer",
  "Updates CRM",
  "Maybe follows up",
];

const after = [
  "Website enquiry",
  "Automatic qualification",
  "CRM updated",
  "Sales team notified",
  "Personalized response",
  "Automated follow-up",
  "Appointment booked",
];

function FlowColumn({
  title,
  steps,
  variant,
}: {
  title: string;
  steps: string[];
  variant: "before" | "after";
}) {
  const isAfter = variant === "after";
  return (
    <div
      className={`rounded-xl border p-5 sm:p-6 ${
        isAfter
          ? "border-accent/30 bg-accent-soft/40 shadow-sm"
          : "border-border bg-surface-elevated"
      }`}
    >
      <p
        className={`text-xs font-semibold uppercase tracking-[0.14em] ${
          isAfter ? "text-accent" : "text-slate-muted"
        }`}
      >
        {title}
      </p>
      <ol className="mt-5 space-y-0">
        {steps.map((step, i) => (
          <li key={step} className="flex gap-3">
            <div className="flex flex-col items-center">
              <span
                className={`mt-1 h-2.5 w-2.5 rounded-full ${
                  isAfter ? "bg-accent" : "bg-[var(--before)]"
                }`}
              />
              {i < steps.length - 1 && (
                <span
                  className={`my-1 h-6 w-px ${
                    isAfter ? "bg-accent/40" : "bg-border"
                  }`}
                />
              )}
            </div>
            <p
              className={`pb-3 text-sm ${
                isAfter ? "font-medium text-ink" : "text-slate"
              }`}
            >
              {step}
            </p>
          </li>
        ))}
      </ol>
    </div>
  );
}

export function BeforeAfterSection() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
      <Reveal>
        <h2 className="font-display text-3xl text-ink sm:text-4xl">
          Same business. Better system.
        </h2>
      </Reveal>
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <Reveal>
          <FlowColumn title="Before" steps={before} variant="before" />
        </Reveal>
        <Reveal delayMs={80}>
          <FlowColumn title="After" steps={after} variant="after" />
        </Reveal>
      </div>
      <Reveal>
        <p className="mt-10 max-w-2xl text-base leading-relaxed text-slate sm:text-lg">
          Good systems don&apos;t just save time. They make it easier for your
          team to do the right thing every time.
        </p>
      </Reveal>
    </section>
  );
}
