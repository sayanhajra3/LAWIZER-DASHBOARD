"use client"

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts"
import { revenueSeries } from "@/lib/data"
import { TrendingUp } from "lucide-react"

export function RevenueChart() {
  const total = revenueSeries.reduce((a, b) => a + b.revenue, 0)
  return (
    <div className="glass-card rounded-3xl p-5">
      <div className="flex items-start justify-between">
        <div>
          <div className="text-xs uppercase tracking-[0.3em] text-white/50">Revenue</div>
          <h3 className="mt-1 font-serif text-2xl text-white">
            ${(total / 1000).toFixed(1)}K{" "}
            <span className="text-sm text-white/45">YTD</span>
          </h3>
          <div className="mt-1 flex items-center gap-1.5 text-xs text-emerald-200">
            <TrendingUp className="h-3.5 w-3.5" />
            +24.6% vs last cycle
          </div>
        </div>
        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] uppercase tracking-widest text-white/55">
          USD
        </span>
      </div>

      <div className="mt-4 h-56">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={revenueSeries} margin={{ top: 8, right: 4, left: -16, bottom: 0 }}>
            <defs>
              <linearGradient id="bar1" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#fde68a" stopOpacity={1} />
                <stop offset="100%" stopColor="#fb7185" stopOpacity={0.7} />
              </linearGradient>
              <linearGradient id="bar2" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#a5f3fc" stopOpacity={0.9} />
                <stop offset="100%" stopColor="#818cf8" stopOpacity={0.6} />
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
              tickFormatter={(v) => `${v / 1000}k`}
            />
            <Tooltip
              cursor={{ fill: "rgba(255,255,255,0.04)" }}
              contentStyle={{
                background: "rgba(15,12,40,0.85)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(255,255,255,0.15)",
                borderRadius: 16,
                color: "white",
                fontSize: 12,
              }}
              formatter={(v: number) => [`$${v.toLocaleString()}`, "Revenue"]}
            />
            <Bar dataKey="revenue" radius={[10, 10, 4, 4]}>
              {revenueSeries.map((_, i) => (
                <Cell key={i} fill={i % 2 === 0 ? "url(#bar1)" : "url(#bar2)"} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
