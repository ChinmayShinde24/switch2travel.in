"use client"

import { createContext, useContext, useMemo, useState } from "react"
import type { Trip, TripImage } from "@/types/trip"

export type TripDetailTab =
  | "overview"
  | "itinerary"
  | "inclusions"
  | "cancellation"
  | "payment"
  | "faqs"

type TripDetailContextValue = {
  trip: Trip
  /** Hero + gallery (deduped) for the photo grid / lightbox. */
  gallery: TripImage[]
  activeTab: TripDetailTab
  setActiveTab: (tab: TripDetailTab) => void
  galleryOpen: boolean
  setGalleryOpen: (open: boolean) => void
}

const TripDetailContext = createContext<TripDetailContextValue | null>(null)

function buildGallery(trip: Trip): TripImage[] {
  const seen = new Set<string>()
  const images: TripImage[] = []

  for (const image of [trip.heroImage, ...trip.galleryImages, trip.cardImage]) {
    if (!image?.url || seen.has(image.url)) continue
    seen.add(image.url)
    images.push(image)
  }

  return images
}

export function TripDetailProvider({
  trip,
  children,
}: {
  trip: Trip
  children: React.ReactNode
}) {
  const [activeTab, setActiveTab] = useState<TripDetailTab>("overview")
  const [galleryOpen, setGalleryOpen] = useState(false)

  const value = useMemo<TripDetailContextValue>(
    () => ({
      trip,
      gallery: buildGallery(trip),
      activeTab,
      setActiveTab,
      galleryOpen,
      setGalleryOpen,
    }),
    [trip, activeTab, galleryOpen]
  )

  return (
    <TripDetailContext.Provider value={value}>
      {children}
    </TripDetailContext.Provider>
  )
}

export function useTripDetail() {
  const ctx = useContext(TripDetailContext)
  if (!ctx) {
    throw new Error("useTripDetail must be used within TripDetailProvider")
  }
  return ctx
}
