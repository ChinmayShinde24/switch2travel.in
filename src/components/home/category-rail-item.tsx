"use client"

import Image from "next/image"
import { motion } from "motion/react"
import { HugeiconsIcon } from "@hugeicons/react"
import { Tick02Icon } from "@hugeicons/core-free-icons"
import type { TripCategory } from "@/types/trip-category"
import { cn } from "@/lib/utils"

const accentGlow: Record<TripCategory["accent"], string> = {
  cyan: "shadow-[0_16px_40px_rgba(14,165,233,0.28)] ring-sky-400",
  amber: "shadow-[0_16px_40px_rgba(245,158,11,0.28)] ring-amber-400",
  rose: "shadow-[0_16px_40px_rgba(244,63,94,0.25)] ring-rose-400",
  emerald: "shadow-[0_16px_40px_rgba(16,185,129,0.28)] ring-emerald-400",
  violet: "shadow-[0_16px_40px_rgba(139,92,246,0.28)] ring-violet-400",
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
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{
        duration: 0.4,
        delay: Math.min(index * 0.04, 0.28),
        ease: [0.22, 1, 0.36, 1],
      }}
      className="snap-center"
    >
      <button
        type="button"
        onClick={() => onSelect(category.id)}
        aria-pressed={active}
        aria-current={active ? "true" : undefined}
        className={cn(
          "group relative block h-[10.5rem] w-[8.25rem] shrink-0 overflow-hidden rounded-[1.35rem] text-left outline-none sm:h-[12rem] sm:w-[9.5rem] md:h-[13.5rem] md:w-[10.5rem]",
          "ring-1 transition-all duration-400",
          "focus-visible:ring-[3px] focus-visible:ring-sky-400/50",
          active
            ? cn("ring-2 -translate-y-0.5", accentGlow[category.accent])
            : "ring-slate-900/10 shadow-[0_12px_32px_rgba(2,12,27,0.1)] hover:-translate-y-1 hover:shadow-[0_20px_44px_rgba(2,12,27,0.16)]"
        )}
      >
        <Image
          src={category.image}
          alt=""
          fill
          sizes="(max-width: 640px) 132px, 168px"
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"
        />
        <div
          aria-hidden
          className={cn(
            "absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.28),transparent_55%)] transition-opacity duration-500",
            active ? "opacity-100" : "opacity-0 group-hover:opacity-100"
          )}
        />

        {active ? (
          <span className="absolute top-2.5 right-2.5 inline-flex size-6 items-center justify-center rounded-full bg-sky-500 text-white shadow-md ring-2 ring-white/80">
            <HugeiconsIcon icon={Tick02Icon} strokeWidth={2.5} className="size-3.5" />
          </span>
        ) : (
          <span className="font-open-sans absolute top-2.5 left-2.5 rounded-full border border-white/25 bg-black/30 px-2 py-0.5 text-[0.58rem] font-semibold tracking-[0.14em] text-white/90 uppercase backdrop-blur-md">
            Category
          </span>
        )}

        <span className="absolute inset-x-0 bottom-0 p-3 sm:p-3.5">
          <span
            className={cn(
              "font-display line-clamp-2 text-[0.95rem] leading-snug font-semibold tracking-tight text-white sm:text-base",
              active && "text-sky-100"
            )}
          >
            {category.label}
          </span>
          <span className="font-open-sans mt-1.5 block text-[0.62rem] font-semibold tracking-[0.14em] text-white/70 uppercase transition-colors group-hover:text-sky-200">
            {active ? "Selected" : "View trips"}
          </span>
        </span>
      </button>
    </motion.div>
  )
}
