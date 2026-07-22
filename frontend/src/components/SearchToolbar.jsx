import React from 'react'
import { Search, SlidersHorizontal, RefreshCw, IndianRupee, Layers } from 'lucide-react'

export default function SearchToolbar({
  searchParams,
  onParamChange,
  onReset,
  categories = ['Sedan', 'SUV', 'Truck', 'Coupe', 'Convertible', 'Hatchback']
}) {
  return (
    <div className="space-y-6">
      {/* Header and Reset Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-[#D98A3D]">
            <SlidersHorizontal className="w-4 h-4" />
          </div>
          <div>
            <h2 className="font-heading text-lg font-bold text-[#F5F3EF]">Refine Search Specification</h2>
            <p className="text-[11px] text-[#9A9A9A]"> cinematic catalog navigation filter system </p>
          </div>
        </div>

        <button
          onClick={onReset}
          className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#0A0A0A] border border-white/[0.08] hover:border-white/20 text-[#9A9A9A] hover:text-[#F5F3EF] text-xs font-semibold transition-all self-start sm:self-auto"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Reset Filters</span>
        </button>
      </div>

      {/* Grid of Inputs - styled elegantly and integrated directly */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label className="block text-[10px] font-bold uppercase tracking-wider text-[#9A9A9A] mb-1.5">[ Search Make/Model ]</label>
          <div className="relative">
            <Search className="w-4 h-4 text-[#9A9A9A] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchParams.make || ''}
              onChange={(e) => onParamChange('make', e.target.value)}
              placeholder="e.g. Porsche, 911, M4..."
              className="w-full bg-[#0A0A0A] border border-white/[0.08] rounded-xl pl-10 pr-3.5 py-3 text-xs text-[#F5F3EF] placeholder-[#9A9A9A] focus:outline-none focus:border-[#D98A3D] focus:ring-1 focus:ring-[#D98A3D] transition-all"
            />
          </div>
        </div>

        <div>
          <label className="block text-[10px] font-bold uppercase tracking-wider text-[#9A9A9A] mb-1.5">[ Body Category ]</label>
          <div className="relative">
            <Layers className="w-4 h-4 text-[#9A9A9A] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <select
              value={searchParams.category || ''}
              onChange={(e) => onParamChange('category', e.target.value)}
              className="w-full bg-[#0A0A0A] border border-white/[0.08] rounded-xl pl-10 pr-3.5 py-3 text-xs text-[#F5F3EF] focus:outline-none focus:border-[#D98A3D] focus:ring-1 focus:ring-[#D98A3D] transition-all appearance-none"
            >
              <option value="">All Classifications</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-[10px] font-bold uppercase tracking-wider text-[#9A9A9A] mb-1.5">[ Minimum Price, ₹ ]</label>
          <div className="relative">
            <IndianRupee className="w-4 h-4 text-[#9A9A9A] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="number"
              value={searchParams.min_price || ''}
              onChange={(e) => onParamChange('min_price', e.target.value)}
              placeholder="0"
              className="w-full bg-[#0A0A0A] border border-white/[0.08] rounded-xl pl-10 pr-3.5 py-3 text-xs text-[#F5F3EF] placeholder-[#9A9A9A] focus:outline-none focus:border-[#D98A3D] focus:ring-1 focus:ring-[#D98A3D] transition-all"
            />
          </div>
        </div>

        <div>
          <label className="block text-[10px] font-bold uppercase tracking-wider text-[#9A9A9A] mb-1.5">[ Maximum Price, ₹ ]</label>
          <div className="relative">
            <IndianRupee className="w-4 h-4 text-[#9A9A9A] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="number"
              value={searchParams.max_price || ''}
              onChange={(e) => onParamChange('max_price', e.target.value)}
              placeholder="50,000,000"
              className="w-full bg-[#0A0A0A] border border-white/[0.08] rounded-xl pl-10 pr-3.5 py-3 text-xs text-[#F5F3EF] placeholder-[#9A9A9A] focus:outline-none focus:border-[#D98A3D] focus:ring-1 focus:ring-[#D98A3D] transition-all"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
