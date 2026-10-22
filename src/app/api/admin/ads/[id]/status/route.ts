import { NextResponse } from "next/server"
import { requireAdmin } from "@/lib/require-admin"
import { connectDB } from "@/lib/db"
import { Ad } from "@/models/Ad"
import { MAX_ACTIVE_ADS, updateAdStatusSchema } from "@/lib/ad-validation"
import { toPublicAd } from "@/lib/ad-server"

type Params = { params: Promise<{ id: string }> }

/** PATCH /api/admin/ads/[id]/status */
export async function PATCH(request: Request, { params }: Params) {
  const auth = await requireAdmin(request)
  if ("error" in auth) return auth.error

  try {
    const { id } = await params
    const body = await request.json()
    const parsed = updateAdStatusSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? "Invalid status" },
        { status: 400 }
      )
    }

    await connectDB()
    const ad = await Ad.findById(id)
    if (!ad) {
      return NextResponse.json({ error: "Ad not found" }, { status: 404 })
    }

    if (parsed.data.status === "active" && ad.status !== "active") {
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

    ad.status = parsed.data.status
    await ad.save()

    return NextResponse.json({ ad: await toPublicAd(ad) })
  } catch (error) {
    console.error("Update ad status error:", error)
    return NextResponse.json(
      { error: "Unable to update ad status" },
      { status: 500 }
    )
  }
}
