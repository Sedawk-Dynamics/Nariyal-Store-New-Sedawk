"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Send, CheckCircle } from "lucide-react"

export default function NewsletterSection() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) setSubmitted(true)
  }

  return (
    <section
      id="contact"
      className="py-20"
      style={{ background: "linear-gradient(135deg, #e8f5e0 0%, #fffef5 60%, #fef9ec 100%)" }}
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Coconut illustration */}
          <div className="text-5xl mb-6">
            <span
              className="inline-flex w-20 h-20 rounded-full bg-primary/10 items-center justify-center mx-auto"
              aria-hidden="true"
            >
              <svg viewBox="0 0 48 48" className="w-10 h-10" fill="none">
                <circle cx="24" cy="28" r="16" fill="#2D5A1B" opacity="0.85" />
                <circle cx="24" cy="28" r="11" fill="#4A8A2A" opacity="0.7" />
                <ellipse cx="18" cy="24" rx="4" ry="6" fill="white" opacity="0.25" />
                <rect x="21" y="8" width="3" height="14" rx="1.5" fill="#2D5A1B" />
                <path d="M24 8 C28 4 35 6 32 14" stroke="#2D5A1B" strokeWidth="2" fill="none" strokeLinecap="round" />
              </svg>
            </span>
          </div>

          <p className="text-sm font-semibold text-accent uppercase tracking-widest mb-3">Newsletter</p>
          <h2 className="text-4xl sm:text-5xl font-serif font-bold text-foreground text-balance mb-4">
            Fresh Updates, <span className="text-primary">Delivered</span>
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-8 max-w-lg mx-auto">
            Subscribe to receive exclusive offers, seasonal recipes, hydration tips, and first access to new products.
          </p>

          {submitted ? (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex items-center justify-center gap-3 text-primary"
            >
              <CheckCircle size={28} />
              <p className="text-lg font-semibold">You&apos;re on the list! Welcome to the freshness club.</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                className="flex-1 px-5 py-3.5 rounded-2xl border-2 border-border bg-white focus:outline-none focus:border-primary text-sm transition-colors"
              />
              <button
                type="submit"
                className="flex items-center justify-center gap-2 bg-primary text-primary-foreground font-semibold px-6 py-3.5 rounded-2xl hover:bg-primary/90 transition-all duration-300 shadow-md hover:shadow-lg text-sm shrink-0"
              >
                <Send size={15} />
                Subscribe
              </button>
            </form>
          )}

          <p className="text-xs text-muted-foreground mt-4">No spam, ever. Unsubscribe anytime.</p>
        </motion.div>
      </div>
    </section>
  )
}
