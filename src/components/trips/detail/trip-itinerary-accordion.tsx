"use client"

import { HugeiconsIcon } from "@hugeicons/react"
import { Route01Icon } from "@hugeicons/core-free-icons"
import { useTripDetail } from "@/lib/trip-detail-context"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { TripRichHtml } from "@/components/trips/detail/trip-rich-html"

export function TripItineraryAccordion() {
  const { trip } = useTripDetail()
  const days = [...trip.itinerary].sort((a, b) => a.day - b.day)

  if (days.length === 0) {
    return (
      <p className="font-lato text-sm text-slate-500">
        Day-wise itinerary will appear here once published.
      </p>
    )
  }

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h3 className="font-display text-xl font-semibold tracking-tight text-slate-900">
          Itinerary
        </h3>
        <span className="font-open-sans inline-flex items-center gap-1.5 rounded-full bg-sky-600 px-3 py-1.5 text-[11px] font-semibold tracking-[0.08em] text-white uppercase">
          <HugeiconsIcon icon={Route01Icon} strokeWidth={2} className="size-3.5" />
          {trip.pickup} → {trip.drop}
        </span>
      </div>

      <Accordion
        defaultValue={[String(days[0]?.day ?? 1)]}
        className="rounded-2xl border-slate-200 bg-white shadow-sm"
      >
        {days.map((day) => (
          <AccordionItem
            key={`${day.day}-${day.title}`}
            value={String(day.day)}
            className="border-slate-100 px-1 data-open:bg-sky-50/40"
          >
            <AccordionTrigger className="gap-3 hover:no-underline">
              <span className="flex min-w-0 flex-1 items-center gap-3">
                <span className="flex size-12 shrink-0 flex-col items-center justify-center rounded-xl bg-slate-100 text-slate-800 ring-1 ring-slate-200">
                  <span className="font-display text-lg leading-none font-semibold">
                    {day.day}
                  </span>
                  <span className="font-open-sans text-[9px] font-semibold tracking-[0.12em] text-slate-500 uppercase">
                    Day
                  </span>
                </span>
                <span className="font-display min-w-0 text-left text-sm font-semibold tracking-tight text-slate-900 sm:text-base">
                  {day.title}
                </span>
              </span>
            </AccordionTrigger>
            <AccordionContent className="pl-[3.75rem] sm:pl-16">
              {day.distance ? (
                <p className="font-lato mb-3 text-sm text-slate-600">
                  <span className="font-semibold text-slate-800">Distance:</span>{" "}
                  {day.distance.value} {day.distance.unit}
                </p>
              ) : null}
              <TripRichHtml
                html={day.points}
                emptyMessage="No points added for this day yet."
              />
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}
