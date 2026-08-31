import React from 'react';
import { useRealEstate } from '../../context/RealEstateContext';
import {
  Award,
  ShieldCheck,
  Building2,
  Compass,
  Sparkles,
  FileCheck,
  HeartHandshake,
  ArrowRight,
} from 'lucide-react';

export const AboutView: React.FC = () => {
  const { agents, setCustomerPage } = useRealEstate();

  return (
    <div className="bg-[#F7F5F0] min-h-screen pb-24 text-[#20252B]">
      {/* Luxury Editorial Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white via-[#F7F5F0] to-[#F7F5F0] pt-16 pb-20 border-b border-[#E8E6E1]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E8E6E1] text-[#C6A15B] text-xs font-bold tracking-wider uppercase mb-5 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#C6A15B]" />
              <span>Est. 2004 • Puducherry, India</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-serif text-[#102A43] tracking-tight leading-[1.15]">
              Curating Pondicherry’s Most Distinguished Addresses
            </h1>

            <p className="mt-5 text-base sm:text-lg text-[#52606D] leading-relaxed font-normal">
              For over two decades, Pondicherry Realty has bridged French colonial architectural heritage with contemporary coastal luxury, providing discerning buyers, NRIs, and investors with unmatched legal certainty and bespoke advisory.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                onClick={() => {
                  setCustomerPage('properties');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#102A43] hover:bg-[#0B1D30] text-white text-sm font-semibold shadow-md transition-all hover:shadow-lg active:scale-98 cursor-pointer"
              >
                <span>Explore Our Portfolio</span>
                <ArrowRight className="w-4 h-4 text-[#C6A15B]" />
              </button>
              <button
                onClick={() => {
                  setCustomerPage('contact');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-[#F7F5F0] text-[#102A43] border border-[#E8E6E1] text-sm font-semibold shadow-xs transition-all cursor-pointer"
              >
                <span>Connect with Leadership</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Legacy & Numbers Band */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 bg-white p-6 sm:p-8 rounded-3xl border border-[#E8E6E1] shadow-md">
          <div className="p-4 rounded-2xl bg-[#F7F5F0] border border-[#E8E6E1]">
            <div className="text-3xl sm:text-4xl font-bold font-serif text-[#102A43]">20+</div>
            <div className="text-xs sm:text-sm font-bold text-[#102A43] mt-1">Years of Excellence</div>
            <p className="text-[11px] text-[#52606D] mt-0.5 font-normal">Founded in White Town, 2004</p>
          </div>
          <div className="p-4 rounded-2xl bg-[#F7F5F0] border border-[#E8E6E1]">
            <div className="text-3xl sm:text-4xl font-bold font-serif text-[#102A43]">₹650+ Cr</div>
            <div className="text-xs sm:text-sm font-bold text-[#102A43] mt-1">Assets Transacted</div>
            <p className="text-[11px] text-[#52606D] mt-0.5 font-normal">Across coastal & heritage zones</p>
          </div>
          <div className="p-4 rounded-2xl bg-[#F7F5F0] border border-[#E8E6E1]">
            <div className="text-3xl sm:text-4xl font-bold font-serif text-[#102A43]">1,200+</div>
            <div className="text-xs sm:text-sm font-bold text-[#102A43] mt-1">Satisfied Families</div>
            <p className="text-[11px] text-[#52606D] mt-0.5 font-normal">Homeowners, NRIs & Investors</p>
          </div>
          <div className="p-4 rounded-2xl bg-[#F7F5F0] border border-[#E8E6E1]">
            <div className="text-3xl sm:text-4xl font-bold font-serif text-[#102A43]">100%</div>
            <div className="text-xs sm:text-sm font-bold text-[#102A43] mt-1">RERA & Title Verified</div>
            <p className="text-[11px] text-[#52606D] mt-0.5 font-normal">Zero litigation track record</p>
          </div>
        </div>
      </section>

      {/* Main Story & Heritage */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 space-y-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#C6A15B]">
              <Compass className="w-4 h-4 text-[#C6A15B]" />
              <span>Our Story & Philosophy</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl font-bold font-serif text-[#102A43] leading-tight">
              Where French Colonial Grandeur Meets Pristine Coastal Living
            </h2>

            <p className="text-sm text-[#52606D] leading-relaxed font-normal">
              Pondicherry occupies a singular place in the Indian subcontinent. Its cobblestone promenades, Franco-Tamil architecture, vibrant bougainvillea courtyards, and spiritual resonance create an enviable quality of life.
            </p>

            <p className="text-sm text-[#52606D] leading-relaxed font-normal">
              We started with a pledge: to protect the architectural sanctity of heritage properties while pioneering modern, sustainable luxury villas along the East Coast Road (ECR). Today, Pondicherry Realty is the benchmark for ethical property transactions, offering end-to-end guidance from title clearance to architectural conservation.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-white border border-[#E8E6E1] flex items-start gap-3.5 shadow-xs">
                <ShieldCheck className="w-5 h-5 text-[#C6A15B] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-[#102A43]">Legal Due Diligence</h4>
                  <p className="text-xs text-[#52606D] mt-0.5 font-normal">30-year search report & parent document verification on every listing.</p>
                </div>
              </div>
              <div className="p-4 rounded-2xl bg-white border border-[#E8E6E1] flex items-start gap-3.5 shadow-xs">
                <Building2 className="w-5 h-5 text-[#C6A15B] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-[#102A43]">Heritage Preservation</h4>
                  <p className="text-xs text-[#52606D] mt-0.5 font-normal">Specialist architects preserving lime-plaster and Chettinad woodwork.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-xl border-4 border-white">
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=85"
                alt="Pondicherry Heritage Courtyard"
                className="w-full h-[460px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#102A43]/70 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="px-3 py-1 rounded-full bg-[#102A43]/90 text-[#C6A15B] text-xs font-semibold backdrop-blur-xs border border-[#C6A15B]/30">
                  White Town Architectural Restoration
                </span>
                <p className="text-sm font-serif mt-2 text-white">
                  “A rare fusion of 18th-century French balustrades and contemporary sea-view luxury.”
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Core Pillars */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#E8E6E1] shadow-xs">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-[#C6A15B]">The Pillars of Trust</span>
            <h3 className="text-3xl font-bold font-serif text-[#102A43] mt-2">Why Discerning Buyers Choose Us</h3>
            <p className="text-xs sm:text-sm text-[#52606D] mt-2">
              Our operating standards exceed traditional agency practices through three core commitments.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#F7F5F0] p-6 sm:p-8 rounded-3xl border border-[#E8E6E1] shadow-xs hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-2xl bg-white text-[#102A43] flex items-center justify-center mb-5 border border-[#E8E6E1]">
                <FileCheck className="w-6 h-6 text-[#C6A15B]" />
              </div>
              <h4 className="text-lg font-bold font-serif text-[#102A43] mb-2">Zero Ambiguity Title</h4>
              <p className="text-xs text-[#52606D] leading-relaxed font-normal">
                Every listed property undergoes rigorous scrutiny by our empaneled High Court advocates. We never list properties with encumbrances, family partition disputes, or pending municipal notices.
              </p>
            </div>

            <div className="bg-[#F7F5F0] p-6 sm:p-8 rounded-3xl border border-[#E8E6E1] shadow-xs hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-2xl bg-white text-[#102A43] flex items-center justify-center mb-5 border border-[#E8E6E1]">
                <HeartHandshake className="w-6 h-6 text-[#C6A15B]" />
              </div>
              <h4 className="text-lg font-bold font-serif text-[#102A43] mb-2">Direct NRI & Expat Desk</h4>
              <p className="text-xs text-[#52606D] leading-relaxed font-normal">
                Providing specialized Power of Attorney (PoA) facilitation, NRE/NRO banking liaison, remote video walk-throughs, and quarterly asset maintenance for clients residing worldwide.
              </p>
            </div>

            <div className="bg-[#F7F5F0] p-6 sm:p-8 rounded-3xl border border-[#E8E6E1] shadow-xs hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-2xl bg-white text-[#102A43] flex items-center justify-center mb-5 border border-[#E8E6E1]">
                <Award className="w-6 h-6 text-[#C6A15B]" />
              </div>
              <h4 className="text-lg font-bold font-serif text-[#102A43] mb-2">Fair Value Valuation</h4>
              <p className="text-xs text-[#52606D] leading-relaxed font-normal">
                Real-time market analytics and registered government valuer appraisal ensure you acquire at genuine fair market pricing without artificial broker inflation.
              </p>
            </div>
          </div>
        </div>

        {/* Advisory Leadership Team */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#C6A15B]">Certified Specialists</span>
              <h3 className="text-3xl font-bold font-serif text-[#102A43] mt-1">Meet Our Senior Property Advisors</h3>
              <p className="text-xs sm:text-sm text-[#52606D] mt-1 font-normal">
                Licensed real estate professionals with deep roots in Puducherry's real estate ecosystem.
              </p>
            </div>
            <button
              onClick={() => {
                setCustomerPage('contact');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 text-xs font-bold text-[#102A43] hover:text-[#C6A15B] underline cursor-pointer"
            >
              <span>Schedule Direct Consultation</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {agents.map((agent) => (
              <div
                key={agent.id}
                className="bg-white rounded-3xl border border-[#E8E6E1] overflow-hidden shadow-xs hover:shadow-md transition-all group luxury-card-hover"
              >
                <div className="h-64 overflow-hidden relative">
                  <img
                    src={agent.photo}
                    alt={agent.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-xs text-[#102A43] text-[11px] font-bold shadow-xs border border-[#E8E6E1]">
                    ★ {agent.rating} ({agent.reviewsCount})
                  </div>
                </div>
                <div className="p-5">
                  <h4 className="font-bold font-serif text-[#102A43] text-base">{agent.name}</h4>
                  <p className="text-xs text-[#C6A15B] font-semibold">{agent.role}</p>
                  <p className="text-xs text-[#52606D] mt-2 line-clamp-2 font-normal">{agent.bio}</p>
                  <div className="mt-4 pt-3 border-t border-[#E8E6E1] flex items-center justify-between text-xs text-[#52606D]">
                    <span>{agent.experience} Exp.</span>
                    <span className="font-bold text-[#102A43]">{agent.dealsClosed}+ Closed</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
