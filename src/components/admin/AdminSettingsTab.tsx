import React, { useState } from 'react';
import { useRealEstate } from '../../context/RealEstateContext';
import { ShieldCheck, RotateCcw } from 'lucide-react';

export const AdminSettingsTab: React.FC = () => {
  const { resetDemoData, showToast } = useRealEstate();
  const [agencyName, setAgencyName] = useState('Pondicherry Realty Private Limited');
  const [reraNumber, setReraNumber] = useState('PR/RERA/PY/2024/0049');
  const [officeAddress, setOfficeAddress] = useState('No. 14, Rue Suffren, White Town, Puducherry - 605001');
  const [supportPhone, setSupportPhone] = useState('+91 98765 43210');
  const [supportEmail, setSupportEmail] = useState('contact@pondicherryrealty.com');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Settings Saved', 'Platform configuration updated successfully.', 'success');
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8 max-w-4xl mx-auto text-[#20252B]">
      <div className="bg-white rounded-3xl border border-[#E8E6E1] p-6 shadow-xs flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold font-serif text-[#102A43]">
            Platform Settings & Agency Compliance
          </h2>
          <p className="text-xs text-[#52606D] font-normal">
            Configure business identity, RERA certification details, contact lines, and demo state
          </p>
        </div>
      </div>

      {/* Settings Form */}
      <form onSubmit={handleSave} className="bg-white rounded-3xl border border-[#E8E6E1] p-6 sm:p-8 shadow-xs space-y-6">
        <h3 className="text-base font-bold font-serif text-[#102A43] border-b border-[#E8E6E1] pb-3">
          Agency Identity & Legal Registry
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="block font-semibold text-[#102A43] mb-1">
              Registered Agency Name
            </label>
            <input
              type="text"
              value={agencyName}
              onChange={(e) => setAgencyName(e.target.value)}
              className="w-full bg-[#F7F5F0] border border-[#E8E6E1] rounded-xl px-3 py-2.5 text-[#20252B] focus:outline-hidden focus:border-[#C6A15B]"
            />
          </div>

          <div>
            <label className="block font-semibold text-[#102A43] mb-1">
              Puducherry RERA License Number
            </label>
            <input
              type="text"
              value={reraNumber}
              onChange={(e) => setReraNumber(e.target.value)}
              className="w-full bg-[#F7F5F0] border border-[#E8E6E1] rounded-xl px-3 py-2.5 text-[#20252B] focus:outline-hidden focus:border-[#C6A15B]"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#102A43] mb-1">
            Registered Office Address
          </label>
          <input
            type="text"
            value={officeAddress}
            onChange={(e) => setOfficeAddress(e.target.value)}
            className="w-full text-xs bg-[#F7F5F0] border border-[#E8E6E1] rounded-xl px-3 py-2.5 text-[#20252B] focus:outline-hidden focus:border-[#C6A15B]"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="block font-semibold text-[#102A43] mb-1">
              Official WhatsApp & Calling Line
            </label>
            <input
              type="text"
              value={supportPhone}
              onChange={(e) => setSupportPhone(e.target.value)}
              className="w-full bg-[#F7F5F0] border border-[#E8E6E1] rounded-xl px-3 py-2.5 text-[#20252B] focus:outline-hidden focus:border-[#C6A15B]"
            />
          </div>

          <div>
            <label className="block font-semibold text-[#102A43] mb-1">
              Customer Support Email
            </label>
            <input
              type="email"
              value={supportEmail}
              onChange={(e) => setSupportEmail(e.target.value)}
              className="w-full bg-[#F7F5F0] border border-[#E8E6E1] rounded-xl px-3 py-2.5 text-[#20252B] focus:outline-hidden focus:border-[#C6A15B]"
            />
          </div>
        </div>

        <div className="pt-4 border-t border-[#E8E6E1] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-[#102A43] font-medium">
            <ShieldCheck className="w-4 h-4 text-[#C6A15B]" />
            <span>RERA Compliance Active</span>
          </div>
          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-[#102A43] hover:bg-[#0B1D30] text-white text-xs font-bold transition-colors shadow-xs cursor-pointer"
          >
            Save Agency Settings
          </button>
        </div>
      </form>

      {/* Demo Controls Card */}
      <div className="bg-white rounded-3xl border border-[#E8E6E1] p-6 sm:p-8 shadow-xs space-y-4">
        <h3 className="text-base font-bold font-serif text-[#102A43]">
          Demo Presentation Controls
        </h3>
        <p className="text-xs text-[#52606D] leading-relaxed font-normal">
          Need to present a clean slate to clients? You can restore the standard set of 8 Pondicherry properties, sample leads, and site visit schedules with a single click.
        </p>

        <div className="pt-2">
          <button
            type="button"
            onClick={resetDemoData}
            className="px-5 py-2.5 rounded-xl bg-[#F7F5F0] hover:bg-[#E8E6E1] text-[#102A43] text-xs font-bold transition-colors flex items-center gap-2 border border-[#E8E6E1] cursor-pointer"
          >
            <RotateCcw className="w-4 h-4 text-[#C6A15B]" />
            <span>Reset Demo to Default Data</span>
          </button>
        </div>
      </div>
    </div>
  );
};
