import { z } from "zod"
import { CITY_STATUSES } from "@/types/city"
import { slugify } from "@/lib/slug"

export const cityImageSchema = z.object({
  url: z.string().url("Image url must be a valid URL"),
  fileId: z.string().trim().min(1, "fileId is required"),
  filePath: z.string().trim().min(1, "filePath is required"),
})

export const createCitySchema = z
  .object({
    name: z.string().trim().min(1, "Name is required").max(80),
    image: cityImageSchema,
    status: z.enum(CITY_STATUSES).optional(),
  })
  .transform((value) => ({
    name: value.name,
    image: value.image,
    status: value.status ?? ("active" as const),
    slug: slugify(value.name),
  }))

export const updateCitySchema = z.object({
  name: z.string().trim().min(1).max(80).optional(),
  image: cityImageSchema.optional(),
})

export const updateCityStatusSchema = z.object({
  status: z.enum(CITY_STATUSES),
})
