import { NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import { listActiveCategories } from "@/lib/category-server"

/** GET /api/categories — public list of active categories (home rail). */
export async function GET() {
  try {
    await connectDB()
    const categories = await listActiveCategories()
    return NextResponse.json({ categories })
  } catch (error) {
    console.error("List public categories error:", error)
    return NextResponse.json(
      { error: "Unable to list categories" },
      { status: 500 }
    )
  }
}
