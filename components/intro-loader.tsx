"use client"

import { useEffect, useRef, useState } from "react"

import Wordmark from "@/components/wordmark"
import { COMPOSE_CLASS, LIVE_CLASS, LOADING_CLASS, markIntroDone, SEEN_KEY } from "@/lib/intro"

// Hand-drawn scribble that covers the whole screen at full stroke width, in a
// 3222×3114 box stretched to the viewport.
const SCRIBBLE =
  "M299.654 453.865C505.574 319.225 711.494 184.585 836.054 109.945" +
  "C960.614 35.3048 997.574 24.7448 944.014 110.385" +
  "C890.454 196.025 745.254 378.185 571.454 634.385" +
  "C397.654 890.585 199.654 1215.3 110.854 1382.58" +
  "C22.0544 1549.86 48.4544 1549.86 77.8944 1540.62" +
  "C107.334 1531.38 139.014 1512.9 367.854 1319.9" +
  "C596.694 1126.9 1021.73 759.945 1255.21 555.065" +
  "C1488.69 350.185 1517.73 318.505 1527.41 306.145" +
  "C1537.09 293.785 1526.53 301.705 1346.85 618.625" +
  "C1167.17 935.545 818.694 1561.22 635.214 1896.74" +
  "C451.734 2232.26 443.814 2258.66 447.654 2268.3" +
  "C451.494 2277.94 467.334 2270.02 511.134 2236.9" +
  "C554.934 2203.78 626.214 2145.7 966.534 1817.46" +
  "C1306.85 1489.22 1914.05 892.585 2263.81 557.505" +
  "C2613.57 222.425 2687.49 166.985 2741.41 129.185" +
  "C2795.33 91.3848 2827.01 72.9048 2843.33 67.3448" +
  "C2859.65 61.7848 2859.65 69.7048 2849.09 96.2248" +
  "C2838.53 122.745 2817.41 167.625 2584.77 544.505" +
  "C2352.13 921.385 1370.37 2165.43 1139.25 2537.83" +
  "C908.134 2910.23 902.854 2926.07 902.774 2939.51" +
  "C902.694 2952.95 907.974 2963.51 1255.21 2613.87" +
  "C1602.45 2264.23 2829.73 1017.54 2903.53 1071.46C2977.33 1125.38 2176.12 2817.04 2128 3037" +
  "C2079.88 3256.96 2911.24 2018.56 3172 1793"

// Timeline, in seconds: a short hold, then the scribble unwinds.
const HOLD = 0.25
const UNWIND = 2
const LOGO_HIDE_AT = 0.95
// Stroke widths as a share of the viewBox's normalised diagonal.
const NORM = Math.sqrt((3222 * 3222 + 3114 * 3114) / 2)
const WIDTH_FULL = NORM * 0.31
const WIDTH_END = NORM * 0.08
// How long the header glide runs after the loader is gone (matches globals.css).
const COMPOSE_MS = 1100
const FAILSAFE_MS = 4000

/** Cubic-bezier easing solver (x1, y1, x2, y2), like CSS cubic-bezier(). */
function bezier(x1: number, y1: number, x2: number, y2: number) {
  const f = (t: number, a: number, b: number) => {
    const u = 1 - t
    return 3 * u * u * t * a + 3 * u * t * t * b + t * t * t
  }
  return (x: number) => {
    let t = x
    for (let i = 0; i < 5; i++) {
      const cx = f(t, x1, x2) - x
      const dx = 3 * (1 - t) * (1 - t) * x1 + 6 * (1 - t) * t * (x2 - x1) + 3 * t * t * (1 - x2)
      if (Math.abs(dx) < 1e-6) break
      t = Math.max(0, Math.min(1, t - cx / dx))
    }
    return f(t, y1, y2)
  }
}
const unwindEase = bezier(0.645, 0.045, 0.355, 1) // Power2 in-out
const thinEase = bezier(0.75, 0.15, 0.15, 1)

/**
 * First-visit loader: a green cover with the cream wordmark, revealed by a
 * giant scribble that unwinds itself while thinning out. Halfway through,
 * the header glides in and the hero entrances start.
 */
export default function IntroLoader() {
  const [active, setActive] = useState(false)
  const pathRef = useRef<SVGPathElement>(null)
  const fillRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<HTMLSpanElement>(null)

  // The head script already decided; only take over if it put the cover up.
  useEffect(() => {
    if (document.documentElement.classList.contains(LOADING_CLASS)) setActive(true)
  }, [])

  useEffect(() => {
    if (!active) return
    const root = document.documentElement
    const path = pathRef.current
    const fill = fillRef.current
    const logo = logoRef.current
    if (!path || !fill || !logo) return

    root.classList.add(LIVE_CLASS)
    try {
      sessionStorage.setItem(SEEN_KEY, "1")
    } catch {}

    const length = path.getTotalLength()
    path.style.strokeDasharray = `${length} ${length}`
    path.style.strokeDashoffset = "0"
    path.style.strokeWidth = String(WIDTH_FULL)

    const timers: ReturnType<typeof setTimeout>[] = []
    let raf = 0
    let finished = false
    let composed = false
    const start = performance.now()

    const compose = () => {
      if (composed) return
      composed = true
      root.classList.add(COMPOSE_CLASS) // header first…
      timers.push(setTimeout(markIntroDone, 250)) // …then the hero text
    }

    const finish = () => {
      if (finished) return
      finished = true
      compose()
      markIntroDone()
      // Keep the state classes until the header glide has completed. Not added
      // to `timers`: unmounting the loader (below) must not cancel this.
      setTimeout(() => root.classList.remove(LOADING_CLASS, COMPOSE_CLASS, LIVE_CLASS), COMPOSE_MS)
      setActive(false)
    }

    const frame = (now: number) => {
      if (finished) return
      const t = (now - start) / 1000 - HOLD
      if (t >= 0) {
        const p = Math.min(t / UNWIND, 1)
        path.style.strokeDashoffset = String(-length * unwindEase(p))
        path.style.strokeWidth = String(WIDTH_FULL + (WIDTH_END - WIDTH_FULL) * thinEase(p))
        // The solid ground fades fast; from then on the reveal is all scribble.
        fill.style.opacity = String(Math.max(0, 1 - p / 0.18))
        if (t >= LOGO_HIDE_AT) logo.style.opacity = "0"
        if (p >= 0.5) compose()
        if (p >= 1) return finish()
      }
      raf = requestAnimationFrame(frame)
    }
    raf = requestAnimationFrame(frame)

    // Never leave the page stuck behind the cover.
    timers.push(setTimeout(finish, FAILSAFE_MS))

    return () => {
      cancelAnimationFrame(raf)
      timers.forEach(clearTimeout)
    }
  }, [active])

  if (!active) return null

  return (
    <div aria-hidden="true" className="pointer-events-auto fixed inset-0 z-[3000]">
      <div ref={fillRef} className="absolute inset-0 bg-leaf" />
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 3222 3114" preserveAspectRatio="none">
        <path
          ref={pathRef}
          d={SCRIBBLE}
          fill="none"
          stroke="var(--color-leaf)"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span
        ref={logoRef}
        className="absolute top-1/2 left-1/2 z-[1] -translate-x-1/2 -translate-y-1/2 text-[clamp(64px,12vw,180px)] text-cream"
      >
        <Wordmark />
      </span>
    </div>
  )
}
