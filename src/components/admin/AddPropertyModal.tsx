import React, { useState } from 'react';
import { useRealEstate } from '../../context/RealEstateContext';
import { PropertyType, ListingType } from '../../types';
import { formatINR } from '../../data/mockData';
import {
  X,
  Plus,
  CheckCircle2,
} from 'lucide-react';

interface AddPropertyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddPropertyModal: React.FC<AddPropertyModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { addProperty, agents } = useRealEstate();

  const [title, setTitle] = useState('');
  const [tagline, setTagline] = useState('');
  const [propertyType, setPropertyType] = useState<PropertyType>('Villa');
  const [listingType, setListingType] = useState<ListingType>('BUY');
  const [price, setPrice] = useState<number>(35000000);
  const [locality, setLocality] = useState('White Town');
  const [subLocation, setSubLocation] = useState('Rue Dumas');
  const [location, setLocation] = useState('White Town, Puducherry');
  const [bedrooms, setBedrooms] = useState(4);
  const [bathrooms, setBathrooms] = useState(4);
  const [areaSqFt, setAreaSqFt] = useState(3200);
  const [furnishing, setFurnishing] = useState<'Furnished' | 'Unfurnished' | 'Semi-Furnished'>('Furnished');
  const [facing, setFacing] = useState('East');
  const [heroImage, setHeroImage] = useState(
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'
  );
  const [description, setDescription] = useState(
    'Exquisite luxury residence featuring traditional coastal French architecture, soaring high ceilings, landscaped inner courtyard, modern Italian modular kitchen, and private rooftop terrace.'
  );
  const [agentId, setAgentId] = useState(agents[0]?.id || 'agent-1');
  const [isFeatured, setIsFeatured] = useState(true);
  const [isNew, setIsNew] = useState(true);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !locality || !price) return;

    addProperty({
      title,
      tagline: tagline || `Exclusive ${bedrooms} BHK ${propertyType} in ${locality}`,
      propertyType,
      listingType,
      status: 'AVAILABLE',
      price,
      displayPrice: formatINR(price) + (listingType === 'RENT' ? ' / mo' : ''),
      priceNegotiable: true,
      pricePerSqFt: Math.round(price / areaSqFt),
      location,
      locality,
      subLocation,
      heroImage,
      gallery: [
        heroImage,
        'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80',
      ],
      specs: {
        bedrooms,
        bathrooms,
        areaSqFt,
        furnishing,
        facing,
        floor: 'Independent 2-Level',
        totalFloors: '2 Floors',
        carParking: 2,
        possession: 'Ready to Move',
        ageOfProperty: 'New Construction',
        ownership: 'Freehold Clear Title',
      },
      amenities: [
        'Sea View',
        'Swimming Pool',
        'Parking',
        'Power Backup',
        '24/7 Security',
        'Air Conditioning',
        'Modular Kitchen',
        'Solar Panels',
      ],
      highlights: [
        '100% Clear DTCP & RERA Legal Title',
        'Walking distance to Beach Promenade',
        'Bespoke Teakwood woodwork & European fittings',
        'Independent borewell & rainwater harvesting setup',
      ],
      nearbyFacilities: [
        { name: 'Promenade Beach Walkway', distance: '300 m' },
        { name: 'French Quarter Cafés', distance: '200 m' },
        { name: 'Aurobindo Ashram', distance: '800 m' },
        { name: 'Apollo Multi-specialty Clinic', distance: '1.2 km' },
      ],
      description,
      agentId,
      isFeatured,
      isNew,
      mapCoordinates: { lat: 11.934, lng: 79.8358 },
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-[#E8E6E1] animate-in fade-in zoom-in duration-200 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="bg-[#102A43] text-white p-6 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#C6A15B]/20 text-[#C6A15B] flex items-center justify-center">
              <Plus className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold font-serif">Add New Property Listing</h3>
              <p className="text-xs text-white/80 font-normal">
                Instantly published to both Admin Inventory & Customer Showcase
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white/70 hover:text-white p-1 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 text-xs">
          {/* Title & Tagline */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-[#102A43] mb-1">
                Property Title *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Villa La Mer French Quarter"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-[#F7F5F0] border border-[#E8E6E1] rounded-xl px-3 py-2 text-[#20252B] focus:outline-hidden focus:border-[#C6A15B]"
              />
            </div>

            <div>
              <label className="block font-semibold text-[#102A43] mb-1">
                Tagline / Summary
              </label>
              <input
                type="text"
                placeholder="e.g. Colonial courtyards & private pool"
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                className="w-full bg-[#F7F5F0] border border-[#E8E6E1] rounded-xl px-3 py-2 text-[#20252B] focus:outline-hidden focus:border-[#C6A15B]"
              />
            </div>
          </div>

          {/* Property Type, Purpose, Price */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block font-semibold text-[#102A43] mb-1">
                Property Type *
              </label>
              <select
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value as PropertyType)}
                className="w-full bg-[#F7F5F0] border border-[#E8E6E1] rounded-xl px-3 py-2 text-[#20252B] focus:outline-hidden focus:border-[#C6A15B]"
              >
                <option value="Villa">Luxury Villa</option>
                <option value="Apartment">Apartment</option>
                <option value="Independent House">Independent House</option>
                <option value="Plot">Residential Plot</option>
                <option value="Commercial">Commercial</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-[#102A43] mb-1">
                Listing Purpose *
              </label>
              <select
                value={listingType}
                onChange={(e) => setListingType(e.target.value as ListingType)}
                className="w-full bg-[#F7F5F0] border border-[#E8E6E1] rounded-xl px-3 py-2 text-[#20252B] focus:outline-hidden focus:border-[#C6A15B]"
              >
                <option value="BUY">For Sale (Buy)</option>
                <option value="RENT">For Rent / Lease</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-[#102A43] mb-1">
                Price in INR * ({formatINR(price)})
              </label>
              <input
                type="number"
                required
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="w-full bg-[#F7F5F0] border border-[#E8E6E1] rounded-xl px-3 py-2 text-[#20252B] focus:outline-hidden focus:border-[#C6A15B]"
              />
            </div>
          </div>

          {/* Locality, Sublocation, Location */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block font-semibold text-[#102A43] mb-1">
                Locality / Area *
              </label>
              <select
                value={locality}
                onChange={(e) => setLocality(e.target.value)}
                className="w-full bg-[#F7F5F0] border border-[#E8E6E1] rounded-xl px-3 py-2 text-[#20252B] focus:outline-hidden focus:border-[#C6A15B]"
              >
                <option value="White Town">White Town</option>
                <option value="ECR">East Coast Road (ECR)</option>
                <option value="Kottakuppam">Auroville / Kottakuppam</option>
                <option value="Oulgaret">Oulgaret</option>
                <option value="Anna Nagar">Anna Nagar</option>
                <option value="Pondy Marina">Pondy Marina</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-[#102A43] mb-1">
                Sub-Location (Street/Enclave)
              </label>
              <input
                type="text"
                value={subLocation}
                onChange={(e) => setSubLocation(e.target.value)}
                className="w-full bg-[#F7F5F0] border border-[#E8E6E1] rounded-xl px-3 py-2 text-[#20252B] focus:outline-hidden focus:border-[#C6A15B]"
              />
            </div>

            <div>
              <label className="block font-semibold text-[#102A43] mb-1">
                Full Address
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full bg-[#F7F5F0] border border-[#E8E6E1] rounded-xl px-3 py-2 text-[#20252B] focus:outline-hidden focus:border-[#C6A15B]"
              />
            </div>
          </div>

          {/* Specs: Bedrooms, Bathrooms, Area, Furnishing, Facing */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            <div>
              <label className="block font-semibold text-[#102A43] mb-1">
                Bedrooms (BHK)
              </label>
              <input
                type="number"
                min="0"
                max="10"
                value={bedrooms}
                onChange={(e) => setBedrooms(Number(e.target.value))}
                className="w-full bg-[#F7F5F0] border border-[#E8E6E1] rounded-xl px-3 py-2 text-[#20252B] focus:outline-hidden focus:border-[#C6A15B]"
              />
            </div>

            <div>
              <label className="block font-semibold text-[#102A43] mb-1">
                Bathrooms
              </label>
              <input
                type="number"
                min="0"
                max="10"
                value={bathrooms}
                onChange={(e) => setBathrooms(Number(e.target.value))}
                className="w-full bg-[#F7F5F0] border border-[#E8E6E1] rounded-xl px-3 py-2 text-[#20252B] focus:outline-hidden focus:border-[#C6A15B]"
              />
            </div>

            <div>
              <label className="block font-semibold text-[#102A43] mb-1">
                Area (Sq.Ft)
              </label>
              <input
                type="number"
                value={areaSqFt}
                onChange={(e) => setAreaSqFt(Number(e.target.value))}
                className="w-full bg-[#F7F5F0] border border-[#E8E6E1] rounded-xl px-3 py-2 text-[#20252B] focus:outline-hidden focus:border-[#C6A15B]"
              />
            </div>

            <div>
              <label className="block font-semibold text-[#102A43] mb-1">
                Furnishing
              </label>
              <select
                value={furnishing}
                onChange={(e) => setFurnishing(e.target.value as any)}
                className="w-full bg-[#F7F5F0] border border-[#E8E6E1] rounded-xl px-2.5 py-2 text-[#20252B] focus:outline-hidden focus:border-[#C6A15B]"
              >
                <option value="Furnished">Furnished</option>
                <option value="Semi-Furnished">Semi</option>
                <option value="Unfurnished">Unfurnished</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-[#102A43] mb-1">
                Facing
              </label>
              <select
                value={facing}
                onChange={(e) => setFacing(e.target.value)}
                className="w-full bg-[#F7F5F0] border border-[#E8E6E1] rounded-xl px-2.5 py-2 text-[#20252B] focus:outline-hidden focus:border-[#C6A15B]"
              >
                <option value="East">East</option>
                <option value="North">North</option>
                <option value="South">South</option>
                <option value="West">West</option>
              </select>
            </div>
          </div>

          {/* Hero Image URL */}
          <div>
            <label className="block font-semibold text-[#102A43] mb-1">
              Hero Image URL
            </label>
            <input
              type="url"
              required
              value={heroImage}
              onChange={(e) => setHeroImage(e.target.value)}
              className="w-full bg-[#F7F5F0] border border-[#E8E6E1] rounded-xl px-3 py-2 text-[#20252B] focus:outline-hidden focus:border-[#C6A15B]"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block font-semibold text-[#102A43] mb-1">
              Property Description
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-[#F7F5F0] border border-[#E8E6E1] rounded-xl p-3 text-[#20252B] focus:outline-hidden focus:border-[#C6A15B] resize-none"
            />
          </div>

          {/* Agent & Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center pt-2">
            <div>
              <label className="block font-semibold text-[#102A43] mb-1">
                Assigned Advisor
              </label>
              <select
                value={agentId}
                onChange={(e) => setAgentId(e.target.value)}
                className="w-full bg-[#F7F5F0] border border-[#E8E6E1] rounded-xl px-3 py-2 text-[#20252B] focus:outline-hidden focus:border-[#C6A15B]"
              >
                {agents.map((a) => (
                  <option key={a.id} value={a.id}>
                    {a.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2 pt-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isFeatured}
                  onChange={(e) => setIsFeatured(e.target.checked)}
                  className="rounded text-[#102A43] focus:ring-[#C6A15B]"
                />
                <span className="font-semibold text-[#102A43]">Featured Listing</span>
              </label>
            </div>

            <div className="flex items-center gap-2 pt-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isNew}
                  onChange={(e) => setIsNew(e.target.checked)}
                  className="rounded text-[#102A43] focus:ring-[#C6A15B]"
                />
                <span className="font-semibold text-[#102A43]">New Arrival Tag</span>
              </label>
            </div>
          </div>

          {/* Submit */}
          <div className="pt-4 border-t border-[#E8E6E1] flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl bg-[#F7F5F0] text-[#52606D] font-semibold hover:bg-[#E8E6E1] transition-colors border border-[#E8E6E1] cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-[#102A43] hover:bg-[#0B1D30] text-white font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4 text-[#C6A15B]" />
              <span>Publish Listing</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
