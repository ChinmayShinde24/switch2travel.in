/**
 * Seed ten Kerala packages from the catalog screenshot.
 *
 * Copy rules (same voice as Shimla–Manali and later trip scripts):
 * - Overview: three readable SEO paragraphs. Name the package with Switch 2 Travel,
 *   walk the route and attractions, then close with Mumbai planning + drop.
 * - Itinerary: one full paragraph per day (pickup, en-route stop, arrival, hotel).
 *   Not short bullet-style sentences.
 * - Images: unique card per trip, matched to that route (tea, waterfall, houseboat, beach).
 * - Titles: Kerala Trip - … (XN/YD). Meta title ≤60, meta description ≤160.
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
const WEEKEND = new mongoose.Types.ObjectId("6addaa44f34a441f5a5298b0")
const KERALA = new mongoose.Types.ObjectId("6adda582e4fc8ac7eb92adb5")

const exclusions = `<ul><li><p><strong>Travel to the start city:</strong> Flight tickets and train fares to and from Kochi or Trivandrum are not included in the package.</p></li><li><p><strong>Lunch and Meals During Travel:</strong> Lunch and any meals required during road transfers or transportation are not included.</p></li><li><p><strong>Unlisted Expenses:</strong> Any expense or service not specifically mentioned under the package inclusions will be charged separately.</p></li><li><p><strong>Entry Fees, Guides and Insurance:</strong> Monument and attraction entry tickets, guide charges and travel insurance are not included.</p></li><li><p><strong>Personal Expenses:</strong> Laundry, luggage handling, telephone calls, room heater charges, tips, gratuities, camera fees, mineral water, soft drinks and alcoholic beverages must be paid for separately.</p></li><li><p><strong>Adventure Activities:</strong> Houseboat upgrades, Kathakali, Kalaripayattu, spice-plantation add-ons, boating and other adventure charges are not included in the package cost.</p></li><li><p><strong>Unexpected Travel Disruptions:</strong> Additional expenses arising from natural calamities, landslides, road closures, blockages, strikes or other unforeseen disruptions are not covered.</p></li><li><p><strong>Closures of Attractions:</strong> No refund will be provided if a park, museum or attraction is closed on the date of your visit.</p></li><li><p><strong>Missed Flights or Trains:</strong> Switch 2 Travel will not be responsible for missed flights or train departures caused by traffic jams, roadblocks or similar travel delays.</p></li></ul><p></p>`

const cancellationPolicy = `<ul><li><p><strong>Individual Hotel and Campsite Policies:</strong> Every hotel, campsite, resort, or accommodation provider may have its own cancellation policy, including specific deadlines, cancellation charges, and refund conditions.</p></li><li><p><strong>Adherence to Provider Policies:</strong> Switch 2 Travel strictly follows the applicable cancellation policies of the respective service providers. We cannot override, modify, or make exceptions to their rules.</p></li><li><p><strong>Seasonal Cancellation Terms:</strong> Cancellation charges and refund eligibility may vary depending on the travel season, peak-season dates, holidays, special events, and the accommodation provider's booking terms.</p></li><li><p><strong>Cancellation Charges and Refunds:</strong> In case of cancellation, the applicable deductions and charges imposed by the hotel, campsite, or other service provider will be deducted from the amount paid. The remaining eligible balance, if any, will be refunded to the customer according to the provider's policy.</p></li><li><p><strong>Non-Refundable Bookings:</strong> If a booking is non-refundable or the service provider does not approve a refund, the amount retained by the provider will not be refundable.</p></li><li><p><strong>Cancellation Timing:</strong> The refund amount may depend on when the cancellation request is made and how close it is to the scheduled check-in or travel date.</p></li><li><p><strong>No Guaranteed Refund Amount:</strong> Switch 2 Travel does not guarantee a fixed refund amount or percentage unless it has been explicitly confirmed in writing at the time of booking.</p></li><li><p><strong>Review Before Booking:</strong> Customers are advised to review the applicable cancellation terms before confirming their booking. By confirming a trip, customers acknowledge that the relevant cancellation and refund policies apply.</p></li><li><p><strong>Assistance from Switch 2 Travel:</strong> Our team will assist customers with the cancellation process wherever possible. However, the final refund eligibility and amount will depend on the applicable provider's policy and confirmed deductions.</p></li></ul><p></p>`

const paymentPolicy = `<ul><li><p><strong>Advance Payment for Booking Confirmation:</strong> An advance payment of <strong>20% of the total package cost</strong> is required to confirm your booking with Switch 2 Travel. Your booking will be processed for confirmation upon receipt of the advance payment.</p></li><li><p><strong>Balance Payment:</strong> The remaining <strong>80% of the total package cost must be paid at least 15 days before the scheduled trip date</strong>. Customers are requested to complete the payment within the specified timeline to ensure smooth travel arrangements.</p></li><li><p><strong>Timely Payments:</strong> Customers are responsible for making payments within the agreed deadlines. Any delay in payment may affect booking confirmations, hotel availability, or other travel arrangements.</p></li><li><p><strong>Email-Based Communication:</strong> Switch 2 Travel follows a formal, email-based communication process to maintain a clear written record of all booking details, requests, and approvals. Customers must communicate any requests, amendments, or changes to their package in writing via email.</p></li><li><p><strong>Package Modifications and Changes:</strong> Any changes to the itinerary, travel dates, accommodation, sightseeing, or other package arrangements must be submitted in writing via email. Requests will be subject to availability, applicable charges, and approval from Switch 2 Travel and the relevant service providers.</p></li><li><p><strong>Verbal Communication Not Accepted for Changes:</strong> Verbal requests or discussions will not be treated as official instructions or confirmation of any changes to a booking. Any amendment will be considered valid only after it has been communicated in writing and acknowledged by Switch 2 Travel via email.</p></li><li><p><strong>Written Confirmation of Arrangements:</strong> Customers are advised to retain all emails concerning payments, bookings, amendments, and other trip-related matters for future reference.</p></li></ul><p></p>`

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

function unsplash(photoId, label, width = 1920) {
  return {
    url: `https://images.unsplash.com/${photoId}?auto=format&fit=crop&w=${width}&q=80`,
    fileId: `unsplash-${label}`,
    filePath: `/switch2travel/trips/kerala/${label}.jpg`,
  }
}

function mumbaiClose(places, drop, escapePhrase) {
  return `<p>For travellers planning a Kerala holiday from Mumbai, Switch 2 Travel helps make the trip easier to plan with accommodation, sightseeing and transfers as outlined in the package. As a travel agency in Mumbai offering holiday packages, Switch 2 Travel brings together the key experiences of ${places} in one convenient itinerary. Whether you are planning a family holiday, a trip with friends or ${escapePhrase}, this Kerala tour package is a great way to experience God's Own Country. The package concludes with a transfer back to ${drop}, leaving you with beautiful memories of your Kerala getaway.</p>`
}

const houseboatImage = {
  url: "https://ik.imagekit.io/q36ywbrzq/switch2travel/cities/kerala-backwaters-houseboat_8nT2PNH7Qo.jpg",
  fileId: "6adda57fead997d09a8102c4",
  filePath: "/switch2travel/cities/kerala-backwaters-houseboat_8nT2PNH7Qo.jpg",
}

const photo = {
  munnarTea: unsplash("photo-1544735716-392fe2489ffa", "munnar-tea-gardens"),
  munnarHills: unsplash("photo-1596401057633-84a60def2c16", "munnar-tea-hills"),
  backwaters: unsplash("photo-1602216054736-8e4cd6663da8", "kerala-backwaters"),
  houseboat: unsplash("photo-1593693397690-362cb9666fc2", "alleppey-houseboat"),
  houseboatIk: houseboatImage,
  waterfall: unsplash("photo-1664535752739-6f62ab720707", "kerala-waterfall"),
  waterfallWide: unsplash("photo-1570168007204-dfb528c6958f", "athirappilly-falls"),
  forest: unsplash("photo-1441974231531-c6227db76b6e", "thekkady-forest"),
  kovalamLight: unsplash("photo-1695030744519-3f3042b3af26", "kovalam-lighthouse"),
  kovalamBeach: unsplash("photo-1507525428034-b723cf961d3e", "kovalam-beach"),
  varkalaWaves: unsplash("photo-1475924156734-496f6cac6ec1", "varkala-arabian-sea"),
  varkalaCliff: unsplash("photo-1473116763249-2faa4d424955", "varkala-cliff-beach"),
  southBeach: unsplash("photo-1512343879784-a960bf40e7f2", "kerala-south-beach"),
  tropicalWater: unsplash("photo-1559827260-dc66d52bef19", "backwater-canal"),
  canalBoat: unsplash("photo-1544551763-46a013bb70d5", "kerala-canal-boat"),
  temple: unsplash("photo-1582510003544-4d00b7f74220", "kerala-temple"),
  honeymoonStay: unsplash("photo-1520250497591-71c291d2282b", "kerala-honeymoon-stay"),
  festiveKochi: unsplash("photo-1482517967863-00e15c9b44be", "kochi-festive-evening"),
  mistHills: unsplash("photo-1470071459604-3b5ec3a7fe05", "munnar-mist-hills"),
  romantic: unsplash("photo-1465495976277-4387d4b0b4c6", "kerala-honeymoon-evening"),
}

const trips = [
  {
    title: "Kerala Trip - Munnar with Alleppey Tour Package (4N/5D)",
    categoryId: POPULAR,
    categoryIds: [POPULAR, WEEKEND],
    pickup: "Kochi",
    drop: "Kochi",
    durationDays: 5,
    stayLine: "2 nights in Munnar, 1 night on an Alleppey houseboat and 1 night in Alleppey.",
    cardImage: { ...photo.munnarTea, url: photo.munnarTea.url.replace("w=1920", "w=1600") },
    heroImage: photo.backwaters,
    galleryImages: [photo.houseboatIk],
    metaTitle: "Munnar & Alleppey Package (5D/4N) | Switch 2 Travel",
    metaDescription:
      "Planning a Kerala trip from Mumbai? This 5D/4N tour covers Munnar tea hills and Alleppey backwaters, with hotel stays and Kochi transfers.",
    overview: `<p>Discover the beauty of God's Own Country with the <strong>Munnar with Alleppey tour package by Switch 2 Travel</strong>, designed for travellers looking to explore the tea hills of Munnar and the backwaters of Alleppey in one short Kerala holiday. From the rolling plantations around Mattupetty and Kundala Lake to a slow houseboat cruise through coconut groves and paddy canals, this 5 days and 4 nights Kerala tour offers a memorable first-time getaway filled with sightseeing, local experiences and quiet evenings by the water.</p><p>Your journey begins in Kochi, with a scenic drive of about 130 km towards Munnar and a stop at Cheeyappara and Valara waterfalls along the way when the road is clear. Explore Munnar's tea gardens, Echo Point and a tea museum, with Eravikulam National Park subject to opening dates. The Alleppey experience includes a night on a houseboat and a relaxed morning on land before the short 55 km return to Kochi. The itinerary also leaves room for Fort Kochi and the Chinese fishing nets if your departure is later in the day.</p>${mumbaiClose("Munnar and Alleppey", "Kochi airport or railway station", "a relaxing long-weekend escape to the hills and backwaters")}`,
    itinerary: [
      {
        day: 1,
        title: "Kochi to Munnar",
        distance: { value: 130, unit: "km" },
        points: `<p>Begin your Kerala holiday with pickup from Kochi airport or railway station and a scenic drive of about 130 km towards Munnar, usually 4 to 5 hours through the Western Ghats. En route, visit Cheeyappara and Valara waterfalls when traffic and weather allow, and take some time to enjoy the views before continuing into the tea country. On arrival, transfer to your hotel, check in and relax after the journey. A short walk near the tea slopes around your stay is a gentle way to start the Munnar with Alleppey tour package with Switch 2 Travel. Overnight in Munnar.</p>`,
      },
      {
        day: 2,
        title: "Munnar sightseeing",
        points: `<p>After breakfast, spend a full day exploring the hill station that gives this Kerala package its character. Visit Mattupetty Dam, Echo Point and Kundala Lake, then walk through a tea garden and a tea museum to understand how the plantations work. Eravikulam National Park may be included when it is open and permits are available; entry tickets remain extra. Return to the hotel in the evening for dinner, or stroll MG Road if you prefer a local market hour. Overnight in Munnar.</p>`,
      },
      {
        day: 3,
        title: "Munnar to Alleppey houseboat",
        distance: { value: 160, unit: "km" },
        points: `<p>After breakfast, check out and drive about 160 km, roughly 4 to 5 hours, from the tea hills down towards Alleppey, also known as Alappuzha. On arrival, board your houseboat around midday for a slow cruise through the backwaters, canals, paddy fields and coconut groves that Kerala is known for. Lunch and dinner are served on board as per the houseboat arrangement. Watch village life along the banks as the boat moors for the night. Overnight on the Alleppey backwaters.</p>`,
      },
      {
        day: 4,
        title: "Alleppey leisure",
        points: `<p>Disembark after breakfast and transfer to your hotel or homestay on land in Alleppey. The day is kept easy so you can enjoy a village walk, sit by a canal, or add a short canoe ride if you wish, subject to availability and extra charges. There is no long road drive today, which makes this a restful middle of the Kerala itinerary. Dinner at the hotel and overnight in Alleppey.</p>`,
      },
      {
        day: 5,
        title: "Alleppey to Kochi drop",
        distance: { value: 55, unit: "km" },
        points: `<p>After breakfast, check out and drive about 55 km, around 1.5 to 2 hours, back to Kochi. If your flight or train is later in the day, you may visit Fort Kochi and the Chinese fishing nets for a short walk before the drop. Transfer to Kochi airport or railway station as per your departure, concluding the Munnar with Alleppey tour package with Switch 2 Travel.</p>`,
      },
    ],
  },
  {
    title:
      "Kerala Trip - Munnar Thekkady Alleppey Varkala Backpacking Package (7N/8D)",
    categoryId: BACKPACKING,
    categoryIds: [BACKPACKING, POPULAR],
    pickup: "Kochi",
    drop: "Trivandrum",
    durationDays: 8,
    stayLine:
      "2 nights in Munnar, 1 night in Thekkady, 1 night on an Alleppey houseboat, 1 night in Alleppey and 2 nights in Varkala.",
    cardImage: { ...photo.southBeach, url: photo.southBeach.url.replace("w=1920", "w=1600") },
    heroImage: photo.forest,
    galleryImages: [photo.houseboat],
    metaTitle: "Kerala Backpacking Package (8D/7N) | Switch 2 Travel",
    metaDescription:
      "Planning a Kerala backpacking trip from Mumbai? This 8D/7N tour covers Munnar, Thekkady, Alleppey and Varkala, with stays and Kochi to Trivandrum transfers.",
    overview: `<p>Discover the longer Kerala circuit with the <strong>Munnar, Thekkady, Alleppey and Varkala backpacking package by Switch 2 Travel</strong>, designed for travellers looking to combine tea hills, spice country, a houseboat night and a cliff beach in one journey. From the plantations of Munnar and the forests around Periyar in Thekkady to the backwaters of Alleppey and the Arabian Sea at Varkala, this 8 days and 7 nights Kerala tour offers a memorable backpacking-style getaway filled with sightseeing, local experiences and time by the water.</p><p>Your journey begins in Kochi, with a scenic drive of about 130 km towards Munnar, then continues 110 km to Thekkady for a spice plantation walk and an optional Periyar lake boat. The Alleppey experience includes a houseboat cruise after a 145 km drive from Thekkady. The itinerary then follows the coast about 130 km to Varkala for Papanasam beach, the cliff walk and Janardhana Swamy Temple, before a 50 km drop to Trivandrum.</p>${mumbaiClose("Munnar, Thekkady, Alleppey and Varkala", "Trivandrum airport or railway station", "a longer escape with friends through hills, spice and the coast")}`,
    itinerary: [
      {
        day: 1,
        title: "Kochi to Munnar",
        distance: { value: 130, unit: "km" },
        points: `<p>Begin your Kerala backpacking holiday with pickup from Kochi airport or railway station and a scenic drive of about 130 km towards Munnar. En route, visit Cheeyappara waterfall if the road and timing allow, then continue through the Ghats into tea country. On arrival, transfer to your hotel, check in and relax after the journey. Evening at leisure among the tea slopes. Overnight in Munnar.</p>`,
      },
      {
        day: 2,
        title: "Munnar sightseeing",
        points: `<p>After breakfast, explore Munnar with visits to Mattupetty Dam, Echo Point, Kundala Lake and a tea garden or tea museum. Eravikulam National Park may be added when it is open; park tickets stay extra. Return to the hotel in the evening for dinner. Overnight in Munnar.</p>`,
      },
      {
        day: 3,
        title: "Munnar to Thekkady",
        distance: { value: 110, unit: "km" },
        points: `<p>After breakfast, drive about 110 km, roughly 3.5 to 4 hours, from Munnar to Thekkady, the spice-country gateway to Periyar. On arrival, check in and take a guided spice plantation walk to see pepper, cardamom and other local crops. An optional Kathakali or Kalaripayattu performance may be arranged in the evening at extra cost. Overnight in Thekkady.</p>`,
      },
      {
        day: 4,
        title: "Thekkady to Alleppey houseboat",
        distance: { value: 145, unit: "km" },
        points: `<p>An optional morning boat on Periyar Lake can be added if you wish, subject to park timings and extra tickets. After breakfast, drive about 145 km towards Alleppey and board the houseboat for a backwater cruise through canals and paddy country. Lunch and dinner are served on board. Overnight on the Alleppey backwaters.</p>`,
      },
      {
        day: 5,
        title: "Alleppey to Varkala",
        distance: { value: 130, unit: "km" },
        points: `<p>Disembark after breakfast and drive about 130 km, around 3 to 3.5 hours, south to Varkala. On arrival, check in and walk the cliff towards Papanasam beach for sunset over the Arabian Sea. Cafes and the cliff path give this backpacking itinerary its coastal character. Dinner at the hotel and overnight in Varkala.</p>`,
      },
      {
        day: 6,
        title: "Varkala leisure",
        points: `<p>After breakfast, visit Janardhana Swamy Temple and spend the rest of the day on the cliff and at Papanasam beach. Optional kayaking or a surf lesson can be added at extra cost if the sea is suitable. There is no long transfer today. Overnight in Varkala.</p>`,
      },
      {
        day: 7,
        title: "Varkala free morning",
        points: `<p>Keep the morning slow with breakfast and beach time so you are not rushing a late train or flight the same evening. Use the afternoon to pack, shop along the cliff, or rest at the hotel. Overnight remains in Varkala so the next day's drop to Trivandrum is short and calm.</p>`,
      },
      {
        day: 8,
        title: "Varkala to Trivandrum drop",
        distance: { value: 50, unit: "km" },
        points: `<p>After breakfast, check out and drive about 50 km, around 1.5 hours, to Trivandrum airport or railway station. This concludes the Munnar, Thekkady, Alleppey and Varkala backpacking package with Switch 2 Travel.</p>`,
      },
    ],
  },
  {
    title: "Kerala Trip - Athirappilly Waterfalls Tour Package (6N/7D)",
    categoryId: POPULAR,
    categoryIds: [POPULAR, WEEKEND],
    pickup: "Kochi",
    drop: "Kochi",
    durationDays: 7,
    stayLine:
      "1 night near Athirappilly, 2 nights in Munnar, 1 night in Thekkady, 1 night on an Alleppey houseboat and 1 night in Kochi.",
    cardImage: { ...photo.waterfall, url: photo.waterfall.url.replace("w=1920", "w=1600") },
    heroImage: photo.waterfallWide,
    galleryImages: [photo.munnarHills],
    metaTitle: "Athirappilly Kerala Package (7D/6N) | Switch 2 Travel",
    metaDescription:
      "Planning a Kerala trip from Mumbai? This 7D/6N tour covers Athirappilly waterfalls, Munnar, Thekkady and Alleppey, with hotel stays and Kochi transfers.",
    overview: `<p>Discover the beauty of central Kerala with the <strong>Athirappilly waterfalls tour package by Switch 2 Travel</strong>, designed for travellers looking to add Kerala's widest waterfall to the classic hill-and-backwater circuit. From the viewpoints of Athirappilly and Vazhachal to the tea gardens of Munnar, the spice forests of Thekkady and a night on an Alleppey houseboat, this 7 days and 6 nights Kerala tour offers a memorable getaway filled with sightseeing, nature walks and a final evening in Fort Kochi.</p><p>Your journey begins in Kochi, with a scenic drive of about 70 km towards Athirappilly. The next morning you climb roughly 160 km into Munnar, then continue 110 km to Thekkady and 145 km to the houseboat. The last 55 km returns you to Kochi for Chinese fishing nets, Jew Town and a relaxed night before your flight. Waterfall parking and the Periyar boat remain extra and are subject to park and weather conditions.</p>${mumbaiClose("Athirappilly, Munnar, Thekkady and Alleppey", "Kochi airport or railway station", "a nature-focused escape with waterfalls, hills and backwaters")}`,
    itinerary: [
      {
        day: 1,
        title: "Kochi to Athirappilly",
        distance: { value: 70, unit: "km" },
        points: `<p>Begin your Kerala holiday with pickup from Kochi airport or railway station and a scenic drive of about 70 km, around 2 to 2.5 hours, towards Athirappilly. On arrival, visit the viewpoints of Athirappilly Falls, often called the Niagara of India, and continue to Vazhachal Falls when time and park hours allow. Parking and entry charges stay extra. Transfer to your hotel near the falls, check in and relax. Overnight near Athirappilly.</p>`,
      },
      {
        day: 2,
        title: "Athirappilly to Munnar",
        distance: { value: 160, unit: "km" },
        points: `<p>After breakfast, check out and drive about 160 km, usually 5 to 6 hours, from the waterfall belt into the tea hills of Munnar. The road climbs through forest and plantation country, so the day is kept mainly as a transfer with photo stops where safe. On arrival, transfer to your hotel, check in and rest after the journey. Overnight in Munnar.</p>`,
      },
      {
        day: 3,
        title: "Munnar sightseeing",
        points: `<p>After breakfast, explore Munnar with Mattupetty Dam, Echo Point, tea gardens and a tea museum. Eravikulam National Park may be included when it is open. Return to the hotel in the evening. Overnight in Munnar.</p>`,
      },
      {
        day: 4,
        title: "Munnar to Thekkady",
        distance: { value: 110, unit: "km" },
        points: `<p>After breakfast, drive about 110 km to Thekkady. Check in and take a spice plantation walk to see how pepper and cardamom grow in this part of Idukki. An optional cultural show may be added in the evening at extra cost. Overnight in Thekkady.</p>`,
      },
      {
        day: 5,
        title: "Thekkady to Alleppey houseboat",
        distance: { value: 145, unit: "km" },
        points: `<p>After breakfast, drive about 145 km from Thekkady to Alleppey and board the houseboat for a backwater cruise. Lunch and dinner are served on board as you move through canals and paddy fields. Overnight on the Alleppey backwaters.</p>`,
      },
      {
        day: 6,
        title: "Alleppey to Kochi",
        distance: { value: 55, unit: "km" },
        points: `<p>Disembark after breakfast and drive about 55 km to Fort Kochi. Check in and spend the evening at the Chinese fishing nets, St. Francis Church and Jew Town, walking at an easy pace. Dinner at the hotel and overnight in Kochi.</p>`,
      },
      {
        day: 7,
        title: "Kochi drop",
        points: `<p>After breakfast, check out and transfer to Kochi airport or railway station as per your departure. This concludes the Athirappilly waterfalls tour package with Switch 2 Travel.</p>`,
      },
    ],
  },
  {
    title: "Kerala Trip - Munnar Thekkady Alleppey Tour Package (5N/6D)",
    categoryId: POPULAR,
    categoryIds: [POPULAR],
    pickup: "Kochi",
    drop: "Kochi",
    durationDays: 6,
    stayLine:
      "2 nights in Munnar, 1 night in Thekkady, 1 night on an Alleppey houseboat and 1 night in Alleppey.",
    cardImage: { ...photo.munnarHills, url: photo.munnarHills.url.replace("w=1920", "w=1600") },
    heroImage: photo.mistHills,
    galleryImages: [photo.houseboatIk],
    metaTitle: "Munnar Thekkady Alleppey (6D/5N) | Switch 2 Travel",
    metaDescription:
      "Planning a Kerala trip from Mumbai? This 6D/5N tour covers Munnar, Thekkady and Alleppey houseboat, with hotel stays and Kochi transfers.",
    overview: `<p>Discover the classic Kerala triangle with the <strong>Munnar, Thekkady and Alleppey tour package by Switch 2 Travel</strong>, designed for travellers looking to see tea hills, spice country and the backwaters without a long coastal extension. From Mattupetty and the plantations of Munnar to a spice walk in Thekkady and a night on an Alleppey houseboat, this 6 days and 5 nights Kerala tour offers a memorable circuit filled with sightseeing, local experiences and comfortable road transfers from Kochi.</p><p>Your journey begins in Kochi, with a scenic drive of about 130 km towards Munnar via the Cheeyappara waterfall belt. Explore Munnar on a full sightseeing day, then continue 110 km to Thekkady for Periyar country and spices. The Alleppey experience includes a houseboat cruise after a 145 km drive, followed by a night on land before the 55 km return to Kochi. Optional Periyar boat tickets and cultural shows stay extra.</p>${mumbaiClose("Munnar, Thekkady and Alleppey", "Kochi airport or railway station", "a balanced family holiday through hills, spice and backwaters")}`,
    itinerary: [
      {
        day: 1,
        title: "Kochi to Munnar",
        distance: { value: 130, unit: "km" },
        points: `<p>Begin your Kerala holiday with pickup from Kochi and a scenic drive of about 130 km towards Munnar. En route, visit the Cheeyappara and Valara waterfall stretch when the road is clear. On arrival, transfer to your hotel, check in and relax after the climb into the tea hills. Overnight in Munnar.</p>`,
      },
      {
        day: 2,
        title: "Munnar sightseeing",
        points: `<p>After breakfast, enjoy a full day in Munnar covering Mattupetty Dam, Echo Point, Kundala Lake, tea gardens and a tea museum. Eravikulam National Park may be included when open. Return to the hotel for dinner. Overnight in Munnar.</p>`,
      },
      {
        day: 3,
        title: "Munnar to Thekkady",
        distance: { value: 110, unit: "km" },
        points: `<p>After breakfast, drive about 110 km from Munnar to Thekkady. Check in and take a spice plantation walk to see pepper, cardamom and other local crops. Evening at leisure, with an optional Kathakali performance at extra cost. Overnight in Thekkady.</p>`,
      },
      {
        day: 4,
        title: "Thekkady to Alleppey houseboat",
        distance: { value: 145, unit: "km" },
        points: `<p>An optional morning boat on Periyar Lake can be arranged if you wish, subject to park tickets and timings. After breakfast, drive about 145 km to Alleppey and board the houseboat for a backwater cruise. Lunch and dinner on board. Overnight on the water.</p>`,
      },
      {
        day: 5,
        title: "Alleppey leisure",
        points: `<p>Disembark after breakfast and transfer to your hotel on land in Alleppey. Spend the afternoon on a canal-side walk or at the hotel, without a long road drive. Dinner at the hotel and overnight in Alleppey.</p>`,
      },
      {
        day: 6,
        title: "Alleppey to Kochi drop",
        distance: { value: 55, unit: "km" },
        points: `<p>After breakfast, drive about 55 km to Kochi airport or railway station. Fort Kochi and the Chinese fishing nets may be visited if your departure time allows. This concludes the Munnar, Thekkady and Alleppey tour package with Switch 2 Travel.</p>`,
      },
    ],
  },
  {
    title:
      "Kerala Trip - Munnar Thekkady Alleppey Backwaters Tour Package (6N/7D)",
    categoryId: POPULAR,
    categoryIds: [POPULAR, WEEKEND],
    pickup: "Kochi",
    drop: "Kochi",
    durationDays: 7,
    stayLine:
      "1 night in Kochi, 2 nights in Munnar, 1 night in Thekkady, 1 night on an Alleppey houseboat and 1 night in Alleppey.",
    cardImage: photo.houseboatIk,
    heroImage: photo.tropicalWater,
    galleryImages: [photo.canalBoat],
    metaTitle: "Kerala Backwaters Package (7D/6N) | Switch 2 Travel",
    metaDescription:
      "Planning a Kerala trip from Mumbai? This 7D/6N tour covers Kochi, Munnar, Thekkady and Alleppey backwaters, with hotel stays and Kochi transfers.",
    overview: `<p>Discover Kerala's backwaters with the <strong>Munnar, Thekkady and Alleppey backwaters tour package by Switch 2 Travel</strong>, designed for travellers who want a Fort Kochi night on arrival so a late Mumbai flight is not a scramble, then the classic hills-and-houseboat loop. From the Chinese fishing nets of Fort Kochi to Munnar's tea gardens, Thekkady's spice country and a night on an Alleppey houseboat, this 7 days and 6 nights Kerala tour offers a memorable getaway filled with sightseeing, local experiences and a slow cruise through the canals.</p><p>Your journey begins in Kochi with an evening at Fort Kochi, Jew Town and the harbour. The next day you drive about 130 km to Munnar, then 110 km to Thekkady and 145 km to the houseboat. A night on land in Alleppey follows the cruise, before the 55 km return to Kochi. The itinerary uses the same road distances as the shorter triangle, with the extra Kochi night making arrivals and departures easier to plan.</p>${mumbaiClose("Kochi, Munnar, Thekkady and the Alleppey backwaters", "Kochi airport or railway station", "a relaxing escape built around a houseboat night")}`,
    itinerary: [
      {
        day: 1,
        title: "Arrive Kochi",
        points: `<p>Begin your Kerala holiday with pickup from Kochi airport or railway station and a transfer to your hotel in or near Fort Kochi. After check-in, explore the Chinese fishing nets, St. Francis Church and Jew Town at an easy pace, depending on your arrival time. Dinner at the hotel and overnight in Kochi.</p>`,
      },
      {
        day: 2,
        title: "Kochi to Munnar",
        distance: { value: 130, unit: "km" },
        points: `<p>After breakfast, drive about 130 km towards Munnar, stopping at Cheeyappara and Valara waterfalls when the road allows. On arrival, transfer to your hotel, check in and relax among the tea hills. Overnight in Munnar.</p>`,
      },
      {
        day: 3,
        title: "Munnar sightseeing",
        points: `<p>After breakfast, spend the day at Mattupetty Dam, Echo Point, Kundala Lake, tea gardens and a tea museum, with Eravikulam National Park when it is open. Return to the hotel for dinner. Overnight in Munnar.</p>`,
      },
      {
        day: 4,
        title: "Munnar to Thekkady",
        distance: { value: 110, unit: "km" },
        points: `<p>After breakfast, drive about 110 km to Thekkady. Check in and enjoy a spice plantation walk. Evening at leisure. Overnight in Thekkady.</p>`,
      },
      {
        day: 5,
        title: "Thekkady to Alleppey houseboat",
        distance: { value: 145, unit: "km" },
        points: `<p>After breakfast, drive about 145 km to Alleppey and board the houseboat for a backwater cruise through canals, paddy and coconut groves. Lunch and dinner on board. Overnight on the Alleppey backwaters.</p>`,
      },
      {
        day: 6,
        title: "Alleppey leisure",
        points: `<p>Disembark after breakfast and transfer to your hotel on land. Spend the day on a village walk or resting by the canal, without a long transfer. Overnight in Alleppey.</p>`,
      },
      {
        day: 7,
        title: "Alleppey to Kochi drop",
        distance: { value: 55, unit: "km" },
        points: `<p>After breakfast, drive about 55 km to Kochi airport or railway station. This concludes the Munnar, Thekkady and Alleppey backwaters tour package with Switch 2 Travel.</p>`,
      },
    ],
  },
  {
    title: "Kerala Trip - One Week Kerala Tour Package (7N/8D)",
    categoryId: POPULAR,
    categoryIds: [POPULAR],
    pickup: "Kochi",
    drop: "Trivandrum",
    durationDays: 8,
    stayLine:
      "1 night in Kochi, 2 nights in Munnar, 1 night in Thekkady, 1 night on an Alleppey houseboat and 2 nights in Kovalam.",
    cardImage: { ...photo.kovalamLight, url: photo.kovalamLight.url.replace("w=1920", "w=1600") },
    heroImage: photo.kovalamBeach,
    galleryImages: [photo.munnarTea],
    metaTitle: "One Week Kerala Package (8D/7N) | Switch 2 Travel",
    metaDescription:
      "Planning a one-week Kerala trip from Mumbai? This 8D/7N tour covers Kochi, Munnar, Thekkady, Alleppey and Kovalam, with hotel stays and transfers.",
    overview: `<p>Discover a full south-Kerala line with the <strong>one week Kerala tour package by Switch 2 Travel</strong>, designed for travellers looking to combine Kochi, Munnar, Thekkady, an Alleppey houseboat and two nights on Kovalam beach in eight days. From Fort Kochi's harbour and Munnar's tea gardens to spice country, the backwaters and the lighthouse shore at Kovalam, this 8 days and 7 nights Kerala tour offers a memorable week-long getaway filled with sightseeing, local experiences and time by the Arabian Sea.</p><p>Your journey begins in Kochi with a Fort Kochi evening, then follows the familiar hill-and-spice road: about 130 km to Munnar, 110 km to Thekkady and 145 km to the houseboat. After the cruise you drive about 160 km to Kovalam for Lighthouse Beach. Trivandrum city and Padmanabhaswamy Temple are optional on the last morning, only about 16 km from the beach, before the drop at Trivandrum airport or station.</p>${mumbaiClose("Kochi, Munnar, Thekkady, Alleppey and Kovalam", "Trivandrum airport or railway station", "a one-week holiday that ends on the beach")}`,
    itinerary: [
      {
        day: 1,
        title: "Arrive Kochi",
        points: `<p>Begin your one week Kerala holiday with pickup from Kochi airport or railway station and a transfer to your hotel. After check-in, spend the evening in Fort Kochi at the Chinese fishing nets and Jew Town if your arrival time allows. Dinner at the hotel and overnight in Kochi.</p>`,
      },
      {
        day: 2,
        title: "Kochi to Munnar",
        distance: { value: 130, unit: "km" },
        points: `<p>After breakfast, drive about 130 km to Munnar through the waterfall belt when the road is clear. On arrival, check in and relax in the tea hills. Overnight in Munnar.</p>`,
      },
      {
        day: 3,
        title: "Munnar sightseeing",
        points: `<p>After breakfast, visit Mattupetty Dam, Echo Point, Kundala Lake, tea gardens and a tea museum, with Eravikulam National Park when it is open. Overnight in Munnar.</p>`,
      },
      {
        day: 4,
        title: "Munnar to Thekkady",
        distance: { value: 110, unit: "km" },
        points: `<p>After breakfast, drive about 110 km to Thekkady. Check in and take a spice plantation walk. Evening at leisure. Overnight in Thekkady.</p>`,
      },
      {
        day: 5,
        title: "Thekkady to Alleppey houseboat",
        distance: { value: 145, unit: "km" },
        points: `<p>After breakfast, drive about 145 km to Alleppey and board the houseboat for a backwater cruise. Lunch and dinner on board. Overnight on the houseboat.</p>`,
      },
      {
        day: 6,
        title: "Alleppey to Kovalam",
        distance: { value: 160, unit: "km" },
        points: `<p>Disembark after breakfast and drive about 160 km, usually 4 to 5 hours, south to Kovalam. On arrival, check in and walk Lighthouse Beach in the evening. Dinner at the hotel and overnight in Kovalam.</p>`,
      },
      {
        day: 7,
        title: "Kovalam leisure",
        points: `<p>After breakfast, spend a free day on Kovalam beach. Optional Ayurveda, a Poovar backwater boat or a short visit towards Trivandrum can be added at extra cost. Overnight in Kovalam.</p>`,
      },
      {
        day: 8,
        title: "Kovalam to Trivandrum drop",
        distance: { value: 16, unit: "km" },
        points: `<p>After breakfast, drive about 16 km to Trivandrum airport or railway station. Padmanabhaswamy Temple may be visited if you have a late departure and the temple schedule allows; entry rules apply. This concludes the one week Kerala tour package with Switch 2 Travel.</p>`,
      },
    ],
  },
  {
    title: "Kerala Trip - Munnar with Alleppey Honeymoon Package (4N/5D)",
    categoryId: HONEYMOON,
    categoryIds: [HONEYMOON, POPULAR],
    pickup: "Kochi",
    drop: "Kochi",
    durationDays: 5,
    stayLine: "2 nights in Munnar, 1 night on an Alleppey houseboat and 1 night in Alleppey.",
    cardImage: { ...photo.houseboat, url: photo.houseboat.url.replace("w=1920", "w=1600") },
    heroImage: photo.canalBoat,
    galleryImages: [photo.honeymoonStay],
    metaTitle: "Kerala Honeymoon Package (5D/4N) | Switch 2 Travel",
    metaDescription:
      "Planning a Kerala honeymoon from Mumbai? This 5D/4N tour covers Munnar and an Alleppey houseboat, with hotel stays and Kochi transfers.",
    overview: `<p>Discover a quieter Kerala with the <strong>Munnar with Alleppey honeymoon package by Switch 2 Travel</strong>, designed for couples looking to explore the tea hills and backwaters at an easier pace than a packed family itinerary. From slow mornings in Munnar's plantations to a private houseboat stretch on the Alleppey canals, this 5 days and 4 nights Kerala honeymoon offers a memorable getaway filled with scenic drives, shared sightseeing and time together by the water.</p><p>Your journey begins in Kochi, with a scenic drive of about 130 km towards Munnar and waterfall stops along the way when the road is clear. The Munnar day is kept lighter, with Mattupetty and Kundala rather than a rushed checklist, and an afternoon free at the hotel. The next day you drive about 160 km to Alleppey for the houseboat, then spend a night on land before the 55 km return to Kochi. Candlelight dinner and room decor can be requested where the hotel allows; charges are confirmed in writing.</p>${mumbaiClose("Munnar and Alleppey", "Kochi airport or railway station", "a honeymoon escape to the hills and backwaters")}`,
    itinerary: [
      {
        day: 1,
        title: "Kochi to Munnar",
        distance: { value: 130, unit: "km" },
        points: `<p>Begin your Kerala honeymoon with pickup from Kochi airport or railway station and a scenic drive of about 130 km towards Munnar. En route, stop at Cheeyappara and Valara waterfalls when traffic allows. On arrival, transfer to your hotel, check in and take a short tea-garden walk together if you still have light. Dinner at the hotel and overnight in Munnar.</p>`,
      },
      {
        day: 2,
        title: "Munnar at an easy pace",
        points: `<p>After a later breakfast, visit Mattupetty Dam and Kundala Lake without a packed sightseeing list, so you have time at the viewpoints and an afternoon free at the hotel. Eravikulam National Park can be added if you prefer a fuller day and the park is open. Dinner at the hotel and overnight in Munnar.</p>`,
      },
      {
        day: 3,
        title: "Munnar to Alleppey houseboat",
        distance: { value: 160, unit: "km" },
        points: `<p>After breakfast, drive about 160 km from Munnar to Alleppey and board a private houseboat for a slow cruise through the backwaters. Lunch and dinner are served on board. The boat moors for the night on the canals, which is the highlight of this honeymoon itinerary. Overnight on the Alleppey backwaters.</p>`,
      },
      {
        day: 4,
        title: "Alleppey leisure",
        points: `<p>Disembark after breakfast and transfer to your hotel on land. Spend the day at a canal-side pace, with an optional village walk or canoe ride at extra cost. A candlelight dinner can be requested at the hotel where available. Overnight in Alleppey.</p>`,
      },
      {
        day: 5,
        title: "Alleppey to Kochi drop",
        distance: { value: 55, unit: "km" },
        points: `<p>After breakfast, drive about 55 km to Kochi airport or railway station. This concludes the Munnar with Alleppey honeymoon package with Switch 2 Travel.</p>`,
      },
    ],
  },
  {
    title: "Kerala Trip - Varkala with Kovalam Tour Package (6N/7D)",
    categoryId: POPULAR,
    categoryIds: [POPULAR, HONEYMOON],
    pickup: "Kochi",
    drop: "Trivandrum",
    durationDays: 7,
    stayLine: "1 night in Kochi, 3 nights in Varkala and 2 nights in Kovalam.",
    cardImage: { ...photo.varkalaWaves, url: photo.varkalaWaves.url.replace("w=1920", "w=1600") },
    heroImage: photo.varkalaCliff,
    galleryImages: [photo.kovalamLight],
    metaTitle: "Varkala & Kovalam Package (7D/6N) | Switch 2 Travel",
    metaDescription:
      "Planning a Kerala beach trip from Mumbai? This 7D/6N tour covers Varkala and Kovalam, with hotel stays and Kochi to Trivandrum transfers.",
    overview: `<p>Discover Kerala's Arabian Sea coast with the <strong>Varkala with Kovalam tour package by Switch 2 Travel</strong>, designed for travellers looking for cliff cafes, temple mornings and lighthouse sand rather than a long hill-station drive. From a first evening in Fort Kochi to three nights on Varkala cliff and two nights at Kovalam's Lighthouse Beach, this 7 days and 6 nights Kerala tour offers a memorable beach getaway filled with sea views, local walks and easy transfers.</p><p>Your journey begins in Kochi, then continues about 180 km to Varkala, with an optional Alleppey photo stop if you want a backwater glimpse on the way. Explore Papanasam beach, the cliff path and Janardhana Swamy Temple, then drive about 55 km to Kovalam. The package ends with a 16 km transfer to Trivandrum airport or railway station, with Padmanabhaswamy Temple optional if temple timings and your departure allow.</p>${mumbaiClose("Varkala and Kovalam", "Trivandrum airport or railway station", "a relaxing beach escape along the south Kerala coast")}`,
    itinerary: [
      {
        day: 1,
        title: "Arrive Kochi",
        points: `<p>Begin your Kerala beach holiday with pickup from Kochi airport or railway station and a transfer to your hotel. After check-in, spend the evening in Fort Kochi at the Chinese fishing nets if your arrival time allows. Overnight in Kochi.</p>`,
      },
      {
        day: 2,
        title: "Kochi to Varkala",
        distance: { value: 180, unit: "km" },
        points: `<p>After breakfast, drive about 180 km, usually 4.5 to 5 hours, from Kochi to Varkala. An optional short stop near Alleppey can be added for backwater photographs if the group agrees and timing allows. On arrival, check in and walk the cliff towards Papanasam beach. Overnight in Varkala.</p>`,
      },
      {
        day: 3,
        title: "Varkala cliff and beach",
        points: `<p>After breakfast, visit Janardhana Swamy Temple and spend the rest of the day on the cliff and at Papanasam beach. The cafes and sunset point give Varkala its character on this itinerary. Overnight in Varkala.</p>`,
      },
      {
        day: 4,
        title: "Varkala leisure",
        points: `<p>Keep this day free for the beach, optional surf or Ayurveda, or simply resting at the hotel. There is no long road transfer. Overnight in Varkala.</p>`,
      },
      {
        day: 5,
        title: "Varkala to Kovalam",
        distance: { value: 55, unit: "km" },
        points: `<p>After breakfast, drive about 55 km south to Kovalam. Check in and spend the evening on Lighthouse Beach, with the red-and-white lighthouse as the landmark of this stretch. Overnight in Kovalam.</p>`,
      },
      {
        day: 6,
        title: "Kovalam leisure",
        points: `<p>After breakfast, enjoy a beach day at Kovalam. Optional visits to Poovar or Padmanabhaswamy Temple in Trivandrum can be added at extra cost, subject to temple rules and sea conditions for the boat. Overnight in Kovalam.</p>`,
      },
      {
        day: 7,
        title: "Kovalam to Trivandrum drop",
        distance: { value: 16, unit: "km" },
        points: `<p>After breakfast, drive about 16 km to Trivandrum airport or railway station. This concludes the Varkala with Kovalam tour package with Switch 2 Travel.</p>`,
      },
    ],
  },
  {
    title: "Kerala Trip - Christmas and New Year Backpacking Package (7N/8D)",
    categoryId: BACKPACKING,
    categoryIds: [BACKPACKING, POPULAR],
    pickup: "Kochi",
    drop: "Trivandrum",
    durationDays: 8,
    stayLine:
      "1 night in Kochi, 2 nights in Munnar, 1 night on an Alleppey houseboat and 3 nights in Varkala.",
    cardImage: { ...photo.temple, url: photo.temple.url.replace("w=1920", "w=1600") },
    heroImage: photo.festiveKochi,
    galleryImages: [photo.varkalaCliff],
    metaTitle: "Kerala Christmas New Year (8D/7N) | Switch 2 Travel",
    metaDescription:
      "Planning a Kerala Christmas or New Year trip from Mumbai? This 8D/7N backpacking tour covers Kochi, Munnar, Alleppey and Varkala, with hotel stays.",
    overview: `<p>Discover festive Kerala with the <strong>Christmas and New Year backpacking package by Switch 2 Travel</strong>, designed for travellers looking to spend the holiday fortnight across Kochi, Munnar, an Alleppey houseboat and Varkala cliff. From Fort Kochi's harbour lights and cool evenings in the tea hills to a backwater night and three nights on the Arabian Sea, this 8 days and 7 nights Kerala tour offers a memorable seasonal getaway filled with sightseeing, local experiences and time on the coast if your dates cover 31 December.</p><p>Your journey begins in Kochi, then climbs about 130 km to Munnar for two nights in the hills, continues about 160 km to the Alleppey houseboat, and finishes with about 130 km to Varkala. Hotels in this window go early and some nights are non-refundable. The same cancellation rules apply, and peak supplements may be quoted in writing before you pay the advance. Party tickets and special dinners stay extra.</p>${mumbaiClose("Kochi, Munnar, Alleppey and Varkala", "Trivandrum airport or railway station", "a Christmas or New Year escape with friends")}`,
    itinerary: [
      {
        day: 1,
        title: "Arrive Kochi",
        points: `<p>Begin your festive Kerala holiday with pickup from Kochi airport or railway station and a transfer to your hotel. After check-in, walk Fort Kochi and the Chinese fishing nets. In Christmas week the streets and churches around the harbour often feel especially lively. Dinner at the hotel and overnight in Kochi.</p>`,
      },
      {
        day: 2,
        title: "Kochi to Munnar",
        distance: { value: 130, unit: "km" },
        points: `<p>After breakfast, drive about 130 km to Munnar through the Ghats, with waterfall stops when the road allows. December evenings in the tea hills can be cool, so keep a warm layer handy. Check in and relax. Overnight in Munnar.</p>`,
      },
      {
        day: 3,
        title: "Munnar sightseeing",
        points: `<p>After breakfast, visit Mattupetty Dam, Echo Point, Kundala Lake and a tea garden, with Eravikulam National Park when it is open. Return to the hotel for dinner. Overnight in Munnar.</p>`,
      },
      {
        day: 4,
        title: "Munnar to Alleppey houseboat",
        distance: { value: 160, unit: "km" },
        points: `<p>After breakfast, drive about 160 km from Munnar to Alleppey and board the houseboat for a backwater cruise. Lunch and dinner on board. Overnight on the Alleppey backwaters.</p>`,
      },
      {
        day: 5,
        title: "Alleppey to Varkala",
        distance: { value: 130, unit: "km" },
        points: `<p>Disembark after breakfast and drive about 130 km to Varkala. Check in and walk the cliff towards Papanasam beach. Overnight in Varkala.</p>`,
      },
      {
        day: 6,
        title: "Varkala leisure",
        points: `<p>After breakfast, spend the day on the cliff and at the beach, or visit Janardhana Swamy Temple. Overnight in Varkala.</p>`,
      },
      {
        day: 7,
        title: "Varkala festive night",
        points: `<p>Keep this day free so you can enjoy the cliff cafes and the sea without a transfer. If your travel dates cover 31 December, this is the night groups usually stay out on Varkala cliff; party tickets and special dinners are extra and subject to venue rules. Overnight in Varkala.</p>`,
      },
      {
        day: 8,
        title: "Varkala to Trivandrum drop",
        distance: { value: 50, unit: "km" },
        points: `<p>After breakfast, drive about 50 km to Trivandrum airport or railway station. This concludes the Christmas and New Year backpacking package with Switch 2 Travel.</p>`,
      },
    ],
  },
  {
    title: "Kerala Trip - Munnar Thekkady Alleppey Honeymoon Package (6N/7D)",
    categoryId: HONEYMOON,
    categoryIds: [HONEYMOON, POPULAR],
    pickup: "Kochi",
    drop: "Kochi",
    durationDays: 7,
    stayLine:
      "2 nights in Munnar, 1 night in Thekkady, 1 night on an Alleppey houseboat and 2 nights in Alleppey.",
    cardImage: { ...photo.honeymoonStay, url: photo.honeymoonStay.url.replace("w=1920", "w=1600") },
    heroImage: photo.romantic,
    galleryImages: [photo.backwaters],
    metaTitle: "Kerala Honeymoon Package (7D/6N) | Switch 2 Travel",
    metaDescription:
      "Planning a longer Kerala honeymoon from Mumbai? This 7D/6N tour covers Munnar, Thekkady and Alleppey, with hotel stays and Kochi transfers.",
    overview: `<p>Discover a longer couples circuit with the <strong>Munnar, Thekkady and Alleppey honeymoon package by Switch 2 Travel</strong>, designed for travellers looking to explore tea hills, spice country and the backwaters without packing every morning. From two slow nights in Munnar and a quiet evening in Thekkady to a houseboat night and two nights on land in Alleppey, this 7 days and 6 nights Kerala honeymoon offers a memorable getaway filled with scenic drives, shared sightseeing and extra rest by the canals.</p><p>Your journey begins in Kochi, with a scenic drive of about 130 km towards Munnar. The next days follow the popular triangle — 110 km to Thekkady and 145 km to the houseboat — with the extra Alleppey night as the main difference from the 6 day version. Room decor and a candlelight dinner can be requested where hotels allow; we confirm charges in writing. The package returns you about 55 km to Kochi airport or railway station.</p>${mumbaiClose("Munnar, Thekkady and Alleppey", "Kochi airport or railway station", "a longer honeymoon in the hills and backwaters")}`,
    itinerary: [
      {
        day: 1,
        title: "Kochi to Munnar",
        distance: { value: 130, unit: "km" },
        points: `<p>Begin your Kerala honeymoon with pickup from Kochi and a scenic drive of about 130 km towards Munnar, with waterfall stops along the way when the road is clear. On arrival, transfer to your hotel, check in and relax in the tea hills. Overnight in Munnar.</p>`,
      },
      {
        day: 2,
        title: "Munnar at an easy pace",
        points: `<p>After breakfast, visit tea gardens, Mattupetty and Kundala at a couple-friendly pace, leaving the afternoon free at the hotel if you prefer not to fill every hour. Overnight in Munnar.</p>`,
      },
      {
        day: 3,
        title: "Munnar to Thekkady",
        distance: { value: 110, unit: "km" },
        points: `<p>After breakfast, drive about 110 km to Thekkady. Check in and take a spice plantation walk, then keep the evening quiet at the hotel. Overnight in Thekkady.</p>`,
      },
      {
        day: 4,
        title: "Thekkady to Alleppey houseboat",
        distance: { value: 145, unit: "km" },
        points: `<p>After breakfast, drive about 145 km to Alleppey and board the houseboat for a private backwater cruise. Lunch and dinner on board. Overnight on the water.</p>`,
      },
      {
        day: 5,
        title: "Alleppey leisure",
        points: `<p>Disembark after breakfast and transfer to your hotel on land. Spend the day at a canal-side pace after the boat night. Overnight in Alleppey.</p>`,
      },
      {
        day: 6,
        title: "Alleppey free day",
        points: `<p>There is no drive today. Use the day for a village walk, an optional spa, or simply staying in. A candlelight dinner can be requested at the hotel where available. Overnight in Alleppey.</p>`,
      },
      {
        day: 7,
        title: "Alleppey to Kochi drop",
        distance: { value: 55, unit: "km" },
        points: `<p>After breakfast, drive about 55 km to Kochi airport or railway station. This concludes the Munnar, Thekkady and Alleppey honeymoon package with Switch 2 Travel.</p>`,
      },
    ],
  },
]

function assertMeta(trip) {
  if ((trip.metaTitle || "").length > 60) {
    throw new Error(`metaTitle too long (${trip.metaTitle.length}): ${trip.metaTitle}`)
  }
  if ((trip.metaDescription || "").length > 160) {
    throw new Error(
      `metaDescription too long (${trip.metaDescription.length}): ${trip.metaDescription}`
    )
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

async function main() {
  for (const trip of trips) assertMeta(trip)
  await connect()
  const db = mongoose.connection.db

  const city = await db
    .collection("cities")
    .findOne({ _id: KERALA }, { projection: { name: 1, slug: 1 } })
  if (!city) throw new Error("Kerala city not found")
  console.log(`City: ${city.name} (${city._id})`)

  const now = new Date()
  for (const raw of trips) {
    const doc = {
      title: raw.title,
      slug: slugify(raw.title),
      categoryId: raw.categoryId,
      categoryIds: raw.categoryIds,
      cityId: KERALA,
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
      overviewChars: (trip.overview || "").length,
      itineraryDays: (trip.itinerary || []).length,
    })
  }
}

main()
  .catch((error) => {
    console.error(error)
    process.exitCode = 1
  })
  .finally(() => mongoose.disconnect().catch(() => {}))
