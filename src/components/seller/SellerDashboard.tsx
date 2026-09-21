import React, { useState } from 'react';
import { useRealEstate } from '../../context/RealEstateContext';
import { Property, SellerTab, ListingPackage, LeadStatus } from '../../types';
import {
  Home,
  Plus,
  Clock,
  CheckCircle2,
  AlertCircle,
  XCircle,
  Eye,
  MessageSquare,
  Calendar,
  Sparkles,
  CreditCard,
  RefreshCw,
  Trash2,
  Edit2,
  ExternalLink,
  Phone,
  Mail,
  User,
  MapPin,
  Check,
  Tag,
  ArrowUpRight,
  TrendingUp,
} from 'lucide-react';
import { formatINR } from '../../data/mockData';
import { ListPropertyFlow } from './ListPropertyFlow';

export const SellerDashboard: React.FC = () => {
  const {
    properties,
    inquiries,
    siteVisits,
    packages,
    purchases,
    currentUser,
    sellerTab,
    setSellerTab,
    navigateToProperty,
    upgradePropertyListing,
    renewPropertyListing,
    deleteProperty,
    updateInquiryStatus,
    updateVisitStatus,
    setViewMode,
  } = useRealEstate();

  const [upgradeModalOpen, setUpgradeModalOpen] = useState(false);
  const [selectedPropertyForUpgrade, setSelectedPropertyForUpgrade] = useState<Property | null>(null);
  const [selectedUpgradePackageId, setSelectedUpgradePackageId] = useState<string>('pkg-featured');

  // Filter properties belonging to this seller (or all for demo convenience)
  const myProperties = properties.filter(
    (p) => p.ownerId === currentUser?.uid || p.ownerEmail === currentUser?.email || !p.ownerId
  );

  // Inquiries for this seller's properties
  const myPropertyIds = myProperties.map((p) => p.id);
  const myInquiries = inquiries.filter((inq) => myPropertyIds.includes(inq.propertyId) || inq.ownerId === currentUser?.uid);
  const myVisits = siteVisits.filter((vis) => myPropertyIds.includes(vis.propertyId) || vis.ownerId === currentUser?.uid);
  const myPurchases = purchases.filter((pur) => pur.userId === currentUser?.uid || pur.userRole === 'seller');

  // KPI Calculations
  const liveCount = myProperties.filter((p) => p.approvalStatus === 'APPROVED' || !p.approvalStatus).length;
  const pendingCount = myProperties.filter((p) => p.approvalStatus === 'PENDING_APPROVAL').length;
  const changesCount = myProperties.filter((p) => p.approvalStatus === 'CHANGES_REQUESTED').length;
  const totalViews = myProperties.reduce((acc, p) => acc + (p.viewsCount || 120), 0);

  const handleOpenUpgrade = (property: Property) => {
    setSelectedPropertyForUpgrade(property);
    setUpgradeModalOpen(true);
  };

  const handleConfirmUpgrade = async () => {
    if (!selectedPropertyForUpgrade) return;
    await upgradePropertyListing(selectedPropertyForUpgrade.id, selectedUpgradePackageId);
    setUpgradeModalOpen(false);
    setSelectedPropertyForUpgrade(null);
  };

  const handleRenew = async (propertyId: string) => {
    await renewPropertyListing(propertyId);
  };

  return (
    <div className="min-h-screen bg-[#F7F5F0] text-[#20252B]">
      {/* Top Seller Bar */}
      <div className="bg-[#102A43] text-white border-b border-[#1D3E5E]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#0B1D30] border border-[#244A6F] flex items-center justify-center text-[#C6A15B] font-bold text-lg font-serif shadow-md">
                {currentUser?.displayName?.charAt(0) || 'O'}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider bg-[#C6A15B] text-[#102A43] uppercase">
                    SELLER & OWNER PORTAL
                  </span>
                  <span className="text-xs text-stone-400">Verified Seller Account</span>
                </div>
                <h1 className="text-2xl font-bold font-serif text-white mt-1">
                  Welcome back, {currentUser?.displayName || 'Property Owner'}
                </h1>
                <p className="text-xs text-stone-300">
                  Manage your Pondicherry property listings, track buyer enquiries, and boost visibility.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setSellerTab('add-property')}
                className="px-4 py-2.5 rounded-xl bg-[#C6A15B] hover:bg-amber-400 text-[#102A43] text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all"
              >
                <Plus className="w-4 h-4" />
                List New Property
              </button>

              <button
                onClick={() => setViewMode('customer')}
                className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center gap-1.5 transition-all"
              >
                <ExternalLink className="w-3.5 h-3.5 text-[#C6A15B]" />
                Browse Website
              </button>
            </div>
          </div>

          {/* Seller KPI Metric Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-[#1D3E5E]">
            <div className="p-3.5 rounded-xl bg-[#0B1D30]/80 border border-[#1D3E5E]">
              <span className="text-[11px] text-stone-400 font-medium">Live Listings</span>
              <div className="text-2xl font-bold text-white font-serif mt-0.5">{liveCount}</div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#0B1D30]/80 border border-[#1D3E5E]">
              <span className="text-[11px] text-amber-400 font-medium">Pending Approvals</span>
              <div className="text-2xl font-bold text-amber-400 font-serif mt-0.5">{pendingCount}</div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#0B1D30]/80 border border-[#1D3E5E]">
              <span className="text-[11px] text-[#C6A15B] font-medium">Buyer Enquiries</span>
              <div className="text-2xl font-bold text-[#C6A15B] font-serif mt-0.5">{myInquiries.length}</div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#0B1D30]/80 border border-[#1D3E5E]">
              <span className="text-[11px] text-emerald-400 font-medium">Site Visits Booked</span>
              <div className="text-2xl font-bold text-emerald-400 font-serif mt-0.5">{myVisits.length}</div>
            </div>
          </div>
        </div>

        {/* Dashboard Navigation Tabs */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-1 overflow-x-auto py-2 scrollbar-none text-xs font-semibold">
            {[
              { id: 'properties', label: 'My Properties', icon: Home, count: myProperties.length },
              { id: 'add-property', label: 'Add Property', icon: Plus },
              { id: 'enquiries', label: 'Buyer Enquiries', icon: MessageSquare, count: myInquiries.length },
              { id: 'visits', label: 'Site Visit Requests', icon: Calendar, count: myVisits.length },
              { id: 'packages', label: 'Listing Packages & Boosts', icon: Sparkles },
              { id: 'payments', label: 'Payment Receipts', icon: CreditCard, count: myPurchases.length },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = sellerTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setSellerTab(tab.id as SellerTab)}
                  className={`px-4 py-2.5 rounded-xl flex items-center gap-2 whitespace-nowrap transition-all cursor-pointer ${
                    isActive
                      ? 'bg-white text-[#102A43] shadow-sm font-bold'
                      : 'text-stone-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#C6A15B]' : ''}`} />
                  <span>{tab.label}</span>
                  {tab.count !== undefined && tab.count > 0 && (
                    <span
                      className={`px-2 py-0.2 text-[10px] rounded-full font-bold ${
                        isActive ? 'bg-[#102A43] text-white' : 'bg-white/20 text-stone-200'
                      }`}
                    >
                      {tab.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Dashboard Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* TAB 1: MY PROPERTIES */}
        {sellerTab === 'properties' && (
          <div className="space-y-6 animate-in fade-in duration-150">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-[#102A43] font-serif">
                  My Properties & Listing Status
                </h2>
                <p className="text-xs text-stone-500 mt-1">
                  Manage active listings, monitor verification status, and upgrade to Featured/Premium packages.
                </p>
              </div>

              <button
                onClick={() => setSellerTab('add-property')}
                className="px-4 py-2.5 rounded-xl bg-[#102A43] hover:bg-[#1A3B5C] text-white text-xs font-bold flex items-center gap-2 shadow-sm"
              >
                <Plus className="w-4 h-4 text-[#C6A15B]" />
                Add Another Property
              </button>
            </div>

            {myProperties.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-[#E8E6E1]">
                <div className="w-16 h-16 rounded-full bg-amber-50 text-[#C6A15B] flex items-center justify-center mx-auto mb-4 border border-amber-200">
                  <Home className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-[#102A43]">No Properties Listed Yet</h3>
                <p className="text-xs text-stone-500 max-w-sm mx-auto mt-1 mb-6">
                  List your first villa, apartment, or land parcel in Pondicherry to connect with active buyers.
                </p>
                <button
                  onClick={() => setSellerTab('add-property')}
                  className="px-6 py-3 rounded-xl bg-[#C6A15B] text-[#102A43] font-bold text-xs shadow-sm hover:bg-amber-400 transition-all"
                >
                  Start "List Your Property" Flow
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {myProperties.map((property) => {
                  const status = property.approvalStatus || 'APPROVED';
                  const isApproved = status === 'APPROVED';
                  const isPending = status === 'PENDING_APPROVAL';
                  const isChanges = status === 'CHANGES_REQUESTED';
                  const isRejected = status === 'REJECTED';

                  return (
                    <div
                      key={property.id}
                      className="bg-white rounded-2xl border border-[#E8E6E1] overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                    >
                      {/* Top Image + Status Badges */}
                      <div>
                        <div className="relative h-48 w-full bg-stone-100 overflow-hidden">
                          <img
                            src={property.heroImage}
                            alt={property.title}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-black/30" />

                          {/* Top Badges */}
                          <div className="absolute top-3 left-3 flex items-center gap-1.5">
                            <span className="px-2.5 py-1 rounded-md text-[10px] font-bold bg-[#102A43]/90 text-white uppercase tracking-wider backdrop-blur-xs">
                              {property.listingType}
                            </span>
                            <span className="px-2.5 py-1 rounded-md text-[10px] font-bold bg-[#C6A15B] text-white uppercase tracking-wider">
                              {property.propertyType}
                            </span>
                          </div>

                          {/* Approval Status Badge */}
                          <div className="absolute bottom-3 left-3">
                            {isApproved && (
                              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500 text-white shadow-sm">
                                <CheckCircle2 className="w-3.5 h-3.5" />
                                LIVE & VERIFIED
                              </span>
                            )}
                            {isPending && (
                              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-amber-500 text-white shadow-sm">
                                <Clock className="w-3.5 h-3.5" />
                                PENDING ADMIN APPROVAL
                              </span>
                            )}
                            {isChanges && (
                              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-blue-500 text-white shadow-sm">
                                <AlertCircle className="w-3.5 h-3.5" />
                                CHANGES REQUESTED
                              </span>
                            )}
                            {isRejected && (
                              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-rose-500 text-white shadow-sm">
                                <XCircle className="w-3.5 h-3.5" />
                                REJECTED
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Property Body */}
                        <div className="p-5 space-y-3">
                          <div className="text-lg font-extrabold text-[#102A43] font-serif">
                            {property.displayPrice || formatINR(property.price)}
                          </div>

                          <h3 className="font-bold text-[#102A43] text-sm leading-snug line-clamp-2">
                            {property.title}
                          </h3>

                          <div className="flex items-center gap-1.5 text-xs text-stone-500">
                            <MapPin className="w-3.5 h-3.5 text-[#C6A15B] shrink-0" />
                            <span className="truncate">{property.location}</span>
                          </div>

                          {/* Rejection / Changes feedback alert if present */}
                          {property.rejectionReason && (
                            <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900">
                              <span className="font-bold block mb-0.5">Admin Review Feedback:</span>
                              {property.rejectionReason}
                            </div>
                          )}

                          {/* Stats counter */}
                          <div className="flex items-center justify-between pt-2 border-t border-[#F0EFEA] text-xs text-stone-500">
                            <span className="flex items-center gap-1">
                              <Eye className="w-3.5 h-3.5 text-stone-400" />
                              {property.viewsCount || 42} Views
                            </span>
                            <span className="flex items-center gap-1">
                              <MessageSquare className="w-3.5 h-3.5 text-[#C6A15B]" />
                              {property.inquiriesCount || 2} Enquiries
                            </span>
                            <span className="text-stone-400">
                              Listed: {property.createdAt}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Bottom Action Buttons */}
                      <div className="p-4 bg-[#F7F5F0] border-t border-[#E8E6E1] flex flex-wrap items-center gap-2">
                        <button
                          onClick={() => navigateToProperty(property.id)}
                          className="flex-1 py-2 px-3 rounded-xl bg-white hover:bg-stone-50 border border-[#E8E6E1] text-xs font-semibold text-[#102A43] flex items-center justify-center gap-1 shadow-2xs transition-all"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          View
                        </button>

                        <button
                          onClick={() => handleOpenUpgrade(property)}
                          className="flex-1 py-2 px-3 rounded-xl bg-[#C6A15B] hover:bg-amber-400 text-[#102A43] text-xs font-bold flex items-center justify-center gap-1 shadow-2xs transition-all"
                        >
                          <Sparkles className="w-3.5 h-3.5" />
                          Upgrade
                        </button>

                        <button
                          onClick={() => handleRenew(property.id)}
                          className="py-2 px-3 rounded-xl bg-white hover:bg-stone-50 border border-[#E8E6E1] text-xs font-medium text-stone-600 transition-all"
                          title="Renew Listing"
                        >
                          <RefreshCw className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => deleteProperty(property.id)}
                          className="p-2 rounded-xl text-stone-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                          title="Remove Listing"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: ADD PROPERTY FLOW */}
        {sellerTab === 'add-property' && (
          <div className="space-y-6">
            <ListPropertyFlow
              onSuccess={() => setSellerTab('properties')}
              onCancel={() => setSellerTab('properties')}
            />
          </div>
        )}

        {/* TAB 3: BUYER ENQUIRIES */}
        {sellerTab === 'enquiries' && (
          <div className="space-y-6 animate-in fade-in duration-150">
            <div>
              <h2 className="text-xl font-bold text-[#102A43] font-serif">
                Direct Buyer Enquiries
              </h2>
              <p className="text-xs text-stone-500 mt-1">
                Real inquiries from customers interested in purchasing or renting your listed properties.
              </p>
            </div>

            {myInquiries.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-[#E8E6E1]">
                <MessageSquare className="w-12 h-12 text-stone-300 mx-auto mb-3" />
                <h3 className="font-bold text-[#102A43]">No Enquiries Received Yet</h3>
                <p className="text-xs text-stone-500 mt-1">
                  Once prospective buyers submit inquiries for your property, they will arrive here instantly.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {myInquiries.map((inq) => (
                  <div
                    key={inq.id}
                    className="bg-white rounded-2xl border border-[#E8E6E1] p-5 shadow-xs hover:border-[#C6A15B]/50 transition-all"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-[#F0EFEA]">
                      <div>
                        <span className="font-mono text-xs font-bold text-[#C6A15B]">{inq.refNumber}</span>
                        <h4 className="text-base font-bold text-[#102A43] mt-0.5">{inq.propertyTitle}</h4>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
                          {inq.status}
                        </span>
                        <span className="text-xs text-stone-400">{inq.createdAt.split('T')[0]}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-3 text-xs">
                      <div>
                        <span className="text-stone-400 block">Buyer Name:</span>
                        <span className="font-bold text-[#102A43]">{inq.customerName}</span>
                      </div>
                      <div>
                        <span className="text-stone-400 block">Phone / WhatsApp:</span>
                        <a href={`tel:${inq.phone}`} className="font-semibold text-blue-600 hover:underline">
                          {inq.phone}
                        </a>
                      </div>
                      <div>
                        <span className="text-stone-400 block">Email:</span>
                        <span className="text-stone-700">{inq.email}</span>
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-[#F7F5F0] text-xs text-stone-700">
                      <span className="font-bold text-[#102A43] block mb-0.5">Buyer Message:</span>
                      "{inq.message}"
                    </div>

                    <div className="flex items-center justify-end gap-2 pt-3">
                      <a
                        href={`https://wa.me/${inq.phone.replace(/[^0-9]/g, '')}`}
                        target="_blank"
                        rel="noreferrer"
                        className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 transition-all"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        Chat on WhatsApp
                      </a>
                      <button
                        onClick={() => updateInquiryStatus(inq.id, 'CONTACTED')}
                        className="px-4 py-2 rounded-xl bg-[#102A43] hover:bg-[#1A3B5C] text-white text-xs font-bold transition-all"
                      >
                        Mark Contacted
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 4: SITE VISITS */}
        {sellerTab === 'visits' && (
          <div className="space-y-6 animate-in fade-in duration-150">
            <div>
              <h2 className="text-xl font-bold text-[#102A43] font-serif">
                Scheduled Site Visits
              </h2>
              <p className="text-xs text-stone-500 mt-1">
                In-person walkthrough requests from interested buyers for your properties.
              </p>
            </div>

            {myVisits.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-[#E8E6E1]">
                <Calendar className="w-12 h-12 text-stone-300 mx-auto mb-3" />
                <h3 className="font-bold text-[#102A43]">No Visits Booked Yet</h3>
                <p className="text-xs text-stone-500 mt-1">
                  When a buyer requests an in-person inspection, it will appear here for confirmation.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {myVisits.map((visit) => (
                  <div
                    key={visit.id}
                    className="bg-white rounded-2xl border border-[#E8E6E1] p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-[#C6A15B]">{visit.refNumber}</span>
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
                          {visit.status}
                        </span>
                      </div>
                      <h4 className="text-base font-bold text-[#102A43]">{visit.propertyTitle}</h4>
                      <div className="text-xs text-stone-500 flex items-center gap-4">
                        <span><strong>Date:</strong> {visit.date}</span>
                        <span><strong>Time:</strong> {visit.timeSlot}</span>
                        <span><strong>Visitor:</strong> {visit.customerName} ({visit.phone})</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateVisitStatus(visit.id, 'CONFIRMED')}
                        className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all"
                      >
                        Confirm Appointment
                      </button>
                      <button
                        onClick={() => updateVisitStatus(visit.id, 'CANCELLED')}
                        className="px-4 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold transition-all"
                      >
                        Decline
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 5: PACKAGES & BOOSTS */}
        {sellerTab === 'packages' && (
          <div className="space-y-6 animate-in fade-in duration-150">
            <div>
              <h2 className="text-xl font-bold text-[#102A43] font-serif">
                Listing Packages & Promotional Boosts
              </h2>
              <p className="text-xs text-stone-500 mt-1">
                Supercharge your properties with top search ranking, homepage spotlights, and social promotion.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {packages.map((pkg) => (
                <div
                  key={pkg.id}
                  className="bg-white rounded-2xl border border-[#E8E6E1] p-6 shadow-xs flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-100 text-amber-900">
                      {pkg.badgeText || 'Plan'}
                    </span>
                    <h3 className="text-xl font-bold text-[#102A43] font-serif">{pkg.name}</h3>
                    <p className="text-xs text-stone-500">{pkg.tagline}</p>
                    <div className="text-3xl font-extrabold text-[#102A43] font-serif">
                      ₹{pkg.price.toLocaleString('en-IN')}
                    </div>
                    <ul className="space-y-2 text-xs text-stone-600 pt-2 border-t border-[#E8E6E1]">
                      {pkg.features.map((f, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    onClick={() => {
                      if (myProperties.length > 0) {
                        handleOpenUpgrade(myProperties[0]);
                      } else {
                        setSellerTab('add-property');
                      }
                    }}
                    className="w-full mt-6 py-2.5 rounded-xl bg-[#102A43] hover:bg-[#1A3B5C] text-white text-xs font-bold transition-all"
                  >
                    Select & Boost Listing
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 6: PAYMENT RECEIPTS */}
        {sellerTab === 'payments' && (
          <div className="space-y-6 animate-in fade-in duration-150">
            <div>
              <h2 className="text-xl font-bold text-[#102A43] font-serif">
                Payment History & Receipts
              </h2>
              <p className="text-xs text-stone-500 mt-1">
                Invoices and transaction receipts for package purchases on the marketplace.
              </p>
            </div>

            {myPurchases.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-[#E8E6E1]">
                <CreditCard className="w-12 h-12 text-stone-300 mx-auto mb-3" />
                <h3 className="font-bold text-[#102A43]">No Invoices Yet</h3>
                <p className="text-xs text-stone-500 mt-1">
                  When you purchase a listing package or boost, official receipts will be archived here.
                </p>
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-[#E8E6E1] overflow-hidden shadow-xs">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#F7F5F0] text-stone-600 font-semibold border-b border-[#E8E6E1]">
                    <tr>
                      <th className="p-3.5">Invoice Ref</th>
                      <th className="p-3.5">Package</th>
                      <th className="p-3.5">Property</th>
                      <th className="p-3.5">Amount</th>
                      <th className="p-3.5">Date</th>
                      <th className="p-3.5">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E8E6E1]">
                    {myPurchases.map((pur) => (
                      <tr key={pur.id} className="hover:bg-stone-50">
                        <td className="p-3.5 font-mono font-bold text-[#102A43]">{pur.transactionRef}</td>
                        <td className="p-3.5 font-semibold text-stone-800">{pur.packageName}</td>
                        <td className="p-3.5 text-stone-600">{pur.propertyTitle || 'Account Plan'}</td>
                        <td className="p-3.5 font-bold text-[#102A43]">₹{pur.amount.toLocaleString('en-IN')}</td>
                        <td className="p-3.5 text-stone-500">{pur.createdAt}</td>
                        <td className="p-3.5">
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                            {pur.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Upgrade Listing Modal */}
      {upgradeModalOpen && selectedPropertyForUpgrade && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 border border-[#E8E6E1] shadow-2xl space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-[#E8E6E1]">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#C6A15B]" />
                <h3 className="font-bold text-[#102A43] text-lg font-serif">
                  Upgrade Listing Placement
                </h3>
              </div>
              <button
                onClick={() => setUpgradeModalOpen(false)}
                className="text-stone-400 hover:text-stone-700 p-1"
              >
                ✕
              </button>
            </div>

            <div>
              <div className="text-xs text-stone-500">Property to Boost:</div>
              <div className="font-bold text-[#102A43] text-sm mt-0.5">
                {selectedPropertyForUpgrade.title}
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-xs font-bold text-stone-700 block">Select Package Tier:</label>
              {packages.map((pkg) => (
                <div
                  key={pkg.id}
                  onClick={() => setSelectedUpgradePackageId(pkg.id)}
                  className={`p-3.5 rounded-xl border-2 cursor-pointer flex items-center justify-between text-xs transition-all ${
                    selectedUpgradePackageId === pkg.id
                      ? 'border-[#C6A15B] bg-amber-50/50 ring-2 ring-[#C6A15B]/20'
                      : 'border-[#E8E6E1] hover:bg-stone-50'
                  }`}
                >
                  <div>
                    <div className="font-bold text-[#102A43]">{pkg.name}</div>
                    <div className="text-[11px] text-stone-500">{pkg.durationDays} Days live placement</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-[#102A43] text-sm">
                      ₹{pkg.price.toLocaleString('en-IN')}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#E8E6E1]">
              <button
                onClick={() => setUpgradeModalOpen(false)}
                className="px-4 py-2 text-xs font-semibold text-stone-600 hover:bg-stone-100 rounded-xl"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmUpgrade}
                className="px-5 py-2 text-xs font-bold text-[#102A43] bg-[#C6A15B] hover:bg-amber-400 rounded-xl shadow-sm"
              >
                Confirm Upgrade & Activate
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
