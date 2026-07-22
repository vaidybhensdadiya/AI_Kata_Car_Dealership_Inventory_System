import React, { useState } from 'react'
import { X, User, Mail, Lock, AlertCircle, ArrowUpRight } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

export default function AuthModal({ isOpen, onClose, initialMode = 'login', onSuccess }) {
  const [mode, setMode] = useState(initialMode)
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const { login, register, loading } = useAuth()

  if (!isOpen) return null

  const handleToggleMode = () => {
    setErrorMessage('')
    setMode(mode === 'login' ? 'register' : 'login')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrorMessage('')

    if (mode === 'login') {
      if (!username || !password) {
        setErrorMessage('Username and password are required.')
        return
      }
      const result = await login(username, password)
      if (result.success) {
        if (onSuccess) onSuccess()
        onClose()
      } else {
        setErrorMessage(result.error)
      }
    } else {
      if (!username || !email || !password) {
        setErrorMessage('All fields are required.')
        return
      }
      const result = await register({ username, email, password })
      if (result.success) {
        // Auto authenticate on success
        const loginResult = await login(username, password)
        if (loginResult.success) {
          if (onSuccess) onSuccess()
          onClose()
        } else {
          setErrorMessage('Account created, but auto-login failed. Please sign in.')
          setMode('login')
        }
      } else {
        setErrorMessage(result.error)
      }
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="max-w-md w-full bg-[#151515] border border-white/[0.08] rounded-2xl p-8 relative shadow-2xl overflow-hidden">
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-[#0A0A0A] border border-white/[0.08] text-[#9A9A9A] hover:text-[#F5F3EF] transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="flex flex-col items-center text-center mb-6">
          <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white mb-3">
            <span className="text-xs font-bold tracking-widest">AV</span>
          </div>
          <h2 className="font-heading text-2xl font-bold tracking-tight text-[#F5F3EF]">
            {mode === 'login' ? 'Portal Authentication' : 'Create Reserve Account'}
          </h2>
          <p className="text-[#9A9A9A] text-xs mt-1">
            {mode === 'login' ? 'Access your AutoVault reserve inventory' : 'Register for immediate reserve access'}
          </p>
        </div>

        {/* Error messaging */}
        {errorMessage && (
          <div className="mb-5 p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-start gap-3 text-rose-300 text-xs">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-[#9A9A9A] mb-1.5">Username</label>
            <div className="relative">
              <User className="w-4 h-4 text-[#9A9A9A] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                required
                className="w-full bg-[#0A0A0A] border border-white/[0.08] rounded-xl pl-10 pr-4 py-3 text-xs text-[#F5F3EF] placeholder-[#9A9A9A] focus:outline-none focus:border-[#D98A3D] focus:ring-1 focus:ring-[#D98A3D] transition-all"
              />
            </div>
          </div>

          {mode === 'register' && (
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-[#9A9A9A] mb-1.5">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#9A9A9A] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  required
                  className="w-full bg-[#0A0A0A] border border-white/[0.08] rounded-xl pl-10 pr-4 py-3 text-xs text-[#F5F3EF] placeholder-[#9A9A9A] focus:outline-none focus:border-[#D98A3D] focus:ring-1 focus:ring-[#D98A3D] transition-all"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-[#9A9A9A] mb-1.5">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#9A9A9A] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full bg-[#0A0A0A] border border-white/[0.08] rounded-xl pl-10 pr-4 py-3 text-xs text-[#F5F3EF] placeholder-[#9A9A9A] focus:outline-none focus:border-[#D98A3D] focus:ring-1 focus:ring-[#D98A3D] transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-[#F5F3EF] hover:bg-white text-[#0A0A0A] text-xs font-bold rounded-full shadow-lg flex items-center justify-center gap-1.5 transition-all duration-300 transform active:scale-95 disabled:opacity-50"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-[#0A0A0A]/30 border-t-[#0A0A0A] rounded-full animate-spin" />
            ) : (
              <>
                <span>{mode === 'login' ? 'Sign In to AutoVault' : 'Register & Access'}</span>
                <ArrowUpRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Footer Toggle */}
        <div className="mt-6 pt-5 border-t border-white/[0.04] text-center">
          <button
            onClick={handleToggleMode}
            className="text-xs text-[#9A9A9A] hover:text-[#F5F3EF] transition-colors"
          >
            {mode === 'login' ? (
              <>
                New user? <span className="text-[#D98A3D] font-semibold hover:underline">Register account</span>
              </>
            ) : (
              <>
                Already registered? <span className="text-[#D98A3D] font-semibold hover:underline">Sign in</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
