import type { IconName } from "@/lib/icon-map"

import type { ServiceSlug } from "@/lib/services-data"

export type EventItem = {
  icon: IconName
  title: string
  description: string
  image: string
  alt: string
  /** Which dedicated service pages this event belongs to. */
  services: ServiceSlug[]
}

export const events: EventItem[] = [
  {
    icon: "PartyPopper",
    title: "Birthday Parties",
    description:
      "Make celebrations unforgettable with customized birthday message coconuts for every guest.",
    image: "/images/events/birthday-parties.png",
    alt: "Friends celebrating a birthday outdoors with fresh coconut drinks and string lights",
    services: ["celebrations"],
  },
  {
    icon: "Briefcase",
    title: "Corporate Events",
    description:
      "Brand your coconuts with your company logo for product launches, office events, and team gatherings.",
    image: "/images/events/corporate-events.png",
    alt: "Professionals networking at a corporate event with a branded coconut beverage station",
    services: ["corporate-events"],
  },
  {
    icon: "Heart",
    title: "Weddings & Celebrations",
    description:
      "Personalized coconuts with couple names, wedding dates, and beautiful bridal themes.",
    image: "/images/events/weddings-celebrations.png",
    alt: "Elegant wedding celebration with a decorated tray of tender coconuts",
    services: ["celebrations"],
  },
  {
    icon: "Music",
    title: "Music Festivals & Concerts",
    description:
      "Live coconut stall setups with custom branding for large-scale music and cultural festivals.",
    image: "/images/events/music-festivals.png",
    alt: "Outdoor music festival crowd at sunset with fresh coconut drinks being served",
    services: ["celebrations", "corporate-events"],
  },
  {
    icon: "GraduationCap",
    title: "College Events",
    description:
      "Fun, healthy, and Instagrammable coconut experiences for college fests and farewell parties.",
    image: "/images/events/college-events.png",
    alt: "College students enjoying fresh coconut drinks at a vibrant campus fest",
    services: ["celebrations"],
  },
  {
    icon: "Building2",
    title: "Hotel & Mall Collaborations",
    description: "Set up premium Nariyal Store kiosks inside hotels, malls, and food courts.",
    image: "/images/events/hotel-mall-collaborations.png",
    alt: "Luxury hotel kiosk serving fresh tender coconuts on a marble counter",
    services: ["corporate-events", "nariyal-store"],
  },
  {
    icon: "ShoppingBag",
    title: "Brand Promotions",
    description:
      "QR code printing and custom sticker coconuts for powerful experiential brand marketing.",
    image: "/images/events/brand-promotions.png",
    alt: "Experiential marketing booth with a branded coconut drink station",
    services: ["corporate-events"],
  },
  {
    icon: "Sparkles",
    title: "Private Celebrations",
    description:
      "Anniversary dinners, housewarmings, Diwali gifting — personalized for every private occasion.",
    image: "/images/events/private-celebrations.png",
    alt: "Intimate garden celebration with friends enjoying premium coconut drinks under string lights",
    services: ["celebrations", "doorstep"],
  },
]

export function eventsForService(slug: ServiceSlug): EventItem[] {
  return events.filter((event) => event.services.includes(slug))
}

export const brandingOptions = [
  { label: "Company Logo Branding", icon: "🏢" },
  { label: "Wedding Couple Names", icon: "💍" },
  { label: "Birthday Messages", icon: "🎂" },
  { label: "Festival Greetings", icon: "🪔" },
  { label: "QR Code Printing", icon: "📱" },
  { label: "Customized Stickers", icon: "🎨" },
]
