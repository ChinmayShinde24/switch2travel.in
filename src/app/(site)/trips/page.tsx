import { Suspense } from "react"
import { connectDB } from "@/lib/db"
import { listActiveCities } from "@/lib/city-server"
import { listPublishedTrips } from "@/lib/trip-server"
import { TripsExplore } from "@/components/trips/trips-explore"

export const dynamic = "force-dynamic"

export default async function TripsPage() {
  await connectDB()
  const [cities, trips] = await Promise.all([
    listActiveCities(),
    listPublishedTrips(),
  ])

  return (
    <Suspense>
      <TripsExplore cities={cities} trips={trips} />
    </Suspense>
  )
}
