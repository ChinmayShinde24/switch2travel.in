"use client"

import { useMemo } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useLoading } from "@/lib/loading-context"
import { HugeiconsIcon } from "@hugeicons/react"
import { Location01Icon } from "@hugeicons/core-free-icons"
import type { City } from "@/types/city"
import type { Trip } from "@/types/trip"
import { TripCardGrid } from "@/components/trips/trip-card-grid"
import { cn } from "@/lib/utils"

type TripsExploreProps = {
  cities: City[]
  trips: Trip[]
}

function tripMatchesCity(trip: Trip, city: City) {
  if (trip.cityId === city.id) return true
  if (trip.city?.id === city.id) return true
  if (trip.city?.slug === city.slug) return true
  return false
}

export function TripsExplore({ cities, trips }: TripsExploreProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { cover } = useLoading()
  const activeSlug = searchParams.get("city")?.trim().toLowerCase() || null

  const selectedCity = useMemo(
    () => (activeSlug ? cities.find((city) => city.slug === activeSlug) : undefined),
    [activeSlug, cities]
  )

  const tripCountByCity = useMemo(() => {
    const counts: Record<string, number> = {}
    for (const city of cities) {
      counts[city.id] = trips.filter((trip) => tripMatchesCity(trip, city)).length
    }
    return counts
  }, [cities, trips])

  const visibleTrips = useMemo(() => {
    if (!selectedCity) return trips
    return trips.filter((trip) => tripMatchesCity(trip, selectedCity))
  }, [selectedCity, trips])

  async function goToCity(slug: string | null) {
    if (slug === activeSlug || (!slug && !activeSlug)) return
    const params = new URLSearchParams(searchParams.toString())
    if (slug) params.set("city", slug)
    else params.delete("city")
    const query = params.toString()
    const href = query ? `${pathname}?${query}` : pathname
    await cover(() => {
      router.replace(href, { scroll: false })
    })
  }

  return (
    <div className="page-padding-x w-full py-6 sm:py-8 md:py-10">
      <div className="mb-6 sm:mb-8">
        <p className="font-open-sans text-[11px] font-semibold tracking-[0.18em] text-sky-700 uppercase">
          Destinations
        </p>
        <h1 className="font-display mt-1 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
          Book your next trip
        </h1>
        <p className="font-lato mt-2 max-w-2xl text-sm text-slate-500 sm:text-base">
          Pick a city on the left to see every published package for that place.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[17rem_minmax(0,1fr)] lg:items-start lg:gap-8">
        <CitySidebar
          cities={cities}
          activeSlug={activeSlug}
          tripCountByCity={tripCountByCity}
          totalTrips={trips.length}
          onSelect={goToCity}
        />

        <section aria-label="Trips">
          <div className="mb-4 flex flex-wrap items-end justify-between gap-2">
            <div>
              <h2 className="font-display text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
                {selectedCity?.name ?? "All trips"}
              </h2>
              <p className="font-lato mt-1 text-sm text-slate-500">
                {visibleTrips.length}{" "}
                {visibleTrips.length === 1 ? "trip" : "trips"}
                {selectedCity ? ` in ${selectedCity.name}` : ""}
              </p>
            </div>
          </div>

          <TripCardGrid
            trips={visibleTrips}
            emptyMessage={
              selectedCity
                ? `No trips in ${selectedCity.name} yet.`
                : "No published trips yet."
            }
            emptyHint={
              selectedCity
                ? "Try another city, or check back after a trip is published for this destination."
                : "Publish a trip from Admin (status: published, visibility: active)."
            }
          />
        </section>
      </div>
    </div>
  )
}

function CitySidebar({
  cities,
  activeSlug,
  tripCountByCity,
  totalTrips,
  onSelect,
}: {
  cities: City[]
  activeSlug: string | null
  tripCountByCity: Record<string, number>
  totalTrips: number
  onSelect: (slug: string | null) => void | Promise<void>
}) {
  return (
    <aside className="lg:sticky lg:top-24">
      <p className="font-open-sans mb-2 text-[11px] font-semibold tracking-[0.16em] text-slate-400 uppercase">
        Cities
      </p>

      <div className="lg:hidden">
        <label htmlFor="trips-city-select" className="sr-only">
          Filter by city
        </label>
        <select
          id="trips-city-select"
          value={activeSlug ?? ""}
          onChange={(event) => onSelect(event.target.value || null)}
          className="font-lato h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-800 outline-none focus-visible:border-sky-400 focus-visible:ring-[3px] focus-visible:ring-sky-400/40"
        >
          <option value="">All cities ({totalTrips})</option>
          {cities.map((city) => (
            <option key={city.id} value={city.slug}>
              {city.name} ({tripCountByCity[city.id] ?? 0})
            </option>
          ))}
        </select>
      </div>

      <nav
        aria-label="Cities"
        className="mt-0 hidden flex-col overflow-visible rounded-2xl border border-slate-200 bg-white p-2 shadow-sm lg:flex"
      >
        <CityRow
          label="All"
          count={totalTrips}
          active={!activeSlug}
          onClick={() => onSelect(null)}
        />
        {cities.map((city) => (
          <CityRow
            key={city.id}
            label={city.name}
            count={tripCountByCity[city.id] ?? 0}
            active={city.slug === activeSlug}
            onClick={() => onSelect(city.slug)}
          />
        ))}
      </nav>
    </aside>
  )
}

function CityRow({
  label,
  count,
  active,
  onClick,
}: {
  label: string
  count?: number
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-current={active ? "true" : undefined}
      className={cn(
        "font-display inline-flex shrink-0 items-center justify-between gap-3 rounded-full px-3.5 py-2 text-left text-sm font-medium tracking-tight ring-1 transition-colors lg:w-full lg:rounded-xl lg:ring-0",
        active
          ? "bg-sky-600 text-white ring-sky-600 lg:bg-sky-600"
          : "bg-white text-slate-600 ring-slate-200 hover:bg-sky-50 hover:text-sky-700 lg:bg-transparent lg:hover:bg-sky-50"
      )}
    >
      <span className="inline-flex min-w-0 items-center gap-2">
        <HugeiconsIcon
          icon={Location01Icon}
          strokeWidth={2}
          className={cn(
            "hidden size-3.5 shrink-0 lg:block",
            active ? "text-white" : "text-sky-500"
          )}
        />
        <span className="truncate">{label}</span>
      </span>
      {count !== undefined ? (
        <span
          className={cn(
            "font-lato hidden text-xs tabular-nums lg:inline",
            active ? "text-white/80" : "text-slate-400"
          )}
        >
          {count}
        </span>
      ) : null}
    </button>
  )
}
