"use client"

import { useState } from "react"
import { CreditCard, Lock, ShieldCheck, Wifi, CheckCircle2 } from "lucide-react"
import { LiquidButton } from "./liquid-button"
import { transactions } from "@/lib/data"

const services = [
  { id: "ltd", name: "Pvt. Ltd Registration", price: 599 },
  { id: "llc", name: "International LLC", price: 899 },
  { id: "lawyer", name: "Lawyer Consultation (1h)", price: 149 },
  { id: "site", name: "Legal Site Booking", price: 249 },
]

export function PaymentGateway() {
  const [selected, setSelected] = useState("llc")
  const [processing, setProcessing] = useState(false)
  const [success, setSuccess] = useState(false)

  const service = services.find((s) => s.id === selected)!

  const handlePay = () => {
    setProcessing(true)
    setSuccess(false)
    setTimeout(() => {
      setProcessing(false)
      setSuccess(true)
      setTimeout(() => setSuccess(false), 2400)
    }, 1600)
  }

  return (
    <div className="glass-card rounded-3xl p-5">
      <div className="flex items-start justify-between">
        <div>
          <div className="text-xs uppercase tracking-[0.3em] text-white/50">Payment Gateway</div>
          <h3 className="mt-1 font-serif text-2xl text-white">Secure Checkout</h3>
          <p className="mt-1 text-sm text-white/55">
            Stripe-ready · 3DS · multi-currency for international clients.
          </p>
        </div>
        <div className="flex items-center gap-1.5 rounded-full border border-emerald-300/20 bg-emerald-300/10 px-2.5 py-1 text-[10px] uppercase tracking-widest text-emerald-200">
          <ShieldCheck className="h-3 w-3" />
          PCI · DSS
        </div>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-5">
        {/* Card visual */}
        <div className="lg:col-span-2">
          <div className="relative aspect-[1.6/1] w-full overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-br from-indigo-500/40 via-fuchsia-500/30 to-amber-300/30 p-5 shadow-[0_30px_80px_-30px_rgba(99,102,241,0.6)]">
            {/* shine */}
            <div className="pointer-events-none absolute -left-1/3 top-0 h-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-40" />
            <div className="pointer-events-none absolute -inset-px rounded-3xl bg-gradient-to-br from-white/30 via-transparent to-transparent opacity-40" />

            <div className="flex items-start justify-between">
              <span className="font-serif text-lg italic text-white">Lawizer</span>
              <Wifi className="h-5 w-5 rotate-90 text-white/80" />
            </div>

            <div className="mt-7 h-8 w-12 rounded-md bg-gradient-to-br from-amber-200 to-amber-400 shadow-inner" />

            <div className="mt-3 font-mono text-base tracking-[0.25em] text-white/95">
              4242 · 0420 · 4711 · 2025
            </div>

            <div className="mt-5 flex items-end justify-between text-[10px] uppercase tracking-widest text-white/70">
              <div className="flex flex-col gap-0.5">
                <span className="text-white/50">Cardholder</span>
                <span className="text-white">Aria Vance</span>
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-white/50">Expires</span>
                <span className="text-white">04 / 28</span>
              </div>
              <span className="font-serif text-xl italic text-white">VISA</span>
            </div>
          </div>

          {/* service select */}
          <div className="mt-4 flex flex-col gap-2">
            {services.map((s) => (
              <button
                key={s.id}
                onClick={() => setSelected(s.id)}
                className={`flex items-center justify-between rounded-2xl border px-4 py-3 text-sm transition ${
                  selected === s.id
                    ? "border-amber-200/40 bg-amber-200/10 text-white"
                    : "border-white/10 bg-white/[0.03] text-white/70 hover:bg-white/[0.06]"
                }`}
              >
                <span className="flex items-center gap-2">
                  <span
                    className={`h-2 w-2 rounded-full ${
                      selected === s.id ? "bg-amber-200 shadow-[0_0_8px_2px_rgba(252,211,77,0.7)]" : "bg-white/20"
                    }`}
                  />
                  {s.name}
                </span>
                <span className="font-medium">${s.price}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Form */}
        <div className="flex flex-col gap-3 lg:col-span-3">
          <Field label="Cardholder name">
            <input
              type="text"
              defaultValue="Aria Vance"
              className="w-full bg-transparent text-sm text-white placeholder:text-white/30 focus:outline-none"
            />
          </Field>
          <Field label="Card number" icon={<CreditCard className="h-4 w-4 text-white/50" />}>
            <input
              type="text"
              defaultValue="4242 4242 4242 4242"
              className="w-full bg-transparent font-mono text-sm tracking-wider text-white placeholder:text-white/30 focus:outline-none"
            />
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Expiry">
              <input
                type="text"
                defaultValue="04 / 28"
                className="w-full bg-transparent font-mono text-sm text-white placeholder:text-white/30 focus:outline-none"
              />
            </Field>
            <Field label="CVC" icon={<Lock className="h-4 w-4 text-white/50" />}>
              <input
                type="password"
                defaultValue="123"
                className="w-full bg-transparent font-mono text-sm tracking-widest text-white placeholder:text-white/30 focus:outline-none"
              />
            </Field>
          </div>
          <Field label="Country / Region">
            <select className="w-full bg-transparent text-sm text-white focus:outline-none">
              <option className="bg-slate-900">United States</option>
              <option className="bg-slate-900">United Kingdom</option>
              <option className="bg-slate-900">Singapore</option>
              <option className="bg-slate-900">United Arab Emirates</option>
              <option className="bg-slate-900">India</option>
            </select>
          </Field>

          <div className="mt-2 flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm">
            <span className="text-white/65">Total ({service.name})</span>
            <span className="font-serif text-2xl text-white">${service.price}.00</span>
          </div>

          <LiquidButton
            className="mt-1 w-full justify-center py-3 text-base"
            onClick={handlePay}
            disabled={processing}
          >
            {success ? (
              <span className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4" /> Payment Confirmed
              </span>
            ) : processing ? (
              <span className="flex items-center gap-2">
                <span className="h-3 w-3 animate-spin rounded-full border-2 border-slate-900/30 border-t-slate-900" />
                Securing transaction...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Lock className="h-4 w-4" /> Pay ${service.price} securely
              </span>
            )}
          </LiquidButton>

          <div className="flex items-center justify-center gap-3 text-[11px] text-white/45">
            <span className="flex items-center gap-1">
              <ShieldCheck className="h-3 w-3" /> 256-bit TLS
            </span>
            <span>·</span>
            <span>Stripe</span>
            <span>·</span>
            <span>PayPal</span>
            <span>·</span>
            <span>Wise</span>
          </div>
        </div>
      </div>

      {/* Recent txns */}
      <div className="mt-6">
        <div className="mb-3 flex items-center justify-between">
          <span className="text-xs uppercase tracking-[0.25em] text-white/50">Recent Transactions</span>
          <span className="text-[11px] text-white/40">last 24h</span>
        </div>
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
          {transactions.map((t) => (
            <div
              key={t.id}
              className="flex items-center justify-between rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3 text-sm"
            >
              <div className="flex items-center gap-3">
                <div className="grid h-8 w-8 place-items-center rounded-full border border-white/10 bg-white/5 text-base">
                  {t.flag}
                </div>
                <div className="flex flex-col leading-tight">
                  <span className="text-white">{t.client}</span>
                  <span className="text-[11px] text-white/45">{t.service}</span>
                </div>
              </div>
              <div className="flex flex-col items-end leading-tight">
                <span className="font-medium text-white">${t.amount}</span>
                <span
                  className={`text-[10px] ${
                    t.status === "Paid" ? "text-emerald-200" : "text-amber-200"
                  }`}
                >
                  {t.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function Field({
  label,
  icon,
  children,
}: {
  label: string
  icon?: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <label className="glass-input flex flex-col gap-1 rounded-2xl px-4 py-2.5">
      <span className="text-[10px] uppercase tracking-widest text-white/45">{label}</span>
      <div className="flex items-center gap-2">
        {children}
        {icon}
      </div>
    </label>
  )
}
