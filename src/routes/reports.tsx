import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  TrendingUp,
  FileText,
  Users,
  Package,
  Receipt,
  Activity,
  Calendar,
  Download,
} from "lucide-react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts";
import { AppShell, PageHeader } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MetricCard, Trend } from "@/components/ui-kit";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  buyers,
  products,
  revenueTrend,
  submissionPerformance,
  taxBreakdown,
  currency,
  num,
  kpis,
} from "@/lib/mock-data";

export const Route = createFileRoute("/reports")({
  head: () => ({ meta: [{ title: "Reports & Analytics — TaxLink Pro" }] }),
  component: ReportsPage,
});

const PIE_COLORS = ["var(--chart-1)", "var(--chart-2)", "var(--chart-3)", "var(--chart-4)", "var(--chart-5)"];

function ReportsPage() {
  const [range, setRange] = useState("30d");
  const topBuyers = [...buyers].sort((a, b) => b.revenue - a.revenue).slice(0, 6);
  const topProducts = [...products].sort((a, b) => b.revenue - a.revenue).slice(0, 6);

  return (
    <AppShell>
      <PageHeader
        title="Reports & Analytics"
        description="Decision-grade insights across invoices, buyers, products, and tax."
        actions={
          <>
            <Select value={range} onValueChange={setRange}>
              <SelectTrigger className="h-9 w-[160px]"><Calendar className="mr-1 h-3.5 w-3.5" /><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 90 days</SelectItem>
                <SelectItem value="ytd">Year to date</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm"><Download className="h-4 w-4" /> Export</Button>
          </>
        }
      />

      <Tabs defaultValue="overview">
        <TabsList className="mb-4 flex w-full flex-wrap justify-start">
          <TabsTrigger value="overview">Executive</TabsTrigger>
          <TabsTrigger value="invoices">Invoices</TabsTrigger>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
          <TabsTrigger value="buyers">Buyers</TabsTrigger>
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="tax">Tax</TabsTrigger>
          <TabsTrigger value="submission">Submission</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <MetricCard label="Revenue" value={currency(kpis.revenueMTD)} trend={17} icon={<TrendingUp className="h-4 w-4" />} />
            <MetricCard label="Invoices" value={num(kpis.totalInvoices)} trend={12} icon={<FileText className="h-4 w-4" />} />
            <MetricCard label="Tax collected" value={currency(kpis.taxCollectedMTD)} trend={15} icon={<Receipt className="h-4 w-4" />} />
            <MetricCard label="Success rate" value="98.4%" trend={2} icon={<Activity className="h-4 w-4" />} />
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            <ChartCard title="Revenue trend" subtitle="Last 6 months" className="lg:col-span-2">
              <ResponsiveContainer width="100%" height={280}>
                <AreaChart data={revenueTrend}>
                  <defs>
                    <linearGradient id="r1" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--chart-1)" stopOpacity={0.4} />
                      <stop offset="100%" stopColor="var(--chart-1)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                  <XAxis dataKey="month" stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v) => `${v / 1_000_000}M`} />
                  <Tooltip contentStyle={tipStyle} formatter={(v: number) => currency(v)} />
                  <Area type="monotone" dataKey="revenue" stroke="var(--chart-1)" strokeWidth={2.5} fill="url(#r1)" />
                </AreaChart>
              </ResponsiveContainer>
            </ChartCard>

            <ChartCard title="Tax breakdown" subtitle="By category">
              <ResponsiveContainer width="100%" height={280}>
                <PieChart>
                  <Pie data={taxBreakdown} dataKey="value" nameKey="name" innerRadius={50} outerRadius={90} paddingAngle={2}>
                    {taxBreakdown.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
                  </Pie>
                  <Tooltip contentStyle={tipStyle} formatter={(v: number) => currency(v)} />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                </PieChart>
              </ResponsiveContainer>
            </ChartCard>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            <ChartCard title="Top buyers by revenue" subtitle="Top 6">
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={topBuyers} layout="vertical" margin={{ left: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" horizontal={false} />
                  <XAxis type="number" stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v) => `${v / 1_000_000}M`} />
                  <YAxis dataKey="name" type="category" stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} width={140} />
                  <Tooltip contentStyle={tipStyle} formatter={(v: number) => currency(v)} />
                  <Bar dataKey="revenue" fill="var(--chart-1)" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>

            <ChartCard title="Top products by revenue" subtitle="Top 6">
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={topProducts} layout="vertical" margin={{ left: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" horizontal={false} />
                  <XAxis type="number" stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v) => `${v / 1_000_000}M`} />
                  <YAxis dataKey="name" type="category" stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} width={140} />
                  <Tooltip contentStyle={tipStyle} formatter={(v: number) => currency(v)} />
                  <Bar dataKey="revenue" fill="var(--chart-3)" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>
          </div>
        </TabsContent>

        <TabsContent value="invoices" className="space-y-4">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <MetricCard label="Created" value="245" trend={12} icon={<FileText className="h-4 w-4" />} />
            <MetricCard label="Submitted" value="221" trend={9} />
            <MetricCard label="Avg per day" value="8.2" trend={4} />
            <MetricCard label="Draft → submit" value="76%" trend={3} hint="Conversion" />
          </div>
          <ChartCard title="Invoice volume" subtitle="By month">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={revenueTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="month" stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={tipStyle} />
                <Bar dataKey="invoices" fill="var(--chart-1)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </TabsContent>

        <TabsContent value="revenue">
          <ChartCard title="Revenue & tax" subtitle="Comparative trend">
            <ResponsiveContainer width="100%" height={340}>
              <LineChart data={revenueTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="month" stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v) => `${v / 1_000_000}M`} />
                <Tooltip contentStyle={tipStyle} formatter={(v: number) => currency(v)} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Line type="monotone" dataKey="revenue" stroke="var(--chart-1)" strokeWidth={2.5} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="tax" stroke="var(--chart-3)" strokeWidth={2.5} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>
        </TabsContent>

        <TabsContent value="buyers" className="space-y-4">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <MetricCard label="Active buyers" value="42" trend={5} icon={<Users className="h-4 w-4" />} />
            <MetricCard label="New this month" value="12" trend={20} />
            <MetricCard label="Repeat rate" value="78%" trend={2} />
            <MetricCard label="Top buyer share" value="22%" />
          </div>
          <ChartCard title="Top buyers" subtitle="Revenue contribution">
            <ResponsiveContainer width="100%" height={340}>
              <BarChart data={topBuyers} layout="vertical" margin={{ left: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" horizontal={false} />
                <XAxis type="number" stroke="var(--muted-foreground)" fontSize={11} tickFormatter={(v) => `${v / 1_000_000}M`} />
                <YAxis dataKey="name" type="category" stroke="var(--muted-foreground)" fontSize={11} width={160} />
                <Tooltip contentStyle={tipStyle} formatter={(v: number) => currency(v)} />
                <Bar dataKey="revenue" fill="var(--chart-1)" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </TabsContent>

        <TabsContent value="products" className="space-y-4">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <MetricCard label="Catalog" value={String(products.length)} icon={<Package className="h-4 w-4" />} />
            <MetricCard label="Best seller revenue" value={currency(topProducts[0].revenue)} />
            <MetricCard label="Avg margin" value="22%" trend={1} />
            <MetricCard label="New SKUs" value="6" />
          </div>
          <ChartCard title="Top products" subtitle="By units sold">
            <ResponsiveContainer width="100%" height={340}>
              <BarChart data={topProducts}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="code" stroke="var(--muted-foreground)" fontSize={11} />
                <YAxis stroke="var(--muted-foreground)" fontSize={11} />
                <Tooltip contentStyle={tipStyle} />
                <Bar dataKey="used" fill="var(--chart-3)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </TabsContent>

        <TabsContent value="tax" className="space-y-4">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <MetricCard label="Tax collected" value={currency(kpis.taxCollectedMTD)} trend={15} />
            <MetricCard label="Standard rate" value={currency(5840000)} />
            <MetricCard label="Services" value={currency(1120000)} />
            <MetricCard label="Withheld" value={currency(200000)} trend={-5} />
          </div>
          <ChartCard title="Tax composition" subtitle="By category">
            <ResponsiveContainer width="100%" height={340}>
              <PieChart>
                <Pie data={taxBreakdown} dataKey="value" nameKey="name" innerRadius={70} outerRadius={130} paddingAngle={2}>
                  {taxBreakdown.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
                </Pie>
                <Tooltip contentStyle={tipStyle} formatter={(v: number) => currency(v)} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
              </PieChart>
            </ResponsiveContainer>
          </ChartCard>
        </TabsContent>

        <TabsContent value="submission" className="space-y-4">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <MetricCard label="Submission rate" value="98.4%" trend={2} />
            <MetricCard label="Avg latency" value="1.4s" trend={-8} />
            <MetricCard label="Failures" value="38" trend={-22} />
            <MetricCard label="Sandbox runs" value="186" trend={31} />
          </div>
          <ChartCard title="Daily submission performance" subtitle="Success vs failed">
            <ResponsiveContainer width="100%" height={340}>
              <BarChart data={submissionPerformance}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="day" stroke="var(--muted-foreground)" fontSize={11} />
                <YAxis stroke="var(--muted-foreground)" fontSize={11} />
                <Tooltip contentStyle={tipStyle} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Bar dataKey="success" stackId="a" fill="var(--chart-3)" radius={[0, 0, 0, 0]} />
                <Bar dataKey="failed" stackId="a" fill="var(--destructive)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </TabsContent>
      </Tabs>
    </AppShell>
  );
}

const tipStyle = {
  background: "var(--popover)",
  border: "1px solid var(--border)",
  borderRadius: 8,
  fontSize: 12,
} as const;

function ChartCard({
  title,
  subtitle,
  children,
  className,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`rounded-xl border border-border bg-card p-5 shadow-card ${className ?? ""}`}>
      <div className="mb-4 flex items-start justify-between">
        <div>
          <div className="text-sm font-semibold">{title}</div>
          {subtitle && <div className="text-xs text-muted-foreground">{subtitle}</div>}
        </div>
        <Trend value={Math.floor(Math.random() * 20)} />
      </div>
      {children}
    </div>
  );
}
