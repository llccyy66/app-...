import { Link } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";
import type { ReactNode } from "react";

export function PageHeader({ title, sub, back, right }: { title: string; sub?: string; back?: string; right?: ReactNode }) {
  return (
    <header className="sticky top-0 z-10 flex items-center gap-2 border-b bg-background/90 px-4 py-3 backdrop-blur">
      {back && (
        <Link to={back} className="-ml-1 grid h-8 w-8 place-items-center rounded-md text-foreground hover:bg-muted" aria-label="返回"><ChevronLeft size={20} /></Link>
      )}
      <div className="min-w-0 flex-1">
        <h1 className="truncate font-serif text-lg font-bold tracking-wider">{title}</h1>
        {sub && <p className="truncate text-xs text-muted-foreground">{sub}</p>}
      </div>
      {right}
    </header>
  );
}

export function BrandHeader({ title, sub, mark }: { title: string; sub: string; mark: string }) {
  return (
    <header className="flex items-end justify-between px-5 pb-3 pt-6">
      <div>
        <p className="text-xs tracking-[0.3em] text-muted-foreground">{sub}</p>
        <h1 className="font-serif text-display font-black tracking-wider">{title}</h1>
      </div>
      <span className="seal grid h-11 w-11 place-items-center rounded-sm font-serif text-lg font-black">{mark}</span>
    </header>
  );
}

export function Section({ title, extra, children }: { title: string; extra?: ReactNode; children: ReactNode }) {
  return (
    <section className="px-4 py-3">
      <div className="mb-2 flex items-center justify-between">
        <h2 className="flex items-center gap-2 font-serif text-base font-bold tracking-wider"><span className="h-4 w-1 rounded-full bg-primary" />{title}</h2>
        {extra}
      </div>
      {children}
    </section>
  );
}

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`rounded-xl border bg-card p-4 shadow-card ${className}`}>{children}</div>;
}

export function Empty({ title, hint, action }: { title: string; hint: string; action?: ReactNode }) {
  return (
    <div className="mx-4 flex flex-col items-center gap-2 rounded-xl border border-dashed p-8 text-center">
      <span className="font-serif text-4xl text-muted-foreground/50">空</span>
      <p className="font-serif font-bold">{title}</p>
      <p className="text-xs text-muted-foreground">{hint}</p>
      {action}
    </div>
  );
}

export function Stat({ v, l, accent }: { v: ReactNode; l: string; accent?: boolean }) {
  return (
    <div className="text-center">
      <div className={`font-mono text-2xl font-bold ${accent ? "text-primary" : ""}`}>{v}</div>
      <div className="text-[11px] tracking-widest text-muted-foreground">{l}</div>
    </div>
  );
}

export function Progress({ v, max }: { v: number; max: number }) {
  return <div className="h-1.5 overflow-hidden rounded-full bg-muted"><div className="h-full rounded-full bg-primary" style={{ width: `${Math.min(100, (v / max) * 100)}%` }} /></div>;
}
