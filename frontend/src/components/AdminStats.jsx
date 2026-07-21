import React from 'react'
import { Car, DollarSign, AlertTriangle, ShieldCheck, TrendingUp, PackageX } from 'lucide-react'

export default function AdminStats({ vehicles = [] }) {
  const totalVehicles = vehicles.length
  const totalQuantity = vehicles.reduce((sum, v) => sum + (v.quantity || 0), 0)
  const totalPortfolioValue = vehicles.reduce((sum, v) => sum + (parseFloat(v.price) * (v.quantity || 0)), 0)
  const lowStockCount = vehicles.filter(v => v.quantity > 0 && v.quantity < 3).length
  const outOfStockCount = vehicles.filter(v => v.quantity <= 0).length

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(price)
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {/* Total Inventory Units */}
      <div className="glass-panel rounded-2xl p-5 border border-slate-800 flex items-center justify-between">
        <div>
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Units</div>
          <div className="text-2xl font-black text-white mt-1">{totalQuantity}</div>
          <div className="text-[11px] text-slate-500 mt-0.5">{totalVehicles} unique models</div>
        </div>
        <div className="w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400">
          <Car className="w-6 h-6" />
        </div>
      </div>

      {/* Portfolio Valuation */}
      <div className="glass-panel rounded-2xl p-5 border border-slate-800 flex items-center justify-between">
        <div>
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Inventory Value</div>
          <div className="text-2xl font-black text-emerald-400 mt-1">{formatPrice(totalPortfolioValue)}</div>
          <div className="text-[11px] text-slate-500 mt-0.5">Combined stock MSRP</div>
        </div>
        <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
          <DollarSign className="w-6 h-6" />
        </div>
      </div>

      {/* Low Stock Warning */}
      <div className="glass-panel rounded-2xl p-5 border border-slate-800 flex items-center justify-between">
        <div>
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Low Stock Warning</div>
          <div className="text-2xl font-black text-amber-400 mt-1">{lowStockCount}</div>
          <div className="text-[11px] text-slate-500 mt-0.5">&lt; 3 items remaining</div>
        </div>
        <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
          <AlertTriangle className="w-6 h-6" />
        </div>
      </div>

      {/* Out of Stock */}
      <div className="glass-panel rounded-2xl p-5 border border-slate-800 flex items-center justify-between">
        <div>
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Sold Out</div>
          <div className="text-2xl font-black text-rose-400 mt-1">{outOfStockCount}</div>
          <div className="text-[11px] text-slate-500 mt-0.5">Requires restocking</div>
        </div>
        <div className="w-12 h-12 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400">
          <PackageX className="w-6 h-6" />
        </div>
      </div>
    </div>
  )
}
