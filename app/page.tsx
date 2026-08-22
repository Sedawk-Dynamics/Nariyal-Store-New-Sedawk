import Navbar from "@/components/navbar"
import HeroSection from "@/components/hero-section"
import ServicesSection from "@/components/services-section"
import StorySection from "@/components/story-section"
import MarqueeSection from "@/components/marquee-section"
import ProductsSection from "@/components/products-section"
import BenefitsSection from "@/components/benefits-section"
import HowItWorks from "@/components/how-it-works"
import TestimonialsSection from "@/components/testimonials-section"
import GallerySection from "@/components/gallery-section"
import NewsletterSection from "@/components/newsletter-section"
import Footer from "@/components/footer"

export default function HomePage() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <ServicesSection />
      <StorySection />
      <MarqueeSection />
      <ProductsSection />
      <BenefitsSection />
      <HowItWorks />
      <TestimonialsSection />
      <GallerySection />
      <NewsletterSection />
      <Footer />
    </main>
  )
}
