"use client"

import { useTripDetail } from "@/lib/trip-detail-context"
import { TripRichHtml } from "@/components/trips/detail/trip-rich-html"

type TripPolicyPanelProps = {
  kind: "cancellation" | "payment"
}

export function TripPolicyPanel({ kind }: TripPolicyPanelProps) {
  const { trip } = useTripDetail()
  const isCancellation = kind === "cancellation"

  return (
    <div>
      <h3 className="font-display text-xl font-semibold tracking-tight text-slate-900">
        {isCancellation ? "Cancellation Policy" : "Payment Policy"}
      </h3>
      <div className="mt-3 border-t border-slate-100 pt-4">
        <TripRichHtml
          html={
            isCancellation ? trip.cancellationPolicy : trip.paymentPolicy
          }
          emptyMessage="Policy details coming soon."
        />
      </div>
    </div>
  )
}
