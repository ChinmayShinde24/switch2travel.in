/**
 * Seed ten Goa packages from the catalog screenshot.
 * Overview ≥1500 chars. Each itinerary day ≥500 chars. Run separately.
 */
const {
  mongoose,
  HONEYMOON,
  POPULAR,
  BACKPACKING,
  WEEKEND,
  makeExclusions,
  unsplash,
  card,
  mumbaiClose,
  runSeed,
  finish,
} = require("./lib/seed-trip-kit.cjs")

const GOA = new mongoose.Types.ObjectId("6adda5f1e4fc8ac7eb92adb7")
const img = (id, label) => unsplash(id, label, "goa")

const goaBeach = {
  url: "https://ik.imagekit.io/q36ywbrzq/switch2travel/cities/goa-tropical-beach-sunset_sjBwZNZPd.jpg",
  fileId: "6adda5eeead997d09a82bd5c",
  filePath: "/switch2travel/cities/goa-tropical-beach-sunset_sjBwZNZPd.jpg",
}

const photo = {
  sunset: goaBeach,
  bridge: img("photo-1544551763-46a013bb70d5", "goa-mandovi-boat"),
  church: img("photo-1582510003544-4d00b7f74220", "old-goa-church"),
  couple: img("photo-1512343879784-a960bf40e7f2", "goa-couple-beach"),
  aerial: img("photo-1473116763249-2faa4d424955", "goa-aerial-beach"),
  waves: img("photo-1475924156734-496f6cac6ec1", "goa-arabian-sea"),
  falls: img("photo-1433086966358-54859d0ed716", "dudhsagar-falls"),
  tropical: img("photo-1507525428034-b723cf961d3e", "south-goa-beach"),
  resort: img("photo-1520250497591-71c291d2282b", "goa-honeymoon-stay"),
  people: img("photo-1506953823976-52e1fdc01451", "goa-beach-walk"),
}

const close = (places, escape) =>
  mumbaiClose("Goa", places, "Goa airport or railway station", escape, "Goa getaway")

const exclusions = makeExclusions(
  "Goa (Dabolim or Mopa)",
  `<li><p><strong>Activities and Tickets:</strong> Dudhsagar jeep permits, Grand Island or Mandovi cruise tickets, watersports, scuba, dolphin boats, spice-plantation lunches and nightlife cover charges are extra and seasonal.</p></li>`
)

function dayExtra(title) {
  const t = title.toLowerCase()
  if (t.includes("dudhsagar") || t.includes("mollem") || t.includes("kulem")) {
    return ` Dudhsagar Falls is reached by jeep from Kulem or Collem through Bhagwan Mahavir Wildlife Sanctuary. Permits sell out and the trail can close in peak monsoon. Wear shoes that can get wet. The spice-plantation stop on the way back is extra unless written into your quote.`
  }
  if (t.includes("island") || t.includes("grand") || t.includes("cruise") || t.includes("mandovi")) {
    return ` Grand Island and Grande Island boats usually leave from the Coco Beach or Britona side and include snorkel time when the sea is calm. Dolphin sightings are never guaranteed. Mandovi sunset cruises are a separate ticket from Panaji jetties. Alcohol on board is extra and not advised before water sports.`
  }
  if (t.includes("fontainhas") || t.includes("old goa") || t.includes("heritage") || t.includes("panaji")) {
    return ` Old Goa holds the Basilica of Bom Jesus and Se Cathedral; dress modestly and expect queues late morning. Fontainhas, the Latin Quarter of Panaji, is best on foot in soft light. Churches may close during services. Photography rules vary inside the basilica.`
  }
  if (t.includes("north") || t.includes("aguada") || t.includes("baga") || t.includes("anjuna") || t.includes("watersport")) {
    return ` North Goa beaches — Calangute, Baga, Candolim, Anjuna and Vagator — are close together but parking is slow in season. Fort Aguada and Chapora are the usual viewpoint stops. Parasailing and jet ski are extra, weather-dependent, and need a life jacket. Wednesday Anjuna flea market is seasonal.`
  }
  if (t.includes("south") || t.includes("palolem") || t.includes("colva")) {
    return ` South Goa beaches such as Colva, Benaulim, Palolem and Agonda are quieter and farther from the north strip. A north-to-south drive can take 90 minutes or more. Palolem kayaks and sunset shacks are extra. We do not include a nightclub hop on a south-Goa evening.`
  }
  if (t.includes("monsoon") || t.includes("wellness") || t.includes("spa")) {
    return ` June to September brings heavy rain, rough seas and frequent Dudhsagar or island cancellations. Wellness slots, spa therapies and yoga are extra unless named in your hotel plan. Carry rain gear. Some beach shacks close in the monsoon.`
  }
  return ` Pickup is from Dabolim or Mopa as confirmed in writing. Goa traffic on NH66 and the north coast road stretches transfer times. Lunch is not included. Watersports and cruise tickets stay extra.`
}

const trips = [
  {
    title: "Goa Trip - Beaches Waterfalls and Island Tour Package (3N/4D)",
    categoryId: WEEKEND,
    categoryIds: [WEEKEND, POPULAR],
    pickup: "Goa",
    drop: "Goa",
    durationDays: 4,
    stayLine: "3 nights in North Goa.",
    cardImage: card(photo.sunset),
    heroImage: photo.falls,
    galleryImages: [photo.bridge],
    metaTitle: "Goa Beaches & Island (4D/3N) | Switch 2 Travel",
    metaDescription:
      "Planning a Goa trip from Mumbai? This 4D/3N tour covers beaches, an island boat and a waterfall day, with hotel stays and transfers.",
    overview: `<p>Discover a short Goa mix with the <strong>beaches, waterfalls and island tour package by Switch 2 Travel</strong>, designed for travellers looking to combine the north-coast strip with a Grand Island boat and a Dudhsagar jeep day in four days. From Fort Aguada, Calangute and Baga to snorkelling off Grande Island and the four-tier falls on the Goa–Karnataka border, this 4 days and 3 nights Goa tour offers a memorable long-weekend getaway filled with sea, forest and one inland drive.</p><p>Your journey begins with pickup from Dabolim or Mopa and a North Goa hotel. Day two is the island boat from the Coco Beach side when the sea is calm. Day three starts early for the Kulem jeep through Bhagwan Mahavir sanctuary; the trail can close in peak monsoon. Cruise, jeep and watersport tickets stay extra. The last morning is a beach hour or Old Goa if your flight is late.</p>${close("North Goa beaches, Grand Island and Dudhsagar", "a short sea-and-waterfall escape")}`,
    itinerary: [
      { day: 1, title: "Arrive Goa and North beaches", points: `<p>Begin your Goa holiday with pickup from Dabolim or Mopa airport or the railway station and a transfer to your North Goa hotel. After check-in, visit Fort Aguada and spend the evening on Calangute or Baga. Dinner at the hotel and overnight in North Goa with Switch 2 Travel.</p>` },
      { day: 2, title: "Grand Island boat", points: `<p>After breakfast, board a Grand Island or Grande Island cruise for snorkel time and a beach stop when the sea is calm. Dolphin sightings are not guaranteed. Return by evening. Overnight in North Goa.</p>` },
      { day: 3, title: "Dudhsagar Falls", points: `<p>Early start for the Kulem jeep to Dudhsagar through the sanctuary. A spice plantation can be added on the way back. Permits and jeep seats are extra. Overnight in North Goa.</p>` },
      { day: 4, title: "Goa drop", points: `<p>After breakfast, transfer to the airport or station. Old Goa or Fontainhas only if the departure is late. This concludes the beaches, waterfalls and island package with Switch 2 Travel.</p>` },
    ],
  },
  {
    title: "Goa Trip - North and South Goa Sightseeing Package (3N/4D)",
    categoryId: POPULAR,
    categoryIds: [POPULAR, WEEKEND],
    pickup: "Goa",
    drop: "Goa",
    durationDays: 4,
    stayLine: "3 nights in Goa.",
    cardImage: card(photo.aerial),
    heroImage: photo.tropical,
    galleryImages: [photo.church],
    metaTitle: "North & South Goa (4D/3N) | Switch 2 Travel",
    metaDescription:
      "Planning a North and South Goa trip from Mumbai? This 4D/3N tour covers beaches, forts and Old Goa, with hotel stays and transfers.",
    overview: `<p>Discover both coasts with the <strong>North and South Goa sightseeing package by Switch 2 Travel</strong>, designed for travellers looking to see Aguada, Baga and Anjuna as well as Old Goa churches and a quieter south beach without an island ticket. From Fort Aguada and Chapora to the Basilica of Bom Jesus, Fontainhas and Colva or Palolem, this 4 days and 3 nights Goa tour offers a memorable first-timer getaway filled with forts, Latin-quarter walks and two different shorelines.</p><p>Your journey starts with a North Goa day, continues to Panaji and Old Goa, then drives 60 to 90 minutes south for Colva, Benaulim or Palolem, and drops you at Dabolim, Mopa or Madgaon. Church dress rules apply. Watersports stay extra. This is the package when you want sightseeing more than a cruise.</p>${close("North Goa, Old Goa and a South Goa beach", "a two-coast sightseeing weekend")}`,
    itinerary: [
      { day: 1, title: "Arrive and North Goa", points: `<p>Pickup and Fort Aguada, Calangute and Baga. Overnight in Goa with Switch 2 Travel.</p>` },
      { day: 2, title: "North Goa forts and beaches", points: `<p>Anjuna, Vagator and Chapora Fort, with Candolim if time remains. Overnight in Goa.</p>` },
      { day: 3, title: "Old Goa and South Goa", points: `<p>Basilica of Bom Jesus, Se Cathedral and Fontainhas, then Colva or Palolem. Overnight in Goa.</p>` },
      { day: 4, title: "Goa drop", points: `<p>Transfer to airport or station. This concludes the North and South Goa sightseeing package with Switch 2 Travel.</p>` },
    ],
  },
  {
    title: "Goa Trip - Heritage and Offbeat Fontainhas Walking Package (4N/5D)",
    categoryId: POPULAR,
    categoryIds: [POPULAR, BACKPACKING],
    pickup: "Goa",
    drop: "Goa",
    durationDays: 5,
    stayLine: "4 nights in Panaji or a heritage stay near Fontainhas.",
    cardImage: card(photo.church),
    heroImage: photo.sunset,
    galleryImages: [photo.people],
    metaTitle: "Goa Heritage Fontainhas (5D/4N) | Switch 2 Travel",
    metaDescription:
      "Planning a Goa heritage trip from Mumbai? This 5D/4N tour covers Old Goa, Fontainhas and offbeat walks, with hotel stays.",
    overview: `<p>Discover Portuguese Goa on foot with the <strong>heritage and offbeat Fontainhas walking package by Switch 2 Travel</strong>, designed for travellers looking to stay near Panaji's Latin Quarter instead of the Baga strip. From the Basilica of Bom Jesus and Se Cathedral to tiled Fontainhas lanes, Reis Magos, Divar or Chorao island ferries and a slow Mandovi evening, this 5 days and 4 nights Goa tour offers a memorable heritage getaway filled with church mornings and cafe walks.</p><p>Your base is Panaji or a Fontainhas-area stay so day two and three are walking days, not long beach transfers. An optional south or Dudhsagar add-on is extra and not the focus. This package suits couples and friends who want Old Goa first. Church photography rules and ferry timings apply.</p>${close("Old Goa, Fontainhas and Panaji", "a heritage walking holiday")}`,
    itinerary: [
      { day: 1, title: "Arrive Panaji", points: `<p>Pickup and transfer to a Panaji or Fontainhas stay. Evening at the Mandovi promenade. Overnight with Switch 2 Travel.</p>` },
      { day: 2, title: "Old Goa churches", points: `<p>Basilica of Bom Jesus, Se Cathedral and the ruins of St. Augustine. Overnight in Panaji.</p>` },
      { day: 3, title: "Fontainhas walking day", points: `<p>Guided or self-led walk through Fontainhas and Sao Tome, with Our Lady of the Immaculate Conception. Overnight in Panaji.</p>` },
      { day: 4, title: "Offbeat islands or Reis Magos", points: `<p>Reis Magos Fort or a Divar or Chorao ferry when running. Overnight in Panaji.</p>` },
      { day: 5, title: "Goa drop", points: `<p>Transfer to airport or station. This concludes the heritage Fontainhas package with Switch 2 Travel.</p>` },
    ],
  },
  {
    title: "Goa Trip - Beaches Cruise and Grand Island Package (5N/6D)",
    categoryId: POPULAR,
    categoryIds: [POPULAR],
    pickup: "Goa",
    drop: "Goa",
    durationDays: 6,
    stayLine: "5 nights in North Goa.",
    cardImage: card(photo.bridge),
    heroImage: photo.waves,
    galleryImages: [photo.aerial],
    metaTitle: "Goa Cruise & Grand Island (6D/5N) | Switch 2 Travel",
    metaDescription:
      "Planning a Goa cruise trip from Mumbai? This 6D/5N tour covers beaches, a Mandovi cruise and Grand Island, with hotel stays.",
    overview: `<p>Discover a slower north-coast week with the <strong>beaches, cruise and Grand Island package by Switch 2 Travel</strong>, designed for travellers looking to keep five nights in one North Goa hotel and add a Mandovi sunset boat plus a Grande Island day. From Aguada, Baga and Anjuna to a Panaji cruise jetty and a snorkel stop, this 6 days and 5 nights Goa tour offers a memorable beach getaway filled with two boat days and unhurried sand time.</p><p>Cruise and island tickets stay extra and cancel when the bar is rough. Watersports at Baga are optional. We do not pack Dudhsagar into this itinerary so the week stays coastal. Pickup and drop are Dabolim, Mopa or the station as written.</p>${close("North Goa beaches, the Mandovi cruise and Grand Island", "a cruise-and-beach week")}`,
    itinerary: [
      { day: 1, title: "Arrive North Goa", points: `<p>Pickup and beach evening at Calangute or Candolim. Overnight in North Goa with Switch 2 Travel.</p>` },
      { day: 2, title: "North Goa sightseeing", points: `<p>Fort Aguada, Baga and Anjuna or Vagator. Overnight in North Goa.</p>` },
      { day: 3, title: "Grand Island", points: `<p>Full-day Grande Island boat when the sea is calm. Overnight in North Goa.</p>` },
      { day: 4, title: "Mandovi cruise", points: `<p>Free beach morning and a Mandovi sunset cruise from Panaji. Overnight in North Goa.</p>` },
      { day: 5, title: "Leisure beach day", points: `<p>No long transfer. Watersports extra. Overnight in North Goa.</p>` },
      { day: 6, title: "Goa drop", points: `<p>Airport or station transfer. This concludes the beaches, cruise and Grand Island package with Switch 2 Travel.</p>` },
    ],
  },
  {
    title: "Goa Trip - Dudhsagar Falls River Cruise and Beaches Package (4N/5D)",
    categoryId: POPULAR,
    categoryIds: [POPULAR, WEEKEND],
    pickup: "Goa",
    drop: "Goa",
    durationDays: 5,
    stayLine: "4 nights in Goa.",
    cardImage: card(photo.falls),
    heroImage: photo.sunset,
    galleryImages: [photo.bridge],
    metaTitle: "Dudhsagar & Cruise Goa (5D/4N) | Switch 2 Travel",
    metaDescription:
      "Planning a Goa trip from Mumbai? This 5D/4N tour covers Dudhsagar Falls, a river cruise and beaches, with hotel stays.",
    overview: `<p>Discover falls, a river boat and the coast with the <strong>Dudhsagar, river cruise and beaches package by Switch 2 Travel</strong>, designed for travellers looking for the inland jeep day plus a Mandovi or Zuari cruise without stretching to six nights. From a Kulem sanctuary drive to a Panaji sunset boat and North or South beach time, this 5 days and 4 nights Goa tour offers a memorable mixed getaway filled with forest, water and sand.</p><p>Dudhsagar permits are extra and monsoon-sensitive. The cruise is a separate ticket. Spice plantation lunches are optional. Pickup is Dabolim, Mopa or Madgaon as confirmed.</p>${close("Dudhsagar Falls, a river cruise and Goa beaches", "a falls-and-cruise holiday")}`,
    itinerary: [
      { day: 1, title: "Arrive Goa", points: `<p>Pickup and beach evening. Overnight in Goa with Switch 2 Travel.</p>` },
      { day: 2, title: "North or South beaches", points: `<p>Aguada and Baga, or a south beach if you prefer quiet. Overnight in Goa.</p>` },
      { day: 3, title: "Dudhsagar Falls", points: `<p>Early Kulem jeep to the falls. Overnight in Goa.</p>` },
      { day: 4, title: "River cruise", points: `<p>Free morning and a Mandovi or similar sunset cruise. Overnight in Goa.</p>` },
      { day: 5, title: "Goa drop", points: `<p>Airport or station drop. This concludes the Dudhsagar, cruise and beaches package with Switch 2 Travel.</p>` },
    ],
  },
  {
    title: "Goa Trip - Monsoon Wellness Retreat Package (5N/6D)",
    categoryId: HONEYMOON,
    categoryIds: [HONEYMOON, POPULAR],
    pickup: "Goa",
    drop: "Goa",
    durationDays: 6,
    stayLine: "5 nights at a wellness or boutique stay in Goa.",
    cardImage: card(photo.resort),
    heroImage: photo.tropical,
    galleryImages: [photo.waves],
    metaTitle: "Goa Monsoon Wellness (6D/5N) | Switch 2 Travel",
    metaDescription:
      "Planning a Goa monsoon wellness trip from Mumbai? This 6D/5N retreat covers spa time and quiet beaches, with hotel stays.",
    overview: `<p>Discover a slower wet-season Goa with the <strong>monsoon wellness retreat package by Switch 2 Travel</strong>, designed for travellers looking to sit out June-to-September rain in a boutique or spa stay rather than chase island boats. From yoga or Ayurveda slots at the hotel to short Fontainhas or spice-plantation drives when the sky clears, this 6 days and 5 nights Goa tour offers a memorable wellness getaway filled with rest, rain-forest air and few forced sightseeing hours.</p><p>Dudhsagar and Grand Island are often cancelled in the monsoon; we do not promise them. Spa therapies beyond the hotel's included set are extra. Carry rain gear. This package is priced around a higher stay category in the catalog screenshot and should be treated as a wellness hotel week, not a watersports itinerary.</p>${close("a wellness stay and quiet Goa drives", "a monsoon retreat")}`,
    itinerary: [
      { day: 1, title: "Arrive and check in", points: `<p>Pickup and transfer to the wellness stay. Evening free. Overnight with Switch 2 Travel.</p>` },
      { day: 2, title: "Wellness morning", points: `<p>Yoga or spa as the hotel allows. Afternoon free. Overnight at the stay.</p>` },
      { day: 3, title: "Short heritage drive", points: `<p>Fontainhas or Old Goa if rain allows. Overnight at the stay.</p>` },
      { day: 4, title: "Leisure or spice plantation", points: `<p>Optional plantation visit extra. Overnight at the stay.</p>` },
      { day: 5, title: "Beach or spa day", points: `<p>A quiet beach if the sea is flagged safe, otherwise spa time. Overnight at the stay.</p>` },
      { day: 6, title: "Goa drop", points: `<p>Airport or station transfer. This concludes the monsoon wellness package with Switch 2 Travel.</p>` },
    ],
  },
  {
    title: "Goa Trip - North Goa Beaches Watersports and Falls Package (5N/6D)",
    categoryId: POPULAR,
    categoryIds: [POPULAR],
    pickup: "Goa",
    drop: "Goa",
    durationDays: 6,
    stayLine: "5 nights in North Goa.",
    cardImage: card(photo.people),
    heroImage: photo.waves,
    galleryImages: [photo.falls],
    metaTitle: "North Goa Watersports (6D/5N) | Switch 2 Travel",
    metaDescription:
      "Planning a North Goa trip from Mumbai? This 6D/5N tour covers beaches, watersports and Dudhsagar, with hotel stays.",
    overview: `<p>Discover an active north-coast week with the <strong>North Goa beaches, watersports and falls package by Switch 2 Travel</strong>, designed for friend groups looking to stay near Baga or Calangute, add jet ski or parasail time, and keep one inland day for Dudhsagar. From Aguada, Anjuna and Chapora to a Kulem jeep, this 6 days and 5 nights Goa tour offers a memorable activity getaway filled with optional water sports and one forest drive.</p><p>Watersport rates are paid at the beach and follow sea flags. Dudhsagar remains extra and seasonal. Nightlife is on your own. Pickup Dabolim or Mopa.</p>${close("North Goa beaches, watersports and Dudhsagar", "an active beach week")}`,
    itinerary: [
      { day: 1, title: "Arrive North Goa", points: `<p>Pickup and Baga or Calangute evening. Overnight in North Goa with Switch 2 Travel.</p>` },
      { day: 2, title: "North Goa sightseeing", points: `<p>Aguada, Candolim, Anjuna and Chapora. Overnight in North Goa.</p>` },
      { day: 3, title: "Watersports day", points: `<p>Jet ski, banana boat or parasail extra when the sea is open. Overnight in North Goa.</p>` },
      { day: 4, title: "Dudhsagar Falls", points: `<p>Early jeep to the falls. Overnight in North Goa.</p>` },
      { day: 5, title: "Leisure", points: `<p>Free beach day. Overnight in North Goa.</p>` },
      { day: 6, title: "Goa drop", points: `<p>Airport or station. This concludes the North Goa watersports and falls package with Switch 2 Travel.</p>` },
    ],
  },
  {
    title: "Goa Trip - Beaches Watersports and River Package (4N/5D)",
    categoryId: POPULAR,
    categoryIds: [POPULAR, WEEKEND],
    pickup: "Goa",
    drop: "Goa",
    durationDays: 5,
    stayLine: "4 nights in North Goa.",
    cardImage: card(photo.waves),
    heroImage: photo.bridge,
    galleryImages: [photo.people],
    metaTitle: "Goa Beaches & River (5D/4N) | Switch 2 Travel",
    metaDescription:
      "Planning a 5-day Goa trip from Mumbai? This 5D/4N tour covers beaches, watersports and a river cruise, with hotel stays.",
    overview: `<p>Discover a five-day north-coast plan with the <strong>beaches, watersports and river package by Switch 2 Travel</strong>, designed for travellers looking for Baga sand, one activity morning and a Mandovi cruise without the Dudhsagar jeep. From Fort Aguada to a sunset boat at Panaji, this 5 days and 4 nights Goa tour offers a memorable short getaway filled with optional sports and one river evening.</p><p>Watersports and cruise tickets stay extra. Island boats are not included so the itinerary stays lighter than the Grand Island week. Pickup Dabolim or Mopa.</p>${close("North Goa beaches, watersports and a river cruise", "a five-day beach-and-river break")}`,
    itinerary: [
      { day: 1, title: "Arrive North Goa", points: `<p>Pickup and beach evening. Overnight in North Goa with Switch 2 Travel.</p>` },
      { day: 2, title: "North Goa sightseeing", points: `<p>Aguada, Baga and Anjuna. Overnight in North Goa.</p>` },
      { day: 3, title: "Watersports", points: `<p>Optional sports at Baga or Calangute. Overnight in North Goa.</p>` },
      { day: 4, title: "River cruise", points: `<p>Free morning and Mandovi sunset cruise. Overnight in North Goa.</p>` },
      { day: 5, title: "Goa drop", points: `<p>Airport or station. This concludes the beaches, watersports and river package with Switch 2 Travel.</p>` },
    ],
  },
  {
    title: "Goa Trip - Honeymoon Package (3N/4D)",
    categoryId: HONEYMOON,
    categoryIds: [HONEYMOON, POPULAR],
    pickup: "Goa",
    drop: "Goa",
    durationDays: 4,
    stayLine: "3 nights in a couple-friendly North or South Goa hotel.",
    cardImage: card(photo.couple),
    heroImage: photo.resort,
    galleryImages: [photo.sunset],
    metaTitle: "Goa Honeymoon Package (4D/3N) | Switch 2 Travel",
    metaDescription:
      "Planning a Goa honeymoon from Mumbai? This 4D/3N package covers quiet beaches and a sunset evening, with hotel stays.",
    overview: `<p>Discover a short couples' Goa with the <strong>4 day honeymoon package by Switch 2 Travel</strong>, designed for newlyweds looking for a quieter beach hotel, a sunset point and one easy sightseeing drive rather than a packed watersports list. From a late checkout-friendly first evening to Fort Aguada or a south crescent such as Palolem, this 4 days and 3 nights Goa tour offers a memorable honeymoon getaway filled with sand time and optional candlelight dinner on request.</p><p>Room decor and cake are extra where the hotel allows. Island and Dudhsagar days are not included so mornings stay slow. Pickup Dabolim or Mopa. Share flight times in writing so we do not plan a long south drive on arrival day.</p>${close("a couple-friendly Goa beach stay", "a short honeymoon by the sea")}`,
    itinerary: [
      { day: 1, title: "Arrive and settle in", points: `<p>Pickup and transfer to the hotel. Evening on the nearest beach. Overnight with Switch 2 Travel.</p>` },
      { day: 2, title: "Easy coastal day", points: `<p>Fort Aguada or a south beach, at a couple's pace. Overnight at the hotel.</p>` },
      { day: 3, title: "Leisure and sunset", points: `<p>Free day. Optional cruise or spa extra. Candlelight dinner on request. Overnight at the hotel.</p>` },
      { day: 4, title: "Goa drop", points: `<p>Airport or station transfer. This concludes the Goa honeymoon package with Switch 2 Travel.</p>` },
    ],
  },
  {
    title: "Goa Trip - Dudhsagar Cruise and Beaches Package (5N/6D)",
    categoryId: POPULAR,
    categoryIds: [POPULAR],
    pickup: "Goa",
    drop: "Goa",
    durationDays: 6,
    stayLine: "5 nights in Goa.",
    cardImage: card(photo.tropical),
    heroImage: photo.falls,
    galleryImages: [photo.couple],
    metaTitle: "Goa Dudhsagar & Cruise (6D/5N) | Switch 2 Travel",
    metaDescription:
      "Planning a 6-day Goa trip from Mumbai? This 6D/5N tour covers Dudhsagar, a cruise and beaches, with hotel stays.",
    overview: `<p>Discover the longer falls-and-cruise week with the <strong>6 day Dudhsagar, cruise and beaches package by Switch 2 Travel</strong>, designed for travellers who want the 5 day Dudhsagar-and-river mix plus an extra beach night so the jeep day is not followed by an immediate flight. From North or split-stay beaches to Kulem, a Mandovi boat and a free day, this 6 days and 5 nights Goa tour offers a memorable full-week getaway filled with forest, river and sand.</p><p>This is the catalog's longer sibling of the 4 night Dudhsagar package. Jeep and cruise tickets stay extra. We can split nights north and south if you ask in writing before the advance.</p>${close("Dudhsagar Falls, a cruise and Goa beaches", "a six-day coastal week")}`,
    itinerary: [
      { day: 1, title: "Arrive Goa", points: `<p>Pickup and beach evening. Overnight in Goa with Switch 2 Travel.</p>` },
      { day: 2, title: "North Goa sightseeing", points: `<p>Aguada, Baga and Anjuna. Overnight in Goa.</p>` },
      { day: 3, title: "Dudhsagar Falls", points: `<p>Early Kulem jeep. Overnight in Goa.</p>` },
      { day: 4, title: "Cruise day", points: `<p>Mandovi or Grand Island if you prefer the sea boat; we confirm the ticket type in writing. Overnight in Goa.</p>` },
      { day: 5, title: "South beach or leisure", points: `<p>Palolem or a free north day. Overnight in Goa.</p>` },
      { day: 6, title: "Goa drop", points: `<p>Airport or station. This concludes the 6 day Dudhsagar, cruise and beaches package with Switch 2 Travel.</p>` },
    ],
  },
]

finish(() =>
  runSeed({
    cityId: GOA,
    cityName: "Goa",
    trips,
    exclusions,
    dayExtra,
  })
)
