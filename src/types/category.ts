export const CATEGORY_STATUSES = ["active", "inactive"] as const

export type CategoryStatus = (typeof CATEGORY_STATUSES)[number]

/** ImageKit asset stored on the category document. */
export type CategoryImage = {
  url: string
  fileId: string
  filePath: string
}

export type Category = {
  id: string
  name: string
  slug: string
  image: CategoryImage
  status: CategoryStatus
  createdAt: string
  updatedAt: string
}

export type CreateCategoryInput = {
  name: string
  image: CategoryImage
  status?: CategoryStatus
}

export type UpdateCategoryInput = {
  name?: string
  image?: CategoryImage
}

export type UpdateCategoryStatusInput = {
  status: CategoryStatus
}
