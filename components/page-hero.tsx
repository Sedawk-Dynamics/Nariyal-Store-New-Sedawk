import Image from "next/image"
import Link from "next/link"

import BtnLabel from "@/components/btn-label"

type PageHeroProps = {
  eyebrow: string
  headingLead: string
  headingHighlight: string
  intro: string
  image?: string
  alt?: string
  primaryCta?: { label: string; href: string }
  secondaryCta?: { label: string; href: string }
}

/** Shared banner for the dedicated sub-pages (services, menu). */
export default function PageHero({
  eyebrow,
  headingLead,
  headingHighlight,
  intro,
  image,
  alt,
  primaryCta,
  secondaryCta,
}: PageHeroProps) {
  return (
    <section className="bg-cream pt-[clamp(48px,6vw,110px)] pb-[clamp(48px,6vw,110px)] text-ink">
      <div
        className={`grid items-center gap-10 px-5 md:px-[1.5625vw] ${
          image ? "lg:grid-cols-2 lg:gap-[1.5625vw]" : "text-center"
        }`}
      >
        <div className={image ? "lg:px-[3vw]" : "mx-auto max-w-5xl"}>
          <p className="type-mono uppercase">{eyebrow}</p>
          <h1 className="type-display mt-4 text-[clamp(2.75rem,7vw,7.5rem)] leading-[1.02] text-balance">
            {headingLead} <span className="text-plum">{headingHighlight}</span>
          </h1>
          <p className={`type-body-lg mt-6 text-pretty ${image ? "max-w-xl" : "mx-auto max-w-2xl"}`}>
            {intro}
          </p>

          {(primaryCta || secondaryCta) && (
            <div className={`mt-9 flex flex-wrap gap-3 ${image ? "" : "justify-center"}`}>
              {primaryCta && (
                <Link href={primaryCta.href} className="btn-vibe">
                  <BtnLabel>{primaryCta.label}</BtnLabel>
                </Link>
              )}
              {secondaryCta && (
                <Link href={secondaryCta.href} className="btn-vibe btn-vibe--outline">
                  <BtnLabel arrow={false}>{secondaryCta.label}</BtnLabel>
                </Link>
              )}
            </div>
          )}
        </div>

        {image && (
          <div className="media-frame aspect-[4/3] w-full">
            <Image
              src={image}
              alt={alt ?? ""}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        )}
      </div>
    </section>
  )
}
