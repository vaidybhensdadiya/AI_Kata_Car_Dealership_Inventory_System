import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Lock, User, AlertCircle, ArrowRight } from 'lucide-react'

export default function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const { login, loading } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrorMessage('')
    if (!username || !password) {
      setErrorMessage('Please enter both username and password.')
      return
    }

    const result = await login(username, password)
    if (result.success) {
      navigate('/')
    } else {
      setErrorMessage(result.error)
    }
  }

  return (
    <div className="min-h-screen bg-[#0B0F14] text-[#F8FAFC] relative flex items-center justify-center lg:justify-start px-4 sm:px-8 lg:px-20 overflow-hidden">
      {/* Left: Floating Form Card */}
      <div className="z-10 w-full max-w-md py-12">
        <div className="vault-card p-8 sm:p-10 shadow-2xl relative border border-white/[0.08] bg-[#1A212C]/90 backdrop-blur-xl">
          <div className="flex flex-col items-center text-center mb-8">
            <div className="w-14 h-14 bg-[#3B82F6]/10 border border-[#3B82F6]/30 text-[#3B82F6] rounded-xl flex items-center justify-center mb-4 shadow-md">
              <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L3 7v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-5.45 9-12V7l-9-5z"/>
                <path d="M7 15l5-7 5 7M9 13h6"/>
              </svg>
            </div>
            <h1 className="font-heading text-3xl font-bold text-white tracking-tight">
              Auto<span className="text-[#3B82F6]">Vault</span>
            </h1>
            <p className="text-[#94A3B8] text-xs mt-1.5">Sign in to access your reserve portal</p>
          </div>

          {errorMessage && (
            <div className="mb-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-start gap-3 text-rose-300 text-xs">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#94A3B8] mb-2">Username</label>
              <div className="relative">
                <User className="w-4 h-4 text-[#94A3B8] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter username"
                  className="w-full bg-[#141A22] border border-white/[0.08] rounded-xl pl-10 pr-4 py-3 text-sm text-[#F8FAFC] placeholder-[#94A3B8] focus:outline-none focus:border-[#3B82F6] transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#94A3B8] mb-2">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#94A3B8] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-[#141A22] border border-white/[0.08] rounded-xl pl-10 pr-4 py-3 text-sm text-[#F8FAFC] placeholder-[#94A3B8] focus:outline-none focus:border-[#3B82F6] transition-all"
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
                  <span>Sign In to AutoVault</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-white/[0.08] text-center">
            <p className="text-[#94A3B8] text-xs">
              Don't have an account?{' '}
              <Link to="/register" className="text-[#3B82F6] hover:underline font-semibold transition-colors">
                Register account
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right: Seamless Blended Dark Car Showcase Background */}
      <div className="hidden lg:block absolute right-0 top-0 bottom-0 w-3/5 pointer-events-none overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=1600&q=80"
          alt="AutoVault Luxury Reserve"
          className="w-full h-full object-cover object-center opacity-90 scale-105"
        />
        {/* Soft Radial & Multi-Directional Gradient Fades for Seamless Merging */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B0F14] via-[#0B0F14]/50 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F14] via-transparent to-[#0B0F14]"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B0F14]/70 via-transparent to-[#0B0F14]/90"></div>
      </div>
    </div>
  )
}
