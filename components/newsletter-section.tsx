"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { MapPin, Phone, Mail, Globe, Send, CheckCircle } from "lucide-react"

const contactDetails = [
  {
    icon: MapPin,
    label: "Visit Us",
    value: "Epicuria Food Court, Nehru Place Metro Station, Astha Kunj Rd, Nehru Place, New Delhi 110019",
    href: "https://maps.google.com/?q=Epicuria+Food+Court+Nehru+Place+New+Delhi",
  },
  {
    icon: Phone,
    label: "Call Us",
    value: "+91 7042110917",
    href: "tel:+917042110917",
  },
  {
    icon: Mail,
    label: "Email Us",
    value: "info@nariyalstore.com",
    href: "mailto:info@nariyalstore.com",
  },
  {
    icon: Globe,
    label: "Website",
    value: "www.nariyalstore.com",
    href: "https://www.nariyalstore.com",
  },
]

const socials = [
  {
    label: "Instagram",
    handle: "@nariyalstore",
    href: "https://instagram.com/nariyalstore",
    svg: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    handle: "Nariyal Store",
    href: "https://youtube.com/@nariyalstore",
    svg: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    handle: "Nariyal Store",
    href: "https://linkedin.com/company/nariyalstore",
    svg: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    handle: "Nariyal Store",
    href: "https://facebook.com/nariyalstore",
    svg: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
]

export default function NewsletterSection() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) setSubmitted(true)
  }

  return (
    <section id="contact" className="py-24 bg-secondary/20 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-semibold text-accent uppercase tracking-widest mb-3">Contact Us</p>
          <h2 className="text-4xl sm:text-5xl font-serif font-bold text-foreground text-balance mb-4">
            Find Us & <span className="text-primary">Get In Touch</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Visit our premium outlet at Epicuria Food Court, Nehru Place — or reach out for event bookings and branding enquiries.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Contact Details */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="space-y-5 mb-8">
              {contactDetails.map((detail, i) => (
                <a
                  key={i}
                  href={detail.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 bg-card border border-border rounded-2xl p-5 hover:border-primary/40 hover:shadow-md transition-all duration-300 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                    <detail.icon size={18} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">{detail.label}</p>
                    <p className="text-sm font-medium text-foreground leading-relaxed">{detail.value}</p>
                  </div>
                </a>
              ))}
            </div>

            {/* Social Media */}
            <div className="bg-card border border-border rounded-3xl p-6">
              <p className="text-sm font-bold text-foreground uppercase tracking-wider mb-4">Follow Us</p>
              <div className="grid grid-cols-2 gap-3">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-2xl border border-border hover:border-primary/40 hover:bg-primary/5 transition-all duration-200 group"
                  >
                    <span className="text-primary group-hover:scale-110 transition-transform duration-200">{s.svg}</span>
                    <div>
                      <p className="text-xs font-bold text-foreground">{s.label}</p>
                      <p className="text-[10px] text-muted-foreground">{s.handle}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Newsletter + CTA */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="flex flex-col gap-6"
          >
            {/* Event booking CTA */}
            <div
              className="rounded-3xl p-8 flex flex-col items-start"
              style={{ background: "linear-gradient(135deg, #2D5A1B 0%, #4A8A2A 100%)" }}
            >
              <p className="text-accent font-semibold uppercase tracking-widest text-xs mb-3">Book an Event</p>
              <h3 className="text-2xl font-serif font-bold text-white text-balance mb-3">
                Book Your Personalized Coconut Branding
              </h3>
              <p className="text-white/70 text-sm leading-relaxed mb-6">
                For corporate events, weddings, birthdays, and brand promotions. Call or email us to discuss your requirements.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="tel:+917042110917"
                  className="inline-flex items-center gap-2 bg-accent text-foreground font-bold px-6 py-3 rounded-2xl hover:bg-accent/90 transition-all duration-300 text-sm"
                >
                  <Phone size={15} />
                  Call Now
                </a>
                <a
                  href="mailto:info@nariyalstore.com"
                  className="inline-flex items-center gap-2 bg-white/15 text-white font-semibold px-6 py-3 rounded-2xl hover:bg-white/25 transition-all duration-300 text-sm border border-white/20"
                >
                  <Mail size={15} />
                  Send Email
                </a>
              </div>
            </div>

            {/* Newsletter */}
            <div className="bg-card border border-border rounded-3xl p-8">
              <p className="text-sm font-semibold text-accent uppercase tracking-widest mb-2">Newsletter</p>
              <h3 className="text-xl font-serif font-bold text-foreground mb-2">Stay Updated</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-5">
                Get exclusive offers, new menu launches, and event updates delivered to your inbox.
              </p>
              {submitted ? (
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="flex items-center gap-3 text-primary"
                >
                  <CheckCircle size={22} />
                  <p className="text-sm font-semibold">You&apos;re on the list! Welcome to Nariyal Store.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="flex gap-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address"
                    required
                    className="flex-1 px-4 py-3 rounded-2xl border-2 border-border bg-background focus:outline-none focus:border-primary text-sm transition-colors"
                  />
                  <button
                    type="submit"
                    className="flex items-center gap-2 bg-primary text-primary-foreground font-semibold px-5 py-3 rounded-2xl hover:bg-primary/90 transition-all duration-300 text-sm shrink-0"
                  >
                    <Send size={14} />
                    Subscribe
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
