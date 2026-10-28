"use client"

import { useCallback, useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { toast } from "sonner"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  Add01Icon,
  Delete02Icon,
  PencilEdit01Icon,
} from "@hugeicons/core-free-icons"
import type { Trip, TripStatus, TripVisibility } from "@/types/trip"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

async function parseError(response: Response) {
  const data = (await response.json().catch(() => null)) as {
    error?: string
  } | null
  return data?.error ?? "Something went wrong"
}

export function TripsPanel() {
  const [trips, setTrips] = useState<Trip[]>([])
  const [loading, setLoading] = useState(true)
  const [busyId, setBusyId] = useState<string | null>(null)

  const load = useCallback(async () => {
    try {
      const response = await fetch("/api/admin/trips", {
        credentials: "include",
        cache: "no-store",
      })
      if (!response.ok) throw new Error(await parseError(response))
      const data = (await response.json()) as { trips: Trip[] }
      setTrips(data.trips)
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to load trips")
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    void load()
  }, [load])

  async function setStatus(trip: Trip, status: TripStatus) {
    setBusyId(trip.id)
    try {
      const response = await fetch(`/api/admin/trips/${trip.id}/status`, {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      })
      if (!response.ok) throw new Error(await parseError(response))
      toast.success(`Marked ${status}`)
      await load()
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Status update failed")
    } finally {
      setBusyId(null)
    }
  }

  async function setVisibility(trip: Trip, visibility: TripVisibility) {
    setBusyId(trip.id)
    try {
      const response = await fetch(`/api/admin/trips/${trip.id}/visibility`, {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ visibility }),
      })
      if (!response.ok) throw new Error(await parseError(response))
      toast.success(`Marked ${visibility}`)
      await load()
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Visibility update failed"
      )
    } finally {
      setBusyId(null)
    }
  }

  async function onDelete(trip: Trip) {
    if (!window.confirm(`Delete “${trip.title}”? This cannot be undone.`)) {
      return
    }
    setBusyId(trip.id)
    try {
      const response = await fetch(`/api/admin/trips/${trip.id}`, {
        method: "DELETE",
        credentials: "include",
      })
      if (!response.ok) throw new Error(await parseError(response))
      toast.success("Trip deleted")
      await load()
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Delete failed")
    } finally {
      setBusyId(null)
    }
  }

  return (
    <div className="mx-auto w-full max-w-6xl">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="font-open-sans text-[11px] font-semibold tracking-[0.18em] text-sky-700 uppercase">
            Primary workspace
          </p>
          <h2 className="font-display mt-1 text-xl font-semibold tracking-tight text-slate-900">
            Trips
          </h2>
          <p className="font-lato mt-1 max-w-lg text-sm text-slate-500">
            Create, edit, and publish trips. Draft stays private; published +
            active shows on the site.
          </p>
        </div>
        <Button
          size="sm"
          className="rounded-xl bg-sky-600 text-white hover:bg-sky-700"
          nativeButton={false}
          render={<Link href="/admin/trips/new" />}
        >
          <HugeiconsIcon icon={Add01Icon} strokeWidth={2} data-icon="inline-start" />
          New trip
        </Button>
      </div>

      <div className="mt-5 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        {loading ? (
          <p className="font-lato px-4 py-10 text-center text-sm text-slate-500">
            Loading trips…
          </p>
        ) : trips.length === 0 ? (
          <div className="px-4 py-12 text-center">
            <p className="font-display text-sm font-medium text-slate-700">
              No trips yet
            </p>
            <p className="font-lato mt-1 text-sm text-slate-500">
              Add your first trip card, itinerary, and policies.
            </p>
            <Button
              size="sm"
              className="mt-4 rounded-xl bg-sky-600 text-white hover:bg-sky-700"
              nativeButton={false}
              render={<Link href="/admin/trips/new" />}
            >
              Create trip
            </Button>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="w-[56px] pl-4">Card</TableHead>
                <TableHead>Trip</TableHead>
                <TableHead>Categories</TableHead>
                <TableHead>City</TableHead>
                <TableHead className="w-[100px]">Status</TableHead>
                <TableHead className="w-[100px]">Visibility</TableHead>
                <TableHead className="w-[110px]">Price</TableHead>
                <TableHead className="w-[220px] pr-4 text-right">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {trips.map((trip) => {
                const busy = busyId === trip.id
                return (
                  <TableRow key={trip.id}>
                    <TableCell className="pl-4">
                      <div className="relative size-10 overflow-hidden rounded-lg bg-slate-100 ring-1 ring-slate-200">
                        <Image
                          src={trip.cardImage.url}
                          alt=""
                          fill
                          className="object-cover"
                          sizes="40px"
                          unoptimized
                        />
                      </div>
                    </TableCell>
                    <TableCell>
                      <p className="font-display max-w-[260px] truncate font-medium text-slate-900">
                        {trip.title}
                      </p>
                      <p className="font-lato font-mono text-[11px] text-slate-500">
                        /{trip.slug}
                      </p>
                    </TableCell>
                    <TableCell className="font-lato max-w-[220px] truncate text-sm text-slate-600">
                      {trip.categories?.length
                        ? trip.categories.map((c) => c.name).join(", ")
                        : (trip.category?.name ?? "—")}
                    </TableCell>
                    <TableCell className="font-lato text-sm text-slate-600">
                      {trip.city?.name ?? "—"}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          trip.status === "published" ? "default" : "secondary"
                        }
                        className={
                          trip.status === "published"
                            ? "bg-sky-600 text-white"
                            : undefined
                        }
                      >
                        {trip.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          trip.visibility === "active" ? "default" : "secondary"
                        }
                        className={
                          trip.visibility === "active"
                            ? "bg-emerald-600 text-white"
                            : undefined
                        }
                      >
                        {trip.visibility}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-lato text-sm text-slate-700">
                      ₹{trip.startingPrice.toLocaleString("en-IN")}
                    </TableCell>
                    <TableCell className="pr-4">
                      <div className="flex flex-wrap items-center justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="icon-xs"
                          disabled={busy}
                          nativeButton={false}
                          render={
                            <Link href={`/admin/trips/${trip.id}/edit`} />
                          }
                          aria-label={`Edit ${trip.title}`}
                        >
                          <HugeiconsIcon icon={PencilEdit01Icon} strokeWidth={2} />
                        </Button>
                        <Button
                          variant="outline"
                          size="xs"
                          disabled={busy}
                          className="rounded-lg"
                          onClick={() =>
                            void setStatus(
                              trip,
                              trip.status === "published" ? "draft" : "published"
                            )
                          }
                        >
                          {trip.status === "published" ? "Unpublish" : "Publish"}
                        </Button>
                        <Button
                          variant="outline"
                          size="xs"
                          disabled={busy}
                          className="rounded-lg"
                          onClick={() =>
                            void setVisibility(
                              trip,
                              trip.visibility === "active"
                                ? "inactive"
                                : "active"
                            )
                          }
                        >
                          {trip.visibility === "active" ? "Hide" : "Show"}
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon-xs"
                          disabled={busy}
                          onClick={() => void onDelete(trip)}
                          aria-label={`Delete ${trip.title}`}
                          className="text-destructive hover:text-destructive"
                        >
                          <HugeiconsIcon icon={Delete02Icon} strokeWidth={2} />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  )
}
