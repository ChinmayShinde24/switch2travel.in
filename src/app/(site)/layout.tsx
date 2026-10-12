import { Navbar } from "@/components/layout/navbar"

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-dvh flex-1 flex-col">
      <Navbar />
      <main className="page-padding-x flex min-h-0 flex-1 flex-col pb-3 md:pb-4">
        {children}
      </main>
    </div>
  )
}
