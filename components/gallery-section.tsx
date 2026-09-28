import Image from "next/image"

import Marquee from "@/components/marquee"
import RevealText from "@/components/reveal-text"
import { SocialCircles } from "@/components/social-icons"

const images = [
  { src: "/images/gallery-1.png", alt: "Person enjoying fresh coconut water after a workout" },
  { src: "/images/gallery-2.png", alt: "Fresh green coconuts with tropical leaves" },
  { src: "/images/gallery-3.png", alt: "Friends enjoying coconut water at the beach" },
  { src: "/images/gallery-4.png", alt: "Coconut water pouring into a glass" },
  { src: "/images/gallery-5.png", alt: "Woman in a yoga pose with coconut water" },
  { src: "/images/gallery-6.png", alt: "Coconut vendor on an Indian street" },
  { src: "/images/nariyal-outlet.png", alt: "Nariyal Store outlet counter stacked with tender coconuts" },
]

export default function GallerySection() {
  return (
    <section id="gallery" className="section-pad-top scroll-mt-24 overflow-hidden bg-cream text-ink">
      <div className="flex flex-col gap-[clamp(28px,4.167vw,84px)]">
        <div className="flex flex-col gap-[18px] px-5 md:flex-row md:items-start md:gap-[2.5vw] md:px-[1.5625vw]">
          <RevealText text="Seen in the wild." className="type-h3 md:w-[46vw] md:flex-none" />
          <p className="type-mono text-[13px] md:max-w-[31.8vw] md:text-[max(12px,1vw)]">
            Tag @nariyalstore and you&apos;ll probably end up here. We repost the good ones, and our
            definition of good is generous. Coconut-water moustaches welcome.
          </p>
        </div>

        <Marquee gap="clamp(12px,1.5625vw,24px)" speed={50} trackClassName="items-start">
          {images.map((image, i) => (
            <div
              key={image.src}
              className={`media-frame w-[44vw] flex-none self-start bg-cream md:w-[21.56vw] ${
                i % 2 === 1 ? "aspect-[310.5/450]" : "aspect-square"
              }`}
            >
              <Image src={image.src} alt={image.alt} fill sizes="(min-width: 768px) 22vw, 44vw" className="object-cover" />
            </div>
          ))}
        </Marquee>

        <SocialCircles className="justify-center" />
      </div>
    </section>
  )
}
