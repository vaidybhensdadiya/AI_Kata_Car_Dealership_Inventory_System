import React, { useState } from 'react'
import { X, AlertCircle, Car, ArrowUpRight } from 'lucide-react'
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-fade-in">
      <div className="max-w-xl w-full bg-[#151515] border border-white/[0.08] rounded-2xl p-8 relative shadow-2xl overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-[#0A0A0A] border border-white/[0.08] text-[#9A9A9A] hover:text-[#F5F3EF] transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-[#D98A3D]">
            <Car className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-heading text-xl font-bold text-[#F5F3EF]">Add Reserve Vehicle</h2>
            <p className="text-xs text-[#9A9A9A]">Publish a new model to reserve showroom</p>
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
              <label className="block text-[10px] font-bold uppercase tracking-wider text-[#9A9A9A] mb-1.5">Make / Brand *</label>
              <input
                type="text"
                name="make"
                value={formData.make}
                onChange={handleChange}
                placeholder="e.g. Porsche"
                required
                className="w-full bg-[#0A0A0A] border border-white/[0.08] rounded-xl px-3.5 py-2.5 text-sm text-[#F5F3EF] focus:outline-none focus:border-[#D98A3D] focus:ring-1 focus:ring-[#D98A3D] transition-all"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-[#9A9A9A] mb-1.5">Model Name *</label>
              <input
                type="text"
                name="model"
                value={formData.model}
                onChange={handleChange}
                placeholder="e.g. 911 GT3"
                required
                className="w-full bg-[#0A0A0A] border border-white/[0.08] rounded-xl px-3.5 py-2.5 text-sm text-[#F5F3EF] focus:outline-none focus:border-[#D98A3D] focus:ring-1 focus:ring-[#D98A3D] transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-[#9A9A9A] mb-1.5">Classification *</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full bg-[#0A0A0A] border border-white/[0.08] rounded-xl px-3.5 py-2.5 text-sm text-[#F5F3EF] focus:outline-none focus:border-[#D98A3D] focus:ring-1 focus:ring-[#D98A3D] transition-all appearance-none"
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
              <label className="block text-[10px] font-bold uppercase tracking-wider text-[#9A9A9A] mb-1.5">Release Year *</label>
              <input
                type="number"
                name="year"
                value={formData.year}
                onChange={handleChange}
                placeholder="2024"
                required
                className="w-full bg-[#0A0A0A] border border-white/[0.08] rounded-xl px-3.5 py-2.5 text-sm text-[#F5F3EF] focus:outline-none focus:border-[#D98A3D] focus:ring-1 focus:ring-[#D98A3D] transition-all"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-[#9A9A9A] mb-1.5">Quantity *</label>
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                min="0"
                required
                className="w-full bg-[#0A0A0A] border border-white/[0.08] rounded-xl px-3.5 py-2.5 text-sm text-[#F5F3EF] focus:outline-none focus:border-[#D98A3D] focus:ring-1 focus:ring-[#D98A3D] transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-[#9A9A9A] mb-1.5">Price (₹ INR MSRP) *</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="e.g. 15000000"
              required
              className="w-full bg-[#0A0A0A] border border-white/[0.08] rounded-xl px-3.5 py-2.5 text-sm text-[#F5F3EF] focus:outline-none focus:border-[#D98A3D] focus:ring-1 focus:ring-[#D98A3D] transition-all"
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-[#9A9A9A] mb-1.5">Showcase Image URL</label>
            <input
              type="url"
              name="image_url"
              value={formData.image_url}
              onChange={handleChange}
              placeholder="https://images.unsplash.com/..."
              className="w-full bg-[#0A0A0A] border border-white/[0.08] rounded-xl px-3.5 py-2.5 text-sm text-[#F5F3EF] focus:outline-none focus:border-[#D98A3D] focus:ring-1 focus:ring-[#D98A3D] transition-all"
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-[#9A9A9A] mb-1.5">Description Specification</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="2"
              placeholder="Enter model highlights..."
              className="w-full bg-[#0A0A0A] border border-white/[0.08] rounded-xl px-3.5 py-2.5 text-sm text-[#F5F3EF] focus:outline-none focus:border-[#D98A3D] focus:ring-1 focus:ring-[#D98A3D] transition-all"
            />
          </div>

          <div className="flex items-center gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="w-1/3 py-3 rounded-full bg-[#0A0A0A] border border-white/[0.08] text-[#9A9A9A] font-semibold text-sm hover:text-[#F5F3EF] transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="w-2/3 py-3.5 btn-editorial-pill font-semibold text-sm rounded-full shadow-lg flex items-center justify-center gap-1.5 active:scale-[0.98] disabled:opacity-50"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-[#0A0A0A]/30 border-t-[#0A0A0A] rounded-full animate-spin" />
              ) : (
                <>
                  <span>Create Vehicle</span>
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
