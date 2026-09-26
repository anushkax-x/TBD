import { BUSINESS_NAME, BUSINESS_TAGLINE } from "@consultancy/shared";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="border-t border-border text-ink"
      style={{ background: "#070b10" }}
    >
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4 lg:px-8">
        <div className="md:col-span-1">
          <p className="text-lg font-semibold">{BUSINESS_NAME}</p>
          <p className="mt-3 text-sm leading-relaxed text-slate">
            {BUSINESS_TAGLINE}
          </p>
        </div>

        <div>
          <p className="text-sm font-medium text-ink-soft">Services</p>
          <ul className="mt-3 space-y-2 text-sm text-slate">
            <li>
              <a href="#services" className="hover:text-ink">
                Automate
              </a>
            </li>
            <li>
              <a href="#services" className="hover:text-ink">
                Convert
              </a>
            </li>
            <li>
              <a href="#services" className="hover:text-ink">
                Connect
              </a>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-sm font-medium text-ink-soft">Company</p>
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
          </ul>
        </div>

        <div>
          <p className="text-sm font-medium text-ink-soft">Contact</p>
          <ul className="mt-3 space-y-2 text-sm text-slate">
            <li>
              <a href="mailto:hello@example.com" className="hover:text-ink">
                hello@example.com
              </a>
            </li>
            <li>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-ink"
              >
                LinkedIn
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
