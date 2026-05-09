"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { LayoutGrid, FileText, Headphones, User, Phone, LogOut, CreditCard } from "lucide-react"
import { client } from "@/lib/data"
import { cn } from "@/lib/utils"
import { signOut } from "firebase/auth"
import { auth } from "@/lib/firebase"

const menuItems = [
  { label: "My Services", href: "/", icon: LayoutGrid },
  { label: "Documents", href: "/documents", icon: FileText },
  { label: "Billing", href: "/billing", icon: CreditCard },
  { label: "Support & Help", href: "/support", icon: Headphones },
  { label: "Profile", href: "/profile", icon: User },
]

export function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = async () => {
    try {
      await signOut(auth)
      router.push("/login")
    } catch (error) {
      console.error("Logout failed:", error)
    }
  }

  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-64 flex-col bg-[#1a1f2e] text-white">
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f97316] text-xl font-bold">
          L
        </div>
        <span className="text-xl font-semibold tracking-tight">Lawizer</span>
      </div>

      {/* Client Info Card */}
      <div className="mx-4 mb-6 rounded-xl bg-[#252b3b] px-4 py-4">
        <p className="font-medium text-white">{client.name}</p>
        <p className="text-sm text-gray-400">Client ID: {client.clientId}</p>
      </div>

      {/* Menu Label */}
      <p className="px-6 pb-2 text-xs font-medium uppercase tracking-wider text-gray-500">
        Menu
      </p>

      {/* Navigation */}
      <nav className="flex-1 px-3">
        {menuItems.map((item) => {
          const isActive = pathname === item.href
          const Icon = item.icon

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "relative mb-1 flex items-center gap-3 rounded-lg px-3 py-3 text-[15px] font-medium transition-colors",
                isActive
                  ? "bg-[#f97316] text-white"
                  : "text-gray-300 hover:bg-[#252b3b] hover:text-white"
              )}
            >
              <Icon className="h-5 w-5" />
              {item.label}
              {item.label === "Documents" && !isActive && (
                <span className="absolute bottom-1 left-12 h-0.5 w-5 rounded-full bg-[#38bdf8]" />
              )}
            </Link>
            )
          })}

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="mt-4 flex w-full items-center gap-3 rounded-lg px-3 py-3 text-[15px] font-medium text-gray-300 transition-colors hover:bg-[#252b3b] hover:text-white"
          >
            <LogOut className="h-5 w-5" />
            Logout
          </button>
        </nav>

      {/* Help CTA */}
      <div className="m-4 rounded-xl bg-[#f97316] p-4">
        <div className="mb-2 flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-green-400" />
          <span className="text-sm font-semibold text-white">Need Help? Call Us</span>
        </div>
        <p className="mb-3 text-xs text-orange-100">
          Mon-Sat, 9AM-8PM · Always available
        </p>
        <div className="flex items-center gap-2">
          <Phone className="h-4 w-4 text-white" />
          <span className="font-semibold text-white">+91 90628 15535</span>
        </div>
      </div>
    </aside>
  )
}
