"use client"

import { motion } from "framer-motion"

import { iconMap } from "@/lib/icon-map"
import type { ServiceHighlight } from "@/lib/services-data"

export default function ServiceHighlights({
  body,
  highlights,
}: {
  body: string[]
  highlights: ServiceHighlight[]
}) {
  return (
    <section className="bg-cream pt-[clamp(48px,6vw,110px)] text-ink">
      <div className="mx-auto max-w-4xl space-y-6 px-5 text-center">
        {body.map((paragraph) => (
          <p key={paragraph} className="text-[max(17px,1.615vw)] leading-[1.25] tracking-[0.02em] text-balance">
            {paragraph}
          </p>
        ))}
      </div>

      <div className="mt-[clamp(48px,6vw,110px)] grid border-t-[1.5px] border-ink sm:grid-cols-2 lg:grid-cols-4">
        {highlights.map((highlight, i) => {
          const Icon = iconMap[highlight.icon]
          return (
            <motion.div
              key={highlight.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="flex flex-col gap-4 border-b-[1.5px] border-ink p-[clamp(20px,2.2vw,40px)] sm:[&:nth-child(odd)]:border-r-[1.5px] lg:border-r-[1.5px] lg:last:border-r-0"
            >
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-full border-[1.5px] border-ink bg-lilac">
                <Icon size={20} aria-hidden="true" />
              </span>
              <h3 className="type-body-lg">{highlight.title}</h3>
              <p className="type-mono text-[13px] md:text-[max(11px,.833vw)]">{highlight.description}</p>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
