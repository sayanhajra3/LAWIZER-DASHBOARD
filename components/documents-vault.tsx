"use client"

import { FileText, Download, Upload, FolderLock } from "lucide-react"
import { documents } from "@/lib/data"

export function DocumentsVault() {
  return (
    <section id="documents" className="glass-card relative overflow-hidden rounded-3xl p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/55">
            <FolderLock className="h-3.5 w-3.5" /> Documents Vault
          </div>
          <h2 className="mt-1 font-serif text-2xl tracking-tight">Your Legal Documents</h2>
          <p className="text-sm text-white/55">All certificates, agreements and acknowledgements in one secure place.</p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-full bg-white/[0.06] px-3.5 py-2 text-xs font-medium text-white ring-1 ring-white/10 transition hover:bg-white/[0.12]">
          <Upload className="h-3.5 w-3.5" />
          Upload
        </button>
      </div>

      <ul className="mt-5 flex flex-col divide-y divide-white/5 overflow-hidden rounded-2xl border border-white/8 bg-white/[0.02]">
        {documents.map((doc) => (
          <li
            key={doc.id}
            className="flex items-center gap-4 p-3.5 transition hover:bg-white/[0.04]"
          >
            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-amber-200/30 to-rose-300/20 ring-1 ring-white/10">
              <FileText className="h-4 w-4 text-amber-200" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">{doc.name}</p>
              <p className="truncate text-[11px] text-white/50">
                {doc.kind} · {doc.service} · {doc.size}
              </p>
            </div>
            <span className="hidden text-[11px] text-white/45 md:inline">{doc.uploadedAt}</span>
            <button
              aria-label={`Download ${doc.name}`}
              className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white/[0.04] text-white/70 ring-1 ring-white/10 transition hover:bg-white/[0.1] hover:text-white"
            >
              <Download className="h-4 w-4" />
            </button>
          </li>
        ))}
      </ul>
    </section>
  )
}
