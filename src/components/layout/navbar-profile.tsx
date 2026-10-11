"use client"

import Link from "next/link"
import { UserIcon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAuth } from "@/lib/auth"

export function NavbarProfile() {
  const { user } = useAuth()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant="default"
            size="icon"
            className="size-10 shrink-0 rounded-full bg-sky-600 text-white shadow-sm hover:bg-sky-700 focus-visible:ring-sky-500/40"
            aria-label={user ? "Account menu" : "Sign in or create account"}
          />
        }
      >
        <HugeiconsIcon icon={UserIcon} strokeWidth={2} className="size-5" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" sideOffset={8} className="min-w-52">
        <DropdownMenuLabel>
          {user ? `Hello ${user.name}` : "Hello Guest"}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {user ? (
          <DropdownMenuItem disabled>Account coming soon</DropdownMenuItem>
        ) : (
          <>
            <DropdownMenuItem
              render={<Link href="/sign-in" />}
              className="cursor-pointer"
            >
              Login
            </DropdownMenuItem>
            <DropdownMenuItem
              render={<Link href="/sign-up" />}
              className="cursor-pointer"
            >
              Create account
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
