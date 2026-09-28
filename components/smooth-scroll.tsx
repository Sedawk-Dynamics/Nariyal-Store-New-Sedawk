"use client"

import { useEffect } from "react"
import Lenis from "lenis"
import "lenis/dist/lenis.css"

// Space left above an in-page target so the fixed header doesn't cover it.
const ANCHOR_OFFSET = -96

const NAV_KEYS = ["ArrowUp", "ArrowDown", "PageUp", "PageDown", "Home", "End", " ", "Tab"]

/**
 * Eased, momentum-style wheel scrolling (Lenis), tuned like vibebevvy.com:
 * mouse and trackpad only, since touch keeps native scrolling, and off for
 * reduced motion. The page still scrolls natively underneath, so
 * framer-motion's useScroll effects follow it frame by frame.
 */
export default function SmoothScroll() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)")
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)")
    let lenis: Lenis | null = null

    const cancelInertia = () => {
      if (lenis && !lenis.isStopped) lenis.scrollTo(lenis.actualScroll, { immediate: true })
    }

    // Pause while something (e.g. the mobile menu) locks page scroll.
    const syncLock = () => {
      if (!lenis) return
      if (document.body.style.overflow === "hidden" || document.hidden) lenis.stop()
      else lenis.start()
    }

    const configure = () => {
      lenis?.destroy()
      lenis = null
      if (reduced.matches || !finePointer.matches) return
      lenis = new Lenis({
        autoRaf: true,
        smoothWheel: true,
        lerp: 0.1,
        syncTouch: false,
        anchors: false,
        stopInertiaOnNavigate: true,
        // Ignore pinch-zoom and mostly-horizontal gestures.
        virtualScroll: ({ deltaX, deltaY, event }) => !event.ctrlKey && Math.abs(deltaY) >= Math.abs(deltaX),
      })
      syncLock()
    }

    // Same-page "#section" links glide there instead of jumping. Preventing the
    // default also stops next/link from doing its own instant hash scroll.
    const handleClick = (event: MouseEvent) => {
      if (!lenis || event.defaultPrevented || event.button !== 0) return
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
      const link = (event.target as Element | null)?.closest?.("a[href*='#']")
      if (!(link instanceof HTMLAnchorElement)) return
      const url = new URL(link.href)
      if (url.origin !== location.origin || url.pathname !== location.pathname || !url.hash) return
      const target = document.getElementById(decodeURIComponent(url.hash.slice(1)))
      if (!target) return
      event.preventDefault()
      history.pushState(null, "", url.hash)
      // A link inside a dialog fires while its scroll lock is still on; wait
      // (up to ~1s) for the dialog to close and unlock before gliding.
      const scrollWhenFree = (tries: number) => {
        if (!lenis) return
        if (!lenis.isStopped) lenis.scrollTo(target, { offset: ANCHOR_OFFSET })
        else if (tries > 0) setTimeout(() => scrollWhenFree(tries - 1), 50)
      }
      scrollWhenFree(20)
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (!NAV_KEYS.includes(event.key)) return
      if ((event.target as Element | null)?.closest?.("input, textarea, select, [contenteditable='true']")) return
      cancelInertia()
    }

    const lockObserver = new MutationObserver(syncLock)
    lockObserver.observe(document.body, { attributes: true, attributeFilter: ["style"] })

    reduced.addEventListener("change", configure)
    finePointer.addEventListener("change", configure)
    document.addEventListener("visibilitychange", syncLock)
    document.addEventListener("click", handleClick, { capture: true })
    document.addEventListener("keydown", handleKeyDown, { capture: true })
    document.addEventListener("pointerdown", cancelInertia, { passive: true, capture: true })
    window.addEventListener("popstate", cancelInertia)

    configure()

    return () => {
      lockObserver.disconnect()
      reduced.removeEventListener("change", configure)
      finePointer.removeEventListener("change", configure)
      document.removeEventListener("visibilitychange", syncLock)
      document.removeEventListener("click", handleClick, { capture: true })
      document.removeEventListener("keydown", handleKeyDown, { capture: true })
      document.removeEventListener("pointerdown", cancelInertia, { capture: true })
      window.removeEventListener("popstate", cancelInertia)
      lenis?.destroy()
    }
  }, [])

  return null
}
