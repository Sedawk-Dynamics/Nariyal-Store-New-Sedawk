"use client"

const items = [
  "PREMIUM TENDER COCONUT",
  "SERVED CHILLED",
  "FRESHLY OPENED",
  "HYGIENICALLY CLEANED",
  "READY TO DRINK",
  "PERSONALIZED BRANDING",
  "EVENT SERVICES",
  "OUTLET AT NEHRU PLACE",
  "COCONUT BEVERAGES",
  "HEALTHY MOCKTAILS",
  "COCONUT SMOOTHIES",
  "ZERO PRESERVATIVES",
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
