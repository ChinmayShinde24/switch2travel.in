"use client"

import { useCallback } from "react"
import { toast } from "sonner"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  Briefcase01Icon,
  Clock01Icon,
  Location01Icon,
  Money01Icon,
  Share08Icon,
} from "@hugeicons/core-free-icons"
import { useTripDetail } from "@/lib/trip-detail-context"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

function formatDuration(days: number) {
  if (days <= 1) return "1 Day"
  return `${days - 1}N / ${days}D`
}

function formatPrice(amount: number) {
  return `₹ ${amount.toLocaleString("en-IN")}`
}

type DetailChip = {
  label: string
  value: string
  icon: typeof Location01Icon
}

export function TripBasicInfo() {
  const { trip } = useTripDetail()

  const chips: DetailChip[] = [
    {
      label: "Pickup & Drop",
      value: `${trip.pickup} → ${trip.drop}`,
      icon: Location01Icon,
    },
    {
      label: trip.categories?.length > 1 ? "Categories" : "Category",
      value: trip.categories?.length
        ? trip.categories.map((c) => c.name).join(", ")
        : (trip.category?.name ?? "Trip"),
      icon: Briefcase01Icon,
    },
    {
      label: "Duration",
      value: formatDuration(trip.durationDays),
      icon: Clock01Icon,
    },
    {
      label: "Starting price",
      value: formatPrice(trip.startingPrice),
      icon: Money01Icon,
    },
  ]

  if (trip.city?.name) {
    chips.push({
      label: "City",
      value: trip.city.name,
      icon: Location01Icon,
    })
  }

  const onShare = useCallback(async () => {
    const url = typeof window !== "undefined" ? window.location.href : ""
    try {
      if (navigator.share) {
        await navigator.share({ title: trip.title, url })
        return
      }
      await navigator.clipboard.writeText(url)
      toast.success("Link copied")
    } catch {
      // user cancelled share — ignore
    }
  }, [trip.title])

  return (
    <section
      aria-label="Trip details"
      className="w-full rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-6 md:rounded-[1.35rem] md:p-7"
    >
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="font-open-sans text-[11px] font-semibold tracking-[0.18em] text-sky-700 uppercase">
            Details
          </p>
          <h2 className="font-display mt-1 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
            {trip.title}
          </h2>
          <p className="font-lato mt-2 text-sm text-slate-500">
            {formatDuration(trip.durationDays)}
            {trip.categories?.length
              ? ` · ${trip.categories.map((c) => c.name).join(", ")}`
              : trip.category?.name
                ? ` · ${trip.category.name}`
                : ""}
            {trip.city?.name ? ` · ${trip.city.name}` : ""}
          </p>
        </div>

        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => void onShare()}
          className="rounded-full border-sky-200 text-sky-700 hover:bg-sky-50 hover:text-sky-800"
        >
          <HugeiconsIcon icon={Share08Icon} strokeWidth={2} data-icon="inline-start" />
          Share
        </Button>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {chips.map((chip) => (
          <div
            key={chip.label}
            className={cn(
              "flex items-start gap-3 rounded-2xl bg-slate-50 px-3.5 py-3.5 ring-1 ring-slate-100"
            )}
          >
            <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl bg-sky-50 text-sky-600 ring-1 ring-sky-100">
              <HugeiconsIcon icon={chip.icon} strokeWidth={1.75} className="size-5" />
            </span>
            <span className="min-w-0">
              <span className="font-open-sans block text-[10px] font-semibold tracking-[0.14em] text-slate-400 uppercase">
                {chip.label}
              </span>
              <span className="font-display mt-0.5 block text-sm font-semibold tracking-tight text-slate-800">
                {chip.value}
              </span>
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}
