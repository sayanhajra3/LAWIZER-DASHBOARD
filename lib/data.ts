// Mock data for the Lawizer dashboard. In production this would come from your DB.

export type IntentLevel = "Cold" | "Warm" | "Hot" | "Closing";

export type Lead = {
  id: string;
  name: string;
  country: string;
  flag: string;
  service: string;
  intent: IntentLevel;
  intentScore: number; // 0 - 100
  followupHours: number; // hours since last followup
  lawyer: string;
  stage:
    | "Inquiry"
    | "Documents"
    | "Lawyer Match"
    | "Filing"
    | "Booked"
    | "Registered";
  value: number; // USD
  createdAt: string;
};

export const performanceData = [
  { day: "Mon", visits: 2400, leads: 320, conversions: 110 },
  { day: "Tue", visits: 2900, leads: 410, conversions: 168 },
  { day: "Wed", visits: 2200, leads: 380, conversions: 142 },
  { day: "Thu", visits: 3400, leads: 520, conversions: 225 },
  { day: "Fri", visits: 4100, leads: 610, conversions: 298 },
  { day: "Sat", visits: 3700, leads: 540, conversions: 246 },
  { day: "Sun", visits: 4500, leads: 680, conversions: 332 },
];

export const revenueData = [
  { month: "Jan", revenue: 184000, target: 160000 },
  { month: "Feb", revenue: 212000, target: 180000 },
  { month: "Mar", revenue: 198000, target: 200000 },
  { month: "Apr", revenue: 256000, target: 220000 },
  { month: "May", revenue: 289000, target: 240000 },
  { month: "Jun", revenue: 312000, target: 260000 },
  { month: "Jul", revenue: 348000, target: 280000 },
  { month: "Aug", revenue: 392000, target: 300000 },
  { month: "Sep", revenue: 421000, target: 320000 },
  { month: "Oct", revenue: 468000, target: 340000 },
  { month: "Nov", revenue: 512000, target: 360000 },
  { month: "Dec", revenue: 564000, target: 380000 },
];

export const intentDistribution = [
  { name: "Hot", value: 38, color: "#ff5733" },
  { name: "Warm", value: 27, color: "#fbbf24" },
  { name: "Closing", value: 18, color: "#ec4899" },
  { name: "Cold", value: 17, color: "#06b6d4" },
];

export const serviceMix = [
  { name: "Pvt Ltd Reg.", value: 42 },
  { name: "LLC Setup", value: 28 },
  { name: "Trademark", value: 14 },
  { name: "Tax Filing", value: 9 },
  { name: "Compliance", value: 7 },
];

export const leads: Lead[] = [
  {
    id: "LZ-2841",
    name: "Aiko Tanaka",
    country: "Japan",
    flag: "🇯🇵",
    service: "Pvt Ltd Registration",
    intent: "Hot",
    intentScore: 92,
    followupHours: 2,
    lawyer: "S. Mehra",
    stage: "Lawyer Match",
    value: 4200,
    createdAt: "2h ago",
  },
  {
    id: "LZ-2840",
    name: "Daniel O'Connor",
    country: "Ireland",
    flag: "🇮🇪",
    service: "LLC + Tax Filing",
    intent: "Closing",
    intentScore: 96,
    followupHours: 1,
    lawyer: "P. Khanna",
    stage: "Filing",
    value: 6800,
    createdAt: "3h ago",
  },
  {
    id: "LZ-2839",
    name: "Sofia Martinez",
    country: "Spain",
    flag: "🇪🇸",
    service: "Trademark Registration",
    intent: "Warm",
    intentScore: 71,
    followupHours: 8,
    lawyer: "R. Iyer",
    stage: "Documents",
    value: 1800,
    createdAt: "5h ago",
  },
  {
    id: "LZ-2838",
    name: "Mohammed Al-Hassan",
    country: "UAE",
    flag: "🇦🇪",
    service: "Pvt Ltd + Compliance",
    intent: "Hot",
    intentScore: 88,
    followupHours: 4,
    lawyer: "A. Verma",
    stage: "Booked",
    value: 5400,
    createdAt: "8h ago",
  },
  {
    id: "LZ-2837",
    name: "Priya Raghavan",
    country: "Singapore",
    flag: "🇸🇬",
    service: "LLC Setup",
    intent: "Closing",
    intentScore: 94,
    followupHours: 1,
    lawyer: "S. Mehra",
    stage: "Filing",
    value: 7200,
    createdAt: "11h ago",
  },
  {
    id: "LZ-2836",
    name: "Lucas Almeida",
    country: "Brazil",
    flag: "🇧🇷",
    service: "Compliance Audit",
    intent: "Warm",
    intentScore: 64,
    followupHours: 14,
    lawyer: "P. Khanna",
    stage: "Inquiry",
    value: 1200,
    createdAt: "1d ago",
  },
  {
    id: "LZ-2835",
    name: "Emma Schmidt",
    country: "Germany",
    flag: "🇩🇪",
    service: "Pvt Ltd Registration",
    intent: "Hot",
    intentScore: 85,
    followupHours: 3,
    lawyer: "R. Iyer",
    stage: "Documents",
    value: 3900,
    createdAt: "1d ago",
  },
  {
    id: "LZ-2834",
    name: "Noah Williams",
    country: "Canada",
    flag: "🇨🇦",
    service: "Trademark + Tax",
    intent: "Cold",
    intentScore: 32,
    followupHours: 36,
    lawyer: "A. Verma",
    stage: "Inquiry",
    value: 800,
    createdAt: "2d ago",
  },
];

export const lawyerFreelancers = [
  {
    name: "Sneha Mehra",
    role: "Corporate Law",
    rating: 4.9,
    cases: 142,
    online: true,
    color: "from-orange-400 to-pink-500",
  },
  {
    name: "Pranav Khanna",
    role: "Tax & Compliance",
    rating: 4.8,
    cases: 118,
    online: true,
    color: "from-cyan-400 to-blue-500",
  },
  {
    name: "Riya Iyer",
    role: "IP & Trademarks",
    rating: 4.9,
    cases: 96,
    online: false,
    color: "from-amber-400 to-orange-500",
  },
  {
    name: "Arjun Verma",
    role: "International Reg.",
    rating: 5.0,
    cases: 173,
    online: true,
    color: "from-pink-400 to-rose-500",
  },
];

export const recentBookings = [
  { time: "09:00", client: "Aiko Tanaka", topic: "Pvt Ltd Filing Review", duration: "45m" },
  { time: "10:30", client: "Daniel O'Connor", topic: "LLC Documentation", duration: "60m" },
  { time: "12:15", client: "Priya Raghavan", topic: "Singapore Filing Sync", duration: "30m" },
  { time: "14:00", client: "Mohammed Al-Hassan", topic: "Compliance Audit", duration: "60m" },
  { time: "16:30", client: "Sofia Martinez", topic: "Trademark Strategy", duration: "45m" },
];
