import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import {
  Building2,
  FileText,
  User,
  Package,
  CheckCircle2,
  ArrowLeft,
  ArrowRight,
  Save,
  Send,
  FileJson,
  Plus,
  Trash2,
  ChevronDown,
  Sparkles,
  AlertCircle,
} from "lucide-react";
import { AppShell, PageHeader } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { businessProfiles, buyers, products, currency } from "@/lib/mock-data";
import { useApp } from "@/lib/app-state";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export const Route = createFileRoute("/invoices/new")({
  head: () => ({ meta: [{ title: "Create Invoice — TaxLink Pro" }] }),
  component: CreateInvoicePage,
});

const steps = [
  { id: 1, label: "Seller", icon: Building2 },
  { id: 2, label: "Invoice", icon: FileText },
  { id: 3, label: "Buyer", icon: User },
  { id: 4, label: "Items", icon: Package },
  { id: 5, label: "Review", icon: CheckCircle2 },
] as const;

type LineItem = {
  productId: string;
  qty: number;
  rate: number;
  taxRate: number;
};

function CreateInvoicePage() {
  const { env } = useApp();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [profileId, setProfileId] = useState(businessProfiles[0].id);
  const [buyerId, setBuyerId] = useState(buyers[0].id);
  
  const [items, setItems] = useState<LineItem[]>([
    { productId: products[0].id, qty: 10, rate: products[0].rate, taxRate: products[0].taxRate },
  ]);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [submitOpen, setSubmitOpen] = useState(false);
  const [fbrNumber, setFbrNumber] = useState<string>("");

  const profile = businessProfiles.find((p) => p.id === profileId)!;
  const buyer = buyers.find((b) => b.id === buyerId)!;

  const subtotal = items.reduce((s, i) => s + i.qty * i.rate, 0);
  const tax = items.reduce((s, i) => s + i.qty * i.rate * (i.taxRate / 100), 0);
  const total = subtotal + tax;

  function addItem() {
    setItems([...items, { productId: products[0].id, qty: 1, rate: products[0].rate, taxRate: products[0].taxRate }]);
  }

  function next() {
    setStep((s) => Math.min(5, s + 1));
  }
  function prev() {
    setStep((s) => Math.max(1, s - 1));
  }

  return (
    <AppShell>
      <PageHeader
        breadcrumb={<Link to="/invoices" className="inline-flex items-center gap-1 hover:text-foreground"><ArrowLeft className="h-3 w-3" /> Invoices</Link>}
        title="Create Invoice"
        description={env === "sandbox" ? "Sandbox mode — no real submission to FBR." : "Production mode — submission is final."}
        actions={
          <>
            <Button variant="outline" size="sm" onClick={() => toast.success("Draft saved")}><Save className="h-4 w-4" /> Save draft</Button>
            <Button variant="outline" size="sm"><FileJson className="h-4 w-4" /> View JSON</Button>
          </>
        }
      />

      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <div className="min-w-0 space-y-4">
          {/* Stepper */}
          <div className="rounded-xl border border-border bg-card p-4 shadow-card">
            <ol className="flex items-center justify-between gap-2">
              {steps.map((s, i) => {
                const Icon = s.icon;
                const active = step === s.id;
                const done = step > s.id;
                return (
                  <li key={s.id} className="flex flex-1 items-center gap-2">
                    <button
                      onClick={() => setStep(s.id)}
                      className={cn(
                        "flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-left transition",
                        active && "bg-primary/10 text-primary",
                        !active && !done && "text-muted-foreground hover:text-foreground",
                        done && "text-foreground",
                      )}
                    >
                      <span
                        className={cn(
                          "flex h-7 w-7 items-center justify-center rounded-full border text-xs font-semibold",
                          active && "border-primary bg-primary text-primary-foreground",
                          done && "border-success bg-success text-success-foreground",
                          !active && !done && "border-border bg-surface-muted",
                        )}
                      >
                        {done ? <CheckCircle2 className="h-4 w-4" /> : <Icon className="h-3.5 w-3.5" />}
                      </span>
                      <span className="hidden text-sm font-medium sm:inline">{s.label}</span>
                    </button>
                    {i < steps.length - 1 && <span className={cn("h-px flex-1", done ? "bg-success" : "bg-border")} />}
                  </li>
                );
              })}
            </ol>
          </div>

          {/* Step body */}
          <div className="rounded-xl border border-border bg-card p-6 shadow-card">
            {step === 1 && (
              <div className="space-y-5">
                <div>
                  <h3 className="text-base font-semibold">Seller / business profile</h3>
                  <p className="text-sm text-muted-foreground">Choose the registered profile issuing this invoice.</p>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  {businessProfiles.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => setProfileId(p.id)}
                      className={cn(
                        "rounded-lg border p-4 text-left transition",
                        profileId === p.id ? "border-primary bg-primary/5 shadow-sm" : "border-border bg-surface hover:bg-surface-muted",
                      )}
                    >
                      <div className="flex items-start justify-between">
                        <div className="text-sm font-semibold">{p.name}</div>
                        {p.isDefault && <span className="rounded-full bg-primary/10 px-1.5 py-0.5 text-[10px] font-medium text-primary">Default</span>}
                      </div>
                      <div className="mt-1 text-xs text-muted-foreground">{p.address}</div>
                      <div className="mt-3 flex gap-4 text-xs">
                        <span><span className="text-muted-foreground">NTN </span><span className="font-medium tabular-nums">{p.ntn}</span></span>
                        <span><span className="text-muted-foreground">STRN </span><span className="font-medium tabular-nums">{p.strn}</span></span>
                      </div>
                    </button>
                  ))}
                </div>
                <Button variant="outline" size="sm" asChild><Link to="/business-profiles"><Plus className="h-4 w-4" /> Manage profiles</Link></Button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-5">
                <div>
                  <h3 className="text-base font-semibold">Invoice details</h3>
                  <p className="text-sm text-muted-foreground">Reference numbers, date, and FBR scenario context.</p>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <Label>Invoice type</Label>
                    <Select defaultValue="sale">
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sale">Sale Invoice</SelectItem>
                        <SelectItem value="debit">Debit Note</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1.5"><Label>Invoice reference</Label><Input defaultValue="INV-2025-0242" /></div>
                  <div className="space-y-1.5"><Label>Invoice date</Label><Input type="date" defaultValue="2025-04-25" /></div>
                  <div className="space-y-1.5"><Label>PO Number</Label><Input placeholder="Optional" /></div>
                  <div className="space-y-1.5"><Label>Delivery challan / DN</Label><Input placeholder="Optional" /></div>
                  <div className="space-y-1.5">
                    <Label>Sale type</Label>
                    <Select defaultValue="goods-standard">
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="goods-standard">Goods at Standard Rate</SelectItem>
                        <SelectItem value="goods-reduced">Goods at Reduced Rate</SelectItem>
                        <SelectItem value="services">Services</SelectItem>
                        <SelectItem value="export">Export (zero-rated)</SelectItem>
                        <SelectItem value="pharma">Pharmaceutical</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-5">
                <div>
                  <h3 className="text-base font-semibold">Buyer information</h3>
                  <p className="text-sm text-muted-foreground">Pick from saved buyers or add a new one.</p>
                </div>
                <Select value={buyerId} onValueChange={setBuyerId}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {buyers.map((b) => (
                      <SelectItem key={b.id} value={b.id}>{b.code} · {b.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <div className="rounded-lg border border-border bg-surface-muted/40 p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="text-sm font-semibold">{buyer.name}</div>
                      <div className="mt-0.5 text-xs text-muted-foreground">{buyer.city}, {buyer.province}</div>
                    </div>
                    <span className={cn("rounded-md px-2 py-0.5 text-[10px] font-medium", buyer.type === "registered" ? "bg-success/10 text-success" : "bg-warning/10 text-warning-foreground")}>
                      {buyer.type}
                    </span>
                  </div>
                  <div className="mt-3 grid grid-cols-3 gap-3 text-xs">
                    <div><div className="text-muted-foreground">Code</div><div className="font-medium">{buyer.code}</div></div>
                    {buyer.ntn && <div><div className="text-muted-foreground">NTN</div><div className="font-medium tabular-nums">{buyer.ntn}</div></div>}
                    {buyer.strn && <div><div className="text-muted-foreground">STRN</div><div className="font-medium tabular-nums">{buyer.strn}</div></div>}
                    {buyer.cnic && <div><div className="text-muted-foreground">CNIC</div><div className="font-medium tabular-nums">{buyer.cnic}</div></div>}
                  </div>
                </div>
                <Button variant="outline" size="sm" asChild><Link to="/buyers"><Plus className="h-4 w-4" /> Manage buyers</Link></Button>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-5">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-base font-semibold">Product items</h3>
                    <p className="text-sm text-muted-foreground">Add line items. Tax is calculated in real time.</p>
                  </div>
                  <Button size="sm" variant="outline" onClick={addItem}><Plus className="h-4 w-4" /> Add item</Button>
                </div>
                <div className="space-y-3">
                  {items.map((item, idx) => {
                    const product = products.find((p) => p.id === item.productId)!;
                    return (
                      <div key={idx} className="rounded-lg border border-border bg-surface p-4">
                        <div className="grid gap-3 sm:grid-cols-12">
                          <div className="sm:col-span-5 space-y-1.5">
                            <Label className="text-xs">Product</Label>
                            <Select value={item.productId} onValueChange={(v) => {
                              const p = products.find((pp) => pp.id === v)!;
                              const next = [...items];
                              next[idx] = { ...next[idx], productId: v, rate: p.rate, taxRate: p.taxRate };
                              setItems(next);
                            }}>
                              <SelectTrigger><SelectValue /></SelectTrigger>
                              <SelectContent>{products.map((p) => <SelectItem key={p.id} value={p.id}>{p.code} · {p.name}</SelectItem>)}</SelectContent>
                            </Select>
                            <div className="text-[11px] text-muted-foreground">HS {product.hsCode} · {product.uom}</div>
                          </div>
                          <div className="sm:col-span-2 space-y-1.5">
                            <Label className="text-xs">Qty</Label>
                            <Input type="number" value={item.qty} onChange={(e) => {
                              const next = [...items]; next[idx] = { ...item, qty: Number(e.target.value) }; setItems(next);
                            }} />
                          </div>
                          <div className="sm:col-span-2 space-y-1.5">
                            <Label className="text-xs">Rate</Label>
                            <Input type="number" value={item.rate} onChange={(e) => {
                              const next = [...items]; next[idx] = { ...item, rate: Number(e.target.value) }; setItems(next);
                            }} />
                          </div>
                          <div className="sm:col-span-2 space-y-1.5">
                            <Label className="text-xs">Tax %</Label>
                            <Input type="number" value={item.taxRate} onChange={(e) => {
                              const next = [...items]; next[idx] = { ...item, taxRate: Number(e.target.value) }; setItems(next);
                            }} />
                          </div>
                          <div className="sm:col-span-1 flex items-end justify-end">
                            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive" onClick={() => setItems(items.filter((_, i) => i !== idx))}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        <div className="mt-3 grid grid-cols-3 gap-3 border-t border-border pt-3 text-xs">
                          <div>
                            <div className="text-muted-foreground">Value excl. sales tax</div>
                            <div className="mt-0.5 font-medium tabular-nums">{currency(item.qty * item.rate)}</div>
                          </div>
                          <div>
                            <div className="text-muted-foreground">Sales tax ({item.taxRate}%)</div>
                            <div className="mt-0.5 font-medium tabular-nums">{currency(item.qty * item.rate * (item.taxRate / 100))}</div>
                          </div>
                          <div>
                            <div className="text-muted-foreground">Value incl. sales tax</div>
                            <div className="mt-0.5 font-semibold tabular-nums">{currency(item.qty * item.rate * (1 + item.taxRate / 100))}</div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <Button size="sm" variant="outline" onClick={addItem} className="w-full sm:w-auto"><Plus className="h-4 w-4" /> Add item</Button>

                <Collapsible open={showAdvanced} onOpenChange={setShowAdvanced}>
                  <CollapsibleTrigger className="inline-flex items-center gap-1 text-xs text-primary hover:underline">
                    <ChevronDown className={cn("h-3 w-3 transition", showAdvanced && "rotate-180")} />
                    {showAdvanced ? "Hide" : "Show"} advanced tax fields (SRO, FED, withholding, fixed value)
                  </CollapsibleTrigger>
                  <CollapsibleContent className="mt-3 grid gap-3 rounded-lg border border-border bg-surface-muted/40 p-4 sm:grid-cols-3">
                    <div className="space-y-1.5"><Label className="text-xs">SRO Schedule No.</Label><Input placeholder="—" /></div>
                    <div className="space-y-1.5"><Label className="text-xs">SRO Item Serial</Label><Input placeholder="—" /></div>
                    <div className="space-y-1.5"><Label className="text-xs">Further tax</Label><Input placeholder="0.00" /></div>
                    <div className="space-y-1.5"><Label className="text-xs">Extra tax</Label><Input placeholder="0.00" /></div>
                    <div className="space-y-1.5"><Label className="text-xs">Sales tax withheld</Label><Input placeholder="0.00" /></div>
                    <div className="space-y-1.5"><Label className="text-xs">FED payable</Label><Input placeholder="0.00" /></div>
                    <div className="space-y-1.5"><Label className="text-xs">Discount</Label><Input placeholder="0.00" /></div>
                    <div className="space-y-1.5"><Label className="text-xs">Fixed notified value</Label><Input placeholder="0.00" /></div>
                  </CollapsibleContent>
                </Collapsible>
              </div>
            )}

            {step === 5 && (
              <div className="space-y-5">
                <div>
                  <h3 className="text-base font-semibold">Review & submit</h3>
                  <p className="text-sm text-muted-foreground">Confirm everything looks right before submitting to FBR.</p>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <ReviewCard label="Seller" title={profile.name} hint={`NTN ${profile.ntn} · ${profile.strn}`} />
                  <ReviewCard label="Buyer" title={buyer.name} hint={`${buyer.code} · ${buyer.city}`} />
                  <ReviewCard label="Items" title={`${items.length} line items`} hint={`Subtotal ${currency(subtotal)}`} />
                  <ReviewCard label="Environment" title={env === "production" ? "Production" : "Sandbox"} hint={env === "production" ? "Live submission" : "Test submission"} />
                </div>
                {env === "production" && (
                  <div className="flex items-start gap-2.5 rounded-lg border border-warning/30 bg-warning/10 p-3 text-sm text-warning-foreground">
                    <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                    <div>You are about to submit a live FBR invoice. This action is final and cannot be undone.</div>
                  </div>
                )}
                <Textarea placeholder="Optional notes for your records…" rows={3} />
              </div>
            )}
          </div>

          {/* Step nav */}
          <div className="flex items-center justify-between">
            <Button variant="outline" onClick={prev} disabled={step === 1}><ArrowLeft className="h-4 w-4" /> Back</Button>
            {step < 5 ? (
              <Button onClick={next}>Continue <ArrowRight className="h-4 w-4" /></Button>
            ) : (
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => toast.success("Draft saved")}><Save className="h-4 w-4" /> Save draft</Button>
                <Button onClick={() => {
                  const num = `FBR-SBX-${Math.floor(100000 + Math.random() * 900000)}`;
                  setFbrNumber(num);
                  setSubmitOpen(true);
                }}>
                  <Send className="h-4 w-4" /> Submit to FBR
                </Button>
              </div>
            )}
          </div>

          <Dialog open={submitOpen} onOpenChange={setSubmitOpen}>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-success/10">
                  <CheckCircle2 className="h-6 w-6 text-success" />
                </div>
                <DialogTitle className="text-center">Invoice submitted successfully</DialogTitle>
                <DialogDescription className="text-center">
                  Your invoice has been successfully sent to FBR in the <span className="font-medium text-foreground">sandbox environment</span>.
                </DialogDescription>
              </DialogHeader>
              <div className="my-2 rounded-lg border border-border bg-surface-muted/40 p-4 text-center">
                <div className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">FBR Invoice Number</div>
                <div className="mt-1 font-mono text-lg font-semibold tabular-nums">{fbrNumber}</div>
              </div>
              <DialogFooter className="flex-col gap-2 sm:flex-row sm:justify-center">
                <Button variant="outline" onClick={() => setSubmitOpen(false)}>Close</Button>
                <Button variant="outline" onClick={() => generateInvoicePdf({ fbrNumber, profile, buyer, items, subtotal, tax, total })}>
                  <FileText className="h-4 w-4" /> Generate invoice PDF
                </Button>
                <Button onClick={() => { setSubmitOpen(false); navigate({ to: "/invoices" }); }}>View invoices</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Sticky summary */}
        <aside className="lg:sticky lg:top-20 lg:h-fit">
          <div className="rounded-xl border border-border bg-card shadow-card">
            <div className="border-b border-border px-5 py-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Invoice summary</span>
                <Sparkles className="h-3.5 w-3.5 text-primary" />
              </div>
              <div className="mt-2 text-2xl font-semibold tabular-nums">{currency(total)}</div>
              <div className="text-xs text-muted-foreground">{items.length} item{items.length === 1 ? "" : "s"} · {env}</div>
            </div>
            <div className="space-y-3 p-5 text-sm">
              <SummaryRow label="Seller" value={profile.name} />
              <SummaryRow label="Buyer" value={buyer.name} />
              
              <div className="my-2 border-t border-border" />
              <SummaryRow label="Subtotal" value={currency(subtotal)} mono />
              <SummaryRow label="Tax" value={currency(tax)} mono />
              <div className="my-2 border-t border-border" />
              <div className="flex items-center justify-between text-base font-semibold">
                <span>Total</span>
                <span className="tabular-nums">{currency(total)}</span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </AppShell>
  );
}

function ReviewCard({ label, title, hint }: { label: string; title: string; hint: string }) {
  return (
    <div className="rounded-lg border border-border bg-surface-muted/40 p-4">
      <div className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className="mt-1 text-sm font-semibold">{title}</div>
      <div className="mt-0.5 text-xs text-muted-foreground">{hint}</div>
    </div>
  );
}

function SummaryRow({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-xs text-muted-foreground">{label}</span>
      <span className={cn("max-w-[60%] truncate text-right text-sm", mono && "tabular-nums")}>{value}</span>
    </div>
  );
}
