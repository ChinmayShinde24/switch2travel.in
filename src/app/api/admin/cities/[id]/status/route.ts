import { NextResponse } from "next/server"
import { requireAdmin } from "@/lib/require-admin"
import { connectDB } from "@/lib/db"
import { City } from "@/models/City"
import { updateCityStatusSchema } from "@/lib/city-validation"
import { toPublicCity } from "@/lib/city-server"

type Params = { params: Promise<{ id: string }> }

/** PATCH /api/admin/cities/[id]/status */
export async function PATCH(request: Request, { params }: Params) {
  const auth = await requireAdmin(request)
  if ("error" in auth) return auth.error

  try {
    const { id } = await params
    const body = await request.json()
    const parsed = updateCityStatusSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? "Invalid status" },
        { status: 400 }
      )
    }

    await connectDB()
    const city = await City.findById(id)
    if (!city) {
      return NextResponse.json({ error: "City not found" }, { status: 404 })
    }

    city.status = parsed.data.status
    await city.save()

    return NextResponse.json({ city: toPublicCity(city) })
  } catch (error) {
    console.error("Update city status error:", error)
    return NextResponse.json(
      { error: "Unable to update city status" },
      { status: 500 }
    )
  }
}
