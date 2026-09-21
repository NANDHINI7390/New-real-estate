import React, { useState } from 'react';
import { useRealEstate } from '../../context/RealEstateContext';
import { ListingPackage } from '../../types';
import {
  Package,
  Plus,
  Edit2,
  Trash2,
  Check,
  X,
  Sparkles,
  DollarSign,
  Calendar,
  Layers,
  ShieldCheck,
  Save,
} from 'lucide-react';
import { formatINR } from '../../data/mockData';

export const AdminPackagesTab: React.FC = () => {
  const { packages, savePackage, deletePackage } = useRealEstate();
  const [editingPkg, setEditingPkg] = useState<ListingPackage | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [featureInput, setFeatureInput] = useState('');

  const handleStartCreate = () => {
    setIsCreating(true);
    setEditingPkg({
      id: 'pkg-' + Date.now(),
      name: 'Custom Promotional Plan',
      tagline: 'Tailored for specialized commercial or developer projects',
      price: 3499,
      durationDays: 45,
      listingLimit: 2,
      isFeaturedPlacement: true,
      isPremiumPlacement: false,
      badgeText: 'Special',
      features: [
        'Priority placement for 45 days',
        'Up to 12 HD property photos',
        'Direct buyer WhatsApp inquiries',
      ],
      isActive: true,
    });
  };

  const handleStartEdit = (pkg: ListingPackage) => {
    setIsCreating(false);
    setEditingPkg({ ...pkg, features: [...pkg.features] });
  };

  const handleAddFeature = () => {
    if (!featureInput.trim() || !editingPkg) return;
    setEditingPkg({
      ...editingPkg,
      features: [...editingPkg.features, featureInput.trim()],
    });
    setFeatureInput('');
  };

  const handleRemoveFeature = (index: number) => {
    if (!editingPkg) return;
    setEditingPkg({
      ...editingPkg,
      features: editingPkg.features.filter((_, i) => i !== index),
    });
  };

  const handleSave = async () => {
    if (!editingPkg) return;
    await savePackage(editingPkg);
    setEditingPkg(null);
    setIsCreating(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 border border-[#E8E6E1] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#102A43] text-white">
              <Package className="w-3.5 h-3.5 text-[#C6A15B]" />
              Monetization Engine
            </span>
            <span className="text-xs text-stone-500">Live Firestore Schema</span>
          </div>
          <h1 className="text-2xl font-bold text-[#102A43] font-serif mt-2">
            Listing Packages & Monetization
          </h1>
          <p className="text-sm text-stone-600 mt-1">
            Configure listing tiers, prices, durations, and placement privileges for Property Owners and Agents.
          </p>
        </div>

        <button
          onClick={handleStartCreate}
          className="px-4 py-2.5 rounded-xl bg-[#102A43] hover:bg-[#1A3B5C] text-white text-xs font-bold flex items-center gap-2 shadow-sm transition-all"
        >
          <Plus className="w-4 h-4 text-[#C6A15B]" />
          Create New Package
        </button>
      </div>

      {/* Package Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {packages.map((pkg) => {
          const isFeatured = pkg.isFeaturedPlacement;
          const isPremium = pkg.isPremiumPlacement;

          return (
            <div
              key={pkg.id}
              className={`bg-white rounded-2xl border transition-all relative flex flex-col justify-between overflow-hidden shadow-xs hover:shadow-md ${
                isPremium
                  ? 'border-[#C6A15B] ring-2 ring-[#C6A15B]/20'
                  : isFeatured
                  ? 'border-[#102A43]/40'
                  : 'border-[#E8E6E1]'
              }`}
            >
              {/* Top Accent Strip */}
              <div
                className={`h-2.5 w-full ${
                  isPremium
                    ? 'bg-linear-to-r from-[#C6A15B] to-amber-300'
                    : isFeatured
                    ? 'bg-[#102A43]'
                    : 'bg-stone-300'
                }`}
              />

              <div className="p-6 flex-1 space-y-4">
                <div className="flex items-center justify-between">
                  <span
                    className={`px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ${
                      isPremium
                        ? 'bg-amber-100 text-amber-900 border border-amber-300'
                        : isFeatured
                        ? 'bg-blue-100 text-blue-900'
                        : 'bg-stone-100 text-stone-700'
                    }`}
                  >
                    {pkg.badgeText || 'Listing Plan'}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`w-2 h-2 rounded-full ${
                        pkg.isActive ? 'bg-emerald-500' : 'bg-stone-400'
                      }`}
                    />
                    <span className="text-[11px] font-medium text-stone-500">
                      {pkg.isActive ? 'Active' : 'Disabled'}
                    </span>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-[#102A43] font-serif">{pkg.name}</h3>
                  <p className="text-xs text-stone-500 mt-1 min-h-[32px]">{pkg.tagline}</p>
                </div>

                {/* Price Display */}
                <div className="py-3 px-4 rounded-xl bg-[#F7F5F0] border border-[#E8E6E1]">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-extrabold text-[#102A43] font-serif">
                      ₹{pkg.price.toLocaleString('en-IN')}
                    </span>
                    <span className="text-xs text-stone-500 font-medium">/ listing</span>
                  </div>
                  <div className="flex items-center gap-3 mt-2 text-[11px] text-stone-600 font-medium">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-[#C6A15B]" />
                      {pkg.durationDays} Days Active
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Layers className="w-3 h-3 text-[#C6A15B]" />
                      Max {pkg.listingLimit} Properties
                    </span>
                  </div>
                </div>

                {/* Features List */}
                <div className="space-y-2 pt-2">
                  <div className="text-xs font-bold text-stone-700 uppercase tracking-wider">
                    Included Benefits
                  </div>
                  <ul className="space-y-2">
                    {pkg.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-stone-600">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Bottom Card Actions */}
              <div className="p-4 bg-[#F7F5F0] border-t border-[#E8E6E1] flex items-center justify-between gap-2">
                <button
                  onClick={() => handleStartEdit(pkg)}
                  className="flex-1 py-2 px-3 rounded-xl bg-white hover:bg-stone-50 border border-[#E8E6E1] text-xs font-semibold text-[#102A43] flex items-center justify-center gap-1.5 shadow-2xs transition-all"
                >
                  <Edit2 className="w-3.5 h-3.5 text-stone-500" />
                  Edit Plan
                </button>
                <button
                  onClick={() => deletePackage(pkg.id)}
                  className="p-2 rounded-xl text-stone-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                  title="Delete Package"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Edit / Create Drawer Modal */}
      {editingPkg && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 border border-[#E8E6E1] shadow-2xl my-8">
            <div className="flex items-center justify-between pb-4 border-b border-[#E8E6E1]">
              <div className="flex items-center gap-2">
                <Package className="w-5 h-5 text-[#C6A15B]" />
                <h3 className="font-bold text-[#102A43] text-lg font-serif">
                  {isCreating ? 'Create New Listing Package' : `Edit Package: ${editingPkg.name}`}
                </h3>
              </div>
              <button
                onClick={() => setEditingPkg(null)}
                className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 py-4 max-h-[70vh] overflow-y-auto pr-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-stone-700 block mb-1">Package Name</label>
                  <input
                    type="text"
                    value={editingPkg.name}
                    onChange={(e) => setEditingPkg({ ...editingPkg, name: e.target.value })}
                    className="w-full p-2.5 text-xs bg-[#F7F5F0] border border-[#E8E6E1] rounded-xl focus:ring-2 focus:ring-[#102A43]"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-stone-700 block mb-1">Badge Tag</label>
                  <input
                    type="text"
                    value={editingPkg.badgeText || ''}
                    onChange={(e) => setEditingPkg({ ...editingPkg, badgeText: e.target.value })}
                    placeholder="e.g. Most Popular"
                    className="w-full p-2.5 text-xs bg-[#F7F5F0] border border-[#E8E6E1] rounded-xl focus:ring-2 focus:ring-[#102A43]"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-stone-700 block mb-1">Marketing Tagline</label>
                <input
                  type="text"
                  value={editingPkg.tagline}
                  onChange={(e) => setEditingPkg({ ...editingPkg, tagline: e.target.value })}
                  className="w-full p-2.5 text-xs bg-[#F7F5F0] border border-[#E8E6E1] rounded-xl focus:ring-2 focus:ring-[#102A43]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-bold text-stone-700 block mb-1">Price (₹ INR)</label>
                  <input
                    type="number"
                    value={editingPkg.price}
                    onChange={(e) => setEditingPkg({ ...editingPkg, price: Number(e.target.value) })}
                    className="w-full p-2.5 text-xs bg-[#F7F5F0] border border-[#E8E6E1] rounded-xl focus:ring-2 focus:ring-[#102A43]"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-stone-700 block mb-1">Duration (Days)</label>
                  <input
                    type="number"
                    value={editingPkg.durationDays}
                    onChange={(e) => setEditingPkg({ ...editingPkg, durationDays: Number(e.target.value) })}
                    className="w-full p-2.5 text-xs bg-[#F7F5F0] border border-[#E8E6E1] rounded-xl focus:ring-2 focus:ring-[#102A43]"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-stone-700 block mb-1">Listing Limit</label>
                  <input
                    type="number"
                    value={editingPkg.listingLimit}
                    onChange={(e) => setEditingPkg({ ...editingPkg, listingLimit: Number(e.target.value) })}
                    className="w-full p-2.5 text-xs bg-[#F7F5F0] border border-[#E8E6E1] rounded-xl focus:ring-2 focus:ring-[#102A43]"
                  />
                </div>
              </div>

              {/* Toggles */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3 bg-[#F7F5F0] rounded-xl border border-[#E8E6E1]">
                <label className="flex items-center gap-2 text-xs font-medium text-stone-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingPkg.isFeaturedPlacement}
                    onChange={(e) => setEditingPkg({ ...editingPkg, isFeaturedPlacement: e.target.checked })}
                    className="rounded text-[#102A43] focus:ring-[#102A43]"
                  />
                  Featured Placement
                </label>

                <label className="flex items-center gap-2 text-xs font-medium text-stone-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingPkg.isPremiumPlacement}
                    onChange={(e) => setEditingPkg({ ...editingPkg, isPremiumPlacement: e.target.checked })}
                    className="rounded text-[#102A43] focus:ring-[#102A43]"
                  />
                  Luxury Showcase
                </label>

                <label className="flex items-center gap-2 text-xs font-medium text-stone-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingPkg.isActive}
                    onChange={(e) => setEditingPkg({ ...editingPkg, isActive: e.target.checked })}
                    className="rounded text-[#102A43] focus:ring-[#102A43]"
                  />
                  Package Active
                </label>
              </div>

              {/* Features Editor */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-stone-700 block">Package Features</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={featureInput}
                    onChange={(e) => setFeatureInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddFeature())}
                    placeholder="Add a new feature and press Enter..."
                    className="flex-1 p-2 text-xs bg-[#F7F5F0] border border-[#E8E6E1] rounded-xl"
                  />
                  <button
                    type="button"
                    onClick={handleAddFeature}
                    className="px-3 py-2 bg-[#102A43] text-white text-xs font-bold rounded-xl hover:bg-[#1A3B5C]"
                  >
                    Add
                  </button>
                </div>

                <div className="space-y-1.5 max-h-36 overflow-y-auto">
                  {editingPkg.features.map((feat, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-2 rounded-lg bg-stone-50 border border-stone-200 text-xs text-stone-700"
                    >
                      <span className="flex-1">{feat}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveFeature(idx)}
                        className="text-stone-400 hover:text-rose-600 p-1"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#E8E6E1]">
              <button
                onClick={() => setEditingPkg(null)}
                className="px-4 py-2 text-xs font-medium text-stone-600 hover:bg-stone-100 rounded-xl"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-5 py-2 text-xs font-bold text-white bg-[#102A43] hover:bg-[#1A3B5C] rounded-xl shadow-sm flex items-center gap-1.5"
              >
                <Save className="w-4 h-4 text-[#C6A15B]" />
                Save Package Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
