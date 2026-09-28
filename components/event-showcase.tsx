"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"

import BtnLabel from "@/components/btn-label"
import type { EventItem } from "@/lib/events-data"

function EventRow({ event, index }: { event: EventItem; index: number }) {
  const reversed = index % 2 === 1

  return (
    <div className="grid grid-cols-1 items-center gap-6 md:grid-cols-2 md:gap-[1.5625vw]">
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={`media-frame aspect-[4/3] ${reversed ? "md:order-2" : ""}`}
      >
        <Image
          src={event.image}
          alt={event.alt}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        className={`flex flex-col items-start gap-5 md:px-[5.2vw] ${reversed ? "md:order-1" : ""}`}
      >
        <p className="type-mono uppercase">{String(index + 1).padStart(2, "0")}</p>
        <h3 className="type-h3 text-balance">{event.title}</h3>
        <p className="type-mono text-[13px] md:text-[max(12px,.9vw)]">{event.description}</p>
        <Link href="/#contact" className="btn-vibe btn-vibe--outline mt-2">
          <BtnLabel>Enquire</BtnLabel>
        </Link>
      </motion.div>
    </div>
  )
}

export default function EventShowcase({
  events,
  heading,
  subheading,
}: {
  events: EventItem[]
  heading: string
  subheading: string
}) {
  if (events.length === 0) return null

  return (
    <section id="events" className="scroll-mt-24 overflow-hidden bg-cream pt-[var(--section-pad)] text-ink">
      <div className="ink-divider" />
      <div className="px-5 py-[clamp(48px,6vw,110px)] md:px-[1.5625vw]">
        <div className="mx-auto mb-[clamp(48px,6vw,110px)] max-w-4xl text-center">
          <h2 className="type-h2 text-balance">{heading}</h2>
          <p className="type-mono mx-auto mt-5 max-w-2xl text-[13px] md:text-[max(12px,1vw)]">{subheading}</p>
        </div>

        <div className="flex flex-col gap-[clamp(48px,6vw,110px)]">
          {events.map((event, i) => (
            <EventRow key={event.title} event={event} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
