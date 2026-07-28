"use client"

import { useState } from "react"
import Image from "next/image"
import { motion, type Variants } from "framer-motion"
import { ShoppingCart, Star, Eye } from "lucide-react"

const products = [
  {
    id: 1,
    name: "Classic Tender Coconut Water",
    description: "Farm-fresh tender coconut water, naturally sweet and packed with electrolytes.",
    price: 49,
    mrp: 65,
    size: "1 Coconut (~350ml)",
    rating: 4.8,
    reviews: 1240,
    image: "/images/product-classic.png",
    badge: "Bestseller",
    badgeColor: "bg-accent text-foreground",
  },
  {
    id: 2,
    name: "Chilled Coconut Water Pack",
    description: "A pack of 6 pre-chilled tender coconuts, perfect for the whole family.",
    price: 279,
    mrp: 360,
    size: "6 Coconuts",
    rating: 4.9,
    reviews: 863,
    image: "/images/product-pack.png",
    badge: "Save 22%",
    badgeColor: "bg-primary text-primary-foreground",
  },
  {
    id: 3,
    name: "Family Hydration Box",
    description: "Eco-friendly box with 12 premium tender coconuts for the whole week.",
    price: 520,
    mrp: 700,
    size: "12 Coconuts",
    rating: 4.7,
    reviews: 521,
    image: "/images/product-family-box.png",
    badge: "Family Pack",
    badgeColor: "bg-secondary text-foreground",
  },
  {
    id: 4,
    name: "Weekly Coconut Subscription",
    description: "Never run dry. Get 8 fresh coconuts delivered every week at your doorstep.",
    price: 399,
    mrp: 520,
    size: "8 Coconuts/Week",
    rating: 5.0,
    reviews: 389,
    image: "/images/product-subscription.png",
    badge: "Most Popular",
    badgeColor: "bg-accent text-foreground",
  },
]

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

export default function ProductsSection() {
  const [hovered, setHovered] = useState<number | null>(null)

  return (
    <section id="shop" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-semibold text-accent uppercase tracking-widest mb-3">Our Products</p>
          <h2 className="text-4xl sm:text-5xl font-serif font-bold text-foreground text-balance mb-4">
            Freshness You Can <span className="text-primary">Taste</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Every coconut is hand-picked from certified farms and delivered fresh to your doorstep within 24 hours.
          </p>
        </motion.div>

        {/* Product Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {products.map((product) => (
            <motion.div
              key={product.id}
              variants={cardVariants}
              onMouseEnter={() => setHovered(product.id)}
              onMouseLeave={() => setHovered(null)}
              className="group bg-card rounded-3xl overflow-hidden border border-border hover:border-primary/30 hover:shadow-2xl transition-all duration-400 cursor-pointer"
              style={{
                transform: hovered === product.id ? "translateY(-6px)" : "translateY(0)",
                transition: "transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease",
              }}
            >
              {/* Image Container */}
              <div className="relative aspect-square bg-secondary overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-108"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                {/* Badge */}
                <span className={`absolute top-3 left-3 text-xs font-bold px-3 py-1 rounded-full ${product.badgeColor}`}>
                  {product.badge}
                </span>
                {/* Quick View Overlay */}
                <div className="absolute inset-0 bg-foreground/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <button
                    aria-label="Quick view"
                    className="bg-white text-foreground font-semibold text-xs px-4 py-2 rounded-full flex items-center gap-1.5 shadow-lg hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    <Eye size={14} />
                    Quick View
                  </button>
                </div>
              </div>

              {/* Info */}
              <div className="p-5">
                <div className="flex items-center gap-1 mb-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={12}
                      className={i < Math.floor(product.rating) ? "text-accent fill-accent" : "text-muted-foreground"}
                    />
                  ))}
                  <span className="text-xs text-muted-foreground ml-1">({product.reviews.toLocaleString()})</span>
                </div>
                <h3 className="font-bold text-foreground text-sm leading-tight mb-1">{product.name}</h3>
                <p className="text-xs text-muted-foreground mb-3 leading-relaxed">{product.description}</p>
                <p className="text-xs font-medium text-muted-foreground mb-3">{product.size}</p>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xl font-bold text-primary">₹{product.price}</span>
                    <span className="text-xs text-muted-foreground line-through ml-2">₹{product.mrp}</span>
                  </div>
                  <button
                    aria-label={`Add ${product.name} to cart`}
                    className="flex items-center gap-1.5 bg-primary text-primary-foreground text-xs font-semibold px-3 py-2 rounded-xl hover:bg-primary/90 transition-colors shadow-sm"
                  >
                    <ShoppingCart size={13} />
                    Add
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-12"
        >
          <a
            href="#shop"
            className="inline-flex items-center gap-2 border-2 border-primary text-primary font-semibold px-8 py-3.5 rounded-2xl hover:bg-primary hover:text-primary-foreground transition-all duration-300"
          >
            View All Products
          </a>
        </motion.div>
      </div>
    </section>
  )
}
