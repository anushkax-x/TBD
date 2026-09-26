import { Reveal } from "@/components/ui/reveal";
import {
  FileText,
  Headphones,
  MessageSquare,
  Sparkles,
  Target,
} from "lucide-react";

const useCases = [
  {
    icon: Target,
    title: "AI Lead Qualification",
    body: "Understand, score and route incoming enquiries automatically.",
  },
  {
    icon: Headphones,
    title: "AI Customer Support",
    body: "Answer common questions instantly and escalate complex requests.",
  },
  {
    icon: FileText,
    title: "AI Document Processing",
    body: "Extract useful information from PDFs, forms and documents.",
  },
  {
    icon: MessageSquare,
    title: "AI Knowledge Assistant",
    body: "Give your team instant answers from your internal documentation.",
  },
  {
    icon: Sparkles,
    title: "AI Sales Assistant",
    body: "Summarize conversations, identify opportunities and help sales teams prioritize.",
  },
];

export function AiSection() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
      <Reveal>
        <h2 className="font-display text-3xl text-ink sm:text-4xl">
          Put AI to work where it actually saves you time.
        </h2>
        <p className="mt-4 max-w-2xl text-base text-slate sm:text-lg">
          We don&apos;t add AI because it&apos;s trendy. We use it when it makes
          a measurable difference.
        </p>
      </Reveal>
      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {useCases.map((item, i) => (
          <Reveal key={item.title} delayMs={i * 50}>
            <article className="h-full rounded-xl border border-border bg-surface-elevated p-5 transition-colors hover:border-accent/40">
              <item.icon className="h-5 w-5 text-accent" aria-hidden />
              <h3 className="mt-4 text-base font-semibold text-ink">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate">{item.body}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
