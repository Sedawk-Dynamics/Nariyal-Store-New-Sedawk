"use client"

import { useRef } from "react"
import { motion } from "framer-motion"
import { Star, BadgeCheck } from "lucide-react"

const testimonials = [
  {
    name: "Priya Sharma",
    location: "Mumbai",
    rating: 5,
    review: "Absolutely love the freshness! I wake up every morning to a fresh coconut delivered right at my door. The taste is incredible — like straight from the farm.",
    initials: "PS",
  },
  {
    name: "Rahul Verma",
    location: "Delhi",
    rating: 5,
    review: "Best coconut water I've ever had. I've tried packaged ones but nothing beats this. My gym recovery has improved so much since I started ordering.",
    initials: "RV",
  },
  {
    name: "Anjali Nair",
    location: "Bangalore",
    rating: 5,
    review: "The weekly subscription is a game changer. Super convenient, always fresh, and the packaging keeps them cold for hours. Highly recommend!",
    initials: "AN",
  },
  {
    name: "Kiran Patel",
    location: "Ahmedabad",
    rating: 5,
    review: "Finally found a source that delivers genuine tender coconuts with zero compromise on quality. The whole family is hooked now.",
    initials: "KP",
  },
  {
    name: "Deepak Reddy",
    location: "Hyderabad",
    rating: 5,
    review: "Ordered the family box and it was a hit at our Sunday brunch! Every coconut was perfectly fresh and chilled. Will definitely order again.",
    initials: "DR",
  },
  {
    name: "Meera Joshi",
    location: "Pune",
    rating: 5,
    review: "I was skeptical at first but the quality blew me away. The coconuts arrive exactly as described — fresh, fragrant, and absolutely delicious!",
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
        </motion.div>

        {/* Scrollable row */}
        <div ref={scrollRef} className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide" style={{ scrollbarWidth: "none" }}>
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
        <p className="text-center text-xs text-muted-foreground mt-4">Scroll to see more reviews →</p>
      </div>
    </section>
  )
}
