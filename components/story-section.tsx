"use client"

import Image from "next/image"
import Link from "next/link"

import { motion } from "framer-motion"

import BtnLabel from "@/components/btn-label"
import RevealText from "@/components/reveal-text"

export default function StorySection() {
  return (
    <section id="about" className="section-pad-bottom scroll-mt-24 bg-cream text-ink">
      <div className="flex flex-col items-center gap-9 px-5 md:flex-row md:justify-center md:gap-[4.167vw] md:px-[10.417vw]">
        <motion.div
          initial={{ opacity: 0, rotate: -6, y: 24 }}
          whileInView={{ opacity: 1, rotate: 0, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ type: "spring", stiffness: 120, damping: 14 }}
          className="w-[min(70vw,300px)] flex-none md:w-[30vw]"
        >
          <Image
            src="/images/logo.png"
            alt="Agrohome Nariyal Store logo: a tender coconut with a straw and umbrella"
            width={1239}
            height={1441}
            sizes="(min-width: 768px) 30vw, 70vw"
            className="h-auto w-full"
          />
        </motion.div>

        <div className="flex max-w-[450px] flex-col items-center gap-[clamp(24px,2.5vw,48px)] md:max-w-[31.25vw]">
          <RevealText
            as="p"
            speed={0.012}
            text="Every coconut starts on a trusted farm and is hand-picked for sweetness and water. Then it’s opened fresh, wherever you are. Nehru Place, a baraat, a boardroom, your doorstep."
            className="text-center text-[max(17px,1.615vw)] leading-[1.2] tracking-[0.02em] text-balance"
          />
          <Link href="/services/nariyal-store" className="btn-vibe">
            <BtnLabel>Our Story</BtnLabel>
          </Link>
        </div>
      </div>
    </section>
  )
}
