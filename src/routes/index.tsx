import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Flame, Play } from "lucide-react";
import { BrandHeader, Section, Empty } from "@/components/app/ui";
import { categories, pieces, user, getVersion } from "@/lib/mock";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "曲目库 · 练活儿" }, { name: "description", content: "贯口、绕口令、太平歌词、定场诗曲目库，按气口跟练。" },
    { property: "og:title", content: "曲目库 · 练活儿" }, { property: "og:description", content: "相声基本功每日跟练" },
  ] }),
  component: Index,
});

function Index() {
  const [cat, setCat] = useState("贯口");
  const list = pieces.filter((p) => p.category === cat);
  const cont = getVersion("bcm-ma")!;
  return (
    <div className="pb-4">
      <BrandHeader title="练活儿" sub="拳不离手 · 曲不离口" mark="练" />

      <div className="px-4">
        <Link to="/drill/$versionId" params={{ versionId: cont.id }} className="ink-panel relative block overflow-hidden rounded-2xl p-5 shadow-card">
          <span className="vertical absolute right-3 top-3 font-serif text-xs text-gold/70">今日功课</span>
          <div className="flex items-center gap-2 text-xs text-gold"><Flame size={14} /> 连续打卡 <b className="font-mono text-base">{user.streak}</b> 天</div>
          <p className="mt-3 font-serif text-2xl font-black tracking-wider">接着练《报菜名》</p>
          <p className="mt-1 text-xs opacity-70">{cont.name} · 今日已练 6 遍 · 最好 98″</p>
          <div className="mt-4 flex items-center gap-3">
            <span className="seal grid h-11 w-11 place-items-center rounded-full"><Play size={18} fill="currentColor" /></span>
            <div className="flex flex-1 gap-1">{Array.from({ length: 10 }).map((_, i) => <span key={i} className={`h-2 flex-1 rounded-sm ${i < 6 ? "bg-primary" : "bg-ink-foreground/15"}`} />)}</div>
            <span className="font-mono text-sm">6/10</span>
          </div>
        </Link>
      </div>

      <div className="no-scrollbar sticky top-0 z-10 mt-4 flex gap-2 overflow-x-auto bg-background/90 px-4 py-2 backdrop-blur">
        {categories.map((c) => (
          <button key={c} onClick={() => setCat(c)} className={`shrink-0 rounded-full border px-4 py-1.5 font-serif text-sm tracking-wider transition ${c === cat ? "border-foreground bg-foreground text-background" : "bg-card text-muted-foreground"}`}>{c}</button>
        ))}
      </div>

      <Section title={`${cat} · ${list.length} 段`}>
        {list.length === 0 ? <Empty title="这一门还没有曲目" hint="可以在曲目详情里新建自己的整理版" /> : (
          <ul className="space-y-3">
            {list.map((p, i) => (
              <li key={p.id}>
                <Link to="/piece/$pieceId" params={{ pieceId: p.id }} className="flex items-stretch gap-3 rounded-xl border bg-card p-3 shadow-card">
                  <div className="grid w-12 shrink-0 place-items-center rounded-lg bg-secondary font-serif text-2xl font-black text-primary">{p.title[0]}</div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-serif text-lg font-bold">{p.title}</h3>
                      <span className="text-gold">{"★".repeat(p.level)}<span className="text-muted">{"★".repeat(3 - p.level)}</span></span>
                    </div>
                    <p className="truncate text-xs text-muted-foreground">{p.desc}</p>
                    <p className="mt-1 text-[11px] text-muted-foreground">{p.versions.length} 个版本{p.best ? ` · 最好 ${p.best}″` : ""}</p>
                  </div>
                  <div className="flex flex-col items-end justify-center">
                    <span className={`font-mono text-xl font-bold ${p.todayReps ? "text-primary" : "text-muted-foreground/40"}`}>{p.todayReps}</span>
                    <span className="text-[10px] text-muted-foreground">今日遍</span>
                  </div>
                  <span className="sr-only">{i}</span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </Section>
    </div>
  );
}
