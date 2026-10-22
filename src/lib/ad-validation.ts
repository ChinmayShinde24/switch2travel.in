import { z } from "zod"
import { AD_STATUSES } from "@/types/ad"

export const adImageSchema = z.object({
  url: z.string().url("Image url must be a valid URL"),
  fileId: z.string().trim().min(1, "fileId is required"),
  filePath: z.string().trim().min(1, "filePath is required"),
})

const objectIdString = z
  .string()
  .trim()
  .regex(/^[a-fA-F0-9]{24}$/, "tripId must be a valid id")

export const createAdSchema = z
  .object({
    title: z.string().trim().min(1, "Title is required").max(120),
    image: adImageSchema,
    tripId: objectIdString,
    status: z.enum(AD_STATUSES).optional(),
    sortOrder: z.number().int().min(0).max(999).optional(),
  })
  .transform((value) => ({
    title: value.title,
    image: value.image,
    tripId: value.tripId,
    status: value.status ?? ("active" as const),
    sortOrder: value.sortOrder ?? 0,
  }))

export const updateAdSchema = z.object({
  title: z.string().trim().min(1).max(120).optional(),
  image: adImageSchema.optional(),
  tripId: objectIdString.optional(),
  sortOrder: z.number().int().min(0).max(999).optional(),
})

export const updateAdStatusSchema = z.object({
  status: z.enum(AD_STATUSES),
})

/** Soft cap so the home carousel stays focused. */
export const MAX_ACTIVE_ADS = 4
