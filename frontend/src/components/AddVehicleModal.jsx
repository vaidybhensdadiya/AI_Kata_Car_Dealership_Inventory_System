import React, { useState } from 'react'
import { X, PlusCircle, AlertCircle, Car } from 'lucide-react'
import axiosClient from '../api/axiosClient'

export default function AddVehicleModal({ onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    make: '',
    model: '',
    year: new Date().getFullYear(),
    price: '',
    quantity: 1,
    category: 'Sedan',
    image_url: '',
    description: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!formData.make || !formData.model || !formData.price) {
      setError('Make, Model, and Price are required fields.')
      return
    }

    if (parseFloat(formData.price) <= 0) {
      setError('Price must be a positive number.')
      return
    }

    setLoading(true)
    try {
      await axiosClient.post('/vehicles/', {
        ...formData,
        price: parseFloat(formData.price),
        quantity: parseInt(formData.quantity, 10),
        year: parseInt(formData.year, 10)
      })
      onSuccess()
      onClose()
    } catch (err) {
      const resp = err.response?.data
      if (resp && typeof resp === 'object') {
        const firstKey = Object.keys(resp)[0]
        setError(`${firstKey}: ${resp[firstKey][0]}`)
      } else {
        setError('Failed to create vehicle.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
      <div className="max-w-xl w-full modal-glass rounded-2xl p-8 relative shadow-2xl overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-xl bg-[#141A22] border border-white/[0.08] text-[#94A3B8] hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-[#3B82F6]/10 border border-[#3B82F6]/30 flex items-center justify-center text-[#3B82F6]">
            <Car className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-heading text-xl font-bold text-white">Add New Reserve Vehicle</h2>
            <p className="text-xs text-[#94A3B8]">Create a new dealership inventory listing</p>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-start gap-3 text-rose-300 text-xs">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#94A3B8] mb-1.5">Make *</label>
              <input
                type="text"
                name="make"
                value={formData.make}
                onChange={handleChange}
                placeholder="e.g. Porsche"
                required
                className="w-full bg-[#141A22] border border-white/[0.08] rounded-xl px-3.5 py-2.5 text-sm text-[#F8FAFC] focus:outline-none focus:border-[#3B82F6]"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#94A3B8] mb-1.5">Model *</label>
              <input
                type="text"
                name="model"
                value={formData.model}
                onChange={handleChange}
                placeholder="e.g. 911 GT3"
                required
                className="w-full bg-[#141A22] border border-white/[0.08] rounded-xl px-3.5 py-2.5 text-sm text-[#F8FAFC] focus:outline-none focus:border-[#3B82F6]"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#94A3B8] mb-1.5">Category *</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full bg-[#141A22] border border-white/[0.08] rounded-xl px-3.5 py-2.5 text-sm text-[#F8FAFC] focus:outline-none focus:border-[#3B82F6]"
              >
                <option value="Sedan">Sedan</option>
                <option value="SUV">SUV</option>
                <option value="Truck">Truck</option>
                <option value="Coupe">Coupe</option>
                <option value="Convertible">Convertible</option>
                <option value="Hatchback">Hatchback</option>
              </select>
            </div>
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#94A3B8] mb-1.5">Year *</label>
              <input
                type="number"
                name="year"
                value={formData.year}
                onChange={handleChange}
                placeholder="2024"
                required
                className="w-full bg-[#141A22] border border-white/[0.08] rounded-xl px-3.5 py-2.5 text-sm text-[#F8FAFC] focus:outline-none focus:border-[#3B82F6]"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#94A3B8] mb-1.5">Quantity *</label>
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                min="0"
                required
                className="w-full bg-[#141A22] border border-white/[0.08] rounded-xl px-3.5 py-2.5 text-sm text-[#F8FAFC] focus:outline-none focus:border-[#3B82F6]"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#94A3B8] mb-1.5">Price (₹ INR MSRP) *</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="e.g. 15000000"
              required
              className="w-full bg-[#141A22] border border-white/[0.08] rounded-xl px-3.5 py-2.5 text-sm text-[#F8FAFC] focus:outline-none focus:border-[#3B82F6]"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#94A3B8] mb-1.5">Image URL</label>
            <input
              type="url"
              name="image_url"
              value={formData.image_url}
              onChange={handleChange}
              placeholder="https://images.unsplash.com/..."
              className="w-full bg-[#141A22] border border-white/[0.08] rounded-xl px-3.5 py-2.5 text-sm text-[#F8FAFC] focus:outline-none focus:border-[#3B82F6]"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#94A3B8] mb-1.5">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="2"
              placeholder="Enter vehicle specification highlights..."
              className="w-full bg-[#141A22] border border-white/[0.08] rounded-xl px-3.5 py-2.5 text-sm text-[#F8FAFC] focus:outline-none focus:border-[#3B82F6]"
            />
          </div>

          <div className="flex items-center gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="w-1/3 py-3 rounded-xl bg-[#141A22] border border-white/[0.08] text-[#CBD5E1] font-semibold text-sm hover:bg-[#1A212C] transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="w-2/3 py-3 btn-blue font-semibold text-sm rounded-xl shadow-lg flex items-center justify-center gap-2 active:scale-[0.98] disabled:opacity-50"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <PlusCircle className="w-4 h-4" />
                  <span>Create Vehicle</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
