import React from 'react'
import { ShoppingBag, Edit, Trash2, PlusCircle, AlertTriangle, CheckCircle, Calendar } from 'lucide-react'

export default function VehicleCard({
  vehicle,
  isStaff,
  onPurchase,
  onEdit,
  onDelete,
  onRestock
}) {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
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
  const fallbackImg = 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=800&q=80'

  return (
    <div className="glass-panel group rounded-3xl overflow-hidden border border-slate-800 hover:border-slate-700 transition-all duration-300 flex flex-col justify-between hover:shadow-2xl hover:shadow-sky-500/5 hover:-translate-y-1">
      <div>
        {/* Vehicle Image Header */}
        <div className="h-48 relative overflow-hidden bg-slate-900">
          <img
            src={vehicle.image_url || fallbackImg}
            alt={`${vehicle.make} ${vehicle.model}`}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-black/30"></div>

          <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
            <span className={`px-3 py-1 rounded-full text-xs font-semibold border backdrop-blur-md bg-gradient-to-r ${categoryGradient}`}>
              {vehicle.category}
            </span>
            {vehicle.year && (
              <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-slate-900/80 border border-slate-800 text-slate-300 flex items-center gap-1 backdrop-blur-md">
                <Calendar className="w-3 h-3" />
                {vehicle.year}
              </span>
            )}
          </div>

          <div className="absolute top-4 right-4 z-10">
            {isOutOfStock ? (
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-rose-500/30 border border-rose-500/40 text-rose-300 flex items-center gap-1 backdrop-blur-md">
                <AlertTriangle className="w-3.5 h-3.5" /> Sold Out
              </span>
            ) : (
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/30 border border-emerald-500/40 text-emerald-300 flex items-center gap-1 backdrop-blur-md">
                <CheckCircle className="w-3.5 h-3.5" /> {vehicle.quantity} In Stock
              </span>
            )}
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
                Premium certified luxury vehicle.
              </p>
            )}
          </div>

          <div className="pt-2 border-t border-slate-800/60 flex items-baseline justify-between">
            <span className="text-xs uppercase font-semibold text-slate-400 tracking-wider">Price</span>
            <span className="text-2xl font-extrabold text-sky-400 tracking-tight">
              {formatPrice(vehicle.price)}
            </span>
          </div>
        </div>
      </div>

      <div className="p-6 pt-0 space-y-3">
        {!isStaff && (
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
        )}

        {isStaff && (
          <div className="grid grid-cols-3 gap-2 pt-2">
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
