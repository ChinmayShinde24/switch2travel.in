import type { City } from "@/types/city"
import type { Trip } from "@/types/trip"
import type { HeroDestination } from "@/data/hero-destinations"

export function tripCountByCityId(trips: Trip[]): Record<string, number> {
  const counts: Record<string, number> = {}
  for (const trip of trips) {
    if (!trip.cityId) continue
    counts[trip.cityId] = (counts[trip.cityId] ?? 0) + 1
  }
  return counts
}

/** Map admin cities into hero carousel cards — same source as Search by city. */
export function citiesToHeroDestinations(
  cities: City[],
  tripCounts: Record<string, number> = {}
): HeroDestination[] {
  return cities.map((city) => {
    const count = tripCounts[city.id] ?? 0
    return {
      id: city.id,
      slug: city.slug,
      region: "City",
      title: city.name,
      place: city.name,
      image: city.image.url,
      href: `/trips?city=${city.slug}`,
      vibe:
        count === 1
          ? "1 trip ready to explore"
          : `${count} trips ready to explore`,
      days: count === 1 ? "1 trip" : `${count} trips`,
      tags: ["Explore"],
    }
  })
}
