import { Link, useLocation } from "@tanstack/react-router";
import {
  LayoutDashboard,
  FileText,
  FilePlus2,
  FileClock,
  Users,
  Package,
  Building2,
  BarChart3,
  Download,
  Settings,
  ShieldCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";

type NavItem = { to: string; label: string; icon: typeof LayoutDashboard; badge?: string };

const operational: NavItem[] = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/invoices", label: "Invoices", icon: FileText },
  { to: "/invoices/new", label: "Create Invoice", icon: FilePlus2 },
  { to: "/drafts", label: "Drafts", icon: FileClock, badge: "24" },
];

const masterData: NavItem[] = [
  { to: "/buyers", label: "Buyers", icon: Users },
  { to: "/products", label: "Products", icon: Package },
  { to: "/business-profiles", label: "Business Profiles", icon: Building2 },
];

const insights: NavItem[] = [
  { to: "/reports", label: "Reports & Analytics", icon: BarChart3 },
  { to: "/downloads", label: "Download Center", icon: Download },
];

const system: NavItem[] = [
  { to: "/settings", label: "Settings", icon: Settings },
];

function NavGroup({ title, items, pathname }: { title: string; items: NavItem[]; pathname: string }) {
  return (
    <div className="px-3">
      <div className="px-3 pb-2 pt-4 text-[11px] font-medium uppercase tracking-wider text-sidebar-foreground/50">
        {title}
      </div>
      <nav className="flex flex-col gap-0.5">
        {items.map((item) => {
          const active = pathname === item.to || (item.to !== "/dashboard" && pathname.startsWith(item.to));
          const Icon = item.icon;
          return (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                "group flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                active
                  ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-sm"
                  : "text-sidebar-foreground/80 hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground",
              )}
            >
              <Icon className={cn("h-4 w-4 shrink-0", active && "text-sidebar-primary")} />
              <span className="flex-1 truncate">{item.label}</span>
              {item.badge && (
                <span
                  className={cn(
                    "rounded-full px-1.5 py-0.5 text-[10px] font-medium tabular-nums",
                    active
                      ? "bg-sidebar-primary/20 text-sidebar-primary"
                      : "bg-sidebar-accent text-sidebar-foreground/70",
                  )}
                >
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}

export function AppSidebar({ onNavigate }: { onNavigate?: () => void }) {
  const location = useLocation();
  return (
    <aside className="flex h-full w-64 shrink-0 flex-col bg-sidebar text-sidebar-foreground" onClick={onNavigate}>
      <div className="flex items-center gap-2.5 border-b border-sidebar-border px-5 py-4">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-sidebar-primary to-primary shadow-glow">
          <ShieldCheck className="h-5 w-5 text-sidebar-primary-foreground" />
        </div>
        <div className="leading-tight">
          <div className="text-sm font-semibold text-sidebar-accent-foreground">TaxLink Pro</div>
          <div className="text-[11px] text-sidebar-foreground/60">FBR e-Invoicing</div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto py-2">
        <NavGroup title="Operations" items={operational} pathname={location.pathname} />
        <NavGroup title="Master Data" items={masterData} pathname={location.pathname} />
        <NavGroup title="Insights" items={insights} pathname={location.pathname} />
        <NavGroup title="System" items={system} pathname={location.pathname} />
      </div>

    </aside>
  );
}
