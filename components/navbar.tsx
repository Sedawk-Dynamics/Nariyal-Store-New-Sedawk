"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, Menu, X } from "lucide-react"

import { services } from "@/lib/services-data"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/#about", label: "About" },
  { href: "/menu", label: "Menu" },
  { href: "/#gallery", label: "Gallery" },
  { href: "/#contact", label: "Contact" },
]

const offerings = services.map((service) => ({
  href: `/services/${service.slug}`,
  label: service.navLabel,
  teaser: service.teaser,
}))

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [offeringsOpen, setOfferingsOpen] = useState(false)
  const offeringsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close the desktop dropdown on outside click or Escape.
  useEffect(() => {
    if (!offeringsOpen) return

    const handlePointerDown = (event: MouseEvent) => {
      if (!offeringsRef.current?.contains(event.target as Node)) setOfferingsOpen(false)
    }
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOfferingsOpen(false)
    }

    document.addEventListener("mousedown", handlePointerDown)
    document.addEventListener("keydown", handleKeyDown)
    return () => {
      document.removeEventListener("mousedown", handlePointerDown)
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [offeringsOpen])

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled || offeringsOpen
            ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-border"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 shrink-0">
              <Image
                src="/images/logo.png"
                alt="Agrohome Nariyal Store"
                width={52}
                height={52}
                className="h-12 w-12 object-contain"
              />
              <div className="hidden sm:block">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest leading-none">
                  Agrohome
                </p>
                <p className="text-lg font-serif font-bold text-primary leading-none">Nariyal Store</p>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-7">
              {navLinks.slice(0, 2).map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors duration-200 relative group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300 rounded-full" />
                </Link>
              ))}

              {/* Our Offering dropdown */}
              <div ref={offeringsRef} className="relative">
                <button
                  type="button"
                  onClick={() => setOfferingsOpen((open) => !open)}
                  aria-expanded={offeringsOpen}
                  aria-haspopup="true"
                  className="flex items-center gap-1 text-sm font-medium text-foreground/80 hover:text-primary transition-colors duration-200"
                >
                  Our Offering
                  <ChevronDown
                    size={15}
                    aria-hidden="true"
                    className={`transition-transform duration-300 ${offeringsOpen ? "rotate-180" : ""}`}
                  />
                </button>

                <AnimatePresence>
                  {offeringsOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.2 }}
                      className="absolute left-1/2 top-full mt-4 w-80 -translate-x-1/2 overflow-hidden rounded-2xl border border-border bg-background p-2 shadow-2xl"
                    >
                      {offerings.map((offering) => (
                        <Link
                          key={offering.href}
                          href={offering.href}
                          onClick={() => setOfferingsOpen(false)}
                          className="block rounded-xl px-4 py-3 transition-colors duration-200 hover:bg-secondary"
                        >
                          <p className="text-sm font-semibold text-foreground">{offering.label}</p>
                          <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
                            {offering.teaser}
                          </p>
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {navLinks.slice(2).map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors duration-200 relative group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300 rounded-full" />
                </Link>
              ))}
            </nav>

            {/* Right Icons */}
            <div className="flex items-center gap-3">
              <Link
                href="/menu"
                className="hidden lg:inline-flex rounded-2xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
              >
                Shop Now
              </Link>

              {/* Mobile menu toggle */}
              <button
                aria-label="Toggle mobile menu"
                onClick={() => setMobileOpen(true)}
                className="lg:hidden p-2 rounded-full hover:bg-secondary text-foreground/70 hover:text-primary transition-colors duration-200"
              >
                <Menu size={20} aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 bg-foreground/30 backdrop-blur-sm z-50 lg:hidden"
            />
            <motion.nav
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 h-full w-80 max-w-full bg-background z-50 shadow-2xl p-8 flex flex-col overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-2">
                  <Image
                    src="/images/logo.png"
                    alt="Nariyal Store"
                    width={40}
                    height={40}
                    className="object-contain"
                  />
                  <span className="font-serif font-bold text-primary text-xl">Nariyal Store</span>
                </div>
                <button
                  onClick={() => setMobileOpen(false)}
                  aria-label="Close menu"
                  className="p-2 rounded-full hover:bg-secondary text-foreground/70 hover:text-primary transition-colors"
                >
                  <X size={20} aria-hidden="true" />
                </button>
              </div>

              <div className="flex flex-col gap-1 flex-1">
                {navLinks.slice(0, 2).map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ x: 30, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.06 + 0.1 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="block py-3 px-4 text-lg font-semibold text-foreground hover:text-primary hover:bg-secondary rounded-xl transition-all duration-200"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}

                {/* Our Offering group */}
                <motion.div
                  initial={{ x: 30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.22 }}
                  className="mt-3"
                >
                  <p className="px-4 pb-1 text-xs font-semibold uppercase tracking-widest text-accent">
                    Our Offering
                  </p>
                  {offerings.map((offering) => (
                    <Link
                      key={offering.href}
                      href={offering.href}
                      onClick={() => setMobileOpen(false)}
                      className="block py-2.5 px-4 text-base font-medium text-foreground/85 hover:text-primary hover:bg-secondary rounded-xl transition-all duration-200"
                    >
                      {offering.label}
                    </Link>
                  ))}
                </motion.div>

                <div className="mt-3">
                  {navLinks.slice(2).map((link, i) => (
                    <motion.div
                      key={link.href}
                      initial={{ x: 30, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: i * 0.06 + 0.34 }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setMobileOpen(false)}
                        className="block py-3 px-4 text-lg font-semibold text-foreground hover:text-primary hover:bg-secondary rounded-xl transition-all duration-200"
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-auto pt-6 border-t border-border"
              >
                <Link
                  href="/menu"
                  onClick={() => setMobileOpen(false)}
                  className="block w-full text-center bg-primary text-primary-foreground font-semibold py-3 px-6 rounded-2xl hover:bg-primary/90 transition-colors"
                >
                  Shop Now
                </Link>
              </motion.div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
