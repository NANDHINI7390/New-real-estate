import React from 'react';
import { useRealEstate } from '../../context/RealEstateContext';
import {
  Globe2,
  Scale,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Paintbrush,
} from 'lucide-react';

interface ServicesViewProps {
  onOpenInquiryModal: () => void;
}

export const ServicesView: React.FC<ServicesViewProps> = ({ onOpenInquiryModal }) => {
  const { setCustomerPage } = useRealEstate();

  return (
    <div className="bg-[#F7F5F0] min-h-screen pb-24 text-[#20252B]">
      {/* Luxury Editorial Hero Section */}
      <section className="relative overflow-hidden bg-white pt-16 pb-20 border-b border-[#E8E6E1]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F7F5F0] border border-[#E8E6E1] text-[#C6A15B] text-xs font-bold tracking-wider uppercase mb-5">
              <Sparkles className="w-3.5 h-3.5 text-[#C6A15B]" />
              <span>Full-Spectrum Real Estate Advisory</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-serif text-[#102A43] tracking-tight leading-[1.15]">
              Advisory, Legal & Private Wealth Asset Services
            </h1>

            <p className="mt-5 text-base sm:text-lg text-[#52606D] leading-relaxed font-normal">
              Specialized luxury real estate solutions tailored for global NRIs, institutional investors, and discerning homeowners across the Puducherry coastal corridor.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                onClick={onOpenInquiryModal}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#102A43] hover:bg-[#0B1D30] text-white text-sm font-semibold shadow-md transition-all hover:shadow-lg active:scale-98 cursor-pointer"
              >
                <span>Book a Private Consultation</span>
                <ArrowRight className="w-4 h-4 text-[#C6A15B]" />
              </button>
              <button
                onClick={() => {
                  setCustomerPage('contact');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-[#F7F5F0] text-[#102A43] border border-[#E8E6E1] text-sm font-semibold shadow-xs transition-all cursor-pointer"
              >
                <span>Talk to Service Concierge</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Volume Strip */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 bg-white p-6 sm:p-8 rounded-3xl border border-[#E8E6E1] shadow-md">
          <div className="p-4 rounded-2xl bg-[#F7F5F0] border border-[#E8E6E1]">
            <div className="text-2xl sm:text-3xl font-bold font-serif text-[#102A43]">500+</div>
            <div className="text-xs sm:text-sm font-bold text-[#102A43] mt-1">NRI Assets Managed</div>
            <p className="text-[11px] text-[#52606D] mt-0.5 font-normal">USA, UK, Singapore & UAE</p>
          </div>
          <div className="p-4 rounded-2xl bg-[#F7F5F0] border border-[#E8E6E1]">
            <div className="text-2xl sm:text-3xl font-bold font-serif text-[#102A43]">30-Year</div>
            <div className="text-xs sm:text-sm font-bold text-[#102A43] mt-1">Legal Title Search</div>
            <p className="text-[11px] text-[#52606D] mt-0.5 font-normal">High Court Advocate Certified</p>
          </div>
          <div className="p-4 rounded-2xl bg-[#F7F5F0] border border-[#E8E6E1]">
            <div className="text-2xl sm:text-3xl font-bold font-serif text-[#102A43]">45+</div>
            <div className="text-xs sm:text-sm font-bold text-[#102A43] mt-1">Heritage Restorations</div>
            <p className="text-[11px] text-[#52606D] mt-0.5 font-normal">Franco-Tamil mansions restored</p>
          </div>
          <div className="p-4 rounded-2xl bg-[#F7F5F0] border border-[#E8E6E1]">
            <div className="text-2xl sm:text-3xl font-bold font-serif text-[#102A43]">8.4%</div>
            <div className="text-xs sm:text-sm font-bold text-[#102A43] mt-1">Average Rental Yield</div>
            <p className="text-[11px] text-[#52606D] mt-0.5 font-normal">ECR & White Town portfolios</p>
          </div>
        </div>
      </section>

      {/* Main Services Breakdown */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 space-y-16">
        {/* Service 1: NRI Asset Management */}
        <div className="bg-white rounded-3xl border border-[#E8E6E1] p-8 sm:p-12 shadow-xs grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-6 space-y-5">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#F7F5F0] text-[#C6A15B] text-xs font-bold uppercase tracking-wider border border-[#E8E6E1]">
              <Globe2 className="w-3.5 h-3.5" />
              <span>Specialized NRI & Expat Desk</span>
            </div>
            <h2 className="text-3xl font-bold font-serif text-[#102A43] leading-snug">
              Complete Remote Property Care for Overseas Indians
            </h2>
            <p className="text-xs sm:text-sm text-[#52606D] leading-relaxed font-normal">
              Living in the USA, UK, Singapore, Dubai, or Australia? We manage your Pondicherry assets with complete transparency—from verified tenant onboarding and rental collection to bi-monthly 4K video inspection walkthroughs.
            </p>
            <div className="space-y-2.5 pt-2 text-xs text-[#20252B]">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#C6A15B] shrink-0" />
                <span>Quarterly high-resolution photographic and video condition audits</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#C6A15B] shrink-0" />
                <span>Automated monthly rental remittance to your NRE / NRO bank accounts</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#C6A15B] shrink-0" />
                <span>Property tax payment, municipal liaison, and utility maintenance</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#C6A15B] shrink-0" />
                <span>Power of Attorney (PoA) facilitation & legal counsel representation</span>
              </div>
            </div>
            <div className="pt-4">
              <button
                onClick={onOpenInquiryModal}
                className="px-6 py-3.5 rounded-xl bg-[#102A43] hover:bg-[#0B1D30] text-white text-xs font-bold shadow-md transition-all active:scale-98 cursor-pointer"
              >
                Enroll Property for NRI Care
              </button>
            </div>
          </div>

          <div className="lg:col-span-6 relative rounded-3xl overflow-hidden shadow-lg h-80 sm:h-96 border-4 border-[#F7F5F0]">
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=85"
              alt="NRI Asset Management"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 text-white text-xs bg-[#102A43]/80 backdrop-blur-md p-3 rounded-xl border border-[#C6A15B]/30">
              <span className="font-bold block text-white">Active NRI Portfolio: ECR Beach Enclave</span>
              <span className="text-white/80 text-[11px]">Under 24/7 security oversight and quarterly maintenance</span>
            </div>
          </div>
        </div>

        {/* Service 2: Legal & Conveyancing */}
        <div className="bg-white rounded-3xl border border-[#E8E6E1] p-8 sm:p-12 shadow-xs grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-6 order-2 lg:order-1 relative rounded-3xl overflow-hidden shadow-lg h-80 sm:h-96 border-4 border-[#F7F5F0]">
            <img
              src="https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1000&q=85"
              alt="Legal Due Diligence"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 text-white text-xs bg-[#102A43]/80 backdrop-blur-md p-3 rounded-xl border border-[#C6A15B]/30">
              <span className="font-bold block text-white">100% Title Perfection Guarantee</span>
              <span className="text-white/80 text-[11px]">Every deal vetted by empaneled High Court advocates</span>
            </div>
          </div>

          <div className="lg:col-span-6 order-1 lg:order-2 space-y-5">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#F7F5F0] text-[#C6A15B] text-xs font-bold uppercase tracking-wider border border-[#E8E6E1]">
              <Scale className="w-3.5 h-3.5" />
              <span>Legal Due Diligence Desk</span>
            </div>
            <h2 className="text-3xl font-bold font-serif text-[#102A43] leading-snug">
              30-Year Encumbrance Audit & Title Perfection
            </h2>
            <p className="text-xs sm:text-sm text-[#52606D] leading-relaxed font-normal">
              Every property transaction is backed by our panel of senior Puducherry advocates to ensure zero litigation, crystal clear ownership succession, and full DTCP / RERA adherence.
            </p>
            <div className="space-y-2.5 pt-2 text-xs text-[#20252B]">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#C6A15B] shrink-0" />
                <span>30-Year Encumbrance Certificate (EC) audit & certified search report</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#C6A15B] shrink-0" />
                <span>Patta, Chitta, Town Survey Field (TSLR) and Revenue boundary mapping</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#C6A15B] shrink-0" />
                <span>End-to-end Sub-Registrar Office deed drafting, token booking & registration</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#C6A15B] shrink-0" />
                <span>French civil code succession clearance for White Town ancestral estates</span>
              </div>
            </div>
            <div className="pt-4">
              <button
                onClick={onOpenInquiryModal}
                className="px-6 py-3.5 rounded-xl bg-[#102A43] hover:bg-[#0B1D30] text-white text-xs font-bold shadow-md transition-all active:scale-98 cursor-pointer"
              >
                Request Legal Title Search
              </button>
            </div>
          </div>
        </div>

        {/* Service 3: Architectural Restoration & Heritage Conservation */}
        <div className="bg-white rounded-3xl border border-[#E8E6E1] p-8 sm:p-12 shadow-xs grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-6 space-y-5">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#F7F5F0] text-[#C6A15B] text-xs font-bold uppercase tracking-wider border border-[#E8E6E1]">
              <Paintbrush className="w-3.5 h-3.5" />
              <span>Architectural Advisory</span>
            </div>
            <h2 className="text-3xl font-bold font-serif text-[#102A43] leading-snug">
              French Colonial Conservation & Custom Villa Construction
            </h2>
            <p className="text-xs sm:text-sm text-[#52606D] leading-relaxed font-normal">
              Collaborating with certified heritage architects, INTACH consultants, and master artisans to restore French-period lime plaster moldings, Athangudi tiled floors, and teakwood balconies.
            </p>
            <div className="space-y-2.5 pt-2 text-xs text-[#20252B]">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#C6A15B] shrink-0" />
                <span>Heritage building regulatory clearance & structural stability audits</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#C6A15B] shrink-0" />
                <span>Traditional Madras Terrace roof restoration and lime-mortar masonry</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#C6A15B] shrink-0" />
                <span>Turnkey bespoke architectural design for sustainable Auroville-style homes</span>
              </div>
            </div>
            <div className="pt-4">
              <button
                onClick={onOpenInquiryModal}
                className="px-6 py-3.5 rounded-xl bg-[#102A43] hover:bg-[#0B1D30] text-white text-xs font-bold shadow-md transition-all active:scale-98 cursor-pointer"
              >
                Consult Conservation Architect
              </button>
            </div>
          </div>

          <div className="lg:col-span-6 relative rounded-3xl overflow-hidden shadow-lg h-80 sm:h-96 border-4 border-[#F7F5F0]">
            <img
              src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1000&q=85"
              alt="Heritage Conservation"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 text-white text-xs bg-[#102A43]/80 backdrop-blur-md p-3 rounded-xl border border-[#C6A15B]/30">
              <span className="font-bold block text-white">Restoration Project: Rue Suffren Residence</span>
              <span className="text-white/80 text-[11px]">Restored 1890s colonial villa with inner courtyard</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

