import { Bell } from "lucide-react"
import { client } from "@/lib/data"

export function Header() {
  return (
    <header className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold text-foreground">My Services</h1>
        <p className="text-muted-foreground">
          Track all your active and completed filings in one place
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
  )
}
