"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth"
import { AdminShell } from "@/components/admin/admin-shell"
import { SwitchLoader } from "@/components/switch-loader"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const { user, loading, isAdmin } = useAuth()

  useEffect(() => {
    if (loading) return
    if (!user || !isAdmin) {
      router.replace("/sign-in")
    }
  }, [loading, user, isAdmin, router])

  if (loading || !user || !isAdmin) {
    return (
      <div className="flex min-h-dvh items-center justify-center bg-slate-100">
        <SwitchLoader label="Checking your session..." />
      </div>
    )
  }

  return <AdminShell>{children}</AdminShell>
}
