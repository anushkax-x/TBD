import { BUSINESS_NAME } from "@consultancy/shared";
import Link from "next/link";

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <Link href="/" className="text-sm text-accent hover:text-accent-hover">
        ← Back
      </Link>
      <h1 className="mt-6 font-display text-3xl text-ink">Privacy Policy</h1>
      <p className="mt-4 text-sm leading-relaxed text-slate">
        {BUSINESS_NAME} collects the information you submit through our contact
        forms (such as name, business name, email, and enquiry details) so we
        can respond to your request. We do not sell your personal information.
        Data is stored securely and retained only as long as needed to manage
        enquiries and related business communications.
      </p>
      <p className="mt-4 text-sm leading-relaxed text-slate">
        For questions about this policy, contact us at hello@example.com.
      </p>
    </main>
  );
}
