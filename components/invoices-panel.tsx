"use client"

import { useMemo, useState } from "react"
import {
  CreditCard,
  Receipt,
  Lock,
  ShieldCheck,
  CheckCircle2,
  X,
  Wallet,
  Building2,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { invoices } from "@/lib/data"
import type { Invoice } from "@/lib/data"
import { LiquidButton } from "./liquid-button"

const statusTone: Record<Invoice["status"], string> = {
  Paid: "bg-emerald-300/15 text-emerald-200 ring-emerald-200/30",
  Due: "bg-rose-300/15 text-rose-200 ring-rose-200/30",
  Pending: "bg-amber-300/15 text-amber-200 ring-amber-200/30",
}

export function InvoicesPanel() {
  const [active, setActive] = useState<Invoice | null>(null)

  const totals = useMemo(() => {
    const paid = invoices.filter((i) => i.status === "Paid").reduce((a, b) => a + b.amount, 0)
    const due = invoices.filter((i) => i.status !== "Paid").reduce((a, b) => a + b.amount, 0)
    return { paid, due }
  }, [])

  return (
    <section id="payments" className="glass-card relative overflow-hidden rounded-3xl p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/55">
            <Receipt className="h-3.5 w-3.5" /> Payments &amp; Invoices
          </div>
          <h2 className="mt-1 font-serif text-2xl tracking-tight">Billing Center</h2>
          <p className="text-sm text-white/55">
            Pay outstanding service fees securely and download GST invoices.
          </p>
        </div>
        <div className="hidden items-center gap-3 md:flex">
          <Stat label="Paid" amount={totals.paid} tone="emerald" />
          <Stat label="Due" amount={totals.due} tone="rose" />
        </div>
      </div>

      <ul className="mt-5 flex flex-col divide-y divide-white/5 overflow-hidden rounded-2xl border border-white/8 bg-white/[0.02]">
        {invoices.map((inv) => (
          <li key={inv.id} className="flex flex-wrap items-center gap-4 p-4">
            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-amber-200/30 to-rose-300/20 ring-1 ring-white/10">
              <Receipt className="h-4 w-4 text-amber-200" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">{inv.service}</p>
              <p className="truncate text-[11px] text-white/50">
                {inv.id} · Issued {inv.issuedAt}
              </p>
            </div>
            <span
              className={cn(
                "inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-medium ring-1",
                statusTone[inv.status],
              )}
            >
              {inv.status}
            </span>
            <p className="font-serif text-lg tracking-tight">
              ₹{inv.amount.toLocaleString("en-IN")}
            </p>
            {inv.status === "Paid" ? (
              <button className="rounded-full bg-white/[0.06] px-3 py-1.5 text-xs font-medium text-white/85 ring-1 ring-white/10 transition hover:bg-white/[0.12]">
                Download
              </button>
            ) : (
              <button
                onClick={() => setActive(inv)}
                className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-br from-amber-100 via-amber-200 to-rose-300 px-3.5 py-1.5 text-xs font-semibold text-[#1a1230] shadow-[0_8px_24px_-8px_rgba(252,211,77,0.6)] ring-1 ring-white/30 transition hover:scale-[1.03]"
              >
                <CreditCard className="h-3.5 w-3.5" />
                Pay now
              </button>
            )}
          </li>
        ))}
      </ul>

      {active && <PaymentModal invoice={active} onClose={() => setActive(null)} />}
    </section>
  )
}

function Stat({
  label,
  amount,
  tone,
}: {
  label: string
  amount: number
  tone: "emerald" | "rose"
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-2">
      <p className="text-[10px] uppercase tracking-[0.18em] text-white/45">{label}</p>
      <p
        className={cn(
          "font-serif text-lg tracking-tight",
          tone === "emerald" ? "text-emerald-200" : "text-rose-200",
        )}
      >
        ₹{amount.toLocaleString("en-IN")}
      </p>
    </div>
  )
}

function PaymentModal({ invoice, onClose }: { invoice: Invoice; onClose: () => void }) {
  const [method, setMethod] = useState<"card" | "upi" | "netbanking">("card")
  const [card, setCard] = useState({ number: "", expiry: "", cvc: "", name: "" })
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setTimeout(() => {
      setSubmitting(false)
      setDone(true)
    }, 1500)
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="pay-title"
    >
      <button
        aria-label="Close payment dialog"
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />
      <div className="glass-card relative w-full max-w-lg overflow-hidden rounded-3xl p-6">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-20 -top-24 h-56 w-56 rounded-full opacity-40 blur-3xl"
          style={{ background: "radial-gradient(circle, rgba(252,211,77,0.55), transparent 60%)" }}
        />
        <div className="relative flex items-start justify-between gap-3">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/55">
              Secure checkout
            </p>
            <h3 id="pay-title" className="mt-1 font-serif text-2xl tracking-tight">
              Pay ₹{invoice.amount.toLocaleString("en-IN")}
            </h3>
            <p className="text-xs text-white/55">{invoice.service} · {invoice.id}</p>
          </div>
          <button
            onClick={onClose}
            className="grid h-9 w-9 place-items-center rounded-full bg-white/[0.06] text-white/70 ring-1 ring-white/10 transition hover:bg-white/[0.12] hover:text-white"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {done ? (
          <div className="relative mt-6 flex flex-col items-center gap-3 py-6 text-center">
            <div className="grid h-14 w-14 place-items-center rounded-full bg-emerald-300/15 ring-1 ring-emerald-200/30">
              <CheckCircle2 className="h-7 w-7 text-emerald-300" />
            </div>
            <p className="font-serif text-xl">Payment successful</p>
            <p className="text-xs text-white/55">
              A receipt has been emailed and saved to your Documents Vault.
            </p>
            <button
              onClick={onClose}
              className="mt-2 rounded-full bg-white/[0.06] px-4 py-2 text-xs font-medium ring-1 ring-white/10 transition hover:bg-white/[0.12]"
            >
              Close
            </button>
          </div>
        ) : (
          <>
            {/* Method tabs */}
            <div className="relative mt-5 grid grid-cols-3 gap-2 rounded-2xl bg-white/[0.04] p-1 ring-1 ring-white/8">
              {[
                { id: "card", label: "Card", icon: CreditCard },
                { id: "upi", label: "UPI", icon: Wallet },
                { id: "netbanking", label: "Net Banking", icon: Building2 },
              ].map((m) => {
                const Icon = m.icon
                const active = method === (m.id as typeof method)
                return (
                  <button
                    key={m.id}
                    onClick={() => setMethod(m.id as typeof method)}
                    className={cn(
                      "flex items-center justify-center gap-1.5 rounded-xl px-3 py-2 text-xs font-medium transition",
                      active
                        ? "bg-white/10 text-white shadow-inner shadow-white/10"
                        : "text-white/65 hover:text-white",
                    )}
                  >
                    <Icon className="h-3.5 w-3.5" />
                    {m.label}
                  </button>
                )
              })}
            </div>

            <form onSubmit={handlePay} className="relative mt-5 flex flex-col gap-3">
              {method === "card" && (
                <>
                  <div className="glass-input flex items-center gap-3 rounded-2xl px-4 py-3">
                    <CreditCard className="h-4 w-4 text-white/55" />
                    <input
                      required
                      value={card.number}
                      onChange={(e) => setCard({ ...card, number: e.target.value })}
                      placeholder="1234 5678 9012 3456"
                      inputMode="numeric"
                      className="flex-1 bg-transparent text-sm tracking-wider text-white placeholder:text-white/35 focus:outline-none"
                      aria-label="Card number"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="glass-input rounded-2xl px-4 py-3">
                      <input
                        required
                        value={card.expiry}
                        onChange={(e) => setCard({ ...card, expiry: e.target.value })}
                        placeholder="MM / YY"
                        className="w-full bg-transparent text-sm text-white placeholder:text-white/35 focus:outline-none"
                        aria-label="Expiry"
                      />
                    </div>
                    <div className="glass-input rounded-2xl px-4 py-3">
                      <input
                        required
                        value={card.cvc}
                        onChange={(e) => setCard({ ...card, cvc: e.target.value })}
                        placeholder="CVC"
                        className="w-full bg-transparent text-sm text-white placeholder:text-white/35 focus:outline-none"
                        aria-label="CVC"
                      />
                    </div>
                  </div>
                  <div className="glass-input rounded-2xl px-4 py-3">
                    <input
                      required
                      value={card.name}
                      onChange={(e) => setCard({ ...card, name: e.target.value })}
                      placeholder="Name on card"
                      className="w-full bg-transparent text-sm text-white placeholder:text-white/35 focus:outline-none"
                      aria-label="Name on card"
                    />
                  </div>
                </>
              )}
              {method === "upi" && (
                <div className="glass-input flex items-center gap-3 rounded-2xl px-4 py-3">
                  <Wallet className="h-4 w-4 text-white/55" />
                  <input
                    required
                    placeholder="yourname@bankupi"
                    className="flex-1 bg-transparent text-sm text-white placeholder:text-white/35 focus:outline-none"
                    aria-label="UPI ID"
                  />
                </div>
              )}
              {method === "netbanking" && (
                <div className="glass-input flex items-center gap-3 rounded-2xl px-4 py-3">
                  <Building2 className="h-4 w-4 text-white/55" />
                  <select
                    required
                    className="flex-1 bg-transparent text-sm text-white focus:outline-none"
                    defaultValue=""
                    aria-label="Bank"
                  >
                    <option value="" disabled className="bg-[#0a0418]">
                      Select your bank
                    </option>
                    <option className="bg-[#0a0418]">HDFC Bank</option>
                    <option className="bg-[#0a0418]">ICICI Bank</option>
                    <option className="bg-[#0a0418]">State Bank of India</option>
                    <option className="bg-[#0a0418]">Axis Bank</option>
                    <option className="bg-[#0a0418]">Kotak Mahindra Bank</option>
                  </select>
                </div>
              )}

              <div className="mt-2 flex items-center justify-between text-[11px] text-white/55">
                <span className="inline-flex items-center gap-1.5">
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-300" /> 256-bit TLS encryption
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Lock className="h-3.5 w-3.5" /> PCI-DSS compliant
                </span>
              </div>

              <LiquidButton
                type="submit"
                disabled={submitting}
                className="w-full justify-center"
              >
                {submitting ? "Processing..." : `Pay ₹${invoice.amount.toLocaleString("en-IN")} securely`}
              </LiquidButton>
            </form>
          </>
        )}
      </div>
    </div>
  )
}
