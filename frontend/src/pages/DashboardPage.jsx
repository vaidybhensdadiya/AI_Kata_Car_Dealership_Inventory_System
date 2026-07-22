import React, { useState, useEffect, useCallback } from 'react'
import { useAuth } from '../context/AuthContext'
import Navbar from '../components/Navbar'
import AdminStats from '../components/AdminStats'
import SearchToolbar from '../components/SearchToolbar'
import VehicleCard from '../components/VehicleCard'
import PurchaseModal from '../components/PurchaseModal'
import AddVehicleModal from '../components/AddVehicleModal'
import EditVehicleModal from '../components/EditVehicleModal'
import RestockVehicleModal from '../components/RestockModal'
import DeleteConfirmModal from '../components/DeleteConfirmModal'
import AuthModal from '../components/AuthModal'
import axiosClient from '../api/axiosClient'
import { ArrowUpRight, Plus, Sparkles, SearchX, Compass } from 'lucide-react'

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

  // Auth modal triggered inside Navbar or other parts
  const [authModalMode, setAuthModalMode] = useState(null) // 'login' | 'register' | null

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
    <div className="min-h-screen bg-[#0A0A0A] text-[#F5F3EF]">
      <Navbar onOpenAuth={(mode) => setAuthModalMode(mode)} />

      {/* Hero Showcase Section - Cinematic Full-Bleed look */}
      <section id="hero-showcase" className="relative pt-32 pb-20 overflow-hidden bg-[#0A0A0A] border-b border-white/[0.04]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Column Content */}
            <div className="lg:col-span-7 space-y-8">
              <div className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#9A9A9A]">
                [ 0.9% APR FINANCING AVAILABLE FOR A LIMITED TIME. VIEW RESERVES ]
              </div>

              <h1 className="font-heading text-5xl sm:text-7xl lg:text-[85px] font-extrabold text-[#F5F3EF] tracking-tighter leading-[0.9] select-none">
                Yours <span className="font-light text-[#9A9A9A] italic">to Drive.</span>
              </h1>

              <p className="text-[#9A9A9A] text-sm sm:text-base leading-relaxed max-w-lg font-light">
                Discover curated reserve sports models and luxury tourers. A cinematic showroom experience featuring dramatically lit exotics available for acquisition.
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <a
                  href="#inventory-section"
                  className="px-8 py-4 btn-editorial-pill flex items-center gap-2 group"
                >
                  <span>Explore The Deals</span>
                  <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>

                {isStaff && (
                  <button
                    onClick={() => setShowAddModal(true)}
                    className="px-6 py-4 btn-editorial-ghost flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4 text-[#D98A3D]" />
                    <span>Create Listing</span>
                  </button>
                )}
              </div>
            </div>

            {/* Right Column Full-Bleed dramatically lit car image */}
            <div className="lg:col-span-5 relative">
              <div className="h-[320px] sm:h-[400px] w-full rounded-2xl overflow-hidden relative border border-white/[0.08] shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=1200&q=80"
                  alt="Curated supercar showcase"
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between backdrop-blur-md bg-[#0A0A0A]/80 p-4 rounded-xl border border-white/[0.08]">
                  <div>
                    <div className="text-[9px] font-bold uppercase tracking-widest text-[#D98A3D]">[ Current Reserve ]</div>
                    <div className="text-sm font-bold text-[#F5F3EF]">Porsche 911 GT3 RS</div>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-extrabold text-[#F5F3EF]">₹3,50,00,000</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main content grid - Alternating Charcoal section */}
      <section className="bg-[#111111] py-16 border-b border-white/[0.04]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Admin KPI stats */}
          {isStaff && <AdminStats vehicles={vehicles} />}

          {/* Integrated Search and Filter section */}
          <SearchToolbar
            searchParams={searchParams}
            onParamChange={handleParamChange}
            onReset={handleResetFilters}
          />
        </div>
      </section>

      {/* Categories quick filter selector bar */}
      <section id="categories-section" className="bg-[#0A0A0A] py-10 border-b border-white/[0.04]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#9A9A9A] flex items-center gap-2">
            <Compass className="w-4 h-4 text-[#D98A3D]" /> [ Filter by body classification ]
          </div>
          <div className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-none">
            <button
              onClick={() => handleParamChange('category', '')}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-300 ${
                !searchParams.category
                  ? 'bg-[#F5F3EF] text-[#0A0A0A] shadow-md'
                  : 'bg-[#111111] border border-white/[0.08] text-[#9A9A9A] hover:text-[#F5F3EF]'
              }`}
            >
              All Reserves
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleParamChange('category', cat)}
                className={`px-5 py-2.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-300 ${
                  searchParams.category === cat
                    ? 'bg-[#F5F3EF] text-[#0A0A0A] shadow-md'
                    : 'bg-[#111111] border border-white/[0.08] text-[#9A9A9A] hover:text-[#F5F3EF]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Pre-owned reserves grid */}
      <section id="inventory-section" className="bg-[#111111] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="font-heading text-2xl font-bold tracking-tight text-[#F5F3EF]">Featured Reserves</h2>
            <span className="text-xs text-[#9A9A9A] uppercase tracking-wider font-semibold">[ {vehicles.length} Models Loaded ]</span>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                <div key={n} className="editorial-card h-80 animate-pulse bg-[#151515]" />
              ))}
            </div>
          ) : vehicles.length === 0 ? (
            <div className="editorial-card p-12 text-center text-[#9A9A9A]">
              <SearchX className="w-12 h-12 mx-auto mb-3 text-[#9A9A9A]" />
              <h3 className="font-heading text-lg font-bold text-[#F5F3EF] mb-1">No matches found</h3>
              <p className="text-xs text-[#9A9A9A]">No vehicles matched your search filter criteria.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
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
        </div>
      </section>

      {/* Editorial Footer */}
      <footer className="bg-[#0A0A0A] py-12 border-t border-white/[0.04] text-center text-xs text-[#9A9A9A] space-y-3">
        <div className="flex items-center justify-center gap-1.5 font-bold text-[#F5F3EF] tracking-widest uppercase">
          <div className="w-5 h-5 rounded-full border border-white/20 flex items-center justify-center text-white text-[9px] font-bold">AV</div>
          <span>AutoVault Reserve</span>
        </div>
        <p>© 2026 AutoVault. All rights reserved. Certified Luxury Vehicle Inventory Portal.</p>
      </footer>

      {/* Modals & Popups */}
      {authModalMode && (
        <AuthModal
          isOpen={true}
          onClose={() => setAuthModalMode(null)}
          initialMode={authModalMode}
          onSuccess={fetchVehicles}
        />
      )}

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
