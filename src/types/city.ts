export const CITY_STATUSES = ["active", "inactive"] as const

export type CityStatus = (typeof CITY_STATUSES)[number]

export type CityImage = {
  url: string
  fileId: string
  filePath: string
}

export type City = {
  id: string
  name: string
  slug: string
  image: CityImage
  status: CityStatus
  createdAt: string
  updatedAt: string
}

export type CreateCityInput = {
  name: string
  image: CityImage
  status?: CityStatus
}

export type UpdateCityInput = {
  name?: string
  image?: CityImage
}

export type UpdateCityStatusInput = {
  status: CityStatus
}
