import React from 'react'

export default function App() {
  return (
    <div class="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4">
      <div class="max-w-md w-full bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center shadow-2xl">
        <h1 class="text-3xl font-extrabold bg-gradient-to-r from-sky-400 to-indigo-500 bg-clip-text text-transparent mb-2">
          Apex Auto System
        </h1>
        <p class="text-slate-400 text-sm mb-6">Car Dealership Inventory Application</p>
        <span class="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-full text-xs font-semibold">
          System Initialized
        </span>
      </div>
    </div>
  )
}
