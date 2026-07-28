"use client"

import Image from "next/image"
import Link from "next/link"
import { MapPin, Phone, Mail } from "lucide-react"

const shopLinks = ["Classic Coconut Water", "Chilled Pack", "Family Box", "Weekly Subscription", "Gift Cards"]
const companyLinks = ["Our Story", "Sustainability", "Farm Partners", "Careers", "Press"]
const helpLinks = ["FAQ", "Shipping Policy", "Return Policy", "Track Order", "Contact Us"]

const socials = [
  {
    label: "Instagram",
    href: "#",
    svg: (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "#",
    svg: (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    ),
  },
  {
    label: "Twitter / X",
    href: "#",
    svg: (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "#",
    svg: (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
      </svg>
    ),
  },
]

export default function Footer() {
  return (
    <footer className="bg-foreground text-primary-foreground">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <Image
                src="/images/logo.png"
                alt="Agrohome Nariyal Store"
                width={52}
                height={52}
                className="object-contain brightness-200 invert"
              />
              <div>
                <p className="text-xs font-medium text-primary-foreground/50 uppercase tracking-widest">Agrohome</p>
                <p className="text-xl font-serif font-bold text-white">Nariyal Store</p>
              </div>
            </div>
            <p className="text-primary-foreground/60 text-sm leading-relaxed mb-6 max-w-xs">
              Bringing you the purest, freshest coconut water directly from hand-selected tropical farms. Nature&apos;s perfect hydration, delivered to your door.
            </p>
            <div className="flex items-center gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-9 h-9 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-accent hover:text-foreground transition-colors duration-200"
                >
                  {s.svg}
                </a>
              ))}
            </div>
          </div>

          {/* Shop */}
          <div>
            <p className="font-bold text-white mb-4 text-sm uppercase tracking-wider">Shop</p>
            <ul className="space-y-2.5">
              {shopLinks.map((l) => (
                <li key={l}>
                  <Link href="#shop" className="text-sm text-primary-foreground/60 hover:text-white transition-colors duration-200">
                    {l}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <p className="font-bold text-white mb-4 text-sm uppercase tracking-wider">Company</p>
            <ul className="space-y-2.5">
              {companyLinks.map((l) => (
                <li key={l}>
                  <Link href="#" className="text-sm text-primary-foreground/60 hover:text-white transition-colors duration-200">
                    {l}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help + Contact */}
          <div>
            <p className="font-bold text-white mb-4 text-sm uppercase tracking-wider">Help</p>
            <ul className="space-y-2.5 mb-6">
              {helpLinks.map((l) => (
                <li key={l}>
                  <Link href="#" className="text-sm text-primary-foreground/60 hover:text-white transition-colors duration-200">
                    {l}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="font-bold text-white mb-3 text-sm uppercase tracking-wider">Contact</p>
            <ul className="space-y-2.5">
              <li className="flex items-start gap-2 text-sm text-primary-foreground/60">
                <MapPin size={14} className="mt-0.5 shrink-0 text-accent" />
                <span>Mumbai, Maharashtra, India</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-primary-foreground/60">
                <Phone size={14} className="shrink-0 text-accent" />
                <a href="tel:+919876543210" className="hover:text-white transition-colors">+91 98765 43210</a>
              </li>
              <li className="flex items-center gap-2 text-sm text-primary-foreground/60">
                <Mail size={14} className="shrink-0 text-accent" />
                <a href="mailto:hello@nariyalstore.in" className="hover:text-white transition-colors">hello@nariyalstore.in</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-primary-foreground/40 text-center sm:text-left">
            &copy; {new Date().getFullYear()} Agrohome Nariyal Store. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link href="#" className="text-xs text-primary-foreground/40 hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="text-xs text-primary-foreground/40 hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
