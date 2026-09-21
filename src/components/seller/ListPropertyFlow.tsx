import React, { useState } from 'react';
import { useRealEstate } from '../../context/RealEstateContext';
import { ListingPackage, Property, PropertyType, ListingType } from '../../types';
import {
  Package,
  Home,
  MapPin,
  IndianRupee,
  Camera,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Upload,
  Plus,
  Trash2,
  ShieldCheck,
  Video,
  Info,
  Clock,
  Check,
  CreditCard,
  Building2,
} from 'lucide-react';
import { formatINR } from '../../data/mockData';

interface ListPropertyFlowProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

const PONDICHERRY_LOCALITIES = [
  'White Town (French Quarter)',
  'Heritage Muslim Quarter',
  'Tamil Quarter (Heritage)',
  'Beach Promenade',
  'ECR Coastal Corridor',
  'Auroville Periphery / Bommayapalayam',
  'Kottakuppam Coastal Stretch',
  'Muthialpet',
  'Lawspet & Airport Road',
  'Reddiarpalayam',
  'Villiyanur & Green Belt',
  'Chunnambar Riverfront & Paradise Beach',
  'Sedurapet Industrial Zone',
  'Gorimedu & JIPMER Vicinity',
];

const AMENITY_OPTIONS = [
  'Swimming Pool',
  'Direct Sea View',
  '24/7 Security & CCTV',
  '100% Power Backup (Solar/DG)',
  'Private Landscaped Garden',
  'RO Drinking Water Plant',
  'EV Vehicle Charger',
  'Covered Car Parking (2+ Cars)',
  'Clubhouse & Gym',
  'Rainwater Harvesting Grid',
  'High-Speed Fiber Internet',
  'Servant Quarters',
  'Modular Italian Kitchen',
  'Rooftop Terrace Lounge',
  'DTCP / PPA Approved Layout',
  '3-Phase Commercial EB Meter',
];

export const ListPropertyFlow: React.FC<ListPropertyFlowProps> = ({ onSuccess, onCancel }) => {
  const { packages, submitListing, currentUser, setViewMode, setSellerTab } = useRealEstate();

  // Wizard steps:
  // 1: Package Selection
  // 2: Basic & Category Details
  // 3: Location & Coordinates
  // 4: Price & Financials
  // 5: Specifications & Dimensions
  // 6: Photos & Video Upload
  // 7: Amenities Checklist
  // 8: Review & Submit (Admin Approval Pipeline)
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [selectedPackageId, setSelectedPackageId] = useState<string>(
    currentUser?.activePackageId || 'pkg-featured'
  );

  // Form State
  const [formData, setFormData] = useState<{
    title: string;
    tagline: string;
    listingType: ListingType;
    propertyType: PropertyType;
    locality: string;
    address: string;
    subLocation: string;
    price: number;
    priceNegotiable: boolean;
    bedrooms: number;
    bathrooms: number;
    areaSqFt: number;
    furnishing: 'Furnished' | 'Semi-Furnished' | 'Unfurnished';
    facing: string;
    floor: string;
    totalFloors: string;
    carParking: number;
    possession: string;
    ageOfProperty: string;
    ownership: 'Freehold' | 'Leasehold' | 'Co-operative';
    heroImage: string;
    gallery: string[];
    videoUrl: string;
    description: string;
    highlights: string[];
    amenities: string[];
  }>({
    title: '',
    tagline: '',
    listingType: 'BUY',
    propertyType: 'Villa',
    locality: 'White Town (French Quarter)',
    address: '',
    subLocation: 'Pondicherry Central',
    price: 35000000, // 3.5 Cr
    priceNegotiable: true,
    bedrooms: 3,
    bathrooms: 3,
    areaSqFt: 2400,
    furnishing: 'Furnished',
    facing: 'East (Direct Sunrise Sea View)',
    floor: 'G+1 Independent',
    totalFloors: '2 Floors',
    carParking: 2,
    possession: 'Ready to Move',
    ageOfProperty: 'Brand New (2026)',
    ownership: 'Freehold',
    heroImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1600&q=85',
    ],
    videoUrl: '',
    description: '',
    highlights: [
      'Prime location in central Pondicherry with immediate road access',
      'Clear DTCP approval with unencumbered parent title deed',
      'Abundant sweet water and 3-phase electricity infrastructure',
    ],
    amenities: ['24/7 Security & CCTV', '100% Power Backup (Solar/DG)', 'Covered Car Parking (2+ Cars)'],
  });

  const [newHighlight, setNewHighlight] = useState('');
  const [newImageUrl, setNewImageUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);
  const [submittedId, setSubmittedId] = useState<string>('');

  const selectedPkg = packages.find((p) => p.id === selectedPackageId) || packages[0];

  const handleToggleAmenity = (amenity: string) => {
    setFormData((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter((a) => a !== amenity)
        : [...prev.amenities, amenity],
    }));
  };

  const handleAddHighlight = () => {
    if (!newHighlight.trim()) return;
    setFormData((prev) => ({
      ...prev,
      highlights: [...prev.highlights, newHighlight.trim()],
    }));
    setNewHighlight('');
  };

  const handleRemoveHighlight = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      highlights: prev.highlights.filter((_, i) => i !== index),
    }));
  };

  const handleAddGalleryImage = () => {
    if (!newImageUrl.trim()) return;
    setFormData((prev) => ({
      ...prev,
      gallery: [...prev.gallery, newImageUrl.trim()],
    }));
    setNewImageUrl('');
  };

  const handleRemoveGalleryImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      gallery: prev.gallery.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const propId = await submitListing(
        {
          title: formData.title || `${formData.bedrooms} BHK ${formData.propertyType} in ${formData.locality}`,
          tagline: formData.tagline || `Exclusive ${formData.propertyType} offering prime coastal living`,
          location: `${formData.locality}, Pondicherry`,
          locality: formData.locality,
          subLocation: formData.address || formData.locality,
          price: formData.price,
          priceNegotiable: formData.priceNegotiable,
          propertyType: formData.propertyType,
          listingType: formData.listingType,
          heroImage: formData.heroImage,
          gallery: formData.gallery,
          videoUrl: formData.videoUrl,
          specs: {
            bedrooms: Number(formData.bedrooms),
            bathrooms: Number(formData.bathrooms),
            areaSqFt: Number(formData.areaSqFt),
            furnishing: formData.furnishing,
            facing: formData.facing,
            floor: formData.floor,
            totalFloors: formData.totalFloors,
            carParking: Number(formData.carParking),
            possession: formData.possession,
            ageOfProperty: formData.ageOfProperty,
            ownership: formData.ownership,
          },
          description:
            formData.description ||
            `Spectacular ${formData.propertyType} situated in prestigious ${formData.locality}. Premium construction materials, clear documents, and close proximity to the beach promenade.`,
          highlights: formData.highlights,
          amenities: formData.amenities,
        },
        selectedPackageId
      );

      setSubmittedId(propId);
      setSubmittedSuccess(true);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submittedSuccess) {
    return (
      <div className="bg-white rounded-3xl p-8 md:p-12 border border-[#E8E6E1] text-center max-w-2xl mx-auto shadow-xl">
        <div className="w-20 h-20 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-6 border-2 border-emerald-200 animate-bounce">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <span className="px-3.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300">
          Status: PENDING_APPROVAL
        </span>

        <h2 className="text-2xl md:text-3xl font-bold text-[#102A43] font-serif mt-4">
          Listing Submitted Successfully!
        </h2>

        <p className="text-sm text-stone-600 max-w-lg mx-auto mt-3 leading-relaxed">
          Your property has been submitted to the Pondicherry Realty marketplace under the{' '}
          <strong className="text-[#102A43]">{selectedPkg.name}</strong> package.
        </p>

        <div className="my-6 p-4 rounded-2xl bg-[#F7F5F0] border border-[#E8E6E1] text-left text-xs space-y-2 max-w-md mx-auto">
          <div className="flex justify-between">
            <span className="text-stone-500">Listing Ref ID:</span>
            <span className="font-mono font-bold text-[#102A43]">{submittedId}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-stone-500">Package Chosen:</span>
            <span className="font-bold text-[#C6A15B]">{selectedPkg.name} (₹{selectedPkg.price})</span>
          </div>
          <div className="flex justify-between">
            <span className="text-stone-500">Verification SLA:</span>
            <span className="font-semibold text-stone-700">Within 2 to 4 Hours</span>
          </div>
          <div className="flex justify-between">
            <span className="text-stone-500">Next Step:</span>
            <span className="font-semibold text-emerald-700">Admin Approval → Property Goes Live</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => {
              setViewMode('seller');
              setSellerTab('properties');
              if (onSuccess) onSuccess();
            }}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#102A43] text-white text-xs font-bold hover:bg-[#1A3B5C] shadow-sm transition-all"
          >
            Go to Seller Dashboard
          </button>
          <button
            onClick={() => {
              setCurrentStep(1);
              setSubmittedSuccess(false);
            }}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#F7F5F0] text-stone-700 text-xs font-bold hover:bg-stone-200 border border-[#E8E6E1] transition-all"
          >
            List Another Property
          </button>
        </div>
      </div>
    );
  }

  const steps = [
    { num: 1, label: 'Choose Package' },
    { num: 2, label: 'Basic Details' },
    { num: 3, label: 'Location' },
    { num: 4, label: 'Pricing' },
    { num: 5, label: 'Specifications' },
    { num: 6, label: 'Photos & Video' },
    { num: 7, label: 'Amenities' },
    { num: 8, label: 'Review & Submit' },
  ];

  return (
    <div className="bg-white rounded-3xl border border-[#E8E6E1] shadow-xl overflow-hidden max-w-4xl mx-auto">
      {/* Top Header Bar */}
      <div className="bg-[#102A43] text-white p-6 md:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="px-3 py-1 rounded-full text-[11px] font-bold tracking-wider bg-[#C6A15B] text-[#102A43] uppercase">
              SELLER & AGENT ONBOARDING
            </span>
            <h1 className="text-2xl md:text-3xl font-bold font-serif mt-2">
              List Your Property
            </h1>
            <p className="text-xs text-stone-300 mt-1">
              Reach thousands of genuine homebuyers, NRI investors, and tenants looking for properties in Pondicherry.
            </p>
          </div>

          <div className="text-right shrink-0">
            <div className="text-xs text-stone-400">Step {currentStep} of {steps.length}</div>
            <div className="text-sm font-bold text-[#C6A15B] mt-0.5">
              {steps[currentStep - 1].label}
            </div>
          </div>
        </div>

        {/* Progress Dots / Bar */}
        <div className="grid grid-cols-8 gap-1.5 mt-6">
          {steps.map((s) => (
            <div
              key={s.num}
              className={`h-2 rounded-full transition-all ${
                s.num <= currentStep ? 'bg-[#C6A15B]' : 'bg-white/20'
              }`}
              title={s.label}
            />
          ))}
        </div>
      </div>

      <div className="p-6 md:p-8 space-y-6">
        {/* STEP 1: CHOOSE LISTING PACKAGE */}
        {currentStep === 1 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div>
              <h2 className="text-xl font-bold text-[#102A43] font-serif">
                Select Your Listing Package
              </h2>
              <p className="text-xs text-stone-500 mt-1">
                Choose the marketing reach and promotion duration that best matches your timeline.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {packages.map((pkg) => {
                const isSelected = selectedPackageId === pkg.id;
                const isPremium = pkg.isPremiumPlacement;
                const isFeatured = pkg.isFeaturedPlacement;

                return (
                  <div
                    key={pkg.id}
                    onClick={() => setSelectedPackageId(pkg.id)}
                    className={`rounded-2xl p-5 border-2 cursor-pointer transition-all flex flex-col justify-between relative ${
                      isSelected
                        ? 'border-[#C6A15B] bg-amber-50/40 ring-4 ring-[#C6A15B]/15 shadow-md'
                        : 'border-[#E8E6E1] bg-white hover:border-stone-400'
                    }`}
                  >
                    {isPremium && (
                      <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full text-[10px] font-bold bg-[#C6A15B] text-white uppercase tracking-wider">
                        VIP Showcase
                      </span>
                    )}

                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
                          {pkg.badgeText || 'Plan'}
                        </span>
                        <div
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                            isSelected
                              ? 'border-[#C6A15B] bg-[#C6A15B] text-white'
                              : 'border-stone-300'
                          }`}
                        >
                          {isSelected && <Check className="w-3.5 h-3.5" />}
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-bold text-[#102A43] font-serif">{pkg.name}</h3>
                        <p className="text-[11px] text-stone-500 mt-1 min-h-[28px]">{pkg.tagline}</p>
                      </div>

                      <div className="p-3 rounded-xl bg-[#F7F5F0] border border-[#E8E6E1]">
                        <div className="text-2xl font-bold text-[#102A43] font-serif">
                          ₹{pkg.price.toLocaleString('en-IN')}
                        </div>
                        <div className="text-[11px] text-stone-500 mt-0.5">
                          {pkg.durationDays} Days live • {pkg.listingLimit} Property
                        </div>
                      </div>

                      <ul className="space-y-2 pt-2 text-xs text-stone-600">
                        {pkg.features.map((f, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-4 pt-3 border-t border-[#E8E6E1]">
                      <button
                        type="button"
                        className={`w-full py-2 rounded-xl text-xs font-bold transition-all ${
                          isSelected
                            ? 'bg-[#102A43] text-white'
                            : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                        }`}
                      >
                        {isSelected ? 'Selected Plan' : 'Select Plan'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 2: BASIC DETAILS */}
        {currentStep === 2 && (
          <div className="space-y-5 animate-in fade-in duration-200">
            <div>
              <h2 className="text-xl font-bold text-[#102A43] font-serif">
                Enter Property Details
              </h2>
              <p className="text-xs text-stone-500 mt-1">
                Provide an attractive title and categorize your listing accurately.
              </p>
            </div>

            {/* Listing Intent: Buy or Rent */}
            <div>
              <label className="text-xs font-bold text-stone-700 block mb-2">Listing Purpose</label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, listingType: 'BUY' })}
                  className={`p-3.5 rounded-xl border-2 text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                    formData.listingType === 'BUY'
                      ? 'border-[#102A43] bg-[#102A43] text-white shadow-sm'
                      : 'border-[#E8E6E1] bg-[#F7F5F0] text-stone-700 hover:bg-stone-200'
                  }`}
                >
                  <Home className="w-4 h-4" />
                  I Want to SELL This Property
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, listingType: 'RENT' })}
                  className={`p-3.5 rounded-xl border-2 text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                    formData.listingType === 'RENT'
                      ? 'border-[#102A43] bg-[#102A43] text-white shadow-sm'
                      : 'border-[#E8E6E1] bg-[#F7F5F0] text-stone-700 hover:bg-stone-200'
                  }`}
                >
                  <Building2 className="w-4 h-4" />
                  I Want to RENT / LEASE This Property
                </button>
              </div>
            </div>

            {/* Property Type */}
            <div>
              <label className="text-xs font-bold text-stone-700 block mb-2">Property Category</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {(['Villa', 'Apartment', 'Independent House', 'Plot / Land', 'Commercial'] as const).map(
                  (type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setFormData({ ...formData, propertyType: type as any })}
                      className={`p-3 rounded-xl border text-xs font-semibold transition-all ${
                        formData.propertyType === type
                          ? 'border-[#C6A15B] bg-amber-50 text-[#102A43] font-bold ring-2 ring-[#C6A15B]/20'
                          : 'border-[#E8E6E1] bg-white text-stone-600 hover:bg-stone-50'
                      }`}
                    >
                      {type}
                    </button>
                  )
                )}
              </div>
            </div>

            {/* Property Title */}
            <div>
              <label className="text-xs font-bold text-stone-700 block mb-1">
                Property Headline / Title <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g. 4 BHK Sea-Facing Luxury Villa on Beach Promenade, White Town"
                className="w-full p-3 text-xs bg-[#F7F5F0] border border-[#E8E6E1] rounded-xl focus:ring-2 focus:ring-[#102A43]"
              />
              <span className="text-[11px] text-stone-400 mt-1 block">
                A captivating title receives up to 40% more buyer inquiries.
              </span>
            </div>

            {/* Tagline */}
            <div>
              <label className="text-xs font-bold text-stone-700 block mb-1">Tagline / Key Highlight</label>
              <input
                type="text"
                value={formData.tagline}
                onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                placeholder="e.g. Direct sunrise ocean horizon, plunge pool & private teak terrace"
                className="w-full p-3 text-xs bg-[#F7F5F0] border border-[#E8E6E1] rounded-xl focus:ring-2 focus:ring-[#102A43]"
              />
            </div>

            {/* Description */}
            <div>
              <label className="text-xs font-bold text-stone-700 block mb-1">Detailed Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Highlight architecture, proximity to beach, ventilation, legal approvals, water source..."
                rows={4}
                className="w-full p-3 text-xs bg-[#F7F5F0] border border-[#E8E6E1] rounded-xl focus:ring-2 focus:ring-[#102A43]"
              />
            </div>
          </div>
        )}

        {/* STEP 3: LOCATION */}
        {currentStep === 3 && (
          <div className="space-y-5 animate-in fade-in duration-200">
            <div>
              <h2 className="text-xl font-bold text-[#102A43] font-serif">
                Property Location
              </h2>
              <p className="text-xs text-stone-500 mt-1">
                Specify the exact locality in Puducherry to ensure relevant buyer matching.
              </p>
            </div>

            <div>
              <label className="text-xs font-bold text-stone-700 block mb-1">
                Select Pondicherry Locality <span className="text-rose-500">*</span>
              </label>
              <select
                value={formData.locality}
                onChange={(e) => setFormData({ ...formData, locality: e.target.value })}
                className="w-full p-3 text-xs bg-[#F7F5F0] border border-[#E8E6E1] rounded-xl focus:ring-2 focus:ring-[#102A43]"
              >
                {PONDICHERRY_LOCALITIES.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-stone-700 block mb-1">
                Street Address / Landmark <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                placeholder="e.g. Near Alliance Française, Rue Dumas, White Town"
                className="w-full p-3 text-xs bg-[#F7F5F0] border border-[#E8E6E1] rounded-xl focus:ring-2 focus:ring-[#102A43]"
              />
            </div>

            <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 flex items-start gap-3">
              <MapPin className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
              <div className="text-xs text-blue-900 leading-relaxed">
                <strong className="block mb-0.5">Privacy Protection Policy</strong>
                Exact house numbers and door details are only shared with verified, screened buyers after scheduling an appointment with your approval.
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: PRICE & FINANCIALS */}
        {currentStep === 4 && (
          <div className="space-y-5 animate-in fade-in duration-200">
            <div>
              <h2 className="text-xl font-bold text-[#102A43] font-serif">
                Price & Financial Expectations
              </h2>
              <p className="text-xs text-stone-500 mt-1">
                Enter your expected price in Indian Rupees (₹).
              </p>
            </div>

            <div>
              <label className="text-xs font-bold text-stone-700 block mb-1">
                {formData.listingType === 'BUY' ? 'Total Selling Price (₹ INR)' : 'Monthly Rental Price (₹ INR)'} <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <IndianRupee className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                  className="w-full pl-10 pr-4 py-3 text-base font-bold text-[#102A43] bg-[#F7F5F0] border border-[#E8E6E1] rounded-xl focus:ring-2 focus:ring-[#102A43]"
                />
              </div>

              {/* Formatted Badge */}
              <div className="mt-2 text-xs font-semibold text-[#C6A15B] flex items-center gap-2">
                <span>Display Format:</span>
                <span className="px-2.5 py-1 rounded-md bg-[#102A43] text-white">
                  {formatINR(formData.price)} {formData.listingType === 'RENT' ? '/ month' : ''}
                </span>
              </div>
            </div>

            {/* Price Negotiable Toggle */}
            <div className="p-4 rounded-xl bg-[#F7F5F0] border border-[#E8E6E1] flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-stone-800">Price Negotiable?</div>
                <div className="text-[11px] text-stone-500">
                  Open to reasonable counter-offers from verified buyers.
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.priceNegotiable}
                  onChange={(e) => setFormData({ ...formData, priceNegotiable: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-stone-300 peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-stone-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#102A43]"></div>
              </label>
            </div>

            {/* Ownership Type */}
            <div>
              <label className="text-xs font-bold text-stone-700 block mb-1">Ownership Type</label>
              <div className="grid grid-cols-3 gap-3">
                {(['Freehold', 'Leasehold', 'Co-operative'] as const).map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setFormData({ ...formData, ownership: type })}
                    className={`py-2 px-3 rounded-xl border text-xs font-semibold ${
                      formData.ownership === type
                        ? 'border-[#102A43] bg-[#102A43] text-white'
                        : 'border-[#E8E6E1] bg-white text-stone-600'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* STEP 5: SPECIFICATIONS */}
        {currentStep === 5 && (
          <div className="space-y-5 animate-in fade-in duration-200">
            <div>
              <h2 className="text-xl font-bold text-[#102A43] font-serif">
                Property Specifications & Dimensions
              </h2>
              <p className="text-xs text-stone-500 mt-1">
                Provide accurate measurements for floor plan calculation.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="text-xs font-bold text-stone-700 block mb-1">Bedrooms</label>
                <select
                  value={formData.bedrooms}
                  onChange={(e) => setFormData({ ...formData, bedrooms: Number(e.target.value) })}
                  className="w-full p-2.5 text-xs bg-[#F7F5F0] border border-[#E8E6E1] rounded-xl"
                >
                  {[1, 2, 3, 4, 5, 6, 8].map((b) => (
                    <option key={b} value={b}>
                      {b} BHK
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-stone-700 block mb-1">Bathrooms</label>
                <select
                  value={formData.bathrooms}
                  onChange={(e) => setFormData({ ...formData, bathrooms: Number(e.target.value) })}
                  className="w-full p-2.5 text-xs bg-[#F7F5F0] border border-[#E8E6E1] rounded-xl"
                >
                  {[1, 2, 3, 4, 5, 6].map((b) => (
                    <option key={b} value={b}>
                      {b} Bathrooms
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-stone-700 block mb-1">Built-up Area (Sq.Ft)</label>
                <input
                  type="number"
                  value={formData.areaSqFt}
                  onChange={(e) => setFormData({ ...formData, areaSqFt: Number(e.target.value) })}
                  className="w-full p-2.5 text-xs bg-[#F7F5F0] border border-[#E8E6E1] rounded-xl"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="text-xs font-bold text-stone-700 block mb-1">Furnishing</label>
                <select
                  value={formData.furnishing}
                  onChange={(e) => setFormData({ ...formData, furnishing: e.target.value as any })}
                  className="w-full p-2.5 text-xs bg-[#F7F5F0] border border-[#E8E6E1] rounded-xl"
                >
                  <option value="Furnished">Fully Furnished</option>
                  <option value="Semi-Furnished">Semi-Furnished</option>
                  <option value="Unfurnished">Unfurnished</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-stone-700 block mb-1">Facing</label>
                <input
                  type="text"
                  value={formData.facing}
                  onChange={(e) => setFormData({ ...formData, facing: e.target.value })}
                  placeholder="e.g. East (Sea Facing)"
                  className="w-full p-2.5 text-xs bg-[#F7F5F0] border border-[#E8E6E1] rounded-xl"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-stone-700 block mb-1">Car Parking Slots</label>
                <input
                  type="number"
                  value={formData.carParking}
                  onChange={(e) => setFormData({ ...formData, carParking: Number(e.target.value) })}
                  className="w-full p-2.5 text-xs bg-[#F7F5F0] border border-[#E8E6E1] rounded-xl"
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 6: PHOTOS & VIDEO */}
        {currentStep === 6 && (
          <div className="space-y-5 animate-in fade-in duration-200">
            <div>
              <h2 className="text-xl font-bold text-[#102A43] font-serif">
                Upload Photos & Video Walkthrough
              </h2>
              <p className="text-xs text-stone-500 mt-1">
                Visual presentation is the #1 deciding factor for premium property buyers in Pondicherry.
              </p>
            </div>

            {/* Primary Cover Image */}
            <div>
              <label className="text-xs font-bold text-stone-700 block mb-1">
                Primary Hero / Cover Image URL <span className="text-rose-500">*</span>
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={formData.heroImage}
                  onChange={(e) => setFormData({ ...formData, heroImage: e.target.value })}
                  className="flex-1 p-2.5 text-xs bg-[#F7F5F0] border border-[#E8E6E1] rounded-xl"
                />
              </div>
              <div className="mt-2 w-full h-44 rounded-2xl overflow-hidden bg-stone-100 border border-[#E8E6E1]">
                <img
                  src={formData.heroImage}
                  alt="Hero Cover Preview"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Gallery Images */}
            <div>
              <label className="text-xs font-bold text-stone-700 block mb-1">Additional Gallery Photos</label>
              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  value={newImageUrl}
                  onChange={(e) => setNewImageUrl(e.target.value)}
                  placeholder="Paste image URL here..."
                  className="flex-1 p-2.5 text-xs bg-[#F7F5F0] border border-[#E8E6E1] rounded-xl"
                />
                <button
                  type="button"
                  onClick={handleAddGalleryImage}
                  className="px-4 py-2.5 bg-[#102A43] text-white text-xs font-bold rounded-xl hover:bg-[#1A3B5C]"
                >
                  Add Photo
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {formData.gallery.map((img, i) => (
                  <div key={i} className="relative h-24 rounded-xl overflow-hidden group border border-[#E8E6E1]">
                    <img src={img} alt={`Gallery ${i}`} className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => handleRemoveGalleryImage(i)}
                      className="absolute top-1 right-1 p-1 bg-rose-600 text-white rounded-md opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Video Walkthrough */}
            <div>
              <label className="text-xs font-bold text-stone-700 block mb-1">
                YouTube Video / Drone Walkthrough URL (Optional)
              </label>
              <div className="relative">
                <Video className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={formData.videoUrl}
                  onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
                  placeholder="e.g. https://www.youtube.com/watch?v=..."
                  className="w-full pl-10 pr-4 py-2.5 text-xs bg-[#F7F5F0] border border-[#E8E6E1] rounded-xl"
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 7: AMENITIES */}
        {currentStep === 7 && (
          <div className="space-y-5 animate-in fade-in duration-200">
            <div>
              <h2 className="text-xl font-bold text-[#102A43] font-serif">
                Amenities & Special Features
              </h2>
              <p className="text-xs text-stone-500 mt-1">
                Check all features available at this property.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {AMENITY_OPTIONS.map((amenity) => {
                const checked = formData.amenities.includes(amenity);
                return (
                  <div
                    key={amenity}
                    onClick={() => handleToggleAmenity(amenity)}
                    className={`p-3 rounded-xl border cursor-pointer flex items-center justify-between text-xs transition-all ${
                      checked
                        ? 'border-[#102A43] bg-amber-50/50 text-[#102A43] font-bold'
                        : 'border-[#E8E6E1] bg-white text-stone-600 hover:bg-stone-50'
                    }`}
                  >
                    <span>{amenity}</span>
                    <div
                      className={`w-4 h-4 rounded-md border flex items-center justify-center ${
                        checked ? 'bg-[#102A43] border-[#102A43] text-white' : 'border-stone-300'
                      }`}
                    >
                      {checked && <Check className="w-3 h-3" />}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 8: REVIEW & SUBMIT */}
        {currentStep === 8 && (
          <div className="space-y-5 animate-in fade-in duration-200">
            <div>
              <h2 className="text-xl font-bold text-[#102A43] font-serif">
                Review & Confirm Submission
              </h2>
              <p className="text-xs text-stone-500 mt-1">
                Please review your listing information before submitting for administrative approval.
              </p>
            </div>

            {/* Summary Card */}
            <div className="p-5 rounded-2xl bg-[#F7F5F0] border border-[#E8E6E1] space-y-4">
              <div className="flex flex-col sm:flex-row items-start gap-4">
                <img
                  src={formData.heroImage}
                  alt={formData.title}
                  className="w-full sm:w-36 h-24 rounded-xl object-cover"
                />
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-[#102A43] text-white">
                      {formData.listingType}
                    </span>
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-[#C6A15B] text-white">
                      {formData.propertyType}
                    </span>
                  </div>
                  <h3 className="font-bold text-[#102A43] text-base">
                    {formData.title || 'Untitled Property'}
                  </h3>
                  <div className="text-xs text-stone-500">{formData.locality}, Pondicherry</div>
                  <div className="text-base font-extrabold text-[#102A43] font-serif">
                    {formatINR(formData.price)} {formData.listingType === 'RENT' ? '/ mo' : ''}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-[#E8E6E1] text-xs">
                <div>
                  <span className="text-stone-400 block">Bedrooms:</span>
                  <span className="font-bold text-[#102A43]">{formData.bedrooms} BHK</span>
                </div>
                <div>
                  <span className="text-stone-400 block">Bathrooms:</span>
                  <span className="font-bold text-[#102A43]">{formData.bathrooms} Baths</span>
                </div>
                <div>
                  <span className="text-stone-400 block">Area:</span>
                  <span className="font-bold text-[#102A43]">{formData.areaSqFt} Sq.Ft</span>
                </div>
                <div>
                  <span className="text-stone-400 block">Furnishing:</span>
                  <span className="font-bold text-[#102A43]">{formData.furnishing}</span>
                </div>
              </div>
            </div>

            {/* Package & Payment Summary */}
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="text-xs font-bold text-amber-950">
                  Listing Package: {selectedPkg.name}
                </div>
                <div className="text-[11px] text-amber-800">
                  Includes {selectedPkg.durationDays} days visibility and direct lead routing.
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-[#102A43] font-serif">
                  ₹{selectedPkg.price.toLocaleString('en-IN')}
                </div>
                <div className="text-[10px] font-semibold text-emerald-700">UPI / Card Gateway</div>
              </div>
            </div>

            {/* Verification SLA Notice */}
            <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 flex items-start gap-3">
              <Clock className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
              <div className="text-xs text-blue-900 leading-relaxed">
                <strong className="block mb-0.5">Two-Step Verification Process:</strong>
                All property submissions are reviewed by our Puducherry verification desk to ensure legal clearance, accurate coordinates, and genuine seller details. Once approved, the listing is broadcasted live to prospective buyers.
              </div>
            </div>
          </div>
        )}

        {/* Wizard Bottom Buttons */}
        <div className="flex items-center justify-between pt-6 border-t border-[#E8E6E1]">
          {currentStep > 1 ? (
            <button
              type="button"
              onClick={() => setCurrentStep((prev) => Math.max(1, prev - 1))}
              className="px-5 py-2.5 rounded-xl border border-[#E8E6E1] text-xs font-bold text-stone-700 hover:bg-stone-50 flex items-center gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" />
              Previous
            </button>
          ) : (
            <button
              type="button"
              onClick={onCancel}
              className="px-5 py-2.5 rounded-xl border border-[#E8E6E1] text-xs font-bold text-stone-500 hover:bg-stone-50"
            >
              Cancel
            </button>
          )}

          {currentStep < steps.length ? (
            <button
              type="button"
              onClick={() => setCurrentStep((prev) => Math.min(steps.length, prev + 1))}
              className="px-6 py-2.5 rounded-xl bg-[#102A43] text-white text-xs font-bold hover:bg-[#1A3B5C] shadow-sm flex items-center gap-1.5"
            >
              Next Step
              <ArrowRight className="w-4 h-4 text-[#C6A15B]" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="px-8 py-3 rounded-xl bg-[#C6A15B] text-[#102A43] text-xs font-extrabold hover:bg-amber-400 shadow-md flex items-center gap-2 disabled:opacity-50 transition-all"
            >
              {isSubmitting ? (
                'Submitting to Blockchain/Firestore...'
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  Submit Property for Admin Approval
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
