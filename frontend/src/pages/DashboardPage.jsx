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
import { PlusCircle, ArrowRight, ShieldCheck, SearchX, Car, Sparkles } from 'lucide-react'

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

  const categories = ['SUV', 'Sedan', 'Coupe', 'Convertible', 'Hatchback', 'Truck']

  return (
    <div className="min-h-screen bg-[#0B0F14] text-[#F8FAFC]">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        
        {/* Full-Width Luxury Showroom Hero Section */}
        <section id="hero-showcase" className="vault-card rounded-2xl p-8 sm:p-12 relative overflow-hidden bg-gradient-to-r from-[#1A212C] via-[#141A22] to-[#1A212C] border border-white/[0.08]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <!-- Left Hero Content -->
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#3B82F6]/10 border border-[#3B82F6]/30 text-[#3B82F6] text-xs font-semibold uppercase tracking-wider">
                <Sparkles className="w-4 h-4" /> Premier Luxury Automotive Marketplace
              </div>

              <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-none">
                Find Your Next <span className="text-[#3B82F6]">Dream Car</span>
              </h1>

              <p className="text-[#CBD5E1] text-sm sm:text-base leading-relaxed max-w-xl">
                Experience the pinnacle of luxury mobility. Browse 30 curated exotic sports cars, luxury sedans, and performance SUVs with atomic real-time inventory management.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href="#inventory-section"
                  className="px-6 py-3.5 btn-blue font-semibold text-sm rounded-xl shadow-lg flex items-center gap-2"
                >
                  <span>Explore Reserve Inventory</span>
                  <ArrowRight className="w-4 h-4" />
                </a>

                {isStaff && (
                  <button
                    onClick={() => setShowAddModal(true)}
                    className="px-6 py-3.5 bg-[#141A22] border border-white/[0.12] hover:border-white/30 text-white font-semibold text-sm rounded-xl transition-all flex items-center gap-2"
                  >
                    <PlusCircle className="w-4 h-4 text-[#3B82F6]" />
                    <span>Add New Vehicle</span>
                  </button>
                )}
              </div>
            </div>

            <!-- Right Hero Imagery Showcase -->
            <div className="lg:col-span-5 relative">
              <div className="h-64 sm:h-80 w-full rounded-2xl overflow-hidden shadow-2xl relative border border-white/[0.1]">
                <img
                  src="https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=1200&q=80"
                  alt="Porsche 911 GT3 RS Showroom"
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A212C] via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between backdrop-blur-md bg-[#0B0F14]/80 p-3 rounded-xl border border-white/[0.08]">
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-wider text-[#3B82F6]">Featured Reserve</div>
                    <div className="text-sm font-bold text-white">Porsche 911 GT3 RS</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-extrabold text-white">₹3,50,00,000</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Admin KPI Stats -->
        {isStaff && <AdminStats vehicles={vehicles} />}

        <!-- Integrated Search & Filter Toolbar -->
        <SearchToolbar
          searchParams={searchParams}
          onParamChange={handleParamChange}
          onReset={handleResetFilters}
        />

        <!-- Popular Categories Quick Selector -->
        <section id="categories-section" className="space-y-3">
          <h2 className="font-heading text-lg font-bold text-white flex items-center gap-2">
            <Car className="w-5 h-5 text-[#3B82F6]" /> Popular Categories
          </h2>
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            <button
              onClick={() => handleParamChange('category', '')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                !searchParams.category
                  ? 'bg-[#3B82F6] text-white shadow-md shadow-[#3B82F6]/20'
                  : 'bg-[#141A22] border border-white/[0.08] text-[#94A3B8] hover:text-white'
              }`}
            >
              All Models
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleParamChange('category', cat)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  searchParams.category === cat
                    ? 'bg-[#3B82F6] text-white shadow-md shadow-[#3B82F6]/20'
                    : 'bg-[#141A22] border border-white/[0.08] text-[#94A3B8] hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>

        <!-- Latest Vehicles Grid -->
        <section id="inventory-section" className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-heading text-xl font-bold text-white">Latest Reserve Inventory</h2>
            <span className="text-xs text-[#94A3B8]">{vehicles.length} Available Listings</span>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                <div key={n} className="vault-card h-80 animate-pulse rounded-2xl p-6 bg-[#141A22]" />
              ))}
            </div>
          ) : vehicles.length === 0 ? (
            <div className="vault-card rounded-2xl p-12 text-center text-[#94A3B8]">
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
        </section>

        <!-- Minimal Footer -->
        <footer className="pt-8 border-t border-white/[0.08] text-center text-xs text-[#94A3B8] space-y-2">
          <div className="flex items-center justify-center gap-1.5 font-bold text-white">
            <ShieldCheck className="w-4 h-4 text-[#3B82F6]" />
            <span>AutoVault Luxury Automotive Reserve</span>
          </div>
          <p>© 2026 AutoVault. All rights reserved. Certified Luxury Vehicle Inventory Portal.</p>
        </footer>
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
