import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Swords, Flame } from "lucide-react";
import { BrandHeader, Section } from "@/components/app/ui";
import { leaderboard } from "@/lib/mock";

export const Route = createFileRoute("/arena/")({
  head: () => ({ meta: [
    { title: "擂台 · 练活儿" }, { name: "description", content: "同段贯口即时对战，勤奋榜看谁更下功夫" },
    { property: "og:title", content: "擂台 · 练活儿" }, { property: "og:description", content: "贯口对战与勤奋榜" },
  ] }),
  component: Arena,
});

function Arena() {
  const [by, setBy] = useState<"streak" | "reps">("streak");
  const list = [...leaderboard].sort((a, b) => b[by] - a[by]);
  return (
    <div className="pb-6">
      <BrandHeader title="擂台" sub="以活会友 · 以功服人" mark="擂" />
      <div className="px-4">
        <div className="ink-panel overflow-hidden rounded-2xl p-5 shadow-card">
          <p className="text-xs tracking-widest text-gold">即时对战</p>
          <p className="mt-1 font-serif text-2xl font-black">同一段《报菜名》</p>
          <p className="text-xs opacity-70">错得少 · 说得快 · 气口稳，三项合分定胜负</p>
          <div className="mt-4 flex items-center justify-between"><span className="font-mono text-sm text-gold">在线 1,284 人</span>
            <Link to="/arena/battle" className="seal flex items-center gap-2 rounded-full px-5 py-2.5 font-serif font-bold tracking-widest"><Swords size={16} />打擂</Link>
          </div>
        </div>
      </div>
      <Section title="勤奋榜" extra={
        <div className="flex rounded-full border bg-card p-0.5 text-xs">
          {([["streak", "打卡天数"], ["reps", "总遍数"]] as const).map(([k, l]) => <button key={k} onClick={() => setBy(k)} className={`rounded-full px-3 py-1 ${by === k ? "bg-foreground text-background" : "text-muted-foreground"}`}>{l}</button>)}
        </div>}>
        <ol className="space-y-2">
          {list.map((u, i) => (
            <li key={u.name} className={`flex items-center gap-3 rounded-xl border p-3 ${u.me ? "border-primary bg-accent" : "bg-card"}`}>
              <span className={`grid h-8 w-8 place-items-center rounded-sm font-serif font-black ${i < 3 ? "seal" : "bg-muted text-muted-foreground"}`}>{["状", "榜", "探"][i] ?? i + 1}</span>
              <span className="flex-1 font-serif font-bold">{u.name}{u.me && <span className="ml-1 text-xs text-primary">（我）</span>}</span>
              <span className="flex items-center gap-1 font-mono font-bold">{by === "streak" && <Flame size={14} className="text-primary" />}{u[by].toLocaleString()}<span className="text-[10px] font-normal text-muted-foreground">{by === "streak" ? "天" : "遍"}</span></span>
            </li>
          ))}
        </ol>
      </Section>
    </div>
  );
}
