import { z } from "zod"
import { CATEGORY_STATUSES } from "@/types/category"
import { slugify } from "@/lib/slug"

export const categoryImageSchema = z.object({
  url: z.string().url("Image url must be a valid URL"),
  fileId: z.string().trim().min(1, "fileId is required"),
  filePath: z.string().trim().min(1, "filePath is required"),
})

export const createCategorySchema = z
  .object({
    name: z.string().trim().min(1, "Name is required").max(80),
    image: categoryImageSchema,
    status: z.enum(CATEGORY_STATUSES).optional(),
  })
  .transform((value) => ({
    name: value.name,
    image: value.image,
    status: value.status ?? ("active" as const),
    slug: slugify(value.name),
  }))

export const updateCategorySchema = z.object({
  name: z.string().trim().min(1).max(80).optional(),
  image: categoryImageSchema.optional(),
})

export const updateCategoryStatusSchema = z.object({
  status: z.enum(CATEGORY_STATUSES),
})
