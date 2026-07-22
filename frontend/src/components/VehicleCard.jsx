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

  const isOutOfStock = vehicle.quantity <= 0
  const fallbackImg = 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=800&q=80'

  return (
    <div className="vault-card card-hover rounded-2xl overflow-hidden flex flex-col justify-between group">
      <div>
        {/* Large Vehicle Image */}
        <div className="h-56 w-full relative overflow-hidden bg-[#0A0A0A]">
          <img
            src={vehicle.image_url || fallbackImg}
            alt={`${vehicle.make} ${vehicle.model}`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#151515] via-transparent to-black/30"></div>

          <div className="absolute top-3.5 left-3.5 z-10 flex items-center gap-1.5">
            <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-[#0A0A0A]/90 text-[#F5F3EF] border border-white/[0.08]">
              {vehicle.category}
            </span>
            {vehicle.year && (
              <span className="px-2 py-1 rounded-full text-[10px] font-semibold bg-[#0A0A0A]/90 text-[#9A9A9A] border border-white/[0.08] flex items-center gap-1">
                <Calendar className="w-3 h-3 text-[#D98A3D]" />
                {vehicle.year}
              </span>
            )}
          </div>

          <div className="absolute top-3.5 right-3.5 z-10">
            {isOutOfStock ? (
              <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-rose-500/20 text-rose-400 border border-rose-500/30 flex items-center gap-1">
                <AlertTriangle className="w-3 h-3" /> Sold Out
              </span>
            ) : (
              <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                <CheckCircle className="w-3 h-3" /> {vehicle.quantity} Available
              </span>
            )}
          </div>
        </div>

        {/* Vehicle Info Details */}
        <div className="p-6 space-y-3">
          <div>
            <div className="text-[10px] font-bold uppercase tracking-widest text-[#D98A3D]">{vehicle.make}</div>
            <h3 className="font-heading text-xl font-bold text-white tracking-tight">
              {vehicle.model}
            </h3>
            <p className="text-[#9A9A9A] text-xs mt-1.5 line-clamp-2 leading-relaxed">
              {vehicle.description || 'Certified luxury reserve automotive specification.'}
            </p>
          </div>

          <div className="pt-3 border-t border-white/[0.08] flex items-baseline justify-between">
            <span className="text-[10px] uppercase font-bold text-[#9A9A9A] tracking-widest">MSRP</span>
            <span className="text-2xl font-bold text-[#D98A3D] group-hover:text-amber-400 transition-colors tracking-tight">
              {formatPrice(vehicle.price)}
            </span>
          </div>
        </div>
      </div>

      {/* Action Controls */}
      <div className="p-6 pt-0 space-y-3">
        {!isStaff && (
          <button
            onClick={() => onPurchase(vehicle)}
            disabled={isOutOfStock}
            className={`w-full py-3.5 px-4 rounded-full font-semibold text-xs flex items-center justify-center gap-2 transition-all shadow-md ${isOutOfStock
                ? 'bg-[#111111] border border-white/[0.08] text-[#9A9A9A] cursor-not-allowed'
                : 'bg-[#F5F3EF] hover:bg-white text-[#0A0A0A] active:scale-[0.98]'
              }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>{isOutOfStock ? 'Sold Out' : 'Purchase Vehicle'}</span>
          </button>
        )}

        {isStaff && (
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => onRestock(vehicle)}
              className="py-2.5 rounded-full bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-[10px] font-semibold flex items-center justify-center gap-1 transition-colors"
              title="Restock Inventory"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Restock</span>
            </button>
            <button
              onClick={() => onEdit(vehicle)}
              className="py-2.5 rounded-full bg-[#111111] hover:bg-white/[0.06] border border-white/[0.08] text-[#F5F3EF] text-[10px] font-semibold flex items-center justify-center gap-1 transition-colors"
              title="Edit Vehicle Details"
            >
              <Edit className="w-3.5 h-3.5" />
              <span>Edit</span>
            </button>
            <button
              onClick={() => onDelete(vehicle)}
              className="py-2.5 rounded-full bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-400 text-[10px] font-semibold flex items-center justify-center gap-1 transition-colors"
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
