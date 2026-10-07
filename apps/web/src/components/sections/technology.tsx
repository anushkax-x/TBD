import Image from "next/image";
import { Reveal } from "@/components/ui/reveal";

const categories = [
  { title: "Web", items: "React · Next.js · TypeScript · Node.js" },
  { title: "Data", items: "PostgreSQL · MongoDB" },
  { title: "Automation", items: "n8n · Zapier · Make" },
  { title: "AI", items: "OpenAI · Claude · AI APIs" },
  { title: "Cloud", items: "AWS · Vercel" },
];

const tools = [
  { name: "OpenAI", file: "openai", label: "ChatGPT" },
  { name: "Anthropic", file: "anthropic", label: "Claude" },
  { name: "Google Gemini", file: "googlegemini", label: "Gemini" },
  { name: "LangChain", file: "langchain", label: "LangGraph" },
  { name: "ElevenLabs", file: "elevenlabs", label: "ElevenLabs" },
  { name: "Shopify", file: "shopify", label: "Shopify" },
  { name: "HubSpot", file: "hubspot", label: "HubSpot" },
  { name: "Stripe", file: "stripe", label: "Stripe" },
  { name: "Slack", file: "slack", label: "Slack" },
  { name: "Notion", file: "notion", label: "Notion" },
  { name: "Zapier", file: "zapier", label: "Zapier" },
  { name: "Make", file: "make", label: "Make" },
  { name: "Airtable", file: "airtable", label: "Airtable" },
  { name: "Google Sheets", file: "googlesheets", label: "Sheets" },
] as const;

export function TechnologySection() {
  return (
    <section
      id="technology"
      className="border-y border-border bg-surface-elevated"
    >
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
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
            <div
              key={c.title}
              className="rounded-lg border border-border bg-surface px-4 py-3"
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-muted">
                {c.title}
              </p>
              <p className="mt-1.5 text-sm text-ink-soft">{c.items}</p>
            </div>
          ))}
        </div>

        <Reveal delayMs={60}>
          <div className="mt-14">
            <p className="mb-6 text-xs font-semibold uppercase tracking-[0.14em] text-slate-muted">
              AI · CRM · commerce · operations
            </p>
            <ul className="grid grid-cols-3 gap-x-4 gap-y-6 sm:grid-cols-4 sm:gap-x-5 sm:gap-y-7 lg:grid-cols-7">
              {tools.map((tool) => (
                <li
                  key={tool.file}
                  className="group flex flex-col items-center gap-2.5 text-center"
                >
                  <Image
                    src={`/tech/${tool.file}.svg`}
                    alt=""
                    width={32}
                    height={32}
                    className="h-8 w-8 opacity-75 brightness-0 invert transition duration-200 group-hover:opacity-100"
                    unoptimized
                  />
                  <span className="text-[11px] font-medium leading-tight text-slate">
                    {tool.label}
                  </span>
                  <span className="sr-only">{tool.name}</span>
                </li>
              ))}
            </ul>
            <p className="mt-7 max-w-md text-xs leading-relaxed text-slate-muted">
              Connected to the AI models and business tools your team already
              relies on.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
