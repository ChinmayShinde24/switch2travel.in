import { PhoneCallIcon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

const PHONE_DISPLAY = "+91 8369025524"
const PHONE_HREF = "tel:+918369025524"

export function NavbarCallUs() {
  return (
    <a
      href={PHONE_HREF}
      className="inline-flex items-center gap-2.5 outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
      aria-label={`Call us at ${PHONE_DISPLAY}`}
    >
      <span className="inline-flex size-10 items-center justify-center rounded-full bg-muted text-foreground shadow-sm">
        <HugeiconsIcon icon={PhoneCallIcon} strokeWidth={1.75} className="size-5" />
      </span>
      <span className="hidden flex-col leading-tight sm:flex">
        <span className="text-xs font-medium text-muted-foreground">Call Us</span>
        <span className="text-sm font-semibold tracking-wide text-foreground">
          {PHONE_DISPLAY}
        </span>
      </span>
    </a>
  )
}
