import type { Metadata } from "next"

import ContactForm from "@/components/contact-form"
import Footer from "@/components/footer"
import GallerySection from "@/components/gallery-section"
import Navbar from "@/components/navbar"
import RevealText from "@/components/reveal-text"

export const metadata: Metadata = {
  title: "Contact — Nariyal Store",
  description:
    "Get in touch with Agrohome Nariyal Store for orders, event bookings, coconut branding and outlet enquiries.",
}

export default function ContactPage() {
  return (
    <main>
      <Navbar />
      <section className="bg-cream px-4 pt-[clamp(24px,3.3vw,48px)] pb-[clamp(48px,6vw,110px)] text-ink">
        <RevealText
          as="h1"
          text="Contact"
          afterReveal
          className="type-display mb-[clamp(40px,4.9vw,70px)] text-center text-[clamp(36px,3.33vw,48px)] leading-none"
        />
        <ContactForm />
      </section>
      <GallerySection />
      <Footer />
    </main>
  )
}
