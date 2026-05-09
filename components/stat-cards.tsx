"use client"

import { useEffect, useState } from "react"
import { collection, onSnapshot } from "firebase/firestore"
import { db as getDb } from "@/lib/firebase"
import { Clock, CheckCircle2, AlertCircle, Users, IndianRupee, Loader2 } from "lucide-react"
import { stats } from "@/lib/data"

type FirestoreStats = {
  totalCustomers: number
  totalRevenue: number
}

export function StatCards() {
  const [firestoreStats, setFirestoreStats] = useState<FirestoreStats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Subscribe to the customers collection in Firestore
    const customersRef = collection(getDb(), "customers")
    
    const unsubscribe = onSnapshot(
      customersRef,
      (snapshot) => {
        let totalCustomers = 0
        let totalRevenue = 0

        snapshot.forEach((doc) => {
          totalCustomers++
          const data = doc.data()
          // Sum up balance or payment field from each customer document
          const amount = data.balance ?? data.payment ?? data.revenue ?? data.amount ?? 0
          totalRevenue += Number(amount) || 0
        })

        setFirestoreStats({
          totalCustomers,
          totalRevenue,
        })
        setLoading(false)
      },
      (error) => {
        console.error("Error fetching customers:", error)
        setLoading(false)
      }
    )

    return () => unsubscribe()
  }, [])

  // Format currency for display
  const formatCurrency = (amount: number) => {
    if (amount >= 100000) {
      return `${(amount / 100000).toFixed(1)}L`
    } else if (amount >= 1000) {
      return `${(amount / 1000).toFixed(1)}K`
    }
    return amount.toLocaleString("en-IN")
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5">
      {/* Total Customers */}
      <div className="flex items-center gap-4 rounded-xl border border-border bg-card p-5 shadow-sm">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
          <Users className="h-6 w-6 text-blue-600" />
        </div>
        <div>
          {loading ? (
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          ) : (
            <p className="text-3xl font-bold text-foreground">
              {firestoreStats?.totalCustomers ?? 0}
            </p>
          )}
          <p className="text-sm text-muted-foreground">Total Customers</p>
        </div>
      </div>

      {/* Total Revenue */}
      <div className="flex items-center gap-4 rounded-xl border border-border bg-card p-5 shadow-sm">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100">
          <IndianRupee className="h-6 w-6 text-emerald-600" />
        </div>
        <div>
          {loading ? (
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          ) : (
            <p className="text-3xl font-bold text-foreground">
              {formatCurrency(firestoreStats?.totalRevenue ?? 0)}
            </p>
          )}
          <p className="text-sm text-muted-foreground">Total Revenue</p>
        </div>
      </div>

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
