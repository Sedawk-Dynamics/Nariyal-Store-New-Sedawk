import type { IconName } from "@/lib/icon-map"

export type ServiceSlug =
  | "celebrations"
  | "corporate-events"
  | "nariyal-store"
  | "doorstep"

export type ServiceHighlight = {
  icon: IconName
  title: string
  description: string
}

export type Service = {
  slug: ServiceSlug
  /** Pill shown over the card image on the home page. */
  badge: string
  /** Card + page heading. */
  title: string
  /** Short label used in the header dropdown. */
  navLabel: string
  /** One-line glimpse shown on the home page card. */
  teaser: string
  /** Call to action on the home page card. */
  ctaLabel: string
  image: string
  alt: string
  /** Dedicated page content. */
  eyebrow: string
  headingLead: string
  headingHighlight: string
  intro: string
  body: string[]
  highlights: ServiceHighlight[]
  eventsHeading: string
  eventsSubheading: string
  showBranding: boolean
  primaryCta: { label: string; href: string }
  secondaryCta: { label: string; href: string }
}

export const services: Service[] = [
  {
    slug: "celebrations",
    badge: "Celebrations",
    title: "Celebrations",
    navLabel: "Celebrations",
    teaser: "Customized coconuts for your special moments.",
    ctaLabel: "Plan a Celebration",
    image: "/images/services/celebrations-corporate-events.png",
    alt: "A bride holding a decorated tray of tender coconuts wrapped in cloth with rose and marigold garlands at a wedding celebration",
    eyebrow: "Special Event Services",
    headingLead: "Make Every Occasion",
    headingHighlight: "Memorable",
    intro:
      "From intimate birthdays to grand baraat swagat, we turn tender coconuts into a welcome your guests remember.",
    body: [
      "Nariyal Store brings a full celebration setup to your venue — chilled A-grade tender coconuts, a live serving counter, uniformed staff, and personalized branding on every shell.",
      "Couple names, wedding dates, birthday wishes, festival greetings — we print it fresh so each guest walks away with something made for the moment.",
    ],
    highlights: [
      {
        icon: "CalendarHeart",
        title: "Personalized Branding",
        description:
          "Couple names, wedding dates, birthday messages, and festive themes printed on every coconut.",
      },
      {
        icon: "Users",
        title: "Live Serving Counter",
        description:
          "Trained staff open and serve each coconut fresh in front of your guests, start to finish.",
      },
      {
        icon: "Snowflake",
        title: "Served Chilled",
        description:
          "Cold chain from farm to venue so every coconut is served at the perfect temperature.",
      },
      {
        icon: "Sparkles",
        title: "Themed Decor Setup",
        description:
          "Counter styling that blends into your mandap, lawn, banquet, or terrace decor.",
      },
    ],
    eventsHeading: "Celebrations We Serve",
    eventsSubheading:
      "Every kind of occasion, hosted with premium coconut experiences and personalized branding.",
    showBranding: true,
    primaryCta: { label: "Book Your Event", href: "/#contact" },
    secondaryCta: { label: "View Our Menu", href: "/menu" },
  },
  {
    slug: "corporate-events",
    badge: "Corporate Events",
    title: "Corporate Events",
    navLabel: "Corporate Events",
    teaser: "Branded coconut gifting for conferences and business milestones.",
    ctaLabel: "Request a Proposal",
    image: "/images/services/corporate-events.png",
    alt: "A branded tray of engraved tender coconuts presented at a corporate event welcome desk",
    eyebrow: "For Brands & Businesses",
    headingLead: "Your Logo on",
    headingHighlight: "Every Coconut",
    intro:
      "A healthier alternative to the usual corporate hamper — and a far more photographed one.",
    body: [
      "We set up branded coconut counters at product launches, conferences, offsites, and experiential marketing activations across Delhi NCR.",
      "Each coconut carries your logo, campaign artwork, or a scannable QR code — turning a refreshment into a measurable brand touchpoint.",
    ],
    highlights: [
      {
        icon: "Palette",
        title: "Full Logo Branding",
        description:
          "Company logos, campaign artwork, and event identities printed directly onto each shell.",
      },
      {
        icon: "QrCode",
        title: "QR Code Activation",
        description:
          "Scannable codes on every coconut to drive sign-ups, offers, or campaign landing pages.",
      },
      {
        icon: "Gift",
        title: "Corporate Gifting",
        description:
          "Curated coconut gift boxes for clients, partners, and employee milestones.",
      },
      {
        icon: "BadgeCheck",
        title: "Hygiene Certified",
        description:
          "Hygienically cleaned, freshly opened on site, and handled to strict quality standards.",
      },
    ],
    eventsHeading: "Where We Set Up",
    eventsSubheading:
      "Kiosks, counters, and activations built around your brand and your venue.",
    showBranding: true,
    primaryCta: { label: "Request a Proposal", href: "/#contact" },
    secondaryCta: { label: "View Our Menu", href: "/menu" },
  },
  {
    slug: "nariyal-store",
    badge: "Store",
    title: "Sip Fresh. Feel Fresh.",
    navLabel: "Nariyal Physical Store",
    teaser: "Visit our Nariyal Store outlets.",
    ctaLabel: "Visit Our Store",
    image: "/images/services/store-sip-fresh.png",
    alt: "Freshly trimmed tender coconut with a straw in front of a Nariyal Store kiosk",
    eyebrow: "Our Outlets",
    headingLead: "Sip Fresh.",
    headingHighlight: "Feel Fresh.",
    intro:
      "Walk into our flagship outlet at Epicuria Food Court, Nehru Place, and drink it straight from the shell.",
    body: [
      "Our outlet serves premium A-grade tender coconuts alongside a full menu of coconut-based lemonades, mojitos, smoothies, and cold coffees — all made fresh to order.",
      "Nothing sits pre-mixed. Every coconut is opened in front of you, and every drink is blended the moment you order it.",
    ],
    highlights: [
      {
        icon: "MapPin",
        title: "Epicuria, Nehru Place",
        description:
          "Find us at Epicuria Food Court, right above Nehru Place Metro Station, New Delhi.",
      },
      {
        icon: "CupSoda",
        title: "12+ Fresh Beverages",
        description:
          "Lemonades, mojitos, smoothies, cold coffees, and detox drinks — all coconut-based.",
      },
      {
        icon: "Wallet",
        title: "Starting at ₹119",
        description:
          "Premium tender coconuts served chilled and freshly opened, at everyday prices.",
      },
      {
        icon: "Store",
        title: "Kiosk Partnerships",
        description:
          "We set up Nariyal Store kiosks inside hotels, malls, and food courts on request.",
      },
    ],
    eventsHeading: "Coming to a Venue Near You",
    eventsSubheading: "Our kiosks travel to hotels, malls, and food courts across the city.",
    showBranding: false,
    primaryCta: { label: "Get Directions", href: "/#contact" },
    secondaryCta: { label: "View Full Menu", href: "/menu" },
  },
  {
    slug: "doorstep",
    badge: "Retail",
    title: "Nariyal at Your Doorstep",
    navLabel: "Nariyal at Your Doorstep",
    teaser: "Available at selected retail stores.",
    ctaLabel: "Order for Delivery",
    image: "/images/services/retail-doorstep.png",
    alt: "Green tote bag filled with tender coconuts delivered to a doorstep",
    eyebrow: "Retail & Delivery",
    headingLead: "Fresh Coconuts,",
    headingHighlight: "Delivered Home",
    intro:
      "Farm-picked tender coconuts delivered to your door — or picked up from a retail partner near you.",
    body: [
      "Order a single coconut or a family box. We hand-select every coconut for sweetness and water content, then deliver it chilled and ready to open.",
      "Nariyal Store is also stocked at selected retail partners across Delhi NCR, so fresh hydration is never more than a short walk away.",
    ],
    highlights: [
      {
        icon: "Truck",
        title: "Doorstep Delivery",
        description:
          "Chilled coconuts delivered to homes, offices, and gyms across Delhi NCR.",
      },
      {
        icon: "PackageCheck",
        title: "Family Boxes",
        description:
          "Bulk packs for households, offices, and events — hand-picked and quality checked.",
      },
      {
        icon: "Clock4",
        title: "Same-Day Dispatch",
        description:
          "Orders placed before the daily cut-off leave our cold room the very same day.",
      },
      {
        icon: "Bike",
        title: "Retail Partners",
        description:
          "Also available at selected retail stores and grocers across the city.",
      },
    ],
    eventsHeading: "Also Great For",
    eventsSubheading: "Small gatherings that deserve something fresher than a bottled drink.",
    showBranding: false,
    primaryCta: { label: "Order Now", href: "/#contact" },
    secondaryCta: { label: "View Our Menu", href: "/menu" },
  },
]

export function getService(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug)
}

export const serviceNavLinks = services.map((service) => ({
  href: `/services/${service.slug}`,
  label: service.navLabel,
}))
