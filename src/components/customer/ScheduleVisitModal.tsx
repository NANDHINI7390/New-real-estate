import React, { useState } from 'react';
import { useRealEstate } from '../../context/RealEstateContext';
import {
  X,
  CheckCircle2,
  Calendar,
  MapPin,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  User,
  Phone,
  Mail,
} from 'lucide-react';

interface ScheduleVisitModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPropertyId?: string;
}

export const ScheduleVisitModal: React.FC<ScheduleVisitModalProps> = ({
  isOpen,
  onClose,
  initialPropertyId,
}) => {
  const {
    properties,
    scheduleSiteVisit,
    setViewMode,
    setAdminTab,
  } = useRealEstate();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [propertyId, setPropertyId] = useState(initialPropertyId || properties[0]?.id || '');
  const [date, setDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  });
  const [timeSlot, setTimeSlot] = useState('11:00 AM');
  const [notes, setNotes] = useState('Please arrange pick up from White Town center or provide GPS pin.');

  const [scheduledRef, setScheduledRef] = useState<string | null>(null);

  if (!isOpen) return null;

  const currentProp = properties.find((p) => p.id === propertyId);

  const timeSlots = [
    '09:30 AM',
    '11:00 AM',
    '02:30 PM',
    '04:30 PM',
    '05:45 PM (Sunset)',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !date) return;

    const ref = scheduleSiteVisit({
      propertyId: currentProp?.id || properties[0].id,
      propertyTitle: currentProp?.title || 'Pondicherry Residence',
      clientName: name,
      clientPhone: phone,
      clientEmail: email || `${name.toLowerCase().replace(/\s+/g, '')}@gmail.com`,
      date,
      timeSlot,
      notes,
    });

    setScheduledRef(ref);
  };

  const handleResetAndClose = () => {
    setScheduledRef(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-[#E8E6E1] animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="bg-[#102A43] text-white p-6 flex items-center justify-between border-b border-[#C6A15B]/30">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#F7F5F0]/15 text-[#C6A15B] flex items-center justify-center border border-[#C6A15B]/30">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-lg font-bold font-serif text-white">Schedule a Private Site Visit</h3>
              <p className="text-xs text-white/80 font-normal">
                Personal chauffeured property tour & neighborhood walkthrough
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
        {scheduledRef ? (
          <div className="p-8 text-center space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-[#F7F5F0] text-[#102A43] flex items-center justify-center mx-auto border border-[#E8E6E1]">
              <CheckCircle2 className="w-8 h-8 text-[#C6A15B]" />
            </div>

            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#C6A15B] bg-[#F7F5F0] px-3 py-1 rounded-full border border-[#E8E6E1]">
                Site Visit Confirmed
              </span>
              <h4 className="text-2xl font-bold font-serif text-[#102A43] mt-3">
                Visit Code: {scheduledRef}
              </h4>
              <p className="text-xs text-[#52606D] mt-2 max-w-sm mx-auto leading-relaxed font-normal">
                Your tour for <span className="font-bold text-[#102A43]">{currentProp?.title}</span> is scheduled on <span className="font-semibold text-[#102A43]">{date} at {timeSlot}</span>. Our consultant will meet you at the site.
              </p>
            </div>

            {/* Quick Demo verification link for owner / agent */}
            <div className="bg-[#F7F5F0] p-4 rounded-2xl border border-[#E8E6E1] text-left text-xs space-y-2">
              <div className="flex items-center gap-2 text-[#102A43] font-semibold">
                <Sparkles className="w-4 h-4 text-[#C6A15B]" />
                <span>Synchronized to Admin Calendar</span>
              </div>
              <p className="text-[#52606D] text-[11px] font-normal">
                This site visit appointment has been added directly to the Admin Visits & Site Tours schedule.
              </p>
              <button
                onClick={() => {
                  handleResetAndClose();
                  setViewMode('admin');
                  setAdminTab('visits');
                }}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#102A43] hover:text-[#C6A15B] underline pt-1 cursor-pointer"
              >
                <span>Check in Admin Visits Dashboard</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <a
                href={`https://wa.me/919876543210?text=Hi,%20I%20have%20scheduled%20a%20site%20visit%20Ref:%20${scheduledRef}%20for%20${date}%20at%20${timeSlot}.`}
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-3 px-4 rounded-xl bg-[#102A43] hover:bg-[#0B1D30] text-[#C6A15B] font-semibold text-xs flex items-center justify-center gap-2 shadow-2xs transition-colors border border-[#C6A15B]/30"
              >
                <span>WhatsApp Visit Concierge</span>
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
            {/* Property details banner */}
            <div className="p-3 bg-[#F7F5F0] rounded-2xl border border-[#E8E6E1] flex items-center gap-3">
              <img
                src={currentProp?.heroImage}
                alt="Prop preview"
                className="w-14 h-14 rounded-xl object-cover border border-[#E8E6E1]"
              />
              <div className="flex-1 min-w-0">
                <h4 className="text-xs font-bold text-[#102A43] truncate font-serif">
                  {currentProp?.title}
                </h4>
                <div className="flex items-center gap-1 text-[11px] text-[#52606D]">
                  <MapPin className="w-3 h-3 text-[#C6A15B]" />
                  <span>{currentProp?.locality}</span>
                </div>
                <span className="text-xs font-bold text-[#102A43]">
                  {currentProp?.displayPrice}
                </span>
              </div>
            </div>

            {/* Select property if user wants to change */}
            <div>
              <label className="block text-xs font-semibold text-[#102A43] mb-1">
                Selected Property
              </label>
              <select
                value={propertyId}
                onChange={(e) => setPropertyId(e.target.value)}
                className="w-full text-xs bg-[#F7F5F0] border border-[#E8E6E1] rounded-xl px-3 py-2.5 text-[#20252B] focus:outline-hidden focus:border-[#C6A15B]"
              >
                {properties.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.title} ({p.displayPrice})
                  </option>
                ))}
              </select>
            </div>

            {/* Name, Phone, Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-[#102A43] mb-1">
                  Your Full Name *
                </label>
                <div className="relative">
                  <User className="w-3.5 h-3.5 text-[#52606D] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Anandha Krishnan"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-8 pr-3 py-2.5 text-xs bg-[#F7F5F0] border border-[#E8E6E1] rounded-xl text-[#20252B] focus:outline-hidden focus:border-[#C6A15B]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#102A43] mb-1">
                  Mobile Number *
                </label>
                <div className="relative">
                  <Phone className="w-3.5 h-3.5 text-[#52606D] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    required
                    placeholder="+91 98401 23456"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full pl-8 pr-3 py-2.5 text-xs bg-[#F7F5F0] border border-[#E8E6E1] rounded-xl text-[#20252B] focus:outline-hidden focus:border-[#C6A15B]"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#102A43] mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-3.5 h-3.5 text-[#52606D] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  placeholder="anandha@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-8 pr-3 py-2.5 text-xs bg-[#F7F5F0] border border-[#E8E6E1] rounded-xl text-[#20252B] focus:outline-hidden focus:border-[#C6A15B]"
                />
              </div>
            </div>

            {/* Date & Time Slot selection */}
            <div>
              <label className="block text-xs font-semibold text-[#102A43] mb-1">
                Preferred Visit Date *
              </label>
              <input
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full text-xs bg-[#F7F5F0] border border-[#E8E6E1] rounded-xl px-3 py-2.5 text-[#20252B] focus:outline-hidden focus:border-[#C6A15B]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#102A43] mb-1.5">
                Preferred Time Slot
              </label>
              <div className="flex flex-wrap gap-1.5">
                {timeSlots.map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setTimeSlot(slot)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                      timeSlot === slot
                        ? 'bg-[#102A43] text-[#C6A15B] shadow-2xs font-semibold'
                        : 'bg-[#F7F5F0] text-[#52606D] border border-[#E8E6E1] hover:bg-[#E8E6E1]'
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            {/* Special Instructions / Notes */}
            <div>
              <label className="block text-xs font-semibold text-[#102A43] mb-1">
                Special Requests or Pick-up Requirements
              </label>
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full text-xs bg-[#F7F5F0] border border-[#E8E6E1] rounded-xl p-2.5 text-[#20252B] focus:outline-hidden focus:border-[#C6A15B] resize-none"
              />
            </div>

            <div className="flex items-center gap-2 text-[11px] text-[#52606D]">
              <ShieldCheck className="w-4 h-4 text-[#C6A15B] shrink-0" />
              <span>Complimentary private vehicle transport available upon request.</span>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-[#102A43] hover:bg-[#0B1D30] text-white font-bold text-xs shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 active:scale-98 cursor-pointer"
            >
              <Calendar className="w-4 h-4 text-[#C6A15B]" />
              <span>Confirm Visit Appointment</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
