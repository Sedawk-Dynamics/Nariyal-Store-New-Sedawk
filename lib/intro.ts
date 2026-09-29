/**
 * Coordination between the page covers and the page entrances.
 *
 * Two covers can hide the page: the first-visit entry loader, and the wave
 * page transition between routes. Each fires REVEAL_EVENT partway through its
 * reveal; entrances wait for it (via onIntroDone) so they play as the page is
 * uncovered, not hidden behind the cover.
 *
 * An inline script in the document head adds LOADING_CLASS before first paint
 * when the loader will play (first page view of the session, motion allowed).
 */
export const LOADING_CLASS = "nariyal-loading"
export const LIVE_CLASS = "nariyal-loader-live"
export const COMPOSE_CLASS = "nariyal-compose"
/** Present on <html> while the page transition covers the screen. */
export const TRANSITION_CLASS = "nariyal-pt-covered"
export const REVEAL_EVENT = "nariyal:revealed"
export const SEEN_KEY = "nariyal-loader-seen"

let loaderDone = false

export function markIntroDone() {
  if (loaderDone) return
  loaderDone = true
  document.dispatchEvent(new CustomEvent(REVEAL_EVENT))
}

/** Called by the page transition once its cover starts lifting. */
export function markTransitionRevealed() {
  document.documentElement.classList.remove(TRANSITION_CLASS)
  document.dispatchEvent(new CustomEvent(REVEAL_EVENT))
}

function isCovered() {
  const root = document.documentElement.classList
  return (root.contains(LOADING_CLASS) && !loaderDone) || root.contains(TRANSITION_CLASS)
}

/** Runs `callback` once no cover hides the page (immediately if none does). */
export function onIntroDone(callback: () => void): () => void {
  if (!isCovered()) {
    callback()
    return () => {}
  }
  document.addEventListener(REVEAL_EVENT, callback, { once: true })
  return () => document.removeEventListener(REVEAL_EVENT, callback)
}

/** Head script: decide on the cover before first paint. Kept tiny and dependency-free. */
export const INTRO_HEAD_SCRIPT = `(function(){try{if(!sessionStorage.getItem('${SEEN_KEY}')&&!matchMedia('(prefers-reduced-motion: reduce)').matches){document.documentElement.classList.add('${LOADING_CLASS}')}}catch(e){}})()`
