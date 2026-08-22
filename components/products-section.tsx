"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

import MenuCard, { menuContainerVariants } from "@/components/menu-card"
import { featuredMenuItems, menuItems } from "@/lib/menu-data"

export default function ProductsSection() {
  return (
    <section id="menu" className="py-24 bg-background scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-sm font-semibold text-accent uppercase tracking-widest mb-3">Outlet Menu</p>
          <h2 className="text-4xl sm:text-5xl font-serif font-bold text-foreground text-balance mb-4">
            Nariyal Store <span className="text-primary">Menu</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Nature&apos;s hydration, crafted for your health. Every drink is made fresh with premium tender coconuts.
          </p>
        </motion.div>

        {/* Featured four */}
        <motion.div
          variants={menuContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {featuredMenuItems.map((item) => (
            <MenuCard key={item.name} item={item} />
          ))}
        </motion.div>

        {/* Link to the full menu */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-12 text-center"
        >
          <Link
            href="/menu"
            className="group inline-flex items-center gap-2 rounded-2xl bg-primary px-8 py-4 text-sm font-bold text-primary-foreground shadow-lg transition-colors duration-300 hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
            View Full Menu — All {menuItems.length} Drinks
            <ArrowRight
              size={16}
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
          <p className="mt-8 text-lg font-serif italic text-primary/70">
            &ldquo;Nature&apos;s Hydration — Crafted for Your Health&rdquo;
          </p>
        </motion.div>
      </div>
    </section>
  )
}
