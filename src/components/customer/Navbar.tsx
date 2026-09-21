import React, { useState } from 'react';
import { useRealEstate } from '../../context/RealEstateContext';
import {
  Building2,
  Heart,
  Scale,
  Phone,
  Calendar,
  Menu,
  X,
  LayoutDashboard,
  Globe,
  ChevronRight,
  Sparkles,
  Plus,
  Home,
  Briefcase,
  Shield,
  UserCheck,
} from 'lucide-react';
import { RoleSwitcher } from '../common/RoleSwitcher';

interface NavbarProps {
  onOpenScheduleModal: () => void;
  onOpenInquiryModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenScheduleModal, onOpenInquiryModal }) => {
  const {
    viewMode,
    customerPage,
    setCustomerPage,
    setViewMode,
    favorites,
    comparisonList,
    inquiries,
    siteVisits,
  } = useRealEstate();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const pendingBadgeCount =
    inquiries.filter((i) => i.status === 'NEW').length +
    siteVisits.filter((v) => v.status === 'PENDING' || v.status === 'REQUESTED').length;

  const navLinks = [
    { label: 'Home', page: 'home' },
    { label: 'Buy', page: 'buy' },
    { label: 'Rent', page: 'rent' },
    { label: 'Projects', page: 'projects' },
    { label: 'List Property', page: 'list-property', highlight: true },
    { label: 'Services', page: 'services' },
    { label: 'About', page: 'about' },
    { label: 'Contact', page: 'contact' },
  ];

  const handleNavClick = (page: string) => {
    setCustomerPage(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#E8E6E1] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-[#102A43] text-white flex items-center justify-center shadow-xs group-hover:bg-[#0B1D30] transition-colors">
              <Building2 className="w-5 h-5 text-[#C6A15B]" />
            </div>
            <div>
              <span className="block text-xl font-bold tracking-tight text-[#102A43] font-serif leading-none">
                Pondicherry
              </span>
              <span className="block text-[10px] font-extrabold tracking-[0.25em] text-[#C6A15B] uppercase leading-none mt-1">
                REALTY
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => {
              const isActive = customerPage === link.page;
              return (
                <button
                  key={link.label}
                  onClick={() => handleNavClick(link.page)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors relative ${
                    link.highlight
                      ? 'text-[#C6A15B] font-bold hover:bg-amber-50'
                      : isActive
                      ? 'text-[#102A43] font-bold'
                      : 'text-[#52606D] hover:text-[#102A43] hover:bg-[#F7F5F0]'
                  }`}
                >
                  <span className="flex items-center gap-1">
                    {link.highlight && <Sparkles className="w-3.5 h-3.5 text-[#C6A15B]" />}
                    {link.label}
                  </span>
                  {isActive && !link.highlight && (
                    <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#C6A15B] rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Icons, View Switcher & Buttons */}
          <div className="hidden sm:flex items-center gap-2 xl:gap-2.5">
            {/* 4-Role Identity Switcher */}
            <RoleSwitcher />

            {/* List Your Property Primary CTA */}
            <button
              onClick={() => {
                setCustomerPage('list-property');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#C6A15B] hover:bg-amber-400 text-[#102A43] text-xs font-extrabold shadow-xs transition-all active:scale-98 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>List Property</span>
            </button>

            {/* Compare Badge Button */}
            <button
              onClick={() => {
                setCustomerPage('compare');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              title="Compare Properties"
              className={`relative p-2.5 rounded-xl border transition-all ${
                customerPage === 'compare'
                  ? 'bg-[#102A43] text-white border-[#102A43]'
                  : 'bg-white text-[#52606D] border-[#E8E6E1] hover:border-[#C6A15B] hover:bg-[#F7F5F0]'
              }`}
            >
              <Scale className="w-4 h-4" />
              {comparisonList.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-[#C6A15B] text-white text-[10px] font-bold flex items-center justify-center shadow-xs">
                  {comparisonList.length}
                </span>
              )}
            </button>

            {/* Favorites Badge Button */}
            <button
              onClick={() => {
                setCustomerPage('properties');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              title="Saved Properties"
              className="relative p-2.5 rounded-xl border bg-white text-[#52606D] border-[#E8E6E1] hover:border-[#C6A15B] hover:bg-[#F7F5F0] transition-all"
            >
              <Heart className={`w-4 h-4 ${favorites.length > 0 ? 'text-[#C6A15B] fill-[#C6A15B]' : ''}`} />
              {favorites.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-[#C6A15B] text-white text-[10px] font-bold flex items-center justify-center shadow-xs">
                  {favorites.length}
                </span>
              )}
            </button>

            {/* Schedule Visit Primary Button */}
            <button
              onClick={onOpenScheduleModal}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#102A43] hover:bg-[#0B1D30] text-white text-xs font-semibold shadow-xs transition-all active:scale-98 cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5 text-[#C6A15B]" />
              <span className="hidden xl:inline">Schedule Visit</span>
              <span className="xl:hidden">Visit</span>
            </button>
          </div>

          {/* Mobile Actions & Menu Toggle */}
          <div className="flex sm:hidden items-center gap-2">
            <RoleSwitcher />

            <button
              onClick={() => {
                setCustomerPage('compare');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="p-2 rounded-lg bg-white border border-[#E8E6E1] text-[#52606D] relative"
            >
              <Scale className="w-4 h-4" />
              {comparisonList.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#C6A15B] text-white text-[9px] font-bold flex items-center justify-center">
                  {comparisonList.length}
                </span>
              )}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-[#F7F5F0] text-[#20252B] hover:text-[#102A43] border border-[#E8E6E1]"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#E8E6E1] bg-[#F7F5F0] px-4 pt-4 pb-6 space-y-4 shadow-xl">
          {/* Mobile Platform Switcher */}
          <div className="p-3 rounded-2xl bg-white border border-[#E8E6E1] space-y-2">
            <div className="text-[10px] font-extrabold text-[#52606D] uppercase tracking-widest px-1">
              Select Marketplace Workspace
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  setViewMode('customer');
                  setMobileMenuOpen(false);
                }}
                className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-bold transition-all ${
                  viewMode === 'customer'
                    ? 'bg-[#102A43] text-white shadow-xs'
                    : 'bg-[#F7F5F0] text-[#52606D] border border-[#E8E6E1] hover:bg-white'
                }`}
              >
                <Globe className="w-3.5 h-3.5 text-[#C6A15B]" />
                <span>Buyer Web</span>
              </button>
              <button
                onClick={() => {
                  setViewMode('seller');
                  setMobileMenuOpen(false);
                }}
                className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-bold transition-all ${
                  viewMode === 'seller'
                    ? 'bg-[#102A43] text-white shadow-xs'
                    : 'bg-[#F7F5F0] text-[#52606D] border border-[#E8E6E1] hover:bg-white'
                }`}
              >
                <Home className="w-3.5 h-3.5 text-amber-500" />
                <span>Seller Desk</span>
              </button>
              <button
                onClick={() => {
                  setViewMode('agent');
                  setMobileMenuOpen(false);
                }}
                className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-bold transition-all ${
                  viewMode === 'agent'
                    ? 'bg-[#102A43] text-white shadow-xs'
                    : 'bg-[#F7F5F0] text-[#52606D] border border-[#E8E6E1] hover:bg-white'
                }`}
              >
                <Briefcase className="w-3.5 h-3.5 text-blue-500" />
                <span>Agent Portal</span>
              </button>
              <button
                onClick={() => {
                  setViewMode('admin');
                  setMobileMenuOpen(false);
                }}
                className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-bold transition-all ${
                  viewMode === 'admin'
                    ? 'bg-[#102A43] text-white shadow-xs'
                    : 'bg-[#F7F5F0] text-[#52606D] border border-[#E8E6E1] hover:bg-white'
                }`}
              >
                <Shield className="w-3.5 h-3.5 text-purple-500" />
                <span>Admin Hub</span>
              </button>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="grid grid-cols-2 gap-2">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.page)}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium text-left transition-colors ${
                  link.highlight
                    ? 'bg-[#C6A15B] text-[#102A43] font-bold col-span-2'
                    : customerPage === link.page
                    ? 'bg-[#102A43] text-white font-semibold'
                    : 'bg-white border border-[#E8E6E1] text-[#20252B] hover:bg-[#F7F5F0]'
                }`}
              >
                <span>{link.label}</span>
                <ChevronRight className="w-4 h-4 opacity-60" />
              </button>
            ))}
          </div>

          {/* Mobile CTA */}
          <div className="pt-2 border-t border-[#E8E6E1] flex flex-col gap-2">
            <button
              onClick={() => {
                setCustomerPage('list-property');
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#C6A15B] text-[#102A43] text-sm font-extrabold shadow-xs"
            >
              <Plus className="w-4 h-4" />
              <span>List Your Property in Pondicherry</span>
            </button>
            <button
              onClick={() => {
                onOpenScheduleModal();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#102A43] text-white text-sm font-semibold shadow-xs hover:bg-[#0B1D30]"
            >
              <Calendar className="w-4 h-4 text-[#C6A15B]" />
              <span>Schedule a Property Visit</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
