import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { User, Mail, Lock, AlertCircle, ArrowRight } from 'lucide-react'

export default function RegisterPage() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const { register, loading } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrorMessage('')

    if (!username || !email || !password) {
      setErrorMessage('Username, email, and password are required.')
      return
    }

    const result = await register(username, email, password)
    if (result.success) {
      navigate('/')
    } else {
      setErrorMessage(result.error)
    }
  }

  return (
    <div className="min-h-screen bg-[#0B0F14] text-[#F8FAFC] flex flex-col">
      {/* Sticky Header */}
      <header className="w-full bg-[#0B0F14] border-b border-white/[0.04]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#3B82F6]/10 border border-[#3B82F6]/30 flex items-center justify-center text-[#3B82F6]">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="M12 2L3 7v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-5.45 9-12V7l-9-5z"/>
                <path d="M7 15l5-7 5 7M9 13h6"/>
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="font-heading text-lg font-bold tracking-tight text-white flex items-center gap-1">
                Auto<span className="text-[#3B82F6]">Vault</span>
              </span>
              <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#94A3B8] -mt-1">
                Luxury Automotive Reserve
              </span>
            </div>
          </div>
          <span className="text-xs font-semibold text-[#94A3B8]">AutoVault Guest</span>
        </div>
      </header>

      {/* Main Dual-Column Content */}
      <div className="flex-1 flex flex-col md:flex-row">
        
        {/* Left Side: Form Container */}
        <div className="flex-1 flex items-center justify-center p-6 sm:p-12 md:w-1/2 lg:w-2/5 bg-[#0B0F14]">
          <div className="max-w-md w-full bg-[#141A22] border border-white/[0.08] rounded-2xl p-8 sm:p-10 shadow-2xl relative">
            <div className="flex flex-col items-center text-center mb-6">
              <div className="w-12 h-12 bg-[#3B82F6]/10 border border-[#3B82F6]/30 text-[#3B82F6] rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <path d="M12 2L3 7v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-5.45 9-12V7l-9-5z"/>
                  <path d="M7 15l5-7 5 7M9 13h6"/>
                </svg>
              </div>
              <h1 className="font-heading text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Create Account
              </h1>
              <p className="text-[#94A3B8] text-xs mt-2">Join AutoVault for immediate inventory access</p>
            </div>

            {errorMessage && (
              <div className="mb-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-start gap-3 text-rose-300 text-xs">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-[#94A3B8] mb-1.5">Username *</label>
                <div className="relative">
                  <User className="w-4 h-4 text-[#94A3B8] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Choose username"
                    required
                    className="w-full bg-[#1A212C] border border-white/[0.08] rounded-xl pl-10 pr-4 py-3 text-sm text-[#F8FAFC] placeholder-[#94A3B8] focus:outline-none focus:border-[#3B82F6] transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-[#94A3B8] mb-1.5">Email *</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-[#94A3B8] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    required
                    className="w-full bg-[#1A212C] border border-white/[0.08] rounded-xl pl-10 pr-4 py-3 text-sm text-[#F8FAFC] placeholder-[#94A3B8] focus:outline-none focus:border-[#3B82F6] transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-[#94A3B8] mb-1.5">Password *</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-[#94A3B8] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Minimum 6 characters"
                    required
                    className="w-full bg-[#1A212C] border border-white/[0.08] rounded-xl pl-10 pr-4 py-3 text-sm text-[#F8FAFC] placeholder-[#94A3B8] focus:outline-none focus:border-[#3B82F6] transition-all"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 btn-blue text-sm font-semibold rounded-xl shadow-lg flex items-center justify-center gap-2 active:scale-[0.98] disabled:opacity-50"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Register & Access</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-8 pt-6 border-t border-white/[0.08] text-center">
              <p className="text-[#94A3B8] text-xs">
                Already registered?{' '}
                <Link to="/login" className="text-[#3B82F6] hover:underline font-semibold transition-colors">
                  Sign in to account
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Right Side: Showcase Image with Left Fade Gradient */}
        <div className="hidden md:flex md:w-1/2 lg:w-3/5 relative overflow-hidden bg-[#0B0F14]">
          <img
            src="https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1200&q=80"
            alt="Porsche 911 GT3 RS on Snowy Mountain Pass"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent via-[#0B0F14]/25 to-[#0B0F14]" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F14] via-transparent to-[#0B0F14]/20" />
        </div>

      </div>
    </div>
  )
}
