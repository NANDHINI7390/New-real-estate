import React, { useState } from 'react';
import { useRealEstate } from '../../context/RealEstateContext';
import { AgentTab, Property, LeadStatus } from '../../types';
import {
  Briefcase,
  Building2,
  Users,
  Calendar,
  Plus,
  Phone,
  Mail,
  MapPin,
  TrendingUp,
  Search,
  CheckCircle2,
  Clock,
  Eye,
  MessageSquare,
  DollarSign,
  ExternalLink,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { formatINR } from '../../data/mockData';
import { ListPropertyFlow } from '../seller/ListPropertyFlow';

export const AgentDashboard: React.FC = () => {
  const {
    properties,
    inquiries,
    siteVisits,
    clients,
    currentUser,
    agentTab,
    setAgentTab,
    navigateToProperty,
    updateInquiryStatus,
    updateVisitStatus,
    setViewMode,
  } = useRealEstate();

  const [searchQuery, setSearchQuery] = useState('');

  // Agent's managed listings
  const managedProperties = properties.filter(
    (p) => p.agentId === currentUser?.uid || p.agentName === currentUser?.displayName || true
  );

  const activeInquiries = inquiries.filter((inq) => inq.status !== 'CONVERTED' && inq.status !== 'LOST');
  const upcomingVisits = siteVisits.filter((vis) => vis.status === 'CONFIRMED' || vis.status === 'REQUESTED');

  const filteredProperties = managedProperties.filter((p) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return p.title.toLowerCase().includes(q) || p.location.toLowerCase().includes(q);
  });

  return (
    <div className="min-h-screen bg-[#F7F5F0] text-[#20252B]">
      {/* Agent Portal Top Header */}
      <div className="bg-[#102A43] text-white border-b border-[#1D3E5E]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#0B1D30] border border-[#244A6F] flex items-center justify-center text-[#C6A15B] font-bold text-lg font-serif shadow-md">
                <Briefcase className="w-6 h-6 text-[#C6A15B]" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider bg-blue-500 text-white uppercase">
                    LICENSED AGENT & BROKER PORTAL
                  </span>
                  <span className="text-xs text-stone-400">
                    {currentUser?.agencyName || 'Coromandel Coastal Realty'}
                  </span>
                </div>
                <h1 className="text-2xl font-bold font-serif text-white mt-1">
                  {currentUser?.displayName || 'Rajesh Subramaniam (RERA Agent)'}
                </h1>
                <p className="text-xs text-stone-300">
                  Client acquisition, property mandate portfolio, and buyer visit coordination across Puducherry.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setAgentTab('add-property')}
                className="px-4 py-2.5 rounded-xl bg-[#C6A15B] hover:bg-amber-400 text-[#102A43] text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all"
              >
                <Plus className="w-4 h-4" />
                List Property for Client
              </button>

              <button
                onClick={() => setViewMode('customer')}
                className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center gap-1.5 transition-all"
              >
                <ExternalLink className="w-3.5 h-3.5 text-[#C6A15B]" />
                Public Catalog
              </button>
            </div>
          </div>

          {/* Agent KPIs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-[#1D3E5E]">
            <div className="p-3.5 rounded-xl bg-[#0B1D30]/80 border border-[#1D3E5E]">
              <span className="text-[11px] text-stone-400 font-medium">Managed Portfolio</span>
              <div className="text-2xl font-bold text-white font-serif mt-0.5">{managedProperties.length}</div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#0B1D30]/80 border border-[#1D3E5E]">
              <span className="text-[11px] text-amber-400 font-medium">Active Leads</span>
              <div className="text-2xl font-bold text-amber-400 font-serif mt-0.5">{activeInquiries.length}</div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#0B1D30]/80 border border-[#1D3E5E]">
              <span className="text-[11px] text-[#C6A15B] font-medium">Upcoming Visits</span>
              <div className="text-2xl font-bold text-[#C6A15B] font-serif mt-0.5">{upcomingVisits.length}</div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#0B1D30]/80 border border-[#1D3E5E]">
              <span className="text-[11px] text-emerald-400 font-medium">CRM Clients</span>
              <div className="text-2xl font-bold text-emerald-400 font-serif mt-0.5">{clients.length}</div>
            </div>
          </div>
        </div>

        {/* Tab Nav */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-1 overflow-x-auto py-2 scrollbar-none text-xs font-semibold">
            {[
              { id: 'properties', label: 'Portfolio Listings', icon: Building2, count: managedProperties.length },
              { id: 'add-property', label: 'Add Mandate', icon: Plus },
              { id: 'leads', label: 'Leads & Enquiries', icon: MessageSquare, count: activeInquiries.length },
              { id: 'visits', label: 'Site Inspection Schedule', icon: Calendar, count: upcomingVisits.length },
              { id: 'clients', label: 'CRM Investors & Buyers', icon: Users, count: clients.length },
              { id: 'performance', label: 'Commission & Analytics', icon: TrendingUp },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = agentTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setAgentTab(tab.id as AgentTab)}
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

      {/* Main Agent Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* TAB 1: PROPERTIES */}
        {agentTab === 'properties' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-[#102A43] font-serif">
                  Agent Managed Properties
                </h2>
                <p className="text-xs text-stone-500 mt-1">
                  Properties where you are assigned as the lead transaction consultant.
                </p>
              </div>

              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search listings by title or location..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 text-xs bg-white border border-[#E8E6E1] rounded-xl shadow-2xs"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProperties.map((prop) => (
                <div
                  key={prop.id}
                  className="bg-white rounded-2xl border border-[#E8E6E1] overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="relative h-44 w-full bg-stone-100 overflow-hidden">
                      <img src={prop.heroImage} alt={prop.title} className="w-full h-full object-cover" />
                      <div className="absolute top-2 left-2 flex items-center gap-1.5">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#102A43] text-white uppercase">
                          {prop.listingType}
                        </span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#C6A15B] text-white uppercase">
                          {prop.propertyType}
                        </span>
                      </div>
                    </div>

                    <div className="p-4 space-y-2">
                      <div className="text-lg font-bold text-[#102A43] font-serif">
                        {prop.displayPrice || formatINR(prop.price)}
                      </div>
                      <h4 className="font-bold text-[#102A43] text-sm truncate">{prop.title}</h4>
                      <div className="text-xs text-stone-500 flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-[#C6A15B]" />
                        <span className="truncate">{prop.location}</span>
                      </div>
                      <div className="flex items-center gap-3 pt-2 text-xs text-stone-600 border-t border-[#F0EFEA]">
                        <span>{prop.specs.bedrooms} BHK</span>
                        <span>•</span>
                        <span>{prop.specs.areaSqFt} Sq.Ft</span>
                        <span>•</span>
                        <span className="text-emerald-700 font-semibold">{prop.status}</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-3.5 bg-[#F7F5F0] border-t border-[#E8E6E1] flex items-center justify-between">
                    <button
                      onClick={() => navigateToProperty(prop.id)}
                      className="text-xs font-bold text-[#102A43] hover:underline flex items-center gap-1"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      View Listing
                    </button>
                    <span className="text-[11px] text-stone-400">
                      Owner: {prop.ownerName || 'Direct'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: ADD MANDATE */}
        {agentTab === 'add-property' && (
          <ListPropertyFlow
            onSuccess={() => setAgentTab('properties')}
            onCancel={() => setAgentTab('properties')}
          />
        )}

        {/* TAB 3: LEADS */}
        {agentTab === 'leads' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-[#102A43] font-serif">
                Lead Pipeline & Enquiries
              </h2>
              <p className="text-xs text-stone-500 mt-1">
                Manage inbound client enquiries, follow-up calls, and conversion stages.
              </p>
            </div>

            <div className="space-y-4">
              {inquiries.map((inq) => (
                <div
                  key={inq.id}
                  className="bg-white rounded-2xl border border-[#E8E6E1] p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-[#C6A15B]">{inq.refNumber}</span>
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-800">
                        {inq.status}
                      </span>
                    </div>
                    <h4 className="text-base font-bold text-[#102A43]">{inq.propertyTitle}</h4>
                    <div className="text-xs text-stone-600 flex flex-wrap items-center gap-4">
                      <span><strong>Client:</strong> {inq.customerName}</span>
                      <span><strong>Phone:</strong> {inq.phone}</span>
                      <span><strong>Budget:</strong> {inq.budget}</span>
                    </div>
                    <p className="text-xs text-stone-500 italic bg-[#F7F5F0] p-2.5 rounded-xl">
                      "{inq.message}"
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center gap-2 shrink-0">
                    <a
                      href={`tel:${inq.phone}`}
                      className="w-full sm:w-auto px-4 py-2 rounded-xl bg-[#102A43] text-white text-xs font-bold flex items-center justify-center gap-1.5"
                    >
                      <Phone className="w-3.5 h-3.5 text-[#C6A15B]" />
                      Call Client
                    </a>
                    <button
                      onClick={() => updateInquiryStatus(inq.id, 'VISIT_SCHEDULED')}
                      className="w-full sm:w-auto px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700"
                    >
                      Schedule Visit
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: VISITS */}
        {agentTab === 'visits' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-[#102A43] font-serif">
                Site Inspection Calendar
              </h2>
              <p className="text-xs text-stone-500 mt-1">
                Coordinated property walkthroughs with prospective buyers.
              </p>
            </div>

            <div className="space-y-4">
              {siteVisits.map((v) => (
                <div
                  key={v.id}
                  className="bg-white rounded-2xl border border-[#E8E6E1] p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-[#C6A15B]">{v.refNumber}</span>
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
                        {v.status}
                      </span>
                    </div>
                    <h4 className="font-bold text-[#102A43] text-base">{v.propertyTitle}</h4>
                    <div className="text-xs text-stone-500 flex items-center gap-3">
                      <span><strong>Date:</strong> {v.date}</span>
                      <span><strong>Slot:</strong> {v.timeSlot}</span>
                      <span><strong>Visitor:</strong> {v.customerName} ({v.phone})</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateVisitStatus(v.id, 'COMPLETED')}
                      className="px-4 py-2 rounded-xl bg-[#102A43] text-white text-xs font-bold"
                    >
                      Mark Completed
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: CLIENTS */}
        {agentTab === 'clients' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-[#102A43] font-serif">
                Investor & Buyer CRM
              </h2>
              <p className="text-xs text-stone-500 mt-1">
                Profiles of high-net-worth individuals and families looking for properties in Pondicherry.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {clients.map((c) => (
                <div key={c.id} className="bg-white rounded-2xl border border-[#E8E6E1] p-5 shadow-xs space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-[#102A43] text-base">{c.name}</h4>
                      <div className="text-xs text-stone-500">{c.email} • {c.phone}</div>
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-900">
                      {c.leadStatus}
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-[#F7F5F0] text-xs space-y-1">
                    <div><strong>Budget:</strong> {c.budget}</div>
                    <div><strong>Requirement:</strong> {c.requirements}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 6: PERFORMANCE */}
        {agentTab === 'performance' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-[#102A43] font-serif">
                Performance Metrics & Commission Tracking
              </h2>
              <p className="text-xs text-stone-500 mt-1">
                Brokerage production summary for current fiscal quarter.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl bg-white border border-[#E8E6E1] shadow-xs">
                <span className="text-xs font-bold text-stone-500 uppercase">Closed Transactions</span>
                <div className="text-3xl font-bold text-[#102A43] font-serif mt-2">42</div>
                <div className="text-xs text-emerald-600 mt-1">↑ 18% from last quarter</div>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-[#E8E6E1] shadow-xs">
                <span className="text-xs font-bold text-stone-500 uppercase">Avg Brokerage Fee</span>
                <div className="text-3xl font-bold text-[#102A43] font-serif mt-2">2.0%</div>
                <div className="text-xs text-stone-500 mt-1">Standard Puducherry RERA norm</div>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-[#E8E6E1] shadow-xs">
                <span className="text-xs font-bold text-stone-500 uppercase">Customer Satisfaction</span>
                <div className="text-3xl font-bold text-[#C6A15B] font-serif mt-2">4.9 / 5.0</div>
                <div className="text-xs text-stone-500 mt-1">Based on 128 verified client reviews</div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
