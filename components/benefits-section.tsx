"use client"

import { motion } from "framer-motion"
import { Snowflake, ShieldCheck, Leaf, Droplets, Zap, Heart, FlameKindling, Dumbbell } from "lucide-react"

const benefits = [
  {
    icon: Snowflake,
    title: "Served Chilled",
    description: "Every coconut is served chilled to deliver maximum freshness and a refreshing drinking experience.",
    color: "bg-primary/10 text-primary",
    border: "border-primary/20",
  },
  {
    icon: ShieldCheck,
    title: "Hygienically Cleaned",
    description: "100% hygienically cleaned and freshly opened before serving. Ready to drink, zero compromise.",
    color: "bg-accent/15 text-foreground",
    border: "border-accent/30",
  },
  {
    icon: Droplets,
    title: "Natural Electrolytes",
    description: "Rich in natural electrolytes — potassium, magnesium — to replenish and rehydrate your body.",
    color: "bg-primary/10 text-primary",
    border: "border-primary/20",
  },
  {
    icon: Leaf,
    title: "No Artificial Sugar",
    description: "Low in calories, naturally fat-free, and absolutely zero artificial sugar or preservatives.",
    color: "bg-accent/15 text-foreground",
    border: "border-accent/30",
  },
  {
    icon: Heart,
    title: "Supports Immunity",
    description: "Helps improve digestion, supports immunity, and keeps your body healthy from the inside out.",
    color: "bg-primary/10 text-primary",
    border: "border-primary/20",
  },
  {
    icon: Dumbbell,
    title: "Ideal After Workouts",
    description: "Perfect summer drink and the best natural recovery drink after workouts and physical activity.",
    color: "bg-accent/15 text-foreground",
    border: "border-accent/30",
  },
  {
    icon: Zap,
    title: "Boost Energy",
    description: "Excellent source of potassium and magnesium that boosts energy and supports muscle recovery.",
    color: "bg-primary/10 text-primary",
    border: "border-primary/20",
  },
  {
    icon: FlameKindling,
    title: "Natural Detox",
    description: "Acts as a natural detox drink — cleansing your body and supporting a healthy lifestyle daily.",
    color: "bg-accent/15 text-foreground",
    border: "border-accent/30",
  },
]

export default function BenefitsSection() {
  return (
    <section id="why" className="py-24 bg-secondary/30 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-semibold text-accent uppercase tracking-widest mb-3">Why Tender Coconut</p>
          <h2 className="text-4xl sm:text-5xl font-serif font-bold text-foreground text-balance">
            Why Choose <span className="text-primary">Tender Coconut?</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto">Tender coconut water is one of nature&apos;s healthiest beverages — naturally packed with everything your body needs.</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
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
