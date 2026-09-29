"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { X } from "lucide-react"

const POSTER = {
  src: "/images/menu/pure-coconut-menu.webp",
  width: 732,
  height: 1100,
  alt: "Pure Coconut Experience menu. Refreshing: Coconut Lemonade, Tender Coconut Mojito, Coconut Fruit Punch, Coconut Detox Drink, Coconut Shikanji. Wellness: Coconut Chia Fresca, Herbal Coconut Cooler, Tulsi Ginger Elixir. Indulgent: Coconut Smoothie, Coconut Iced Coffee, Coconut Cold Coffee Frappe, Blue Lagoon Coconut Mocktail.",
}

/** The menu poster, springing up over a blurred backdrop and sinking away on close. */
export default function MenuPopup({ open, onClose }: { open: boolean; onClose: () => void }) {
  const reducedMotion = useReducedMotion()
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!open) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    closeRef.current?.focus()
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose()
    }
    document.addEventListener("keydown", handleKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="menu-popup"
          className="fixed inset-0 z-[70] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.3, delay: 0.1 } }}
        >
          <motion.div
            aria-hidden="true"
            onClick={onClose}
            className="absolute inset-0 bg-ink/60"
            initial={{ backdropFilter: "blur(0px)" }}
            animate={{ backdropFilter: "blur(8px)" }}
            exit={{ backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.4 }}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Nariyal Store full menu"
            data-lenis-prevent
            initial={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.7, y: 80, rotate: -4 }}
            animate={
              reducedMotion
                ? { opacity: 1 }
                : { opacity: 1, scale: 1, y: 0, rotate: 0, transition: { type: "spring", stiffness: 220, damping: 20, mass: 0.9 } }
            }
            exit={
              reducedMotion
                ? { opacity: 0, transition: { duration: 0.2 } }
                : { opacity: 0, scale: 0.85, y: 60, rotate: 2, transition: { duration: 0.35, ease: [0.4, 0, 1, 1] } }
            }
            className="relative flex max-h-full flex-col items-center gap-3"
          >
            <div className="relative overflow-hidden rounded-[var(--media-radius)] border-[1.5px] border-ink shadow-2xl">
              <Image
                src={POSTER.src}
                alt={POSTER.alt}
                width={POSTER.width}
                height={POSTER.height}
                priority
                sizes="(min-width: 768px) 560px, 92vw"
                className="block h-auto max-h-[calc(100svh-7rem)] w-auto"
              />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 0.25 } }}
              exit={{ opacity: 0, transition: { duration: 0.1 } }}
              className="flex items-center gap-3"
            >
              <Link href="/menu" onClick={onClose} className="type-mono rounded-full border-[1.5px] border-ink bg-lemon px-4 py-2 text-[12px] uppercase">
                Menu with prices
              </Link>
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                aria-label="Close menu"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border-[1.5px] border-ink bg-cream text-ink transition-colors hover:bg-lemon"
              >
                <X size={16} aria-hidden="true" />
              </button>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
