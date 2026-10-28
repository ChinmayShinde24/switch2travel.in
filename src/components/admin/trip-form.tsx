"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { HugeiconsIcon } from "@hugeicons/react"
import { Add01Icon, Delete02Icon, UnfoldMoreIcon } from "@hugeicons/core-free-icons"
import type { Category } from "@/types/category"
import type { City } from "@/types/city"
import type {
  Trip,
  TripDistanceUnit,
  TripImage,
  TripItineraryDay,
  TripStatus,
  TripVisibility,
} from "@/types/trip"
import { TRIP_DISTANCE_UNITS } from "@/types/trip"
import { slugify } from "@/lib/slug"
import { uploadTripImage } from "@/lib/admin-upload"
import { RichTextEditor } from "@/components/admin/rich-text-editor"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

async function parseError(response: Response) {
  const data = (await response.json().catch(() => null)) as {
    error?: string
  } | null
  return data?.error ?? "Something went wrong"
}

type FormState = {
  title: string
  categoryIds: string[]
  cityId: string
  status: TripStatus
  visibility: TripVisibility
  cardImage: TripImage | null
  pickup: string
  drop: string
  durationDays: string
  startingPrice: string
  heroImage: TripImage | null
  galleryImages: TripImage[]
  overview: string
  itinerary: TripItineraryDay[]
  inclusions: string
  exclusions: string
  cancellationPolicy: string
  paymentPolicy: string
  faqs: { question: string; answer: string }[]
  metaTitle: string
  metaDescription: string
}

function emptyItineraryDay(day: number): TripItineraryDay {
  return { day, title: "", points: "" }
}

function emptyForm(): FormState {
  return {
    title: "",
    categoryIds: [],
    cityId: "",
    status: "draft",
    visibility: "active",
    cardImage: null,
    pickup: "",
    drop: "",
    durationDays: "7",
    startingPrice: "",
    heroImage: null,
    galleryImages: [],
    overview: "",
    itinerary: [emptyItineraryDay(1)],
    inclusions: "",
    exclusions: "",
    cancellationPolicy: "",
    paymentPolicy: "",
    faqs: [{ question: "", answer: "" }],
    metaTitle: "",
    metaDescription: "",
  }
}

function isEmptyHtml(html: string) {
  return html.replace(/<[^>]*>/g, "").trim().length === 0
}

function tripToForm(trip: Trip): FormState {
  return {
    title: trip.title,
    categoryIds: trip.categoryIds?.length
      ? trip.categoryIds
      : trip.categoryId
        ? [trip.categoryId]
        : [],
    cityId: trip.cityId ?? "",
    status: trip.status,
    visibility: trip.visibility,
    cardImage: trip.cardImage,
    pickup: trip.pickup,
    drop: trip.drop,
    durationDays: String(trip.durationDays),
    startingPrice: String(trip.startingPrice),
    heroImage: trip.heroImage,
    galleryImages: trip.galleryImages,
    overview: trip.overview,
    itinerary:
      trip.itinerary.length > 0 ? trip.itinerary : [emptyItineraryDay(1)],
    inclusions: trip.inclusions,
    exclusions: trip.exclusions,
    cancellationPolicy: trip.cancellationPolicy,
    paymentPolicy: trip.paymentPolicy,
    faqs: trip.faqs.length ? trip.faqs : [{ question: "", answer: "" }],
    metaTitle: trip.metaTitle ?? "",
    metaDescription: trip.metaDescription ?? "",
  }
}

type TripFormProps = {
  mode: "create" | "edit"
  tripId?: string
  initialTrip?: Trip
}

function ImagePreview({
  image,
  label,
}: {
  image: TripImage | null
  label: string
}) {
  if (!image) {
    return (
      <div className="flex h-24 w-36 shrink-0 items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50 text-[10px] text-slate-400">
        {label}
      </div>
    )
  }
  return (
    <div className="relative h-24 w-36 shrink-0 overflow-hidden rounded-xl bg-slate-100 ring-1 ring-slate-200">
      <Image
        src={image.url}
        alt=""
        fill
        className="object-cover"
        sizes="144px"
        unoptimized
      />
    </div>
  )
}

export function TripForm({ mode, tripId, initialTrip }: TripFormProps) {
  const router = useRouter()
  const [form, setForm] = useState<FormState>(() =>
    initialTrip ? tripToForm(initialTrip) : emptyForm()
  )
  const [categories, setCategories] = useState<Category[]>([])
  const [cities, setCities] = useState<City[]>([])
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState<string | null>(null)
  const [uploadNonce, setUploadNonce] = useState(0)
  const [stableDraftKey] = useState(
    () =>
      `draft-${typeof crypto !== "undefined" ? crypto.randomUUID().slice(0, 8) : "temp"}`
  )

  const draftKey =
    mode === "edit" && initialTrip?.slug
      ? initialTrip.slug
      : slugify(form.title) || stableDraftKey

  useEffect(() => {
    void (async () => {
      try {
        const [catRes, cityRes] = await Promise.all([
          fetch("/api/admin/categories?status=active", {
            credentials: "include",
            cache: "no-store",
          }),
          fetch("/api/admin/cities?status=active", {
            credentials: "include",
            cache: "no-store",
          }),
        ])
        if (!catRes.ok) throw new Error(await parseError(catRes))
        if (!cityRes.ok) throw new Error(await parseError(cityRes))
        const catData = (await catRes.json()) as { categories: Category[] }
        const cityData = (await cityRes.json()) as { cities: City[] }
        setCategories(catData.categories)
        setCities(cityData.cities)
      } catch (error) {
        toast.error(
          error instanceof Error
            ? error.message
            : "Failed to load categories/cities"
        )
      }
    })()
  }, [])

  async function uploadImage(
    file: File | undefined,
    kind: "card" | "hero" | "gallery"
  ) {
    if (!file) return
    setUploading(kind)
    try {
      const image = await uploadTripImage(file, draftKey)
      if (kind === "card") {
        setForm((prev) => ({ ...prev, cardImage: image }))
      } else if (kind === "hero") {
        setForm((prev) => ({ ...prev, heroImage: image }))
      } else {
        setForm((prev) => ({
          ...prev,
          galleryImages: [...prev.galleryImages, image],
        }))
      }
      toast.success("Image uploaded")
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Upload failed")
    } finally {
      setUploading(null)
      setUploadNonce((n) => n + 1)
    }
  }

  function updateItineraryDay(
    index: number,
    patch: Partial<TripItineraryDay>
  ) {
    setForm((prev) => {
      const next = [...prev.itinerary]
      next[index] = { ...next[index]!, ...patch }
      return { ...prev, itinerary: next }
    })
  }

  function addItineraryDay() {
    setForm((prev) => ({
      ...prev,
      itinerary: [
        ...prev.itinerary,
        emptyItineraryDay(prev.itinerary.length + 1),
      ],
    }))
  }

  function removeItineraryDay(index: number) {
    setForm((prev) => ({
      ...prev,
      itinerary: prev.itinerary
        .filter((_, i) => i !== index)
        .map((day, i) => ({ ...day, day: i + 1 })),
    }))
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (!form.title.trim()) {
      toast.error("Title is required")
      return
    }
    if (form.categoryIds.length === 0) {
      toast.error("Select at least one category")
      return
    }
    if (!form.cityId) {
      toast.error("Select a city")
      return
    }
    if (!form.cardImage || !form.heroImage) {
      toast.error("Card image and hero image are required")
      return
    }
    const durationDays = Number(form.durationDays)
    const startingPrice = Number(form.startingPrice)
    if (!Number.isInteger(durationDays) || durationDays < 1) {
      toast.error("Duration must be a whole number of days (≥ 1)")
      return
    }
    if (Number.isNaN(startingPrice) || startingPrice < 0) {
      toast.error("Starting price must be a valid number")
      return
    }

    if (isEmptyHtml(form.overview)) {
      toast.error("Overview is required")
      return
    }

    const itinerary = form.itinerary
      .map((day, index) => ({
        day: index + 1,
        title: day.title.trim(),
        points: day.points ?? "",
        ...(day.distance && day.distance.value >= 0
          ? {
              distance: {
                value: Number(day.distance.value),
                unit: day.distance.unit,
              },
            }
          : {}),
      }))
      .filter((day) => day.title.length > 0)

    if (itinerary.length === 0) {
      toast.error("Add at least one itinerary day with a title")
      return
    }

    const faqs = form.faqs
      .map((f) => ({
        question: f.question.trim(),
        answer: f.answer.trim(),
      }))
      .filter((f) => f.question && !isEmptyHtml(f.answer))

    const payload = {
      title: form.title.trim(),
      categoryIds: form.categoryIds,
      cityId: form.cityId,
      ...(mode === "create"
        ? { status: form.status, visibility: form.visibility }
        : {}),
      cardImage: form.cardImage,
      pickup: form.pickup.trim(),
      drop: form.drop.trim(),
      durationDays,
      startingPrice,
      heroImage: form.heroImage,
      galleryImages: form.galleryImages,
      overview: form.overview,
      itinerary,
      inclusions: form.inclusions,
      exclusions: form.exclusions,
      cancellationPolicy: form.cancellationPolicy,
      paymentPolicy: form.paymentPolicy,
      faqs,
      metaTitle: form.metaTitle.trim() || undefined,
      metaDescription: form.metaDescription.trim() || undefined,
    }

    setSaving(true)
    try {
      const response = await fetch(
        mode === "create" ? "/api/admin/trips" : `/api/admin/trips/${tripId}`,
        {
          method: mode === "create" ? "POST" : "PATCH",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      )
      if (!response.ok) throw new Error(await parseError(response))
      toast.success(mode === "create" ? "Trip created" : "Trip updated")
      router.push("/admin/trips")
      router.refresh()
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Save failed")
    } finally {
      setSaving(false)
    }
  }

  const selectedCategoryNames = categories
    .filter((category) => form.categoryIds.includes(category.id))
    .map((category) => category.name)

  return (
    <form onSubmit={(e) => void onSubmit(e)} className="mx-auto w-full max-w-5xl">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="font-open-sans text-[11px] font-semibold tracking-[0.18em] text-sky-700 uppercase">
            Primary workspace
          </p>
          <h2 className="font-display mt-1 text-xl font-semibold tracking-tight text-slate-900">
            {mode === "create" ? "New trip" : "Edit trip"}
          </h2>
          <p className="font-lato mt-1 max-w-lg text-sm text-slate-500">
            Card image fields, gallery, overview, day-wise itinerary, and
            policies. Images upload to{" "}
            <span className="font-mono text-xs">/switch2travel/trips/…</span>
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="rounded-xl"
            nativeButton={false}
            render={<Link href="/admin/trips" />}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            size="sm"
            disabled={saving || !!uploading}
            className="rounded-xl bg-sky-600 text-white hover:bg-sky-700"
          >
            {saving
              ? "Saving…"
              : mode === "create"
                ? "Create trip"
                : "Save changes"}
          </Button>
        </div>
      </div>

      <Tabs defaultValue="card" className="mt-5">
        <TabsList className="rounded-2xl bg-white p-1 shadow-sm ring-1 ring-slate-200">
          <TabsTrigger value="card" className="rounded-xl px-3">
            Card
          </TabsTrigger>
          <TabsTrigger value="images" className="rounded-xl px-3">
            Images
          </TabsTrigger>
          <TabsTrigger value="overview" className="rounded-xl px-3">
            Overview
          </TabsTrigger>
          <TabsTrigger value="itinerary" className="rounded-xl px-3">
            Itinerary
          </TabsTrigger>
          <TabsTrigger value="policies" className="rounded-xl px-3">
            Policies
          </TabsTrigger>
          <TabsTrigger value="faq" className="rounded-xl px-3">
            FAQ
          </TabsTrigger>
          <TabsTrigger value="seo" className="rounded-xl px-3">
            SEO
          </TabsTrigger>
        </TabsList>

        <TabsContent value="card" className="mt-4">
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="font-open-sans text-[11px] font-semibold tracking-[0.16em] text-sky-700 uppercase">
              Card image section
            </p>
            <p className="font-lato mt-1 text-sm text-slate-500">
              These fields power the trip card: title, pickup/drop, days, price,
              categories, and the card image.
            </p>
            <Separator className="my-4" />

            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="trip-title">Trip name / title</Label>
                <Input
                  id="trip-title"
                  value={form.title}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, title: e.target.value }))
                  }
                  placeholder="Bali with Gili Island Group Tour…"
                  className="rounded-xl"
                  maxLength={160}
                />
                {mode === "create" ? (
                  <p className="font-lato text-[11px] text-slate-500">
                    Slug will be generated from the title on create.
                  </p>
                ) : (
                  <p className="font-lato text-[11px] text-slate-500">
                    Slug stays fixed when you rename the trip.
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="grid gap-2">
                  <Label>Categories</Label>
                  <DropdownMenu>
                    <DropdownMenuTrigger
                      type="button"
                      disabled={categories.length === 0}
                      className="flex h-9 w-full items-center justify-between gap-1.5 rounded-xl border border-input bg-input/30 px-3 py-2 text-sm outline-none transition-colors focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <span
                        className={
                          selectedCategoryNames.length > 0
                            ? "font-lato truncate text-left text-slate-800"
                            : "font-lato truncate text-left text-muted-foreground"
                        }
                      >
                        {categories.length === 0
                          ? "No categories yet"
                          : selectedCategoryNames.length > 0
                            ? selectedCategoryNames.join(", ")
                            : "Select categories"}
                      </span>
                      <HugeiconsIcon
                        icon={UnfoldMoreIcon}
                        strokeWidth={2}
                        className="pointer-events-none size-4 shrink-0 text-muted-foreground"
                      />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="start"
                      className="max-h-56 w-(--anchor-width) p-1"
                    >
                      {categories.map((category) => {
                        const checked = form.categoryIds.includes(category.id)
                        return (
                          <DropdownMenuItem
                            key={category.id}
                            closeOnClick={false}
                            className="gap-2.5"
                            onClick={() => {
                              setForm((prev) => ({
                                ...prev,
                                categoryIds: checked
                                  ? prev.categoryIds.filter(
                                      (id) => id !== category.id
                                    )
                                  : [...prev.categoryIds, category.id],
                              }))
                            }}
                          >
                            <Checkbox
                              checked={checked}
                              className="pointer-events-none"
                              tabIndex={-1}
                            />
                            <span className="font-lato text-sm text-slate-800">
                              {category.name}
                            </span>
                          </DropdownMenuItem>
                        )
                      })}
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <p className="font-lato text-[11px] text-slate-500">
                    Select every category this trip should appear in.
                  </p>
                </div>
                <div className="grid gap-2">
                  <Label>City</Label>
                  <Select
                    value={form.cityId || null}
                    onValueChange={(value) => {
                      if (typeof value === "string") {
                        setForm((prev) => ({ ...prev, cityId: value }))
                      }
                    }}
                  >
                    <SelectTrigger className="w-full rounded-xl">
                      <SelectValue placeholder="Select city">
                        {(value) => {
                          if (typeof value !== "string" || !value) {
                            return "Select city"
                          }
                          return (
                            cities.find((c) => c.id === value)?.name ??
                            "Select city"
                          )
                        }}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {cities.map((city) => (
                        <SelectItem key={city.id} value={city.id}>
                          {city.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="trip-pickup">Pickup</Label>
                  <Input
                    id="trip-pickup"
                    value={form.pickup}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, pickup: e.target.value }))
                    }
                    placeholder="Bali Airport"
                    className="rounded-xl"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="trip-drop">Drop</Label>
                  <Input
                    id="trip-drop"
                    value={form.drop}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, drop: e.target.value }))
                    }
                    placeholder="Bali Airport"
                    className="rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="trip-days">Duration (days)</Label>
                  <Input
                    id="trip-days"
                    type="number"
                    min={1}
                    step={1}
                    value={form.durationDays}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        durationDays: e.target.value,
                      }))
                    }
                    className="rounded-xl"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="trip-price">Starting price (INR)</Label>
                  <Input
                    id="trip-price"
                    type="number"
                    min={0}
                    step={1}
                    value={form.startingPrice}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        startingPrice: e.target.value,
                      }))
                    }
                    placeholder="53500"
                    className="rounded-xl"
                  />
                </div>
              </div>

              {mode === "create" ? (
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label>Status</Label>
                    <Select
                      value={form.status}
                      onValueChange={(value) => {
                        if (value === "draft" || value === "published") {
                          setForm((prev) => ({ ...prev, status: value }))
                        }
                      }}
                    >
                      <SelectTrigger className="w-full rounded-xl">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="published">Published</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label>Visibility</Label>
                    <Select
                      value={form.visibility}
                      onValueChange={(value) => {
                        if (value === "active" || value === "inactive") {
                          setForm((prev) => ({ ...prev, visibility: value }))
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
                </div>
              ) : null}

              <div className="grid gap-2">
                <Label htmlFor="trip-card-image">Card image</Label>
                <div className="flex items-center gap-3">
                  <ImagePreview image={form.cardImage} label="Card" />
                  <Input
                    key={`card-${uploadNonce}`}
                    id="trip-card-image"
                    type="file"
                    accept="image/*"
                    disabled={!!uploading}
                    onChange={(e) =>
                      void uploadImage(e.target.files?.[0], "card")
                    }
                    className="rounded-xl"
                  />
                </div>
                {uploading === "card" ? (
                  <p className="font-lato text-[11px] text-sky-700">
                    Uploading card image…
                  </p>
                ) : null}
              </div>
            </div>
          </section>
        </TabsContent>

        <TabsContent value="images" className="mt-4">
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="font-open-sans text-[11px] font-semibold tracking-[0.16em] text-sky-700 uppercase">
              Hero & gallery
            </p>
            <p className="font-lato mt-1 text-sm text-slate-500">
              One hero image for the trip page, plus optional gallery photos.
            </p>
            <Separator className="my-4" />

            <div className="grid gap-6">
              <div className="grid gap-2">
                <Label htmlFor="trip-hero-image">Hero image</Label>
                <div className="flex items-center gap-3">
                  <ImagePreview image={form.heroImage} label="Hero" />
                  <Input
                    key={`hero-${uploadNonce}`}
                    id="trip-hero-image"
                    type="file"
                    accept="image/*"
                    disabled={!!uploading}
                    onChange={(e) =>
                      void uploadImage(e.target.files?.[0], "hero")
                    }
                    className="rounded-xl"
                  />
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="trip-gallery">Gallery images</Label>
                <Input
                  key={`gallery-${uploadNonce}`}
                  id="trip-gallery"
                  type="file"
                  accept="image/*"
                  disabled={!!uploading}
                  onChange={(e) =>
                    void uploadImage(e.target.files?.[0], "gallery")
                  }
                  className="rounded-xl"
                />
                {form.galleryImages.length > 0 ? (
                  <div className="mt-2 flex flex-wrap gap-3">
                    {form.galleryImages.map((image) => (
                      <div key={image.fileId} className="relative">
                        <ImagePreview image={image} label="Gallery" />
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon-xs"
                          className="absolute -top-2 -right-2 rounded-full"
                          onClick={() =>
                            setForm((prev) => ({
                              ...prev,
                              galleryImages: prev.galleryImages.filter(
                                (g) => g.fileId !== image.fileId
                              ),
                            }))
                          }
                          aria-label="Remove gallery image"
                        >
                          <HugeiconsIcon icon={Delete02Icon} strokeWidth={2} />
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="font-lato text-[11px] text-slate-500">
                    Optional — add as many as you need.
                  </p>
                )}
              </div>
            </div>
          </section>
        </TabsContent>

        <TabsContent value="overview" className="mt-4">
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="font-open-sans text-[11px] font-semibold tracking-[0.16em] text-sky-700 uppercase">
              Overview
            </p>
            <p className="font-lato mt-1 text-sm text-slate-500">
              Rich text overview (bold, italic, bullets, numbers). Stored as HTML
              for the trip page and SEO rendering.
            </p>
            <Separator className="my-4" />
            <RichTextEditor
              value={form.overview}
              onChange={(overview) =>
                setForm((prev) => ({ ...prev, overview }))
              }
              placeholder="Write a clear overview. Use bold, italic, and lists…"
              minHeightClassName="min-h-48"
            />
          </section>
        </TabsContent>

        <TabsContent value="itinerary" className="mt-4">
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-end justify-between gap-3">
              <div>
                <p className="font-open-sans text-[11px] font-semibold tracking-[0.16em] text-sky-700 uppercase">
                  Day-wise itinerary
                </p>
                <p className="font-lato mt-1 text-sm text-slate-500">
                  Day title required. Distance optional. Write the day body in
                  one editor (bullets, numbers, bold, italic).
                </p>
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="rounded-xl"
                onClick={addItineraryDay}
              >
                <HugeiconsIcon
                  icon={Add01Icon}
                  strokeWidth={2}
                  data-icon="inline-start"
                />
                Add day
              </Button>
            </div>
            <Separator className="my-4" />

            <div className="space-y-4">
              {form.itinerary.map((day, index) => (
                <div
                  key={index}
                  className="rounded-xl border border-slate-200 bg-slate-50/60 p-4"
                >
                  <div className="mb-3 flex items-center justify-between">
                    <p className="font-display text-sm font-semibold text-slate-900">
                      Day {index + 1}
                    </p>
                    {form.itinerary.length > 1 ? (
                      <Button
                        type="button"
                        variant="ghost"
                        size="xs"
                        className="text-destructive"
                        onClick={() => removeItineraryDay(index)}
                      >
                        Remove day
                      </Button>
                    ) : null}
                  </div>

                  <div className="grid gap-3">
                    <div className="grid gap-2">
                      <Label>Title</Label>
                      <Input
                        value={day.title}
                        onChange={(e) =>
                          updateItineraryDay(index, { title: e.target.value })
                        }
                        placeholder="Arrival & overnight journey"
                        className="rounded-xl bg-white"
                      />
                    </div>

                    <div className="grid grid-cols-[1fr_120px] gap-3">
                      <div className="grid gap-2">
                        <Label>Distance (optional)</Label>
                        <Input
                          type="number"
                          min={0}
                          step="any"
                          value={day.distance?.value ?? ""}
                          onChange={(e) => {
                            const raw = e.target.value
                            if (raw === "") {
                              updateItineraryDay(index, {
                                distance: undefined,
                              })
                              return
                            }
                            updateItineraryDay(index, {
                              distance: {
                                value: Number(raw),
                                unit: day.distance?.unit ?? "km",
                              },
                            })
                          }}
                          placeholder="120"
                          className="rounded-xl bg-white"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label>Unit</Label>
                        <Select
                          value={day.distance?.unit ?? "km"}
                          onValueChange={(value) => {
                            if (
                              (TRIP_DISTANCE_UNITS as readonly string[]).includes(
                                value as string
                              )
                            ) {
                              updateItineraryDay(index, {
                                distance: {
                                  value: day.distance?.value ?? 0,
                                  unit: value as TripDistanceUnit,
                                },
                              })
                            }
                          }}
                        >
                          <SelectTrigger className="w-full rounded-xl bg-white">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {TRIP_DISTANCE_UNITS.map((unit) => (
                              <SelectItem key={unit} value={unit}>
                                {unit}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid gap-2">
                      <Label>Day details</Label>
                      <RichTextEditor
                        value={day.points}
                        onChange={(points) =>
                          updateItineraryDay(index, { points })
                        }
                        placeholder="• Pickup at 7 PM… Add bullets, bold, or numbered steps"
                        minHeightClassName="min-h-32"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </TabsContent>

        <TabsContent value="policies" className="mt-4">
          <section className="space-y-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="grid gap-2">
              <Label className="font-open-sans text-[11px] tracking-[0.12em] text-slate-600 uppercase">
                Inclusions
              </Label>
              <RichTextEditor
                value={form.inclusions}
                onChange={(inclusions) =>
                  setForm((prev) => ({ ...prev, inclusions }))
                }
                placeholder="List what is included…"
              />
            </div>
            <Separator />
            <div className="grid gap-2">
              <Label className="font-open-sans text-[11px] tracking-[0.12em] text-slate-600 uppercase">
                Exclusions
              </Label>
              <RichTextEditor
                value={form.exclusions}
                onChange={(exclusions) =>
                  setForm((prev) => ({ ...prev, exclusions }))
                }
                placeholder="List what is not included…"
              />
            </div>
            <Separator />
            <div className="grid gap-2">
              <Label className="font-open-sans text-[11px] tracking-[0.12em] text-slate-600 uppercase">
                Cancellation policy
              </Label>
              <RichTextEditor
                value={form.cancellationPolicy}
                onChange={(cancellationPolicy) =>
                  setForm((prev) => ({ ...prev, cancellationPolicy }))
                }
                placeholder="Cancellation rules…"
              />
            </div>
            <Separator />
            <div className="grid gap-2">
              <Label className="font-open-sans text-[11px] tracking-[0.12em] text-slate-600 uppercase">
                Payment policy
              </Label>
              <RichTextEditor
                value={form.paymentPolicy}
                onChange={(paymentPolicy) =>
                  setForm((prev) => ({ ...prev, paymentPolicy }))
                }
                placeholder="Payment and advance rules…"
              />
            </div>
          </section>
        </TabsContent>

        <TabsContent value="faq" className="mt-4">
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-end justify-between gap-3">
              <div>
                <p className="font-open-sans text-[11px] font-semibold tracking-[0.16em] text-sky-700 uppercase">
                  FAQs
                </p>
                <p className="font-lato mt-1 text-sm text-slate-500">
                  Question + rich answer. Empty rows are skipped on save.
                </p>
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="rounded-xl"
                onClick={() =>
                  setForm((prev) => ({
                    ...prev,
                    faqs: [...prev.faqs, { question: "", answer: "" }],
                  }))
                }
              >
                <HugeiconsIcon
                  icon={Add01Icon}
                  strokeWidth={2}
                  data-icon="inline-start"
                />
                Add FAQ
              </Button>
            </div>
            <Separator className="my-4" />
            <div className="space-y-4">
              {form.faqs.map((faq, index) => (
                <div
                  key={index}
                  className="rounded-xl border border-slate-200 bg-slate-50/60 p-4"
                >
                  <div className="mb-2 flex justify-end">
                    {form.faqs.length > 1 ? (
                      <Button
                        type="button"
                        variant="ghost"
                        size="xs"
                        className="text-destructive"
                        onClick={() =>
                          setForm((prev) => ({
                            ...prev,
                            faqs: prev.faqs.filter((_, i) => i !== index),
                          }))
                        }
                      >
                        Remove
                      </Button>
                    ) : null}
                  </div>
                  <div className="grid gap-3">
                    <div className="grid gap-2">
                      <Label>Question</Label>
                      <Input
                        value={faq.question}
                        onChange={(e) =>
                          setForm((prev) => {
                            const faqs = [...prev.faqs]
                            faqs[index] = {
                              ...faqs[index]!,
                              question: e.target.value,
                            }
                            return { ...prev, faqs }
                          })
                        }
                        className="rounded-xl bg-white"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label>Answer</Label>
                      <RichTextEditor
                        value={faq.answer}
                        onChange={(answer) =>
                          setForm((prev) => {
                            const faqs = [...prev.faqs]
                            faqs[index] = {
                              ...faqs[index]!,
                              answer,
                            }
                            return { ...prev, faqs }
                          })
                        }
                        placeholder="Answer with bold, italic, or lists…"
                        minHeightClassName="min-h-24"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </TabsContent>

        <TabsContent value="seo" className="mt-4">
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="font-open-sans text-[11px] font-semibold tracking-[0.16em] text-sky-700 uppercase">
              Optional SEO
            </p>
            <p className="font-lato mt-1 text-sm text-slate-500">
              Keep meta title short (~60) and description focused (~160).
            </p>
            <Separator className="my-4" />
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="meta-title">Meta title</Label>
                <Input
                  id="meta-title"
                  value={form.metaTitle}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, metaTitle: e.target.value }))
                  }
                  maxLength={60}
                  className="rounded-xl"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="meta-description">Meta description</Label>
                <Textarea
                  id="meta-description"
                  value={form.metaDescription}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      metaDescription: e.target.value,
                    }))
                  }
                  maxLength={160}
                  className="min-h-24 rounded-xl"
                />
              </div>
            </div>
          </section>
        </TabsContent>
      </Tabs>

      <div className="mt-5 flex justify-end gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="rounded-xl"
          nativeButton={false}
          render={<Link href="/admin/trips" />}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          size="sm"
          disabled={saving || !!uploading}
          className="rounded-xl bg-sky-600 text-white hover:bg-sky-700"
        >
          {saving
            ? "Saving…"
            : mode === "create"
              ? "Create trip"
              : "Save changes"}
        </Button>
      </div>
    </form>
  )
}
