"use client"

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react"
import { useReducedMotion } from "motion/react"
import { heroDestinations } from "@/data/hero-destinations"

const AUTOPLAY_MS = 3000

type HeroSpotlightContextValue = {
  activeIndex: number
  progress: number
  total: number
  destination: (typeof heroDestinations)[number]
  goTo: (index: number) => void
  next: () => void
  prev: () => void
}

const HeroSpotlightContext = createContext<HeroSpotlightContextValue | null>(
  null
)

export function HeroSpotlightProvider({ children }: { children: ReactNode }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [progress, setProgress] = useState(0)
  const reduceMotion = useReducedMotion()
  const total = heroDestinations.length

  const goTo = useCallback(
    (index: number) => {
      setActiveIndex((index + total) % total)
      setProgress(0)
    },
    [total]
  )

  const next = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo])
  const prev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo])

  useEffect(() => {
    if (reduceMotion) return

    const started = performance.now()
    let frame = 0

    const tick = (now: number) => {
      const elapsed = now - started
      setProgress(Math.min(elapsed / AUTOPLAY_MS, 1))
      if (elapsed >= AUTOPLAY_MS) {
        setActiveIndex((current) => (current + 1) % total)
        setProgress(0)
        return
      }
      frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [activeIndex, reduceMotion, total])

  const value = useMemo(
    () => ({
      activeIndex,
      progress,
      total,
      destination: heroDestinations[activeIndex],
      goTo,
      next,
      prev,
    }),
    [activeIndex, goTo, next, prev, progress, total]
  )

  return (
    <HeroSpotlightContext.Provider value={value}>
      {children}
    </HeroSpotlightContext.Provider>
  )
}

export function useHeroSpotlight() {
  const context = useContext(HeroSpotlightContext)
  if (!context) {
    throw new Error("useHeroSpotlight must be used within HeroSpotlightProvider")
  }
  return context
}
