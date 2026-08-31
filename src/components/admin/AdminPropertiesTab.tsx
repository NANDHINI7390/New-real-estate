import React, { useState } from 'react';
import { useRealEstate } from '../../context/RealEstateContext';
import { Property, PropertyStatus } from '../../types';
import { formatINR } from '../../data/mockData';
import {
  Plus,
  Search,
  Trash2,
  Edit,
  Eye,
} from 'lucide-react';

interface AdminPropertiesTabProps {
  onOpenAddPropertyModal: () => void;
}

export const AdminPropertiesTab: React.FC<AdminPropertiesTabProps> = ({
  onOpenAddPropertyModal,
}) => {
  const {
    properties,
    updatePropertyStatus,
    updatePropertyPrice,
    deleteProperty,
    setSelectedPropertyId,
    setViewMode,
    setCustomerPage,
  } = useRealEstate();

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | PropertyStatus>('ALL');
  const [typeFilter, setTypeFilter] = useState('ALL');

  // Edit price dialog state
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);
  const [newPrice, setNewPrice] = useState<number>(0);
  const [newDisplayPrice, setNewDisplayPrice] = useState('');

  const filteredProperties = properties.filter((p) => {
    if (search.trim()) {
      const q = search.toLowerCase();
      const match =
        p.title.toLowerCase().includes(q) ||
        p.locality.toLowerCase().includes(q) ||
        p.id.toLowerCase().includes(q);
      if (!match) return false;
    }
    if (statusFilter !== 'ALL' && p.status !== statusFilter) return false;
    if (typeFilter !== 'ALL' && p.propertyType !== typeFilter) return false;
    return true;
  });

  const handleOpenEditPrice = (p: Property) => {
    setEditingProperty(p);
    setNewPrice(p.price);
    setNewDisplayPrice(p.displayPrice);
  };

  const handleSavePrice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProperty) return;
    updatePropertyPrice(editingProperty.id, newPrice, newDisplayPrice);
    setEditingProperty(null);
  };

  const handleViewOnCustomerSite = (id: string) => {
    setSelectedPropertyId(id);
    setCustomerPage('property-detail');
    setViewMode('customer');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto text-[#20252B]">
      {/* Edit Price Modal */}
      {editingProperty && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-[#E8E6E1] animate-in fade-in zoom-in duration-200">
            <h3 className="text-lg font-bold font-serif text-[#102A43] mb-1">
              Update Property Price
            </h3>
            <p className="text-xs text-[#52606D] mb-4 font-normal">{editingProperty.title}</p>

            <form onSubmit={handleSavePrice} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#102A43] mb-1">
                  Numeric Price (INR)
                </label>
                <input
                  type="number"
                  required
                  value={newPrice}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    setNewPrice(val);
                    setNewDisplayPrice(formatINR(val));
                  }}
                  className="w-full text-xs bg-[#F7F5F0] border border-[#E8E6E1] rounded-xl px-3 py-2 text-[#20252B] focus:outline-hidden focus:border-[#C6A15B]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#102A43] mb-1">
                  Formatted Display Price
                </label>
                <input
                  type="text"
                  required
                  value={newDisplayPrice}
                  onChange={(e) => setNewDisplayPrice(e.target.value)}
                  className="w-full text-xs bg-[#F7F5F0] border border-[#E8E6E1] rounded-xl px-3 py-2 text-[#20252B] focus:outline-hidden focus:border-[#C6A15B]"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingProperty(null)}
                  className="flex-1 py-2.5 rounded-xl bg-[#F7F5F0] text-[#52606D] text-xs font-semibold hover:bg-[#E8E6E1] transition-colors border border-[#E8E6E1] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-[#102A43] text-white text-xs font-bold hover:bg-[#0B1D30] transition-colors shadow-xs cursor-pointer"
                >
                  Save & Sync
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Top Action Bar */}
      <div className="bg-white rounded-3xl border border-[#E8E6E1] p-4 sm:p-6 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-[#52606D] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by title, location or Ref ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl text-xs bg-[#F7F5F0] border border-[#E8E6E1] text-[#20252B] focus:outline-hidden focus:border-[#C6A15B]"
          />
        </div>

        {/* Filters and New Property Button */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-between md:justify-end">
          {/* Status filter */}
          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value as 'ALL' | PropertyStatus)
            }
            className="text-xs font-semibold bg-[#F7F5F0] border border-[#E8E6E1] rounded-xl px-3 py-2 text-[#102A43] focus:outline-hidden cursor-pointer"
          >
            <option value="ALL">All Statuses</option>
            <option value="AVAILABLE">Available</option>
            <option value="UNDER_OFFER">Under Offer</option>
            <option value="SOLD">Sold</option>
          </select>

          {/* Type filter */}
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="text-xs font-semibold bg-[#F7F5F0] border border-[#E8E6E1] rounded-xl px-3 py-2 text-[#102A43] focus:outline-hidden cursor-pointer"
          >
            <option value="ALL">All Types</option>
            <option value="Villa">Villa</option>
            <option value="Apartment">Apartment</option>
            <option value="Independent House">House</option>
            <option value="Plot">Plot</option>
          </select>

          <button
            onClick={onOpenAddPropertyModal}
            className="px-4 py-2 rounded-xl bg-[#102A43] hover:bg-[#0B1D30] text-white text-xs font-bold shadow-xs transition-all flex items-center gap-1.5 cursor-pointer active:scale-98"
          >
            <Plus className="w-4 h-4 text-[#C6A15B]" />
            <span>+ Add Listing</span>
          </button>
        </div>
      </div>

      {/* Properties Table & Responsive Container */}
      <div className="bg-white rounded-3xl border border-[#E8E6E1] shadow-xs overflow-hidden">
        {/* Mobile View */}
        <div className="md:hidden divide-y divide-[#E8E6E1] p-4 space-y-4">
          {filteredProperties.map((p) => (
            <div key={p.id} className="pt-4 first:pt-0 space-y-3">
              <div className="flex items-center gap-3">
                <img
                  src={p.heroImage}
                  alt={p.title}
                  className="w-16 h-16 rounded-xl object-cover border border-[#E8E6E1] shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <span className="text-[10px] font-bold text-[#52606D] uppercase">
                      {p.id}
                    </span>
                    <span className="text-xs font-bold font-serif text-[#102A43]">
                      {p.displayPrice}
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-[#102A43] font-serif truncate">
                    {p.title}
                  </h4>
                  <div className="text-[11px] text-[#52606D]">
                    {p.propertyType} • {p.specs.areaSqFt} sq.ft • {p.locality}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between gap-2 pt-1 border-t border-[#E8E6E1]">
                <select
                  value={p.status}
                  onChange={(e) =>
                    updatePropertyStatus(p.id, e.target.value as PropertyStatus)
                  }
                  className={`text-xs font-bold rounded-lg px-2.5 py-1 border cursor-pointer ${
                    p.status === 'AVAILABLE'
                      ? 'bg-[#F7F5F0] text-[#102A43] border-[#E8E6E1]'
                      : p.status === 'UNDER_OFFER'
                      ? 'bg-amber-50 text-amber-800 border-amber-200'
                      : 'bg-stone-200 text-stone-700 border-stone-300'
                  }`}
                >
                  <option value="AVAILABLE">Available</option>
                  <option value="UNDER_OFFER">Under Offer</option>
                  <option value="SOLD">Sold</option>
                </select>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleOpenEditPrice(p)}
                    className="p-1.5 rounded-lg border border-[#E8E6E1] text-[#102A43] hover:bg-[#F7F5F0] cursor-pointer"
                    title="Edit Price"
                  >
                    <Edit className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleViewOnCustomerSite(p.id)}
                    className="p-1.5 rounded-lg border border-[#E8E6E1] text-[#102A43] hover:bg-[#F7F5F0] cursor-pointer"
                    title="View Property"
                  >
                    <Eye className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => deleteProperty(p.id)}
                    className="p-1.5 rounded-lg border border-[#E8E6E1] text-rose-600 hover:bg-rose-50 cursor-pointer"
                    title="Delete"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop View */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse min-w-[800px]">
            <thead>
              <tr className="border-b border-[#E8E6E1] bg-[#F7F5F0] text-[#52606D] font-bold uppercase tracking-wider text-[11px]">
                <th className="p-4">Property</th>
                <th className="p-4">Type & Area</th>
                <th className="p-4">Listing Price</th>
                <th className="p-4">Locality</th>
                <th className="p-4">Inventory Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[#E8E6E1]">
              {filteredProperties.map((p) => (
                <tr key={p.id} className="hover:bg-[#F7F5F0]/60 transition-colors">
                  {/* Property thumbnail + title */}
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={p.heroImage}
                        alt={p.title}
                        className="w-14 h-14 rounded-xl object-cover border border-[#E8E6E1] shrink-0"
                      />
                      <div>
                        <span className="text-[10px] font-bold text-[#52606D] uppercase">
                          {p.id}
                        </span>
                        <h4 className="text-xs font-bold text-[#102A43] font-serif line-clamp-1 max-w-[220px]">
                          {p.title}
                        </h4>
                        <div className="flex items-center gap-2 mt-1">
                          {p.isFeatured && (
                            <span className="text-[10px] font-bold text-[#C6A15B] bg-[#F7F5F0] px-2 py-0.5 rounded border border-[#E8E6E1]">
                              Featured
                            </span>
                          )}
                          {p.isNew && (
                            <span className="text-[10px] font-bold text-[#102A43] bg-[#E8E6E1] px-2 py-0.5 rounded">
                              New
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Type & Specs */}
                  <td className="p-4">
                    <div className="font-bold text-[#102A43]">{p.propertyType}</div>
                    <div className="text-[#52606D] text-[11px] mt-0.5 font-normal">
                      {p.specs.bedrooms > 0 ? `${p.specs.bedrooms} BHK • ` : ''}
                      {p.specs.areaSqFt} sq.ft
                    </div>
                  </td>

                  {/* Price */}
                  <td className="p-4">
                    <div className="font-bold text-[#102A43] font-serif text-sm">
                      {p.displayPrice}
                    </div>
                    <button
                      onClick={() => handleOpenEditPrice(p)}
                      className="text-[11px] text-[#C6A15B] hover:underline font-semibold flex items-center gap-0.5 mt-0.5 cursor-pointer"
                    >
                      <Edit className="w-3 h-3" />
                      <span>Quick Edit</span>
                    </button>
                  </td>

                  {/* Locality */}
                  <td className="p-4">
                    <div className="font-semibold text-[#102A43]">{p.locality}</div>
                    <div className="text-[11px] text-[#52606D] line-clamp-1 font-normal">
                      {p.location}
                    </div>
                  </td>

                  {/* Status Dropdown */}
                  <td className="p-4">
                    <select
                      value={p.status}
                      onChange={(e) =>
                        updatePropertyStatus(p.id, e.target.value as PropertyStatus)
                      }
                      className={`text-xs font-bold rounded-lg px-2.5 py-1.5 border cursor-pointer focus:outline-hidden ${
                        p.status === 'AVAILABLE'
                          ? 'bg-[#F7F5F0] text-[#102A43] border-[#E8E6E1]'
                          : p.status === 'UNDER_OFFER'
                          ? 'bg-amber-50 text-amber-800 border-amber-200'
                          : 'bg-stone-200 text-stone-700 border-stone-300'
                      }`}
                    >
                      <option value="AVAILABLE">Available</option>
                      <option value="UNDER_OFFER">Under Offer</option>
                      <option value="SOLD">Sold</option>
                    </select>
                  </td>

                  {/* Actions */}
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleViewOnCustomerSite(p.id)}
                        title="View on customer portal"
                        className="p-1.5 rounded-lg border border-[#E8E6E1] hover:bg-[#F7F5F0] text-[#102A43] transition-colors cursor-pointer"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deleteProperty(p.id)}
                        title="Delete listing"
                        className="p-1.5 rounded-lg border border-[#E8E6E1] hover:bg-rose-50 hover:border-rose-200 text-rose-600 transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
