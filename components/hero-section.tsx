"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { motion, useReducedMotion } from "framer-motion"

import RevealText from "@/components/reveal-text"
import { onIntroDone } from "@/lib/intro"

const slides = [
  {
    src: "/images/hero-banners/nariyal-tropical-beach-kiosk.png",
    title: "Nariyal Store Tropical Beach Kiosk",
    alt: "Nariyal Store kiosk stocked with fresh coconuts and chilled drinks beside a tropical beach. Pan India delivery, sustainably sourced, hygienic and safe.",
  },
  {
    src: "/images/hero-banners/tropical-nariyal-branding.png",
    title: "Tropical Nariyal Store Branding Display",
    alt: "Nariyal Store natural branding solutions: custom logo coconuts and gift packaging on a tropical beach. Same freshness, now with your identity. Pan India delivery, hygienic and safe, eco friendly packaging, ideal for gifting.",
  },
]

export default function HeroSection() {
  const reducedMotion = useReducedMotion()
  // Entrances wait for the entry loader's wipe (or start at once when there is none).
  const [ready, setReady] = useState(false)
  useEffect(() => onIntroDone(() => setReady(true)), [])

  const [activeSlide, setActiveSlide] = useState(0)

  return (
    <section id="home" aria-label="Nariyal Store" className="relative bg-cream">
      <div className="relative isolate bg-[#153c2c] text-cream">
        <div aria-hidden="true" className="relative aspect-[1944/809] w-full">
          {slides.map((slide, index) => (
            <Image key={slide.src} src={slide.src} alt="" fill priority={index === 0} sizes="100vw"
              className={`object-contain transition-opacity duration-700 motion-reduce:transition-none ${index === activeSlide ? "opacity-100" : "opacity-0"}`}
            />
          ))}
        </div>
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden bg-[linear-gradient(90deg,rgba(15,45,31,0.85)_0%,rgba(15,45,31,0.65)_28%,rgba(15,45,31,0.1)_60%,transparent_100%)] md:block" />

        <div className="gutter relative grid pt-8 pb-24 md:absolute md:inset-0 md:pt-6 md:pb-6">
          <div className="self-center text-left md:max-w-[52%]">
            <RevealText
              as="h1"
              text="Drink pure."
              mode="scatter"
              onMount
              play={ready}
              className="type-display text-[clamp(3.5rem,7.5vw,12rem)] leading-[1.05]"
            />
            <motion.p
              initial={reducedMotion ? false : { opacity: 0, clipPath: "inset(0 100% 0 0)" }}
              animate={ready ? { opacity: 1, clipPath: "inset(0 0% 0 0)" } : undefined}
              transition={{ duration: 0.8, delay: 0.55, ease: "easeOut" }}
              className="type-display mt-[clamp(.5rem,1vw,.75rem)] text-[clamp(1.125rem,1.8vw,2rem)]"
            >
              Tender coconut water your body agrees with.
            </motion.p>
          </div>
        </div>
        <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 items-center gap-1 rounded-full bg-black/35 p-1 text-cream backdrop-blur-sm" aria-label="Banner controls">
          {slides.map((slide, index) => (
            <button key={slide.src} type="button" onClick={() => setActiveSlide(index)} aria-label={`Show banner ${index + 1}: ${slide.title}`} aria-pressed={activeSlide === index} className="flex size-11 items-center justify-center rounded-full hover:bg-white/15">
              <span aria-hidden="true" className={`h-2 rounded-full ${index === activeSlide ? "w-6 bg-cream" : "w-2 bg-cream/40"}`} />
            </button>
          ))}
        </div>
        <p className="sr-only" aria-live="polite" aria-atomic="true">{slides[activeSlide].alt}</p>
      </div>
    </section>
  )
}
