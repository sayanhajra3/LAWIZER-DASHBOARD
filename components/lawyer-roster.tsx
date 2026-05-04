"use client"

import { lawyers } from "@/lib/data"
import { Star } from "lucide-react"

export function LawyerRoster() {
  return (
    <div className="glass-card rounded-3xl p-5">
      <div className="flex items-start justify-between">
        <div>
          <div className="text-xs uppercase tracking-[0.3em] text-white/50">Freelance Counsel</div>
          <h3 className="mt-1 font-serif text-2xl text-white">Top Performing Lawyers</h3>
        </div>
        <button className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/70 transition hover:bg-white/10">
          Manage roster
        </button>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {lawyers.map((l) => (
          <div
            key={l.name}
            className="glass-input group relative overflow-hidden rounded-2xl p-4 transition hover:bg-white/[0.07]"
          >
            <div className="flex items-start gap-3">
              <div
                className={`grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br ${l.avatarGrad} font-serif text-sm font-semibold text-slate-900`}
              >
                {l.initials}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-white">{l.name}</span>
                  <span className="flex items-center gap-1 text-xs text-amber-200">
                    <Star className="h-3 w-3 fill-amber-200" />
                    {l.rating}
                  </span>
                </div>
                <div className="text-[11px] text-white/55">
                  {l.specialty} · {l.region}
                </div>
              </div>
            </div>

            <div className="mt-3 flex items-center justify-between text-[11px] text-white/55">
              <span>
                <span className="text-white">{l.cases}</span> cases
              </span>
              <span>
                <span className="text-white">${l.revenue}k</span> revenue
              </span>
              <span
                className={`rounded-full px-2 py-0.5 ${
                  l.status === "Available"
                    ? "bg-emerald-300/10 text-emerald-200"
                    : "bg-amber-300/10 text-amber-200"
                }`}
              >
                {l.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
