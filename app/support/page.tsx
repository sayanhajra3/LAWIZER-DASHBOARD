"use client"

import { Sidebar } from "@/components/sidebar"
import { AuthGuard } from "@/components/auth-guard"
import { Bell, MessageCircle, Phone, Mail, HelpCircle } from "lucide-react"
import { client } from "@/lib/data"
import { TalkToExpert } from "@/components/talk-to-expert"

const faqs = [
  {
    question: "How long does GST registration take?",
    answer: "Typically 5-7 working days after document submission.",
  },
  {
    question: "What documents are needed for trademark registration?",
    answer: "Logo/wordmark, Form TM-48, and identity proof of partners.",
  },
  {
    question: "How can I track my service progress?",
    answer: "Click on any service card in My Services to view detailed workflow.",
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept UPI, credit/debit cards, and net banking.",
  },
]

export default function SupportPage() {
  return (
    <AuthGuard>
      <div className="min-h-screen bg-background">
        <Sidebar />
        <main className="ml-64 min-h-screen p-8">
        <div className="mx-auto max-w-6xl">
          {/* Header */}
          <header className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Support & Help</h1>
              <p className="text-muted-foreground">
                Get assistance with your legal services
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

          {/* Contact Options */}
          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="flex items-center gap-4 rounded-xl border border-border bg-card p-5">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-100">
                <Phone className="h-6 w-6 text-[#f97316]" />
              </div>
              <div>
                <p className="font-semibold text-foreground">Call Us</p>
                <p className="text-sm text-muted-foreground">+91 90628 15535</p>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-xl border border-border bg-card p-5">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                <MessageCircle className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="font-semibold text-foreground">WhatsApp</p>
                <p className="text-sm text-muted-foreground">Chat with us</p>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-xl border border-border bg-card p-5">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                <Mail className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="font-semibold text-foreground">Email</p>
                <p className="text-sm text-muted-foreground">support@lawizer.com</p>
              </div>
            </div>
          </div>

          {/* FAQs */}
          <section className="mt-10">
            <h2 className="mb-4 text-xl font-bold text-foreground">Frequently Asked Questions</h2>
            <div className="space-y-3">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="rounded-xl border border-border bg-card p-5"
                >
                  <div className="flex items-start gap-3">
                    <HelpCircle className="mt-0.5 h-5 w-5 text-[#f97316]" />
                    <div>
                      <p className="font-medium text-foreground">{faq.question}</p>
                      <p className="mt-1 text-sm text-muted-foreground">{faq.answer}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
        </main>
        <TalkToExpert />
      </div>
    </AuthGuard>
  )
}
