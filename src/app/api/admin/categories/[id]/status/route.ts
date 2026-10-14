import { NextResponse } from "next/server"
import { requireAdmin } from "@/lib/require-admin"
import { connectDB } from "@/lib/db"
import { Category } from "@/models/Category"
import { updateCategoryStatusSchema } from "@/lib/category-validation"
import { toPublicCategory } from "@/lib/category-server"

type Params = { params: Promise<{ id: string }> }

/** PATCH /api/admin/categories/[id]/status — set active | inactive */
export async function PATCH(request: Request, { params }: Params) {
  const auth = await requireAdmin(request)
  if ("error" in auth) return auth.error

  try {
    const { id } = await params
    const body = await request.json()
    const parsed = updateCategoryStatusSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? "Invalid status" },
        { status: 400 }
      )
    }

    await connectDB()
    const category = await Category.findById(id)
    if (!category) {
      return NextResponse.json({ error: "Category not found" }, { status: 404 })
    }

    category.status = parsed.data.status
    await category.save()

    return NextResponse.json({ category: toPublicCategory(category) })
  } catch (error) {
    console.error("Update category status error:", error)
    return NextResponse.json(
      { error: "Unable to update category status" },
      { status: 500 }
    )
  }
}
