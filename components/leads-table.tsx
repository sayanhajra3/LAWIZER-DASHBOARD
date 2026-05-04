"use client"

import { leads } from "@/lib/data"
import { MoreHorizontal, Phone, Mail } from "lucide-react"

const stageStyles: Record<string, string> = {
  Discovery: "bg-cyan-300/10 text-cyan-200 border-cyan-300/20",
  "Lawyer Match": "bg-fuchsia-300/10 text-fuchsia-200 border-fuchsia-300/20",
  "Docs Review": "bg-amber-300/10 text-amber-200 border-amber-300/20",
  Booking: "bg-emerald-300/10 text-emerald-200 border-emerald-300/20",
  Closed: "bg-white/5 text-white/60 border-white/10",
}

const intentStyles: Record<string, string> = {
  Hot: "from-rose-400 to-amber-300",
  Warm: "from-amber-300 to-yellow-200",
  Cold: "from-cyan-300 to-indigo-300",
}

export function LeadsTable() {
  return (
    <div className="glass-card overflow-hidden rounded-3xl">
      <div className="flex items-center justify-between p-5 pb-4">
        <div>
          <div className="text-xs uppercase tracking-[0.3em] text-white/50">International Pipeline</div>
          <h3 className="mt-1 font-serif text-2xl text-white">Active Clients</h3>
        </div>
        <button className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/70 transition hover:bg-white/10">
          View all
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-y border-white/5 bg-white/[0.02] text-[11px] uppercase tracking-wider text-white/45">
              <th className="px-5 py-3 text-left font-medium">Client</th>
              <th className="px-3 py-3 text-left font-medium">Jurisdiction</th>
              <th className="px-3 py-3 text-left font-medium">Service</th>
              <th className="px-3 py-3 text-left font-medium">Intent</th>
              <th className="px-3 py-3 text-left font-medium">Stage</th>
              <th className="px-3 py-3 text-left font-medium">Follow-up</th>
              <th className="px-3 py-3 text-right font-medium">Value</th>
              <th className="px-5 py-3" />
            </tr>
          </thead>
          <tbody>
            {leads.map((l, i) => (
              <tr
                key={l.id}
                className={`group transition hover:bg-white/[0.04] ${
                  i !== leads.length - 1 ? "border-b border-white/5" : ""
                }`}
              >
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={`grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br ${l.avatarGrad} font-serif text-xs font-semibold text-slate-900`}
                    >
                      {l.initials}
                    </div>
                    <div className="flex flex-col leading-tight">
                      <span className="font-medium text-white">{l.name}</span>
                      <span className="text-[11px] text-white/45">{l.company}</span>
                    </div>
                  </div>
                </td>
                <td className="px-3 py-4">
                  <div className="flex items-center gap-2 text-white/75">
                    <span className="text-base leading-none">{l.flag}</span>
                    <span>{l.country}</span>
                  </div>
                </td>
                <td className="px-3 py-4 text-white/70">{l.service}</td>
                <td className="px-3 py-4">
                  <div className="flex items-center gap-2">
                    <span
                      className={`h-1.5 w-12 rounded-full bg-gradient-to-r ${intentStyles[l.intent]}`}
                    />
                    <span className="text-xs text-white/70">{l.intent}</span>
                    <span className="text-[10px] text-white/40">{l.intentScore}/10</span>
                  </div>
                </td>
                <td className="px-3 py-4">
                  <span
                    className={`rounded-full border px-2.5 py-1 text-[11px] ${stageStyles[l.stage]}`}
                  >
                    {l.stage}
                  </span>
                </td>
                <td className="px-3 py-4 text-white/70">{l.followup}</td>
                <td className="px-3 py-4 text-right font-medium text-white">
                  ${l.value.toLocaleString()}
                </td>
                <td className="px-5 py-4 text-right">
                  <div className="flex items-center justify-end gap-1 opacity-0 transition group-hover:opacity-100">
                    <IconBtn>
                      <Mail className="h-3.5 w-3.5" />
                    </IconBtn>
                    <IconBtn>
                      <Phone className="h-3.5 w-3.5" />
                    </IconBtn>
                    <IconBtn>
                      <MoreHorizontal className="h-3.5 w-3.5" />
                    </IconBtn>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function IconBtn({ children }: { children: React.ReactNode }) {
  return (
    <button className="grid h-7 w-7 place-items-center rounded-full border border-white/10 bg-white/5 text-white/70 transition hover:bg-white/15 hover:text-white">
      {children}
    </button>
  )
}
