import { NextResponse } from "next/server"
import { requireAdmin } from "@/lib/require-admin"
import { connectDB } from "@/lib/db"
import { City } from "@/models/City"
import { createCitySchema } from "@/lib/city-validation"
import { ensureUniqueCitySlug, toPublicCity } from "@/lib/city-server"
import { CITY_STATUSES } from "@/types/city"

/** GET /api/admin/cities — list all (optional ?status=) */
export async function GET(request: Request) {
  const auth = await requireAdmin(request)
  if ("error" in auth) return auth.error

  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get("status")

    const filter: Record<string, unknown> = {}
    if (status && (CITY_STATUSES as readonly string[]).includes(status)) {
      filter.status = status
    }

    await connectDB()
    const docs = await City.find(filter).sort({ createdAt: -1 })

    return NextResponse.json({
      cities: docs.map(toPublicCity),
    })
  } catch (error) {
    console.error("List cities error:", error)
    return NextResponse.json(
      { error: "Unable to list cities" },
      { status: 500 }
    )
  }
}

/** POST /api/admin/cities */
export async function POST(request: Request) {
  const auth = await requireAdmin(request)
  if ("error" in auth) return auth.error

  try {
    const body = await request.json()
    const parsed = createCitySchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? "Invalid city data" },
        { status: 400 }
      )
    }

    await connectDB()
    const slug = await ensureUniqueCitySlug(parsed.data.slug)

    const created = await City.create({
      name: parsed.data.name,
      slug,
      image: parsed.data.image,
      status: parsed.data.status,
    })

    return NextResponse.json({ city: toPublicCity(created) }, { status: 201 })
  } catch (error) {
    if (
      error &&
      typeof error === "object" &&
      "code" in error &&
      (error as { code?: number }).code === 11000
    ) {
      return NextResponse.json(
        { error: "A city with this name already exists" },
        { status: 409 }
      )
    }

    console.error("Create city error:", error)
    return NextResponse.json(
      { error: "Unable to create city" },
      { status: 500 }
    )
  }
}
