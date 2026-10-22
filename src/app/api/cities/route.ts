import { NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import { listActiveCities } from "@/lib/city-server"

/** GET /api/cities — public active cities */
export async function GET() {
  try {
    await connectDB()
    const cities = await listActiveCities()
    return NextResponse.json({ cities })
  } catch (error) {
    console.error("List public cities error:", error)
    return NextResponse.json(
      { error: "Unable to list cities" },
      { status: 500 }
    )
  }
}
