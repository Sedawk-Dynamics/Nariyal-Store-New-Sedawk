"use client"

import { useRef } from "react"
import Image from "next/image"
import { motion, useMotionTemplate, useReducedMotion, useScroll, useTransform } from "framer-motion"

const WORD = "Pure Pure"
const wordClass =
  "type-display m-0 w-max text-[21.875vw] leading-[0.84] tracking-normal whitespace-nowrap"

/**
 * Oversized wordmark that fills from pale to ink on a slanted wipe as you
 * scroll, with a coconut sticker turning in front of it.
 */
export default function SpinSection() {
  const ref = useRef<HTMLElement>(null)
  const reducedMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })

  const rotate = useTransform(scrollYProgress, [0, 1], reducedMotion ? [0, 0] : [-28, 28])
  const y = useTransform(scrollYProgress, [0, 1], reducedMotion ? ["0%", "0%"] : ["8%", "-8%"])
  // Wipe edge travels top to bottom; the right side leads by 40% for the slant.
  const edge = useTransform(scrollYProgress, [0.2, 0.55], reducedMotion ? [140, 140] : [-40, 140])
  const clipPath = useMotionTemplate`polygon(0% 0%, 100% 0%, 100% calc(${edge}% - 40%), 0% ${edge}%)`

  return (
    <section ref={ref} aria-hidden="true" className="section-pad-top section-pad-bottom overflow-hidden bg-cream text-ink">
      <div className="relative flex justify-center">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <p className={`${wordClass} text-ink/15`}>{WORD}</p>
          <motion.p style={{ clipPath }} className={`${wordClass} absolute inset-0`}>
            {WORD}
          </motion.p>
        </div>
        <motion.div
          style={{ rotate, y }}
          className="relative z-[1] aspect-square w-[max(220px,34vw)] overflow-hidden rounded-full border-[1.5px] border-ink bg-white"
        >
          <Image
            src="/images/hero-coconut.webp"
            alt=""
            fill
            sizes="(min-width: 768px) 34vw, 220px"
            className="scale-[1.2] object-cover object-[50%_58%]"
          />
        </motion.div>
      </div>
    </section>
  )
}
