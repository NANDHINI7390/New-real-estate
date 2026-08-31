import React from 'react';
import { Property } from '../../types';
import { useRealEstate } from '../../context/RealEstateContext';
import {
  Bed,
  Bath,
  Maximize2,
  MapPin,
  Heart,
  Scale,
  ArrowUpRight,
  Sparkles,
} from 'lucide-react';

interface PropertyCardProps {
  property: Property;
  layout?: 'grid' | 'list';
}

export const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  layout = 'grid',
}) => {
  const {
    navigateToProperty,
    favorites,
    toggleFavorite,
    comparisonList,
    toggleComparison,
  } = useRealEstate();

  const isFav = favorites.includes(property.id);
  const isCompared = comparisonList.includes(property.id);

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

  const getStatusBadge = () => {
    if (property.status === 'SOLD') {
      return (
        <span className="px-2.5 py-1 rounded-md text-[11px] font-bold tracking-wider uppercase bg-stone-700 text-white shadow-xs">
          SOLD
        </span>
      );
    }
    if (property.status === 'RENTED') {
      return (
        <span className="px-2.5 py-1 rounded-md text-[11px] font-bold tracking-wider uppercase bg-[#52606D] text-white shadow-xs">
          RENTED
        </span>
      );
    }
    if (property.status === 'UNDER_OFFER') {
      return (
        <span className="px-2.5 py-1 rounded-md text-[11px] font-bold tracking-wider uppercase bg-[#C6A15B] text-white shadow-xs">
          UNDER OFFER
        </span>
      );
    }
    if (property.isFeatured) {
      return (
        <span className="px-2.5 py-1 rounded-md text-[11px] font-bold tracking-wider uppercase bg-[#102A43] text-white border border-[#C6A15B]/50 flex items-center gap-1 shadow-xs">
          <Sparkles className="w-3 h-3 text-[#C6A15B]" />
          FEATURED
        </span>
      );
    }
    if (property.isNew) {
      return (
        <span className="px-2.5 py-1 rounded-md text-[11px] font-bold tracking-wider uppercase bg-[#C6A15B] text-white shadow-xs">
          NEW
        </span>
      );
    }
    return (
      <span className="px-2.5 py-1 rounded-md text-[11px] font-bold tracking-wider uppercase bg-[#102A43] text-white shadow-xs">
        AVAILABLE
      </span>
    );
  };

  if (layout === 'list') {
    return (
      <div className="bg-white rounded-2xl border border-[#E8E6E1] overflow-hidden shadow-xs hover:shadow-md transition-all group flex flex-col md:flex-row luxury-card-hover">
        {/* Left Image Section */}
        <div className="relative md:w-2/5 h-64 md:h-auto overflow-hidden">
          <img
            src={property.heroImage}
            alt={property.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#102A43]/70 via-transparent to-[#102A43]/20" />

          {/* Badges */}
          <div className="absolute top-3.5 left-3.5 flex items-center gap-2">
            {getStatusBadge()}
            <span className="px-2.5 py-1 rounded-md text-[11px] font-medium bg-[#102A43]/60 backdrop-blur-md text-white border border-white/20">
              {property.propertyType}
            </span>
          </div>

          {/* Action buttons */}
          <div className="absolute top-3.5 right-3.5 flex items-center gap-1.5">
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleComparison(property.id);
              }}
              title="Compare"
              className={`p-2 rounded-full backdrop-blur-md transition-all cursor-pointer ${
                isCompared
                  ? 'bg-[#102A43] text-[#C6A15B]'
                  : 'bg-white/90 hover:bg-white text-[#102A43]'
              }`}
            >
              <Scale className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleFavorite(property.id);
              }}
              title="Save to favorites"
              className="p-2 rounded-full bg-white/90 hover:bg-white text-[#102A43] backdrop-blur-md transition-all cursor-pointer"
            >
              <Heart
                className={`w-3.5 h-3.5 ${
                  isFav ? 'text-[#C6A15B] fill-[#C6A15B]' : 'text-[#52606D]'
                }`}
              />
            </button>
          </div>

          {/* Price overlay on mobile */}
          <div className="absolute bottom-3 left-3 md:hidden text-white">
            <div className="text-xl font-bold font-serif drop-shadow-md text-white">
              {property.displayPrice}
            </div>
          </div>
        </div>

        {/* Right Content Section */}
        <div className="p-6 md:w-3/5 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-[#C6A15B] uppercase tracking-wider mb-1">
              <MapPin className="w-3.5 h-3.5 text-[#52606D]" />
              <span className="text-[#52606D]">{property.location}</span>
            </div>

            <h3
              onClick={() => navigateToProperty(property.id)}
              className="text-xl font-bold text-[#102A43] hover:text-[#C6A15B] transition-colors cursor-pointer font-serif line-clamp-1"
            >
              {property.title}
            </h3>

            <p className="text-xs text-[#52606D] mt-2 line-clamp-2 leading-relaxed font-normal">
              {property.description}
            </p>
          </div>

          <div className="mt-4 pt-4 border-t border-[#E8E6E1] flex flex-wrap items-center justify-between gap-4">
            {/* Specs */}
            <div className="flex items-center gap-4 text-xs font-medium text-[#52606D]">
              {specs.bedrooms > 0 && (
                <div className="flex items-center gap-1.5">
                  <Bed className="w-4 h-4 text-[#52606D]" />
                  <span>{specs.bedrooms} Bed</span>
                </div>
              )}
              {specs.bathrooms > 0 && (
                <div className="flex items-center gap-1.5">
                  <Bath className="w-4 h-4 text-[#52606D]" />
                  <span>{specs.bathrooms} Bath</span>
                </div>
              )}
              <div className="flex items-center gap-1.5">
                <Maximize2 className="w-3.5 h-3.5 text-[#52606D]" />
                <span>{specs.areaSqFt} Sq.Ft</span>
              </div>
            </div>

            {/* Price & CTA */}
            <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
              <div className="hidden md:block text-right">
                <span className="block text-lg font-bold text-[#102A43] font-serif">
                  {property.displayPrice}
                </span>
                {property.pricePerSqFt && (
                  <span className="block text-[11px] text-[#52606D]">
                    ₹{property.pricePerSqFt.toLocaleString('en-IN')}/sq.ft
                  </span>
                )}
              </div>

              <button
                onClick={() => navigateToProperty(property.id)}
                className="px-4 py-2 rounded-xl bg-[#102A43] hover:bg-[#0B1D30] text-white text-xs font-semibold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
              >
                <span>View Details</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#C6A15B]" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Grid layout (default)
  return (
    <div
      onClick={() => navigateToProperty(property.id)}
      className="bg-white rounded-2xl border border-[#E8E6E1] overflow-hidden shadow-xs hover:shadow-md transition-all group cursor-pointer flex flex-col luxury-card-hover"
    >
      {/* Property Thumbnail Image */}
      <div className="relative h-60 w-full overflow-hidden bg-[#F7F5F0]">
        <img
          src={property.heroImage}
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#102A43]/80 via-[#102A43]/15 to-[#102A43]/30" />

        {/* Top Badges */}
        <div className="absolute top-3.5 left-3.5 flex items-center gap-2">
          {getStatusBadge()}
          <span className="px-2.5 py-1 rounded-md text-[11px] font-medium bg-[#102A43]/60 backdrop-blur-md text-white border border-white/20">
            {property.propertyType}
          </span>
        </div>

        {/* Action icons */}
        <div className="absolute top-3.5 right-3.5 flex items-center gap-1.5 z-10">
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleComparison(property.id);
            }}
            title="Compare Property"
            className={`p-2 rounded-full backdrop-blur-md transition-all cursor-pointer ${
              isCompared
                ? 'bg-[#102A43] text-[#C6A15B]'
                : 'bg-white/90 hover:bg-white text-[#102A43]'
            }`}
          >
            <Scale className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleFavorite(property.id);
            }}
            title="Save to favorites"
            className="p-2 rounded-full bg-white/90 hover:bg-white text-[#102A43] backdrop-blur-md transition-all cursor-pointer"
          >
            <Heart
              className={`w-3.5 h-3.5 ${
                isFav ? 'text-[#C6A15B] fill-[#C6A15B]' : 'text-[#52606D]'
              }`}
            />
          </button>
        </div>

        {/* Price & Location Overlay */}
        <div className="absolute bottom-3.5 left-3.5 right-3.5 text-white flex items-end justify-between">
          <div>
            <div className="text-xl font-bold font-serif text-white drop-shadow-md">
              {property.displayPrice}
            </div>
            {property.pricePerSqFt && (
              <div className="text-[11px] text-[#C6A15B] font-medium">
                ₹{property.pricePerSqFt.toLocaleString('en-IN')} / sq.ft
              </div>
            )}
          </div>
          <span className="px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wide bg-white/20 backdrop-blur-sm text-white border border-white/30">
            {property.listingType === 'RENT' ? 'For Rent' : 'For Sale'}
          </span>
        </div>
      </div>

      {/* Property Details */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#52606D] uppercase tracking-wider mb-1.5">
            <MapPin className="w-3.5 h-3.5 text-[#C6A15B] shrink-0" />
            <span className="truncate">{property.location}</span>
          </div>

          <h3 className="text-base font-bold text-[#102A43] group-hover:text-[#C6A15B] transition-colors font-serif line-clamp-1">
            {property.title}
          </h3>

          <p className="text-xs text-[#52606D] mt-1 line-clamp-2 leading-relaxed">
            {property.tagline || property.description}
          </p>
        </div>

        {/* Bottom Spec Pills */}
        <div className="mt-4 pt-4 border-t border-[#E8E6E1] flex items-center justify-between text-xs text-[#52606D]">
          <div className="flex items-center gap-3">
            {specs.bedrooms > 0 && (
              <div className="flex items-center gap-1">
                <Bed className="w-3.5 h-3.5 text-[#52606D]" />
                <span className="font-semibold text-[#20252B]">{specs.bedrooms}</span>
                <span className="text-[#52606D] text-[11px]">Bed</span>
              </div>
            )}
            {specs.bathrooms > 0 && (
              <div className="flex items-center gap-1">
                <Bath className="w-3.5 h-3.5 text-[#52606D]" />
                <span className="font-semibold text-[#20252B]">{specs.bathrooms}</span>
                <span className="text-[#52606D] text-[11px]">Bath</span>
              </div>
            )}
            <div className="flex items-center gap-1">
              <Maximize2 className="w-3.5 h-3.5 text-[#52606D]" />
              <span className="font-semibold text-[#20252B]">{specs.areaSqFt}</span>
              <span className="text-[#52606D] text-[11px]">Sq.Ft</span>
            </div>
          </div>

          <span className="p-1 rounded-lg text-[#52606D] group-hover:text-[#C6A15B] group-hover:bg-[#F7F5F0] transition-colors">
            <ArrowUpRight className="w-4 h-4" />
          </span>
        </div>
      </div>
    </div>
  );
};
