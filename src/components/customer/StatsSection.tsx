import React from 'react';
import { Building, Users, Award, ShieldCheck } from 'lucide-react';

export const StatsSection: React.FC = () => {
  const stats = [
    {
      icon: Building,
      value: '500+',
      label: 'Verified Luxury Properties',
      subtext: 'Across Pondicherry & ECR Coast',
    },
    {
      icon: Users,
      value: '1,200+',
      label: 'Discerning Families & NRIs',
      subtext: 'Delighted luxury homeowners',
    },
    {
      icon: Award,
      value: '20+ Yrs',
      label: 'Heritage Realty Advisory',
      subtext: 'Unmatched local market authority',
    },
    {
      icon: ShieldCheck,
      value: '100%',
      label: 'Clear-Title Guarantee',
      subtext: 'RERA & Sub-Registrar audited',
    },
  ];

  return (
    <section className="py-14 bg-white border-y border-[#E8E6E1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="flex flex-col items-center text-center p-5 rounded-2xl hover:bg-[#F7F5F0] transition-colors border border-transparent hover:border-[#E8E6E1]"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#F7F5F0] text-[#102A43] flex items-center justify-center mb-3 border border-[#E8E6E1]">
                  <Icon className="w-6 h-6 text-[#C6A15B]" />
                </div>
                <div className="text-3xl sm:text-4xl font-bold text-[#102A43] font-serif tracking-tight">
                  {stat.value}
                </div>
                <div className="text-sm font-bold text-[#20252B] mt-1">
                  {stat.label}
                </div>
                <div className="text-xs text-[#52606D] mt-0.5 font-normal">
                  {stat.subtext}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
