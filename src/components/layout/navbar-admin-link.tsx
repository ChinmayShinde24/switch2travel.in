"use client"

import Link from "next/link"
import { useAuth } from "@/lib/auth"

/** Shown only when cookie session resolves to role === "admin". */
export function NavbarAdminLink() {
  const { loading, isAdmin } = useAuth()

  if (loading || !isAdmin) return null

  return (
    <Link
      href="/admin"
      className="font-display hidden rounded-md bg-sky-600 px-3 py-2 text-[0.7rem] font-semibold tracking-[0.18em] text-white uppercase shadow-sm transition-colors hover:bg-sky-700 md:inline-flex"
    >
      Admin
    </Link>
  )
}
