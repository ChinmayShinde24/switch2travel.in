import { NextResponse } from "next/server"
import { requireAdmin } from "@/lib/require-admin"
import { connectDB } from "@/lib/db"
import { Trip } from "@/models/Trip"
import { updateTripVisibilitySchema } from "@/lib/trip-validation"
import { toPublicTrip } from "@/lib/trip-server"

type Params = { params: Promise<{ id: string }> }

/** PATCH /api/admin/trips/[id]/visibility — active | inactive */
export async function PATCH(request: Request, { params }: Params) {
  const auth = await requireAdmin(request)
  if ("error" in auth) return auth.error

  try {
    const { id } = await params
    const body = await request.json()
    const parsed = updateTripVisibilitySchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? "Invalid visibility" },
        { status: 400 }
      )
    }

    await connectDB()
    const trip = await Trip.findById(id)
    if (!trip) {
      return NextResponse.json({ error: "Trip not found" }, { status: 404 })
    }

    trip.visibility = parsed.data.visibility
    await trip.save()

    return NextResponse.json({ trip: await toPublicTrip(trip) })
  } catch (error) {
    console.error("Update trip visibility error:", error)
    return NextResponse.json(
      { error: "Unable to update trip visibility" },
      { status: 500 }
    )
  }
}
