export interface Apartment {
  id: string;
  title: string;
  address: string;
  neighborhood: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  available: string;
  amenities: string[];
  petFriendly: boolean;
  parking: boolean;
  laundry: 'in-unit' | 'in-building' | 'none';
  imageUrl?: string;
  description: string;
}

export interface FilterState {
  minPrice: number;
  maxPrice: number;
  bedrooms: number | null;
  bathrooms: number | null;
  petFriendly: boolean | null;
  parking: boolean | null;
  neighborhood: string | null;
}
