import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import AuthModal from '../components/AuthModal'
import { ArrowUpRight } from 'lucide-react'

export default function LoginPage() {
  const navigate = useNavigate()
  const [modalOpen, setModalOpen] = useState(true)

  const handleSuccess = () => {
    navigate('/')
  }

  const handleClose = () => {
    // If they close, redirect to '/' (which will force ProtectedRoute redirect back if unauthenticated, or work if authenticated)
    setModalOpen(false)
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#F5F3EF] relative overflow-hidden flex flex-col justify-between">
      <Navbar onOpenAuth={() => setModalOpen(true)} />

      {/* Luxury Showroom Hero Background for Guest View */}
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16 w-full flex items-center justify-center">
        <section className="w-full rounded-2xl p-8 sm:p-12 relative overflow-hidden bg-gradient-to-r from-[#111111] via-[#0A0A0A] to-[#111111] border border-white/[0.08] opacity-30 select-none pointer-events-none">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#9A9A9A]">
                [ 0.9% APR FINANCING. AVAILABLE FOR UP TO 24 MONTHS ON ALL NEW INVENTORY ]
              </div>
              <h1 className="font-heading text-5xl sm:text-7xl lg:text-[85px] font-extrabold text-white tracking-tighter leading-[0.9]">
                Yours <span className="font-light text-[#9A9A9A] italic">to Drive.</span>
              </h1>
              <p className="text-[#9A9A9A] text-sm leading-relaxed max-w-xl font-light">
                Discover reserve performance exotics and grand tourers. A showroom experience with dramatic warm lighting.
              </p>
              <div className="flex items-center gap-4">
                <button className="px-8 py-4 btn-editorial-pill flex items-center gap-1.5 font-bold text-xs rounded-full">
                  <span>Explore The Deals</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="lg:col-span-5 relative">
              <div className="h-64 sm:h-80 w-full rounded-2xl overflow-hidden border border-white/[0.08] relative">
                <img
                  src="https://static.wixstatic.com/media/c837a6_4e2cf11353dd4161b2d5e5f3b5b36f61~mv2.png/v1/fill/w_1860,h_1009,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/welcome.png"
                  alt="Porsche 911"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Pre-opened AuthModal */}
      <AuthModal
        isOpen={modalOpen}
        onClose={handleClose}
        initialMode="login"
        onSuccess={handleSuccess}
      />
    </div>
  )
}
