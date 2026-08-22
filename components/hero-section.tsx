"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

const AUTOPLAY_INTERVAL_MS = 5500

const SLIDES = [
  {
    src: "/images/hero-banners/hero-slide-1.jpeg",
    alt: "Every occasion deserves something pure - Nariyal Store celebration coconuts for Baraat, Haldi, Mehendi, and more",
  },
  {
    src: "/images/hero-banners/hero-slide-2.jpeg",
    alt: "Pure Nariyal, Pure Refreshment - Nariyal Store outlet with fresh coconut menu and chilled beverages",
  },
  {
    src: "/images/hero-banners/hero-slide-3.jpeg",
    alt: "Pure Hydration, Pure Energy - Baraat Swagat, store visits, and Nariyal delivered to your doorstep",
  },
]

export default function HeroSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const goToSlide = useCallback((index: number) => {
    setActiveIndex((index + SLIDES.length) % SLIDES.length)
  }, [])

  const goToNext = useCallback(() => {
    goToSlide(activeIndex + 1)
  }, [activeIndex, goToSlide])

  const goToPrevious = useCallback(() => {
    goToSlide(activeIndex - 1)
  }, [activeIndex, goToSlide])

  useEffect(() => {
    if (isPaused) return

    timeoutRef.current = setTimeout(() => {
      setActiveIndex((current) => (current + 1) % SLIDES.length)
    }, AUTOPLAY_INTERVAL_MS)

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [activeIndex, isPaused])

  return (
    <section
      id="home"
      aria-label="Nariyal Store hero banner"
      aria-roledescription="carousel"
      className="relative isolate mt-16 overflow-hidden bg-background sm:mt-20"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      <div className="relative mx-auto w-full overflow-hidden">
        {SLIDES.map((slide, index) => (
          <div
            key={slide.src}
            role="group"
            aria-roledescription="slide"
            aria-label={`Slide ${index + 1} of ${SLIDES.length}`}
            aria-hidden={index !== activeIndex}
            className={cn(
              "transition-opacity duration-700 ease-in-out",
              index === activeIndex ? "relative block opacity-100" : "absolute inset-0 opacity-0",
            )}
          >
            <Image
              src={slide.src || "/placeholder.svg"}
              alt={slide.alt}
              width={1536}
              height={2048}
              priority={index === 0}
              sizes="100vw"
              className="block h-auto w-full object-contain object-center"
            />
          </div>
        ))}

        <button
          type="button"
          onClick={goToPrevious}
          aria-label="Previous hero slide"
          className="absolute left-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-background/70 text-foreground shadow-sm transition hover:bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary sm:left-4 sm:h-11 sm:w-11"
        >
          <ChevronLeft className="h-5 w-5" aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={goToNext}
          aria-label="Next hero slide"
          className="absolute right-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-background/70 text-foreground shadow-sm transition hover:bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary sm:right-4 sm:h-11 sm:w-11"
        >
          <ChevronRight className="h-5 w-5" aria-hidden="true" />
        </button>

        <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-2 sm:bottom-5">
          {SLIDES.map((slide, index) => (
            <button
              key={slide.src}
              type="button"
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={index === activeIndex}
              className={cn(
                "h-2 rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                index === activeIndex ? "w-6 bg-primary" : "w-2 bg-background/70 hover:bg-background",
              )}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
