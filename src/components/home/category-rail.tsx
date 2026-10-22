"use client"

import { motion } from "motion/react"
import { CategoryRailItem } from "@/components/home/category-rail-item"
import type { TripCategory } from "@/types/trip-category"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

type CategoryRailProps = {
  categories: TripCategory[]
  /** null = no filter (all trips). Set only after the user picks a category. */
  activeId: string | null
  onSelect: (id: string) => void
}

export function CategoryRail({
  categories,
  activeId,
  onSelect,
}: CategoryRailProps) {
  if (categories.length === 0) return null

  return (
    <section
      aria-label="Trip categories"
      className="relative z-10 overflow-hidden py-10 sm:py-12 md:py-14"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_15%_0%,rgba(14,165,233,0.14),transparent_48%),radial-gradient(ellipse_at_85%_100%,rgba(56,189,248,0.1),transparent_42%)]"
      />

      <div className="page-padding-x relative">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-3xl text-center"
        >
          <Badge className="rounded-full border-sky-200 bg-sky-50 px-3 py-1 text-[0.65rem] font-semibold tracking-[0.18em] text-sky-700 uppercase hover:bg-sky-50">
            Browse trips
          </Badge>
          <h2 className="font-display mt-4 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl md:text-[2.75rem] md:leading-[1.1]">
            Pick your kind of{" "}
            <span className="bg-gradient-to-r from-sky-600 to-cyan-500 bg-clip-text text-transparent">
              adventure
            </span>
          </h2>
          <p className="font-lato mx-auto mt-3 max-w-xl text-base text-slate-500 sm:text-lg">
            Tap a category to filter featured trips below — backpacking,
            weekends, best sellers, and more.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.45, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
          className="relative mt-8 sm:mt-10"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute top-0 bottom-2 left-0 z-10 w-8 bg-gradient-to-r from-white to-transparent md:hidden"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute top-0 right-0 bottom-2 z-10 w-8 bg-gradient-to-l from-white to-transparent md:hidden"
          />

          <div
            className={cn(
              "overflow-x-auto px-1 pb-3",
              "[-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            )}
          >
            <div
              role="list"
              className="flex w-max min-w-full snap-x snap-mandatory justify-center gap-3.5 sm:gap-4 md:gap-5"
            >
              {categories.map((category, index) => (
                <div key={category.id} role="listitem" className="shrink-0">
                  <CategoryRailItem
                    category={category}
                    index={index}
                    active={activeId === category.id}
                    onSelect={onSelect}
                  />
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
