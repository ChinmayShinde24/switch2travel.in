import { FloatingContact } from "@/components/layout/floating-contact"
import { Navbar } from "@/components/layout/navbar"
import { SiteFooter } from "@/components/layout/site-footer"

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-dvh flex-1 flex-col">
      <Navbar />
      <main className="flex min-h-0 w-full flex-1 flex-col pb-3 md:pb-4">
        {children}
      </main>
      <SiteFooter />
      <FloatingContact />
    </div>
  )
}
