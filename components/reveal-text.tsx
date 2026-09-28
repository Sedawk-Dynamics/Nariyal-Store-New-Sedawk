"use client"

import { Fragment, useRef } from "react"
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion"

import { cn } from "@/lib/utils"

type Tag = "h1" | "h2" | "h3" | "p"

type RevealTextProps = {
  text: string
  as?: Tag
  className?: string
  /**
   * "type": letters appear left to right once in view.
   * "scatter": letters pop in, in a shuffled order.
   * "scroll": letters fill from pale to full colour, tied to scroll position.
   */
  mode?: "type" | "scatter" | "scroll"
  /** Play on mount instead of when scrolled into view ("type" and "scatter"). */
  onMount?: boolean
  /** With `onMount`: hold the letters hidden until this turns true. */
  play?: boolean
  delay?: number
  /** Seconds between letters ("type") or the spread of the shuffle ("scatter"). */
  speed?: number
}

// Deterministic shuffle so server and client render the same delays.
const shuffled = (i: number, n: number) => ((i * 7 + 3) % n) / n

// Share of the scroll range each letter takes to fill in "scroll" mode.
const FILL_SPAN = 0.15

function ScrollChar({ char, progress, start }: { char: string; progress: MotionValue<number>; start: number }) {
  const opacity = useTransform(progress, [start, start + FILL_SPAN], [0.2, 1])
  return (
    <motion.span className="inline-block" style={{ opacity }}>
      {char}
    </motion.span>
  )
}

/**
 * Heading that reveals letter by letter. Screen readers get the plain text;
 * the per-letter spans are hidden from them.
 */
export default function RevealText({
  text,
  as = "h2",
  className,
  mode = "type",
  onMount = false,
  play = true,
  delay = 0,
  speed,
}: RevealTextProps) {
  const ref = useRef<HTMLHeadingElement>(null)
  const reducedMotion = useReducedMotion()
  // Fills while the heading travels from low in the viewport to just above the middle.
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.9", "start 0.4"] })

  const Tag = motion[as]
  const words = text.split(" ")
  const total = text.replace(/ /g, "").length
  const step = speed ?? (mode === "type" ? 0.025 : 0.6)
  const scrollMode = mode === "scroll" && !reducedMotion

  let index = 0
  const trigger = scrollMode
    ? {}
    : onMount
      ? { animate: play ? "shown" : "hidden" }
      : { whileInView: "shown", viewport: { once: true, margin: "-10% 0px" } }

  const renderChar = (char: string, i: number) => {
    if (scrollMode) {
      return <ScrollChar key={i} char={char} progress={scrollYProgress} start={(i / total) * (1 - FILL_SPAN)} />
    }
    const charDelay = delay + (mode === "type" ? i * step : shuffled(i, total) * step)
    return (
      <motion.span
        key={i}
        className="inline-block"
        variants={{
          hidden: mode === "scatter" ? { opacity: 0, y: "0.25em", scale: 0.6 } : { opacity: 0 },
          shown: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition:
              mode === "scatter"
                ? { type: "spring", stiffness: 420, damping: 18, delay: charDelay }
                : { duration: 0.01, delay: charDelay },
          },
        }}
      >
        {char}
      </motion.span>
    )
  }

  return (
    <Tag
      ref={ref}
      className={cn(className)}
      aria-label={text}
      initial={reducedMotion || scrollMode ? false : "hidden"}
      {...trigger}
    >
      {words.map((word, w) => (
        <Fragment key={w}>
          <span aria-hidden="true" className="inline-block whitespace-nowrap">
            {Array.from(word).map((char) => renderChar(char, index++))}
          </span>
          {w < words.length - 1 && " "}
        </Fragment>
      ))}
    </Tag>
  )
}
