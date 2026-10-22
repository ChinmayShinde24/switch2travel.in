import { NextResponse } from "next/server"
import { requireAdmin } from "@/lib/require-admin"
import { getImageKitUploadAuth } from "@/lib/imagekit"
import { adImageKitFolder } from "@/lib/ad-server"
import { tripImageKitFolder } from "@/lib/trip-server"

/**
 * GET /api/admin/uploads/auth
 * Query:
 *   purpose=category (default) → /switch2travel/categories
 *   purpose=city → /switch2travel/cities
 *   purpose=ad → /switch2travel/ads
 *   purpose=trip&tripKey=<slug-or-id> → /switch2travel/trips/<tripKey>
 */
export async function GET(request: Request) {
  const auth = await requireAdmin(request)
  if ("error" in auth) return auth.error

  try {
    const { searchParams } = new URL(request.url)
    const purpose = searchParams.get("purpose") ?? "category"
    const tripKey = searchParams.get("tripKey")?.trim() ?? ""

    let folder = "/switch2travel/categories"

    if (purpose === "trip") {
      if (!tripKey) {
        return NextResponse.json(
          { error: "tripKey is required when purpose=trip" },
          { status: 400 }
        )
      }
      folder = tripImageKitFolder(tripKey)
    } else if (purpose === "city") {
      folder = "/switch2travel/cities"
    } else if (purpose === "ad") {
      folder = adImageKitFolder()
    } else if (purpose !== "category") {
      return NextResponse.json(
        { error: "purpose must be category, city, ad, or trip" },
        { status: 400 }
      )
    }

    const uploadAuth = getImageKitUploadAuth()
    return NextResponse.json({
      ...uploadAuth,
      folder,
      purpose,
    })
  } catch (error) {
    console.error("ImageKit upload auth error:", error)
    return NextResponse.json(
      { error: "Unable to create upload credentials" },
      { status: 500 }
    )
  }
}
