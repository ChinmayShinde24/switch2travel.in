"use client"

import { useState } from "react"
import { useTripDetail } from "@/lib/trip-detail-context"
import { TripRichHtml } from "@/components/trips/detail/trip-rich-html"
import { cn } from "@/lib/utils"

export function TripOverview() {
  const { trip } = useTripDetail()
  const [expanded, setExpanded] = useState(false)
  const hasContent = Boolean(trip.overview?.trim())

  return (
    <div>
      <h3 className="font-display text-xl font-semibold tracking-tight text-slate-900">
        Overview
      </h3>
      <div className="mt-3 border-t border-slate-100 pt-4">
        <div
          className={cn(
            "relative",
            !expanded && hasContent && "max-h-48 overflow-hidden sm:max-h-56"
          )}
        >
          <TripRichHtml
            html={trip.overview}
            emptyMessage="Overview coming soon."
          />
          {!expanded && hasContent ? (
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white to-transparent"
            />
          ) : null}
        </div>

        {hasContent ? (
          <div className="mt-3 flex justify-center">
            <button
              type="button"
              onClick={() => setExpanded((v) => !v)}
              className="font-display text-sm font-semibold text-sky-700 outline-none hover:text-sky-800 focus-visible:underline"
            >
              {expanded ? "View less" : "View more"}
            </button>
          </div>
        ) : null}
      </div>
    </div>
  )
}
