import React from 'react';
import { useRealEstate } from '../../context/RealEstateContext';
import { Phone, Mail, Star } from 'lucide-react';

export const AdminAgentsTab: React.FC = () => {
  const { agents } = useRealEstate();

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto text-[#20252B]">
      <div className="bg-white rounded-3xl border border-[#E8E6E1] p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold font-serif text-[#102A43]">
            Property Advisory Team
          </h2>
          <p className="text-xs text-[#52606D] font-normal">
            Manage agents, commissions, active assigned listings, and customer ratings
          </p>
        </div>
        <div className="text-xs font-bold text-[#102A43] bg-[#F7F5F0] border border-[#E8E6E1] px-3 py-1.5 rounded-xl self-start sm:self-auto">
          {agents.length} Senior Advisors Active
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {agents.map((agent) => (
          <div
            key={agent.id}
            className="bg-white rounded-3xl border border-[#E8E6E1] p-6 shadow-xs flex flex-col justify-between space-y-6"
          >
            <div>
              <div className="flex items-center gap-4">
                <img
                  src={agent.photo}
                  alt={agent.name}
                  className="w-16 h-16 rounded-2xl object-cover border-2 border-[#C6A15B]"
                />
                <div>
                  <h3 className="text-base font-bold font-serif text-[#102A43]">
                    {agent.name}
                  </h3>
                  <p className="text-xs text-[#52606D]">{agent.role}</p>
                  <div className="flex items-center gap-1 text-xs text-[#C6A15B] mt-1">
                    <Star className="w-3.5 h-3.5 fill-[#C6A15B] text-[#C6A15B]" />
                    <span className="font-bold text-[#102A43]">{agent.rating}</span>
                    <span className="text-[#52606D]">({agent.reviewsCount} reviews)</span>
                  </div>
                </div>
              </div>

              <p className="text-xs text-[#52606D] italic mt-4 leading-relaxed font-normal">
                "{agent.bio}"
              </p>

              <div className="mt-4 pt-4 border-t border-[#E8E6E1] space-y-2 text-xs">
                <div className="flex justify-between text-[#52606D]">
                  <span className="text-[#52606D]">Experience:</span>
                  <span className="font-bold text-[#102A43]">{agent.experience}</span>
                </div>
                <div className="flex justify-between text-[#52606D]">
                  <span className="text-[#52606D]">Deals Closed:</span>
                  <span className="font-bold text-[#102A43]">{agent.dealsClosed}+ Properties</span>
                </div>
                <div className="flex justify-between text-[#52606D]">
                  <span className="text-[#52606D]">Languages:</span>
                  <span className="font-semibold text-[#102A43]">
                    {(agent.languages || ['English', 'Tamil', 'French']).join(', ')}
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#E8E6E1] flex gap-2">
              <a
                href={`tel:${agent.phone.replace(/\s+/g, '')}`}
                className="flex-1 py-2.5 rounded-xl border border-[#E8E6E1] hover:bg-[#F7F5F0] text-[#102A43] text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <Phone className="w-3.5 h-3.5 text-[#C6A15B]" />
                <span>Call Advisor</span>
              </a>
              <a
                href={`mailto:${agent.email}`}
                className="flex-1 py-2.5 rounded-xl bg-[#102A43] hover:bg-[#0B1D30] text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <Mail className="w-3.5 h-3.5 text-[#C6A15B]" />
                <span>Email</span>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
