import React, { useState } from 'react';
import { useRealEstate } from '../../context/RealEstateContext';
import { ListingType } from '../../types';
import {
  X,
  CheckCircle2,
  Phone,
  Calendar,
  MessageSquare,
  Sparkles,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPropertyId?: string;
}

export const InquiryModal: React.FC<InquiryModalProps> = ({
  isOpen,
  onClose,
  initialPropertyId,
}) => {
  const {
    properties,
    submitInquiry,
    setViewMode,
    setAdminTab,
  } = useRealEstate();

  const selectedProp = properties.find((p) => p.id === initialPropertyId);

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [propertyId, setPropertyId] = useState(initialPropertyId || properties[0]?.id || '');
  const [listingType, setListingType] = useState<ListingType>(
    selectedProp?.listingType || 'BUY'
  );
  const [budget, setBudget] = useState(selectedProp?.displayPrice || 'Flexible');
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredTime, setPreferredTime] = useState('11:00 AM');
  const [message, setMessage] = useState(
    selectedProp
      ? `I am interested in scheduling a consultation for ${selectedProp.title}. Please provide full legal brochure and floor plans.`
      : 'I am interested in discovering premium properties in Pondicherry.'
  );

  const [submittedRef, setSubmittedRef] = useState<string | null>(null);

  if (!isOpen) return null;

  const currentSelectedProperty = properties.find((p) => p.id === propertyId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !email) return;

    const ref = submitInquiry({
      customerName: name,
      phone,
      email,
      propertyId: currentSelectedProperty?.id || 'general',
      propertyTitle: currentSelectedProperty?.title || 'General Pondicherry Inquiry',
      listingType,
      budget,
      preferredDate,
      preferredTime,
      message,
    });

    setSubmittedRef(ref);
  };

  const handleResetAndClose = () => {
    setSubmittedRef(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-[#E8E6E1] animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="bg-[#102A43] text-white p-6 flex items-center justify-between border-b border-[#C6A15B]/30">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#F7F5F0]/15 text-[#C6A15B] flex items-center justify-center border border-[#C6A15B]/30">
              <MessageSquare className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-lg font-bold font-serif text-white">Property Advisory Inquiry</h3>
              <p className="text-xs text-white/80 font-normal">
                Direct consultation with our senior advisory team
              </p>
            </div>
          </div>
          <button
            onClick={handleResetAndClose}
            className="text-white/70 hover:text-white p-1 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        {submittedRef ? (
          <div className="p-8 text-center space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-[#F7F5F0] text-[#102A43] flex items-center justify-center mx-auto border border-[#E8E6E1]">
              <CheckCircle2 className="w-8 h-8 text-[#C6A15B]" />
            </div>

            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#C6A15B] bg-[#F7F5F0] px-3 py-1 rounded-full border border-[#E8E6E1]">
                Inquiry Successfully Logged
              </span>
              <h4 className="text-2xl font-bold font-serif text-[#102A43] mt-3">
                Reference ID: {submittedRef}
              </h4>
              <p className="text-xs text-[#52606D] mt-2 max-w-sm mx-auto leading-relaxed font-normal">
                Thank you, <span className="font-bold text-[#102A43]">{name}</span>. Our senior property advisor will contact you within 2 hours with verified property papers and visit arrangements.
              </p>
            </div>

            {/* Quick Demo verification link for owner / agent */}
            <div className="bg-[#F7F5F0] p-4 rounded-2xl border border-[#E8E6E1] text-left text-xs space-y-2">
              <div className="flex items-center gap-2 text-[#102A43] font-semibold">
                <Sparkles className="w-4 h-4 text-[#C6A15B]" />
                <span>Real-Time Demo Sync Verified</span>
              </div>
              <p className="text-[#52606D] text-[11px] font-normal">
                This inquiry was instantly synchronized into the Admin Inquiries & Leads CRM pipeline.
              </p>
              <button
                onClick={() => {
                  handleResetAndClose();
                  setViewMode('admin');
                  setAdminTab('inquiries');
                }}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#102A43] hover:text-[#C6A15B] underline pt-1 cursor-pointer"
              >
                <span>View This Lead in Admin Dashboard</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <a
                href={`https://wa.me/919876543210?text=Hi,%20I%20just%20submitted%20inquiry%20Ref:%20${submittedRef}%20for%20${encodeURIComponent(
                  currentSelectedProperty?.title || 'Pondicherry property'
                )}`}
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-3 px-4 rounded-xl bg-[#102A43] hover:bg-[#0B1D30] text-[#C6A15B] font-semibold text-xs flex items-center justify-center gap-2 shadow-2xs transition-colors border border-[#C6A15B]/30"
              >
                <Phone className="w-4 h-4" />
                <span>Instant WhatsApp Chat</span>
              </a>

              <button
                onClick={handleResetAndClose}
                className="py-3 px-6 rounded-xl bg-[#F7F5F0] hover:bg-[#E8E6E1] text-[#102A43] font-semibold text-xs transition-colors border border-[#E8E6E1] cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {/* Property Selector */}
            <div>
              <label className="block text-xs font-semibold text-[#102A43] mb-1">
                Interested Property
              </label>
              <select
                value={propertyId}
                onChange={(e) => {
                  setPropertyId(e.target.value);
                  const p = properties.find((item) => item.id === e.target.value);
                  if (p) {
                    setListingType(p.listingType);
                    setBudget(p.displayPrice);
                  }
                }}
                className="w-full text-xs bg-[#F7F5F0] border border-[#E8E6E1] rounded-xl px-3 py-2.5 text-[#20252B] focus:outline-hidden focus:border-[#C6A15B]"
              >
                {properties.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.title} ({p.displayPrice} - {p.locality})
                  </option>
                ))}
              </select>
            </div>

            {/* Name, Phone, Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-[#102A43] mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Kumar"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full text-xs bg-[#F7F5F0] border border-[#E8E6E1] rounded-xl px-3 py-2.5 text-[#20252B] focus:outline-hidden focus:border-[#C6A15B]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#102A43] mb-1">
                  Phone Number (WhatsApp) *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98412 87654"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full text-xs bg-[#F7F5F0] border border-[#E8E6E1] rounded-xl px-3 py-2.5 text-[#20252B] focus:outline-hidden focus:border-[#C6A15B]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#102A43] mb-1">
                Email Address *
              </label>
              <input
                type="email"
                required
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full text-xs bg-[#F7F5F0] border border-[#E8E6E1] rounded-xl px-3 py-2.5 text-[#20252B] focus:outline-hidden focus:border-[#C6A15B]"
              />
            </div>

            {/* Buy/Rent & Budget */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-[#102A43] mb-1">
                  Purpose
                </label>
                <select
                  value={listingType}
                  onChange={(e) => setListingType(e.target.value as ListingType)}
                  className="w-full text-xs bg-[#F7F5F0] border border-[#E8E6E1] rounded-xl px-3 py-2.5 text-[#20252B] focus:outline-hidden focus:border-[#C6A15B]"
                >
                  <option value="BUY">Buy / Purchase</option>
                  <option value="RENT">Rent / Lease</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#102A43] mb-1">
                  Budget Target
                </label>
                <input
                  type="text"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  placeholder="e.g. ₹ 4.50 Cr"
                  className="w-full text-xs bg-[#F7F5F0] border border-[#E8E6E1] rounded-xl px-3 py-2.5 text-[#20252B] focus:outline-hidden focus:border-[#C6A15B]"
                />
              </div>
            </div>

            {/* Preferred Date & Time */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-[#102A43] mb-1">
                  Preferred Callback Date
                </label>
                <input
                  type="date"
                  value={preferredDate}
                  onChange={(e) => setPreferredDate(e.target.value)}
                  className="w-full text-xs bg-[#F7F5F0] border border-[#E8E6E1] rounded-xl px-3 py-2.5 text-[#20252B] focus:outline-hidden focus:border-[#C6A15B]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#102A43] mb-1">
                  Preferred Time Slot
                </label>
                <select
                  value={preferredTime}
                  onChange={(e) => setPreferredTime(e.target.value)}
                  className="w-full text-xs bg-[#F7F5F0] border border-[#E8E6E1] rounded-xl px-3 py-2.5 text-[#20252B] focus:outline-hidden focus:border-[#C6A15B]"
                >
                  <option value="10:00 AM">Morning (10:00 AM)</option>
                  <option value="11:30 AM">Morning (11:30 AM)</option>
                  <option value="02:30 PM">Afternoon (02:30 PM)</option>
                  <option value="04:30 PM">Evening (04:30 PM)</option>
                  <option value="06:00 PM">Evening (06:00 PM)</option>
                </select>
              </div>
            </div>

            {/* Message */}
            <div>
              <label className="block text-xs font-semibold text-[#102A43] mb-1">
                Your Requirement / Specific Questions
              </label>
              <textarea
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full text-xs bg-[#F7F5F0] border border-[#E8E6E1] rounded-xl p-3 text-[#20252B] focus:outline-hidden focus:border-[#C6A15B] leading-relaxed resize-none"
              />
            </div>

            <div className="flex items-center gap-2 text-[11px] text-[#52606D]">
              <ShieldCheck className="w-4 h-4 text-[#C6A15B] shrink-0" />
              <span>Zero spam guarantee. Strictly confidential property consultation.</span>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-[#102A43] hover:bg-[#0B1D30] text-white font-bold text-xs shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 active:scale-98 cursor-pointer"
            >
              <Calendar className="w-4 h-4 text-[#C6A15B]" />
              <span>Submit Inquiry & Generate Reference ID</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
