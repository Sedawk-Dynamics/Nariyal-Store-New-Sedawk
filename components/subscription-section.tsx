"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Check } from "lucide-react"

const plans = [
  {
    id: "weekly",
    label: "Weekly",
    coconuts: "8 Coconuts",
    frequency: "Every week",
    price: 399,
    original: 520,
    savings: "Save ₹121",
    popular: false,
    features: ["8 Fresh Coconuts", "Free Delivery", "Freshness Guarantee", "Cancel Anytime"],
  },
  {
    id: "biweekly",
    label: "Bi-Weekly",
    coconuts: "12 Coconuts",
    frequency: "Every 2 weeks",
    price: 549,
    original: 720,
    savings: "Save ₹171",
    popular: true,
    features: ["12 Fresh Coconuts", "Free Delivery", "Freshness Guarantee", "Priority Support", "Cancel Anytime"],
  },
  {
    id: "monthly",
    label: "Monthly",
    coconuts: "24 Coconuts",
    frequency: "Every month",
    price: 999,
    original: 1400,
    savings: "Save ₹401",
    popular: false,
    features: ["24 Fresh Coconuts", "Free Delivery", "Freshness Guarantee", "Exclusive Discounts", "Cancel Anytime"],
  },
]

export default function SubscriptionSection() {
  const [selected, setSelected] = useState("biweekly")

  return (
    <section id="subscription" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-semibold text-accent uppercase tracking-widest mb-3">Subscribe & Save</p>
          <h2 className="text-4xl sm:text-5xl font-serif font-bold text-foreground text-balance mb-4">
            Never Run Out of <span className="text-primary">Freshness</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Choose a subscription plan that fits your hydration goals and save more with every delivery.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              onClick={() => setSelected(plan.id)}
              className={`relative rounded-3xl p-7 border-2 cursor-pointer transition-all duration-300 ${
                selected === plan.id
                  ? "border-primary bg-primary text-primary-foreground shadow-2xl scale-105"
                  : "border-border bg-card hover:border-primary/40 hover:shadow-lg"
              }`}
            >
              {plan.popular && (
                <div
                  className={`absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold ${
                    selected === plan.id ? "bg-accent text-foreground" : "bg-primary text-primary-foreground"
                  }`}
                >
                  Most Popular
                </div>
              )}

              <div className="mb-6">
                <p className={`text-sm font-semibold uppercase tracking-wider mb-1 ${selected === plan.id ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                  {plan.label}
                </p>
                <p className={`text-3xl font-bold font-serif mb-1 ${selected === plan.id ? "text-primary-foreground" : "text-foreground"}`}>
                  ₹{plan.price}
                </p>
                <p className={`text-xs ${selected === plan.id ? "text-primary-foreground/60" : "text-muted-foreground"}`}>
                  <span className="line-through">₹{plan.original}</span>{" "}
                  <span className={selected === plan.id ? "text-accent font-semibold" : "text-primary font-semibold"}>{plan.savings}</span>
                </p>
              </div>

              <div className={`rounded-2xl p-3 mb-6 text-center ${selected === plan.id ? "bg-primary-foreground/10" : "bg-secondary"}`}>
                <p className={`font-bold text-sm ${selected === plan.id ? "text-primary-foreground" : "text-foreground"}`}>{plan.coconuts}</p>
                <p className={`text-xs ${selected === plan.id ? "text-primary-foreground/70" : "text-muted-foreground"}`}>{plan.frequency}</p>
              </div>

              <ul className="space-y-2.5 mb-6">
                {plan.features.map((f, j) => (
                  <li key={j} className="flex items-center gap-2 text-sm">
                    <span className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${selected === plan.id ? "bg-accent" : "bg-primary/15"}`}>
                      <Check size={10} className={selected === plan.id ? "text-foreground" : "text-primary"} strokeWidth={3} />
                    </span>
                    <span className={selected === plan.id ? "text-primary-foreground" : "text-foreground"}>{f}</span>
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-3 rounded-2xl font-bold text-sm transition-all duration-300 ${
                  selected === plan.id
                    ? "bg-accent text-foreground hover:bg-accent/90"
                    : "bg-primary text-primary-foreground hover:bg-primary/90"
                }`}
              >
                Subscribe Now
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
