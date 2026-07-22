import React, { useState } from 'react'
import { X, PlusCircle, AlertCircle } from 'lucide-react'
import axiosClient from '../api/axiosClient'

export default function RestockModal({ vehicle, onClose, onSuccess }) {
  const [quantity, setQuantity] = useState(5)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  if (!vehicle) return null

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    const qty = parseInt(quantity, 10)
    if (isNaN(qty) || qty <= 0) {
      setError('Restock quantity must be a positive integer.')
      return
    }

    setLoading(true)
    try {
      await axiosClient.post(`/vehicles/${vehicle.id}/restock/`, { quantity: qty })
      onSuccess()
      onClose()
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to restock vehicle.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="max-w-md w-full glass-panel rounded-3xl p-8 border border-slate-800 shadow-2xl relative z-10 overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <PlusCircle className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-white">Restock Inventory</h2>
            <p className="text-xs text-slate-400">Add stock units to {vehicle.make} {vehicle.model}</p>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-start gap-3 text-rose-400 text-sm">
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">Quantity to Add *</label>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              required
              className="w-full bg-slate-900/90 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 text-base font-semibold focus:outline-none focus:border-emerald-500"
            />
            <p className="text-xs text-slate-500 mt-1.5">Current Stock: <strong className="text-slate-300">{vehicle.quantity}</strong> units</p>
          </div>

          <div className="flex items-center gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="w-1/3 py-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 font-semibold text-sm hover:bg-slate-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="w-2/3 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-bold text-sm shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2 transition-all active:scale-[0.98] disabled:opacity-50"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <PlusCircle className="w-4 h-4" />
                  <span>Confirm Restock</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
