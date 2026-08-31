import React from 'react';
import { useRealEstate } from '../../context/RealEstateContext';
import {
  Scale,
  X,
  Plus,
  MapPin,
  Check,
  Calendar,
  Eye,
} from 'lucide-react';

interface PropertyComparisonViewProps {
  onOpenScheduleModal: (propertyId?: string) => void;
}

export const PropertyComparisonView: React.FC<PropertyComparisonViewProps> = ({
  onOpenScheduleModal,
}) => {
  const {
    properties,
    comparisonList,
    toggleComparison,
    clearComparison,
    setSelectedPropertyId,
    setCustomerPage,
  } = useRealEstate();

  const comparedProperties = properties.filter((p) =>
    comparisonList.includes(p.id)
  );

  const keyAmenities = [
    'Sea View',
    'Swimming Pool',
    'Parking',
    'Power Backup',
    '24/7 Security',
    'Air Conditioning',
    'Modular Kitchen',
    'Solar Panels',
  ];

  if (comparedProperties.length === 0) {
    return (
      <div className="bg-[#F7F5F0] min-h-[70vh] flex items-center justify-center py-20 px-4">
        <div className="bg-white rounded-3xl border border-[#E8E6E1] p-10 max-w-lg w-full text-center shadow-sm">
          <div className="w-16 h-16 rounded-2xl bg-[#F7F5F0] text-[#102A43] flex items-center justify-center mx-auto mb-4 border border-[#E8E6E1]">
            <Scale className="w-8 h-8 text-[#C6A15B]" />
          </div>
          <h2 className="text-2xl font-bold font-serif text-[#102A43]">
            No Properties in Comparison
          </h2>
          <p className="text-xs text-[#52606D] mt-2 leading-relaxed font-normal">
            Select up to 3 properties from our listings to compare their pricing, specs, floor plans, and amenities side-by-side.
          </p>
          <button
            onClick={() => setCustomerPage('properties')}
            className="mt-6 px-6 py-3 rounded-xl bg-[#102A43] text-white font-semibold text-xs shadow-md hover:bg-[#0B1D30] transition-colors cursor-pointer"
          >
            Browse Properties to Compare
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F7F5F0] min-h-screen pb-24 text-[#20252B]">
      {/* Header */}
      <div className="bg-white border-b border-[#E8E6E1] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#C6A15B] bg-[#F7F5F0] px-3 py-1 rounded-full border border-[#E8E6E1]">
              Side-by-Side Evaluation
            </span>
            <h1 className="text-3xl font-bold font-serif text-[#102A43] mt-2">
              Property Comparison Matrix
            </h1>
            <p className="text-xs text-[#52606D] mt-1 font-normal">
              Comparing {comparedProperties.length} of max 3 properties
            </p>
          </div>

          <div className="flex items-center gap-3">
            {comparedProperties.length < 3 && (
              <button
                onClick={() => setCustomerPage('properties')}
                className="px-4 py-2 rounded-xl bg-[#F7F5F0] hover:bg-[#E8E6E1] text-[#102A43] font-semibold text-xs flex items-center gap-1.5 transition-colors border border-[#E8E6E1] cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Another Property</span>
              </button>
            )}

            <button
              onClick={clearComparison}
              className="px-4 py-2 rounded-xl text-rose-600 hover:bg-rose-50 text-xs font-semibold transition-colors cursor-pointer"
            >
              Clear All
            </button>
          </div>
        </div>
      </div>

      {/* Comparison Table */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="bg-white rounded-3xl border border-[#E8E6E1] shadow-xs overflow-hidden overflow-x-auto">
          <table className="w-full min-w-[700px] text-left border-collapse">
            <thead>
              <tr className="border-b border-[#E8E6E1] bg-[#F7F5F0]">
                <th className="p-5 text-xs font-bold uppercase tracking-wider text-[#52606D] w-1/4">
                  Feature / Specification
                </th>
                {comparedProperties.map((p) => (
                  <th key={p.id} className="p-5 w-1/4 align-top">
                    <div className="relative group">
                      <button
                        onClick={() => toggleComparison(p.id)}
                        className="absolute top-2 right-2 p-1.5 rounded-full bg-black/60 hover:bg-rose-600 text-white transition-colors z-10 cursor-pointer"
                        title="Remove from comparison"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>

                      <div className="h-40 rounded-2xl overflow-hidden mb-3 border border-[#E8E6E1]">
                        <img
                          src={p.heroImage}
                          alt={p.title}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <span className="text-[11px] font-bold uppercase text-[#C6A15B] bg-[#F7F5F0] px-2.5 py-0.5 rounded-full border border-[#E8E6E1]">
                        {p.status}
                      </span>
                      <h3 className="text-sm font-bold text-[#102A43] font-serif mt-1.5 line-clamp-1">
                        {p.title}
                      </h3>
                      <div className="text-xs text-[#52606D] flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3 text-[#C6A15B]" />
                        <span>{p.locality}</span>
                      </div>
                      <div className="text-lg font-bold font-serif text-[#102A43] mt-2">
                        {p.displayPrice}
                      </div>

                      <div className="mt-4 flex flex-col gap-2">
                        <button
                          onClick={() => {
                            setSelectedPropertyId(p.id);
                            setCustomerPage('property-detail');
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                          className="w-full py-2 rounded-xl bg-[#F7F5F0] hover:bg-[#E8E6E1] text-[#102A43] text-xs font-semibold flex items-center justify-center gap-1.5 border border-[#E8E6E1] cursor-pointer"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>View Detail</span>
                        </button>
                        <button
                          onClick={() => onOpenScheduleModal(p.id)}
                          className="w-full py-2 rounded-xl bg-[#102A43] hover:bg-[#0B1D30] text-white text-xs font-semibold flex items-center justify-center gap-1.5 shadow-2xs cursor-pointer"
                        >
                          <Calendar className="w-3.5 h-3.5 text-[#C6A15B]" />
                          <span>Schedule Visit</span>
                        </button>
                      </div>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-[#E8E6E1] text-xs">
              {/* Property Type */}
              <tr>
                <td className="p-4 font-semibold text-[#52606D] bg-[#F7F5F0]/50">
                  Property Type
                </td>
                {comparedProperties.map((p) => (
                  <td key={p.id} className="p-4 font-bold text-[#102A43]">
                    {p.propertyType}
                  </td>
                ))}
              </tr>

              {/* Bedrooms & Bathrooms */}
              <tr>
                <td className="p-4 font-semibold text-[#52606D] bg-[#F7F5F0]/50">
                  Bedrooms / Bathrooms
                </td>
                {comparedProperties.map((p) => (
                  <td key={p.id} className="p-4 text-[#20252B]">
                    <span className="font-bold">{p.specs?.bedrooms ?? 0} BHK</span> /{' '}
                    <span>{p.specs?.bathrooms ?? 0} Baths</span>
                  </td>
                ))}
              </tr>

              {/* Super Built-up Area */}
              <tr>
                <td className="p-4 font-semibold text-[#52606D] bg-[#F7F5F0]/50">
                  Total Area (Sq.Ft)
                </td>
                {comparedProperties.map((p) => (
                  <td key={p.id} className="p-4 font-bold text-[#102A43]">
                    {p.specs?.areaSqFt ?? 0} sq.ft
                  </td>
                ))}
              </tr>

              {/* Price per sqft */}
              <tr>
                <td className="p-4 font-semibold text-[#52606D] bg-[#F7F5F0]/50">
                  Price / Sq.Ft
                </td>
                {comparedProperties.map((p) => (
                  <td key={p.id} className="p-4 text-[#20252B] font-medium">
                    {p.pricePerSqFt ? `₹ ${p.pricePerSqFt.toLocaleString('en-IN')}` : 'N/A'}
                  </td>
                ))}
              </tr>

              {/* Furnishing */}
              <tr>
                <td className="p-4 font-semibold text-[#52606D] bg-[#F7F5F0]/50">
                  Furnishing
                </td>
                {comparedProperties.map((p) => (
                  <td key={p.id} className="p-4 text-[#20252B] font-medium">
                    {p.specs?.furnishing || 'Standard'}
                  </td>
                ))}
              </tr>

              {/* Facing */}
              <tr>
                <td className="p-4 font-semibold text-[#52606D] bg-[#F7F5F0]/50">
                  Facing Direction
                </td>
                {comparedProperties.map((p) => (
                  <td key={p.id} className="p-4 text-[#20252B]">
                    {p.specs?.facing || 'East'}
                  </td>
                ))}
              </tr>

              {/* Car Parking */}
              <tr>
                <td className="p-4 font-semibold text-[#52606D] bg-[#F7F5F0]/50">
                  Car Parking Slots
                </td>
                {comparedProperties.map((p) => (
                  <td key={p.id} className="p-4 text-[#20252B]">
                    {p.specs?.carParking || 2} Covered
                  </td>
                ))}
              </tr>

              {/* Possession */}
              <tr>
                <td className="p-4 font-semibold text-[#52606D] bg-[#F7F5F0]/50">
                  Possession Status
                </td>
                {comparedProperties.map((p) => (
                  <td key={p.id} className="p-4 text-[#C6A15B] font-bold">
                    {p.specs?.possession || 'Ready to Move'}
                  </td>
                ))}
              </tr>

              {/* Amenities Section Header */}
              <tr className="bg-[#F7F5F0]">
                <td
                  colSpan={comparedProperties.length + 1}
                  className="p-3 font-bold text-[#102A43] uppercase tracking-wider text-[11px]"
                >
                  Amenities & Facilities Breakdown
                </td>
              </tr>

              {/* Individual Amenity Checks */}
              {keyAmenities.map((amenity) => (
                <tr key={amenity}>
                  <td className="p-4 font-medium text-[#52606D] bg-[#F7F5F0]/50">
                    {amenity}
                  </td>
                  {comparedProperties.map((p) => {
                    const has = Array.isArray(p.amenities) && p.amenities.includes(amenity);
                    return (
                      <td key={p.id} className="p-4">
                        {has ? (
                          <div className="inline-flex items-center gap-1.5 text-[#102A43] font-bold">
                            <div className="w-5 h-5 rounded-full bg-[#F7F5F0] border border-[#E8E6E1] flex items-center justify-center">
                              <Check className="w-3.5 h-3.5 text-[#C6A15B]" />
                            </div>
                            <span>Included</span>
                          </div>
                        ) : (
                          <span className="text-[#52606D]/40 font-medium">—</span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
