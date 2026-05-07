"use client"

import { LifeBuoy, MessageSquarePlus, BookOpen, Mail } from "lucide-react"
import { supportTickets } from "@/lib/data"
import { cn } from "@/lib/utils"

const statusTone: Record<string, string> = {
  Open: "bg-amber-300/15 text-amber-200 ring-amber-200/30",
  "Awaiting client": "bg-rose-300/15 text-rose-200 ring-rose-200/30",
  Resolved: "bg-emerald-300/15 text-emerald-200 ring-emerald-200/30",
}

export function SupportPanel() {
  return (
    <section id="support" className="glass-card relative overflow-hidden rounded-3xl p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/55">
            <LifeBuoy className="h-3.5 w-3.5" /> Support &amp; Help
          </div>
          <h2 className="mt-1 font-serif text-2xl tracking-tight">Need a hand?</h2>
          <p className="text-sm text-white/55">
            Open a ticket, browse the knowledge base, or talk to a real human.
          </p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-full bg-white/[0.06] px-3.5 py-2 text-xs font-medium text-white ring-1 ring-white/10 transition hover:bg-white/[0.12]">
          <MessageSquarePlus className="h-3.5 w-3.5" />
          New Ticket
        </button>
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[1.4fr_1fr]">
        <ul className="flex flex-col divide-y divide-white/5 overflow-hidden rounded-2xl border border-white/8 bg-white/[0.02]">
          {supportTickets.map((t) => (
            <li key={t.id} className="flex items-center gap-4 p-4">
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{t.subject}</p>
                <p className="truncate text-[11px] text-white/45">
                  {t.id} · Updated {t.updatedAt}
                </p>
              </div>
              <span
                className={cn(
                  "inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-medium ring-1",
                  statusTone[t.status],
                )}
              >
                {t.status}
              </span>
            </li>
          ))}
        </ul>

        <div className="flex flex-col gap-3">
          <a
            href="#"
            className="group flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-4 transition hover:bg-white/[0.07]"
          >
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-amber-300/15 ring-1 ring-amber-200/30">
              <BookOpen className="h-4 w-4 text-amber-200" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium">Knowledge Base</p>
              <p className="truncate text-[11px] text-white/55">
                Articles on registrations, taxes &amp; compliance.
              </p>
            </div>
          </a>
          <a
            href="mailto:hello@lawizer.co"
            className="group flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-4 transition hover:bg-white/[0.07]"
          >
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-cyan-300/15 ring-1 ring-cyan-200/30">
              <Mail className="h-4 w-4 text-cyan-200" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium">Email Support</p>
              <p className="truncate text-[11px] text-white/55">hello@lawizer.co · replies within 4h</p>
            </div>
          </a>
        </div>
      </div>
    </section>
  )
}
