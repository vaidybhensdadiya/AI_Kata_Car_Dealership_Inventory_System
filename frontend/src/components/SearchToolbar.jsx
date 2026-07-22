import React from 'react'
import { Filter, RefreshCw } from 'lucide-react'

export default function SearchToolbar({
  searchParams,
  onParamChange,
  onReset,
  categories = ['Sedan', 'SUV', 'Truck', 'Coupe', 'Convertible', 'Hatchback']
}) {
  return (
    <div className="w-full py-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.08] pb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-[#D98A3D]">
            <Filter className="w-4 h-4" />
          </div>
          <div>
            <h2 className="font-heading text-lg font-bold text-[#F5F3EF]">Refine Search Specification</h2>
            <p className="text-[11px] text-[#9A9A9A]">cinematic catalog navigation filter system</p>
          </div>
        </div>

        <button
          onClick={onReset}
          className="flex items-center gap-1.5 text-xs text-[#9A9A9A] hover:text-[#F5F3EF] transition-colors"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Reset Filters</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-2">
        <div>
          <label className="block text-[10px] font-bold uppercase tracking-wider text-[#9A9A9A] mb-2">[ SEARCH MAKE/MODEL ]</label>
          <input
            type="text"
            value={searchParams.make || ''}
            onChange={(e) => onParamChange('make', e.target.value)}
            placeholder="e.g. Porsche, M4, GT3..."
            className="w-full bg-transparent border-b border-white/20 focus:border-[#D98A3D] rounded-none py-2 px-0 text-xs text-[#F5F3EF] placeholder-[#9A9A9A] focus:outline-none transition-all"
          />
        </div>

        <div>
          <label className="block text-[10px] font-bold uppercase tracking-wider text-[#9A9A9A] mb-2">[ CATEGORY ]</label>
          <select
            value={searchParams.category || ''}
            onChange={(e) => onParamChange('category', e.target.value)}
            className="w-full bg-transparent border-b border-white/20 focus:border-[#D98A3D] rounded-none py-2 px-0 text-xs text-[#F5F3EF] focus:outline-none transition-all appearance-none"
          >
            <option value="" className="bg-[#0A0A0A] text-[#F5F3EF]">All Classifications</option>
            {categories.map((cat) => (
              <option key={cat} value={cat} className="bg-[#0A0A0A] text-[#F5F3EF]">{cat}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-[10px] font-bold uppercase tracking-wider text-[#9A9A9A] mb-2">[ MIN PRICE (₹ INR) ]</label>
          <input
            type="number"
            value={searchParams.min_price || ''}
            onChange={(e) => onParamChange('min_price', e.target.value)}
            placeholder="0"
            className="w-full bg-transparent border-b border-white/20 focus:border-[#D98A3D] rounded-none py-2 px-0 text-xs text-[#F5F3EF] placeholder-[#9A9A9A] focus:outline-none transition-all"
          />
        </div>

        <div>
          <label className="block text-[10px] font-bold uppercase tracking-wider text-[#9A9A9A] mb-2">[ MAX PRICE (₹ INR) ]</label>
          <input
            type="number"
            value={searchParams.max_price || ''}
            onChange={(e) => onParamChange('max_price', e.target.value)}
            placeholder="50000000"
            className="w-full bg-transparent border-b border-white/20 focus:border-[#D98A3D] rounded-none py-2 px-0 text-xs text-[#F5F3EF] placeholder-[#9A9A9A] focus:outline-none transition-all"
          />
        </div>
      </div>
    </div>
  )
}
