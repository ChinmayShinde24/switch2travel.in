/**
 * Seed ten Meghalaya packages from the catalog screenshot.
 * Overview ≥1500 chars. Each itinerary day ≥500 chars. Run separately.
 */
const {
  mongoose,
  HONEYMOON,
  POPULAR,
  BACKPACKING,
  ROAD,
  WEEKEND,
  makeExclusions,
  unsplash,
  card,
  mumbaiClose,
  runSeed,
  finish,
} = require("./lib/seed-trip-kit.cjs")

const MEGHALAYA = new mongoose.Types.ObjectId("6adda61de4fc8ac7eb92adb8")
const img = (id, label) => unsplash(id, label, "meghalaya")

const rootBridge = {
  url: "https://ik.imagekit.io/q36ywbrzq/switch2travel/cities/meghalaya-living-root-bridge-waterfall_sGvCJqv8m.jpg",
  fileId: "6adda61aead997d09a839983",
  filePath: "/switch2travel/cities/meghalaya-living-root-bridge-waterfall_sGvCJqv8m.jpg",
}

const photo = {
  mistHills: img("photo-1470071459604-3b5ec3a7fe05", "meghalaya-mist-hills"),
  forestRoad: img("photo-1441974231531-c6227db76b6e", "meghalaya-forest-road"),
  waterfall: img("photo-1664535752739-6f62ab720707", "meghalaya-waterfall"),
  wideFall: img("photo-1433086966358-54859d0ed716", "cherrapunji-falls"),
  lakeBoat: img("photo-1501785888041-af3ef285b470", "umiam-dawki-water"),
  canoe: img("photo-1544551763-46a013bb70d5", "dawki-canoe"),
  jungle: img("photo-1447752875215-b2761acb3c5d", "meghalaya-jungle"),
  greenHills: img("photo-1469474968028-56623f02e42e", "khasi-hills"),
  wildlife: img("photo-1561731216-c3a4d99437d5", "kaziranga-safari"),
  festive: img("photo-1482517967863-00e15c9b44be", "meghalaya-festive"),
  rootBridge,
}

const close = (places, escape) =>
  mumbaiClose(
    "Meghalaya",
    places,
    "Guwahati airport or railway station",
    escape,
    "Meghalaya getaway"
  )

const exclusions = makeExclusions(
  "Guwahati",
  `<li><p><strong>Adventure and Park Fees:</strong> Living-root-bridge trek permits, cave tickets, Dawki boat rides, Krang Suri entries, Wari Chora canoe fees and Kaziranga jeep or elephant safari tickets are extra and subject to park or village rules.</p></li>`
)

function dayExtra(title) {
  const t = title.toLowerCase()
  if (t.includes("kaziranga") || t.includes("safari")) {
    return ` Kaziranga jeep safaris run in morning and afternoon slots and are allotted by the Assam Forest Department. Elephant rides, when offered, are extra and not guaranteed. Wear earth colours, carry the same photo ID used for the permit, and do not stand in the gypsy. The park can close in the monsoon.`
  }
  if (t.includes("wari") || t.includes("garo")) {
    return ` Wari Chora in the South Garo Hills is reached by a long Guwahati highway day of about 225 to 250 km, then a 4x4 and a short trek to the gorge. Canoes and life jackets are extra. Siju Caves and Jadisil Fish Sanctuary are weather-dependent add-ons, not a substitute for the canyon.`
  }
  if (t.includes("root") || t.includes("nongriat") || t.includes("tyrna")) {
    return ` The Nongriat double-decker living root bridge is a long stair descent from Tyrna, often 3,000-plus steps, and is commonly closed on Sundays. Wear grip shoes, carry water and expect a 5 to 7 hour round trek. Non-trekkers can visit Mawsmai, Arwah or a shorter village root bridge instead.`
  }
  if (t.includes("dawki") || t.includes("mawlynnong") || t.includes("umngot")) {
    return ` Mawlynnong, often called Asia's cleanest village, and the Riwai single root bridge are usually closed on Sundays. Dawki's Umngot River is famous for clear water; boat tickets are extra and the colour fades after heavy rain. Shnongpdeng kayak and cliff-jump add-ons are paid locally and need a life jacket.`
  }
  if (t.includes("cherrapunji") || t.includes("sohra") || t.includes("mawsynram")) {
    return ` Cherrapunji, officially Sohra, and nearby Mawsynram sit on one of the wettest plateaus on earth. Nohkalikai, Seven Sisters and Wei Sawdong can shrink in the dry months. Mawsmai Cave has a short lit passage; keep a torch. Roads mist over quickly after lunch.`
  }
  if (t.includes("shillong") || t.includes("umiam") || t.includes("guwahati")) {
    return ` Guwahati to Shillong is about 100 km and 3 to 3.5 hours via NH6, with Umiam Lake as the usual photo stop. Elephant Falls, Don Bosco Museum and Police Bazaar fill a city day. Laitlum Canyon is a separate viewpoint drive. Carry a light rain layer in every season.`
  }
  return ` Meghalaya roads are winding and slow after rain. Carry water, cash for village parking, and the same photo ID used for hotel bookings. Lunch is not included on driving days.`
}

const trips = [
  {
    title: "Meghalaya Trip - Shillong with Mawsynram Tour Package (2N/3D)",
    categoryId: WEEKEND,
    categoryIds: [WEEKEND, POPULAR],
    pickup: "Guwahati",
    drop: "Guwahati",
    durationDays: 3,
    stayLine: "2 nights in Shillong.",
    cardImage: card(photo.mistHills),
    heroImage: photo.forestRoad,
    galleryImages: [photo.waterfall],
    metaTitle: "Shillong & Mawsynram (3D/2N) | Switch 2 Travel",
    metaDescription:
      "Planning a Meghalaya weekend from Mumbai? This 3D/2N tour covers Shillong and Mawsynram, with hotel stays and Guwahati transfers.",
    overview: `<p>Discover the Khasi Hills on a short break with the <strong>Shillong with Mawsynram tour package by Switch 2 Travel</strong>, designed for travellers looking to see Meghalaya's capital and the plateau often called the wettest place on earth without a long Cherrapunji-and-Dawki circuit. From Umiam Lake and Police Bazaar in Shillong to the misted viewpoints around Mawsynram, this 3 days and 2 nights Meghalaya tour offers a memorable weekend getaway filled with hill drives, waterfalls when the rain has been kind, and an easy Guwahati pickup.</p><p>Your journey begins at Guwahati airport or railway station with a scenic drive of about 100 km, 3 to 3.5 hours, up to Shillong, stopping at Umiam Lake. A full day then heads south-west toward Mawsynram for plateau views and seasonal falls, returning to Shillong for the night. The last morning can cover Elephant Falls or Ward's Lake before the descent to Guwahati. This is the right package when you have only a long weekend from Mumbai and still want the Abode of Clouds rather than a rushed root-bridge trek.</p>${close("Shillong and Mawsynram", "a short hill-station escape")}`,
    itinerary: [
      {
        day: 1,
        title: "Guwahati to Shillong",
        distance: { value: 100, unit: "km" },
        points: `<p>Begin your Meghalaya holiday with pickup from Guwahati airport or railway station and a drive of about 100 km, 3 to 3.5 hours, into the Khasi Hills. Stop at Umiam Lake, also called Barapani, for photographs before the last climb into Shillong. Check in, rest, then walk Police Bazaar or Ward's Lake if you arrive with daylight. Dinner at the hotel and overnight in Shillong with Switch 2 Travel.</p>`,
      },
      {
        day: 2,
        title: "Mawsynram excursion",
        points: `<p>After breakfast, drive toward Mawsynram, the plateau village often listed among the wettest inhabited places on earth. Viewpoints and seasonal waterfalls depend on cloud and rain; we do not promise a full cascade in the dry months. Return to Shillong by evening via a tea or viewpoint stop if the road allows. Dinner at the hotel and overnight in Shillong.</p>`,
      },
      {
        day: 3,
        title: "Shillong and Guwahati drop",
        distance: { value: 100, unit: "km" },
        points: `<p>After breakfast, visit Elephant Falls or Don Bosco Centre for Indigenous Cultures if your departure is late. Then drive about 100 km down to Guwahati airport or railway station. This concludes the Shillong with Mawsynram tour package with Switch 2 Travel.</p>`,
      },
    ],
  },
  {
    title:
      "Meghalaya Trip - Shillong Cherrapunji and Mawlynnong Tour Package (9N/10D)",
    categoryId: POPULAR,
    categoryIds: [POPULAR, ROAD],
    pickup: "Guwahati",
    drop: "Guwahati",
    durationDays: 10,
    stayLine:
      "3 nights in Shillong, 3 nights in Cherrapunji, 1 night in Mawlynnong and 2 nights in Dawki.",
    cardImage: card(photo.greenHills),
    heroImage: photo.wideFall,
    galleryImages: [photo.rootBridge],
    metaTitle: "Shillong Cherrapunji Mawlynnong (10D/9N) | Switch 2 Travel",
    metaDescription:
      "Planning a long Meghalaya trip from Mumbai? This 10D/9N tour covers Shillong, Sohra, Mawlynnong and Dawki, with hotel stays.",
    overview: `<p>Discover a full Khasi-and-Jaintia circuit with the <strong>Shillong, Cherrapunji and Mawlynnong tour package by Switch 2 Travel</strong>, designed for travellers looking to spend ten days on the wet plateau, the living root bridges and the Umngot River instead of a compressed weekend. From Umiam Lake and Laitlum to Nohkalikai Falls, Mawsmai Cave, the Nongriat double-decker bridge, Asia's cleanest village and Dawki's clear water, this 10 days and 9 nights Meghalaya tour offers a memorable slow getaway filled with treks, village nights and private-vehicle hill roads.</p><p>Your journey begins in Guwahati with the 100 km climb to Shillong for two easy nights, then 55 km south to Sohra, also called Cherrapunji, for waterfalls and a dedicated root-bridge day. You continue about 85 km east via Pynursla to Mawlynnong and Dawki, with boat time at Shnongpdeng, before looping back through Krang Suri when the falls are open and finishing with a last Shillong night. Sundays often close Mawlynnong and the Nongriat trek, so we adjust the order in writing. Boat tickets, cave fees and the long stair trek stay extra.</p>${close("Shillong, Cherrapunji, Mawlynnong and Dawki", "a long nature holiday in the Abode of Clouds")}`,
    itinerary: [
      { day: 1, title: "Guwahati to Shillong", distance: { value: 100, unit: "km" }, points: `<p>Begin your long Meghalaya holiday with pickup from Guwahati and a 100 km drive to Shillong, stopping at Umiam Lake. Check in and keep the evening light at Police Bazaar. Dinner at the hotel and overnight in Shillong with Switch 2 Travel.</p>` },
      { day: 2, title: "Shillong sightseeing", points: `<p>After breakfast, visit Don Bosco Museum, Elephant Falls and Ward's Lake, with Laitlum Canyon if the weather is clear. Evening free in the bazaar. Dinner at the hotel and overnight in Shillong.</p>` },
      { day: 3, title: "Shillong to Cherrapunji", distance: { value: 55, unit: "km" }, points: `<p>After breakfast, drive about 55 km, 2 to 3 hours, to Sohra. Visit Nohkalikai Falls, Seven Sisters Falls and Mawsmai Cave if time remains. Dinner at the hotel and overnight in Cherrapunji.</p>` },
      { day: 4, title: "Cherrapunji waterfalls and caves", points: `<p>After breakfast, cover Wei Sawdong, Arwah Cave and Eco Park or Garden of Caves. Falls shrink in the dry season. Dinner at the hotel and overnight in Cherrapunji.</p>` },
      { day: 5, title: "Living root bridge trek", points: `<p>After an early breakfast, trek from Tyrna to the Nongriat double-decker living root bridge if the trail is open. Non-trekkers visit a shorter village bridge. Dinner at the hotel and overnight in Cherrapunji.</p>` },
      { day: 6, title: "Cherrapunji to Mawlynnong and Dawki", distance: { value: 85, unit: "km" }, points: `<p>After breakfast, drive about 85 km via Pynursla to the Riwai root bridge and Mawlynnong village, then continue to Dawki on the Umngot. Overnight in Mawlynnong or Dawki as confirmed.</p>` },
      { day: 7, title: "Dawki and Shnongpdeng", points: `<p>After breakfast, take a boat on the Umngot when the water is clear and visit Shnongpdeng for optional kayak time. Boat tickets are extra. Overnight in Dawki.</p>` },
      { day: 8, title: "Dawki to Shillong via Krang Suri", distance: { value: 210, unit: "km" }, points: `<p>After breakfast, drive toward Shillong, about 210 km with stops, adding Krang Suri Falls when open. Check in and rest. Overnight in Shillong.</p>` },
      { day: 9, title: "Shillong leisure", points: `<p>Keep a free Shillong day for Laitlum, a cafe morning or any missed city sight. Overnight in Shillong.</p>` },
      { day: 10, title: "Shillong to Guwahati drop", distance: { value: 100, unit: "km" }, points: `<p>After breakfast, drive about 100 km to Guwahati airport or railway station. This concludes the 9 night Shillong, Cherrapunji and Mawlynnong package with Switch 2 Travel.</p>` },
    ],
  },
  {
    title: "Meghalaya Trip - Shillong Mawlynnong and Dawki Tour Package (2N/3D)",
    categoryId: WEEKEND,
    categoryIds: [WEEKEND, POPULAR],
    pickup: "Guwahati",
    drop: "Guwahati",
    durationDays: 3,
    stayLine: "1 night in Shillong and 1 night in Dawki or Mawlynnong.",
    cardImage: card(photo.canoe),
    heroImage: photo.lakeBoat,
    galleryImages: [photo.rootBridge],
    metaTitle: "Shillong Mawlynnong Dawki (3D/2N) | Switch 2 Travel",
    metaDescription:
      "Planning a short Meghalaya trip from Mumbai? This 3D/2N tour covers Shillong, Mawlynnong and Dawki, with stays and Guwahati transfers.",
    overview: `<p>Discover a compressed east-Khasi weekend with the <strong>Shillong, Mawlynnong and Dawki tour package by Switch 2 Travel</strong>, designed for travellers looking to see Asia's cleanest village and the Umngot River without staying a week on the Sohra plateau. From the 100 km Guwahati–Shillong climb to the Riwai living root bridge, Mawlynnong's bamboo walkways and a Dawki boat on clear water, this 3 days and 2 nights Meghalaya tour offers a memorable short getaway filled with village walks and one long scenic drive.</p><p>Your journey begins in Guwahati with an afternoon in Shillong, then a full day east through Pynursla to Mawlynnong and Dawki, overnighting by the river or in the village. The last day returns via Shillong to Guwahati. Sundays often close Mawlynnong, so we may swap days in writing. Boat tickets stay extra. This is not a Nongriat stair-trek package; the root bridge here is the shorter Riwai span.</p>${close("Shillong, Mawlynnong and Dawki", "a short village-and-river escape")}`,
    itinerary: [
      { day: 1, title: "Guwahati to Shillong", distance: { value: 100, unit: "km" }, points: `<p>Begin your Meghalaya weekend with pickup from Guwahati and a 100 km drive to Shillong via Umiam Lake. Check in and walk Police Bazaar if time remains. Dinner at the hotel and overnight in Shillong with Switch 2 Travel.</p>` },
      { day: 2, title: "Shillong to Mawlynnong and Dawki", distance: { value: 90, unit: "km" }, points: `<p>After an early breakfast, drive east to the Riwai single living root bridge and Mawlynnong, then continue to Dawki for an Umngot boat if the water is clear. Overnight in Dawki or Mawlynnong.</p>` },
      { day: 3, title: "Dawki to Guwahati drop", distance: { value: 180, unit: "km" }, points: `<p>After breakfast, drive back through Shillong to Guwahati airport or railway station, allowing a long buffer. This concludes the Shillong, Mawlynnong and Dawki package with Switch 2 Travel.</p>` },
    ],
  },
  {
    title: "Meghalaya Trip - Wari Chora Shillong and Dawki Tour Package (6N/7D)",
    categoryId: POPULAR,
    categoryIds: [POPULAR, ROAD, BACKPACKING],
    pickup: "Guwahati",
    drop: "Guwahati",
    durationDays: 7,
    stayLine: "2 nights near Wari Chora, 2 nights in Shillong and 2 nights in Dawki.",
    cardImage: card(photo.jungle),
    heroImage: photo.canoe,
    galleryImages: [photo.waterfall],
    metaTitle: "Wari Chora Shillong Dawki (7D/6N) | Switch 2 Travel",
    metaDescription:
      "Planning an offbeat Meghalaya trip from Mumbai? This 7D/6N tour covers Wari Chora, Shillong and Dawki, with stays and Guwahati transfers.",
    overview: `<p>Discover the Garo-to-Khasi line with the <strong>Wari Chora, Shillong and Dawki tour package by Switch 2 Travel</strong>, designed for travellers looking to add the South Garo Hills canyon to the usual Shillong-and-Umngot circuit. From a 225 to 250 km drive to the Wari Chora gorge and a canoe through turquoise rock walls to Shillong's lakes and Dawki's clear river, this 7 days and 6 nights Meghalaya tour offers a memorable offbeat getaway filled with 4x4 approaches, village stays and two very different hill districts.</p><p>Your journey begins in Guwahati with the long NH217 day toward Siju and Emangre, a full gorge day, then a cross-state drive of about 250 km into Shillong. You continue east to Mawlynnong and Dawki for two river nights before the return to Guwahati. Wari Chora canoes, life jackets and Dawki boats stay extra. This is not a Kaziranga safari package; the wildlife here is the gorge and the Umngot, not the one-horned rhino.</p>${close("Wari Chora, Shillong and Dawki", "an offbeat canyon-and-river holiday")}`,
    itinerary: [
      { day: 1, title: "Guwahati to Wari Chora", distance: { value: 240, unit: "km" }, points: `<p>Begin your offbeat Meghalaya holiday with pickup from Guwahati and a 7 to 9 hour drive of about 225 to 250 km toward the South Garo Hills, with a Siju Cave stop if time allows. Check in near Emangre or Siju. Overnight near Wari Chora with Switch 2 Travel.</p>` },
      { day: 2, title: "Wari Chora gorge", points: `<p>After breakfast, take a 4x4 and a short trek to the Wari Chora canyon and paddle a traditional canoe when water levels allow. Jadisil Fish Sanctuary is an optional extra. Overnight near Wari Chora.</p>` },
      { day: 3, title: "Wari Chora to Shillong", distance: { value: 250, unit: "km" }, points: `<p>After an early breakfast, drive across to Shillong, a long hill day. Check in and rest. Overnight in Shillong.</p>` },
      { day: 4, title: "Shillong to Dawki via Mawlynnong", distance: { value: 90, unit: "km" }, points: `<p>After breakfast, drive to Mawlynnong and the Riwai root bridge, then Dawki. Overnight in Dawki.</p>` },
      { day: 5, title: "Dawki and Shnongpdeng", points: `<p>After breakfast, boat the Umngot and spend time at Shnongpdeng. Overnight in Dawki.</p>` },
      { day: 6, title: "Dawki to Shillong", distance: { value: 90, unit: "km" }, points: `<p>After breakfast, return to Shillong with a Krang Suri stop if open. Overnight in Shillong.</p>` },
      { day: 7, title: "Shillong to Guwahati drop", distance: { value: 100, unit: "km" }, points: `<p>After breakfast, drive about 100 km to Guwahati airport or railway station. This concludes the Wari Chora, Shillong and Dawki package with Switch 2 Travel.</p>` },
    ],
  },
  {
    title: "Meghalaya Trip - Meghalaya Tour and Safari in Kaziranga (7N/8D)",
    categoryId: POPULAR,
    categoryIds: [POPULAR, ROAD],
    pickup: "Guwahati",
    drop: "Guwahati",
    durationDays: 8,
    stayLine:
      "2 nights in Kaziranga, 2 nights in Shillong, 2 nights in Cherrapunji and 1 night in Dawki.",
    cardImage: card(photo.wildlife),
    heroImage: photo.jungle,
    galleryImages: [photo.wideFall],
    metaTitle: "Meghalaya & Kaziranga Safari (8D/7N) | Switch 2 Travel",
    metaDescription:
      "Planning a Meghalaya and Kaziranga trip from Mumbai? This 8D/7N tour covers rhino safari, Shillong, Sohra and Dawki, with hotel stays.",
    overview: `<p>Discover hills and the one-horned rhino with the <strong>Meghalaya tour and Kaziranga safari package by Switch 2 Travel</strong>, designed for travellers looking to pair UNESCO Kaziranga National Park with Shillong, Cherrapunji and Dawki in eight days. From a jeep in the Assam grasslands to Umiam Lake, Nohkalikai Falls and the Umngot River, this 8 days and 7 nights Meghalaya-and-Assam tour offers a memorable wildlife-and-waterfall getaway filled with one core safari slot, plateau viewpoints and a village-or-river night.</p><p>Your journey begins with about 220 km, 4 to 5 hours, from Guwahati to Kaziranga for two nights and a morning jeep when permits exist. You then drive about 260 km to Shillong, 55 km to Sohra, and 85 km to Dawki via Mawlynnong before looping back to Guwahati. Safari tickets, park fees and Dawki boats stay extra. Sightings of rhino, elephant or buffalo are never guaranteed. The park often closes in peak monsoon.</p>${close("Kaziranga, Shillong, Cherrapunji and Dawki", "a safari-and-hills holiday")}`,
    itinerary: [
      { day: 1, title: "Guwahati to Kaziranga", distance: { value: 220, unit: "km" }, points: `<p>Begin with pickup from Guwahati and a 220 km drive to Kaziranga, with an optional Kamakhya stop if you start early. Check in and visit the orchid park if time remains. Overnight in Kaziranga with Switch 2 Travel.</p>` },
      { day: 2, title: "Kaziranga safari", points: `<p>Join a morning jeep safari when the Forest Department has allotted a zone. Rest through midday heat. An afternoon slot can be added if tickets were booked. Overnight in Kaziranga.</p>` },
      { day: 3, title: "Kaziranga to Shillong", distance: { value: 260, unit: "km" }, points: `<p>After breakfast, drive about 260 km to Shillong via Umiam Lake. Check in and rest. Overnight in Shillong.</p>` },
      { day: 4, title: "Shillong to Cherrapunji", distance: { value: 55, unit: "km" }, points: `<p>After breakfast, drive 55 km to Sohra for Nohkalikai and Mawsmai. Overnight in Cherrapunji.</p>` },
      { day: 5, title: "Cherrapunji sightseeing", points: `<p>Cover Wei Sawdong, Seven Sisters or a short cave. Overnight in Cherrapunji.</p>` },
      { day: 6, title: "Cherrapunji to Dawki via Mawlynnong", distance: { value: 85, unit: "km" }, points: `<p>Drive to Mawlynnong and Dawki for an Umngot boat. Overnight in Dawki.</p>` },
      { day: 7, title: "Dawki to Shillong", distance: { value: 90, unit: "km" }, points: `<p>Return to Shillong with a waterfall stop if open. Overnight in Shillong.</p>` },
      { day: 8, title: "Shillong to Guwahati drop", distance: { value: 100, unit: "km" }, points: `<p>Drive about 100 km to Guwahati airport or railway station. This concludes the Meghalaya and Kaziranga safari package with Switch 2 Travel.</p>` },
    ],
  },
  {
    title:
      "Meghalaya Trip - Shillong Cherrapunji Camping Backpacking Package (5N/6D)",
    categoryId: BACKPACKING,
    categoryIds: [BACKPACKING, POPULAR],
    pickup: "Guwahati",
    drop: "Guwahati",
    durationDays: 6,
    stayLine:
      "2 nights in Shillong, 2 nights in Cherrapunji including one camp night when available, and 1 night in a Dawki riverside camp.",
    cardImage: card(photo.forestRoad),
    heroImage: photo.rootBridge,
    galleryImages: [photo.waterfall],
    metaTitle: "Meghalaya Camping Backpacking (6D/5N) | Switch 2 Travel",
    metaDescription:
      "Planning a Meghalaya backpacking trip from Mumbai? This 6D/5N tour covers Shillong, Cherrapunji camping and Dawki, with stays.",
    overview: `<p>Discover a camp-led Khasi loop with the <strong>Shillong, Cherrapunji and camping backpacking package by Switch 2 Travel</strong>, designed for friend groups looking to mix a Shillong night with a Sohra camp and a Dawki riverside tent instead of only hotels. From Elephant Falls and Nohkalikai to a living-root day and an Umngot evening, this 6 days and 5 nights Meghalaya tour offers a memorable backpacking-style getaway filled with stairs, camps and private-vehicle transfers from Guwahati.</p><p>Your journey climbs 100 km to Shillong, then 55 km to Sohra for waterfalls and a camp night when the operator has tents, continues to Dawki via Mawlynnong, and returns through Shillong. Camp toilets, weather and Sunday closures can change the hotel-versus-tent mix; we confirm the night type in writing. Trek permits, cave tickets and Umngot boats stay extra and are paid locally.</p>${close("Shillong, Cherrapunji and Dawki", "a camping backpacking trip in the hills")}`,
    itinerary: [
      { day: 1, title: "Guwahati to Shillong", distance: { value: 100, unit: "km" }, points: `<p>Pickup in Guwahati and drive 100 km to Shillong via Umiam. Overnight in Shillong with Switch 2 Travel.</p>` },
      { day: 2, title: "Shillong to Cherrapunji", distance: { value: 55, unit: "km" }, points: `<p>Drive 55 km to Sohra for Nohkalikai and Mawsmai. Overnight in Cherrapunji.</p>` },
      { day: 3, title: "Root bridge or camp day", points: `<p>Trek Nongriat if open, or stay on the plateau and move to a Sohra camp for the night when tents are available.</p>` },
      { day: 4, title: "Cherrapunji to Dawki camp", distance: { value: 85, unit: "km" }, points: `<p>Drive to Mawlynnong and a Dawki or Shnongpdeng riverside camp. Boat extra.</p>` },
      { day: 5, title: "Dawki to Shillong", distance: { value: 90, unit: "km" }, points: `<p>Return to Shillong after a river morning. Overnight in Shillong.</p>` },
      { day: 6, title: "Guwahati drop", distance: { value: 100, unit: "km" }, points: `<p>Drive to Guwahati airport or railway station. This concludes the camping backpacking package with Switch 2 Travel.</p>` },
    ],
  },
  {
    title: "Meghalaya Trip - Offbeat Meghalaya Circuit Backpacking Package (8N/9D)",
    categoryId: BACKPACKING,
    categoryIds: [BACKPACKING, ROAD],
    pickup: "Guwahati",
    drop: "Guwahati",
    durationDays: 9,
    stayLine:
      "2 nights near Wari Chora, 1 night in an offbeat Khasi village, 2 nights in Cherrapunji, 1 night in Dawki and 2 nights in Shillong.",
    cardImage: card(photo.wideFall),
    heroImage: photo.mistHills,
    galleryImages: [photo.jungle],
    metaTitle: "Offbeat Meghalaya Circuit (9D/8N) | Switch 2 Travel",
    metaDescription:
      "Planning an offbeat Meghalaya backpacking trip from Mumbai? This 9D/8N tour covers Wari Chora, Sohra, Dawki and Shillong.",
    overview: `<p>Discover the longer offbeat circuit with the <strong>offbeat Meghalaya backpacking package by Switch 2 Travel</strong>, designed for travellers looking to stitch Wari Chora, a small Khasi village such as Mawphanlur or Nongjrong, Sohra's falls, Dawki and Shillong into nine days. From the Garo gorge canoe to seven-lake villages, Nohkalikai and the Umngot, this 9 days and 8 nights Meghalaya tour offers a memorable backpacking getaway filled with long highway days and nights away from Police Bazaar.</p><p>Your journey starts with the 250 km Garo drive, a gorge day, a West Khasi village night, then Sohra for two nights including a root-bridge or bamboo-trek option, Dawki, and two Shillong nights before Guwahati. Homestays can be basic. We confirm village names in writing because some hamlets limit visitor numbers.</p>${close("Wari Chora, offbeat Khasi villages, Cherrapunji, Dawki and Shillong", "a longer offbeat backpacking circuit")}`,
    itinerary: [
      { day: 1, title: "Guwahati to Wari Chora", distance: { value: 240, unit: "km" }, points: `<p>Long drive from Guwahati to the South Garo Hills. Overnight near Wari Chora with Switch 2 Travel.</p>` },
      { day: 2, title: "Wari Chora gorge", points: `<p>4x4, short trek and canoe in the gorge when water allows. Overnight near Wari Chora.</p>` },
      { day: 3, title: "Wari Chora to offbeat Khasi village", points: `<p>Drive toward Mawphanlur or Nongjrong, small highland villages used on offbeat winter circuits. Overnight in the village stay we confirm in writing.</p>` },
      { day: 4, title: "Village to Cherrapunji", points: `<p>Continue to Sohra, arriving by evening. Overnight in Cherrapunji.</p>` },
      { day: 5, title: "Cherrapunji sightseeing", points: `<p>Nohkalikai, caves and Wei Sawdong. Overnight in Cherrapunji.</p>` },
      { day: 6, title: "Root bridge or bamboo trek", points: `<p>Nongriat stairs or a bamboo-bridge trek if the trail is open. Overnight toward Dawki if the group finishes early, otherwise Sohra.</p>` },
      { day: 7, title: "Dawki and Umngot", points: `<p>Mawlynnong and a Dawki boat. Overnight in Dawki.</p>` },
      { day: 8, title: "Dawki to Shillong", distance: { value: 90, unit: "km" }, points: `<p>Return to Shillong via Krang Suri if open. Overnight in Shillong.</p>` },
      { day: 9, title: "Guwahati drop", distance: { value: 100, unit: "km" }, points: `<p>Drive to Guwahati airport or railway station. This concludes the offbeat Meghalaya circuit with Switch 2 Travel.</p>` },
    ],
  },
  {
    title: "Meghalaya Trip - Shillong Cherrapunji and Dawki Tour Package (5N/6D)",
    categoryId: POPULAR,
    categoryIds: [POPULAR, WEEKEND],
    pickup: "Guwahati",
    drop: "Guwahati",
    durationDays: 6,
    stayLine: "2 nights in Shillong, 2 nights in Cherrapunji and 1 night in Dawki.",
    cardImage: card(photo.waterfall),
    heroImage: photo.rootBridge,
    galleryImages: [photo.canoe],
    metaTitle: "Shillong Cherrapunji Dawki (6D/5N) | Switch 2 Travel",
    metaDescription:
      "Planning a Meghalaya trip from Mumbai? This 6D/5N tour covers Shillong, Cherrapunji and Dawki, with hotel stays and Guwahati transfers.",
    overview: `<p>Discover the classic first-timer loop with the <strong>Shillong, Cherrapunji and Dawki tour package by Switch 2 Travel</strong>, designed for travellers looking to cover Meghalaya's three headline stops in six days from Guwahati. From Umiam Lake and Elephant Falls to Nohkalikai, Mawsmai Cave, Mawlynnong and the Umngot boat, this 6 days and 5 nights Meghalaya tour offers a memorable standard getaway filled with plateau viewpoints and one river night.</p><p>Distances are the usual ones: Guwahati–Shillong 100 km, Shillong–Sohra 55 km, Sohra–Dawki about 85 km via Mawlynnong, then back through Shillong. A living-root trek can replace a cave morning if the group is fit and the trail is open. Boat tickets, cave tickets and village parking stay extra. This is the package most Mumbai families mean when they say they want Shillong and Cherrapunji without Kaziranga.</p>${close("Shillong, Cherrapunji and Dawki", "the classic Meghalaya first-timer circuit")}`,
    itinerary: [
      { day: 1, title: "Guwahati to Shillong", distance: { value: 100, unit: "km" }, points: `<p>Pickup in Guwahati, 100 km to Shillong via Umiam. Overnight in Shillong with Switch 2 Travel.</p>` },
      { day: 2, title: "Shillong to Cherrapunji", distance: { value: 55, unit: "km" }, points: `<p>Drive 55 km to Sohra for Nohkalikai and Mawsmai. Overnight in Cherrapunji.</p>` },
      { day: 3, title: "Cherrapunji sightseeing", points: `<p>Wei Sawdong, Seven Sisters or a short root-bridge option. Overnight in Cherrapunji.</p>` },
      { day: 4, title: "Cherrapunji to Dawki via Mawlynnong", distance: { value: 85, unit: "km" }, points: `<p>Riwai bridge, Mawlynnong and a Dawki boat. Overnight in Dawki.</p>` },
      { day: 5, title: "Dawki to Shillong", distance: { value: 90, unit: "km" }, points: `<p>Return to Shillong. Overnight in Shillong.</p>` },
      { day: 6, title: "Guwahati drop", distance: { value: 100, unit: "km" }, points: `<p>Drive to Guwahati airport or railway station. This concludes the classic Shillong, Cherrapunji and Dawki package with Switch 2 Travel.</p>` },
    ],
  },
  {
    title:
      "Meghalaya Trip - Kaziranga Shillong and Cherrapunji Assam Tour Package (6N/7D)",
    categoryId: POPULAR,
    categoryIds: [POPULAR, ROAD],
    pickup: "Guwahati",
    drop: "Guwahati",
    durationDays: 7,
    stayLine: "1 night in Kaziranga, 2 nights in Shillong, 2 nights in Cherrapunji and 1 night in Dawki.",
    cardImage: card(photo.lakeBoat),
    heroImage: photo.wildlife,
    galleryImages: [photo.greenHills],
    metaTitle: "Kaziranga Shillong Cherrapunji (7D/6N) | Switch 2 Travel",
    metaDescription:
      "Planning an Assam and Meghalaya trip from Mumbai? This 7D/6N tour covers Kaziranga, Shillong and Cherrapunji, with hotel stays.",
    overview: `<p>Discover Assam and the Khasi plateau together with the <strong>Kaziranga, Shillong and Cherrapunji Assam tour package by Switch 2 Travel</strong>, designed for travellers looking for one rhino morning plus the standard Meghalaya sights in a week. From a Kaziranga jeep to Umiam, Sohra's falls and Dawki, this 7 days and 6 nights tour offers a memorable two-state getaway filled with grassland safari and hill roads.</p><p>You drive 220 km to Kaziranga on day one, safari the next morning, then about 260 km to Shillong, 55 km to Sohra and 85 km to Dawki before Guwahati. This is shorter than the 8 day safari package: one Kaziranga night instead of two, so only one game drive is realistic unless you add a late-arrival extra slot in writing. Park tickets, jeep fees and Dawki boats stay extra, and rhino sightings are never guaranteed.</p>${close("Kaziranga, Shillong, Cherrapunji and Dawki", "a one-week Assam and Meghalaya circuit")}`,
    itinerary: [
      { day: 1, title: "Guwahati to Kaziranga", distance: { value: 220, unit: "km" }, points: `<p>Drive 220 km to Kaziranga. Overnight in Kaziranga with Switch 2 Travel.</p>` },
      { day: 2, title: "Kaziranga safari to Shillong", distance: { value: 260, unit: "km" }, points: `<p>Morning jeep if booked, then 260 km to Shillong via Umiam. Overnight in Shillong.</p>` },
      { day: 3, title: "Shillong to Cherrapunji", distance: { value: 55, unit: "km" }, points: `<p>Drive 55 km to Sohra for the main falls. Overnight in Cherrapunji.</p>` },
      { day: 4, title: "Cherrapunji sightseeing", points: `<p>Caves and remaining viewpoints. Overnight in Cherrapunji.</p>` },
      { day: 5, title: "Cherrapunji to Dawki", distance: { value: 85, unit: "km" }, points: `<p>Mawlynnong and Dawki boat. Overnight in Dawki.</p>` },
      { day: 6, title: "Dawki to Shillong", distance: { value: 90, unit: "km" }, points: `<p>Return to Shillong. Overnight in Shillong.</p>` },
      { day: 7, title: "Guwahati drop", distance: { value: 100, unit: "km" }, points: `<p>Drive to Guwahati. This concludes the Kaziranga, Shillong and Cherrapunji Assam package with Switch 2 Travel.</p>` },
    ],
  },
  {
    title:
      "Meghalaya Trip - Kaziranga Christmas Backpacking Package (5N/6D)",
    categoryId: BACKPACKING,
    categoryIds: [BACKPACKING, POPULAR],
    pickup: "Guwahati",
    drop: "Guwahati",
    durationDays: 6,
    stayLine: "2 nights in Kaziranga, 2 nights in Shillong and 1 night in Cherrapunji.",
    cardImage: card(photo.festive),
    heroImage: photo.wildlife,
    galleryImages: [photo.mistHills],
    metaTitle: "Meghalaya Kaziranga Christmas (6D/5N) | Switch 2 Travel",
    metaDescription:
      "Planning a Meghalaya Christmas trip from Mumbai? This 6D/5N backpacking tour covers Kaziranga, Shillong and Cherrapunji.",
    overview: `<p>Discover a festive-week Northeast loop with the <strong>Kaziranga Christmas backpacking package by Switch 2 Travel</strong>, designed for travellers looking to spend late December on a rhino morning and two hill nights without a full Dawki stay. From Kaziranga's grasslands to Shillong lights and a Sohra waterfall day, this 6 days and 5 nights Meghalaya-and-Assam tour offers a memorable holiday-fortnight getaway filled with one safari and the classic plateau views.</p><p>Hotels in Christmas week go early and some nights are non-refundable. Peak supplements may be quoted in writing before the advance. Safari tickets sell out; we cannot add a second drive unless the Forest Department still has seats. Dawki is a possible day pinch if the group wants the river photograph, not a guaranteed night. The package starts and ends in Guwahati.</p>${close("Kaziranga, Shillong and Cherrapunji", "a Christmas backpacking escape in the Northeast")}`,
    itinerary: [
      { day: 1, title: "Guwahati to Kaziranga", distance: { value: 220, unit: "km" }, points: `<p>Drive 220 km to Kaziranga. Festive-week check-in can run late. Overnight in Kaziranga with Switch 2 Travel.</p>` },
      { day: 2, title: "Kaziranga safari", points: `<p>Morning jeep when allotted. Optional second slot extra. Overnight in Kaziranga.</p>` },
      { day: 3, title: "Kaziranga to Shillong", distance: { value: 260, unit: "km" }, points: `<p>Drive 260 km to Shillong via Umiam. Overnight in Shillong.</p>` },
      { day: 4, title: "Shillong to Cherrapunji", distance: { value: 55, unit: "km" }, points: `<p>Sohra falls day. Overnight in Cherrapunji.</p>` },
      { day: 5, title: "Cherrapunji to Shillong", distance: { value: 55, unit: "km" }, points: `<p>Return to Shillong; Dawki only if the group starts very early and accepts a long day. Overnight in Shillong.</p>` },
      { day: 6, title: "Guwahati drop", distance: { value: 100, unit: "km" }, points: `<p>Drive to Guwahati airport or railway station. This concludes the Kaziranga Christmas backpacking package with Switch 2 Travel.</p>` },
    ],
  },
]

finish(() =>
  runSeed({
    cityId: MEGHALAYA,
    cityName: "Meghalaya",
    trips,
    exclusions,
    dayExtra,
  })
)
