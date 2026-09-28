"use client"

import Link from "next/link"
import { motion } from "framer-motion"

import BtnLabel from "@/components/btn-label"
import { brandingOptions } from "@/lib/events-data"

export default function BrandingBanner({
  ctaLabel = "Book Your Event",
  ctaHref = "/#contact",
}: {
  ctaLabel?: string
  ctaHref?: string
}) {
  return (
    <section id="branding" className="scroll-mt-24 bg-cream px-2.5 pb-[var(--section-pad)] md:px-[1.5625vw]">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="media-frame bg-lilac p-8 text-ink md:p-[4vw]"
      >
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div className="flex flex-col items-start gap-5">
            <p className="type-mono uppercase">Personalized Coconut Branding</p>
            <h2 className="type-h2 text-balance">Your logo on every coconut.</h2>
            <p className="type-mono text-[13px] md:text-[max(12px,.95vw)]">
              Make every occasion memorable with customized tender coconuts featuring your logo,
              names, messages, QR codes, or event branding. Perfect for corporate gifts, weddings,
              and brand promotions.
            </p>
            <Link href={ctaHref} className="btn-vibe btn-vibe--ink mt-2">
              <BtnLabel>{ctaLabel}</BtnLabel>
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3">
            {brandingOptions.map((opt, i) => (
              <motion.div
                key={opt.label}
                initial={{ opacity: 0, scale: 0.92 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 + 0.2, duration: 0.4 }}
                className="-mr-[1.5px] -mb-[1.5px] flex flex-col items-center gap-2 border-[1.5px] border-ink bg-cream p-4 text-center transition-colors duration-200 hover:bg-lemon"
              >
                <span aria-hidden="true" className="text-3xl">
                  {opt.icon}
                </span>
                <p className="type-mono text-[11px] uppercase">{opt.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  )
}
