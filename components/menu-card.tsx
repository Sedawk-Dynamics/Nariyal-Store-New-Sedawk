"use client"

import { motion, type Variants } from "framer-motion"

import BtnLabel from "@/components/btn-label"
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
      className="group -mr-[1.5px] -mb-[1.5px] flex flex-col border-[1.5px] border-ink bg-white"
    >
      <div className="relative flex h-40 items-center justify-center overflow-hidden border-b-[1.5px] border-ink bg-peach">
        <span aria-hidden="true" className="text-7xl transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6">
          {item.emoji}
        </span>
        <span className="type-mono absolute top-3 left-3 border-[1.5px] border-ink bg-lilac px-2 py-1 text-[11px] uppercase">
          {item.badge}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-[clamp(14px,1.5625vw,24px)]">
        <p className="type-mono text-[11px] uppercase opacity-80">{item.category}</p>
        <div className="flex items-start justify-between gap-3">
          <h3 className="type-body-lg">{item.name}</h3>
          <span className="type-mono shrink-0">₹{item.price}</span>
        </div>
        <p className="type-mono flex-1 text-[12px]">{item.description}</p>
        <a
          href="/#contact"
          aria-label={`Order ${item.name}`}
          className="btn-vibe btn-vibe--outline mt-2 w-full !py-3"
        >
          <BtnLabel arrow={false}>Order Now</BtnLabel>
        </a>
      </div>
    </motion.div>
  )
}
