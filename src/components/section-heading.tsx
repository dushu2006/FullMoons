import type { ReactNode } from "react";

export function SectionHeading({
  eyebrow,
  title,
  description,
  centered = false,
  theme = "light",
}: {
  eyebrow?: string;
  title: string;
  description?: ReactNode;
  centered?: boolean;
  theme?: "light" | "dark";
}) {
  const headingColor = theme === "light" ? "text-[var(--color-text-light-primary)]" : "text-[var(--color-text-dark-primary)]";
  const bodyColor = theme === "light" ? "text-[var(--color-text-light-secondary)]" : "text-[var(--color-text-dark-secondary)]";

  return (
    <div className={`mb-10 max-w-3xl ${centered ? "mx-auto text-center" : ""}`}>
      {eyebrow ? <p className="eyebrow text-[var(--color-accent)]">{eyebrow}</p> : null}
      <h2 className={`section-title mt-3 ${headingColor}`}>{title}</h2>
      {description ? <div className={`mt-4 text-base leading-relaxed ${bodyColor}`}>{description}</div> : null}
    </div>
  );
}
