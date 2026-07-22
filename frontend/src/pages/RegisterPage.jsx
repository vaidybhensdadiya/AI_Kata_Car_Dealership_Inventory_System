import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import AuthModal from '../components/AuthModal'
import { ArrowRight } from 'lucide-react'

export default function RegisterPage() {
  const navigate = useNavigate()
  const [modalOpen, setModalOpen] = useState(true)

  const handleSuccess = () => {
    navigate('/')
  }

  const handleClose = () => {
    setModalOpen(false)
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#F5F3EF] relative overflow-hidden">
      <Navbar onOpenAuth={() => setModalOpen(true)} />

      {/* Luxury Showroom Hero Background for Guest View */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16 space-y-12">
        <section className="rounded-2xl p-8 sm:p-12 relative overflow-hidden bg-gradient-to-r from-[#111111] via-[#0A0A0A] to-[#111111] border border-white/[0.08]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center opacity-40">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-[#9A9A9A] text-xs font-semibold uppercase tracking-widest">
                [ GUEST OVERVIEW ]
              </div>
              <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#F5F3EF] tracking-tight leading-none">
                Yours to drive.<br />Explore the deals.
              </h1>
              <p className="text-[#9A9A9A] text-sm leading-relaxed max-w-xl">
                Experience dramatically lit luxury sports cars, SUVs, and high-performance exotics curated with atomic inventory availability.
              </p>
              <div className="flex items-center gap-4">
                <button className="px-6 py-3.5 btn-editorial-pill flex items-center gap-2">
                  <span>Explore Reserve Inventory</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="lg:col-span-5 relative">
              <div className="h-64 sm:h-80 w-full rounded-2xl overflow-hidden border border-white/10 relative">
                <img
                  src="https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=1200&q=80"
                  alt="Porsche 911"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Pre-opened AuthModal in register mode */}
      <AuthModal
        isOpen={modalOpen}
        onClose={handleClose}
        initialMode="register"
        onSuccess={handleSuccess}
      />
    </div>
  )
}
