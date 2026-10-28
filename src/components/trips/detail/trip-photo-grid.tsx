"use client"

import Image from "next/image"
import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowRight01Icon } from "@hugeicons/core-free-icons"
import { useTripDetail } from "@/lib/trip-detail-context"
import { cn } from "@/lib/utils"
import { TripPhotoLightbox } from "@/components/trips/detail/trip-photo-lightbox"

export function TripPhotoGrid() {
  const { trip, gallery, setGalleryOpen } = useTripDetail()
  const hero = gallery[0]
  const sideTop = gallery[1]
  const sideBottom = gallery[2]
  const extraCount = Math.max(gallery.length - 3, 0)

  if (!hero) return null

  return (
    <>
      <section
        aria-label="Trip photos"
        className="grid w-full gap-2 sm:gap-3 md:grid-cols-[1.55fr_1fr] md:gap-3"
      >
        {/* Hero */}
        <button
          type="button"
          onClick={() => setGalleryOpen(true)}
          className={cn(
            "group relative isolate min-h-[16rem] overflow-hidden rounded-2xl bg-slate-200 text-left outline-none sm:min-h-[20rem] md:min-h-[26rem] md:rounded-[1.35rem]",
            "ring-1 ring-slate-900/10 focus-visible:ring-[3px] focus-visible:ring-sky-400/50"
          )}
        >
          <Image
            src={hero.url}
            alt={trip.title}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 62vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </button>

        {/* Supporting stack */}
        <div className="grid grid-cols-2 gap-2 sm:gap-3 md:grid-cols-1 md:grid-rows-2">
          <PhotoTile
            src={sideTop?.url ?? hero.url}
            alt={`${trip.title} gallery 2`}
            onClick={() => setGalleryOpen(true)}
            className="min-h-[8rem] sm:min-h-[10rem] md:min-h-0"
          />
          <div className="relative min-h-[8rem] sm:min-h-[10rem] md:min-h-0">
            <PhotoTile
              src={sideBottom?.url ?? sideTop?.url ?? hero.url}
              alt={`${trip.title} gallery 3`}
              onClick={() => setGalleryOpen(true)}
              className="absolute inset-0 min-h-0"
            />
            <button
              type="button"
              onClick={() => setGalleryOpen(true)}
              className="font-display absolute right-2.5 bottom-2.5 z-10 inline-flex items-center gap-1 rounded-xl bg-sky-600 px-3 py-1.5 text-xs font-semibold text-white shadow-lg transition-colors hover:bg-sky-700 focus-visible:ring-[3px] focus-visible:ring-sky-400/50 focus-visible:outline-none sm:right-3 sm:bottom-3 sm:text-sm"
            >
              {gallery.length > 3 ? `${extraCount}+ Photos` : `${gallery.length} Photos`}
              <HugeiconsIcon icon={ArrowRight01Icon} strokeWidth={2} className="size-3.5" />
            </button>
          </div>
        </div>
      </section>

      <TripPhotoLightbox />
    </>
  )
}

function PhotoTile({
  src,
  alt,
  onClick,
  className,
}: {
  src: string
  alt: string
  onClick: () => void
  className?: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "group relative overflow-hidden rounded-2xl bg-slate-200 outline-none ring-1 ring-slate-900/10 md:rounded-[1.25rem]",
        "focus-visible:ring-[3px] focus-visible:ring-sky-400/50",
        className
      )}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 50vw, 32vw"
        className="object-cover transition-transform duration-700 group-hover:scale-105"
      />
    </button>
  )
}
