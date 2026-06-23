import { Link, useNavigate } from "@tanstack/react-router";
import { Bell, Search, Plus, Sun, Moon, Menu, ChevronDown, LogOut, Settings as SettingsIcon, User, Lock } from "lucide-react";
import { toast } from "sonner";
import { useApp } from "@/lib/app-state";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

export function AppTopbar({ onOpenMobileNav }: { onOpenMobileNav: () => void }) {
  const { env, setEnv, theme, setTheme, user, setUser } = useApp();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-border bg-surface/80 px-4 backdrop-blur lg:px-6">
      <Button variant="ghost" size="icon" className="lg:hidden" onClick={onOpenMobileNav}>
        <Menu className="h-5 w-5" />
      </Button>

      <div className="flex items-center gap-2">
        <div className="hidden text-sm font-medium md:block">{user?.workspace}</div>
        <span className="hidden text-muted-foreground md:block">/</span>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              className={cn(
                "inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-xs font-medium transition-colors",
                env === "production"
                  ? "border-success/30 bg-success/10 text-success"
                  : "border-warning/30 bg-warning/10 text-warning-foreground",
              )}
            >
              <span className={cn("h-1.5 w-1.5 rounded-full", env === "production" ? "bg-success" : "bg-warning")} />
              {env === "production" ? "Production" : "Sandbox"}
              <ChevronDown className="h-3 w-3 opacity-60" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56">
            <DropdownMenuLabel>Switch environment</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setEnv("sandbox")}>
              <span className="mr-2 h-1.5 w-1.5 rounded-full bg-warning" />
              Sandbox
              <span className="ml-auto text-xs text-muted-foreground">testing</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setEnv("production")}>
              <span className="mr-2 h-1.5 w-1.5 rounded-full bg-success" />
              Production
              <span className="ml-auto text-xs text-muted-foreground">live</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="relative ml-auto hidden max-w-sm flex-1 md:block">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search invoices, buyers, products…"
          className="h-9 bg-surface-muted pl-9 text-sm"
        />
        <kbd className="pointer-events-none absolute right-2 top-1/2 hidden -translate-y-1/2 rounded border border-border bg-background px-1.5 py-0.5 text-[10px] text-muted-foreground md:inline-block">
          ⌘K
        </kbd>
      </div>

      <Button asChild size="sm" className="ml-auto md:ml-0">
        <Link to="/invoices/new">
          <Plus className="h-4 w-4" /> <span className="hidden sm:inline">New Invoice</span>
        </Link>
      </Button>

      <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
        {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
      </Button>

      <Button variant="ghost" size="icon" className="relative">
        <Bell className="h-4 w-4" />
        <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-destructive" />
      </Button>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary transition hover:bg-primary/15">
            {user?.name.split(" ").map((n) => n[0]).join("") ?? "U"}
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>
            <div className="text-sm font-medium">{user?.name}</div>
            <div className="text-xs font-normal text-muted-foreground">{user?.email}</div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem><User className="h-4 w-4" /> Profile</DropdownMenuItem>
          <DropdownMenuItem onClick={() => navigate({ to: "/settings" })}>
            <SettingsIcon className="h-4 w-4" /> Settings
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => {
              setUser(null);
              navigate({ to: "/login" });
            }}
            className="text-destructive focus:text-destructive"
          >
            <LogOut className="h-4 w-4" /> Sign out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
