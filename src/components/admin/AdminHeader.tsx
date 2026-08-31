import React from 'react';
import { useRealEstate } from '../../context/RealEstateContext';
import {
  Plus,
  RotateCcw,
  Globe,
  LayoutDashboard,
  Calendar,
  Menu,
} from 'lucide-react';

interface AdminHeaderProps {
  onOpenAddPropertyModal: () => void;
  onToggleMobileSidebar?: () => void;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({
  onOpenAddPropertyModal,
  onToggleMobileSidebar,
}) => {
  const {
    viewMode,
    adminTab,
    resetDemoData,
    setViewMode,
    inquiries,
    siteVisits,
  } = useRealEstate();

  const pendingBadgeCount =
    (inquiries || []).filter((i) => i.status === 'NEW').length +
    (siteVisits || []).filter((v) => v.status === 'PENDING' || v.status === 'REQUESTED').length;

  const tabTitles: Record<string, string> = {
    overview: 'Executive Dashboard & Metrics',
    properties: 'Property Inventory & Portfolio',
    inquiries: 'Lead Pipeline & Inquiries CRM',
    visits: 'Site Visit Tours & Schedule',
    agents: 'Property Consultants & Advisory',
    clients: 'Customer Relationship Records (CRM)',
    analytics: 'Market Valuation & Analytics',
    settings: 'Platform Configuration & RERA',
  };

  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });

  return (
    <header className="bg-white border-b border-[#E8E6E1] px-4 sm:px-6 py-3.5 sm:py-4 sticky top-0 z-20 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3.5">
        {/* Left Side: Mobile Menu Button + Page Title */}
        <div className="flex items-center gap-3">
          {onToggleMobileSidebar && (
            <button
              onClick={onToggleMobileSidebar}
              className="lg:hidden p-2 rounded-xl bg-[#F7F5F0] border border-[#E8E6E1] text-[#102A43] hover:bg-[#E8E6E1] transition-colors focus:outline-hidden cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          )}

          <div>
            <h1 className="text-base sm:text-lg lg:text-xl font-bold font-serif text-[#102A43] line-clamp-1">
              {tabTitles[adminTab] || 'Management Console'}
            </h1>
            <div className="flex items-center gap-2 text-[11px] text-[#52606D] mt-0.5">
              <Calendar className="w-3.5 h-3.5 text-[#C6A15B]" />
              <span>{currentDate}</span>
              <span>•</span>
              <span className="text-[#C6A15B] font-semibold">Puducherry Hub</span>
            </div>
          </div>
        </div>

        {/* Right Side Controls */}
        <div className="flex items-center flex-wrap gap-2 sm:gap-2.5 justify-between sm:justify-end">
          {/* View Mode Toggle */}
          <div className="flex items-center bg-[#F7F5F0] p-1 rounded-xl border border-[#E8E6E1]">
            <button
              onClick={() => setViewMode('customer')}
              className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                viewMode === 'customer'
                  ? 'bg-white text-[#102A43] shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
              title="Switch to Customer Website"
            >
              <Globe className="w-3.5 h-3.5 text-[#C6A15B]" />
              <span className="hidden xs:inline sm:inline">Customer</span>
              <span className="xs:hidden sm:hidden">Site</span>
            </button>
            <button
              onClick={() => setViewMode('admin')}
              className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-bold transition-all relative cursor-pointer ${
                viewMode === 'admin'
                  ? 'bg-[#102A43] text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
              title="Admin Dashboard active"
            >
              <LayoutDashboard className="w-3.5 h-3.5 text-[#C6A15B]" />
              <span>Admin</span>
              {pendingBadgeCount > 0 && (
                <span className="w-2 h-2 rounded-full bg-rose-500 absolute -top-0.5 -right-0.5 animate-pulse" />
              )}
            </button>
          </div>

          {/* Reset Demo Data Button */}
          <button
            onClick={resetDemoData}
            title="Restore sample listings & leads"
            className="px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl text-xs font-semibold text-[#52606D] hover:text-[#102A43] hover:bg-[#F7F5F0] border border-[#E8E6E1] transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5 text-[#52606D]" />
            <span className="hidden md:inline">Reset Demo</span>
          </button>

          {/* Add New Property CTA */}
          <button
            onClick={onOpenAddPropertyModal}
            className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl bg-[#102A43] hover:bg-[#0B1D30] text-white text-xs font-bold shadow-sm transition-all flex items-center gap-1.5 active:scale-98 cursor-pointer"
          >
            <Plus className="w-4 h-4 text-[#C6A15B]" />
            <span>+ Add Listing</span>
          </button>
        </div>
      </div>
    </header>
  );
};
