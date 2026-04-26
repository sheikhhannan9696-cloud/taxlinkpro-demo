import { createFileRoute } from "@tanstack/react-router";
import { Building2, Plus, MapPin, FileText, Star, MoreHorizontal } from "lucide-react";
import { AppShell, PageHeader } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { businessProfiles, currency } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/business-profiles")({
  head: () => ({ meta: [{ title: "Business Profiles — TaxLink Pro" }] }),
  component: BusinessProfilesPage,
});

function BusinessProfilesPage() {
  return (
    <AppShell>
      <PageHeader
        title="Business Profiles"
        description="Seller identities used to issue invoices. Set a default for quicker creation."
        actions={
          <Sheet>
            <SheetTrigger asChild><Button size="sm"><Plus className="h-4 w-4" /> New profile</Button></SheetTrigger>
            <SheetContent className="sm:max-w-md">
              <SheetHeader><SheetTitle>Add business profile</SheetTitle></SheetHeader>
              <div className="mt-6 space-y-4">
                <div className="space-y-1.5"><Label>Business name</Label><Input placeholder="Acme Trading (Pvt) Ltd." /></div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5"><Label>NTN</Label><Input placeholder="0000000-0" /></div>
                  <div className="space-y-1.5"><Label>STRN</Label><Input placeholder="32-77-..." /></div>
                </div>
                <div className="space-y-1.5"><Label>Province</Label><Input placeholder="Sindh" /></div>
                <div className="space-y-1.5"><Label>Address</Label><Input placeholder="Plot 42, Karachi" /></div>
                <Button className="w-full">Save profile</Button>
              </div>
            </SheetContent>
          </Sheet>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {businessProfiles.map((p) => (
          <div key={p.id} className="group relative rounded-xl border border-border bg-card p-5 shadow-card transition hover:shadow-elevated">
            <div className="flex items-start justify-between gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Building2 className="h-5 w-5" />
              </div>
              <div className="flex items-center gap-2">
                {p.isDefault && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary">
                    <Star className="h-3 w-3 fill-primary" /> Default
                  </span>
                )}
                <Button variant="ghost" size="icon" className="h-7 w-7"><MoreHorizontal className="h-4 w-4" /></Button>
              </div>
            </div>
            <div className="mt-4">
              <div className="text-base font-semibold">{p.name}</div>
              <div className="mt-1 inline-flex items-center gap-1 text-xs text-muted-foreground"><MapPin className="h-3 w-3" /> {p.address}</div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3 border-t border-border pt-4 text-xs">
              <div><div className="text-muted-foreground">NTN</div><div className="mt-0.5 font-medium tabular-nums">{p.ntn}</div></div>
              <div><div className="text-muted-foreground">STRN</div><div className="mt-0.5 font-medium tabular-nums">{p.strn}</div></div>
              <div><div className="text-muted-foreground">Province</div><div className="mt-0.5 font-medium">{p.province}</div></div>
              <div><div className="text-muted-foreground inline-flex items-center gap-1"><FileText className="h-3 w-3" /> Invoices</div><div className="mt-0.5 font-medium tabular-nums">{p.invoicesIssued}</div></div>
            </div>
            <div className="mt-4 flex items-center gap-2 border-t border-border pt-4">
              <Button variant="outline" size="sm" className="flex-1">Edit</Button>
              {!p.isDefault && <Button variant="ghost" size="sm" className="flex-1">Set default</Button>}
            </div>
          </div>
        ))}
        {/* Add card */}
        <button className={cn(
          "flex min-h-[260px] flex-col items-center justify-center rounded-xl border-2 border-dashed border-border bg-surface-muted/40 p-5 text-muted-foreground transition hover:border-primary hover:text-primary",
        )}>
          <Plus className="mb-2 h-6 w-6" />
          <div className="text-sm font-medium">Add new profile</div>
          <div className="mt-1 text-xs">Create another seller identity</div>
        </button>
      </div>
    </AppShell>
  );
}
