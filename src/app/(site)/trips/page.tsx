import { connectDB } from "@/lib/db"
import { getActiveCityBySlug, listActiveCities } from "@/lib/city-server"
import { listPublishedTrips } from "@/lib/trip-server"
import { CityFilterRail } from "@/components/trips/city-filter-rail"
import { CityTripsHero } from "@/components/trips/city-trips-hero"
import { TripCardGrid } from "@/components/trips/trip-card-grid"

export const dynamic = "force-dynamic"

type PageProps = {
  searchParams: Promise<{ city?: string }>
}

export default async function TripsPage({ searchParams }: PageProps) {
  const { city: citySlug } = await searchParams
  const slug = citySlug?.trim().toLowerCase() ?? ""

  await connectDB()
  const cities = await listActiveCities()
  const selectedCity = slug ? await getActiveCityBySlug(slug) : null
  const trips = await listPublishedTrips(
    selectedCity ? { cityId: selectedCity.id } : {}
  )

  return (
    <div className="page-padding-x w-full space-y-6 py-6 sm:space-y-8 sm:py-8 md:py-10">
      {selectedCity ? (
        <CityTripsHero city={selectedCity} tripCount={trips.length} />
      ) : (
        <div>
          <p className="font-open-sans text-[11px] font-semibold tracking-[0.18em] text-sky-700 uppercase">
            Destinations
          </p>
          <h1 className="font-display mt-1 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            All trips
          </h1>
          <p className="font-lato mt-2 text-sm text-slate-500 sm:text-base">
            Browse every published package, or pick a city to see trips for that
            place.
          </p>
        </div>
      )}

      <CityFilterRail cities={cities} activeSlug={selectedCity?.slug ?? null} />

      <TripCardGrid
        trips={trips}
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
    </div>
  )
}
