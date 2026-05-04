"use client"

import { ArrowUpRight, ArrowDownRight, Users, Flame, Clock, Wallet } from "lucide-react"
import { kpis } from "@/lib/data"

const iconMap = {
  users: Users,
  flame: Flame,
  clock: Clock,
  wallet: Wallet,
}

export function KpiCards() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {kpis.map((k) => {
        const Icon = iconMap[k.icon as keyof typeof iconMap]
        const positive = k.delta >= 0
        return (
          <div
            key={k.label}
            className="glass-card group relative overflow-hidden rounded-3xl p-5"
          >
            {/* highlight ring */}
            <div className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 [background:radial-gradient(600px_circle_at_var(--x,50%)_var(--y,0%),rgba(255,255,255,0.08),transparent_40%)]" />

            <div className="flex items-start justify-between">
              <div className="flex flex-col gap-1">
                <span className="text-xs uppercase tracking-[0.25em] text-white/50">{k.label}</span>
                <span className="font-serif text-3xl text-white">{k.value}</span>
              </div>
              <div className="grid h-10 w-10 place-items-center rounded-2xl border border-white/10 bg-white/5 text-amber-100">
                <Icon className="h-4 w-4" />
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <div
                className={`flex items-center gap-1 rounded-full px-2 py-1 text-xs ${
                  positive ? "bg-emerald-300/10 text-emerald-200" : "bg-rose-300/10 text-rose-200"
                }`}
              >
                {positive ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                {Math.abs(k.delta)}%
              </div>
              <span className="text-[11px] text-white/40">vs last 30 days</span>
            </div>

            {/* sparkline */}
            <svg viewBox="0 0 120 32" className="mt-3 h-8 w-full">
              <defs>
                <linearGradient id={`grad-${k.label}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#fde68a" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#fde68a" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                d={k.spark}
                fill="none"
                stroke="rgba(253,230,138,0.9)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path d={`${k.spark} L 120 32 L 0 32 Z`} fill={`url(#grad-${k.label})`} opacity="0.6" />
            </svg>
          </div>
        )
      })}
    </div>
  )
}
