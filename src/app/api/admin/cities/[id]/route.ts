import { NextResponse } from "next/server"
import { requireAdmin } from "@/lib/require-admin"
import { connectDB } from "@/lib/db"
import { City } from "@/models/City"
import { updateCitySchema } from "@/lib/city-validation"
import {
  ensureUniqueCitySlug,
  slugFromCityName,
  toPublicCity,
} from "@/lib/city-server"

type Params = { params: Promise<{ id: string }> }

/** PATCH /api/admin/cities/[id] */
export async function PATCH(request: Request, { params }: Params) {
  const auth = await requireAdmin(request)
  if ("error" in auth) return auth.error

  try {
    const { id } = await params
    const body = await request.json()
    const parsed = updateCitySchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? "Invalid city data" },
        { status: 400 }
      )
    }

    if (parsed.data.name === undefined && parsed.data.image === undefined) {
      return NextResponse.json(
        { error: "Provide name and/or image to update" },
        { status: 400 }
      )
    }

    await connectDB()
    const city = await City.findById(id)
    if (!city) {
      return NextResponse.json({ error: "City not found" }, { status: 404 })
    }

    if (parsed.data.name !== undefined) {
      city.name = parsed.data.name
      city.slug = await ensureUniqueCitySlug(
        slugFromCityName(parsed.data.name),
        id
      )
    }

    if (parsed.data.image !== undefined) {
      city.set("image", parsed.data.image)
    }

    await city.save()
    return NextResponse.json({ city: toPublicCity(city) })
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

    console.error("Update city error:", error)
    return NextResponse.json(
      { error: "Unable to update city" },
      { status: 500 }
    )
  }
}

/** DELETE /api/admin/cities/[id] */
export async function DELETE(request: Request, { params }: Params) {
  const auth = await requireAdmin(request)
  if ("error" in auth) return auth.error

  try {
    const { id } = await params
    await connectDB()
    const city = await City.findByIdAndDelete(id)
    if (!city) {
      return NextResponse.json({ error: "City not found" }, { status: 404 })
    }
    return NextResponse.json({ ok: true, id })
  } catch (error) {
    console.error("Delete city error:", error)
    return NextResponse.json(
      { error: "Unable to delete city" },
      { status: 500 }
    )
  }
}
