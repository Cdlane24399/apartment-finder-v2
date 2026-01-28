export interface Apartment {
  rank: number;
  name: string;
  address: string;
  city: string;
  neighborhood: string;
  price: {
    min: number;
    max: number;
    overBudget: boolean;
  };
  beds: number;
  baths: number;
  sqft: string;
  amenities: string[];
  highlights: string[];
  floorPlanUrl: string | null;
  tourUrl: string | null;
  website: string;
  phone: string;
  pros: string[];
  cons: string[];
  rating: number;
  moveInSpecial: string | null;
  images: string[];
}

export const apartments: Apartment[] = [
  {
    rank: 1,
    name: "The Dillon",
    address: "223 S West St, Raleigh, NC 27603",
    city: "Raleigh",
    neighborhood: "Warehouse District",
    price: { min: 1545, max: 1795, overBudget: true },
    beds: 1,
    baths: 1,
    sqft: "680-850",
    amenities: ["Rooftop terrace", "Fitness center", "Resort-style pool", "Concierge", "Co-working lounge", "Pet spa", "Secured parking", "Package lockers"],
    highlights: ["Downtown location", "Walking distance to restaurants/nightlife", "Modern luxury finishes", "Floor-to-ceiling windows"],
    floorPlanUrl: "https://livedillonraleigh.com/floor-plans/one-bedroom/",
    tourUrl: "https://www.matterport.com/discover/space/aHR0cHM6Ly9teS5tYXR0ZXJwb3J0LmNvbS9zaG93Lz9tPWVGVkNNeG5xc2Fn",
    website: "https://livedillonraleigh.com/",
    phone: "(919) 335-5044",
    pros: ["Prime downtown location", "Luxury amenities", "Walkable to everything", "Modern design", "Matterport 3D tour"],
    cons: ["Over budget", "Urban noise", "Premium pricing"],
    rating: 4.8,
    moveInSpecial: null,
    images: ["https://images1.apartments.com/i2/N0YPqJ90OT8Ej_PqH7cNVKf7-7CLPVzCjhZwZ2Q4hfQ/117/the-dillon-raleigh-nc-building-photo.jpg"]
  },
  {
    rank: 2,
    name: "Link Apartments Glenwood South",
    address: "202 North West St, Raleigh, NC 27603",
    city: "Raleigh",
    neighborhood: "Glenwood South",
    price: { min: 1450, max: 1650, overBudget: false },
    beds: 1,
    baths: 1,
    sqft: "650-780",
    amenities: ["Saltwater pool", "Sky lounge", "Fitness center", "Yoga studio", "Pet park", "EV charging", "Bike storage", "Rooftop deck"],
    highlights: ["360° virtual tour available", "Glenwood South entertainment district", "Modern smart home features"],
    floorPlanUrl: "https://www.linkglenwood.com/floorplans",
    tourUrl: "https://www.linkglenwood.com/360virtualtour",
    website: "https://www.linkglenwood.com/",
    phone: "(844) 308-0873",
    pros: ["Great location", "360 virtual tour", "Within budget", "Modern amenities", "Entertainment nearby"],
    cons: ["Can be noisy on weekends", "Parking may cost extra"],
    rating: 4.6,
    moveInSpecial: "Look & Lease special available",
    images: []
  },
  {
    rank: 3,
    name: "Camden Carolinian",
    address: "2600 Glenwood Ave, Raleigh, NC 27608",
    city: "Raleigh",
    neighborhood: "Five Points/Glenwood",
    price: { min: 1489, max: 1599, overBudget: false },
    beds: 1,
    baths: 1,
    sqft: "680-821",
    amenities: ["Rooftop deck", "Resort pool", "Fitness center", "Dog park", "Business center", "Grilling stations", "Package room", "Controlled access"],
    highlights: ["Rooftop amenity deck", "Near Crabtree Valley Mall", "Established luxury community", "Camden quality"],
    floorPlanUrl: "https://www.camdenliving.com/raleigh-nc-apartments/camden-carolinian/floor-plans",
    tourUrl: "https://www.camdenliving.com/raleigh-nc-apartments/camden-carolinian/virtual-tours",
    website: "https://www.camdenliving.com/raleigh-nc-apartments/camden-carolinian",
    phone: "(984) 205-9387",
    pros: ["Rooftop amenities", "Great management", "Prime location", "Within budget"],
    cons: ["Busy road nearby", "Competitive availability"],
    rating: 4.5,
    moveInSpecial: null,
    images: []
  },
  {
    rank: 4,
    name: "Cortland Cary",
    address: "5110 Alston Glen Dr, Cary, NC 27519",
    city: "Cary",
    neighborhood: "West Cary",
    price: { min: 1165, max: 1495, overBudget: false },
    beds: 1,
    baths: 1,
    sqft: "720-890",
    amenities: ["Saltwater pool", "Gym", "Garage parking", "Dog park", "Clubhouse", "Package lockers", "Outdoor kitchen", "Fire pit"],
    highlights: ["Best value luxury option", "Quiet suburban setting", "Great schools nearby", "Cortland quality"],
    floorPlanUrl: "https://www.cortland.com/apartments/cortland-cary/floorplans/",
    tourUrl: "https://www.cortland.com/apartments/cortland-cary/virtual-tours/",
    website: "https://www.cortland.com/apartments/cortland-cary/",
    phone: "(919) 897-7818",
    pros: ["Under budget", "Quiet location", "Great value", "Nice community", "Garage available"],
    cons: ["Farther from downtown", "Car needed", "Suburban"],
    rating: 4.4,
    moveInSpecial: "Up to 2 months free!",
    images: []
  },
  {
    rank: 5,
    name: "Marq at Crabtree",
    address: "4505 Green Cedar Ln, Raleigh, NC 27612",
    city: "Raleigh",
    neighborhood: "Crabtree",
    price: { min: 1227, max: 1499, overBudget: false },
    beds: 1,
    baths: 1,
    sqft: "700-850",
    amenities: ["Pool", "Fitness center", "Pet friendly", "Business center", "Covered parking", "Playground", "Grilling area"],
    highlights: ["Virtual tour available", "Near Crabtree Valley Mall", "Easy I-440 access"],
    floorPlanUrl: "https://www.marqatcrabtree.com/floorplans",
    tourUrl: "https://www.marqatcrabtree.com/virtual-tour",
    website: "https://www.marqatcrabtree.com/",
    phone: "(855) 748-2305",
    pros: ["Good value", "Shopping nearby", "Highway access", "Virtual tour"],
    cons: ["Busy area", "Standard amenities"],
    rating: 4.3,
    moveInSpecial: null,
    images: []
  },
  {
    rank: 6,
    name: "Bryn Athyn at Six Forks",
    address: "7303 Bryn Athyn Way, Raleigh, NC 27615",
    city: "Raleigh",
    neighborhood: "North Raleigh",
    price: { min: 1325, max: 1495, overBudget: false },
    beds: 1,
    baths: 1,
    sqft: "750-920",
    amenities: ["Adjacent nature trail", "Pool", "Fitness center", "Pet park", "Grilling area", "Business center", "Clubhouse"],
    highlights: ["Nature trail access", "Quiet setting", "Spacious units", "North Raleigh location"],
    floorPlanUrl: null,
    tourUrl: null,
    website: "https://www.brynathynatsixforks.com/",
    phone: "(470) 348-2137",
    pros: ["Nature access", "Spacious", "Quiet", "Within budget"],
    cons: ["Farther from downtown", "Limited nightlife nearby", "No virtual tour"],
    rating: 4.2,
    moveInSpecial: "5 available units",
    images: []
  },
  {
    rank: 7,
    name: "The Ninety Nine",
    address: "701 Vickers Way, Raleigh, NC 27609",
    city: "Raleigh",
    neighborhood: "North Hills",
    price: { min: 1299, max: 1499, overBudget: false },
    beds: 1,
    baths: 1,
    sqft: "680-780",
    amenities: ["Wood-style floors", "Pool", "Fitness center", "Pet friendly", "Business center", "Outdoor lounge"],
    highlights: ["2 months free special", "Near North Hills shopping", "Modern finishes"],
    floorPlanUrl: null,
    tourUrl: null,
    website: "https://www.apartments.com/the-ninety-nine-raleigh-nc/",
    phone: "(984) 339-1559",
    pros: ["Move-in special", "Near shopping", "Good price", "Modern"],
    cons: ["Smaller units", "Busy area"],
    rating: 4.1,
    moveInSpecial: "2 months FREE rent!",
    images: []
  },
  {
    rank: 8,
    name: "Aerial - Madison Wakefield",
    address: "12301 Aerial Way, Wake Forest, NC 27587",
    city: "Wake Forest",
    neighborhood: "Heritage",
    price: { min: 1246, max: 1450, overBudget: false },
    beds: 1,
    baths: 1,
    sqft: "750-850",
    amenities: ["Pool", "Fitness center", "Dog park", "Playground", "Clubhouse", "Business center"],
    highlights: ["New construction", "Suburban luxury", "Family-friendly"],
    floorPlanUrl: null,
    tourUrl: null,
    website: "https://www.apartments.com/aerial-madison-wakefield-wake-forest-nc/",
    phone: "(919) 453-2100",
    pros: ["Newer community", "Suburban peace", "Good value"],
    cons: ["Commute to Raleigh", "Less urban"],
    rating: 4.0,
    moveInSpecial: null,
    images: []
  },
  {
    rank: 9,
    name: "The Edison at RTP",
    address: "300 Park Offices Dr, Durham, NC 27709",
    city: "Durham",
    neighborhood: "Research Triangle Park",
    price: { min: 1350, max: 1550, overBudget: false },
    beds: 1,
    baths: 1,
    sqft: "700-850",
    amenities: ["Pool", "Fitness center", "Business center", "EV charging", "Pet friendly", "Coworking space"],
    highlights: ["Near RTP employers", "Tech hub location", "Modern workspace"],
    floorPlanUrl: null,
    tourUrl: null,
    website: "https://www.apartments.com/edison-at-rtp-durham-nc/",
    phone: "(919) 484-4357",
    pros: ["Near tech jobs", "Modern design", "Within budget", "EV charging"],
    cons: ["Corporate area", "Quiet at night"],
    rating: 3.9,
    moveInSpecial: null,
    images: []
  },
  {
    rank: 10,
    name: "Parkside at Crabtree",
    address: "4200 Summit Creek Blvd, Raleigh, NC 27612",
    city: "Raleigh",
    neighborhood: "Crabtree",
    price: { min: 1195, max: 1395, overBudget: false },
    beds: 1,
    baths: 1,
    sqft: "720-820",
    amenities: ["Pool", "Fitness center", "Tennis court", "Dog park", "Clubhouse", "Business center"],
    highlights: ["Best value option", "Near Crabtree Mall", "Established community", "Tennis court!"],
    floorPlanUrl: null,
    tourUrl: null,
    website: "https://www.apartments.com/parkside-at-crabtree-raleigh-nc/",
    phone: "(919) 900-5543",
    pros: ["Great value", "Tennis court", "Well-maintained", "Lowest price"],
    cons: ["Older community", "Standard finishes"],
    rating: 3.8,
    moveInSpecial: null,
    images: []
  },
  {
    rank: 11,
    name: "Skyhouse Raleigh",
    address: "308 S Blount St, Raleigh, NC 27601",
    city: "Raleigh",
    neighborhood: "Downtown",
    price: { min: 1650, max: 2156, overBudget: true },
    beds: 1,
    baths: 1,
    sqft: "992",
    amenities: ["Rooftop pool (23rd floor)", "24-hour fitness center", "Yoga/Pilates studio", "Rooftop firepit", "Grilling stations", "Pet friendly", "Saltwater pool", "Downtown views"],
    highlights: ["High-rise living", "23 floors above downtown", "Resort-style rooftop", "1 Month Free special", "Price tracked"],
    floorPlanUrl: "https://skyhouseraleigh.com/floorplans/",
    tourUrl: "https://skyhouseraleigh.com/gallery/",
    website: "https://skyhouseraleigh.com/",
    phone: "(919) 296-0100",
    pros: ["Stunning downtown views", "Rooftop amenities", "High-rise luxury", "1 month free special"],
    cons: ["Over budget", "Premium pricing", "Downtown noise"],
    rating: 4.7,
    moveInSpecial: "1 Month FREE! (min lease term applies)",
    images: []
  }
];

export const BUDGET = 1500;
export const MOVE_IN_EARLIEST = "2026-02-05";
export const MOVE_IN_LATEST = "2026-02-28";
