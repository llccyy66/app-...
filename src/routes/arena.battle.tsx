import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { BreathText } from "@/components/app/BreathText";
import { getVersion } from "@/lib/mock";

export const Route = createFileRoute("/arena/battle")({
  head: () => ({ meta: [
    { title: "对战中 · 练活儿" }, { name: "description", content: "即时贯口对战" },
    { property: "og:title", content: "对战 · 练活儿" }, { property: "og:description", content: "即时贯口对战" },
  ] }),
  component: Battle,
});

function Battle() {
  const segs = getVersion("bcm-guo")!.segs;
  const [phase, setPhase] = useState<"match" | "go" | "done">("match");
  const [a, setA] = useState(0);
  useEffect(() => {
    if (phase === "match") { const t = setTimeout(() => setPhase("go"), 1500); return () => clearTimeout(t); }
    if (phase === "go") { const t = setTimeout(() => a >= segs.length - 1 ? setPhase("done") : setA(a + 1), 1100); return () => clearTimeout(t); }
  }, [phase, a, segs.length]);
  const P = ({ n, s, me }: { n: string; s: number; me?: boolean }) => (
    <div className={`flex-1 rounded-xl p-3 ${me ? "seal" : "bg-ink-foreground/10"}`}><div className="font-serif text-sm font-bold">{n}</div><div className="font-mono text-2xl font-bold">{s}</div></div>
  );
  return (
    <div className="flex min-h-screen flex-col">
      <div className="ink-panel px-4 pb-4 pt-3">
        <div className="mb-3 flex items-center justify-between"><Link to="/arena" aria-label="退出"><X /></Link><span className="font-serif tracking-widest text-gold">《报菜名》擂台</span><span className="w-6" /></div>
        <div className="flex items-center gap-3"><P n="小石头" s={phase === "done" ? 92 : a * 15} me /><span className="font-serif text-xl font-black text-gold">VS</span><P n="津门小柳" s={phase === "done" ? 87 : a * 14} /></div>
      </div>
      {phase === "match" && <div className="grid flex-1 place-items-center font-serif text-xl tracking-widest text-muted-foreground">正在寻找对手……</div>}
      {phase === "go" && <div className="flex-1 px-5 py-6"><BreathText segs={segs} active={a} /></div>}
      {phase === "done" && (
        <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
          <span className="seal grid h-24 w-24 place-items-center rounded-sm font-serif text-5xl font-black">胜</span>
          <div className="grid w-full grid-cols-3 gap-2 rounded-xl border bg-card p-4">
            {[["错字", "1 vs 3"], ["用时", "13.8″ vs 14.6″"], ["气口", "稳 vs 稳"]].map(([l, v]) => <div key={l}><div className="text-[11px] text-muted-foreground">{l}</div><div className="font-mono text-sm font-bold">{v}</div></div>)}
          </div>
          <Link to="/arena" className="seal w-full rounded-xl py-3 font-serif tracking-widest">再来一擂</Link>
        </div>
      )}
    </div>
  );
}
