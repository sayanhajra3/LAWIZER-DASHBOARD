"use client"

import { useState } from "react"
import { X, FileText, Check } from "lucide-react"
import type { Service } from "@/lib/data"
import { trademarkDocuments } from "@/lib/data"
import { cn } from "@/lib/utils"

interface ServiceDetailPanelProps {
  service: Service | null
  onClose: () => void
}

export function ServiceDetailPanel({ service, onClose }: ServiceDetailPanelProps) {
  const [activeTab, setActiveTab] = useState<"workflow" | "documents" | "details">("documents")

  if (!service) return null

  const tabs = [
    { id: "workflow", label: "Workflow" },
    { id: "documents", label: "Documents" },
    { id: "details", label: "Details" },
  ] as const

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/20"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="fixed right-0 top-0 z-50 h-full w-full max-w-md overflow-y-auto bg-white shadow-xl">
        {/* Header */}
        <div className="sticky top-0 z-10 border-b border-border bg-white px-6 pb-4 pt-6">
          <div className="mb-1 flex items-start justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {service.category}
              </p>
              <h2 className="text-xl font-bold text-foreground">{service.title}</h2>
            </div>
            <button
              onClick={onClose}
              className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-gray-100 hover:text-foreground"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Tabs */}
          <div className="mt-4 flex gap-6 border-b border-border">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "relative pb-3 text-sm font-medium transition-colors",
                  activeTab === tab.id
                    ? "text-[#f97316]"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <span className="absolute bottom-0 left-0 h-0.5 w-full rounded-full bg-[#f97316]" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {activeTab === "documents" && (
            <div>
              <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Required Documents
              </h3>
              <div className="space-y-3">
                {trademarkDocuments.map((doc) => (
                  <div
                    key={doc.id}
                    className="flex items-center justify-between rounded-xl border border-border bg-gray-50 p-4"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-100">
                        <FileText className="h-5 w-5 text-[#f97316]" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{doc.name}</p>
                        <p className="text-sm text-muted-foreground">{doc.description}</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      {doc.status === "uploaded" ? (
                        <span className="flex items-center gap-1 text-sm font-medium text-green-600">
                          Uploaded
                          <Check className="h-4 w-4" />
                        </span>
                      ) : (
                        <>
                          <span className="text-sm font-medium text-[#f97316]">Required</span>
                          {doc.progress && (
                            <div className="h-1.5 w-16 overflow-hidden rounded-full bg-gray-200">
                              <div
                                className="h-full rounded-full bg-[#38bdf8]"
                                style={{ width: `${doc.progress}%` }}
                              />
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "workflow" && (
            <div className="text-center text-muted-foreground">
              <p>Workflow steps will be displayed here.</p>
            </div>
          )}

          {activeTab === "details" && (
            <div className="text-center text-muted-foreground">
              <p>Service details will be displayed here.</p>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
