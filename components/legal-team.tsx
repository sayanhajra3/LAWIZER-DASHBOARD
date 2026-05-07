"use client"

import { MessageCircle, Phone, Star, CalendarPlus } from "lucide-react"
import { cn } from "@/lib/utils"
import { lawyers, services } from "@/lib/data"

export function LegalTeam() {
  // For each lawyer, list services they're handling
  const assignmentsByLawyer = lawyers.map((l) => ({
    ...l,
    cases: services
      .filter((s) => s.assignedLawyerId === l.id)
      .map((s) => s.title),
  }))

  return (
    <section id="lawyers" className="glass-card relative overflow-hidden rounded-3xl p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/55">
            Lawyer Freelancers
          </div>
          <h2 className="mt-1 font-serif text-2xl tracking-tight">My Legal Team</h2>
          <p className="text-sm text-white/55">
            The verified lawyers handling your cases, end-to-end.
          </p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-full bg-white/[0.06] px-3.5 py-2 text-xs font-medium text-white ring-1 ring-white/10 transition hover:bg-white/[0.12]">
          <CalendarPlus className="h-3.5 w-3.5" />
          Book Consultation
        </button>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-3">
        {assignmentsByLawyer.map((l) => (
          <div
            key={l.id}
            className="rounded-2xl border border-white/10 bg-white/[0.03] p-4"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br from-cyan-300/80 to-indigo-300/80 text-sm font-semibold text-[#1a1230]">
                    {l.avatar}
                  </div>
                  <span
                    className={cn(
                      "absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full ring-2 ring-[#0a0418]",
                      l.online ? "bg-emerald-400" : "bg-white/40",
                    )}
                  />
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">{l.name}</p>
                  <p className="truncate text-[11px] text-white/55">{l.specialty}</p>
                </div>
              </div>
              <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-amber-300/15 px-2 py-0.5 text-[10px] font-medium text-amber-200 ring-1 ring-amber-200/30">
                <Star className="h-3 w-3 fill-current" />
                {l.rating}
              </span>
            </div>
            <p className="mt-3 text-[11px] text-white/45">{l.region} · {l.cases.length || 0} active case{l.cases.length === 1 ? "" : "s"}</p>
            {l.cases.length > 0 && (
              <ul className="mt-2 flex flex-wrap gap-1.5">
                {l.cases.map((c) => (
                  <li
                    key={c}
                    className="rounded-md bg-white/[0.05] px-2 py-0.5 text-[10px] text-white/70 ring-1 ring-white/10"
                  >
                    {c}
                  </li>
                ))}
              </ul>
            )}
            <div className="mt-4 flex gap-2">
              <button className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-white/[0.06] py-2 text-xs font-medium ring-1 ring-white/10 transition hover:bg-white/[0.12]">
                <MessageCircle className="h-3.5 w-3.5" /> Chat
              </button>
              <button className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-white/[0.06] py-2 text-xs font-medium ring-1 ring-white/10 transition hover:bg-white/[0.12]">
                <Phone className="h-3.5 w-3.5" /> Call
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
