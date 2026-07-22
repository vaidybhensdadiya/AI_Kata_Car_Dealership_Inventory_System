import React from 'react'
import { Edit, Trash2, PlusCircle } from 'lucide-react'

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
          {/* Subtle dark duotone / color-grade overlay */}
          <div className="absolute inset-0 bg-[#D98A3D]/5 mix-blend-color-burn"></div>
          <div className="absolute inset-0 bg-[#0A0A0A]/20 mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

          {/* Single small text label overlaid at bottom-left */}
          <div className="absolute bottom-3.5 left-4 z-10 text-[10px] font-bold tracking-widest text-[#F5F3EF]/90 uppercase">
            {vehicle.category} &middot; {vehicle.year || '2024'}
          </div>
        </div>

        {/* Vehicle Info Details */}
        <div className="p-6 space-y-3">
          <div>
            <div className="text-[10px] font-bold uppercase tracking-widest text-[#D98A3D]">{vehicle.make}</div>
            <h3 className="font-heading text-xl font-bold text-white tracking-tight">
              {vehicle.model}
            </h3>
            <p className="text-[#9A9A9A] text-xs mt-1.5 line-clamp-2 leading-relaxed font-light">
              {vehicle.description || 'Certified luxury reserve automotive specification.'}
            </p>
          </div>

          <div className="pt-3 border-t border-white/[0.08] flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-[9px] uppercase font-bold text-[#9A9A9A] tracking-widest">MSRP</span>
              {isOutOfStock ? (
                <span className="text-[10px] font-semibold text-[#8A5A52] tracking-wide mt-0.5">
                  Sold Out
                </span>
              ) : (
                <span className="text-[10px] font-semibold text-[#D98A3D] tracking-wide mt-0.5">
                  {vehicle.quantity} Available
                </span>
              )}
            </div>
            <span className="text-xl font-bold text-[#D98A3D] group-hover:text-amber-400 transition-colors tracking-tight">
              {formatPrice(vehicle.price)}
            </span>
          </div>
        </div>
      </div>

      {/* Action Controls */}
      <div className="p-6 pt-0 space-y-3">
        {!isStaff && (
          isOutOfStock ? (
            <div className="w-full py-3.5 px-4 text-center text-xs font-semibold text-[#8A5A52] tracking-wide select-none">
              Sold Out
            </div>
          ) : (
            <button
              onClick={() => onPurchase(vehicle)}
              className="w-full py-2.5 px-4 rounded-md font-semibold text-xs transition-all border border-[#F5F3EF]/20 hover:border-[#D98A3D] hover:text-[#D98A3D] text-[#F5F3EF] bg-transparent active:scale-[0.98]"
            >
              Purchase Vehicle
            </button>
          )
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
