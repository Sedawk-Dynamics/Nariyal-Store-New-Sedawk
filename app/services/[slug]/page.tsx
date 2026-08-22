import type { Metadata } from "next"
import { notFound } from "next/navigation"

import BrandingBanner from "@/components/branding-banner"
import EventShowcase from "@/components/event-showcase"
import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import NewsletterSection from "@/components/newsletter-section"
import PageHero from "@/components/page-hero"
import ServiceHighlights from "@/components/service-highlights"
import { eventsForService } from "@/lib/events-data"
import { getService, services } from "@/lib/services-data"

type Params = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }))
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params
  const service = getService(slug)

  if (!service) return { title: "Service Not Found — Nariyal Store" }

  return {
    title: `${service.title} — Nariyal Store`,
    description: service.intro,
  }
}

export default async function ServicePage({ params }: Params) {
  const { slug } = await params
  const service = getService(slug)

  if (!service) notFound()

  const relatedEvents = eventsForService(service.slug)

  return (
    <main>
      <Navbar />
      <PageHero
        eyebrow={service.eyebrow}
        headingLead={service.headingLead}
        headingHighlight={service.headingHighlight}
        intro={service.intro}
        image={service.image}
        alt={service.alt}
        primaryCta={service.primaryCta}
        secondaryCta={service.secondaryCta}
      />
      <ServiceHighlights body={service.body} highlights={service.highlights} />
      <EventShowcase
        events={relatedEvents}
        heading={service.eventsHeading}
        subheading={service.eventsSubheading}
      />
      {service.showBranding && <BrandingBanner ctaLabel={service.primaryCta.label} />}
      <NewsletterSection />
      <Footer />
    </main>
  )
}
