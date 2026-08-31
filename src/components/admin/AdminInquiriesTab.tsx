import React, { useState } from 'react';
import { useRealEstate } from '../../context/RealEstateContext';
import { InquiryStatus } from '../../types';
import {
  Search,
  Phone,
  MessageSquare,
  List,
  LayoutGrid,
} from 'lucide-react';

export const AdminInquiriesTab: React.FC = () => {
  const {
    inquiries,
    updateInquiryStatus,
  } = useRealEstate();

  const [search, setSearch] = useState('');
  const [viewMode, setViewMode] = useState<'table' | 'pipeline'>('table');
  const [statusFilter, setStatusFilter] = useState<'ALL' | InquiryStatus>('ALL');

  const filteredInquiries = inquiries.filter((inq) => {
    if (search.trim()) {
      const q = search.toLowerCase();
      const nameCol = (inq.customerName || inq.name || '').toLowerCase();
      const match =
        nameCol.includes(q) ||
        inq.phone.includes(q) ||
        inq.propertyTitle.toLowerCase().includes(q) ||
        inq.id.toLowerCase().includes(q);
      if (!match) return false;
    }
    if (statusFilter !== 'ALL' && inq.status !== statusFilter) return false;
    return true;
  });

  const statuses: { id: InquiryStatus; label: string; color: string }[] = [
    { id: 'NEW', label: 'New Leads', color: 'border-rose-300 text-rose-700 bg-rose-50' },
    { id: 'CONTACTED', label: 'Contacted', color: 'border-[#E8E6E1] text-[#102A43] bg-[#F7F5F0]' },
    { id: 'VISIT_SCHEDULED', label: 'Visit Scheduled', color: 'border-[#C6A15B]/50 text-[#102A43] bg-[#F7F5F0]' },
    { id: 'NEGOTIATION', label: 'In Negotiation', color: 'border-[#C6A15B] text-[#102A43] bg-[#F7F5F0]' },
    { id: 'CONVERTED', label: 'Converted Deal', color: 'border-emerald-300 text-emerald-800 bg-emerald-50' },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto text-[#20252B]">
      {/* Top Filter and Switcher */}
      <div className="bg-white rounded-3xl border border-[#E8E6E1] p-4 sm:p-6 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-[#52606D] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search lead name, phone, ref..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl text-xs bg-[#F7F5F0] border border-[#E8E6E1] text-[#20252B] focus:outline-hidden focus:border-[#C6A15B]"
          />
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
          {/* Status filter */}
          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value as 'ALL' | InquiryStatus)
            }
            className="text-xs font-semibold bg-[#F7F5F0] border border-[#E8E6E1] rounded-xl px-3 py-2 text-[#102A43] focus:outline-hidden cursor-pointer"
          >
            <option value="ALL">All Pipeline Stages</option>
            <option value="NEW">New Leads</option>
            <option value="CONTACTED">Contacted</option>
            <option value="VISIT_SCHEDULED">Visit Scheduled</option>
            <option value="NEGOTIATION">In Negotiation</option>
            <option value="CONVERTED">Converted</option>
            <option value="CLOSED_LOST">Closed Lost</option>
          </select>

          {/* Table vs Pipeline switch */}
          <div className="flex items-center p-1 bg-[#F7F5F0] rounded-xl border border-[#E8E6E1]">
            <button
              onClick={() => setViewMode('table')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer ${
                viewMode === 'table'
                  ? 'bg-white text-[#102A43] shadow-2xs font-bold'
                  : 'text-[#52606D] hover:text-[#102A43]'
              }`}
            >
              <List className="w-3.5 h-3.5" />
              <span>Table</span>
            </button>
            <button
              onClick={() => setViewMode('pipeline')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer ${
                viewMode === 'pipeline'
                  ? 'bg-white text-[#102A43] shadow-2xs font-bold'
                  : 'text-[#52606D] hover:text-[#102A43]'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Kanban</span>
            </button>
          </div>
        </div>
      </div>

      {/* Table Mode */}
      {viewMode === 'table' ? (
        <div className="bg-white rounded-3xl border border-[#E8E6E1] shadow-xs overflow-hidden">
          {/* Mobile View */}
          <div className="md:hidden divide-y divide-[#E8E6E1] p-4 space-y-4">
            {filteredInquiries.map((inq) => (
              <div key={inq.id} className="pt-4 first:pt-0 space-y-2.5">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-[#C6A15B] uppercase">
                      {inq.id}
                    </span>
                    <h4 className="text-sm font-bold text-[#102A43]">
                      {inq.customerName || inq.name}
                    </h4>
                    <div className="text-xs text-[#52606D] mt-0.5">
                      {inq.phone} • {inq.email}
                    </div>
                  </div>
                  <span className="text-xs font-bold text-[#102A43] bg-[#F7F5F0] px-2.5 py-1 rounded-lg border border-[#E8E6E1]">
                    {inq.budget}
                  </span>
                </div>

                <div className="text-xs text-[#102A43] font-semibold line-clamp-1">
                  {inq.propertyTitle}
                </div>

                {inq.message && (
                  <p className="text-[11px] text-[#52606D] italic line-clamp-2 bg-[#F7F5F0] p-2 rounded-lg border border-[#E8E6E1]">
                    "{inq.message}"
                  </p>
                )}

                <div className="flex items-center justify-between gap-2 pt-2 border-t border-[#E8E6E1]">
                  <select
                    value={inq.status}
                    onChange={(e) =>
                      updateInquiryStatus(inq.id, e.target.value as InquiryStatus)
                    }
                    className="text-xs font-bold rounded-lg px-2.5 py-1 border bg-[#F7F5F0] text-[#102A43] border-[#E8E6E1] cursor-pointer"
                  >
                    <option value="NEW">New Lead</option>
                    <option value="CONTACTED">Contacted</option>
                    <option value="VISIT_SCHEDULED">Visit Scheduled</option>
                    <option value="NEGOTIATION">In Negotiation</option>
                    <option value="CONVERTED">Converted</option>
                    <option value="CLOSED_LOST">Closed Lost</option>
                  </select>

                  <div className="flex items-center gap-2">
                    <a
                      href={`tel:${inq.phone.replace(/\s+/g, '')}`}
                      className="p-2 rounded-xl border border-[#E8E6E1] hover:bg-[#F7F5F0] text-[#102A43] transition-colors"
                      title="Call Customer"
                    >
                      <Phone className="w-3.5 h-3.5 text-[#C6A15B]" />
                    </a>
                    <a
                      href={`https://wa.me/${inq.phone.replace(/\D/g, '')}?text=Hello%20${encodeURIComponent(
                        inq.customerName || inq.name || 'Client'
                      )},%20this%20is%20Pondicherry%20Realty%20regarding%20your%20inquiry%20(Ref:%20${inq.id})`}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 rounded-xl bg-[#102A43] hover:bg-[#0B1D30] text-[#C6A15B] transition-colors"
                      title="WhatsApp Chat"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop View */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse min-w-[850px]">
              <thead>
                <tr className="border-b border-[#E8E6E1] bg-[#F7F5F0] text-[#52606D] font-bold uppercase tracking-wider text-[11px]">
                  <th className="p-4">Lead Reference</th>
                  <th className="p-4">Customer Details</th>
                  <th className="p-4">Interested Property</th>
                  <th className="p-4">Purpose & Budget</th>
                  <th className="p-4">Stage / Status</th>
                  <th className="p-4 text-right">Quick Contact</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8E6E1]">
                {filteredInquiries.map((inq) => (
                  <tr key={inq.id} className="hover:bg-[#F7F5F0]/60 transition-colors">
                    {/* Reference ID & Date */}
                    <td className="p-4">
                      <span className="font-bold text-[#102A43] text-xs">
                        {inq.id}
                      </span>
                      <div className="text-[#52606D] text-[11px] mt-0.5 font-normal">
                        {new Date(inq.createdAt).toLocaleDateString()}
                      </div>
                    </td>

                    {/* Customer Details */}
                    <td className="p-4">
                      <div className="font-bold text-[#102A43] text-sm">
                        {inq.customerName || inq.name}
                      </div>
                      <div className="text-[#52606D] text-[11px] mt-0.5 font-normal">
                        {inq.phone} • {inq.email}
                      </div>
                      {inq.message && (
                        <div className="text-[11px] text-[#52606D] italic line-clamp-1 mt-1 font-normal">
                          "{inq.message}"
                        </div>
                      )}
                    </td>

                    {/* Property */}
                    <td className="p-4">
                      <div className="font-bold text-[#102A43] line-clamp-1 max-w-[200px]">
                        {inq.propertyTitle}
                      </div>
                      <span className="text-[10px] font-semibold text-[#52606D] uppercase">
                        Pref Date: {inq.preferredDate || 'Flexible'} ({inq.preferredTime})
                      </span>
                    </td>

                    {/* Purpose & Budget */}
                    <td className="p-4">
                      <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-[#F7F5F0] text-[#102A43] border border-[#E8E6E1] mb-1">
                        {inq.listingType}
                      </span>
                      <div className="font-semibold text-[#102A43]">{inq.budget}</div>
                    </td>

                    {/* Stage Dropdown */}
                    <td className="p-4">
                      <select
                        value={inq.status}
                        onChange={(e) =>
                          updateInquiryStatus(inq.id, e.target.value as InquiryStatus)
                        }
                        className="text-xs font-bold rounded-xl px-3 py-2 border bg-[#F7F5F0] text-[#102A43] border-[#E8E6E1] cursor-pointer focus:outline-hidden focus:border-[#C6A15B]"
                      >
                        <option value="NEW">New Lead</option>
                        <option value="CONTACTED">Contacted</option>
                        <option value="VISIT_SCHEDULED">Visit Scheduled</option>
                        <option value="NEGOTIATION">In Negotiation</option>
                        <option value="CONVERTED">Converted</option>
                        <option value="CLOSED_LOST">Closed Lost</option>
                      </select>
                    </td>

                    {/* Quick Contact Actions */}
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <a
                          href={`tel:${inq.phone.replace(/\s+/g, '')}`}
                          className="p-2 rounded-xl border border-[#E8E6E1] hover:bg-[#F7F5F0] text-[#102A43] transition-colors cursor-pointer"
                          title="Call Customer"
                        >
                          <Phone className="w-3.5 h-3.5 text-[#C6A15B]" />
                        </a>
                        <a
                          href={`https://wa.me/${inq.phone.replace(/\D/g, '')}?text=Hello%20${encodeURIComponent(
                            inq.customerName || inq.name || 'Client'
                          )},%20this%20is%20Pondicherry%20Realty%20regarding%20your%20inquiry%20(Ref:%20${inq.id})`}
                          target="_blank"
                          rel="noreferrer"
                          className="p-2 rounded-xl bg-[#102A43] hover:bg-[#0B1D30] text-[#C6A15B] transition-colors cursor-pointer border border-[#C6A15B]/30"
                          title="WhatsApp Chat"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* Kanban Pipeline Mode */
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {statuses.map((col) => {
            const colInquiries = filteredInquiries.filter(
              (i) => i.status === col.id
            );
            return (
              <div
                key={col.id}
                className="bg-[#F7F5F0] rounded-3xl p-4 border border-[#E8E6E1] space-y-3 min-h-[500px] flex flex-col"
              >
                <div className="flex items-center justify-between pb-2 border-b border-[#E8E6E1]">
                  <span className="text-xs font-bold text-[#102A43] uppercase tracking-wider font-serif">
                    {col.label}
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-white text-[#102A43] border border-[#E8E6E1]">
                    {colInquiries.length}
                  </span>
                </div>

                <div className="space-y-3 flex-1 overflow-y-auto">
                  {colInquiries.map((inq) => (
                    <div
                      key={inq.id}
                      className="bg-white rounded-2xl p-4 border border-[#E8E6E1] shadow-2xs space-y-2.5 hover:shadow-xs transition-shadow"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <span className="text-[10px] font-bold text-[#C6A15B]">
                            {inq.id}
                          </span>
                          <h4 className="text-xs font-bold text-[#102A43]">
                            {inq.customerName || inq.name}
                          </h4>
                        </div>
                        <span className="text-[10px] font-bold uppercase px-1.5 py-0.5 rounded bg-[#F7F5F0] text-[#102A43] border border-[#E8E6E1]">
                          {inq.listingType}
                        </span>
                      </div>

                      <div className="text-[11px] text-[#52606D] font-medium line-clamp-1">
                        {inq.propertyTitle}
                      </div>

                      <div className="text-xs font-bold text-[#102A43]">
                        {inq.budget}
                      </div>

                      <div className="pt-2 border-t border-[#E8E6E1] flex items-center justify-between">
                        <span className="text-[10px] text-[#52606D]">
                          {inq.phone}
                        </span>

                        <select
                          value={inq.status}
                          onChange={(e) =>
                            updateInquiryStatus(
                              inq.id,
                              e.target.value as InquiryStatus
                            )
                          }
                          className="text-[10px] font-bold rounded-lg border border-[#E8E6E1] px-1.5 py-1 bg-[#F7F5F0] text-[#102A43] focus:outline-hidden"
                        >
                          <option value="NEW">Move: New</option>
                          <option value="CONTACTED">Move: Contacted</option>
                          <option value="VISIT_SCHEDULED">Move: Visit</option>
                          <option value="NEGOTIATION">Move: Negot.</option>
                          <option value="CONVERTED">Move: Won</option>
                        </select>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
