import React from 'react';
import { Home, KeyRound, Globe2, Scale, Compass, CheckCircle2 } from 'lucide-react';
import { useRealEstate } from '../../context/RealEstateContext';

export const ServicesSection: React.FC = () => {
  const { setCustomerPage } = useRealEstate();

  const services = [
    {
      icon: Home,
      title: 'Residential Property Sales',
      description: 'Handpicked coastal villas, French heritage mansions, and luxury condominiums across Pondicherry.',
    },
    {
      icon: KeyRound,
      title: 'Luxury Rentals & Leases',
      description: 'Ultra-prime short and long-term estates for diplomats, expats, executives, and seasonal residents.',
    },
    {
      icon: Globe2,
      title: 'NRI Asset Management',
      description: 'Complete remote portfolio stewardship, tenant management, and periodic drone & video inspections.',
    },
    {
      icon: Scale,
      title: 'Legal Due Diligence',
      description: 'Exhaustive 30-year parent document search, DTCP/RERA validation, and Sub-Registrar execution.',
    },
    {
      icon: Compass,
      title: 'Land & Master Advisory',
      description: 'Beachfront land parcel acquisition, boutique resort development, and joint venture consulting.',
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-white border-t border-[#E8E6E1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#102A43] font-serif">
            Our Core Real Estate Services
          </h2>
          <p className="text-sm text-[#52606D] mt-2 font-normal">
            Bespoke real estate advisory crafted for high-net-worth homebuyers, NRI investors, and commercial developers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {services.map((service, idx) => {
            const Icon = service.icon;
            return (
              <div
                key={idx}
                onClick={() => {
                  setCustomerPage('services');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="bg-[#F7F5F0] border border-[#E8E6E1] rounded-3xl p-6 hover:border-[#C6A15B] hover:shadow-lg transition-all group flex flex-col justify-between cursor-pointer luxury-card-hover"
              >
                <div>
                  <div className="w-11 h-11 rounded-2xl bg-white text-[#102A43] flex items-center justify-center mb-4 group-hover:bg-[#102A43] group-hover:text-[#C6A15B] transition-colors border border-[#E8E6E1]">
                    <Icon className="w-5 h-5 text-[#C6A15B] group-hover:text-[#C6A15B]" />
                  </div>
                  <h3 className="text-base font-bold text-[#102A43] font-serif mb-2 group-hover:text-[#C6A15B] transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-xs text-[#52606D] leading-relaxed font-normal">
                    {service.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#E8E6E1] flex items-center gap-1 text-[11px] font-bold text-[#102A43]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#C6A15B]" />
                  <span>Certified Advisory</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
