// Lawizer Client Dashboard data — mirrors the spec from the reference screenshots.
// In production this would come from your DB / API.

export type ServiceStatus = "in_progress" | "completed" | "action_required"
export type ServiceCategory =
  | "Startup & Business"
  | "Brand Protection"
  | "Tax Registration"
  | "Tax Filing"
  | "Documentation"
  | "Compliance"

export type WorkflowStep = {
  id: string
  title: string
  description: string
  status: "done" | "current" | "pending" | "blocked"
  completedAt?: string
}

export type Service = {
  id: string
  category: ServiceCategory
  title: string
  status: ServiceStatus
  progress: number
  currentStepLabel: string
  stepIndex: number
  totalSteps: number
  startedAt?: string
  completedAt?: string
  warningNote?: string
  primaryAction: { label: string; href: string }
  assignedLawyerId?: string
  amount?: number
  steps: WorkflowStep[]
}

export const client = {
  name: "Rahul Sharma",
  clientId: "LWZ-2034-0042",
  email: "rahul.sharma@northstone.co",
  company: "Northstone Ventures Pvt. Ltd.",
  country: "India",
  joinedAt: "12 Jan 2026",
  avatarInitials: "RS",
}

export const services: Service[] = [
  {
    id: "gst-registration",
    category: "Startup & Business",
    title: "GST Registration",
    status: "in_progress",
    progress: 60,
    currentStepLabel: "Document Verification — Step 3 of 5",
    stepIndex: 3,
    totalSteps: 5,
    startedAt: "12 Jan 2026",
    primaryAction: { label: "View Workflow", href: "#" },
    assignedLawyerId: "lw-1",
    amount: 4999,
    steps: [
      { id: "s1", title: "Application initiated", description: "GST REG-01 submitted on the portal.", status: "done", completedAt: "12 Jan 2026" },
      { id: "s2", title: "KYC & PAN linked", description: "Director PAN and Aadhaar verified via OTP.", status: "done", completedAt: "13 Jan 2026" },
      { id: "s3", title: "Document Verification", description: "Address proof, board resolution and bank statement under review by GSTN officer.", status: "current" },
      { id: "s4", title: "ARN & GSTIN issuance", description: "Allocation of Application Reference Number and GSTIN.", status: "pending" },
      { id: "s5", title: "Certificate delivery", description: "Final GST Registration Certificate delivered to your vault.", status: "pending" },
    ],
  },
  {
    id: "trademark-registration",
    category: "Brand Protection",
    title: "Trademark Registration",
    status: "in_progress",
    progress: 40,
    currentStepLabel: "TM-48 Application Filed — Step 2 of 5",
    stepIndex: 2,
    totalSteps: 5,
    startedAt: "08 Jan 2026",
    primaryAction: { label: "View Workflow", href: "#" },
    assignedLawyerId: "lw-2",
    amount: 7499,
    steps: [
      { id: "s1", title: "Trademark search", description: "Public register search for conflicts in classes 35 & 42.", status: "done", completedAt: "08 Jan 2026" },
      { id: "s2", title: "TM-48 Application Filed", description: "Authorization of agent (TM-48) executed and uploaded.", status: "current" },
      { id: "s3", title: "Examination report", description: "Awaiting examiner's report from the Trade Marks Registry.", status: "pending" },
      { id: "s4", title: "Journal publication", description: "Mark advertised for opposition window of 4 months.", status: "pending" },
      { id: "s5", title: "Registration certificate", description: "Final TM certificate issued and delivered.", status: "pending" },
    ],
  },
  {
    id: "pan-application",
    category: "Tax Registration",
    title: "PAN Application — Firm",
    status: "action_required",
    progress: 25,
    currentStepLabel: "Waiting for Partnership Deed upload",
    stepIndex: 2,
    totalSteps: 4,
    startedAt: "15 Jan 2026",
    warningNote: "Upload signed Partnership Deed to continue.",
    primaryAction: { label: "Upload Document", href: "#" },
    assignedLawyerId: "lw-1",
    amount: 1499,
    steps: [
      { id: "s1", title: "Form 49A drafted", description: "Application drafted with firm details.", status: "done", completedAt: "15 Jan 2026" },
      { id: "s2", title: "Awaiting Partnership Deed", description: "Signed and notarized Partnership Deed required to proceed.", status: "blocked" },
      { id: "s3", title: "Submission to NSDL", description: "Form 49A and supporting documents filed with NSDL.", status: "pending" },
      { id: "s4", title: "PAN allotment", description: "PAN issued and dispatched.", status: "pending" },
    ],
  },
  {
    id: "itr-5-filing",
    category: "Tax Filing",
    title: "ITR-5 Filing (FY 2023-24)",
    status: "completed",
    progress: 100,
    currentStepLabel: "All steps done — Acknowledgement received",
    stepIndex: 4,
    totalSteps: 4,
    startedAt: "21 Dec 2025",
    completedAt: "10 Jan 2026",
    primaryAction: { label: "Download Ack", href: "#" },
    assignedLawyerId: "lw-3",
    amount: 3999,
    steps: [
      { id: "s1", title: "Books reconciled", description: "P&L and Balance Sheet finalized.", status: "done", completedAt: "26 Dec 2025" },
      { id: "s2", title: "Computation prepared", description: "Tax computation and disclosures drafted.", status: "done", completedAt: "02 Jan 2026" },
      { id: "s3", title: "Return filed", description: "ITR-5 filed on the income tax portal.", status: "done", completedAt: "08 Jan 2026" },
      { id: "s4", title: "Acknowledgement received", description: "ITR-V received and e-verified.", status: "done", completedAt: "10 Jan 2026" },
    ],
  },
  {
    id: "rent-agreement",
    category: "Documentation",
    title: "Rent Agreement Drafting",
    status: "completed",
    progress: 100,
    currentStepLabel: "Draft delivered, signed and shared",
    stepIndex: 3,
    totalSteps: 3,
    startedAt: "02 Jan 2026",
    completedAt: "06 Jan 2026",
    primaryAction: { label: "View Document", href: "#" },
    assignedLawyerId: "lw-2",
    amount: 1999,
    steps: [
      { id: "s1", title: "Brief & clauses", description: "Lease terms, security deposit and lock-in negotiated.", status: "done", completedAt: "03 Jan 2026" },
      { id: "s2", title: "Draft delivered", description: "Lawyer-vetted draft shared on portal.", status: "done", completedAt: "05 Jan 2026" },
      { id: "s3", title: "Signed & shared", description: "e-Stamped, signed and stored in your vault.", status: "done", completedAt: "06 Jan 2026" },
    ],
  },
  {
    id: "annual-compliance",
    category: "Compliance",
    title: "Annual ROC Compliance",
    status: "in_progress",
    progress: 15,
    currentStepLabel: "Data collection — Step 1 of 6",
    stepIndex: 1,
    totalSteps: 6,
    startedAt: "20 Jan 2026",
    primaryAction: { label: "View Workflow", href: "#" },
    assignedLawyerId: "lw-3",
    amount: 8999,
    steps: [
      { id: "s1", title: "Data collection", description: "Financials, registers and minutes being gathered.", status: "current" },
      { id: "s2", title: "AOC-4 preparation", description: "Financial statements form drafting.", status: "pending" },
      { id: "s3", title: "MGT-7 preparation", description: "Annual return drafting.", status: "pending" },
      { id: "s4", title: "Director approvals", description: "Board sign-offs and DSC affixation.", status: "pending" },
      { id: "s5", title: "ROC filing", description: "Filings submitted to Ministry of Corporate Affairs.", status: "pending" },
      { id: "s6", title: "Receipts archived", description: "Challans saved to vault.", status: "pending" },
    ],
  },
]

export type Lawyer = {
  id: string
  name: string
  specialty: string
  rating: number
  cases: number
  online: boolean
  avatar: string
  region: string
}

export const lawyers: Lawyer[] = [
  { id: "lw-1", name: "Adv. Priya Menon", specialty: "Tax & GST", rating: 4.9, cases: 142, online: true, avatar: "PM", region: "Mumbai, IN" },
  { id: "lw-2", name: "Adv. Karan Bhatia", specialty: "IP & Trademarks", rating: 4.8, cases: 96, online: true, avatar: "KB", region: "Bengaluru, IN" },
  { id: "lw-3", name: "CA Neha Iyer", specialty: "Corporate Compliance", rating: 4.95, cases: 211, online: false, avatar: "NI", region: "Delhi, IN" },
]

export type ClientDocument = {
  id: string
  name: string
  service: string
  uploadedAt: string
  size: string
  kind: string
}

export const documents: ClientDocument[] = [
  { id: "d1", name: "Certificate_of_Incorporation.pdf", service: "Annual ROC Compliance", uploadedAt: "12 Jan 2026", size: "412 KB", kind: "Certificate" },
  { id: "d2", name: "ITR-V_FY2023-24.pdf", service: "ITR-5 Filing", uploadedAt: "10 Jan 2026", size: "188 KB", kind: "Acknowledgement" },
  { id: "d3", name: "Rent_Agreement_Signed.pdf", service: "Rent Agreement Drafting", uploadedAt: "06 Jan 2026", size: "1.2 MB", kind: "Agreement" },
  { id: "d4", name: "Trademark_Search_Report.pdf", service: "Trademark Registration", uploadedAt: "08 Jan 2026", size: "642 KB", kind: "Report" },
  { id: "d5", name: "GST_Application_Receipt.pdf", service: "GST Registration", uploadedAt: "12 Jan 2026", size: "94 KB", kind: "Receipt" },
]

export type Invoice = {
  id: string
  service: string
  amount: number
  status: "Paid" | "Due" | "Pending"
  issuedAt: string
}

export const invoices: Invoice[] = [
  { id: "INV-2026-0042-01", service: "GST Registration", amount: 4999, status: "Paid", issuedAt: "12 Jan 2026" },
  { id: "INV-2026-0042-02", service: "Trademark Registration", amount: 7499, status: "Paid", issuedAt: "08 Jan 2026" },
  { id: "INV-2026-0042-03", service: "PAN Application", amount: 1499, status: "Due", issuedAt: "15 Jan 2026" },
  { id: "INV-2026-0042-04", service: "Annual ROC Compliance", amount: 8999, status: "Due", issuedAt: "20 Jan 2026" },
  { id: "INV-2026-0042-05", service: "Rent Agreement Drafting", amount: 1999, status: "Paid", issuedAt: "02 Jan 2026" },
]

export const stats = {
  inProgress: services.filter((s) => s.status === "in_progress").length,
  completed: services.filter((s) => s.status === "completed").length,
  actionRequired: services.filter((s) => s.status === "action_required").length,
}

export type SupportTicket = {
  id: string
  subject: string
  status: "Open" | "Awaiting client" | "Resolved"
  updatedAt: string
}

export const supportTickets: SupportTicket[] = [
  { id: "TKT-2026-118", subject: "Need clarification on GST step 3", status: "Open", updatedAt: "20 Jan 2026" },
  { id: "TKT-2026-104", subject: "Trademark class question", status: "Awaiting client", updatedAt: "18 Jan 2026" },
  { id: "TKT-2026-091", subject: "Rent agreement amendment", status: "Resolved", updatedAt: "07 Jan 2026" },
]
