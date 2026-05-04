"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Users,
  Briefcase,
  CalendarRange,
  Scale,
  CreditCard,
  Globe2,
  Settings,
  LifeBuoy,
  Sparkles,
} from "lucide-react";

const nav = [
  { label: "Overview", icon: LayoutDashboard, active: true },
  { label: "Clients", icon: Users, badge: "248" },
  { label: "Registrations", icon: Briefcase, badge: "32" },
  { label: "Bookings", icon: CalendarRange },
  { label: "Lawyer Network", icon: Scale },
  { label: "Payments", icon: CreditCard },
  { label: "Jurisdictions", icon: Globe2 },
];

const bottomNav = [
  { label: "Settings", icon: Settings },
  { label: "Support", icon: LifeBuoy },
];

export function Sidebar() {
  const [active, setActive] = useState("Overview");

  return (
    <aside className="hidden lg:flex w-64 shrink-0 flex-col gap-4 p-4">
      {/* Logo */}
      <div className="glass glass-edge rounded-3xl p-5 flex items-center gap-3">
        <div className="relative h-10 w-10 rounded-2xl bg-gradient-to-br from-orange-400 via-pink-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-pink-500/40">
          <Scale className="h-5 w-5 text-white" />
          <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-cyan-300 ring-2 ring-[#0a0418]" />
        </div>
        <div>
          <p className="font-display text-lg font-bold leading-none tracking-tight">
            Lawizer
          </p>
          <p className="text-[10px] uppercase tracking-[0.18em] text-white/50">
            Pvt Ltd Console
          </p>
        </div>
      </div>

      {/* Nav */}
      <nav className="glass glass-edge rounded-3xl p-3 flex flex-col gap-1">
        {nav.map((item) => {
          const Icon = item.icon;
          const isActive = active === item.label;
          return (
            <button
              key={item.label}
              onClick={() => setActive(item.label)}
              className={cn(
                "group flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-medium transition-all",
                isActive
                  ? "bg-gradient-to-r from-orange-500/30 via-pink-500/25 to-cyan-500/20 text-white shadow-inner shadow-white/10 border border-white/15"
                  : "text-white/65 hover:text-white hover:bg-white/5",
              )}
            >
              <Icon className={cn("h-4 w-4", isActive && "text-orange-200")} />
              <span className="flex-1 text-left">{item.label}</span>
              {item.badge && (
                <span
                  className={cn(
                    "rounded-full px-2 py-0.5 text-[10px] font-semibold",
                    isActive
                      ? "bg-white/20 text-white"
                      : "bg-white/8 text-white/70",
                  )}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Upgrade CTA */}
      <div className="relative glass-strong glass-edge rounded-3xl p-5 overflow-hidden">
        <div
          aria-hidden
          className="absolute -top-12 -right-12 h-32 w-32 rounded-full bg-gradient-to-br from-orange-400 to-pink-500 opacity-50 blur-2xl"
        />
        <div
          aria-hidden
          className="absolute -bottom-10 -left-10 h-28 w-28 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 opacity-50 blur-2xl"
        />
        <Sparkles className="h-5 w-5 text-orange-200" />
        <p className="mt-3 font-display text-base font-semibold leading-tight">
          Go Global with Lawizer Pro
        </p>
        <p className="mt-1 text-xs text-white/65 leading-relaxed">
          Unlock 40+ jurisdictions, AI doc filing & priority lawyer matching.
        </p>
        <button className="liquid-btn mt-4 w-full text-xs">
          Upgrade Plan
        </button>
      </div>

      <div className="glass glass-edge rounded-3xl p-3 mt-auto flex flex-col gap-1">
        {bottomNav.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.label}
              className="flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm text-white/65 hover:text-white hover:bg-white/5 transition"
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </button>
          );
        })}
      </div>
    </aside>
  );
}
