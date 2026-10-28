"use client"

import { useMemo, useState } from "react"
import type { Ad } from "@/types/ad"
import type { City } from "@/types/city"
import type { Trip } from "@/types/trip"
import type { TripCategory } from "@/types/trip-category"
import { AdCarousel } from "@/components/home/ad-carousel"
import { CategoryRail } from "@/components/home/category-rail"
import { CityExplorer } from "@/components/home/city-explorer"
import { TripCardGrid } from "@/components/trips/trip-card-grid"

type HomeDiscoverProps = {
  categories: TripCategory[]
  cities: City[]
  trips: Trip[]
  ads: Ad[]
}

/**
 * Category rail → trip cards → ad carousel → city explorer.
 * Starts with all published trips; category click filters the list.
 */
export function HomeDiscover({
  categories,
  cities,
  trips,
  ads,
}: HomeDiscoverProps) {
  // null = show every published trip (no category filter yet)
  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null)

  const filteredTrips = useMemo(() => {
    if (!activeCategoryId) return trips
    return trips.filter((trip) =>
      trip.categoryIds?.length
        ? trip.categoryIds.includes(activeCategoryId)
        : trip.categoryId === activeCategoryId
    )
  }, [trips, activeCategoryId])

  const activeCategory = activeCategoryId
    ? categories.find((c) => c.id === activeCategoryId)
    : undefined

  const categoryWithTrips = useMemo(
    () =>
      categories.filter((category) =>
        trips.some((trip) =>
          trip.categoryIds?.length
            ? trip.categoryIds.includes(category.id)
            : trip.categoryId === category.id
        )
      ),
    [categories, trips]
  )

  const tripCountByCity = useMemo(() => {
    const counts: Record<string, number> = {}
    for (const trip of trips) {
      if (!trip.cityId) continue
      counts[trip.cityId] = (counts[trip.cityId] ?? 0) + 1
    }
    return counts
  }, [trips])

  function handleCategorySelect(id: string) {
    // Clicking the active category again clears the filter → all trips
    setActiveCategoryId((prev) => (prev === id ? null : id))
  }

  return (
    <>
      <CategoryRail
        categories={categories}
        activeId={activeCategoryId}
        onSelect={handleCategorySelect}
      />

      <section
        aria-label="Trips"
        className="relative z-10 mt-8 pb-4 sm:mt-10 sm:pb-6 md:mt-12"
      >
        <div className="page-padding-x">
          <div className="mb-5 flex flex-wrap items-end justify-between gap-3 sm:mb-6">
            <div>
              <p className="font-open-sans text-[11px] font-semibold tracking-[0.18em] text-sky-700 uppercase">
                Featured trips
              </p>
              <h2 className="font-display mt-1 text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
                {activeCategory?.label ?? "All trips"}
              </h2>
              <p className="font-lato mt-1 text-sm text-slate-500">
                {filteredTrips.length}{" "}
                {filteredTrips.length === 1 ? "trip" : "trips"} ready to explore
                {activeCategoryId && trips.length > 0 ? (
                  <span className="text-slate-400">
                    {" "}
                    · {trips.length} published total
                  </span>
                ) : null}
              </p>
            </div>
          </div>

          <TripCardGrid
            trips={filteredTrips}
            emptyMessage={
              trips.length === 0
                ? "No published trips yet."
                : `No trips in “${activeCategory?.label ?? "this category"}” yet.`
            }
            emptyHint={
              trips.length === 0
                ? "Publish a trip from Admin (status: published, visibility: active)."
                : categoryWithTrips.length > 0
                  ? `Try ${categoryWithTrips.map((c) => c.label).join(", ")} — those categories have trips. Or clear the filter to see all.`
                  : "Pick another category or check back soon."
            }
          />
        </div>
      </section>

      <AdCarousel ads={ads} />

      <CityExplorer cities={cities} tripCountByCity={tripCountByCity} />
    </>
  )
}
