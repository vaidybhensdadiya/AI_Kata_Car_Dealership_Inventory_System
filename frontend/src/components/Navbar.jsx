import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Shield, LogOut, User } from 'lucide-react'

export default function Navbar() {
  const { user, isStaff, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-2xl bg-slate-950/85 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-3.5 group">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-amber-500/20 via-amber-500/10 to-transparent border border-amber-500/40 flex items-center justify-center text-amber-400 group-hover:scale-105 transition-all duration-300 shadow-lg shadow-amber-500/5">
            <Shield className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="font-display text-xl font-bold tracking-tight text-white flex items-center gap-1">
              Auto<span className="text-amber-400 font-black">Vault</span>
            </span>
            <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-slate-400 -mt-1">
              Luxury Automotive Reserve
            </span>
          </div>
        </Link>

        {/* User Account Controls */}
        <div className="flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-3">
              <div className="px-4 py-2 rounded-2xl bg-slate-900 border border-white/10 text-xs text-slate-300 flex items-center gap-2">
                <User className="w-3.5 h-3.5 text-amber-400" />
                <span>
                  {user.username}{' '}
                  {isStaff ? (
                    <strong class="text-amber-400 font-bold">(Admin)</strong>
                  ) : (
                    <span className="text-slate-400">(Member)</span>
                  )}
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-2xl bg-slate-900 border border-white/10 text-slate-400 hover:text-rose-400 text-xs font-semibold flex items-center gap-1.5 transition-all"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                to="/login"
                className="px-4 py-2 rounded-2xl bg-slate-900 border border-white/10 text-slate-300 hover:text-white text-xs font-semibold transition-all"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20 transition-all"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
