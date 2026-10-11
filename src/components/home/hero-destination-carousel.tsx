"use client"

import { useEffect, useRef } from "react"
import { motion } from "motion/react"
import {
  ArrowLeft01Icon,
  ArrowRight01Icon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { HeroDestinationCard } from "@/components/home/hero-destination-card"
import { useHeroSpotlight } from "@/components/home/hero-spotlight"
import { Button } from "@/components/ui/button"
import { heroDestinations } from "@/data/hero-destinations"
import { cn } from "@/lib/utils"

export function HeroDestinationCarousel() {
  const { activeIndex, progress, total, goTo, next, prev } = useHeroSpotlight()
  const scrollerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const scroller = scrollerRef.current
    if (!scroller) return
    const card = scroller.children[activeIndex] as HTMLElement | undefined
    if (!card) return
    scroller.scrollTo({
      left: card.offsetLeft,
      behavior: "smooth",
    })
  }, [activeIndex])

  return (
    <motion.div
      initial={{ opacity: 0, x: 36 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.25, duration: 0.75, ease: [0.22, 1, 0.36, 1] as const }}
      className="relative hidden h-full min-h-0 flex-col justify-center gap-5 rounded-[2rem] border border-white/12 bg-white/[0.07] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.14)] backdrop-blur-2xl sm:gap-6 sm:p-5 lg:flex lg:p-6"
    >
      <div className="pointer-events-none absolute -top-16 -right-10 size-44 rounded-full bg-cyan-400/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 left-8 size-40 rounded-full bg-[#8FE3F0]/12 blur-3xl" />

      <div className="relative flex items-center justify-between gap-3">
        <div>
          <p className="font-open-sans text-[0.65rem] font-semibold tracking-[0.22em] text-[#8FE3F0]/90 uppercase">
            Featured routes
          </p>
          <p className="font-display mt-1 text-lg font-semibold text-white">
            Pick a vibe, we plan the rest
          </p>
        </div>
        <div className="hidden rounded-full border border-white/15 bg-white/8 px-3 py-1.5 text-xs text-white/70 sm:block">
          {total} destinations
        </div>
      </div>

      <div className="relative -mx-1 flex items-end gap-4 overflow-x-auto px-1 pb-1 sm:gap-5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {heroDestinations.map((destination, index) => {
          const active = index === activeIndex
          return (
            <button
              key={destination.id}
              type="button"
              onClick={() => goTo(index)}
              className={cn(
                "group relative shrink-0 px-0.5 py-1 text-left outline-none transition-colors focus-visible:ring-[3px] focus-visible:ring-cyan-200/50",
                active ? "text-white" : "text-white/70 hover:text-white"
              )}
              aria-current={active ? "true" : undefined}
            >
              <span
                className={cn(
                  "roboto-condensed block text-[0.95rem] tracking-[0.04em] uppercase sm:text-base",
                  active ? "font-bold text-white" : "font-semibold"
                )}
              >
                {destination.title}
              </span>
              <span
                className={cn(
                  "relative mt-2 block h-[2px] w-full overflow-hidden rounded-full",
                  active ? "bg-white/25" : "bg-white/20"
                )}
              >
                {active ? (
                  <motion.span
                    className="absolute inset-y-0 left-0 rounded-full bg-[#8FE3F0]"
                    style={{ width: `${progress * 100}%` }}
                  />
                ) : null}
              </span>
            </button>
          )
        })}
      </div>

      <div
        ref={scrollerRef}
        className="relative flex snap-x snap-mandatory gap-4 overflow-x-auto py-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {heroDestinations.map((destination, index) => (
          <div key={destination.id} className="snap-start">
            <HeroDestinationCard
              destination={destination}
              active={index === activeIndex}
            />
          </div>
        ))}
      </div>

      <div className="relative flex items-center justify-between">
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="size-11 rounded-full border-white/20 bg-white/10 text-white backdrop-blur-md hover:border-[#8FE3F0]/40 hover:bg-white/18 hover:text-white"
          aria-label="Previous destination"
          onClick={prev}
        >
          <HugeiconsIcon icon={ArrowLeft01Icon} strokeWidth={2} />
        </Button>
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="size-11 rounded-full border-white/20 bg-white/10 text-white backdrop-blur-md hover:border-[#8FE3F0]/40 hover:bg-white/18 hover:text-white"
          aria-label="Next destination"
          onClick={next}
        >
          <HugeiconsIcon icon={ArrowRight01Icon} strokeWidth={2} />
        </Button>
      </div>
    </motion.div>
  )
}
