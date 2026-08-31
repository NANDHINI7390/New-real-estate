import React, { useState } from 'react';
import { useRealEstate } from '../../context/RealEstateContext';
import { calculateEMI, formatINR } from '../../data/mockData';
import { PropertyCard } from './PropertyCard';
import {
  ChevronRight,
  MapPin,
  Bed,
  Bath,
  Maximize2,
  Home,
  Heart,
  Scale,
  Calendar,
  MessageSquare,
  Phone,
  Share2,
  ShieldCheck,
  Sparkles,
  Waves,
  Car,
  Zap,
  Lock,
  Droplets,
  Wind,
  CookingPot,
  CheckCircle2,
  Calculator,
  Compass,
  ArrowRight,
  X,
  Star,
} from 'lucide-react';

interface PropertyDetailViewProps {
  onOpenScheduleModal: (propertyId?: string) => void;
  onOpenInquiryModal: (propertyId?: string) => void;
}

export const PropertyDetailView: React.FC<PropertyDetailViewProps> = ({
  onOpenScheduleModal,
  onOpenInquiryModal,
}) => {
  const {
    selectedPropertyId,
    properties,
    agents,
    setCustomerPage,
    favorites,
    toggleFavorite,
    comparisonList,
    toggleComparison,
    showToast,
  } = useRealEstate();

  // Selected property (fallback to first property if null)
  const property =
    properties.find((p) => p.id === selectedPropertyId) || properties[0];

  const agent =
    agents.find((a) => a.id === property?.agentId) || agents[0];

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [readMore, setReadMore] = useState(false);

  // EMI Calculator state for this property
  const [downPaymentPercent, setDownPaymentPercent] = useState(20);
  const [interestRate, setInterestRate] = useState(8.5);
  const [tenureYears, setTenureYears] = useState(20);

  if (!property) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold font-serif text-[#102A43]">
          Property Not Found
        </h2>
        <button
          onClick={() => setCustomerPage('properties')}
          className="mt-4 px-6 py-2.5 rounded-xl bg-[#102A43] hover:bg-[#0B1D30] text-white text-xs font-semibold cursor-pointer"
        >
          Return to Properties
        </button>
      </div>
    );
  }

  // Safe normalized property arrays and objects
  const gallery =
    Array.isArray(property.gallery) && property.gallery.length > 0
      ? property.gallery
      : [property.heroImage || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=85'];

  const highlights = Array.isArray(property.highlights) ? property.highlights : [];
  const amenities = Array.isArray(property.amenities) ? property.amenities : [];
  const nearbyFacilities = Array.isArray(property.nearbyFacilities) ? property.nearbyFacilities : [];
  const specs = property.specs || {
    bedrooms: 0,
    bathrooms: 0,
    areaSqFt: 0,
    furnishing: 'Unfurnished',
    facing: 'East',
    floor: 'Ground',
    totalFloors: '1 Floor',
    carParking: 1,
    possession: 'Ready to Move',
    ageOfProperty: '1 Year',
    ownership: 'Freehold',
  };
  const mapCoordinates = property.mapCoordinates || { lat: 11.9416, lng: 79.8083 };

  const isFav = favorites.includes(property.id);
  const isCompared = comparisonList.includes(property.id);

  // Calculate loan values
  const loanPrincipal = (property.price || 0) * (1 - downPaymentPercent / 100);
  const emiResult = calculateEMI(loanPrincipal, interestRate, tenureYears);

  // Similar properties
  const similarProps = (properties || [])
    .filter((p) => p && p.id !== property.id && p.propertyType === property.propertyType)
    .slice(0, 4);

  const getAmenityIcon = (name: string) => {
    const lower = name.toLowerCase();
    if (lower.includes('sea')) return <Waves className="w-5 h-5 text-[#C6A15B]" />;
    if (lower.includes('pool') || lower.includes('swimming'))
      return <Droplets className="w-5 h-5 text-[#C6A15B]" />;
    if (lower.includes('park')) return <Car className="w-5 h-5 text-[#C6A15B]" />;
    if (lower.includes('power') || lower.includes('backup') || lower.includes('solar'))
      return <Zap className="w-5 h-5 text-[#C6A15B]" />;
    if (lower.includes('security')) return <Lock className="w-5 h-5 text-[#102A43]" />;
    if (lower.includes('rain') || lower.includes('water'))
      return <Droplets className="w-5 h-5 text-[#C6A15B]" />;
    if (lower.includes('air') || lower.includes('ac'))
      return <Wind className="w-5 h-5 text-[#C6A15B]" />;
    if (lower.includes('kitchen'))
      return <CookingPot className="w-5 h-5 text-[#C6A15B]" />;
    return <Sparkles className="w-5 h-5 text-[#C6A15B]" />;
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('Link Copied', 'Property link copied to clipboard.', 'info');
    }
  };

  return (
    <div className="bg-[#F7F5F0] min-h-screen pb-24 text-[#20252B]">
      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 flex flex-col justify-between p-4 sm:p-8 backdrop-blur-md">
          <div className="flex items-center justify-between text-white pb-4 border-b border-white/10">
            <div>
              <h4 className="text-sm font-bold font-serif">{property.title}</h4>
              <p className="text-xs text-white/80">
                Photo {activeImageIndex + 1} of {gallery.length}
              </p>
            </div>
            <button
              onClick={() => setLightboxOpen(false)}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="flex-1 flex items-center justify-center my-4 overflow-hidden">
            <img
              src={gallery[activeImageIndex] || property.heroImage}
              alt="Property preview"
              className="max-h-[75vh] max-w-full object-contain rounded-2xl shadow-2xl"
            />
          </div>

          <div className="flex items-center justify-center gap-3 overflow-x-auto py-2">
            {gallery.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveImageIndex(i)}
                className={`relative w-20 h-14 rounded-xl overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                  activeImageIndex === i ? 'border-[#C6A15B] scale-105 shadow-md' : 'border-transparent opacity-60 hover:opacity-100'
                }`}
              >
                <img src={img} alt="Thumb" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Breadcrumb Header */}
      <div className="bg-white border-b border-[#E8E6E1] py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <nav className="flex items-center gap-2 text-xs text-[#52606D] overflow-x-auto whitespace-nowrap">
            <button
              onClick={() => setCustomerPage('home')}
              className="hover:text-[#102A43] transition-colors"
            >
              Home
            </button>
            <ChevronRight className="w-3 h-3 text-[#C6A15B]" />
            <button
              onClick={() => setCustomerPage('properties')}
              className="hover:text-[#102A43] transition-colors"
            >
              Properties
            </button>
            <ChevronRight className="w-3 h-3 text-[#C6A15B]" />
            <span className="text-[#102A43] font-bold truncate max-w-xs sm:max-w-md">
              {property.title}
            </span>
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              title="Share property"
              className="p-2 rounded-xl border border-[#E8E6E1] hover:bg-[#F7F5F0] text-[#52606D] transition-colors cursor-pointer"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => toggleComparison(property.id)}
              title="Compare"
              className={`p-2 rounded-xl border transition-all cursor-pointer ${
                isCompared
                  ? 'bg-[#102A43] text-[#C6A15B] border-[#102A43]'
                  : 'border-[#E8E6E1] hover:bg-[#F7F5F0] text-[#52606D]'
              }`}
            >
              <Scale className="w-4 h-4" />
            </button>
            <button
              onClick={() => toggleFavorite(property.id)}
              title="Save"
              className="p-2 rounded-xl border border-[#E8E6E1] hover:bg-[#F7F5F0] text-[#52606D] transition-colors cursor-pointer"
            >
              <Heart
                className={`w-4 h-4 ${
                  isFav ? 'text-rose-500 fill-rose-500' : 'text-[#52606D]'
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-10">
        {/* Large Cinematic Gallery Section */}
        <div className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            {/* Primary Main Image */}
            <div
              onClick={() => setLightboxOpen(true)}
              className="lg:col-span-3 relative h-[380px] sm:h-[480px] rounded-3xl overflow-hidden cursor-pointer group shadow-md border-4 border-white"
            >
              <img
                src={gallery[activeImageIndex] || property.heroImage}
                alt={property.title}
                className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

              {/* Status Badge */}
              <div className="absolute top-4 left-4 flex items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-[#102A43] text-[#C6A15B] shadow-md border border-[#C6A15B]/40">
                  {property.status}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-black/60 backdrop-blur-md text-white border border-white/20">
                  {property.propertyType}
                </span>
              </div>

              {/* Zoom trigger prompt */}
              <div className="absolute bottom-4 right-4 bg-[#102A43]/90 backdrop-blur-md text-white text-xs px-3.5 py-1.5 rounded-xl flex items-center gap-1.5 border border-[#C6A15B]/30">
                <Maximize2 className="w-3.5 h-3.5 text-[#C6A15B]" />
                <span>View Full Gallery ({gallery.length} Photos)</span>
              </div>
            </div>

            {/* Side Thumbnail Grid */}
            <div className="hidden lg:grid grid-rows-4 gap-3 h-[480px]">
              {gallery.slice(0, 4).map((thumb, idx) => (
                <div
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative rounded-2xl overflow-hidden cursor-pointer border-2 transition-all ${
                    activeImageIndex === idx
                      ? 'border-[#C6A15B] shadow-md ring-2 ring-[#C6A15B]/20'
                      : 'border-transparent opacity-80 hover:opacity-100'
                  }`}
                >
                  <img
                    src={thumb}
                    alt={`Thumbnail ${idx}`}
                    className="w-full h-full object-cover"
                  />
                  {idx === 3 && gallery.length > 4 && (
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        setLightboxOpen(true);
                      }}
                      className="absolute inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center text-white text-sm font-bold"
                    >
                      +{gallery.length - 4} Photos
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Property Overview Header + Sticky Lead Action Card Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
          {/* LEFT 2 COLS: Property Information */}
          <div className="lg:col-span-2 space-y-10">
            {/* Title & Core Pricing Bar */}
            <div className="bg-white rounded-3xl border border-[#E8E6E1] p-8 shadow-xs">
              <div className="flex items-center gap-2 text-xs font-bold text-[#C6A15B] uppercase tracking-wider mb-2">
                <MapPin className="w-4 h-4 text-[#C6A15B]" />
                <span>
                  {property.subLocation || property.locality || ''}, {property.location}
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-bold text-[#102A43] font-serif leading-tight">
                {property.title}
              </h1>

              <p className="text-sm text-[#52606D] mt-2 font-normal">
                {property.tagline}
              </p>

              {/* Price & Key Specs Cards */}
              <div className="mt-6 pt-6 border-t border-[#E8E6E1] flex flex-wrap items-center justify-between gap-6">
                <div>
                  <span className="block text-xs uppercase font-bold tracking-wider text-[#52606D]">
                    Pricing
                  </span>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-3xl sm:text-4xl font-bold text-[#102A43] font-serif">
                      {property.displayPrice}
                    </span>
                    {property.priceNegotiable && (
                      <span className="text-xs font-bold text-[#C6A15B] bg-[#F7F5F0] px-2.5 py-0.5 rounded-full border border-[#E8E6E1]">
                        Negotiable
                      </span>
                    )}
                  </div>
                  {property.pricePerSqFt && (
                    <span className="text-xs text-[#52606D] font-normal">
                      ₹{property.pricePerSqFt.toLocaleString('en-IN')} / sq.ft
                    </span>
                  )}
                </div>

                {/* Key Spec Badges */}
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 text-center">
                  {specs.bedrooms > 0 && (
                    <div className="p-3 bg-[#F7F5F0] rounded-2xl border border-[#E8E6E1]">
                      <Bed className="w-5 h-5 text-[#C6A15B] mx-auto mb-1" />
                      <div className="text-sm font-bold text-[#102A43]">
                        {specs.bedrooms}
                      </div>
                      <div className="text-[11px] text-[#52606D] font-normal">Bedrooms</div>
                    </div>
                  )}
                  {specs.bathrooms > 0 && (
                    <div className="p-3 bg-[#F7F5F0] rounded-2xl border border-[#E8E6E1]">
                      <Bath className="w-5 h-5 text-[#C6A15B] mx-auto mb-1" />
                      <div className="text-sm font-bold text-[#102A43]">
                        {specs.bathrooms}
                      </div>
                      <div className="text-[11px] text-[#52606D] font-normal">Bathrooms</div>
                    </div>
                  )}
                  <div className="p-3 bg-[#F7F5F0] rounded-2xl border border-[#E8E6E1]">
                    <Maximize2 className="w-5 h-5 text-[#C6A15B] mx-auto mb-1" />
                    <div className="text-sm font-bold text-[#102A43]">
                      {specs.areaSqFt}
                    </div>
                    <div className="text-[11px] text-[#52606D] font-normal">Sq.Ft</div>
                  </div>
                  <div className="p-3 bg-[#F7F5F0] rounded-2xl border border-[#E8E6E1]">
                    <Home className="w-5 h-5 text-[#C6A15B] mx-auto mb-1" />
                    <div className="text-sm font-bold text-[#102A43] truncate">
                      {property.propertyType}
                    </div>
                    <div className="text-[11px] text-[#52606D] font-normal">Type</div>
                  </div>
                </div>
              </div>
            </div>

            {/* About Property */}
            <div className="bg-white rounded-3xl border border-[#E8E6E1] p-8 shadow-xs space-y-4">
              <h2 className="text-2xl font-bold font-serif text-[#102A43]">
                About This Property
              </h2>
              <div className="text-sm text-[#52606D] leading-relaxed space-y-3 font-normal">
                <p>{property.description}</p>
                {readMore && (
                  <div className="pt-2 space-y-3">
                    <p>
                      Located in an exclusive, peaceful residential enclave with rapid connectivity to coastal promenade boulevards, fine-dining French cafés, prestigious international schools, and multispecialty healthcare centers.
                    </p>
                    <p>
                      All title documentation, encumbrance records, and property tax receipts have been thoroughly vetted by our senior legal conveyancing team.
                    </p>
                  </div>
                )}
              </div>
              <button
                onClick={() => setReadMore(!readMore)}
                className="text-xs font-bold text-[#C6A15B] hover:underline cursor-pointer"
              >
                {readMore ? 'Read Less' : 'Read More →'}
              </button>

              {/* Highlights Bullet List */}
              {highlights.length > 0 && (
                <div className="mt-6 pt-6 border-t border-[#E8E6E1]">
                  <h3 className="text-xs font-bold text-[#102A43] uppercase tracking-wider mb-3">
                    Key Highlights & Features
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {highlights.map((h, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-[#52606D]">
                        <CheckCircle2 className="w-4 h-4 text-[#C6A15B] shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Amenities Grid */}
            <div className="bg-white rounded-3xl border border-[#E8E6E1] p-8 shadow-xs">
              <h2 className="text-2xl font-bold font-serif text-[#102A43] mb-6">
                Amenities & Facilities
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {amenities.map((amenity, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-[#F7F5F0] border border-[#E8E6E1] flex items-center gap-3"
                  >
                    <div className="p-2 rounded-xl bg-white shadow-2xs border border-[#E8E6E1]">
                      {getAmenityIcon(amenity)}
                    </div>
                    <span className="text-xs font-semibold text-[#102A43]">
                      {amenity}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Property Specifications Table */}
            <div className="bg-white rounded-3xl border border-[#E8E6E1] p-8 shadow-xs">
              <h2 className="text-2xl font-bold font-serif text-[#102A43] mb-6">
                Property Specifications
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 text-xs">
                <div className="border-b border-[#E8E6E1] pb-3">
                  <span className="text-[#52606D] block mb-1 font-normal">Furnishing Status</span>
                  <span className="font-bold text-[#102A43] text-sm">
                    {specs.furnishing}
                  </span>
                </div>
                <div className="border-b border-[#E8E6E1] pb-3">
                  <span className="text-[#52606D] block mb-1 font-normal">Facing</span>
                  <span className="font-bold text-[#102A43] text-sm">
                    {specs.facing || 'East'}
                  </span>
                </div>
                <div className="border-b border-[#E8E6E1] pb-3">
                  <span className="text-[#52606D] block mb-1 font-normal">Floor</span>
                  <span className="font-bold text-[#102A43] text-sm">
                    {specs.floor || 'Independent'}
                  </span>
                </div>
                <div className="border-b border-[#E8E6E1] pb-3">
                  <span className="text-[#52606D] block mb-1 font-normal">Total Floors</span>
                  <span className="font-bold text-[#102A43] text-sm">
                    {specs.totalFloors || '2 Floors'}
                  </span>
                </div>
                <div className="border-b border-[#E8E6E1] pb-3">
                  <span className="text-[#52606D] block mb-1 font-normal">Car Parking</span>
                  <span className="font-bold text-[#102A43] text-sm">
                    {specs.carParking || 2} Covered
                  </span>
                </div>
                <div className="border-b border-[#E8E6E1] pb-3">
                  <span className="text-[#52606D] block mb-1 font-normal">Possession Status</span>
                  <span className="font-bold text-[#102A43] text-sm">
                    {specs.possession || 'Ready to Move'}
                  </span>
                </div>
                <div className="border-b border-[#E8E6E1] pb-3">
                  <span className="text-[#52606D] block mb-1 font-normal">Age of Construction</span>
                  <span className="font-bold text-[#102A43] text-sm">
                    {specs.ageOfProperty || '1 Year'}
                  </span>
                </div>
                <div className="border-b border-[#E8E6E1] pb-3">
                  <span className="text-[#52606D] block mb-1 font-normal">Ownership Type</span>
                  <span className="font-bold text-[#102A43] text-sm">
                    {specs.ownership || 'Freehold'}
                  </span>
                </div>
                <div className="border-b border-[#E8E6E1] pb-3">
                  <span className="text-[#52606D] block mb-1 font-normal">RERA / Approval</span>
                  <span className="font-bold text-[#C6A15B] text-sm">
                    DTCP Approved
                  </span>
                </div>
              </div>
            </div>

            {/* Location & Nearby Facilities Interactive Card */}
            <div className="bg-white rounded-3xl border border-[#E8E6E1] p-8 shadow-xs space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h2 className="text-2xl font-bold font-serif text-[#102A43]">
                    Location & Neighborhood
                  </h2>
                  <p className="text-xs text-[#52606D] mt-1 font-normal">
                    {property.location} (Coordinates: {mapCoordinates.lat}° N, {mapCoordinates.lng}° E)
                  </p>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F7F5F0] text-[#C6A15B] border border-[#E8E6E1] text-xs font-semibold">
                  <Compass className="w-3.5 h-3.5" />
                  <span>High Walkability Score (94/100)</span>
                </div>
              </div>

              {/* Mock Stylized Map Preview */}
              <div className="relative h-64 rounded-2xl overflow-hidden border border-[#E8E6E1] bg-[#F7F5F0]">
                <img
                  src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1200&q=80"
                  alt="Location map"
                  className="w-full h-full object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-[#102A43]/20 backdrop-blur-[1px]" />

                {/* Pin indicator */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                  <div className="px-3.5 py-1.5 rounded-xl bg-[#102A43] text-white text-xs font-bold shadow-2xl flex items-center gap-1.5 border border-[#C6A15B]">
                    <MapPin className="w-3.5 h-3.5 text-[#C6A15B]" />
                    <span>{property.title}</span>
                  </div>
                  <div className="w-3 h-3 bg-[#102A43] rotate-45 -mt-1.5" />
                  <div className="w-4 h-4 rounded-full bg-[#C6A15B] animate-ping mt-1" />
                </div>

                <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl text-[11px] font-bold text-[#102A43] border border-[#E8E6E1] shadow-xs">
                  Puducherry Coastal Corridor
                </div>
              </div>

              {/* Nearby Facilities List */}
              {nearbyFacilities.length > 0 && (
                <div>
                  <h3 className="text-xs font-bold text-[#102A43] uppercase tracking-wider mb-3">
                    Nearby Key Landmarks & Transit
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {nearbyFacilities.map((facility, i) => (
                      <div
                        key={i}
                        className="p-3 bg-[#F7F5F0] rounded-xl border border-[#E8E6E1] flex items-center justify-between text-xs"
                      >
                        <div className="font-semibold text-[#102A43] truncate mr-2">
                          {facility.name}
                        </div>
                        <span className="text-[11px] font-bold text-[#102A43] bg-white px-2 py-0.5 rounded-md border border-[#E8E6E1] shrink-0">
                          {facility.distance}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Interactive EMI / Home Loan Calculator */}
            <div className="bg-white rounded-3xl border border-[#E8E6E1] p-8 shadow-xs space-y-6">
              <div className="flex items-center gap-2">
                <div className="p-2.5 rounded-xl bg-[#F7F5F0] text-[#102A43] border border-[#E8E6E1]">
                  <Calculator className="w-5 h-5 text-[#C6A15B]" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold font-serif text-[#102A43]">
                    Mortgage & EMI Calculator
                  </h2>
                  <p className="text-xs text-[#52606D] font-normal">
                    Estimate your monthly payments for this property in INR
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Sliders Form */}
                <div className="space-y-5">
                  {/* Property Price info */}
                  <div>
                    <label className="block text-xs font-semibold text-[#52606D] mb-1">
                      Property Total Price
                    </label>
                    <div className="text-lg font-bold font-serif text-[#102A43]">
                      {formatINR(property.price)}
                    </div>
                  </div>

                  {/* Down payment slider */}
                  <div>
                    <div className="flex justify-between text-xs font-semibold mb-1 text-[#102A43]">
                      <span>Down Payment ({downPaymentPercent}%)</span>
                      <span className="text-[#C6A15B]">
                        {formatINR((property.price * downPaymentPercent) / 100)}
                      </span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="80"
                      step="5"
                      value={downPaymentPercent}
                      onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                      className="w-full accent-[#102A43] cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-[#52606D] mt-0.5">
                      <span>10% (Min)</span>
                      <span>Loan: {formatINR(loanPrincipal)}</span>
                      <span>80%</span>
                    </div>
                  </div>

                  {/* Interest rate slider */}
                  <div>
                    <div className="flex justify-between text-xs font-semibold mb-1 text-[#102A43]">
                      <span>Annual Interest Rate</span>
                      <span className="text-[#C6A15B]">{interestRate}% p.a.</span>
                    </div>
                    <input
                      type="range"
                      min="6.5"
                      max="14.0"
                      step="0.1"
                      value={interestRate}
                      onChange={(e) => setInterestRate(Number(e.target.value))}
                      className="w-full accent-[#102A43] cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-[#52606D] mt-0.5">
                      <span>6.5%</span>
                      <span>Avg Home Loan (8.5%)</span>
                      <span>14.0%</span>
                    </div>
                  </div>

                  {/* Loan Tenure slider */}
                  <div>
                    <div className="flex justify-between text-xs font-semibold mb-1 text-[#102A43]">
                      <span>Loan Tenure</span>
                      <span className="text-[#C6A15B]">{tenureYears} Years</span>
                    </div>
                    <input
                      type="range"
                      min="5"
                      max="30"
                      step="1"
                      value={tenureYears}
                      onChange={(e) => setTenureYears(Number(e.target.value))}
                      className="w-full accent-[#102A43] cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-[#52606D] mt-0.5">
                      <span>5 Yrs</span>
                      <span>{tenureYears * 12} Months</span>
                      <span>30 Yrs</span>
                    </div>
                  </div>
                </div>

                {/* Output Breakdown Box */}
                <div className="bg-[#102A43] text-white rounded-2xl p-6 flex flex-col justify-between shadow-lg border border-[#C6A15B]/40">
                  <div>
                    <span className="text-xs uppercase font-bold tracking-wider text-[#C6A15B]">
                      Estimated Monthly Payment
                    </span>
                    <div className="text-3xl sm:text-4xl font-bold font-serif mt-2 text-white">
                      ₹ {emiResult.monthlyEMI.toLocaleString('en-IN')}{' '}
                      <span className="text-xs font-normal text-white/80">/ mo</span>
                    </div>

                    <div className="mt-6 space-y-3 pt-6 border-t border-white/10 text-xs">
                      <div className="flex justify-between text-white/80">
                        <span>Principal Loan Amount:</span>
                        <span className="font-semibold text-white">
                          {formatINR(loanPrincipal)}
                        </span>
                      </div>
                      <div className="flex justify-between text-white/80">
                        <span>Total Interest Payable:</span>
                        <span className="font-semibold text-[#C6A15B]">
                          {formatINR(emiResult.totalInterest)}
                        </span>
                      </div>
                      <div className="flex justify-between text-white/80">
                        <span>Total Repayment (P + I):</span>
                        <span className="font-bold text-white">
                          {formatINR(emiResult.totalAmount)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-[11px] text-white/80">
                    <span className="flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#C6A15B]" />
                      Pre-approved bank tie-ups
                    </span>
                    <button
                      onClick={() => onOpenInquiryModal(property.id)}
                      className="text-[#C6A15B] font-bold hover:underline cursor-pointer"
                    >
                      Apply Loan →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT 1 COL: Sticky Agent Contact & Primary Booking Card */}
          <aside className="space-y-6 lg:sticky lg:top-28">
            {/* Primary Action Card */}
            <div className="bg-white rounded-3xl border border-[#E8E6E1] p-6 shadow-md space-y-4">
              <div className="flex items-baseline justify-between border-b border-[#E8E6E1] pb-4">
                <div>
                  <span className="text-xs text-[#52606D] uppercase font-bold tracking-wider">
                    Listing Price
                  </span>
                  <div className="text-2xl font-bold font-serif text-[#102A43]">
                    {property.displayPrice}
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-md text-[11px] font-bold uppercase bg-[#F7F5F0] text-[#C6A15B] border border-[#E8E6E1]">
                  {property.status}
                </span>
              </div>

              {/* Main CTAs */}
              <div className="space-y-2.5 pt-2">
                <button
                  onClick={() => onOpenScheduleModal(property.id)}
                  className="w-full py-3.5 px-4 rounded-xl bg-[#102A43] hover:bg-[#0B1D30] text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 active:scale-98 cursor-pointer"
                >
                  <Calendar className="w-4 h-4 text-[#C6A15B]" />
                  <span>Schedule Private Viewing</span>
                </button>

                <button
                  onClick={() => onOpenInquiryModal(property.id)}
                  className="w-full py-3 px-4 rounded-xl bg-[#F7F5F0] hover:bg-[#E8E6E1] text-[#102A43] font-semibold text-xs transition-colors flex items-center justify-center gap-2 border border-[#E8E6E1] cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4 text-[#C6A15B]" />
                  <span>Send Advisory Inquiry</span>
                </button>

                <div className="grid grid-cols-2 gap-2 pt-1">
                  <a
                    href={`tel:${agent.phone.replace(/\s+/g, '')}`}
                    className="py-2.5 px-3 rounded-xl border border-[#E8E6E1] hover:bg-[#F7F5F0] text-[#102A43] font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#C6A15B]" />
                    <span>Call Agent</span>
                  </a>

                  <a
                    href={`https://wa.me/919876543210?text=Hi,%20I%20am%20interested%20in%20"${encodeURIComponent(
                      property.title
                    )}"%20(Ref:%20${property.id})`}
                    target="_blank"
                    rel="noreferrer"
                    className="py-2.5 px-3 rounded-xl bg-[#102A43] hover:bg-[#0B1D30] text-[#C6A15B] font-semibold text-xs flex items-center justify-center gap-1.5 shadow-2xs transition-colors border border-[#C6A15B]/30"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>

              {/* Verified Trust Badge */}
              <div className="pt-4 border-t border-[#E8E6E1] flex items-center gap-2 text-xs text-[#52606D]">
                <ShieldCheck className="w-4 h-4 text-[#C6A15B] shrink-0" />
                <span>Verified by Pondicherry Realty Legal Desk</span>
              </div>
            </div>

            {/* Dedicated Agent Profile Card */}
            <div className="bg-white rounded-3xl border border-[#E8E6E1] p-6 shadow-xs space-y-4">
              <h3 className="text-xs uppercase font-bold tracking-wider text-[#52606D]">
                Assigned Property Consultant
              </h3>

              <div className="flex items-center gap-4">
                <img
                  src={agent.photo}
                  alt={agent.name}
                  className="w-14 h-14 rounded-2xl object-cover border-2 border-[#C6A15B]"
                />
                <div>
                  <h4 className="text-base font-bold text-[#102A43] font-serif">
                    {agent.name}
                  </h4>
                  <p className="text-xs text-[#52606D]">{agent.role}</p>
                  <div className="flex items-center gap-1 text-xs text-[#C6A15B] mt-1">
                    <Star className="w-3.5 h-3.5 fill-[#C6A15B] text-[#C6A15B]" />
                    <span className="font-bold text-[#102A43]">{agent.rating}</span>
                    <span className="text-[#52606D]">({agent.reviewsCount} reviews)</span>
                  </div>
                </div>
              </div>

              <p className="text-xs text-[#52606D] leading-relaxed italic border-t border-[#E8E6E1] pt-3 font-normal">
                "{agent.bio}"
              </p>

              <div className="text-xs text-[#52606D] space-y-1.5 pt-1">
                <div className="flex justify-between">
                  <span className="text-[#52606D]">Direct Phone:</span>
                  <span className="font-semibold text-[#102A43]">{agent.phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#52606D]">Experience:</span>
                  <span className="font-semibold text-[#102A43]">{agent.experience}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#52606D]">Deals Closed:</span>
                  <span className="font-bold text-[#102A43]">{agent.dealsClosed}+ Homes</span>
                </div>
              </div>
            </div>
          </aside>
        </div>

        {/* Similar Properties Section */}
        {similarProps.length > 0 && (
          <div className="pt-12 border-t border-[#E8E6E1] space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold font-serif text-[#102A43]">
                  Similar {property.propertyType} Properties
                </h2>
                <p className="text-xs text-[#52606D] mt-1 font-normal">
                  More curated luxury options in Pondicherry matching this category
                </p>
              </div>
              <button
                onClick={() => {
                  setCustomerPage('properties');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="text-xs font-bold text-[#102A43] hover:text-[#C6A15B] underline flex items-center gap-1 cursor-pointer"
              >
                <span>View All</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {similarProps.map((p) => (
                <PropertyCard key={p.id} property={p} layout="grid" />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
