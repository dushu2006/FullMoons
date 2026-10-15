import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center bg-[var(--color-bg-primary)] py-16 text-[var(--color-text-light-primary)]">
      <div className="site-container max-w-3xl text-center">
        <p className="eyebrow text-[var(--color-accent)]">404 · Page not found</p>
        <h1 className="hero-title mt-4">This page isn&apos;t on the menu.</h1>
        <p className="mx-auto mt-5 max-w-[52ch] text-[var(--color-text-light-secondary)]">
          The page you were looking for doesn&apos;t exist. Head back home to browse the menu, view the
          gallery or get directions to FULL MOONs Family Restaurant.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/" className="btn btn-primary">
            Back to home
          </Link>
          <Link href="/#menu" className="btn btn-secondary">
            Explore Menu
          </Link>
        </div>
      </div>
    </main>
  );
}
