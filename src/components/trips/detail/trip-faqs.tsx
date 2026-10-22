"use client"

import { useTripDetail } from "@/lib/trip-detail-context"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export function TripFaqs() {
  const { trip } = useTripDetail()

  if (trip.faqs.length === 0) {
    return (
      <p className="font-lato text-sm text-slate-500">
        FAQs will appear here when available.
      </p>
    )
  }

  return (
    <div>
      <h3 className="font-display mb-4 text-xl font-semibold tracking-tight text-slate-900">
        FAQs
      </h3>
      <Accordion
        defaultValue={["0"]}
        className="rounded-2xl border-slate-200 bg-white shadow-sm"
      >
        {trip.faqs.map((faq, index) => (
          <AccordionItem
            key={`${faq.question}-${index}`}
            value={String(index)}
            className="border-slate-100"
          >
            <AccordionTrigger className="font-display text-sm font-semibold hover:no-underline">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent>
              <p className="font-lato text-sm leading-relaxed text-slate-600">
                {faq.answer}
              </p>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}
