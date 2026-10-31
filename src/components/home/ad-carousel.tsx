"use client"

import { useCallback, useEffect, useState } from "react"
import Image from "next/image"
import { CityTripLink } from "@/components/city-trip-link"
import type { Ad } from "@/types/ad"
import { cn } from "@/lib/utils"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel"

type AdCarouselProps = {
  ads: Ad[]
}

/** Time spent on each banner before advancing. */
const SLIDE_MS = 5000

/** Autoplay promo banners above city search — each slide links to its trip. */
export function AdCarousel({ ads }: AdCarouselProps) {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)

  const onSelect = useCallback((instance: CarouselApi) => {
    if (!instance) return
    setCurrent(instance.selectedScrollSnap())
  }, [])

  useEffect(() => {
    if (!api) return
    onSelect(api)
    api.on("select", onSelect)
    api.on("reInit", onSelect)
    return () => {
      api.off("select", onSelect)
      api.off("reInit", onSelect)
    }
  }, [api, onSelect])

  // Continuous rotation: 1 → … → last → 1, 5s per slide.
  useEffect(() => {
    if (!api || ads.length <= 1) return

    const id = window.setInterval(() => {
      const lastIndex = api.scrollSnapList().length - 1
      const selected = api.selectedScrollSnap()
      if (selected >= lastIndex) {
        api.scrollTo(0)
      } else {
        api.scrollNext()
      }
    }, SLIDE_MS)

    return () => window.clearInterval(id)
  }, [api, ads.length])

  if (ads.length === 0) return null

  const canRotate = ads.length > 1

  return (
    <section
      aria-label="Featured promotions"
      className="relative z-10 py-6 sm:py-8 md:py-10"
    >
      <div className="page-padding-x">
        <Carousel
          setApi={setApi}
          opts={{
            loop: canRotate,
            align: "start",
            duration: 30,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-0">
            {ads.map((ad, index) => {
              const href = ad.trip?.slug
                ? `/trips/${ad.trip.slug}`
                : undefined

              const slide = (
                <div
                  className={cn(
                    "relative w-full overflow-hidden rounded-xl bg-slate-200 sm:rounded-2xl",
                    "aspect-[16/7] sm:aspect-[21/8] md:aspect-[5/1]"
                  )}
                >
                  <Image
                    src={ad.image.url}
                    alt={ad.title}
                    fill
                    priority={index === 0}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 94vw, 1120px"
                    className="object-cover object-center"
                  />
                </div>
              )

              return (
                <CarouselItem key={ad.id} className="basis-full pl-0">
                  {href ? (
                    <CityTripLink
                      href={href}
                      className="block outline-none focus-visible:ring-[3px] focus-visible:ring-sky-400/50 focus-visible:ring-offset-2"
                      aria-label={`View trip: ${ad.trip?.title ?? ad.title}`}
                    >
                      {slide}
                    </CityTripLink>
                  ) : (
                    slide
                  )}
                </CarouselItem>
              )
            })}
          </CarouselContent>
        </Carousel>

        {canRotate ? (
          <div
            className="mt-3 flex items-center justify-center gap-2 sm:mt-4"
            role="tablist"
            aria-label="Ad slides"
          >
            {ads.map((ad, index) => (
              <button
                key={ad.id}
                type="button"
                role="tab"
                aria-selected={index === current}
                aria-label={`Go to slide ${index + 1}`}
                onClick={() => api?.scrollTo(index)}
                className={cn(
                  "size-2 rounded-full transition-all duration-300 sm:size-2.5",
                  index === current
                    ? "scale-110 bg-sky-600"
                    : "bg-slate-300 hover:bg-slate-400"
                )}
              />
            ))}
          </div>
        ) : null}
      </div>
    </section>
  )
}
