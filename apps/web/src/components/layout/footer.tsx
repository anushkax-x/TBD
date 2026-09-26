import { BUSINESS_NAME, BUSINESS_TAGLINE } from "@consultancy/shared";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-ink text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4 lg:px-8">
        <div className="md:col-span-1">
          <p className="text-lg font-semibold">{BUSINESS_NAME}</p>
          <p className="mt-3 text-sm leading-relaxed text-white/70">
            {BUSINESS_TAGLINE}
          </p>
        </div>

        <div>
          <p className="text-sm font-medium text-white/90">Services</p>
          <ul className="mt-3 space-y-2 text-sm text-white/65">
            <li>
              <a href="#services" className="hover:text-white">
                Automate
              </a>
            </li>
            <li>
              <a href="#services" className="hover:text-white">
                Convert
              </a>
            </li>
            <li>
              <a href="#services" className="hover:text-white">
                Connect
              </a>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-sm font-medium text-white/90">Company</p>
          <ul className="mt-3 space-y-2 text-sm text-white/65">
            <li>
              <a href="#about" className="hover:text-white">
                About
              </a>
            </li>
            <li>
              <a href="#examples" className="hover:text-white">
                Examples
              </a>
            </li>
            <li>
              <a href="#faq" className="hover:text-white">
                FAQ
              </a>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-sm font-medium text-white/90">Contact</p>
          <ul className="mt-3 space-y-2 text-sm text-white/65">
            <li>
              <a href="mailto:hello@example.com" className="hover:text-white">
                hello@example.com
              </a>
            </li>
            <li>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white"
              >
                LinkedIn
              </a>
            </li>
          </ul>
          <p className="mt-6 text-sm font-medium text-white/90">Legal</p>
          <ul className="mt-3 space-y-2 text-sm text-white/65">
            <li>
              <a href="/privacy" className="hover:text-white">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="/terms" className="hover:text-white">
                Terms
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <p className="mx-auto max-w-6xl px-4 py-6 text-xs text-white/50 sm:px-6 lg:px-8">
          © {year} {BUSINESS_NAME}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
