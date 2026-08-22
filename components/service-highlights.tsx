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
    <section className="bg-background py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-3xl space-y-5 text-center text-lg leading-relaxed text-muted-foreground">
          {body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {highlights.map((highlight, i) => {
            const Icon = iconMap[highlight.icon]
            return (
              <motion.div
                key={highlight.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="rounded-3xl border border-border bg-card p-7 transition-shadow duration-300 hover:shadow-lg"
              >
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <Icon size={26} aria-hidden="true" />
                </div>
                <h3 className="mb-3 text-lg font-bold text-foreground">{highlight.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {highlight.description}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
