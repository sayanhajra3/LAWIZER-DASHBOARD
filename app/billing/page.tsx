"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import { Sidebar } from "@/components/sidebar"
import { AuthGuard } from "@/components/auth-guard"
import { Bell, CreditCard, Check, Loader2, Crown, Zap, Building } from "lucide-react"
import { client } from "@/lib/data"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// Define subscription plans
const plans = [
  {
    id: "free",
    name: "Free Tier",
    description: "Basic access to legal services",
    price: "0",
    priceId: "", // No Stripe price ID for free tier
    features: [
      "Access to basic documents",
      "Email support",
      "1 active service",
      "Basic templates",
    ],
    icon: Zap,
    popular: false,
  },
  {
    id: "pro",
    name: "Pro Plan",
    description: "Everything you need for growing businesses",
    price: "1,999",
    priceId: process.env.NEXT_PUBLIC_STRIPE_PRO_PRICE_ID || "price_pro",
    features: [
      "Unlimited document uploads",
      "Priority support",
      "Up to 10 active services",
      "Advanced templates",
      "Dedicated account manager",
      "Legal consultation calls",
    ],
    icon: Crown,
    popular: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    description: "For large organizations with custom needs",
    price: "Custom",
    priceId: process.env.NEXT_PUBLIC_STRIPE_ENTERPRISE_PRICE_ID || "price_enterprise",
    features: [
      "Everything in Pro",
      "Custom integrations",
      "Unlimited services",
      "24/7 priority support",
      "SLA guarantees",
      "Dedicated legal team",
    ],
    icon: Building,
    popular: false,
  },
]

export default function BillingPage() {
  const { user } = useAuth()
  const searchParams = useSearchParams()
  const [loading, setLoading] = useState<string | null>(null)
  
  // For demo purposes, we'll assume the user is on the free tier
  // In production, you'd fetch this from your database based on the user's subscription
  const currentPlan = "free"
  
  const success = searchParams.get("success")
  const canceled = searchParams.get("canceled")

  const handleSubscribe = async (priceId: string, planId: string) => {
    if (!user || !priceId || planId === "free") return

    setLoading(planId)

    try {
      const response = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          priceId,
          userId: user.uid,
          userEmail: user.email,
        }),
      })

      const data = await response.json()

      if (data.url) {
        window.location.href = data.url
      } else {
        console.error("No checkout URL returned")
      }
    } catch (error) {
      console.error("Checkout error:", error)
    } finally {
      setLoading(null)
    }
  }

  const handleManageSubscription = async () => {
    // In production, you'd pass the actual Stripe customer ID
    // This would be stored in your database when the user subscribes
    const customerId = "cus_demo" // Replace with actual customer ID from database
    
    setLoading("manage")

    try {
      const response = await fetch("/api/stripe/portal", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customerId,
        }),
      })

      const data = await response.json()

      if (data.url) {
        window.location.href = data.url
      }
    } catch (error) {
      console.error("Portal error:", error)
    } finally {
      setLoading(null)
    }
  }

  return (
    <AuthGuard>
      <div className="min-h-screen bg-background">
        <Sidebar />
      
        <main className="ml-64 min-h-screen p-8">
          <div className="mx-auto max-w-6xl">
            {/* Header */}
            <header className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-foreground">Billing Center</h1>
                <p className="text-muted-foreground">
                  Manage your subscription and billing details
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

            {/* Success/Cancel Messages */}
            {success && (
              <div className="mt-6 rounded-lg border border-green-200 bg-green-50 p-4 text-green-800">
                <p className="font-medium">Payment successful!</p>
                <p className="text-sm">Your subscription has been activated. Thank you for your purchase.</p>
              </div>
            )}

            {canceled && (
              <div className="mt-6 rounded-lg border border-amber-200 bg-amber-50 p-4 text-amber-800">
                <p className="font-medium">Payment canceled</p>
                <p className="text-sm">Your payment was canceled. You can try again when you&apos;re ready.</p>
              </div>
            )}

            {/* Current Plan Status */}
            <Card className="mt-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Current Subscription
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-3">
                      <p className="text-xl font-semibold text-foreground">
                        {plans.find((p) => p.id === currentPlan)?.name || "Free Tier"}
                      </p>
                      <Badge variant={currentPlan === "free" ? "secondary" : "default"}>
                        {currentPlan === "free" ? "Free" : "Active"}
                      </Badge>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {currentPlan === "free"
                        ? "Upgrade to unlock more features and services"
                        : "Your subscription renews automatically"}
                    </p>
                  </div>
                  {currentPlan !== "free" && (
                    <Button
                      variant="outline"
                      onClick={handleManageSubscription}
                      disabled={loading === "manage"}
                    >
                      {loading === "manage" ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Loading...
                        </>
                      ) : (
                        "Manage Subscription"
                      )}
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Pricing Plans */}
            <div className="mt-10">
              <h2 className="text-xl font-semibold text-foreground">Choose a Plan</h2>
              <p className="mt-1 text-muted-foreground">
                Select the plan that best fits your legal needs
              </p>

              <div className="mt-6 grid gap-6 md:grid-cols-3">
                {plans.map((plan) => {
                  const Icon = plan.icon
                  const isCurrentPlan = plan.id === currentPlan
                  const isLoading = loading === plan.id

                  return (
                    <Card
                      key={plan.id}
                      className={`relative ${
                        plan.popular ? "border-[#f97316] shadow-lg" : ""
                      }`}
                    >
                      {plan.popular && (
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                          <Badge className="bg-[#f97316] hover:bg-[#ea580c]">
                            Most Popular
                          </Badge>
                        </div>
                      )}
                      <CardHeader>
                        <div className="flex items-center gap-3">
                          <div
                            className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                              plan.popular
                                ? "bg-orange-100"
                                : "bg-gray-100"
                            }`}
                          >
                            <Icon
                              className={`h-5 w-5 ${
                                plan.popular ? "text-[#f97316]" : "text-gray-600"
                              }`}
                            />
                          </div>
                          <div>
                            <CardTitle className="text-lg">{plan.name}</CardTitle>
                            <CardDescription>{plan.description}</CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="mb-6">
                          {plan.price === "Custom" ? (
                            <p className="text-3xl font-bold text-foreground">Custom</p>
                          ) : (
                            <div className="flex items-baseline">
                              <span className="text-3xl font-bold text-foreground">
                                {plan.price === "0" ? "Free" : `₹${plan.price}`}
                              </span>
                              {plan.price !== "0" && (
                                <span className="ml-1 text-muted-foreground">/month</span>
                              )}
                            </div>
                          )}
                        </div>
                        <ul className="space-y-3">
                          {plan.features.map((feature, index) => (
                            <li key={index} className="flex items-center gap-2">
                              <Check className="h-4 w-4 text-green-500" />
                              <span className="text-sm text-muted-foreground">
                                {feature}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                      <CardFooter>
                        <Button
                          className={`w-full ${
                            plan.popular
                              ? "bg-[#f97316] hover:bg-[#ea580c]"
                              : ""
                          }`}
                          variant={plan.popular ? "default" : "outline"}
                          disabled={isCurrentPlan || isLoading || plan.price === "Custom"}
                          onClick={() => handleSubscribe(plan.priceId, plan.id)}
                        >
                          {isLoading ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Processing...
                            </>
                          ) : isCurrentPlan ? (
                            "Current Plan"
                          ) : plan.price === "Custom" ? (
                            "Contact Sales"
                          ) : (
                            "Upgrade"
                          )}
                        </Button>
                      </CardFooter>
                    </Card>
                  )
                })}
              </div>
            </div>

            {/* Billing FAQ */}
            <Card className="mt-10">
              <CardHeader>
                <CardTitle>Frequently Asked Questions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="font-medium text-foreground">
                    Can I cancel my subscription anytime?
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Yes, you can cancel your subscription at any time. You&apos;ll continue to have access until the end of your billing period.
                  </p>
                </div>
                <div>
                  <p className="font-medium text-foreground">
                    What payment methods do you accept?
                  </p>
                  <p className="text-sm text-muted-foreground">
                    We accept all major credit cards, debit cards, and UPI payments through our secure payment partner Stripe.
                  </p>
                </div>
                <div>
                  <p className="font-medium text-foreground">
                    Can I upgrade or downgrade my plan?
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Yes, you can change your plan at any time. Changes will be prorated and reflected in your next billing cycle.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </AuthGuard>
  )
}
