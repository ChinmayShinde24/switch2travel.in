import { NextResponse } from "next/server"
import { requireAdmin } from "@/lib/require-admin"
import { connectDB } from "@/lib/db"
import { Trip } from "@/models/Trip"
import { updateTripSchema } from "@/lib/trip-validation"
import {
  assertCategoryExists,
  assertCityExists,
  toPublicTrip,
} from "@/lib/trip-server"

type Params = { params: Promise<{ id: string }> }

/** GET /api/admin/trips/[id] */
export async function GET(request: Request, { params }: Params) {
  const auth = await requireAdmin(request)
  if ("error" in auth) return auth.error

  try {
    const { id } = await params
    await connectDB()
    const trip = await Trip.findById(id)
    if (!trip) {
      return NextResponse.json({ error: "Trip not found" }, { status: 404 })
    }
    return NextResponse.json({ trip: await toPublicTrip(trip) })
  } catch (error) {
    console.error("Get admin trip error:", error)
    return NextResponse.json({ error: "Unable to get trip" }, { status: 500 })
  }
}

/** PATCH /api/admin/trips/[id] — content update (slug never changes) */
export async function PATCH(request: Request, { params }: Params) {
  const auth = await requireAdmin(request)
  if ("error" in auth) return auth.error

  try {
    const { id } = await params
    const body = await request.json()
    const parsed = updateTripSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? "Invalid trip data" },
        { status: 400 }
      )
    }

    const data = parsed.data
    if (Object.keys(data).length === 0) {
      return NextResponse.json(
        { error: "Provide at least one field to update" },
        { status: 400 }
      )
    }

    await connectDB()
    const trip = await Trip.findById(id)
    if (!trip) {
      return NextResponse.json({ error: "Trip not found" }, { status: 404 })
    }

    if (data.categoryId !== undefined) {
      const categoryCheck = await assertCategoryExists(data.categoryId)
      if (!categoryCheck.ok) {
        return NextResponse.json(
          { error: categoryCheck.error },
          { status: 400 }
        )
      }
      trip.categoryId = data.categoryId as never
    }

    if (data.cityId !== undefined) {
      const cityCheck = await assertCityExists(data.cityId)
      if (!cityCheck.ok) {
        return NextResponse.json({ error: cityCheck.error }, { status: 400 })
      }
      trip.cityId = data.cityId as never
    }

    if (data.title !== undefined) trip.title = data.title
    // slug intentionally never updated on title change
    if (data.cardImage !== undefined) trip.set("cardImage", data.cardImage)
    if (data.pickup !== undefined) trip.pickup = data.pickup
    if (data.drop !== undefined) trip.drop = data.drop
    if (data.durationDays !== undefined) trip.durationDays = data.durationDays
    if (data.startingPrice !== undefined) trip.startingPrice = data.startingPrice
    if (data.heroImage !== undefined) trip.set("heroImage", data.heroImage)
    if (data.galleryImages !== undefined) {
      trip.set("galleryImages", data.galleryImages)
    }
    if (data.overview !== undefined) trip.overview = data.overview
    if (data.itinerary !== undefined) trip.set("itinerary", data.itinerary)
    if (data.inclusions !== undefined) trip.set("inclusions", data.inclusions)
    if (data.exclusions !== undefined) trip.set("exclusions", data.exclusions)
    if (data.cancellationPolicy !== undefined) {
      trip.set("cancellationPolicy", data.cancellationPolicy)
    }
    if (data.paymentPolicy !== undefined) {
      trip.set("paymentPolicy", data.paymentPolicy)
    }
    if (data.faqs !== undefined) trip.set("faqs", data.faqs)

    if (data.metaTitle === null) {
      trip.metaTitle = undefined
    } else if (data.metaTitle !== undefined) {
      trip.metaTitle = data.metaTitle
    }

    if (data.metaDescription === null) {
      trip.metaDescription = undefined
    } else if (data.metaDescription !== undefined) {
      trip.metaDescription = data.metaDescription
    }

    await trip.save()
    return NextResponse.json({ trip: await toPublicTrip(trip) })
  } catch (error) {
    console.error("Update trip error:", error)
    return NextResponse.json(
      { error: "Unable to update trip" },
      { status: 500 }
    )
  }
}

/** DELETE /api/admin/trips/[id] */
export async function DELETE(request: Request, { params }: Params) {
  const auth = await requireAdmin(request)
  if ("error" in auth) return auth.error

  try {
    const { id } = await params
    await connectDB()
    const trip = await Trip.findByIdAndDelete(id)
    if (!trip) {
      return NextResponse.json({ error: "Trip not found" }, { status: 404 })
    }
    return NextResponse.json({ ok: true, id })
  } catch (error) {
    console.error("Delete trip error:", error)
    return NextResponse.json(
      { error: "Unable to delete trip" },
      { status: 500 }
    )
  }
}
