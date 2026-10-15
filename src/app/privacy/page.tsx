import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Notice | FULL MOONs Family Restaurant",
  description:
    "How the FULL MOONs Family Restaurant website handles information: no accounts, no payments and no onsite data storage.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[var(--color-bg-primary)] py-16 text-[var(--color-text-light-primary)]">
      <div className="site-container max-w-3xl">
        <Link href="/" className="btn btn-secondary !min-h-[44px]">
          ← Back to home
        </Link>
        <p className="eyebrow mt-10 text-[var(--color-accent)]">Privacy Notice</p>
        <h1 className="hero-title mt-4 text-[clamp(2.3rem,6vw,3.8rem)]">Privacy and Data Use</h1>
        <div className="mt-8 space-y-6 text-[var(--color-text-light-secondary)]">
          <p>
            This website is an informational site for FULL MOONs Family Restaurant. It provides location details, menu-category overview and direct external links for calling,
            WhatsApp messaging and map directions.
          </p>
          <p>
            The website does not process payments, does not host user accounts and does not store any information you type into the “Plan your visit” helper. That helper only
            prepares a message on your own device and opens it in WhatsApp when you choose to send it.
          </p>
          <p>
            When you open external platforms (for example WhatsApp, Google Maps or listing pages), their own privacy policies apply.
          </p>
          <p>
            For corrections to business information shown on this site, please contact the restaurant directly using the published phone number.
          </p>
        </div>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link href="/#menu" className="btn btn-primary">
            Explore Menu
          </Link>
          <Link href="/" className="btn btn-secondary">
            Back to home
          </Link>
        </div>
      </div>
    </main>
  );
}
