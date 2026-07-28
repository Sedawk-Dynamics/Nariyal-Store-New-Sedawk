import Navbar from "@/components/navbar"
import HeroSection from "@/components/hero-section"
import MarqueeSection from "@/components/marquee-section"
import ProductsSection from "@/components/products-section"
import BenefitsSection from "@/components/benefits-section"
import StorySection from "@/components/story-section"
import CoconutInteractive from "@/components/coconut-interactive"
import LifestyleBanner from "@/components/lifestyle-banner"
import HowItWorks from "@/components/how-it-works"
import SubscriptionSection from "@/components/subscription-section"
import TestimonialsSection from "@/components/testimonials-section"
import GallerySection from "@/components/gallery-section"
import NewsletterSection from "@/components/newsletter-section"
import Footer from "@/components/footer"

export default function HomePage() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <MarqueeSection />
      <ProductsSection />
      <BenefitsSection />
      <StorySection />
      <CoconutInteractive />
      <LifestyleBanner />
      <HowItWorks />
      <SubscriptionSection />
      <TestimonialsSection />
      <GallerySection />
      <NewsletterSection />
      <Footer />
    </main>
  )
}
