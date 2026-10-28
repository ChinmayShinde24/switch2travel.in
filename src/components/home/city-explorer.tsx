"use client"

import { useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useReducedMotion } from "motion/react"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  ArrowRight01Icon,
  Location01Icon,
} from "@hugeicons/core-free-icons"
import type { City } from "@/types/city"
import { Badge } from "@/components/ui/badge"
import { useAutoScrollRail } from "@/components/home/use-auto-scroll-rail"
import { cn } from "@/lib/utils"

type CityExplorerProps = {
  cities: City[]
  tripCountByCity: Record<string, number>
}

type CityExplorerCardProps = {
  city: City
  tripCount: number
  /** Hidden clone used only to loop the rail. */
  duplicate?: boolean
  index?: number
}

function CityExplorerCard({
  city,
  tripCount,
  duplicate = false,
  index = 0,
}: CityExplorerCardProps) {
  return (
    <motion.div
      initial={duplicate ? false : { opacity: 0, y: 18 }}
      whileInView={duplicate ? undefined : { opacity: 1, y: 0 }}
      viewport={duplicate ? undefined : { once: true, amount: 0.3 }}
      transition={{
        duration: 0.4,
        delay: Math.min(index * 0.05, 0.3),
        ease: [0.22, 1, 0.36, 1],
      }}
      className="shrink-0"
      aria-hidden={duplicate || undefined}
    >
      <Link
        href={`/trips?city=${city.slug}`}
        tabIndex={duplicate ? -1 : undefined}
        className={cn(
          "group relative block h-[11.5rem] w-[9.5rem] overflow-hidden rounded-[1.35rem] text-left outline-none sm:h-[13rem] sm:w-[11rem] md:h-[14.5rem] md:w-[12rem]",
          "ring-1 ring-slate-900/10 transition-all duration-400",
          "shadow-[0_14px_36px_rgba(2,12,27,0.12)]",
          "hover:-translate-y-1 hover:shadow-[0_24px_50px_rgba(2,12,27,0.2)]",
          "focus-visible:ring-[3px] focus-visible:ring-sky-400/50"
        )}
      >
        <Image
          src={city.image.url}
          alt={duplicate ? "" : city.name}
          fill
          sizes="(max-width: 640px) 152px, 192px"
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/45 to-transparent"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.22),transparent_50%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        />

        <div className="absolute top-2.5 left-2.5">
          <span className="font-open-sans inline-flex items-center gap-1 rounded-full border border-white/20 bg-black/35 px-2 py-0.5 text-[0.6rem] font-semibold tracking-[0.12em] text-white uppercase backdrop-blur-md">
            <HugeiconsIcon
              icon={Location01Icon}
              strokeWidth={2}
              className="size-3 text-sky-300"
            />
            City
          </span>
        </div>

        <div className="absolute inset-x-0 bottom-0 p-3 sm:p-3.5">
          <p className="font-display text-base font-semibold tracking-tight text-white sm:text-lg">
            {city.name}
          </p>
          <p className="font-lato mt-0.5 text-[0.7rem] text-white/70">
            {tripCount} {tripCount === 1 ? "trip" : "trips"}
          </p>
          <span className="font-open-sans mt-2 inline-flex items-center gap-1 text-[0.65rem] font-semibold tracking-[0.14em] text-white/80 uppercase transition-colors group-hover:text-sky-200">
            Explore
            <HugeiconsIcon
              icon={ArrowRight01Icon}
              strokeWidth={2}
              className="size-3.5"
            />
          </span>
        </div>
      </Link>
    </motion.div>
  )
}

/** Browse cities below featured trips — does not change the trip cards above. */
export function CityExplorer({ cities, tripCountByCity }: CityExplorerProps) {
  const scrollerRef = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()
  const shouldLoop = cities.length > 1 && !reduceMotion

  useAutoScrollRail(scrollerRef, { enabled: shouldLoop })

  if (cities.length === 0) return null

  return (
    <section
      aria-label="Search by city"
      className="relative z-10 overflow-hidden py-12 sm:py-14 md:py-16"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_10%_0%,rgba(14,165,233,0.12),transparent_45%),radial-gradient(ellipse_at_90%_100%,rgba(251,191,36,0.08),transparent_40%)]"
      />

      <div className="page-padding-x relative">
        <div className="mx-auto max-w-3xl text-center">
          <Badge className="rounded-full border-sky-200 bg-sky-50 px-3 py-1 text-[0.65rem] font-semibold tracking-[0.18em] text-sky-700 uppercase hover:bg-sky-50">
            Destinations
          </Badge>
          <h2 className="font-display mt-4 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl md:text-[2.75rem] md:leading-[1.1]">
            Search by{" "}
            <span className="bg-gradient-to-r from-sky-600 to-cyan-500 bg-clip-text text-transparent">
              city
            </span>
          </h2>
          <p className="font-lato mx-auto mt-3 max-w-xl text-base text-slate-500 sm:text-lg">
            Pick a city to see every package available there — same destinations
            as the hero above.
          </p>
        </div>

        <div
          ref={scrollerRef}
          className={cn(
            "mt-8 flex gap-3 overflow-x-auto overscroll-x-contain pb-3 sm:mt-10 sm:gap-4 md:gap-5",
            "touch-pan-x [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          )}
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          {cities.map((city, index) => (
            <CityExplorerCard
              key={city.id}
              city={city}
              tripCount={tripCountByCity[city.id] ?? 0}
              index={index}
            />
          ))}
          {shouldLoop
            ? cities.map((city) => (
                <CityExplorerCard
                  key={`${city.id}-loop`}
                  city={city}
                  tripCount={tripCountByCity[city.id] ?? 0}
                  duplicate
                />
              ))
            : null}
        </div>
      </div>
    </section>
  )
}
