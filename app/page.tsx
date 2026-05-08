"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { StatCards } from "@/components/stat-cards"
import { ServiceCard } from "@/components/service-card"
import { ServiceDetailPanel } from "@/components/service-detail-panel"
import { TalkToExpert } from "@/components/talk-to-expert"
import { services, type Service } from "@/lib/data"

export default function HomePage() {
  const [selectedService, setSelectedService] = useState<Service | null>(null)

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      
      <main className="ml-64 min-h-screen p-8">
        <div className="mx-auto max-w-6xl">
          <Header />
          
          {/* Stats */}
          <section className="mt-8">
            <StatCards />
          </section>

          {/* Active Services */}
          <section className="mt-10">
            <div className="mb-4">
              <h2 className="text-xl font-bold text-foreground">Active Services</h2>
              <p className="text-muted-foreground">
                Click on any service card to see the full step-by-step progress
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3">
              {services.map((service) => (
                <ServiceCard
                  key={service.id}
                  service={service}
                  onClick={() => setSelectedService(service)}
                />
              ))}
            </div>
          </section>
        </div>
      </main>

      {/* Detail Panel */}
      <ServiceDetailPanel
        service={selectedService}
        onClose={() => setSelectedService(null)}
      />

      {/* Floating CTA */}
      <TalkToExpert />
    </div>
  )
}
