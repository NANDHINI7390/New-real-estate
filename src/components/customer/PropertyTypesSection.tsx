import React from 'react';
import { useRealEstate } from '../../context/RealEstateContext';
import { Sparkles, ArrowRight } from 'lucide-react';

export const PropertyTypesSection: React.FC = () => {
  const { applyQuickPropertyType, properties } = useRealEstate();

  const types = [
    {
      name: 'Luxury Villas',
      filterType: 'Villa',
      count: properties.filter((p) => p.propertyType === 'Villa').length,
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=85',
      description: 'Private oceanfront estates & French colonial courtyards',
    },
    {
      name: 'Modern Condominiums',
      filterType: 'Apartment',
      count: properties.filter((p) => p.propertyType === 'Apartment').length,
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=85',
      description: 'Gated sea-view residences with infinity pools & concierge',
    },
    {
      name: 'Heritage Mansions',
      filterType: 'Independent House',
      count: properties.filter((p) => p.propertyType === 'Independent House').length,
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=85',
      description: 'Restored French Franco-Tamil manor residences with teak pillars',
    },
    {
      name: 'Coastal Villa Plots',
      filterType: 'Plot',
      count: properties.filter((p) => p.propertyType === 'Plot').length,
      image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=85',
      description: 'DTCP approved beachside clear-title private estate land',
    },
  ];

  return (
    <section className="py-16 md:py-20 bg-white border-t border-[#E8E6E1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#F7F5F0] text-[#C6A15B] text-xs font-bold uppercase tracking-wider mb-2 border border-[#E8E6E1] shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#C6A15B]" />
            <span>Curated Typologies</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#102A43] font-serif">
            Browse by Property Architecture
          </h2>
          <p className="text-sm text-[#52606D] mt-2 font-normal">
            Find the ideal property archetype matching your aesthetic taste, lifestyle, and wealth creation objectives.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {types.map((item) => (
            <div
              key={item.name}
              onClick={() => applyQuickPropertyType(item.filterType)}
              className="group relative rounded-3xl overflow-hidden cursor-pointer h-80 shadow-xs hover:shadow-xl transition-all duration-500 border border-[#E8E6E1] luxury-card-hover"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#102A43]/90 via-[#102A43]/35 to-transparent" />

              <div className="absolute bottom-0 inset-x-0 p-6 text-white flex flex-col justify-end">
                <span className="text-[11px] font-bold text-[#C6A15B] uppercase tracking-wider mb-1">
                  {item.count} Active Residences
                </span>
                <h3 className="text-xl font-bold font-serif text-white group-hover:text-[#C6A15B] transition-colors">
                  {item.name}
                </h3>
                <p className="text-xs text-[#E8E6E1]/90 mt-1 line-clamp-2 font-normal">
                  {item.description}
                </p>

                <div className="mt-4 flex items-center gap-2 text-xs font-bold text-[#C6A15B] opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>Explore Listings</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
