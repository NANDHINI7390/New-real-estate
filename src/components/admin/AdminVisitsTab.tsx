import React, { useState } from 'react';
import { useRealEstate } from '../../context/RealEstateContext';
import { SiteVisitStatus } from '../../types';
import {
  Search,
  Clock,
  Phone,
  Calendar,
} from 'lucide-react';

export const AdminVisitsTab: React.FC = () => {
  const { siteVisits, updateSiteVisitStatus } = useRealEstate();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | SiteVisitStatus>('ALL');

  const filteredVisits = siteVisits.filter((v) => {
    if (search.trim()) {
      const q = search.toLowerCase();
      const clientName = (v.clientName || v.customerName || '').toLowerCase();
      const clientPhone = v.clientPhone || v.phone || '';
      const match =
        clientName.includes(q) ||
        v.propertyTitle.toLowerCase().includes(q) ||
        clientPhone.includes(q) ||
        v.id.toLowerCase().includes(q);
      if (!match) return false;
    }
    if (statusFilter !== 'ALL' && v.status !== statusFilter) return false;
    return true;
  });

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto text-[#20252B]">
      {/* Top Filter */}
      <div className="bg-white rounded-3xl border border-[#E8E6E1] p-4 sm:p-6 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-[#52606D] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search visit by client, property, date..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl text-xs bg-[#F7F5F0] border border-[#E8E6E1] text-[#20252B] focus:outline-hidden focus:border-[#C6A15B]"
          />
        </div>

        <div className="flex items-center gap-3">
          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value as 'ALL' | SiteVisitStatus)
            }
            className="text-xs font-semibold bg-[#F7F5F0] border border-[#E8E6E1] rounded-xl px-3 py-2 text-[#102A43] focus:outline-hidden cursor-pointer"
          >
            <option value="ALL">All Visit Statuses</option>
            <option value="PENDING">Pending Approval</option>
            <option value="CONFIRMED">Confirmed</option>
            <option value="COMPLETED">Completed</option>
            <option value="CANCELLED">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Visits Table */}
      <div className="bg-white rounded-3xl border border-[#E8E6E1] shadow-xs overflow-hidden">
        {/* Mobile View */}
        <div className="md:hidden divide-y divide-[#E8E6E1] p-4 space-y-4">
          {filteredVisits.map((visit) => (
            <div key={visit.id} className="pt-4 first:pt-0 space-y-2.5">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-bold text-[#C6A15B] uppercase">
                    {visit.id}
                  </span>
                  <h4 className="text-sm font-bold text-[#102A43]">
                    {visit.clientName || visit.customerName}
                  </h4>
                  <div className="text-xs text-[#52606D] flex items-center gap-1 mt-0.5">
                    <Phone className="w-3 h-3 text-[#C6A15B]" />
                    <span>{visit.clientPhone || visit.phone}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-bold text-[#102A43]">
                    {visit.date}
                  </div>
                  <div className="text-[11px] text-[#52606D]">
                    {visit.timeSlot}
                  </div>
                </div>
              </div>

              <div className="text-xs text-[#102A43] font-semibold line-clamp-1">
                {visit.propertyTitle}
              </div>

              {visit.notes && (
                <div className="text-[11px] text-[#52606D] italic bg-[#F7F5F0] p-2 rounded-lg border border-[#E8E6E1]">
                  Note: {visit.notes}
                </div>
              )}

              <div className="flex items-center justify-between gap-2 pt-2 border-t border-[#E8E6E1]">
                <span className="text-xs font-semibold text-[#52606D]">
                  Advisor: {visit.assignedAgent || 'Arun Kumar'}
                </span>

                <select
                  value={visit.status}
                  onChange={(e) =>
                    updateSiteVisitStatus(
                      visit.id,
                      e.target.value as SiteVisitStatus
                    )
                  }
                  className={`text-xs font-bold rounded-lg px-2.5 py-1 border cursor-pointer ${
                    visit.status === 'CONFIRMED'
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                      : visit.status === 'PENDING'
                      ? 'bg-[#F7F5F0] text-[#102A43] border-[#E8E6E1]'
                      : visit.status === 'COMPLETED'
                      ? 'bg-blue-50 text-blue-800 border-blue-200'
                      : 'bg-stone-200 text-stone-700 border-stone-300'
                  }`}
                >
                  <option value="PENDING">Pending</option>
                  <option value="CONFIRMED">Confirmed</option>
                  <option value="COMPLETED">Completed</option>
                  <option value="CANCELLED">Cancelled</option>
                </select>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop View */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse min-w-[850px]">
            <thead>
              <tr className="border-b border-[#E8E6E1] bg-[#F7F5F0] text-[#52606D] font-bold uppercase tracking-wider text-[11px]">
                <th className="p-4">Visit ID</th>
                <th className="p-4">Client Contact</th>
                <th className="p-4">Scheduled Property</th>
                <th className="p-4">Date & Time</th>
                <th className="p-4">Assigned Consultant</th>
                <th className="p-4">Status / Update</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[#E8E6E1]">
              {filteredVisits.map((visit) => (
                <tr key={visit.id} className="hover:bg-[#F7F5F0]/60 transition-colors">
                  <td className="p-4">
                    <span className="font-bold text-[#102A43] text-xs">
                      {visit.id}
                    </span>
                    <div className="text-[#52606D] text-[10px] font-normal">
                      Created: {new Date(visit.createdAt).toLocaleDateString()}
                    </div>
                  </td>

                  <td className="p-4">
                    <div className="font-bold text-[#102A43] text-sm">
                      {visit.clientName || visit.customerName}
                    </div>
                    <div className="text-[#52606D] text-[11px] flex items-center gap-1 mt-0.5">
                      <Phone className="w-3 h-3 text-[#C6A15B]" />
                      <span>{visit.clientPhone || visit.phone}</span>
                    </div>
                    {visit.notes && (
                      <div className="text-[11px] text-[#52606D] italic mt-0.5 line-clamp-1 font-normal">
                        Note: {visit.notes}
                      </div>
                    )}
                  </td>

                  <td className="p-4">
                    <div className="font-bold text-[#102A43] line-clamp-1 max-w-[200px]">
                      {visit.propertyTitle}
                    </div>
                  </td>

                  <td className="p-4">
                    <div className="flex items-center gap-1.5 font-bold text-[#102A43]">
                      <Calendar className="w-3.5 h-3.5 text-[#C6A15B]" />
                      <span>{visit.date}</span>
                    </div>
                    <div className="flex items-center gap-1 text-[11px] text-[#52606D] mt-0.5 font-normal">
                      <Clock className="w-3 h-3" />
                      <span>{visit.timeSlot}</span>
                    </div>
                  </td>

                  <td className="p-4">
                    <span className="text-xs font-semibold text-[#52606D]">
                      {visit.assignedAgent || 'Arun Kumar'}
                    </span>
                  </td>

                  <td className="p-4">
                    <select
                      value={visit.status}
                      onChange={(e) =>
                        updateSiteVisitStatus(
                          visit.id,
                          e.target.value as SiteVisitStatus
                        )
                      }
                      className={`text-xs font-bold rounded-xl px-3 py-2 border cursor-pointer focus:outline-hidden ${
                        visit.status === 'CONFIRMED'
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                          : visit.status === 'PENDING'
                          ? 'bg-[#F7F5F0] text-[#102A43] border-[#E8E6E1]'
                          : visit.status === 'COMPLETED'
                          ? 'bg-blue-50 text-blue-800 border-blue-200'
                          : 'bg-stone-200 text-stone-700 border-stone-300'
                      }`}
                    >
                      <option value="PENDING">Pending</option>
                      <option value="CONFIRMED">Confirmed</option>
                      <option value="COMPLETED">Completed</option>
                      <option value="CANCELLED">Cancelled</option>
                    </select>
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
