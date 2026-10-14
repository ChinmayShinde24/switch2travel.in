export const TRIP_CATEGORY_ACCENTS = [
  "cyan",
  "amber",
  "rose",
  "emerald",
  "violet",
] as const

export type TripCategoryAccent = (typeof TRIP_CATEGORY_ACCENTS)[number]

/** Shape used by the home category rail UI. */
export type TripCategory = {
  id: string
  label: string
  href: string
  image: string
  accent: TripCategoryAccent
}
