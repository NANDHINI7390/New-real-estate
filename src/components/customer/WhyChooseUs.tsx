import React from 'react';
import { ShieldCheck, UserCheck, Banknote, FileCheck, Sparkles } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const features = [
    {
      icon: ShieldCheck,
      title: 'Audited Clear Titles',
      description: 'Every estate undergoes exhaustive 30-year encumbrance search and INTACH / DTCP legal verification.',
    },
    {
      icon: UserCheck,
      title: 'Private Client Concierge',
      description: 'Senior advisors with 20+ years of deep domain authority across French Quarter and ECR corridor.',
    },
    {
      icon: Banknote,
      title: 'Institutional Valuation',
      description: 'Direct owner negotiation, authenticated pricing benchmarks, and zero undisclosed surcharges.',
    },
    {
      icon: FileCheck,
      title: 'White-Glove Handover',
      description: 'Complete registration management, NRI repatriation support, and turnkey architectural concierge.',
    },
  ];

  return (
    <section className="py-20 bg-[#102A43] text-white relative overflow-hidden">
      {/* Decorative ambient subtle overlays */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#C6A15B]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#C6A15B]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 text-[#C6A15B] text-xs font-bold uppercase tracking-wider mb-3 border border-white/15">
            <Sparkles className="w-3.5 h-3.5 text-[#C6A15B]" />
            <span>The Pondicherry Realty Standard</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-serif text-white">
            Why Discerning Investors Choose Us
          </h2>
          <p className="text-sm text-[#E8E6E1]/90 mt-3 leading-relaxed font-normal">
            We provide a discreet, advisory-first approach to acquiring, leasing, and developing prime coastal real estate in Pondicherry.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-sm hover:bg-white/10 hover:border-[#C6A15B]/40 transition-all group"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#0B1D30] text-[#C6A15B] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform border border-[#C6A15B]/30">
                  <Icon className="w-6 h-6 text-[#C6A15B]" />
                </div>
                <h3 className="text-lg font-bold text-white font-serif mb-2">
                  {item.title}
                </h3>
                <p className="text-xs text-[#E8E6E1]/80 leading-relaxed font-normal">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
