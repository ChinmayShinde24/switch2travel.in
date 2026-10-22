import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { connectDB } from "@/lib/db"
import { Trip } from "@/models/Trip"
import { PUBLIC_TRIP_FILTER, toPublicTrip } from "@/lib/trip-server"
import { TripDetailView } from "@/components/trips/detail/trip-detail-view"

type Params = { params: Promise<{ slug: string }> }

export const dynamic = "force-dynamic"

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params
  await connectDB()
  const doc = await Trip.findOne({
    slug: slug.toLowerCase(),
    ...PUBLIC_TRIP_FILTER,
  }).lean()

  if (!doc) {
    return { title: "Trip not found | Switch2Travel" }
  }

  return {
    title: doc.metaTitle || `${doc.title} | Switch2Travel`,
    description:
      doc.metaDescription ||
      `Explore ${doc.title} — ${doc.durationDays} days from ${doc.pickup} to ${doc.drop}.`,
  }
}

export default async function TripDetailPage({ params }: Params) {
  const { slug } = await params
  await connectDB()

  const doc = await Trip.findOne({
    slug: slug.toLowerCase(),
    ...PUBLIC_TRIP_FILTER,
  })

  if (!doc) notFound()

  const trip = await toPublicTrip(doc)

  return <TripDetailView trip={trip} />
}
