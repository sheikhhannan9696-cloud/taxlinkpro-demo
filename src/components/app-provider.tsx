import { useEffect, useState, type ReactNode } from "react";
import { AppContext } from "@/lib/app-state";
import type { Environment } from "@/lib/mock-data";

const DEFAULT_USER = { name: "Bilal Ahmed", email: "bilal@medicare.pk", workspace: "MediCare Pharmaceuticals" };

export function AppProvider({ children }: { children: ReactNode }) {
  // Deterministic initial state for SSR; hydrate from localStorage in effect.
  const [env, setEnvState] = useState<Environment>("sandbox");
  const [theme, setThemeState] = useState<"light" | "dark">("light");
  const [user, setUser] = useState<{ name: string; email: string; workspace: string } | null>(DEFAULT_USER);

  useEffect(() => {
    const storedTheme = (localStorage.getItem("tlp:theme") as "light" | "dark") || "light";
    const storedEnv = (localStorage.getItem("tlp:env") as Environment) || "sandbox";
    setThemeState(storedTheme);
    // Production is locked in this demo — always force sandbox.
    setEnvState(storedEnv === "production" ? "sandbox" : storedEnv);
    const rawUser = localStorage.getItem("tlp:user");
    if (rawUser) {
      try { setUser(JSON.parse(rawUser)); } catch { setUser(DEFAULT_USER); }
    }
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("tlp:theme", theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem("tlp:env", env);
  }, [env]);

  useEffect(() => {
    if (user) localStorage.setItem("tlp:user", JSON.stringify(user));
    else localStorage.removeItem("tlp:user");
  }, [user]);

  return (
    <AppContext.Provider
      value={{
        env,
        setEnv: setEnvState,
        theme,
        setTheme: setThemeState,
        user,
        setUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
