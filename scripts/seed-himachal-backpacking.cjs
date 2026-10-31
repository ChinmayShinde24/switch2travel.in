/**
 * One-off seed: Himachal backpacking trip.
 * Uses the Atlas SRV URI the admin provided, with IPv4 DNS so Windows can resolve it.
 */
const dns = require("node:dns")
const mongoose = require("mongoose")

dns.setDefaultResultOrder("ipv4first")
dns.setServers(["8.8.8.8", "1.1.1.1"])

const SRV_URI =
  "mongodb://localhost:27017/switch2travel"
const DIRECT_URI =
  "mongodb://switch2travel_db_user:RmSqh3UC1xpwqYAU@ac-yytyofs-shard-00-00.y9ghcra.mongodb.net:27017,ac-yytyofs-shard-00-01.y9ghcra.mongodb.net:27017,ac-yytyofs-shard-00-02.y9ghcra.mongodb.net:27017/switch2travel?ssl=true&replicaSet=atlas-oytuia-shard-0&authSource=admin&retryWrites=true&w=majority"

const HONEYMOON = new mongoose.Types.ObjectId("6adda7eed1ad0ab6a71bae9e")
const POPULAR = new mongoose.Types.ObjectId("6adda9bcf34a441f5a5298ac")
const BACKPACKING = new mongoose.Types.ObjectId("6adda9d5f34a441f5a5298ad")
const HIMACHAL = new mongoose.Types.ObjectId("6add9d31501aa61d4073acc6")

const cardImage = {
  url: "https://ik.imagekit.io/q36ywbrzq/switch2travel/cities/Snowy_Himalayan_Valley_Village_Enen44b_T.png",
  fileId: "6adda409ead997d09a705cb9",
  filePath: "/switch2travel/cities/Snowy_Himalayan_Valley_Village_Enen44b_T.png",
}

const heroImage = {
  url: "https://ik.imagekit.io/q36ywbrzq/switch2travel/trips/draft-f85d9a53/Himachal_Pradesh__Peaks_and_Valleys_CwltNWHXR.png",
  fileId: "6ae222f9ead997d09a178e88",
  filePath:
    "/switch2travel/trips/draft-f85d9a53/Himachal_Pradesh__Peaks_and_Valleys_CwltNWHXR.png",
}

const galleryImages = [
  {
    url: "https://ik.imagekit.io/q36ywbrzq/switch2travel/trips/draft-f85d9a53/Himalayan_Valley_Adventure_View_VRYBaTUXK.png",
    fileId: "6ae2210fead997d09aff049a",
    filePath:
      "/switch2travel/trips/draft-f85d9a53/Himalayan_Valley_Adventure_View_VRYBaTUXK.png",
  },
  {
    url: "https://ik.imagekit.io/q36ywbrzq/switch2travel/categories/trekking-adventures_04d1t3s9U.jpg",
    fileId: "6addaa14ead997d09a9a8ae4",
    filePath: "/switch2travel/categories/trekking-adventures_04d1t3s9U.jpg",
  },
  {
    url: "https://ik.imagekit.io/q36ywbrzq/switch2travel/categories/long-weekend-getaways_UGS1MXOyk.jpg",
    fileId: "6addaa32ead997d09a9b3733",
    filePath: "/switch2travel/categories/long-weekend-getaways_UGS1MXOyk.jpg",
  },
]

const exclusions = `<ul><li><p><strong>Travel to Chandigarh:</strong> Flight tickets and train fares to and from Chandigarh are not included in the package.</p></li><li><p><strong>Lunch and Meals During Travel:</strong> Lunch and any meals required during road transfers or transportation are not included.</p></li><li><p><strong>Unlisted Expenses:</strong> Any expense or service not specifically mentioned under the package inclusions will be charged separately.</p></li><li><p><strong>Entry Fees, Guides and Insurance:</strong> Monument and attraction entry tickets, guide charges and travel insurance are not included.</p></li><li><p><strong>Personal Expenses:</strong> Laundry, luggage handling, telephone calls, room heater charges, tips, gratuities, camera fees, mineral water, soft drinks and alcoholic beverages must be paid for separately.</p></li><li><p><strong>Adventure Activities:</strong> Adventure activities and their associated charges are not included in the package cost.</p></li><li><p><strong>Unexpected Travel Disruptions:</strong> Additional expenses arising from natural calamities, landslides, road closures, blockages, strikes or other unforeseen disruptions are not covered.</p></li><li><p><strong>Closures of Attractions:</strong> No refund will be provided if a museum or temple is closed on the date of your visit.</p></li><li><p><strong>Missed Flights or Trains:</strong> Switch 2 Travel will not be responsible for missed flights or train departures caused by traffic jams, roadblocks or similar travel delays.</p></li><li><p><strong>Excluded Destinations:</strong> Kasol, Manikaran and Rohtang Pass are not included in this package.</p></li></ul><p></p>`

const cancellationPolicy = `<ul><li><p><strong>Individual Hotel and Campsite Policies:</strong> Every hotel, campsite, resort, or accommodation provider may have its own cancellation policy, including specific deadlines, cancellation charges, and refund conditions.</p></li><li><p><strong>Adherence to Provider Policies:</strong> Switch 2 Travel strictly follows the applicable cancellation policies of the respective service providers. We cannot override, modify, or make exceptions to their rules.</p></li><li><p><strong>Seasonal Cancellation Terms:</strong> Cancellation charges and refund eligibility may vary depending on the travel season, peak-season dates, holidays, special events, and the accommodation provider's booking terms.</p></li><li><p><strong>Cancellation Charges and Refunds:</strong> In case of cancellation, the applicable deductions and charges imposed by the hotel, campsite, or other service provider will be deducted from the amount paid. The remaining eligible balance, if any, will be refunded to the customer according to the provider's policy.</p></li><li><p><strong>Non-Refundable Bookings:</strong> If a booking is non-refundable or the service provider does not approve a refund, the amount retained by the provider will not be refundable.</p></li><li><p><strong>Cancellation Timing:</strong> The refund amount may depend on when the cancellation request is made and how close it is to the scheduled check-in or travel date.</p></li><li><p><strong>No Guaranteed Refund Amount:</strong> Switch 2 Travel does not guarantee a fixed refund amount or percentage unless it has been explicitly confirmed in writing at the time of booking.</p></li><li><p><strong>Review Before Booking:</strong> Customers are advised to review the applicable cancellation terms before confirming their booking. By confirming a trip, customers acknowledge that the relevant cancellation and refund policies apply.</p></li><li><p><strong>Assistance from Switch 2 Travel:</strong> Our team will assist customers with the cancellation process wherever possible. However, the final refund eligibility and amount will depend on the applicable provider's policy and confirmed deductions.</p></li></ul><p></p>`

const paymentPolicy = `<ul><li><p><strong>Advance Payment for Booking Confirmation:</strong> An advance payment of <strong>20% of the total package cost</strong> is required to confirm your booking with Switch 2 Travel. Your booking will be processed for confirmation upon receipt of the advance payment.</p></li><li><p><strong>Balance Payment:</strong> The remaining <strong>80% of the total package cost must be paid at least 15 days before the scheduled trip date</strong>. Customers are requested to complete the payment within the specified timeline to ensure smooth travel arrangements.</p></li><li><p><strong>Timely Payments:</strong> Customers are responsible for making payments within the agreed deadlines. Any delay in payment may affect booking confirmations, hotel availability, or other travel arrangements.</p></li><li><p><strong>Email-Based Communication:</strong> Switch 2 Travel follows a formal, email-based communication process to maintain a clear written record of all booking details, requests, and approvals. Customers must communicate any requests, amendments, or changes to their package in writing via email.</p></li><li><p><strong>Package Modifications and Changes:</strong> Any changes to the itinerary, travel dates, accommodation, sightseeing, or other package arrangements must be submitted in writing via email. Requests will be subject to availability, applicable charges, and approval from Switch 2 Travel and the relevant service providers.</p></li><li><p><strong>Verbal Communication Not Accepted for Changes:</strong> Verbal requests or discussions will not be treated as official instructions or confirmation of any changes to a booking. Any amendment will be considered valid only after it has been communicated in writing and acknowledged by Switch 2 Travel via email.</p></li><li><p><strong>Written Confirmation of Arrangements:</strong> Customers are advised to retain all emails concerning payments, bookings, amendments, and other trip-related matters for future reference.</p></li></ul><p></p>`

const inclusions = `<ul><li><p><strong>Hotel Accommodation:</strong> 2 nights in Shimla, 2 nights in Manali, 2 nights in Dharamshala, 2 nights in Dalhousie and 1 night in Amritsar.</p></li><li><p><strong>Breakfast and Dinner:</strong> Vegetarian breakfast and dinner are included as per the itinerary.</p></li><li><p><strong>Transfers:</strong> Pickup from Chandigarh airport or railway station. Drop at Amritsar airport or railway station as specified in the itinerary.</p></li><li><p><strong>Sightseeing by Private Vehicle:</strong> Travel comfortably between the sightseeing locations mentioned in the itinerary using a private vehicle.</p></li><li><p><strong>Tolls and Taxes:</strong> Applicable road tolls and taxes are included in the package cost.</p></li></ul><p></p>`

const overview = `<p>Travel across Himachal and into Punjab with the <strong>Himachal backpacking package by Switch 2 Travel</strong> — a 10 day, 9 night road journey from Chandigarh to Amritsar via Shimla, Manali, Dharamshala and Dalhousie. The trip is built for travellers who want hill stations, long scenic drives, a quiet stay in the Dhauladhars and a night at the Golden Temple, without having to stitch the route together themselves.</p><p>Your journey starts with a pickup in Chandigarh and a climb into Shimla for Jakhu Temple, Mall Road, Kufri and the colonial Ridge. From there the road follows the Beas to Manali for Hadimba, Vashisht and Solang Valley, then continues to Dharamshala and McLeodganj — Tsuglagkhang, Bhagsu waterfall and an evening at the HPCA stadium. Dalhousie and Khajjiar give you two slower days in the meadows before you descend to Amritsar for the Golden Temple, Jallianwala Bagh and the Partition Museum.</p><p>Hotels, daily breakfast and dinner, private vehicle transfers and the sightseeing listed in the itinerary are included. Adventure activities, entry tickets and travel to Chandigarh stay extra. Whether you are backpacking with friends or taking a longer Himachal holiday from Mumbai, this Shimla–Manali–Dharamshala–Amritsar circuit is a complete mountain-to-plains route with Switch 2 Travel.</p>`

const itinerary = [
  {
    day: 1,
    title: "Chandigarh to Shimla",
    distance: { value: 115, unit: "km" },
    points: `<p>Our driver will meet you at Chandigarh airport or railway station, and from there it is about 115 km (3 to 3.5 hours) up to Shimla. The road starts flat, then the pines show up and the air suddenly feels different. Stop for chai somewhere around Solan. Everyone does.</p><p>Check in, freshen up, and rest for a bit. By late afternoon, head to Jakhu Temple, the Hanuman temple on the highest hill in Shimla. The walk up is steep, so take a stick or a pony if your knees complain. The monkeys are real and they will go for anything in your hands, so keep the sunglasses in your bag.</p><p>Come down for the evening on Mall Road. There is no agenda here. Walk, grab a coffee, stand at Scandal Point and watch the town light up. Dinner is at the hotel.</p>`,
  },
  {
    day: 2,
    title: "Shimla Local Sightseeing",
    distance: { value: 16, unit: "km" },
    points: `<p>After breakfast we take you to Kufri (about 16 km out). It is touristy, yes, but the views over the valley are worth it, and if you like horse rides this is the place. On the way back, stop at the Himalayan Nature Park for a quiet walk among deodars.</p><p>In the afternoon we cover the colonial side of Shimla. Viceregal Lodge is a grand old building where you can wander the gardens. Then the Christ Church on the Ridge, one of the oldest churches in North India, and a slow walk back along the Ridge. If your legs still have energy, Green Valley is a quick photo stop.</p><p>Dinner at the hotel, and the rest of the evening is yours.</p>`,
  },
  {
    day: 3,
    title: "Shimla to Manali via Kullu",
    distance: { value: 250, unit: "km" },
    points: `<p>This is the long driving day, so leave early. Shimla to Manali is about 250 km and takes 7 to 8 hours with stops. You will go down through Mandi and along the Beas river, which keeps you company for most of the way.</p><p>Pandoh Dam, the Aut tunnel and the river stretches near Kullu make good stops. If you are up for it, Kullu has a few rafting points (seasonal, so we will tell you what is open). We suggest a proper lunch break around Kullu and then the final 40 km up to Manali. The scenery gets noticeably wilder as you climb.</p><p>You will reach Manali by evening. Check in, have dinner, and sleep early. You will want to after the drive.</p>`,
  },
  {
    day: 4,
    title: "Manali Local and Solang Valley",
    distance: { value: 13, unit: "km" },
    points: `<p>Start with Hadimba Devi Temple, tucked inside a cedar forest. It is a wooden temple, and honestly the setting is the best part. Then Vashisht Temple, known for its natural hot water springs. Even if you do not take a dip, the village around it is lovely. We will also cover Manu Temple, the Tibetan Monastery and Van Vihar for a calm stroll.</p><p>After lunch we drive about 13 km to Solang Valley. Depending on the season you will find paragliding, zorbing, ropeway rides or just a lot of green (or white) space to sit and look at mountains. Go for the activities you actually want rather than ticking everything off. Prices are paid on the spot and vary by season.</p><p>Back in Manali by evening, you can walk down Mall Road for shopping, then dinner at the hotel.</p>`,
  },
  {
    day: 5,
    title: "Manali to Dharamshala",
    distance: { value: 250, unit: "km" },
    points: `<p>Another long driving day, about 250 km and 7 to 8 hours, passing through Mandi and Palampur. The tea gardens around Palampur are a nice break from the pine forests, so take a chai stop there.</p><p>Once in Dharamshala, rest a little and then visit the HPCA Cricket Stadium in the evening. It is one of the most beautiful stadiums in the world, with the Dhauladhar range standing right behind it. Entry depends on match schedules and local rules, so we will confirm on the day.</p><p>Dinner and a quiet evening at the hotel.</p>`,
  },
  {
    day: 6,
    title: "McLeodganj Sightseeing",
    points: `<p>McLeodganj sits above Dharamshala and feels like a different country. After breakfast we head up to the Tsuglagkhang Complex, the home of the Dalai Lama, with its temple and the Tibet Museum. Spend some time here. People tend to go quiet inside.</p><p>Next, the Namgyal Monastery, Bhagsu Nag Temple and the Bhagsu Waterfall. A short walk gets you to the falls, and the cafes nearby are perfect for a long lunch. On the way you can also stop at St. John in the Wilderness, a small old church surrounded by deodar trees that most people skip.</p><p>Evening is for wandering the McLeodganj market for momos, Tibetan crafts and prayer flags. We stay in Dharamshala tonight.</p>`,
  },
  {
    day: 7,
    title: "Dharamshala to Dalhousie",
    distance: { value: 130, unit: "km" },
    points: `<p>After breakfast we drive to Dalhousie, about 130 km and 4 to 5 hours. The roads wind through low hills and small villages, and the landscape slowly turns greener.</p><p>Once you are settled, we do some local sightseeing. Subhash Baoli is a quiet spot connected to Netaji Subhas Chandra Bose, who spent time here. Panchpula has a calm stream and a small waterfall, and Satdhara Falls is nearby. In the evening, walk along Gandhi Chowk and the Garam Sadak for a slow, unhurried feel. Dalhousie is much quieter than Shimla or Manali, which is the point.</p><p>Dinner at the hotel.</p>`,
  },
  {
    day: 8,
    title: "Khajjiar Day",
    distance: { value: 22, unit: "km" },
    points: `<p>Khajjiar is about 22 km from Dalhousie, and it is often called the Mini Switzerland of India. Fair warning: it is not literally Switzerland, but a big open meadow ringed by tall deodars, with a small lake in the middle, really is something. You can try horse riding, zorbing or just lie on the grass doing nothing.</p><p>On the way back, stop at Kalatop Wildlife Sanctuary if time allows. A short forest walk there is lovely and very peaceful.</p><p>Back at the hotel for dinner. This is a good night for an early sleep before the road tomorrow.</p>`,
  },
  {
    day: 9,
    title: "Dalhousie to Amritsar",
    distance: { value: 190, unit: "km" },
    points: `<p>About 190 km and 5 hours down from the hills, and you will feel the temperature rise as you descend. Roads are good for most of the way.</p><p>Reach Amritsar, check in and take a rest. In the evening we go to the Golden Temple. Seeing it lit up at night, reflected in the water, is honestly worth the whole drive. Cover your head, leave your shoes at the counter, and take your time. If you want to try the langar (free community meal), go for it.</p><p>Dinner is included at the hotel. If you would like to add the Wagah Border ceremony, tell us in advance. It needs an earlier arrival and some planning.</p>`,
  },
  {
    day: 10,
    title: "Amritsar Sightseeing and Drop",
    points: `<p>Start early. The Golden Temple in the morning is a totally different mood, calmer and quieter. Then it is a short walk to Jallianwala Bagh, which is moving and quiet, and the Partition Museum, which stays with you for a while.</p><p>Have a proper Amritsari lunch before you leave. Kulcha and lassi are non-negotiable. After that, we drop you at the airport or railway station according to your departure time.</p>`,
  },
]

const trip = {
  title: "Himachal backpacking - Amritsar with Shimla, manali and Dharmshala",
  slug: "himachal-backpacking-amritsar-with-shimla-manali-and-dharmshala",
  categoryId: BACKPACKING,
  categoryIds: [HONEYMOON, POPULAR, BACKPACKING],
  cityId: HIMACHAL,
  status: "published",
  visibility: "active",
  cardImage,
  pickup: "Chandigarh",
  drop: "Amritsar",
  durationDays: 10,
  startingPrice: 0,
  heroImage,
  galleryImages,
  overview,
  itinerary,
  inclusions,
  exclusions,
  cancellationPolicy,
  paymentPolicy,
  faqs: [],
  metaTitle: "Himachal Backpacking 10D | Switch 2 Travel",
  metaDescription:
    "10-day Himachal backpacking from Chandigarh to Amritsar via Shimla, Manali, Dharamshala and Dalhousie. Hotels, transfers and sightseeing included.",
}

async function connect() {
  const options = {
    serverSelectionTimeoutMS: 20000,
    family: 4,
  }
  try {
    await mongoose.connect(SRV_URI, options)
    console.log("Connected with mongodb+srv")
  } catch (error) {
    console.warn("SRV connect failed:", error.message)
    console.log("Retrying with direct Atlas hosts…")
    await mongoose.connect(DIRECT_URI, options)
    console.log("Connected with direct mongodb:// hosts")
  }
}

async function main() {
  await connect()

  const categories = await mongoose.connection.db
    .collection("categories")
    .find({ _id: { $in: [HONEYMOON, POPULAR, BACKPACKING] } })
    .project({ name: 1, slug: 1 })
    .toArray()

  const city = await mongoose.connection.db
    .collection("cities")
    .findOne({ _id: HIMACHAL }, { projection: { name: 1, slug: 1 } })

  if (categories.length !== 3) {
    throw new Error(
      `Expected 3 categories, found ${categories.length}: ${JSON.stringify(categories)}`
    )
  }
  if (!city) {
    throw new Error("Himachal city not found for 6add9d31501aa61d4073acc6")
  }

  console.log(
    "Categories:",
    categories.map((c) => `${c.name} (${c._id})`).join(" | ")
  )
  console.log(`City: ${city.name} (${city._id})`)

  const now = new Date()
  const result = await mongoose.connection.db.collection("trips").findOneAndUpdate(
    { slug: trip.slug },
    { $set: { ...trip, updatedAt: now }, $setOnInsert: { createdAt: now } },
    { upsert: true, returnDocument: "after" }
  )

  const saved = result && result.value ? result.value : result
  if (!saved?._id) {
    const fallback = await mongoose.connection.db
      .collection("trips")
      .findOne({ slug: trip.slug })
    if (!fallback) throw new Error("Trip write finished but document was not found")
    console.log("Trip saved:", {
      id: String(fallback._id),
      title: fallback.title,
      slug: fallback.slug,
      days: fallback.durationDays,
      pickup: fallback.pickup,
      drop: fallback.drop,
      categories: fallback.categoryIds.map(String),
      cityId: String(fallback.cityId),
      itineraryDays: fallback.itinerary.length,
    })
    return
  }

  console.log("Trip saved:", {
    id: String(saved._id),
    title: saved.title,
    slug: saved.slug,
    days: saved.durationDays,
    pickup: saved.pickup,
    drop: saved.drop,
    categories: saved.categoryIds.map(String),
    cityId: String(saved.cityId),
    itineraryDays: saved.itinerary.length,
  })
}

main()
  .catch((error) => {
    console.error(error)
    process.exitCode = 1
  })
  .finally(async () => {
    await mongoose.disconnect().catch(() => {})
  })
