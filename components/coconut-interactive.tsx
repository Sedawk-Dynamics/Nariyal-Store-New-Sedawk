"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { useState } from "react"

const benefits = [
  { id: 1, label: "Natural Electrolytes", angle: -120, desc: "Rehydrates faster than sports drinks" },
  { id: 2, label: "Rich in Potassium & Magnesium", angle: -60, desc: "More potassium than a banana" },
  { id: 3, label: "Supports Immunity", angle: 0, desc: "Boosts natural body defences" },
  { id: 4, label: "Low Calorie, Fat-Free", angle: 60, desc: "Only ~45 kcal, zero fat" },
  { id: 5, label: "No Artificial Sugar", angle: 120, desc: "Naturally sweet, zero additives" },
  { id: 6, label: "Improves Digestion", angle: 180, desc: "Supports gut health naturally" },
]

function degreesToRadians(deg: number) {
  return (deg * Math.PI) / 180
}

export default function CoconutInteractive() {
  const [active, setActive] = useState<number | null>(null)
  const radius = 210

  return (
    <section className="py-24 bg-secondary/20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-semibold text-accent uppercase tracking-widest mb-3">Health Benefits</p>
          <h2 className="text-4xl sm:text-5xl font-serif font-bold text-foreground text-balance">
            Why Tender Coconut <span className="text-primary">Wins</span>
          </h2>
          <p className="text-muted-foreground mt-4">Tender coconut water — one of nature&apos;s healthiest beverages. Hover to explore the benefits.</p>
        </motion.div>

        {/* Desktop: Radial layout */}
        <div className="hidden lg:flex items-center justify-center" style={{ minHeight: 540 }}>
          <div className="relative" style={{ width: 540, height: 540 }}>
            {/* Center coconut */}
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="relative w-52 h-52 rounded-full overflow-hidden border-4 border-primary/20 shadow-2xl bg-secondary/50">
                <Image
                  src="/images/hero-coconut.png"
                  alt="Fresh coconut"
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>

            {/* Connecting ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 rounded-full border border-dashed border-primary/25"
            />

            {/* Benefit nodes */}
            {benefits.map((b, i) => {
              const rad = degreesToRadians(b.angle - 90)
              const x = 270 + radius * Math.cos(rad) - 60
              const y = 270 + radius * Math.sin(rad) - 28
              const isActive = active === b.id

              return (
                <motion.div
                  key={b.id}
                  initial={{ opacity: 0, scale: 0.7 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 + 0.3 }}
                  className="absolute"
                  style={{ left: x, top: y }}
                >
                  {/* Line to center */}
                  <svg
                    className="absolute pointer-events-none"
                    style={{
                      left: "50%",
                      top: "50%",
                      overflow: "visible",
                    }}
                    width="0"
                    height="0"
                  >
                    <line
                      x1="0"
                      y1="0"
                      x2={270 + 5 - (x + 60)}
                      y2={270 + 5 - (y + 28)}
                      stroke={isActive ? "#2D5A1B" : "#4A8A2A"}
                      strokeWidth={isActive ? 1.5 : 1}
                      strokeDasharray="4 3"
                      opacity={isActive ? 0.6 : 0.3}
                    />
                  </svg>

                  <button
                    onMouseEnter={() => setActive(b.id)}
                    onMouseLeave={() => setActive(null)}
                    className={`w-28 text-center transition-all duration-300 ${isActive ? "scale-110" : "scale-100"}`}
                  >
                    <div
                      className={`rounded-2xl px-3 py-2.5 border transition-all duration-300 shadow-sm ${
                        isActive
                          ? "bg-primary text-primary-foreground border-primary shadow-lg"
                          : "bg-card border-border text-foreground hover:border-primary/40"
                      }`}
                    >
                      <p className="text-xs font-bold leading-tight">{b.label}</p>
                      {isActive && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          className="text-[10px] mt-1 opacity-90 leading-tight"
                        >
                          {b.desc}
                        </motion.p>
                      )}
                    </div>
                  </button>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Mobile: Grid layout */}
        <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          <div className="sm:col-span-2 flex justify-center mb-4">
            <div className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-primary/20 shadow-xl">
              <Image src="/images/hero-coconut.png" alt="Fresh coconut" fill className="object-cover" />
            </div>
          </div>
          {benefits.map((b) => (
            <div key={b.id} className="bg-card border border-border rounded-2xl p-4">
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center mb-2">
                <span className="text-primary font-bold text-xs">{b.id}</span>
              </div>
              <p className="font-bold text-sm text-foreground mb-1">{b.label}</p>
              <p className="text-xs text-muted-foreground">{b.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
