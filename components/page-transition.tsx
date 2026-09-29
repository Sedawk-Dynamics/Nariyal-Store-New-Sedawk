"use client"

import { useEffect, useRef } from "react"
import { usePathname, useRouter } from "next/navigation"

import { markTransitionRevealed, TRANSITION_CLASS } from "@/lib/intro"

// The cover's wavy edge morphs from a near-flat band into deep curves while it moves.
const PATH_FROM =
  "M -44,-50 C -52.71,28.52 15.86,8.186 184,14.69 383.3,22.39 462.5,12.58 638,14 835.5,15.6 987,6.4 1194,13.86 1661,30.68 1652,-36.74 1582,-140.1 1512,-243.5 15.88,-589.5 -44,-50 Z"
const PATH_TO =
  "M -44,-50 C -137.1,117.4 67.86,445.5 236,452 435.3,459.7 500.5,242.6 676,244 873.5,245.6 957,522.4 1154,594 1593,753.7 1793,226.3 1582,-126 1371,-478.3 219.8,-524.2 -44,-50 Z"

const DURATION = 1100
// Entrances on the new page start this far into the reveal.
const REVEAL_AT = 500
// Shortest time the screen stays fully covered while the new page renders.
const MIN_HOLD = 120
const FAILSAFE = 2400

const easeInOutSine = (t: number) => -(Math.cos(Math.PI * t) - 1) / 2
const easeInQuad = (t: number) => t * t
const easeOutQuad = (t: number) => t * (2 - t)

// Precompute the morph as keyframes so each frame only swaps a string.
const MORPH_STEPS = 132
const PATH_FRAMES = (() => {
  const NUM = /-?\d*\.?\d+/g
  const from = PATH_FROM.match(NUM)!.map(Number)
  const to = PATH_TO.match(NUM)!.map(Number)
  const template = PATH_FROM.replace(NUM, "@")
  return Array.from({ length: MORPH_STEPS + 1 }, (_, s) => {
    const p = easeOutQuad(s / MORPH_STEPS)
    let i = 0
    return template.replace(/@/g, () => {
      const v = from[i] + (to[i] - from[i]) * p
      i++
      return v.toFixed(2)
    })
  })
})()

/**
 * Wave page transition between routes: on an internal link click a green
 * cover rises from the bottom, wave edge first; the new page renders
 * underneath; then the cover slides up and away, trailing its wave.
 */
export default function PageTransition() {
  const router = useRouter()
  const pathname = usePathname()
  const layerRef = useRef<HTMLDivElement>(null)
  const moverRef = useRef<HTMLDivElement>(null)
  const waveRef = useRef<SVGSVGElement>(null)
  const pathRef = useRef<SVGPathElement>(null)
  const pending = useRef<{ coveredAt: number; failsafe: ReturnType<typeof setTimeout> } | null>(null)
  const busy = useRef(false)

  /** One 1.1s pass; slide runs from→to in units of the 200vh travel (0 = covering, 1 = gone). */
  const play = (exit: boolean, from: number, to: number, done: () => void) => {
    const layer = layerRef.current
    const mover = moverRef.current
    const wave = waveRef.current
    const path = pathRef.current
    if (!layer || !mover || !wave || !path) return done()
    layer.style.display = "block"
    layer.style.transform = exit ? "rotate(180deg)" : ""
    const start = performance.now()
    let lastStep = -1
    const frame = (now: number) => {
      const t = Math.min((now - start) / DURATION, 1)
      mover.style.transform = `translate3d(0, ${-200 * (from + (to - from) * easeInOutSine(t))}vh, 0)`
      const squash = t < 0.5 ? 0.8 + easeInQuad(t / 0.5) : 1.8 - 0.8 * easeOutQuad((t - 0.5) / 0.5)
      wave.style.transform = `scaleY(${squash.toFixed(4)})`
      const step = Math.round(t * MORPH_STEPS)
      if (step !== lastStep) {
        lastStep = step
        path.setAttribute("d", PATH_FRAMES[step])
      }
      if (t < 1) requestAnimationFrame(frame)
      else done()
    }
    requestAnimationFrame(frame)
  }

  const reveal = () => {
    const state = pending.current
    if (!state) return
    pending.current = null
    clearTimeout(state.failsafe)
    const wait = Math.max(0, MIN_HOLD - (performance.now() - state.coveredAt))
    setTimeout(() => {
      const revealTimer = setTimeout(markTransitionRevealed, REVEAL_AT)
      play(false, 0, 1, () => {
        clearTimeout(revealTimer)
        markTransitionRevealed()
        if (layerRef.current) layerRef.current.style.display = "none"
        busy.current = false
      })
    }, wait)
  }

  // Intercept internal navigations and cover the screen before routing.
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)")
    const handleClick = (event: MouseEvent) => {
      if (busy.current || reduced.matches || event.defaultPrevented) return
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
      const link = (event.target as Element | null)?.closest?.("a[href]")
      if (!(link instanceof HTMLAnchorElement)) return
      if ((link.target && link.target !== "_self") || link.hasAttribute("download")) return
      let url: URL
      try {
        url = new URL(link.href, location.href)
      } catch {
        return
      }
      if (url.origin !== location.origin || url.pathname.startsWith("/api/")) return
      // Same page (with or without a #section): leave it to normal/smooth scrolling.
      if (url.pathname === location.pathname && url.search === location.search) return

      event.preventDefault()
      busy.current = true
      document.documentElement.classList.add(TRANSITION_CLASS)
      const href = url.pathname + url.search + url.hash
      play(true, 1, 0, () => {
        pending.current = {
          coveredAt: performance.now(),
          // If the route never reports a change, lift the cover anyway.
          failsafe: setTimeout(reveal, FAILSAFE),
        }
        router.push(href)
      })
    }
    document.addEventListener("click", handleClick, { capture: true })
    return () => document.removeEventListener("click", handleClick, { capture: true })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router])

  // The new route has rendered under the cover: lift it.
  useEffect(() => {
    if (pending.current) reveal()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  return (
    <div
      ref={layerRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[2000] hidden overflow-hidden"
    >
      <div ref={moverRef} className="absolute top-0 left-0 h-[200vh] w-full will-change-transform">
        <div className="h-[100vh] w-full bg-leaf" />
        <svg
          ref={waveRef}
          viewBox="0 0 1440 800"
          preserveAspectRatio="none"
          className="-mt-[2px] block h-[100vh] w-full origin-top fill-leaf will-change-transform"
        >
          <path ref={pathRef} d={PATH_FROM} />
        </svg>
      </div>
    </div>
  )
}
