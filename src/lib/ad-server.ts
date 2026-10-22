import { Types } from "mongoose"
import type { Ad, AdImage, AdTripSummary } from "@/types/ad"
import type { AdDocument } from "@/models/Ad"
import { Ad as AdModel } from "@/models/Ad"
import { Trip as TripModel } from "@/models/Trip"

function toImage(value: unknown): AdImage {
  const image = value as Partial<AdImage>
  return {
    url: image.url ?? "",
    fileId: image.fileId ?? "",
    filePath: image.filePath ?? "",
  }
}

export async function resolveAdTripSummary(
  tripId: Types.ObjectId | string
): Promise<AdTripSummary | null> {
  const doc = await TripModel.findById(tripId).lean()
  if (!doc) return null
  return {
    id: String(doc._id),
    title: doc.title,
    slug: doc.slug,
  }
}

export async function toPublicAd(doc: AdDocument): Promise<Ad> {
  const trip = await resolveAdTripSummary(doc.tripId)
  return {
    id: String(doc._id),
    title: doc.title,
    image: toImage(doc.image),
    tripId: String(doc.tripId),
    trip,
    status: doc.status as Ad["status"],
    sortOrder: doc.sortOrder ?? 0,
    createdAt: new Date(doc.createdAt).toISOString(),
    updatedAt: new Date(doc.updatedAt).toISOString(),
  }
}

export async function toPublicAds(docs: AdDocument[]): Promise<Ad[]> {
  return Promise.all(docs.map((doc) => toPublicAd(doc)))
}

export async function assertTripExistsForAd(tripId: string) {
  const doc = await TripModel.findById(tripId).lean()
  if (!doc) {
    return { ok: false as const, error: "Trip not found" }
  }
  return { ok: true as const, trip: doc }
}

/** Active ads with a resolvable trip, ordered for the home carousel. */
export async function listActiveAds(): Promise<Ad[]> {
  const docs = await AdModel.find({ status: "active" }).sort({
    sortOrder: 1,
    createdAt: -1,
  })
  const ads = await toPublicAds(docs)
  return ads.filter((ad) => ad.trip?.slug)
}

export function adImageKitFolder() {
  return "/switch2travel/ads"
}
