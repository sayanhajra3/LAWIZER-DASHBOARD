"use client"

import { useState } from "react"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import { performanceSeries } from "@/lib/data"

const ranges = ["7D", "30D", "90D", "12M"] as const

export function PerformanceChart() {
  const [range, setRange] = useState<(typeof ranges)[number]>("30D")

  return (
    <div className="glass-card rounded-3xl p-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="text-xs uppercase tracking-[0.3em] text-white/50">Overall Performance</div>
          <h3 className="mt-1 font-serif text-2xl text-white">Registrations vs Bookings</h3>
          <p className="mt-1 text-sm text-white/55">
            Live signal across 42 jurisdictions — pulled every 5 minutes.
          </p>
        </div>

        <div className="glass-input flex items-center gap-1 rounded-full p-1">
          {ranges.map((r) => (
            <button
              key={r}
              onClick={() => setRange(r)}
              className={`rounded-full px-3 py-1 text-xs transition ${
                range === r
                  ? "bg-white/15 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.25)]"
                  : "text-white/55 hover:text-white"
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* legend */}
      <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-white/60">
        <Legend dot="#fcd34d" label="Registrations" />
        <Legend dot="#67e8f9" label="Bookings" />
        <Legend dot="#f0abfc" label="Lawyer Matches" />
      </div>

      <div className="mt-2 h-72">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={performanceSeries} margin={{ top: 10, right: 8, left: -12, bottom: 0 }}>
            <defs>
              <linearGradient id="reg" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#fcd34d" stopOpacity={0.55} />
                <stop offset="100%" stopColor="#fcd34d" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="book" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#67e8f9" stopOpacity={0.5} />
                <stop offset="100%" stopColor="#67e8f9" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="match" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#f0abfc" stopOpacity={0.45} />
                <stop offset="100%" stopColor="#f0abfc" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="rgba(255,255,255,0.06)" strokeDasharray="3 6" vertical={false} />
            <XAxis
              dataKey="month"
              stroke="rgba(255,255,255,0.4)"
              tickLine={false}
              axisLine={false}
              fontSize={11}
            />
            <YAxis
              stroke="rgba(255,255,255,0.4)"
              tickLine={false}
              axisLine={false}
              fontSize={11}
              width={36}
            />
            <Tooltip
              cursor={{ stroke: "rgba(255,255,255,0.2)", strokeWidth: 1 }}
              contentStyle={{
                background: "rgba(15,12,40,0.85)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(255,255,255,0.15)",
                borderRadius: 16,
                color: "white",
                fontSize: 12,
              }}
              labelStyle={{ color: "rgba(255,255,255,0.6)" }}
            />
            <Area
              type="monotone"
              dataKey="registrations"
              stroke="#fcd34d"
              strokeWidth={2}
              fill="url(#reg)"
            />
            <Area type="monotone" dataKey="bookings" stroke="#67e8f9" strokeWidth={2} fill="url(#book)" />
            <Area
              type="monotone"
              dataKey="matches"
              stroke="#f0abfc"
              strokeWidth={2}
              fill="url(#match)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

function Legend({ dot, label }: { dot: string; label: string }) {
  return (
    <span className="flex items-center gap-2">
      <span
        className="h-2.5 w-2.5 rounded-full"
        style={{ background: dot, boxShadow: `0 0 10px ${dot}80` }}
      />
      {label}
    </span>
  )
}
