import React, { useState, useMemo } from 'react';
import { useRealEstate } from '../../context/RealEstateContext';
import { PropertyCard } from './PropertyCard';
import { ListingType, FilterState } from '../../types';
import {
  Search,
  SlidersHorizontal,
  LayoutGrid,
  List,
  RotateCcw,
  MapPin,
  Home,
  IndianRupee,
  Bed,
  Bath,
  Maximize2,
  Check,
  ChevronRight,
  Sparkles,
  ShieldCheck,
  PhoneCall,
} from 'lucide-react';

export const PropertiesListingView: React.FC = () => {
  const {
    properties,
    filters,
    updateFilter,
    resetFilters,
    setCustomerPage,
  } = useRealEstate();

  const [layoutMode, setLayoutMode] = useState<'grid' | 'list'>('grid');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Available amenities for filtering
  const allAmenities = [
    'Sea View',
    'Swimming Pool',
    'Private Garden',
    'Power Backup',
    '24/7 Security',
    'Rain Water Harvesting',
    'Air Conditioning',
    'Modular Italian Kitchen',
    'Solar Panels',
    'Terrace Lounge',
  ];

  // Smart Curated Preset Quick Filters
  const applySmartPreset = (preset: string) => {
    resetFilters();
    if (preset === 'seafront') {
      updateFilter('location', 'ECR');
      updateFilter('selectedAmenities', ['Sea View', 'Swimming Pool']);
    } else if (preset === 'heritage') {
      updateFilter('location', 'White Town');
      updateFilter('propertyType', 'Villa');
    } else if (preset === 'budget-luxury') {
      updateFilter('minBudget', 5000000);
      updateFilter('maxBudget', 15000000);
    } else if (preset === 'family-3bhk') {
      updateFilter('bedrooms', '3');
    }
  };

  // Filter and sort computation
  const filteredProperties = useMemo(() => {
    return (properties || [])
      .filter((p) => {
        if (!p) return false;

        // Search query
        if (filters.searchQuery?.trim()) {
          const q = filters.searchQuery.toLowerCase();
          const matchTitle = (p.title || '').toLowerCase().includes(q);
          const matchLoc = (p.location || '').toLowerCase().includes(q);
          const matchDesc = (p.description || '').toLowerCase().includes(q);
          if (!matchTitle && !matchLoc && !matchDesc) return false;
        }

        // Listing Type (BUY / RENT)
        if (filters.listingType !== 'ALL' && p.listingType !== filters.listingType) {
          return false;
        }

        // Location
        if (filters.location !== 'ALL' && p.locality !== filters.location && !p.location?.includes(filters.location)) {
          return false;
        }

        // Property Type
        if (filters.propertyType !== 'ALL' && p.propertyType !== filters.propertyType) {
          return false;
        }

        // Budget
        if (p.price < filters.minBudget || p.price > filters.maxBudget) {
          return false;
        }

        // Bedrooms
        if (filters.bedrooms !== 'Any') {
          const bedNum = parseInt(filters.bedrooms, 10);
          const pBeds = p.specs?.bedrooms ?? 0;
          if (filters.bedrooms === '5+') {
            if (pBeds < 5) return false;
          } else if (pBeds !== bedNum) {
            return false;
          }
        }

        // Bathrooms
        if (filters.bathrooms && filters.bathrooms !== 'Any') {
          const bathNum = parseInt(filters.bathrooms, 10);
          const pBaths = p.specs?.bathrooms ?? 0;
          if (filters.bathrooms === '5+') {
            if (pBaths < 5) return false;
          } else if (pBaths !== bathNum) {
            return false;
          }
        }

        // Furnishing
        if (filters.furnishing !== 'ALL' && p.specs?.furnishing !== filters.furnishing) {
          return false;
        }

        // Verified only
        if (filters.verifiedOnly && !p.isVerified) {
          return false;
        }

        // Amenities
        if (Array.isArray(filters.selectedAmenities) && filters.selectedAmenities.length > 0) {
          const pAmenities = Array.isArray(p.amenities) ? p.amenities : [];
          const hasAll = filters.selectedAmenities.every((req) =>
            pAmenities.includes(req)
          );
          if (!hasAll) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (filters.sortBy === 'price-low') return a.price - b.price;
        if (filters.sortBy === 'price-high') return b.price - a.price;
        if (filters.sortBy === 'area-high') {
          return (b.specs?.areaSqFt ?? 0) - (a.specs?.areaSqFt ?? 0);
        }
        if (filters.sortBy === 'featured') {
          return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
        }
        // Default latest
        return new Date(b.createdAt || '').getTime() - new Date(a.createdAt || '').getTime();
      });
  }, [properties, filters]);

  const handleAmenityToggle = (amenity: string) => {
    const current = Array.isArray(filters.selectedAmenities) ? filters.selectedAmenities : [];
    if (current.includes(amenity)) {
      updateFilter(
        'selectedAmenities',
        current.filter((a) => a !== amenity)
      );
    } else {
      updateFilter('selectedAmenities', [...current, amenity]);
    }
  };

  return (
    <div className="bg-[#F7F5F0] min-h-screen pb-24 text-[#20252B]">
      {/* Page Header */}
      <div className="bg-white border-b border-[#E8E6E1] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-[#52606D] mb-2">
            <button
              onClick={() => setCustomerPage('home')}
              className="hover:text-[#102A43] transition-colors cursor-pointer"
            >
              Home
            </button>
            <ChevronRight className="w-3 h-3 text-[#E8E6E1]" />
            <span className="text-[#102A43] font-semibold">Properties</span>
            {filters.listingType !== 'ALL' && (
              <>
                <ChevronRight className="w-3 h-3 text-[#E8E6E1]" />
                <span className="text-[#C6A15B] font-semibold uppercase text-[11px]">
                  {filters.listingType === 'BUY' ? 'For Sale' : 'For Rent'}
                </span>
              </>
            )}
          </nav>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-[#102A43] font-serif">
                Exclusive Pondicherry Portfolio
              </h1>
              <p className="text-xs text-[#52606D] mt-1 font-normal">
                Showing {filteredProperties.length} verified coastal villas, French mansions & premier residences
              </p>
            </div>

            {/* Mobile Filter Toggle */}
            <div className="flex items-center gap-2 lg:hidden">
              <button
                onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#102A43] text-white text-xs font-semibold shadow-xs cursor-pointer"
              >
                <SlidersHorizontal className="w-4 h-4 text-[#C6A15B]" />
                <span>Smart Filters {filters.selectedAmenities?.length > 0 ? `(${filters.selectedAmenities.length})` : ''}</span>
              </button>
            </div>
          </div>

          {/* Quick Curated Preset Filters Row */}
          <div className="mt-5 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            <span className="text-xs font-bold text-[#52606D] uppercase tracking-wider shrink-0 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-[#C6A15B]" />
              Presets:
            </span>
            <button
              onClick={() => applySmartPreset('seafront')}
              className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-[#F7F5F0] hover:bg-[#E8E6E1] text-[#102A43] border border-[#E8E6E1] shrink-0 transition-colors cursor-pointer"
            >
              🌊 Seafront & Beach Villas
            </button>
            <button
              onClick={() => applySmartPreset('heritage')}
              className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-[#F7F5F0] hover:bg-[#E8E6E1] text-[#102A43] border border-[#E8E6E1] shrink-0 transition-colors cursor-pointer"
            >
              🏛️ White Town Heritage
            </button>
            <button
              onClick={() => applySmartPreset('budget-luxury')}
              className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-[#F7F5F0] hover:bg-[#E8E6E1] text-[#102A43] border border-[#E8E6E1] shrink-0 transition-colors cursor-pointer"
            >
              💎 ₹50L – ₹1.5 Cr Sweet Spot
            </button>
            <button
              onClick={() => applySmartPreset('family-3bhk')}
              className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-[#F7F5F0] hover:bg-[#E8E6E1] text-[#102A43] border border-[#E8E6E1] shrink-0 transition-colors cursor-pointer"
            >
              🏡 3 BHK Family Homes
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          {/* LEFT SMART FILTERS SIDEBAR */}
          <aside
            className={`lg:block ${
              mobileFilterOpen ? 'block' : 'hidden'
            } bg-white rounded-3xl border border-[#E8E6E1] p-6 shadow-md sticky top-28 space-y-6`}
          >
            <div className="flex items-center justify-between pb-4 border-b border-[#E8E6E1]">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-[#C6A15B]" />
                <h3 className="text-sm font-bold text-[#102A43] uppercase tracking-wider font-serif">
                  Smart Filter Sidebar
                </h3>
              </div>
              <button
                onClick={resetFilters}
                className="text-xs text-[#52606D] hover:text-[#C6A15B] flex items-center gap-1 font-medium cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            </div>

            {/* Buy / Rent Switch */}
            <div>
              <label className="block text-xs font-semibold text-[#102A43] mb-2">
                Listing Type
              </label>
              <div className="grid grid-cols-2 gap-1.5 p-1 bg-[#F7F5F0] border border-[#E8E6E1] rounded-xl">
                <button
                  type="button"
                  onClick={() => updateFilter('listingType', 'BUY')}
                  className={`py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    filters.listingType === 'BUY'
                      ? 'bg-[#102A43] text-white shadow-xs'
                      : 'text-[#52606D] hover:text-[#102A43]'
                  }`}
                >
                  Buy
                </button>
                <button
                  type="button"
                  onClick={() => updateFilter('listingType', 'RENT')}
                  className={`py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    filters.listingType === 'RENT'
                      ? 'bg-[#102A43] text-white shadow-xs'
                      : 'text-[#52606D] hover:text-[#102A43]'
                  }`}
                >
                  Rent
                </button>
              </div>
            </div>

            {/* Location */}
            <div>
              <label className="block text-xs font-semibold text-[#102A43] mb-2">
                Locality / Sub-Market
              </label>
              <select
                value={filters.location}
                onChange={(e) => updateFilter('location', e.target.value)}
                className="w-full text-xs font-medium bg-[#F7F5F0] border border-[#E8E6E1] rounded-xl px-3 py-2.5 text-[#20252B] focus:outline-hidden focus:border-[#C6A15B]"
              >
                <option value="ALL">All Pondicherry Regions</option>
                <option value="White Town">White Town (French Quarter)</option>
                <option value="ECR">ECR Coastal Belt</option>
                <option value="Kottakuppam">Auroville / Kottakuppam</option>
                <option value="Oulgaret">Oulgaret / Saram</option>
                <option value="Anna Nagar">Anna Nagar</option>
                <option value="Pondy Marina">Pondy Marina</option>
              </select>
            </div>

            {/* Property Type */}
            <div>
              <label className="block text-xs font-semibold text-[#102A43] mb-2">
                Property Architecture
              </label>
              <select
                value={filters.propertyType}
                onChange={(e) => updateFilter('propertyType', e.target.value)}
                className="w-full text-xs font-medium bg-[#F7F5F0] border border-[#E8E6E1] rounded-xl px-3 py-2.5 text-[#20252B] focus:outline-hidden focus:border-[#C6A15B]"
              >
                <option value="ALL">All Typologies</option>
                <option value="Villa">Luxury Villa</option>
                <option value="Apartment">Luxury Apartment</option>
                <option value="Independent House">Heritage & Independent House</option>
                <option value="Plot">Residential Plot / Land</option>
                <option value="Commercial">Commercial / Boutique Hotel</option>
              </select>
            </div>

            {/* Bedrooms Chips */}
            <div>
              <label className="block text-xs font-semibold text-[#102A43] mb-2">
                Bedrooms (BHK)
              </label>
              <div className="flex flex-wrap gap-1.5">
                {['Any', '1', '2', '3', '4', '5+'].map((bhk) => (
                  <button
                    key={bhk}
                    type="button"
                    onClick={() => updateFilter('bedrooms', bhk)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                      filters.bedrooms === bhk
                        ? 'bg-[#102A43] text-white shadow-xs'
                        : 'bg-[#F7F5F0] text-[#52606D] border border-[#E8E6E1] hover:bg-[#E8E6E1]'
                    }`}
                  >
                    {bhk}
                  </button>
                ))}
              </div>
            </div>

            {/* Furnishing */}
            <div>
              <label className="block text-xs font-semibold text-[#102A43] mb-2">
                Furnishing Level
              </label>
              <div className="grid grid-cols-3 gap-1 bg-[#F7F5F0] border border-[#E8E6E1] p-1 rounded-xl">
                {['ALL', 'Furnished', 'Unfurnished'].map((f) => (
                  <button
                    key={f}
                    type="button"
                    onClick={() => updateFilter('furnishing', f)}
                    className={`py-1.5 rounded-lg text-[11px] font-semibold transition-all truncate px-1 cursor-pointer ${
                      filters.furnishing === f
                        ? 'bg-[#102A43] text-white shadow-xs'
                        : 'text-[#52606D] hover:text-[#102A43]'
                    }`}
                  >
                    {f === 'ALL' ? 'Any' : f}
                  </button>
                ))}
              </div>
            </div>

            {/* Amenities Checkboxes */}
            <div>
              <label className="block text-xs font-semibold text-[#102A43] mb-2">
                Curated Amenities
              </label>
              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {allAmenities.map((amenity) => {
                  const isChecked = filters.selectedAmenities?.includes(amenity);
                  return (
                    <label
                      key={amenity}
                      className="flex items-center gap-2 text-xs text-[#52606D] hover:text-[#102A43] cursor-pointer select-none py-0.5"
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => handleAmenityToggle(amenity)}
                        className="rounded border-[#E8E6E1] text-[#102A43] focus:ring-[#C6A15B] cursor-pointer"
                      />
                      <span>{amenity}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Title Clearance Guarantee Callout */}
            <div className="pt-4 border-t border-[#E8E6E1]">
              <div className="p-3.5 bg-[#F7F5F0] rounded-2xl border border-[#E8E6E1] flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-[#C6A15B] shrink-0 mt-0.5" />
                <div className="text-[11px] text-[#52606D] leading-tight font-normal">
                  <strong className="text-[#102A43]">100% Title Clearance:</strong> All listings undergo 30-year encumbrance search and INTACH / DTCP audit.
                </div>
              </div>
            </div>
          </aside>

          {/* RIGHT PROPERTY LISTINGS AREA */}
          <main className="lg:col-span-3 space-y-6">
            {/* Top Toolbar (Search, Sort, Grid/List) */}
            <div className="bg-white rounded-2xl border border-[#E8E6E1] p-4 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
              {/* Search Bar Input */}
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-[#52606D] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search villa name, street, locality..."
                  value={filters.searchQuery}
                  onChange={(e) => updateFilter('searchQuery', e.target.value)}
                  className="w-full pl-9 pr-4 py-2 rounded-xl text-xs bg-[#F7F5F0] border border-[#E8E6E1] focus:outline-hidden focus:border-[#C6A15B] text-[#20252B]"
                />
              </div>

              {/* Sort By & View Toggles */}
              <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-3">
                <div className="flex items-center gap-1.5 text-xs text-[#52606D]">
                  <span>Sort By:</span>
                  <select
                    value={filters.sortBy}
                    onChange={(e) =>
                      updateFilter('sortBy', e.target.value as FilterState['sortBy'])
                    }
                    className="text-xs font-semibold bg-[#F7F5F0] border border-[#E8E6E1] rounded-lg px-2.5 py-1.5 text-[#102A43] focus:outline-hidden cursor-pointer"
                  >
                    <option value="latest">Latest First</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="area-high">Area: Largest First</option>
                    <option value="featured">Featured First</option>
                  </select>
                </div>

                {/* Grid / List switcher */}
                <div className="flex items-center p-1 bg-[#F7F5F0] rounded-xl border border-[#E8E6E1]">
                  <button
                    onClick={() => setLayoutMode('grid')}
                    className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                      layoutMode === 'grid'
                        ? 'bg-[#102A43] text-white shadow-xs'
                        : 'text-[#52606D] hover:text-[#102A43]'
                    }`}
                  >
                    <LayoutGrid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setLayoutMode('list')}
                    className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                      layoutMode === 'list'
                        ? 'bg-[#102A43] text-white shadow-xs'
                        : 'text-[#52606D] hover:text-[#102A43]'
                    }`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Active Filters Pill Bar */}
            {(filters.location !== 'ALL' ||
              filters.propertyType !== 'ALL' ||
              filters.bedrooms !== 'Any' ||
              filters.searchQuery ||
              (filters.selectedAmenities && filters.selectedAmenities.length > 0)) && (
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <span className="text-xs text-[#52606D] font-medium">Active Filters:</span>
                {filters.searchQuery && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#E8E6E1] text-[#102A43] text-[11px]">
                    "{filters.searchQuery}"
                  </span>
                )}
                {filters.location !== 'ALL' && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#102A43] text-white text-[11px] font-semibold">
                    {filters.location}
                  </span>
                )}
                {filters.propertyType !== 'ALL' && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#102A43] text-white text-[11px] font-semibold">
                    {filters.propertyType}
                  </span>
                )}
                {filters.bedrooms !== 'Any' && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#102A43] text-white text-[11px] font-semibold">
                    {filters.bedrooms} BHK
                  </span>
                )}
                {(filters.selectedAmenities || []).map((a) => (
                  <span
                    key={a}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#F7F5F0] text-[#102A43] border border-[#E8E6E1] text-[11px]"
                  >
                    {a}
                  </span>
                ))}
                <button
                  onClick={resetFilters}
                  className="text-xs text-[#C6A15B] hover:underline font-medium ml-1 cursor-pointer"
                >
                  Clear All
                </button>
              </div>
            )}

            {/* Properties Grid / List */}
            {filteredProperties.length === 0 ? (
              <div className="bg-white rounded-3xl border border-[#E8E6E1] p-12 text-center">
                <div className="w-16 h-16 rounded-full bg-[#F7F5F0] text-[#C6A15B] flex items-center justify-center mx-auto mb-4 border border-[#E8E6E1]">
                  <Search className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-[#102A43] font-serif">
                  No Properties Match Your Filter Criteria
                </h3>
                <p className="text-xs text-[#52606D] mt-2 max-w-sm mx-auto font-normal">
                  Try adjusting the location, budget, or bedroom preferences to discover more available listings.
                </p>
                <button
                  onClick={resetFilters}
                  className="mt-6 px-6 py-2.5 rounded-xl bg-[#102A43] text-white text-xs font-semibold shadow-xs hover:bg-[#0B1D30] transition-colors cursor-pointer"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div
                className={
                  layoutMode === 'grid'
                    ? 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6'
                    : 'space-y-4'
                }
              >
                {filteredProperties.map((property) => (
                  <PropertyCard
                    key={property.id}
                    property={property}
                    layout={layoutMode}
                  />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};
