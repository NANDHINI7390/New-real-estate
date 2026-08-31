import React, { useState } from 'react';
import { useRealEstate } from '../../context/RealEstateContext';
import { Search } from 'lucide-react';

export const AdminClientsTab: React.FC = () => {
  const { clients } = useRealEstate();
  const [search, setSearch] = useState('');

  const filteredClients = clients.filter((c) => {
    if (search.trim()) {
      const q = search.toLowerCase();
      const tags = c.tags || [];
      const match =
        c.name.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q) ||
        c.phone.includes(q) ||
        tags.some((t) => t.toLowerCase().includes(q));
      if (!match) return false;
    }
    return true;
  });

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto text-[#20252B]">
      {/* Header */}
      <div className="bg-white rounded-3xl border border-[#E8E6E1] p-4 sm:p-6 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold font-serif text-[#102A43]">
            Customer Relationship Management (CRM)
          </h2>
          <p className="text-xs text-[#52606D] font-normal">
            High-net-worth buyers, overseas NRI investors, and verified repeat clientele
          </p>
        </div>

        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-[#52606D] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search client by name, tag, phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl text-xs bg-[#F7F5F0] border border-[#E8E6E1] text-[#20252B] focus:outline-hidden focus:border-[#C6A15B]"
          />
        </div>
      </div>

      {/* Client Container */}
      <div className="bg-white rounded-3xl border border-[#E8E6E1] shadow-xs overflow-hidden">
        {/* Mobile View */}
        <div className="md:hidden divide-y divide-[#E8E6E1] p-4 space-y-4">
          {filteredClients.map((client) => (
            <div key={client.id} className="pt-4 first:pt-0 space-y-2">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="text-sm font-bold text-[#102A43]">
                    {client.name}
                  </h4>
                  <span className="text-[10px] text-[#52606D] uppercase">
                    ID: {client.id}
                  </span>
                </div>
                <div className="font-bold text-[#102A43] text-sm font-serif">
                  {client.budget}
                </div>
              </div>

              <div className="text-xs text-[#52606D]">
                {client.phone} • {client.email}
              </div>

              <div className="flex flex-wrap gap-1 pt-1">
                {(client.tags && client.tags.length > 0 ? client.tags : [client.leadStatus, 'Verified Buyer']).map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#F7F5F0] text-[#102A43] border border-[#E8E6E1]"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between text-[11px] text-[#52606D] pt-1">
                <span>Source: {client.source || 'Digital Portal'}</span>
                <span>Last contact: {client.lastContacted || client.lastContactDate}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop Table View */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse min-w-[800px]">
            <thead>
              <tr className="border-b border-[#E8E6E1] bg-[#F7F5F0] text-[#52606D] font-bold uppercase tracking-wider text-[11px]">
                <th className="p-4">Client Name</th>
                <th className="p-4">Contact Details</th>
                <th className="p-4">Tags & Segment</th>
                <th className="p-4">Budget / Portfolio</th>
                <th className="p-4">Lead Source</th>
                <th className="p-4">Last Contacted</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[#E8E6E1]">
              {filteredClients.map((client) => (
                <tr key={client.id} className="hover:bg-[#F7F5F0]/60 transition-colors">
                  <td className="p-4">
                    <div className="font-bold text-[#102A43] text-sm">
                      {client.name}
                    </div>
                    <span className="text-[10px] text-[#52606D] font-semibold uppercase">
                      ID: {client.id}
                    </span>
                  </td>

                  <td className="p-4">
                    <div className="text-[#102A43] font-medium">{client.phone}</div>
                    <div className="text-[#52606D] text-[11px] font-normal">{client.email}</div>
                  </td>

                  <td className="p-4">
                    <div className="flex flex-wrap gap-1">
                      {(client.tags && client.tags.length > 0 ? client.tags : [client.leadStatus, 'Verified Buyer']).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#F7F5F0] text-[#102A43] border border-[#E8E6E1]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </td>

                  <td className="p-4">
                    <div className="font-bold text-[#102A43] text-sm font-serif">
                      {client.budget}
                    </div>
                  </td>

                  <td className="p-4">
                    <span className="text-xs font-semibold text-[#52606D]">
                      {client.source || 'Digital Portal'}
                    </span>
                  </td>

                  <td className="p-4">
                    <div className="text-[#52606D] font-medium">
                      {client.lastContacted || client.lastContactDate}
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
