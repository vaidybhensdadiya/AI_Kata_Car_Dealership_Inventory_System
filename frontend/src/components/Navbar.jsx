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
    <header className="sticky top-0 z-40 w-full bg-[#0A0A0A]/85 backdrop-blur-md border-b border-white/[0.08] py-2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">

        {/* Restore Original Logo but with Amber Theme Colors */}
        <Link to="/" className="flex items-center gap-3.5 group">
          <div className="w-10 h-10 rounded-xl bg-[#D98A3D]/10 border border-[#D98A3D]/30 flex items-center justify-center text-[#D98A3D] group-hover:bg-[#D98A3D] group-hover:text-white transition-all duration-300 shadow-md">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 2L3 7v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-5.45 9-12V7l-9-5z" />
              <path d="M7 15l5-7 5 7M9 13h6" />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="font-heading text-xl font-bold tracking-tight text-white flex items-center gap-1">
              Auto<span class="text-[#D98A3D]">Vault</span>
            </span>
            <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#9A9A9A] -mt-1">
              Luxury Automotive Reserve
            </span>
          </div>
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
              <div className="px-4 py-2 rounded-xl bg-[#151515] border border-white/[0.08] text-xs text-[#F5F3EF] flex items-center gap-2">
                <User className="w-3.5 h-3.5 text-[#D98A3D]" />
                <span>
                  {user.username} {isStaff && <span className="text-[#D98A3D] font-bold">[ADMIN]</span>}
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-xl bg-[#151515] border border-white/[0.08] text-[#9A9A9A] hover:text-rose-400 text-xs font-semibold flex items-center gap-1.5 transition-all"
              >
                <LogOut className="w-3.5 h-3.5" />
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
                className="px-4 py-2 rounded-xl bg-[#F5F3EF] hover:bg-white text-[#0A0A0A] font-bold text-xs shadow-md transition-all"
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
