import { NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import { Trip } from "@/models/Trip"
import { PUBLIC_TRIP_FILTER, toPublicTrip } from "@/lib/trip-server"

type Params = { params: Promise<{ slug: string }> }

/** GET /api/trips/[slug] — published + active only */
export async function GET(_request: Request, { params }: Params) {
  try {
    const { slug } = await params
    await connectDB()

    const trip = await Trip.findOne({
      slug: slug.toLowerCase(),
      ...PUBLIC_TRIP_FILTER,
    })

    if (!trip) {
      return NextResponse.json({ error: "Trip not found" }, { status: 404 })
    }

    return NextResponse.json({ trip: await toPublicTrip(trip) })
  } catch (error) {
    console.error("Get public trip error:", error)
    return NextResponse.json({ error: "Unable to get trip" }, { status: 500 })
  }
}
