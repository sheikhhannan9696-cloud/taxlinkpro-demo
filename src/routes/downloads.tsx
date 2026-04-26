import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Search, Download, Filter, FileArchive, Clock, CheckCircle2 } from "lucide-react";
import { AppShell, PageHeader } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { EnvBadge, MetricCard } from "@/components/ui-kit";
import { invoices, currency } from "@/lib/mock-data";
import { toast } from "sonner";

export const Route = createFileRoute("/downloads")({
  head: () => ({ meta: [{ title: "Download Center — TaxLink Pro" }] }),
  component: DownloadsPage,
});

function DownloadsPage() {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [q, setQ] = useState("");
  const list = invoices.filter((i) => i.status === "submitted").filter((i) => !q || i.id.toLowerCase().includes(q.toLowerCase()) || i.buyer.toLowerCase().includes(q.toLowerCase()));
  const allSelected = list.length > 0 && list.every((i) => selected.has(i.id));

  const exports = [
    { id: 1, name: "April 2025 — All invoices.zip", size: "12.4 MB", at: "2 hours ago", status: "ready" },
    { id: 2, name: "Sandbox runs SN001-SN006.zip", size: "1.8 MB", at: "Yesterday", status: "ready" },
    { id: 3, name: "Q1 2025 PDF bundle.zip", size: "48.2 MB", at: "3 days ago", status: "ready" },
  ];

  return (
    <AppShell>
      <PageHeader
        title="Download Center"
        description="Single PDFs, bulk ZIP exports, and your export history."
      />

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <MetricCard label="Available PDFs" value={String(list.length)} icon={<FileArchive className="h-4 w-4" />} />
        <MetricCard label="This month" value="245" trend={12} />
        <MetricCard label="Total size" value="312 MB" />
        <MetricCard label="Recent exports" value="8" />
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_360px]">
        <div className="rounded-xl border border-border bg-card shadow-card">
          <div className="flex flex-col gap-2 border-b border-border p-3 sm:flex-row sm:items-center">
            <div className="relative flex-1 max-w-md">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search invoices…" className="h-9 pl-9" />
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm"><Filter className="h-4 w-4" /> Filters</Button>
              <Button
                size="sm"
                disabled={selected.size === 0}
                onClick={() => toast.success(`Preparing ZIP for ${selected.size} invoice${selected.size === 1 ? "" : "s"}`)}
              >
                <Download className="h-4 w-4" /> Download {selected.size > 0 ? `(${selected.size})` : "ZIP"}
              </Button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-10">
                    <Checkbox
                      checked={allSelected}
                      onCheckedChange={(v) => {
                        const next = new Set(selected);
                        if (v) list.forEach((i) => next.add(i.id));
                        else list.forEach((i) => next.delete(i.id));
                        setSelected(next);
                      }}
                    />
                  </TableHead>
                  <TableHead>Invoice</TableHead>
                  <TableHead>Buyer</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead>Env</TableHead>
                  <TableHead className="w-24" />
                </TableRow>
              </TableHeader>
              <TableBody>
                {list.map((inv) => (
                  <TableRow key={inv.id}>
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
                    <TableCell className="font-medium">{inv.id}</TableCell>
                    <TableCell className="max-w-[200px] truncate">{inv.buyer}</TableCell>
                    <TableCell className="text-muted-foreground">{inv.date}</TableCell>
                    <TableCell className="text-right tabular-nums">{currency(inv.amount)}</TableCell>
                    <TableCell><EnvBadge env={inv.env} /></TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm" className="text-xs"><Download className="h-3.5 w-3.5" /> PDF</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        <aside className="rounded-xl border border-border bg-card shadow-card">
          <div className="border-b border-border px-5 py-3 text-sm font-semibold">Export history</div>
          <div className="divide-y divide-border">
            {exports.map((e) => (
              <div key={e.id} className="flex items-start gap-3 p-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-md bg-primary/10 text-primary">
                  <FileArchive className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-medium">{e.name}</div>
                  <div className="mt-0.5 inline-flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" /> {e.at} · {e.size}
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="inline-flex items-center gap-1 rounded-md bg-success/10 px-1.5 py-0.5 text-[10px] font-medium text-success">
                    <CheckCircle2 className="h-3 w-3" /> Ready
                  </span>
                  <Button variant="ghost" size="sm" className="h-7 px-2 text-xs"><Download className="h-3.5 w-3.5" /></Button>
                </div>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </AppShell>
  );
}
