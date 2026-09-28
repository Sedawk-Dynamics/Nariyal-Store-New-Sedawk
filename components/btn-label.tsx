import type { ReactNode } from "react"

import VibeArrow from "@/components/vibe-arrow"

/**
 * Button content for `.btn-vibe`. The label is rendered twice so that on hover
 * it can run like a ticker inside the pill (see `.btn-track` in globals.css).
 */
export default function BtnLabel({ children, arrow = true }: { children: ReactNode; arrow?: boolean }) {
  const copy = (
    <>
      {children}
      {arrow && <VibeArrow />}
    </>
  )

  return (
    <span className="btn-window">
      <span className="btn-track">
        <span className="btn-copy">{copy}</span>
        <span className="btn-copy" aria-hidden="true">
          {copy}
        </span>
      </span>
    </span>
  )
}
