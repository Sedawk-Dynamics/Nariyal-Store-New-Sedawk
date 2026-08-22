import {
  BadgeCheck,
  Bike,
  Briefcase,
  Building2,
  CalendarHeart,
  Clock4,
  CupSoda,
  Gift,
  GraduationCap,
  Heart,
  MapPin,
  Music,
  PackageCheck,
  Palette,
  PartyPopper,
  QrCode,
  ShoppingBag,
  Snowflake,
  Sparkles,
  Store,
  Truck,
  Users,
  Wallet,
  type LucideIcon,
} from "lucide-react"

/**
 * Icon components cannot be passed from a Server Component into a Client
 * Component, so data modules store an icon *name* and the client resolves it
 * through this map.
 */
export const iconMap = {
  BadgeCheck,
  Bike,
  Briefcase,
  Building2,
  CalendarHeart,
  Clock4,
  CupSoda,
  Gift,
  GraduationCap,
  Heart,
  MapPin,
  Music,
  PackageCheck,
  Palette,
  PartyPopper,
  QrCode,
  ShoppingBag,
  Snowflake,
  Sparkles,
  Store,
  Truck,
  Users,
  Wallet,
} satisfies Record<string, LucideIcon>

export type IconName = keyof typeof iconMap
