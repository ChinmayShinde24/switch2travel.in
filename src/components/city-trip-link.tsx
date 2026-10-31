"use client"

import type { ComponentProps, MouseEvent } from "react"
import { useRouter } from "next/navigation"
import { useLoading, waitForHref } from "@/lib/loading-context"

type CityTripLinkProps = ComponentProps<"a"> & {
  href: string
}

export function CityTripLink({
  href,
  onClick,
  children,
  ...props
}: CityTripLinkProps) {
  const router = useRouter()
  const { cover } = useLoading()

  async function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    onClick?.(event)
    if (event.defaultPrevented) return
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
      return
    }

    event.preventDefault()
    await cover(async () => {
      router.push(href)
      await waitForHref(href)
    })
  }

  return (
    <a
      href={href}
      onClick={(event) => void handleClick(event)}
      onPointerEnter={() => router.prefetch(href)}
      {...props}
    >
      {children}
    </a>
  )
}
