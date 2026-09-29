"use client"

import { useCallback, useRef, useState } from "react"
import Link from "next/link"

import CoconutGlyph from "@/components/coconut-glyph"
import MenuPopup from "@/components/menu-popup"
import { SocialCircles } from "@/components/social-icons"
import VibeArrow from "@/components/vibe-arrow"
import { services } from "@/lib/services-data"

type FooterLink = { label: string; href: string; /** Opens the menu poster pop-up instead of navigating. */ popup?: boolean }

const linkColumns: { title: string; links: FooterLink[] }[] = [
  {
    title: "Menu",
    links: [
      { label: "Classic Tender Coconut", href: "/menu" },
      { label: "Coconut Lemonade", href: "/menu" },
      { label: "Coconut Smoothie", href: "/menu" },
      { label: "Cold Coffee Frappe", href: "/menu" },
      { label: "Full Menu", href: "/menu", popup: true },
    ],
  },
  {
    title: "Offering",
    links: services.map((service) => ({ label: service.navLabel, href: `/services/${service.slug}` })),
  },
  {
    title: "Visit",
    links: [
      {
        label: "Epicuria Food Court, Nehru Place Metro, New Delhi 110019",
        href: "https://maps.google.com/?q=Epicuria+Food+Court+Nehru+Place+New+Delhi",
      },
      { label: "+91 7042110917", href: "tel:+917042110917" },
      { label: "info@nariyalstore.com", href: "mailto:info@nariyalstore.com" },
    ],
  },
]

export default function Footer() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const menuTriggerRef = useRef<HTMLButtonElement>(null)
  const closeMenu = useCallback(() => {
    setMenuOpen(false)
    menuTriggerRef.current?.focus()
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) setSubmitted(true)
  }

  return (
    <footer
      id="contact"
      className="flex scroll-mt-24 flex-col gap-[clamp(24px,2.5vw,52px)] overflow-hidden bg-cream pt-[var(--section-pad)] pb-[38px] text-ink"
    >
      <div className="ink-divider" />

      <div className="flex flex-col gap-10 px-5 md:flex-row md:gap-[2.5vw] md:px-[1.5625vw]">
        {/* Newsletter */}
        <div className="flex flex-col gap-[clamp(24px,2.5vw,52px)] md:w-[45.86vw] md:flex-none">
          <h2 className="type-body-lg">Join the coconut club.</h2>
          {submitted ? (
            <p className="type-mono text-[13px]">You&apos;re on the list. Welcome to Nariyal Store.</p>
          ) : (
            <form onSubmit={handleSubmit} className="w-full md:max-w-[36.46vw]">
              <div className="flex items-center gap-1.5 border-b-[1.5px] border-ink pb-3.5 focus-within:border-b-[2.5px]">
                <label htmlFor="footer-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="footer-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email address"
                  className="type-mono min-w-0 flex-1 bg-transparent text-ink placeholder:text-ink/90 focus:outline-none"
                />
                <button type="submit" aria-label="Subscribe" className="flex-none p-1">
                  <VibeArrow className="h-auto w-[max(28px,2.2vw)]" />
                </button>
              </div>
            </form>
          )}
          <SocialCircles />
        </div>

        {/* Link columns */}
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 md:flex-1 md:gap-[3vw]">
          {linkColumns.map((column) => (
            <div key={column.title} className="flex flex-col gap-[max(12px,1vw)]">
              <h3 className="type-mono uppercase">{column.title}</h3>
              <ul className="flex flex-col gap-[max(12px,1vw)]">
                {column.links.map((link) => (
                  <li key={link.label}>
                    {link.popup ? (
                      <button
                        ref={menuTriggerRef}
                        type="button"
                        onClick={() => setMenuOpen(true)}
                        aria-haspopup="dialog"
                        className="text-left text-[max(12.75px,.885vw)] leading-[1.2] underline-offset-[0.2em] hover:underline"
                      >
                        {link.label}
                      </button>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-[max(12.75px,.885vw)] leading-[1.2] underline-offset-[0.2em] hover:underline"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="ink-divider" />

      {/* Lockup */}
      <div className="relative px-2.5">
        <p
          aria-hidden="true"
          className="type-display m-0 text-center text-[17.8vw] leading-[0.95] md:text-[12.3vw] md:leading-[1.05] md:whitespace-nowrap"
        >
          Drink pure.
        </p>
        <CoconutGlyph className="absolute right-[12%] bottom-[8%] w-[44px] -rotate-12 text-leaf md:top-[0.7vw] md:right-auto md:bottom-auto md:left-[82.1vw] md:w-[5.83vw]" />
      </div>

      <div className="type-mono flex flex-col items-center gap-3 px-5 text-center text-[12px]">
        <p>Best served chilled. Freshly opened, every time.</p>
        <p>&copy; {new Date().getFullYear()} Agrohome Nariyal Store. All rights reserved.</p>
        <p>
          Designed by{" "}
          <a
            href="https://webel.io/"
            target="_blank"
            rel="noopener"
            className="font-bold text-leaf underline underline-offset-[0.25em] transition-colors hover:text-leaf-deep"
          >
            Webelio
          </a>
        </p>
      </div>
      <MenuPopup open={menuOpen} onClose={closeMenu} />
    </footer>
  )
}
