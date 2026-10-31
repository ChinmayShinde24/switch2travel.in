/**
 * Seed ten Rajasthan packages from the catalog screenshot.
 *
 * Copy rules:
 * - Overview: three SEO paragraphs, at least 1500 characters, specific to that route.
 * - Itinerary: one full paragraph per day, at least 500 characters.
 * - Images match the destination. Titles: Rajasthan Trip - … (XN/YD).
 * - Meta title ≤60, meta description ≤160. Same payment and cancellation as other seeds.
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
const WEEKEND = new mongoose.Types.ObjectId("6addaa44f34a441f5a5298b0")
const RAJASTHAN = new mongoose.Types.ObjectId("6adda683e4fc8ac7eb92adb9")

const exclusions = `<ul><li><p><strong>Travel to the start city:</strong> Flight tickets and train fares to and from Jaipur, Udaipur, Jaisalmer or Bikaner are not included in the package.</p></li><li><p><strong>Lunch and Meals During Travel:</strong> Lunch and any meals required during road transfers or transportation are not included.</p></li><li><p><strong>Unlisted Expenses:</strong> Any expense or service not specifically mentioned under the package inclusions will be charged separately.</p></li><li><p><strong>Entry Fees, Guides and Insurance:</strong> Monument and attraction entry tickets, guide charges and travel insurance are not included.</p></li><li><p><strong>Safari and Desert Activities:</strong> Ranthambore gypsy or canter tickets, camel rides, jeep safaris and desert-camp upgrades are extra and subject to forest-department or camp availability.</p></li><li><p><strong>Personal Expenses:</strong> Laundry, luggage handling, telephone calls, room heater charges, tips, gratuities, camera fees, mineral water, soft drinks and alcoholic beverages must be paid for separately.</p></li><li><p><strong>Unexpected Travel Disruptions:</strong> Additional expenses arising from natural calamities, sandstorms, road closures, blockages, strikes or other unforeseen disruptions are not covered.</p></li><li><p><strong>Closures of Attractions:</strong> No refund will be provided if a fort, museum, temple or national park is closed on the date of your visit.</p></li><li><p><strong>Missed Flights or Trains:</strong> Switch 2 Travel will not be responsible for missed flights or train departures caused by traffic jams, roadblocks or similar travel delays.</p></li></ul><p></p>`

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
    filePath: `/switch2travel/trips/rajasthan/${label}.jpg`,
  }
}

function card(image) {
  return { ...image, url: image.url.replace("w=1920", "w=1600") }
}

function mumbaiClose(places, drop, escapePhrase) {
  return `<p>For travellers planning a Rajasthan holiday from Mumbai, Switch 2 Travel helps make the trip easier to plan with accommodation, sightseeing and transfers as outlined in the package. As a travel agency in Mumbai offering holiday packages, Switch 2 Travel brings together the key experiences of ${places} in one convenient itinerary. Whether you are planning a family holiday, a trip with friends or ${escapePhrase}, this Rajasthan tour package is a great way to experience the desert state. The package concludes with a transfer back to ${drop}, leaving you with beautiful memories of your royal getaway.</p>`
}

const udaipurLake = {
  url: "https://ik.imagekit.io/q36ywbrzq/switch2travel/cities/Golden_Hour_at_Rajasthan_s_Lake_Fort_Nuq5UhgWG.png",
  fileId: "6adda681ead997d09a85298d",
  filePath: "/switch2travel/cities/Golden_Hour_at_Rajasthan_s_Lake_Fort_Nuq5UhgWG.png",
}

const photo = {
  hawaMahal: unsplash("photo-1477587458883-47145b8186ab", "jaipur-hawa-mahal"),
  amberFort: unsplash("photo-1524492412937-b28074a5d7da", "jaipur-amber-fort"),
  pinkPalace: unsplash("photo-1599661046289-e31897846e41", "jaipur-city-palace"),
  hawaPink: unsplash("photo-1548013146-72479768bada", "jaipur-hawa-mahal-pink"),
  jodhpurBlue: unsplash("photo-1578662996442-48f60103fc96", "jodhpur-blue-city"),
  desertDunes: unsplash("photo-1473580044384-7ba9967fe409", "thar-desert-dunes"),
  camel: unsplash("photo-1516426122078-c23e76319801", "rajasthan-camel"),
  tiger: unsplash("photo-1561731216-c3a4d99437d5", "ranthambore-tiger"),
  aravalli: unsplash("photo-1464822759023-fed622ff2c3b", "mount-abu-aravalli"),
  hills: unsplash("photo-1506905925346-21bda4d32df4", "aravalli-hills"),
  festive: unsplash("photo-1482517967863-00e15c9b44be", "rajasthan-festive"),
  jaisalmer: unsplash("photo-1603262110263-fb5964ea9583", "jaisalmer-fort"),
  jaisalmerWalls: unsplash("photo-1617516202907-ff75846a652b", "jaisalmer-golden-walls"),
  udaipurLake,
}

const trips = [
  {
    title: "Rajasthan Trip - Jaipur with Pushkar Tour Package (3N/4D)",
    categoryId: POPULAR,
    categoryIds: [POPULAR, WEEKEND],
    pickup: "Jaipur",
    drop: "Jaipur",
    durationDays: 4,
    stayLine: "2 nights in Jaipur and 1 night in Pushkar.",
    cardImage: card(photo.hawaMahal),
    heroImage: photo.amberFort,
    galleryImages: [photo.pinkPalace],
    metaTitle: "Jaipur & Pushkar Package (4D/3N) | Switch 2 Travel",
    metaDescription:
      "Planning a Rajasthan trip from Mumbai? This 4D/3N tour covers Jaipur forts and Pushkar Lake, with hotel stays and Jaipur transfers.",
    overview: `<p>Discover the Pink City and a sacred lake town with the <strong>Jaipur with Pushkar tour package by Switch 2 Travel</strong>, designed for travellers looking to explore Rajasthan's most famous hill fort and one of the few temples in the world dedicated to Lord Brahma. From Amber Fort, Hawa Mahal, City Palace and Jantar Mantar in Jaipur to Ajmer Sharif Dargah, Pushkar Lake and the evening ghat aarti, this 4 days and 3 nights Rajasthan tour offers a memorable long-weekend getaway filled with sightseeing, local markets and a quieter night in Pushkar.</p><p>Your journey begins in Jaipur, with pickup from the airport or railway station and a first look at Amber Fort, about 11 km from the old city, including the Sheesh Mahal courtyards and a photo stop at Jal Mahal on Man Sagar Lake. A full day then covers Hawa Mahal, City Palace, the UNESCO-listed Jantar Mantar observatory and time in Johari Bazaar or Bapu Bazaar. On the third day you drive about 145 to 150 km, usually 2.5 to 3 hours via Kishangarh and Ajmer, stopping at Ajmer Sharif Dargah before the short hop to Pushkar. The Pushkar evening is for Brahma Temple, the 52 ghats around the lake and the aarti. The last morning returns you to Jaipur for your onward flight or train.</p>${mumbaiClose("Jaipur, Ajmer and Pushkar", "Jaipur airport or railway station", "a short royal and spiritual escape")}`,
    itinerary: [
      {
        day: 1,
        title: "Arrive Jaipur and Amber Fort",
        points: `<p>Begin your Rajasthan holiday with pickup from Jaipur airport or railway station and a transfer into the Pink City, whose old walls still follow the plan laid out by Maharaja Sawai Jai Singh II. After hotel check-in and a short rest, the afternoon is reserved for Amber Fort, also called Amer Fort, about 11 km from the city centre. Walk through the Suraj Pol courtyards to the Sheesh Mahal, the Hall of Mirrors, and look out over Maota Lake. An optional jeep ride up the ramp is extra and subject to availability. On the way back, stop at Jal Mahal on Man Sagar Lake for photographs. Evening at leisure around Hawa Mahal or MI Road. Dinner at the hotel and overnight in Jaipur with Switch 2 Travel.</p>`,
      },
      {
        day: 2,
        title: "Jaipur city sightseeing",
        points: `<p>After breakfast, spend a full day in the heart of Jaipur. Start with a photo stop at Hawa Mahal, the five-storey Palace of Winds on the edge of the old city, then continue to City Palace, still partly a royal residence, with its courtyards, textile museum and the Pitam Niwas Chowk doorways. Next door, Jantar Mantar is the eighteenth-century astronomical observatory and a UNESCO World Heritage Site; allow time for the Samrat Yantra sundial. Albert Hall Museum or Birla Mandir can be added if the group wants a quieter hour. The evening is free for Johari Bazaar jewellery lanes or Bapu Bazaar textiles. Dinner at the hotel and overnight in Jaipur.</p>`,
      },
      {
        day: 3,
        title: "Jaipur to Pushkar via Ajmer",
        distance: { value: 150, unit: "km" },
        points: `<p>After breakfast, check out and drive about 145 to 150 km, usually 2.5 to 3 hours via NH48 through Kishangarh, towards Ajmer and Pushkar. En route, visit Ajmer Sharif Dargah, the shrine of Khwaja Moinuddin Chishti, one of the most important Sufi centres in India; offerings and a local guide at the dargah are extra. Continue about 15 km over the Nag Pahar saddle into Pushkar, a small temple town that is entirely vegetarian. Check in, then walk to Pushkar Lake, Brahma Temple and the ghats. Stay for the evening aarti if the timing works. Dinner at the hotel and overnight in Pushkar.</p>`,
      },
      {
        day: 4,
        title: "Pushkar to Jaipur drop",
        distance: { value: 150, unit: "km" },
        points: `<p>After breakfast, you may walk the lake once more or climb towards Savitri Temple if time and fitness allow; the hill path looks back over the water and the desert edge. An optional short camel ride on the dunes outside town is extra and not guaranteed in peak heat. Check out and drive about 150 km back to Jaipur, allowing 2.5 to 3 hours plus traffic near the city. Transfer to Jaipur airport or railway station as per your departure. This concludes the Jaipur with Pushkar tour package with Switch 2 Travel.</p>`,
      },
    ],
  },
  {
    title: "Rajasthan Trip - Jaisalmer via Udaipur and Jodhpur Desert Package (6N/7D)",
    categoryId: POPULAR,
    categoryIds: [POPULAR, ROAD],
    pickup: "Udaipur",
    drop: "Jaisalmer",
    durationDays: 7,
    stayLine:
      "2 nights in Udaipur, 2 nights in Jodhpur, 1 night in Jaisalmer and 1 night at a Jaisalmer desert camp.",
    cardImage: card(photo.desertDunes),
    heroImage: photo.jaisalmer,
    galleryImages: [photo.udaipurLake],
    metaTitle: "Jaisalmer Desert Tour (7D/6N) | Switch 2 Travel",
    metaDescription:
      "Planning a Rajasthan desert trip from Mumbai? This 7D/6N tour covers Udaipur, Jodhpur and Jaisalmer dunes, with hotel stays and transfers.",
    overview: `<p>Discover the desert triangle with the <strong>Jaisalmer via Udaipur and Jodhpur desert package by Switch 2 Travel</strong>, designed for travellers looking to move from the lakes of Udaipur through the blue lanes of Jodhpur to the golden fort and Sam Sand Dunes. From City Palace and Lake Pichola to Mehrangarh Fort, Jaswant Thada and a night in a Thar Desert camp, this 7 days and 6 nights Rajasthan tour offers a memorable road journey filled with palaces, living forts and a cultural evening on the dunes.</p><p>Your journey begins in Udaipur with two nights for City Palace, Jagdish Temple, Saheliyon Ki Bari, Fateh Sagar and an optional boat on Lake Pichola. The third day is the 250 to 270 km drive to Jodhpur, often via Ranakpur's marble Jain temple or via Nathdwara and Haldighati, about 5 to 7 hours with stops. Jodhpur covers Mehrangarh, Umaid Bhawan and the Clock Tower market. Then about 285 to 300 km, 5 to 6 hours, into Jaisalmer for Sonar Quila, Patwon Ki Haveli and Gadisar Lake before the evening at Sam Sand Dunes. Camel or jeep safari tickets and camp upgrades stay extra. The package ends with a drop at Jaisalmer airport or railway station.</p>${mumbaiClose("Udaipur, Jodhpur and Jaisalmer", "Jaisalmer airport or railway station", "a desert-and-palace road trip")}`,
    itinerary: [
      {
        day: 1,
        title: "Arrive Udaipur",
        points: `<p>Begin your Rajasthan desert holiday with pickup from Udaipur airport or railway station and a transfer to your hotel in the City of Lakes. After check-in, start with City Palace on the eastern bank of Lake Pichola, then walk to Jagdish Temple. Saheliyon Ki Bari and Fateh Sagar Lake fit the late afternoon if you arrive by midday. An optional boat ride on Lake Pichola, with views of the Lake Palace and Jag Mandir, is extra and depends on jetty timings. Evening at leisure along Gangaur Ghat. Dinner at the hotel and overnight in Udaipur with Switch 2 Travel.</p>`,
      },
      {
        day: 2,
        title: "Udaipur sightseeing",
        points: `<p>After breakfast, continue Udaipur at a fuller pace. Sajjangarh, the Monsoon Palace, sits on a hill above the city and is best in clear weather for the lake views. Moti Magri and the Maharana Pratap memorial, the vintage car museum, or a return to the old-town lanes around Hathipol can fill the middle of the day. Bagore Ki Haveli hosts an evening folk performance on many nights; tickets stay extra. Keep time for a second walk at Fateh Sagar or Ambrai Ghat if the first day was rushed. Dinner at the hotel and overnight in Udaipur.</p>`,
      },
      {
        day: 3,
        title: "Udaipur to Jodhpur",
        distance: { value: 260, unit: "km" },
        points: `<p>After breakfast, check out and drive about 250 to 270 km towards Jodhpur, usually 5 to 7 hours with a proper lunch stop. The usual scenic route goes through the Aravallis and can include Ranakpur Jain Temple, known for its marble pillars, or Nathdwara and the Haldighati battlefield museum if the group prefers a temple-and-history day. On arrival in the Blue City, check in and rest. If light remains, a short walk near the Clock Tower market is enough. Dinner at the hotel and overnight in Jodhpur.</p>`,
      },
      {
        day: 4,
        title: "Jodhpur sightseeing",
        points: `<p>After breakfast, climb to Mehrangarh Fort, the great citadel above the indigo houses, and walk its palaces, cannon yards and museum rooms. Jaswant Thada, the white marble cenotaph nearby, is a quieter second stop. Umaid Bhawan Palace can be seen from the museum wing that is open to visitors; the hotel sections remain private. Toorji Ka Jhalra stepwell and the Clock Tower bazaar work well in the late afternoon. Optional Mandore Garden or Rao Jodha Desert Rock Park can replace a market hour. Dinner at the hotel and overnight in Jodhpur.</p>`,
      },
      {
        day: 5,
        title: "Jodhpur to Jaisalmer",
        distance: { value: 290, unit: "km" },
        points: `<p>After breakfast, drive about 285 to 300 km west into the Thar, usually 5 to 6 hours as the towns thin out and the light turns gold. A stop at the Jaisalmer War Museum is common if the group wants a short break. On arrival, check into your Jaisalmer hotel and rest after the highway. An evening walk at Gadisar Lake, with its sandstone ghats and temples, is a gentle introduction to the Golden City before the desert night tomorrow. Dinner at the hotel and overnight in Jaisalmer.</p>`,
      },
      {
        day: 6,
        title: "Jaisalmer fort, havelis and desert camp",
        points: `<p>After breakfast, explore Jaisalmer Fort, also called Sonar Quila, one of the few living forts in the world, with houses, shops and Jain temples still inside the walls. Continue to Patwon Ki Haveli, Nathmal Ki Haveli and Salim Singh Ki Haveli for the carved sandstone facades. In the afternoon, drive out to Sam Sand Dunes for sunset. A camel ride or jeep safari, folk music and a Rajasthani dinner are typical camp extras and are charged separately unless confirmed in writing. Overnight at the desert camp, subject to season; tents are often limited in peak summer.</p>`,
      },
      {
        day: 7,
        title: "Jaisalmer drop",
        points: `<p>After breakfast at the camp or a return to town, transfer to Jaisalmer airport or railway station as per your departure. If you have a late train, a short bazaar hour for mirror-work and embroidered textiles is possible before the drop. This concludes the Jaisalmer via Udaipur and Jodhpur desert package with Switch 2 Travel. Travellers who need a Jodhpur drop instead of Jaisalmer should request it in writing before booking, as the last-day drive adds several hours.</p>`,
      },
    ],
  },
  {
    title: "Rajasthan Trip - Jaipur Udaipur Jaisalmer Christmas Package (7N/8D)",
    categoryId: BACKPACKING,
    categoryIds: [BACKPACKING, POPULAR],
    pickup: "Jaipur",
    drop: "Jaisalmer",
    durationDays: 8,
    stayLine:
      "2 nights in Jaipur, 2 nights in Udaipur, 1 night in Jodhpur and 2 nights in Jaisalmer including one desert-camp night when dates allow.",
    cardImage: card(photo.festive),
    heroImage: photo.hawaPink,
    galleryImages: [photo.jaisalmerWalls],
    metaTitle: "Rajasthan Christmas New Year (8D/7N) | Switch 2 Travel",
    metaDescription:
      "Planning a Rajasthan Christmas or New Year trip from Mumbai? This 8D/7N tour covers Jaipur, Udaipur and Jaisalmer, with hotel stays.",
    overview: `<p>Discover festive Rajasthan with the <strong>Jaipur, Udaipur and Jaisalmer Christmas and New Year backpacking package by Switch 2 Travel</strong>, designed for travellers looking to spend the holiday fortnight across the Pink City, the City of Lakes and the Thar Desert. From Amber Fort and Hawa Mahal to Lake Pichola, Mehrangarh and a night near Sam Sand Dunes, this 8 days and 7 nights Rajasthan tour offers a memorable seasonal getaway filled with forts, lakes and a desert evening if your dates cover late December.</p><p>Your journey begins in Jaipur for two nights of Amber Fort, City Palace, Jantar Mantar and the bazaars. You then drive about 395 km to Udaipur, often via Ajmer or Chittorgarh Fort, for two nights on the lakes. The road continues to Jodhpur for Mehrangarh and one night, then about 290 km to Jaisalmer for the living fort, havelis and the dunes. Hotels in the Christmas and New Year window go early and some nights are non-refundable. Peak supplements may be quoted in writing before you pay the advance. Party tickets, special dinners and camel or jeep rides stay extra. The package drops you in Jaisalmer.</p>${mumbaiClose("Jaipur, Udaipur, Jodhpur and Jaisalmer", "Jaisalmer airport or railway station", "a Christmas or New Year escape with friends")}`,
    itinerary: [
      {
        day: 1,
        title: "Arrive Jaipur",
        points: `<p>Begin your festive Rajasthan holiday with pickup from Jaipur airport or railway station and a transfer to your hotel in the Pink City. After check-in, visit Amber Fort if you arrive by early afternoon, or keep the first evening lighter with Hawa Mahal photographs, a bazaar walk and dinner. In late December the old city is busy and hotel check-in can run late, so we do not pack a full monument list on day one. Dinner at the hotel and overnight in Jaipur with Switch 2 Travel.</p>`,
      },
      {
        day: 2,
        title: "Jaipur sightseeing",
        points: `<p>After breakfast, cover Amber Fort if you skipped it on arrival, then Jal Mahal, City Palace, Jantar Mantar and Hawa Mahal. Albert Hall or Patrika Gate can be added for photographs. Markets stay open late in the holiday week; Johari Bazaar and Bapu Bazaar are the usual evening lanes. Keep a warm layer for Jaipur nights in December. Dinner at the hotel and overnight in Jaipur.</p>`,
      },
      {
        day: 3,
        title: "Jaipur to Udaipur",
        distance: { value: 395, unit: "km" },
        points: `<p>After breakfast, drive about 395 km from Jaipur to Udaipur, usually 6.5 to 8 hours. The Chittorgarh Fort route adds Vijay Stambh, Kirti Stambh and Padmini Palace if you leave early and accept a shorter evening in Udaipur. The Ajmer route is an option if the group prefers a dargah stop instead of the fort. On arrival, check in and walk Gangaur Ghat if light remains. Dinner at the hotel and overnight in Udaipur.</p>`,
      },
      {
        day: 4,
        title: "Udaipur sightseeing",
        points: `<p>After breakfast, spend the day at City Palace, Jagdish Temple, Saheliyon Ki Bari and Fateh Sagar. An optional Lake Pichola boat at sunset is the highlight for most Christmas groups; tickets are extra and queues are longer in the last week of December. Bagore Ki Haveli's folk show is another paid evening option. Dinner at the hotel and overnight in Udaipur.</p>`,
      },
      {
        day: 5,
        title: "Udaipur to Jodhpur",
        distance: { value: 250, unit: "km" },
        points: `<p>After breakfast, drive about 250 km to Jodhpur, around 4.5 to 5.5 hours, with a stop at Ranakpur Jain Temple when the group wants marble architecture in the Aravallis. Check in and visit Mehrangarh Fort if you reach by mid-afternoon; otherwise keep the evening for the Clock Tower market and a rooftop view of the fort lights. Dinner at the hotel and overnight in Jodhpur.</p>`,
      },
      {
        day: 6,
        title: "Jodhpur to Jaisalmer",
        distance: { value: 290, unit: "km" },
        points: `<p>After breakfast, finish Jaswant Thada or Umaid Bhawan if you missed them, then drive about 290 km to Jaisalmer, 5 to 6 hours across the Thar. Check in and visit Gadisar Lake in the evening. If your trip covers 31 December, we confirm in writing whether the desert camp night falls on this evening or the next, because New Year camps sell out and some are non-refundable. Overnight in Jaisalmer.</p>`,
      },
      {
        day: 7,
        title: "Jaisalmer and desert night",
        points: `<p>After breakfast, explore Jaisalmer Fort, Patwon Ki Haveli and the old-town lanes. In the afternoon, transfer to Sam Sand Dunes for sunset, a camel or jeep ride and a cultural evening. If this is New Year's Eve, special dinners and party tickets are extra and follow the camp's rules. Overnight at the desert camp when available; otherwise you return to the Jaisalmer hotel after the dune visit.</p>`,
      },
      {
        day: 8,
        title: "Jaisalmer drop",
        points: `<p>After breakfast, transfer to Jaisalmer airport or railway station. Peak-week departures fill early, so we ask you to share flight or train times in writing before the balance payment. This concludes the Jaipur, Udaipur and Jaisalmer Christmas package with Switch 2 Travel.</p>`,
      },
    ],
  },
  {
    title: "Rajasthan Trip - Jaipur with Ranthambore Tour Package (3N/4D)",
    categoryId: POPULAR,
    categoryIds: [POPULAR, WEEKEND],
    pickup: "Jaipur",
    drop: "Jaipur",
    durationDays: 4,
    stayLine: "2 nights in Jaipur and 1 night in Ranthambore.",
    cardImage: card(photo.tiger),
    heroImage: photo.amberFort,
    galleryImages: [photo.hawaMahal],
    metaTitle: "Jaipur & Ranthambore (4D/3N) | Switch 2 Travel",
    metaDescription:
      "Planning a Jaipur and Ranthambore trip from Mumbai? This 4D/3N tour covers Pink City forts and a tiger safari, with hotel stays.",
    overview: `<p>Discover the Pink City and tiger country with the <strong>Jaipur with Ranthambore tour package by Switch 2 Travel</strong>, designed for travellers looking to pair Amber Fort and City Palace with an afternoon safari in Ranthambore National Park. From Hawa Mahal and Jantar Mantar to the dry teak forest, Padam Talao and the UNESCO-listed Ranthambore Fort above the lakes, this 4 days and 3 nights Rajasthan tour offers a memorable wildlife-and-heritage getaway filled with sightseeing and one core-zone game drive.</p><p>Your journey begins in Jaipur for two nights covering Amber Fort about 11 km from town, Jal Mahal, City Palace and the bazaars. On the third morning you drive about 175 to 180 km, 3.5 to 4 hours via Tonk, to Sawai Madhopur. Ranthambore became a Project Tiger reserve in 1974 and a national park in 1980; the park is split into ten safari zones, with zones 1 to 5 usually treated as the core. An afternoon canter or gypsy, typically 2:00 pm to 5:30 pm in the winter window, is the main wildlife slot. Safari tickets, park fees and guide charges are extra and follow Forest Department allotment. Tiger sightings are never guaranteed. The last day returns you about 180 km to Jaipur for your flight or train.</p>${mumbaiClose("Jaipur and Ranthambore", "Jaipur airport or railway station", "a short fort-and-safari break")}`,
    itinerary: [
      {
        day: 1,
        title: "Arrive Jaipur",
        points: `<p>Begin your Rajasthan holiday with pickup from Jaipur airport or railway station and a transfer to your hotel. After check-in, visit Amber Fort if you arrive with enough light, walking the courtyards to the Sheesh Mahal and stopping at Jal Mahal on the way back. If the flight is late, keep the evening for Hawa Mahal photographs and a short bazaar walk. Dinner at the hotel and overnight in Jaipur with Switch 2 Travel.</p>`,
      },
      {
        day: 2,
        title: "Jaipur sightseeing",
        points: `<p>After breakfast, cover City Palace, Jantar Mantar, Hawa Mahal and any Amber Fort time you missed on day one. Albert Hall Museum and Birla Mandir are easy extras if the group wants a slower afternoon. The evening is free in the old-city markets. We confirm your Ranthambore safari zone and vehicle type in writing before travel; gypsy seats are limited and often sell out on weekends. Dinner at the hotel and overnight in Jaipur.</p>`,
      },
      {
        day: 3,
        title: "Jaipur to Ranthambore and afternoon safari",
        distance: { value: 180, unit: "km" },
        points: `<p>After an early breakfast, drive about 180 km south to Ranthambore, 3.5 to 4 hours through Tonk, and check into your lodge near Sawai Madhopur. Rest, then join the afternoon safari when permits are confirmed, usually a canter or gypsy covering one zone. Carry the same photo ID used for the booking. Between drives or after the safari, Ranthambore Fort and the Trinetra Ganesh temple can be visited if the park road and your energy allow. Safari tickets remain extra. Dinner at the hotel and overnight in Ranthambore.</p>`,
      },
      {
        day: 4,
        title: "Ranthambore to Jaipur drop",
        distance: { value: 180, unit: "km" },
        points: `<p>A morning safari can be added only if tickets were booked in advance and your departure from Jaipur is late enough for the 180 km return drive. After breakfast, check out and drive back to Jaipur airport or railway station, allowing four hours plus a buffer. This concludes the Jaipur with Ranthambore tour package with Switch 2 Travel. Remember that closed park days, monsoon shutdowns and zone changes are controlled by the Forest Department, not by the agency.</p>`,
      },
    ],
  },
  {
    title: "Rajasthan Trip - Udaipur with Mount Abu Tour Package (3N/4D)",
    categoryId: POPULAR,
    categoryIds: [POPULAR, WEEKEND, HONEYMOON],
    pickup: "Udaipur",
    drop: "Udaipur",
    durationDays: 4,
    stayLine: "2 nights in Udaipur and 1 night in Mount Abu.",
    cardImage: photo.udaipurLake,
    heroImage: photo.aravalli,
    galleryImages: [photo.hills],
    metaTitle: "Udaipur & Mount Abu (4D/3N) | Switch 2 Travel",
    metaDescription:
      "Planning an Udaipur and Mount Abu trip from Mumbai? This 4D/3N tour covers Lake Pichola and Dilwara temples, with hotel stays.",
    overview: `<p>Discover lakes and Rajasthan's only hill station with the <strong>Udaipur with Mount Abu tour package by Switch 2 Travel</strong>, designed for travellers looking to combine City Palace and Lake Pichola with Dilwara Jain Temples and Nakki Lake. From Sajjangarh and Fateh Sagar in the City of Lakes to Sunset Point, Toad Rock and the cooler Aravalli air at about 1,200 metres, this 4 days and 3 nights Rajasthan tour offers a memorable short getaway filled with palaces, marble temples and a night in the hills.</p><p>Your journey begins in Udaipur for two nights covering City Palace, Jagdish Temple, Saheliyon Ki Bari and an optional Lake Pichola boat. On the third morning you drive about 160 to 165 km, 3.5 to 4 hours, climbing the hairpin road from Abu Road. Dilwara admits tourists roughly from noon to 5 pm, with no photography inside, so many groups visit Nakki Lake and Sunset Point on arrival and Dilwara the next midday before the return. Guru Shikhar, the highest point of the Aravallis at 1,722 metres, is an optional extra if time remains. The package drops you back at Udaipur airport or railway station, or at Abu Road station if you confirm that in writing.</p>${mumbaiClose("Udaipur and Mount Abu", "Udaipur airport or railway station", "a lakes-and-hills escape for couples or families")}`,
    itinerary: [
      {
        day: 1,
        title: "Arrive Udaipur",
        points: `<p>Begin your Rajasthan holiday with pickup from Udaipur airport or railway station and a transfer to your hotel. After check-in, visit City Palace and Jagdish Temple, then walk Saheliyon Ki Bari if time remains. An optional boat on Lake Pichola in the late afternoon shows the Lake Palace and Jag Mandir from the water; jetty tickets are extra. Evening at Gangaur Ghat or a rooftop cafe. Dinner at the hotel and overnight in Udaipur with Switch 2 Travel.</p>`,
      },
      {
        day: 2,
        title: "Udaipur sightseeing",
        points: `<p>After breakfast, visit Sajjangarh Monsoon Palace for the lake views when the road and weather allow, then Fateh Sagar, Moti Magri and the old-town markets around Hathipol. Bagore Ki Haveli's evening folk show is a paid option. Keep the day slightly lighter than a packed circuit so you are fresh for the hill drive tomorrow. Dinner at the hotel and overnight in Udaipur.</p>`,
      },
      {
        day: 3,
        title: "Udaipur to Mount Abu",
        distance: { value: 165, unit: "km" },
        points: `<p>After breakfast, drive about 165 km to Mount Abu, 3.5 to 4 hours, with the last stretch on hairpin bends from Abu Road; air-conditioning is often restricted on the climb. Check in, then visit Nakki Lake for a promenade walk or a short boat, Toad Rock and Sunset Point over the Aravallis. Dilwara can be attempted today only if you reach before the tourist window closes, which is uncommon on a lunch-time arrival. Mount Abu is cooler than Udaipur, so carry a layer. Dinner at the hotel and overnight in Mount Abu.</p>`,
      },
      {
        day: 4,
        title: "Dilwara temples and Udaipur drop",
        distance: { value: 165, unit: "km" },
        points: `<p>After breakfast, visit Dilwara Jain Temples when they open to visitors around noon, walking Vimal Vasahi and Luna Vasahi slowly. Photography and leather items are not allowed inside. Guru Shikhar can replace or follow Dilwara only if your Udaipur departure is late. Then drive about 165 km back to Udaipur airport or railway station, or 28 km down to Abu Road station if that drop was confirmed. This concludes the Udaipur with Mount Abu tour package with Switch 2 Travel.</p>`,
      },
    ],
  },
  {
    title: "Rajasthan Trip - Jaipur to Bikaner Heritage Tour Package (8N/9D)",
    categoryId: POPULAR,
    categoryIds: [POPULAR, ROAD],
    pickup: "Jaipur",
    drop: "Udaipur",
    durationDays: 9,
    stayLine:
      "2 nights in Jaipur, 1 night in Bikaner, 1 night in Jaisalmer, 1 night at a Jaisalmer desert camp, 1 night in Jodhpur and 2 nights in Udaipur.",
    cardImage: card(photo.pinkPalace),
    heroImage: photo.jodhpurBlue,
    galleryImages: [photo.jaisalmer],
    metaTitle: "Rajasthan Heritage Tour (9D/8N) | Switch 2 Travel",
    metaDescription:
      "Planning a long Rajasthan heritage trip from Mumbai? This 9D/8N tour covers Jaipur, Bikaner, Jaisalmer, Jodhpur and Udaipur.",
    overview: `<p>Discover the grand desert circuit with the <strong>Jaipur to Bikaner heritage tour package by Switch 2 Travel</strong>, designed for travellers looking to see five royal cities in nine days: the Pink City, Bikaner's Junagarh and Karni Mata Temple, Jaisalmer's living fort and Sam dunes, Jodhpur's Mehrangarh, and Udaipur's lakes. From Amber Fort and Hawa Mahal to camel country, Sonar Quila and Lake Pichola, this 9 days and 8 nights Rajasthan tour offers a memorable heritage getaway filled with forts, havelis, a desert camp night and long but standard highway days.</p><p>Your journey begins in Jaipur for two nights, then covers about 330 km, 5 to 6 hours, to Bikaner for Junagarh Fort, the camel breeding farm and Deshnoke's Karni Mata Temple. The next hop is about 330 km to Jaisalmer for the fort, Patwon Ki Haveli and Gadisar, followed by a Sam Sand Dunes camp night. You then drive about 290 km to Jodhpur and about 250 km to Udaipur via Ranakpur, ending with two nights on the lakes and a drop at Udaipur airport or station. Monument tickets, camel rides and camp upgrades stay extra. This is the longer family circuit most Mumbai travellers mean when they ask for Jaipur to Bikaner and the desert in one booking.</p>${mumbaiClose("Jaipur, Bikaner, Jaisalmer, Jodhpur and Udaipur", "Udaipur airport or railway station", "a full heritage circuit across the desert state")}`,
    itinerary: [
      {
        day: 1,
        title: "Arrive Jaipur",
        points: `<p>Begin your Rajasthan heritage holiday with pickup from Jaipur airport or railway station and a transfer to your hotel. After check-in, visit Amber Fort and Jal Mahal if you arrive with daylight, or keep a lighter first evening at Hawa Mahal and the bazaars. Dinner at the hotel and overnight in Jaipur with Switch 2 Travel.</p>`,
      },
      {
        day: 2,
        title: "Jaipur sightseeing",
        points: `<p>After breakfast, spend a full day at City Palace, Jantar Mantar, Hawa Mahal, and any Amber Fort time left from day one. Albert Hall Museum, Birla Mandir or Nahargarh sunset can be added. Evening free in Johari Bazaar. Dinner at the hotel and overnight in Jaipur.</p>`,
      },
      {
        day: 3,
        title: "Jaipur to Bikaner",
        distance: { value: 330, unit: "km" },
        points: `<p>After breakfast, drive about 330 km north-west to Bikaner, 5 to 6 hours across semi-desert. On arrival, visit Junagarh Fort, built in the late sixteenth century, with Anup Mahal and the fort museum. If time remains, continue to Karni Mata Temple at Deshnoke, known for its resident rats, or the camel breeding farm on the Jodhpur road. Dinner at the hotel and overnight in Bikaner.</p>`,
      },
      {
        day: 4,
        title: "Bikaner to Jaisalmer",
        distance: { value: 330, unit: "km" },
        points: `<p>After breakfast, drive about 330 km to Jaisalmer, another 5 to 6 hours as the landscape opens into the Thar. Check in and walk Gadisar Lake in the evening, when the sandstone ghats and temples are quieter. Dinner at the hotel and overnight in Jaisalmer.</p>`,
      },
      {
        day: 5,
        title: "Jaisalmer and desert camp",
        points: `<p>After breakfast, explore Jaisalmer Fort, the Jain temples inside the walls, and the havelis of Patwon, Nathmal and Salim Singh. In the afternoon, transfer to Sam Sand Dunes for sunset, an optional camel or jeep ride and a folk evening. Overnight at the desert camp when the season allows; otherwise you return to the Jaisalmer hotel after the dune visit. Camp extras stay extra.</p>`,
      },
      {
        day: 6,
        title: "Jaisalmer to Jodhpur",
        distance: { value: 290, unit: "km" },
        points: `<p>After breakfast, drive about 290 km to Jodhpur, 5 to 6 hours. On arrival, visit Mehrangarh Fort if you reach by mid-afternoon, then Jaswant Thada or the Clock Tower market. Dinner at the hotel and overnight in Jodhpur.</p>`,
      },
      {
        day: 7,
        title: "Jodhpur to Udaipur via Ranakpur",
        distance: { value: 250, unit: "km" },
        points: `<p>After breakfast, finish Umaid Bhawan museum if needed, then drive about 250 km to Udaipur, 4.5 to 5.5 hours through the Aravallis. Stop at Ranakpur Jain Temple when the group wants the marble pillars. Check in and walk a lake ghat if you arrive before dark. Dinner at the hotel and overnight in Udaipur.</p>`,
      },
      {
        day: 8,
        title: "Udaipur sightseeing",
        points: `<p>After breakfast, visit City Palace, Jagdish Temple, Saheliyon Ki Bari and Fateh Sagar. An optional Lake Pichola boat is the usual sunset plan. Evening free at Gangaur Ghat. Dinner at the hotel and overnight in Udaipur.</p>`,
      },
      {
        day: 9,
        title: "Udaipur drop",
        points: `<p>After breakfast, transfer to Udaipur airport or railway station. Sajjangarh can be added only if your departure is late. This concludes the Jaipur to Bikaner heritage tour package with Switch 2 Travel, having crossed five cities from the Pink City to the lakes.</p>`,
      },
    ],
  },
  {
    title: "Rajasthan Trip - Pushkar Udaipur Bikaner Backpacking Package (6N/7D)",
    categoryId: BACKPACKING,
    categoryIds: [BACKPACKING, ROAD],
    pickup: "Jaipur",
    drop: "Jaipur",
    durationDays: 7,
    stayLine: "2 nights in Pushkar, 2 nights in Udaipur and 2 nights in Bikaner.",
    cardImage: card(photo.camel),
    heroImage: photo.udaipurLake,
    galleryImages: [photo.desertDunes],
    metaTitle: "Pushkar Udaipur Bikaner (7D/6N) | Switch 2 Travel",
    metaDescription:
      "Planning a Rajasthan backpacking trip from Mumbai? This 7D/6N tour covers Pushkar, Udaipur and Bikaner, with hotel stays and Jaipur transfers.",
    overview: `<p>Discover a less crowded Rajasthan loop with the <strong>Pushkar, Udaipur and Bikaner backpacking package by Switch 2 Travel</strong>, designed for travellers looking to skip a packed Pink City checklist and spend time at Pushkar Lake, Udaipur's ghats and Bikaner's Junagarh instead. From Ajmer Sharif Dargah and Brahma Temple to City Palace, Lake Pichola, Karni Mata Temple and the camel-country bazaars, this 7 days and 6 nights Rajasthan tour offers a memorable backpacking-style getaway filled with temple towns, lakes and a long desert-highway day.</p><p>Your journey begins with pickup in Jaipur and a 150 km drive to Pushkar via Ajmer for two nights on the ghats. You then drive south towards Udaipur, about 400 km, often via Chittorgarh Fort, for two nights on the lakes. The hardest road day is Udaipur to Bikaner, roughly 500 km via Ajmer or the Jaipur belt, 9 to 11 hours, which we treat as a transfer day with meal stops rather than extra forts. Bikaner then gets Junagarh, Deshnoke and a second night before the 330 km return to Jaipur. This route is for friend groups who accept one long driving day in exchange for three distinct towns. Monument tickets and the optional Chittorgarh stop stay extra.</p>${mumbaiClose("Pushkar, Udaipur and Bikaner", "Jaipur airport or railway station", "a backpacking loop away from the busiest desert camps")}`,
    itinerary: [
      {
        day: 1,
        title: "Jaipur to Pushkar via Ajmer",
        distance: { value: 150, unit: "km" },
        points: `<p>Begin your Rajasthan backpacking holiday with pickup from Jaipur airport or railway station and a drive of about 150 km to Pushkar via Ajmer, 2.5 to 3 hours. Stop at Ajmer Sharif Dargah if arrival time allows. Check into your Pushkar hotel and walk Pushkar Lake, Brahma Temple and the bazaar lanes. The town is vegetarian and temple-focused; dress modestly at the ghats. Dinner at the hotel and overnight in Pushkar with Switch 2 Travel.</p>`,
      },
      {
        day: 2,
        title: "Pushkar leisure",
        points: `<p>After breakfast, keep a full day in Pushkar. Repeat the ghats at a slower pace, visit Savitri Temple on the hill if you want the lake view, and browse rose products and silver in the market. An optional camel ride on the dunes outside town is extra. There is no long highway today, which makes this the rest day before the southbound drive. Dinner at the hotel and overnight in Pushkar.</p>`,
      },
      {
        day: 3,
        title: "Pushkar to Udaipur via Chittorgarh",
        distance: { value: 400, unit: "km" },
        points: `<p>After an early breakfast, drive south towards Udaipur, about 400 km and 7 to 9 hours depending on the Chittorgarh Fort stop. Chittorgarh is a UNESCO hill fort with Vijay Stambh, Kirti Stambh, Padmini Palace and Gaumukh; the visit adds time but breaks the road. If you skip the fort, you reach the lakes earlier. Check in and walk a ghat if light remains. Dinner at the hotel and overnight in Udaipur.</p>`,
      },
      {
        day: 4,
        title: "Udaipur sightseeing",
        points: `<p>After breakfast, visit City Palace, Jagdish Temple, Saheliyon Ki Bari and Fateh Sagar. An optional Lake Pichola boat is extra. Evening free in the old town. This is the only full Udaipur day on this backpacking loop, so we keep the list to the core lakeside sights rather than a Mount Abu add-on. Dinner at the hotel and overnight in Udaipur.</p>`,
      },
      {
        day: 5,
        title: "Udaipur to Bikaner",
        distance: { value: 500, unit: "km" },
        points: `<p>After an early breakfast, drive north to Bikaner, about 500 km and 9 to 11 hours via Ajmer or the Jaipur belt. This is the long transfer of the package; we plan meal stops and do not add a second fort circuit on the same day. On arrival, check in and rest. A short market walk is enough if you reach after dark. Dinner at the hotel and overnight in Bikaner.</p>`,
      },
      {
        day: 6,
        title: "Bikaner sightseeing",
        points: `<p>After breakfast, visit Junagarh Fort and its palaces, then Karni Mata Temple at Deshnoke and, if open, the camel breeding farm. Bikaner's bazaars are known for namkeen, bhujia and camel-leather work. The evening is free. Dinner at the hotel and overnight in Bikaner.</p>`,
      },
      {
        day: 7,
        title: "Bikaner to Jaipur drop",
        distance: { value: 330, unit: "km" },
        points: `<p>After breakfast, drive about 330 km, 5 to 6 hours, back to Jaipur airport or railway station. This concludes the Pushkar, Udaipur and Bikaner backpacking package with Switch 2 Travel. Share your departure time in writing so the last highway day is not cut too fine.</p>`,
      },
    ],
  },
  {
    title: "Rajasthan Trip - Jaisalmer via Udaipur and Jodhpur Desert Package (7N/8D)",
    categoryId: POPULAR,
    categoryIds: [POPULAR, ROAD],
    pickup: "Udaipur",
    drop: "Jaisalmer",
    durationDays: 8,
    stayLine:
      "2 nights in Udaipur, 2 nights in Jodhpur, 2 nights in Jaisalmer and 1 night at a Jaisalmer desert camp.",
    cardImage: card(photo.jaisalmerWalls),
    heroImage: photo.desertDunes,
    galleryImages: [photo.jodhpurBlue],
    metaTitle: "Jaisalmer Desert Tour (8D/7N) | Switch 2 Travel",
    metaDescription:
      "Planning a longer Rajasthan desert trip from Mumbai? This 8D/7N tour covers Udaipur, Jodhpur and Jaisalmer, with hotel and camp stays.",
    overview: `<p>Discover a slower desert triangle with the <strong>Jaisalmer via Udaipur and Jodhpur 7 nights desert package by Switch 2 Travel</strong>, designed for travellers who want the same lakes-forts-dunes line as the 6 night version, with an extra Jaisalmer hotel night so the fort day is not rushed into the camp evening. From City Palace and Lake Pichola to Mehrangarh, Sonar Quila, the havelis and Sam Sand Dunes, this 8 days and 7 nights Rajasthan tour offers a memorable getaway filled with two full Udaipur days, two Jodhpur nights and a proper Golden City morning before the desert camp.</p><p>Your journey begins in Udaipur for City Palace, Jagdish Temple, Sajjangarh and an optional Pichola boat. The road to Jodhpur is about 250 to 270 km via Ranakpur or Nathdwara and Haldighati. Jodhpur then gets a full Mehrangarh day rather than an evening-only stop. Jaisalmer is split: one hotel night after the 290 km drive, one full fort-and-haveli day, then the Sam dunes camp. Camel rides, jeep safaris and camp upgrades stay extra. The package drops you at Jaisalmer airport or railway station. Families who found the 6 night version tight usually prefer this pacing.</p>${mumbaiClose("Udaipur, Jodhpur and Jaisalmer", "Jaisalmer airport or railway station", "a slower desert holiday with an extra Golden City night")}`,
    itinerary: [
      {
        day: 1,
        title: "Arrive Udaipur",
        points: `<p>Begin your longer desert holiday with pickup from Udaipur airport or railway station and a transfer to your hotel. After check-in, visit City Palace, Jagdish Temple and Saheliyon Ki Bari. An optional Lake Pichola boat is extra. Evening at Gangaur Ghat. Dinner at the hotel and overnight in Udaipur with Switch 2 Travel.</p>`,
      },
      {
        day: 2,
        title: "Udaipur sightseeing",
        points: `<p>After breakfast, visit Sajjangarh, Fateh Sagar, Moti Magri and the old-town markets. A second lake hour or Bagore Ki Haveli in the evening can replace a rushed first day. Dinner at the hotel and overnight in Udaipur.</p>`,
      },
      {
        day: 3,
        title: "Udaipur to Jodhpur",
        distance: { value: 260, unit: "km" },
        points: `<p>After breakfast, drive about 260 km to Jodhpur, 5 to 7 hours, stopping at Ranakpur or at Nathdwara and Haldighati. Check in and keep the evening light at the Clock Tower. Dinner at the hotel and overnight in Jodhpur.</p>`,
      },
      {
        day: 4,
        title: "Jodhpur sightseeing",
        points: `<p>After breakfast, spend a full day at Mehrangarh Fort, Jaswant Thada, Umaid Bhawan museum and Toorji Ka Jhalra. Mandore Garden or Rao Jodha Desert Rock Park can replace a market hour. Dinner at the hotel and overnight in Jodhpur.</p>`,
      },
      {
        day: 5,
        title: "Jodhpur to Jaisalmer",
        distance: { value: 290, unit: "km" },
        points: `<p>After breakfast, drive about 290 km to Jaisalmer, 5 to 6 hours. Check in and visit Gadisar Lake in the evening so tomorrow can stay inside the fort and havelis. Dinner at the hotel and overnight in Jaisalmer.</p>`,
      },
      {
        day: 6,
        title: "Jaisalmer fort and havelis",
        points: `<p>After breakfast, explore Jaisalmer Fort, the Jain temples and Patwon, Nathmal and Salim Singh havelis without packing the dunes into the same afternoon. Bazaar time for embroidery and mirror-work fits the evening. Dinner at the hotel and overnight in Jaisalmer.</p>`,
      },
      {
        day: 7,
        title: "Sam Sand Dunes desert camp",
        points: `<p>A free morning in town, then an afternoon transfer to Sam Sand Dunes for sunset, an optional camel or jeep safari and a folk evening. Overnight at the desert camp when the season allows. Camp activities stay extra unless confirmed in writing.</p>`,
      },
      {
        day: 8,
        title: "Jaisalmer drop",
        points: `<p>After breakfast, transfer to Jaisalmer airport or railway station. A Jodhpur drop can be requested in writing before booking. This concludes the 7 night Jaisalmer via Udaipur and Jodhpur desert package with Switch 2 Travel.</p>`,
      },
    ],
  },
  {
    title: "Rajasthan Trip - Jaipur and Udaipur via Ajmer and Pushkar (4N/5D)",
    categoryId: POPULAR,
    categoryIds: [POPULAR, WEEKEND],
    pickup: "Jaipur",
    drop: "Udaipur",
    durationDays: 5,
    stayLine: "2 nights in Jaipur, 1 night in Pushkar and 1 night in Udaipur.",
    cardImage: card(photo.hawaPink),
    heroImage: photo.udaipurLake,
    galleryImages: [photo.amberFort],
    metaTitle: "Jaipur Udaipur via Pushkar (5D/4N) | Switch 2 Travel",
    metaDescription:
      "Planning a Jaipur and Udaipur trip from Mumbai? This 5D/4N tour covers Ajmer, Pushkar and the lakes, with hotel stays and transfers.",
    overview: `<p>Discover two royal capitals and a pilgrimage belt with the <strong>Jaipur and Udaipur via Ajmer and Pushkar tour package by Switch 2 Travel</strong>, designed for travellers looking to link the Pink City to the City of Lakes without skipping the dargah and Brahma Temple in between. From Amber Fort, Hawa Mahal and City Palace to Ajmer Sharif, Pushkar Lake and a first evening on Lake Pichola, this 5 days and 4 nights Rajasthan tour offers a memorable cross-state getaway filled with forts, ghats and one long southbound highway day.</p><p>Your journey begins in Jaipur for two nights of Amber Fort, Jal Mahal, Jantar Mantar and the bazaars. On day three you drive about 150 km to Pushkar via Ajmer, stay the night on the lake, then continue about 400 km to Udaipur, often with a Chittorgarh Fort stop if you leave Pushkar early. The last full evening is for City Palace and an optional Pichola boat before the Udaipur drop. Some operators compress Ajmer and Pushkar into the Jaipur–Udaipur transfer without a Pushkar night; this package keeps the night so the aarti is not a rushed photo stop. Monument tickets and the Chittorgarh detour stay extra.</p>${mumbaiClose("Jaipur, Ajmer, Pushkar and Udaipur", "Udaipur airport or railway station", "a five-day royal road between two capitals")}`,
    itinerary: [
      {
        day: 1,
        title: "Arrive Jaipur",
        points: `<p>Begin your Rajasthan holiday with pickup from Jaipur airport or railway station and a transfer to your hotel. After check-in, visit Amber Fort and Jal Mahal if daylight remains, or keep Hawa Mahal and a bazaar walk for a late arrival. Dinner at the hotel and overnight in Jaipur with Switch 2 Travel.</p>`,
      },
      {
        day: 2,
        title: "Jaipur sightseeing",
        points: `<p>After breakfast, cover City Palace, Jantar Mantar, Hawa Mahal and any Amber Fort time left from day one. Evening free in Johari Bazaar or Bapu Bazaar. Dinner at the hotel and overnight in Jaipur.</p>`,
      },
      {
        day: 3,
        title: "Jaipur to Pushkar via Ajmer",
        distance: { value: 150, unit: "km" },
        points: `<p>After breakfast, drive about 150 km via Kishangarh to Ajmer Sharif Dargah, then 15 km into Pushkar. Check in and visit Brahma Temple, Pushkar Lake and the evening aarti. Dinner at the hotel and overnight in Pushkar.</p>`,
      },
      {
        day: 4,
        title: "Pushkar to Udaipur",
        distance: { value: 400, unit: "km" },
        points: `<p>After an early breakfast, drive about 400 km to Udaipur, 7 to 9 hours. Chittorgarh Fort is the usual break if you start early; Vijay Stambh and Padmini Palace take two hours. Check in and walk Gangaur Ghat or take an optional Lake Pichola boat if you arrive before sunset. Dinner at the hotel and overnight in Udaipur.</p>`,
      },
      {
        day: 5,
        title: "Udaipur sightseeing and drop",
        points: `<p>After breakfast, visit City Palace, Jagdish Temple and Saheliyon Ki Bari, then transfer to Udaipur airport or railway station. Fateh Sagar or Sajjangarh fit only if your departure is late. This concludes the Jaipur and Udaipur via Ajmer and Pushkar package with Switch 2 Travel.</p>`,
      },
    ],
  },
  {
    title: "Rajasthan Trip - Jaipur Udaipur Jodhpur Jaisalmer Backpacking (7N/8D)",
    categoryId: BACKPACKING,
    categoryIds: [BACKPACKING, POPULAR, ROAD],
    pickup: "Jaipur",
    drop: "Jaisalmer",
    durationDays: 8,
    stayLine:
      "2 nights in Jaipur, 2 nights in Udaipur, 1 night in Jodhpur and 2 nights in Jaisalmer.",
    cardImage: card(photo.jodhpurBlue),
    heroImage: photo.jaisalmer,
    galleryImages: [photo.camel],
    metaTitle: "Jaipur to Jaisalmer Package (8D/7N) | Switch 2 Travel",
    metaDescription:
      "Planning a Rajasthan backpacking trip from Mumbai? This 8D/7N tour covers Jaipur, Udaipur, Jodhpur and Jaisalmer, with hotel stays.",
    overview: `<p>Discover the four-city backpacking line with the <strong>Jaipur, Udaipur, Jodhpur and Jaisalmer package by Switch 2 Travel</strong>, designed for travellers looking to cover the Pink City, the lakes, the Blue City and the Golden City in eight days without a separate Bikaner detour. From Amber Fort and Hawa Mahal to Lake Pichola, Mehrangarh Fort, Jaisalmer Fort and Sam Sand Dunes, this 8 days and 7 nights Rajasthan tour offers a memorable friend-group getaway filled with sightseeing, long scenic drives and a desert evening.</p><p>Your journey begins in Jaipur for two nights, then follows about 395 km to Udaipur, often via Chittorgarh, for two nights on the lakes. Jodhpur is one night after the 250 km Aravalli drive via Ranakpur, then about 290 km to Jaisalmer for the living fort, havelis and dunes. This is the standard backpacking circuit sold across Rajasthan tour pages: Jaipur in, Jaisalmer out, private vehicle throughout. Safari-style dune activities, boat tickets and monument fees stay extra. It is the right fit when the Christmas package's festive timing does not matter and you still want the same four cities.</p>${mumbaiClose("Jaipur, Udaipur, Jodhpur and Jaisalmer", "Jaisalmer airport or railway station", "a classic four-city backpacking circuit")}`,
    itinerary: [
      {
        day: 1,
        title: "Arrive Jaipur",
        points: `<p>Begin your Rajasthan backpacking holiday with pickup from Jaipur airport or railway station and a transfer to your hotel. After check-in, visit Amber Fort and Jal Mahal if you have daylight, or keep Hawa Mahal and the bazaars for a late flight. Dinner at the hotel and overnight in Jaipur with Switch 2 Travel.</p>`,
      },
      {
        day: 2,
        title: "Jaipur sightseeing",
        points: `<p>After breakfast, cover City Palace, Jantar Mantar, Hawa Mahal and any remaining Amber Fort time. Evening free in the old-city markets. Dinner at the hotel and overnight in Jaipur.</p>`,
      },
      {
        day: 3,
        title: "Jaipur to Udaipur",
        distance: { value: 395, unit: "km" },
        points: `<p>After breakfast, drive about 395 km to Udaipur, 6.5 to 8 hours. Chittorgarh Fort is the usual en-route stop when you leave early. Check in and walk a lake ghat if light remains. Dinner at the hotel and overnight in Udaipur.</p>`,
      },
      {
        day: 4,
        title: "Udaipur sightseeing",
        points: `<p>After breakfast, visit City Palace, Jagdish Temple, Saheliyon Ki Bari and Fateh Sagar. An optional Lake Pichola boat is extra. Evening free. Dinner at the hotel and overnight in Udaipur.</p>`,
      },
      {
        day: 5,
        title: "Udaipur to Jodhpur",
        distance: { value: 250, unit: "km" },
        points: `<p>After breakfast, drive about 250 km to Jodhpur via Ranakpur if the group wants the Jain temple. Visit Mehrangarh if you arrive by mid-afternoon. Dinner at the hotel and overnight in Jodhpur.</p>`,
      },
      {
        day: 6,
        title: "Jodhpur to Jaisalmer",
        distance: { value: 290, unit: "km" },
        points: `<p>After breakfast, see Jaswant Thada or Umaid Bhawan if needed, then drive about 290 km to Jaisalmer. Gadisar Lake fits the evening. Dinner at the hotel and overnight in Jaisalmer.</p>`,
      },
      {
        day: 7,
        title: "Jaisalmer and desert evening",
        points: `<p>After breakfast, explore Jaisalmer Fort and the havelis. In the afternoon, go out to Sam Sand Dunes for sunset and an optional camel or jeep ride. You may stay at a desert camp or return to the hotel; we confirm the night type in writing. Overnight in Jaisalmer or at the camp.</p>`,
      },
      {
        day: 8,
        title: "Jaisalmer drop",
        points: `<p>After breakfast, transfer to Jaisalmer airport or railway station. This concludes the Jaipur, Udaipur, Jodhpur and Jaisalmer backpacking package with Switch 2 Travel.</p>`,
      },
    ],
  },
]

function plainLength(html) {
  return String(html || "")
    .replace(/<[^>]+>/g, "")
    .replace(/&[^;]+;/g, " ")
    .trim().length
}

function dayExtra(title) {
  const t = title.toLowerCase()
  if (t.includes("ranthambore") || t.includes("safari")) {
    return ` Safari zones in Ranthambore are allotted by the Forest Department and cannot be swapped at the gate on a busy day. Wear earth colours, keep voices low and stay seated in the gypsy or canter. Closed weekdays, monsoon shutdowns and zone changes follow the official portal, not the hotel. Carry the same photo ID used for the permit.`
  }
  if (t.includes("mount abu") || t.includes("dilwara")) {
    return ` Dilwara Jain Temples usually admit tourists after noon; mornings are reserved for worship, and cameras and leather items stay outside. Nakki Lake boats and Sunset Point parking are extra. Mount Abu is cooler than Udaipur, so keep a layer even in October. Guru Shikhar adds a stair climb if you include it.`
  }
  if (t.includes("pushkar") || t.includes("ajmer")) {
    return ` Pushkar is a holy town: alcohol and non-vegetarian food are not served, and shoes come off at Brahma Temple and many ghats. The November camel fair fills hotels months ahead. Ajmer Sharif has a separate offering queue that we do not rush. Savitri Temple is a steep walk if you add the hill view.`
  }
  if (t.includes("jaisalmer") || t.includes("desert") || t.includes("sam") || t.includes("dune")) {
    return ` Jaisalmer Fort is a living fort, so the lanes stay busy with homes, shops and temples. Sam Sand Dunes camps vary from quiet tents to loud party grounds; we confirm the night type in writing. Camel and jeep rates, cultural-show tickets and heater charges in winter are extra unless they appear on your quote.`
  }
  if (t.includes("jodhpur") || t.includes("mehrangarh")) {
    return ` Mehrangarh is a long stone climb, with a lift option at extra cost when it is running. The blue houses below the fort are residential lanes, so keep photography respectful. Umaid Bhawan has a public museum wing; the hotel and royal rooms are not on the standard ticket. Clock Tower spice shops are the usual last stop.`
  }
  if (t.includes("udaipur") || t.includes("pichola")) {
    return ` Lake Pichola boats leave from the official jetties and stop when the water is rough. City Palace and Sajjangarh tickets are separate. Gangaur Ghat and Ambrai are the usual sunset walks. We do not include a folk-show ticket unless you ask for Bagore Ki Haveli in writing before travel.`
  }
  if (t.includes("bikaner") || t.includes("karni")) {
    return ` Junagarh sits on the plains, not a hill, and usually takes about two hours with the palace rooms and museum. Karni Mata Temple at Deshnoke is about 30 km from town; food and shoe rules apply. The camel breeding farm follows its own visiting hours. Bikaner's namkeen shops are a popular last stop.`
  }
  if (t.includes("jaipur") || t.includes("amber")) {
    return ` Jaipur traffic around the walled city can add 30 to 45 minutes between Amber Fort, Hawa Mahal and City Palace, so we start the hill fort first when the light is good. Elephant rides at Amber are optional, seasonal and paid directly. Nahargarh sunset and Albert Hall are the usual extras if a monument is closed.`
  }
  return ` Carry water for the highway, expect checkpoint stops, and keep the same photo ID used for hotel bookings. Lunch is not included on driving days. We may change the order of listed stops if a fort or temple is closed, without adding cities that are not in this package.`
}

function floorDay(day) {
  if (plainLength(day.points) >= 500) return day
  const extra = `${dayExtra(day.title)} Vegetarian breakfast and dinner follow the hotel or camp meal plan. The private vehicle, driver allowance, tolls and taxes are included; lunch, entry fees, camera fees, guides and activity charges are not. Switch 2 Travel will reorder listed stops if needed so you still see the core sights of this day.`
  return {
    ...day,
    points: day.points.replace(/<\/p>\s*$/, `${extra}</p>`),
  }
}

for (const trip of trips) {
  trip.itinerary = trip.itinerary.map(floorDay)
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
      throw new Error(
        `day ${day.day} too short (${chars}) on ${trip.title}: ${day.title}`
      )
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

async function main() {
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
    .findOne({ _id: RAJASTHAN }, { projection: { name: 1, slug: 1 } })
  if (!city) throw new Error("Rajasthan city not found")
  console.log(`City: ${city.name} (${city._id})`)

  const now = new Date()
  for (const raw of trips) {
    const doc = {
      title: raw.title,
      slug: slugify(raw.title),
      categoryId: raw.categoryId,
      categoryIds: raw.categoryIds,
      cityId: RAJASTHAN,
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

main()
  .catch((error) => {
    console.error(error)
    process.exitCode = 1
  })
  .finally(() => mongoose.disconnect().catch(() => {}))
