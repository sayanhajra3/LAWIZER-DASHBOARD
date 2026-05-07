"use client"

import { Search, Bell, MessageCircle, ShieldCheck } from "lucide-react"
import { LiquidButton } from "./liquid-button"
import { client } from "@/lib/data"

export function Topbar() {
  return (
    <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.3em] text-white/55">
          <ShieldCheck className="h-3.5 w-3.5 text-amber-200" />
          <span>Lawizer Client Portal</span>
        </div>
        <h1 className="font-serif text-3xl leading-tight text-white text-balance md:text-4xl">
          My Services
        </h1>
        <p className="max-w-xl text-sm text-white/60">
          Track all your active and completed filings in one place. Click any service card to see the full step-by-step progress.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="glass-input flex items-center gap-2 rounded-full px-4 py-2.5">
          <Search className="h-4 w-4 text-white/60" />
          <input
            type="text"
            placeholder="Search services, documents..."
            aria-label="Search"
            className="w-48 bg-transparent text-sm text-white placeholder:text-white/40 focus:outline-none md:w-56"
          />
        </div>

        <button
          aria-label="Notifications"
          className="glass-input relative grid h-11 w-11 place-items-center rounded-full text-white/80 transition hover:text-white"
        >
          <Bell className="h-4 w-4" />
          <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-amber-300 shadow-[0_0_8px_2px_rgba(252,211,77,0.7)]" />
        </button>

        <LiquidButton>
          <MessageCircle className="h-4 w-4" />
          Talk to Expert
        </LiquidButton>

        <div className="glass-input hidden items-center gap-3 rounded-full py-1.5 pl-1.5 pr-4 md:flex">
          <div className="grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-amber-200 to-rose-300 font-serif text-xs font-semibold text-[#1a1230]">
            {client.avatarInitials}
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-medium text-white">{client.name}</span>
            <span className="text-[10px] uppercase tracking-widest text-white/50">
              {client.clientId}
            </span>
          </div>
        </div>
      </div>
    </header>
  )
}
