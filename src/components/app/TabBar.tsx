import { Link, useRouterState } from "@tanstack/react-router";
import { BookOpen, Mic2, Swords, User } from "lucide-react";

const tabs = [
  { to: "/", label: "练活", icon: Mic2, match: (p: string) => p === "/" || p.startsWith("/piece") },
  { to: "/theory", label: "学理", icon: BookOpen, match: (p: string) => p.startsWith("/theory") },
  { to: "/arena", label: "擂台", icon: Swords, match: (p: string) => p.startsWith("/arena") },
  { to: "/me", label: "我的", icon: User, match: (p: string) => p.startsWith("/me") },
] as const;

export function TabBar() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  if (path.startsWith("/drill") || path.startsWith("/edit") || path.startsWith("/arena/battle")) return null;
  return (
    <nav className="sticky bottom-0 z-20 grid grid-cols-4 border-t bg-card/95 pb-[env(safe-area-inset-bottom)] shadow-float backdrop-blur">
      {tabs.map(({ to, label, icon: Icon, match }) => {
        const on = match(path);
        return (
          <Link key={to} to={to} className={`flex flex-col items-center gap-0.5 py-2.5 text-[11px] font-serif tracking-widest ${on ? "text-primary" : "text-muted-foreground"}`}>
            <span className={`grid h-7 w-7 place-items-center rounded-md transition ${on ? "seal" : ""}`}><Icon size={16} /></span>
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
