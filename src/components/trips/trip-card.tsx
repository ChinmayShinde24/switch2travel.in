"use client"

import Image from "next/image"
import { CityTripLink } from "@/components/city-trip-link"
import { motion } from "motion/react"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  ArrowRight01Icon,
  Clock01Icon,
  Location01Icon,
} from "@hugeicons/core-free-icons"
import type { Trip } from "@/types/trip"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export type TripCardProps = {
  trip: Trip
  index?: number
  className?: string
}

function formatDuration(days: number) {
  if (days <= 1) return "1 Day"
  const nights = days - 1
  return `${nights}N/${days}D`
}

function formatPrice(amount: number) {
  return `₹ ${amount.toLocaleString("en-IN")}`
}

/**
 * Global trip card — full-bleed card image with bottom story panel
 * (duration, title, pickup→drop, price). Reuse anywhere trips are listed.
 */
export function TripCard({ trip, index = 0, className }: TripCardProps) {
  const href = `/trips/${trip.slug}`
  const durationLabel = formatDuration(trip.durationDays)
  const routeLabel = `${trip.pickup} to ${trip.drop}`

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.45,
        delay: Math.min(index * 0.05, 0.25),
        ease: [0.22, 1, 0.36, 1],
      }}
      className={cn("group h-full", className)}
    >
      <CityTripLink
        href={href}
        className={cn(
          "relative flex h-full min-h-[22rem] flex-col overflow-hidden rounded-[1.35rem] outline-none sm:min-h-[24rem] sm:rounded-[1.5rem] md:min-h-[26rem]",
          "bg-slate-950 shadow-[0_20px_50px_rgba(2,12,27,0.22)]",
          "ring-1 ring-slate-900/10 transition-transform duration-500",
          "hover:-translate-y-1 hover:shadow-[0_28px_60px_rgba(2,12,27,0.32)]",
          "focus-visible:ring-[3px] focus-visible:ring-sky-400/50"
        )}
      >
        <div className="absolute inset-0">
          <Image
            src={trip.cardImage.url}
            alt={trip.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/55 to-slate-950/10"
          />
          <div
            aria-hidden
            className="absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(56,189,248,0.18),transparent_42%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          />
        </div>

        <div className="relative z-10 flex items-start justify-between gap-2 p-3.5 sm:p-4">
          <span className="font-open-sans inline-flex items-center rounded-full border border-white/20 bg-black/35 px-2.5 py-1 text-[0.62rem] font-semibold tracking-[0.16em] text-white uppercase backdrop-blur-md">
            {durationLabel}
          </span>
          {(trip.categories?.length
            ? trip.categories.map((c) => c.name).join(" · ")
            : trip.category?.name) ? (
            <Badge className="max-w-[60%] truncate rounded-full border-white/15 bg-sky-600/90 px-2.5 py-0.5 text-[0.62rem] font-semibold tracking-wide text-white hover:bg-sky-600">
              {trip.categories?.length
                ? trip.categories.map((c) => c.name).join(" · ")
                : trip.category?.name}
            </Badge>
          ) : null}
        </div>

        <div className="relative z-10 mt-auto flex flex-1 flex-col justify-end p-3.5 sm:p-4 md:p-5">
          <h3 className="font-display text-[1.05rem] leading-snug font-semibold tracking-tight text-white sm:text-lg md:text-[1.2rem]">
            {trip.title}
          </h3>

          <div className="mt-2.5 inline-flex max-w-full items-center gap-1.5 self-start rounded-full border border-white/20 bg-black/30 px-2.5 py-1 text-white/90 backdrop-blur-md">
            <HugeiconsIcon
              icon={Location01Icon}
              strokeWidth={1.75}
              className="size-3.5 shrink-0 text-sky-300"
            />
            <span className="font-lato truncate text-[0.72rem] sm:text-xs">
              {routeLabel}
            </span>
          </div>

          <div className="mt-3 flex items-end justify-between gap-3 border-t border-white/15 pt-3">
            <div className="min-w-0">
              <div className="font-lato flex items-center gap-1.5 text-[0.72rem] text-white/70">
                <HugeiconsIcon
                  icon={Clock01Icon}
                  strokeWidth={1.75}
                  className="size-3.5 shrink-0"
                />
                <span>{durationLabel}</span>
              </div>
              <p className="font-display mt-1 text-lg font-semibold tracking-tight text-white sm:text-xl">
                {formatPrice(trip.startingPrice)}
                <span className="font-lato ml-1 text-[0.7rem] font-normal text-white/55">
                  onwards
                </span>
              </p>
            </div>

            <span className="font-open-sans inline-flex shrink-0 items-center gap-1 text-[0.72rem] font-semibold tracking-[0.12em] text-sky-300 uppercase transition-transform duration-300 group-hover:translate-x-0.5">
              Explore
              <HugeiconsIcon
                icon={ArrowRight01Icon}
                strokeWidth={2}
                className="size-3.5"
              />
            </span>
          </div>
        </div>
      </CityTripLink>
    </motion.article>
  )
}
