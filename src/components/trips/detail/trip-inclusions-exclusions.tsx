"use client"

import { useState } from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  CancelCircleIcon,
  CheckmarkCircle02Icon,
} from "@hugeicons/core-free-icons"
import { useTripDetail } from "@/lib/trip-detail-context"
import { TripRichHtml } from "@/components/trips/detail/trip-rich-html"
import { cn } from "@/lib/utils"

export function TripInclusionsExclusions() {
  const { trip } = useTripDetail()
  const [expanded, setExpanded] = useState(false)

  return (
    <div>
      <h3 className="font-display text-xl font-semibold tracking-tight text-slate-900">
        Inclusions & Exclusions
      </h3>

      <div
        className={cn(
          "relative mt-4 grid gap-6 md:grid-cols-2",
          !expanded && "max-h-[22rem] overflow-hidden"
        )}
      >
        <PolicyColumn
          title="Inclusions"
          tone="include"
          html={trip.inclusions}
          empty="Inclusions will be listed here."
        />
        <PolicyColumn
          title="Exclusions"
          tone="exclude"
          html={trip.exclusions}
          empty="Exclusions will be listed here."
        />

        {!expanded ? (
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white to-transparent"
          />
        ) : null}
      </div>

      <div className="mt-3 flex justify-center">
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="font-display text-sm font-semibold text-sky-700 outline-none hover:text-sky-800 focus-visible:underline"
        >
          {expanded ? "View less" : "View more"}
        </button>
      </div>
    </div>
  )
}

function PolicyColumn({
  title,
  tone,
  html,
  empty,
}: {
  title: string
  tone: "include" | "exclude"
  html: string
  empty: string
}) {
  return (
    <div className="rounded-2xl bg-slate-50/80 p-4 ring-1 ring-slate-100 sm:p-5">
      <div className="mb-3 flex items-center gap-2">
        <HugeiconsIcon
          icon={
            tone === "include" ? CheckmarkCircle02Icon : CancelCircleIcon
          }
          strokeWidth={1.75}
          className={cn(
            "size-5",
            tone === "include" ? "text-emerald-600" : "text-rose-500"
          )}
        />
        <h4 className="font-display text-base font-semibold text-slate-900">
          {title}
        </h4>
      </div>
      <TripRichHtml html={html} emptyMessage={empty} />
    </div>
  )
}
