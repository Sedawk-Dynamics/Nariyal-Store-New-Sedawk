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
            className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
              activeCategory === cat
                ? "bg-primary text-primary-foreground shadow-md"
                : "bg-secondary text-foreground hover:bg-primary/10 hover:text-primary"
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
        className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
      >
        {filtered.map((item) => (
          <MenuCard key={item.name} item={item} />
        ))}
      </motion.div>
    </>
  )
}
