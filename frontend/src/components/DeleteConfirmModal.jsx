import React, { useState } from 'react'
import { X, Trash2, AlertTriangle } from 'lucide-react'
import axiosClient from '../api/axiosClient'

export default function DeleteConfirmModal({ vehicle, onClose, onSuccess }) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  if (!vehicle) return null

  const handleDelete = async () => {
    setLoading(true)
    setError('')
    try {
      await axiosClient.delete(`/vehicles/${vehicle.id}/`)
      onSuccess()
      onClose()
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to delete vehicle listing.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
      <div className="max-w-md w-full modal-glass rounded-2xl p-8 relative shadow-2xl overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-xl bg-[#141A22] border border-white/[0.08] text-[#94A3B8] hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-500">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-heading text-xl font-bold text-white">Delete Vehicle Listing?</h2>
            <p className="text-xs text-[#94A3B8]">This action is permanent and cannot be undone</p>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-start gap-3 text-rose-300 text-xs">
            <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <div className="bg-[#141A22] rounded-xl p-4 border border-white/[0.08] mb-6">
          <div className="text-sm font-bold text-white">{vehicle.make} {vehicle.model} ({vehicle.year})</div>
          <div className="text-xs text-[#94A3B8] mt-1">Category: {vehicle.category} • Current Stock: {vehicle.quantity}</div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onClose}
            disabled={loading}
            className="w-1/2 py-3 rounded-xl bg-[#141A22] border border-white/[0.08] text-[#CBD5E1] font-semibold text-xs hover:bg-[#1A212C] transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            disabled={loading}
            className="w-1/2 py-3 btn-danger font-semibold text-xs shadow-lg flex items-center justify-center gap-2 active:scale-[0.98] disabled:opacity-50"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <Trash2 className="w-4 h-4" />
                <span>Delete Listing</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
