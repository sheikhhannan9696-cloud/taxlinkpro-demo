import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  ShieldCheck,
  PlayCircle,
  FileJson,
  CheckCircle2,
  ArrowRight,
  Search,
  Lock,
  Unlock,
  Sparkles,
  Upload,
} from "lucide-react";
import { AppShell, PageHeader } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { ScenarioStatusBadge, MetricCard } from "@/components/ui-kit";
import { scenarios } from "@/lib/mock-data";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/sandbox")({
  head: () => ({ meta: [{ title: "Sandbox Scenarios — TaxLink Pro" }] }),
  component: SandboxPage,
});

function SandboxPage() {
  const [q, setQ] = useState("");
  const [openId, setOpenId] = useState<string | null>(null);
  const required = scenarios.filter((s) => s.required);
  const passed = required.filter((s) => s.status === "passed").length;
  const readiness = Math.round((passed / required.length) * 100);
  const filtered = scenarios.filter((s) => !q || s.code.toLowerCase().includes(q.toLowerCase()) || s.name.toLowerCase().includes(q.toLowerCase()));
  const open = scenarios.find((s) => s.id === openId);

  return (
    <AppShell>
      <PageHeader
        title="Sandbox Scenarios"
        description="Complete required scenarios to unlock production submissions to FBR."
        actions={
          <Button size="sm" disabled={readiness < 100}>
            {readiness < 100 ? <><Lock className="h-4 w-4" /> Production locked</> : <><Unlock className="h-4 w-4" /> Go Live</>}
          </Button>
        }
      />

      {/* Readiness hero */}
      <div className="mb-6 overflow-hidden rounded-xl border border-border bg-gradient-to-br from-primary/5 via-card to-card shadow-card">
        <div className="grid gap-6 p-6 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
              <ShieldCheck className="h-3.5 w-3.5" /> Go-Live Readiness
            </div>
            <div className="mt-3 flex items-baseline gap-3">
              <span className="text-4xl font-semibold tabular-nums">{readiness}%</span>
              <span className="text-sm text-muted-foreground">{passed} of {required.length} required scenarios passed</span>
            </div>
            <Progress value={readiness} className="mt-4 h-2" />
            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
              <Stat label="Total" value={String(scenarios.length)} />
              <Stat label="Required" value={String(required.length)} />
              <Stat label="Passed" value={String(passed)} tone="success" />
              <Stat label="Remaining" value={String(required.length - passed)} tone="warning" />
            </div>
          </div>
          <div className="space-y-3 rounded-lg border border-border bg-card p-4">
            <div className="text-sm font-semibold">Production unlock checklist</div>
            <ul className="space-y-2 text-sm">
              {[
                { ok: true, t: "All required scenarios pass" },
                { ok: true, t: "Default business profile configured" },
                { ok: false, t: "Sample production invoice reviewed" },
                { ok: false, t: "Compliance acknowledgement signed" },
              ].map((c, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle2 className={cn("mt-0.5 h-4 w-4 shrink-0", c.ok ? "text-success" : "text-muted-foreground/40")} />
                  <span className={cn(!c.ok && "text-muted-foreground")}>{c.t}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-center">
        <div className="relative flex-1 max-w-md">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search scenarios…" className="h-9 pl-9" />
        </div>
        <Button variant="outline" size="sm"><Upload className="h-4 w-4" /> Upload scenario JSON</Button>
      </div>

      {/* Scenario cards */}
      <div className="grid gap-3 md:grid-cols-2">
        {filtered.map((s) => (
          <button
            key={s.id}
            onClick={() => setOpenId(s.id)}
            className="group rounded-xl border border-border bg-card p-5 text-left shadow-card transition hover:shadow-elevated"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-semibold text-primary">{s.code}</span>
                  {s.required && <span className="rounded bg-destructive/10 px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-destructive">Required</span>}
                  <span className="text-[10px] text-muted-foreground">{s.category}</span>
                </div>
                <div className="mt-1 text-sm font-semibold">{s.name}</div>
                <div className="mt-1 line-clamp-2 text-xs text-muted-foreground">{s.description}</div>
              </div>
              <ScenarioStatusBadge status={s.status} />
            </div>
            <div className="mt-4 flex items-center justify-between border-t border-border pt-3 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1.5"><FileJson className="h-3 w-3" /> {s.jsonFile}</span>
              <span>{s.attempts} attempt{s.attempts === 1 ? "" : "s"}</span>
            </div>
          </button>
        ))}
      </div>

      {/* Detail sheet */}
      <Sheet open={!!open} onOpenChange={(v) => !v && setOpenId(null)}>
        <SheetContent className="sm:max-w-xl">
          {open && (
            <>
              <SheetHeader>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-sm font-semibold text-primary">{open.code}</span>
                  <ScenarioStatusBadge status={open.status} />
                </div>
                <SheetTitle className="text-lg">{open.name}</SheetTitle>
                <SheetDescription>{open.description}</SheetDescription>
              </SheetHeader>
              <div className="mt-6 space-y-5">
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <Field label="Category" value={open.category} />
                  <Field label="Mapped sale type" value={open.saleType} />
                  <Field label="Attempts" value={String(open.attempts)} />
                  <Field label="JSON file" value={open.jsonFile} />
                </div>

                <div>
                  <div className="mb-2 text-sm font-semibold">Validation checklist</div>
                  <ul className="space-y-2 rounded-lg border border-border bg-surface-muted/40 p-3 text-sm">
                    {["Schema valid", "Buyer fields complete", "Tax fields match scenario", "FBR mock response received"].map((c, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className={cn("mt-0.5 h-4 w-4", i < 3 ? "text-success" : "text-muted-foreground/40")} />
                        <span className={cn(i >= 3 && "text-muted-foreground")}>{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="overflow-hidden rounded-lg border border-sidebar-border bg-sidebar">
                  <div className="flex items-center justify-between border-b border-sidebar-border px-3 py-2 text-xs text-sidebar-foreground/70">
                    <span className="inline-flex items-center gap-1.5"><FileJson className="h-3 w-3" /> {open.jsonFile}</span>
                  </div>
                  <pre className="max-h-56 overflow-auto p-3 text-[11px] leading-relaxed text-sidebar-foreground"><code>{JSON.stringify({
                    scenarioId: open.code,
                    saleType: open.saleType,
                    items: [{ hsCode: "2523.2900", quantity: 50, rate: "17%", valueSalesExcludingST: 72500 }],
                  }, null, 2)}</code></pre>
                </div>

                <div className="flex items-center gap-2">
                  <Button asChild className="flex-1"><Link to="/invoices/new"><PlayCircle className="h-4 w-4" /> Run scenario</Link></Button>
                  <Button variant="outline" className="flex-1"><Sparkles className="h-4 w-4" /> Mark complete</Button>
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </AppShell>
  );
}

function Stat({ label, value, tone }: { label: string; value: string; tone?: "success" | "warning" }) {
  return (
    <div className="rounded-lg border border-border bg-card px-3 py-2">
      <div className={cn("text-lg font-semibold tabular-nums", tone === "success" && "text-success", tone === "warning" && "text-warning-foreground")}>{value}</div>
      <div className="text-[11px] text-muted-foreground">{label}</div>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-[11px] uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className="mt-0.5 font-medium">{value}</div>
    </div>
  );
}
