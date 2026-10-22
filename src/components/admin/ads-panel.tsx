"use client"

import { useCallback, useEffect, useState } from "react"
import Image from "next/image"
import { toast } from "sonner"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  Add01Icon,
  Delete02Icon,
  PencilEdit01Icon,
} from "@hugeicons/core-free-icons"
import type { Ad, AdImage, AdStatus } from "@/types/ad"
import type { Trip } from "@/types/trip"
import { MAX_ACTIVE_ADS } from "@/lib/ad-validation"
import { uploadAdImage } from "@/lib/ad-upload-client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

async function parseError(response: Response) {
  const data = (await response.json().catch(() => null)) as {
    error?: string
  } | null
  return data?.error ?? "Something went wrong"
}

/** Prefer short human messages over Turbopack/stack noise in toasts. */
function readableError(error: unknown, fallback: string) {
  if (!(error instanceof Error)) return fallback
  const msg = error.message
  if (/is not a function|TURBOPACK|__TURBOPACK__/i.test(msg)) {
    return "Upload helper failed to load. Refresh the page and try again."
  }
  return msg || fallback
}

type FormState = {
  title: string
  image: AdImage | null
  tripId: string
  status: AdStatus
  sortOrder: string
}

const emptyForm: FormState = {
  title: "",
  image: null,
  tripId: "",
  status: "active",
  sortOrder: "0",
}

export function AdsPanel() {
  const [ads, setAds] = useState<Ad[]>([])
  const [trips, setTrips] = useState<Trip[]>([])
  const [loading, setLoading] = useState(true)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editing, setEditing] = useState<Ad | null>(null)
  const [form, setForm] = useState<FormState>(emptyForm)
  const [uploading, setUploading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [busyId, setBusyId] = useState<string | null>(null)
  const [fileKey, setFileKey] = useState(0)

  const activeCount = ads.filter((ad) => ad.status === "active").length

  const load = useCallback(async () => {
    try {
      const [adsRes, tripsRes] = await Promise.all([
        fetch("/api/admin/ads", { credentials: "include", cache: "no-store" }),
        fetch("/api/admin/trips", {
          credentials: "include",
          cache: "no-store",
        }),
      ])
      if (!adsRes.ok) throw new Error(await parseError(adsRes))
      if (!tripsRes.ok) throw new Error(await parseError(tripsRes))

      const adsData = (await adsRes.json()) as { ads: Ad[] }
      const tripsData = (await tripsRes.json()) as { trips: Trip[] }
      setAds(adsData.ads)
      setTrips(tripsData.trips)
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to load ads")
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    void load()
  }, [load])

  function openCreate() {
    setEditing(null)
    setForm(emptyForm)
    setDialogOpen(true)
  }

  function openEdit(ad: Ad) {
    setEditing(ad)
    setForm({
      title: ad.title,
      image: ad.image,
      tripId: ad.tripId,
      status: ad.status,
      sortOrder: String(ad.sortOrder),
    })
    setDialogOpen(true)
  }

  async function onFileChange(file: File | undefined) {
    if (!file) return
    setUploading(true)
    try {
      const image = await uploadAdImage(file)
      setForm((prev) => ({ ...prev, image }))
      toast.success("Banner uploaded")
    } catch (error) {
      toast.error(readableError(error, "Upload failed"))
    } finally {
      setUploading(false)
      setFileKey((k) => k + 1)
    }
  }

  async function onSave() {
    const title = form.title.trim()
    if (!title) {
      toast.error("Title is required")
      return
    }
    if (!form.image) {
      toast.error("Upload a banner image first")
      return
    }
    if (!form.tripId) {
      toast.error("Select a trip to link")
      return
    }

    const sortOrder = Number.parseInt(form.sortOrder, 10)
    if (Number.isNaN(sortOrder) || sortOrder < 0) {
      toast.error("Sort order must be 0 or higher")
      return
    }

    setSaving(true)
    try {
      if (editing) {
        const response = await fetch(`/api/admin/ads/${editing.id}`, {
          method: "PATCH",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title,
            image: form.image,
            tripId: form.tripId,
            sortOrder,
          }),
        })
        if (!response.ok) throw new Error(await parseError(response))
        toast.success("Ad updated")
      } else {
        const response = await fetch("/api/admin/ads", {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title,
            image: form.image,
            tripId: form.tripId,
            status: form.status,
            sortOrder,
          }),
        })
        if (!response.ok) throw new Error(await parseError(response))
        toast.success("Ad created")
      }
      setDialogOpen(false)
      setForm(emptyForm)
      setEditing(null)
      await load()
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Save failed")
    } finally {
      setSaving(false)
    }
  }

  async function toggleStatus(ad: Ad) {
    const next: AdStatus = ad.status === "active" ? "inactive" : "active"
    setBusyId(ad.id)
    try {
      const response = await fetch(`/api/admin/ads/${ad.id}/status`, {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: next }),
      })
      if (!response.ok) throw new Error(await parseError(response))
      toast.success(`Marked ${next}`)
      await load()
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Status update failed"
      )
    } finally {
      setBusyId(null)
    }
  }

  async function onDelete(ad: Ad) {
    if (!window.confirm(`Delete “${ad.title}”? This cannot be undone.`)) {
      return
    }
    setBusyId(ad.id)
    try {
      const response = await fetch(`/api/admin/ads/${ad.id}`, {
        method: "DELETE",
        credentials: "include",
      })
      if (!response.ok) throw new Error(await parseError(response))
      toast.success("Ad deleted")
      await load()
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Delete failed")
    } finally {
      setBusyId(null)
    }
  }

  return (
    <div className="mx-auto w-full max-w-5xl">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="font-open-sans text-[11px] font-semibold tracking-[0.18em] text-sky-700 uppercase">
            Home page
          </p>
          <h2 className="font-display mt-1 text-xl font-semibold tracking-tight text-slate-900">
            Ad banners
          </h2>
          <p className="font-lato mt-1 max-w-lg text-sm text-slate-500">
            Wide promotional images above “Search by city”. Up to{" "}
            {MAX_ACTIVE_ADS} active slides; each links to a trip page. Use
            ~1920×400 banners for best quality.
          </p>
        </div>
        <Button
          size="sm"
          onClick={openCreate}
          className="rounded-xl bg-sky-600 text-white hover:bg-sky-700"
        >
          <HugeiconsIcon
            icon={Add01Icon}
            strokeWidth={2}
            data-icon="inline-start"
          />
          New ad
        </Button>
      </div>

      <p className="font-lato mt-3 text-xs text-slate-500">
        Active on home:{" "}
        <span className="font-semibold text-slate-700">
          {activeCount}/{MAX_ACTIVE_ADS}
        </span>
      </p>

      <div className="mt-5 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        {loading ? (
          <p className="px-4 py-10 text-center text-sm text-slate-500">
            Loading ads…
          </p>
        ) : ads.length === 0 ? (
          <div className="px-4 py-12 text-center">
            <p className="font-display text-sm font-medium text-slate-700">
              No ads yet
            </p>
            <p className="font-lato mt-1 text-sm text-slate-500">
              Upload a wide banner and link it to a trip.
            </p>
            <Button
              size="sm"
              className="mt-4 rounded-xl bg-sky-600 text-white hover:bg-sky-700"
              onClick={openCreate}
            >
              Create ad
            </Button>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="w-[120px] pl-4">Banner</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Linked trip</TableHead>
                <TableHead className="w-[72px]">Order</TableHead>
                <TableHead className="w-[100px]">Status</TableHead>
                <TableHead className="w-[160px] pr-4 text-right">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ads.map((ad) => {
                const busy = busyId === ad.id
                return (
                  <TableRow key={ad.id}>
                    <TableCell className="pl-4">
                      <div className="relative h-12 w-[7.5rem] overflow-hidden rounded-lg bg-slate-100 ring-1 ring-slate-200">
                        <Image
                          src={ad.image.url}
                          alt=""
                          fill
                          className="object-cover object-center"
                          sizes="120px"
                          unoptimized
                        />
                      </div>
                    </TableCell>
                    <TableCell className="font-display font-medium text-slate-900">
                      {ad.title}
                    </TableCell>
                    <TableCell className="font-lato text-sm text-slate-600">
                      {ad.trip?.title ?? (
                        <span className="text-amber-600">Trip missing</span>
                      )}
                    </TableCell>
                    <TableCell className="font-mono text-xs text-slate-500">
                      {ad.sortOrder}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          ad.status === "active" ? "default" : "secondary"
                        }
                        className={
                          ad.status === "active"
                            ? "bg-emerald-600 text-white"
                            : undefined
                        }
                      >
                        {ad.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="pr-4">
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="icon-xs"
                          disabled={busy}
                          onClick={() => openEdit(ad)}
                          aria-label={`Edit ${ad.title}`}
                        >
                          <HugeiconsIcon
                            icon={PencilEdit01Icon}
                            strokeWidth={2}
                          />
                        </Button>
                        <Button
                          variant="outline"
                          size="xs"
                          disabled={busy}
                          onClick={() => void toggleStatus(ad)}
                          className="rounded-lg"
                        >
                          {ad.status === "active" ? "Disable" : "Enable"}
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon-xs"
                          disabled={busy}
                          onClick={() => void onDelete(ad)}
                          aria-label={`Delete ${ad.title}`}
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

      <Dialog
        open={dialogOpen}
        onOpenChange={(open) => {
          setDialogOpen(open)
          if (!open) {
            setEditing(null)
            setForm(emptyForm)
          }
        }}
      >
        <DialogContent className="sm:max-w-lg rounded-2xl">
          <DialogHeader>
            <DialogTitle>{editing ? "Edit ad" : "New ad"}</DialogTitle>
            <DialogDescription>
              Upload a wide banner (~1920×400). The whole image is clickable and
              opens the linked trip.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="ad-title">Title</Label>
              <Input
                id="ad-title"
                value={form.title}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, title: e.target.value }))
                }
                placeholder="e.g. Thailand group trip"
                className="rounded-xl"
                maxLength={120}
              />
            </div>

            <div className="grid gap-2">
              <Label>Linked trip</Label>
              <Select
                value={form.tripId || null}
                onValueChange={(value) => {
                  if (typeof value === "string") {
                    setForm((prev) => ({ ...prev, tripId: value }))
                  }
                }}
              >
                <SelectTrigger className="w-full rounded-xl">
                  <SelectValue placeholder="Select a trip">
                    {(value) => {
                      if (typeof value !== "string" || !value) {
                        return "Select a trip"
                      }
                      return (
                        trips.find((t) => t.id === value)?.title ??
                        "Select a trip"
                      )
                    }}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {trips.map((trip) => (
                    <SelectItem key={trip.id} value={trip.id}>
                      {trip.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="grid gap-2">
                <Label htmlFor="ad-sort">Sort order</Label>
                <Input
                  id="ad-sort"
                  type="number"
                  min={0}
                  value={form.sortOrder}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      sortOrder: e.target.value,
                    }))
                  }
                  className="rounded-xl"
                />
              </div>
              {!editing && (
                <div className="grid gap-2">
                  <Label>Status</Label>
                  <Select
                    value={form.status}
                    onValueChange={(value) => {
                      if (value === "active" || value === "inactive") {
                        setForm((prev) => ({ ...prev, status: value }))
                      }
                    }}
                  >
                    <SelectTrigger className="w-full rounded-xl">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="ad-image">Banner image</Label>
              {form.image ? (
                <div className="relative aspect-[21/9] w-full overflow-hidden rounded-xl bg-slate-100 ring-1 ring-slate-200">
                  <Image
                    src={form.image.url}
                    alt=""
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 640px) 100vw, 480px"
                    unoptimized
                  />
                </div>
              ) : (
                <div className="flex aspect-[21/9] w-full items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50 text-xs text-slate-400">
                  No banner yet
                </div>
              )}
              <Input
                key={fileKey}
                id="ad-image"
                type="file"
                accept="image/*"
                disabled={uploading}
                onChange={(e) => void onFileChange(e.target.files?.[0])}
                className="rounded-xl"
              />
              <p className="text-[11px] text-slate-500">
                {uploading
                  ? "Uploading to ImageKit…"
                  : "JPG/PNG/WebP · stored under /switch2travel/ads · prefer ~1920×400"}
              </p>
            </div>
          </div>

          <DialogFooter className="gap-2 sm:gap-2">
            <Button
              variant="outline"
              className="rounded-xl"
              onClick={() => setDialogOpen(false)}
              disabled={saving || uploading}
            >
              Cancel
            </Button>
            <Button
              className="rounded-xl bg-sky-600 text-white hover:bg-sky-700"
              onClick={() => void onSave()}
              disabled={saving || uploading}
            >
              {saving ? "Saving…" : editing ? "Save changes" : "Create"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
