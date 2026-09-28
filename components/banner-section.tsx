"use client"

import { useRef } from "react"
import Image from "next/image"
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion"

export default function BannerSection() {
  const ref = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
  const y = useTransform(scrollYProgress, [0, 1], reducedMotion ? ["0%", "0%"] : ["-5%", "5%"])

  return (
    <section className="section-pad-bottom bg-cream">
      <div className="px-2.5 md:px-[1.5625vw]">
        <div ref={ref} className="media-frame aspect-video max-h-[83.34vh] w-full">
          <motion.div style={{ y }} className="absolute inset-x-0 -top-[6%] h-[112%]">
            <Image
              src="/images/hero-banners/nariyal-store-kiosk.jpg"
              alt="The Nariyal Store kiosk in a food court, with its lit sign and chilled drinks fridge"
              fill
              sizes="100vw"
              className="object-cover"
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
