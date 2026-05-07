"use client"

import { Clock, CheckCircle2, AlertTriangle } from "lucide-react"
import { stats } from "@/lib/data"
import type { LucideIcon } from "lucide-react"

type Stat = {
  label: string
  value: number
  icon: LucideIcon
  tone: "amber" | "emerald" | "rose"
  description: string
}

const items: Stat[] = [
  {
    label: "In Progress",
    value: stats.inProgress,
    icon: Clock,
    tone: "amber",
    description: "Filings actively being processed",
  },
  {
    label: "Completed",
    value: stats.completed,
    icon: CheckCircle2,
    tone: "emerald",
    description: "Successfully delivered & archived",
  },
  {
    label: "Action Required",
    value: stats.actionRequired,
    icon: AlertTriangle,
    tone: "rose",
    description: "Waiting on you to continue",
  },
]

const toneStyles: Record<Stat["tone"], { bg: string; ring: string; text: string; dot: string }> = {
  amber: {
    bg: "bg-amber-300/15",
    ring: "ring-amber-200/30",
    text: "text-amber-200",
    dot: "bg-amber-300 shadow-[0_0_18px_4px_rgba(252,211,77,0.55)]",
  },
  emerald: {
    bg: "bg-emerald-300/15",
    ring: "ring-emerald-200/30",
    text: "text-emerald-200",
    dot: "bg-emerald-300 shadow-[0_0_18px_4px_rgba(110,231,183,0.55)]",
  },
  rose: {
    bg: "bg-rose-300/15",
    ring: "ring-rose-200/30",
    text: "text-rose-200",
    dot: "bg-rose-400 shadow-[0_0_18px_4px_rgba(251,113,133,0.55)]",
  },
}

export function StatusStats() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {items.map((item) => {
        const Icon = item.icon
        const t = toneStyles[item.tone]
        return (
          <div
            key={item.label}
            className="glass-card relative overflow-hidden rounded-3xl p-5"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full opacity-30 blur-3xl"
              style={{
                background:
                  item.tone === "amber"
                    ? "radial-gradient(circle, rgba(252,211,77,0.6), transparent 60%)"
                    : item.tone === "emerald"
                      ? "radial-gradient(circle, rgba(110,231,183,0.55), transparent 60%)"
                      : "radial-gradient(circle, rgba(251,113,133,0.55), transparent 60%)",
              }}
            />
            <div className="relative flex items-start justify-between gap-3">
              <div className={`grid h-11 w-11 place-items-center rounded-2xl ${t.bg} ring-1 ${t.ring}`}>
                <Icon className={`h-5 w-5 ${t.text}`} />
              </div>
              <span className={`relative h-2 w-2 rounded-full ${t.dot}`} />
            </div>
            <div className="relative mt-5 flex items-baseline gap-2">
              <span className="font-serif text-5xl leading-none tracking-tight">{item.value}</span>
              <span className="text-xs uppercase tracking-[0.2em] text-white/45">services</span>
            </div>
            <p className="relative mt-2 text-sm font-medium text-white/85">{item.label}</p>
            <p className="relative mt-1 text-xs text-white/50">{item.description}</p>
          </div>
        )
      })}
    </div>
  )
}
