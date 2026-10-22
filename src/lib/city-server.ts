import { Types } from "mongoose"
import { slugify } from "@/lib/slug"
import type { City, CityImage } from "@/types/city"
import type { CityDocument } from "@/models/City"
import { City as CityModel } from "@/models/City"

function toImage(value: unknown): CityImage {
  const image = value as Partial<CityImage>
  return {
    url: image.url ?? "",
    fileId: image.fileId ?? "",
    filePath: image.filePath ?? "",
  }
}

export function toPublicCity(doc: CityDocument): City {
  return {
    id: String(doc._id),
    name: doc.name,
    slug: doc.slug,
    image: toImage(doc.image),
    status: doc.status as City["status"],
    createdAt: new Date(doc.createdAt).toISOString(),
    updatedAt: new Date(doc.updatedAt).toISOString(),
  }
}

export async function ensureUniqueCitySlug(
  baseSlug: string,
  excludeId?: string
) {
  let slug = baseSlug || "city"
  let attempt = 1

  while (true) {
    const filter: Record<string, unknown> = { slug }
    if (excludeId) {
      filter._id = { $ne: new Types.ObjectId(excludeId) }
    }

    const existing = await CityModel.findOne(filter as never).lean()
    if (!existing) return slug

    attempt += 1
    slug = `${baseSlug}-${attempt}`
  }
}

export function slugFromCityName(name: string) {
  return slugify(name)
}

export async function listActiveCities(): Promise<City[]> {
  const docs = await CityModel.find({ status: "active" }).sort({
    createdAt: -1,
  })
  return docs.map(toPublicCity)
}

export async function getActiveCityBySlug(slug: string): Promise<City | null> {
  const doc = await CityModel.findOne({
    slug: slug.toLowerCase(),
    status: "active",
  })
  if (!doc) return null
  return toPublicCity(doc)
}

export async function assertCityExists(cityId: string) {
  const doc = await CityModel.findById(cityId).lean()
  if (!doc) {
    return { ok: false as const, error: "City not found" }
  }
  return { ok: true as const, city: doc }
}
