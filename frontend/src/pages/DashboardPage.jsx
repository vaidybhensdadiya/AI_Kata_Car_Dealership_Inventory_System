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
import { PlusCircle, ArrowUpRight, SearchX, Compass, Sparkles, ArrowRight } from 'lucide-react'

export default function DashboardPage() {
  const { user, token, isStaff } = useAuth()
  const [vehicles, setVehicles] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchParams, setSearchParams] = useState({
    make: '',
    category: '',
    min_price: '',
    max_price: ''
  })

  // Auth modal states
  const [authModalOpen, setAuthModalOpen] = useState(false)
  const [authModalMode, setAuthModalMode] = useState('login')

  // Modal States
  const [purchaseVehicle, setPurchaseVehicle] = useState(null)
  const [showAddModal, setShowAddModal] = useState(false)
  const [editVehicle, setEditVehicle] = useState(null)
  const [restockVehicle, setRestockVehicle] = useState(null)
  const [deleteVehicle, setDeleteVehicle] = useState(null)

  const fetchVehicles = useCallback(async () => {
    if (!token) return

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
  }, [searchParams, token])

  useEffect(() => {
    fetchVehicles()
  }, [fetchVehicles])

  const handleParamChange = (field, value) => {
    setSearchParams((prev) => ({ ...prev, [field]: value }))
  }

  const handleResetFilters = () => {
    setSearchParams({ make: '', category: '', min_price: '', max_price: '' })
  }

  const handleOpenAuthModal = (mode = 'login') => {
    setAuthModalMode(mode)
    setAuthModalOpen(true)
  }

  const handleExploreClick = () => {
    if (!token) {
      handleOpenAuthModal('login')
    } else {
      const element = document.getElementById('catalog-content-area')
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  // Auto scroll down upon successful login/register flow
  const handleAuthSuccess = () => {
    fetchVehicles()
    setTimeout(() => {
      const element = document.getElementById('catalog-content-area')
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }, 300)
  }

  const categories = ['SUV', 'Sedan', 'Coupe', 'Convertible', 'Hatchback', 'Truck']

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#F5F3EF]">
      <Navbar onOpenAuth={handleOpenAuthModal} />

      {/* RENDER VIEW DEPENDING ON AUTH STATUS */}
      {!token ? (
        /* 1. UNAUTHENTICATED GUEST VIEW: Full-Width Full-Bleed Dark Hero Section */
        <section id="hero-showcase" className="relative w-full min-h-[90vh] bg-[#0A0A0A] flex flex-col justify-between items-center text-center px-4 pt-32 pb-24 border-b border-white/[0.04]">
          <div className="absolute inset-0 z-0 select-none pointer-events-none">
            <img
              src="https://static.wixstatic.com/media/c837a6_4e2cf11353dd4161b2d5e5f3b5b36f61~mv2.png/v1/fill/w_1860,h_1009,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/welcome.png"
              alt="Cinematic luxury car close-up"
              className="w-full h-full object-cover object-bottom opacity-70"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent"></div>
            <div className="absolute inset-0 bg-[#0A0A0A]/10"></div>
          </div>

          <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center justify-center space-y-6 my-auto animate-fade-in">
            <div className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#9A9A9A] max-w-lg select-none">
              [ AUTOVAULT — LUXURY AUTOMOTIVE RESERVE ]
            </div>

            <h1 className="font-heading text-5xl sm:text-7xl lg:text-[96px] font-extralight text-[#F5F3EF] tracking-tighter leading-none select-none">
              Yours <span className="font-medium italic text-white">To Drive.</span>
            </h1>

            <p className="text-[#9A9A9A] text-xs sm:text-sm font-light tracking-wide max-w-md select-none leading-relaxed">
              A private reserve of curated performance exotics and grand tourers. Experience automotive luxury engineered to captivate.
            </p>

            <div className="pt-4">
              <button
                onClick={handleExploreClick}
                className="px-8 py-4 bg-[#F5F3EF] hover:bg-white text-[#0A0A0A] flex items-center justify-center gap-1.5 shadow-2xl hover:scale-105 transition-all duration-300 rounded-full font-bold text-xs"
              >
                <span className="tracking-wider uppercase">Explore The Deals</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </section>
      ) : null}

      {/* Main Content Workspace - dynamically displayed only after authentication */}
      {token && (
        <main id="catalog-content-area" className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 animate-fade-in">
          
          {/* 2. AUTHENTICATED USER VIEW: Showcase Hero Card (Themed in Black & Amber) */}
          <section id="hero-showcase" className="vault-card rounded-2xl p-8 sm:p-12 relative overflow-hidden bg-[#151515] border border-white/[0.08]">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Left Content Column */}
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#D98A3D]/10 border border-[#D98A3D]/30 text-[#D98A3D] text-xs font-semibold uppercase tracking-wider">
                  <Sparkles className="w-4 h-4" /> Luxury Automotive Marketplace
                </div>

                <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-none">
                  Find Your Next <span className="text-[#D98A3D]">Dream Car</span>
                </h1>

                <p className="text-[#9A9A9A] text-sm sm:text-base leading-relaxed max-w-xl font-light">
                  Welcome back, <span className="text-[#D98A3D] font-bold">{user?.first_name || user?.username}</span>. Access your curated private portfolio of premium exotics, track-focused supercars, and high-performance luxury reserves.
                </p>

                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <button
                    onClick={() => {
                      const element = document.getElementById('inventory-section')
                      if (element) element.scrollIntoView({ behavior: 'smooth' })
                    }}
                    className="px-6 py-3.5 bg-[#F5F3EF] hover:bg-white text-[#0A0A0A] font-bold text-xs rounded-full shadow-lg flex items-center gap-1.5 transition-all active:scale-[0.98]"
                  >
                    <span>Explore Reserve Inventory</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  {isStaff && (
                    <button
                      onClick={() => setShowAddModal(true)}
                      className="px-6 py-3.5 bg-[#0A0A0A] border border-white/[0.08] hover:border-white/20 text-[#F5F3EF] font-bold text-xs rounded-full transition-all flex items-center gap-1.5 active:scale-[0.98]"
                    >
                      <PlusCircle className="w-4 h-4 text-[#D98A3D]" />
                      <span>Add New Vehicle</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Right Image Showcase Card */}
              <div className="lg:col-span-5 relative">
                <div className="h-64 sm:h-80 w-full rounded-2xl overflow-hidden shadow-2xl relative border border-white/[0.08] group">
                  <img
                    src="https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=1200&q=80"
                    alt="Porsche 911 GT3 RS Showroom"
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#151515] via-transparent to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between backdrop-blur-md bg-[#0A0A0A]/85 p-3 rounded-xl border border-white/[0.08]">
                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-wider text-[#D98A3D]">Featured Reserve</div>
                      <div className="text-sm font-bold text-white">Porsche 911 GT3 RS</div>
                    </div>
                    <div class="text-right">
                      <div className="text-xs font-extrabold text-white">₹3,50,00,000</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Admin Stats Controls */}
          {isStaff && <AdminStats vehicles={vehicles} />}

          {/* Integrated Filter Bar */}
          <SearchToolbar
            searchParams={searchParams}
            onParamChange={handleParamChange}
            onReset={handleResetFilters}
          />

          {/* Categories Pills classification bar */}
          <section id="categories-section" className="space-y-4">
            <div className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#9A9A9A] flex items-center gap-2">
              <Compass className="w-4 h-4 text-[#D98A3D]" /> [ Classification Categories ]
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
          </section>

          {/* Featured Reserves showroom grid */}
          <section id="inventory-section" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="font-heading text-2xl font-bold tracking-tight text-[#F5F3EF]">Reserve Showroom</h2>
              <div className="flex items-center gap-3">
                <span className="text-xs text-[#9A9A9A] font-semibold uppercase tracking-wider">[ {vehicles.length} Models ]</span>
                {isStaff && (
                  <button
                    onClick={() => setShowAddModal(true)}
                    className="px-4 py-2 bg-[#111111] border border-white/[0.08] hover:border-white/20 text-[#F5F3EF] text-xs font-bold rounded-full transition-all flex items-center gap-1.5"
                  >
                    <PlusCircle className="w-4 h-4 text-[#D98A3D]" />
                    <span>Create Listing</span>
                  </button>
                )}
              </div>
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
          </section>

          {/* Minimal Footer */}
          <footer className="pt-8 border-t border-white/[0.08] text-center text-xs text-[#9A9A9A] space-y-2">
            <div className="flex items-center justify-center gap-1.5 font-bold text-[#F5F3EF] tracking-widest uppercase">
              <div className="w-5 h-5 rounded-full border border-white/20 flex items-center justify-center text-white text-[9px] font-bold">AV</div>
              <span>AutoVault Reserve</span>
            </div>
            <p>© 2026 AutoVault. All rights reserved. Certified Luxury Vehicle Inventory Portal.</p>
          </footer>
        </main>
      )}

      {/* Auth Modal overlay triggered by Explore Deals or Navbar links */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialMode={authModalMode}
        onSuccess={handleAuthSuccess}
      />

      {/* Action Modals */}
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
