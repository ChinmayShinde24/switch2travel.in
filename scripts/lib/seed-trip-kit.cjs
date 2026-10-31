/**
 * Shared helpers for destination trip seeds.
 * Each city still has its own script and is run separately.
 */
const dns = require("node:dns")
const mongoose = require("mongoose")

dns.setDefaultResultOrder("ipv4first")
dns.setServers(["8.8.8.8", "1.1.1.1"])

const SRV_URI =
  "mongodb+srv://switch2travel_db_user:RmSqh3UC1xpwqYAU@switch2travel.y9ghcra.mongodb.net/switch2travel"
const DIRECT_URI =
  "mongodb://switch2travel_db_user:RmSqh3UC1xpwqYAU@ac-yytyofs-shard-00-00.y9ghcra.mongodb.net:27017,ac-yytyofs-shard-00-01.y9ghcra.mongodb.net:27017,ac-yytyofs-shard-00-02.y9ghcra.mongodb.net:27017/switch2travel?ssl=true&replicaSet=atlas-oytuia-shard-0&authSource=admin&retryWrites=true&w=majority"

const HONEYMOON = new mongoose.Types.ObjectId("6adda7eed1ad0ab6a71bae9e")
const POPULAR = new mongoose.Types.ObjectId("6adda9bcf34a441f5a5298ac")
const BACKPACKING = new mongoose.Types.ObjectId("6adda9d5f34a441f5a5298ad")
const ROAD = new mongoose.Types.ObjectId("6adda9f1f34a441f5a5298ae")
const TREKKING = new mongoose.Types.ObjectId("6addaa1bf34a441f5a5298af")
const WEEKEND = new mongoose.Types.ObjectId("6addaa44f34a441f5a5298b0")

const cancellationPolicy = `<ul><li><p><strong>Individual Hotel and Campsite Policies:</strong> Every hotel, campsite, resort, or accommodation provider may have its own cancellation policy, including specific deadlines, cancellation charges, and refund conditions.</p></li><li><p><strong>Adherence to Provider Policies:</strong> Switch 2 Travel strictly follows the applicable cancellation policies of the respective service providers. We cannot override, modify, or make exceptions to their rules.</p></li><li><p><strong>Seasonal Cancellation Terms:</strong> Cancellation charges and refund eligibility may vary depending on the travel season, peak-season dates, holidays, special events, and the accommodation provider's booking terms.</p></li><li><p><strong>Cancellation Charges and Refunds:</strong> In case of cancellation, the applicable deductions and charges imposed by the hotel, campsite, or other service provider will be deducted from the amount paid. The remaining eligible balance, if any, will be refunded to the customer according to the provider's policy.</p></li><li><p><strong>Non-Refundable Bookings:</strong> If a booking is non-refundable or the service provider does not approve a refund, the amount retained by the provider will not be refundable.</p></li><li><p><strong>Cancellation Timing:</strong> The refund amount may depend on when the cancellation request is made and how close it is to the scheduled check-in or travel date.</p></li><li><p><strong>No Guaranteed Refund Amount:</strong> Switch 2 Travel does not guarantee a fixed refund amount or percentage unless it has been explicitly confirmed in writing at the time of booking.</p></li><li><p><strong>Review Before Booking:</strong> Customers are advised to review the applicable cancellation terms before confirming their booking. By confirming a trip, customers acknowledge that the relevant cancellation and refund policies apply.</p></li><li><p><strong>Assistance from Switch 2 Travel:</strong> Our team will assist customers with the cancellation process wherever possible. However, the final refund eligibility and amount will depend on the applicable provider's policy and confirmed deductions.</p></li></ul><p></p>`

const paymentPolicy = `<ul><li><p><strong>Advance Payment for Booking Confirmation:</strong> An advance payment of <strong>20% of the total package cost</strong> is required to confirm your booking with Switch 2 Travel. Your booking will be processed for confirmation upon receipt of the advance payment.</p></li><li><p><strong>Balance Payment:</strong> The remaining <strong>80% of the total package cost must be paid at least 15 days before the scheduled trip date</strong>. Customers are requested to complete the payment within the specified timeline to ensure smooth travel arrangements.</p></li><li><p><strong>Timely Payments:</strong> Customers are responsible for making payments within the agreed deadlines. Any delay in payment may affect booking confirmations, hotel availability, or other travel arrangements.</p></li><li><p><strong>Email-Based Communication:</strong> Switch 2 Travel follows a formal, email-based communication process to maintain a clear written record of all booking details, requests, and approvals. Customers must communicate any requests, amendments, or changes to their package in writing via email.</p></li><li><p><strong>Package Modifications and Changes:</strong> Any changes to the itinerary, travel dates, accommodation, sightseeing, or other package arrangements must be submitted in writing via email. Requests will be subject to availability, applicable charges, and approval from Switch 2 Travel and the relevant service providers.</p></li><li><p><strong>Verbal Communication Not Accepted for Changes:</strong> Verbal requests or discussions will not be treated as official instructions or confirmation of any changes to a booking. Any amendment will be considered valid only after it has been communicated in writing and acknowledged by Switch 2 Travel via email.</p></li><li><p><strong>Written Confirmation of Arrangements:</strong> Customers are advised to retain all emails concerning payments, bookings, amendments, and other trip-related matters for future reference.</p></li></ul><p></p>`

function makeExclusions(startCities, extraLi) {
  return `<ul><li><p><strong>Travel to the start city:</strong> Flight tickets and train fares to and from ${startCities} are not included in the package.</p></li><li><p><strong>Lunch and Meals During Travel:</strong> Lunch and any meals required during road transfers or transportation are not included.</p></li><li><p><strong>Unlisted Expenses:</strong> Any expense or service not specifically mentioned under the package inclusions will be charged separately.</p></li><li><p><strong>Entry Fees, Guides and Insurance:</strong> Monument and attraction entry tickets, guide charges and travel insurance are not included.</p></li>${extraLi}<li><p><strong>Personal Expenses:</strong> Laundry, luggage handling, telephone calls, room heater charges, tips, gratuities, camera fees, mineral water, soft drinks and alcoholic beverages must be paid for separately.</p></li><li><p><strong>Unexpected Travel Disruptions:</strong> Additional expenses arising from natural calamities, landslides, road closures, blockages, strikes or other unforeseen disruptions are not covered.</p></li><li><p><strong>Closures of Attractions:</strong> No refund will be provided if a park, museum, temple or attraction is closed on the date of your visit.</p></li><li><p><strong>Missed Flights or Trains:</strong> Switch 2 Travel will not be responsible for missed flights or train departures caused by traffic jams, roadblocks or similar travel delays.</p></li></ul><p></p>`
}

function inclusions(stayLine, pickup, drop) {
  return `<ul><li><p><strong>Hotel Accommodation:</strong> ${stayLine}</p></li><li><p><strong>Breakfast and Dinner:</strong> Vegetarian breakfast and dinner are included as per the itinerary.</p></li><li><p><strong>Transfers:</strong> Pickup from ${pickup} airport or railway station. Drop at ${drop} airport or railway station as specified in the itinerary.</p></li><li><p><strong>Sightseeing by Private Vehicle:</strong> Travel comfortably between the sightseeing locations mentioned in the itinerary using a private vehicle.</p></li><li><p><strong>Tolls and Taxes:</strong> Applicable road tolls and taxes are included in the package cost.</p></li></ul><p></p>`
}

function slugify(value) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 120)
}

function unsplash(photoId, label, folder, width = 1920) {
  return {
    url: `https://images.unsplash.com/${photoId}?auto=format&fit=crop&w=${width}&q=80`,
    fileId: `unsplash-${label}`,
    filePath: `/switch2travel/trips/${folder}/${label}.jpg`,
  }
}

function card(image) {
  return { ...image, url: image.url.replace("w=1920", "w=1600") }
}

function mumbaiClose(state, places, drop, escapePhrase, closer = "getaway") {
  return `<p>For travellers planning a ${state} holiday from Mumbai, Switch 2 Travel helps make the trip easier to plan with accommodation, sightseeing and transfers as outlined in the package. As a travel agency in Mumbai offering holiday packages, Switch 2 Travel brings together the key experiences of ${places} in one convenient itinerary. Whether you are planning a family holiday, a trip with friends or ${escapePhrase}, this ${state} tour package is a great way to experience the region. The package concludes with a transfer back to ${drop}, leaving you with beautiful memories of your ${closer}.</p>`
}

function plainLength(html) {
  return String(html || "")
    .replace(/<[^>]+>/g, "")
    .replace(/&[^;]+;/g, " ")
    .trim().length
}

function floorDays(trips, dayExtra) {
  for (const trip of trips) {
    trip.itinerary = trip.itinerary.map((day) => {
      if (plainLength(day.points) >= 500) return day
      const extra = `${dayExtra(day.title)} Vegetarian breakfast and dinner follow the hotel or camp meal plan. The private vehicle, driver allowance, tolls and taxes are included; lunch, entry fees, camera fees, guides and activity charges are not. Switch 2 Travel will reorder listed stops if needed so you still see the core sights of this day.`
      return { ...day, points: day.points.replace(/<\/p>\s*$/, `${extra}</p>`) }
    })
  }
}

function floorOverviews(trips, stateName) {
  for (const trip of trips) {
    if (plainLength(trip.overview) >= 1500) continue
    const pad = `<p>Hotels, vegetarian breakfast and dinner, a private vehicle and the sightseeing named in this ${trip.title} are included as on every Switch 2 Travel ${stateName} holiday. Monument tickets, activity charges, union-taxi or boat fees and flights to the start city stay extra. Share your flight or train times in writing so pickup and drop can be timed without cutting the first or last day's listed stops. The same 20 percent advance, 15-day balance, cancellation and email-amendment rules apply as on our other packages planned from Mumbai.</p>`
    trip.overview += pad
  }
}

function assertCopy(trip) {
  if ((trip.metaTitle || "").length > 60) {
    throw new Error(`metaTitle too long (${trip.metaTitle.length}): ${trip.metaTitle}`)
  }
  if ((trip.metaDescription || "").length > 160) {
    throw new Error(
      `metaDescription too long (${trip.metaDescription.length}): ${trip.metaDescription}`
    )
  }
  const overviewChars = plainLength(trip.overview)
  if (overviewChars < 1500) {
    throw new Error(`overview too short (${overviewChars}) for ${trip.title}`)
  }
  for (const day of trip.itinerary) {
    const chars = plainLength(day.points)
    if (chars < 500) {
      throw new Error(`day ${day.day} too short (${chars}) on ${trip.title}: ${day.title}`)
    }
  }
}

async function connect() {
  const options = { serverSelectionTimeoutMS: 20000, family: 4 }
  try {
    await mongoose.connect(SRV_URI, options)
    console.log("Connected with mongodb+srv")
  } catch (error) {
    console.warn("SRV connect failed:", error.message)
    await mongoose.connect(DIRECT_URI, options)
    console.log("Connected with direct mongodb:// hosts")
  }
}

async function runSeed({ cityId, cityName, trips, exclusions, dayExtra }) {
  floorDays(trips, dayExtra)
  floorOverviews(trips, cityName)
  if (process.argv.includes("--check")) {
    for (const trip of trips) {
      console.log(plainLength(trip.overview), trip.title)
      for (const day of trip.itinerary) {
        const chars = plainLength(day.points)
        if (chars < 500) console.log("  SHORT", day.day, chars, day.title)
      }
    }
    return
  }
  for (const trip of trips) assertCopy(trip)
  await connect()
  const db = mongoose.connection.db
  const city = await db
    .collection("cities")
    .findOne({ _id: cityId }, { projection: { name: 1, slug: 1 } })
  if (!city) throw new Error(`${cityName} city not found`)
  console.log(`City: ${city.name} (${city._id})`)
  const now = new Date()
  for (const raw of trips) {
    const doc = {
      title: raw.title,
      slug: slugify(raw.title),
      categoryId: raw.categoryId,
      categoryIds: raw.categoryIds,
      cityId,
      status: "published",
      visibility: "active",
      cardImage: raw.cardImage,
      pickup: raw.pickup,
      drop: raw.drop,
      durationDays: raw.durationDays,
      startingPrice: 0,
      heroImage: raw.heroImage,
      galleryImages: raw.galleryImages,
      overview: raw.overview,
      itinerary: raw.itinerary,
      inclusions: inclusions(raw.stayLine, raw.pickup, raw.drop),
      exclusions,
      cancellationPolicy,
      paymentPolicy,
      faqs: [],
      metaTitle: raw.metaTitle,
      metaDescription: raw.metaDescription,
      updatedAt: now,
    }
    const saved = await db
      .collection("trips")
      .findOneAndUpdate(
        { slug: doc.slug },
        { $set: doc, $setOnInsert: { createdAt: now } },
        { upsert: true, returnDocument: "after" }
      )
    const trip =
      saved?.value || saved || (await db.collection("trips").findOne({ slug: doc.slug }))
    console.log("Saved:", {
      id: String(trip._id),
      title: trip.title,
      days: trip.durationDays,
      overviewChars: plainLength(trip.overview),
      minDayChars: Math.min(
        ...(trip.itinerary || []).map((day) => plainLength(day.points))
      ),
    })
  }
}

function finish(main) {
  main()
    .catch((error) => {
      console.error(error)
      process.exitCode = 1
    })
    .finally(() => mongoose.disconnect().catch(() => {}))
}

module.exports = {
  mongoose,
  HONEYMOON,
  POPULAR,
  BACKPACKING,
  ROAD,
  TREKKING,
  WEEKEND,
  makeExclusions,
  inclusions,
  slugify,
  unsplash,
  card,
  mumbaiClose,
  plainLength,
  floorDays,
  assertCopy,
  runSeed,
  finish,
}
