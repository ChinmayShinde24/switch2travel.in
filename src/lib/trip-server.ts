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

export async function assertCategoryExists(categoryId: string) {
  const doc = await Category.findById(categoryId).lean()
  if (!doc) {
    return { ok: false as const, error: "Category not found" }
  }
  return { ok: true as const, category: doc }
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
  const [category, city] = await Promise.all([
    resolveTripCategorySummary(doc.categoryId),
    resolveTripCitySummary(doc.cityId),
  ])

  const trip: Trip = {
    id: String(doc._id),
    title: doc.title,
    slug: doc.slug,
    categoryId: String(doc.categoryId),
    category,
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
  if (options.categoryId) filter.categoryId = options.categoryId
  if (options.cityId) filter.cityId = options.cityId
  const docs = await TripModel.find(filter).sort({ createdAt: -1 })
  return toPublicTrips(docs)
}
