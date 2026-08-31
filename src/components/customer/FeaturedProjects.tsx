import React from 'react';
import { useRealEstate } from '../../context/RealEstateContext';
import { Sparkles, MapPin, Calendar, Layers, ArrowUpRight } from 'lucide-react';

export const FeaturedProjects: React.FC = () => {
  const { projects, setCustomerPage } = useRealEstate();

  return (
    <section className="py-16 md:py-24 bg-[#F7F5F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white text-[#C6A15B] text-xs font-bold uppercase tracking-wider mb-2 border border-[#E8E6E1] shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#C6A15B]" />
              <span>Signature Developments</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#102A43] font-serif">
              Featured New Master Projects
            </h2>
            <p className="text-sm text-[#52606D] mt-2 max-w-xl font-normal">
              Master-planned beachfront communities and sustainable developments shaping Pondicherry’s luxury architectural future.
            </p>
          </div>

          <button
            onClick={() => {
              setCustomerPage('projects');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 text-sm font-bold text-[#102A43] hover:text-[#C6A15B] transition-colors cursor-pointer"
          >
            <span>View All Projects</span>
            <ArrowUpRight className="w-4 h-4 text-[#C6A15B]" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              onClick={() => {
                setCustomerPage('projects');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="bg-white rounded-3xl overflow-hidden border border-[#E8E6E1] shadow-xs hover:shadow-xl transition-all duration-300 group cursor-pointer flex flex-col luxury-card-hover"
            >
              <div className="relative h-64 overflow-hidden bg-[#F7F5F0]">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#102A43]/85 via-transparent to-[#102A43]/20" />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#102A43] text-white shadow-xs uppercase tracking-wider border border-[#C6A15B]/50">
                    {project.status}
                  </span>
                </div>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="text-xl font-bold font-serif text-white">{project.priceRange}</div>
                  <div className="text-xs text-[#E8E6E1]/90">{project.unitsAvailable}</div>
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1.5 text-xs text-[#C6A15B] font-semibold mb-1">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{project.location}</span>
                  </div>
                  <h3 className="text-lg font-bold text-[#102A43] group-hover:text-[#C6A15B] transition-colors font-serif">
                    {project.title}
                  </h3>
                  <p className="text-xs text-[#52606D] mt-2 line-clamp-2 leading-relaxed font-normal">
                    {project.description}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-[#E8E6E1] flex items-center justify-between text-xs text-[#52606D]">
                  <div className="flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-[#52606D]" />
                    <span className="font-semibold text-[#20252B]">{project.configurations}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#52606D]" />
                    <span>{project.possessionDate}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
