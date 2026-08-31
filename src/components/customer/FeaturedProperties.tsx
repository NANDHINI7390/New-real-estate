import React from 'react';
import { useRealEstate } from '../../context/RealEstateContext';
import { PropertyCard } from './PropertyCard';
import { ArrowRight, Sparkles } from 'lucide-react';

export const FeaturedProperties: React.FC = () => {
  const { properties, setCustomerPage } = useRealEstate();

  // Pick top 4 featured or available properties
  const featured = properties.slice(0, 4);

  return (
    <section className="py-16 md:py-24 bg-[#F7F5F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white text-[#C6A15B] text-xs font-bold uppercase tracking-wider mb-2 border border-[#E8E6E1] shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#C6A15B]" />
              <span>Handpicked Reserve Collection</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#102A43] font-serif">
              Featured Luxury Properties
            </h2>
            <p className="text-sm text-[#52606D] mt-2 max-w-xl font-normal">
              Explore our certified coastal residences, French Quarter colonial mansions, and prime beachfront investment lands in Pondicherry.
            </p>
          </div>

          <button
            onClick={() => {
              setCustomerPage('properties');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 text-sm font-bold text-[#102A43] hover:text-[#C6A15B] transition-colors group self-start md:self-auto cursor-pointer"
          >
            <span>View Complete Portfolio</span>
            <ArrowRight className="w-4 h-4 text-[#C6A15B] group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Property Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((property) => (
            <PropertyCard key={property.id} property={property} layout="grid" />
          ))}
        </div>
      </div>
    </section>
  );
};
