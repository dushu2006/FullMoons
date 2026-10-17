import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { ActionLink } from "@/components/action-link";
import { CopyAddressButton } from "@/components/copy-address-button";
import { DirectionsLink } from "@/components/directions-link";
import { FloatingActions } from "@/components/floating-actions";
import { MenuExplorer } from "@/components/menu-explorer";
import { MenuShowcase } from "@/components/menu-showcase";
import { VisitPlanner } from "@/components/visit-planner";
import { SectionHeading } from "@/components/section-heading";
import { BrandIntro } from "@/components/brand-intro";
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
      <BrandIntro />

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
            <div className="scroll-reveal" data-reveal="left">
              <p className="eyebrow text-[var(--color-accent)]">{siteConfig.hero.eyebrow}</p>
              <h1 className="hero-title mt-4 max-w-[18ch] text-[var(--color-text-light-primary)]">{siteConfig.hero.title}</h1>
              <p className="mt-6 max-w-[60ch] text-[clamp(1rem,1.2vw,1.125rem)] leading-relaxed text-[var(--color-text-light-secondary)]">
                {siteConfig.hero.description}
              </p>
              <p className="mt-4 max-w-[58ch] text-sm leading-relaxed text-[var(--color-muted)]">
                From comforting soups and crispy starters to biryanis, curries, rice, noodles and Indian breads, explore a menu with options for different tastes and appetites.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href={siteConfig.links.primaryCta} className="btn btn-primary">
                  Explore Menu
                </Link>
                <DirectionsLink className="btn btn-secondary">Get Directions</DirectionsLink>
              </div>
            </div>

            <div className="scroll-reveal scroll-interactive relative overflow-hidden border border-[var(--color-border-dark)] bg-[var(--color-bg-secondary)]" data-reveal="right">
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
            <div className="overflow-hidden border border-[var(--color-border-dark)] scroll-interactive">
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
            <div className="scroll-reveal" data-reveal="right">
              <p className="eyebrow text-[var(--color-accent)]">{siteConfig.intro.eyebrow}</p>
              <h2 className="section-title mt-3 text-[var(--color-text-light-primary)]">{siteConfig.intro.title}</h2>
              <p className="mt-5 max-w-[62ch] text-base leading-relaxed text-[var(--color-text-light-secondary)]">
                {siteConfig.intro.description}
              </p>
              <p className="mt-4 max-w-[62ch] text-base leading-relaxed text-[var(--color-text-light-secondary)]">
                Whether you are deciding on a familiar comfort dish, sharing starters with friends, or choosing a full meal with rice and curry, use the menu to compare options before you order. Vegetarian and non-vegetarian choices are marked to make browsing easier.
              </p>
              <p className="mt-4 max-w-[62ch] text-base leading-relaxed text-[var(--color-text-light-secondary)]">
                Located on Main Road in New Gajuwaka, FULL MOONs gives you a simple starting point for planning a meal: explore the printed menu, check current availability, then choose delivery or a visit.
              </p>
              <p className="mt-5 rounded-sm border border-[var(--color-border-dark)] bg-[var(--color-bg-primary)] p-4 text-sm leading-relaxed text-[var(--color-muted)]">
                Menu prices and availability can change. Please confirm current details with the restaurant or your chosen ordering platform.
              </p>
            </div>
          </div>
        </section>

        <section id="menu-highlights" className="section-space bg-[var(--color-bg-primary)]">
          <div className="site-container">
            <SectionHeading
              eyebrow="About the Menu"
              title="A little something for every appetite"
              description="Browse vegetarian and non-vegetarian favourites as they glide by. Choose a category to pause its row and explore dishes with their printed menu prices."
            />
            <MenuShowcase categories={siteConfig.menuOverview} />
          </div>
        </section>

        <section id="menu" className="menu-bg section-space relative overflow-hidden bg-[var(--color-bg-primary)] text-[var(--color-text-light-primary)]">
          <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-[var(--color-accent)]/10 blur-3xl" />
          <div aria-hidden="true" className="pointer-events-none absolute -bottom-32 -left-24 h-96 w-96 rounded-full bg-[var(--color-spice)]/20 blur-3xl" />
          <div className="site-container relative scroll-reveal">
            <SectionHeading
              eyebrow="Menu"
              title="Explore by Category"
              description={
                <>
                  <p>
                    Choose a section to expand its dishes and printed prices. Search for a favourite, or order through Swiggy or Zomato.
                  </p>
                  <div className="mt-4 flex flex-wrap gap-3">
                    <ActionLink href={siteConfig.links.swiggyListing} className="btn border-transparent bg-[#FC8019] text-white hover:bg-[#e66f0e] focus-visible:outline-[#FC8019]">
                      Order on Swiggy
                    </ActionLink>
                    <ActionLink href={siteConfig.links.zomatoListing} className="btn border-transparent bg-[#E23744] text-white hover:bg-[#c92e3a] focus-visible:outline-[#E23744]">
                      Order on Zomato
                    </ActionLink>
                    <ActionLink href={siteConfig.links.districtListing} className="btn border-transparent bg-[#6C3CF0] text-white hover:bg-[#572bd0] focus-visible:outline-[#6C3CF0]">
                      Book Dine-in on District
                    </ActionLink>
                  </div>
                </>
              }
            />

            <MenuExplorer categories={siteConfig.menuOverview} />
          </div>
        </section>

        <section id="gallery" className="section-space border-y border-[var(--color-border-dark)] bg-[var(--color-bg-secondary)]">
          <div className="site-container">
            <SectionHeading
              eyebrow="Photo Gallery"
              title="A closer look at the menu"
              description="Explore a visual selection of dishes and menu categories. Images are illustrative previews; please confirm specific dishes and presentation with the restaurant."
            />
            <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-12">
              <figure className="gallery-tile scroll-reveal scroll-interactive col-span-2 overflow-hidden border border-[var(--color-border-dark)] sm:col-span-1 lg:col-span-7">
                <div className="relative aspect-[5/4] overflow-hidden sm:aspect-[4/5] lg:aspect-[5/3]">
                  <Image src="/images/hero-biryani.jpg" alt="Illustrative biryani presentation" fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 58vw" className="gallery-image object-cover" />
                </div>
                <figcaption className="p-3 sm:p-4"><span className="eyebrow text-[var(--color-accent)]">Biryani favourites</span><p className="mt-1 font-heading text-lg sm:text-xl">A hearty centrepiece</p></figcaption>
              </figure>
              <figure className="gallery-tile scroll-reveal scroll-interactive overflow-hidden border border-[var(--color-border-dark)] lg:col-span-5">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image src="/images/featured-starters.jpg" alt="Illustrative Indian starter dishes" fill sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 42vw" className="gallery-image object-cover" />
                </div>
                <figcaption className="p-3 sm:p-4"><span className="eyebrow text-[var(--color-accent)]">Starters</span><p className="mt-1 font-heading text-lg sm:text-xl">Something to share</p></figcaption>
              </figure>
              <figure className="gallery-tile scroll-reveal scroll-interactive overflow-hidden border border-[var(--color-border-dark)] lg:col-span-4">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image src="/images/featured-veg.jpg" alt="Illustrative vegetarian dishes" fill sizes="(max-width: 640px) 50vw, 33vw" className="gallery-image object-cover" />
                </div>
                <figcaption className="p-3 sm:p-4"><span className="eyebrow text-[var(--color-accent)]">Vegetarian</span><p className="mt-1 font-heading text-lg sm:text-xl">Vegetarian choices</p></figcaption>
              </figure>
              <figure className="gallery-tile scroll-reveal scroll-interactive overflow-hidden border border-[var(--color-border-dark)] lg:col-span-4">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image src="/images/gallery-curry.jpg" alt="Illustrative curry dish" fill sizes="(max-width: 640px) 50vw, 33vw" className="gallery-image object-cover" />
                </div>
                <figcaption className="p-3 sm:p-4"><span className="eyebrow text-[var(--color-accent)]">Curries</span><p className="mt-1 font-heading text-lg sm:text-xl">Rich, comforting flavours</p></figcaption>
              </figure>
              <figure className="gallery-tile scroll-reveal scroll-interactive overflow-hidden border border-[var(--color-border-dark)] lg:col-span-4">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image src="/images/featured-noodles.jpg" alt="Illustrative rice and noodle dishes" fill sizes="(max-width: 640px) 50vw, 33vw" className="gallery-image object-cover" />
                </div>
                <figcaption className="p-3 sm:p-4"><span className="eyebrow text-[var(--color-accent)]">Rice & noodles</span><p className="mt-1 font-heading text-lg sm:text-xl">Everyday favourites</p></figcaption>
              </figure>
              <figure className="gallery-tile scroll-reveal scroll-interactive overflow-hidden border border-[var(--color-border-dark)] lg:col-span-4">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image src="/images/featured-starters.jpg" alt="Illustrative crispy starter selection" fill sizes="(max-width: 640px) 50vw, 33vw" className="gallery-image object-cover" />
                </div>
                <figcaption className="p-3 sm:p-4"><span className="eyebrow text-[var(--color-accent)]">Crispy starters</span><p className="mt-1 font-heading text-lg sm:text-xl">Small plates to begin</p></figcaption>
              </figure>
              <figure className="gallery-tile scroll-reveal scroll-interactive overflow-hidden border border-[var(--color-border-dark)] lg:col-span-4">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image src="/images/gallery-curry.jpg" alt="Illustrative Indian curry selection" fill sizes="(max-width: 640px) 50vw, 33vw" className="gallery-image object-cover" />
                </div>
                <figcaption className="p-3 sm:p-4"><span className="eyebrow text-[var(--color-accent)]">Main course</span><p className="mt-1 font-heading text-lg sm:text-xl">Curries for the table</p></figcaption>
              </figure>
              <figure className="gallery-tile scroll-reveal scroll-interactive overflow-hidden border border-[var(--color-border-dark)] lg:col-span-4">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image src="/images/featured-veg.jpg" alt="Illustrative Indian vegetarian meal" fill sizes="(max-width: 640px) 50vw, 33vw" className="gallery-image object-cover" />
                </div>
                <figcaption className="p-3 sm:p-4"><span className="eyebrow text-[var(--color-accent)]">Meal ideas</span><p className="mt-1 font-heading text-lg sm:text-xl">Build your own spread</p></figcaption>
              </figure>
            </div>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="#menu" className="btn btn-primary">Explore Full Menu</Link>
              <ActionLink href={siteConfig.links.swiggyListing} className="btn border-transparent bg-[#FC8019] text-white hover:bg-[#e66f0e]">Order on Swiggy</ActionLink>
            </div>
          </div>
        </section>

        <section className="section-space border-y border-[var(--color-border-dark)] bg-[var(--color-bg-secondary)]">
          <div className="site-container">
            <SectionHeading
              eyebrow="Order & Contact"
              title="Reach FULL MOONs quickly"
              description="Use your preferred channel to connect. Choose a delivery platform to open the restaurant listing and place your order."
            />

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
              <ActionLink href={siteConfig.business.contact.phoneHref} className="action-card scroll-reveal" ariaLabel="Call FULL MOONs Family Restaurant">
                <h3>Call</h3>
                <p>{siteConfig.business.contact.phoneDisplay}</p>
              </ActionLink>

              <ActionLink href={siteConfig.business.contact.whatsappHref} className="action-card scroll-reveal">
                <h3>WhatsApp</h3>
                <p>Send a quick menu enquiry</p>
              </ActionLink>

              <ActionLink href={siteConfig.links.swiggyListing} className="action-card scroll-reveal border-[#FC8019]/60 hover:border-[#FC8019] hover:bg-[#FC8019]/10" ariaLabel="Order from FULL MOONs on Swiggy">
                <h3 className="text-[#FC8019]">Order on Swiggy</h3>
                <p>Open restaurant listing →</p>
              </ActionLink>

              <ActionLink href={siteConfig.links.zomatoListing} className="action-card scroll-reveal border-[#E23744]/60 hover:border-[#E23744] hover:bg-[#E23744]/10" ariaLabel="Order from FULL MOONs on Zomato">
                <h3 className="text-[#E23744]">Order on Zomato</h3>
                <p>Open restaurant listing →</p>
              </ActionLink>

              <ActionLink href={siteConfig.links.districtListing} className="action-card scroll-reveal border-[#6C3CF0]/60 hover:border-[#6C3CF0] hover:bg-[#6C3CF0]/10" ariaLabel="Book a dine-in experience for FULL MOONs on District">
                <h3 className="text-[#9B7AFF]">Dine-in on District</h3>
                <p>Discover dine-in options →</p>
              </ActionLink>
            </div>
          </div>
        </section>

        <section id="visit-us" className="section-space bg-[var(--color-bg-primary)]">
          <div className="site-container grid gap-7 lg:grid-cols-2 scroll-reveal">
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
                  <ActionLink href={siteConfig.business.contact.phoneHref} className="btn btn-secondary">
                    Call Restaurant
                  </ActionLink>
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
          <div className="site-container text-center scroll-reveal">
            <p className="eyebrow mx-auto text-[var(--color-accent)]">Plan ahead</p>
            <h2 className="section-title mt-3 text-[var(--color-text-light-primary)]">Plan Your Next Visit.</h2>
            <p className="mx-auto mt-4 max-w-[62ch] text-[var(--color-text-light-secondary)]">
              Browse the full printed menu, order through Swiggy or Zomato, or get directions to visit us.
            </p>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
              <Link href="#menu" className="btn btn-primary">
                Explore Menu
              </Link>
              <DirectionsLink className="btn btn-secondary">Get Directions</DirectionsLink>
              <ActionLink href={siteConfig.links.swiggyListing} className="btn border-transparent bg-[#FC8019] text-white hover:bg-[#e66f0e]">Order on Swiggy</ActionLink>
              <ActionLink href={siteConfig.links.zomatoListing} className="btn border-transparent bg-[#E23744] text-white hover:bg-[#c92e3a]">Order on Zomato</ActionLink>
              <ActionLink href={siteConfig.links.districtListing} className="btn border-transparent bg-[#6C3CF0] text-white hover:bg-[#572bd0]">Dine-in on District</ActionLink>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-[var(--color-border-dark)] bg-[var(--color-bg-primary)] py-12 text-[var(--color-text-light-secondary)]">
        <div className="site-container grid gap-8 md:grid-cols-3 scroll-reveal">
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
            <ActionLink href={siteConfig.business.contact.phoneHref} className="mt-3 block text-sm hover:text-[var(--color-text-light-primary)]">
              {siteConfig.business.contact.phoneDisplay}
            </ActionLink>
            <div className="mt-3 flex flex-col gap-2 text-sm">
              <ActionLink href={siteConfig.links.districtListing} className="hover:text-[var(--color-text-light-primary)]">
                District Listing
              </ActionLink>
              <DirectionsLink className="hover:text-[var(--color-text-light-primary)]">
                Google Maps Directions
              </DirectionsLink>
            </div>
          </div>
        </div>

        <div className="site-container mt-10 border-t border-[var(--color-border-dark)] pt-6 text-xs text-[var(--color-muted)]">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p>© {new Date().getFullYear()} FULL MOONs Family Restaurant. All rights reserved.</p>
            <Link href="/privacy" aria-label="Privacy notice" className="hover:text-[var(--color-text-light-secondary)]">
              Privacy Notice
            </Link>
          </div>
        </div>
      </footer>

      <FloatingActions />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
    </>
  );
}
