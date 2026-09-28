/**
 * Coordination between the entry loader and the page entrances.
 *
 * An inline script in the document head adds LOADING_CLASS before first paint
 * when the loader will play (first page view of the session, motion allowed).
 * The loader fires DONE_EVENT halfway through its wipe; hero entrances wait
 * for it so they play as the page is revealed, not hidden behind the cover.
 */
export const LOADING_CLASS = "nariyal-loading"
export const LIVE_CLASS = "nariyal-loader-live"
export const COMPOSE_CLASS = "nariyal-compose"
export const DONE_EVENT = "nariyal:loader-done"
export const SEEN_KEY = "nariyal-loader-seen"

let done = false

export function markIntroDone() {
  if (done) return
  done = true
  document.dispatchEvent(new CustomEvent(DONE_EVENT))
}

/** Runs `callback` once the intro no longer hides the page (immediately if there is no intro). */
export function onIntroDone(callback: () => void): () => void {
  if (done || !document.documentElement.classList.contains(LOADING_CLASS)) {
    callback()
    return () => {}
  }
  document.addEventListener(DONE_EVENT, callback, { once: true })
  return () => document.removeEventListener(DONE_EVENT, callback)
}

/** Head script: decide on the cover before first paint. Kept tiny and dependency-free. */
export const INTRO_HEAD_SCRIPT = `(function(){try{if(!sessionStorage.getItem('${SEEN_KEY}')&&!matchMedia('(prefers-reduced-motion: reduce)').matches){document.documentElement.classList.add('${LOADING_CLASS}')}}catch(e){}})()`
