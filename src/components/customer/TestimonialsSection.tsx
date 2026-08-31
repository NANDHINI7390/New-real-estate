import React from 'react';
import { Star, Quote } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const testimonials = [
    {
      quote:
        'Pondicherry Realty made acquiring our French Quarter heritage residence completely effortless. From deep 30-year title searches to INTACH conservation clearances, their team managed every detail with absolute precision.',
      author: 'Dr. Subramanian & Malathi',
      role: 'Owners, White Town Colonial Villa',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    },
    {
      quote:
        'As an NRI based in Singapore, remote management of prime coastal assets used to be challenging. Pondicherry Realty provides full-spectrum portfolio oversight, tenant screening, and periodic drone reports.',
      author: 'Jean-Pierre Renaud',
      role: 'Expat Investor, ECR Coastal Penthouse',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    },
    {
      quote:
        'We found our modern sea-facing apartment along Pondy Marina in less than ten days. Their market intelligence reports and valuation tool accurately predicted current appreciation.',
      author: 'Kavitha Ramachandran',
      role: 'Resident, Azure Marina Horizon',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-white border-t border-[#E8E6E1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#102A43] font-serif">
            Endorsed by Discerning Homeowners
          </h2>
          <p className="text-sm text-[#52606D] mt-2 font-normal">
            Read firsthand experiences from homeowners, expats, and investors who placed their trust in our advisory.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item, idx) => (
            <div
              key={idx}
              className="bg-[#F7F5F0] border border-[#E8E6E1] rounded-3xl p-8 shadow-xs hover:shadow-md transition-all flex flex-col justify-between luxury-card-hover"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-[#C6A15B]">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#C6A15B]" />
                    ))}
                  </div>
                  <Quote className="w-8 h-8 text-[#C6A15B]/30" />
                </div>
                <p className="text-sm text-[#20252B] leading-relaxed italic font-normal">
                  "{item.quote}"
                </p>
              </div>

              <div className="mt-6 pt-6 border-t border-[#E8E6E1] flex items-center gap-3">
                <img
                  src={item.avatar}
                  alt={item.author}
                  className="w-11 h-11 rounded-full object-cover border border-[#E8E6E1]"
                />
                <div>
                  <h4 className="text-sm font-bold text-[#102A43] font-serif">
                    {item.author}
                  </h4>
                  <p className="text-xs text-[#52606D]">{item.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
