import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useApp } from "@/lib/app-state";

export const Route = createFileRoute("/settings")({
  head: () => ({ meta: [{ title: "Settings — TaxLink Pro" }] }),
  component: SettingsPage,
});

function SettingsPage() {
  const { theme, setTheme, env, setEnv } = useApp();

  return (
    <AppShell>
      <PageHeader title="Settings" description="Workspace, preferences, and integrations." />

      <Tabs defaultValue="workspace" className="space-y-6">
        <TabsList>
          <TabsTrigger value="workspace">Workspace</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        <TabsContent value="workspace">
          <Section title="Workspace" description="Identifying details for your organization.">
            <Field label="Workspace name"><Input defaultValue="Acme Trading" /></Field>
            <Field label="Default currency"><Input defaultValue="PKR" disabled /></Field>
            <Field label="Time zone"><Input defaultValue="Asia/Karachi" /></Field>
          </Section>
        </TabsContent>

        <TabsContent value="preferences" className="space-y-6">
          <Section title="Appearance" description="Choose how TaxLink Pro looks for you.">
            <Row title="Theme" subtitle="Switch between light and dark.">
              <div className="inline-flex rounded-md border border-border p-0.5">
                {(["light", "dark"] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setTheme(t)}
                    className={`rounded-sm px-3 py-1 text-xs capitalize ${theme === t ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </Row>
            <Row title="Default environment" subtitle="Where new sessions land.">
              <div className="inline-flex rounded-md border border-border p-0.5">
                {(["sandbox", "production"] as const).map((e) => (
                  <button
                    key={e}
                    onClick={() => setEnv(e)}
                    className={`rounded-sm px-3 py-1 text-xs capitalize ${env === e ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}
                  >
                    {e}
                  </button>
                ))}
              </div>
            </Row>
            <Row title="Compact tables" subtitle="Higher data density.">
              <Switch />
            </Row>
          </Section>
        </TabsContent>

        <TabsContent value="integrations">
          <Section title="FBR API" description="Connection to FBR e-Invoicing endpoints. These details are managed by your administrator and cannot be edited.">
            <Field label="Sandbox endpoint"><Input value="https://gw.fbr.gov.pk/sandbox/v1" readOnly disabled /></Field>
            <Field label="Production endpoint"><Input value="https://gw.fbr.gov.pk/production/v1" readOnly disabled /></Field>
            <Field label="API token"><Input type="password" value="••••••••••••••••" readOnly disabled /></Field>
            <div className="flex items-center gap-2 rounded-md border border-border bg-surface-muted/40 px-3 py-2 text-xs text-muted-foreground">
              <span className="inline-flex h-1.5 w-1.5 rounded-full bg-success" />
              Locked — contact your workspace administrator to change FBR integration settings.
            </div>
          </Section>
        </TabsContent>

        <TabsContent value="security">
          <Section title="Account security" description="Protect your TaxLink Pro account.">
            <Row title="Two-factor authentication" subtitle="Use an authenticator app on sign-in."><Switch defaultChecked /></Row>
            <Row title="Session timeout" subtitle="Automatically sign out after inactivity."><Switch defaultChecked /></Row>
            <Row title="Audit log access" subtitle="Allow admins to view all activity."><Switch /></Row>
          </Section>
        </TabsContent>
      </Tabs>
    </AppShell>
  );
}

function Section({ title, description, children }: { title: string; description?: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-border bg-card p-6 shadow-card">
      <div className="mb-5">
        <div className="text-base font-semibold">{title}</div>
        {description && <div className="text-sm text-muted-foreground">{description}</div>}
      </div>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid gap-1.5 sm:grid-cols-[200px_1fr] sm:items-center sm:gap-4">
      <Label className="text-sm">{label}</Label>
      <div>{children}</div>
    </div>
  );
}

function Row({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-border pb-4 last:border-0 last:pb-0">
      <div>
        <div className="text-sm font-medium">{title}</div>
        {subtitle && <div className="text-xs text-muted-foreground">{subtitle}</div>}
      </div>
      {children}
    </div>
  );
}
