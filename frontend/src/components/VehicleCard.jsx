import React from 'react'
import { ShoppingBag, Edit, Trash2, PlusCircle, AlertTriangle, CheckCircle, Tag, Calendar } from 'lucide-react'

export default function VehicleCard({
  vehicle,
  isStaff,
  onPurchase,
  onEdit,
  onDelete,
  onRestock
}) {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(price)
  }

  const categoryGradient = {
    SUV: 'from-amber-500/20 to-orange-500/10 border-amber-500/30 text-amber-400',
    Sedan: 'from-sky-500/20 to-blue-500/10 border-sky-500/30 text-sky-400',
    Truck: 'from-emerald-500/20 to-teal-500/10 border-emerald-500/30 text-emerald-400',
    Coupe: 'from-purple-500/20 to-indigo-500/10 border-purple-500/30 text-purple-400',
    Convertible: 'from-pink-500/20 to-rose-500/10 border-pink-500/30 text-pink-400',
    Hatchback: 'from-cyan-500/20 to-blue-500/10 border-cyan-500/30 text-cyan-400',
  }[vehicle.category] || 'from-slate-700/20 to-slate-800/10 border-slate-700/30 text-slate-300'

  const isOutOfStock = vehicle.quantity <= 0

  return (
    <div className="glass-panel group rounded-3xl overflow-hidden border border-slate-800 hover:border-slate-700 transition-all duration-300 flex flex-col justify-between hover:shadow-2xl hover:shadow-sky-500/5 hover:-translate-y-1">
      {/* Vehicle Hero Card Header */}
      <div>
        <div className="h-48 relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:16px_16px]" />
          <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
            <span className={`px-3 py-1 rounded-full text-xs font-semibold border backdrop-blur-md bg-gradient-to-r ${categoryGradient}`}>
              {vehicle.category}
            </span>
            {vehicle.year && (
              <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-slate-900/80 border border-slate-800 text-slate-400 flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {vehicle.year}
              </span>
            )}
          </div>

          {/* Stock Badge */}
          <div className="absolute top-4 right-4 z-10">
            {isOutOfStock ? (
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-rose-500/20 border border-rose-500/40 text-rose-400 flex items-center gap-1 backdrop-blur-md">
                <AlertTriangle className="w-3.5 h-3.5" /> Out of Stock
              </span>
            ) : (
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center gap-1 backdrop-blur-md">
                <CheckCircle className="w-3.5 h-3.5" /> {vehicle.quantity} In Stock
              </span>
            )}
          </div>

          {/* Vehicle Visual Representation */}
          <div className="relative z-0 text-center transform group-hover:scale-110 transition-transform duration-500">
            <div className="text-6xl font-black tracking-tighter text-slate-800/80 select-none uppercase">
              {vehicle.make}
            </div>
            <div className="text-xs font-bold uppercase tracking-widest text-sky-400/60 -mt-2">
              {vehicle.model}
            </div>
          </div>
        </div>

        {/* Vehicle Body Info */}
        <div className="p-6 space-y-4">
          <div>
            <h3 className="text-xl font-bold text-white group-hover:text-sky-400 transition-colors flex items-center justify-between">
              <span>{vehicle.make} {vehicle.model}</span>
            </h3>
            {vehicle.description ? (
              <p className="text-slate-400 text-xs mt-1.5 line-clamp-2 leading-relaxed">
                {vehicle.description}
              </p>
            ) : (
              <p className="text-slate-400 text-xs mt-1.5 italic">
                Premium certified dealership vehicle.
              </p>
            )}
          </div>

          {/* Price Tag */}
          <div className="pt-2 border-t border-slate-800/60 flex items-baseline justify-between">
            <span className="text-xs uppercase font-semibold text-slate-400 tracking-wider">Price</span>
            <span className="text-2xl font-extrabold text-white tracking-tight bg-gradient-to-r from-white via-slate-100 to-sky-400 bg-clip-text text-transparent">
              {formatPrice(vehicle.price)}
            </span>
          </div>
        </div>
      </div>

      {/* Action Buttons Footer */}
      <div className="p-6 pt-0 space-y-3">
        {/* Customer Purchase Action */}
        <button
          onClick={() => onPurchase(vehicle)}
          disabled={isOutOfStock}
          className={`w-full py-3 px-4 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-200 shadow-md ${
            isOutOfStock
              ? 'bg-slate-900 border border-slate-800 text-slate-600 cursor-not-allowed'
              : 'bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white shadow-sky-500/20 active:scale-[0.98]'
          }`}
        >
          <ShoppingBag className="w-4 h-4" />
          <span>{isOutOfStock ? 'Sold Out' : 'Purchase Vehicle'}</span>
        </button>

        {/* Admin Manage Actions */}
        {isStaff && (
          <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-800/60">
            <button
              onClick={() => onRestock(vehicle)}
              className="py-2 px-2 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-xs font-semibold flex items-center justify-center gap-1 transition-colors"
              title="Restock Inventory"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Restock</span>
            </button>
            <button
              onClick={() => onEdit(vehicle)}
              className="py-2 px-2 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-400 text-xs font-semibold flex items-center justify-center gap-1 transition-colors"
              title="Edit Vehicle Details"
            >
              <Edit className="w-3.5 h-3.5" />
              <span>Edit</span>
            </button>
            <button
              onClick={() => onDelete(vehicle)}
              className="py-2 px-2 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-400 text-xs font-semibold flex items-center justify-center gap-1 transition-colors"
              title="Delete Vehicle"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Delete</span>
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
