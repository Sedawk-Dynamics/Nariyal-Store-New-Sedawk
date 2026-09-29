"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, Phone, Plus, ShoppingBag, X } from "lucide-react"

import CoconutGlyph from "@/components/coconut-glyph"
import Marquee from "@/components/marquee"
import BtnLabel from "@/components/btn-label"
import Wordmark from "@/components/wordmark"
import { services } from "@/lib/services-data"

const announcements = [
  "Farm Picked",
  "Served Chilled",
  "100% Natural",
  "No Added Sugar",
  "Freshly Opened",
  "Starting at ₹119",
]

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/contact", label: "Contact" },
]

const offerings = services.map((service) => ({
  href: `/services/${service.slug}`,
  label: service.navLabel,
  badge: service.badge,
  image: service.image,
  alt: service.alt,
}))

const iconLinks = [
  { href: "tel:+917042110917", label: "Call Nariyal Store", icon: Phone },
  { href: "/#contact", label: "Order", icon: ShoppingBag },
]

/**
 * `overlay` lays the header transparently over a full-bleed hero until the
 * page scrolls; other pages get a solid header and a spacer below it.
 */
export default function Navbar({ overlay = false }: { overlay?: boolean }) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [megaOpen, setMegaOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  // Pointer or keyboard focus inside the header drops the cream panel in.
  const [engaged, setEngaged] = useState(false)
  const headerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const transparent = overlay && !scrolled && !megaOpen && !engaged

  // Touch has no hover: a tap engages the header, a tap elsewhere releases it.
  useEffect(() => {
    if (!engaged) return
    const handlePointerDown = (event: PointerEvent) => {
      if (event.pointerType !== "mouse" && !headerRef.current?.contains(event.target as Node)) setEngaged(false)
    }
    document.addEventListener("pointerdown", handlePointerDown)
    return () => document.removeEventListener("pointerdown", handlePointerDown)
  }, [engaged])

  // Close the mega menu on outside click or Escape.
  useEffect(() => {
    if (!megaOpen) return

    const handlePointerDown = (event: MouseEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) setMegaOpen(false)
    }
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMegaOpen(false)
    }

    document.addEventListener("mousedown", handlePointerDown)
    document.addEventListener("keydown", handleKeyDown)
    return () => {
      document.removeEventListener("mousedown", handlePointerDown)
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [megaOpen])

  // Lock page scroll behind the mobile menu.
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [mobileOpen])

  const linkClass = "text-[14px] underline underline-offset-[0.25em] decoration-1 hover:decoration-[2px]"

  return (
    <>
      <div ref={headerRef} data-site-header className="fixed inset-x-0 top-0 z-50">
        {/* Announcement ticker, tucked away once the page scrolls */}
        <div
          className={`overflow-hidden bg-leaf text-cream transition-[max-height,padding] duration-300 ${
            scrolled ? "max-h-0 py-0" : "max-h-12 py-2.5"
          }`}
        >
          <Marquee gap="60px" repeat={3}>
            {announcements.map((item) => (
              <span key={item} className="inline-flex items-center gap-[15px] text-[13px] leading-tight">
                <CoconutGlyph className="h-[15px] w-[15px] text-cream" />
                {item}
              </span>
            ))}
          </Marquee>
        </div>

        <header
          onMouseEnter={() => setEngaged(true)}
          onMouseLeave={() => setEngaged(false)}
          onPointerDown={(event) => event.pointerType !== "mouse" && setEngaged(true)}
          onFocus={() => setEngaged(true)}
          onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setEngaged(false)
          }}
          className={`relative transition-colors duration-300 ${transparent ? "text-cream" : "text-ink"}`}
        >
          {/* Cream panel that drops down from the top edge */}
          <div
            aria-hidden="true"
            className={`absolute inset-0 origin-top border-b-[1.5px] border-ink bg-cream transition-transform duration-[450ms] ease-[cubic-bezier(0.76,0,0.24,1)] ${
              transparent ? "scale-y-0" : "scale-y-100"
            }`}
          />
          <div className="gutter relative grid h-[var(--header-height)] grid-cols-[1fr_auto_1fr] items-center">
            {/* Left: desktop links / mobile toggle */}
            <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
              {navLinks.slice(0, 2).map((link) => (
                <Link key={link.href} href={link.href} className={linkClass}>
                  {link.label}
                </Link>
              ))}
              <button
                type="button"
                onClick={() => setMegaOpen((open) => !open)}
                aria-expanded={megaOpen}
                aria-controls="offerings-menu"
                className={`${linkClass} inline-flex items-center gap-1.5 ${megaOpen ? "underline" : ""}`}
              >
                Our Offering
                <Plus
                  size={14}
                  aria-hidden="true"
                  className={`transition-transform duration-200 ${megaOpen ? "rotate-45" : ""}`}
                />
              </button>
              {navLinks.slice(2).map((link) => (
                <Link key={link.href} href={link.href} className={linkClass}>
                  {link.label}
                </Link>
              ))}
            </nav>
            <button
              type="button"
              aria-label="Open menu"
              onClick={() => setMobileOpen(true)}
              className="-ml-2 justify-self-start p-2 lg:hidden"
            >
              <Menu size={22} aria-hidden="true" />
            </button>

            {/* Center: wordmark */}
            <Link
              href="/"
              aria-label="Agrohome Nariyal Store home"
              className={`text-[28px] transition-colors duration-300 md:text-[34px] ${
                transparent ? "text-cream" : "text-leaf"
              }`}
            >
              <Wordmark />
            </Link>

            {/* Right: icon circles */}
            <div className="flex items-center gap-2 justify-self-end">
              {iconLinks.map(({ href, label, icon: Icon }) => (
                <Link
                  key={label}
                  href={href}
                  aria-label={label}
                  className={`inline-flex h-[30px] w-[30px] items-center justify-center rounded-full border-[1.5px] text-ink transition-colors duration-300 hover:border-ink hover:bg-lemon ${
                    transparent ? "border-cream bg-cream" : "border-ink bg-transparent"
                  }`}
                >
                  <Icon size={14} strokeWidth={2} aria-hidden="true" />
                </Link>
              ))}
            </div>
          </div>

          {/* Mega menu */}
          <AnimatePresence>
            {megaOpen && (
              <motion.div
                id="offerings-menu"
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="absolute inset-x-0 top-full hidden border-b-[1.5px] border-ink bg-cream lg:block"
              >
                <div className="gutter flex items-stretch gap-[1.5625vw] pt-[2.2vw] pb-[1.8vw]">
                  <div className="flex w-[22vw] flex-none flex-col gap-[0.4vw]">
                    {offerings.map((offering) => (
                      <Link
                        key={offering.href}
                        href={offering.href}
                        onClick={() => setMegaOpen(false)}
                        className="type-display w-fit text-[max(22px,2vw)] leading-[1.25] hover:text-leaf-deep"
                      >
                        {offering.badge}
                      </Link>
                    ))}
                    <Link
                      href="/menu"
                      onClick={() => setMegaOpen(false)}
                      className="type-mono mt-auto w-fit pt-6 uppercase underline underline-offset-4"
                    >
                      View Full Menu
                    </Link>
                  </div>
                  <div className="grid min-w-0 flex-1 grid-cols-4 gap-[1.2vw]">
                    {offerings.map((offering) => (
                      <Link
                        key={offering.href}
                        href={offering.href}
                        onClick={() => setMegaOpen(false)}
                        className="group flex flex-col gap-3"
                      >
                        <div className="media-frame aspect-square">
                          <Image
                            src={offering.image}
                            alt={offering.alt}
                            fill
                            sizes="18vw"
                            className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                          />
                        </div>
                        <span className="type-body-lg">{offering.label}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </header>
      </div>

      {!overlay && <div aria-hidden="true" className="h-[calc(var(--header-height)+36px)]" />}

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            aria-label="Mobile"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed inset-0 z-[60] flex flex-col overflow-y-auto bg-cream text-ink lg:hidden"
          >
            <div className="gutter flex h-[var(--header-height)] flex-none items-center justify-between border-b-[1.5px] border-ink">
              <Wordmark className="text-[28px] text-leaf" />
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
                className="-mr-2 p-2"
              >
                <X size={22} aria-hidden="true" />
              </button>
            </div>

            <div className="gutter flex flex-1 flex-col py-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="type-display border-b-[1.5px] border-ink py-3 text-[32px] leading-tight"
                >
                  {link.label}
                </Link>
              ))}

              <p className="type-mono mt-8 mb-2 uppercase">Our Offering</p>
              {offerings.map((offering) => (
                <Link
                  key={offering.href}
                  href={offering.href}
                  onClick={() => setMobileOpen(false)}
                  className="type-body-lg py-2 text-[19px]"
                >
                  {offering.label}
                </Link>
              ))}

              <Link
                href="/menu"
                onClick={() => setMobileOpen(false)}
                className="btn-vibe mt-auto w-full"
              >
                <BtnLabel>Shop All</BtnLabel>
              </Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  )
}
