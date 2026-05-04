"use client"

import type React from "react"
import { cn } from "@/lib/utils"

interface LiquidButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "ghost"
}

export function LiquidButton({
  children,
  className,
  variant = "primary",
  ...props
}: LiquidButtonProps) {
  return (
    <button
      {...props}
      className={cn(
        "liquid-btn group relative inline-flex items-center gap-2 overflow-hidden rounded-full px-5 py-2.5 text-sm font-medium tracking-wide transition active:scale-[0.98]",
        variant === "primary"
          ? "text-slate-900"
          : "text-white",
        className,
      )}
    >
      {/* base glass */}
      <span
        aria-hidden
        className={cn(
          "absolute inset-0 rounded-full",
          variant === "primary"
            ? "bg-gradient-to-br from-amber-100 via-amber-200 to-rose-300"
            : "bg-white/5 backdrop-blur-xl border border-white/15",
        )}
      />
      {/* glossy highlight */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-1 top-0.5 h-1/2 rounded-full bg-gradient-to-b from-white/70 to-transparent opacity-70 mix-blend-overlay"
      />
      {/* liquid shimmer */}
      <span
        aria-hidden
        className="liquid-shimmer pointer-events-none absolute inset-0 rounded-full"
      />
      {/* glow */}
      <span
        aria-hidden
        className={cn(
          "pointer-events-none absolute -inset-1 rounded-full opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-70",
          variant === "primary" ? "bg-amber-300/60" : "bg-cyan-300/40",
        )}
      />
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </button>
  )
}
