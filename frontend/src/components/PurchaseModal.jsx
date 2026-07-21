import React, { useState } from 'react'
import { X, ShoppingBag, CheckCircle, AlertCircle, ShieldCheck, Car, ArrowRight } from 'lucide-react'
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="max-w-lg w-full glass-panel rounded-3xl p-8 border border-slate-800 shadow-2xl relative z-10 overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {purchased ? (
          <div className="text-center py-8 space-y-4 animate-scale-up">
            <div className="w-20 h-20 bg-emerald-500/20 border border-emerald-500/40 rounded-full flex items-center justify-center text-emerald-400 mx-auto">
              <CheckCircle className="w-10 h-10" />
            </div>
            <h2 className="text-2xl font-black text-white">Purchase Confirmed!</h2>
            <p className="text-slate-300 text-sm max-w-xs mx-auto">
              Congratulations on purchasing your <strong className="text-sky-400">{vehicle.make} {vehicle.model}</strong>. Dealership receipt has been generated.
            </p>
            <div className="pt-4 text-xs text-slate-500 flex items-center justify-center gap-1">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Updating dealership inventory database...</span>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400">
                <Car className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-extrabold text-white">Confirm Vehicle Purchase</h2>
                <p className="text-xs text-slate-400">Review your transaction order details</p>
              </div>
            </div>

            {error && (
              <div className="mb-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-start gap-3 text-rose-400 text-sm">
                <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <div className="bg-slate-900/90 rounded-2xl p-4 border border-slate-800 mb-6 flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-sky-400 uppercase tracking-wider">{vehicle.category}</div>
                <div className="text-lg font-bold text-white">{vehicle.make} {vehicle.model}</div>
                <div className="text-xs text-slate-400 mt-0.5">{vehicle.year || '2024'} Model • In Stock: {vehicle.quantity}</div>
              </div>
              <div className="text-right">
                <div className="text-xs text-slate-500 font-semibold uppercase">Ex-Showroom</div>
                <div className="text-lg font-extrabold text-white">{formatPrice(basePrice)}</div>
              </div>
            </div>

            <div className="space-y-3 text-sm border-t border-b border-slate-800/80 py-4 mb-6">
              <div className="flex justify-between text-slate-400">
                <span>Ex-Showroom Price</span>
                <span className="font-semibold text-slate-200">{formatPrice(basePrice)}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Estimated GST & Cess (18%)</span>
                <span className="font-semibold text-slate-200">{formatPrice(estimatedTax)}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Registration & Handling</span>
                <span className="font-semibold text-slate-200">{formatPrice(registrationFee)}</span>
              </div>
              <div className="flex justify-between text-base font-extrabold text-white pt-2 border-t border-slate-800/60">
                <span>Total On-Road Price</span>
                <span className="text-sky-400">{formatPrice(totalPrice)}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={onClose}
                disabled={loading}
                className="w-1/3 py-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 font-semibold text-sm hover:bg-slate-800 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmPurchase}
                disabled={loading}
                className="w-2/3 py-3 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-bold text-sm shadow-lg shadow-sky-500/25 flex items-center justify-center gap-2 transition-all active:scale-[0.98] disabled:opacity-50"
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
