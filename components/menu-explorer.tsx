"use client"

import { useState } from "react"
import { motion } from "framer-motion"

import MenuCard, { menuContainerVariants } from "@/components/menu-card"
import { categories, menuItems, type Category } from "@/lib/menu-data"

export default function MenuExplorer() {
  const [activeCategory, setActiveCategory] = useState<Category>("All")

  const filtered =
    activeCategory === "All"
      ? menuItems
      : menuItems.filter((item) => item.category === activeCategory)

  return (
    <>
      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-2 mb-10">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setActiveCategory(cat)}
            aria-pressed={activeCategory === cat}
            className={`type-mono border-[1.5px] border-ink px-4 py-2.5 uppercase transition-colors duration-200 ${
              activeCategory === cat ? "bg-ink text-cream" : "bg-transparent text-ink hover:bg-lilac"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Menu Grid */}
      <motion.div
        key={activeCategory}
        variants={menuContainerVariants}
        initial="hidden"
        animate="visible"
        className="grid pr-[1.5px] pb-[1.5px] sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      >
        {filtered.map((item) => (
          <MenuCard key={item.name} item={item} />
        ))}
      </motion.div>
    </>
  )
}
