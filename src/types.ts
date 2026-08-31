export type PropertyType = 'Villa' | 'Apartment' | 'Independent House' | 'Plot' | 'Commercial';
export type ListingType = 'BUY' | 'RENT';
export type PropertyStatus = 'AVAILABLE' | 'FEATURED' | 'UNDER_OFFER' | 'SOLD' | 'RENTED';

export interface PropertySpec {
  bedrooms: number;
  bathrooms: number;
  areaSqFt: number;
  furnishing: 'Furnished' | 'Semi-Furnished' | 'Unfurnished';
  facing?: string;
  floor?: string;
  totalFloors?: string;
  carParking?: number;
  possession?: string;
  ageOfProperty?: string;
  ownership?: 'Freehold' | 'Leasehold' | 'Co-operative';
}

export interface NearbyFacility {
  name: string;
  distance: string;
  category: 'Beach' | 'Transit' | 'Hospital' | 'School' | 'Shopping' | 'Dining';
}

export interface Property {
  id: string;
  title: string;
  slug: string;
  tagline: string;
  location: string;
  subLocation: string;
  locality: string;
  price: number; // In INR (raw number, e.g., 45000000 = 4.5 Cr, 8500000 = 85 L, 35000 for rent)
  displayPrice: string; // "₹ 4.50 Cr", "₹ 85 L", "₹ 45,000 / mo"
  priceNegotiable: boolean;
  pricePerSqFt?: number;
  propertyType: PropertyType;
  listingType: ListingType;
  status: PropertyStatus;
  isFeatured: boolean;
  isNew: boolean;
  heroImage: string;
  gallery: string[];
  specs: PropertySpec;
  description: string;
  highlights: string[];
  amenities: string[];
  nearbyFacilities: NearbyFacility[];
  agentId: string;
  mapCoordinates: { lat: number; lng: number };
  createdAt: string;
}

export type AdminTab =
  | 'overview'
  | 'properties'
  | 'inquiries'
  | 'visits'
  | 'agents'
  | 'clients'
  | 'analytics'
  | 'settings';

export type LeadStatus =
  | 'NEW'
  | 'CONTACTED'
  | 'VISIT_SCHEDULED'
  | 'VISIT_COMPLETED'
  | 'NEGOTIATION'
  | 'CONVERTED'
  | 'LOST'
  | 'CLOSED_LOST';

export type InquiryStatus = LeadStatus;

export type VisitStatus = 'REQUESTED' | 'PENDING' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED';
export type SiteVisitStatus = VisitStatus;

export interface Inquiry {
  id: string;
  refNumber: string; // e.g. INQ-00045
  customerName: string;
  name?: string; // alias
  phone: string;
  email: string;
  propertyId: string;
  propertyTitle: string;
  propertyType?: string;
  listingType: ListingType;
  budget: string;
  preferredDate?: string;
  preferredTime?: string;
  message: string;
  status: LeadStatus;
  createdAt: string;
  assignedAgentId?: string;
  notes: { id: string; text: string; author: string; timestamp: string }[];
}

export interface SiteVisit {
  id: string;
  refNumber: string; // e.g. VIS-00012
  customerName: string;
  clientName?: string; // alias
  phone: string;
  clientPhone?: string; // alias
  email: string;
  propertyId: string;
  propertyTitle: string;
  propertyLocation: string;
  date: string;
  timeSlot: string;
  status: VisitStatus;
  assignedAgentId: string;
  assignedAgent?: string; // alias
  notes?: string;
  createdAt: string;
}

export interface Agent {
  id: string;
  name: string;
  role: string;
  phone: string;
  email: string;
  photo: string;
  rating: number;
  reviewsCount: number;
  assignedPropertiesCount: number;
  activeLeadsCount: number;
  dealsClosed: number;
  experience: string;
  bio: string;
  languages?: string[];
}

export interface Client {
  id: string;
  name: string;
  phone: string;
  email: string;
  interestedPropertyTitles: string[];
  budget: string;
  requirements: string;
  leadStatus: LeadStatus;
  inquiryCount: number;
  visitCount: number;
  lastContactDate: string;
  lastContacted?: string;
  assignedAgent: string;
  notes: string;
  tags?: string[];
  source?: string;
}

export interface Project {
  id: string;
  title: string;
  developer: string;
  location: string;
  priceRange: string;
  type: string;
  status: 'Under Construction' | 'Ready to Move' | 'Newly Launched';
  possessionDate: string;
  image: string;
  unitsAvailable: string;
  configurations: string;
  description: string;
}

export interface FilterState {
  searchQuery: string;
  location: string;
  propertyType: string;
  listingType: ListingType | 'ALL';
  minBudget: number;
  maxBudget: number;
  bedrooms: string; // 'Any' | '1' | '2' | '3' | '4' | '5+'
  bathrooms: string;
  minArea: number;
  maxArea: number;
  furnishing: string;
  propertyStatus: string;
  selectedAmenities: string[];
  sortBy: 'latest' | 'price-low' | 'price-high' | 'area-high' | 'featured';
}
