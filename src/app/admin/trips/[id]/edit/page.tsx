"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { toast } from "sonner"
import type { Trip } from "@/types/trip"
import { TripForm } from "@/components/admin/trip-form"
import { SwitchLoader } from "@/components/switch-loader"

async function parseError(response: Response) {
  const data = (await response.json().catch(() => null)) as {
    error?: string
  } | null
  return data?.error ?? "Something went wrong"
}

export default function AdminEditTripPage() {
  const params = useParams<{ id: string }>()
  const router = useRouter()
  const [trip, setTrip] = useState<Trip | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const id = params.id
    if (!id) return

    void (async () => {
      try {
        const response = await fetch(`/api/admin/trips/${id}`, {
          credentials: "include",
          cache: "no-store",
        })
        if (!response.ok) throw new Error(await parseError(response))
        const data = (await response.json()) as { trip: Trip }
        setTrip(data.trip)
      } catch (error) {
        toast.error(error instanceof Error ? error.message : "Failed to load trip")
        router.replace("/admin/trips")
      } finally {
        setLoading(false)
      }
    })()
  }, [params.id, router])

  if (loading || !trip) {
    return (
      <div className="flex min-h-[320px] items-center justify-center">
        <SwitchLoader height={200} label="Loading trip..." />
      </div>
    )
  }

  return <TripForm mode="edit" tripId={trip.id} initialTrip={trip} />
}
