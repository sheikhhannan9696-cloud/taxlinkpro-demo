import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Search, Plus, Filter, MapPin, Eye, FilePlus2 } from "lucide-react";
import { AppShell, PageHeader } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MetricCard } from "@/components/ui-kit";
import { buyers, currency } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const Route = createFileRoute("/buyers")({
  head: () => ({ meta: [{ title: "Buyers — TaxLink Pro" }] }),
  component: BuyersPage,
});

function BuyersPage() {
  const [q, setQ] = useState("");
  const list = buyers.filter((b) => !q || b.name.toLowerCase().includes(q.toLowerCase()) || b.code.toLowerCase().includes(q.toLowerCase()));
  const totalRevenue = buyers.reduce((s, b) => s + b.revenue, 0);

  return (
    <AppShell>
      <PageHeader
        title="Buyers"
        description="Master directory of buyers used across all invoices."
        actions={
          <>
            <Sheet>
              <SheetTrigger asChild>
                <Button size="sm"><Plus className="h-4 w-4" /> New buyer</Button>
              </SheetTrigger>
              <SheetContent className="sm:max-w-md">
                <SheetHeader>
                  <SheetTitle>Add a new buyer</SheetTitle>
                  <SheetDescription>This buyer will be available in the invoice creation flow.</SheetDescription>
                </SheetHeader>
                <div className="mt-6 space-y-4">
                  <div className="space-y-1.5"><Label>Business name</Label><Input placeholder="Acme Corporation" /></div>
                  <div className="space-y-1.5">
                    <Label>Registration type</Label>
                    <Select defaultValue="registered">
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="registered">Registered</SelectItem>
                        <SelectItem value="unregistered">Unregistered</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5"><Label>Buyer code</Label><Input placeholder="B-0301" /></div>
                    <div className="space-y-1.5"><Label>NTN</Label><Input placeholder="0000000-0" /></div>
                    <div className="space-y-1.5"><Label>STRN</Label><Input placeholder="32-77-..." /></div>
                    <div className="space-y-1.5"><Label>Province</Label><Input placeholder="Sindh" /></div>
                  </div>
                  <Button className="w-full">Save buyer</Button>
                </div>
              </SheetContent>
            </Sheet>
          </>
        }
      />

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <MetricCard label="Total buyers" value={String(buyers.length)} hint="Across all profiles" />
        <MetricCard label="Registered" value={String(buyers.filter(b => b.type === "registered").length)} hint="With STRN/NTN" />
        <MetricCard label="Total revenue" value={currency(totalRevenue)} trend={14} />
        <MetricCard label="Active this month" value="42" trend={8} />
      </div>

      <div className="mt-6 rounded-xl border border-border bg-card shadow-card">
        <div className="flex flex-col gap-2 border-b border-border p-3 sm:flex-row sm:items-center">
          <div className="relative flex-1 max-w-md">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by name or code…" className="h-9 pl-9" />
          </div>
          <Button variant="outline" size="sm"><Filter className="h-4 w-4" /> Filters</Button>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Buyer</TableHead>
                <TableHead>Code</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>NTN / STRN</TableHead>
                <TableHead>Province</TableHead>
                <TableHead className="text-right">Invoices</TableHead>
                <TableHead className="text-right">Revenue</TableHead>
                <TableHead className="text-right">Last invoice</TableHead>
                <TableHead className="w-32" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {list.map((b) => (
                <TableRow key={b.id}>
                  <TableCell>
                    <div className="font-medium">{b.name}</div>
                    <div className="inline-flex items-center gap-1 text-xs text-muted-foreground"><MapPin className="h-3 w-3" /> {b.city}</div>
                  </TableCell>
                  <TableCell className="tabular-nums text-muted-foreground">{b.code}</TableCell>
                  <TableCell>
                    <span className={cn("rounded-md border px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wider",
                      b.type === "registered" ? "border-success/30 bg-success/10 text-success" : "border-warning/30 bg-warning/10 text-warning-foreground")}>
                      {b.type}
                    </span>
                  </TableCell>
                  <TableCell className="tabular-nums text-xs">
                    {b.ntn && <div>NTN {b.ntn}</div>}
                    {b.strn && <div className="text-muted-foreground">{b.strn}</div>}
                    {b.cnic && <div>CNIC {b.cnic}</div>}
                  </TableCell>
                  <TableCell>{b.province}</TableCell>
                  <TableCell className="text-right tabular-nums">{b.invoices}</TableCell>
                  <TableCell className="text-right tabular-nums font-medium">{currency(b.revenue)}</TableCell>
                  <TableCell className="text-right text-xs text-muted-foreground">{b.lastInvoice}</TableCell>
                  <TableCell>
                    <div className="flex justify-end gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8"><Eye className="h-4 w-4" /></Button>
                      <Button asChild variant="ghost" size="icon" className="h-8 w-8" title="Use in new invoice">
                        <Link to="/invoices/new"><FilePlus2 className="h-4 w-4" /></Link>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </AppShell>
  );
}
