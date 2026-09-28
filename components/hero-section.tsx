"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useMotionTemplate, useReducedMotion, useScroll, useTransform } from "framer-motion"

import BtnLabel from "@/components/btn-label"
import RevealText from "@/components/reveal-text"
import { onIntroDone } from "@/lib/intro"

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const reducedMotion = useReducedMotion()
  // Entrances wait for the entry loader's wipe (or start at once when there is none).
  const [ready, setReady] = useState(false)
  useEffect(() => onIntroDone(() => setReady(true)), [])

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] })
  const still = reducedMotion ? 0 : 1
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", `${12 * still}%`])
  // The photo keeps zooming in as the hero scrolls away.
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1 + 0.3 * still])
  // As the page scrolls, the full-bleed hero tucks into an inset card with rounded corners.
  const inset = useTransform(scrollYProgress, [0, 0.35], [0, 10 * still])
  const radius = useTransform(scrollYProgress, [0, 0.35], [0, 34 * still])
  const clipPath = useMotionTemplate`inset(0px ${inset}px 0px ${inset}px round 0px 0px ${radius}px ${radius}px)`

  return (
    <section ref={sectionRef} id="home" aria-label="Nariyal Store" className="relative bg-cream">
      <motion.div style={{ clipPath }} className="relative isolate overflow-hidden bg-[#7d6b5b] text-cream">
        <motion.div aria-hidden="true" style={{ y: bgY, scale: bgScale }} className="absolute inset-x-0 -top-[10%] -z-10 h-[120%]">
          <Image
            src="/images/lifestyle-beach.png"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-[center_35%]"
          />
        </motion.div>
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-black/20" />

        <div className="gutter grid min-h-[100svh] grid-rows-[1fr_auto] pt-[calc(var(--header-height)+36px+2rem)] pb-[clamp(1.5rem,4vh,2.5rem)]">
          <div className="self-center text-center md:text-left">
            <RevealText
              as="h1"
              text="Drink pure."
              mode="scatter"
              onMount
              play={ready}
              className="type-display text-[clamp(3.5rem,12.3vw,30rem)] leading-[1.05]"
            />
            <motion.p
              initial={reducedMotion ? false : { opacity: 0, clipPath: "inset(0 100% 0 0)" }}
              animate={ready ? { opacity: 1, clipPath: "inset(0 0% 0 0)" } : undefined}
              transition={{ duration: 0.8, delay: 0.55, ease: "easeOut" }}
              className="type-display mt-[clamp(.5rem,1vw,.75rem)] text-[clamp(1.125rem,2.25vw,2rem)]"
            >
              Tender coconut water your body agrees with.
            </motion.p>
          </div>

          <motion.div
            initial={reducedMotion ? false : { opacity: 0, scale: 0.6 }}
            animate={ready ? { opacity: 1, scale: 1 } : undefined}
            transition={{ type: "spring", stiffness: 300, damping: 16, delay: 0.8 }}
            className="justify-self-center"
          >
            <Link href="/menu" className="btn-vibe">
              <BtnLabel>Shop Now</BtnLabel>
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
