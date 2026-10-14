import { Button } from "@/components/ui/button"

export default function AdminTripsPage() {
  return (
    <div className="mx-auto w-full max-w-5xl">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="font-open-sans text-[11px] font-semibold tracking-[0.18em] text-sky-700 uppercase">
            Primary workspace
          </p>
          <h2 className="font-display mt-1 text-xl font-semibold tracking-tight text-slate-900">
            Trips
          </h2>
          <p className="font-lato mt-1 max-w-lg text-sm text-slate-500">
            Create, edit, and publish trips here. This is the main admin
            surface — categories and blogs stay secondary.
          </p>
        </div>
        <Button
          size="sm"
          disabled
          className="rounded-xl bg-sky-600 text-white hover:bg-sky-700"
        >
          New trip
        </Button>
      </div>

      <div className="mt-5 flex min-h-[420px] flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white/70 px-8 text-center">
        <p className="font-display text-sm font-medium text-slate-700">
          Trip builder coming next
        </p>
        <p className="font-lato mt-1 max-w-sm text-sm text-slate-500">
          Draft itineraries, pricing, and publish flow will live in this panel
          without competing with the compact categories tool.
        </p>
      </div>
    </div>
  )
}
