import React, { useState, useEffect, useCallback } from 'react'
import Navbar from '../components/Navbar'
import AdminStats from '../components/AdminStats'
import SearchToolbar from '../components/SearchToolbar'
import VehicleGrid from '../components/VehicleGrid'
import AddVehicleModal from '../components/AddVehicleModal'
import EditVehicleModal from '../components/EditVehicleModal'
import PurchaseModal from '../components/PurchaseModal'
import RestockModal from '../components/RestockModal'
import DeleteConfirmModal from '../components/DeleteConfirmModal'
import { useAuth } from '../context/AuthContext'
import axiosClient from '../api/axiosClient'

export default function DashboardPage() {
  const { user } = useAuth()
  const isStaff = user?.is_staff || false

  const [vehicles, setVehicles] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchParams, setSearchParams] = useState({
    make: '',
    category: '',
    min_price: '',
    max_price: ''
  })

  // Active Modals
  const [showAddModal, setShowAddModal] = useState(false)
  const [selectedPurchaseVehicle, setSelectedPurchaseVehicle] = useState(null)
  const [selectedEditVehicle, setSelectedEditVehicle] = useState(null)
  const [selectedRestockVehicle, setSelectedRestockVehicle] = useState(null)
  const [selectedDeleteVehicle, setSelectedDeleteVehicle] = useState(null)

  const fetchVehicles = useCallback(async () => {
    setLoading(true)
    try {
      const hasFilter = searchParams.make || searchParams.category || searchParams.min_price || searchParams.max_price
      let url = '/vehicles/'
      let params = {}

      if (hasFilter) {
        url = '/vehicles/search/'
        if (searchParams.make) params.make = searchParams.make
        if (searchParams.category) params.category = searchParams.category
        if (searchParams.min_price) params.min_price = searchParams.min_price
        if (searchParams.max_price) params.max_price = searchParams.max_price
      }

      const response = await axiosClient.get(url, { params })
      setVehicles(response.data)
    } catch (err) {
      console.error('Failed to load vehicles:', err)
    } finally {
      setLoading(false)
    }
  }, [searchParams])

  useEffect(() => {
    fetchVehicles()
  }, [fetchVehicles])

  const handleParamChange = (key, value) => {
    setSearchParams(prev => ({ ...prev, [key]: value }))
  }

  const handleResetFilters = () => {
    setSearchParams({
      make: '',
      category: '',
      min_price: '',
      max_price: ''
    })
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-sky-500 selection:text-slate-950">
      {/* Navigation Header */}
      <Navbar onOpenAddModal={() => setShowAddModal(true)} />

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Hero Banner */}
        <div className="mb-8 p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-slate-800 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10">
            <span className="text-xs font-bold uppercase tracking-widest text-sky-400">Dealership Live Inventory</span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-1">
              Welcome back, <span className="bg-gradient-to-r from-sky-400 via-indigo-300 to-white bg-clip-text text-transparent">{user?.first_name || user?.username}</span>
            </h1>
            <p className="text-slate-400 text-sm mt-2 max-w-xl">
              Explore our current fleet of luxury, performance, and everyday vehicles. {isStaff && 'You have administrative permissions to modify inventory.'}
            </p>
          </div>
        </div>

        {/* Admin KPI Stats Banner */}
        {isStaff && <AdminStats vehicles={vehicles} />}

        {/* Search & Multi-Filter Controls */}
        <SearchToolbar
          searchParams={searchParams}
          onParamChange={handleParamChange}
          onReset={handleResetFilters}
        />

        {/* Vehicle Cards Grid */}
        <VehicleGrid
          vehicles={vehicles}
          loading={loading}
          isStaff={isStaff}
          onPurchase={(v) => setSelectedPurchaseVehicle(v)}
          onEdit={(v) => setSelectedEditVehicle(v)}
          onDelete={(v) => setSelectedDeleteVehicle(v)}
          onRestock={(v) => setSelectedRestockVehicle(v)}
        />
      </main>

      {/* Modals */}
      {showAddModal && (
        <AddVehicleModal
          onClose={() => setShowAddModal(false)}
          onSuccess={fetchVehicles}
        />
      )}

      {selectedPurchaseVehicle && (
        <PurchaseModal
          vehicle={selectedPurchaseVehicle}
          onClose={() => setSelectedPurchaseVehicle(null)}
          onSuccess={fetchVehicles}
        />
      )}

      {selectedEditVehicle && (
        <EditVehicleModal
          vehicle={selectedEditVehicle}
          onClose={() => setSelectedEditVehicle(null)}
          onSuccess={fetchVehicles}
        />
      )}

      {selectedRestockVehicle && (
        <RestockModal
          vehicle={selectedRestockVehicle}
          onClose={() => setSelectedRestockVehicle(null)}
          onSuccess={fetchVehicles}
        />
      )}

      {selectedDeleteVehicle && (
        <DeleteConfirmModal
          vehicle={selectedDeleteVehicle}
          onClose={() => setSelectedDeleteVehicle(null)}
          onSuccess={fetchVehicles}
        />
      )}
    </div>
  )
}
