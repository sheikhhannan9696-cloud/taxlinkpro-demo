import type { InvoiceStatus, ScenarioStatus, Environment } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { CheckCircle2, XCircle, Clock, FileEdit, AlertCircle, PlayCircle, RotateCw, Circle } from "lucide-react";

export function StatusBadge({ status }: { status: InvoiceStatus }) {
  const map = {
    submitted: { label: "Submitted", className: "bg-success/10 text-success border-success/20", Icon: CheckCircle2 },
    failed: { label: "Failed", className: "bg-destructive/10 text-destructive border-destructive/20", Icon: XCircle },
    draft: { label: "Draft", className: "bg-muted text-muted-foreground border-border", Icon: FileEdit },
    pending: { label: "Pending", className: "bg-warning/10 text-warning-foreground border-warning/20", Icon: Clock },
  } as const;
  const { label, className, Icon } = map[status];
  return (
    <span className={cn("inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-xs font-medium", className)}>
      <Icon className="h-3 w-3" />
      {label}
    </span>
  );
}

export function EnvBadge({ env }: { env: Environment }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-md border px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wider",
        env === "production"
          ? "border-success/30 bg-success/10 text-success"
          : "border-warning/30 bg-warning/10 text-warning-foreground",
      )}
    >
      <span className={cn("h-1 w-1 rounded-full", env === "production" ? "bg-success" : "bg-warning")} />
      {env}
    </span>
  );
}

export function ScenarioStatusBadge({ status }: { status: ScenarioStatus }) {
  const map = {
    not_started: { label: "Not started", className: "bg-muted text-muted-foreground border-border", Icon: Circle },
    in_progress: { label: "In progress", className: "bg-info/10 text-info border-info/20", Icon: PlayCircle },
    passed: { label: "Passed", className: "bg-success/10 text-success border-success/20", Icon: CheckCircle2 },
    failed: { label: "Failed", className: "bg-destructive/10 text-destructive border-destructive/20", Icon: XCircle },
    retry: { label: "Retry needed", className: "bg-warning/10 text-warning-foreground border-warning/20", Icon: RotateCw },
  } as const;
  const { label, className, Icon } = map[status];
  return (
    <span className={cn("inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-xs font-medium", className)}>
      <Icon className="h-3 w-3" />
      {label}
    </span>
  );
}

export function Trend({ value, suffix = "%" }: { value: number; suffix?: string }) {
  const positive = value >= 0;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-0.5 rounded-md px-1.5 py-0.5 text-[11px] font-medium tabular-nums",
        positive ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive",
      )}
    >
      {positive ? "▲" : "▼"} {Math.abs(value)}{suffix}
    </span>
  );
}

export function MetricCard({
  label,
  value,
  trend,
  icon,
  hint,
}: {
  label: string;
  value: string;
  trend?: number;
  icon?: React.ReactNode;
  hint?: string;
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-4 shadow-card transition hover:shadow-elevated">
      <div className="flex items-start justify-between gap-2">
        <div className="text-xs font-medium text-muted-foreground">{label}</div>
        {icon && <div className="rounded-md bg-primary/10 p-1.5 text-primary">{icon}</div>}
      </div>
      <div className="mt-2 flex items-baseline gap-2">
        <span className="text-2xl font-semibold tracking-tight tabular-nums">{value}</span>
        {trend !== undefined && <Trend value={trend} />}
      </div>
      {hint && <div className="mt-1 text-xs text-muted-foreground">{hint}</div>}
    </div>
  );
}

export function EmptyState({
  icon,
  title,
  description,
  action,
}: {
  icon: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-surface-muted/40 px-6 py-16 text-center">
      <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
        {icon}
      </div>
      <div className="text-sm font-semibold">{title}</div>
      {description && <div className="mt-1 max-w-sm text-xs text-muted-foreground">{description}</div>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
