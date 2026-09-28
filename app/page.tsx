import Navbar from "@/components/navbar"
import HeroSection from "@/components/hero-section"
import ProductsSection from "@/components/products-section"
import BenefitsSection from "@/components/benefits-section"
import TestimonialsSection from "@/components/testimonials-section"
import MarqueeSection from "@/components/marquee-section"
import SpinSection from "@/components/spin-section"
import BannerSection from "@/components/banner-section"
import StorySection from "@/components/story-section"
import ServicesSection from "@/components/services-section"
import GallerySection from "@/components/gallery-section"
import Footer from "@/components/footer"

export default function HomePage() {
  return (
    <main>
      <Navbar overlay />
      <HeroSection />
      <ProductsSection />
      <BenefitsSection />
      <TestimonialsSection />
      <MarqueeSection />
      <SpinSection />
      <BannerSection />
      <StorySection />
      <ServicesSection />
      <GallerySection />
      <Footer />
    </main>
  )
}
