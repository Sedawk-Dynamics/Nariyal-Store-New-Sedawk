import { cn } from "@/lib/utils"

/**
 * "Nariyal" with "• STORE •" set small and wide underneath, echoing the logo.
 * Sized by the parent's font-size and coloured by its text colour.
 */
export default function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex flex-col items-center leading-none", className)}>
      <span className="type-display leading-none">Nariyal</span>
      {/* Ems here are STORE's own (small) size: the top margin clears the "y"
          descender, and left padding balances the trailing letter-spacing. */}
      <span className="mt-[0.75em] pl-[0.5em] text-[0.3em] font-bold tracking-[0.5em] uppercase">
        • Store •
      </span>
    </span>
  )
}
