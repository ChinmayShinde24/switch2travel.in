import { NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import { listActiveAds } from "@/lib/ad-server"

/** GET /api/ads — active home carousel banners */
export async function GET() {
  try {
    await connectDB()
    const ads = await listActiveAds()
    return NextResponse.json({ ads })
  } catch (error) {
    console.error("List public ads error:", error)
    return NextResponse.json(
      { error: "Unable to list ads" },
      { status: 500 }
    )
  }
}
