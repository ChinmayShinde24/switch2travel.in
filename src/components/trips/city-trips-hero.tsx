import Image from "next/image"
import type { City } from "@/types/city"

type CityTripsHeroProps = {
  city: City
  tripCount: number
}

/** Full-width city banner above the trip cards for a city listing. */
export function CityTripsHero({ city, tripCount }: CityTripsHeroProps) {
  return (
    <section className="relative isolate min-h-[14rem] overflow-hidden rounded-2xl bg-slate-200 sm:min-h-[18rem] md:min-h-[22rem] md:rounded-[1.35rem]">
      <Image
        src={city.image.url}
        alt={city.name}
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/35 to-transparent"
      />
      <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7 md:p-8">
        <p className="font-open-sans text-[11px] font-semibold tracking-[0.18em] text-sky-300 uppercase">
          Packages in
        </p>
        <h1 className="font-display mt-1 text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
          {city.name}
        </h1>
        <p className="font-lato mt-2 text-sm text-white/80 sm:text-base">
          {tripCount} {tripCount === 1 ? "trip" : "trips"} ready to explore
        </p>
      </div>
    </section>
  )
}
