import React, { useState } from 'react';
import { Phone, MessageSquare, Calendar, Sparkles, Send, CheckCircle2, ShieldCheck } from 'lucide-react';
import { useRealEstate } from '../../context/RealEstateContext';

interface CTASectionProps {
  onOpenScheduleModal: () => void;
  onOpenInquiryModal: () => void;
}

export const CTASection: React.FC<CTASectionProps> = ({
  onOpenScheduleModal,
  onOpenInquiryModal,
}) => {
  const { submitInquiry } = useRealEstate();
  const [leadName, setLeadName] = useState('');
  const [leadPhone, setLeadPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleLeadCapture = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadPhone.trim()) return;
    submitInquiry({
      customerName: leadName || 'VIP Private Investor',
      phone: leadPhone,
      email: 'investor@privaterealty.in',
      propertyTitle: 'Private Off-Market Listings Portfolio Access',
      propertyType: 'Villa',
      listingType: 'BUY',
      budget: 'Above ₹ 1.5 Cr',
      message: 'Client requested private access to off-market Pondicherry luxury villas & beachfront estates.',
    });
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setLeadName('');
      setLeadPhone('');
    }, 4000);
  };

  return (
    <section className="py-16 md:py-24 bg-[#102A43] text-white relative overflow-hidden">
      {/* Background subtle luxury glow */}
      <div className="absolute -right-10 -bottom-10 w-96 h-96 bg-[#C6A15B]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -left-10 -top-10 w-96 h-96 bg-[#C6A15B]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-[#0B1D30] border border-white/10 rounded-3xl p-8 sm:p-12 backdrop-blur-md shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Narrative */}
            <div className="lg:col-span-7 text-center lg:text-left">
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 text-[#C6A15B] text-xs font-bold uppercase tracking-wider mb-3 border border-white/15">
                <Sparkles className="w-3.5 h-3.5 text-[#C6A15B]" />
                <span>Private Off-Market Concierge</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif text-white leading-tight">
                Unlock Pondicherry's Discreet Off-Market Residences
              </h2>
              <p className="text-sm text-[#E8E6E1]/90 mt-3 leading-relaxed font-normal max-w-xl">
                Not all prestigious properties are publicly listed. Connect with our principal advisors for exclusive access to heritage estates, private beach plots, and institutional developer rates.
              </p>

              <div className="mt-6 flex flex-wrap items-center justify-center lg:justify-start gap-4">
                <button
                  onClick={onOpenScheduleModal}
                  className="px-6 py-3.5 rounded-xl bg-[#C6A15B] hover:bg-[#b5914a] text-[#102A43] font-bold text-xs sm:text-sm shadow-xl hover:shadow-2xl transition-all flex items-center gap-2 active:scale-98 cursor-pointer"
                >
                  <Calendar className="w-4 h-4 text-[#102A43]" />
                  <span>Book Private Viewing</span>
                </button>

                <a
                  href="https://wa.me/919840123456?text=Hello%20Pondicherry%20Realty,%20I%20am%20interested%20in%20exclusive%20properties"
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-3.5 rounded-xl bg-[#25D366]/20 hover:bg-[#25D366]/30 text-emerald-300 border border-[#25D366]/40 font-semibold text-xs sm:text-sm transition-all flex items-center gap-2"
                >
                  <Phone className="w-4 h-4" />
                  <span>Direct WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Right Lead Capture Box */}
            <div className="lg:col-span-5 bg-[#102A43] p-6 sm:p-7 rounded-3xl border border-white/10">
              <h3 className="text-lg font-bold font-serif text-white mb-1">
                Request Private VIP Dossier
              </h3>
              <p className="text-xs text-[#E8E6E1]/80 mb-4 font-normal">
                Receive pricing, floor plans, and verified title reports instantly.
              </p>

              <form onSubmit={handleLeadCapture} className="space-y-3">
                <div>
                  <label className="block text-[11px] font-semibold text-[#E8E6E1] uppercase tracking-wider mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="E.g. Arvind Swaminathan"
                    value={leadName}
                    onChange={(e) => setLeadName(e.target.value)}
                    className="w-full bg-[#0B1D30] border border-[#E8E6E1]/30 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-[#E8E6E1]/40 focus:outline-hidden focus:border-[#C6A15B]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-[#E8E6E1] uppercase tracking-wider mb-1">
                    WhatsApp / Contact Number
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98400 00000"
                    value={leadPhone}
                    onChange={(e) => setLeadPhone(e.target.value)}
                    className="w-full bg-[#0B1D30] border border-[#E8E6E1]/30 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-[#E8E6E1]/40 focus:outline-hidden focus:border-[#C6A15B]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitted}
                  className="w-full py-3.5 rounded-xl bg-[#C6A15B] hover:bg-[#b5914a] text-[#102A43] font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition-all active:scale-98 cursor-pointer"
                >
                  {submitted ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-800" />
                      <span className="text-emerald-950 font-bold">Portfolio Sent to WhatsApp!</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 text-[#102A43]" />
                      <span>Receive Off-Market Catalog</span>
                    </>
                  )}
                </button>
              </form>

              <div className="mt-3 flex items-center justify-center gap-1.5 text-[10px] text-[#E8E6E1]/70">
                <ShieldCheck className="w-3.5 h-3.5 text-[#C6A15B]" />
                <span>Confidential advisory • Zero spam guarantee</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
