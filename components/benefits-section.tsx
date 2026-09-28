"use client"

import { useRef, useState } from "react"
import Image from "next/image"
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "framer-motion"
import { Minus, Plus } from "lucide-react"

import RevealText from "@/components/reveal-text"

const benefits = [
  {
    title: "Good for your body",
    body: "Natural electrolytes, potassium and magnesium straight from the shell. It rehydrates, supports digestion and immunity, and asks nothing back.",
  },
  {
    title: "For whatever you're into",
    body: "After a workout, at a baraat, on a desk-lunch break, in the middle of a Delhi summer. Bring it anywhere you'd bring a cold drink, minus the guilt.",
  },
  {
    title: "Sweet, not sugary",
    body: "Sweetened by the coconut and nothing else. Zero artificial sugar, zero preservatives, naturally fat-free and low in calories.",
  },
  {
    title: "Opened fresh, served chilled",
    body: "Every coconut is hygienically cleaned, kept cold from farm to counter, and opened in front of you. Nothing sits pre-poured.",
  },
]

export default function BenefitsSection() {
  const [open, setOpen] = useState(0)
  const mediaRef = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: mediaRef, offset: ["start end", "end start"] })
  const imgY = useTransform(scrollYProgress, [0, 1], reducedMotion ? ["0%", "0%"] : ["-6%", "6%"])
  // Like the hero, the photo zooms in while the section scrolls through.
  const imgScale = useTransform(scrollYProgress, [0, 1], reducedMotion ? [1, 1] : [1, 1.3])

  return (
    <section id="why" className="scroll-mt-24 bg-cream pt-12 md:pt-[var(--section-pad)]">
      <div className="grid grid-cols-1 items-center gap-3 px-2.5 md:grid-cols-[675fr_697.5fr] md:gap-[1.5625vw] md:px-[1.5625vw]">
        <div className="py-9 md:px-[5.208vw] md:py-[2.5vw]">
          <RevealText
            mode="scroll"
            text="Everything a drink should be. Nothing it usually is."
            className="type-h3 mb-[clamp(24px,2.5vw,54px)] text-balance"
          />

          <div>
            {benefits.map((benefit, i) => {
              const isOpen = open === i
              return (
                <div key={benefit.title} className="border-b-[1.5px] border-ink">
                  <h3>
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? -1 : i)}
                      aria-expanded={isOpen}
                      aria-controls={`benefit-${i}`}
                      className={`type-body-lg flex w-full items-center justify-between gap-2 py-[clamp(16px,1.5625vw,34px)] text-left ${
                        i === 0 ? "pt-0" : ""
                      }`}
                    >
                      {benefit.title}
                      {isOpen ? (
                        <Minus aria-hidden="true" className="h-[max(16px,1.302vw)] w-[max(16px,1.302vw)] flex-none" />
                      ) : (
                        <Plus aria-hidden="true" className="h-[max(16px,1.302vw)] w-[max(16px,1.302vw)] flex-none" />
                      )}
                    </button>
                  </h3>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`benefit-${i}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="overflow-hidden"
                      >
                        <p className="type-mono pb-[clamp(16px,1.5625vw,34px)] text-[13px] md:text-[max(11px,.833vw)]">
                          {benefit.body}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </div>
        </div>

        <div ref={mediaRef} className="media-frame aspect-[697.5/750] max-h-[83.34vh] w-full">
          <motion.div style={{ y: imgY, scale: imgScale }} className="absolute inset-x-0 -top-[7.5%] h-[115%]">
            <Image
              src="/images/coconut-cafe-moment.jpg"
              alt="A smiling woman sipping a chilled coconut drink at the Agrohome Nariyal Store counter"
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              // Landscape photo in a near-square frame: keep her and the glass in view.
              className="object-cover object-[68%_center]"
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
