import React, { useState, useRef, useEffect } from 'react';
import { useRealEstate } from '../../context/RealEstateContext';
import { UserRole } from '../../types';
import { DEMO_USERS } from '../../data/mockData';
import {
  Shield,
  Home,
  Briefcase,
  UserCheck,
  ChevronDown,
  Sparkles,
  Check,
  User,
} from 'lucide-react';

export const RoleSwitcher: React.FC = () => {
  const { currentUser, setCurrentUser, viewMode, setViewMode } = useRealEstate();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectUser = (demoUser: (typeof DEMO_USERS)[0]) => {
    setCurrentUser(demoUser);
    setIsOpen(false);

    // Automatically navigate to corresponding portal view
    if (demoUser.role === 'buyer') {
      setViewMode('customer');
    } else if (demoUser.role === 'seller') {
      setViewMode('seller');
    } else if (demoUser.role === 'agent') {
      setViewMode('agent');
    } else if (demoUser.role === 'admin') {
      setViewMode('admin');
    }
  };

  const getRoleIcon = (role: UserRole) => {
    switch (role) {
      case 'admin':
        return <Shield className="w-3.5 h-3.5 text-purple-400" />;
      case 'seller':
        return <Home className="w-3.5 h-3.5 text-amber-400" />;
      case 'agent':
        return <Briefcase className="w-3.5 h-3.5 text-blue-400" />;
      default:
        return <UserCheck className="w-3.5 h-3.5 text-emerald-400" />;
    }
  };

  const getRoleLabel = (role: UserRole) => {
    switch (role) {
      case 'admin':
        return 'Admin';
      case 'seller':
        return 'Seller / Owner';
      case 'agent':
        return 'Broker / Agent';
      default:
        return 'Buyer / Customer';
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#102A43] text-white text-xs font-semibold hover:bg-[#1A3B5C] border border-[#244A6F] shadow-2xs transition-all cursor-pointer"
        title="Switch between 4 Marketplace User Roles"
      >
        <div className="w-5 h-5 rounded-full bg-[#0B1D30] flex items-center justify-center">
          {getRoleIcon(currentUser?.role || 'buyer')}
        </div>
        <div className="text-left hidden md:block">
          <div className="text-[10px] text-[#C6A15B] font-bold uppercase tracking-wider leading-none">
            Role: {getRoleLabel(currentUser?.role || 'buyer')}
          </div>
          <div className="text-[11px] text-white truncate max-w-[110px] leading-tight mt-0.5 font-medium">
            {currentUser?.displayName || 'User'}
          </div>
        </div>
        <ChevronDown className={`w-3 h-3 text-stone-300 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-72 rounded-2xl bg-white border border-[#E8E6E1] shadow-2xl z-50 overflow-hidden py-1 animate-in fade-in zoom-in-95 duration-150">
          <div className="px-4 py-2.5 bg-[#F7F5F0] border-b border-[#E8E6E1]">
            <div className="text-[11px] font-bold text-[#102A43] uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#C6A15B]" />
              Switch Marketplace User Role
            </div>
            <p className="text-[11px] text-stone-500 mt-0.5">
              Experience the platform from each stakeholder's view.
            </p>
          </div>

          <div className="p-2 space-y-1">
            {DEMO_USERS.map((user) => {
              const isSelected = currentUser?.uid === user.uid;
              return (
                <button
                  key={user.uid}
                  onClick={() => handleSelectUser(user)}
                  className={`w-full flex items-start gap-3 p-2.5 rounded-xl text-left transition-all ${
                    isSelected
                      ? 'bg-amber-50/80 border border-[#C6A15B]/40 text-[#102A43]'
                      : 'hover:bg-stone-50 text-stone-700'
                  }`}
                >
                  <div className="w-8 h-8 rounded-xl bg-[#102A43] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                    {getRoleIcon(user.role)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#102A43] truncate">
                        {user.displayName}
                      </span>
                      {isSelected && <Check className="w-3.5 h-3.5 text-[#C6A15B]" />}
                    </div>
                    <div className="text-[11px] font-semibold text-[#C6A15B]">
                      {getRoleLabel(user.role)}
                    </div>
                    <div className="text-[10px] text-stone-500 truncate">
                      {user.email}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Quick Portal Switch Links */}
          <div className="p-2 bg-[#F7F5F0] border-t border-[#E8E6E1] grid grid-cols-2 gap-1.5 text-[11px]">
            <button
              onClick={() => {
                setViewMode('seller');
                setIsOpen(false);
              }}
              className="px-2.5 py-1.5 rounded-lg bg-white border border-[#E8E6E1] text-[#102A43] font-semibold text-center hover:bg-amber-50 hover:border-[#C6A15B]"
            >
              Seller Portal
            </button>
            <button
              onClick={() => {
                setViewMode('agent');
                setIsOpen(false);
              }}
              className="px-2.5 py-1.5 rounded-lg bg-white border border-[#E8E6E1] text-[#102A43] font-semibold text-center hover:bg-blue-50 hover:border-blue-400"
            >
              Agent Portal
            </button>
            <button
              onClick={() => {
                setViewMode('admin');
                setIsOpen(false);
              }}
              className="px-2.5 py-1.5 rounded-lg bg-white border border-[#E8E6E1] text-[#102A43] font-semibold text-center hover:bg-purple-50 hover:border-purple-400"
            >
              Admin Center
            </button>
            <button
              onClick={() => {
                setViewMode('customer');
                setIsOpen(false);
              }}
              className="px-2.5 py-1.5 rounded-lg bg-white border border-[#E8E6E1] text-[#102A43] font-semibold text-center hover:bg-stone-100"
            >
              Public Website
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
