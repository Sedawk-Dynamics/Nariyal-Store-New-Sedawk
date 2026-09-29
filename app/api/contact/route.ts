import { NextResponse } from "next/server"

import { MailNotConfiguredError, sendContactEmail } from "@/lib/contact-mail"

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const text = (value: unknown, max: number) => (typeof value === "string" ? value.trim().slice(0, max) : "")

export async function POST(request: Request) {
  let body: Record<string, unknown>
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 })
  }

  // Honeypot: a filled "company" field means a bot. Pretend success so it moves on.
  if (text(body.company, 200)) return NextResponse.json({ ok: true })

  const message = {
    name: text(body.name, 120),
    email: text(body.email, 200),
    phone: text(body.phone, 30),
    comment: text(body.comment, 5000),
  }

  if (!EMAIL_PATTERN.test(message.email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 })
  }
  if (!message.comment && !message.phone) {
    return NextResponse.json({ error: "Please add a comment so we know how to help." }, { status: 400 })
  }

  try {
    await sendContactEmail(message)
    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error("Contact form send failed:", error)
    const notSetUp = error instanceof MailNotConfiguredError
    return NextResponse.json(
      {
        error: notSetUp
          ? "Our contact form isn't connected yet. Please email info@nariyalstore.com or call +91 7042110917."
          : "We couldn't send your message right now. Please try again, or email info@nariyalstore.com.",
      },
      { status: notSetUp ? 503 : 502 },
    )
  }
}
