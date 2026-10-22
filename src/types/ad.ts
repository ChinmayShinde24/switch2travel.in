/** ImageKit asset for promotional ad banners. */
export type AdImage = {
  url: string
  fileId: string
  filePath: string
}

export const AD_STATUSES = ["active", "inactive"] as const
export type AdStatus = (typeof AD_STATUSES)[number]

export type AdTripSummary = {
  id: string
  title: string
  slug: string
}

export type Ad = {
  id: string
  title: string
  image: AdImage
  tripId: string
  trip: AdTripSummary | null
  status: AdStatus
  sortOrder: number
  createdAt: string
  updatedAt: string
}

export type CreateAdInput = {
  title: string
  image: AdImage
  tripId: string
  status?: AdStatus
  sortOrder?: number
}

export type UpdateAdInput = {
  title?: string
  image?: AdImage
  tripId?: string
  sortOrder?: number
}

export type UpdateAdStatusInput = {
  status: AdStatus
}
