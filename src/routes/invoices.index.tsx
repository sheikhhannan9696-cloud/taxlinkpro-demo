import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Search, Filter, Download, Send, FileJson, MoreHorizontal, Eye, Trash2, Plus } from "lucide-react";
import { AppShell, PageHeader } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { StatusBadge, EnvBadge } from "@/components/ui-kit";
import { invoices, currency } from "@/lib/mock-data";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const Route = createFileRoute("/invoices/")({
  head: () => ({ meta: [{ title: "Invoices — TaxLink Pro" }] }),
  component: InvoicesPage,
});

const tabs = [
  { id: "all", label: "All", count: invoices.length },
  { id: "submitted", label: "Submitted", count: invoices.filter((i) => i.status === "submitted").length },
  { id: "failed", label: "Failed", count: invoices.filter((i) => i.status === "failed").length },
  { id: "pending", label: "Pending", count: invoices.filter((i) => i.status === "pending").length },
  { id: "draft", label: "Drafts", count: invoices.filter((i) => i.status === "draft").length },
] as const;

function InvoicesPage() {
  const [tab, setTab] = useState<(typeof tabs)[number]["id"]>("all");
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [query, setQuery] = useState("");

  const list = invoices
    .filter((i) => tab === "all" || i.status === tab)
    .filter((i) => !query || i.id.toLowerCase().includes(query.toLowerCase()) || i.buyer.toLowerCase().includes(query.toLowerCase()));

  const allSelected = list.length > 0 && list.every((i) => selected.has(i.id));
  const toggleAll = () => {
    const next = new Set(selected);
    if (allSelected) list.forEach((i) => next.delete(i.id));
    else list.forEach((i) => next.add(i.id));
    setSelected(next);
  };

  return (
    <AppShell>
      <PageHeader
        title="Invoices"
        description="View, validate, and submit your invoices to FBR."
        actions={
          <>
            <Button variant="outline" size="sm"><Upload className="h-4 w-4" /> Import Excel</Button>
            <Button variant="outline" size="sm"><FileJson className="h-4 w-4" /> Validate JSON</Button>
            <Button asChild size="sm"><Link to="/invoices/new"><Plus className="h-4 w-4" /> New Invoice</Link></Button>
          </>
        }
      />

      <div className="rounded-xl border border-border bg-card shadow-card">
        {/* Tabs */}
        <div className="flex items-center gap-1 overflow-x-auto border-b border-border px-3 pt-3">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`relative flex items-center gap-1.5 whitespace-nowrap rounded-t-md px-3 py-2 text-sm transition ${
                tab === t.id ? "bg-surface text-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {t.label}
              <span className={`rounded-full px-1.5 py-0.5 text-[10px] tabular-nums ${tab === t.id ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`}>
                {t.count}
              </span>
              {tab === t.id && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />}
            </button>
          ))}
        </div>

        {/* Toolbar */}
        <div className="flex flex-col gap-2 border-b border-border p-3 sm:flex-row sm:items-center">
          <div className="relative flex-1 max-w-md">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search by ID or buyer…" className="h-9 pl-9" />
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm"><Filter className="h-4 w-4" /> Filters</Button>
            {selected.size > 0 && (
              <>
                <span className="text-xs text-muted-foreground">{selected.size} selected</span>
                <Button size="sm"><Send className="h-4 w-4" /> Submit to FBR</Button>
                <Button variant="outline" size="sm"><Download className="h-4 w-4" /> Download PDFs</Button>
              </>
            )}
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-10">
                  <Checkbox checked={allSelected} onCheckedChange={toggleAll} />
                </TableHead>
                <TableHead>Invoice</TableHead>
                <TableHead>FBR Ref</TableHead>
                <TableHead>Buyer</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Sale type</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead className="text-right">Tax</TableHead>
                <TableHead>Env</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-10" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {list.map((inv) => (
                <TableRow key={inv.id} className="group">
                  <TableCell>
                    <Checkbox
                      checked={selected.has(inv.id)}
                      onCheckedChange={(v) => {
                        const next = new Set(selected);
                        if (v) next.add(inv.id); else next.delete(inv.id);
                        setSelected(next);
                      }}
                    />
                  </TableCell>
                  <TableCell className="font-medium">
                    <Link to="/invoices/$invoiceId" params={{ invoiceId: inv.id }} className="hover:text-primary hover:underline">
                      {inv.id}
                    </Link>
                  </TableCell>
                  <TableCell className="text-muted-foreground tabular-nums">{inv.ref}</TableCell>
                  <TableCell className="max-w-[180px] truncate">{inv.buyer}</TableCell>
                  <TableCell className="text-muted-foreground">{inv.date}</TableCell>
                  <TableCell className="text-xs text-muted-foreground">{inv.saleType}</TableCell>
                  <TableCell className="text-right tabular-nums font-medium">{currency(inv.amount)}</TableCell>
                  <TableCell className="text-right tabular-nums text-muted-foreground">{currency(inv.tax)}</TableCell>
                  <TableCell><EnvBadge env={inv.env} /></TableCell>
                  <TableCell><StatusBadge status={inv.status} /></TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link to="/invoices/$invoiceId" params={{ invoiceId: inv.id }}><Eye className="h-4 w-4" /> View details</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem><Download className="h-4 w-4" /> Download PDF</DropdownMenuItem>
                        <DropdownMenuItem><FileJson className="h-4 w-4" /> View JSON</DropdownMenuItem>
                        {inv.env === "sandbox" && (
                          <DropdownMenuItem className="text-destructive"><Trash2 className="h-4 w-4" /> Delete</DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="flex items-center justify-between border-t border-border px-4 py-3 text-xs text-muted-foreground">
          <div>Showing <span className="tabular-nums text-foreground">{list.length}</span> of <span className="tabular-nums text-foreground">{invoices.length}</span></div>
          <div className="flex items-center gap-1">
            <Button variant="outline" size="sm" disabled>Previous</Button>
            <Button variant="outline" size="sm">Next</Button>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
