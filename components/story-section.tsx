"use client"

import Image from "next/image"
import { motion, useInView } from "framer-motion"
import { useRef, useEffect, useState } from "react"

const stats = [
  { value: 100, suffix: "%", label: "Natural" },
  { value: 0, suffix: "g", label: "Added Sugar" },
  { value: 24, suffix: "/7", label: "Hydration" },
  { value: 10000, suffix: "+", label: "Happy Customers" },
]

function AnimatedNumber({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (!inView) return
    let start = 0
    const duration = 1800
    const increment = target / (duration / 16)
    const timer = setInterval(() => {
      start += increment
      if (start >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 16)
    return () => clearInterval(timer)
  }, [inView, target])

  return (
    <span ref={ref}>
      {count.toLocaleString()}
      {suffix}
    </span>
  )
}

export default function StorySection() {
  return (
    <section id="story" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="relative rounded-[2.5rem] overflow-hidden aspect-[4/5]">
              <Image
                src="/images/coconut-farm.png"
                alt="Coconut farm — from palm to your hands"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              {/* Overlay text */}
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <p className="text-white font-serif text-xl font-bold text-balance">
                  Rooted in Tradition, Delivered with Care
                </p>
              </div>
            </div>
            {/* Floating card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="absolute -right-4 top-12 bg-white rounded-2xl shadow-xl px-5 py-4 hidden lg:block"
            >
              <p className="text-xs text-muted-foreground font-medium mb-1">Harvest to Delivery</p>
              <p className="text-2xl font-bold text-primary">24hrs</p>
              <p className="text-xs text-muted-foreground">Guaranteed freshness</p>
            </motion.div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <p className="text-sm font-semibold text-accent uppercase tracking-widest mb-4">Our Story</p>
            <h2 className="text-4xl sm:text-5xl font-serif font-bold text-foreground text-balance mb-6">
              From The Palm <span className="text-primary">To Your Hands</span>
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed mb-10">
              <p>
                We started Agrohome Nariyal Store with a simple mission — to bring the purest, freshest coconut water directly from carefully selected tropical farms to your doorstep.
              </p>
              <p>
                Each tender coconut is hand-picked at the perfect stage of ripeness by expert farmers, hygienically packaged within hours, and shipped with insulation packs to ensure every sip is as fresh as the farm itself.
              </p>
              <p>
                No processing, no added water, no artificial anything. Just nature&apos;s perfect drink, the way it was meant to be enjoyed.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {stats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  className="text-center"
                >
                  <p className="text-3xl font-bold font-serif text-primary mb-1">
                    <AnimatedNumber target={stat.value} suffix={stat.suffix} />
                  </p>
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
