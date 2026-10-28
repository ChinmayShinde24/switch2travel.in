import { NextResponse } from "next/server"
import { Types } from "mongoose"
import { connectDB } from "@/lib/db"
import { Trip } from "@/models/Trip"
import { Category } from "@/models/Category"
import { City } from "@/models/City"
import {
  categoryMatchFilter,
  PUBLIC_TRIP_FILTER,
  toPublicTrips,
} from "@/lib/trip-server"

function isObjectId(value: string) {
  return Types.ObjectId.isValid(value) && value.length === 24
}

/** GET /api/trips — published + active; optional ?category= & ?city= (slug|id) */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const categoryParam = searchParams.get("category")?.trim()
    const cityParam = searchParams.get("city")?.trim()

    await connectDB()

    const filter: Record<string, unknown> = { ...PUBLIC_TRIP_FILTER }

    if (categoryParam) {
      if (isObjectId(categoryParam)) {
        Object.assign(filter, categoryMatchFilter(categoryParam))
      } else {
        const category = await Category.findOne({ slug: categoryParam }).lean()
        if (!category) {
          return NextResponse.json({ trips: [] })
        }
        Object.assign(filter, categoryMatchFilter(String(category._id)))
      }
    }

    if (cityParam) {
      if (isObjectId(cityParam)) {
        filter.cityId = cityParam
      } else {
        const city = await City.findOne({ slug: cityParam }).lean()
        if (!city) {
          return NextResponse.json({ trips: [] })
        }
        filter.cityId = city._id
      }
    }

    const docs = await Trip.find(filter).sort({ createdAt: -1 })
    return NextResponse.json({
      trips: await toPublicTrips(docs),
    })
  } catch (error) {
    console.error("List public trips error:", error)
    return NextResponse.json(
      { error: "Unable to list trips" },
      { status: 500 }
    )
  }
}
