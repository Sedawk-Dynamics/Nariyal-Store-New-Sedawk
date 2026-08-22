export type Category =
  | "All"
  | "Tender Coconut"
  | "Healthy Drinks"
  | "Coffee"
  | "Smoothies"
  | "Mocktails"

export type MenuItem = {
  name: string
  category: Exclude<Category, "All">
  description: string
  price: number
  badge: string
  badgeColor: string
  emoji: string
}

export const menuItems: MenuItem[] = [
  {
    name: "Classic Tender Coconut",
    category: "Tender Coconut",
    description: "Premium A-grade tender coconut served chilled, freshly opened before serving.",
    price: 119,
    badge: "Bestseller",
    badgeColor: "bg-accent text-foreground",
    emoji: "🥥",
  },
  {
    name: "Coconut Lemonade",
    category: "Healthy Drinks",
    description: "Refreshing blend of tender coconut water with fresh lemon and a hint of mint.",
    price: 149,
    badge: "Fresh",
    badgeColor: "bg-primary text-primary-foreground",
    emoji: "🍋",
  },
  {
    name: "Tender Coconut Mojito",
    category: "Mocktails",
    description: "A tropical twist on a classic — coconut water, fresh lime, mint, and soda.",
    price: 179,
    badge: "Popular",
    badgeColor: "bg-accent text-foreground",
    emoji: "🍹",
  },
  {
    name: "Coconut Fruit Punch",
    category: "Healthy Drinks",
    description: "A vibrant blend of coconut water with seasonal tropical fruits for a natural energy boost.",
    price: 169,
    badge: "Healthy",
    badgeColor: "bg-primary text-primary-foreground",
    emoji: "🍊",
  },
  {
    name: "Coconut Detox Drink",
    category: "Healthy Drinks",
    description: "Detoxifying blend of coconut water, cucumber, lemon, and fresh herbs.",
    price: 159,
    badge: "Detox",
    badgeColor: "bg-primary text-primary-foreground",
    emoji: "🌿",
  },
  {
    name: "Coconut Smoothie",
    category: "Smoothies",
    description: "Creamy coconut smoothie made with tender coconut flesh, coconut water, and fresh fruits.",
    price: 189,
    badge: "Creamy",
    badgeColor: "bg-accent text-foreground",
    emoji: "🥤",
  },
  {
    name: "Coconut Iced Coffee",
    category: "Coffee",
    description: "Bold espresso paired with chilled coconut water and a splash of coconut milk.",
    price: 179,
    badge: "New",
    badgeColor: "bg-accent text-foreground",
    emoji: "☕",
  },
  {
    name: "Coconut Cold Coffee Frappe",
    category: "Coffee",
    description: "Blended cold coffee frappe with coconut milk — a rich, tropical indulgence.",
    price: 199,
    badge: "Premium",
    badgeColor: "bg-primary text-primary-foreground",
    emoji: "🧋",
  },
  {
    name: "Blue Lagoon Coconut Mocktail",
    category: "Mocktails",
    description: "Stunning blue mocktail with coconut water, blue curacao syrup, lemon, and soda.",
    price: 179,
    badge: "Special",
    badgeColor: "bg-primary text-primary-foreground",
    emoji: "💙",
  },
  {
    name: "Coconut Shikanji",
    category: "Healthy Drinks",
    description: "Classic Indian shikanji elevated with coconut water, spices, and fresh lemon.",
    price: 139,
    badge: "Desi Twist",
    badgeColor: "bg-accent text-foreground",
    emoji: "🌶️",
  },
  {
    name: "Tulsi Ginger Elixir",
    category: "Healthy Drinks",
    description: "Warming immunity booster — coconut water infused with fresh tulsi and ginger.",
    price: 149,
    badge: "Immunity",
    badgeColor: "bg-primary text-primary-foreground",
    emoji: "🌱",
  },
  {
    name: "Coconut Chia Fresca",
    category: "Healthy Drinks",
    description: "Hydrating coconut water with chia seeds, lime, and a touch of honey.",
    price: 159,
    badge: "Superfood",
    badgeColor: "bg-accent text-foreground",
    emoji: "🫧",
  },
  {
    name: "Herbal Coconut Cooler",
    category: "Healthy Drinks",
    description: "Cooling blend of coconut water with fresh herbs, cucumber, and mint for ultimate refresh.",
    price: 149,
    badge: "Cooling",
    badgeColor: "bg-primary text-primary-foreground",
    emoji: "❄️",
  },
]

export const categories: Category[] = [
  "All",
  "Tender Coconut",
  "Healthy Drinks",
  "Coffee",
  "Smoothies",
  "Mocktails",
]

/** The first few items surfaced as a glimpse on the home page. */
export const featuredMenuItems = menuItems.slice(0, 4)
