// Tiny app-wide state for environment + theme using React context.
import { createContext, useContext } from "react";
import type { Environment } from "./mock-data";

export type AppState = {
  env: Environment;
  setEnv: (e: Environment) => void;
  theme: "light" | "dark";
  setTheme: (t: "light" | "dark") => void;
  user: { name: string; email: string; workspace: string } | null;
  setUser: (u: AppState["user"]) => void;
};

export const AppContext = createContext<AppState | null>(null);

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used inside AppProvider");
  return ctx;
}
