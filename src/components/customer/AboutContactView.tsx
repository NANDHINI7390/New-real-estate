import React, { useState } from 'react';
import { useRealEstate } from '../../context/RealEstateContext';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  Star,
  Award,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';

export const AboutContactView: React.FC = () => {
  const { agents, submitInquiry, showToast } = useRealEstate();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Buying Consultation');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !email) return;

    submitInquiry({
      customerName: name,
      phone,
      email,
      propertyId: 'general',
      propertyTitle: `Contact Us: ${subject}`,
      listingType: 'BUY',
      budget: 'Consultation',
      preferredDate: new Date().toISOString().split('T')[0],
      preferredTime: 'Immediate',
      message,
    });

    setSubmitted(true);
    showToast('Message Sent', 'Thank you! Our advisory team will respond shortly.', 'success');
  };

  return (
    <div className="bg-[#F7F5F0] min-h-screen pb-24 text-[#20252B]">
      {/* Header */}
      <div className="bg-[#102A43] text-white py-16 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <span className="inline-block px-3 py-1 rounded-full bg-white/10 text-[#C6A15B] text-xs font-semibold uppercase tracking-wider mb-3 border border-[#C6A15B]/30">
              Heritage & Integrity
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold font-serif text-white leading-tight">
              About Pondicherry Realty
            </h1>
            <p className="text-sm text-[#E8E6E1] mt-3 leading-relaxed font-normal">
              Serving homebuyers, expats, and investors for over 20+ years. Setting the standard for luxury living and trustworthy property advisory in Puducherry.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 space-y-16">
        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold font-serif text-[#102A43] leading-snug">
              Rooted in the French Riviera of the East
            </h2>
            <p className="text-xs text-[#52606D] leading-relaxed font-normal">
              Founded in 2004, Pondicherry Realty was established with a singular vision: to bring institutional-grade transparency, architectural appreciation, and legal diligence to the Puducherry coastal property market.
            </p>
            <p className="text-xs text-[#52606D] leading-relaxed font-normal">
              Whether you are looking for a restored colonial mansion in White Town with bougainvillea courtyards, a modern sea-facing villa along the scenic East Coast Road (ECR), or an eco-sustainable home near Auroville, our team provides trusted advisory at every step.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="p-4 rounded-2xl bg-white border border-[#E8E6E1] shadow-2xs">
                <Award className="w-6 h-6 text-[#C6A15B] mb-2" />
                <div className="text-xl font-bold font-serif text-[#102A43]">20+ Years</div>
                <div className="text-xs text-[#52606D] font-normal">Unblemished Realty Track Record</div>
              </div>
              <div className="p-4 rounded-2xl bg-white border border-[#E8E6E1] shadow-2xs">
                <ShieldCheck className="w-6 h-6 text-[#102A43] mb-2" />
                <div className="text-xl font-bold font-serif text-[#102A43]">100% Legal</div>
                <div className="text-xs text-[#52606D] font-normal">Certified Title Assurance</div>
              </div>
            </div>
          </div>

          <div className="relative rounded-3xl overflow-hidden shadow-lg h-96 border border-[#E8E6E1]">
            <img
              src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1000&q=80"
              alt="Pondicherry Architecture"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Advisory Team */}
        <div className="space-y-8">
          <div className="text-center max-w-xl mx-auto">
            <h2 className="text-3xl font-bold font-serif text-[#102A43]">
              Meet Our Senior Property Consultants
            </h2>
            <p className="text-xs text-[#52606D] mt-2 font-normal">
              Seasoned real estate advisors dedicated to finding your dream home.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {agents.map((agent) => (
              <div
                key={agent.id}
                className="bg-white rounded-3xl border border-[#E8E6E1] p-6 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src={agent.photo}
                      alt={agent.name}
                      className="w-16 h-16 rounded-2xl object-cover border border-[#E8E6E1] shadow-2xs"
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
                  <p className="text-xs text-[#52606D] leading-relaxed italic font-normal">
                    "{agent.bio}"
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#E8E6E1] space-y-1.5 text-xs text-[#52606D]">
                  <div className="flex justify-between">
                    <span className="text-[#52606D]">Experience:</span>
                    <span className="font-semibold text-[#102A43]">{agent.experience}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#52606D]">Phone:</span>
                    <span className="font-semibold text-[#102A43]">{agent.phone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#52606D]">Languages:</span>
                    <span className="font-semibold text-[#102A43]">{agent.languages.join(', ')}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact & Map Section */}
        <div className="bg-white rounded-3xl border border-[#E8E6E1] p-8 sm:p-12 shadow-xs grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left info */}
          <div className="space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#C6A15B] bg-[#F7F5F0] px-3 py-1 rounded-full border border-[#E8E6E1]">
                Get in Touch
              </span>
              <h2 className="text-3xl font-bold font-serif text-[#102A43] mt-3">
                Visit Our White Town Office
              </h2>
              <p className="text-xs text-[#52606D] mt-2 leading-relaxed font-normal">
                We welcome you for freshly brewed South Indian filter coffee while we discuss your luxury property requirements in person.
              </p>
            </div>

            <div className="space-y-4 text-xs text-[#52606D]">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-[#F7F5F0] text-[#102A43] border border-[#E8E6E1] flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4 text-[#C6A15B]" />
                </div>
                <div>
                  <div className="font-bold text-[#102A43]">Headquarters Address</div>
                  <div className="text-[#52606D] mt-0.5 font-normal">
                    No. 14, Rue Suffren, White Town (French Quarter), Puducherry - 605001
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-[#F7F5F0] text-[#102A43] border border-[#E8E6E1] flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4 text-[#C6A15B]" />
                </div>
                <div>
                  <div className="font-bold text-[#102A43]">Phone / WhatsApp</div>
                  <div className="text-[#52606D] mt-0.5 font-normal">
                    +91 12345 67890 / +91 98765 43210
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-[#F7F5F0] text-[#102A43] border border-[#E8E6E1] flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4 text-[#C6A15B]" />
                </div>
                <div>
                  <div className="font-bold text-[#102A43]">Email Inquiries</div>
                  <div className="text-[#52606D] mt-0.5 font-normal">contact@pondicherryrealty.com</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-[#F7F5F0] text-[#102A43] border border-[#E8E6E1] flex items-center justify-center shrink-0">
                  <Clock className="w-4 h-4 text-[#C6A15B]" />
                </div>
                <div>
                  <div className="font-bold text-[#102A43]">Office Working Hours</div>
                  <div className="text-[#52606D] mt-0.5 font-normal">
                    Monday to Saturday: 9:00 AM - 7:30 PM (Sunday by appointment)
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Contact Form */}
          <div className="bg-[#F7F5F0] p-6 sm:p-8 rounded-2xl border border-[#E8E6E1]">
            {submitted ? (
              <div className="text-center py-8 space-y-4">
                <CheckCircle2 className="w-12 h-12 text-[#C6A15B] mx-auto" />
                <h3 className="text-xl font-bold font-serif text-[#102A43]">
                  Message Sent Successfully
                </h3>
                <p className="text-xs text-[#52606D] max-w-xs mx-auto font-normal">
                  Thank you, {name}. Our property consultant will get in touch with you shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-5 py-2.5 rounded-xl bg-[#102A43] text-white text-xs font-semibold hover:bg-[#0B1D30] cursor-pointer"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="text-lg font-bold font-serif text-[#102A43] mb-2">
                  Send Direct Message
                </h3>

                <div>
                  <label className="block text-xs font-semibold text-[#102A43] mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Jean-Luc or Anita"
                    className="w-full text-xs bg-white border border-[#E8E6E1] rounded-xl px-3 py-2.5 text-[#20252B] focus:outline-hidden focus:border-[#C6A15B]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-[#102A43] mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full text-xs bg-white border border-[#E8E6E1] rounded-xl px-3 py-2.5 text-[#20252B] focus:outline-hidden focus:border-[#C6A15B]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#102A43] mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@gmail.com"
                      className="w-full text-xs bg-white border border-[#E8E6E1] rounded-xl px-3 py-2.5 text-[#20252B] focus:outline-hidden focus:border-[#C6A15B]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#102A43] mb-1">
                    Subject / Consultation Topic
                  </label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full text-xs bg-white border border-[#E8E6E1] rounded-xl px-3 py-2.5 text-[#20252B] focus:outline-hidden focus:border-[#C6A15B]"
                  >
                    <option value="Buying Consultation">Buying Luxury Property</option>
                    <option value="Selling / Listing">Sell My Property</option>
                    <option value="Rental Advisory">Rental / Lease Advisory</option>
                    <option value="NRI Asset Management">NRI Property Management</option>
                    <option value="Legal Title Verification">Legal Title Search</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#102A43] mb-1">
                    Message
                  </label>
                  <textarea
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us about your requirements..."
                    className="w-full text-xs bg-white border border-[#E8E6E1] rounded-xl p-3 text-[#20252B] focus:outline-hidden focus:border-[#C6A15B] resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-[#102A43] hover:bg-[#0B1D30] text-white font-bold text-xs shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                >
                  <Send className="w-3.5 h-3.5 text-[#C6A15B]" />
                  <span>Send Message to Advisory Team</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
