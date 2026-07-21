import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Car, LogOut, ShieldCheck, User, PlusCircle } from 'lucide-react'

export default function Navbar({ onOpenAddModal }) {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-slate-950/80 border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-11 h-11 bg-gradient-to-tr from-sky-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-md shadow-sky-500/20 group-hover:scale-105 transition-transform">
            <Car className="w-6 h-6 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-extrabold tracking-tight text-white group-hover:text-sky-400 transition-colors">
              Apex<span className="text-sky-400">Auto</span>
            </span>
            <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 -mt-1">
              Dealership Inventory
            </span>
          </div>
        </Link>

        {/* User Info & Actions */}
        <div className="flex items-center gap-4">
          {user ? (
            <>
              {user.is_staff && (
                <button
                  onClick={onOpenAddModal}
                  className="hidden sm:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white text-sm font-semibold rounded-xl shadow-md shadow-sky-500/20 transition-all active:scale-95"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>Add Vehicle</span>
                </button>
              )}

              <div className="flex items-center gap-3 bg-slate-900/90 border border-slate-800 rounded-2xl px-3.5 py-1.5">
                <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-sky-400">
                  <User className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-semibold text-slate-200">{user.username}</span>
                  <span className="flex items-center gap-1 text-[10px] text-slate-400 font-medium">
                    {user.is_staff ? (
                      <span className="text-indigo-400 font-bold flex items-center gap-0.5">
                        <ShieldCheck className="w-3 h-3" /> Admin
                      </span>
                    ) : (
                      'Customer'
                    )}
                  </span>
                </div>
              </div>

              <button
                onClick={handleLogout}
                title="Sign out"
                className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-rose-400 hover:border-rose-500/30 hover:bg-rose-500/10 transition-all"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                to="/login"
                className="text-sm font-semibold text-slate-300 hover:text-white px-3 py-2 transition-colors"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-sm rounded-xl transition-all shadow-md shadow-sky-500/20"
              >
                Get Started
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
