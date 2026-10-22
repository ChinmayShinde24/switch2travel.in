import { HeroSection } from "@/components/home/hero-section"
import { HomeDiscover } from "@/components/home/home-discover"
import { connectDB } from "@/lib/db"
import { listActiveAds } from "@/lib/ad-server"
import {
  listActiveCategories,
  toRailCategory,
} from "@/lib/category-server"
import { listActiveCities } from "@/lib/city-server"
import { listPublishedTrips } from "@/lib/trip-server"

/** Always fetch fresh public trips/categories/cities/ads. */
export const dynamic = "force-dynamic"

export default async function HomePage() {
  await connectDB()
  const [categories, cities, trips, ads] = await Promise.all([
    listActiveCategories().then((list) => list.map(toRailCategory)),
    listActiveCities(),
    listPublishedTrips(),
    listActiveAds(),
  ])

  return (
    <>
      <HeroSection cities={cities} trips={trips} />
      <HomeDiscover
        categories={categories}
        cities={cities}
        trips={trips}
        ads={ads}
      />
    </>
  )
}
