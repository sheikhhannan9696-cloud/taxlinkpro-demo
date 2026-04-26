import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { ArrowLeft, Download, Send, FileJson, Printer, MoreHorizontal, Building2, User, Hash, Calendar, FileText } from "lucide-react";
import { AppShell, PageHeader } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { StatusBadge, EnvBadge } from "@/components/ui-kit";
import { invoices, currency, businessProfiles } from "@/lib/mock-data";

export const Route = createFileRoute("/invoices/$invoiceId")({
  head: ({ params }) => ({ meta: [{ title: `${params.invoiceId} — TaxLink Pro` }] }),
  component: InvoiceDetailPage,
  notFoundComponent: () => (
    <AppShell>
      <div className="rounded-xl border border-border bg-card p-8 text-center">
        <div className="text-sm font-semibold">Invoice not found</div>
        <Button asChild variant="outline" size="sm" className="mt-3"><Link to="/invoices">Back to Invoices</Link></Button>
      </div>
    </AppShell>
  ),
});

function InvoiceDetailPage() {
  const { invoiceId } = useParams({ from: "/invoices/$invoiceId" });
  const inv = invoices.find((i) => i.id === invoiceId) ?? invoices[0];
  const profile = businessProfiles[0];

  const lineItems = Array.from({ length: inv.items }).map((_, i) => ({
    id: i + 1,
    desc: ["Portland Cement (50kg bag)", "Mild Steel Rebar #4", "Polyester Fabric"][i % 3],
    code: ["P-1001", "P-1002", "P-1008"][i % 3],
    hs: ["2523.2900", "7214.2000", "5407.5200"][i % 3],
    uom: ["Bag", "Tonne", "Meter"][i % 3],
    qty: [50, 2, 120][i % 3],
    rate: [1450, 285000, 380][i % 3],
    tax: 17,
  }));
  const subtotal = lineItems.reduce((s, l) => s + l.qty * l.rate, 0);
  const tax = Math.round(subtotal * 0.17);

  const json = {
    invoiceType: "Sale Invoice",
    invoiceRefNo: inv.id,
    invoiceDate: inv.date,
    sellerNTNCNIC: profile.ntn,
    sellerBusinessName: profile.name,
    sellerProvince: profile.province,
    sellerAddress: profile.address,
    buyerNTNCNIC: "1234567-8",
    buyerBusinessName: inv.buyer,
    buyerProvince: "Sindh",
    saleType: inv.saleType,
    items: lineItems.map((l) => ({
      hsCode: l.hs,
      productDescription: l.desc,
      rate: `${l.tax}%`,
      uoM: l.uom,
      quantity: l.qty,
      valueSalesExcludingST: l.qty * l.rate,
      salesTaxApplicable: Math.round(l.qty * l.rate * 0.17),
    })),
  };

  return (
    <AppShell>
      <PageHeader
        breadcrumb={<Link to="/invoices" className="inline-flex items-center gap-1 hover:text-foreground"><ArrowLeft className="h-3 w-3" /> Invoices</Link>}
        title={inv.id}
        description={`${inv.buyer} · ${inv.date} · ${inv.saleType}`}
        actions={
          <div className="flex items-center gap-2">
            <EnvBadge env={inv.env} />
            <StatusBadge status={inv.status} />
            <Button variant="outline" size="sm"><Printer className="h-4 w-4" /> Print</Button>
            <Button variant="outline" size="sm"><Download className="h-4 w-4" /> PDF</Button>
            {inv.status !== "submitted" && <Button size="sm"><Send className="h-4 w-4" /> Submit to FBR</Button>}
          </div>
        }
      />

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          {/* Parties */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-border bg-card p-5 shadow-card">
              <div className="mb-3 flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted-foreground"><Building2 className="h-3.5 w-3.5" /> Seller</div>
              <div className="text-sm font-semibold">{profile.name}</div>
              <div className="mt-1 text-xs text-muted-foreground">{profile.address}</div>
              <div className="mt-3 grid grid-cols-2 gap-3 text-xs">
                <div><div className="text-muted-foreground">NTN</div><div className="font-medium tabular-nums">{profile.ntn}</div></div>
                <div><div className="text-muted-foreground">STRN</div><div className="font-medium tabular-nums">{profile.strn}</div></div>
              </div>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 shadow-card">
              <div className="mb-3 flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted-foreground"><User className="h-3.5 w-3.5" /> Buyer</div>
              <div className="text-sm font-semibold">{inv.buyer}</div>
              <div className="mt-1 text-xs text-muted-foreground">Karachi, Sindh</div>
              <div className="mt-3 grid grid-cols-2 gap-3 text-xs">
                <div><div className="text-muted-foreground">Code</div><div className="font-medium">{inv.buyerCode}</div></div>
                <div><div className="text-muted-foreground">Type</div><div className="font-medium">Registered</div></div>
              </div>
            </div>
          </div>

          <Tabs defaultValue="items">
            <TabsList>
              <TabsTrigger value="items">Line items</TabsTrigger>
              <TabsTrigger value="json">JSON</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
            </TabsList>

            <TabsContent value="items">
              <div className="rounded-xl border border-border bg-card shadow-card">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-10">#</TableHead>
                        <TableHead>Product</TableHead>
                        <TableHead>HS Code</TableHead>
                        <TableHead>UOM</TableHead>
                        <TableHead className="text-right">Qty</TableHead>
                        <TableHead className="text-right">Rate</TableHead>
                        <TableHead className="text-right">Tax</TableHead>
                        <TableHead className="text-right">Total</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {lineItems.map((l) => (
                        <TableRow key={l.id}>
                          <TableCell className="text-muted-foreground tabular-nums">{l.id}</TableCell>
                          <TableCell>
                            <div className="font-medium">{l.desc}</div>
                            <div className="text-xs text-muted-foreground">{l.code}</div>
                          </TableCell>
                          <TableCell className="tabular-nums text-muted-foreground">{l.hs}</TableCell>
                          <TableCell>{l.uom}</TableCell>
                          <TableCell className="text-right tabular-nums">{l.qty}</TableCell>
                          <TableCell className="text-right tabular-nums">{currency(l.rate)}</TableCell>
                          <TableCell className="text-right tabular-nums">{l.tax}%</TableCell>
                          <TableCell className="text-right tabular-nums font-medium">{currency(l.qty * l.rate)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                <div className="border-t border-border p-4">
                  <div className="ml-auto w-full max-w-xs space-y-1.5 text-sm">
                    <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span className="tabular-nums">{currency(subtotal)}</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Sales tax (17%)</span><span className="tabular-nums">{currency(tax)}</span></div>
                    <div className="flex justify-between border-t border-border pt-1.5 font-semibold"><span>Total</span><span className="tabular-nums">{currency(subtotal + tax)}</span></div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="json">
              <div className="overflow-hidden rounded-xl border border-border bg-sidebar shadow-card">
                <div className="flex items-center justify-between border-b border-sidebar-border px-4 py-2 text-xs text-sidebar-foreground/70">
                  <span className="inline-flex items-center gap-2"><FileJson className="h-3.5 w-3.5" /> invoice.json</span>
                  <Button variant="ghost" size="sm" className="h-7 text-xs text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">Copy</Button>
                </div>
                <pre className="max-h-[480px] overflow-auto p-4 text-xs leading-relaxed text-sidebar-foreground"><code>{JSON.stringify(json, null, 2)}</code></pre>
              </div>
            </TabsContent>

            <TabsContent value="activity">
              <div className="rounded-xl border border-border bg-card p-5 shadow-card">
                <ol className="relative space-y-4 border-l border-border pl-5">
                  {[
                    { t: "Submitted to FBR", d: "Apr 25, 2025 · 14:32", who: "Ayesha Khan", color: "bg-success" },
                    { t: "PDF generated", d: "Apr 25, 2025 · 14:31", who: "System", color: "bg-info" },
                    { t: "JSON validated", d: "Apr 25, 2025 · 14:30", who: "System", color: "bg-info" },
                    { t: "Invoice created", d: "Apr 25, 2025 · 14:25", who: "Ayesha Khan", color: "bg-primary" },
                  ].map((e, i) => (
                    <li key={i}>
                      <span className={`absolute -left-[7px] mt-1 h-3 w-3 rounded-full ring-4 ring-card ${e.color}`} />
                      <div className="text-sm font-medium">{e.t}</div>
                      <div className="text-xs text-muted-foreground">{e.d} · {e.who}</div>
                    </li>
                  ))}
                </ol>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Side */}
        <div className="space-y-4">
          <div className="rounded-xl border border-border bg-card p-5 shadow-card">
            <div className="mb-3 text-sm font-semibold">Invoice meta</div>
            <dl className="space-y-2.5 text-sm">
              <div className="flex justify-between"><dt className="text-muted-foreground inline-flex items-center gap-1.5"><Hash className="h-3 w-3" /> Reference</dt><dd className="font-medium tabular-nums">{inv.ref}</dd></div>
              <div className="flex justify-between"><dt className="text-muted-foreground inline-flex items-center gap-1.5"><Calendar className="h-3 w-3" /> Date</dt><dd className="font-medium">{inv.date}</dd></div>
              <div className="flex justify-between"><dt className="text-muted-foreground inline-flex items-center gap-1.5"><FileText className="h-3 w-3" /> PO Number</dt><dd className="font-medium">{inv.poNumber ?? "—"}</dd></div>
              <div className="flex justify-between"><dt className="text-muted-foreground">Sale type</dt><dd className="font-medium">{inv.saleType}</dd></div>
              {inv.scenario && (<div className="flex justify-between"><dt className="text-muted-foreground">Scenario</dt><dd className="font-medium">{inv.scenario}</dd></div>)}
            </dl>
          </div>

          <div className="rounded-xl border border-border bg-card p-5 shadow-card">
            <div className="mb-3 text-sm font-semibold">Totals</div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span className="tabular-nums">{currency(subtotal)}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Tax</span><span className="tabular-nums">{currency(tax)}</span></div>
              <div className="flex justify-between border-t border-border pt-2 text-base font-semibold"><span>Total</span><span className="tabular-nums">{currency(subtotal + tax)}</span></div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
