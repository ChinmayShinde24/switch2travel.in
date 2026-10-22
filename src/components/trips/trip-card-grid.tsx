"use client"

import type { Trip } from "@/types/trip"
import { TripCard } from "@/components/trips/trip-card"
import { cn } from "@/lib/utils"

type TripCardGridProps = {
  trips: Trip[]
  emptyMessage?: string
  emptyHint?: string
  className?: string
}

/** Responsive grid of global TripCards — 1 / 2 / 3 columns. */
export function TripCardGrid({
  trips,
  emptyMessage = "No trips in this category yet.",
  emptyHint = "Pick another category or check back soon.",
  className,
}: TripCardGridProps) {
  if (trips.length === 0) {
    return (
      <div
        className={cn(
          "rounded-2xl border border-dashed border-slate-300 bg-white/70 px-6 py-14 text-center",
          className
        )}
      >
        <p className="font-display text-sm font-medium text-slate-700">
          {emptyMessage}
        </p>
        <p className="font-lato mt-1 text-sm text-slate-500">{emptyHint}</p>
      </div>
    )
  }

  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6",
        className
      )}
    >
      {trips.map((trip, index) => (
        <TripCard key={trip.id} trip={trip} index={index} />
      ))}
    </div>
  )
}
