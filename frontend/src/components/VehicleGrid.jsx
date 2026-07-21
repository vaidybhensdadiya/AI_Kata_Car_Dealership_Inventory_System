import React from 'react'
import VehicleCard from './VehicleCard'
import { Car, SearchX } from 'lucide-react'

export default function VehicleGrid({
  vehicles,
  loading,
  isStaff,
  onPurchase,
  onEdit,
  onDelete,
  onRestock
}) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
          <div key={n} className="glass-panel rounded-3xl h-96 animate-pulse border border-slate-800 p-6 flex flex-col justify-between">
            <div className="w-full h-44 bg-slate-900 rounded-2xl" />
            <div className="space-y-3">
              <div className="w-2/3 h-5 bg-slate-900 rounded-lg" />
              <div className="w-full h-4 bg-slate-900 rounded-lg" />
              <div className="w-1/2 h-6 bg-slate-900 rounded-lg" />
            </div>
            <div className="w-full h-11 bg-slate-900 rounded-xl" />
          </div>
        ))}
      </div>
    )
  }

  if (!vehicles || vehicles.length === 0) {
    return (
      <div className="glass-panel rounded-3xl p-12 text-center border border-slate-800 max-w-md mx-auto my-12">
        <div className="w-16 h-16 bg-slate-900 border border-slate-800 rounded-2xl flex items-center justify-center text-slate-500 mx-auto mb-4">
          <SearchX className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-bold text-white mb-2">No Vehicles Found</h3>
        <p className="text-slate-400 text-sm">
          We couldn't find any vehicles matching your search criteria. Try adjusting your filters or search terms.
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {vehicles.map((vehicle) => (
        <VehicleCard
          key={vehicle.id}
          vehicle={vehicle}
          isStaff={isStaff}
          onPurchase={onPurchase}
          onEdit={onEdit}
          onDelete={onDelete}
          onRestock={onRestock}
        />
      ))}
    </div>
  )
}
