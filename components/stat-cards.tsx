import { Clock, CheckCircle2, AlertCircle } from "lucide-react"
import { stats } from "@/lib/data"

export function StatCards() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {/* In Progress */}
      <div className="flex items-center gap-4 rounded-xl border border-border bg-card p-5 shadow-sm">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-100">
          <Clock className="h-6 w-6 text-[#f97316]" />
        </div>
        <div>
          <p className="text-3xl font-bold text-foreground">{stats.inProgress}</p>
          <p className="text-sm text-muted-foreground">In Progress</p>
        </div>
      </div>

      {/* Completed */}
      <div className="flex items-center gap-4 rounded-xl border border-border bg-card p-5 shadow-sm">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
          <CheckCircle2 className="h-6 w-6 text-green-600" />
        </div>
        <div>
          <p className="text-3xl font-bold text-foreground">{stats.completed}</p>
          <p className="text-sm text-muted-foreground">Completed</p>
        </div>
      </div>

      {/* Action Required */}
      <div className="flex items-center gap-4 rounded-xl border border-border bg-card p-5 shadow-sm">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-100">
          <AlertCircle className="h-6 w-6 text-amber-600" />
        </div>
        <div>
          <p className="text-3xl font-bold text-foreground">{stats.actionRequired}</p>
          <p className="text-sm text-muted-foreground">Action Required</p>
        </div>
      </div>
    </div>
  )
}
