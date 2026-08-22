import Image from "next/image"
import Link from "next/link"

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
    <section className="relative overflow-hidden bg-secondary/25 pt-28 pb-16 sm:pt-36 sm:pb-24">
      <div
        aria-hidden="true"
        className="absolute -left-24 top-10 -z-10 h-72 w-72 rounded-full bg-primary/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="absolute -right-24 bottom-0 -z-10 h-72 w-72 rounded-full bg-accent/15 blur-3xl"
      />

      <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 lg:grid-cols-2">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-accent">{eyebrow}</p>
          <h1 className="mt-4 text-balance font-serif text-4xl font-bold leading-tight text-foreground sm:text-5xl lg:text-6xl">
            {headingLead} <span className="text-primary">{headingHighlight}</span>
          </h1>
          <p className="mt-6 text-pretty text-lg leading-relaxed text-muted-foreground">{intro}</p>

          {(primaryCta || secondaryCta) && (
            <div className="mt-9 flex flex-wrap gap-3">
              {primaryCta && (
                <Link
                  href={primaryCta.href}
                  className="rounded-2xl bg-primary px-7 py-3.5 text-sm font-bold text-primary-foreground shadow-lg transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                >
                  {primaryCta.label}
                </Link>
              )}
              {secondaryCta && (
                <Link
                  href={secondaryCta.href}
                  className="rounded-2xl border-2 border-primary px-7 py-3.5 text-sm font-bold text-primary transition-colors hover:bg-primary hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                >
                  {secondaryCta.label}
                </Link>
              )}
            </div>
          )}
        </div>

        {image && (
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[2.5rem] border border-border/60 shadow-2xl shadow-primary/10">
            <Image
              src={image}
              alt={alt ?? ""}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-foreground/25 via-transparent to-transparent"
            />
          </div>
        )}
      </div>
    </section>
  )
}
