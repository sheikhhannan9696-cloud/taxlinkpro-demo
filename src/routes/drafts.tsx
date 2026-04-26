import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Search, Plus, FileEdit, Copy, Trash2, LayoutGrid, List as ListIcon, Filter } from "lucide-react";
import { AppShell, PageHeader } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { EnvBadge } from "@/components/ui-kit";
import { drafts, currency } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/drafts")({
  head: () => ({ meta: [{ title: "Drafts — TaxLink Pro" }] }),
  component: DraftsPage,
});

function DraftsPage() {
  const [view, setView] = useState<"grid" | "list">("grid");
  const [q, setQ] = useState("");
  const list = drafts.filter((d) => !q || d.title.toLowerCase().includes(q.toLowerCase()) || d.buyer.toLowerCase().includes(q.toLowerCase()));

  return (
    <AppShell>
      <PageHeader
        title="Draft Invoices"
        description="Resume incomplete invoices or duplicate past drafts."
        actions={<Button asChild size="sm"><Link to="/invoices/new"><Plus className="h-4 w-4" /> New Invoice</Link></Button>}
      />

      <div className="rounded-xl border border-border bg-card shadow-card">
        <div className="flex flex-col gap-2 border-b border-border p-3 sm:flex-row sm:items-center">
          <div className="relative flex-1 max-w-md">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search drafts…" className="h-9 pl-9" />
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm"><Filter className="h-4 w-4" /> Filters</Button>
            <div className="inline-flex rounded-md border border-border bg-background p-0.5">
              <button onClick={() => setView("grid")} className={cn("rounded p-1.5", view === "grid" ? "bg-muted" : "text-muted-foreground")}><LayoutGrid className="h-4 w-4" /></button>
              <button onClick={() => setView("list")} className={cn("rounded p-1.5", view === "list" ? "bg-muted" : "text-muted-foreground")}><ListIcon className="h-4 w-4" /></button>
            </div>
          </div>
        </div>

        {view === "grid" ? (
          <div className="grid gap-3 p-4 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((d) => (
              <div key={d.id} className="rounded-lg border border-border bg-surface p-4 transition hover:shadow-elevated">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <div className="truncate text-sm font-semibold">{d.title}</div>
                    <div className="text-xs text-muted-foreground">{d.buyer}</div>
                  </div>
                  <EnvBadge env={d.env} />
                </div>
                <div className="mt-3 flex items-baseline justify-between">
                  <span className="text-lg font-semibold tabular-nums">{currency(d.amount)}</span>
                  <span className="text-[11px] text-muted-foreground">Step {d.step} of 5</span>
                </div>
                <div className="mt-3 space-y-1">
                  <div className="flex justify-between text-[11px] text-muted-foreground"><span>Completion</span><span className="tabular-nums">{d.completion}%</span></div>
                  <Progress value={d.completion} />
                </div>
                <div className="mt-4 flex items-center justify-between border-t border-border pt-3">
                  <div className="text-[11px] text-muted-foreground">{d.updated}</div>
                  <div className="flex items-center gap-1">
                    <Button asChild size="sm" variant="ghost" className="h-7 px-2"><Link to="/invoices/new"><FileEdit className="h-3.5 w-3.5" /> Resume</Link></Button>
                    <Button size="sm" variant="ghost" className="h-7 w-7 p-0"><Copy className="h-3.5 w-3.5" /></Button>
                    <Button size="sm" variant="ghost" className="h-7 w-7 p-0 text-muted-foreground hover:text-destructive"><Trash2 className="h-3.5 w-3.5" /></Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="divide-y divide-border">
            {list.map((d) => (
              <div key={d.id} className="flex items-center gap-4 px-5 py-3">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold">{d.title}</span>
                    <EnvBadge env={d.env} />
                  </div>
                  <div className="text-xs text-muted-foreground">{d.buyer} · {d.updated}</div>
                </div>
                <div className="hidden w-32 sm:block">
                  <div className="flex justify-between text-[11px] text-muted-foreground"><span>Step {d.step}/5</span><span>{d.completion}%</span></div>
                  <Progress value={d.completion} className="mt-1" />
                </div>
                <div className="w-28 text-right text-sm font-semibold tabular-nums">{currency(d.amount)}</div>
                <Button asChild size="sm" variant="outline"><Link to="/invoices/new">Resume</Link></Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </AppShell>
  );
}
