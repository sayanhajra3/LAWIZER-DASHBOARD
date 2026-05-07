"use client"

import { useState } from "react"
import {
  ArrowRight,
  Upload,
  Download,
  FileSignature,
  Eye,
  AlertTriangle,
  CheckCircle2,
  CircleDot,
  Lock,
  ChevronDown,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { services, lawyers } from "@/lib/data"
import type { Service, ServiceStatus, WorkflowStep } from "@/lib/data"

const statusBadge: Record<
  ServiceStatus,
  { label: string; bg: string; text: string; ring: string; bar: string }
> = {
  in_progress: {
    label: "In Progress",
    bg: "bg-amber-300/15",
    text: "text-amber-200",
    ring: "ring-amber-200/30",
    bar: "from-amber-300 via-orange-300 to-amber-200",
  },
  completed: {
    label: "Completed",
    bg: "bg-emerald-300/15",
    text: "text-emerald-200",
    ring: "ring-emerald-200/30",
    bar: "from-emerald-400 via-emerald-300 to-teal-200",
  },
  action_required: {
    label: "Action Required",
    bg: "bg-rose-300/15",
    text: "text-rose-200",
    ring: "ring-rose-200/30",
    bar: "from-rose-400 via-rose-300 to-orange-200",
  },
}

function actionIcon(label: string) {
  if (label.toLowerCase().includes("upload")) return Upload
  if (label.toLowerCase().includes("download")) return Download
  if (label.toLowerCase().includes("document")) return FileSignature
  if (label.toLowerCase().includes("view")) return Eye
  return ArrowRight
}

export function ServicesGrid() {
  const [expanded, setExpanded] = useState<string | null>(services[0]?.id ?? null)

  return (
    <section id="services" className="flex flex-col gap-4">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl tracking-tight">Active Services</h2>
          <p className="text-sm text-white/55">
            Click on any service card to see the full step-by-step progress.
          </p>
        </div>
        <button className="hidden rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-white/70 transition hover:bg-white/[0.08] hover:text-white sm:inline-flex">
          Sort: Newest
          <ChevronDown className="ml-1 inline h-3 w-3" />
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {services.map((s) => (
          <ServiceCard
            key={s.id}
            service={s}
            expanded={expanded === s.id}
            onToggle={() => setExpanded(expanded === s.id ? null : s.id)}
          />
        ))}
      </div>
    </section>
  )
}

function ServiceCard({
  service,
  expanded,
  onToggle,
}: {
  service: Service
  expanded: boolean
  onToggle: () => void
}) {
  const tone = statusBadge[service.status]
  const ActionIcon = actionIcon(service.primaryAction.label)
  const lawyer = lawyers.find((l) => l.id === service.assignedLawyerId)

  return (
    <article
      className={cn(
        "glass-card group relative flex flex-col overflow-hidden rounded-3xl p-5 transition-all",
        expanded && "md:col-span-2 xl:col-span-3",
      )}
    >
      {/* Top row: category + status */}
      <div className="flex items-start justify-between gap-3">
        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/55">
          {service.category}
        </p>
        <span
          className={cn(
            "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-medium ring-1",
            tone.bg,
            tone.text,
            tone.ring,
          )}
        >
          <span
            className={cn(
              "h-1.5 w-1.5 rounded-full",
              service.status === "completed"
                ? "bg-emerald-300"
                : service.status === "in_progress"
                  ? "bg-amber-300"
                  : "bg-rose-300",
            )}
          />
          {tone.label}
        </span>
      </div>

      <h3 className="mt-3 font-serif text-xl leading-tight tracking-tight">{service.title}</h3>

      {/* Progress */}
      <div className="mt-5">
        <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.18em] text-white/45">
          <span>Overall Progress</span>
          <span className="font-semibold text-white/85">{service.progress}%</span>
        </div>
        <div className="relative mt-2 h-1.5 overflow-hidden rounded-full bg-white/8">
          <div
            className={cn("absolute inset-y-0 left-0 rounded-full bg-gradient-to-r transition-all", tone.bar)}
            style={{ width: `${service.progress}%` }}
          >
            <div className="absolute inset-0 animate-[shimmer_2.4s_linear_infinite] bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.5),transparent)] bg-[length:200%_100%]" />
          </div>
        </div>
      </div>

      {/* Current step */}
      <div className="mt-4 rounded-2xl border border-white/8 bg-white/[0.03] p-3">
        <div className="flex items-start gap-2">
          {service.status === "action_required" ? (
            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-rose-300" />
          ) : service.status === "completed" ? (
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" />
          ) : (
            <CircleDot className="mt-0.5 h-4 w-4 shrink-0 text-amber-300" />
          )}
          <div className="min-w-0">
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/45">
              {service.status === "completed" ? "Final step" : "Current step"}
            </p>
            <p className="mt-0.5 text-sm leading-snug text-white/90">{service.currentStepLabel}</p>
            {service.warningNote && (
              <p className="mt-1 text-[11px] text-rose-200/90">{service.warningNote}</p>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <p className="text-[11px] text-white/45">
          {service.status === "completed"
            ? `Completed on ${service.completedAt}`
            : `Started ${service.startedAt}`}
        </p>
        <button
          onClick={onToggle}
          className="inline-flex items-center gap-1.5 rounded-full bg-white/[0.06] px-3 py-1.5 text-xs font-medium text-white/85 ring-1 ring-white/10 transition hover:bg-white/[0.12] hover:text-white"
        >
          <ActionIcon className="h-3.5 w-3.5" />
          {service.primaryAction.label}
          <ArrowRight className={cn("h-3 w-3 transition-transform", expanded && "rotate-90")} />
        </button>
      </div>

      {/* Expanded workflow */}
      {expanded && (
        <div className="mt-6 grid gap-6 border-t border-white/10 pt-6 lg:grid-cols-[1.4fr_1fr]">
          <Workflow steps={service.steps} />
          <div className="flex flex-col gap-4">
            {lawyer && (
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/45">
                  Assigned Lawyer
                </p>
                <div className="mt-3 flex items-center gap-3">
                  <div className="relative">
                    <div className="grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br from-cyan-300/80 to-indigo-300/80 text-sm font-semibold text-[#1a1230]">
                      {lawyer.avatar}
                    </div>
                    <span
                      className={cn(
                        "absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full ring-2 ring-[#0a0418]",
                        lawyer.online ? "bg-emerald-400" : "bg-white/40",
                      )}
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{lawyer.name}</p>
                    <p className="truncate text-[11px] text-white/55">
                      {lawyer.specialty} · {lawyer.region}
                    </p>
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-between text-[11px] text-white/55">
                  <span>★ {lawyer.rating}</span>
                  <span>{lawyer.cases} cases</span>
                </div>
                <button className="mt-3 inline-flex w-full items-center justify-center gap-1.5 rounded-xl bg-white/[0.06] px-3 py-2 text-xs font-medium ring-1 ring-white/10 transition hover:bg-white/[0.12]">
                  Message lawyer
                </button>
              </div>
            )}
            {service.amount !== undefined && (
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/45">
                  Service fee
                </p>
                <p className="mt-2 font-serif text-3xl tracking-tight">
                  ₹{service.amount.toLocaleString("en-IN")}
                </p>
                <p className="mt-1 text-[11px] text-white/50">
                  Inclusive of govt. fees & lawyer charges
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </article>
  )
}

function Workflow({ steps }: { steps: WorkflowStep[] }) {
  return (
    <ol className="relative flex flex-col gap-4">
      {steps.map((step, i) => {
        const isLast = i === steps.length - 1
        return (
          <li key={step.id} className="relative flex gap-4">
            {!isLast && (
              <span
                aria-hidden
                className={cn(
                  "absolute left-[15px] top-8 h-[calc(100%-12px)] w-px",
                  step.status === "done" ? "bg-emerald-400/40" : "bg-white/10",
                )}
              />
            )}
            <div
              className={cn(
                "relative z-10 grid h-8 w-8 shrink-0 place-items-center rounded-full ring-1",
                step.status === "done" && "bg-emerald-400/20 ring-emerald-300/40 text-emerald-200",
                step.status === "current" && "bg-amber-400/20 ring-amber-300/40 text-amber-200",
                step.status === "blocked" && "bg-rose-400/20 ring-rose-300/40 text-rose-200",
                step.status === "pending" && "bg-white/[0.04] ring-white/10 text-white/40",
              )}
            >
              {step.status === "done" && <CheckCircle2 className="h-4 w-4" />}
              {step.status === "current" && (
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-300/70" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-amber-300" />
                </span>
              )}
              {step.status === "blocked" && <Lock className="h-3.5 w-3.5" />}
              {step.status === "pending" && <CircleDot className="h-3.5 w-3.5" />}
            </div>
            <div className="flex min-w-0 flex-1 flex-col pb-2">
              <div className="flex items-center justify-between gap-3">
                <p
                  className={cn(
                    "text-sm font-medium",
                    step.status === "pending" ? "text-white/55" : "text-white",
                  )}
                >
                  {step.title}
                </p>
                {step.completedAt && (
                  <span className="shrink-0 text-[11px] text-white/45">{step.completedAt}</span>
                )}
              </div>
              <p className="mt-0.5 text-xs leading-relaxed text-white/55">{step.description}</p>
            </div>
          </li>
        )
      })}
    </ol>
  )
}
