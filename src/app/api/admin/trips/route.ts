import { NextResponse } from "next/server"
import { requireAdmin } from "@/lib/require-admin"
import { connectDB } from "@/lib/db"
import { Trip } from "@/models/Trip"
import { createTripSchema } from "@/lib/trip-validation"
import {
  assertCategoriesExist,
  assertCityExists,
  ensureUniqueTripSlug,
  toPublicTrip,
  toPublicTrips,
} from "@/lib/trip-server"
import { TRIP_STATUSES, TRIP_VISIBILITIES } from "@/types/trip"

/** GET /api/admin/trips — list all (?status=&visibility=) */
export async function GET(request: Request) {
  const auth = await requireAdmin(request)
  if ("error" in auth) return auth.error

  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get("status")
    const visibility = searchParams.get("visibility")

    const filter: Record<string, unknown> = {}
    if (status && (TRIP_STATUSES as readonly string[]).includes(status)) {
      filter.status = status
    }
    if (
      visibility &&
      (TRIP_VISIBILITIES as readonly string[]).includes(visibility)
    ) {
      filter.visibility = visibility
    }

    await connectDB()
    const docs = await Trip.find(filter).sort({ createdAt: -1 })

    return NextResponse.json({
      trips: await toPublicTrips(docs),
    })
  } catch (error) {
    console.error("List admin trips error:", error)
    return NextResponse.json(
      { error: "Unable to list trips" },
      { status: 500 }
    )
  }
}

/** POST /api/admin/trips — create trip */
export async function POST(request: Request) {
  const auth = await requireAdmin(request)
  if ("error" in auth) return auth.error

  try {
    const body = await request.json()
    const parsed = createTripSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? "Invalid trip data" },
        { status: 400 }
      )
    }

    await connectDB()

    const categoryCheck = await assertCategoriesExist(parsed.data.categoryIds)
    if (!categoryCheck.ok) {
      return NextResponse.json({ error: categoryCheck.error }, { status: 400 })
    }

    const cityCheck = await assertCityExists(parsed.data.cityId)
    if (!cityCheck.ok) {
      return NextResponse.json({ error: cityCheck.error }, { status: 400 })
    }

    const slug = await ensureUniqueTripSlug(parsed.data.slug)
    const data = parsed.data

    const created = await Trip.create({
      title: data.title,
      slug,
      categoryIds: data.categoryIds,
      categoryId: data.categoryId,
      cityId: data.cityId,
      status: data.status,
      visibility: data.visibility,
      cardImage: data.cardImage,
      pickup: data.pickup,
      drop: data.drop,
      durationDays: data.durationDays,
      startingPrice: data.startingPrice,
      heroImage: data.heroImage,
      galleryImages: data.galleryImages,
      overview: data.overview,
      itinerary: data.itinerary,
      inclusions: data.inclusions,
      exclusions: data.exclusions,
      cancellationPolicy: data.cancellationPolicy,
      paymentPolicy: data.paymentPolicy,
      faqs: data.faqs,
      ...(data.metaTitle ? { metaTitle: data.metaTitle } : {}),
      ...(data.metaDescription
        ? { metaDescription: data.metaDescription }
        : {}),
    })

    return NextResponse.json(
      { trip: await toPublicTrip(created) },
      { status: 201 }
    )
  } catch (error) {
    if (
      error &&
      typeof error === "object" &&
      "code" in error &&
      (error as { code?: number }).code === 11000
    ) {
      return NextResponse.json(
        { error: "A trip with this slug already exists" },
        { status: 409 }
      )
    }

    console.error("Create trip error:", error)
    return NextResponse.json(
      { error: "Unable to create trip" },
      { status: 500 }
    )
  }
}
