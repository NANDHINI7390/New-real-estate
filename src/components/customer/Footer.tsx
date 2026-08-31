import React from 'react';
import { useRealEstate } from '../../context/RealEstateContext';
import { Building2, MapPin, Phone, Mail, Clock, ArrowRight, ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setCustomerPage, setViewMode } = useRealEstate();

  const navigateTo = (page: string) => {
    setCustomerPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#102A43] text-[#E8E6E1] pt-16 pb-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          {/* Col 1: Brand & Bio */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#0B1D30] text-[#E8E6E1] flex items-center justify-center shadow-md border border-[#C6A15B]/30">
                <Building2 className="w-5 h-5 text-[#C6A15B]" />
              </div>
              <div>
                <span className="block text-xl font-bold tracking-tight text-white font-serif leading-none">
                  Pondicherry
                </span>
                <span className="block text-[11px] font-extrabold tracking-[0.25em] text-[#C6A15B] uppercase leading-none mt-1">
                  REALTY
                </span>
              </div>
            </div>

            <p className="text-xs text-[#E8E6E1]/80 leading-relaxed max-w-sm font-normal">
              Pondicherry’s premier luxury real estate advisory. Connecting discerning homeowners, expats, and investors with certified French colonial estates, coastal sea-facing villas, and clear-title DTCP beachfront plots.
            </p>

            <div className="pt-2 flex items-center gap-2 text-xs text-[#C6A15B]">
              <ShieldCheck className="w-4 h-4" />
              <span>RERA Registered & 100% Title Verified Properties</span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white font-serif mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5 text-xs text-[#E8E6E1]/70">
              <li>
                <button
                  onClick={() => navigateTo('buy')}
                  className="hover:text-[#C6A15B] transition-colors cursor-pointer"
                >
                  Buy Properties
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('rent')}
                  className="hover:text-[#C6A15B] transition-colors cursor-pointer"
                >
                  Rent Luxury
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('projects')}
                  className="hover:text-[#C6A15B] transition-colors cursor-pointer"
                >
                  New Developments
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('services')}
                  className="hover:text-[#C6A15B] transition-colors cursor-pointer"
                >
                  Advisory & NRI Care
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('about')}
                  className="hover:text-[#C6A15B] transition-colors cursor-pointer"
                >
                  About Our Heritage
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('contact')}
                  className="hover:text-[#C6A15B] transition-colors cursor-pointer"
                >
                  Contact Concierge
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Prime Localities */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white font-serif mb-4">
              Prime Localities
            </h4>
            <ul className="space-y-2.5 text-xs text-[#E8E6E1]/70">
              <li>
                <button
                  onClick={() => navigateTo('buy')}
                  className="hover:text-[#C6A15B] transition-colors cursor-pointer"
                >
                  White Town (French Quarter)
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('buy')}
                  className="hover:text-[#C6A15B] transition-colors cursor-pointer"
                >
                  East Coast Road (ECR)
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('buy')}
                  className="hover:text-[#C6A15B] transition-colors cursor-pointer"
                >
                  Auroville Residential Corridor
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('buy')}
                  className="hover:text-[#C6A15B] transition-colors cursor-pointer"
                >
                  Heritage Tamil Quarter
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('buy')}
                  className="hover:text-[#C6A15B] transition-colors cursor-pointer"
                >
                  Pondy Marina Promenade
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Office */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white font-serif mb-4">
              Pondicherry Office
            </h4>
            <div className="flex items-start gap-2.5 text-xs text-[#E8E6E1]/80">
              <MapPin className="w-4 h-4 text-[#C6A15B] shrink-0 mt-0.5" />
              <span>No. 42, Rue Romain Rolland, White Town, Puducherry – 605001</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs text-[#E8E6E1]/80">
              <Phone className="w-4 h-4 text-[#C6A15B] shrink-0" />
              <span>+91 98401 23456 / +91 (413) 222-8900</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs text-[#E8E6E1]/80">
              <Mail className="w-4 h-4 text-[#C6A15B] shrink-0" />
              <span>advisory@pondicherryrealty.com</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs text-[#E8E6E1]/80">
              <Clock className="w-4 h-4 text-[#C6A15B] shrink-0" />
              <span>Mon – Sat: 9:00 AM – 7:30 PM IST</span>
            </div>

            <div className="pt-2">
              <button
                onClick={() => setViewMode('admin')}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#C6A15B] hover:text-white transition-colors bg-white/5 px-3 py-1.5 rounded-lg border border-white/10 cursor-pointer"
              >
                <span>Switch to Admin Portal</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom copyright & disclaimer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#E8E6E1]/50">
          <div>
            © {new Date().getFullYear()} Pondicherry Realty. All rights reserved. RERA Puducherry Approved.
          </div>
          <div className="flex items-center gap-6">
            <span className="hover:text-[#E8E6E1] cursor-pointer">Privacy Policy</span>
            <span className="hover:text-[#E8E6E1] cursor-pointer">Terms of Service</span>
            <span className="hover:text-[#E8E6E1] cursor-pointer">RERA Compliance</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
