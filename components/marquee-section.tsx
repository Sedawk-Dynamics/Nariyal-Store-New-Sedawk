"use client"

const items = [
  "100% NATURAL",
  "NO ADDED SUGAR",
  "ELECTROLYTE RICH",
  "FARM FRESH",
  "PURE HYDRATION",
  "DELIVERED FRESH",
  "NATURALLY SWEET",
  "TENDER COCONUT",
  "ZERO PRESERVATIVES",
  "POTASSIUM RICH",
]

export default function MarqueeSection() {
  return (
    <section className="bg-primary py-4 overflow-hidden">
      <div className="flex items-center">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...items, ...items].map((item, i) => (
            <div key={i} className="flex items-center shrink-0 px-6">
              <span className="text-primary-foreground font-bold text-sm tracking-[0.15em]">{item}</span>
              <span className="ml-6 text-accent font-bold text-lg">✦</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
