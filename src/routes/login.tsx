import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ShieldCheck, Eye, EyeOff, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useApp } from "@/lib/app-state";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Sign in — TaxLink Pro" }] }),
  component: LoginPage,
});

function LoginPage() {
  const { setUser, env, setEnv } = useApp();
  const navigate = useNavigate();
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setUser({ name: "Ayesha Khan", email: "ayesha@acme.pk", workspace: "Acme Trading" });
      navigate({ to: "/dashboard" });
    }, 500);
  }

  return (
    <div className="grid min-h-screen w-full lg:grid-cols-2">
      {/* Left — brand panel */}
      <div className="relative hidden flex-col justify-between overflow-hidden bg-sidebar p-10 text-sidebar-foreground lg:flex">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,oklch(0.6_0.18_268/0.25),transparent_50%),radial-gradient(circle_at_80%_80%,oklch(0.5_0.16_220/0.2),transparent_50%)]" />
        <div className="relative flex items-center gap-2.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-sidebar-primary to-primary shadow-glow">
            <ShieldCheck className="h-5 w-5 text-sidebar-primary-foreground" />
          </div>
          <div>
            <div className="text-base font-semibold text-sidebar-accent-foreground">TaxLink Pro</div>
            <div className="text-xs text-sidebar-foreground/60">FBR e-Invoicing ERP</div>
          </div>
        </div>

        <div className="relative space-y-6">
          <h2 className="text-3xl font-semibold leading-tight text-sidebar-accent-foreground">
            The operating system for tax invoicing.
          </h2>
          <p className="max-w-md text-sm leading-relaxed text-sidebar-foreground/70">
            Create, validate, and submit invoices to FBR with confidence. Sandbox-test every scenario before going live — all from one elegant workspace.
          </p>
          <div className="grid grid-cols-2 gap-4 pt-2">
            {[
              { k: "Invoices submitted", v: "1.2M+" },
              { k: "Avg. submission time", v: "1.4s" },
              { k: "Sandbox scenarios", v: "10" },
              { k: "Uptime", v: "99.98%" },
            ].map((s) => (
              <div key={s.k} className="rounded-lg border border-sidebar-border bg-sidebar-accent/30 p-3">
                <div className="text-lg font-semibold tabular-nums text-sidebar-accent-foreground">{s.v}</div>
                <div className="mt-0.5 text-[11px] text-sidebar-foreground/60">{s.k}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative text-xs text-sidebar-foreground/50">© 2025 Acme Trading · TaxLink Pro</div>
      </div>

      {/* Right — form */}
      <div className="flex items-center justify-center bg-background p-6 sm:p-10">
        <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-6">
          <div className="lg:hidden">
            <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary shadow-glow">
              <ShieldCheck className="h-5 w-5 text-primary-foreground" />
            </div>
          </div>
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Sign in to your workspace</h1>
            <p className="mt-1 text-sm text-muted-foreground">Use your TaxLink Pro credentials to continue.</p>
          </div>

          <div className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="username">Username</Label>
              <Input id="username" defaultValue="ayesha" autoComplete="username" />
            </div>
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <a href="#" className="text-xs text-primary hover:underline">Forgot password?</a>
              </div>
              <div className="relative">
                <Input id="password" type={showPwd ? "text" : "password"} defaultValue="demo-password" autoComplete="current-password" />
                <button
                  type="button"
                  onClick={() => setShowPwd((s) => !s)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 text-muted-foreground hover:bg-muted"
                  aria-label="Toggle password visibility"
                >
                  {showPwd ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Environment</Label>
              <div className="grid grid-cols-2 gap-2">
                {(["sandbox", "production"] as const).map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setEnv(opt)}
                    className={cn(
                      "flex flex-col items-start gap-1 rounded-lg border p-3 text-left transition",
                      env === opt
                        ? "border-primary bg-primary/5 shadow-sm"
                        : "border-border bg-surface hover:bg-surface-muted",
                    )}
                  >
                    <div className="flex w-full items-center justify-between">
                      <span className="text-sm font-medium capitalize">{opt}</span>
                      <span
                        className={cn(
                          "h-2 w-2 rounded-full",
                          opt === "production" ? "bg-success" : "bg-warning",
                          env === opt ? "ring-2 ring-offset-1 ring-offset-background" : "opacity-50",
                          env === opt && (opt === "production" ? "ring-success/40" : "ring-warning/40"),
                        )}
                      />
                    </div>
                    <span className="text-[11px] text-muted-foreground">
                      {opt === "production" ? "Live FBR submissions" : "Test scenarios safely"}
                    </span>
                  </button>
                ))}
              </div>
              {env === "sandbox" && (
                <p className="text-[11px] text-muted-foreground">
                  Production unlocks after required sandbox scenarios pass.
                </p>
              )}
            </div>
          </div>

          <Button type="submit" className="w-full" size="lg" disabled={loading}>
            {loading ? "Signing in…" : (
              <>
                Sign in <ArrowRight className="h-4 w-4" />
              </>
            )}
          </Button>

          <div className="text-center text-xs text-muted-foreground">
            By continuing you agree to the Terms of Service and Privacy Policy.
          </div>
        </form>
      </div>
    </div>
  );
}
