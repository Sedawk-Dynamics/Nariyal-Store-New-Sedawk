"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

export default function LifestyleBanner() {
  return (
    <section className="relative overflow-hidden min-h-[520px] flex items-center">
      <Image
        src="/images/lifestyle-beach.png"
        alt="Young woman enjoying fresh coconut water at the beach"
        fill
        className="object-cover"
        sizes="100vw"
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-foreground/75 via-foreground/40 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-xl"
        >
          <p className="text-accent font-semibold uppercase tracking-widest text-sm mb-4">Live Refreshed</p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-white text-balance leading-tight mb-6">
            Hydration That Fits Your Lifestyle
          </h2>
          <p className="text-white/80 text-lg leading-relaxed mb-8">
            Whether you&apos;re at the beach, after a workout, or simply soaking in the summer — Nariyal Store keeps you naturally refreshed.
          </p>
          <a
            href="#shop"
            className="inline-flex items-center gap-2 bg-accent text-foreground font-bold px-8 py-4 rounded-2xl hover:bg-accent/90 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 text-sm"
          >
            Shop Now
            <ArrowRight size={16} />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
