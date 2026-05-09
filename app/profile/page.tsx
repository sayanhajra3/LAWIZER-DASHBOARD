"use client"

import { Sidebar } from "@/components/sidebar"
import { AuthGuard } from "@/components/auth-guard"
import { Bell, User, Mail, Phone, Building, Calendar } from "lucide-react"
import { client } from "@/lib/data"

export default function ProfilePage() {
  return (
    <AuthGuard>
      <div className="min-h-screen bg-background">
        <Sidebar />
        <main className="ml-64 min-h-screen p-8">
        <div className="mx-auto max-w-6xl">
          {/* Header */}
          <header className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Profile</h1>
              <p className="text-muted-foreground">
                Manage your account information
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

          {/* Profile Card */}
          <div className="mt-8 rounded-xl border border-border bg-card p-8">
            <div className="flex items-start gap-6">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#1a1f2e] text-2xl font-bold text-white">
                {client.initials}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground">{client.name}</h2>
                <p className="text-muted-foreground">Client ID: {client.clientId}</p>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-100">
                  <Mail className="h-5 w-5 text-[#f97316]" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium text-foreground">rahul.sharma@company.com</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-100">
                  <Phone className="h-5 w-5 text-[#f97316]" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <p className="font-medium text-foreground">+91 98765 43210</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-100">
                  <Building className="h-5 w-5 text-[#f97316]" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Company</p>
                  <p className="font-medium text-foreground">Northstone Ventures Pvt. Ltd.</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-100">
                  <Calendar className="h-5 w-5 text-[#f97316]" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Member Since</p>
                  <p className="font-medium text-foreground">January 2024</p>
                </div>
              </div>
            </div>

            <div className="mt-8 flex gap-3">
              <button className="rounded-lg bg-[#f97316] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#ea580c]">
                Edit Profile
              </button>
              <button className="rounded-lg border border-border px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-gray-50">
                Change Password
              </button>
            </div>
          </div>
        </div>
        </main>
      </div>
    </AuthGuard>
  )
}
