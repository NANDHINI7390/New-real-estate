import React, { useState, useEffect } from 'react';
import { useRealEstate } from '../../context/RealEstateContext';
import { ListingType } from '../../types';
import {
  Search,
  MapPin,
  Home,
  IndianRupee,
  Bed,
  Sparkles,
  Calendar,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  Award,
  ChevronLeft,
  ChevronRight,
  Send,
  CheckCircle2,
} from 'lucide-react';

interface HeroSectionProps {
  onOpenScheduleModal: () => void;
  onOpenInquiryModal: () => void;
}

const HERO_SLIDES = [
  {
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2000&q=85',
    title: 'The Solarium Oceanfront Villa',
    location: 'White Town Promenade, Pondicherry',
    tagline: 'Private Horizon Plunge Pool & Direct Bay of Bengal Ocean Breeze',
    price: '₹ 4.80 Cr',
    badge: 'Exclusive Heritage Reserve',
  },
  {
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=85',
    title: 'Maison De L’Aurore Heritage Estate',
    location: 'Rue Romain Rolland, French Quarter',
    tagline: 'Authentic 18th-Century Restored Colonial Courtyard Architecture',
    price: '₹ 1.95 L / mo',
    badge: 'INTACH Certified Landmark',
  },
  {
    image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=2000&q=85',
    title: 'The Courtyard Pavilion Villa',
    location: 'Auroville International Corridor',
    tagline: 'Bioclimatic Eco-Smart Villa with Zen Waterbody & Solar Grid',
    price: '₹ 1.35 Cr',
    badge: 'Zero-Carbon Living',
  },
];

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenScheduleModal, onOpenInquiryModal }) => {
  const { setCustomerPage, updateFilter, submitInquiry } = useRealEstate();

  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeTab, setActiveTab] = useState<ListingType>('BUY');
  const [selectedLocation, setSelectedLocation] = useState('ALL');
  const [selectedType, setSelectedType] = useState('ALL');
  const [selectedBudget, setSelectedBudget] = useState('ALL');
  const [selectedBedrooms, setSelectedBedrooms] = useState('Any');

  // Quick Lead Capture State in Hero
  const [quickPhone, setQuickPhone] = useState('');
  const [quickSent, setQuickSent] = useState(false);

  // Auto rotate slides
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    updateFilter('listingType', activeTab);
    updateFilter('location', selectedLocation);
    updateFilter('propertyType', selectedType);
    updateFilter('bedrooms', selectedBedrooms);

    if (selectedBudget === 'under-50l') {
      updateFilter('minBudget', 0);
      updateFilter('maxBudget', 5000000);
    } else if (selectedBudget === '50l-1cr') {
      updateFilter('minBudget', 5000000);
      updateFilter('maxBudget', 10000000);
    } else if (selectedBudget === '1cr-3cr') {
      updateFilter('minBudget', 10000000);
      updateFilter('maxBudget', 30000000);
    } else if (selectedBudget === 'above-3cr') {
      updateFilter('minBudget', 30000000);
      updateFilter('maxBudget', 200000000);
    } else {
      updateFilter('minBudget', 0);
      updateFilter('maxBudget', 200000000);
    }

    setCustomerPage(activeTab === 'BUY' ? 'buy' : 'rent');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleQuickLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickPhone.trim()) return;
    submitInquiry({
      customerName: 'VIP Brochure Requester',
      phone: quickPhone,
      email: 'vip-investor@client.in',
      propertyTitle: 'Pondicherry Prime Portfolio Catalog',
      propertyType: 'Villa',
      listingType: 'BUY',
      budget: '₹ 1 Cr - ₹ 5 Cr',
      message: 'Client requested instant WhatsApp VIP property catalog and pricing brochure.',
    });
    setQuickSent(true);
    setTimeout(() => {
      setQuickSent(false);
      setQuickPhone('');
    }, 4000);
  };

  return (
    <div className="relative pt-4 pb-20 md:pb-28">
      {/* Main Cinematic Viewport */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden shadow-2xl min-h-[580px] md:min-h-[660px] flex items-center border border-[#E8E6E1]">
          {/* Slide Background Images */}
          {HERO_SLIDES.map((slide, index) => (
            <div
              key={slide.title}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 pointer-events-none'
              }`}
            >
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover object-center transform scale-105 transition-transform duration-10000 ease-out"
              />
            </div>
          ))}

          {/* Deep Navy Gradient Layers */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#102A43]/92 via-[#102A43]/65 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#102A43]/90 via-transparent to-[#102A43]/40" />

          {/* Hero Slide Arrows */}
          <div className="absolute top-8 right-8 z-20 hidden md:flex items-center gap-2">
            <button
              onClick={() => setCurrentSlide((prev) => (prev === 0 ? HERO_SLIDES.length - 1 : prev - 1))}
              className="p-2.5 rounded-full bg-[#102A43]/60 hover:bg-[#102A43]/90 backdrop-blur-md text-white border border-white/20 transition-all hover:scale-105 active:scale-95 cursor-pointer"
              aria-label="Previous Slide"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length)}
              className="p-2.5 rounded-full bg-[#102A43]/60 hover:bg-[#102A43]/90 backdrop-blur-md text-white border border-white/20 transition-all hover:scale-105 active:scale-95 cursor-pointer"
              aria-label="Next Slide"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Hero Content */}
          <div className="relative z-10 max-w-2xl px-6 py-16 sm:px-12 md:py-24 text-white">
            {/* Top Pill / Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#102A43]/80 backdrop-blur-md text-[#C6A15B] border border-[#C6A15B]/30 text-xs font-semibold uppercase tracking-wider mb-6">
              <Sparkles className="w-3.5 h-3.5 text-[#C6A15B]" />
              <span>{HERO_SLIDES[currentSlide].badge}</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.12] font-serif text-white">
              Discover High-Caliber{' '}
              <span className="text-[#C6A15B] italic font-serif">Living</span> in Pondicherry.
            </h1>

            {/* Subtext */}
            <p className="mt-5 text-base sm:text-lg text-[#F7F5F0]/90 font-light leading-relaxed max-w-xl">
              Authentic French colonial residences in White Town, private beachfront villas along ECR, and prestigious gated villa plots with 100% legal clearance.
            </p>

            {/* Active Property Card Badge */}
            <div className="mt-6 inline-flex items-center gap-3 p-2.5 pr-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 text-xs text-[#F7F5F0]">
              <div className="w-2.5 h-2.5 rounded-full bg-[#C6A15B] animate-ping" />
              <div>
                <span className="font-semibold text-white">{HERO_SLIDES[currentSlide].title}</span>
                <span className="text-white/70 ml-2">({HERO_SLIDES[currentSlide].price})</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                onClick={() => {
                  setCustomerPage('buy');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-6 py-3.5 rounded-xl bg-[#C6A15B] hover:bg-[#B5914A] text-white font-semibold text-sm shadow-lg hover:shadow-xl transition-all flex items-center gap-2 active:scale-98 cursor-pointer"
              >
                <span>Explore Properties</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </button>

              <button
                onClick={onOpenScheduleModal}
                className="px-6 py-3.5 rounded-xl bg-[#102A43]/85 hover:bg-[#0B1D30] backdrop-blur-md text-[#F7F5F0] border border-white/25 font-semibold text-sm transition-all flex items-center gap-2 active:scale-98 cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-[#C6A15B]" />
                <span>Schedule Private Visit</span>
              </button>
            </div>

            {/* Slide Indicator Dots */}
            <div className="mt-10 flex items-center gap-2">
              {HERO_SLIDES.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    idx === currentSlide ? 'w-8 bg-[#C6A15B]' : 'w-2 bg-white/40 hover:bg-white/70'
                  }`}
                  aria-label={`Slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Quick Floating Trust Metrics Ribbon */}
          <div className="absolute bottom-4 right-6 z-20 hidden lg:flex items-center gap-4 text-xs text-[#F7F5F0]/90 bg-[#102A43]/85 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/10">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#C6A15B]" />
              <span>100% Title Verified</span>
            </div>
            <div className="w-px h-4 bg-white/20" />
            <div className="flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-[#C6A15B]" />
              <span>₹7,450/sq.ft Avg Index</span>
            </div>
            <div className="w-px h-4 bg-white/20" />
            <div className="flex items-center gap-1.5">
              <Award className="w-4 h-4 text-[#C6A15B]" />
              <span>15+ Yrs Heritage Advisory</span>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Property Search Box with Real Estate Palette */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 -mt-14 md:-mt-18 relative z-30">
        <div className="bg-white rounded-2xl md:rounded-3xl shadow-2xl border border-[#E8E6E1] p-5 md:p-6 luxury-shadow">
          {/* Top Switcher & Quick Tagline */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 border-b border-[#E8E6E1] pb-4">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setActiveTab('BUY')}
                className={`px-6 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  activeTab === 'BUY'
                    ? 'bg-[#102A43] text-white shadow-xs'
                    : 'bg-[#F7F5F0] text-[#52606D] border border-[#E8E6E1] hover:bg-white'
                }`}
              >
                Buy Properties
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('RENT')}
                className={`px-6 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  activeTab === 'RENT'
                    ? 'bg-[#102A43] text-white shadow-xs'
                    : 'bg-[#F7F5F0] text-[#52606D] border border-[#E8E6E1] hover:bg-white'
                }`}
              >
                Rent Luxury
              </button>
            </div>

            {/* Quick WhatsApp Lead Capture Form */}
            <form onSubmit={handleQuickLeadSubmit} className="flex items-center gap-2">
              <div className="relative">
                <input
                  type="tel"
                  placeholder="Get VIP Price Catalog (+91)"
                  value={quickPhone}
                  onChange={(e) => setQuickPhone(e.target.value)}
                  className="bg-[#F7F5F0] border border-[#E8E6E1] rounded-xl px-3 py-1.5 text-xs text-[#20252B] placeholder:text-[#52606D] focus:outline-hidden focus:border-[#C6A15B] focus:bg-white w-48 sm:w-56"
                />
              </div>
              <button
                type="submit"
                disabled={quickSent}
                className="px-3.5 py-1.5 rounded-xl bg-[#102A43] hover:bg-[#0B1D30] text-white text-xs font-bold transition-colors flex items-center gap-1 shadow-xs cursor-pointer"
              >
                {quickSent ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Sent</span>
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5 text-[#C6A15B]" />
                    <span>Brochure</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Search Form Fields */}
          <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 md:gap-4 items-center">
            {/* Location */}
            <div className="bg-[#F7F5F0] border border-[#E8E6E1] rounded-xl p-2.5 px-3.5 focus-within:border-[#C6A15B] focus-within:bg-white transition-all">
              <label className="block text-[11px] font-semibold text-[#52606D] uppercase tracking-wider">
                Location
              </label>
              <div className="flex items-center gap-2 mt-0.5">
                <MapPin className="w-4 h-4 text-[#C6A15B] shrink-0" />
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-full bg-transparent text-xs font-medium text-[#20252B] focus:outline-hidden cursor-pointer"
                >
                  <option value="ALL">All Pondicherry</option>
                  <option value="White Town">White Town (French Quarter)</option>
                  <option value="ECR">ECR Coastal Highway</option>
                  <option value="Kottakuppam">Auroville / Kottakuppam</option>
                  <option value="Oulgaret">Oulgaret / Saram</option>
                  <option value="Anna Nagar">Anna Nagar Central</option>
                  <option value="Pondy Marina">Pondy Marina Promenade</option>
                </select>
              </div>
            </div>

            {/* Property Type */}
            <div className="bg-[#F7F5F0] border border-[#E8E6E1] rounded-xl p-2.5 px-3.5 focus-within:border-[#C6A15B] focus-within:bg-white transition-all">
              <label className="block text-[11px] font-semibold text-[#52606D] uppercase tracking-wider">
                Property Type
              </label>
              <div className="flex items-center gap-2 mt-0.5">
                <Home className="w-4 h-4 text-[#C6A15B] shrink-0" />
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full bg-transparent text-xs font-medium text-[#20252B] focus:outline-hidden cursor-pointer"
                >
                  <option value="ALL">All Types</option>
                  <option value="Villa">Luxury Villa</option>
                  <option value="Apartment">Apartment / Flat</option>
                  <option value="Independent House">Independent House</option>
                  <option value="Plot">Residential Plot / Land</option>
                  <option value="Commercial">Commercial Asset</option>
                </select>
              </div>
            </div>

            {/* Budget */}
            <div className="bg-[#F7F5F0] border border-[#E8E6E1] rounded-xl p-2.5 px-3.5 focus-within:border-[#C6A15B] focus-within:bg-white transition-all">
              <label className="block text-[11px] font-semibold text-[#52606D] uppercase tracking-wider">
                Budget
              </label>
              <div className="flex items-center gap-2 mt-0.5">
                <IndianRupee className="w-4 h-4 text-[#C6A15B] shrink-0" />
                <select
                  value={selectedBudget}
                  onChange={(e) => setSelectedBudget(e.target.value)}
                  className="w-full bg-transparent text-xs font-medium text-[#20252B] focus:outline-hidden cursor-pointer"
                >
                  <option value="ALL">Any Budget</option>
                  {activeTab === 'BUY' ? (
                    <>
                      <option value="under-50l">Under ₹50 Lakhs</option>
                      <option value="50l-1cr">₹50 L – ₹1.00 Crore</option>
                      <option value="1cr-3cr">₹1.00 Cr – ₹3.00 Crore</option>
                      <option value="above-3cr">Above ₹3.00 Crore</option>
                    </>
                  ) : (
                    <>
                      <option value="under-50l">Under ₹30,000 / mo</option>
                      <option value="50l-1cr">₹30,000 – ₹75,000 / mo</option>
                      <option value="1cr-3cr">₹75,000 – ₹1.50 L / mo</option>
                      <option value="above-3cr">Above ₹1.50 L / mo</option>
                    </>
                  )}
                </select>
              </div>
            </div>

            {/* Bedrooms */}
            <div className="bg-[#F7F5F0] border border-[#E8E6E1] rounded-xl p-2.5 px-3.5 focus-within:border-[#C6A15B] focus-within:bg-white transition-all">
              <label className="block text-[11px] font-semibold text-[#52606D] uppercase tracking-wider">
                Bedrooms
              </label>
              <div className="flex items-center gap-2 mt-0.5">
                <Bed className="w-4 h-4 text-[#C6A15B] shrink-0" />
                <select
                  value={selectedBedrooms}
                  onChange={(e) => setSelectedBedrooms(e.target.value)}
                  className="w-full bg-transparent text-xs font-medium text-[#20252B] focus:outline-hidden cursor-pointer"
                >
                  <option value="Any">Any BHK</option>
                  <option value="1">1 BHK</option>
                  <option value="2">2 BHK</option>
                  <option value="3">3 BHK</option>
                  <option value="4">4 BHK</option>
                  <option value="5+">5+ BHK</option>
                </select>
              </div>
            </div>

            {/* Search Action Button */}
            <div className="sm:col-span-2 lg:col-span-1">
              <button
                type="submit"
                className="w-full py-3.5 px-4 rounded-xl bg-[#102A43] hover:bg-[#0B1D30] text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all active:scale-98 cursor-pointer"
              >
                <Search className="w-4 h-4 text-[#C6A15B]" />
                <span>Search</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
