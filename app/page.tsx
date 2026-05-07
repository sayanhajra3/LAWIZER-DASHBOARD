import { Sidebar } from "@/components/sidebar"
import { Topbar } from "@/components/topbar"
import { StatusStats } from "@/components/status-stats"
import { ServicesGrid } from "@/components/services-grid"
import { DocumentsVault } from "@/components/documents-vault"
import { LegalTeam } from "@/components/legal-team"
import { InvoicesPanel } from "@/components/invoices-panel"
import { SupportPanel } from "@/components/support-panel"

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen w-full text-white">
      <Sidebar />

      <main className="flex min-w-0 flex-1 flex-col gap-6 px-4 py-6 md:px-6 md:py-8 lg:pr-6">
        <Topbar />

        <StatusStats />

        <ServicesGrid />

        <LegalTeam />

        <InvoicesPanel />

        <DocumentsVault />

        <SupportPanel />

        <footer className="flex flex-col items-center justify-between gap-2 border-t border-white/5 pt-5 text-[11px] text-white/40 md:flex-row">
          <span>© 2026 Lawizer Private Limited · International Legal Service Tracker</span>
          <span>Client Portal · v3.0</span>
        </footer>
      </main>
    </div>
  )
}
