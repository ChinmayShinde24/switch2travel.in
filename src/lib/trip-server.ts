import { Types } from "mongoose"
import { slugify } from "@/lib/slug"
import type {
  Trip,
  TripCategorySummary,
  TripCitySummary,
  TripDistanceUnit,
  TripFaq,
  TripImage,
  TripItineraryDay,
} from "@/types/trip"
import type { TripDocument } from "@/models/Trip"
import { Trip as TripModel } from "@/models/Trip"
import { Category } from "@/models/Category"
import { City } from "@/models/City"
import { assertCityExists } from "@/lib/city-server"

function toImage(value: unknown): TripImage {
  const image = value as Partial<TripImage>
  return {
    url: image.url ?? "",
    fileId: image.fileId ?? "",
    filePath: image.filePath ?? "",
  }
}

function escapeHtml(text: string) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
}

/** Normalize rich text: string as-is, legacy string[] → HTML bullet list. */
function toRichText(value: unknown): string {
  if (typeof value === "string") return value
  if (Array.isArray(value)) {
    const items = value.map(String).map((s) => s.trim()).filter(Boolean)
    if (items.length === 0) return ""
    return `<ul>${items
      .map((item) => `<li><p>${escapeHtml(item)}</p></li>`)
      .join("")}</ul>`
  }
  return ""
}

function toItinerary(value: unknown): TripItineraryDay[] {
  if (!Array.isArray(value)) return []
  return value.map((raw) => {
    const day = raw as {
      day?: number
      title?: string
      distance?: { value?: number; unit?: TripDistanceUnit }
      points?: unknown
    }
    const item: TripItineraryDay = {
      day: Number(day.day ?? 0),
      title: day.title ?? "",
      points: toRichText(day.points),
    }
    if (
      day.distance &&
      typeof day.distance.value === "number" &&
      day.distance.unit
    ) {
      item.distance = {
        value: day.distance.value,
        unit: day.distance.unit,
      }
    }
    return item
  })
}

function toFaqs(value: unknown): TripFaq[] {
  if (!Array.isArray(value)) return []
  return value.map((raw) => {
    const faq = raw as { question?: string; answer?: string }
    return {
      question: faq.question ?? "",
      answer: faq.answer ?? "",
    }
  })
}

/** ImageKit folder for a trip: /switch2travel/trips/<tripKey> */
export function tripImageKitFolder(tripKey: string) {
  const key = tripKey
    .trim()
    .replace(/[^a-zA-Z0-9/_-]/g, "-")
    .replace(/\/+/g, "/")
    .replace(/^-+|-+$/g, "")
  return `/switch2travel/trips/${key || "untitled"}`
}

export function slugFromTitle(title: string) {
  return slugify(title)
}

export async function ensureUniqueTripSlug(
  baseSlug: string,
  excludeId?: string
) {
  let slug = baseSlug || "trip"
  let attempt = 1

  while (true) {
    const filter: Record<string, unknown> = { slug }
    if (excludeId) {
      filter._id = { $ne: new Types.ObjectId(excludeId) }
    }

    const existing = await TripModel.findOne(filter as never).lean()
    if (!existing) return slug

    attempt += 1
    slug = `${baseSlug}-${attempt}`
  }
}

export function tripCategoryIdsFromDoc(doc: {
  categoryIds?: unknown
  categoryId?: unknown
}): string[] {
  const fromArray = Array.isArray(doc.categoryIds)
    ? doc.categoryIds.map((id) => String(id))
    : []
  if (fromArray.length > 0) {
    return [...new Set(fromArray)]
  }
  if (doc.categoryId) return [String(doc.categoryId)]
  return []
}

export function categoryMatchFilter(categoryId: string) {
  const id = new Types.ObjectId(categoryId)
  return {
    $or: [{ categoryIds: id }, { categoryId: id }],
  }
}

export async function resolveTripCategorySummary(
  categoryId: Types.ObjectId | string
): Promise<TripCategorySummary | null> {
  const doc = await Category.findById(categoryId).lean()
  if (!doc) return null
  return {
    id: String(doc._id),
    name: doc.name,
    slug: doc.slug,
  }
}

export async function resolveTripCategorySummaries(
  categoryIds: string[]
): Promise<TripCategorySummary[]> {
  if (categoryIds.length === 0) return []
  const docs = await Category.find({
    _id: { $in: categoryIds },
  } as never).lean()
  const byId = new Map(docs.map((doc) => [String(doc._id), doc]))
  return categoryIds
    .map((id) => {
      const doc = byId.get(id)
      if (!doc) return null
      return {
        id: String(doc._id),
        name: doc.name,
        slug: doc.slug,
      }
    })
    .filter((item): item is TripCategorySummary => item !== null)
}

export async function assertCategoryExists(categoryId: string) {
  const doc = await Category.findById(categoryId).lean()
  if (!doc) {
    return { ok: false as const, error: "Category not found" }
  }
  return { ok: true as const, category: doc }
}

export async function assertCategoriesExist(categoryIds: string[]) {
  const unique = [...new Set(categoryIds)]
  if (unique.length === 0) {
    return { ok: false as const, error: "Select at least one category" }
  }
  const docs = await Category.find({ _id: { $in: unique } } as never).lean()
  if (docs.length !== unique.length) {
    return { ok: false as const, error: "One or more categories not found" }
  }
  return { ok: true as const }
}

export { assertCityExists }

export async function resolveTripCitySummary(
  cityId: Types.ObjectId | string | null | undefined
): Promise<TripCitySummary | null> {
  if (!cityId) return null
  const doc = await City.findById(cityId).lean()
  if (!doc) return null
  return {
    id: String(doc._id),
    name: doc.name,
    slug: doc.slug,
  }
}

export async function toPublicTrip(doc: TripDocument): Promise<Trip> {
  const categoryIds = tripCategoryIdsFromDoc(doc)
  const [categories, city] = await Promise.all([
    resolveTripCategorySummaries(categoryIds),
    resolveTripCitySummary(doc.cityId),
  ])
  const category = categories[0] ?? null

  const trip: Trip = {
    id: String(doc._id),
    title: doc.title,
    slug: doc.slug,
    categoryId: categoryIds[0] ?? "",
    category,
    categoryIds,
    categories,
    cityId: doc.cityId ? String(doc.cityId) : null,
    city,
    status: doc.status as Trip["status"],
    visibility: doc.visibility as Trip["visibility"],
    cardImage: toImage(doc.cardImage),
    pickup: doc.pickup,
    drop: doc.drop,
    durationDays: doc.durationDays,
    startingPrice: doc.startingPrice,
    heroImage: toImage(doc.heroImage),
    galleryImages: Array.isArray(doc.galleryImages)
      ? doc.galleryImages.map(toImage)
      : [],
    overview: typeof doc.overview === "string" ? doc.overview : "",
    itinerary: toItinerary(doc.itinerary),
    inclusions: toRichText(doc.inclusions),
    exclusions: toRichText(doc.exclusions),
    cancellationPolicy: toRichText(doc.cancellationPolicy),
    paymentPolicy: toRichText(doc.paymentPolicy),
    faqs: toFaqs(doc.faqs),
    createdAt: new Date(doc.createdAt).toISOString(),
    updatedAt: new Date(doc.updatedAt).toISOString(),
  }

  if (doc.metaTitle) trip.metaTitle = doc.metaTitle
  if (doc.metaDescription) trip.metaDescription = doc.metaDescription

  return trip
}

export async function toPublicTrips(docs: TripDocument[]): Promise<Trip[]> {
  return Promise.all(docs.map((doc) => toPublicTrip(doc)))
}

/** Public site filter: published and active only. */
export const PUBLIC_TRIP_FILTER = {
  status: "published",
  visibility: "active",
} as const

type ListPublishedTripsOptions = {
  categoryId?: string
  cityId?: string
}

/** Published + active trips for the public site (newest first). */
export async function listPublishedTrips(
  options: ListPublishedTripsOptions = {}
): Promise<Trip[]> {
  const filter: Record<string, unknown> = { ...PUBLIC_TRIP_FILTER }
  if (options.categoryId) {
    Object.assign(filter, categoryMatchFilter(options.categoryId))
  }
  if (options.cityId) filter.cityId = options.cityId
  const docs = await TripModel.find(filter).sort({ createdAt: -1 })
  return toPublicTrips(docs)
}
