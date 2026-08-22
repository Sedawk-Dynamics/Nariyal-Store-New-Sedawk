"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { Star, BadgeCheck } from "lucide-react"

const AUTOSCROLL_INTERVAL_MS = 3000

const testimonials = [
  {
    name: "Priya Sharma",
    location: "Nehru Place, Delhi",
    rating: 5,
    review: "Visited the Epicuria outlet and it was such a premium experience! The coconut was super chilled, freshly opened right in front of me. The Coconut Lemonade is absolutely amazing.",
    initials: "PS",
  },
  {
    name: "Rahul Verma",
    location: "South Delhi",
    rating: 5,
    review: "We booked Nariyal Store for our corporate event branding — 200 coconuts with our company logo. The quality and precision was top-notch. Everyone loved it!",
    initials: "RV",
  },
  {
    name: "Anjali Mehta",
    location: "Greater Kailash, Delhi",
    rating: 5,
    review: "Got personalized coconuts for our wedding with our names and date engraved. It was the most unique gifting idea! The guests were absolutely delighted.",
    initials: "AM",
  },
  {
    name: "Kiran Kapoor",
    location: "Saket, Delhi",
    rating: 5,
    review: "The Coconut Cold Coffee Frappe is unlike anything I have had before. So refreshing and creamy! The outlet at Nehru Place is my new go-to spot.",
    initials: "KK",
  },
  {
    name: "Deepak Reddy",
    location: "Noida",
    rating: 5,
    review: "Ordered the Tulsi Ginger Elixir and the Blue Lagoon Mocktail for a team lunch. Both were fresh, healthy, and beautifully presented. Nariyal Store never disappoints!",
    initials: "DR",
  },
  {
    name: "Meera Joshi",
    location: "Lajpat Nagar, Delhi",
    rating: 5,
    review: "The chilled tender coconut here is the best I have had in Delhi. Hygienically opened, perfectly sweet, and the staff is very professional. Highly recommended!",
    initials: "MJ",
  },
]

const colorPairs = [
  { bg: "bg-primary/10", text: "text-primary" },
  { bg: "bg-accent/20", text: "text-foreground" },
  { bg: "bg-primary/15", text: "text-primary" },
  { bg: "bg-accent/15", text: "text-foreground" },
  { bg: "bg-primary/10", text: "text-primary" },
  { bg: "bg-accent/20", text: "text-foreground" },
]

export default function TestimonialsSection() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    if (isPaused) return

    // Respect the visitor's motion preference — no automatic movement.
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)")
    if (reducedMotion.matches) return

    const interval = setInterval(() => {
      const track = scrollRef.current
      if (!track) return

      const cards = track.children
      if (cards.length < 2) return

      // Measure one card + gap from the rendered cards rather than hardcoding.
      const step =
        (cards[1] as HTMLElement).offsetLeft - (cards[0] as HTMLElement).offsetLeft

      const atEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 4
      track.scrollTo({ left: atEnd ? 0 : track.scrollLeft + step, behavior: "smooth" })
    }, AUTOSCROLL_INTERVAL_MS)

    return () => clearInterval(interval)
  }, [isPaused])

  return (
    <section className="py-24 bg-secondary/20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-semibold text-accent uppercase tracking-widest mb-3">Customer Love</p>
          <h2 className="text-4xl sm:text-5xl font-serif font-bold text-foreground text-balance">
            What Our <span className="text-primary">Customers Say</span>
          </h2>
          <p className="text-muted-foreground mt-4">Real experiences from our outlet visitors and event clients</p>
        </motion.div>

        {/* Auto-scrolling row — pauses on hover, focus, and touch */}
        <div
          ref={scrollRef}
          aria-label="Customer testimonials"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocus={() => setIsPaused(true)}
          onBlur={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
          className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide"
          style={{ scrollbarWidth: "none" }}
        >
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="bg-card rounded-3xl p-6 border border-border shrink-0 w-80 snap-start flex flex-col"
            >
              {/* Stars */}
              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} size={14} className="text-accent fill-accent" />
                ))}
              </div>

              {/* Review */}
              <p className="text-foreground/80 text-sm leading-relaxed flex-1 mb-5">
                &ldquo;{t.review}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full ${colorPairs[i % colorPairs.length].bg} flex items-center justify-center shrink-0`}>
                  <span className={`text-xs font-bold ${colorPairs[i % colorPairs.length].text}`}>{t.initials}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-sm text-foreground truncate">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.location}</p>
                </div>
                <div className="flex items-center gap-1 text-primary">
                  <BadgeCheck size={16} className="shrink-0" />
                  <span className="text-xs font-semibold">Verified</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Scroll hint */}
        <p className="text-center text-xs text-muted-foreground mt-4">
          Hover to pause — or scroll to browse reviews →
        </p>
      </div>
    </section>
  )
}
