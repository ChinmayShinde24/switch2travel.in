import { NextResponse } from "next/server"
import { requireAdmin } from "@/lib/require-admin"
import { connectDB } from "@/lib/db"
import { Ad } from "@/models/Ad"
import { createAdSchema, MAX_ACTIVE_ADS } from "@/lib/ad-validation"
import {
  assertTripExistsForAd,
  toPublicAd,
  toPublicAds,
} from "@/lib/ad-server"
import { AD_STATUSES } from "@/types/ad"

/** GET /api/admin/ads — list all (optional ?status=) */
export async function GET(request: Request) {
  const auth = await requireAdmin(request)
  if ("error" in auth) return auth.error

  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get("status")

    const filter: Record<string, unknown> = {}
    if (status && (AD_STATUSES as readonly string[]).includes(status)) {
      filter.status = status
    }

    await connectDB()
    const docs = await Ad.find(filter).sort({ sortOrder: 1, createdAt: -1 })

    return NextResponse.json({
      ads: await toPublicAds(docs),
    })
  } catch (error) {
    console.error("List ads error:", error)
    return NextResponse.json(
      { error: "Unable to list ads" },
      { status: 500 }
    )
  }
}

/** POST /api/admin/ads */
export async function POST(request: Request) {
  const auth = await requireAdmin(request)
  if ("error" in auth) return auth.error

  try {
    const body = await request.json()
    const parsed = createAdSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? "Invalid ad data" },
        { status: 400 }
      )
    }

    await connectDB()

    const tripCheck = await assertTripExistsForAd(parsed.data.tripId)
    if (!tripCheck.ok) {
      return NextResponse.json({ error: tripCheck.error }, { status: 400 })
    }

    if (parsed.data.status === "active") {
      const activeCount = await Ad.countDocuments({ status: "active" })
      if (activeCount >= MAX_ACTIVE_ADS) {
        return NextResponse.json(
          {
            error: `At most ${MAX_ACTIVE_ADS} active ads allowed. Disable one first.`,
          },
          { status: 400 }
        )
      }
    }

    const created = await Ad.create({
      title: parsed.data.title,
      image: parsed.data.image,
      tripId: parsed.data.tripId,
      status: parsed.data.status,
      sortOrder: parsed.data.sortOrder,
    })

    return NextResponse.json({ ad: await toPublicAd(created) }, { status: 201 })
  } catch (error) {
    console.error("Create ad error:", error)
    return NextResponse.json(
      { error: "Unable to create ad" },
      { status: 500 }
    )
  }
}
