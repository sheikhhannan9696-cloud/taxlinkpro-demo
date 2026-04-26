import { useEffect, useState, type ReactNode } from "react";
import { AppContext } from "@/lib/app-state";
import type { Environment } from "@/lib/mock-data";

export function AppProvider({ children }: { children: ReactNode }) {
  const [env, setEnvState] = useState<Environment>(() => {
    if (typeof window === "undefined") return "sandbox";
    return (localStorage.getItem("tlp:env") as Environment) || "sandbox";
  });
  const [theme, setThemeState] = useState<"light" | "dark">(() => {
    if (typeof window === "undefined") return "light";
    return (localStorage.getItem("tlp:theme") as "light" | "dark") || "light";
  });
  const [user, setUser] = useState<{ name: string; email: string; workspace: string } | null>(() => {
    if (typeof window === "undefined") return null;
    const raw = localStorage.getItem("tlp:user");
    return raw ? JSON.parse(raw) : { name: "Ayesha Khan", email: "ayesha@acme.pk", workspace: "Acme Trading" };
  });

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
