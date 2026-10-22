"use client"

import Image from "next/image"
import { useTripDetail } from "@/lib/trip-detail-context"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export function TripPhotoLightbox() {
  const { trip, gallery, galleryOpen, setGalleryOpen } = useTripDetail()

  return (
    <Dialog open={galleryOpen} onOpenChange={setGalleryOpen}>
      <DialogContent className="max-h-[90dvh] overflow-y-auto rounded-2xl sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle className="font-display">{trip.title} photos</DialogTitle>
        </DialogHeader>
        <div className="grid gap-3 sm:grid-cols-2">
          {gallery.map((image, index) => (
            <div
              key={`${image.fileId}-${index}`}
              className="relative aspect-[4/3] overflow-hidden rounded-xl bg-slate-100"
            >
              <Image
                src={image.url}
                alt={`${trip.title} photo ${index + 1}`}
                fill
                sizes="(max-width: 640px) 100vw, 400px"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}
