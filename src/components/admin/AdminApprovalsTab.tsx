import React, { useState } from 'react';
import { useRealEstate } from '../../context/RealEstateContext';
import { Property, ApprovalStatus } from '../../types';
import {
  CheckCircle2,
  XCircle,
  AlertCircle,
  Eye,
  Clock,
  User,
  Phone,
  Mail,
  MapPin,
  Tag,
  Sparkles,
  Search,
  Check,
  X,
  ExternalLink,
} from 'lucide-react';
import { formatINR } from '../../data/mockData';

export const AdminApprovalsTab: React.FC = () => {
  const {
    properties,
    approveProperty,
    rejectProperty,
    requestPropertyChanges,
    navigateToProperty,
  } = useRealEstate();

  const [selectedStatusFilter, setSelectedStatusFilter] = useState<'ALL' | ApprovalStatus>('PENDING_APPROVAL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [rejectionModalOpen, setRejectionModalOpen] = useState(false);
  const [changesModalOpen, setChangesModalOpen] = useState(false);
  const [modalPropertyId, setModalPropertyId] = useState<string | null>(null);
  const [actionReason, setActionReason] = useState('');

  // Moderation candidates: anything with approvalStatus not approved or all
  const approvalItems = properties.filter((p) => {
    const status = p.approvalStatus || 'APPROVED';
    if (selectedStatusFilter === 'ALL') {
      return status !== 'APPROVED';
    }
    return status === selectedStatusFilter;
  });

  const filteredItems = approvalItems.filter((p) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      p.title.toLowerCase().includes(q) ||
      p.location.toLowerCase().includes(q) ||
      (p.ownerName || '').toLowerCase().includes(q) ||
      (p.ownerEmail || '').toLowerCase().includes(q)
    );
  });

  const pendingCount = properties.filter((p) => p.approvalStatus === 'PENDING_APPROVAL').length;
  const changesCount = properties.filter((p) => p.approvalStatus === 'CHANGES_REQUESTED').length;
  const rejectedCount = properties.filter((p) => p.approvalStatus === 'REJECTED').length;

  const handleApprove = async (id: string) => {
    await approveProperty(id);
  };

  const handleOpenRejectModal = (id: string) => {
    setModalPropertyId(id);
    setActionReason('');
    setRejectionModalOpen(true);
  };

  const handleConfirmReject = async () => {
    if (!modalPropertyId) return;
    await rejectProperty(modalPropertyId, actionReason);
    setRejectionModalOpen(false);
    setModalPropertyId(null);
  };

  const handleOpenChangesModal = (id: string) => {
    setModalPropertyId(id);
    setActionReason('');
    setChangesModalOpen(true);
  };

  const handleConfirmChanges = async () => {
    if (!modalPropertyId) return;
    await requestPropertyChanges(modalPropertyId, actionReason);
    setChangesModalOpen(false);
    setModalPropertyId(null);
  };

  return (
    <div className="space-y-6">
      {/* Header & Stats Banner */}
      <div className="bg-white rounded-2xl p-6 border border-[#E8E6E1] shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200">
                <Clock className="w-3.5 h-3.5 text-amber-600" />
                Moderation Queue
              </span>
              <span className="text-xs text-stone-500">Live Database Verification</span>
            </div>
            <h1 className="text-2xl font-bold text-[#102A43] font-serif mt-2">
              Property Submissions & Approvals
            </h1>
            <p className="text-sm text-stone-600 mt-1">
              Review new properties submitted by Property Owners and Real Estate Agents before they go live on the public marketplace.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-center px-4 py-2.5 bg-[#F7F5F0] rounded-xl border border-[#E8E6E1]">
              <div className="text-2xl font-bold text-amber-600">{pendingCount}</div>
              <div className="text-xs font-medium text-stone-600">Pending Review</div>
            </div>
            <div className="text-center px-4 py-2.5 bg-[#F7F5F0] rounded-xl border border-[#E8E6E1]">
              <div className="text-2xl font-bold text-blue-600">{changesCount}</div>
              <div className="text-xs font-medium text-stone-600">Changes Needed</div>
            </div>
            <div className="text-center px-4 py-2.5 bg-[#F7F5F0] rounded-xl border border-[#E8E6E1]">
              <div className="text-2xl font-bold text-rose-600">{rejectedCount}</div>
              <div className="text-xs font-medium text-stone-600">Rejected</div>
            </div>
          </div>
        </div>

        {/* Filter Pills & Search */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 pt-6 border-t border-[#E8E6E1]">
          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
            <button
              onClick={() => setSelectedStatusFilter('PENDING_APPROVAL')}
              className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${
                selectedStatusFilter === 'PENDING_APPROVAL'
                  ? 'bg-[#102A43] text-white shadow-sm'
                  : 'bg-[#F7F5F0] text-stone-700 hover:bg-stone-200'
              }`}
            >
              Pending Approval ({pendingCount})
            </button>
            <button
              onClick={() => setSelectedStatusFilter('CHANGES_REQUESTED')}
              className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${
                selectedStatusFilter === 'CHANGES_REQUESTED'
                  ? 'bg-[#102A43] text-white shadow-sm'
                  : 'bg-[#F7F5F0] text-stone-700 hover:bg-stone-200'
              }`}
            >
              Changes Requested ({changesCount})
            </button>
            <button
              onClick={() => setSelectedStatusFilter('REJECTED')}
              className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${
                selectedStatusFilter === 'REJECTED'
                  ? 'bg-[#102A43] text-white shadow-sm'
                  : 'bg-[#F7F5F0] text-stone-700 hover:bg-stone-200'
              }`}
            >
              Rejected ({rejectedCount})
            </button>
            <button
              onClick={() => setSelectedStatusFilter('ALL')}
              className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${
                selectedStatusFilter === 'ALL'
                  ? 'bg-[#102A43] text-white shadow-sm'
                  : 'bg-[#F7F5F0] text-stone-700 hover:bg-stone-200'
              }`}
            >
              All In Moderation ({pendingCount + changesCount + rejectedCount})
            </button>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by title, owner, locality..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs bg-[#F7F5F0] border border-[#E8E6E1] rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#102A43]"
            />
          </div>
        </div>
      </div>

      {/* Submissions List */}
      {filteredItems.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 border border-[#E8E6E1] text-center">
          <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-4 border border-emerald-200">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-[#102A43]">Queue is Clean!</h3>
          <p className="text-sm text-stone-500 max-w-md mx-auto mt-1">
            There are no property submissions currently matching this status filter. When property owners or agents submit new listings, they will appear here for verification.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredItems.map((property) => {
            const status = property.approvalStatus || 'PENDING_APPROVAL';

            return (
              <div
                key={property.id}
                className="bg-white rounded-2xl border border-[#E8E6E1] p-5 md:p-6 shadow-xs hover:border-[#C6A15B]/50 transition-all"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  {/* Left: Thumbnail & Main Info */}
                  <div className="flex flex-col sm:flex-row items-start gap-4 flex-1">
                    <div className="relative w-full sm:w-44 h-32 rounded-xl overflow-hidden shrink-0 bg-stone-100">
                      <img
                        src={property.heroImage}
                        alt={property.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2 left-2 flex flex-col gap-1">
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-[#102A43]/90 text-white uppercase tracking-wider backdrop-blur-xs">
                          {property.listingType}
                        </span>
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-[#C6A15B] text-white uppercase tracking-wider">
                          {property.propertyType}
                        </span>
                      </div>
                    </div>

                    <div className="flex-1 min-w-0 space-y-1.5">
                      <div className="flex flex-wrap items-center gap-2">
                        {status === 'PENDING_APPROVAL' && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-800">
                            <Clock className="w-3 h-3" />
                            Pending Admin Approval
                          </span>
                        )}
                        {status === 'CHANGES_REQUESTED' && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
                            <AlertCircle className="w-3 h-3" />
                            Changes Requested
                          </span>
                        )}
                        {status === 'REJECTED' && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-100 text-rose-800">
                            <XCircle className="w-3 h-3" />
                            Rejected
                          </span>
                        )}
                        <span className="text-xs text-stone-400">
                          Submitted: {property.createdAt}
                        </span>
                      </div>

                      <h3 className="text-lg font-bold text-[#102A43] font-serif truncate">
                        {property.title}
                      </h3>

                      <div className="flex items-center gap-1 text-xs text-stone-500">
                        <MapPin className="w-3.5 h-3.5 text-[#C6A15B] shrink-0" />
                        <span className="truncate">{property.location} • {property.locality}</span>
                      </div>

                      {/* Specs */}
                      <div className="flex flex-wrap items-center gap-3 pt-1 text-xs text-stone-600">
                        <span className="font-semibold text-[#102A43] text-sm">
                          {property.displayPrice || formatINR(property.price)}
                        </span>
                        <span className="text-stone-300">•</span>
                        <span>{property.specs.bedrooms} BHK</span>
                        <span className="text-stone-300">•</span>
                        <span>{property.specs.bathrooms} Baths</span>
                        <span className="text-stone-300">•</span>
                        <span>{property.specs.areaSqFt} Sq.Ft</span>
                        <span className="text-stone-300">•</span>
                        <span className="capitalize">{property.specs.furnishing}</span>
                      </div>

                      {/* Owner Info & Package */}
                      <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-stone-500 border-t border-[#F0EFEA] mt-2">
                        <div className="flex items-center gap-1.5">
                          <User className="w-3.5 h-3.5 text-stone-400" />
                          <span className="font-medium text-stone-800">
                            {property.ownerName || 'Property Owner'}
                          </span>
                        </div>
                        {property.ownerPhone && (
                          <div className="flex items-center gap-1.5">
                            <Phone className="w-3.5 h-3.5 text-stone-400" />
                            <span>{property.ownerPhone}</span>
                          </div>
                        )}
                        {property.ownerEmail && (
                          <div className="flex items-center gap-1.5">
                            <Mail className="w-3.5 h-3.5 text-stone-400" />
                            <span>{property.ownerEmail}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-1.5 ml-auto">
                          <Tag className="w-3.5 h-3.5 text-[#C6A15B]" />
                          <span className="font-semibold text-[#102A43]">
                            Package: {property.listingPackageId === 'pkg-premium' ? 'Premium (₹4,999)' : property.listingPackageId === 'pkg-featured' ? 'Featured (₹2,499)' : 'Basic (₹999)'}
                          </span>
                        </div>
                      </div>

                      {/* Rejection / Changes Note */}
                      {property.rejectionReason && (
                        <div className="mt-2 p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900">
                          <span className="font-bold">Moderator Feedback:</span> {property.rejectionReason}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Right: Actions */}
                  <div className="flex flex-row lg:flex-col items-center justify-end gap-2.5 shrink-0 pt-4 lg:pt-0 border-t lg:border-t-0 border-[#E8E6E1]">
                    <button
                      onClick={() => handleApprove(property.id)}
                      className="flex-1 lg:w-44 py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 shadow-sm flex items-center justify-center gap-1.5 transition-all"
                    >
                      <Check className="w-4 h-4" />
                      Approve & Publish
                    </button>

                    <button
                      onClick={() => handleOpenChangesModal(property.id)}
                      className="flex-1 lg:w-44 py-2.5 px-4 rounded-xl text-xs font-medium text-amber-800 bg-amber-50 hover:bg-amber-100 border border-amber-200 flex items-center justify-center gap-1.5 transition-all"
                    >
                      <AlertCircle className="w-4 h-4 text-amber-600" />
                      Request Changes
                    </button>

                    <button
                      onClick={() => handleOpenRejectModal(property.id)}
                      className="flex-1 lg:w-44 py-2.5 px-4 rounded-xl text-xs font-medium text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 flex items-center justify-center gap-1.5 transition-all"
                    >
                      <X className="w-4 h-4 text-rose-600" />
                      Reject Listing
                    </button>

                    <button
                      onClick={() => navigateToProperty(property.id)}
                      className="py-2.5 px-3 rounded-xl text-xs font-medium text-stone-600 hover:text-[#102A43] hover:bg-[#F7F5F0] border border-[#E8E6E1] flex items-center justify-center gap-1 transition-all"
                      title="Preview Property"
                    >
                      <Eye className="w-4 h-4" />
                      Preview
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Reject Modal */}
      {rejectionModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 border border-[#E8E6E1] shadow-2xl animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center gap-3 text-rose-600 mb-4">
              <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center">
                <XCircle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-[#102A43] text-lg">Reject Listing Submission</h3>
                <p className="text-xs text-stone-500">The listing owner will receive this feedback.</p>
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-xs font-semibold text-stone-700 block">
                Reason for Rejection
              </label>
              <textarea
                value={actionReason}
                onChange={(e) => setActionReason(e.target.value)}
                placeholder="e.g. Incomplete title documents, blurred non-original photographs, or unrealistic pricing."
                rows={4}
                className="w-full p-3 text-xs bg-[#F7F5F0] border border-[#E8E6E1] rounded-xl focus:outline-hidden focus:ring-2 focus:ring-rose-500"
              />
            </div>

            <div className="flex items-center justify-end gap-3 mt-6">
              <button
                onClick={() => setRejectionModalOpen(false)}
                className="px-4 py-2 text-xs font-medium text-stone-600 hover:bg-stone-100 rounded-xl"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmReject}
                className="px-5 py-2 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-xl shadow-sm"
              >
                Confirm Rejection
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Request Changes Modal */}
      {changesModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 border border-[#E8E6E1] shadow-2xl animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center gap-3 text-amber-600 mb-4">
              <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                <AlertCircle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-[#102A43] text-lg">Request Changes from Owner</h3>
                <p className="text-xs text-stone-500">Provide actionable guidance for resubmission.</p>
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-xs font-semibold text-stone-700 block">
                Requested Corrections / Modifications
              </label>
              <textarea
                value={actionReason}
                onChange={(e) => setActionReason(e.target.value)}
                placeholder="e.g. Please provide at least 4 clear interior photos, specify exact survey number, or update facing orientation."
                rows={4}
                className="w-full p-3 text-xs bg-[#F7F5F0] border border-[#E8E6E1] rounded-xl focus:outline-hidden focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div className="flex items-center justify-end gap-3 mt-6">
              <button
                onClick={() => setChangesModalOpen(false)}
                className="px-4 py-2 text-xs font-medium text-stone-600 hover:bg-stone-100 rounded-xl"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmChanges}
                className="px-5 py-2 text-xs font-bold text-white bg-amber-600 hover:bg-amber-700 rounded-xl shadow-sm"
              >
                Send Instructions
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
