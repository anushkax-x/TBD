import { BUSINESS_NAME } from "@consultancy/shared";

const services = [
  { href: "#services", label: "Workflow automation" },
  { href: "#services", label: "Sales & retention" },
  { href: "#services", label: "Integrations" },
  { href: "#services", label: "UI & UX redesign" },
];

const explore = [
  { href: "#workflows", label: "Workflows" },
  { href: "#about", label: "About" },
  { href: "#services", label: "What we build" },
  { href: "#faq", label: "FAQ" },
];

const legal = [
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
];

const linkClass =
  "text-sm text-slate transition-colors hover:text-ink";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-surface text-ink">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-muted">
              Services
            </p>
            <ul className="mt-4 space-y-2.5">
              {services.map((item) => (
                <li key={item.label}>
                  <a href={item.href} className={linkClass}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-muted">
              Explore
            </p>
            <ul className="mt-4 space-y-2.5">
              {explore.map((item) => (
                <li key={item.label}>
                  <a href={item.href} className={linkClass}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-2 sm:col-span-1">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-muted">
              Legal
            </p>
            <ul className="mt-4 space-y-2.5">
              {legal.map((item) => (
                <li key={item.label}>
                  <a href={item.href} className={linkClass}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-5 text-xs text-slate-muted sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>
            © {year} {BUSINESS_NAME}. All rights reserved.
          </p>
          <p>Automation · Integrations · UI/UX · Custom software</p>
        </div>
      </div>
    </footer>
  );
}
