"use client"

import { useState } from "react"
import { motion } from "motion/react"
import { CategoryRailItem } from "@/components/home/category-rail-item"
import type { TripCategory } from "@/types/trip-category"
import { cn } from "@/lib/utils"

type CategoryRailProps = {
  categories: TripCategory[]
}

export function CategoryRail({ categories }: CategoryRailProps) {
  const [activeId, setActiveId] = useState(categories[0]?.id ?? "")

  if (categories.length === 0) return null

  return (
    <section
      aria-label="Trip categories"
      className="relative z-10 mt-6 pb-4 sm:mt-8 md:mt-10 md:pb-6"
    >
      <div className="page-padding-x">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className={cn(
            "relative overflow-hidden rounded-[1.75rem] border border-white/10",
            "bg-slate-950 shadow-[0_24px_60px_rgba(2,12,27,0.35)]",
            "md:rounded-[2rem]"
          )}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_12%_0%,rgba(34,211,238,0.18),transparent_42%),radial-gradient(ellipse_at_90%_100%,rgba(251,191,36,0.12),transparent_40%),linear-gradient(165deg,rgba(15,23,42,0.95)_0%,rgba(2,12,27,0.98)_55%,rgba(15,23,42,1)_100%)]"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/50 to-transparent"
          />

          <div className="relative px-3 pt-4 pb-3 sm:px-5 sm:pt-5 sm:pb-4 md:px-7">
            <div className="relative">
              <div
                aria-hidden
                className="pointer-events-none absolute top-0 bottom-1 left-0 z-10 w-7 bg-gradient-to-r from-slate-950 to-transparent md:hidden"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute top-0 right-0 bottom-1 z-10 w-7 bg-gradient-to-l from-slate-950 to-transparent md:hidden"
              />

              <div
                className={cn(
                  "overflow-x-auto px-1 pb-2 md:px-2",
                  "[-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                )}
              >
                <div
                  role="list"
                  className="flex w-max min-w-full snap-x snap-mandatory justify-center gap-3 sm:gap-4 md:gap-5"
                >
                  {categories.map((category, index) => (
                    <div key={category.id} role="listitem" className="shrink-0">
                      <CategoryRailItem
                        category={category}
                        index={index}
                        active={activeId === category.id}
                        onSelect={setActiveId}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
