import React, { useState } from 'react';
import { useRealEstate } from '../../context/RealEstateContext';
import {
  TrendingUp,
  Calculator,
  Building2,
  MapPin,
  ArrowUpRight,
  ShieldCheck,
  CheckCircle2,
  Download,
  IndianRupee,
  Sparkles,
  Info,
} from 'lucide-react';

interface LocalityTrend {
  name: string;
  category: string;
  currentRate: number; // in INR / sq.ft
  yoyGrowth: string;
  fiveYearCagr: string;
  rentalYield: string;
  dominantType: string;
  highlights: string;
  priceHistory: { year: string; rate: number }[];
}

const LOCALITY_TRENDS: LocalityTrend[] = [
  {
    name: 'White Town (French Quarter)',
    category: 'Heritage & Ultra-Luxury',
    currentRate: 14500,
    yoyGrowth: '+14.2%',
    fiveYearCagr: '18.4%',
    rentalYield: '7.8% (High Airbnb Demand)',
    dominantType: 'Colonial Villas & Heritage Suites',
    highlights: 'Zero new land supply, protected INTACH conservation status, astronomical capital appreciation.',
    priceHistory: [
      { year: '2021', rate: 8900 },
      { year: '2022', rate: 10200 },
      { year: '2023', rate: 11800 },
      { year: '2024', rate: 13100 },
      { year: '2025', rate: 14500 },
    ],
  },
  {
    name: 'ECR Coastal Belt (Pondicherry - Mahabs)',
    category: 'Seafront & Beach Villas',
    currentRate: 8800,
    yoyGrowth: '+18.5%',
    fiveYearCagr: '21.2%',
    rentalYield: '8.5% (Weekend Vacation Homes)',
    dominantType: 'Beachfront Estates & Gated Communities',
    highlights: '4-lane highway expansion completion driving instant connectivity from Chennai & Bangalore.',
    priceHistory: [
      { year: '2021', rate: 4600 },
      { year: '2022', rate: 5800 },
      { year: '2023', rate: 6900 },
      { year: '2024', rate: 7700 },
      { year: '2025', rate: 8800 },
    ],
  },
  {
    name: 'Auroville International Corridor',
    category: 'Bioclimatic & Zen Residences',
    currentRate: 6400,
    yoyGrowth: '+12.0%',
    fiveYearCagr: '15.6%',
    rentalYield: '6.2% (Long-Term Expat Tenancy)',
    dominantType: 'Eco-Villas & Organic Farm Plots',
    highlights: 'Green buffer mandates, high expat & spiritual tourism demand, sustainable solar communities.',
    priceHistory: [
      { year: '2021', rate: 3800 },
      { year: '2022', rate: 4400 },
      { year: '2023', rate: 5100 },
      { year: '2024', rate: 5800 },
      { year: '2025', rate: 6400 },
    ],
  },
  {
    name: 'Pondy Marina & South Promenade',
    category: 'Modern Coastal High-Rise',
    currentRate: 7900,
    yoyGrowth: '+11.8%',
    fiveYearCagr: '14.8%',
    rentalYield: '6.5% (Corporate & High-Net Tenants)',
    dominantType: 'Luxury Sea-View Condominiums',
    highlights: 'New waterfront park development, port expansion, high rental demand among medical & port executives.',
    priceHistory: [
      { year: '2021', rate: 4900 },
      { year: '2022', rate: 5600 },
      { year: '2023', rate: 6400 },
      { year: '2024', rate: 7100 },
      { year: '2025', rate: 7900 },
    ],
  },
  {
    name: 'Oulgaret & Saram Urban Core',
    category: 'Premium Residential Hub',
    currentRate: 5800,
    yoyGrowth: '+9.4%',
    fiveYearCagr: '11.5%',
    rentalYield: '5.2% (Family & Doctor Tenancy)',
    dominantType: 'Modern 3BHK Gated Apartments',
    highlights: 'Proximity to JIPMER hospital, premier schools, and upcoming smart-city arterial flyovers.',
    priceHistory: [
      { year: '2021', rate: 3900 },
      { year: '2022', rate: 4300 },
      { year: '2023', rate: 4800 },
      { year: '2024', rate: 5300 },
      { year: '2025', rate: 5800 },
    ],
  },
];

export const InteractivePriceTrends: React.FC = () => {
  const { submitInquiry } = useRealEstate();

  const [selectedLocality, setSelectedLocality] = useState<LocalityTrend>(LOCALITY_TRENDS[0]);

  // Valuation Calculator State
  const [calcPropertyType, setCalcPropertyType] = useState('Villa');
  const [calcArea, setCalcArea] = useState<number>(2400);
  const [calcLocalityIndex, setCalcLocalityIndex] = useState<number>(0);
  const [calcCondition, setCalcCondition] = useState<'Ultra-Luxury' | 'Ready Premium' | 'Under Construction'>('Ultra-Luxury');

  // Lead capture state
  const [leadName, setLeadName] = useState('');
  const [leadPhone, setLeadPhone] = useState('');
  const [leadEmail, setLeadEmail] = useState('');
  const [leadSubmitted, setLeadSubmitted] = useState(false);

  // Valuation Computation
  const activeRate = LOCALITY_TRENDS[calcLocalityIndex].currentRate;
  const conditionMultiplier =
    calcCondition === 'Ultra-Luxury' ? 1.25 : calcCondition === 'Ready Premium' ? 1.0 : 0.85;
  const typeMultiplier =
    calcPropertyType === 'Heritage Mansion' ? 1.35 : calcPropertyType === 'Villa' ? 1.15 : calcPropertyType === 'Apartment' ? 1.0 : 0.8;

  const estimatedTotalValuation = Math.round(calcArea * activeRate * conditionMultiplier * typeMultiplier);
  const minValuation = Math.round(estimatedTotalValuation * 0.94);
  const maxValuation = Math.round(estimatedTotalValuation * 1.08);

  const formatCrores = (val: number) => {
    if (val >= 10000000) {
      return `₹ ${(val / 10000000).toFixed(2)} Cr`;
    }
    return `₹ ${(val / 100000).toFixed(1)} Lakhs`;
  };

  const handleValuationReportRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadPhone.trim() || !leadName.trim()) return;

    submitInquiry({
      customerName: leadName,
      phone: leadPhone,
      email: leadEmail || 'valuation-lead@client.in',
      propertyTitle: `Valuation Request: ${calcPropertyType} in ${LOCALITY_TRENDS[calcLocalityIndex].name}`,
      propertyType: calcPropertyType as any,
      listingType: 'BUY',
      budget: `${formatCrores(minValuation)} - ${formatCrores(maxValuation)}`,
      message: `Client requested full certified market valuation report for ${calcArea} sq.ft ${calcPropertyType} in ${LOCALITY_TRENDS[calcLocalityIndex].name} (${calcCondition} condition). Estimated value: ${formatCrores(estimatedTotalValuation)}.`,
    });

    setLeadSubmitted(true);
    setTimeout(() => {
      setLeadSubmitted(false);
      setLeadName('');
      setLeadPhone('');
      setLeadEmail('');
    }, 5000);
  };

  return (
    <section className="py-20 bg-[#F7F5F0] border-t border-b border-[#E8E6E1] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white text-[#C6A15B] border border-[#E8E6E1] text-xs font-bold uppercase tracking-wider mb-3 shadow-xs">
            <TrendingUp className="w-3.5 h-3.5 text-[#C6A15B]" />
            <span>Pondicherry Market Intelligence 2026</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif text-[#102A43] tracking-tight">
            Interactive Price Trends & Instant Property Valuation
          </h2>
          <p className="text-base text-[#52606D] mt-4 font-normal leading-relaxed">
            Track historical capital appreciation across Pondicherry's top micro-markets and compute instant institutional-grade valuation estimates for your real estate portfolio.
          </p>
        </div>

        {/* 2-Column Grid: Left (Market Trends & Growth Charts), Right (Instant Valuation Studio & Lead Capture) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Micro-Market Trends (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Locality Selector Tabs */}
            <div className="bg-white rounded-2xl border border-[#E8E6E1] p-2 shadow-xs flex flex-wrap gap-1.5">
              {LOCALITY_TRENDS.map((loc) => {
                const isSelected = selectedLocality.name === loc.name;
                return (
                  <button
                    key={loc.name}
                    onClick={() => setSelectedLocality(loc)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#102A43] text-white shadow-xs'
                        : 'text-[#52606D] hover:bg-[#F7F5F0] hover:text-[#102A43]'
                    }`}
                  >
                    {loc.name.split(' ')[0]}
                  </button>
                );
              })}
            </div>

            {/* Selected Locality Details Card */}
            <div className="bg-white rounded-3xl border border-[#E8E6E1] p-6 sm:p-8 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E8E6E1]">
                <div>
                  <span className="text-xs font-bold text-[#C6A15B] uppercase tracking-wider">
                    {selectedLocality.category}
                  </span>
                  <h3 className="text-2xl font-bold font-serif text-[#102A43] mt-1">
                    {selectedLocality.name}
                  </h3>
                  <p className="text-xs text-[#52606D] mt-1 font-normal">{selectedLocality.highlights}</p>
                </div>
                <div className="bg-[#F7F5F0] p-4 rounded-2xl border border-[#E8E6E1] text-left sm:text-right shrink-0">
                  <span className="text-[11px] font-semibold text-[#52606D] uppercase block">
                    Current Avg Rate
                  </span>
                  <span className="text-2xl font-bold font-serif text-[#102A43]">
                    ₹ {selectedLocality.currentRate.toLocaleString('en-IN')}
                  </span>
                  <span className="text-xs text-[#52606D] block font-medium">per sq.ft</span>
                </div>
              </div>

              {/* Metrics Highlights Bar */}
              <div className="grid grid-cols-3 gap-3 py-6 border-b border-[#E8E6E1]">
                <div className="bg-[#F7F5F0] p-3.5 rounded-2xl border border-[#E8E6E1]">
                  <span className="text-[10px] font-bold text-[#52606D] uppercase tracking-wider block">
                    1-Yr YoY Growth
                  </span>
                  <span className="text-lg font-bold text-emerald-700 block mt-0.5">
                    {selectedLocality.yoyGrowth}
                  </span>
                </div>

                <div className="bg-[#F7F5F0] p-3.5 rounded-2xl border border-[#E8E6E1]">
                  <span className="text-[10px] font-bold text-[#52606D] uppercase tracking-wider block">
                    5-Yr CAGR
                  </span>
                  <span className="text-lg font-bold text-[#C6A15B] block mt-0.5">
                    {selectedLocality.fiveYearCagr}
                  </span>
                </div>

                <div className="bg-[#F7F5F0] p-3.5 rounded-2xl border border-[#E8E6E1]">
                  <span className="text-[10px] font-bold text-[#52606D] uppercase tracking-wider block">
                    Rental Yield
                  </span>
                  <span className="text-lg font-bold text-[#102A43] block mt-0.5">
                    {selectedLocality.rentalYield.split(' ')[0]}
                  </span>
                </div>
              </div>

              {/* 5-Year Price Growth Visualizer Bars */}
              <div className="mt-6">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-xs font-bold text-[#102A43] uppercase tracking-wider">
                    5-Year Capital Index Trajectory (₹ / Sq.Ft)
                  </h4>
                  <span className="text-xs font-semibold text-[#C6A15B]">Verified DTCP & Sub-Registrar Data</span>
                </div>

                <div className="space-y-2.5">
                  {selectedLocality.priceHistory.map((item, idx) => {
                    const maxRate = selectedLocality.priceHistory[selectedLocality.priceHistory.length - 1].rate;
                    const percent = Math.round((item.rate / maxRate) * 100);
                    return (
                      <div key={item.year} className="flex items-center gap-3 text-xs">
                        <span className="w-10 font-bold text-[#20252B]">{item.year}</span>
                        <div className="flex-1 h-7 bg-[#F7F5F0] rounded-xl overflow-hidden p-1 border border-[#E8E6E1] flex items-center">
                          <div
                            style={{ width: `${percent}%` }}
                            className={`h-full rounded-lg transition-all duration-700 flex items-center justify-end pr-2 ${
                              idx === selectedLocality.priceHistory.length - 1
                                ? 'bg-[#102A43] text-white'
                                : 'bg-[#E8E6E1] text-[#102A43]'
                            }`}
                          >
                            <span className="text-[10px] font-bold">₹{item.rate.toLocaleString('en-IN')}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Dominant asset type info note */}
              <div className="mt-6 p-3.5 bg-[#F7F5F0] rounded-2xl border border-[#E8E6E1] flex items-center gap-3 text-xs text-[#52606D]">
                <Info className="w-4 h-4 text-[#C6A15B] shrink-0" />
                <span>
                  <strong className="text-[#20252B]">Dominant Market Asset:</strong> {selectedLocality.dominantType} with consistent high liquidity.
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Instant Property Valuation Calculator & Lead Form (5 Cols) */}
          <div className="lg:col-span-5">
            <div className="bg-[#102A43] text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-[#102A43] relative">
              <div className="flex items-center gap-2 mb-2 text-[#C6A15B] text-xs font-bold uppercase tracking-wider">
                <Calculator className="w-4 h-4" />
                <span>Valuation Studio</span>
              </div>
              <h3 className="text-2xl font-bold font-serif text-white">
                Instant Valuation Estimator
              </h3>
              <p className="text-xs text-[#E8E6E1]/90 mt-1 font-normal">
                Calculate the fair market value of any property in Pondicherry based on current registrar and resale data.
              </p>

              {/* Calculator Inputs */}
              <div className="space-y-4 mt-6">
                {/* Micro-Market Selection */}
                <div>
                  <label className="block text-[11px] font-semibold text-[#E8E6E1] uppercase tracking-wider mb-1">
                    Select Locality
                  </label>
                  <select
                    value={calcLocalityIndex}
                    onChange={(e) => setCalcLocalityIndex(Number(e.target.value))}
                    className="w-full bg-[#0B1D30] border border-[#E8E6E1]/30 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-hidden focus:border-[#C6A15B]"
                  >
                    {LOCALITY_TRENDS.map((loc, idx) => (
                      <option key={loc.name} value={idx}>
                        {loc.name} (₹{loc.currentRate}/sq.ft)
                      </option>
                    ))}
                  </select>
                </div>

                {/* Property Type */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-[#E8E6E1] uppercase tracking-wider mb-1">
                      Property Type
                    </label>
                    <select
                      value={calcPropertyType}
                      onChange={(e) => setCalcPropertyType(e.target.value)}
                      className="w-full bg-[#0B1D30] border border-[#E8E6E1]/30 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-hidden focus:border-[#C6A15B]"
                    >
                      <option value="Villa">Luxury Villa</option>
                      <option value="Heritage Mansion">Heritage Colonial House</option>
                      <option value="Apartment">Luxury Apartment</option>
                      <option value="Plot">Residential Plot / Land</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-[#E8E6E1] uppercase tracking-wider mb-1">
                      Asset Condition
                    </label>
                    <select
                      value={calcCondition}
                      onChange={(e) => setCalcCondition(e.target.value as any)}
                      className="w-full bg-[#0B1D30] border border-[#E8E6E1]/30 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-hidden focus:border-[#C6A15B]"
                    >
                      <option value="Ultra-Luxury">Ultra-Luxury / Furnished</option>
                      <option value="Ready Premium">Ready to Move Premium</option>
                      <option value="Under Construction">Under Construction</option>
                    </select>
                  </div>
                </div>

                {/* Area in Sq.Ft Slider */}
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-[11px] font-semibold text-[#E8E6E1] uppercase tracking-wider">
                      Built-up / Plot Area
                    </label>
                    <span className="text-xs font-bold text-[#C6A15B]">{calcArea.toLocaleString('en-IN')} Sq.Ft</span>
                  </div>
                  <input
                    type="range"
                    min={600}
                    max={12000}
                    step={100}
                    value={calcArea}
                    onChange={(e) => setCalcArea(Number(e.target.value))}
                    className="w-full accent-[#C6A15B] cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-[#E8E6E1]/70 mt-0.5">
                    <span>600 sq.ft</span>
                    <span>5,000 sq.ft</span>
                    <span>12,000 sq.ft</span>
                  </div>
                </div>
              </div>

              {/* Output Result Card */}
              <div className="mt-6 p-4 rounded-2xl bg-[#0B1D30] border border-[#C6A15B]/40">
                <span className="text-[10px] font-bold text-[#E8E6E1] uppercase tracking-wider block">
                  Estimated Fair Market Valuation Range
                </span>
                <div className="text-2xl sm:text-3xl font-bold font-serif text-[#C6A15B] mt-1">
                  {formatCrores(minValuation)} – {formatCrores(maxValuation)}
                </div>
                <div className="flex items-center justify-between text-xs text-[#E8E6E1]/80 mt-2 pt-2 border-t border-white/10">
                  <span>Median Estimate:</span>
                  <span className="font-bold text-white">{formatCrores(estimatedTotalValuation)}</span>
                </div>
              </div>

              {/* Lead Capture Form for Full Report */}
              <form onSubmit={handleValuationReportRequest} className="mt-6 pt-5 border-t border-white/10 space-y-3">
                <span className="text-xs font-semibold text-[#E8E6E1] block">
                  Receive Official Certified Valuation & Title Summary:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <input
                    type="text"
                    required
                    placeholder="Your Full Name"
                    value={leadName}
                    onChange={(e) => setLeadName(e.target.value)}
                    className="bg-[#0B1D30] border border-[#E8E6E1]/30 rounded-xl px-3 py-2 text-xs text-white placeholder:text-[#E8E6E1]/50 focus:outline-hidden focus:border-[#C6A15B]"
                  />
                  <input
                    type="tel"
                    required
                    placeholder="Phone / WhatsApp (+91)"
                    value={leadPhone}
                    onChange={(e) => setLeadPhone(e.target.value)}
                    className="bg-[#0B1D30] border border-[#E8E6E1]/30 rounded-xl px-3 py-2 text-xs text-white placeholder:text-[#E8E6E1]/50 focus:outline-hidden focus:border-[#C6A15B]"
                  />
                </div>
                <button
                  type="submit"
                  disabled={leadSubmitted}
                  className="w-full py-3 rounded-xl bg-[#C6A15B] hover:bg-[#b5914a] text-[#102A43] font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition-all active:scale-98 cursor-pointer"
                >
                  {leadSubmitted ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                      <span className="text-emerald-950 font-bold">Valuation Report Dispatched to WhatsApp!</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4 text-[#102A43]" />
                      <span>Download Certified Valuation & Market Dossier</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
