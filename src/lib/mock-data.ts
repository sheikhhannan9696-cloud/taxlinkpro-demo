// Centralized mock data for TaxLink Pro UI.

export type Environment = "sandbox" | "production";
export type InvoiceStatus = "submitted" | "failed" | "draft" | "pending";


export const currency = (n: number) =>
  new Intl.NumberFormat("en-PK", { style: "currency", currency: "PKR", maximumFractionDigits: 0 }).format(n);

export const num = (n: number) => new Intl.NumberFormat("en-US").format(n);

export const kpis = {
  totalInvoices: 1284,
  successful: 1142,
  failed: 38,
  drafts: 24,
  buyers: 312,
  products: 187,
  readiness: 72,
  revenueMTD: 48230000,
  taxCollectedMTD: 8120000,
};

export type Invoice = {
  id: string;
  ref: string;
  date: string;
  buyer: string;
  buyerCode: string;
  amount: number;
  tax: number;
  status: InvoiceStatus;
  env: Environment;
  scenario?: string;
  poNumber?: string;
  saleType: string;
  items: number;
};

export const invoices: Invoice[] = [
  { id: "INV-2025-0241", ref: "FBR-9824", date: "2025-04-25", buyer: "Muller & Phipps Pakistan", buyerCode: "B-0042", amount: 482350, tax: 82000, status: "submitted", env: "production", saleType: "Pharmaceutical", items: 6, poNumber: "PO-7821" },
  { id: "INV-2025-0240", ref: "FBR-9823", date: "2025-04-25", buyer: "United Distributors Pakistan", buyerCode: "B-0091", amount: 128900, tax: 21913, status: "submitted", env: "production", saleType: "Pharmaceutical", items: 3 },
  { id: "INV-2025-0239", ref: "—", date: "2025-04-25", buyer: "Premier Agencies", buyerCode: "B-0117", amount: 745120, tax: 126670, status: "failed", env: "production", saleType: "Pharmaceutical", items: 12 },
  { id: "INV-2025-0238", ref: "FBR-9821", date: "2025-04-24", buyer: "OBS Pakistan (Pvt) Ltd.", buyerCode: "B-0007", amount: 1980000, tax: 336600, status: "submitted", env: "production", saleType: "Pharmaceutical", items: 4 },
  { id: "INV-2025-0237", ref: "—", date: "2025-04-24", buyer: "Highnoon Distribution", buyerCode: "B-0152", amount: 92400, tax: 15708, status: "draft", env: "production", saleType: "Pharmaceutical", items: 2 },
  { id: "INV-2025-0236", ref: "FBR-9819", date: "2025-04-24", buyer: "Macter International", buyerCode: "B-0033", amount: 312000, tax: 53040, status: "submitted", env: "production", saleType: "Pharmaceutical", items: 8 },
  { id: "SBX-2025-0188", ref: "SBX-1188", date: "2025-04-23", buyer: "Sind Medical Stores", buyerCode: "B-0061", amount: 50000, tax: 8500, status: "submitted", env: "sandbox", saleType: "Pharmaceutical", items: 2 },
  { id: "SBX-2025-0187", ref: "—", date: "2025-04-23", buyer: "Pharmevo Distribution", buyerCode: "B-0078", amount: 75000, tax: 12750, status: "failed", env: "sandbox", saleType: "Pharmaceutical", items: 3 },
  { id: "INV-2025-0235", ref: "FBR-9817", date: "2025-04-23", buyer: "Sind Medical Stores", buyerCode: "B-0061", amount: 218400, tax: 37128, status: "submitted", env: "production", saleType: "Pharmaceutical", items: 5 },
  { id: "INV-2025-0234", ref: "FBR-9816", date: "2025-04-22", buyer: "Pharmevo Distribution", buyerCode: "B-0078", amount: 156000, tax: 26520, status: "submitted", env: "production", saleType: "Pharmaceutical", items: 4 },
  { id: "INV-2025-0233", ref: "—", date: "2025-04-22", buyer: "Hilton Pharma Distributors", buyerCode: "B-0144", amount: 890000, tax: 151300, status: "pending", env: "production", saleType: "Pharmaceutical", items: 9 },
  { id: "INV-2025-0232", ref: "FBR-9814", date: "2025-04-22", buyer: "Tabros Pharma", buyerCode: "B-0205", amount: 412800, tax: 70176, status: "submitted", env: "production", saleType: "Pharmaceutical", items: 7 },
];

export type Buyer = {
  id: string;
  code: string;
  name: string;
  type: "registered" | "unregistered";
  ntn?: string;
  strn?: string;
  cnic?: string;
  province: string;
  city: string;
  invoices: number;
  revenue: number;
  lastInvoice: string;
};

export const buyers: Buyer[] = [
  { id: "1", code: "B-0007", name: "OBS Pakistan (Pvt) Ltd.", type: "registered", ntn: "1234567-8", strn: "32-77-9999-001-23", province: "Sindh", city: "Karachi", invoices: 48, revenue: 28400000, lastInvoice: "2025-04-24" },
  { id: "2", code: "B-0033", name: "Macter International", type: "registered", ntn: "8765432-1", strn: "32-77-1234-001-45", province: "Sindh", city: "Karachi", invoices: 32, revenue: 14200000, lastInvoice: "2025-04-24" },
  { id: "3", code: "B-0042", name: "Muller & Phipps Pakistan", type: "registered", ntn: "5544332-2", strn: "32-77-5544-001-12", province: "Sindh", city: "Karachi", invoices: 27, revenue: 18900000, lastInvoice: "2025-04-25" },
  { id: "4", code: "B-0061", name: "Sind Medical Stores", type: "registered", ntn: "6677889-9", strn: "32-77-6677-001-78", province: "Punjab", city: "Lahore", invoices: 19, revenue: 9400000, lastInvoice: "2025-04-23" },
  { id: "5", code: "B-0078", name: "Pharmevo Distribution", type: "registered", ntn: "1122334-4", strn: "32-77-1122-001-44", province: "Sindh", city: "Karachi", invoices: 14, revenue: 4100000, lastInvoice: "2025-04-22" },
  { id: "6", code: "B-0091", name: "United Distributors Pakistan", type: "registered", ntn: "9988776-6", strn: "32-77-9988-001-66", province: "Sindh", city: "Karachi", invoices: 22, revenue: 6800000, lastInvoice: "2025-04-25" },
  { id: "7", code: "B-0117", name: "Premier Agencies", type: "registered", ntn: "3344556-6", strn: "32-77-3344-001-56", province: "Punjab", city: "Lahore", invoices: 38, revenue: 22100000, lastInvoice: "2025-04-25" },
  { id: "8", code: "B-0144", name: "Hilton Pharma Distributors", type: "registered", ntn: "7788990-0", strn: "32-77-7788-001-90", province: "Punjab", city: "Lahore", invoices: 11, revenue: 5300000, lastInvoice: "2025-04-22" },
  { id: "9", code: "B-0152", name: "Highnoon Distribution", type: "registered", ntn: "4455667-1", strn: "32-77-4455-001-71", province: "Punjab", city: "Lahore", invoices: 9, revenue: 3280000, lastInvoice: "2025-04-24" },
  { id: "10", code: "B-0205", name: "Tabros Pharma", type: "registered", ntn: "5566778-8", strn: "32-77-5566-001-88", province: "Sindh", city: "Karachi", invoices: 9, revenue: 1980000, lastInvoice: "2025-04-22" },
];

export type Product = {
  id: string;
  code: string;
  name: string;
  hsCode: string;
  uom: string;
  rate: number;
  taxRate: number;
  saleType: string;
  category: string;
  used: number;
  revenue: number;
};

export const products: Product[] = [
  { id: "1", code: "P-1001", name: "Panadol 500mg (Tablets, 10x10)", hsCode: "3004.9099", uom: "Box", rate: 320, taxRate: 0, saleType: "Pharmaceutical", category: "Analgesic", used: 1240, revenue: 8920000 },
  { id: "2", code: "P-1002", name: "Brufen 400mg (Tablets, 10x10)", hsCode: "3004.9099", uom: "Box", rate: 420, taxRate: 0, saleType: "Pharmaceutical", category: "Analgesic", used: 980, revenue: 4116000 },
  { id: "3", code: "P-1003", name: "Augmentin 625mg (Tablets, 2x7)", hsCode: "3004.1090", uom: "Pack", rate: 980, taxRate: 0, saleType: "Pharmaceutical", category: "Antibiotic", used: 620, revenue: 6076000 },
  { id: "4", code: "P-1004", name: "Calpol Syrup 120mg/5ml (60ml)", hsCode: "3004.9099", uom: "Bottle", rate: 145, taxRate: 0, saleType: "Pharmaceutical", category: "Pediatric", used: 2840, revenue: 411800 },
  { id: "5", code: "P-1005", name: "Risek 20mg (Capsules, 2x14)", hsCode: "3004.9099", uom: "Pack", rate: 680, taxRate: 0, saleType: "Pharmaceutical", category: "Gastro", used: 920, revenue: 4140000 },
  { id: "6", code: "P-1006", name: "Glucophage 500mg (Tablets, 10x10)", hsCode: "3004.9099", uom: "Box", rate: 540, taxRate: 0, saleType: "Pharmaceutical", category: "Diabetes", used: 1820, revenue: 7644000 },
  { id: "7", code: "P-1007", name: "Flagyl 400mg (Tablets, 10x10)", hsCode: "3004.9099", uom: "Box", rate: 380, taxRate: 0, saleType: "Pharmaceutical", category: "Antibiotic", used: 720, revenue: 2280000 },
  { id: "8", code: "P-1008", name: "Disprin 325mg (Tablets, 20x10)", hsCode: "3004.9099", uom: "Box", rate: 240, taxRate: 0, saleType: "Pharmaceutical", category: "Analgesic", used: 1640, revenue: 3192000 },
];

export type BusinessProfile = {
  id: string;
  name: string;
  ntn: string;
  strn: string;
  province: string;
  address: string;
  isDefault: boolean;
  invoicesIssued: number;
};

export const businessProfiles: BusinessProfile[] = [
  { id: "1", name: "MediCare Pharmaceuticals (Pvt) Ltd.", ntn: "0987654-3", strn: "32-77-0987-001-23", province: "Sindh", address: "Plot 42, SITE Industrial Area, Karachi", isDefault: true, invoicesIssued: 1180 },
  { id: "2", name: "MediCare Lahore Manufacturing Unit", ntn: "0987655-1", strn: "32-77-0987-002-23", province: "Punjab", address: "Industrial Estate, Sundar, Lahore", isDefault: false, invoicesIssued: 104 },
];


export type Draft = {
  id: string;
  title: string;
  buyer: string;
  amount: number;
  updated: string;
  completion: number;
  env: Environment;
  step: number;
};

export const drafts: Draft[] = [
  { id: "D-001", title: "Panadol bulk order — Muller & Phipps", buyer: "Muller & Phipps Pakistan", amount: 1450000, updated: "2 hours ago", completion: 80, env: "production", step: 4 },
  { id: "D-002", title: "Augmentin re-order Q2", buyer: "OBS Pakistan (Pvt) Ltd.", amount: 312000, updated: "5 hours ago", completion: 60, env: "production", step: 3 },
  { id: "D-003", title: "Sandbox test — Calpol shipment", buyer: "Macter International", amount: 80000, updated: "Yesterday", completion: 40, env: "sandbox", step: 2 },
  { id: "D-004", title: "Brufen monthly shipment", buyer: "Premier Agencies", amount: 740000, updated: "2 days ago", completion: 90, env: "production", step: 5 },
  { id: "D-005", title: "Risek April week 4", buyer: "United Distributors Pakistan", amount: 128900, updated: "3 days ago", completion: 25, env: "production", step: 1 },
  { id: "D-006", title: "Sandbox Glucophage trial", buyer: "Tabros Pharma", amount: 65000, updated: "4 days ago", completion: 50, env: "sandbox", step: 3 },
];

// Charts
export const revenueTrend = [
  { month: "Nov", revenue: 28400000, tax: 4828000, invoices: 184 },
  { month: "Dec", revenue: 31200000, tax: 5304000, invoices: 201 },
  { month: "Jan", revenue: 29800000, tax: 5066000, invoices: 192 },
  { month: "Feb", revenue: 35400000, tax: 6018000, invoices: 218 },
  { month: "Mar", revenue: 41200000, tax: 7004000, invoices: 244 },
  { month: "Apr", revenue: 48230000, tax: 8120000, invoices: 245 },
];

export const submissionPerformance = [
  { day: "Mon", success: 38, failed: 2 },
  { day: "Tue", success: 42, failed: 1 },
  { day: "Wed", success: 51, failed: 4 },
  { day: "Thu", success: 47, failed: 2 },
  { day: "Fri", success: 56, failed: 3 },
  { day: "Sat", success: 22, failed: 0 },
  { day: "Sun", success: 9, failed: 0 },
];

export const taxBreakdown = [
  { name: "Standard 17%", value: 5840000 },
  { name: "Services 13%", value: 1120000 },
  { name: "Reduced", value: 620000 },
  { name: "Further/Extra", value: 340000 },
  { name: "Withheld", value: 200000 },
];
