import React, { useState } from 'react'
import { X, ShoppingBag, CheckCircle, AlertCircle, ShieldCheck, Car, ArrowUpRight } from 'lucide-react'
import axiosClient from '../api/axiosClient'

export default function PurchaseModal({ vehicle, onClose, onSuccess }) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [purchased, setPurchased] = useState(false)

  if (!vehicle) return null

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price)
  }

  const basePrice = parseFloat(vehicle.price)
  const estimatedTax = basePrice * 0.18 // 18% GST in India
  const registrationFee = 25000
  const totalPrice = basePrice + estimatedTax + registrationFee

  const handleConfirmPurchase = async () => {
    setLoading(true)
    setError('')
    try {
      await axiosClient.post(`/vehicles/${vehicle.id}/purchase/`)
      setPurchased(true)
      setTimeout(() => {
        onSuccess()
        onClose()
      }, 2000)
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to complete vehicle purchase.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-fade-in">
      <div className="max-w-lg w-full bg-[#151515] border border-white/[0.08] rounded-2xl p-8 relative shadow-2xl overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-[#0A0A0A] border border-white/[0.08] text-[#9A9A9A] hover:text-[#F5F3EF] transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {purchased ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center justify-center text-emerald-400 mx-auto">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h2 className="font-heading text-2xl font-bold text-[#F5F3EF]">Purchase Confirmed!</h2>
            <p className="text-[#9A9A9A] text-xs max-w-xs mx-auto">
              Congratulations on purchasing your <strong className="text-white">{vehicle.make} {vehicle.model}</strong>. AutoVault reserve receipt has been issued.
            </p>
            <div className="pt-2 text-xs text-[#9A9A9A] flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Updating reserve ledger...</span>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-[#D98A3D]">
                <Car className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-heading text-xl font-bold text-[#F5F3EF]">Confirm Reserve Acquisition</h2>
                <p className="text-xs text-[#9A9A9A]">Review transaction settlement details</p>
              </div>
            </div>

            {error && (
              <div className="mb-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-start gap-3 text-rose-300 text-xs">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <div className="bg-[#0A0A0A] rounded-xl p-4 border border-white/[0.08] mb-6 flex items-center justify-between">
              <div>
                <div className="text-[9px] font-bold text-[#D98A3D] uppercase tracking-wider">[{vehicle.category}]</div>
                <div className="text-base font-bold text-[#F5F3EF]">{vehicle.make} {vehicle.model}</div>
                <div className="text-xs text-[#9A9A9A] mt-0.5">{vehicle.year || '2024'} Model • Available: {vehicle.quantity}</div>
              </div>
              <div className="text-right">
                <div className="text-[9px] text-[#9A9A9A] font-bold uppercase">[ Ex-Showroom ]</div>
                <div className="text-base font-bold text-[#F5F3EF]">{formatPrice(basePrice)}</div>
              </div>
            </div>

            <div className="space-y-2.5 text-xs border-t border-b border-white/[0.06] py-4 mb-6">
              <div className="flex justify-between text-[#9A9A9A]">
                <span>Ex-Showroom Price</span>
                <span className="font-semibold text-[#F5F3EF]">{formatPrice(basePrice)}</span>
              </div>
              <div className="flex justify-between text-[#9A9A9A]">
                <span>Estimated GST & Cess (18%)</span>
                <span className="font-semibold text-[#F5F3EF]">{formatPrice(estimatedTax)}</span>
              </div>
              <div className="flex justify-between text-[#9A9A9A]">
                <span>Registration & Handling</span>
                <span className="font-semibold text-[#F5F3EF]">{formatPrice(registrationFee)}</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-white/[0.06]">
                <span>Total On-Road Price</span>
                <span className="text-[#D98A3D]">{formatPrice(totalPrice)}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={onClose}
                disabled={loading}
                className="w-1/3 py-3 rounded-full bg-[#0A0A0A] border border-white/[0.08] text-[#9A9A9A] font-semibold text-xs hover:text-[#F5F3EF] transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmPurchase}
                disabled={loading}
                className="w-2/3 py-3.5 btn-editorial-pill font-semibold text-xs shadow-lg flex items-center justify-center gap-1.5 active:scale-[0.98] disabled:opacity-50"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-[#0A0A0A]/30 border-t-[#0A0A0A] rounded-full animate-spin" />
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Complete Acquisition</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
