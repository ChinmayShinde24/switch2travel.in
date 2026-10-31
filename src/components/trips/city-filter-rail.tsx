import Link from "next/link"
import { CityTripLink } from "@/components/city-trip-link"
import type { City } from "@/types/city"
import { cn } from "@/lib/utils"

type CityFilterRailProps = {
  cities: City[]
  activeSlug?: string | null
}

/** Same city list as home — filters the trips page. */
export function CityFilterRail({ cities, activeSlug }: CityFilterRailProps) {
  if (cities.length === 0) return null

  return (
    <div
      className={cn(
        "flex gap-2 overflow-x-auto pb-1",
        "[-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      )}
    >
      <Link
        href="/trips"
        className={cn(
          "font-display shrink-0 rounded-full px-3.5 py-1.5 text-sm font-medium tracking-tight ring-1 transition-colors",
          !activeSlug
            ? "bg-sky-600 text-white ring-sky-600"
            : "bg-white text-slate-600 ring-slate-200 hover:bg-sky-50 hover:text-sky-700"
        )}
      >
        All cities
      </Link>
      {cities.map((city) => {
        const active = city.slug === activeSlug
        return (
          <CityTripLink
            key={city.id}
            href={`/trips?city=${city.slug}`}
            className={cn(
              "font-display shrink-0 rounded-full px-3.5 py-1.5 text-sm font-medium tracking-tight ring-1 transition-colors",
              active
                ? "bg-sky-600 text-white ring-sky-600"
                : "bg-white text-slate-600 ring-slate-200 hover:bg-sky-50 hover:text-sky-700"
            )}
          >
            {city.name}
          </CityTripLink>
        )
      })}
    </div>
  )
}
