import Link from "next/link"

import { cn } from "@/lib/utils"

// 18-point sticker outline, alternating outer and inner radius.
const STARBURST =
  Array.from({ length: 36 }, (_, i) => {
    const r = i % 2 === 0 ? 49 : 41
    const a = (i / 36) * Math.PI * 2
    return `${i === 0 ? "M" : "L"}${(50 + r * Math.cos(a)).toFixed(2)} ${(50 + r * Math.sin(a)).toFixed(2)}`
  }).join(" ") + "Z"

/** Tilted lemon starburst sticker with an underlined label. Position it with `className`. */
export default function StarburstSticker({
  href,
  label,
  className,
}: {
  href: string
  label: string
  className?: string
}) {
  return (
    <Link
      href={href}
      className={cn(
        "absolute z-[2] grid aspect-square w-[92px] -rotate-10 place-items-center transition-transform duration-200 hover:rotate-6 md:w-[7.6vw] md:min-w-[84px]",
        className,
      )}
    >
      <svg viewBox="0 0 100 100" aria-hidden="true" className="absolute inset-0 h-full w-full">
        <path d={STARBURST} fill="var(--color-lemon)" stroke="var(--color-ink)" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
      <span className="relative max-w-[70%] text-center text-[max(9px,.833vw)] leading-[1.2] uppercase underline">
        {label}
      </span>
    </Link>
  )
}
