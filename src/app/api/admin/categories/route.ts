import { NextResponse } from "next/server"
import { requireAdmin } from "@/lib/require-admin"
import { connectDB } from "@/lib/db"
import { Category } from "@/models/Category"
import { createCategorySchema } from "@/lib/category-validation"
import {
  ensureUniqueCategorySlug,
  toPublicCategory,
} from "@/lib/category-server"
import { CATEGORY_STATUSES } from "@/types/category"

/** GET /api/admin/categories — list all (optional ?status=active|inactive) */
export async function GET(request: Request) {
  const auth = await requireAdmin(request)
  if ("error" in auth) return auth.error

  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get("status")

    const filter: Record<string, unknown> = {}
    if (status && (CATEGORY_STATUSES as readonly string[]).includes(status)) {
      filter.status = status
    }

    await connectDB()
    const docs = await Category.find(filter).sort({ createdAt: -1 })

    return NextResponse.json({
      categories: docs.map(toPublicCategory),
    })
  } catch (error) {
    console.error("List categories error:", error)
    return NextResponse.json(
      { error: "Unable to list categories" },
      { status: 500 }
    )
  }
}

/** POST /api/admin/categories — create (name + ImageKit image) */
export async function POST(request: Request) {
  const auth = await requireAdmin(request)
  if ("error" in auth) return auth.error

  try {
    const body = await request.json()
    const parsed = createCategorySchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? "Invalid category data" },
        { status: 400 }
      )
    }

    await connectDB()
    const slug = await ensureUniqueCategorySlug(parsed.data.slug)

    const created = await Category.create({
      name: parsed.data.name,
      slug,
      image: parsed.data.image,
      status: parsed.data.status,
    })

    return NextResponse.json(
      { category: toPublicCategory(created) },
      { status: 201 }
    )
  } catch (error) {
    if (
      error &&
      typeof error === "object" &&
      "code" in error &&
      (error as { code?: number }).code === 11000
    ) {
      return NextResponse.json(
        { error: "A category with this name already exists" },
        { status: 409 }
      )
    }

    console.error("Create category error:", error)
    return NextResponse.json(
      { error: "Unable to create category" },
      { status: 500 }
    )
  }
}
