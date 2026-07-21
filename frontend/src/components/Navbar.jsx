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
    <header className="sticky top-0 z-40 w-full steel-glass">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/" class="flex items-center gap-3.5 group">
          <div class="w-10 h-10 rounded-xl bg-[#E63946]/10 border border-[#E63946]/30 flex items-center justify-center text-[#E63946] group-hover:bg-[#E63946] group-hover:text-white transition-all duration-300 shadow-md">
            <Shield class="w-5 h-5" />
          </div>
          <div class="flex flex-col">
            <span class="font-heading text-xl font-bold tracking-tight text-white flex items-center gap-1">
              Auto<span class="text-[#E63946]">Vault</span>
            </span>
            <span class="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#94A3B8] -mt-1">
              Smart Inventory System
            </span>
          </div>
        </Link>

        {/* Navigation & User Profile */}
        <div class="flex items-center gap-3">
          {user ? (
            <div class="flex items-center gap-3">
              <div class="px-4 py-2 rounded-xl bg-[#171A21] border border-white/[0.08] text-xs text-[#CBD5E1] flex items-center gap-2">
                <User class="w-3.5 h-3.5 text-[#E63946]" />
                <span>
                  {user.username}{' '}
                  {isStaff ? (
                    <strong class="text-[#E63946] font-semibold">(Admin)</strong>
                  ) : (
                    <span class="text-[#94A3B8]">(Member)</span>
                  )}
                </span>
              </div>
              <button
                onClick={handleLogout}
                class="px-4 py-2 rounded-xl bg-[#171A21] border border-white/[0.08] text-[#94A3B8] hover:text-rose-400 text-xs font-semibold flex items-center gap-1.5 transition-all"
              >
                <LogOut class="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            </div>
          ) : (
            <div class="flex items-center gap-3">
              <Link
                to="/login"
                class="px-4 py-2 rounded-xl bg-[#171A21] border border-white/[0.08] text-[#CBD5E1] hover:text-white text-xs font-semibold transition-all"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                class="px-4 py-2 rounded-xl btn-racing font-semibold text-xs shadow-md"
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
