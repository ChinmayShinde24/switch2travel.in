"use client"

import Image from "next/image"
import { motion } from "motion/react"
import { BentoCell } from "@/components/bento/bento-cell"
import { HeroCopy } from "@/components/home/hero-copy"
import { HeroDestinationCarousel } from "@/components/home/hero-destination-carousel"
import { HeroMobileCities } from "@/components/home/hero-mobile-cities"
import { HeroSpotlightProvider } from "@/components/home/hero-spotlight"
import { heroBackgroundImage } from "@/data/hero-destinations"

export function HeroSection() {
  return (
    <HeroSpotlightProvider>
      <section
        aria-label="Featured destinations"
        className="flex min-h-[calc(100dvh-4.5rem)] flex-1 flex-col pt-2 md:min-h-[calc(100dvh-5rem)]"
      >
        <BentoCell className="relative flex flex-1 overflow-hidden rounded-[1.75rem] border border-white/10 bg-slate-950 p-0 shadow-[0_30px_80px_rgba(15,23,42,0.28)] md:rounded-[2.25rem]">
          <motion.div
            className="absolute inset-0"
            initial={{ scale: 1.08 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] as const }}
          >
            <Image
              src={heroBackgroundImage}
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </motion.div>

          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_20%,rgba(34,211,238,0.22),transparent_45%),radial-gradient(ellipse_at_80%_10%,rgba(251,191,36,0.16),transparent_40%),linear-gradient(110deg,rgba(2,12,27,0.88)_0%,rgba(2,12,27,0.55)_48%,rgba(2,12,27,0.28)_100%)]" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-slate-950/25" />
          <div className="hero-grain absolute inset-0" />

          <motion.div
            aria-hidden
            className="pointer-events-none absolute top-[12%] left-[8%] size-40 rounded-full bg-cyan-400/25 blur-3xl md:size-56"
            animate={{ y: [0, -18, 0], opacity: [0.35, 0.55, 0.35] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            aria-hidden
            className="pointer-events-none absolute right-[18%] bottom-[18%] size-44 rounded-full bg-amber-300/20 blur-3xl md:size-60"
            animate={{ y: [0, 16, 0], opacity: [0.25, 0.45, 0.25] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          />

          <div className="relative z-10 grid flex-1 grid-cols-1 gap-6 px-4 py-6 sm:gap-7 sm:px-7 sm:py-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:items-stretch lg:gap-8 lg:px-10 lg:py-12 xl:gap-12 xl:px-14">
            <div className="flex flex-col justify-center gap-6">
              <HeroCopy />
              <HeroMobileCities />
            </div>
            <HeroDestinationCarousel />
          </div>
        </BentoCell>
      </section>
    </HeroSpotlightProvider>
  )
}
