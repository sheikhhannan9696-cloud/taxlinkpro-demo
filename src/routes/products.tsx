import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Search, Plus, Filter, Upload, Eye, FilePlus2, Package } from "lucide-react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MetricCard } from "@/components/ui-kit";
import { products, currency } from "@/lib/mock-data";

export const Route = createFileRoute("/products")({
  head: () => ({ meta: [{ title: "Products — TaxLink Pro" }] }),
  component: ProductsPage,
});

function ProductsPage() {
  const [q, setQ] = useState("");
  const list = products.filter((p) => !q || p.name.toLowerCase().includes(q.toLowerCase()) || p.code.toLowerCase().includes(q.toLowerCase()) || p.hsCode.includes(q));

  return (
    <AppShell>
      <PageHeader
        title="Products"
        description="Catalog of items with HS codes, UOM, and tax configuration."
        actions={
          <>
            <Button variant="outline" size="sm"><Upload className="h-4 w-4" /> Import</Button>
            <Sheet>
              <SheetTrigger asChild>
                <Button size="sm"><Plus className="h-4 w-4" /> New product</Button>
              </SheetTrigger>
              <SheetContent className="sm:max-w-md">
                <SheetHeader>
                  <SheetTitle>Add product</SheetTitle>
                  <SheetDescription>Define HS code, UOM, default rate and tax.</SheetDescription>
                </SheetHeader>
                <div className="mt-6 space-y-4">
                  <div className="space-y-1.5"><Label>Product name</Label><Input placeholder="Portland Cement (50kg)" /></div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5"><Label>Code</Label><Input placeholder="P-2001" /></div>
                    <div className="space-y-1.5"><Label>HS Code</Label><Input placeholder="2523.2900" /></div>
                    <div className="space-y-1.5">
                      <Label>UOM</Label>
                      <Select defaultValue="number">
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="number">Number</SelectItem>
                          <SelectItem value="pieces">Pieces</SelectItem>
                          <SelectItem value="units">Units</SelectItem>
                          <SelectItem value="kg">KG</SelectItem>
                          <SelectItem value="mm">mm</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-1.5"><Label>Default rate</Label><Input placeholder="1450.00" /></div>
                    <div className="space-y-1.5"><Label>Tax %</Label><Input placeholder="17" /></div>
                    <div className="space-y-1.5">
                      <Label>Sale type</Label>
                      <Select defaultValue="goods-standard">
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="goods-standard">Goods at Standard Rate</SelectItem>
                          <SelectItem value="goods-reduced">Goods at Reduced Rate</SelectItem>
                          <SelectItem value="services">Services</SelectItem>
                          <SelectItem value="export">Export</SelectItem>
                          <SelectItem value="pharma">Pharmaceutical</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <Button className="w-full">Save product</Button>
                </div>
              </SheetContent>
            </Sheet>
          </>
        }
      />

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <MetricCard label="Catalog size" value={String(products.length)} icon={<Package className="h-4 w-4" />} />
        <MetricCard label="Active products" value={String(products.filter(p => p.used > 0).length)} hint="Used in last 30 days" />
        <MetricCard label="Avg. tax rate" value="14.2%" />
        <MetricCard label="Catalog revenue" value={currency(products.reduce((s, p) => s + p.revenue, 0))} trend={11} />
      </div>

      <div className="mt-6 rounded-xl border border-border bg-card shadow-card">
        <div className="flex flex-col gap-2 border-b border-border p-3 sm:flex-row sm:items-center">
          <div className="relative flex-1 max-w-md">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by name, code, or HS…" className="h-9 pl-9" />
          </div>
          <Button variant="outline" size="sm"><Filter className="h-4 w-4" /> Filters</Button>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Code</TableHead>
                <TableHead>HS Code</TableHead>
                <TableHead>UOM</TableHead>
                <TableHead>Sale type</TableHead>
                <TableHead className="text-right">Rate</TableHead>
                <TableHead className="text-right">Tax</TableHead>
                <TableHead className="text-right">Times sold</TableHead>
                <TableHead className="text-right">Revenue</TableHead>
                <TableHead className="w-24" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {list.map((p) => (
                <TableRow key={p.id}>
                  <TableCell>
                    <div className="font-medium">{p.name}</div>
                    <div className="text-xs text-muted-foreground">{p.category}</div>
                  </TableCell>
                  <TableCell className="tabular-nums text-muted-foreground">{p.code}</TableCell>
                  <TableCell className="tabular-nums">{p.hsCode}</TableCell>
                  <TableCell>{p.uom}</TableCell>
                  <TableCell className="text-xs text-muted-foreground">{p.saleType}</TableCell>
                  <TableCell className="text-right tabular-nums">{currency(p.rate)}</TableCell>
                  <TableCell className="text-right tabular-nums">{p.taxRate}%</TableCell>
                  <TableCell className="text-right tabular-nums">{p.used}</TableCell>
                  <TableCell className="text-right tabular-nums font-medium">{currency(p.revenue)}</TableCell>
                  <TableCell>
                    <div className="flex justify-end gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8"><Eye className="h-4 w-4" /></Button>
                      <Button asChild variant="ghost" size="icon" className="h-8 w-8" title="Use in invoice">
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
