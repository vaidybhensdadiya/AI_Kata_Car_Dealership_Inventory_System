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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <div className="steel-card rounded-2xl p-5 flex items-center justify-between">
        <div>
          <div className="text-[11px] font-semibold text-[#94A3B8] uppercase tracking-wider">Total Units</div>
          <div className="font-heading text-2xl font-bold text-white mt-1">{totalQuantity}</div>
          <div className="text-[11px] text-[#94A3B8] mt-0.5">{totalVehicles} unique models</div>
        </div>
        <div className="w-11 h-11 rounded-xl bg-[#171A21] border border-white/[0.08] flex items-center justify-center text-sky-400">
          <Car className="w-5 h-5" />
        </div>
      </div>

      <div className="steel-card rounded-2xl p-5 flex items-center justify-between">
        <div>
          <div className="text-[11px] font-semibold text-[#94A3B8] uppercase tracking-wider">Portfolio MSRP</div>
          <div className="font-heading text-2xl font-bold text-emerald-400 mt-1">{formatPrice(totalPortfolioValue)}</div>
          <div className="text-[11px] text-[#94A3B8] mt-0.5">Combined stock value</div>
        </div>
        <div className="w-11 h-11 rounded-xl bg-[#171A21] border border-white/[0.08] flex items-center justify-center text-emerald-400">
          <IndianRupee className="w-5 h-5" />
        </div>
      </div>

      <div className="steel-card rounded-2xl p-5 flex items-center justify-between">
        <div>
          <div className="text-[11px] font-semibold text-[#94A3B8] uppercase tracking-wider">Low Stock Warning</div>
          <div className="font-heading text-2xl font-bold text-amber-400 mt-1">{lowStockCount}</div>
          <div className="text-[11px] text-[#94A3B8] mt-0.5">&lt; 3 items remaining</div>
        </div>
        <div className="w-11 h-11 rounded-xl bg-[#171A21] border border-white/[0.08] flex items-center justify-center text-amber-400">
          <AlertTriangle className="w-5 h-5" />
        </div>
      </div>

      <div className="steel-card rounded-2xl p-5 flex items-center justify-between">
        <div>
          <div className="text-[11px] font-semibold text-[#94A3B8] uppercase tracking-wider">Sold Out</div>
          <div className="font-heading text-2xl font-bold text-rose-400 mt-1">{outOfStockCount}</div>
          <div className="text-[11px] text-[#94A3B8] mt-0.5">Requires restocking</div>
        </div>
        <div className="w-11 h-11 rounded-xl bg-[#171A21] border border-white/[0.08] flex items-center justify-center text-rose-400">
          <PackageX className="w-5 h-5" />
        </div>
      </div>
    </div>
  )
}
