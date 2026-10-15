"use client";

import { useState, useSyncExternalStore } from "react";
import { buildWhatsAppHref, siteConfig } from "@/config/site";

const categories = siteConfig.menuOverview.map((c) => c.category);

export function VisitPlanner() {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [guests, setGuests] = useState("2");
  const [interest, setInterest] = useState("General visit");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [whatsAppUrl, setWhatsAppUrl] = useState("");

  // Read the visitor's local date without a hydration mismatch: the
  // server snapshot is empty (same as server-rendered HTML) and the real
  // local date is applied right after hydration. The server's timezone
  // can differ from the phone's, so this must not render inline.
  const today = useSyncExternalStore(
    () => () => {},
    () => {
      const now = new Date();
      return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
    },
    () => "",
  );

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    setWhatsAppUrl("");

    const guestCount = Number(guests);
    if (!date) {
      setError("Please choose a visit date.");
      return;
    }
    if (date < today) {
      setError("Please choose a date that is today or later.");
      return;
    }
    if (!Number.isFinite(guestCount) || guestCount < 1 || guestCount > 50) {
      setError("Please enter between 1 and 50 guests. For larger groups, please call us.");
      return;
    }

    const lines = [
      "Hello FULL MOONs Family Restaurant, I would like to plan a visit.",
      name.trim() ? `Name: ${name.trim()}` : null,
      `Date: ${date}`,
      time ? `Time: ${time}` : null,
      `Guests: ${guestCount}`,
      `Interested in: ${interest}`,
      message.trim() ? `Note: ${message.trim()}` : null,
      "Please confirm availability and current opening hours. Thank you!",
    ].filter(Boolean);

    const url = buildWhatsAppHref(lines.join("\n"));
    setWhatsAppUrl(url);
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const inputClass =
    "mt-2 w-full border border-[var(--color-border-dark)] bg-[var(--color-bg-primary)] px-4 py-3 text-[var(--color-text-light-primary)] placeholder:text-[var(--color-muted)] focus:border-[var(--color-accent)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]";
  const labelClass = "block text-sm font-semibold text-[var(--color-text-light-primary)]";

  return (
    <div className="mt-10 border border-[var(--color-border-dark)] bg-[var(--color-bg-secondary)] p-6">
      <p className="eyebrow text-[var(--color-accent)]">Plan on WhatsApp</p>
      <h3 className="mt-2 font-heading text-3xl font-semibold text-[var(--color-text-light-primary)]">
        Plan your visit in under a minute
      </h3>
      <p className="mt-2 max-w-[62ch] text-sm leading-relaxed text-[var(--color-text-light-secondary)]">
        Fill this in and we&apos;ll open WhatsApp with your message ready to send — nothing is stored
        on this website. Prefer to talk?{" "}
        <a href={siteConfig.business.contact.phoneHref} className="font-semibold text-[var(--color-accent)] hover:underline">
          Call {siteConfig.business.contact.phoneDisplay}
        </a>
        .
      </p>

      <form onSubmit={handleSubmit} className="mt-6 grid gap-4 sm:grid-cols-2" noValidate>
        <div>
          <label htmlFor="visit-name" className={labelClass}>
            Your name <span className="font-normal text-[var(--color-muted)]">(optional)</span>
          </label>
          <input
            id="visit-name"
            type="text"
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Priya Sharma"
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="visit-guests" className={labelClass}>
            Number of guests
          </label>
          <input
            id="visit-guests"
            type="number"
            inputMode="numeric"
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="visit-date" className={labelClass}>
            Visit date
          </label>
          <input
            id="visit-date"
            type="date"
            aria-required="true"
            min={today}
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="visit-time" className={labelClass}>
            Preferred time <span className="font-normal text-[var(--color-muted)]">(optional)</span>
          </label>
          <input
            id="visit-time"
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="visit-interest" className={labelClass}>
            I&apos;m mainly interested in
          </label>
          <select
            id="visit-interest"
            value={interest}
            onChange={(e) => setInterest(e.target.value)}
            className={inputClass}
          >
            <option>General visit</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
            <option>Family / group meal</option>
            <option>Takeaway enquiry</option>
          </select>
        </div>
        <div>
          <label htmlFor="visit-message" className={labelClass}>
            Anything else? <span className="font-normal text-[var(--color-muted)]">(optional)</span>
          </label>
          <input
            id="visit-message"
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="e.g. Window seat, less spicy…"
            className={inputClass}
          />
        </div>

        <div className="sm:col-span-2">
          {error ? (
            <p role="alert" className="mb-3 border border-[var(--color-error)] bg-[var(--color-bg-primary)] px-4 py-3 text-sm text-[#f0a49e]">
              {error}
            </p>
          ) : null}
          <button type="submit" className="btn btn-primary w-full sm:w-auto">
            Send enquiry on WhatsApp
          </button>
          {whatsAppUrl ? (
            <p aria-live="polite" className="mt-3 text-sm text-[var(--color-text-light-secondary)]">
              Opening WhatsApp with your enquiry… If it didn&apos;t open,{" "}
              <a href={whatsAppUrl} target="_blank" rel="noopener noreferrer" className="font-semibold text-[var(--color-accent)] hover:underline">
                tap here to open it
              </a>
              .
            </p>
          ) : null}
        </div>
      </form>
    </div>
  );
}
