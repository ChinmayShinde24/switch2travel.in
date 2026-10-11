"use client"

import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { useHeroSpotlight } from "@/components/home/hero-spotlight"

const ease = [0.22, 1, 0.36, 1] as const

export function HeroCityRotator() {
  const { destination } = useHeroSpotlight()
  const reduceMotion = useReducedMotion()
  const city = destination.title

  return (
    <span
      className="relative mt-3 block min-h-[1.05em] overflow-hidden sm:mt-4"
      aria-live="polite"
      aria-atomic="true"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={city}
          initial={
            reduceMotion
              ? { opacity: 0 }
              : { opacity: 0, y: "0.55em", filter: "blur(6px)" }
          }
          animate={
            reduceMotion
              ? { opacity: 1 }
              : { opacity: 1, y: 0, filter: "blur(0px)" }
          }
          exit={
            reduceMotion
              ? { opacity: 0 }
              : { opacity: 0, y: "-0.45em", filter: "blur(6px)" }
          }
          transition={{ duration: reduceMotion ? 0.2 : 0.55, ease }}
          className="font-editorial block text-[1em] tracking-wide text-[#8FE3F0] drop-shadow-[0_10px_28px_rgba(143,227,240,0.35)]"
        >
          {city}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}
