"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { isNavActive, navLinks } from "@/lib/nav"
import { cn } from "@/lib/utils"

type NavbarLinksProps = {
  orientation?: "horizontal" | "vertical"
  onNavigate?: () => void
}

export function NavbarLinks({
  orientation = "horizontal",
  onNavigate,
}: NavbarLinksProps) {
  const pathname = usePathname()

  return (
    <nav
      aria-label="Primary"
      className={cn(
        orientation === "vertical"
          ? "flex flex-col gap-1"
          : "flex items-center gap-6 lg:gap-10"
      )}
    >
      {navLinks.map((link) => {
        const active = isNavActive(pathname, link.href)
        return (
          <Link
            key={link.href}
            href={link.href}
            aria-current={active ? "page" : undefined}
            onClick={onNavigate}
            className={cn(
              // Geist + wide tracking matches the screenshot look better than condensed UI text
              "font-display rounded-sm px-1 py-2 text-[0.8rem] font-medium tracking-[0.22em] uppercase transition-colors outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50",
              orientation === "vertical" && "px-4 py-3 tracking-[0.18em]",
              active
                ? "text-foreground"
                : "text-foreground/70 hover:text-foreground"
            )}
          >
            {link.label}
          </Link>
        )
      })}
    </nav>
  )
}
