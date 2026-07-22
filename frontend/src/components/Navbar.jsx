import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { LogOut, User } from 'lucide-react'

export default function Navbar({ onOpenAuth }) {
  const { user, isStaff, logout } = useAuth()

  const handleLogout = () => {
    logout()
  }

  return (
    <header className="absolute top-0 left-0 right-0 z-40 w-full bg-transparent border-b border-white/[0.04] py-2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">

        {/* Left: logo icon (chevron mark) + site name */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white group-hover:border-white transition-all duration-300">
            <svg className="w-4 h-4 transform group-hover:translate-x-0.5 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </div>
          <span className="font-heading text-lg font-bold tracking-widest text-[#F5F3EF]">
            AUTO<span className="text-white font-light">VAULT</span>
          </span>
        </Link>

        {/* Right: existing nav links, restyled as small, evenly spaced, white/off-white text */}
        <div className="flex items-center gap-6">
          <nav className="hidden md:flex items-center gap-6 text-[11px] font-bold uppercase tracking-wider text-[#9A9A9A]">
            <a href="#inventory-section" className="hover:text-[#F5F3EF] transition-colors">Inventory</a>
            <a href="#categories-section" className="hover:text-[#F5F3EF] transition-colors">Categories</a>
            <a href="#hero-showcase" className="hover:text-[#F5F3EF] transition-colors">Showroom</a>
          </nav>

          {user ? (
            <div className="flex items-center gap-4">
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#9A9A9A] flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-[#D98A3D]" />
                <span className="text-[#F5F3EF]">
                  {user.username} {isStaff && <span className="text-[#D98A3D] font-bold">[ADMIN]</span>}
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="text-[11px] font-bold uppercase tracking-wider text-[#9A9A9A] hover:text-rose-400 flex items-center gap-1 transition-colors"
              >
                <LogOut className="w-3 h-3" />
                <span>Sign Out</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <button
                onClick={() => onOpenAuth && onOpenAuth('login')}
                className="text-[11px] font-bold uppercase tracking-wider text-[#9A9A9A] hover:text-[#F5F3EF] transition-colors"
              >
                Sign In
              </button>
              <button
                onClick={() => onOpenAuth && onOpenAuth('register')}
                className="text-[11px] font-bold uppercase tracking-wider text-[#9A9A9A] hover:text-[#F5F3EF] transition-colors"
              >
                Register
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
