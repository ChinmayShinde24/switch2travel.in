"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "motion/react"
import {
  ArrowRight01Icon,
  Bookmark02Icon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import type { HeroDestination } from "@/data/hero-destinations"
import { cn } from "@/lib/utils"

type HeroDestinationCardProps = {
  destination: HeroDestination
  active?: boolean
  className?: string
}

export function HeroDestinationCard({
  destination,
  active = false,
  className,
}: HeroDestinationCardProps) {
  return (
    <motion.div
      layout
      animate={{
        scale: active ? 1 : 0.9,
        y: active ? 0 : 16,
        opacity: active ? 1 : 0.55,
      }}
      transition={{ type: "spring", stiffness: 260, damping: 24 }}
      className={cn(
        "relative aspect-[3/4] w-[min(48vw,13.5rem)] shrink-0 sm:w-[14.5rem] md:w-[15.5rem] lg:w-[16.5rem]",
        className
      )}
    >
      <Link
        href={destination.href}
        className={cn(
          "group absolute inset-0 overflow-hidden rounded-[1.85rem] outline-none",
          "shadow-[0_28px_70px_rgba(0,0,0,0.48)]",
          "ring-1 ring-white/15 focus-visible:ring-[3px] focus-visible:ring-cyan-200/70",
          active && "ring-2 ring-[#8FE3F0]/55"
        )}
        aria-current={active ? "true" : undefined}
      >
        <Image
          src={destination.image}
          alt={`${destination.title} — ${destination.place}`}
          fill
          sizes="(max-width: 768px) 48vw, 264px"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-black/5" />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/90 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(143,227,240,0.22),transparent_45%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        <div className="absolute top-3 left-3 right-3 flex items-start justify-between gap-2">
          <span className="font-open-sans rounded-full border border-white/15 bg-black/25 px-2.5 py-1 text-[0.65rem] font-semibold tracking-[0.14em] text-white/90 uppercase backdrop-blur-md">
            {destination.days}
          </span>
          <span
            className={cn(
              "inline-flex size-9 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition-all duration-300",
              active
                ? "translate-y-0 opacity-100"
                : "translate-y-1 opacity-0 group-hover:translate-y-0 group-hover:opacity-100"
            )}
          >
            <HugeiconsIcon icon={Bookmark02Icon} strokeWidth={1.75} className="size-4" />
          </span>
        </div>

        <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
          <p className="font-open-sans text-[0.65rem] font-semibold tracking-[0.24em] text-[#8FE3F0] uppercase">
            {destination.region}
          </p>
          <p className="roboto-condensed mt-2 text-[1.7rem] leading-[1.05] font-bold tracking-[0.04em] text-white uppercase drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)] sm:text-[1.95rem]">
            {destination.title}
          </p>
          <p className="font-lato mt-2 text-sm text-white/90 drop-shadow-[0_1px_4px_rgba(0,0,0,0.7)]">
            {destination.place}
          </p>

          <div
            className={cn(
              "mt-3 flex flex-wrap gap-1.5 transition-all duration-300",
              active ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
            )}
          >
            {destination.tags.map((tag) => (
              <span
                key={tag}
                className="font-open-sans rounded-full bg-white/12 px-2 py-0.5 text-[0.65rem] font-medium tracking-wide text-white/85 backdrop-blur-sm"
              >
                {tag}
              </span>
            ))}
          </div>

          <p
            className={cn(
              "font-lato mt-2 text-xs text-white/70 transition-all duration-300",
              active ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
            )}
          >
            {destination.vibe}
          </p>

          <span
            className={cn(
              "font-display mt-3 inline-flex items-center gap-1 text-xs font-semibold tracking-wide text-white transition-all duration-300",
              active ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
            )}
          >
            Explore
            <HugeiconsIcon icon={ArrowRight01Icon} strokeWidth={2} className="size-3.5" />
          </span>
        </div>
      </Link>
    </motion.div>
  )
}
