"use client"

import { motion } from "framer-motion"
import { Leaf, Droplets, Zap, Truck } from "lucide-react"

const benefits = [
  {
    icon: Leaf,
    title: "100% Natural",
    description: "Straight from certified coconut farms with zero artificial additives, preservatives, or flavors.",
    color: "bg-primary/10 text-primary",
    border: "border-primary/20",
  },
  {
    icon: Droplets,
    title: "No Added Sugar",
    description: "Just pure, naturally sweet coconut water as nature intended. Nothing added, nothing removed.",
    color: "bg-accent/15 text-foreground",
    border: "border-accent/30",
  },
  {
    icon: Zap,
    title: "Rich in Electrolytes",
    description: "Packed with potassium, magnesium, and calcium to replenish and rehydrate your body naturally.",
    color: "bg-primary/10 text-primary",
    border: "border-primary/20",
  },
  {
    icon: Truck,
    title: "Freshly Delivered",
    description: "Harvested and delivered to your door within 24 hours. Freshness guaranteed with every order.",
    color: "bg-accent/15 text-foreground",
    border: "border-accent/30",
  },
]

export default function BenefitsSection() {
  return (
    <section id="why" className="py-24 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-semibold text-accent uppercase tracking-widest mb-3">Why Choose Us</p>
          <h2 className="text-4xl sm:text-5xl font-serif font-bold text-foreground text-balance">
            Nature&apos;s Best. <span className="text-primary">Delivered Best.</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((b, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className={`bg-card rounded-3xl p-7 border ${b.border} hover:shadow-lg transition-shadow duration-300`}
            >
              <div className={`w-14 h-14 rounded-2xl ${b.color} flex items-center justify-center mb-5`}>
                <b.icon size={26} />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-3">{b.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{b.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
