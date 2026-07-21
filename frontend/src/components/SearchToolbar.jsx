import React from 'react'
import { Search, Filter, RefreshCw, IndianRupee, Layers } from 'lucide-react'

export default function SearchToolbar({
  searchParams,
  onParamChange,
  onReset,
  categories = ['Sedan', 'SUV', 'Truck', 'Coupe', 'Convertible', 'Hatchback']
}) {
  return (
    <div className="glass-panel rounded-3xl p-6 border border-slate-800 shadow-xl mb-8 space-y-4">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400">
            <Filter className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">Filter Inventory</h2>
            <p className="text-xs text-slate-400">Refine by make, model, category, or price range</p>
          </div>
        </div>

        <button
          onClick={onReset}
          className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-white text-xs font-semibold transition-all self-end md:self-auto"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Reset Filters</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
        <div>
          <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-1.5">Search Make / Model</label>
          <div className="relative">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchParams.make || ''}
              onChange={(e) => onParamChange('make', e.target.value)}
              placeholder="e.g. Porsche, M5..."
              className="w-full bg-slate-900/90 border border-slate-800 rounded-xl pl-10 pr-3 py-2.5 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-sky-500 text-xs"
            />
          </div>
        </div>

        <div>
          <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-1.5">Category</label>
          <div className="relative">
            <Layers className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <select
              value={searchParams.category || ''}
              onChange={(e) => onParamChange('category', e.target.value)}
              className="w-full bg-slate-900/90 border border-slate-800 rounded-xl pl-10 pr-3 py-2.5 text-slate-100 focus:outline-none focus:border-sky-500 text-xs appearance-none"
            >
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-1.5">Min Price (₹)</label>
          <div className="relative">
            <IndianRupee className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="number"
              value={searchParams.min_price || ''}
              onChange={(e) => onParamChange('min_price', e.target.value)}
              placeholder="0"
              className="w-full bg-slate-900/90 border border-slate-800 rounded-xl pl-10 pr-3 py-2.5 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-sky-500 text-xs"
            />
          </div>
        </div>

        <div>
          <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-1.5">Max Price (₹)</label>
          <div className="relative">
            <IndianRupee className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="number"
              value={searchParams.max_price || ''}
              onChange={(e) => onParamChange('max_price', e.target.value)}
              placeholder="50000000"
              className="w-full bg-slate-900/90 border border-slate-800 rounded-xl pl-10 pr-3 py-2.5 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-sky-500 text-xs"
            />
          </div>
        </div>
      </div>

      <div className="pt-2 border-t border-slate-800/60 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider whitespace-nowrap">Quick Filter:</span>
        <button
          onClick={() => onParamChange('category', '')}
          className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
            !searchParams.category
              ? 'bg-sky-500 text-slate-950 shadow-md shadow-sky-500/20'
              : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
          }`}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => onParamChange('category', cat)}
            className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
              searchParams.category === cat
                ? 'bg-sky-500 text-slate-950 shadow-md shadow-sky-500/20'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  )
}
