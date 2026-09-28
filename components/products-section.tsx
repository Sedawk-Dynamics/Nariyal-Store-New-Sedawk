"use client"

import { useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Plus } from "lucide-react"

import BtnLabel from "@/components/btn-label"
import RevealText from "@/components/reveal-text"

type Product = {
  name: string
  descriptor: string
  price: string
  image: string
  alt: string
}

// Prices match lib/menu-data.ts.
const products: Product[] = [
  {
    name: "Coconut Smoothie",
    descriptor: "Coconut Flesh × Fresh Fruit",
    price: "₹189",
    image: "/images/products/coconut-smoothie.jpg",
    alt: "Creamy coconut smoothie in a Nariyal Store glass with mint and a coconut chunk",
  },
  {
    name: "Coconut Detox Drink",
    descriptor: "Cucumber × Lemon × Herbs",
    price: "₹159",
    image: "/images/products/coconut-detox-drink.jpg",
    alt: "Coconut detox drink flecked with green herbs in a Nariyal Store glass",
  },
  {
    name: "Coconut Lemonade",
    descriptor: "Fresh Lemon × Mint",
    price: "₹149",
    image: "/images/products/coconut-lemonade.jpg",
    alt: "Iced coconut lemonade with mint and a striped straw in a Nariyal Store glass",
  },
  {
    name: "Coconut Shikanji",
    descriptor: "Lemon × Indian Spices",
    price: "₹139",
    image: "/images/products/coconut-shikanji.jpg",
    alt: "Chilled coconut shikanji over ice in a Nariyal Store glass",
  },
]

function ProductCard({ product }: { product: Product }) {
  return (
    <article
      className="group relative -mr-[1.5px] flex snap-start flex-col gap-[15px] border-[1.5px] border-ink bg-white pb-[clamp(16px,1.5625vw,34px)]"
    >
      <Link href="/menu" className="absolute inset-0 z-[1]" aria-label={product.name} />
      <div className="relative aspect-[359/430] w-full overflow-hidden">
        <Image
          src={product.image}
          alt={product.alt}
          fill
          sizes="(min-width: 768px) 25vw, 50vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.06]"
        />
        <span
          aria-hidden="true"
          className="absolute right-5 bottom-5 z-[2] inline-flex h-[34px] w-[34px] items-center justify-center rounded-full border-[1.5px] border-ink bg-white text-ink transition-opacity duration-200 md:opacity-0 md:group-hover:opacity-100"
        >
          <Plus size={14} />
        </span>
      </div>
      <div className="flex flex-col gap-[15px] px-[clamp(14px,1.5625vw,34px)]">
        <div className="flex items-center justify-between gap-[15px]">
          <h3 className="type-body-lg">{product.name}</h3>
          <p className="type-mono shrink-0">{product.price}</p>
        </div>
        <p className="type-mono text-[13px] md:text-[max(11px,.833vw)]">{product.descriptor}</p>
      </div>
    </article>
  )
}

export default function ProductsSection() {
  const rowRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)

  const handleScroll = () => {
    const row = rowRef.current
    if (!row) return
    const card = row.firstElementChild as HTMLElement | null
    if (!card) return
    setActive(Math.round(row.scrollLeft / card.offsetWidth))
  }

  const scrollTo = (index: number) => {
    const row = rowRef.current
    const card = row?.children[index] as HTMLElement | undefined
    if (row && card) row.scrollTo({ left: card.offsetLeft, behavior: "smooth" })
  }

  return (
    <section id="menu" className="section-pad-top scroll-mt-24 overflow-hidden bg-cream">
      <RevealText
        mode="scroll"
        text="Every drink takes something. This one gives it back."
        className="type-h2 mx-auto max-w-[73.6vw] px-2.5 text-center text-balance"
      />

      <div
        ref={rowRef}
        onScroll={handleScroll}
        className="no-scrollbar mt-10 grid snap-x snap-mandatory auto-cols-[50%] grid-flow-col overflow-x-auto md:mt-[4.17vw] md:grid-flow-row md:grid-cols-4 md:overflow-visible"
      >
        {products.map((product) => (
          <ProductCard key={product.name} product={product} />
        ))}
      </div>

      <div className="mt-7 flex justify-center gap-2.5 md:hidden">
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

      <div className="mt-9 flex justify-center md:mt-[4.17vw]">
        <Link href="/menu" className="btn-vibe">
          <BtnLabel>See All</BtnLabel>
        </Link>
      </div>
    </section>
  )
}
