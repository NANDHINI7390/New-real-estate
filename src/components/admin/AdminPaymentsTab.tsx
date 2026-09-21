import React, { useState } from 'react';
import { useRealEstate } from '../../context/RealEstateContext';
import {
  CreditCard,
  DollarSign,
  TrendingUp,
  Download,
  Search,
  CheckCircle2,
  Calendar,
  User,
  ArrowUpRight,
  ShieldCheck,
  Receipt,
} from 'lucide-react';
import { formatINR } from '../../data/mockData';

export const AdminPaymentsTab: React.FC = () => {
  const { purchases } = useRealEstate();
  const [searchQuery, setSearchQuery] = useState('');

  const totalRevenue = purchases.reduce((acc, p) => acc + p.amount, 0);
  const activeSubs = purchases.filter((p) => p.status === 'ACTIVE').length;
  const avgOrderValue = purchases.length > 0 ? Math.round(totalRevenue / purchases.length) : 0;

  const filteredPurchases = purchases.filter((p) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      p.userName.toLowerCase().includes(q) ||
      p.userEmail.toLowerCase().includes(q) ||
      p.packageName.toLowerCase().includes(q) ||
      p.transactionRef.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 border border-[#E8E6E1] shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                <CreditCard className="w-3.5 h-3.5 text-emerald-600" />
                Financial Ledger
              </span>
              <span className="text-xs text-stone-500">Marketplace Revenue</span>
            </div>
            <h1 className="text-2xl font-bold text-[#102A43] font-serif mt-2">
              Package Purchases & Payments
            </h1>
            <p className="text-sm text-stone-600 mt-1">
              Live audit trail of all listing packages purchased by Property Owners and Real Estate Agents.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => alert('Exporting financial report as CSV...')}
              className="px-4 py-2 rounded-xl bg-[#F7F5F0] hover:bg-stone-200 text-[#102A43] text-xs font-bold flex items-center gap-1.5 border border-[#E8E6E1] transition-all"
            >
              <Download className="w-3.5 h-3.5" />
              Export CSV
            </button>
          </div>
        </div>

        {/* Revenue KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 pt-6 border-t border-[#E8E6E1]">
          <div className="p-4 rounded-xl bg-[#F7F5F0] border border-[#E8E6E1]">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">
                Total Revenue
              </span>
              <span className="p-1.5 rounded-lg bg-emerald-100 text-emerald-700">
                <TrendingUp className="w-4 h-4" />
              </span>
            </div>
            <div className="text-2xl font-extrabold text-[#102A43] font-serif mt-1">
              ₹{totalRevenue.toLocaleString('en-IN')}
            </div>
            <div className="text-[11px] text-stone-500 mt-1">All-time package subscriptions</div>
          </div>

          <div className="p-4 rounded-xl bg-[#F7F5F0] border border-[#E8E6E1]">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">
                Active Plans
              </span>
              <span className="p-1.5 rounded-lg bg-blue-100 text-blue-700">
                <ShieldCheck className="w-4 h-4" />
              </span>
            </div>
            <div className="text-2xl font-extrabold text-[#102A43] font-serif mt-1">
              {activeSubs}
            </div>
            <div className="text-[11px] text-stone-500 mt-1">Currently running listing slots</div>
          </div>

          <div className="p-4 rounded-xl bg-[#F7F5F0] border border-[#E8E6E1]">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">
                Average Transaction
              </span>
              <span className="p-1.5 rounded-lg bg-amber-100 text-amber-700">
                <Receipt className="w-4 h-4" />
              </span>
            </div>
            <div className="text-2xl font-extrabold text-[#102A43] font-serif mt-1">
              ₹{avgOrderValue.toLocaleString('en-IN')}
            </div>
            <div className="text-[11px] text-stone-500 mt-1">Per package booking</div>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by customer name, email, package or transaction ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 text-xs bg-white border border-[#E8E6E1] rounded-xl shadow-2xs focus:ring-2 focus:ring-[#102A43]"
          />
        </div>
        <div className="text-xs text-stone-500">
          Showing {filteredPurchases.length} transactions
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white rounded-2xl border border-[#E8E6E1] overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F7F5F0] text-stone-600 border-b border-[#E8E6E1] font-semibold">
              <tr>
                <th className="py-3 px-4">Transaction Ref</th>
                <th className="py-3 px-4">Customer / Role</th>
                <th className="py-3 px-4">Package</th>
                <th className="py-3 px-4">Amount</th>
                <th className="py-3 px-4">Payment Method</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Invoice</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8E6E1]">
              {filteredPurchases.map((pur) => (
                <tr key={pur.id} className="hover:bg-stone-50 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-medium text-[#102A43]">
                    {pur.transactionRef}
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-[#102A43]">{pur.userName}</div>
                    <div className="text-[11px] text-stone-500 flex items-center gap-1">
                      <span>{pur.userEmail}</span>
                      <span className="capitalize px-1.5 py-0.2 rounded bg-stone-100 text-[10px] text-stone-600">
                        {pur.userRole}
                      </span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="font-medium text-stone-800">{pur.packageName}</span>
                    <div className="text-[11px] text-stone-400">{pur.durationDays} Days validity</div>
                  </td>
                  <td className="py-3.5 px-4 font-bold text-[#102A43]">
                    ₹{pur.amount.toLocaleString('en-IN')}
                  </td>
                  <td className="py-3.5 px-4 text-stone-600">
                    {pur.paymentMethod}
                  </td>
                  <td className="py-3.5 px-4 text-stone-500">
                    {pur.createdAt}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-100 text-emerald-800">
                      <CheckCircle2 className="w-3 h-3" />
                      {pur.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => alert(`Receipt for ${pur.transactionRef}:\nCustomer: ${pur.userName}\nPackage: ${pur.packageName}\nAmount: ₹${pur.amount}\nMethod: ${pur.paymentMethod}`)}
                      className="p-1.5 text-stone-400 hover:text-[#102A43] hover:bg-stone-100 rounded-lg transition-colors"
                      title="View Receipt"
                    >
                      <Receipt className="w-4 h-4" />
                    </button>
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
