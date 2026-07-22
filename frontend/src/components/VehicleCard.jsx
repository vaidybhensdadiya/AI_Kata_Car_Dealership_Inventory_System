import React from 'react'
import { Calendar, ShoppingBag, PlusCircle, Edit, Trash2, ArrowUpRight } from 'lucide-react'

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
    <div className="editorial-card editorial-hover overflow-hidden flex flex-col justify-between group">
      <div>
        {/* Large Product Photography */}
        <div className="h-60 w-full relative overflow-hidden bg-[#0A0A0A]">
          <img
            src={vehicle.image_url || fallbackImg}
            alt={`${vehicle.make} ${vehicle.model}`}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#151515] via-transparent to-black/30"></div>

          {/* Classification Tags */}
          <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest bg-[#0A0A0A]/90 text-[#F5F3EF] border border-white/[0.08]">
              {vehicle.category}
            </span>
            {vehicle.year && (
              <span className="px-2 py-1 rounded-full text-[9px] font-bold bg-[#0A0A0A]/90 text-[#9A9A9A] border border-white/[0.08] flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {vehicle.year}
              </span>
            )}
          </div>

          {/* Stock Badges */}
          <div className="absolute top-4 right-4 z-10">
            {isOutOfStock ? (
              <span className="px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest bg-rose-950/40 text-rose-300 border border-rose-900/50">
                Out of Stock
              </span>
            ) : (
              <span className="px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest bg-emerald-950/40 text-emerald-300 border border-emerald-900/50">
                {vehicle.quantity} Available
              </span>
            )}
          </div>
        </div>

        {/* Brand Specs Details */}
        <div className="p-6 space-y-4">
          <div>
            <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#9A9A9A]">{vehicle.make}</div>
            <h3 className="font-heading text-xl font-bold text-[#F5F3EF] tracking-tight group-hover:text-white transition-colors">
              {vehicle.model}
            </h3>
            <p className="text-[#9A9A9A] text-xs mt-1.5 font-light line-clamp-2 leading-relaxed">
              {vehicle.description || 'Certified luxury reserve automotive specification.'}
            </p>
          </div>

          <div className="pt-3 border-t border-white/[0.06] flex items-baseline justify-between">
            <span className="text-[9px] uppercase font-bold text-[#9A9A9A] tracking-widest">[ MSRP ]</span>
            <span className="text-xl font-bold text-[#D98A3D] group-hover:text-[#E8A55C] transition-colors tracking-tight">
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
            className={`w-full py-3 px-4 rounded-full font-semibold text-xs flex items-center justify-center gap-1.5 transition-all duration-300 shadow-md ${
              isOutOfStock
                ? 'bg-[#111111] border border-white/[0.08] text-[#9A9A9A] cursor-not-allowed'
                : 'btn-editorial-pill active:scale-[0.98]'
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>{isOutOfStock ? 'Sold Out' : 'Explore The Deal'}</span>
            {!isOutOfStock && <ArrowUpRight className="w-3.5 h-3.5" />}
          </button>
        )}

        {isStaff && (
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => onRestock(vehicle)}
              className="py-2.5 rounded-full bg-white/[0.02] hover:bg-white/[0.06] border border-white/[0.08] text-[#CBD5E1] text-[10px] font-bold flex items-center justify-center gap-1 transition-all"
              title="Restock Reserve"
            >
              <PlusCircle className="w-3.5 h-3.5 text-[#D98A3D]" />
              <span>Restock</span>
            </button>
            <button
              onClick={() => onEdit(vehicle)}
              className="py-2.5 rounded-full bg-white/[0.02] hover:bg-white/[0.06] border border-white/[0.08] text-[#CBD5E1] text-[10px] font-bold flex items-center justify-center gap-1 transition-all"
              title="Edit Reserve Details"
            >
              <Edit className="w-3.5 h-3.5 text-[#D98A3D]" />
              <span>Edit</span>
            </button>
            <button
              onClick={() => onDelete(vehicle)}
              className="py-2.5 rounded-full bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 text-rose-300 text-[10px] font-bold flex items-center justify-center gap-1 transition-all"
              title="Acquisition Cancellation"
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
