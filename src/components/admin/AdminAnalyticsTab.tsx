import React from 'react';
import { useRealEstate } from '../../context/RealEstateContext';
import {
  TrendingUp,
  MapPin,
  ArrowUpRight,
} from 'lucide-react';

export const AdminAnalyticsTab: React.FC = () => {
  const { inquiries, siteVisits } = useRealEstate();

  const localityDistribution = [
    { name: 'White Town (French Quarter)', share: '32%', avgPrice: '₹ 4.80 Cr', trend: '+14% YoY' },
    { name: 'East Coast Road (ECR Beachside)', share: '28%', avgPrice: '₹ 3.50 Cr', trend: '+18% YoY' },
    { name: 'Auroville & Kottakuppam', share: '18%', avgPrice: '₹ 2.40 Cr', trend: '+11% YoY' },
    { name: 'Oulgaret & Saram', share: '14%', avgPrice: '₹ 1.25 Cr', trend: '+8% YoY' },
    { name: 'Anna Nagar Central', share: '8%', avgPrice: '₹ 1.95 Cr', trend: '+9% YoY' },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8 max-w-7xl mx-auto text-[#20252B]">
      <div className="bg-white rounded-3xl border border-[#E8E6E1] p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold font-serif text-[#102A43]">
            Market Trends & Analytics
          </h2>
          <p className="text-xs text-[#52606D] font-normal">
            Pondicherry real estate appreciation indices, lead conversion velocity, and neighborhood demand
          </p>
        </div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#F7F5F0] text-[#102A43] text-xs font-bold border border-[#E8E6E1] self-start sm:self-auto">
          <TrendingUp className="w-4 h-4 text-[#C6A15B]" />
          <span>Coastal Index +14.2% YoY</span>
        </div>
      </div>

      {/* Analytics Highlights Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-3xl border border-[#E8E6E1] p-6 shadow-xs space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#52606D]">
            Lead-to-Visit Ratio
          </span>
          <div className="text-3xl font-bold font-serif text-[#102A43]">
            {Math.round((siteVisits.length / (inquiries.length || 1)) * 100)}%
          </div>
          <p className="text-xs text-[#C6A15B] font-semibold flex items-center gap-1">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>High intent coastal buyer traffic</span>
          </p>
        </div>

        <div className="bg-white rounded-3xl border border-[#E8E6E1] p-6 shadow-xs space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#52606D]">
            Average Days on Market
          </span>
          <div className="text-3xl font-bold font-serif text-[#102A43]">
            34 Days
          </div>
          <p className="text-xs text-[#52606D] font-normal">
            Heritage White Town villas average &lt; 21 days
          </p>
        </div>

        <div className="bg-white rounded-3xl border border-[#E8E6E1] p-6 shadow-xs space-y-3 sm:col-span-2 lg:col-span-1">
          <span className="text-xs font-bold uppercase tracking-wider text-[#52606D]">
            NRI Inquiry Share
          </span>
          <div className="text-3xl font-bold font-serif text-[#102A43]">
            42%
          </div>
          <p className="text-xs text-[#52606D] font-normal">
            Primary origins: Singapore, UAE, France, USA
          </p>
        </div>
      </div>

      {/* Neighborhood Heatmap & Price Appreciation */}
      <div className="bg-white rounded-3xl border border-[#E8E6E1] p-6 shadow-xs space-y-6">
        <h3 className="text-lg font-bold font-serif text-[#102A43]">
          Locality Demand & Valuation Index
        </h3>

        <div className="space-y-4">
          {localityDistribution.map((item) => (
            <div
              key={item.name}
              className="p-4 rounded-2xl bg-[#F7F5F0] border border-[#E8E6E1] flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#C6A15B]" />
                  <span className="font-bold text-[#102A43] text-sm font-serif">
                    {item.name}
                  </span>
                </div>
                <div className="text-xs text-[#52606D] font-normal">
                  Portfolio share: {item.share} of total market interest
                </div>
              </div>

              <div className="flex items-center gap-6 text-xs justify-between sm:justify-end">
                <div>
                  <span className="text-[#52606D] block text-[11px]">Benchmark Avg Price</span>
                  <span className="font-bold text-[#102A43] text-sm font-serif">
                    {item.avgPrice}
                  </span>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-white text-[#102A43] border border-[#E8E6E1]">
                  {item.trend}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
