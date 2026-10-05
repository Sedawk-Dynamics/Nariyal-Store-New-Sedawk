import { Eye, Leaf, Sprout } from "lucide-react"

const principles = [
  {
    title: "Vision",
    icon: Eye,
    description:
      "To make nature's refreshment an everyday choice, bringing people closer to fresh, simple food and drinks wherever life takes them.",
  },
  {
    title: "Mission",
    icon: Sprout,
    description:
      "To serve fresh coconuts, thoughtfully crafted drinks, and satisfying bites with warm hospitality, from a quick store visit to life's shared celebrations.",
  },
  {
    title: "Values",
    icon: Leaf,
    description:
      "Freshness in every serving. Honesty in every interaction. Care for our customers, our community, and nature. These are the values we aim to bring to every choice.",
  },
]

export default function PurposeSection() {
  return (
    <section aria-labelledby="purpose-heading" className="section-pad-bottom bg-cream text-ink">
      <div className="gutter">
        <div className="rounded-[var(--media-radius)] bg-leaf-deep px-6 py-12 text-cream md:px-12 md:py-16">
          <div className="max-w-2xl">
            <p className="type-mono text-sm uppercase">What we stand for</p>
            <h2 id="purpose-heading" className="type-display mt-4 text-[clamp(2.25rem,4.5vw,5rem)] leading-[1.1]">
              Rooted in nature.<br />Made for people.
            </h2>
          </div>
          <div className="mt-10 grid gap-8 md:mt-14 md:grid-cols-3 md:gap-10">
            {principles.map(({ title, icon: Icon, description }) => (
              <article key={title} className="border-t border-cream/30 pt-6">
                <Icon aria-hidden="true" className="mb-6 size-8 text-lemon" strokeWidth={1.5} />
                <h3 className="type-display text-3xl">{title}</h3>
                <p className="mt-4 max-w-md text-base leading-relaxed text-cream/90 md:text-lg">{description}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
