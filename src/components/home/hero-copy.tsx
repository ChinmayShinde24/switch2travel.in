"use client"

import Link from "next/link"
import { motion } from "motion/react"
import { ArrowRight01Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { HeroCityRotator } from "@/components/home/hero-city-rotator"
import { Button } from "@/components/ui/button"

const easeOut = [0.22, 1, 0.36, 1] as const

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay, duration: 0.7, ease: easeOut },
  }),
}

export function HeroCopy() {
  return (
    <div className="relative z-10 flex max-w-2xl flex-col justify-center text-white">
      <motion.div
        custom={0.05}
        variants={fadeUp}
        initial="hidden"
        animate="show"
        className="font-open-sans mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-[0.7rem] font-semibold tracking-[0.24em] text-cyan-100 uppercase backdrop-blur-md"
      >
        <span className="relative flex size-2">
          <span className="absolute inline-flex size-full animate-ping rounded-full bg-cyan-300 opacity-75" />
          <span className="relative inline-flex size-2 rounded-full bg-cyan-300" />
        </span>
        We have world to see
      </motion.div>

      <motion.h1
        custom={0.15}
        variants={fadeUp}
        initial="hidden"
        animate="show"
        className="font-display text-[clamp(2.4rem,6.4vw,5.25rem)] leading-[1.12] font-semibold tracking-[-0.03em]"
      >
        <span className="block text-white">Choose your</span>
        <span className="mt-2 block text-white sm:mt-2.5">next</span>
        <span className="mt-2 block text-white/85 sm:mt-2.5">destination</span>
        <HeroCityRotator />
      </motion.h1>

      <motion.p
        custom={0.28}
        variants={fadeUp}
        initial="hidden"
        animate="show"
        className="font-lato mt-5 max-w-md text-base leading-relaxed font-light text-white/78 sm:text-lg"
      >
        From beaches to mountain trails — pick a place and we&apos;ll shape the
        trip around how you like to travel.
      </motion.p>

      <motion.div
        custom={0.4}
        variants={fadeUp}
        initial="hidden"
        animate="show"
        className="mt-7 flex w-full flex-nowrap items-center gap-2 sm:mt-8 sm:gap-3"
      >
        <Button
          size="lg"
          className="font-display group h-11 min-w-0 flex-1 !shrink rounded-full bg-white px-2.5 text-[0.8rem] font-semibold tracking-wide whitespace-normal text-slate-950 shadow-[0_0_0_1px_rgba(255,255,255,0.2),0_18px_40px_rgba(8,47,73,0.35)] hover:bg-cyan-50 sm:h-12 sm:flex-none sm:px-6 sm:text-base sm:whitespace-nowrap"
          nativeButton={false}
          render={<Link href="/trips" />}
        >
          <span className="truncate">Plan Your Trip</span>
          <HugeiconsIcon
            icon={ArrowRight01Icon}
            strokeWidth={2}
            className="size-3.5 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 sm:size-4"
          />
        </Button>
        <Button
          size="lg"
          variant="outline"
          className="font-open-sans h-11 min-w-0 flex-1 !shrink rounded-full border-white/25 bg-white/5 px-2.5 text-[0.8rem] font-medium tracking-wide whitespace-normal text-white backdrop-blur-md hover:bg-white/12 hover:text-white sm:h-12 sm:flex-none sm:px-5 sm:text-base sm:whitespace-nowrap"
          nativeButton={false}
          render={<Link href="/blogs" />}
        >
          <span className="truncate">Browse stories</span>
        </Button>
      </motion.div>
    </div>
  )
}
