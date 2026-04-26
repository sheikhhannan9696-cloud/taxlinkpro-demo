import { createFileRoute, Link } from "@tanstack/react-router";
import {
  FileText,
  CheckCircle2,
  XCircle,
  FileEdit,
  Users,
  Package,
  TrendingUp,
  ShieldCheck,
  Plus,
  Upload,
  FileJson,
  Send,
  Download,
  AlertTriangle,
  Activity,
  ArrowRight,
} from "lucide-react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { AppShell, PageHeader } from "@/components/app-shell";
import { MetricCard, StatusBadge, EnvBadge, Trend } from "@/components/ui-kit";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  invoices,
  kpis,
  currency,
  num,
  revenueTrend,
  submissionPerformance,
  buyers,
  products,
} from "@/lib/mock-data";

export const Route = createFileRoute("/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard — TaxLink Pro" }] }),
  component: DashboardPage,
});

function DashboardPage() {
  const recent = invoices.slice(0, 6);
  const failures = invoices.filter((i) => i.status === "failed").slice(0, 3);
  const topBuyers = [...buyers].sort((a, b) => b.revenue - a.revenue).slice(0, 5);
  const topProducts = [...products].sort((a, b) => b.revenue - a.revenue).slice(0, 5);

  return (
    <AppShell>
      <PageHeader
        title="Welcome back, Ayesha"
        description="Operational overview for Acme Trading · April 2025"
        actions={
          <>
            <Button variant="outline" size="sm"><Upload className="h-4 w-4" /> Import Excel</Button>
            <Button variant="outline" size="sm"><FileJson className="h-4 w-4" /> Validate JSON</Button>
            <Button asChild size="sm"><Link to="/invoices/new"><Plus className="h-4 w-4" /> New Invoice</Link></Button>
          </>
        }
      />

      {/* KPI grid */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        <MetricCard label="Total invoices" value={num(kpis.totalInvoices)} trend={12} icon={<FileText className="h-4 w-4" />} hint="Last 30 days" />
        <MetricCard label="Successful submissions" value={num(kpis.successful)} trend={8} icon={<CheckCircle2 className="h-4 w-4" />} hint="98.4% success rate" />
        <MetricCard label="Failed submissions" value={num(kpis.failed)} trend={-22} icon={<XCircle className="h-4 w-4" />} hint="Needs attention" />
        <MetricCard label="Drafts pending" value={num(kpis.drafts)} icon={<FileEdit className="h-4 w-4" />} hint="6 ready to submit" />
        <MetricCard label="Buyers" value={num(kpis.buyers)} trend={4} icon={<Users className="h-4 w-4" />} hint="12 added this month" />
        <MetricCard label="Products" value={num(kpis.products)} trend={2} icon={<Package className="h-4 w-4" />} hint="Catalog health: good" />
        <MetricCard label="Revenue (MTD)" value={currency(kpis.revenueMTD)} trend={17} icon={<TrendingUp className="h-4 w-4" />} hint="vs. last month" />
        <MetricCard label="Tax collected (MTD)" value={currency(kpis.taxCollectedMTD)} trend={15} icon={<ShieldCheck className="h-4 w-4" />} hint="vs. last month" />
      </div>

      {/* Charts row */}
      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <div className="rounded-xl border border-border bg-card p-5 shadow-card lg:col-span-2">
          <div className="mb-4 flex items-start justify-between">
            <div>
              <div className="text-sm font-semibold">Revenue & tax trend</div>
              <div className="text-xs text-muted-foreground">Last 6 months</div>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <span className="inline-flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-[var(--chart-1)]" /> Revenue</span>
              <span className="inline-flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-[var(--chart-3)]" /> Tax</span>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueTrend} margin={{ top: 5, right: 8, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--chart-1)" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="var(--chart-1)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="tax" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--chart-3)" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="var(--chart-3)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="month" stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v) => `${v / 1_000_000}M`} />
                <Tooltip
                  contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 12 }}
                  formatter={(v: number) => currency(v)}
                />
                <Area type="monotone" dataKey="revenue" stroke="var(--chart-1)" strokeWidth={2} fill="url(#rev)" />
                <Area type="monotone" dataKey="tax" stroke="var(--chart-3)" strokeWidth={2} fill="url(#tax)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-5 shadow-card">
          <div className="mb-4 flex items-start justify-between">
            <div>
              <div className="text-sm font-semibold">Submission health</div>
              <div className="text-xs text-muted-foreground">This week</div>
            </div>
            <Trend value={6} />
          </div>
          <div className="h-44">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={submissionPerformance} margin={{ top: 5, right: 5, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="day" stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 12 }} />
                <Bar dataKey="success" stackId="a" fill="var(--chart-3)" radius={[0, 0, 0, 0]} />
                <Bar dataKey="failed" stackId="a" fill="var(--destructive)" radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-3 grid grid-cols-2 gap-2 border-t border-border pt-3 text-xs">
            <div>
              <div className="text-muted-foreground">Success</div>
              <div className="text-base font-semibold tabular-nums text-success">98.4%</div>
            </div>
            <div>
              <div className="text-muted-foreground">Avg. response</div>
              <div className="text-base font-semibold tabular-nums">1.4s</div>
            </div>
          </div>
        </div>
      </div>

      {/* Activity + side panels */}
      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <div className="rounded-xl border border-border bg-card shadow-card lg:col-span-2">
          <div className="flex items-center justify-between border-b border-border px-5 py-3">
            <div className="text-sm font-semibold">Recent invoice activity</div>
            <Button asChild variant="ghost" size="sm" className="text-xs"><Link to="/invoices">View all <ArrowRight className="h-3 w-3" /></Link></Button>
          </div>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Invoice</TableHead>
                  <TableHead>Buyer</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead>Env</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recent.map((inv) => (
                  <TableRow key={inv.id}>
                    <TableCell className="font-medium">{inv.id}</TableCell>
                    <TableCell className="max-w-[200px] truncate">{inv.buyer}</TableCell>
                    <TableCell className="text-muted-foreground">{inv.date}</TableCell>
                    <TableCell className="text-right tabular-nums">{currency(inv.amount)}</TableCell>
                    <TableCell><EnvBadge env={inv.env} /></TableCell>
                    <TableCell><StatusBadge status={inv.status} /></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        <div className="space-y-4">

          {/* Failures */}
          <div className="rounded-xl border border-border bg-card p-5 shadow-card">
            <div className="mb-3 flex items-center justify-between">
              <div className="text-sm font-semibold">Needs attention</div>
              <span className="rounded-full bg-destructive/10 px-2 py-0.5 text-[10px] font-medium text-destructive">{failures.length}</span>
            </div>
            <div className="space-y-2">
              {failures.map((f) => (
                <div key={f.id} className="flex items-start gap-2.5 rounded-lg border border-border bg-surface-muted/40 p-2.5">
                  <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-destructive" />
                  <div className="min-w-0 flex-1">
                    <div className="text-xs font-medium">{f.id}</div>
                    <div className="truncate text-[11px] text-muted-foreground">{f.buyer} · {currency(f.amount)}</div>
                  </div>
                  <Button variant="ghost" size="sm" className="h-7 px-2 text-[11px]">Review</Button>
                </div>
              ))}
            </div>
          </div>

          {/* Quick actions */}
          <div className="rounded-xl border border-border bg-card p-5 shadow-card">
            <div className="mb-3 flex items-center gap-2 text-sm font-semibold">
              <Activity className="h-4 w-4 text-primary" /> Quick actions
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" size="sm" className="justify-start"><Send className="h-3.5 w-3.5" /> Submit batch</Button>
              <Button variant="outline" size="sm" className="justify-start"><Download className="h-3.5 w-3.5" /> Bulk PDFs</Button>
              <Button variant="outline" size="sm" className="justify-start"><FileEdit className="h-3.5 w-3.5" /> Resume draft</Button>
              <Button variant="outline" size="sm" className="justify-start"><Upload className="h-3.5 w-3.5" /> Import</Button>
            </div>
          </div>
        </div>
      </div>

      {/* Top buyers / products */}
      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <div className="rounded-xl border border-border bg-card shadow-card">
          <div className="flex items-center justify-between border-b border-border px-5 py-3">
            <div className="text-sm font-semibold">Top buyers</div>
            <Button asChild variant="ghost" size="sm" className="text-xs"><Link to="/buyers">View all</Link></Button>
          </div>
          <div className="divide-y divide-border">
            {topBuyers.map((b, i) => (
              <div key={b.id} className="flex items-center gap-3 px-5 py-3">
                <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary/10 text-xs font-semibold text-primary">#{i + 1}</div>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-medium">{b.name}</div>
                  <div className="text-xs text-muted-foreground">{b.code} · {b.invoices} invoices</div>
                </div>
                <div className="text-right tabular-nums">
                  <div className="text-sm font-semibold">{currency(b.revenue)}</div>
                  <Trend value={Math.floor(Math.random() * 30 - 5)} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card shadow-card">
          <div className="flex items-center justify-between border-b border-border px-5 py-3">
            <div className="text-sm font-semibold">Top products</div>
            <Button asChild variant="ghost" size="sm" className="text-xs"><Link to="/products">View all</Link></Button>
          </div>
          <div className="divide-y divide-border">
            {topProducts.map((p, i) => (
              <div key={p.id} className="flex items-center gap-3 px-5 py-3">
                <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary/10 text-xs font-semibold text-primary">#{i + 1}</div>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-medium">{p.name}</div>
                  <div className="text-xs text-muted-foreground">{p.code} · HS {p.hsCode}</div>
                </div>
                <div className="text-right tabular-nums">
                  <div className="text-sm font-semibold">{currency(p.revenue)}</div>
                  <div className="text-[11px] text-muted-foreground">{p.used} sold</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
