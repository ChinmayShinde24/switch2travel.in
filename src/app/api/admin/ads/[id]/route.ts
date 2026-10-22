import { NextResponse } from "next/server"
import { requireAdmin } from "@/lib/require-admin"
import { connectDB } from "@/lib/db"
import { Ad } from "@/models/Ad"
import { updateAdSchema } from "@/lib/ad-validation"
import { assertTripExistsForAd, toPublicAd } from "@/lib/ad-server"

type Params = { params: Promise<{ id: string }> }

/** PATCH /api/admin/ads/[id] */
export async function PATCH(request: Request, { params }: Params) {
  const auth = await requireAdmin(request)
  if ("error" in auth) return auth.error

  try {
    const { id } = await params
    const body = await request.json()
    const parsed = updateAdSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? "Invalid ad data" },
        { status: 400 }
      )
    }

    const { title, image, tripId, sortOrder } = parsed.data
    if (
      title === undefined &&
      image === undefined &&
      tripId === undefined &&
      sortOrder === undefined
    ) {
      return NextResponse.json(
        { error: "Provide title, image, tripId, and/or sortOrder to update" },
        { status: 400 }
      )
    }

    await connectDB()
    const ad = await Ad.findById(id)
    if (!ad) {
      return NextResponse.json({ error: "Ad not found" }, { status: 404 })
    }

    if (tripId !== undefined) {
      const tripCheck = await assertTripExistsForAd(tripId)
      if (!tripCheck.ok) {
        return NextResponse.json({ error: tripCheck.error }, { status: 400 })
      }
      ad.tripId = tripId as never
    }

    if (title !== undefined) ad.title = title
    if (image !== undefined) ad.set("image", image)
    if (sortOrder !== undefined) ad.sortOrder = sortOrder

    await ad.save()
    return NextResponse.json({ ad: await toPublicAd(ad) })
  } catch (error) {
    console.error("Update ad error:", error)
    return NextResponse.json(
      { error: "Unable to update ad" },
      { status: 500 }
    )
  }
}

/** DELETE /api/admin/ads/[id] */
export async function DELETE(request: Request, { params }: Params) {
  const auth = await requireAdmin(request)
  if ("error" in auth) return auth.error

  try {
    const { id } = await params
    await connectDB()
    const ad = await Ad.findByIdAndDelete(id)
    if (!ad) {
      return NextResponse.json({ error: "Ad not found" }, { status: 404 })
    }
    return NextResponse.json({ ok: true, id })
  } catch (error) {
    console.error("Delete ad error:", error)
    return NextResponse.json(
      { error: "Unable to delete ad" },
      { status: 500 }
    )
  }
}
