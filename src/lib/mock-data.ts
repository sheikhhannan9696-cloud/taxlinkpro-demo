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
  { id: "INV-2025-0241", ref: "FBR-9824", date: "2025-04-25", buyer: "Habib Steel Mills", buyerCode: "B-0042", amount: 482350, tax: 82000, status: "submitted", env: "production", saleType: "Goods at Standard Rate", items: 6, poNumber: "PO-7821" },
  { id: "INV-2025-0240", ref: "FBR-9823", date: "2025-04-25", buyer: "Karachi Logistics Co.", buyerCode: "B-0091", amount: 128900, tax: 21913, status: "submitted", env: "production", saleType: "Services", items: 3 },
  { id: "INV-2025-0239", ref: "—", date: "2025-04-25", buyer: "Lahore Textiles Ltd.", buyerCode: "B-0117", amount: 745120, tax: 126670, status: "failed", env: "production", saleType: "Goods at Standard Rate", items: 12 },
  { id: "INV-2025-0238", ref: "FBR-9821", date: "2025-04-24", buyer: "Pak Cement Industries", buyerCode: "B-0007", amount: 1980000, tax: 336600, status: "submitted", env: "production", saleType: "Goods at Standard Rate", items: 4 },
  { id: "INV-2025-0237", ref: "—", date: "2025-04-24", buyer: "Sarmad & Sons", buyerCode: "B-0152", amount: 92400, tax: 15708, status: "draft", env: "production", saleType: "Goods at Standard Rate", items: 2 },
  { id: "INV-2025-0236", ref: "FBR-9819", date: "2025-04-24", buyer: "Indus Pharma", buyerCode: "B-0033", amount: 312000, tax: 53040, status: "submitted", env: "production", saleType: "Pharmaceutical", items: 8 },
  { id: "SBX-2025-0188", ref: "SBX-1188", date: "2025-04-23", buyer: "Test Buyer Alpha", buyerCode: "TB-001", amount: 50000, tax: 8500, status: "submitted", env: "sandbox", scenario: "SN001", saleType: "Goods at Standard Rate", items: 2 },
  { id: "SBX-2025-0187", ref: "—", date: "2025-04-23", buyer: "Test Buyer Beta", buyerCode: "TB-002", amount: 75000, tax: 12750, status: "failed", env: "sandbox", scenario: "SN004", saleType: "Services", items: 3 },
  { id: "INV-2025-0235", ref: "FBR-9817", date: "2025-04-23", buyer: "Multan Foods", buyerCode: "B-0205", amount: 218400, tax: 37128, status: "submitted", env: "production", saleType: "Goods at Standard Rate", items: 5 },
  { id: "INV-2025-0234", ref: "FBR-9816", date: "2025-04-22", buyer: "Quetta Trading", buyerCode: "B-0078", amount: 156000, tax: 26520, status: "submitted", env: "production", saleType: "Goods at Standard Rate", items: 4 },
  { id: "INV-2025-0233", ref: "—", date: "2025-04-22", buyer: "Faisalabad Mills", buyerCode: "B-0061", amount: 890000, tax: 151300, status: "pending", env: "production", saleType: "Goods at Standard Rate", items: 9 },
  { id: "INV-2025-0232", ref: "FBR-9814", date: "2025-04-22", buyer: "Sialkot Sports Co.", buyerCode: "B-0144", amount: 412800, tax: 70176, status: "submitted", env: "production", saleType: "Export", items: 7 },
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
  { id: "1", code: "B-0007", name: "Pak Cement Industries", type: "registered", ntn: "1234567-8", strn: "32-77-9999-001-23", province: "Punjab", city: "Lahore", invoices: 48, revenue: 28400000, lastInvoice: "2025-04-24" },
  { id: "2", code: "B-0033", name: "Indus Pharma", type: "registered", ntn: "8765432-1", strn: "32-77-1234-001-45", province: "Sindh", city: "Karachi", invoices: 32, revenue: 14200000, lastInvoice: "2025-04-24" },
  { id: "3", code: "B-0042", name: "Habib Steel Mills", type: "registered", ntn: "5544332-2", strn: "32-77-5544-001-12", province: "Sindh", city: "Karachi", invoices: 27, revenue: 18900000, lastInvoice: "2025-04-25" },
  { id: "4", code: "B-0061", name: "Faisalabad Mills", type: "registered", ntn: "6677889-9", strn: "32-77-6677-001-78", province: "Punjab", city: "Faisalabad", invoices: 19, revenue: 9400000, lastInvoice: "2025-04-22" },
  { id: "5", code: "B-0078", name: "Quetta Trading", type: "registered", ntn: "1122334-4", strn: "32-77-1122-001-44", province: "Balochistan", city: "Quetta", invoices: 14, revenue: 4100000, lastInvoice: "2025-04-22" },
  { id: "6", code: "B-0091", name: "Karachi Logistics Co.", type: "registered", ntn: "9988776-6", strn: "32-77-9988-001-66", province: "Sindh", city: "Karachi", invoices: 22, revenue: 6800000, lastInvoice: "2025-04-25" },
  { id: "7", code: "B-0117", name: "Lahore Textiles Ltd.", type: "registered", ntn: "3344556-6", strn: "32-77-3344-001-56", province: "Punjab", city: "Lahore", invoices: 38, revenue: 22100000, lastInvoice: "2025-04-25" },
  { id: "8", code: "B-0144", name: "Sialkot Sports Co.", type: "registered", ntn: "7788990-0", strn: "32-77-7788-001-90", province: "Punjab", city: "Sialkot", invoices: 11, revenue: 5300000, lastInvoice: "2025-04-22" },
  { id: "9", code: "B-0152", name: "Sarmad & Sons", type: "unregistered", cnic: "42101-1234567-8", province: "Sindh", city: "Hyderabad", invoices: 4, revenue: 280000, lastInvoice: "2025-04-24" },
  { id: "10", code: "B-0205", name: "Multan Foods", type: "registered", ntn: "5566778-8", strn: "32-77-5566-001-88", province: "Punjab", city: "Multan", invoices: 9, revenue: 1980000, lastInvoice: "2025-04-23" },
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
  { id: "1", code: "P-1001", name: "Portland Cement (50kg bag)", hsCode: "2523.2900", uom: "Bag", rate: 1450, taxRate: 17, saleType: "Goods at Standard Rate", category: "Construction", used: 412, revenue: 8920000 },
  { id: "2", code: "P-1002", name: "Mild Steel Rebar #4", hsCode: "7214.2000", uom: "Tonne", rate: 285000, taxRate: 17, saleType: "Goods at Standard Rate", category: "Steel", used: 78, revenue: 22230000 },
  { id: "3", code: "P-1003", name: "Paracetamol 500mg (10x10)", hsCode: "3004.9099", uom: "Box", rate: 320, taxRate: 0, saleType: "Pharmaceutical", category: "Pharma", used: 1240, revenue: 396800 },
  { id: "4", code: "P-1004", name: "Cotton Yarn 30s", hsCode: "5205.1100", uom: "Kg", rate: 850, taxRate: 17, saleType: "Goods at Standard Rate", category: "Textile", used: 2840, revenue: 2414000 },
  { id: "5", code: "P-1005", name: "Logistics Service - Containerized", hsCode: "9967.0000", uom: "Service", rate: 45000, taxRate: 13, saleType: "Services", category: "Services", used: 92, revenue: 4140000 },
  { id: "6", code: "P-1006", name: "Football - Match Grade", hsCode: "9506.6200", uom: "Pcs", rate: 4200, taxRate: 17, saleType: "Export", category: "Sports", used: 1820, revenue: 7644000 },
  { id: "7", code: "P-1007", name: "Basmati Rice 1121 (40kg)", hsCode: "1006.3000", uom: "Bag", rate: 12500, taxRate: 0, saleType: "Goods at Reduced Rate", category: "Food", used: 320, revenue: 4000000 },
  { id: "8", code: "P-1008", name: "Polyester Fabric (per meter)", hsCode: "5407.5200", uom: "Meter", rate: 380, taxRate: 17, saleType: "Goods at Standard Rate", category: "Textile", used: 8400, revenue: 3192000 },
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
  { id: "1", name: "Acme Trading (Pvt) Ltd.", ntn: "0987654-3", strn: "32-77-0987-001-23", province: "Sindh", address: "Plot 42, SITE Industrial Area, Karachi", isDefault: true, invoicesIssued: 1180 },
  { id: "2", name: "Acme Logistics Division", ntn: "0987655-1", strn: "32-77-0987-002-23", province: "Punjab", address: "Industrial Estate, Sundar, Lahore", isDefault: false, invoicesIssued: 104 },
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
  { id: "D-001", title: "Cement order — Pak Cement", buyer: "Pak Cement Industries", amount: 1450000, updated: "2 hours ago", completion: 80, env: "production", step: 4 },
  { id: "D-002", title: "Pharma re-order Q2", buyer: "Indus Pharma", amount: 312000, updated: "5 hours ago", completion: 60, env: "production", step: 3 },
  { id: "D-003", title: "Sandbox test SN007", buyer: "Test Buyer Gamma", amount: 80000, updated: "Yesterday", completion: 40, env: "sandbox", step: 2 },
  { id: "D-004", title: "Yarn shipment", buyer: "Lahore Textiles Ltd.", amount: 740000, updated: "2 days ago", completion: 90, env: "production", step: 5 },
  { id: "D-005", title: "Logistics April week 4", buyer: "Karachi Logistics Co.", amount: 128900, updated: "3 days ago", completion: 25, env: "production", step: 1 },
  { id: "D-006", title: "Sandbox SN008 trial", buyer: "Test Buyer Delta", amount: 65000, updated: "4 days ago", completion: 50, env: "sandbox", step: 3 },
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
