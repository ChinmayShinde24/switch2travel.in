"use client"

import { useEffect, type RefObject } from "react"

/** Pixels the rail drifts each second while idle. */
const SPEED_PX_PER_SEC = 42
/** Wait after the pointer leaves before motion starts again. */
const RESUME_MS = 400

type UseAutoScrollRailOptions = {
  /** When false, native overflow still works — only auto-motion is off. */
  enabled?: boolean
  speed?: number
}

/**
 * Infinite horizontal auto-scroll for an overflow rail.
 * Native wheel, trackpad, and thumb-pan still move the same element.
 * Motion pauses while the pointer is on the rail and resumes after leave.
 */
export function useAutoScrollRail(
  scrollerRef: RefObject<HTMLElement | null>,
  { enabled = true, speed = SPEED_PX_PER_SEC }: UseAutoScrollRailOptions = {}
) {
  useEffect(() => {
    const scroller = scrollerRef.current
    if (!scroller || !enabled) return

    let frame = 0
    let lastTime = performance.now()
    let paused = false
    let resumeTimer = 0

    const loopWidth = () => scroller.scrollWidth / 2

    const canLoop = () => {
      const half = loopWidth()
      return half > scroller.clientWidth + 8
    }

    const wrapForward = () => {
      const half = loopWidth()
      if (half < 1) return
      if (scroller.scrollLeft >= half) {
        scroller.scrollLeft -= half
      }
    }

    const pause = () => {
      paused = true
      window.clearTimeout(resumeTimer)
    }

    const resume = () => {
      window.clearTimeout(resumeTimer)
      resumeTimer = window.setTimeout(() => {
        if (
          scroller.matches(":hover") ||
          scroller.contains(document.activeElement)
        ) {
          return
        }
        paused = false
        lastTime = performance.now()
      }, RESUME_MS)
    }

    const tick = (now: number) => {
      const delta = Math.min(now - lastTime, 48) / 1000
      lastTime = now

      if (!paused && canLoop() && document.visibilityState === "visible") {
        scroller.scrollLeft += speed * delta
        wrapForward()
      }

      frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)

    const onScroll = () => {
      wrapForward()
    }

    const onWheel = (event: WheelEvent) => {
      if (Math.abs(event.deltaX) >= Math.abs(event.deltaY)) return
      if (event.deltaY === 0) return
      event.preventDefault()
      scroller.scrollLeft += event.deltaY
      wrapForward()
    }

    const onVisibility = () => {
      if (document.visibilityState === "hidden") {
        pause()
        return
      }
      if (!scroller.matches(":hover")) resume()
    }

    scroller.addEventListener("pointerenter", pause)
    scroller.addEventListener("pointerleave", resume)
    scroller.addEventListener("pointerdown", pause)
    scroller.addEventListener("focusin", pause)
    scroller.addEventListener("focusout", resume)
    scroller.addEventListener("scroll", onScroll, { passive: true })
    scroller.addEventListener("wheel", onWheel, { passive: false })
    document.addEventListener("visibilitychange", onVisibility)

    return () => {
      cancelAnimationFrame(frame)
      window.clearTimeout(resumeTimer)
      scroller.removeEventListener("pointerenter", pause)
      scroller.removeEventListener("pointerleave", resume)
      scroller.removeEventListener("pointerdown", pause)
      scroller.removeEventListener("focusin", pause)
      scroller.removeEventListener("focusout", resume)
      scroller.removeEventListener("scroll", onScroll)
      scroller.removeEventListener("wheel", onWheel)
      document.removeEventListener("visibilitychange", onVisibility)
    }
  }, [enabled, scrollerRef, speed])
}
