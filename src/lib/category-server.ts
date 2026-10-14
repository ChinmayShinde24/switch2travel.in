import { Types } from "mongoose"
import { slugify } from "@/lib/slug"
import type { Category, CategoryImage } from "@/types/category"
import type { CategoryDocument } from "@/models/Category"
import { Category as CategoryModel } from "@/models/Category"
import type { TripCategory } from "@/types/trip-category"
import { TRIP_CATEGORY_ACCENTS } from "@/types/trip-category"

function toImage(value: unknown): CategoryImage {
  const image = value as Partial<CategoryImage>
  return {
    url: image.url ?? "",
    fileId: image.fileId ?? "",
    filePath: image.filePath ?? "",
  }
}

export function toPublicCategory(doc: CategoryDocument): Category {
  return {
    id: String(doc._id),
    name: doc.name,
    slug: doc.slug,
    image: toImage(doc.image),
    status: doc.status as Category["status"],
    createdAt: new Date(doc.createdAt).toISOString(),
    updatedAt: new Date(doc.updatedAt).toISOString(),
  }
}

export async function ensureUniqueCategorySlug(
  baseSlug: string,
  excludeId?: string
) {
  let slug = baseSlug || "category"
  let attempt = 1

  while (true) {
    const filter: Record<string, unknown> = { slug }
    if (excludeId) {
      filter._id = { $ne: new Types.ObjectId(excludeId) }
    }

    const existing = await CategoryModel.findOne(filter as never).lean()
    if (!existing) return slug

    attempt += 1
    slug = `${baseSlug}-${attempt}`
  }
}

export function slugFromName(name: string) {
  return slugify(name)
}

/** Active categories only — used by public home rail and GET /api/categories. */
export async function listActiveCategories(): Promise<Category[]> {
  const docs = await CategoryModel.find({ status: "active" }).sort({
    createdAt: -1,
  })
  return docs.map(toPublicCategory)
}

/** Map API category → home rail item (accent cycles by index). */
export function toRailCategory(
  category: Category,
  index: number
): TripCategory {
  return {
    id: category.id,
    label: category.name,
    href: `/trips?category=${category.slug}`,
    image: category.image.url,
    accent: TRIP_CATEGORY_ACCENTS[index % TRIP_CATEGORY_ACCENTS.length]!,
  }
}
