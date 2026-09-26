import { BUSINESS_NAME } from "@consultancy/shared";
import Link from "next/link";

export default function TermsPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <Link href="/" className="text-sm text-accent hover:text-accent-hover">
        ← Back
      </Link>
      <h1 className="mt-6 font-display text-3xl text-ink">Terms of Use</h1>
      <p className="mt-4 text-sm leading-relaxed text-slate">
        This website is provided by {BUSINESS_NAME} for informational purposes.
        Content is not a binding offer. Engagement for consulting or software
        work is governed by a separate agreement. We make reasonable efforts to
        keep information accurate but do not warrant completeness.
      </p>
    </main>
  );
}
