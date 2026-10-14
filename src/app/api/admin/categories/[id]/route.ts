import { NextResponse } from "next/server"
import { requireAdmin } from "@/lib/require-admin"
import { connectDB } from "@/lib/db"
import { Category } from "@/models/Category"
import { updateCategorySchema } from "@/lib/category-validation"
import {
  ensureUniqueCategorySlug,
  slugFromName,
  toPublicCategory,
} from "@/lib/category-server"

type Params = { params: Promise<{ id: string }> }

/** PATCH /api/admin/categories/[id] — edit name and/or image */
export async function PATCH(request: Request, { params }: Params) {
  const auth = await requireAdmin(request)
  if ("error" in auth) return auth.error

  try {
    const { id } = await params
    const body = await request.json()
    const parsed = updateCategorySchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? "Invalid category data" },
        { status: 400 }
      )
    }

    if (
      parsed.data.name === undefined &&
      parsed.data.image === undefined
    ) {
      return NextResponse.json(
        { error: "Provide name and/or image to update" },
        { status: 400 }
      )
    }

    await connectDB()
    const category = await Category.findById(id)
    if (!category) {
      return NextResponse.json({ error: "Category not found" }, { status: 404 })
    }

    if (parsed.data.name !== undefined) {
      category.name = parsed.data.name
      category.slug = await ensureUniqueCategorySlug(
        slugFromName(parsed.data.name),
        id
      )
    }

    if (parsed.data.image !== undefined) {
      category.set("image", parsed.data.image)
    }

    await category.save()

    return NextResponse.json({ category: toPublicCategory(category) })
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

    console.error("Update category error:", error)
    return NextResponse.json(
      { error: "Unable to update category" },
      { status: 500 }
    )
  }
}

/** DELETE /api/admin/categories/[id] — hard delete */
export async function DELETE(request: Request, { params }: Params) {
  const auth = await requireAdmin(request)
  if ("error" in auth) return auth.error

  try {
    const { id } = await params
    await connectDB()

    const category = await Category.findByIdAndDelete(id)
    if (!category) {
      return NextResponse.json({ error: "Category not found" }, { status: 404 })
    }

    return NextResponse.json({ ok: true, id })
  } catch (error) {
    console.error("Delete category error:", error)
    return NextResponse.json(
      { error: "Unable to delete category" },
      { status: 500 }
    )
  }
}
