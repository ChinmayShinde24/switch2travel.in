"use client"

import { AuthProvider } from "@/lib/auth"
import { LoadingProvider } from "@/lib/loading-context"
import { Toaster } from "@/components/ui/sonner"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LoadingProvider>
      <AuthProvider>
        {children}
        <Toaster richColors position="top-right" />
      </AuthProvider>
    </LoadingProvider>
  )
}
