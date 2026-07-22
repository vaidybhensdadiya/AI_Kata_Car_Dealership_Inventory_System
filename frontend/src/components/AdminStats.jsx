import React from 'react'
import { Car, IndianRupee, AlertTriangle, PackageX } from 'lucide-react'

export default function AdminStats({ vehicles = [] }) {
  const totalVehicles = vehicles.length
  const totalQuantity = vehicles.reduce((sum, v) => sum + (v.quantity || 0), 0)
  const totalPortfolioValue = vehicles.reduce((sum, v) => sum + (parseFloat(v.price) * (v.quantity || 0)), 0)
  const lowStockCount = vehicles.filter(v => v.quantity > 0 && v.quantity < 3).length
  const outOfStockCount = vehicles.filter(v => v.quantity <= 0).length

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price)
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div className="editorial-card p-5 flex items-center justify-between">
        <div>
          <div className="text-[10px] font-bold text-[#9A9A9A] uppercase tracking-wider">[ Total Units ]</div>
          <div className="font-heading text-2xl font-bold text-[#F5F3EF] mt-1">{totalQuantity}</div>
          <div className="text-[11px] text-[#9A9A9A] mt-0.5">{totalVehicles} Models Loaded</div>
        </div>
        <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-[#D98A3D]">
          <Car className="w-4 h-4" />
        </div>
      </div>

      <div className="editorial-card p-5 flex items-center justify-between">
        <div>
          <div className="text-[10px] font-bold text-[#9A9A9A] uppercase tracking-wider">[ Portfolio MSRP ]</div>
          <div className="font-heading text-2xl font-bold text-[#D98A3D] mt-1">{formatPrice(totalPortfolioValue)}</div>
          <div className="text-[11px] text-[#9A9A9A] mt-0.5">Asset Book Value</div>
        </div>
        <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-[#D98A3D]">
          <IndianRupee className="w-4 h-4" />
        </div>
      </div>

      <div className="editorial-card p-5 flex items-center justify-between">
        <div>
          <div className="text-[10px] font-bold text-[#9A9A9A] uppercase tracking-wider">[ Low Stock Alert ]</div>
          <div className="font-heading text-2xl font-bold text-amber-400 mt-1">{lowStockCount}</div>
          <div className="text-[11px] text-[#9A9A9A] mt-0.5">&lt; 3 Units Remaining</div>
        </div>
        <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-amber-400">
          <AlertTriangle className="w-4 h-4" />
        </div>
      </div>

      <div className="editorial-card p-5 flex items-center justify-between">
        <div>
          <div className="text-[10px] font-bold text-[#9A9A9A] uppercase tracking-wider">[ Sold Out ]</div>
          <div className="font-heading text-2xl font-bold text-rose-400 mt-1">{outOfStockCount}</div>
          <div className="text-[11px] text-[#9A9A9A] mt-0.5">Requires Restocking</div>
        </div>
        <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-rose-400">
          <PackageX className="w-4 h-4" />
        </div>
      </div>
    </div>
  )
}
