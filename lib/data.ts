export type ServiceStatus = "in_progress" | "completed" | "action_required"

export type Service = {
  id: string
  category: string
  title: string
  status: ServiceStatus
  progress: number
  currentStep: string
  stepInfo: string
  startedAt?: string
  completedAt?: string
  warningNote?: string
  actionLabel: string
  actionType: "workflow" | "upload" | "download" | "view"
}

export type Document = {
  id: string
  name: string
  description: string
  status: "uploaded" | "required" | "pending"
  progress?: number
}

export const client = {
  name: "Rahul Sharma",
  clientId: "LWZ-2024-00142",
  initials: "RS",
}

export const services: Service[] = [
  {
    id: "gst-registration",
    category: "STARTUP & BUSINESS",
    title: "GST Registration",
    status: "in_progress",
    progress: 60,
    currentStep: "Document Verification",
    stepInfo: "Step 3 of 5",
    startedAt: "12 Jan 2026",
    actionLabel: "View Workflow",
    actionType: "workflow",
  },
  {
    id: "trademark-registration",
    category: "BRAND PROTECTION",
    title: "Trademark Registration",
    status: "in_progress",
    progress: 40,
    currentStep: "TM-48 Application Filed",
    stepInfo: "Step 2 of 5",
    startedAt: "18 Jan 2026",
    actionLabel: "View Workflow",
    actionType: "workflow",
  },
  {
    id: "pan-application",
    category: "TAX REGISTRATION",
    title: "PAN Application — Firm",
    status: "action_required",
    progress: 25,
    currentStep: "Partnership Deed upload",
    stepInfo: "",
    startedAt: "20 Jan 2026",
    warningNote: "Waiting for: Partnership Deed upload",
    actionLabel: "Upload Document",
    actionType: "upload",
  },
  {
    id: "itr-5-filing",
    category: "ITR FILING",
    title: "ITR-5 Filing (FY 2023-24)",
    status: "completed",
    progress: 100,
    currentStep: "Acknowledgement received",
    stepInfo: "All steps done",
    completedAt: "9 Dec 2024",
    actionLabel: "Download Ack",
    actionType: "download",
  },
  {
    id: "rent-agreement",
    category: "DOCUMENTATION",
    title: "Rent Agreement Drafting",
    status: "completed",
    progress: 100,
    currentStep: "Signed and shared",
    stepInfo: "Draft delivered",
    completedAt: "3 Nov 2024",
    actionLabel: "View Document",
    actionType: "view",
  },
]

export const trademarkDocuments: Document[] = [
  {
    id: "doc-1",
    name: "Logo / Wordmark",
    description: "Uploaded (PNG format)",
    status: "uploaded",
  },
  {
    id: "doc-2",
    name: "Form TM-48",
    description: "Signed and submitted",
    status: "uploaded",
  },
  {
    id: "doc-3",
    name: "Identity Proof (Partners)",
    description: "Pending from 1 partner",
    status: "required",
    progress: 60,
  },
]

export const stats = {
  inProgress: services.filter((s) => s.status === "in_progress").length,
  completed: services.filter((s) => s.status === "completed").length,
  actionRequired: services.filter((s) => s.status === "action_required").length,
}
