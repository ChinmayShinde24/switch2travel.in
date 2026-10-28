/** ImageKit asset stored on trip documents. */
export type TripImage = {
  url: string
  fileId: string
  filePath: string
}

export const TRIP_STATUSES = ["draft", "published"] as const
export type TripStatus = (typeof TRIP_STATUSES)[number]

export const TRIP_VISIBILITIES = ["active", "inactive"] as const
export type TripVisibility = (typeof TRIP_VISIBILITIES)[number]

export const TRIP_DISTANCE_UNITS = ["km", "m", "mi"] as const
export type TripDistanceUnit = (typeof TRIP_DISTANCE_UNITS)[number]

export type TripDistance = {
  value: number
  unit: TripDistanceUnit
}

export type TripItineraryDay = {
  day: number
  title: string
  distance?: TripDistance
  /** Rich HTML content for the day's pointers / body. */
  points: string
}

export type TripFaq = {
  question: string
  answer: string
}

/** Lightweight category/city summary on public/admin trip payloads. */
export type TripCategorySummary = {
  id: string
  name: string
  slug: string
}

export type TripCitySummary = {
  id: string
  name: string
  slug: string
}

export type Trip = {
  id: string
  title: string
  slug: string
  /** First category — kept for older clients. */
  categoryId: string
  category: TripCategorySummary | null
  categoryIds: string[]
  categories: TripCategorySummary[]
  cityId: string | null
  city: TripCitySummary | null
  status: TripStatus
  visibility: TripVisibility
  cardImage: TripImage
  pickup: string
  drop: string
  durationDays: number
  startingPrice: number
  heroImage: TripImage
  galleryImages: TripImage[]
  /** Rich HTML overview. */
  overview: string
  itinerary: TripItineraryDay[]
  /** Rich HTML policy / list sections. */
  inclusions: string
  exclusions: string
  cancellationPolicy: string
  paymentPolicy: string
  faqs: TripFaq[]
  metaTitle?: string
  metaDescription?: string
  createdAt: string
  updatedAt: string
}

export type CreateTripInput = {
  title: string
  categoryIds: string[]
  cityId: string
  status?: TripStatus
  visibility?: TripVisibility
  cardImage: TripImage
  pickup: string
  drop: string
  durationDays: number
  startingPrice: number
  heroImage: TripImage
  galleryImages?: TripImage[]
  overview: string
  itinerary: TripItineraryDay[]
  inclusions?: string
  exclusions?: string
  cancellationPolicy?: string
  paymentPolicy?: string
  faqs?: TripFaq[]
  metaTitle?: string
  metaDescription?: string
}

export type UpdateTripInput = {
  title?: string
  categoryIds?: string[]
  cityId?: string
  cardImage?: TripImage
  pickup?: string
  drop?: string
  durationDays?: number
  startingPrice?: number
  heroImage?: TripImage
  galleryImages?: TripImage[]
  overview?: string
  itinerary?: TripItineraryDay[]
  inclusions?: string
  exclusions?: string
  cancellationPolicy?: string
  paymentPolicy?: string
  faqs?: TripFaq[]
  metaTitle?: string | null
  metaDescription?: string | null
}

export type UpdateTripStatusInput = {
  status: TripStatus
}

export type UpdateTripVisibilityInput = {
  visibility: TripVisibility
}
