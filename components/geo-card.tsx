"use client"

import { geoBreakdown } from "@/lib/data"

export function GeoCard() {
  const max = Math.max(...geoBreakdown.map((g) => g.clients))
  return (
    <div className="glass-card flex h-full flex-col gap-4 rounded-3xl p-5">
      <div className="flex items-start justify-between">
        <div>
          <div className="text-xs uppercase tracking-[0.3em] text-white/50">Global Demand</div>
          <h3 className="mt-1 font-serif text-2xl text-white">Top Jurisdictions</h3>
        </div>
        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] uppercase tracking-widest text-white/55">
          Live
        </span>
      </div>

      <div className="flex flex-col gap-3">
        {geoBreakdown.map((g) => (
          <div key={g.country} className="flex items-center gap-3">
            <span className="w-6 text-base">{g.flag}</span>
            <div className="flex-1">
              <div className="flex items-center justify-between text-xs">
                <span className="text-white/80">{g.country}</span>
                <span className="text-white/50">{g.clients} clients</span>
              </div>
              <div className="relative mt-1 h-1.5 overflow-hidden rounded-full bg-white/5">
                <div
                  className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-amber-200 via-rose-300 to-fuchsia-400"
                  style={{ width: `${(g.clients / max) * 100}%` }}
                />
              </div>
            </div>
            <span className="w-12 text-right text-xs text-white/55">${g.revenue}k</span>
          </div>
        ))}
      </div>
    </div>
  )
}
