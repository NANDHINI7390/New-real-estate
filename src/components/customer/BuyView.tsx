import React, { useMemo, useState } from 'react';
import { useRealEstate } from '../../context/RealEstateContext';
import { PropertyCard } from './PropertyCard';
import {
  Sparkles,
  Building2,
  Search,
  ShieldCheck,
  Percent,
  Home,
} from 'lucide-react';

export const BuyView: React.FC = () => {
  const { properties, setCustomerPage } = useRealEstate();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('ALL');
  const [selectedLocation, setSelectedLocation] = useState<string>('ALL');
  const [selectedBedrooms, setSelectedBedrooms] = useState<string>('Any');
  const [sortBy, setSortBy] = useState<'latest' | 'price-low' | 'price-high' | 'area-high'>('latest');

  // Filter properties for BUY only
  const buyProperties = useMemo(() => {
    return properties
      .filter((p) => {
        if (p.listingType !== 'BUY') return false;

        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matches =
            p.title.toLowerCase().includes(q) ||
            p.location.toLowerCase().includes(q) ||
            (p.subLocation && p.subLocation.toLowerCase().includes(q)) ||
            p.propertyType.toLowerCase().includes(q);
          if (!matches) return false;
        }

        if (selectedType !== 'ALL' && p.propertyType !== selectedType) return false;

        if (selectedLocation !== 'ALL') {
          const locLower = p.location.toLowerCase() + ' ' + (p.subLocation || '').toLowerCase();
          if (!locLower.includes(selectedLocation.toLowerCase())) return false;
        }

        if (selectedBedrooms !== 'Any') {
          const bNum = parseInt(selectedBedrooms, 10);
          const pBaths = p.specs?.bedrooms ?? 0;
          if (selectedBedrooms === '4+') {
            if (pBaths < 4) return false;
          } else if (pBaths !== bNum) {
            return false;
          }
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return (a.price || 0) - (b.price || 0);
        if (sortBy === 'price-high') return (b.price || 0) - (a.price || 0);
        if (sortBy === 'area-high') return (b.specs?.areaSqFt || 0) - (a.specs?.areaSqFt || 0);
        return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();
      });
  }, [properties, searchQuery, selectedType, selectedLocation, selectedBedrooms, sortBy]);

  return (
    <div className="bg-[#F7F5F0] min-h-screen pb-24 text-[#20252B]">
      {/* Luxury Editorial Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white via-[#F7F5F0] to-[#F7F5F0] pt-16 pb-20 border-b border-[#E8E6E1]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E8E6E1] text-[#C6A15B] text-xs font-bold tracking-wider uppercase mb-5 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#C6A15B]" />
              <span>Freehold & Title Verified Properties for Sale</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-serif text-[#102A43] tracking-tight leading-[1.15]">
              Buy Luxury Estates in Pondicherry
            </h1>

            <p className="mt-5 text-base sm:text-lg text-[#52606D] leading-relaxed font-normal">
              Explore our curated portfolio of French heritage mansions in White Town, coastal beachfront villas along ECR, and prestigious gated developments with clear titles.
            </p>
          </div>
        </div>
      </section>

      {/* Buyer Assurance Strip */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-white p-6 rounded-3xl border border-[#E8E6E1] shadow-md">
          <div className="flex items-center gap-3.5 p-2">
            <div className="w-11 h-11 rounded-2xl bg-[#F7F5F0] text-[#102A43] flex items-center justify-center shrink-0 border border-[#E8E6E1]">
              <ShieldCheck className="w-6 h-6 text-[#C6A15B]" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#102A43]">100% Verified Titles</h4>
              <p className="text-[11px] text-[#52606D]">Legal verification by High Court senior panel</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-2 sm:border-l border-[#E8E6E1] sm:pl-6">
            <div className="w-11 h-11 rounded-2xl bg-[#F7F5F0] text-[#102A43] flex items-center justify-center shrink-0 border border-[#E8E6E1]">
              <Percent className="w-6 h-6 text-[#C6A15B]" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#102A43]">Pre-Approved Home Loans</h4>
              <p className="text-[11px] text-[#52606D]">Fast-track sanction with SBI, HDFC & ICICI</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-2 sm:border-l border-[#E8E6E1] sm:pl-6">
            <div className="w-11 h-11 rounded-2xl bg-[#F7F5F0] text-[#102A43] flex items-center justify-center shrink-0 border border-[#E8E6E1]">
              <Building2 className="w-6 h-6 text-[#C6A15B]" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#102A43]">Direct Registration Escort</h4>
              <p className="text-[11px] text-[#52606D]">Sub-Registrar liaison & token escort</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Filter & Listing Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 space-y-8">
        {/* Filters Bar */}
        <div className="bg-white rounded-3xl border border-[#E8E6E1] p-5 shadow-xs space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
            {/* Search Input */}
            <div className="md:col-span-4 relative">
              <Search className="w-4 h-4 text-[#52606D] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search villas, White Town, ECR, 3BHK..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#F7F5F0] border border-[#E8E6E1] focus:border-[#C6A15B] focus:bg-white text-xs text-[#20252B] focus:outline-hidden"
              />
            </div>

            {/* Property Type */}
            <div className="md:col-span-3">
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#F7F5F0] border border-[#E8E6E1] focus:border-[#C6A15B] focus:bg-white text-xs text-[#20252B] focus:outline-hidden"
              >
                <option value="ALL">All Property Types</option>
                <option value="Villa">Luxury Villas</option>
                <option value="Apartment">Apartments & Penthouses</option>
                <option value="Independent House">Independent Houses</option>
                <option value="Plot">Residential Plots</option>
                <option value="Commercial">Commercial Assets</option>
              </select>
            </div>

            {/* Locality */}
            <div className="md:col-span-3">
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#F7F5F0] border border-[#E8E6E1] focus:border-[#C6A15B] focus:bg-white text-xs text-[#20252B] focus:outline-hidden"
              >
                <option value="ALL">All Localities in Puducherry</option>
                <option value="White Town">White Town (French Quarter)</option>
                <option value="ECR">East Coast Road (ECR)</option>
                <option value="Auroville">Auroville Corridor</option>
                <option value="Heritage">Heritage Tamil Quarter</option>
                <option value="Lawspet">Lawspet</option>
              </select>
            </div>

            {/* Bedrooms */}
            <div className="md:col-span-2">
              <select
                value={selectedBedrooms}
                onChange={(e) => setSelectedBedrooms(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#F7F5F0] border border-[#E8E6E1] focus:border-[#C6A15B] focus:bg-white text-xs text-[#20252B] focus:outline-hidden"
              >
                <option value="Any">Bedrooms: Any</option>
                <option value="1">1 BHK</option>
                <option value="2">2 BHK</option>
                <option value="3">3 BHK</option>
                <option value="4+">4+ BHK</option>
              </select>
            </div>
          </div>

          {/* Sub-bar: Count & Sorting */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#E8E6E1] text-xs text-[#52606D]">
            <div>
              Showing <span className="font-bold text-[#102A43]">{buyProperties.length}</span> luxury properties for sale
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[#52606D]">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-3 py-1.5 rounded-lg bg-[#F7F5F0] border border-[#E8E6E1] text-[#102A43] text-xs font-semibold focus:outline-hidden"
              >
                <option value="latest">Newly Listed First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="area-high">Area: Largest First</option>
              </select>
            </div>
          </div>
        </div>

        {/* Properties Grid */}
        {buyProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {buyProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-12 text-center border border-[#E8E6E1] space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-[#F7F5F0] text-[#102A43] flex items-center justify-center mx-auto border border-[#E8E6E1]">
              <Home className="w-7 h-7 text-[#C6A15B]" />
            </div>
            <h3 className="text-xl font-bold font-serif text-[#102A43]">No Matching Properties Found</h3>
            <p className="text-xs text-[#52606D] max-w-md mx-auto">
              We couldn’t find properties for sale matching your current filter criteria. Try expanding your search parameters or speak with our advisory desk for private off-market listings.
            </p>
            <div className="pt-2">
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedType('ALL');
                  setSelectedLocation('ALL');
                  setSelectedBedrooms('Any');
                }}
                className="px-5 py-2.5 rounded-xl bg-[#102A43] text-white text-xs font-semibold hover:bg-[#0B1D30] transition-colors cursor-pointer"
              >
                Reset All Filters
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
