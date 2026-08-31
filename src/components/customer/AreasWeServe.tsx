import React from 'react';
import { useRealEstate } from '../../context/RealEstateContext';
import { MapPin, ArrowRight } from 'lucide-react';

export const AreasWeServe: React.FC = () => {
  const { updateFilter, setCustomerPage } = useRealEstate();

  const areas = [
    {
      name: 'White Town (French Quarter)',
      tagline: 'Colonial heritage villas & promenade seaside living',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=85',
      listingsCount: '28 Properties',
      locationKey: 'White Town',
    },
    {
      name: 'East Coast Road (ECR)',
      tagline: 'Beachfront estates, private pools & coastal DTCP plots',
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=85',
      listingsCount: '34 Properties',
      locationKey: 'ECR',
    },
    {
      name: 'Auroville & Kottakuppam',
      tagline: 'Lush greenery, bioclimatic architecture & serene retreat living',
      image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=85',
      listingsCount: '19 Properties',
      locationKey: 'Kottakuppam',
    },
    {
      name: 'Oulgaret & Saram',
      tagline: 'Prime gated condominiums & doctor family residential enclaves',
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=85',
      listingsCount: '22 Properties',
      locationKey: 'Oulgaret',
    },
    {
      name: 'Anna Nagar Central',
      tagline: 'Urban luxury convenience, independent houses & central access',
      image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=800&q=85',
      listingsCount: '15 Properties',
      locationKey: 'Anna Nagar',
    },
    {
      name: 'Pondy Marina Coastal',
      tagline: 'Waterfront high-rises & sunrise ocean view residences',
      image: 'https://images.unsplash.com/photo-1600573472592-401b489a3cdc?auto=format&fit=crop&w=800&q=85',
      listingsCount: '12 Properties',
      locationKey: 'Pondy Marina',
    },
  ];

  const handleSelectArea = (locationKey: string) => {
    updateFilter('location', locationKey);
    setCustomerPage('properties');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="py-16 md:py-24 bg-[#F7F5F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white text-[#C6A15B] text-xs font-bold uppercase tracking-wider mb-2 border border-[#E8E6E1] shadow-xs">
              <MapPin className="w-3.5 h-3.5 text-[#C6A15B]" />
              <span>Coveted Micro-Markets</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#102A43] font-serif">
              Prime Areas We Advise
            </h2>
            <p className="text-sm text-[#52606D] mt-2 max-w-xl font-normal">
              Explore coveted neighborhoods in Puducherry known for pristine lifestyle, high capital appreciation, and strong rental yields.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {areas.map((area) => (
            <div
              key={area.name}
              onClick={() => handleSelectArea(area.locationKey)}
              className="group relative rounded-3xl overflow-hidden cursor-pointer h-72 border border-[#E8E6E1] shadow-xs hover:shadow-xl transition-all duration-300 luxury-card-hover"
            >
              <img
                src={area.image}
                alt={area.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#102A43]/90 via-[#102A43]/35 to-transparent" />

              <div className="absolute bottom-0 inset-x-0 p-6 text-white">
                <span className="text-[11px] font-bold text-[#C6A15B] uppercase tracking-wider">
                  {area.listingsCount}
                </span>
                <h3 className="text-lg font-bold font-serif text-white group-hover:text-[#C6A15B] transition-colors mt-0.5">
                  {area.name}
                </h3>
                <p className="text-xs text-[#E8E6E1]/90 mt-1 line-clamp-1 font-normal">
                  {area.tagline}
                </p>

                <div className="mt-3 flex items-center gap-1.5 text-xs font-bold text-[#C6A15B] opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>View Properties in {area.name.split(' ')[0]}</span>
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
