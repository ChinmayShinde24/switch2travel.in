import { heroCities as cities } from "@/data/hero-destinations"

export const heroCities = cities
export type HeroCity = (typeof heroCities)[number]
