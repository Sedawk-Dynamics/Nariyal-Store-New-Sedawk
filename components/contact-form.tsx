"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"

type Status = { state: "idle" } | { state: "sending" } | { state: "sent" } | { state: "error"; message: string }

const fieldClass =
  "w-full rounded-none border border-ink bg-cream px-5 py-4 text-[17px] leading-[1.2] text-ink placeholder:text-ink/60 focus:outline-2 focus:-outline-offset-2 focus:outline-ink md:text-[14px]"

/** Contact form in the vibebevvy.com style; posts JSON to /api/contact. */
export default function ContactForm() {
  const [status, setStatus] = useState<Status>({ state: "idle" })

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>
    setStatus({ state: "sending" })
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      const result = (await response.json().catch(() => ({}))) as { error?: string }
      if (!response.ok) throw new Error(result.error || "Something went wrong. Please try again.")
      form.reset()
      setStatus({ state: "sent" })
    } catch (error) {
      setStatus({
        state: "error",
        message: error instanceof Error ? error.message : "Something went wrong. Please try again.",
      })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto flex w-full max-w-[816px] flex-col gap-3.5">
      <AnimatePresence>
        {status.state === "sent" && (
          <motion.p
            role="status"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="type-mono border border-ink bg-leaf px-5 py-4 text-[13px] text-cream"
          >
            Thanks for contacting us. We&apos;ll get back to you as soon as possible.
          </motion.p>
        )}
        {status.state === "error" && (
          <motion.p
            role="alert"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="type-mono border border-ink bg-lemon px-5 py-4 text-[13px]"
          >
            {status.message}
          </motion.p>
        )}
      </AnimatePresence>

      <div className="grid gap-3.5 md:grid-cols-2">
        <label className="block">
          <span className="sr-only">Name</span>
          <input type="text" name="name" autoComplete="name" placeholder="Name" maxLength={120} className={fieldClass} />
        </label>
        <label className="block">
          <span className="sr-only">Email (required)</span>
          <input
            type="email"
            name="email"
            autoComplete="email"
            spellCheck={false}
            autoCapitalize="off"
            required
            placeholder="Email"
            maxLength={200}
            className={fieldClass}
          />
        </label>
      </div>

      <label className="block">
        <span className="sr-only">Phone</span>
        <input type="tel" name="phone" autoComplete="tel" placeholder="Phone" maxLength={30} className={fieldClass} />
      </label>

      <label className="block">
        <span className="sr-only">Comment</span>
        <textarea name="comment" rows={10} placeholder="Comment" maxLength={5000} className={`${fieldClass} h-[230px] resize-y`} />
      </label>

      {/* Honeypot: hidden from people, often filled in by spam bots. */}
      <input type="text" name="company" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />

      <div>
        <motion.button
          type="submit"
          disabled={status.state === "sending"}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          className="type-display rounded-[50%] border-[1.5px] border-ink bg-lemon px-[52px] py-[18px] text-[15px] font-normal tracking-normal uppercase underline underline-offset-[0.2em] disabled:cursor-wait disabled:opacity-60"
        >
          {status.state === "sending" ? "Sending…" : "Send"}
        </motion.button>
      </div>
    </form>
  )
}
