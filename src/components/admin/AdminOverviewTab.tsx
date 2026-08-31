import React from 'react';
import { useRealEstate } from '../../context/RealEstateContext';
import { InquiryStatus, SiteVisitStatus, LeadStatus } from '../../types';
import { formatINR } from '../../data/mockData';
import {
  Building2,
  Inbox,
  CalendarCheck,
  TrendingUp,
  ArrowUpRight,
  Clock,
  Phone,
  CheckCircle2,
  MapPin,
  Star,
  Users,
  Eye,
  Calendar,
  MessageSquare,
} from 'lucide-react';

interface AdminOverviewTabProps {
  onOpenAddPropertyModal: () => void;
}

export const AdminOverviewTab: React.FC<AdminOverviewTabProps> = ({
  onOpenAddPropertyModal,
}) => {
  const {
    properties,
    inquiries,
    siteVisits,
    agents,
    updateInquiryStatus,
    updateSiteVisitStatus,
    setAdminTab,
  } = useRealEstate();

  // Metrics
  const totalAvailable = (properties || []).filter((p) => p.status === 'AVAILABLE').length;
  const totalUnderOffer = (properties || []).filter((p) => p.status === 'UNDER_OFFER').length;
  const totalSold = (properties || []).filter((p) => p.status === 'SOLD').length;
  const newInquiries = (inquiries || []).filter((i) => i.status === 'NEW').length;
  const pendingVisits = (siteVisits || []).filter((v) => v.status === 'PENDING' || v.status === 'CONFIRMED').length;

  const totalPortfolioValue = (properties || []).reduce((acc, curr) => acc + (curr?.price || 0), 0);

  const recentInquiries = (inquiries || []).slice(0, 5);
  const upcomingVisits = (siteVisits || []).slice(0, 4);

  const statusColors: Record<LeadStatus, { bg: string; text: string; border: string }> = {
    NEW: { bg: 'bg-rose-50', text: 'text-rose-700', border: 'border-rose-200' },
    CONTACTED: { bg: 'bg-[#F7F5F0]', text: 'text-[#102A43]', border: 'border-[#E8E6E1]' },
    VISIT_SCHEDULED: { bg: 'bg-[#C6A15B]/15', text: 'text-[#102A43]', border: 'border-[#C6A15B]/40' },
    VISIT_COMPLETED: { bg: 'bg-[#F7F5F0]', text: 'text-[#102A43]', border: 'border-[#E8E6E1]' },
    NEGOTIATION: { bg: 'bg-[#102A43]/10', text: 'text-[#102A43]', border: 'border-[#102A43]/20' },
    CONVERTED: { bg: 'bg-emerald-50', text: 'text-emerald-800', border: 'border-emerald-200' },
    LOST: { bg: 'bg-stone-100', text: 'text-stone-600', border: 'border-stone-200' },
    CLOSED_LOST: { bg: 'bg-stone-100', text: 'text-stone-600', border: 'border-stone-200' },
  };

  return (
    <div className="p-3.5 sm:p-6 lg:p-8 space-y-6 sm:space-y-8 max-w-7xl mx-auto w-full text-[#20252B]">
      {/* 4 Core Metrics Cards */}
      <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Metric 1: Properties */}
        <div
          onClick={() => setAdminTab('properties')}
          className="bg-white rounded-2xl sm:rounded-3xl border border-[#E8E6E1] p-4 sm:p-6 shadow-xs hover:shadow-md transition-all cursor-pointer group hover:border-[#C6A15B]"
        >
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-[#F7F5F0] text-[#102A43] flex items-center justify-center group-hover:scale-105 transition-transform border border-[#E8E6E1]">
              <Building2 className="w-5 h-5 sm:w-6 sm:h-6 text-[#C6A15B]" />
            </div>
            <span className="text-[11px] sm:text-xs font-bold text-[#102A43] bg-[#F7F5F0] px-2.5 py-1 rounded-full border border-[#E8E6E1]">
              {totalAvailable} Available
            </span>
          </div>
          <div className="mt-4">
            <div className="text-2xl sm:text-3xl font-bold font-serif text-[#102A43]">
              {(properties || []).length}
            </div>
            <div className="text-xs font-semibold text-[#52606D] mt-0.5">
              Active Inventory
            </div>
            <div className="text-[11px] text-[#52606D] mt-1.5 font-normal">
              {totalUnderOffer} under offer • {totalSold} sold
            </div>
          </div>
        </div>

        {/* Metric 2: Total Inquiries */}
        <div
          onClick={() => setAdminTab('inquiries')}
          className="bg-white rounded-2xl sm:rounded-3xl border border-[#E8E6E1] p-4 sm:p-6 shadow-xs hover:shadow-md transition-all cursor-pointer group hover:border-[#C6A15B]"
        >
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-[#F7F5F0] text-[#102A43] flex items-center justify-center group-hover:scale-105 transition-transform border border-[#E8E6E1]">
              <Inbox className="w-5 h-5 sm:w-6 sm:h-6 text-[#C6A15B]" />
            </div>
            {newInquiries > 0 && (
              <span className="text-[11px] sm:text-xs font-bold text-rose-700 bg-rose-50 px-2.5 py-1 rounded-full border border-rose-200 animate-pulse">
                {newInquiries} New
              </span>
            )}
          </div>
          <div className="mt-4">
            <div className="text-2xl sm:text-3xl font-bold font-serif text-[#102A43]">
              {(inquiries || []).length}
            </div>
            <div className="text-xs font-semibold text-[#52606D] mt-0.5">
              Customer Leads
            </div>
            <div className="text-[11px] text-[#52606D] mt-1.5 font-normal">
              Website & direct inquiries
            </div>
          </div>
        </div>

        {/* Metric 3: Scheduled Visits */}
        <div
          onClick={() => setAdminTab('visits')}
          className="bg-white rounded-2xl sm:rounded-3xl border border-[#E8E6E1] p-4 sm:p-6 shadow-xs hover:shadow-md transition-all cursor-pointer group hover:border-[#C6A15B]"
        >
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-[#F7F5F0] text-[#102A43] flex items-center justify-center group-hover:scale-105 transition-transform border border-[#E8E6E1]">
              <CalendarCheck className="w-5 h-5 sm:w-6 sm:h-6 text-[#C6A15B]" />
            </div>
            <span className="text-[11px] sm:text-xs font-bold text-[#102A43] bg-[#F7F5F0] px-2.5 py-1 rounded-full border border-[#E8E6E1]">
              {pendingVisits} Upcoming
            </span>
          </div>
          <div className="mt-4">
            <div className="text-2xl sm:text-3xl font-bold font-serif text-[#102A43]">
              {(siteVisits || []).length}
            </div>
            <div className="text-xs font-semibold text-[#52606D] mt-0.5">
              Site Tours
            </div>
            <div className="text-[11px] text-[#52606D] mt-1.5 font-normal">
              Chauffeured property tours
            </div>
          </div>
        </div>

        {/* Metric 4: Total Portfolio Value (Deep Navy) */}
        <div className="bg-[#102A43] text-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-lg border border-[#102A43] flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-white/10 text-[#C6A15B] flex items-center justify-center border border-white/10">
              <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <span className="text-[10px] font-bold text-[#C6A15B] bg-white/10 px-2.5 py-1 rounded-full uppercase tracking-wider">
              Asset Value
            </span>
          </div>
          <div className="mt-4">
            <div className="text-xl sm:text-2xl lg:text-3xl font-bold font-serif text-white truncate">
              {formatINR(totalPortfolioValue)}
            </div>
            <div className="text-xs text-[#C6A15B] font-semibold mt-0.5">
              Gross Listing Valuation
            </div>
            <div className="text-[11px] text-[#E8E6E1] mt-1.5 font-normal">
              Coastal & urban inventory
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Recent Inquiries & Upcoming Visits */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        {/* Left 2 Cols: Inquiries & Leads Table / Mobile Cards */}
        <div className="lg:col-span-2 bg-white rounded-2xl sm:rounded-3xl border border-[#E8E6E1] p-4 sm:p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-[#E8E6E1] pb-4">
            <div>
              <h2 className="text-base sm:text-lg font-bold font-serif text-[#102A43]">
                Recent Leads & Inquiries
              </h2>
              <p className="text-xs text-[#52606D] font-normal">
                Direct submissions from the buyer showcase
              </p>
            </div>
            <button
              onClick={() => setAdminTab('inquiries')}
              className="text-xs font-semibold text-[#C6A15B] hover:text-[#102A43] flex items-center gap-1 cursor-pointer transition-colors"
            >
              <span>View All ({(inquiries || []).length})</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile Card View (< md) */}
          <div className="md:hidden space-y-3">
            {recentInquiries.map((inq) => {
              const sc = statusColors[inq.status] || statusColors.NEW;
              return (
                <div
                  key={inq.id}
                  className="p-3.5 rounded-xl bg-[#F7F5F0] border border-[#E8E6E1] space-y-2.5"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="font-bold text-[#102A43] text-sm">
                        {inq.customerName || inq.name}
                      </div>
                      <div className="text-[#52606D] text-xs flex items-center gap-1 mt-0.5">
                        <Phone className="w-3 h-3 text-[#C6A15B]" />
                        <span>{inq.phone}</span>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold text-[#52606D] uppercase">
                      {inq.id}
                    </span>
                  </div>

                  <div className="text-xs text-[#20252B] font-medium line-clamp-1">
                    {inq.propertyTitle}
                  </div>

                  <div className="flex items-center justify-between pt-1 border-t border-[#E8E6E1] text-xs">
                    <span className="font-bold text-[#102A43]">{inq.budget}</span>
                    <select
                      value={inq.status}
                      onChange={(e) =>
                        updateInquiryStatus(inq.id, e.target.value as InquiryStatus)
                      }
                      className={`text-[11px] font-bold rounded-lg px-2 py-1 border ${sc.bg} ${sc.text} ${sc.border}`}
                    >
                      <option value="NEW">New</option>
                      <option value="CONTACTED">Contacted</option>
                      <option value="SITE_VISIT_SCHEDULED">Visit Scheduled</option>
                      <option value="NEGOTIATION">Negotiation</option>
                      <option value="CONVERTED">Converted</option>
                      <option value="CLOSED_LOST">Closed Lost</option>
                    </select>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Desktop Table View (>= md) */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-[#E8E6E1] text-[#52606D] font-bold uppercase tracking-wider text-[11px]">
                  <th className="pb-3 font-semibold">Lead Info</th>
                  <th className="pb-3 font-semibold">Interested Property</th>
                  <th className="pb-3 font-semibold">Budget</th>
                  <th className="pb-3 font-semibold">Status / Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8E6E1]">
                {recentInquiries.map((inq) => {
                  const sc = statusColors[inq.status] || statusColors.NEW;
                  return (
                    <tr key={inq.id} className="hover:bg-[#F7F5F0]/80 transition-colors">
                      <td className="py-3.5 pr-3">
                        <div className="font-bold text-[#102A43]">{inq.customerName || inq.name}</div>
                        <div className="text-[#52606D] text-[11px] flex items-center gap-1.5 mt-0.5">
                          <Phone className="w-3 h-3 text-[#C6A15B]" />
                          <span>{inq.phone}</span>
                        </div>
                      </td>
                      <td className="py-3.5 pr-3">
                        <div className="font-semibold text-[#20252B] line-clamp-1 max-w-[200px]">
                          {inq.propertyTitle}
                        </div>
                        <span className="text-[10px] font-bold text-[#52606D] uppercase">
                          Ref: {inq.id}
                        </span>
                      </td>
                      <td className="py-3.5 pr-3 font-medium text-[#20252B]">
                        {inq.budget}
                      </td>
                      <td className="py-3.5">
                        <select
                          value={inq.status}
                          onChange={(e) =>
                            updateInquiryStatus(inq.id, e.target.value as InquiryStatus)
                          }
                          className={`text-xs font-bold rounded-lg px-2.5 py-1.5 border cursor-pointer focus:outline-hidden ${sc.bg} ${sc.text} ${sc.border}`}
                        >
                          <option value="NEW">New Lead</option>
                          <option value="CONTACTED">Contacted</option>
                          <option value="SITE_VISIT_SCHEDULED">Visit Scheduled</option>
                          <option value="NEGOTIATION">In Negotiation</option>
                          <option value="CONVERTED">Converted</option>
                          <option value="CLOSED_LOST">Closed Lost</option>
                        </select>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right 1 Col: Upcoming Site Visits Timeline */}
        <div className="bg-white rounded-2xl sm:rounded-3xl border border-[#E8E6E1] p-4 sm:p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-[#E8E6E1] pb-4">
            <div>
              <h2 className="text-base sm:text-lg font-bold font-serif text-[#102A43]">
                Site Visits
              </h2>
              <p className="text-xs text-[#52606D] font-normal">Upcoming property tours</p>
            </div>
            <button
              onClick={() => setAdminTab('visits')}
              className="text-xs font-semibold text-[#C6A15B] hover:text-[#102A43] transition-colors cursor-pointer"
            >
              Calendar →
            </button>
          </div>

          <div className="space-y-3">
            {upcomingVisits.map((visit) => (
              <div
                key={visit.id}
                className="p-3.5 rounded-xl bg-[#F7F5F0] border border-[#E8E6E1] space-y-2 hover:border-[#C6A15B] transition-all"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h4 className="text-xs font-bold text-[#102A43] font-serif">
                      {visit.clientName || visit.customerName}
                    </h4>
                    <p className="text-[11px] text-[#52606D] truncate max-w-[180px]">
                      {visit.propertyTitle}
                    </p>
                  </div>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                      visit.status === 'CONFIRMED'
                        ? 'bg-emerald-100 text-emerald-800'
                        : visit.status === 'PENDING'
                        ? 'bg-[#C6A15B]/20 text-[#102A43]'
                        : 'bg-stone-200 text-stone-700'
                    }`}
                  >
                    {visit.status}
                  </span>
                </div>

                <div className="flex items-center justify-between text-[11px] text-[#52606D] pt-1 border-t border-[#E8E6E1]">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-[#C6A15B]" />
                    <span>{visit.date}</span>
                  </div>
                  <div className="flex items-center gap-1 font-semibold text-[#102A43]">
                    <Clock className="w-3 h-3 text-[#52606D]" />
                    <span>{visit.timeSlot}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Advisory Team Section */}
      <div className="bg-white rounded-2xl sm:rounded-3xl border border-[#E8E6E1] p-4 sm:p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-[#E8E6E1] pb-4">
          <div>
            <h2 className="text-base sm:text-lg font-bold font-serif text-[#102A43]">
              Advisory Team & Conversion
            </h2>
            <p className="text-xs text-[#52606D] font-normal">
              Key account managers and active performance
            </p>
          </div>
          <button
            onClick={() => setAdminTab('agents')}
            className="text-xs font-semibold text-[#C6A15B] hover:text-[#102A43] transition-colors cursor-pointer"
          >
            Manage Advisors →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {(agents || []).map((agent) => (
            <div
              key={agent.id}
              className="p-4 rounded-xl bg-[#F7F5F0] border border-[#E8E6E1] flex items-center justify-between gap-3"
            >
              <div className="flex items-center gap-3">
                <img
                  src={agent.photo}
                  alt={agent.name}
                  className="w-12 h-12 rounded-xl object-cover border border-[#E8E6E1]"
                />
                <div>
                  <h4 className="text-xs font-bold text-[#102A43] font-serif">
                    {agent.name}
                  </h4>
                  <p className="text-[11px] text-[#52606D]">{agent.role}</p>
                  <div className="flex items-center gap-1 text-[11px] text-amber-500 mt-0.5">
                    <Star className="w-3 h-3 fill-[#C6A15B] text-[#C6A15B]" />
                    <span className="font-bold text-[#102A43]">{agent.rating}</span>
                  </div>
                </div>
              </div>

              <div className="text-right shrink-0">
                <span className="text-xs font-bold text-[#102A43] bg-[#C6A15B]/20 px-2.5 py-1 rounded-lg border border-[#C6A15B]/40">
                  {agent.dealsClosed} Won
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
