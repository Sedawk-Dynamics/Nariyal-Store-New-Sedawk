"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

import type { EventItem } from "@/lib/events-data"
import { iconMap } from "@/lib/icon-map"

function EventRow({ event, index }: { event: EventItem; index: number }) {
  const reversed = index % 2 === 1
  const Icon = iconMap[event.icon]

  const imageInitialX = reversed ? 48 : -48
  const contentInitialX = reversed ? -48 : 48

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center">
      {/* Image */}
      <motion.div
        initial={{ opacity: 0, x: imageInitialX, scale: 0.96 }}
        whileInView={{ opacity: 1, x: 0, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={`relative order-1 ${reversed ? "lg:order-2" : "lg:order-1"}`}
      >
        {/* Decorative blurred shapes behind image */}
        <div
          aria-hidden
          className={`absolute -z-10 w-2/3 h-2/3 rounded-full bg-primary/15 blur-3xl ${
            reversed ? "-bottom-8 -right-8" : "-bottom-8 -left-8"
          }`}
        />
        <div
          aria-hidden
          className={`absolute -z-10 w-1/2 h-1/2 rounded-full bg-accent/20 blur-3xl ${
            reversed ? "-top-6 -left-6" : "-top-6 -right-6"
          }`}
        />
        <motion.div
          whileHover={{ scale: 1.03 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative rounded-[28px] overflow-hidden shadow-2xl shadow-primary/10 border border-border/60 aspect-[4/3]"
        >
          <Image
            src={event.image}
            alt={event.alt}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent"
          />
        </motion.div>
      </motion.div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, x: contentInitialX }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        className={`order-2 ${reversed ? "lg:order-1" : "lg:order-2"}`}
      >
        <div className="relative bg-card rounded-3xl p-8 sm:p-10 border border-border shadow-sm hover:shadow-xl hover:shadow-primary/5 transition-shadow duration-500">
          <motion.div
            whileHover={{ rotate: -6, scale: 1.08 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
            className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-6"
          >
            <Icon size={26} aria-hidden="true" />
          </motion.div>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-foreground mb-3 text-balance">
            {event.title}
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-6">{event.description}</p>
          <a
            href="/#contact"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-primary"
          >
            Enquire About {event.title}
            <ArrowRight
              size={15}
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </a>
        </div>
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
    <section id="events" className="py-24 bg-background scroll-mt-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <p className="inline-flex items-center gap-2 text-sm font-semibold text-accent uppercase tracking-widest mb-3">
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full rounded-full bg-accent opacity-75 animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            What We Cover
          </p>
          <h2 className="text-4xl sm:text-5xl font-serif font-bold text-foreground text-balance mb-4">
            {heading}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">{subheading}</p>
        </motion.div>

        <div className="flex flex-col gap-20 sm:gap-24">
          {events.map((event, i) => (
            <EventRow key={event.title} event={event} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
