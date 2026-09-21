import React from 'react';
import { useRealEstate } from '../../context/RealEstateContext';
import { AdminTab } from '../../types';
import {
  LayoutDashboard,
  Building2,
  Inbox,
  CalendarCheck,
  Users,
  UserSquare2,
  TrendingUp,
  Settings,
  Globe,
  ShieldCheck,
  Sparkles,
  X,
  Clock,
  Package,
  CreditCard,
  UserCheck,
} from 'lucide-react';

interface AdminSidebarProps {
  mobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({
  mobileOpen = false,
  onCloseMobile,
}) => {
  const {
    adminTab,
    setAdminTab,
    setViewMode,
    properties,
    inquiries,
    siteVisits,
  } = useRealEstate();

  const pendingApprovalsCount = (properties || []).filter(
    (p) => p.approvalStatus === 'PENDING_APPROVAL' || p.approvalStatus === 'CHANGES_REQUESTED'
  ).length;
  const newInquiriesCount = (inquiries || []).filter((i) => i.status === 'NEW').length;
  const pendingVisitsCount = (siteVisits || []).filter((v) => v.status === 'PENDING' || v.status === 'REQUESTED').length;

  const menuItems: { id: AdminTab; label: string; icon: React.FC<{ className?: string }>; badge?: number; badgeColor?: string }[] = [
    { id: 'overview', label: 'Dashboard Overview', icon: LayoutDashboard },
    {
      id: 'approvals',
      label: 'Pending Approvals',
      icon: Clock,
      badge: pendingApprovalsCount,
      badgeColor: 'bg-amber-500 text-white',
    },
    { id: 'properties', label: 'Property Inventory', icon: Building2, badge: (properties || []).length },
    { id: 'packages', label: 'Listing Packages', icon: Package },
    { id: 'payments', label: 'Revenue & Payments', icon: CreditCard },
    { id: 'users', label: 'Users & Roles', icon: UserCheck },
    { id: 'inquiries', label: 'Inquiries & Leads', icon: Inbox, badge: newInquiriesCount },
    { id: 'visits', label: 'Site Visit Schedule', icon: CalendarCheck, badge: pendingVisitsCount },
    { id: 'agents', label: 'Broker Advisory Team', icon: Users },
    { id: 'clients', label: 'CRM Client Records', icon: UserSquare2 },
    { id: 'analytics', label: 'Market Analytics', icon: TrendingUp },
    { id: 'settings', label: 'System Settings', icon: Settings },
  ];

  const handleSelectTab = (tab: AdminTab) => {
    setAdminTab(tab);
    if (onCloseMobile) {
      onCloseMobile();
    }
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-xs lg:hidden transition-opacity"
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed lg:static top-0 bottom-0 left-0 z-50 w-72 lg:w-64 bg-[#102A43] text-[#F7F5F0] min-h-screen flex flex-col justify-between border-r border-[#1D3E5E] shrink-0 transition-transform duration-300 ease-in-out ${
          mobileOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Top Brand Bar */}
        <div className="flex-1 flex flex-col overflow-y-auto">
          <div className="p-5 sm:p-6 border-b border-[#1D3E5E] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#0B1D30] text-[#C6A15B] flex items-center justify-center shadow-md border border-[#244A6F]">
                <Building2 className="w-5 h-5 text-[#C6A15B]" />
              </div>
              <div>
                <div className="text-base font-bold text-white font-serif tracking-tight leading-none">
                  Pondicherry
                </div>
                <div className="text-[10px] font-extrabold tracking-[0.2em] text-[#C6A15B] uppercase leading-none mt-1">
                  ADMIN CONSOLE
                </div>
              </div>
            </div>

            {/* Mobile Close Button */}
            <button
              onClick={onCloseMobile}
              className="lg:hidden p-2 rounded-xl text-stone-300 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Close sidebar"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="px-5 py-3 border-b border-[#1D3E5E]">
            <div className="px-3 py-1.5 rounded-lg bg-[#0B1D30] border border-[#244A6F] flex items-center gap-2 text-[11px] text-[#F7F5F0]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#C6A15B]" />
              <span>Role: Principal Broker (Admin)</span>
            </div>
          </div>

          {/* Nav Links */}
          <nav className="p-3 sm:p-4 space-y-1.5 flex-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = adminTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleSelectTab(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#1D3E5E] text-white shadow-sm border border-[#C6A15B]/40'
                      : 'text-stone-300 hover:text-white hover:bg-[#163552]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon
                      className={`w-4 h-4 ${
                        isActive ? 'text-[#C6A15B]' : 'text-stone-300'
                      }`}
                    />
                    <span>{item.label}</span>
                  </div>

                  {item.badge !== undefined && item.badge > 0 && (
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        isActive
                          ? 'bg-[#C6A15B] text-[#102A43]'
                          : item.id === 'approvals'
                          ? 'bg-amber-500 text-white'
                          : item.id === 'inquiries' || item.id === 'visits'
                          ? 'bg-rose-500 text-white animate-pulse'
                          : 'bg-white/15 text-[#F7F5F0]'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Switcher to Customer Side */}
        <div className="p-4 border-t border-[#1D3E5E] space-y-3 shrink-0">
          <div className="p-3 bg-[#0B1D30] rounded-xl border border-[#244A6F] text-xs">
            <div className="flex items-center gap-1.5 text-[#C6A15B] font-bold mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Live Database Sync</span>
            </div>
            <p className="text-[11px] text-stone-300 leading-relaxed font-normal">
              Changes reflect immediately on the customer portal in real-time.
            </p>
          </div>

          <button
            onClick={() => {
              setViewMode('customer');
              if (onCloseMobile) onCloseMobile();
            }}
            className="w-full py-2.5 px-3 rounded-xl bg-[#1D3E5E] hover:bg-[#244A6F] text-white text-xs font-semibold transition-all flex items-center justify-center gap-2 border border-[#2B5780] active:scale-98 cursor-pointer"
          >
            <Globe className="w-4 h-4 text-[#C6A15B]" />
            <span>Switch to Customer Site</span>
          </button>
        </div>
      </aside>
    </>
  );
};
