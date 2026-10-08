import Image from "next/image";
import { Reveal } from "@/components/ui/reveal";

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
      className="scroll-mt-24 border-b border-border bg-surface"
    >
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-muted">
            Tools we connect
          </p>
          <p className="mt-2 max-w-lg text-sm text-slate">
            We work with the AI models and business tools your team already
            relies on.
          </p>
        </Reveal>
        <ul className="mt-8 grid grid-cols-3 gap-x-4 gap-y-6 sm:grid-cols-4 sm:gap-x-5 sm:gap-y-7 lg:grid-cols-7">
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
      </div>
    </section>
  );
}
