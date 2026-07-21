import React from 'react'
import { Search, Filter, RefreshCw, IndianRupee, Layers } from 'lucide-react'

export default function SearchToolbar({
  searchParams,
  onParamChange,
  onReset,
  categories = ['Sedan', 'SUV', 'Truck', 'Coupe', 'Convertible', 'Hatchback']
}) {
  return (
    <div className="vault-card rounded-2xl p-6 mb-8 space-y-4">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-[#3B82F6]/10 border border-[#3B82F6]/30 flex items-center justify-center text-[#3B82F6]">
            <Filter className="w-4 h-4" />
          </div>
          <div>
            <h2 className="font-heading text-lg font-bold text-white">Filter Inventory</h2>
            <p className="text-xs text-[#94A3B8]">Search by manufacturer, model, category, or price range</p>
          </div>
        </div>

        <button
          onClick={onReset}
          className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#141A22] border border-white/[0.08] text-[#94A3B8] hover:text-white text-xs font-semibold transition-all self-end md:self-auto"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Reset Filters</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-1">
        <div>
          <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#94A3B8] mb-1.5">Search Make / Model</label>
          <div className="relative">
            <Search className="w-4 h-4 text-[#94A3B8] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchParams.make || ''}
              onChange={(e) => onParamChange('make', e.target.value)}
              placeholder="e.g. Porsche, M4, GT3..."
              className="w-full bg-[#141A22] border border-white/[0.08] rounded-xl pl-10 pr-3.5 py-2.5 text-xs text-[#F8FAFC] placeholder-[#94A3B8] focus:outline-none focus:border-[#3B82F6] transition-all"
            />
          </div>
        </div>

        <div>
          <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#94A3B8] mb-1.5">Category</label>
          <div className="relative">
            <Layers className="w-4 h-4 text-[#94A3B8] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <select
              value={searchParams.category || ''}
              onChange={(e) => onParamChange('category', e.target.value)}
              className="w-full bg-[#141A22] border border-white/[0.08] rounded-xl pl-10 pr-3.5 py-2.5 text-xs text-[#F8FAFC] focus:outline-none focus:border-[#3B82F6] transition-all appearance-none"
            >
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#94A3B8] mb-1.5">Min Price (₹ INR)</label>
          <div className="relative">
            <IndianRupee className="w-4 h-4 text-[#94A3B8] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="number"
              value={searchParams.min_price || ''}
              onChange={(e) => onParamChange('min_price', e.target.value)}
              placeholder="0"
              className="w-full bg-[#141A22] border border-white/[0.08] rounded-xl pl-10 pr-3.5 py-2.5 text-xs text-[#F8FAFC] placeholder-[#94A3B8] focus:outline-none focus:border-[#3B82F6] transition-all"
            />
          </div>
        </div>

        <div>
          <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#94A3B8] mb-1.5">Max Price (₹ INR)</label>
          <div className="relative">
            <IndianRupee className="w-4 h-4 text-[#94A3B8] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="number"
              value={searchParams.max_price || ''}
              onChange={(e) => onParamChange('max_price', e.target.value)}
              placeholder="50000000"
              className="w-full bg-[#141A22] border border-white/[0.08] rounded-xl pl-10 pr-3.5 py-2.5 text-xs text-[#F8FAFC] placeholder-[#94A3B8] focus:outline-none focus:border-[#3B82F6] transition-all"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
