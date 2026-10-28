import { z } from "zod"
import {
  TRIP_DISTANCE_UNITS,
  TRIP_STATUSES,
  TRIP_VISIBILITIES,
} from "@/types/trip"
import { slugify } from "@/lib/slug"

export const tripImageSchema = z.object({
  url: z.string().url("Image url must be a valid URL"),
  fileId: z.string().trim().min(1, "fileId is required"),
  filePath: z.string().trim().min(1, "filePath is required"),
})

const richTextSchema = z.string().max(20000)

const tripDistanceSchema = z.object({
  value: z.number().min(0, "Distance must be >= 0"),
  unit: z.enum(TRIP_DISTANCE_UNITS),
})

const tripItineraryDaySchema = z.object({
  day: z.number().int().min(1, "Day must be >= 1"),
  title: z.string().trim().min(1, "Itinerary title is required").max(200),
  distance: tripDistanceSchema.optional(),
  points: richTextSchema.default(""),
})

const tripFaqSchema = z.object({
  question: z.string().trim().min(1, "FAQ question is required").max(300),
  answer: z.string().trim().min(1, "FAQ answer is required").max(10000),
})

function uniqueItineraryDays(
  days: { day: number }[],
  ctx: z.RefinementCtx
) {
  const seen = new Set<number>()
  for (const item of days) {
    if (seen.has(item.day)) {
      ctx.addIssue({
        code: "custom",
        message: `Duplicate itinerary day: ${item.day}`,
        path: ["itinerary"],
      })
      return
    }
    seen.add(item.day)
  }
}

const objectIdString = z
  .string()
  .trim()
  .regex(/^[a-fA-F0-9]{24}$/, "Invalid category id")

function uniqueCategoryIds(
  categoryIds?: string[],
  categoryId?: string
) {
  const ids = [
    ...(categoryIds ?? []),
    ...(categoryId ? [categoryId] : []),
  ]
  return [...new Set(ids)]
}

export const createTripSchema = z
  .object({
    title: z.string().trim().min(1, "Title is required").max(160),
    categoryIds: z.array(objectIdString).optional(),
    categoryId: objectIdString.optional(),
    cityId: objectIdString,
    status: z.enum(TRIP_STATUSES).optional(),
    visibility: z.enum(TRIP_VISIBILITIES).optional(),
    cardImage: tripImageSchema,
    pickup: z.string().trim().min(1, "Pickup is required").max(120),
    drop: z.string().trim().min(1, "Drop is required").max(120),
    durationDays: z.number().int().min(1, "Duration must be at least 1 day"),
    startingPrice: z.number().min(0, "Starting price must be >= 0"),
    heroImage: tripImageSchema,
    galleryImages: z.array(tripImageSchema).optional(),
    overview: z.string().trim().min(1, "Overview is required").max(20000),
    itinerary: z
      .array(tripItineraryDaySchema)
      .min(1, "At least one itinerary day is required"),
    inclusions: richTextSchema.optional(),
    exclusions: richTextSchema.optional(),
    cancellationPolicy: richTextSchema.optional(),
    paymentPolicy: richTextSchema.optional(),
    faqs: z.array(tripFaqSchema).optional(),
    metaTitle: z.string().trim().max(60).optional(),
    metaDescription: z.string().trim().max(160).optional(),
  })
  .superRefine((value, ctx) => {
    uniqueItineraryDays(value.itinerary, ctx)
    const ids = uniqueCategoryIds(value.categoryIds, value.categoryId)
    if (ids.length === 0) {
      ctx.addIssue({
        code: "custom",
        message: "Select at least one category",
        path: ["categoryIds"],
      })
    }
  })
  .transform((value) => {
    const categoryIds = uniqueCategoryIds(value.categoryIds, value.categoryId)
    return {
      title: value.title,
      categoryIds,
      categoryId: categoryIds[0],
      cityId: value.cityId,
      status: value.status ?? ("draft" as const),
      visibility: value.visibility ?? ("active" as const),
      cardImage: value.cardImage,
      pickup: value.pickup,
      drop: value.drop,
      durationDays: value.durationDays,
      startingPrice: value.startingPrice,
      heroImage: value.heroImage,
      galleryImages: value.galleryImages ?? [],
      overview: value.overview,
      itinerary: value.itinerary,
      inclusions: value.inclusions ?? "",
      exclusions: value.exclusions ?? "",
      cancellationPolicy: value.cancellationPolicy ?? "",
      paymentPolicy: value.paymentPolicy ?? "",
      faqs: value.faqs ?? [],
      metaTitle: value.metaTitle,
      metaDescription: value.metaDescription,
      slug: slugify(value.title),
    }
  })

export const updateTripSchema = z
  .object({
    title: z.string().trim().min(1).max(160).optional(),
    categoryIds: z.array(objectIdString).optional(),
    categoryId: objectIdString.optional(),
    cityId: objectIdString.optional(),
    cardImage: tripImageSchema.optional(),
    pickup: z.string().trim().min(1).max(120).optional(),
    drop: z.string().trim().min(1).max(120).optional(),
    durationDays: z.number().int().min(1).optional(),
    startingPrice: z.number().min(0).optional(),
    heroImage: tripImageSchema.optional(),
    galleryImages: z.array(tripImageSchema).optional(),
    overview: z.string().trim().min(1).max(20000).optional(),
    itinerary: z.array(tripItineraryDaySchema).min(1).optional(),
    inclusions: richTextSchema.optional(),
    exclusions: richTextSchema.optional(),
    cancellationPolicy: richTextSchema.optional(),
    paymentPolicy: richTextSchema.optional(),
    faqs: z.array(tripFaqSchema).optional(),
    metaTitle: z.string().trim().max(60).nullable().optional(),
    metaDescription: z.string().trim().max(160).nullable().optional(),
  })
  .superRefine((value, ctx) => {
    if (value.itinerary) uniqueItineraryDays(value.itinerary, ctx)
    if (value.categoryIds === undefined && value.categoryId === undefined) {
      return
    }
    const ids = uniqueCategoryIds(value.categoryIds, value.categoryId)
    if (ids.length === 0) {
      ctx.addIssue({
        code: "custom",
        message: "Select at least one category",
        path: ["categoryIds"],
      })
    }
  })
  .transform((value) => {
    if (value.categoryIds === undefined && value.categoryId === undefined) {
      return value
    }
    const categoryIds = uniqueCategoryIds(value.categoryIds, value.categoryId)
    return {
      ...value,
      categoryIds,
      categoryId: categoryIds[0],
    }
  })

export const updateTripStatusSchema = z.object({
  status: z.enum(TRIP_STATUSES),
})

export const updateTripVisibilitySchema = z.object({
  visibility: z.enum(TRIP_VISIBILITIES),
})
