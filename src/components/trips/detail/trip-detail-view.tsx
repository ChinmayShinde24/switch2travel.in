"use client"

import type { Trip } from "@/types/trip"
import { TripDetailProvider } from "@/lib/trip-detail-context"
import { TripPhotoGrid } from "@/components/trips/detail/trip-photo-grid"
import { TripBasicInfo } from "@/components/trips/detail/trip-basic-info"
import { TripDetailTabs } from "@/components/trips/detail/trip-detail-tabs"

export function TripDetailView({ trip }: { trip: Trip }) {
  return (
    <TripDetailProvider trip={trip}>
      <div className="w-full space-y-4 px-1.5 py-3 sm:space-y-5 sm:px-2 sm:py-5 md:space-y-6 md:px-2.5 md:py-6">
        <TripPhotoGrid />
        <TripBasicInfo />
        <TripDetailTabs />
      </div>
    </TripDetailProvider>
  )
}
