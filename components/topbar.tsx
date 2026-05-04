"use client"

import { Search, Bell, Globe, Sparkles } from "lucide-react"
import { LiquidButton } from "./liquid-button"

export function Topbar() {
  return (
    <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-white/60">
          <Sparkles className="h-3.5 w-3.5 text-amber-200" />
          <span>Lawizer Command Center</span>
        </div>
        <h1 className="font-serif text-3xl leading-tight text-white text-balance md:text-4xl">
          Welcome back, <span className="italic text-amber-100">Counsel</span>
        </h1>
        <p className="text-sm text-white/60">
          International business registration, lawyer matching and legal site bookings — all in one orbit.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="glass-input flex items-center gap-2 rounded-full px-4 py-2.5">
          <Search className="h-4 w-4 text-white/60" />
          <input
            type="text"
            placeholder="Search clients, jurisdictions..."
            className="w-48 bg-transparent text-sm text-white placeholder:text-white/40 focus:outline-none md:w-64"
          />
          <kbd className="hidden rounded-md border border-white/10 bg-white/5 px-1.5 py-0.5 font-mono text-[10px] text-white/50 md:inline-block">
            ⌘K
          </kbd>
        </div>

        <button
          aria-label="Notifications"
          className="glass-input relative grid h-11 w-11 place-items-center rounded-full text-white/80 transition hover:text-white"
        >
          <Bell className="h-4 w-4" />
          <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-amber-300 shadow-[0_0_8px_2px_rgba(252,211,77,0.7)]" />
        </button>

        <button
          aria-label="Region"
          className="glass-input grid h-11 w-11 place-items-center rounded-full text-white/80 transition hover:text-white"
        >
          <Globe className="h-4 w-4" />
        </button>

        <LiquidButton>New Registration</LiquidButton>

        <div className="glass-input flex items-center gap-3 rounded-full pl-1.5 pr-4 py-1.5">
          <div className="grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-amber-200 to-rose-300 font-serif text-xs font-semibold text-slate-900">
            AV
          </div>
          <div className="hidden flex-col leading-tight md:flex">
            <span className="text-sm font-medium text-white">Aria Vance</span>
            <span className="text-[10px] uppercase tracking-widest text-white/50">Managing Partner</span>
          </div>
        </div>
      </div>
    </header>
  )
}
