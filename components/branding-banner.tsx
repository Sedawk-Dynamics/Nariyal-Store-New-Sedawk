"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

import { brandingOptions } from "@/lib/events-data"

export default function BrandingBanner({
  ctaLabel = "Book Your Event",
  ctaHref = "/#contact",
}: {
  ctaLabel?: string
  ctaHref?: string
}) {
  return (
    <section id="branding" className="pb-24 bg-background scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative rounded-3xl overflow-hidden"
        >
          {/* Animated shimmering gradient background */}
          <motion.div
            aria-hidden
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(120deg, #2D5A1B 0%, #4A8A2A 35%, #2D5A1B 65%, #3E7524 100%)",
              backgroundSize: "200% 200%",
            }}
            animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
            transition={{ duration: 12, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          />

          <div className="relative p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <p className="text-accent font-semibold uppercase tracking-widest text-sm mb-3">
                  Personalized Coconut Branding
                </p>
                <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white text-balance mb-4">
                  Your Logo on Every Coconut
                </h2>
                <p className="text-white/75 leading-relaxed mb-6 text-sm">
                  Make every occasion memorable with customized tender coconuts featuring your logo,
                  names, messages, QR codes, or event branding. Perfect for corporate gifts, weddings,
                  and brand promotions.
                </p>
                <motion.a
                  href={ctaHref}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="group inline-flex items-center gap-2 bg-accent text-foreground font-bold px-7 py-3.5 rounded-2xl transition-all duration-300 text-sm shadow-lg hover:shadow-xl"
                >
                  {ctaLabel}
                  <ArrowRight
                    size={15}
                    aria-hidden="true"
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </motion.a>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {brandingOptions.map((opt, i) => (
                  <motion.div
                    key={opt.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -4, scale: 1.04 }}
                    transition={{ delay: i * 0.08 + 0.3, duration: 0.4 }}
                    className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 text-center border border-white/15 hover:bg-white/20 hover:border-white/30 transition-colors duration-200"
                  >
                    <motion.span
                      aria-hidden="true"
                      className="text-3xl block mb-2"
                      animate={{ y: [0, -3, 0] }}
                      transition={{
                        duration: 2.4,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                        delay: i * 0.15,
                      }}
                    >
                      {opt.icon}
                    </motion.span>
                    <p className="text-white text-xs font-semibold leading-tight">{opt.label}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
