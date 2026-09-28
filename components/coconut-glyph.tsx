/** Small coconut mark used as a marquee separator. */
export default function CoconutGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className={className}>
      <circle cx="16" cy="18" r="11.5" fill="currentColor" />
      <ellipse cx="16" cy="11" rx="8" ry="3" fill="#FFF1E7" />
      <path d="M17 11 21.5 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}
