import { NextResponse } from "next/server"
import { requireAdmin } from "@/lib/require-admin"
import { getImageKitUploadAuth } from "@/lib/imagekit"

/** GET /api/admin/uploads/auth — ImageKit signed upload params (admin only) */
export async function GET(request: Request) {
  const auth = await requireAdmin(request)
  if ("error" in auth) return auth.error

  try {
    const uploadAuth = getImageKitUploadAuth()
    return NextResponse.json({
      ...uploadAuth,
      urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT ?? null,
      folder: "/switch2travel/categories",
    })
  } catch (error) {
    console.error("ImageKit upload auth error:", error)
    return NextResponse.json(
      { error: "Unable to create upload credentials" },
      { status: 500 }
    )
  }
}
