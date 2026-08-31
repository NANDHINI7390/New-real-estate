import React, { useState } from 'react';
import { useRealEstate } from '../../context/RealEstateContext';
import {
  Sparkles,
  MapPin,
  Calendar,
  Layers,
  CheckCircle2,
  Phone,
  ShieldCheck,
  Building,
  ArrowRight,
  Award,
} from 'lucide-react';

interface ProjectsViewProps {
  onOpenInquiryModal: (propertyId?: string) => void;
}

export const ProjectsView: React.FC<ProjectsViewProps> = ({
  onOpenInquiryModal,
}) => {
  const { projects, setCustomerPage } = useRealEstate();
  const [selectedCategory, setSelectedCategory] = useState<'ALL' | 'Villas' | 'Apartments' | 'Townships'>('ALL');

  const filteredProjects = projects.filter((p) => {
    if (selectedCategory === 'Villas' && !p.title.toLowerCase().includes('villa') && !p.configurations.toLowerCase().includes('villa')) return false;
    if (selectedCategory === 'Apartments' && !p.title.toLowerCase().includes('tower') && !p.title.toLowerCase().includes('height') && !p.configurations.toLowerCase().includes('bhk')) return false;
    return true;
  });

  return (
    <div className="bg-[#F7F5F0] min-h-screen pb-24 text-[#20252B]">
      {/* Luxury Editorial Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white via-[#F7F5F0] to-[#F7F5F0] pt-16 pb-20 border-b border-[#E8E6E1]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E8E6E1] text-[#C6A15B] text-xs font-bold tracking-wider uppercase mb-5 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#C6A15B]" />
              <span>Master-Planned Developments • RERA Registered</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-serif text-[#102A43] tracking-tight leading-[1.15]">
              New & Signature Master Projects in Pondicherry
            </h1>

            <p className="mt-5 text-base sm:text-lg text-[#52606D] leading-relaxed font-normal">
              Explore master-planned coastal luxury enclaves, high-rise marina towers, and sustainable gated communities with world-class clubhouse amenities across Puducherry and ECR.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                onClick={() => onOpenInquiryModal()}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#102A43] hover:bg-[#0B1D30] text-white text-sm font-semibold shadow-md transition-all hover:shadow-lg active:scale-98 cursor-pointer"
              >
                <span>Download Master Portfolio</span>
                <ArrowRight className="w-4 h-4 text-[#C6A15B]" />
              </button>
              <button
                onClick={() => {
                  setCustomerPage('contact');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-[#F7F5F0] text-[#102A43] border border-[#E8E6E1] text-sm font-semibold shadow-xs transition-all cursor-pointer"
              >
                <span>Schedule VIP Site Tour</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Project Trust Strip */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-white p-6 rounded-3xl border border-[#E8E6E1] shadow-md">
          <div className="flex items-center gap-3.5 p-2">
            <div className="w-11 h-11 rounded-2xl bg-[#F7F5F0] text-[#102A43] flex items-center justify-center shrink-0 border border-[#E8E6E1]">
              <ShieldCheck className="w-6 h-6 text-[#C6A15B]" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#102A43]">100% RERA Compliant</h4>
              <p className="text-[11px] text-[#52606D]">Zero deviation from sanctioned masterplans</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-2 sm:border-l border-[#E8E6E1] sm:pl-6">
            <div className="w-11 h-11 rounded-2xl bg-[#F7F5F0] text-[#102A43] flex items-center justify-center shrink-0 border border-[#E8E6E1]">
              <Award className="w-6 h-6 text-[#C6A15B]" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#102A43]">Grade-A Developers</h4>
              <p className="text-[11px] text-[#52606D]">Pre-vetted developers with proven track records</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-2 sm:border-l border-[#E8E6E1] sm:pl-6">
            <div className="w-11 h-11 rounded-2xl bg-[#F7F5F0] text-[#102A43] flex items-center justify-center shrink-0 border border-[#E8E6E1]">
              <Building className="w-6 h-6 text-[#C6A15B]" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#102A43]">Direct Developer Pricing</h4>
              <p className="text-[11px] text-[#52606D]">Zero brokerage on developer launch bookings</p>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Tabs & Projects Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 space-y-8">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#E8E6E1]">
          <div className="flex items-center gap-2">
            {(['ALL', 'Villas', 'Apartments', 'Townships'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#102A43] text-white shadow-xs'
                    : 'bg-white border border-[#E8E6E1] text-[#52606D] hover:bg-[#F7F5F0]'
                }`}
              >
                {cat === 'ALL' ? 'All Developments' : cat}
              </button>
            ))}
          </div>

          <div className="text-xs text-[#52606D] font-medium">
            Showing <span className="font-bold text-[#102A43]">{filteredProjects.length}</span> Signature Projects
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="bg-white rounded-3xl overflow-hidden border border-[#E8E6E1] shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group luxury-card-hover"
            >
              <div>
                <div className="relative h-64 overflow-hidden bg-[#F7F5F0]">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#102A43]/80 via-transparent to-[#102A43]/20" />

                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#102A43] text-white shadow-sm border border-white/20">
                      {project.status}
                    </span>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <div className="text-2xl font-bold font-serif text-white">{project.priceRange}</div>
                    <div className="text-xs text-[#E8E6E1]">{project.unitsAvailable}</div>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <div>
                    <div className="flex items-center gap-1.5 text-xs text-[#C6A15B] font-semibold mb-1">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{project.location}</span>
                    </div>
                    <h3 className="text-xl font-bold text-[#102A43] font-serif group-hover:text-[#C6A15B] transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-xs text-[#52606D] mt-2 leading-relaxed font-normal">
                      {project.description}
                    </p>
                  </div>

                  {/* Highlights */}
                  {Array.isArray(project.highlights) && project.highlights.length > 0 && (
                    <div className="space-y-1.5 pt-2 border-t border-[#E8E6E1]">
                      {project.highlights.map((h, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-[#52606D]">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#C6A15B] shrink-0" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Specs bar */}
                  <div className="pt-3 border-t border-[#E8E6E1] grid grid-cols-2 gap-2 text-xs text-[#52606D]">
                    <div className="flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5 text-[#C6A15B]" />
                      <span className="font-semibold text-[#102A43]">{project.configurations}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#C6A15B]" />
                      <span>{project.possessionDate}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="p-6 pt-0 flex gap-2">
                <button
                  onClick={() => onOpenInquiryModal(project.id)}
                  className="flex-1 py-3 rounded-xl bg-[#102A43] hover:bg-[#0B1D30] text-white font-bold text-xs shadow-sm transition-all text-center active:scale-98 cursor-pointer"
                >
                  Download Brochure & Pricing
                </button>
                <a
                  href="https://wa.me/919840123456?text=Hi,%20please%20send%20details%20for%20new%20projects."
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 rounded-xl bg-[#F7F5F0] hover:bg-[#E8E6E1] text-[#102A43] transition-colors flex items-center justify-center border border-[#E8E6E1]"
                  title="WhatsApp Project Desk"
                >
                  <Phone className="w-4 h-4 text-[#C6A15B]" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
