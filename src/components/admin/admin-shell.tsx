"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  AirplaneTakeOff01Icon,
  FolderLibraryIcon,
  NewsIcon,
  Home01Icon,
} from "@hugeicons/core-free-icons"
import { useAuth } from "@/lib/auth"
import { cn } from "@/lib/utils"
import { BentoCell } from "@/components/bento/bento-cell"
import { Separator } from "@/components/ui/separator"

const NAV = [
  {
    href: "/admin/trips",
    label: "Trips",
    description: "Create & publish",
    icon: AirplaneTakeOff01Icon,
    primary: true,
  },
  {
    href: "/admin/categories",
    label: "Categories",
    description: "Home rail tags",
    icon: FolderLibraryIcon,
    primary: false,
  },
  {
    href: "/admin/blogs",
    label: "Blogs",
    description: "Coming soon",
    icon: NewsIcon,
    primary: false,
  },
] as const

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const { user } = useAuth()

  return (
    <div className="flex min-h-dvh bg-slate-100 text-slate-900">
      <aside className="flex w-[232px] shrink-0 flex-col border-r border-slate-200 bg-slate-950 text-slate-100">
        <div className="px-3 pt-4 pb-4">
          <BentoCell className="p-2.5 shadow-none">
            <Link
              href="/"
              aria-label="Switch2Travel home"
              className="inline-flex w-full items-center justify-center outline-none focus-visible:ring-[3px] focus-visible:ring-sky-500/40"
            >
              <Image
                src="/final.png"
                alt="Switch2Travel — Travel made easier"
                width={160}
                height={80}
                priority
                className="h-11 w-auto object-contain"
              />
            </Link>
          </BentoCell>
          <p className="font-open-sans mt-3 px-1 text-[10px] font-semibold tracking-[0.22em] text-sky-400 uppercase">
            Admin console
          </p>
          <h1 className="font-display mt-1 px-1 text-lg font-semibold tracking-tight text-white">
            Workspace
          </h1>
        </div>

        <Separator className="bg-white/10" />

        <nav className="flex flex-1 flex-col gap-1 p-3">
          {NAV.map((item) => {
            const active =
              pathname === item.href || pathname.startsWith(`${item.href}/`)
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-start gap-2.5 rounded-xl px-3 py-2.5 transition-colors",
                  active
                    ? "bg-sky-500/15 text-sky-100 ring-1 ring-sky-400/35"
                    : "text-slate-300 hover:bg-white/5 hover:text-white"
                )}
              >
                <HugeiconsIcon
                  icon={item.icon}
                  strokeWidth={1.75}
                  className={cn(
                    "mt-0.5 size-4 shrink-0",
                    active ? "text-sky-300" : "text-slate-400"
                  )}
                />
                <span className="min-w-0">
                  <span className="font-display block text-sm font-medium leading-none">
                    {item.label}
                  </span>
                  <span
                    className={cn(
                      "font-lato mt-1 block text-[11px] leading-none",
                      active ? "text-sky-300/80" : "text-slate-500"
                    )}
                  >
                    {item.description}
                  </span>
                </span>
              </Link>
            )
          })}
        </nav>

        <div className="space-y-2 border-t border-white/10 p-3">
          <BentoCell className="flex items-center gap-2.5 p-2 shadow-none">
            <div className="flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-border/80 bg-white">
              <Image
                src="/final.png"
                alt=""
                width={32}
                height={32}
                className="h-7 w-auto object-contain"
              />
            </div>
            <div className="min-w-0">
              <p className="font-display truncate text-sm font-medium text-slate-900">
                {user?.name ?? "Admin"}
              </p>
              <p className="font-open-sans text-[10px] tracking-[0.14em] text-sky-700 uppercase">
                Admin account
              </p>
            </div>
          </BentoCell>
          <Link
            href="/"
            className="font-lato flex items-center gap-2 rounded-xl px-3 py-2 text-xs text-slate-400 transition-colors hover:bg-white/5 hover:text-white"
          >
            <HugeiconsIcon icon={Home01Icon} strokeWidth={1.75} className="size-3.5" />
            Back to site
          </Link>
        </div>
      </aside>

      <main className="flex min-w-0 flex-1 flex-col">
        <div className="flex-1 overflow-auto p-6">{children}</div>
      </main>
    </div>
  )
}
