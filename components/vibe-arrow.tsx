/** Long, hand-drawn style arrow used inside buttons and form submits. */
export default function VibeArrow({ className = "btn-arrow" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 34 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M1 8.4c6.5-.6 19.5-.5 31-.2" />
      <path d="M25.5 1.8c1.9 2.6 4.2 4.6 6.6 6.4-2.6 1.6-4.8 3.6-6.8 6" />
    </svg>
  )
}
