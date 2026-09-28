import { Fragment, type ReactNode } from "react"

import { cn } from "@/lib/utils"

type MarqueeProps = {
  children: ReactNode
  /** Seconds for one full loop. */
  speed?: number
  /** Gap between repeated items, any CSS length. */
  gap?: string
  /** How many times the children repeat inside each half, to fill wide screens. */
  repeat?: number
  className?: string
  trackClassName?: string
}

/**
 * Infinite horizontal ticker. The content is rendered twice and the track
 * slides by -50%, so the loop is seamless at any width. Each copy carries its
 * trailing gap as padding so the two halves are exactly equal.
 */
export default function Marquee({
  children,
  speed = 35,
  gap = "60px",
  repeat = 1,
  className,
  trackClassName,
}: MarqueeProps) {
  return (
    <div className={cn("w-full overflow-hidden", className)}>
      <div
        className={cn("flex w-max animate-marquee", trackClassName)}
        style={{ ["--marquee-speed" as string]: `${speed}s` }}
      >
        {[0, 1].map((copy) => (
          <div
            key={copy}
            aria-hidden={copy === 1}
            className="flex min-w-max shrink-0 items-center"
            style={{ gap, paddingRight: gap }}
          >
            {Array.from({ length: repeat }, (_, i) => (
              <Fragment key={i}>{children}</Fragment>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
