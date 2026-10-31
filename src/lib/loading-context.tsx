"use client"

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react"
import { SwitchLoader } from "@/components/switch-loader"

type LoadingContextValue = {
  isLoading: boolean
  begin: () => void
  end: () => void
  track: <T>(work: Promise<T>) => Promise<T>
  showFor: (ms?: number) => Promise<void>
  cover: <T>(work: () => T | Promise<T>, ms?: number) => Promise<T>
}

export const CITY_NAV_LOADER_MS = 2000

const LoadingContext = createContext<LoadingContextValue | null>(null)

const SHOW_DELAY_MS = 120

type PendingListener = (pending: number) => void

let pendingCount = 0
const listeners = new Set<PendingListener>()

function emitPending() {
  for (const listener of listeners) listener(pendingCount)
}

function beginRequest() {
  pendingCount += 1
  emitPending()
}

function endRequest() {
  pendingCount = Math.max(0, pendingCount - 1)
  emitPending()
}

function isAppApiRequest(input: RequestInfo | URL) {
  const raw =
    typeof input === "string"
      ? input
      : input instanceof URL
        ? input.href
        : input.url

  try {
    const url = new URL(raw, window.location.origin)
    return url.origin === window.location.origin && url.pathname.startsWith("/api/")
  } catch {
    return raw.startsWith("/api/")
  }
}

function installFetchPatch() {
  if (typeof window === "undefined") return
  const scopedWindow = window as Window & { __s2tFetchPatched?: boolean }
  if (scopedWindow.__s2tFetchPatched) return
  scopedWindow.__s2tFetchPatched = true

  const originalFetch = window.fetch.bind(window)
  window.fetch = async (input, init) => {
    const shouldTrack = isAppApiRequest(input)
    if (shouldTrack) beginRequest()
    try {
      return await originalFetch(input, init)
    } finally {
      if (shouldTrack) endRequest()
    }
  }
}

installFetchPatch()

export function waitForHref(href: string, timeoutMs = 10000) {
  return new Promise<void>((resolve) => {
    const target = new URL(href, window.location.origin)

    const matches = () => {
      const current = new URL(window.location.href)
      if (current.pathname !== target.pathname) return false
      for (const [key, value] of target.searchParams) {
        if (current.searchParams.get(key) !== value) return false
      }
      if (!target.search && current.searchParams.has("city")) return false
      return true
    }

    if (matches()) {
      resolve()
      return
    }

    const started = Date.now()
    const timer = window.setInterval(() => {
      if (matches() || Date.now() - started >= timeoutMs) {
        window.clearInterval(timer)
        resolve()
      }
    }, 32)
  })
}

export function LoadingProvider({ children }: { children: ReactNode }) {
  const [pending, setPending] = useState(pendingCount)
  const [visible, setVisible] = useState(false)
  const [forced, setForced] = useState(false)
  const [booting, setBooting] = useState(true)
  const holdCountRef = useRef(0)

  useEffect(() => {
    const listener: PendingListener = (next) => setPending(next)
    listeners.add(listener)
    setPending(pendingCount)
    return () => {
      listeners.delete(listener)
    }
  }, [])

  useEffect(() => {
    const timer = window.setTimeout(() => setBooting(false), CITY_NAV_LOADER_MS)
    return () => window.clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (pending === 0) {
      setVisible(false)
      return
    }
    const timer = window.setTimeout(() => setVisible(true), SHOW_DELAY_MS)
    return () => window.clearTimeout(timer)
  }, [pending])

  const begin = useCallback(() => {
    beginRequest()
  }, [])

  const end = useCallback(() => {
    endRequest()
  }, [])

  const track = useCallback(async <T,>(work: Promise<T>) => {
    beginRequest()
    try {
      return await work
    } finally {
      endRequest()
    }
  }, [])

  const showFor = useCallback(async (ms = CITY_NAV_LOADER_MS) => {
    holdCountRef.current += 1
    setForced(true)
    await new Promise<void>((resolve) => {
      window.setTimeout(resolve, ms)
    })
    holdCountRef.current = Math.max(0, holdCountRef.current - 1)
    if (holdCountRef.current === 0) setForced(false)
  }, [])

  const cover = useCallback(
    async <T,>(work: () => T | Promise<T>, ms = CITY_NAV_LOADER_MS) => {
      holdCountRef.current += 1
      setForced(true)
      const minTime = new Promise<void>((resolve) => {
        window.setTimeout(resolve, ms)
      })
      try {
        const [result] = await Promise.all([work(), minTime])
        return result
      } finally {
        holdCountRef.current = Math.max(0, holdCountRef.current - 1)
        if (holdCountRef.current === 0) setForced(false)
      }
    },
    []
  )

  const value = useMemo(
    () => ({
      isLoading: pending > 0 || forced || booting,
      begin,
      end,
      track,
      showFor,
      cover,
    }),
    [pending, forced, booting, begin, end, track, showFor, cover]
  )

  return (
    <LoadingContext.Provider value={value}>
      {children}
      {visible || forced || booting ? (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-white/80 backdrop-blur-[2px]">
          <SwitchLoader />
        </div>
      ) : null}
    </LoadingContext.Provider>
  )
}

export function useLoading() {
  const context = useContext(LoadingContext)
  if (!context) {
    throw new Error("useLoading must be used within LoadingProvider")
  }
  return context
}
