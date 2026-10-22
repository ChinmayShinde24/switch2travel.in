"use client"

import { HugeiconsIcon } from "@hugeicons/react"
import { InstagramIcon, WhatsappIcon } from "@hugeicons/core-free-icons"
import {
  SITE_INSTAGRAM_HREF,
  SITE_PHONE_DISPLAY,
  SITE_WHATSAPP_HREF,
} from "@/lib/site-contact"
import { cn } from "@/lib/utils"

const actions = [
  {
    href: SITE_WHATSAPP_HREF,
    label: `Chat on WhatsApp (${SITE_PHONE_DISPLAY})`,
    icon: WhatsappIcon,
    className:
      "bg-emerald-500 text-white shadow-[0_10px_28px_rgba(16,185,129,0.45)] hover:bg-emerald-400",
  },
  {
    href: SITE_INSTAGRAM_HREF,
    label: "Follow Switch2Travel on Instagram",
    icon: InstagramIcon,
    className:
      "bg-sky-600 text-white shadow-[0_10px_28px_rgba(2,132,199,0.45)] hover:bg-sky-500",
  },
] as const

/** Fixed WhatsApp + Instagram shortcuts (bottom-right). */
export function FloatingContact() {
  return (
    <div
      className="pointer-events-none fixed right-4 bottom-5 z-50 flex flex-col gap-3 sm:right-5 sm:bottom-6"
      aria-label="Quick contact"
    >
      {actions.map((action) => (
        <a
          key={action.href}
          href={action.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={action.label}
          className={cn(
            "pointer-events-auto inline-flex size-12 items-center justify-center rounded-full transition-transform duration-200 hover:scale-105 focus-visible:ring-[3px] focus-visible:ring-sky-400/50 focus-visible:outline-none sm:size-[3.25rem]",
            action.className
          )}
        >
          <HugeiconsIcon icon={action.icon} strokeWidth={1.75} className="size-6" />
        </a>
      ))}
    </div>
  )
}
