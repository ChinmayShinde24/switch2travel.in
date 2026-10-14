"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "motion/react"
import type { TripCategory } from "@/types/trip-category"
import { cn } from "@/lib/utils"

const accentRing: Record<TripCategory["accent"], string> = {
  cyan: "from-cyan-400 via-sky-500 to-teal-400",
  amber: "from-amber-300 via-orange-400 to-yellow-400",
  rose: "from-rose-400 via-pink-500 to-fuchsia-400",
  emerald: "from-emerald-400 via-teal-500 to-lime-400",
  violet: "from-violet-400 via-indigo-500 to-sky-400",
}

const accentText: Record<TripCategory["accent"], string> = {
  cyan: "text-cyan-300",
  amber: "text-amber-300",
  rose: "text-rose-300",
  emerald: "text-emerald-300",
  violet: "text-violet-300",
}

type CategoryRailItemProps = {
  category: TripCategory
  active: boolean
  onSelect: (id: string) => void
  index: number
}

export function CategoryRailItem({
  category,
  active,
  onSelect,
  index,
}: CategoryRailItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.35, delay: index * 0.03, ease: [0.22, 1, 0.36, 1] }}
      className="snap-center"
    >
      <Link
        href={category.href}
        onClick={() => onSelect(category.id)}
        aria-current={active ? "true" : undefined}
        className="group flex w-[4.75rem] flex-col items-center gap-2 outline-none sm:w-[5.25rem] md:w-[5.75rem]"
      >
        <span
          className={cn(
            "relative inline-flex rounded-[1.15rem] p-[2.5px] transition-transform duration-300",
            "bg-gradient-to-br",
            accentRing[category.accent],
            active
              ? "scale-105 shadow-[0_12px_28px_rgba(34,211,238,0.28)]"
              : "opacity-75 group-hover:opacity-100 group-hover:scale-[1.03]",
            "group-focus-visible:ring-2 group-focus-visible:ring-cyan-400/40 group-focus-visible:ring-offset-2 group-focus-visible:ring-offset-slate-950"
          )}
        >
          <span
            className={cn(
              "relative block size-[3.85rem] overflow-hidden rounded-[0.95rem] bg-slate-800 sm:size-[4.25rem] md:size-[4.6rem]",
              "ring-2 ring-slate-950"
            )}
          >
            <Image
              src={category.image}
              alt=""
              fill
              sizes="80px"
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <span className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-white/5" />
          </span>

          {active ? (
            <motion.span
              layoutId="category-active-dot"
              className="absolute -bottom-1 left-1/2 size-2 -translate-x-1/2 rounded-full bg-cyan-400 shadow-[0_0_0_3px_rgba(2,12,27,0.95)]"
            />
          ) : null}
        </span>

        <span
          className={cn(
            "font-open-sans max-w-full truncate text-center text-[0.68rem] leading-tight font-semibold tracking-wide sm:text-[0.72rem]",
            active
              ? accentText[category.accent]
              : "text-slate-400 group-hover:text-slate-100"
          )}
        >
          {category.label}
        </span>
      </Link>
    </motion.div>
  )
}
