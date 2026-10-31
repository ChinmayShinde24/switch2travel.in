/**
 * Seed five Uttarakhand packages for city Uttrakhand.
 * Atlas SRV first, IPv4 DNS so Windows can resolve it.
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
const UTTRAKHAND = new mongoose.Types.ObjectId("6adda4dfe4fc8ac7eb92adb4")

const exclusions = `<ul><li><p><strong>Travel to the start city:</strong> Flight tickets and train fares to and from Haridwar or Dehradun are not included in the package.</p></li><li><p><strong>Lunch and Meals During Travel:</strong> Lunch and any meals required during road transfers or transportation are not included.</p></li><li><p><strong>Unlisted Expenses:</strong> Any expense or service not specifically mentioned under the package inclusions will be charged separately.</p></li><li><p><strong>Entry Fees, Guides and Insurance:</strong> Monument and attraction entry tickets, guide charges, yatra registration and travel insurance are not included.</p></li><li><p><strong>Personal Expenses:</strong> Laundry, luggage handling, telephone calls, room heater charges, tips, gratuities, camera fees, mineral water, soft drinks and alcoholic beverages must be paid for separately.</p></li><li><p><strong>Adventure Activities:</strong> Rafting, bungee, yak/pony, helicopter, palki and other adventure charges are not included in the package cost.</p></li><li><p><strong>Unexpected Travel Disruptions:</strong> Additional expenses arising from natural calamities, landslides, road closures, blockages, strikes or other unforeseen disruptions are not covered.</p></li><li><p><strong>Closures of Attractions:</strong> No refund will be provided if a temple, museum or ghat is closed on the date of your visit.</p></li><li><p><strong>Missed Flights or Trains:</strong> Switch 2 Travel will not be responsible for missed flights or train departures caused by traffic jams, roadblocks or similar travel delays.</p></li></ul><p></p>`

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
    filePath: `/switch2travel/trips/uttarakhand/${label}.jpg`,
  }
}

const kedarnathCityImage = {
  url: "https://ik.imagekit.io/q36ywbrzq/switch2travel/cities/uttarakhand-kedarnath-snow-capped-himalayas_V_kBQg3cM.jpg",
  fileId: "6adda4dbead997d09a7de519",
  filePath:
    "/switch2travel/cities/uttarakhand-kedarnath-snow-capped-himalayas_V_kBQg3cM.jpg",
}

const trips = [
  {
    title: "Uttarakhand Trip - Rishikesh with Haridwar Tour Package (3N/4D)",
    categoryId: POPULAR,
    categoryIds: [POPULAR, WEEKEND, BACKPACKING],
    pickup: "Haridwar",
    drop: "Haridwar",
    durationDays: 4,
    stayLine: "1 night in Haridwar and 2 nights in Rishikesh.",
    cardImage: unsplash("photo-1582510003544-4d00b7f74220", "rishikesh-card", 1600),
    heroImage: unsplash("photo-1432405972618-c60b0225b8f9", "rishikesh-hero"),
    galleryImages: [
      unsplash("photo-1506126613408-eca07ce68773", "rishikesh-yoga", 1600),
    ],
    metaTitle: "Rishikesh & Haridwar Package (4D/3N) | Switch 2 Travel",
    metaDescription:
      "Planning a Uttarakhand trip from Mumbai? This 4D/3N tour covers Haridwar, Rishikesh, Ganga aarti and rafting, with hotel stays and Haridwar transfers.",
    overview: `<p>Give families and friend groups an easy first taste of Uttarakhand with the <strong>Rishikesh with Haridwar tour package by Switch 2 Travel</strong>. In 4 days and 3 nights you get the evening Ganga aarti at Har Ki Pauri, a short drive upriver to Rishikesh, yoga by the Ganga, and optional rafting or bungee — without a long mountain itinerary.</p><p>Your driver meets you in Haridwar. After check-in, the evening is reserved for Har Ki Pauri, where lamps are lit on the ghat and diyas float downstream. The next morning covers Mansa Devi and Chandi Devi (ropeway when running), then the 25 km drive to Rishikesh for Ram Jhula, Laxman Jhula and Triveni Ghat aarti. Day 3 is the activity day: 16 km Shivpuri–Rishikesh rafting in season, Jumpin Heights bungee if you want it, or a quiet yoga session if the river is closed.</p><p>Hotels, vegetarian breakfast and dinner, private vehicle and the listed sightseeing are included. Rafting, bungee and entry tickets stay extra. This is the package that sells cleanly to first-timers from Mumbai who want the Ganga, a bit of adventure and an easy Haridwar pickup and drop.</p>`,
    itinerary: [
      {
        day: 1,
        title: "Arrive Haridwar and Ganga Aarti",
        points: `<p>Our driver meets you at Haridwar railway station or the Dehradun airport transfer point. Check in, rest a little, then head to Har Ki Pauri before dusk. The evening Ganga aarti is the reason most people come — priests swing the fire lamps, the chant rises, and the river takes thousands of small diyas downstream. Arrive early for a place on the ghat. Dinner is at the hotel.</p>`,
      },
      {
        day: 2,
        title: "Haridwar temples to Rishikesh",
        distance: { value: 25, unit: "km" },
        points: `<p>After breakfast, visit Mansa Devi and Chandi Devi, the two hill temples that look down on Haridwar. Use the ropeway when it is running; the view of the Ganga leaving the mountains is the point as much as the shrines.</p><p>Then it is about 25 km and 45 to 60 minutes up to Rishikesh. Check in, walk Ram Jhula and Laxman Jhula, and in the evening attend the aarti at Triveni Ghat or Parmarth Niketan. Dinner at the hotel.</p>`,
      },
      {
        day: 3,
        title: "Rafting, bungee and yoga",
        distance: { value: 16, unit: "km" },
        points: `<p>This is the activity day. In season, the popular rafting stretch is Shivpuri to Rishikesh, about 16 km of Grade II–III water. Rafting is usually closed in peak monsoon — we will tell you what is open. Jumpin Heights bungee at Mohan Chatti is optional and paid on the spot.</p><p>If you would rather keep it calm, do a drop-in yoga or meditation session by the river and visit the Beatles Ashram (Chaurasi Kutia). Evening is free on the cafe side of Tapovan. Dinner at the hotel.</p>`,
      },
      {
        day: 4,
        title: "Rishikesh to Haridwar drop",
        distance: { value: 25, unit: "km" },
        points: `<p>Breakfast, then a last walk to the river if time allows. We drive you back to Haridwar station or towards Dehradun airport according to your departure. The 25 km return is under an hour in normal traffic.</p>`,
      },
    ],
  },
  {
    title: "Uttarakhand Trip - Mussoorie with Dehradun Tour Package (3N/4D)",
    categoryId: WEEKEND,
    categoryIds: [WEEKEND, POPULAR, HONEYMOON],
    pickup: "Dehradun",
    drop: "Dehradun",
    durationDays: 4,
    stayLine: "1 night in Dehradun and 2 nights in Mussoorie.",
    cardImage: unsplash("photo-1441974231531-c6227db76b6e", "mussoorie-card", 1600),
    heroImage: unsplash("photo-1464822759023-fed622ff2c3b", "mussoorie-hero"),
    galleryImages: [
      unsplash("photo-1472214103451-9374bd1c798e", "mussoorie-valley", 1600),
    ],
    metaTitle: "Mussoorie & Dehradun Package (4D/3N) | Switch 2 Travel",
    metaDescription:
      "Planning a Uttarakhand trip from Mumbai? This 4D/3N beginner tour covers Dehradun, Mussoorie, Kempty Falls and Landour, with hotel stays and Dehradun transfers.",
    overview: `<p>The <strong>Mussoorie with Dehradun tour package by Switch 2 Travel</strong> is the beginner hill-station circuit: short drives, colonial Mall Road evenings, and Kempty Falls without a long Himalayan yatra. 4 days and 3 nights, pickup and drop in Dehradun.</p><p>Day one stays in Dehradun for Robber's Cave and a quiet first night. The next morning you climb about 35 km to Mussoorie, walk Mall Road and ride up to Gun Hill. Day three is Kempty Falls (13 to 15 km beyond town) and Landour — Lal Tibba, Char Dukan — the part first-timers remember. Day four drops you back to Jolly Grant or the railway station, with an optional Robber's Cave stop if you skipped it on arrival.</p><p>Hotels, breakfast and dinner, private vehicle and listed sightseeing are included. Ropeway tickets and snacks at the falls stay extra. Easy to sell to families who want hills without Kedarnath-level roads.</p>`,
    itinerary: [
      {
        day: 1,
        title: "Arrive Dehradun",
        points: `<p>Pickup from Dehradun railway station or Jolly Grant Airport. Check in and, if you arrive by afternoon, visit Robber's Cave (Guchhupani) — a short walk through a limestone gorge with a cold stream. Mindrolling Monastery is a calm alternative if the cave is crowded. Dinner at the hotel.</p>`,
      },
      {
        day: 2,
        title: "Dehradun to Mussoorie",
        distance: { value: 35, unit: "km" },
        points: `<p>After breakfast, drive about 35 km and 1.5 to 2 hours up to Mussoorie. The road climbs through pines; weekend traffic around Kincraig can add time, so we leave early.</p><p>Check in, then walk Mall Road from Kulri to the Library end. Take the Gun Hill ropeway if it is running. Evening is for Camel's Back Road and a slow dinner. There is no agenda after that — stand and watch the lights in the valley.</p>`,
      },
      {
        day: 3,
        title: "Kempty Falls and Landour",
        distance: { value: 15, unit: "km" },
        points: `<p>Kempty Falls sits 13 to 15 km past Mussoorie on the Yamunotri road, about 30 to 45 minutes. Go in the morning before the pools fill up. Company Garden is on the way back.</p><p>In the afternoon we drive to Landour for Lal Tibba — the clearest Himalayan view on a good day — and chai at Char Dukan. Dhanaulti (about 24 km) is an optional extra if the group still has energy. Dinner at the hotel in Mussoorie.</p>`,
      },
      {
        day: 4,
        title: "Mussoorie to Dehradun drop",
        distance: { value: 35, unit: "km" },
        points: `<p>Breakfast with the hills, then the 35 km descent to Dehradun. We drop you at the airport or railway station according to your time. If you missed Robber's Cave on day one, we can stop there on the way down.</p>`,
      },
    ],
  },
  {
    title: "Uttarakhand Trip - Kedarnath 1 Dham Yatra Package (4N/5D)",
    categoryId: TREKKING,
    categoryIds: [TREKKING, POPULAR],
    pickup: "Haridwar",
    drop: "Haridwar",
    durationDays: 5,
    stayLine: "2 nights in Guptkashi, 1 night in Kedarnath and 1 night in Haridwar.",
    cardImage: kedarnathCityImage,
    heroImage: unsplash("photo-1605649487212-47bdab064df7", "kedarnath-hero"),
    galleryImages: [
      unsplash("photo-1454496522488-7a8e488e8606", "kedarnath-snow", 1600),
    ],
    metaTitle: "Kedarnath 1 Dham Yatra (5D/4N) | Switch 2 Travel",
    metaDescription:
      "Planning a Kedarnath yatra from Mumbai? This 5D/4N 1 Dham tour covers Haridwar, Guptkashi and Kedarnath, with hotel stays and Haridwar transfers.",
    overview: `<p>The <strong>Kedarnath 1 Dham yatra package by Switch 2 Travel</strong> is the focused pilgrimage: Haridwar to Guptkashi, the 16 km trek (or heli) from Gaurikund, darshan at Kedarnath, and back. 5 days and 4 nights, no Badrinath, no Char Dham rush.</p><p>Day one is the 210 km road via Rishikesh, Devprayag and Rudraprayag to Guptkashi. Day two starts early for Sonprayag, the shuttle to Gaurikund and the climb to 3,583 m. Evening aarti at the temple, night near the shrine. Morning darshan, trek down, rest in Guptkashi, then the return to Haridwar.</p><p>Hotels or guesthouses, breakfast and dinner, private vehicle on the motorable sectors and listed stops are included. Pony, palki, helicopter, yatra registration and temple special puja stay extra. Temple opening follows the official summer season — we confirm dates before you fly from Mumbai.</p>`,
    itinerary: [
      {
        day: 1,
        title: "Haridwar to Guptkashi",
        distance: { value: 210, unit: "km" },
        points: `<p>Leave Haridwar early. The drive is about 210 km and 7 to 8 hours via Rishikesh, Devprayag (Alaknanda meets Bhagirathi — this is where the Ganga is named) and Rudraprayag. Stop for photographs at the sangam, then continue to Guptkashi. Check in, visit Vishwanath or Ardhanarishwar if time remains, and sleep early. You will want the rest.</p>`,
      },
      {
        day: 2,
        title: "Guptkashi to Kedarnath",
        distance: { value: 30, unit: "km" },
        points: `<p>Start before dawn. Drive about 30 km to Sonprayag, take the local shuttle to Gaurikund, then begin the 16 km trek to Kedarnath (6 to 8 hours up). Pony, palki or a helicopter from Phata / Sersi / Guptkashi can replace the walk if you book ahead and the weather holds.</p><p>Reach the temple by late afternoon, attend the evening aarti, and stay overnight near the shrine at 3,583 m. Carry a warm layer — it is cold even in May.</p>`,
      },
      {
        day: 3,
        title: "Kedarnath darshan and return to Guptkashi",
        points: `<p>Morning darshan is quieter than the afternoon rush. After prayers, trek down to Gaurikund (5 to 7 hours) and drive back to Guptkashi. The rest of the evening is for a hot meal and sleep. Dinner at the hotel.</p>`,
      },
      {
        day: 4,
        title: "Guptkashi to Haridwar",
        distance: { value: 210, unit: "km" },
        points: `<p>After breakfast, drive about 210 km back to Haridwar, 7 to 9 hours depending on traffic at the prayags. Stop at Devprayag if you rushed it on the way up. Check in at Haridwar and, if you still have energy, sit at Har Ki Pauri for a quieter night aarti. Dinner at the hotel.</p>`,
      },
      {
        day: 5,
        title: "Haridwar drop",
        points: `<p>Breakfast, then drop at Haridwar station or a transfer towards Dehradun airport according to your departure. This closes the 1 Dham Kedarnath yatra with Switch 2 Travel.</p>`,
      },
    ],
  },
  {
    title: "Uttarakhand Trip - Kedarnath with Badrinath Tour Package (5N/6D)",
    categoryId: TREKKING,
    categoryIds: [TREKKING, POPULAR, ROAD],
    pickup: "Haridwar",
    drop: "Haridwar",
    durationDays: 6,
    stayLine:
      "2 nights in Guptkashi, 1 night in Kedarnath, 1 night in Badrinath and 1 night in Rudraprayag.",
    cardImage: unsplash("photo-1506905925346-21bda4d32df4", "dodham-card", 1600),
    heroImage: unsplash("photo-1486870591958-9b9d0d1dda99", "dodham-hero"),
    galleryImages: [
      unsplash("photo-1483728642387-6c3bdd6c93e5", "dodham-peaks", 1600),
    ],
    metaTitle: "Kedarnath & Badrinath Package (6D/5N) | Switch 2 Travel",
    metaDescription:
      "Planning a 2 Dham yatra from Mumbai? This 6D/5N tour covers Kedarnath and Badrinath via Guptkashi, with hotel stays and Haridwar transfers.",
    overview: `<p>The <strong>Kedarnath with Badrinath 2 Dham package by Switch 2 Travel</strong> is the short pilgrimage most families mean when they say Char Dham but do not have 11 days. 6 days and 5 nights from Haridwar: Guptkashi, the Kedarnath trek, then the motorable road to Badrinath and Mana.</p><p>You drive 210 km to Guptkashi, trek 16 km to Kedarnath, come down, then take the 185 km road via Joshimath to Badrinath (3,133 m). Morning darshan, Tapt Kund, and Mana — the last Indian village — before the descent to Rudraprayag and Haridwar.</p><p>Stay, breakfast and dinner, private vehicle on road sectors and listed sightseeing are included. Helicopter, pony, special puja and yatra registration stay extra. Best in the official temple season, usually late April to October, subject to weather and road bulletins.</p>`,
    itinerary: [
      {
        day: 1,
        title: "Haridwar to Guptkashi",
        distance: { value: 210, unit: "km" },
        points: `<p>Depart Haridwar around 5:30 am. About 210 km and 7 to 8 hours via Rishikesh, Devprayag, Srinagar and Rudraprayag. Photograph the sangam at Devprayag, then continue to Guptkashi. Check in and rest. Dinner at the hotel.</p>`,
      },
      {
        day: 2,
        title: "Guptkashi to Kedarnath",
        distance: { value: 30, unit: "km" },
        points: `<p>Early drive of about 30 km to Sonprayag, shuttle to Gaurikund, then the 16 km trek to Kedarnath. Helicopter from Phata, Sersi or Guptkashi is optional if booked. Evening darshan and overnight near the temple.</p>`,
      },
      {
        day: 3,
        title: "Kedarnath darshan to Guptkashi",
        points: `<p>Morning darshan or rudrabhishek if you booked it. Trek down to Gaurikund and drive back to Guptkashi. This is a recovery evening — eat, hydrate, sleep. Dinner at the hotel.</p>`,
      },
      {
        day: 4,
        title: "Guptkashi to Badrinath",
        distance: { value: 185, unit: "km" },
        points: `<p>A long mountain day, about 185 km and 7 to 8 hours via Ukhimath, Chamoli and Joshimath (Narsingh Temple if time). The last 45 km from Joshimath to Badrinath is steep; plan to arrive before dusk. Evening aarti, a dip in Tapt Kund if you wish, overnight in Badrinath.</p>`,
      },
      {
        day: 5,
        title: "Badrinath, Mana and Rudraprayag",
        distance: { value: 160, unit: "km" },
        points: `<p>Morning darshan at Badrinath. Then Mana village — Vyas Gufa, Bhim Pul, the Saraswati viewpoint — India's last village before the Tibet border. Drive about 160 km down via the prayags to Rudraprayag. Dinner and overnight there.</p>`,
      },
      {
        day: 6,
        title: "Rudraprayag to Haridwar drop",
        distance: { value: 165, unit: "km" },
        points: `<p>About 165 km and 5 to 6 hours back to Haridwar, with a stop at Devprayag if you missed it. Drop at the station or a transfer towards Dehradun airport. This ends the 2 Dham yatra with Switch 2 Travel.</p>`,
      },
    ],
  },
  {
    title: "Uttarakhand Trip - Char Dham Yatra Package (10N/11D)",
    categoryId: TREKKING,
    categoryIds: [TREKKING, POPULAR, ROAD],
    pickup: "Haridwar",
    drop: "Haridwar",
    durationDays: 11,
    stayLine:
      "1 night in Haridwar, 2 nights in Barkot, 2 nights in Uttarkashi, 2 nights in Guptkashi, 1 night in Kedarnath, 1 night in Badrinath and 1 night in Pipalkoti.",
    cardImage: unsplash("photo-1519681393784-d120267933ba", "chardham-card", 1600),
    heroImage: unsplash("photo-1483728642387-6c3bdd6c93e5", "chardham-hero"),
    galleryImages: [
      unsplash("photo-1544735716-392fe2489ffa", "chardham-range", 1600),
    ],
    metaTitle: "Char Dham Yatra Package (11D/10N) | Switch 2 Travel",
    metaDescription:
      "Planning a Char Dham yatra from Mumbai? This 11D/10N tour covers Yamunotri, Gangotri, Kedarnath and Badrinath, with hotel stays and Haridwar transfers.",
    overview: `<p>The <strong>Char Dham yatra package by Switch 2 Travel</strong> is the full clockwise circuit from Haridwar: Yamunotri, Gangotri, Kedarnath and Badrinath. 11 days and 10 nights, about 1,300 km of mountain road, plus the 6 km Yamunotri trek and the 16 km Kedarnath trek (heli optional).</p><p>You stay in Barkot for Yamunotri, Uttarkashi for Gangotri, Guptkashi for Kedarnath, then Badrinath and Mana before the descent. Distances are the standard yatra sectors — Haridwar–Barkot 210 km, Barkot–Uttarkashi 90 km, Uttarkashi–Gangotri 100 km each way, Uttarkashi–Guptkashi 220 km, Guptkashi–Badrinath about 195 km.</p><p>Accommodation, vegetarian breakfast and dinner, private vehicle and listed darshan days are included. Pony, palki, helicopter, special puja, yatra registration and extra nights for weather holds stay extra. Temple dates follow the official opening; we do not run this package outside the season.</p>`,
    itinerary: [
      {
        day: 1,
        title: "Arrive Haridwar and Ganga Aarti",
        points: `<p>Pickup from Haridwar station. Check in, rest, then Har Ki Pauri for the evening Ganga aarti. This is the traditional start of the Char Dham yatra. Dinner at the hotel. Overnight Haridwar.</p>`,
      },
      {
        day: 2,
        title: "Haridwar to Barkot",
        distance: { value: 210, unit: "km" },
        points: `<p>About 210 km and 7 to 8 hours via Dehradun and the Mussoorie hills. A brief stop at Kempty Falls if the road is moving. Arrive Barkot (about 1,220 m), check in and rest. Dinner at the hotel.</p>`,
      },
      {
        day: 3,
        title: "Yamunotri darshan and return to Barkot",
        distance: { value: 45, unit: "km" },
        points: `<p>Drive about 45 km to Janki Chatti, then trek around 6 km to Yamunotri (pony or palki available). Darshan at the temple, Surya Kund if you wish, then the same trek and drive back to Barkot. Full day, early start. Overnight Barkot.</p>`,
      },
      {
        day: 4,
        title: "Barkot to Uttarkashi",
        distance: { value: 90, unit: "km" },
        points: `<p>About 90 km and 4 hours to Uttarkashi. Visit Kashi Vishwanath Temple in the evening. Overnight Uttarkashi.</p>`,
      },
      {
        day: 5,
        title: "Gangotri darshan and return to Uttarkashi",
        distance: { value: 100, unit: "km" },
        points: `<p>Day trip of about 100 km each way to Gangotri via Gangnani hot spring and Harsil. The road is motorable to the temple. Darshan at Gangotri, then return to Uttarkashi for the night.</p>`,
      },
      {
        day: 6,
        title: "Uttarkashi to Guptkashi",
        distance: { value: 220, unit: "km" },
        points: `<p>The long transfer, about 220 km and 8 to 9 hours towards the Kedarnath belt. Dhari Devi if time allows. Arrive Guptkashi and rest before the trek day. Overnight Guptkashi.</p>`,
      },
      {
        day: 7,
        title: "Guptkashi to Kedarnath",
        distance: { value: 30, unit: "km" },
        points: `<p>Drive about 30 km to Sonprayag, shuttle to Gaurikund, then the 16 km trek (or helicopter) to Kedarnath. Evening aarti, overnight near the temple.</p>`,
      },
      {
        day: 8,
        title: "Kedarnath darshan to Guptkashi",
        points: `<p>Morning darshan, trek down to Gaurikund, drive to Guptkashi. Recovery night. Dinner at the hotel.</p>`,
      },
      {
        day: 9,
        title: "Guptkashi to Badrinath",
        distance: { value: 195, unit: "km" },
        points: `<p>About 195 km and 8 hours via Joshimath to Badrinath. Evening darshan and Tapt Kund. Overnight Badrinath.</p>`,
      },
      {
        day: 10,
        title: "Badrinath, Mana and Pipalkoti",
        distance: { value: 85, unit: "km" },
        points: `<p>Morning darshan, then Mana village. Drive about 85 km down to Pipalkoti (or Rudraprayag if the group prefers a shorter halt). Overnight in the valley.</p>`,
      },
      {
        day: 11,
        title: "Pipalkoti to Haridwar drop",
        distance: { value: 240, unit: "km" },
        points: `<p>About 240 km via Devprayag and Rishikesh back to Haridwar. Drop at the station or a transfer towards Dehradun airport. This closes the Char Dham yatra with Switch 2 Travel.</p>`,
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
  await connect()
  const db = mongoose.connection.db

  const city = await db
    .collection("cities")
    .findOne({ _id: UTTRAKHAND }, { projection: { name: 1, slug: 1 } })
  if (!city) throw new Error("Uttrakhand city not found")
  console.log(`City: ${city.name} (${city._id})`)

  const now = new Date()
  for (const raw of trips) {
    assertMeta(raw)
    const doc = {
      title: raw.title,
      slug: slugify(raw.title),
      categoryId: raw.categoryId,
      categoryIds: raw.categoryIds,
      cityId: UTTRAKHAND,
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

    const saved = await db.collection("trips").findOneAndUpdate(
      { slug: doc.slug },
      { $set: doc, $setOnInsert: { createdAt: now } },
      { upsert: true, returnDocument: "after" }
    )
    const trip = saved?.value || saved || (await db.collection("trips").findOne({ slug: doc.slug }))
    console.log("Saved:", {
      id: String(trip._id),
      title: trip.title,
      slug: trip.slug,
      days: trip.durationDays,
      pickup: `${trip.pickup} → ${trip.drop}`,
    })
  }
}

main()
  .catch((error) => {
    console.error(error)
    process.exitCode = 1
  })
  .finally(() => mongoose.disconnect().catch(() => {}))
