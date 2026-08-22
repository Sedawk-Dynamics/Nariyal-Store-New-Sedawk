import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { services } from "@/lib/services-data"

export default function ServicesSection() {
  return (
    <section id="services" className="scroll-mt-24 bg-background py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            <span className="h-px w-6 bg-accent" aria-hidden="true" />
            What We Do
            <span className="h-px w-6 bg-accent" aria-hidden="true" />
          </span>
          <h2 className="mt-4 text-balance font-serif text-4xl font-bold leading-tight text-foreground sm:text-5xl">
            Services <span className="text-primary">We Offer</span>
          </h2>
          <p className="mt-4 text-pretty text-base leading-relaxed text-muted-foreground">
            From weddings to doorstep delivery, every Nariyal experience is crafted around pure, fresh hydration.
          </p>
        </div>

        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <article
              key={service.slug}
              className="group flex flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-sm transition-shadow duration-300 hover:shadow-lg"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.alt}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute left-4 top-4 rounded-full bg-primary px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary-foreground">
                  {service.badge}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="text-xl font-bold text-foreground">{service.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {service.teaser}
                </p>
                <Link
                  href={`/services/${service.slug}`}
                  className="mt-6 inline-flex items-center justify-center gap-2 rounded-2xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition-colors duration-300 hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                >
                  {service.ctaLabel}
                  <ArrowRight
                    size={15}
                    aria-hidden="true"
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
