import Image from "next/image"
import Link from "next/link"

import RevealText from "@/components/reveal-text"
import StarburstSticker from "@/components/starburst-sticker"
import { services } from "@/lib/services-data"

export default function ServicesSection() {
  return (
    <section id="services" className="scroll-mt-24 bg-white text-ink">
      <div className="ink-divider" />

      <div className="flex flex-col gap-[clamp(32px,4.167vw,84px)] px-2.5 py-[clamp(36px,4.167vw,84px)] md:px-[1.5625vw]">
        <RevealText text="Our Offerings." className="type-h2 text-center" />

        <div className="relative">
          <StarburstSticker
            href="/#contact"
            label="Book an Event"
            className="-top-[30px] right-4 md:-top-[3.4vw] md:right-auto md:left-[21.1vw]"
          />

          <div className="no-scrollbar -mx-2.5 grid snap-x snap-mandatory auto-cols-[88%] grid-flow-col gap-3 overflow-x-auto scroll-px-2.5 px-2.5 md:mx-0 md:grid-flow-row md:grid-cols-4 md:gap-[1.5625vw] md:overflow-visible md:px-0">
            {services.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="group flex snap-start flex-col gap-[15px]"
              >
                <div className="media-frame aspect-[450/457.5] w-full">
                  <Image
                    src={service.image}
                    alt={service.alt}
                    fill
                    sizes="(min-width: 768px) 25vw, 88vw"
                    className="object-cover transition-transform duration-200 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="flex flex-col gap-[7.5px]">
                  <p className="type-mono text-[12px] uppercase md:text-[max(11px,.833vw)]">{service.badge}</p>
                  <h3 className="type-body-lg text-[17px] md:text-[max(15px,1.198vw)]">{service.title}</h3>
                  <p className="type-mono text-[13px] opacity-80 md:text-[max(11px,.833vw)]">{service.teaser}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
