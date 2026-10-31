/**
 * Seed ten Kashmir packages from the catalog screenshot.
 * Overview ≥1500 chars. Each itinerary day ≥500 chars. Run separately.
 */
const {
  mongoose,
  HONEYMOON,
  POPULAR,
  BACKPACKING,
  TREKKING,
  WEEKEND,
  makeExclusions,
  unsplash,
  card,
  mumbaiClose,
  runSeed,
  finish,
} = require("./lib/seed-trip-kit.cjs")

const KASHMIR = new mongoose.Types.ObjectId("6adda5e0e4fc8ac7eb92adb6")
const img = (id, label) => unsplash(id, label, "kashmir")

const dalMountains = {
  url: "https://ik.imagekit.io/q36ywbrzq/switch2travel/cities/kashmir-snow-capped-mountains-dal-lake_i-96FsDQB8.jpg",
  fileId: "6adda5ddead997d09a827b6f",
  filePath: "/switch2travel/cities/kashmir-snow-capped-mountains-dal-lake_i-96FsDQB8.jpg",
}

const photo = {
  dal: dalMountains,
  valley: img("photo-1506905925346-21bda4d32df4", "kashmir-valley"),
  peaks: img("photo-1464822759023-fed622ff2c3b", "kashmir-peaks"),
  snow: img("photo-1483728642387-6dc19b75ca3f", "kashmir-snow"),
  tulips: img("photo-1490750967868-88aa4486c946", "kashmir-spring-flowers"),
  lake: img("photo-1439066615861-d1af74d74039", "kashmir-alpine-lake"),
  houseboat: img("photo-1501785888041-af3ef285b470", "dal-lake-view"),
  festive: img("photo-1482517967863-00e15c9b44be", "kashmir-winter-festive"),
  couple: img("photo-1520250497591-71c291d2282b", "kashmir-honeymoon-stay"),
  trek: img("photo-1464822759023-fed622ff2c3b", "kashmir-trek-hills"),
}

const close = (places, escape) =>
  mumbaiClose(
    "Kashmir",
    places,
    "Srinagar airport",
    escape,
    "Kashmir getaway"
  )

const exclusions = makeExclusions(
  "Srinagar",
  `<li><p><strong>Gondola, Shikara and Trek Fees:</strong> Gulmarg gondola tickets, shikara rides, pony rides in Pahalgam, union-taxi charges for Aru or Betaab, and Great Lakes trek permits, tents or porters are extra unless written into your quote.</p></li>`
)

function dayExtra(title) {
  const t = title.toLowerCase()
  if (t.includes("gurez") || t.includes("razdan")) {
    return ` Gurez is about 130 km from Srinagar via Bandipora and Razdan Pass, usually 5 to 6 hours when the pass is open. Inner-line or local registration rules can apply; carry original photo ID. Habba Khatoon peak and Dawar are the usual stops. The road closes after early snow.`
  }
  if (t.includes("great lakes") || t.includes("vishansar") || t.includes("gangabal") || t.includes("nichnai")) {
    return ` The Kashmir Great Lakes trek runs Sonamarg–Naranag in July to mid-September only, crossing Nichnai and Gadsar passes up to about 4,200 m. Tents, meals on trail, and a buffer day for weather are standard. This is a trek, not a sightseeing drive. Fitness and original ID for army checkpoints are required.`
  }
  if (t.includes("gulmarg") || t.includes("gondola")) {
    return ` Gulmarg is about 50 km and 2 hours from Srinagar. The gondola has two phases; Phase 2 to Apharwat closes in wind or avalanche risk. Tickets are extra and queues are long in snow weeks. Winter needs proper boots. Union rates apply for local sledges.`
  }
  if (t.includes("pahalgam") || t.includes("betaab") || t.includes("aru")) {
    return ` Pahalgam is about 90 km from Srinagar via Anantnag. Betaab, Aru and Chandanwari are usually done in union taxis or ponies paid locally, not always in the private car. The Lidder river walk is free. Winter can close the last stretch to Chandanwari.`
  }
  if (t.includes("sonamarg") || t.includes("sonmarg") || t.includes("thajiwas")) {
    return ` Sonamarg is about 80 km from Srinagar toward the Zoji La. Thajiwas glacier is a pony or union-taxi add-on. The road can close after snowfall. This is a long day trip unless the package includes a night.`
  }
  if (t.includes("srinagar") || t.includes("dal") || t.includes("shikara") || t.includes("tulip")) {
    return ` Srinagar sightseeing covers Dal Lake shikara, Nishat and Shalimar gardens, and Shankaracharya when the road is open. The Indira Gandhi Memorial Tulip Garden is a short spring window, usually late March to April. Houseboat nights are subject to lake-ward rules. Shikara tickets are extra.`
  }
  return ` Carry original photo ID for hotel and checkpoint stops. Union-taxi and pony charges in hill towns are extra. Lunch is not included. Weather can close the gondola or Gurez road without notice.`
}

const trips = [
  {
    title: "Kashmir Trip - Autumn Group Tour Package (6N/7D)",
    categoryId: POPULAR,
    categoryIds: [POPULAR],
    pickup: "Srinagar",
    drop: "Srinagar",
    durationDays: 7,
    stayLine: "2 nights in Srinagar, 1 night in Gulmarg, 2 nights in Pahalgam and 1 night in Srinagar.",
    cardImage: card(photo.valley),
    heroImage: photo.dal,
    galleryImages: [photo.houseboat],
    metaTitle: "Kashmir Autumn Group Tour (7D/6N) | Switch 2 Travel",
    metaDescription:
      "Planning a Kashmir autumn trip from Mumbai? This 7D/6N group tour covers Srinagar, Gulmarg and Pahalgam, with hotel stays.",
    overview: `<p>Discover chinar season with the <strong>Kashmir autumn group tour package by Switch 2 Travel</strong>, designed for travellers looking to see Dal Lake, Gulmarg meadows and Pahalgam's Lidder valley when the valley turns gold in October and November. From a shikara on Dal and the Mughal gardens to the gondola at Gulmarg and Betaab or Aru, this 7 days and 6 nights Kashmir tour offers a memorable group getaway filled with valley drives and cooler, clearer air than midsummer.</p><p>Your journey begins at Srinagar airport with two nights in the city, a Gulmarg night about 50 km west, two nights in Pahalgam about 90 km south, and a last Srinagar night that can include a Sonamarg day trip of about 80 km if the Zoji La road is open. Gondola, shikara and union-taxi tickets stay extra. Autumn is one of the most reliable sightseeing windows; pack a warm layer for Gulmarg evenings.</p>${close("Srinagar, Gulmarg and Pahalgam", "an autumn group holiday in the valley")}`,
    itinerary: [
      { day: 1, title: "Arrive Srinagar", points: `<p>Pickup from Srinagar airport and transfer to the hotel. Shikara on Dal Lake if you arrive by afternoon. Overnight in Srinagar with Switch 2 Travel.</p>` },
      { day: 2, title: "Srinagar sightseeing", points: `<p>Nishat, Shalimar and Shankaracharya when open. Overnight in Srinagar.</p>` },
      { day: 3, title: "Srinagar to Gulmarg", distance: { value: 50, unit: "km" }, points: `<p>Drive about 50 km to Gulmarg. Optional gondola extra. Overnight in Gulmarg.</p>` },
      { day: 4, title: "Gulmarg to Pahalgam", distance: { value: 140, unit: "km" }, points: `<p>Drive via Srinagar and Anantnag to Pahalgam. Overnight in Pahalgam.</p>` },
      { day: 5, title: "Pahalgam valleys", points: `<p>Betaab, Aru or Chandanwari by union taxi extra. Overnight in Pahalgam.</p>` },
      { day: 6, title: "Pahalgam to Srinagar", distance: { value: 90, unit: "km" }, points: `<p>Return to Srinagar. Optional Sonamarg day if the group prefers a long drive instead of a rest evening. Overnight in Srinagar.</p>` },
      { day: 7, title: "Srinagar drop", points: `<p>Transfer to Srinagar airport. This concludes the autumn group tour with Switch 2 Travel.</p>` },
    ],
  },
  {
    title: "Kashmir Trip - Gulmarg Pahalgam and Sonamarg Honeymoon Package (5N/6D)",
    categoryId: HONEYMOON,
    categoryIds: [HONEYMOON, POPULAR],
    pickup: "Srinagar",
    drop: "Srinagar",
    durationDays: 6,
    stayLine: "2 nights in Srinagar including one houseboat night when available, 1 night in Gulmarg and 2 nights in Pahalgam.",
    cardImage: card(photo.couple),
    heroImage: photo.houseboat,
    galleryImages: [photo.dal],
    metaTitle: "Kashmir Honeymoon 6D/5N | Switch 2 Travel",
    metaDescription:
      "Planning a Kashmir honeymoon from Mumbai? This 6D/5N tour covers Gulmarg, Pahalgam and Sonamarg, with hotel stays.",
    overview: `<p>Discover a classic couples' circuit with the <strong>Gulmarg, Pahalgam and Sonamarg honeymoon package by Switch 2 Travel</strong>, designed for newlyweds looking to combine a Dal Lake houseboat evening with the Meadow of Flowers, the Valley of Shepherds and a Sonamarg day. From a shikara at sunset to the gondola and Betaab Valley, this 6 days and 5 nights Kashmir tour offers a memorable honeymoon getaway filled with slower starts and the three headline hill stations.</p><p>Stay is usually one hotel night and one houseboat night in Srinagar, one Gulmarg night and two Pahalgam nights. Sonamarg is a day trip of about 80 km from Srinagar on the last full day or from the city before Gulmarg, depending on road notes we send in writing. Decor and cake are on request. Gondola and pony charges stay extra.</p>${close("Srinagar, Gulmarg, Pahalgam and Sonamarg", "a Kashmir honeymoon")}`,
    itinerary: [
      { day: 1, title: "Arrive Srinagar", points: `<p>Airport pickup and hotel or houseboat check-in. Shikara if light remains. Overnight in Srinagar with Switch 2 Travel.</p>` },
      { day: 2, title: "Srinagar to Gulmarg", distance: { value: 50, unit: "km" }, points: `<p>Gardens in the morning if time, then 50 km to Gulmarg. Overnight in Gulmarg.</p>` },
      { day: 3, title: "Gulmarg to Pahalgam", distance: { value: 140, unit: "km" }, points: `<p>Optional gondola, then drive to Pahalgam. Overnight in Pahalgam.</p>` },
      { day: 4, title: "Pahalgam at an easy pace", points: `<p>Betaab or Aru without a packed list. Overnight in Pahalgam.</p>` },
      { day: 5, title: "Pahalgam to Srinagar and Sonamarg", distance: { value: 90, unit: "km" }, points: `<p>Return toward Srinagar; Sonamarg day trip if the road is open, otherwise a second garden and shikara evening. Overnight in Srinagar.</p>` },
      { day: 6, title: "Srinagar drop", points: `<p>Airport transfer. This concludes the Gulmarg, Pahalgam and Sonamarg honeymoon with Switch 2 Travel.</p>` },
    ],
  },
  {
    title: "Kashmir Trip - Backpacking Package (5N/6D)",
    categoryId: BACKPACKING,
    categoryIds: [BACKPACKING, POPULAR],
    pickup: "Srinagar",
    drop: "Srinagar",
    durationDays: 6,
    stayLine: "2 nights in Srinagar, 1 night in Gulmarg, 1 night in Pahalgam and 1 night in Srinagar.",
    cardImage: card(photo.peaks),
    heroImage: photo.valley,
    galleryImages: [photo.lake],
    metaTitle: "Kashmir Backpacking (6D/5N) | Switch 2 Travel",
    metaDescription:
      "Planning a Kashmir backpacking trip from Mumbai? This 6D/5N tour covers Srinagar, Gulmarg and Pahalgam, with hotel stays.",
    overview: `<p>Discover a tighter valley loop with the <strong>Kashmir backpacking package by Switch 2 Travel</strong>, designed for friend groups looking to hit Srinagar, Gulmarg and Pahalgam in six days without a houseboat-honeymoon pace. From Dal Lake and the boulevard to a Gulmarg night and a single Pahalgam night, this 6 days and 5 nights Kashmir tour offers a memorable backpacking-style getaway filled with the core sights and longer driving days.</p><p>Compared with the 5 night honeymoon, you keep one Pahalgam night instead of two, so Aru and Betaab share a morning before the return to Srinagar. Sonamarg is optional if the group wants a very long day. Gondola and union taxis stay extra. Shared rooms can be requested in writing.</p>${close("Srinagar, Gulmarg and Pahalgam", "a backpacking loop in the valley")}`,
    itinerary: [
      { day: 1, title: "Arrive Srinagar", points: `<p>Airport pickup and Dal evening. Overnight in Srinagar with Switch 2 Travel.</p>` },
      { day: 2, title: "Srinagar sightseeing", points: `<p>Gardens and old city as time allows. Overnight in Srinagar.</p>` },
      { day: 3, title: "Srinagar to Gulmarg", distance: { value: 50, unit: "km" }, points: `<p>Drive 50 km. Gondola extra. Overnight in Gulmarg.</p>` },
      { day: 4, title: "Gulmarg to Pahalgam", distance: { value: 140, unit: "km" }, points: `<p>Drive to Pahalgam. Overnight in Pahalgam.</p>` },
      { day: 5, title: "Pahalgam to Srinagar", distance: { value: 90, unit: "km" }, points: `<p>Short valley morning, then 90 km back to Srinagar. Overnight in Srinagar.</p>` },
      { day: 6, title: "Srinagar drop", points: `<p>Airport transfer. This concludes the Kashmir backpacking package with Switch 2 Travel.</p>` },
    ],
  },
  {
    title: "Kashmir Trip - Winter Christmas and New Year Package (5N/6D)",
    categoryId: POPULAR,
    categoryIds: [POPULAR, BACKPACKING],
    pickup: "Srinagar",
    drop: "Srinagar",
    durationDays: 6,
    stayLine: "2 nights in Srinagar, 2 nights in Gulmarg and 1 night in Pahalgam.",
    cardImage: card(photo.festive),
    heroImage: photo.snow,
    galleryImages: [photo.dal],
    metaTitle: "Kashmir Christmas New Year (6D/5N) | Switch 2 Travel",
    metaDescription:
      "Planning a Kashmir Christmas or New Year trip from Mumbai? This 6D/5N winter tour covers Srinagar, Gulmarg and Pahalgam.",
    overview: `<p>Discover snow-week Kashmir with the <strong>winter Christmas and New Year package by Switch 2 Travel</strong>, designed for travellers looking to spend the festive fortnight on Dal Lake and two Gulmarg nights when the gondola and snow are the main draw. From a Srinagar houseboat or hotel to Kongdoori and a shorter Pahalgam stop, this 6 days and 5 nights Kashmir tour offers a memorable winter getaway filled with snow days and peak-season hotel rules.</p><p>Christmas and New Year rooms go early and many are non-refundable. Peak supplements may be quoted in writing before the advance. Phase 2 gondola often closes in wind. Pahalgam roads can ice. Carry proper winter boots. Special dinners stay extra.</p>${close("Srinagar, Gulmarg and Pahalgam", "a Christmas or New Year snow holiday")}`,
    itinerary: [
      { day: 1, title: "Arrive Srinagar", points: `<p>Airport pickup. Shikara if the lake is not frozen at the edges. Overnight in Srinagar with Switch 2 Travel.</p>` },
      { day: 2, title: "Srinagar to Gulmarg", distance: { value: 50, unit: "km" }, points: `<p>Drive 50 km into the snow. Overnight in Gulmarg.</p>` },
      { day: 3, title: "Gulmarg snow day", points: `<p>Gondola Phase 1 when open. If this is 31 December, the evening is at the hotel unless you book a venue extra. Overnight in Gulmarg.</p>` },
      { day: 4, title: "Gulmarg to Pahalgam", distance: { value: 140, unit: "km" }, points: `<p>Drive to Pahalgam if the road is cleared. Overnight in Pahalgam.</p>` },
      { day: 5, title: "Pahalgam to Srinagar", distance: { value: 90, unit: "km" }, points: `<p>Return to Srinagar. Overnight in Srinagar.</p>` },
      { day: 6, title: "Srinagar drop", points: `<p>Airport transfer. Share flight times in writing for the festive rush. This concludes the winter Christmas and New Year package with Switch 2 Travel.</p>` },
    ],
  },
  {
    title: "Kashmir Trip - Spring Tour Package (6N/7D)",
    categoryId: POPULAR,
    categoryIds: [POPULAR],
    pickup: "Srinagar",
    drop: "Srinagar",
    durationDays: 7,
    stayLine: "3 nights in Srinagar, 1 night in Gulmarg and 2 nights in Pahalgam.",
    cardImage: card(photo.tulips),
    heroImage: photo.valley,
    galleryImages: [photo.dal],
    metaTitle: "Kashmir in Spring (7D/6N) | Switch 2 Travel",
    metaDescription:
      "Planning a Kashmir spring trip from Mumbai? This 7D/6N tour covers the tulip garden, Gulmarg and Pahalgam, with hotel stays.",
    overview: `<p>Discover blossom season with the <strong>Kashmir in spring tour package by Switch 2 Travel</strong>, designed for travellers looking to catch the Indira Gandhi Memorial Tulip Garden, usually a late-March to April window, plus Gulmarg and Pahalgam as the meadows green. From Dal Lake and the Mughal gardens to the gondola and Lidder valley, this 7 days and 6 nights festival-of-spring Kashmir tour offers a memorable getaway filled with garden mornings and three extra Srinagar nights so the tulip date can shift by a day.</p><p>Tulip tickets and dates follow the official garden calendar; we do not guarantee blooms if your flights sit outside the opening week. Almond blossom in Badamwari can overlap. Gondola and shikara stay extra. Pack for cold mornings and mild afternoons.</p>${close("Srinagar tulip gardens, Gulmarg and Pahalgam", "a spring garden holiday")}`,
    itinerary: [
      { day: 1, title: "Arrive Srinagar", points: `<p>Airport pickup. Overnight in Srinagar with Switch 2 Travel.</p>` },
      { day: 2, title: "Tulip garden and Dal", points: `<p>Tulip garden when open, then shikara. Overnight in Srinagar.</p>` },
      { day: 3, title: "Mughal gardens", points: `<p>Nishat, Shalimar and Chashme Shahi. Overnight in Srinagar.</p>` },
      { day: 4, title: "Srinagar to Gulmarg", distance: { value: 50, unit: "km" }, points: `<p>Drive 50 km. Overnight in Gulmarg.</p>` },
      { day: 5, title: "Gulmarg to Pahalgam", distance: { value: 140, unit: "km" }, points: `<p>Drive to Pahalgam. Overnight in Pahalgam.</p>` },
      { day: 6, title: "Pahalgam valleys", points: `<p>Betaab and Aru. Overnight in Pahalgam.</p>` },
      { day: 7, title: "Pahalgam to Srinagar drop", distance: { value: 90, unit: "km" }, points: `<p>Drive to the airport via Srinagar. This concludes the spring package with Switch 2 Travel.</p>` },
    ],
  },
  {
    title: "Kashmir Trip - Gulmarg and Pahalgam Honeymoon Package (4N/5D)",
    categoryId: HONEYMOON,
    categoryIds: [HONEYMOON, WEEKEND],
    pickup: "Srinagar",
    drop: "Srinagar",
    durationDays: 5,
    stayLine: "2 nights in Srinagar, 1 night in Gulmarg and 1 night in Pahalgam.",
    cardImage: card(photo.houseboat),
    heroImage: photo.couple,
    galleryImages: [photo.peaks],
    metaTitle: "Kashmir Honeymoon (5D/4N) | Switch 2 Travel",
    metaDescription:
      "Planning a short Kashmir honeymoon from Mumbai? This 5D/4N tour covers Gulmarg and Pahalgam, with hotel stays and Srinagar transfers.",
    overview: `<p>Discover a shorter couples' Kashmir with the <strong>Gulmarg and Pahalgam honeymoon package by Switch 2 Travel</strong>, designed for newlyweds who have five days, not a full week, and still want Dal Lake, the gondola meadow and one Lidder night. From a Srinagar arrival and gardens to 50 km west and 90 km south, this 5 days and 4 nights Kashmir tour offers a memorable short honeymoon filled with the two hill stations and no Gurez or Great Lakes trek.</p><p>Sonamarg is not included so the days stay sane. Houseboat can replace one Srinagar hotel night on request. Decor extra. This matches the catalog's 4N/5D honeymoon card.</p>${close("Srinagar, Gulmarg and Pahalgam", "a short Kashmir honeymoon")}`,
    itinerary: [
      { day: 1, title: "Arrive Srinagar", points: `<p>Airport pickup and shikara if time. Overnight in Srinagar with Switch 2 Travel.</p>` },
      { day: 2, title: "Srinagar to Gulmarg", distance: { value: 50, unit: "km" }, points: `<p>Drive 50 km after a garden hour. Overnight in Gulmarg.</p>` },
      { day: 3, title: "Gulmarg to Pahalgam", distance: { value: 140, unit: "km" }, points: `<p>Optional gondola, then Pahalgam. Overnight in Pahalgam.</p>` },
      { day: 4, title: "Pahalgam to Srinagar", distance: { value: 90, unit: "km" }, points: `<p>Short valley stop and return to Srinagar. Overnight in Srinagar.</p>` },
      { day: 5, title: "Srinagar drop", points: `<p>Airport transfer. This concludes the 4 night Gulmarg and Pahalgam honeymoon with Switch 2 Travel.</p>` },
    ],
  },
  {
    title: "Kashmir Trip - Gulmarg Pahalgam and Gurez Honeymoon Package (6N/7D)",
    categoryId: HONEYMOON,
    categoryIds: [HONEYMOON, BACKPACKING],
    pickup: "Srinagar",
    drop: "Srinagar",
    durationDays: 7,
    stayLine: "1 night in Srinagar, 2 nights in Gurez, 1 night in Gulmarg, 1 night in Pahalgam and 1 night in Srinagar.",
    cardImage: card(photo.lake),
    heroImage: photo.peaks,
    galleryImages: [photo.valley],
    metaTitle: "Kashmir Gurez Honeymoon (7D/6N) | Switch 2 Travel",
    metaDescription:
      "Planning a Kashmir Gurez honeymoon from Mumbai? This 7D/6N tour covers Gurez, Gulmarg and Pahalgam, with hotel stays.",
    overview: `<p>Discover an offbeat couples' line with the <strong>Gulmarg, Pahalgam and Gurez honeymoon package by Switch 2 Travel</strong>, designed for travellers looking to add the Kishanganga valley and Habba Khatoon peak to the usual gondola-and-Lidder circuit. From a Srinagar night to two nights in Dawar after the Razdan Pass drive, then Gulmarg and Pahalgam, this 7 days and 6 nights Kashmir tour offers a memorable honeymoon getaway filled with a border-valley road and classic meadows.</p><p>Gurez is about 130 km and 5 to 6 hours via Bandipora when Razdan is open, generally late spring to autumn, not deep winter. Carry original ID. Homestays can be simple. Gondola extra. This is not a Great Lakes trek.</p>${close("Srinagar, Gurez, Gulmarg and Pahalgam", "an offbeat Kashmir honeymoon")}`,
    itinerary: [
      { day: 1, title: "Arrive Srinagar", points: `<p>Airport pickup. Overnight in Srinagar with Switch 2 Travel.</p>` },
      { day: 2, title: "Srinagar to Gurez", distance: { value: 130, unit: "km" }, points: `<p>Drive via Bandipora and Razdan Pass to Dawar. Overnight in Gurez.</p>` },
      { day: 3, title: "Gurez valley", points: `<p>Habba Khatoon, Dawar and a Kishanganga walk. Overnight in Gurez.</p>` },
      { day: 4, title: "Gurez to Gulmarg", points: `<p>Return over Razdan and continue to Gulmarg. Overnight in Gulmarg.</p>` },
      { day: 5, title: "Gulmarg to Pahalgam", distance: { value: 140, unit: "km" }, points: `<p>Optional gondola, then Pahalgam. Overnight in Pahalgam.</p>` },
      { day: 6, title: "Pahalgam to Srinagar", distance: { value: 90, unit: "km" }, points: `<p>Valley morning and return to Srinagar. Overnight in Srinagar.</p>` },
      { day: 7, title: "Srinagar drop", points: `<p>Airport transfer. This concludes the Gurez honeymoon with Switch 2 Travel.</p>` },
    ],
  },
  {
    title: "Kashmir Trip - Winter Tour Package (5N/6D)",
    categoryId: POPULAR,
    categoryIds: [POPULAR],
    pickup: "Srinagar",
    drop: "Srinagar",
    durationDays: 6,
    stayLine: "2 nights in Srinagar, 2 nights in Gulmarg and 1 night in Pahalgam.",
    cardImage: card(photo.snow),
    heroImage: photo.dal,
    galleryImages: [photo.peaks],
    metaTitle: "Kashmir Winter Trip (6D/5N) | Switch 2 Travel",
    metaDescription:
      "Planning a Kashmir winter trip from Mumbai? This 6D/5N tour covers snow in Gulmarg, Srinagar and Pahalgam, with hotel stays.",
    overview: `<p>Discover a non-festive snow week with the <strong>Kashmir winter tour package by Switch 2 Travel</strong>, designed for travellers looking for the same Srinagar–Gulmarg–Pahalgam winter line as the Christmas card, without New Year hotel premiums as the default. From Dal Lake steam in the cold to two Gulmarg nights and a Pahalgam stop, this 6 days and 5 nights Kashmir tour offers a memorable winter getaway filled with snow walks and a gondola attempt.</p><p>December to February needs real winter clothing. Phase 2 often closes. Pahalgam can be a long icy drive; we may keep the extra night in Gulmarg if the south road is blocked, and we confirm that in writing. Gondola extra. This is the catalog's standard winter trip, not the Christmas-titled sibling.</p>${close("Srinagar, Gulmarg and Pahalgam", "a winter snow holiday")}`,
    itinerary: [
      { day: 1, title: "Arrive Srinagar", points: `<p>Airport pickup. Overnight in Srinagar with Switch 2 Travel.</p>` },
      { day: 2, title: "Srinagar to Gulmarg", distance: { value: 50, unit: "km" }, points: `<p>Drive 50 km. Overnight in Gulmarg.</p>` },
      { day: 3, title: "Gulmarg snow day", points: `<p>Gondola Phase 1 when open. Overnight in Gulmarg.</p>` },
      { day: 4, title: "Gulmarg to Pahalgam", distance: { value: 140, unit: "km" }, points: `<p>Drive south if the road is cleared. Overnight in Pahalgam.</p>` },
      { day: 5, title: "Pahalgam to Srinagar", distance: { value: 90, unit: "km" }, points: `<p>Return to Srinagar. Overnight in Srinagar.</p>` },
      { day: 6, title: "Srinagar drop", points: `<p>Airport transfer. This concludes the winter tour with Switch 2 Travel.</p>` },
    ],
  },
  {
    title: "Kashmir Trip - Six Days Honeymoon Package (5N/6D)",
    categoryId: HONEYMOON,
    categoryIds: [HONEYMOON, POPULAR],
    pickup: "Srinagar",
    drop: "Srinagar",
    durationDays: 6,
    stayLine: "1 night on a Srinagar houseboat, 2 nights in Gulmarg and 2 nights in Pahalgam.",
    cardImage: card(photo.dal),
    heroImage: photo.couple,
    galleryImages: [photo.tulips],
    metaTitle: "Kashmir 6-Day Honeymoon (6D/5N) | Switch 2 Travel",
    metaDescription:
      "Planning a 6-day Kashmir honeymoon from Mumbai? This 6D/5N tour covers a houseboat, Gulmarg and Pahalgam, with stays.",
    overview: `<p>Discover a houseboat-led couples' week with the <strong>six days Kashmir honeymoon package by Switch 2 Travel</strong>, designed for newlyweds looking to sleep on Dal Lake the first night, then take two nights each in Gulmarg and Pahalgam. From a shikara at the houseboat ladder to two gondola-possible mornings and two Lidder evenings, this 6 days and 5 nights Kashmir tour offers a memorable honeymoon getaway filled with more hill time than the short 4 night version.</p><p>Houseboat availability follows lake-ward rules. Decor extra. Sonamarg is optional on the last morning only if your flight is late. This is the catalog card titled 6 days honeymoon, distinct from the Sonamarg-named 5N honeymoon.</p>${close("a Dal houseboat, Gulmarg and Pahalgam", "a six-day Kashmir honeymoon")}`,
    itinerary: [
      { day: 1, title: "Arrive and houseboat", points: `<p>Airport pickup and Dal houseboat check-in. Shikara from the ladder. Overnight on the houseboat with Switch 2 Travel.</p>` },
      { day: 2, title: "Srinagar to Gulmarg", distance: { value: 50, unit: "km" }, points: `<p>Drive 50 km. Overnight in Gulmarg.</p>` },
      { day: 3, title: "Gulmarg leisure", points: `<p>Gondola extra. Overnight in Gulmarg.</p>` },
      { day: 4, title: "Gulmarg to Pahalgam", distance: { value: 140, unit: "km" }, points: `<p>Drive to Pahalgam. Overnight in Pahalgam.</p>` },
      { day: 5, title: "Pahalgam leisure", points: `<p>Betaab or Aru at a couple's pace. Overnight in Pahalgam.</p>` },
      { day: 6, title: "Pahalgam to Srinagar drop", distance: { value: 90, unit: "km" }, points: `<p>Drive to the airport. This concludes the six days honeymoon with Switch 2 Travel.</p>` },
    ],
  },
  {
    title: "Kashmir Trip - Great Lakes Trek Package (6N/7D)",
    categoryId: TREKKING,
    categoryIds: [TREKKING, BACKPACKING],
    pickup: "Srinagar",
    drop: "Srinagar",
    durationDays: 7,
    stayLine:
      "Camp nights on the Great Lakes trail as per the day's stage, with Srinagar hotel or hostel on the first and last night if the trek window requires it.",
    cardImage: card(photo.trek),
    heroImage: photo.lake,
    galleryImages: [photo.peaks],
    metaTitle: "Kashmir Great Lakes Trek (7D/6N) | Switch 2 Travel",
    metaDescription:
      "Planning the Kashmir Great Lakes trek from Mumbai? This 7D/6N trek covers Sonamarg to the alpine lakes, with camp stays.",
    overview: `<p>Discover a high-altitude walk with the <strong>Kashmir Great Lakes trek package by Switch 2 Travel</strong>, designed for fit travellers looking to walk the Sonamarg-to-Naranag alpine-lake trail, not a sightseeing taxi circuit. From Shitkadi near Sonamarg to Nichnai, Vishansar and Krishansar, and onward toward Gadsar, Satsar and Gangabal when the 7 day window allows, this 7 days and 6 nights trek offers a memorable mountain getaway filled with passes near 4,000 metres and tent nights.</p><p>The full classic route is about 67 km and is best from July to mid-September. A 7 day package may use a condensed Sonamarg–Vishansar out-and-back if weather or permits demand it; we confirm the exact stages in writing. This is not Gulmarg gondola sightseeing. Tents, trail meals, porters and a weather buffer are extra unless named. Army checkpoints need original ID. Book a flexible flight after day 7.</p>${close("the Kashmir Great Lakes trail", "a high-altitude trekking holiday")}`,
    itinerary: [
      { day: 1, title: "Srinagar to Sonamarg base", distance: { value: 85, unit: "km" }, points: `<p>Pickup at Srinagar and drive about 85 km to Shitkadi or the Sonamarg base camp around 2,600 m. Gear check. Overnight in camp or guesthouse with Switch 2 Travel.</p>` },
      { day: 2, title: "Trek to Nichnai", points: `<p>Trek about 10 km, 4 to 5 hours, through maple forest to Nichnai meadows around 3,500 m. Overnight in tents.</p>` },
      { day: 3, title: "Nichnai to Vishansar", points: `<p>Cross Nichnai Pass around 4,000 m and camp near Vishansar Lake, with Krishansar above. Overnight in tents.</p>` },
      { day: 4, title: "Vishansar explore or Gadsar stage", points: `<p>Either explore Vishansar and Krishansar or continue over Gadsar Pass if the full circuit is confirmed. Overnight in tents.</p>` },
      { day: 5, title: "Satsar or return stage", points: `<p>Continue toward Satsar and Gangabal on the full route, or begin the return toward Nichnai on the condensed plan. Overnight in tents.</p>` },
      { day: 6, title: "Gangabal or descent toward Naranag", points: `<p>Full route camps at Gangabal under Harmukh; condensed route descends toward Sonamarg. Overnight in tents or a lower camp.</p>` },
      { day: 7, title: "Descend and Srinagar drop", points: `<p>Walk out to Naranag or Sonamarg and drive to Srinagar airport or a city hotel. This concludes the Great Lakes trek with Switch 2 Travel. Weather can add a buffer day.</p>` },
    ],
  },
]

finish(() =>
  runSeed({
    cityId: KASHMIR,
    cityName: "Kashmir",
    trips,
    exclusions,
    dayExtra,
  })
)
