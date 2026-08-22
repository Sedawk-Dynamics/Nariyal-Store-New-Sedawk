"use client"

import Image from "next/image"
import { motion, useInView } from "framer-motion"
import { useRef, useEffect, useState } from "react"

const stats = [
  { value: 100, suffix: "%", label: "Natural" },
  { value: 119, suffix: "₹", label: "Starting Price" },
  { value: 12, suffix: "+", label: "Beverages on Menu" },
  { value: 6, suffix: "", label: "Branding Options" },
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
    <section id="about" className="py-24 bg-background scroll-mt-24">
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
                src="/images/nariyal-outlet.png"
                alt="Agrohome Nariyal Store outlet counter stacked with fresh tender coconuts at Epicuria Food Court, Nehru Place"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              {/* Overlay text */}
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <p className="text-white font-serif text-xl font-bold text-balance">
                  Premium Outlet at Epicuria Food Court, Nehru Place
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
              <p className="text-xs text-muted-foreground font-medium mb-1">Coconuts Starting At</p>
              <p className="text-2xl font-bold text-primary">₹119</p>
              <p className="text-xs text-muted-foreground">Served chilled, freshly opened</p>
            </motion.div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <p className="text-sm font-semibold text-accent uppercase tracking-widest mb-4">About Us</p>
            <h2 className="text-4xl sm:text-5xl font-serif font-bold text-foreground text-balance mb-6">
              India&apos;s Premium <span className="text-primary">Coconut Hydration</span> Brand
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed mb-10">
              <p>
                Nariyal Store is a premium natural hydration and coconut-based FMCG brand committed to bringing the freshness of farm-picked tender coconuts to consumers across India.
              </p>
              <p>
                Our mission is to make healthy hydration convenient by offering premium A-grade tender coconuts, refreshing coconut beverages, and innovative coconut-based products. We source the finest coconuts directly from trusted farms and deliver them using strict hygiene and quality standards.
              </p>
              <p>
                Every coconut is hand-selected for sweetness, water quantity, and freshness — ensuring a premium experience for every customer. Visit us at Epicuria Food Court, Nehru Place Metro Station, New Delhi.
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
