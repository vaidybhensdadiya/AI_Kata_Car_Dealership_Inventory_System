import React, { useState } from 'react'
import { X, ShoppingBag, CheckCircle, AlertCircle, ShieldCheck, Car } from 'lucide-react'
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
      <div className="max-w-lg w-full modal-glass rounded-2xl p-8 relative shadow-2xl overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-xl bg-[#141A22] border border-white/[0.08] text-[#94A3B8] hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {purchased ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 bg-emerald-500/20 border border-emerald-500/40 rounded-full flex items-center justify-center text-emerald-400 mx-auto">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h2 className="font-heading text-2xl font-bold text-white">Purchase Confirmed!</h2>
            <p className="text-[#CBD5E1] text-xs max-w-xs mx-auto">
              Congratulations on purchasing your <strong className="text-[#3B82F6]">{vehicle.make} {vehicle.model}</strong>. AutoVault receipt has been issued.
            </p>
            <div className="pt-2 text-xs text-[#94A3B8] flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Updating dealership database...</span>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-[#3B82F6]/10 border border-[#3B82F6]/30 flex items-center justify-center text-[#3B82F6]">
                <Car className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-heading text-xl font-bold text-white">Confirm Purchase</h2>
                <p className="text-xs text-[#94A3B8]">Review your transaction order details</p>
              </div>
            </div>

            {error && (
              <div className="mb-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-start gap-3 text-rose-300 text-xs">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <div className="bg-[#141A22] rounded-xl p-4 border border-white/[0.08] mb-6 flex items-center justify-between">
              <div>
                <div className="text-[10px] font-bold text-[#3B82F6] uppercase tracking-wider">{vehicle.category}</div>
                <div className="text-base font-bold text-white">{vehicle.make} {vehicle.model}</div>
                <div className="text-xs text-[#94A3B8] mt-0.5">{vehicle.year || '2024'} Model • In Stock: {vehicle.quantity}</div>
              </div>
              <div className="text-right">
                <div className="text-[10px] text-[#94A3B8] font-bold uppercase">Ex-Showroom</div>
                <div className="text-base font-bold text-white">{formatPrice(basePrice)}</div>
              </div>
            </div>

            <div className="space-y-2.5 text-xs border-t border-b border-white/[0.08] py-4 mb-6">
              <div className="flex justify-between text-[#94A3B8]">
                <span>Ex-Showroom Price</span>
                <span className="font-semibold text-[#F8FAFC]">{formatPrice(basePrice)}</span>
              </div>
              <div className="flex justify-between text-[#94A3B8]">
                <span>Estimated GST & Cess (18%)</span>
                <span className="font-semibold text-[#F8FAFC]">{formatPrice(estimatedTax)}</span>
              </div>
              <div className="flex justify-between text-[#94A3B8]">
                <span>Registration & Handling</span>
                <span className="font-semibold text-[#F8FAFC]">{formatPrice(registrationFee)}</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-white/[0.08]">
                <span>Total On-Road Price</span>
                <span className="text-[#3B82F6]">{formatPrice(totalPrice)}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={onClose}
                disabled={loading}
                className="w-1/3 py-3 rounded-xl bg-[#141A22] border border-white/[0.08] text-[#CBD5E1] font-semibold text-xs hover:bg-[#1A212C] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmPurchase}
                disabled={loading}
                className="w-2/3 py-3 btn-blue font-semibold text-xs shadow-lg flex items-center justify-center gap-2 active:scale-[0.98] disabled:opacity-50"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Complete Purchase</span>
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
