import React, { useState, useEffect, useCallback } from 'react'
import { useAuth } from '../context/AuthContext'
import Navbar from '../components/Navbar'
import AdminStats from '../components/AdminStats'
import SearchToolbar from '../components/SearchToolbar'
import VehicleCard from '../components/VehicleCard'
import PurchaseModal from '../components/PurchaseModal'
import AddVehicleModal from '../components/AddVehicleModal'
import EditVehicleModal from '../components/EditVehicleModal'
import RestockVehicleModal from '../components/RestockVehicleModal'
import DeleteConfirmModal from '../components/DeleteConfirmModal'
import axiosClient from '../api/axiosClient'
import { PlusCircle, Sparkles, SearchX } from 'lucide-react'

export default function DashboardPage() {
  const { user, isStaff } = useAuth()
  const [vehicles, setVehicles] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchParams, setSearchParams] = useState({
    make: '',
    category: '',
    min_price: '',
    max_price: ''
  })

  // Modal States
  const [purchaseVehicle, setPurchaseVehicle] = useState(null)
  const [showAddModal, setShowAddModal] = useState(false)
  const [editVehicle, setEditVehicle] = useState(null)
  const [restockVehicle, setRestockVehicle] = useState(null)
  const [deleteVehicle, setDeleteVehicle] = useState(null)

  const fetchVehicles = useCallback(async () => {
    try {
      setLoading(true)
      const hasFilter = searchParams.make || searchParams.category || searchParams.min_price || searchParams.max_price
      let res
      if (hasFilter) {
        const params = new URLSearchParams()
        if (searchParams.make) params.append('make', searchParams.make)
        if (searchParams.category) params.append('category', searchParams.category)
        if (searchParams.min_price) params.append('min_price', searchParams.min_price)
        if (searchParams.max_price) params.append('max_price', searchParams.max_price)
        res = await axiosClient.get(`/vehicles/search/?${params.toString()}`)
      } else {
        res = await axiosClient.get('/vehicles/')
      }
      setVehicles(res.data)
    } catch (err) {
      console.error('Failed to fetch vehicles:', err)
    } finally {
      setLoading(false)
    }
  }, [searchParams])

  useEffect(() => {
    fetchVehicles()
  }, [fetchVehicles])

  const handleParamChange = (field, value) => {
    setSearchParams((prev) => ({ ...prev, [field]: value }))
  }

  const handleResetFilters = () => {
    setSearchParams({ make: '', category: '', min_price: '', max_price: '' })
  }

  return (
    <div className="min-h-screen bg-[#0F1115] text-[#F8FAFC]">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Showroom Hero Header */}
        <div className="steel-card p-8 sm:p-10 rounded-2xl relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-8 bg-gradient-to-r from-[#1E232B] via-[#171A21] to-[#1E232B]">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-[#E63946]/10 border border-[#E63946]/20 text-[#E63946] text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" /> Midnight Steel Experience
            </div>
            <h1 className="font-heading text-3xl sm:text-4xl font-bold text-white tracking-tight leading-tight">
              Welcome, <span className="text-[#E63946]">{user?.first_name || user?.username || 'Collector'}</span>
            </h1>
            <p className="text-[#CBD5E1] text-sm leading-relaxed">
              Explore 30 luxury sedans, exotics, SUVs, and performance cars with real-time Indian Rupee (₹) pricing, specification sheets, and instant checkout.
            </p>
          </div>

          {isStaff && (
            <button
              onClick={() => setShowAddModal(true)}
              className="px-6 py-3.5 btn-racing font-semibold text-sm rounded-xl shadow-lg flex items-center gap-2 shrink-0"
            >
              <PlusCircle className="w-4 h-4" /> Add New Vehicle
            </button>
          )}
        </div>

        {/* Admin KPI Stats Cards */}
        {isStaff && <AdminStats vehicles={vehicles} />}

        {/* Filter & Search Toolbar */}
        <SearchToolbar
          searchParams={searchParams}
          onParamChange={handleParamChange}
          onReset={handleResetFilters}
        />

        {/* Vehicles Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
              <div key={n} className="steel-card h-80 animate-pulse rounded-2xl p-6 bg-[#171A21]" />
            ))}
          </div>
        ) : vehicles.length === 0 ? (
          <div className="steel-card rounded-2xl p-12 text-center text-[#94A3B8]">
            <SearchX className="w-12 h-12 mx-auto mb-3 text-[#94A3B8]" />
            <h3 className="font-heading text-lg font-bold text-white mb-1">No Vehicles Found</h3>
            <p className="text-xs text-[#94A3B8]">No vehicles matched your search filter criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {vehicles.map((v) => (
              <VehicleCard
                key={v.id}
                vehicle={v}
                isStaff={isStaff}
                onPurchase={(v) => setPurchaseVehicle(v)}
                onEdit={(v) => setEditVehicle(v)}
                onDelete={(v) => setDeleteVehicle(v)}
                onRestock={(v) => setRestockVehicle(v)}
              />
            ))}
          </div>
        )}
      </main>

      {/* Modals */}
      {purchaseVehicle && (
        <PurchaseModal
          vehicle={purchaseVehicle}
          onClose={() => setPurchaseVehicle(null)}
          onSuccess={fetchVehicles}
        />
      )}

      {showAddModal && (
        <AddVehicleModal
          onClose={() => setShowAddModal(false)}
          onSuccess={fetchVehicles}
        />
      )}

      {editVehicle && (
        <EditVehicleModal
          vehicle={editVehicle}
          onClose={() => setEditVehicle(null)}
          onSuccess={fetchVehicles}
        />
      )}

      {restockVehicle && (
        <RestockVehicleModal
          vehicle={restockVehicle}
          onClose={() => setRestockVehicle(null)}
          onSuccess={fetchVehicles}
        />
      )}

      {deleteVehicle && (
        <DeleteConfirmModal
          vehicle={deleteVehicle}
          onClose={() => setDeleteVehicle(null)}
          onSuccess={fetchVehicles}
        />
      )}
    </div>
  )
}
