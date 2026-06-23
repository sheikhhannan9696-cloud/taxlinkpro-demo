import { Outlet, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { AppProvider } from "@/components/app-provider";
import { Toaster } from "@/components/ui/sonner";
import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "TaxLink Pro — FBR e-Invoicing ERP" },
      { name: "description", content: "Enterprise tax invoicing platform: create, validate, and submit invoices to FBR with sandbox-to-production readiness." },
      { property: "og:title", content: "TaxLink Pro — FBR e-Invoicing ERP" },
      { name: "twitter:title", content: "TaxLink Pro — FBR e-Invoicing ERP" },
      { property: "og:description", content: "Enterprise tax invoicing platform: create, validate, and submit invoices to FBR with sandbox-to-production readiness." },
      { name: "twitter:description", content: "Enterprise tax invoicing platform: create, validate, and submit invoices to FBR with sandbox-to-production readiness." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/920878bb-f383-487f-bc02-6e28f2eb87b1/id-preview-92fbbc95--110e2217-177a-4577-b207-49726ca2d36d.lovable.app-1777242508398.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/920878bb-f383-487f-bc02-6e28f2eb87b1/id-preview-92fbbc95--110e2217-177a-4577-b207-49726ca2d36d.lovable.app-1777242508398.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return (
    <AppProvider>
      <Outlet />
      <Toaster />
    </AppProvider>
  );
}
