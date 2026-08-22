"use client"

import { motion } from "framer-motion"
import { CalendarDays, Pencil, CookingPot, Store } from "lucide-react"

const steps = [
  {
    icon: CalendarDays,
    step: "01",
    title: "Choose Your Event",
    description: "Tell us about your event — birthday party, corporate event, wedding, music festival, or brand promotion.",
  },
  {
    icon: Pencil,
    step: "02",
    title: "Customize Your Coconut",
    description: "Pick from logo branding, couple names, birthday messages, QR codes, festival greetings, or custom stickers.",
  },
  {
    icon: CookingPot,
    step: "03",
    title: "Fresh Preparation",
    description: "Our team hand-crafts your personalized coconuts with care using premium A-grade tender coconuts.",
  },
  {
    icon: Store,
    step: "04",
    title: "Delivery or Live Stall",
    description: "Get your order delivered to your venue, or book a live Nariyal Store stall for an unforgettable experience.",
  },
]

export default function HowItWorks() {
  return (
    <section className="py-24 bg-primary overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-accent font-semibold uppercase tracking-widest text-sm mb-3">Event Branding Process</p>
          <h2 className="text-4xl sm:text-5xl font-serif font-bold text-primary-foreground text-balance">
            How It Works
          </h2>
          <p className="text-primary-foreground/70 mt-4 max-w-xl mx-auto text-sm">From your idea to a fully branded coconut experience — in 4 simple steps.</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Connecting line */}
          <div className="hidden sm:block absolute top-16 left-1/3 right-1/3 h-px border-t-2 border-dashed border-accent/40" />

          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="flex flex-col items-center text-center relative"
            >
              {/* Step number */}
              <div className="relative mb-6">
                <div className="w-20 h-20 rounded-full bg-primary-foreground/10 border-2 border-accent/40 flex items-center justify-center">
                  <step.icon size={32} className="text-accent" />
                </div>
                <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-accent text-foreground text-xs font-bold flex items-center justify-center">
                  {step.step}
                </span>
              </div>
              <h3 className="text-xl font-bold text-primary-foreground mb-3">{step.title}</h3>
              <p className="text-primary-foreground/70 text-sm leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
