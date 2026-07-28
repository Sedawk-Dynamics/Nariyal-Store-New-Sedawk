"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowRight, Play } from "lucide-react"

const floatingElements = [
  { top: "15%", left: "8%", size: 48, delay: 0 },
  { top: "70%", left: "5%", size: 36, delay: 1.5 },
  { top: "20%", right: "10%", size: 40, delay: 0.8 },
  { top: "60%", right: "6%", size: 32, delay: 2 },
]

export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden pt-20"
      style={{
        background: "linear-gradient(135deg, #f0f9e8 0%, #fffef5 40%, #e8f5e0 100%)",
      }}
    >
      {/* Decorative blobs */}
      <div
        className="absolute top-0 right-0 w-[600px] h-[600px] opacity-20 pointer-events-none"
        style={{
          background: "radial-gradient(circle, #4A8A2A 0%, transparent 70%)",
          borderRadius: "50%",
          transform: "translate(30%, -30%)",
        }}
      />
      <div
        className="absolute bottom-0 left-0 w-[400px] h-[400px] opacity-15 pointer-events-none"
        style={{
          background: "radial-gradient(circle, #F5A623 0%, transparent 70%)",
          borderRadius: "50%",
          transform: "translate(-30%, 30%)",
        }}
      />

      {/* Floating coconut leaves */}
      {floatingElements.map((el, i) => (
        <motion.div
          key={i}
          className="absolute hidden lg:block pointer-events-none"
          style={{
            top: el.top,
            left: "left" in el ? el.left : undefined,
            right: "right" in el ? el.right : undefined,
            width: el.size,
            height: el.size,
          }}
          animate={{ y: [0, -12, 0], rotate: [0, 5, -3, 0] }}
          transition={{ duration: 5 + i, repeat: Infinity, ease: "easeInOut", delay: el.delay }}
        >
          {/* Leaf SVG */}
          <svg viewBox="0 0 48 48" fill="none" className="w-full h-full opacity-60">
            <ellipse cx="24" cy="24" rx="22" ry="8" fill="#4A8A2A" transform={`rotate(${-30 + i * 20} 24 24)`} opacity="0.7" />
            <line x1="4" y1="24" x2="44" y2="24" stroke="#2D5A1B" strokeWidth="1.5" transform={`rotate(${-30 + i * 20} 24 24)`} />
          </svg>
        </motion.div>
      ))}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-10 items-center py-12 lg:min-h-[calc(100vh-5rem)]">
          {/* Left Content */}
          <div className="order-2 lg:order-1 text-center lg:text-left z-10">
            {/* Trust badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-white/80 border border-primary/20 rounded-full px-4 py-2 mb-6 shadow-sm"
            >
              <span className="w-2 h-2 rounded-full bg-accent shrink-0" />
              <span className="text-xs font-semibold text-primary tracking-wider uppercase">Farm to Doorstep Freshness</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-serif font-bold text-foreground leading-[1.08] text-balance mb-6"
            >
              Pure Hydration.{" "}
              <span className="text-primary">Straight</span>{" "}
              <span className="text-accent">From</span>{" "}
              Nature.
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-8 max-w-lg mx-auto lg:mx-0"
            >
              Fresh, naturally sweet coconut water packed with electrolytes and delivered to keep you refreshed every day. Sourced from the finest tropical farms.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.65 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-10"
            >
              <a
                href="#shop"
                className="flex items-center gap-2 bg-primary text-primary-foreground font-semibold px-8 py-4 rounded-2xl hover:bg-primary/90 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 text-sm"
              >
                Shop Fresh
                <ArrowRight size={16} />
              </a>
              <a
                href="#story"
                className="flex items-center gap-2 bg-white text-foreground font-semibold px-8 py-4 rounded-2xl border border-border hover:border-primary/40 transition-all duration-300 hover:shadow-md text-sm"
              >
                <span className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
                  <Play size={12} className="text-accent fill-accent ml-0.5" />
                </span>
                Explore Our Story
              </a>
            </motion.div>

            {/* Trust Strip */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex items-center justify-center lg:justify-start gap-6 flex-wrap"
            >
              {["100% Natural", "No Added Sugar", "Naturally Hydrating"].map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  <span className="text-xs font-semibold text-primary/80 tracking-wide">{item}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: Hero Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 40 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="order-1 lg:order-2 relative flex items-center justify-center max-h-72 sm:max-h-96 lg:max-h-none overflow-visible"
          >
            {/* Main product image */}
            <motion.div
              animate={{ y: [0, -14, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="relative z-10"
            >
              <Image
                src="/images/hero-coconut.png"
                alt="Fresh tender coconut with straw"
                width={460}
                height={500}
                className="object-contain drop-shadow-2xl max-h-[240px] sm:max-h-[340px] lg:max-h-[500px] w-auto"
                priority
              />
            </motion.div>

            {/* Floating info cards */}
            {/* <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1 }}
              className="absolute left-0 top-1/3 bg-white rounded-2xl shadow-lg px-4 py-3 hidden lg:block"
            >
              <p className="text-xs text-muted-foreground font-medium">Electrolytes</p>
              <p className="text-xl font-bold text-primary">5x</p>
              <p className="text-xs text-muted-foreground">vs Sports Drinks</p>
            </motion.div> */}

            {/* <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.2 }}
              className="absolute right-0 bottom-1/3 bg-white rounded-2xl shadow-lg px-4 py-3 hidden lg:block"
            >
              <div className="flex items-center gap-1 mb-1">
                {"★★★★★".split("").map((s, i) => (
                  <span key={i} className="text-accent text-sm">{s}</span>
                ))}
              </div>
              <p className="text-xs text-muted-foreground font-medium">10,000+ Happy</p>
              <p className="text-xs text-primary font-semibold">Customers</p>
            </motion.div> */}
          </motion.div>
        </div>
      </div>

      {/* Wave divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full" preserveAspectRatio="none">
          <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="white" />
        </svg>
      </div>
    </section>
  )
}
