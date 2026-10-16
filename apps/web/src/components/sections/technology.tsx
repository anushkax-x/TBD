import Image from "next/image";
import { Reveal } from "@/components/ui/reveal";
import { Marquee } from "@/components/motion/marquee";

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
    <section id="technology" className="scroll-mt-24 bg-surface">
      <div className="mx-auto max-w-6xl px-4 pt-24 text-center sm:px-6 lg:px-8">
        <Reveal>
          <p className="eyebrow">Tools we connect</p>
          <p className="mx-auto mt-4 max-w-lg text-base text-slate">
            We work with the AI models and business tools your team already
            relies on.
          </p>
        </Reveal>
      </div>
      <Reveal variant="fade" className="pb-24 pt-12">
        <ul className="sr-only">
          {tools.map((tool) => (
            <li key={tool.file}>{tool.name}</li>
          ))}
        </ul>
        <Marquee speed={36} gapClass="gap-4" className="py-2">
          {tools.map((tool) => (
            <div
              key={tool.file}
              aria-hidden
              className="group flex h-16 shrink-0 items-center gap-3 rounded-full border border-hairline bg-white/[0.02] px-6 transition-colors duration-300 hover:border-accent/40 hover:bg-accent-soft/25"
            >
              <Image
                src={`/tech/${tool.file}.svg`}
                alt=""
                width={24}
                height={24}
                className="h-6 w-6 opacity-60 brightness-0 invert transition duration-300 group-hover:opacity-100"
                unoptimized
              />
              <span className="text-sm font-medium text-slate transition-colors group-hover:text-ink">
                {tool.label}
              </span>
            </div>
          ))}
        </Marquee>
      </Reveal>
    </section>
  );
}
