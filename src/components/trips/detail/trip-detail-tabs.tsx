"use client"

import {
  useTripDetail,
  type TripDetailTab,
} from "@/lib/trip-detail-context"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TripOverview } from "@/components/trips/detail/trip-overview"
import { TripItineraryAccordion } from "@/components/trips/detail/trip-itinerary-accordion"
import { TripInclusionsExclusions } from "@/components/trips/detail/trip-inclusions-exclusions"
import { TripPolicyPanel } from "@/components/trips/detail/trip-policy-panel"
import { TripFaqs } from "@/components/trips/detail/trip-faqs"
import { cn } from "@/lib/utils"

const TAB_ITEMS: { value: TripDetailTab; label: string }[] = [
  { value: "overview", label: "Overview" },
  { value: "itinerary", label: "Itinerary" },
  { value: "inclusions", label: "Inclusions & Exclusions" },
  { value: "cancellation", label: "Cancellation Policy" },
  { value: "payment", label: "Payment Policy" },
  { value: "faqs", label: "FAQs" },
]

export function TripDetailTabs() {
  const { activeTab, setActiveTab, trip } = useTripDetail()

  const visibleTabs = TAB_ITEMS.filter((tab) => {
    if (tab.value === "faqs") return trip.faqs.length > 0
    return true
  })

  return (
    <section
      aria-label="Detailed information"
      className="w-full rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm sm:p-6 md:rounded-[1.35rem] md:p-7"
    >
      <Tabs
        value={activeTab}
        onValueChange={(value) => {
          if (typeof value === "string") {
            setActiveTab(value as TripDetailTab)
          }
        }}
        className="w-full gap-0"
      >
        <div className="overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <TabsList
            variant="line"
            className="h-auto w-max min-w-full justify-start gap-0 rounded-none border-b border-slate-200 bg-transparent p-0"
          >
            {visibleTabs.map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className={cn(
                  "font-display rounded-none border-0 px-3 py-3 text-sm font-medium tracking-tight text-slate-500 shadow-none",
                  "after:bg-sky-600 data-active:bg-transparent data-active:text-sky-700",
                  "group-data-[variant=line]/tabs-list:data-active:after:opacity-100"
                )}
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        <div className="pt-6">
          <TabsContent value="overview">
            <TripOverview />
          </TabsContent>
          <TabsContent value="itinerary">
            <TripItineraryAccordion />
          </TabsContent>
          <TabsContent value="inclusions">
            <TripInclusionsExclusions />
          </TabsContent>
          <TabsContent value="cancellation">
            <TripPolicyPanel kind="cancellation" />
          </TabsContent>
          <TabsContent value="payment">
            <TripPolicyPanel kind="payment" />
          </TabsContent>
          <TabsContent value="faqs">
            <TripFaqs />
          </TabsContent>
        </div>
      </Tabs>
    </section>
  )
}
