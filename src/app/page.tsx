import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { CopyAddressButton } from "@/components/copy-address-button";
import { DirectionsLink } from "@/components/directions-link";
import { FeaturedGrid } from "@/components/featured-grid";
import { FloatingActions } from "@/components/floating-actions";
import { GalleryLightbox } from "@/components/gallery-lightbox";
import { MenuExplorer } from "@/components/menu-explorer";
import { VisitPlanner } from "@/components/visit-planner";
import { SectionHeading } from "@/components/section-heading";
import { SiteHeader } from "@/components/site-header";

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: siteConfig.business.name,
  address: {
    "@type": "PostalAddress",
    streetAddress: `${siteConfig.business.address.line1}, ${siteConfig.business.address.area}`,
    addressLocality: siteConfig.business.address.city,
    addressRegion: siteConfig.business.address.state,
    postalCode: siteConfig.business.address.postalCode,
    addressCountry: siteConfig.business.address.country,
  },
  telephone: siteConfig.business.contact.phoneHref.replace("tel:", ""),
  servesCuisine: ["South Indian", "North Indian", "Biryani", "Chinese", "Seafood", "Sichuan"],
  hasMenu: siteConfig.links.districtListing,
};

export default function HomePage() {
  return (
    <>
      <a
        href="#home-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[100] focus:bg-[var(--color-bg-cream)] focus:px-4 focus:py-2 focus:text-[var(--color-text-dark-primary)]"
      >
        Skip to main content
      </a>

      <SiteHeader />

      <main id="home-content" className="bg-[var(--color-bg-primary)] text-[var(--color-text-light-primary)]">
        <section id="home" className="section-space border-b border-[var(--color-border-dark)]">
          <div className="site-container grid items-center gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
            <div>
              <p className="eyebrow text-[var(--color-accent)]">{siteConfig.hero.eyebrow}</p>
              <h1 className="hero-title mt-4 max-w-[18ch] text-[var(--color-text-light-primary)]">{siteConfig.hero.title}</h1>
              <p className="mt-6 max-w-[60ch] text-[clamp(1rem,1.2vw,1.125rem)] leading-relaxed text-[var(--color-text-light-secondary)]">
                {siteConfig.hero.description}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href={siteConfig.links.primaryCta} className="btn btn-primary">
                  Explore Menu
                </Link>
                <DirectionsLink className="btn btn-secondary">Get Directions</DirectionsLink>
              </div>
            </div>

            <div className="relative overflow-hidden border border-[var(--color-border-dark)] bg-[var(--color-bg-secondary)]">
              <Image
                src={siteConfig.hero.image.src}
                alt={siteConfig.hero.image.alt}
                width={1200}
                height={900}
                className="aspect-[5/4] h-full w-full object-cover"
                priority
                fetchPriority="high"
                sizes="(max-width: 1024px) 100vw, 52vw"
              />
            </div>
          </div>
        </section>

        <section id="about" className="section-space bg-[var(--color-bg-secondary)]">
          <div className="site-container grid gap-8 lg:grid-cols-2 lg:items-center">
            <div className="overflow-hidden border border-[var(--color-border-dark)]">
              <Image
                src={siteConfig.intro.image.src}
                alt={siteConfig.intro.image.alt}
                width={1200}
                height={900}
                className="aspect-[5/4] h-full w-full object-cover"
                loading="lazy"
                sizes="(max-width: 1024px) 100vw, 48vw"
              />
            </div>
            <div>
              <p className="eyebrow text-[var(--color-accent)]">{siteConfig.intro.eyebrow}</p>
              <h2 className="section-title mt-3 text-[var(--color-text-light-primary)]">{siteConfig.intro.title}</h2>
              <p className="mt-5 max-w-[62ch] text-base leading-relaxed text-[var(--color-text-light-secondary)]">
                {siteConfig.intro.description}
              </p>
              <p className="mt-5 rounded-sm border border-[var(--color-border-dark)] bg-[var(--color-bg-primary)] p-4 text-sm leading-relaxed text-[var(--color-muted)]">
                {siteConfig.business.sourceNote}
              </p>
            </div>
          </div>
        </section>

        <section className="section-space bg-[var(--color-bg-primary)]">
          <div className="site-container">
            <SectionHeading
              eyebrow="Featured"
              title="A Menu Worth Exploring"
              description="Selected categories from publicly listed menu sections. Individual dish availability and prices should be confirmed directly with the restaurant."
            />
            <FeaturedGrid items={siteConfig.featured} />
          </div>
        </section>

        <section id="menu" className="menu-bg section-space relative overflow-hidden bg-[var(--color-bg-primary)] text-[var(--color-text-light-primary)]">
          <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-[var(--color-accent)]/10 blur-3xl" />
          <div aria-hidden="true" className="pointer-events-none absolute -bottom-32 -left-24 h-96 w-96 rounded-full bg-[var(--color-spice)]/20 blur-3xl" />
          <div className="site-container relative">
            <SectionHeading
              eyebrow="Menu"
              title="Menu Overview"
              description={
                <>
                  <p>
                    The website presents a category-based menu overview for quick browsing. For latest item-level pricing and real-time availability,
                    view the current listing.
                  </p>
                  <div className="mt-4 flex flex-wrap gap-3">
                    <a href={siteConfig.links.districtListing} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                      View Listed Menu
                    </a>
                  </div>
                </>
              }
            />

            <MenuExplorer categories={siteConfig.menuOverview} />
          </div>
        </section>

        <section id="gallery" className="section-space bg-[var(--color-bg-cream)] text-[var(--color-text-dark-primary)]">
          <div className="site-container">
            <SectionHeading
              eyebrow="Gallery"
              title="Food Gallery"
              theme="dark"
              description="Images below are illustrative visuals for design preview and should be replaced with owner-approved restaurant photography before final publication."
            />
            <GalleryLightbox images={siteConfig.gallery} />
          </div>
        </section>

        <section className="section-space border-y border-[var(--color-border-dark)] bg-[var(--color-bg-secondary)]">
          <div className="site-container">
            <SectionHeading
              eyebrow="Order & Contact"
              title="Reach FULL MOONs quickly"
              description="Use your preferred channel to connect. Delivery-platform links are added once the exact listing URLs are owner-confirmed."
            />

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              <a href={siteConfig.business.contact.phoneHref} className="action-card" aria-label="Call FULL MOONs Family Restaurant">
                <h3>Call</h3>
                <p>{siteConfig.business.contact.phoneDisplay}</p>
              </a>

              <a href={siteConfig.business.contact.whatsappHref} target="_blank" rel="noopener noreferrer" className="action-card">
                <h3>WhatsApp</h3>
                <p>Send a quick menu enquiry</p>
              </a>

              <a href={siteConfig.links.districtListing} target="_blank" rel="noopener noreferrer" className="action-card">
                <h3>District Listing</h3>
                <p>Browse currently published listing details</p>
              </a>

              <a
                href={siteConfig.business.contact.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="action-card"
                aria-label="Ask about Swiggy and Zomato ordering on WhatsApp"
              >
                <h3>Swiggy &amp; Zomato</h3>
                <p>Exact listing links pending owner confirmation — tap to ask on WhatsApp →</p>
              </a>
            </div>
          </div>
        </section>

        <section id="visit-us" className="section-space bg-[var(--color-bg-primary)]">
          <div className="site-container grid gap-7 lg:grid-cols-2">
            <div>
              <SectionHeading
                eyebrow="Visit Us"
                title="Find FULL MOONs on Main Road"
                description="Use the verified address below and open directions in Google Maps for turn-by-turn navigation."
              />

              <div className="space-y-5 text-[var(--color-text-light-secondary)]">
                <div>
                  <h3 className="font-heading text-2xl font-semibold text-[var(--color-text-light-primary)]">{siteConfig.business.name}</h3>
                  <p className="mt-2 max-w-[58ch] leading-relaxed">{siteConfig.business.address.full}</p>
                </div>

                <div>
                  <p className="eyebrow text-[var(--color-accent)]">Opening Hours</p>
                  <p className="mt-1 text-sm">
                    Daily schedule not published in a fully verifiable format. Please call the restaurant for current timings.
                  </p>
                </div>

                <div className="flex flex-wrap gap-3">
                  <DirectionsLink className="btn btn-primary">Get Directions</DirectionsLink>
                  <a href={siteConfig.business.contact.phoneHref} className="btn btn-secondary">
                    Call Restaurant
                  </a>
                  <CopyAddressButton address={siteConfig.business.address.full} />
                </div>
              </div>
            </div>

            <div className="overflow-hidden border border-[var(--color-border-dark)] bg-[var(--color-bg-secondary)] p-3">
              <div className="h-[320px] w-full overflow-hidden md:h-[420px]">
                <iframe
                  title="Map to FULL MOONs Family Restaurant"
                  src="https://www.google.com/maps?q=FULL%20MOONs%20Family%20Restaurant%2C%20Door%2010-9-30%2C%20Main%20Road%2C%20New%20Gajuwaka%2C%20Visakhapatnam%2C%20Andhra%20Pradesh%20530026%2C%20India&output=embed"
                  className="h-full w-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <DirectionsLink className="mt-3 inline-flex text-sm font-semibold text-[var(--color-accent)] hover:text-[var(--color-accent-deep)]">
                Open full map in Google Maps →
              </DirectionsLink>
            </div>
          </div>

          <div className="site-container">
            <VisitPlanner />
          </div>
        </section>

        <section className="section-space bg-[var(--color-bg-secondary)] py-16">
          <div className="site-container text-center">
            <p className="eyebrow mx-auto text-[var(--color-accent)]">Plan ahead</p>
            <h2 className="section-title mt-3 text-[var(--color-text-light-primary)]">Plan Your Next Visit.</h2>
            <p className="mx-auto mt-4 max-w-[62ch] text-[var(--color-text-light-secondary)]">
              Explore the menu categories, open directions and connect directly before you arrive.
            </p>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
              <Link href="#menu" className="btn btn-primary">
                Explore Menu
              </Link>
              <DirectionsLink className="btn btn-secondary">Get Directions</DirectionsLink>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-[var(--color-border-dark)] bg-[var(--color-bg-primary)] py-12 text-[var(--color-text-light-secondary)]">
        <div className="site-container grid gap-8 md:grid-cols-3">
          <div>
            <p className="font-heading text-3xl font-semibold text-[var(--color-text-light-primary)]">FULL MOONs</p>
            <p className="mt-3 max-w-[34ch] text-sm leading-relaxed">
              Family restaurant in New Gajuwaka, Visakhapatnam with menu categories including biryanis, Indian dishes, seafood and more.
            </p>
          </div>

          <div>
            <p className="eyebrow text-[var(--color-accent)]">Navigation</p>
            <ul className="mt-4 space-y-2 text-sm">
              {siteConfig.navigation.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="hover:text-[var(--color-text-light-primary)]">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="eyebrow text-[var(--color-accent)]">Contact</p>
            <p className="mt-4 text-sm leading-relaxed">{siteConfig.business.address.full}</p>
            <a href={siteConfig.business.contact.phoneHref} className="mt-3 block text-sm hover:text-[var(--color-text-light-primary)]">
              {siteConfig.business.contact.phoneDisplay}
            </a>
            <div className="mt-3 flex flex-col gap-2 text-sm">
              <a href={siteConfig.links.districtListing} target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-text-light-primary)]">
                District Listing
              </a>
              <DirectionsLink className="hover:text-[var(--color-text-light-primary)]">
                Google Maps Directions
              </DirectionsLink>
            </div>
          </div>
        </div>

        <div className="site-container mt-10 border-t border-[var(--color-border-dark)] pt-6 text-xs text-[var(--color-muted)]">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p>© {new Date().getFullYear()} FULL MOONs Family Restaurant. All rights reserved.</p>
            <a href="/privacy" aria-label="Privacy notice" className="hover:text-[var(--color-text-light-secondary)]">
              Privacy Notice
            </a>
          </div>
        </div>
      </footer>

      <FloatingActions />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
    </>
  );
}
