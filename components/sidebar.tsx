"use client"

import { useState } from "react"
import { Briefcase, FileText, LifeBuoy, User, CreditCard, Scale, Phone, LogOut } from "lucide-react"
import { cn } from "@/lib/utils"
import { client } from "@/lib/data"

const nav = [
  { id: "services", label: "My Services", icon: Briefcase },
  { id: "documents", label: "Documents", icon: FileText },
  { id: "payments", label: "Payments", icon: CreditCard },
  { id: "lawyers", label: "My Legal Team", icon: Scale },
  { id: "support", label: "Support & Help", icon: LifeBuoy },
  { id: "profile", label: "Profile", icon: User },
]

export function Sidebar() {
  const [active, setActive] = useState("services")

  return (
    <aside className="hidden w-72 shrink-0 lg:block">
      <div className="glass-card sticky top-6 ml-6 mt-6 flex h-[calc(100vh-3rem)] flex-col rounded-3xl p-5">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div
            className="grid h-11 w-11 place-items-center rounded-2xl text-lg font-semibold text-foreground"
            style={{
              background:
                "linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--accent)) 100%)",
              boxShadow:
                "0 8px 24px -6px hsl(var(--primary) / 0.55), inset 0 1px 0 rgba(255,255,255,0.4)",
            }}
            aria-hidden
          >
            L
          </div>
          <div className="leading-tight">
            <p className="font-serif text-2xl tracking-tight">Lawizer</p>
            <p className="text-[10px] uppercase tracking-[0.18em] text-white/50">
              Legal Service Tracker
            </p>
          </div>
        </div>

        {/* Client identity */}
        <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-amber-200/90 to-rose-300/80 text-sm font-semibold text-[#1a1230]">
              {client.avatarInitials}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">{client.name}</p>
              <p className="truncate text-[11px] text-white/55">
                Client ID: {client.clientId}
              </p>
            </div>
          </div>
          <p className="mt-3 truncate text-[11px] text-white/55">{client.company}</p>
        </div>

        {/* Nav */}
        <nav className="mt-6 flex flex-col gap-1">
          <p className="px-3 pb-2 text-[10px] font-medium uppercase tracking-[0.18em] text-white/45">
            Menu
          </p>
          {nav.map((item) => {
            const Icon = item.icon
            const isActive = active === item.id
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => {
                  setActive(item.id)
                  const el = document.getElementById(item.id)
                  if (el) {
                    e.preventDefault()
                    el.scrollIntoView({ behavior: "smooth", block: "start" })
                  }
                }}
                className={cn(
                  "group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-all",
                  isActive
                    ? "bg-white/10 text-white"
                    : "text-white/65 hover:bg-white/[0.05] hover:text-white",
                )}
              >
                {isActive && (
                  <span
                    className="absolute left-0 top-1/2 h-6 w-[3px] -translate-y-1/2 rounded-r-full"
                    style={{
                      background:
                        "linear-gradient(180deg, hsl(var(--primary)) 0%, hsl(var(--accent)) 100%)",
                    }}
                  />
                )}
                <Icon className="h-4 w-4 shrink-0" />
                <span className="truncate">{item.label}</span>
              </a>
            )
          })}
        </nav>

        <div className="mt-auto" />

        {/* Need help CTA */}
        <div
          className="relative overflow-hidden rounded-2xl p-4"
          style={{
            background:
              "linear-gradient(135deg, hsl(var(--primary) / 0.95) 0%, hsl(var(--accent) / 0.95) 100%)",
            boxShadow: "0 18px 40px -16px hsl(var(--primary) / 0.55)",
          }}
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-60"
            style={{
              background:
                "radial-gradient(120% 80% at 0% 0%, rgba(255,255,255,0.4), transparent 60%)",
            }}
          />
          <div className="relative">
            <div className="inline-flex items-center gap-2 rounded-full bg-black/15 px-2.5 py-1 text-[10px] font-medium text-[#1a1230]">
              <Phone className="h-3 w-3" /> Need Help? Call Us
            </div>
            <p className="mt-3 font-serif text-lg leading-tight text-[#1a1230]">
              +91 90628 15535
            </p>
            <p className="mt-1 text-[11px] text-[#1a1230]/75">
              Mon-Sat, 9AM-8PM. Always available.
            </p>
          </div>
        </div>

        <button className="mt-3 flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-xs text-white/65 transition hover:bg-white/[0.07] hover:text-white">
          <LogOut className="h-3.5 w-3.5" /> Sign out
        </button>
      </div>
    </aside>
  )
}
