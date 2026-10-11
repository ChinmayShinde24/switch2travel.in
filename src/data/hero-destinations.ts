export type HeroDestination = {
  id: string
  region: string
  title: string
  place: string
  image: string
  href: string
  vibe: string
  days: string
  tags: string[]
}

export const heroDestinations: HeroDestination[] = [
  {
    id: "goa",
    region: "West Coast",
    title: "Goa",
    place: "Palolem Beach",
    vibe: "Sun, sand & slow evenings",
    days: "4–6 days",
    tags: ["Beach", "Cafés"],
    image:
      "https://images.unsplash.com/photo-1439066615861-d1af74d74000?auto=format&fit=crop&w=900&q=80",
    href: "/trips",
  },
  {
    id: "maharashtra",
    region: "West India",
    title: "Maharashtra",
    place: "Mumbai & Western Ghats",
    vibe: "City lights to hill escapes",
    days: "5–7 days",
    tags: ["City", "Hills"],
    image:
      "https://images.unsplash.com/photo-1566552881560-0be862a7c445?auto=format&fit=crop&w=900&q=80",
    href: "/trips",
  },
  {
    id: "rajasthan",
    region: "Desert State",
    title: "Rajasthan",
    place: "Jaipur & Udaipur",
    vibe: "Forts, dunes & royal stays",
    days: "6–8 days",
    tags: ["Heritage", "Desert"],
    image:
      "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=900&q=80",
    href: "/trips",
  },
  {
    id: "himachal",
    region: "Himalayas",
    title: "Himachal",
    place: "Manali & Shimla",
    vibe: "Pine trails & mountain air",
    days: "5–7 days",
    tags: ["Mountains", "Road trip"],
    image:
      "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=900&q=80",
    href: "/trips",
  },
  {
    id: "uttarakhand",
    region: "Devbhoomi",
    title: "Uttarakhand",
    place: "Rishikesh & Nainital",
    vibe: "Rivers, peaks & quiet towns",
    days: "5–8 days",
    tags: ["Nature", "Spiritual"],
    image:
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=900&q=80",
    href: "/trips",
  },
  {
    id: "kerala",
    region: "South India",
    title: "Kerala",
    place: "Alleppey Backwaters",
    vibe: "Houseboats & green hills",
    days: "5–7 days",
    tags: ["Backwaters", "Tea hills"],
    image:
      "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=900&q=80",
    href: "/trips",
  },
  {
    id: "kashmir",
    region: "North India",
    title: "Kashmir",
    place: "Dal Lake",
    vibe: "Lakes, meadows & snow views",
    days: "6–8 days",
    tags: ["Lakes", "Winter"],
    image:
      "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=900&q=80",
    href: "/trips",
  },
]

export const heroCities = heroDestinations.map((destination) => destination.title)

export const heroBackgroundImage =
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2400&q=80"
