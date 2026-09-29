"use client"

import { useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"

import BtnLabel from "@/components/btn-label"
import RevealText from "@/components/reveal-text"
import StarburstSticker from "@/components/starburst-sticker"

type Product = {
  name: string
  /** Small uppercase label above the name. */
  tag: string
  descriptor: string
  price: string
  image: string
  alt: string
}

// Prices and categories match lib/menu-data.ts.
const products: Product[] = [
  {
    name: "Coconut Smoothie",
    tag: "Smoothies",
    descriptor: "Coconut Flesh × Fresh Fruit",
    price: "₹189",
    image: "/images/products/coconut-smoothie-sky.webp",
    alt: "Creamy coconut smoothie in a Nariyal Store glass with mint and a coconut chunk",
  },
  {
    name: "Coconut Detox Drink",
    tag: "Healthy Drinks",
    descriptor: "Cucumber × Lemon × Herbs",
    price: "₹159",
    image: "/images/products/coconut-detox-drink-sky.webp",
    alt: "Coconut detox drink flecked with green herbs in a Nariyal Store glass",
  },
  {
    name: "Coconut Lemonade",
    tag: "Healthy Drinks",
    descriptor: "Fresh Lemon × Mint",
    price: "₹149",
    image: "/images/products/coconut-lemonade-sky.webp",
    alt: "Iced coconut lemonade with mint and a striped straw in a Nariyal Store glass",
  },
  {
    name: "Coconut Shikanji",
    tag: "Healthy Drinks",
    descriptor: "Lemon × Indian Spices",
    price: "₹139",
    image: "/images/products/coconut-shikanji-sky.webp",
    alt: "Chilled coconut shikanji over ice in a Nariyal Store glass",
  },
]

function ProductCard({ product }: { product: Product }) {
  return (
    <Link href="/menu" className="group flex snap-start flex-col gap-[15px]">
      <div className="media-frame aspect-[450/457.5] w-full">
        <Image
          src={product.image}
          alt={product.alt}
          fill
          sizes="(min-width: 768px) 25vw, 88vw"
          className="object-cover transition-transform duration-200 group-hover:scale-[1.03]"
        />
      </div>
      <div className="flex flex-col gap-[7.5px]">
        <div className="flex items-baseline justify-between gap-3">
          <p className="type-mono text-[12px] uppercase md:text-[max(11px,.833vw)]">{product.tag}</p>
          <p className="type-mono shrink-0 text-[12px] md:text-[max(11px,.833vw)]">{product.price}</p>
        </div>
        <h3 className="type-body-lg text-[17px] md:text-[max(15px,1.198vw)]">{product.name}</h3>
        <p className="type-mono text-[13px] opacity-80 md:text-[max(11px,.833vw)]">{product.descriptor}</p>
      </div>
    </Link>
  )
}

export default function ProductsSection() {
  const rowRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)

  // Card width plus gap, measured from the rendered cards.
  const step = () => {
    const cards = rowRef.current?.children
    if (!cards || cards.length < 2) return 1
    return (cards[1] as HTMLElement).offsetLeft - (cards[0] as HTMLElement).offsetLeft
  }

  const handleScroll = () => {
    const row = rowRef.current
    if (row) setActive(Math.round(row.scrollLeft / step()))
  }

  const scrollTo = (index: number) => {
    rowRef.current?.scrollTo({ left: index * step(), behavior: "smooth" })
  }

  return (
    <section id="menu" className="scroll-mt-24 overflow-hidden bg-white text-ink">
      <div className="flex flex-col gap-[clamp(32px,4.167vw,84px)] px-2.5 pt-[var(--section-pad)] pb-[clamp(36px,4.167vw,84px)] md:px-[1.5625vw]">
        <RevealText
          mode="scroll"
          text="Every drink takes something. This one gives it back."
          className="type-h2 mx-auto max-w-[73.6vw] text-center text-balance"
        />

        <div className="relative">
          <StarburstSticker
            href="/menu"
            label="Served Chilled"
            className="-top-[30px] right-4 md:-top-[3.4vw] md:right-auto md:left-[21.1vw]"
          />

          <div
            ref={rowRef}
            onScroll={handleScroll}
            className="no-scrollbar -mx-2.5 grid snap-x snap-mandatory auto-cols-[88%] grid-flow-col gap-3 overflow-x-auto scroll-px-2.5 px-2.5 md:mx-0 md:grid-flow-row md:grid-cols-4 md:gap-[1.5625vw] md:overflow-visible md:px-0"
          >
            {products.map((product) => (
              <ProductCard key={product.name} product={product} />
            ))}
          </div>
        </div>

        <div className="-mt-[clamp(8px,2vw,40px)] flex justify-center gap-2.5 md:hidden">
          {products.map((product, i) => (
            <button
              key={product.name}
              type="button"
              onClick={() => scrollTo(i)}
              aria-label={`Show ${product.name}`}
              aria-current={active === i}
              className="vibe-dot"
            />
          ))}
        </div>

        <div className="flex justify-center">
          <Link href="/menu" className="btn-vibe">
            <BtnLabel>See All</BtnLabel>
          </Link>
        </div>
      </div>
      <div className="ink-divider" />
    </section>
  )
}
