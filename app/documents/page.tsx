"use client"

import { Sidebar } from "@/components/sidebar"
import { Bell, FileText, Upload, Download, Search } from "lucide-react"
import { client } from "@/lib/data"

const documents = [
  {
    id: "1",
    name: "Logo / Wordmark",
    description: "Uploaded (PNG format)",
    service: "Trademark Registration",
    uploadedAt: "18 Jan 2026",
    status: "uploaded" as const,
  },
  {
    id: "2",
    name: "Form TM-48",
    description: "Signed and submitted",
    service: "Trademark Registration",
    uploadedAt: "18 Jan 2026",
    status: "uploaded" as const,
  },
  {
    id: "3",
    name: "Partnership Deed",
    description: "Required for PAN Application",
    service: "PAN Application — Firm",
    uploadedAt: "",
    status: "required" as const,
  },
  {
    id: "4",
    name: "GST Application Receipt",
    description: "Application reference document",
    service: "GST Registration",
    uploadedAt: "12 Jan 2026",
    status: "uploaded" as const,
  },
  {
    id: "5",
    name: "ITR-V Acknowledgement",
    description: "Filed and verified",
    service: "ITR-5 Filing (FY 2023-24)",
    uploadedAt: "9 Dec 2024",
    status: "uploaded" as const,
  },
  {
    id: "6",
    name: "Rent Agreement",
    description: "Signed and stamped",
    service: "Rent Agreement Drafting",
    uploadedAt: "3 Nov 2024",
    status: "uploaded" as const,
  },
]

export default function DocumentsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      
      <main className="ml-64 min-h-screen p-8">
        <div className="mx-auto max-w-6xl">
          {/* Header */}
          <header className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Documents</h1>
              <p className="text-muted-foreground">
                All your uploaded and required documents in one place
              </p>
            </div>
            <div className="flex items-center gap-4">
              <button className="relative rounded-full p-2 text-muted-foreground transition-colors hover:bg-gray-100 hover:text-foreground">
                <Bell className="h-5 w-5" />
              </button>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1a1f2e] font-semibold text-white">
                {client.initials}
              </div>
            </div>
          </header>

          {/* Search and Upload */}
          <div className="mt-8 flex items-center justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search documents..."
                className="w-full rounded-lg border border-border bg-card py-2.5 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-[#f97316] focus:outline-none focus:ring-1 focus:ring-[#f97316]"
              />
            </div>
            <button className="flex items-center gap-2 rounded-lg bg-[#f97316] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#ea580c]">
              <Upload className="h-4 w-4" />
              Upload Document
            </button>
          </div>

          {/* Documents List */}
          <div className="mt-8 space-y-3">
            {documents.map((doc) => (
              <div
                key={doc.id}
                className="flex items-center justify-between rounded-xl border border-border bg-card p-4 transition-shadow hover:shadow-sm"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-orange-100">
                    <FileText className="h-6 w-6 text-[#f97316]" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{doc.name}</p>
                    <p className="text-sm text-muted-foreground">{doc.description}</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">{doc.service}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  {doc.status === "uploaded" ? (
                    <>
                      <span className="text-sm text-muted-foreground">{doc.uploadedAt}</span>
                      <button className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-gray-50">
                        <Download className="h-4 w-4" />
                        Download
                      </button>
                    </>
                  ) : (
                    <button className="flex items-center gap-1.5 rounded-lg bg-[#f97316] px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-[#ea580c]">
                      <Upload className="h-4 w-4" />
                      Upload
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
