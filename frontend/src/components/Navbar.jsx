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
    <header className="sticky top-0 z-40 w-full vault-glass">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">

        <!-- Sleek Automotive Logo -->
        <Link to="/" className="flex items-center gap-3.5 group">
          <div className="w-10 h-10 rounded-xl bg-[#3B82F6]/10 border border-[#3B82F6]/30 flex items-center justify-center text-[#3B82F6] group-hover:bg-[#3B82F6] group-hover:text-white transition-all duration-300 shadow-md">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2L3 7v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-5.45 9-12V7l-9-5z" />
              <path d="M7 15l5-7 5 7M9 13h6" />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="font-heading text-xl font-bold tracking-tight text-white flex items-center gap-1">
              Auto<span className="text-[#3B82F6]">Vault</span>
            </span>
            <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#94A3B8] -mt-1">
              Luxury Automotive Reserve
            </span>
          </div>
        </Link>

        <!-- Navigation Links & User Controls -->
        <div className="flex items-center gap-4">
          <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-[#CBD5E1]">
            <a href="#inventory-section" className="hover:text-white transition-colors">Inventory</a>
            <a href="#categories-section" className="hover:text-white transition-colors">Categories</a>
            <a href="#hero-showcase" className="hover:text-white transition-colors">Showroom</a>
          </nav>

          {user ? (
            <div className="flex items-center gap-3">
              <div className="px-4 py-2 rounded-xl bg-[#141A22] border border-white/[0.08] text-xs text-[#CBD5E1] flex items-center gap-2">
                <User className="w-3.5 h-3.5 text-[#3B82F6]" />
                <span>
                  {user.username}{' '}
                  {isStaff ? (
                    <strong className="text-[#3B82F6] font-semibold">(Admin)</strong>
                  ) : (
                    <span className="text-[#94A3B8]">(Member)</span>
                  )}
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-xl bg-[#141A22] border border-white/[0.08] text-[#94A3B8] hover:text-rose-400 text-xs font-semibold flex items-center gap-1.5 transition-all"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                to="/login"
                className="px-4 py-2 rounded-xl bg-[#141A22] border border-white/[0.08] text-[#CBD5E1] hover:text-white text-xs font-semibold transition-all"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 rounded-xl btn-blue font-semibold text-xs shadow-md"
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
