"use client"

import { AlertTriangle, ArrowRight } from "lucide-react"
import type { Service } from "@/lib/data"
import { cn } from "@/lib/utils"

interface ServiceCardProps {
  service: Service
  onClick?: () => void
}

export function ServiceCard({ service, onClick }: ServiceCardProps) {
  const getStatusBadge = () => {
    switch (service.status) {
      case "in_progress":
        return (
          <span className="rounded-md bg-orange-100 px-2.5 py-1 text-xs font-medium text-[#f97316]">
            In Progress
          </span>
        )
      case "completed":
        return (
          <span className="rounded-md bg-green-100 px-2.5 py-1 text-xs font-medium text-green-700">
            Completed
          </span>
        )
      case "action_required":
        return (
          <span className="rounded-md border border-[#f97316] bg-white px-2.5 py-1 text-xs font-medium text-[#f97316]">
            Action Required
          </span>
        )
    }
  }

  const getProgressColor = () => {
    switch (service.status) {
      case "completed":
        return "bg-green-500"
      case "action_required":
        return "bg-[#f97316]"
      default:
        return service.progress >= 50 ? "bg-[#f97316]" : "bg-amber-400"
    }
  }

  const getBorderColor = () => {
    switch (service.status) {
      case "action_required":
        return "border-[#f97316]"
      case "in_progress":
        return "border-amber-400"
      default:
        return "border-border"
    }
  }

  return (
    <div
      className={cn(
        "cursor-pointer rounded-xl border-l-4 bg-card p-5 shadow-sm transition-shadow hover:shadow-md",
        getBorderColor()
      )}
      onClick={onClick}
    >
      {/* Header */}
      <div className="mb-4 flex items-start justify-between">
        <div>
          <p className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            {service.category}
          </p>
          <h3 className="text-lg font-semibold text-foreground">{service.title}</h3>
        </div>
        {getStatusBadge()}
      </div>

      {/* Progress */}
      <div className="mb-3">
        <div className="mb-1 flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Overall Progress</span>
          <span className="text-sm font-medium text-foreground">{service.progress}%</span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100">
          <div
            className={cn("h-full rounded-full transition-all", getProgressColor())}
            style={{ width: `${service.progress}%` }}
          />
        </div>
      </div>

      {/* Current Step */}
      <div className="mb-4">
        {service.warningNote ? (
          <div className="flex items-center gap-2 text-sm">
            <AlertTriangle className="h-4 w-4 text-amber-500" />
            <span className="text-muted-foreground">Waiting for: </span>
            <span className="font-medium text-foreground">{service.currentStep}</span>
          </div>
        ) : service.status === "completed" ? (
          <p className="text-sm text-muted-foreground">
            {service.stepInfo} · <span className="font-medium text-foreground">{service.currentStep}</span>
          </p>
        ) : (
          <p className="text-sm text-muted-foreground">
            Current step: <span className="font-medium text-foreground">{service.currentStep}</span> · {service.stepInfo}
          </p>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between">
        <button className="flex items-center gap-1 text-sm font-medium text-[#f97316] hover:underline">
          {service.actionLabel}
          <ArrowRight className="h-4 w-4" />
        </button>
        <span className="text-sm text-muted-foreground">
          {service.completedAt ? `Completed ${service.completedAt}` : `Started ${service.startedAt}`}
        </span>
      </div>
    </div>
  )
}
