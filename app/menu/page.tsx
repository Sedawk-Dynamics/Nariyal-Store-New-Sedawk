import type { Metadata } from "next"

import Footer from "@/components/footer"
import MenuExplorer from "@/components/menu-explorer"
import Navbar from "@/components/navbar"
import NewsletterSection from "@/components/newsletter-section"
import PageHero from "@/components/page-hero"
import { menuItems } from "@/lib/menu-data"

export const metadata: Metadata = {
  title: "Full Menu — Nariyal Store",
  description:
    "Every drink on the Nariyal Store menu — tender coconuts, coconut lemonades, mojitos, smoothies, cold coffees, and detox drinks, all made fresh to order.",
}

export default function MenuPage() {
  return (
    <main>
      <Navbar />
      <PageHero
        eyebrow="Outlet Menu"
        headingLead="Nariyal Store"
        headingHighlight="Menu"
        intro={`All ${menuItems.length} drinks on our menu — nature's hydration, crafted for your health and made fresh with premium tender coconuts.`}
        primaryCta={{ label: "Order Now", href: "/#contact" }}
        secondaryCta={{ label: "Visit Our Store", href: "/services/nariyal-store" }}
      />

      <section className="bg-background py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <MenuExplorer />
          <p className="mt-14 text-center text-lg font-serif italic text-primary/70">
            &ldquo;Nature&apos;s Hydration — Crafted for Your Health&rdquo;
          </p>
        </div>
      </section>

      <NewsletterSection />
      <Footer />
    </main>
  )
}
