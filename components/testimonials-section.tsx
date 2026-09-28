"use client"

import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion, useInView, useReducedMotion, type Variants } from "framer-motion"

import VibeArrow from "@/components/vibe-arrow"

const AUTOPLAY_INTERVAL_MS = 6000
// Drag distance (px) that counts as a swipe to the next or previous quote.
const SWIPE_THRESHOLD = 60
const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1]

const testimonials = [
  {
    quote: "The coconut was super chilled, freshly opened right in front of me.",
    name: "Priya Sharma",
    location: "Nehru Place, Delhi",
    initials: "PS",
  },
  {
    quote: "200 coconuts with our company logo. Everyone loved it!",
    name: "Rahul Verma",
    location: "South Delhi",
    initials: "RV",
  },
  {
    quote: "Personalized coconuts for our wedding. The most unique gifting idea!",
    name: "Anjali Mehta",
    location: "Greater Kailash, Delhi",
    initials: "AM",
  },
  {
    quote: "The chilled tender coconut here is the best I have had in Delhi.",
    name: "Meera Joshi",
    location: "Lajpat Nagar, Delhi",
    initials: "MJ",
  },
]

const avatarColors = ["bg-lilac", "bg-peach", "bg-lemon", "bg-tangerine"]

// `custom` is the slide direction: 1 = forward, -1 = back.
const slide: Variants = {
  enter: (dir: number) => ({ opacity: 0, x: dir * 80, filter: "blur(8px)" }),
  center: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { duration: 0.9, ease: EASE_OUT, staggerChildren: 0.035 },
  },
  exit: (dir: number) => ({
    opacity: 0,
    x: dir * -60,
    filter: "blur(6px)",
    transition: { duration: 0.4, ease: [0.4, 0, 1, 1], staggerChildren: 0.012 },
  }),
}

const word: Variants = {
  enter: { y: "110%", rotate: 4 },
  center: { y: "0%", rotate: 0, transition: { duration: 0.9, ease: EASE_OUT } },
  exit: { y: "-110%", transition: { duration: 0.35, ease: [0.4, 0, 1, 1] } },
}

const avatar: Variants = {
  enter: { scale: 0.4, rotate: -20, opacity: 0 },
  center: { scale: 1, rotate: 0, opacity: 1, transition: { type: "spring", stiffness: 260, damping: 16, delay: 0.35 } },
  exit: { scale: 0.6, opacity: 0, transition: { duration: 0.25 } },
}

const author: Variants = {
  enter: { y: 12, opacity: 0 },
  center: { y: 0, opacity: 1, transition: { duration: 0.7, ease: EASE_OUT, delay: 0.5 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
}

// Reduced motion: a plain crossfade, no movement.
const fade: Variants = {
  enter: { opacity: 0 },
  center: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
}

export default function TestimonialsSection() {
  const [[active, direction], setSlide] = useState<[number, number]>([0, 1])
  const [paused, setPaused] = useState(false)
  const reducedMotion = useReducedMotion()
  const stageRef = useRef<HTMLDivElement>(null)
  // Hold the first quote back until the section is on screen, so its entrance is seen.
  const inView = useInView(stageRef, { once: true, margin: "-20% 0px" })

  const go = (delta: number) =>
    setSlide(([current]) => [(current + delta + testimonials.length) % testimonials.length, delta])

  const goTo = (index: number) => setSlide(([current]) => [index, index >= current ? 1 : -1])

  useEffect(() => {
    if (paused || reducedMotion || !inView) return
    const timeout = setTimeout(() => go(1), AUTOPLAY_INTERVAL_MS)
    return () => clearTimeout(timeout)
  }, [active, paused, reducedMotion, inView])

  const t = testimonials[active]
  const words = `“${t.quote}”`.split(" ")
  const v = (variants: Variants) => (reducedMotion ? fade : variants)

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Customer testimonials"
      className="section-pad-top relative overflow-hidden bg-cream"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="ink-divider" />

      <div ref={stageRef} className="relative px-[1.5625vw] py-[clamp(48px,7.8125vw,150px)]">
        <div aria-live="polite" className="min-h-[clamp(260px,26vw,480px)]">
          <AnimatePresence mode="wait" custom={direction}>
            {inView && (
              <motion.figure
                key={active}
                custom={direction}
                variants={v(slide)}
                initial="enter"
                animate="center"
                exit="exit"
                drag={reducedMotion ? false : "x"}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.25}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -SWIPE_THRESHOLD) go(1)
                  else if (info.offset.x > SWIPE_THRESHOLD) go(-1)
                }}
                className="flex min-h-[clamp(260px,26vw,480px)] cursor-grab touch-pan-y flex-col items-center justify-center gap-[clamp(24px,2.5vw,48px)] px-[clamp(16px,7.5vw,144px)] text-center select-none active:cursor-grabbing"
              >
                <blockquote className="type-h2 text-balance md:max-w-[67.7vw]">
                  {words.map((w, i) => (
                    <span key={i}>
                      <span className="inline-block overflow-hidden pb-[0.12em] align-bottom">
                        <motion.span variants={v(word)} className="inline-block origin-bottom-left">
                          {w}
                        </motion.span>
                      </span>
                      {i < words.length - 1 && " "}
                    </span>
                  ))}
                </blockquote>
                <figcaption className="flex flex-col items-center gap-[max(10px,1vw)]">
                  <motion.span
                    variants={v(avatar)}
                    aria-hidden="true"
                    className={`type-display inline-flex h-[max(56px,5vw)] w-[max(56px,5vw)] items-center justify-center rounded-full border-[1.5px] border-ink text-[max(18px,1.4vw)] ${
                      avatarColors[active % avatarColors.length]
                    }`}
                  >
                    {t.initials}
                  </motion.span>
                  <motion.span variants={v(author)} className="type-mono text-[12px] md:text-[max(11px,.833vw)]">
                    {t.name}, {t.location}
                  </motion.span>
                </figcaption>
              </motion.figure>
            )}
          </AnimatePresence>
        </div>

        <div className="pointer-events-none absolute inset-0 hidden items-center justify-between px-[5vw] md:flex">
          <motion.button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous testimonial"
            whileHover={{ x: -6 }}
            whileTap={{ scale: 0.9 }}
            className="pointer-events-auto p-2 text-ink"
          >
            <VibeArrow className="h-auto w-[max(32px,3.125vw)] -scale-x-100" />
          </motion.button>
          <motion.button
            type="button"
            onClick={() => go(1)}
            aria-label="Next testimonial"
            whileHover={{ x: 6 }}
            whileTap={{ scale: 0.9 }}
            className="pointer-events-auto p-2 text-ink"
          >
            <VibeArrow className="h-auto w-[max(32px,3.125vw)]" />
          </motion.button>
        </div>

        <div className="mt-[clamp(24px,3vw,58px)] flex justify-center gap-2.5">
          {testimonials.map((item, i) => (
            <button
              key={item.name}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Show testimonial from ${item.name}`}
              aria-current={active === i}
              className="relative inline-block h-[11px] w-[11px] rounded-full border-[1.5px] border-ink p-0"
            >
              {active === i && (
                // Shared layout id: the filled dot glides between positions.
                <motion.span
                  layoutId="testimonial-dot"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  className="absolute inset-[-1.5px] rounded-full bg-ink"
                />
              )}
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
