"use client"

import { motion, type Variants } from "framer-motion"
import { Leaf } from "lucide-react"

import type { MenuItem } from "@/lib/menu-data"

export const menuContainerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
}

export const menuCardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export default function MenuCard({ item }: { item: MenuItem }) {
  return (
    <motion.div
      variants={menuCardVariants}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="bg-card rounded-3xl overflow-hidden border border-border hover:border-primary/30 hover:shadow-xl transition-all duration-300 group"
    >
      {/* Emoji / Icon display */}
      <div className="relative bg-secondary/50 h-36 flex items-center justify-center overflow-hidden">
        <span aria-hidden="true" className="text-7xl group-hover:scale-110 transition-transform duration-300">
          {item.emoji}
        </span>
        <span className={`absolute top-3 left-3 text-xs font-bold px-3 py-1 rounded-full ${item.badgeColor}`}>
          {item.badge}
        </span>
        <span className="absolute top-3 right-3 flex items-center gap-1 bg-white/80 backdrop-blur-sm text-primary text-[10px] font-semibold px-2 py-1 rounded-full">
          <Leaf size={9} aria-hidden="true" /> Fresh
        </span>
      </div>

      {/* Info */}
      <div className="p-5">
        <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-1">
          {item.category}
        </p>
        <h3 className="font-bold text-foreground text-sm leading-tight mb-2">{item.name}</h3>
        <p className="text-xs text-muted-foreground mb-4 leading-relaxed">{item.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-primary">₹{item.price}</span>
          <a
            href="/#contact"
            aria-label={`Order ${item.name}`}
            className="bg-primary text-primary-foreground text-xs font-semibold px-4 py-2 rounded-xl hover:bg-primary/90 transition-colors shadow-sm"
          >
            Order Now
          </a>
        </div>
      </div>
    </motion.div>
  )
}
