"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { UserIcon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAuth } from "@/lib/auth"

export function NavbarProfile() {
  const router = useRouter()
  const { user, loading, logout } = useAuth()

  if (!loading && !user) {
    return (
      <Button
        variant="default"
        size="icon"
        className="size-10 shrink-0 rounded-full bg-sky-600 text-white shadow-sm hover:bg-sky-700 focus-visible:ring-sky-500/40"
        aria-label="Sign in or create account"
        nativeButton={false}
        render={<Link href="/sign-in" />}
      >
        <HugeiconsIcon icon={UserIcon} strokeWidth={2} className="size-5" />
      </Button>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant="default"
            size="icon"
            className="size-10 shrink-0 rounded-full bg-sky-600 text-white shadow-sm hover:bg-sky-700 focus-visible:ring-sky-500/40"
            aria-label="Account menu"
          />
        }
      >
        <HugeiconsIcon icon={UserIcon} strokeWidth={2} className="size-5" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" sideOffset={8} className="min-w-52">
        <DropdownMenuGroup>
          <DropdownMenuLabel>
            {user ? `Hello ${user.name}` : "Hello Guest"}
          </DropdownMenuLabel>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {user?.role === "admin" ? (
            <DropdownMenuItem
              render={<Link href="/admin" />}
              className="cursor-pointer font-medium"
            >
              Admin
            </DropdownMenuItem>
          ) : null}
          {user ? (
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={async () => {
                await logout()
                router.refresh()
              }}
            >
              Logout
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem
              render={<Link href="/sign-in" />}
              className="cursor-pointer"
            >
              Login
            </DropdownMenuItem>
          )}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
