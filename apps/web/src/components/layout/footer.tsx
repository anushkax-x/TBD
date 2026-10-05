import { BUSINESS_NAME, BUSINESS_TAGLINE } from "@consultancy/shared";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="border-t border-border text-ink"
      style={{ background: "#070b10" }}
    >
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.6fr_1fr_1fr] lg:px-8">
        <div>
          <p className="text-lg font-semibold">{BUSINESS_NAME}</p>
          <p className="mt-3 text-sm leading-relaxed text-slate">
            {BUSINESS_TAGLINE}
          </p>
          <p className="mt-4 text-xs leading-relaxed text-slate-muted">
            Led by Anushka, a full-stack software engineer working across
            frontend, backend, data, cloud and AI integrations.
          </p>
        </div>

        <div>
          <p className="text-sm font-medium text-ink-soft">Services</p>
          <ul className="mt-3 space-y-2 text-sm text-slate">
            <li>
              <a href="#services" className="hover:text-ink">
                Workflow automation
              </a>
            </li>
            <li>
              <a href="#services" className="hover:text-ink">
                Sales systems
              </a>
            </li>
            <li>
              <a href="#services" className="hover:text-ink">
                Integrations & custom software
              </a>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-sm font-medium text-ink-soft">Explore</p>
          <ul className="mt-3 space-y-2 text-sm text-slate">
            <li>
              <a href="#about" className="hover:text-ink">
                About
              </a>
            </li>
            <li>
              <a href="#examples" className="hover:text-ink">
                Examples
              </a>
            </li>
            <li>
              <a href="#faq" className="hover:text-ink">
                FAQ
              </a>
            </li>
            <li>
              <a href="#audit" className="hover:text-ink">
                Free discovery call
              </a>
            </li>
          </ul>
          <p className="mt-6 text-sm font-medium text-ink-soft">Legal</p>
          <ul className="mt-3 space-y-2 text-sm text-slate">
            <li>
              <a href="/privacy" className="hover:text-ink">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="/terms" className="hover:text-ink">
                Terms
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <p className="mx-auto max-w-6xl px-4 py-6 text-xs text-slate-muted sm:px-6 lg:px-8">
          © {year} {BUSINESS_NAME}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
