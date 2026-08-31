import React, { useState } from 'react';
import { useRealEstate } from '../../context/RealEstateContext';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  Sparkles,
  CheckCircle2,
  ShieldCheck,
} from 'lucide-react';

export const ContactView: React.FC = () => {
  const { submitInquiry, showToast } = useRealEstate();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [inquiryType, setInquiryType] = useState<'BUY' | 'RENT' | 'SELL' | 'NRI_CARE' | 'LEGAL'>('BUY');
  const [budget, setBudget] = useState('₹1.5 Cr – ₹3.5 Cr');
  const [preferredLocation, setPreferredLocation] = useState('White Town');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !email) {
      showToast('Missing Details', 'Please provide your name, phone number, and email address.', 'warning');
      return;
    }

    submitInquiry({
      customerName: name,
      phone,
      email,
      propertyId: 'general-inquiry',
      propertyTitle: `Direct Advisory Request: ${inquiryType} in ${preferredLocation}`,
      listingType: inquiryType === 'RENT' ? 'RENT' : 'BUY',
      budget,
      preferredDate: new Date().toISOString().split('T')[0],
      preferredTime: 'Immediate',
      message: `Inquiry Type: ${inquiryType} | Locality: ${preferredLocation} | Budget: ${budget}\n\nClient Note: ${message}`,
    });

    setSubmitted(true);
    showToast('Inquiry Dispatched', 'Thank you! A senior property concierge will connect with you within 2 business hours.', 'success');
  };

  return (
    <div className="bg-[#F7F5F0] min-h-screen pb-24 text-[#20252B]">
      {/* Editorial Contact Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white via-[#F7F5F0] to-[#F7F5F0] pt-16 pb-20 border-b border-[#E8E6E1]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E8E6E1] text-[#C6A15B] text-xs font-bold tracking-wider uppercase mb-5 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#C6A15B]" />
              <span>Private Client Concierge</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-serif text-[#102A43] tracking-tight leading-[1.15]">
              Let’s Discuss Your Pondicherry Real Estate Portfolio
            </h1>

            <p className="mt-5 text-base sm:text-lg text-[#52606D] leading-relaxed font-normal">
              Whether you are acquiring a French heritage villa, securing an NRI asset management mandate, or seeking bespoke developer joint-ventures, our advisory desk is at your service.
            </p>
          </div>
        </div>
      </section>

      {/* Main Form & Office Hub */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Interactive Contact Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-10 border border-[#E8E6E1] shadow-xs">
            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-[#F7F5F0] text-[#102A43] flex items-center justify-center mx-auto shadow-xs border border-[#E8E6E1]">
                  <CheckCircle2 className="w-8 h-8 text-[#C6A15B]" />
                </div>
                <h3 className="text-2xl font-bold font-serif text-[#102A43]">
                  Inquiry Successfully Received
                </h3>
                <p className="text-sm text-[#52606D] max-w-md mx-auto leading-relaxed font-normal">
                  Thank you, <span className="font-bold text-[#102A43]">{name}</span>. Your request has been routed to our senior advisory desk. A dedicated relationship manager will reach out to you at <span className="font-semibold text-[#102A43]">{phone}</span> shortly.
                </p>
                <div className="pt-4">
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setName('');
                      setPhone('');
                      setEmail('');
                      setMessage('');
                    }}
                    className="px-6 py-2.5 rounded-xl bg-[#102A43] hover:bg-[#0B1D30] text-white text-xs font-semibold cursor-pointer"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold font-serif text-[#102A43]">Send Us an Inquiry</h3>
                  <p className="text-xs text-[#52606D] mt-1 font-normal">
                    Fill out the parameters below and our specialist for that locality will respond with verified listings.
                  </p>
                </div>

                {/* Service Type Selector */}
                <div>
                  <label className="block text-xs font-bold text-[#102A43] uppercase tracking-wider mb-2">
                    I am interested in
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {[
                      { id: 'BUY', label: 'Buying Property' },
                      { id: 'RENT', label: 'Renting / Lease' },
                      { id: 'SELL', label: 'Selling / Listing' },
                      { id: 'NRI_CARE', label: 'NRI Property Care' },
                      { id: 'LEGAL', label: 'Legal Due Diligence' },
                    ].map((item) => (
                      <button
                        type="button"
                        key={item.id}
                        onClick={() => setInquiryType(item.id as any)}
                        className={`py-2.5 px-3 rounded-xl text-xs font-semibold border transition-all text-center cursor-pointer ${
                          inquiryType === item.id
                            ? 'bg-[#102A43] text-white border-[#102A43] shadow-xs'
                            : 'bg-[#F7F5F0] text-[#52606D] border-[#E8E6E1] hover:border-[#C6A15B]'
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#102A43] mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Anandha Rangapillai"
                      className="w-full px-4 py-3 rounded-xl bg-[#F7F5F0] border border-[#E8E6E1] focus:border-[#C6A15B] focus:bg-white focus:outline-hidden text-sm text-[#20252B]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#102A43] mb-1.5">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full px-4 py-3 rounded-xl bg-[#F7F5F0] border border-[#E8E6E1] focus:border-[#C6A15B] focus:bg-white focus:outline-hidden text-sm text-[#20252B]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#102A43] mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="client@domain.com"
                      className="w-full px-4 py-3 rounded-xl bg-[#F7F5F0] border border-[#E8E6E1] focus:border-[#C6A15B] focus:bg-white focus:outline-hidden text-sm text-[#20252B]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#102A43] mb-1.5">
                      Target Locality
                    </label>
                    <select
                      value={preferredLocation}
                      onChange={(e) => setPreferredLocation(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-[#F7F5F0] border border-[#E8E6E1] focus:border-[#C6A15B] focus:bg-white focus:outline-hidden text-sm text-[#20252B]"
                    >
                      <option value="White Town">White Town (French Quarter)</option>
                      <option value="ECR Coastal Belt">ECR Coastal Belt</option>
                      <option value="Auroville Vicinity">Auroville Vicinity</option>
                      <option value="Heritage Quarter">Heritage Tamil Quarter</option>
                      <option value="Lawspet">Lawspet</option>
                      <option value="Muthialpet">Muthialpet</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#102A43] mb-1.5">
                    Estimated Investment / Rental Budget
                  </label>
                  <select
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-[#F7F5F0] border border-[#E8E6E1] focus:border-[#C6A15B] focus:bg-white focus:outline-hidden text-sm text-[#20252B]"
                  >
                    <option value="₹40 L – ₹75 L">₹40 L – ₹75 L (Apartments / Plots)</option>
                    <option value="₹75 L – ₹1.5 Cr">₹75 L – ₹1.5 Cr (Independent Houses / Luxury 3BHK)</option>
                    <option value="₹1.5 Cr – ₹3.5 Cr">₹1.5 Cr – ₹3.5 Cr (Gated Villas / Sea Breeze)</option>
                    <option value="₹3.5 Cr – ₹10 Cr+">₹3.5 Cr – ₹10 Cr+ (French Colonial Heritage Mansions)</option>
                    <option value="₹25k – ₹60k / mo">₹25k – ₹60k / mo (Premium Rental)</option>
                    <option value="₹60k – ₹1.5L / mo">₹60k – ₹1.5L / mo (Luxury Villa Lease)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#102A43] mb-1.5">
                    Your Requirements & Details
                  </label>
                  <textarea
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Provide any specific preferences (e.g., east facing, swimming pool, French courtyard, immediate possession, high rental yield)..."
                    className="w-full px-4 py-3 rounded-xl bg-[#F7F5F0] border border-[#E8E6E1] focus:border-[#C6A15B] focus:bg-white focus:outline-hidden text-sm resize-none text-[#20252B]"
                  />
                </div>

                <div className="flex items-center gap-3 text-xs text-[#52606D]">
                  <ShieldCheck className="w-4 h-4 text-[#C6A15B] shrink-0" />
                  <span>Strict confidentiality. Your data is never shared with third-party brokers.</span>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-[#102A43] hover:bg-[#0B1D30] text-white text-sm font-semibold shadow-md transition-all flex items-center justify-center gap-2 active:scale-98 cursor-pointer"
                >
                  <Send className="w-4 h-4 text-[#C6A15B]" />
                  <span>Submit Advisory Request</span>
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Office Details, Direct Concierge & Map */}
          <div className="lg:col-span-5 space-y-6">
            {/* Primary Headquarters */}
            <div className="bg-white rounded-3xl p-8 border border-[#E8E6E1] shadow-xs space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[#C6A15B]">Headquarters</span>
                <span className="px-2.5 py-0.5 rounded-full bg-[#F7F5F0] text-[#102A43] text-[11px] font-bold border border-[#E8E6E1]">
                  White Town Flagship
                </span>
              </div>

              <div className="space-y-4 text-xs text-[#52606D]">
                <div className="flex items-start gap-3.5">
                  <MapPin className="w-5 h-5 text-[#C6A15B] shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-bold text-[#102A43] text-sm font-serif">Pondicherry Realty Private Limited</h5>
                    <p className="mt-0.5 leading-relaxed font-normal">
                      No. 42, Rue Romain Rolland, French Quarter (White Town), Puducherry – 605001, India.
                    </p>
                    <p className="text-[11px] text-[#52606D] mt-1">Landmark: Adjacent to Alliance Française</p>
                  </div>
                </div>

                <div className="flex items-center gap-3.5">
                  <Phone className="w-5 h-5 text-[#C6A15B] shrink-0" />
                  <div>
                    <span className="block text-[#52606D] text-[11px]">Direct Concierge</span>
                    <a href="tel:+914132228900" className="font-bold text-[#102A43] text-sm hover:underline">
                      +91 (413) 222-8900 / +91 98401 23456
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3.5">
                  <Mail className="w-5 h-5 text-[#C6A15B] shrink-0" />
                  <div>
                    <span className="block text-[#52606D] text-[11px]">Advisory Email</span>
                    <a href="mailto:advisory@pondicherryrealty.com" className="font-bold text-[#102A43] text-sm hover:underline">
                      advisory@pondicherryrealty.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3.5">
                  <Clock className="w-5 h-5 text-[#C6A15B] shrink-0" />
                  <div>
                    <span className="block text-[#52606D] text-[11px]">Visiting Hours</span>
                    <span className="font-bold text-[#102A43]">
                      Mon – Sat: 9:00 AM – 7:30 PM (IST)
                    </span>
                    <span className="block text-[#52606D] text-[11px]">Sunday: By prior private appointment</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Coastal Branch Office */}
            <div className="bg-[#F7F5F0] rounded-3xl p-6 border border-[#E8E6E1] space-y-3">
              <div className="flex items-center justify-between">
                <h5 className="font-bold font-serif text-[#102A43] text-sm">ECR Coastal Experience Center</h5>
                <span className="text-[11px] font-bold text-[#102A43] bg-white px-2.5 py-0.5 rounded-md border border-[#E8E6E1]">
                  Site Hub
                </span>
              </div>
              <p className="text-xs text-[#52606D] leading-relaxed font-normal">
                KM 14, East Coast Road, Chinna Mudaliyar Chavady, Puducherry – 605104. Dedicated to coastal villas, gated beachside communities, and Auroville residential corridors.
              </p>
            </div>

            {/* Quick Action Concierge Card */}
            <div className="bg-[#102A43] text-white rounded-3xl p-6 shadow-md space-y-4 border border-white/10">
              <h5 className="font-bold font-serif text-lg text-white">Need Immediate Assistance?</h5>
              <p className="text-xs text-[#E8E6E1]/80 leading-relaxed font-normal">
                Connect directly with our senior property consultant over WhatsApp or phone for instant property catalogues and video tour links.
              </p>
              <div className="flex gap-3 pt-2">
                <a
                  href="https://wa.me/919840123456?text=Hello%20Pondicherry%20Realty,%20I%20would%20like%20to%20inquire%20about%20luxury%20properties"
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 py-2.5 rounded-xl bg-[#0B1D30] hover:bg-black text-[#C6A15B] text-xs font-bold text-center border border-[#C6A15B]/30 transition-colors"
                >
                  WhatsApp Concierge
                </a>
                <a
                  href="tel:+919840123456"
                  className="flex-1 py-2.5 rounded-xl bg-[#C6A15B] text-[#102A43] hover:bg-[#b5914a] text-xs font-bold text-center transition-colors"
                >
                  Direct Call
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
