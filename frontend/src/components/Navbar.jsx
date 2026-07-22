import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { User, LogOut, ChevronRight, Menu, X } from 'lucide-react'

export default function Navbar({ onOpenAuth }) {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [scrolled, setScrolled] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleLogout = () => {
    logout()
    setShowDropdown(false)
    navigate('/login')
  }

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-[#0A0A0A]/95 backdrop-blur-md border-b border-white/[0.08] py-4' 
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Monoline Chevron Shield Logo & Wordmark */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white group-hover:border-white transition-all duration-300">
            <ChevronRight className="w-4 h-4 transform group-hover:translate-x-0.5 transition-transform" />
          </div>
          <span className="font-heading text-lg font-bold tracking-widest text-[#F5F3EF]">
            AUTO<span className="text-white font-light">VAULT</span>
          </span>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-[11px] font-semibold uppercase tracking-widest text-[#9A9A9A]">
          <a href="#inventory-section" className="hover:text-[#F5F3EF] transition-colors">[ Pre-Owned ]</a>
          <a href="#categories-section" className="hover:text-[#F5F3EF] transition-colors">[ Categories ]</a>
          <a href="#hero-showcase" className="hover:text-[#F5F3EF] transition-colors">[ Showroom ]</a>
        </nav>

        {/* User Account Icon Trigger */}
        <div className="relative">
          {user ? (
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="w-9 h-9 rounded-full bg-[#111111] border border-white/[0.08] hover:border-white/20 text-[#F5F3EF] flex items-center justify-center transition-all"
                aria-label="User account"
              >
                <User className="w-4 h-4" />
              </button>

              {showDropdown && (
                <div className="absolute right-0 top-11 w-48 bg-[#151515] border border-white/[0.08] rounded-xl py-2 shadow-2xl z-50">
                  <div className="px-4 py-2 border-b border-white/[0.04]">
                    <div className="text-[10px] text-[#9A9A9A] uppercase tracking-wider font-semibold">Logged in as</div>
                    <div className="text-xs font-bold text-[#F5F3EF] truncate">{user.username}</div>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2.5 text-xs text-[#9A9A9A] hover:text-rose-400 hover:bg-white/[0.02] flex items-center gap-2 transition-all"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => onOpenAuth ? onOpenAuth('login') : navigate('/login')}
              className="w-9 h-9 rounded-full border border-white/20 hover:border-white text-[#F5F3EF] flex items-center justify-center transition-all"
              aria-label="Sign In"
            >
              <User className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </header>
  )
}
