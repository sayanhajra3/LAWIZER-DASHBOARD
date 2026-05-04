import { Sidebar } from "@/components/sidebar"
import { Topbar } from "@/components/topbar"
import { KpiCards } from "@/components/kpi-cards"
import { PerformanceChart } from "@/components/performance-chart"
import { RevenueChart } from "@/components/revenue-chart"
import { IntentFunnel } from "@/components/intent-funnel"
import { LeadsTable } from "@/components/leads-table"
import { GeoCard } from "@/components/geo-card"
import { LawyerRoster } from "@/components/lawyer-roster"
import { PaymentGateway } from "@/components/payment-gateway"

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen w-full text-white">
      <Sidebar />

      <main className="flex min-w-0 flex-1 flex-col gap-6 px-4 py-6 md:px-6 md:py-8 lg:pr-6">
        <Topbar />

        <KpiCards />

        <section className="grid grid-cols-1 gap-5 xl:grid-cols-3">
          <div className="xl:col-span-2">
            <PerformanceChart />
          </div>
          <IntentFunnel />
        </section>

        <section className="grid grid-cols-1 gap-5 xl:grid-cols-3">
          <div className="xl:col-span-2">
            <RevenueChart />
          </div>
          <GeoCard />
        </section>

        <LeadsTable />

        <LawyerRoster />

        <PaymentGateway />

        <footer className="flex flex-col items-center justify-between gap-2 border-t border-white/5 pt-5 text-[11px] text-white/40 md:flex-row">
          <span>© 2026 Lawizer Private Limited · International Legal Services</span>
          <span>Crafted with extreme glassmorphism · v2.6</span>
        </footer>
      </main>
    </div>
  )
}
