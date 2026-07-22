import React, { useState } from 'react'
import { X, AlertCircle, PlusCircle, ArrowUpRight } from 'lucide-react'
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-fade-in">
      <div className="max-w-md w-full bg-[#151515] border border-white/[0.08] rounded-2xl p-8 relative shadow-2xl overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-[#0A0A0A] border border-white/[0.08] text-[#9A9A9A] hover:text-[#F5F3EF] transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-[#D98A3D]">
            <PlusCircle className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-heading text-xl font-bold text-[#F5F3EF]">Restock Reserve Stock</h2>
            <p className="text-xs text-[#9A9A9A]">Add units to {vehicle.make} {vehicle.model}</p>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-start gap-3 text-rose-300 text-xs">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-[#9A9A9A] mb-1.5">Quantity to Add *</label>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              required
              className="w-full bg-[#0A0A0A] border border-white/[0.08] rounded-xl px-4 py-3 text-[#F5F3EF] text-sm font-semibold focus:outline-none focus:border-[#D98A3D] focus:ring-1 focus:ring-[#D98A3D] transition-all"
            />
            <p className="text-xs text-[#9A9A9A] mt-2">Current Stock: <strong className="text-white">{vehicle.quantity}</strong> units</p>
          </div>

          <div className="flex items-center gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="w-1/3 py-3 rounded-full bg-[#0A0A0A] border border-white/[0.08] text-[#9A9A9A] font-semibold text-xs hover:text-[#F5F3EF] transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="w-2/3 py-3.5 btn-editorial-pill font-semibold text-xs rounded-full shadow-lg flex items-center justify-center gap-1.5 active:scale-[0.98] disabled:opacity-50"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-[#0A0A0A]/30 border-t-[#0A0A0A] rounded-full animate-spin" />
              ) : (
                <>
                  <span>Confirm Restock</span>
                  <ArrowUpRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
