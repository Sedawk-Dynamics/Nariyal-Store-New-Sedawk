import CoconutGlyph from "@/components/coconut-glyph"
import Marquee from "@/components/marquee"

export default function MarqueeSection({ text = "Farm Picked, Not Factory Made" }: { text?: string }) {
  return (
    <section aria-label={text} className="border-y-[1.5px] border-ink bg-cream py-[clamp(20px,2.5vw,36px)] text-ink">
      <Marquee gap="clamp(28px,4.2vw,60px)" speed={40} repeat={4}>
        <span className="inline-flex items-center gap-[clamp(28px,4.2vw,60px)] text-[13px] leading-tight md:text-[max(13px,.95vw)]">
          {text}
          <CoconutGlyph className="h-[max(26px,2.57vw)] w-[max(26px,2.57vw)] text-ink" />
        </span>
      </Marquee>
    </section>
  )
}
