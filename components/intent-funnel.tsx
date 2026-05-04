"use client"

import { intentDistribution, followupBuckets } from "@/lib/data"
import { Flame } from "lucide-react"

export function IntentFunnel() {
  return (
    <div className="glass-card flex h-full flex-col gap-5 rounded-3xl p-5">
      <div className="flex items-start justify-between">
        <div>
          <div className="text-xs uppercase tracking-[0.3em] text-white/50">Lead Intent</div>
          <h3 className="mt-1 font-serif text-2xl text-white">Heat &amp; Follow-up</h3>
        </div>
        <div className="grid h-9 w-9 place-items-center rounded-2xl border border-white/10 bg-white/5 text-amber-200">
          <Flame className="h-4 w-4" />
        </div>
      </div>

      {/* intent strength bars */}
      <div className="flex flex-col gap-3">
        {intentDistribution.map((b) => (
          <div key={b.label} className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-white/70">{b.label}</span>
              <span className="text-white/50">{b.count} leads</span>
            </div>
            <div className="relative h-2 overflow-hidden rounded-full bg-white/5">
              <div
                className="absolute inset-y-0 left-0 rounded-full"
                style={{
                  width: `${b.percent}%`,
                  background: b.color,
                  boxShadow: `0 0 12px ${b.color}80`,
                }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="my-1 h-px w-full bg-gradient-to-r from-transparent via-white/15 to-transparent" />

      {/* follow-up timing */}
      <div>
        <div className="mb-3 flex items-center justify-between">
          <span className="text-xs uppercase tracking-[0.25em] text-white/50">Follow-up Time</span>
          <span className="text-[11px] text-white/40">avg 4h 12m</span>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {followupBuckets.map((f) => (
            <div
              key={f.label}
              className="glass-input flex flex-col items-center gap-1 rounded-2xl p-3 text-center"
            >
              <span className="font-serif text-xl text-white">{f.value}</span>
              <span className="text-[10px] uppercase tracking-widest text-white/50">{f.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
