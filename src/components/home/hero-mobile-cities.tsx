"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import { CityTripLink } from "@/components/city-trip-link"
import { useHeroSpotlight } from "@/components/home/hero-spotlight"
import { cn } from "@/lib/utils"

export function HeroMobileCities() {
  const { destinations, activeIndex } = useHeroSpotlight()
  const scrollerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const scroller = scrollerRef.current
    if (!scroller) return
    const item = scroller.children[activeIndex] as HTMLElement | undefined
    if (!item) return
    const left =
      item.offsetLeft - (scroller.clientWidth / 2 - item.clientWidth / 2)
    scroller.scrollTo({ left, behavior: "smooth" })
  }, [activeIndex])

  if (destinations.length === 0) return null

  return (
    <div className="lg:hidden">
      <div className="mb-3">
        <p className="font-open-sans text-[0.65rem] font-semibold tracking-[0.22em] text-[#8FE3F0] uppercase">
          Featured routes
        </p>
        <p className="font-display mt-1 text-base font-semibold text-white">
          Pick a vibe
        </p>
      </div>

      <div
        ref={scrollerRef}
        className="flex gap-4 overflow-x-auto overscroll-x-contain px-0.5 pb-1 touch-pan-x scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        {destinations.map((destination, index) => {
          const active = index === activeIndex

          return (
            <CityTripLink
              key={destination.id}
              href={destination.href}
              className="flex w-[4.85rem] shrink-0 flex-col items-center gap-2 outline-none focus-visible:ring-[3px] focus-visible:ring-cyan-200/50"
              aria-current={active ? "true" : undefined}
            >
              <span
                className={cn(
                  "rounded-full p-[2.5px]",
                  active
                    ? "bg-[linear-gradient(145deg,#f472b6_0%,#fb923c_48%,#facc15_100%)]"
                    : "bg-white/30"
                )}
              >
                <span className="block rounded-full bg-slate-950 p-[2px]">
                  <span className="relative block size-[4.25rem] overflow-hidden rounded-full">
                    <Image
                      src={destination.image}
                      alt={`${destination.title} — ${destination.place}`}
                      fill
                      sizes="68px"
                      className="object-cover"
                    />
                  </span>
                </span>
              </span>
              <span
                className={cn(
                  "roboto-condensed max-w-full truncate text-center text-[0.7rem] tracking-wide uppercase",
                  active ? "font-bold text-white" : "font-semibold text-white/80"
                )}
              >
                {destination.title}
              </span>
            </CityTripLink>
          )
        })}
      </div>
    </div>
  )
}
