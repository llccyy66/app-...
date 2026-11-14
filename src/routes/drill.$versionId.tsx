import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ChevronLeft, Mic, Pause, Play, Repeat, Square, X, Headphones } from "lucide-react";
import { BreathLegend, BreathText, RhythmBar } from "@/components/app/BreathText";
import { getPiece, getVersion, reps as seedReps } from "@/lib/mock";

export const Route = createFileRoute("/drill/$versionId")({
  loader: ({ params }) => { const v = getVersion(params.versionId); if (!v) throw notFound(); return { v, p: getPiece(v.pieceId)! }; },
  head: ({ loaderData }) => ({ meta: [
    { title: `跟练《${loaderData?.p.title ?? ""}》· 练活儿` }, { name: "description", content: "气口可视化跟练、变速、片段循环与录音" },
    { property: "og:title", content: "跟练 · 练活儿" }, { property: "og:description", content: "气口可视化跟练" },
  ] }),
  component: Drill,
});

const speeds = [0.5, 0.75, 1, 1.25, 1.5];

function Drill() {
  const { v, p } = Route.useLoaderData();
  const segs = v.segs;
  const [playing, setPlaying] = useState(false);
  const [active, setActive] = useState(0);
  const [speed, setSpeed] = useState(1);
  const [sel, setSel] = useState<[number, number] | null>(null);
  const [pick, setPick] = useState<number | null>(null);
  const [loop, setLoop] = useState(false);
  const [rec, setRec] = useState(false);
  const [t, setT] = useState(0);
  const [reps, setReps] = useState(seedReps);
  const [compare, setCompare] = useState<number | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  const lo = sel?.[0] ?? 0, hi = sel?.[1] ?? segs.length - 1;

  useEffect(() => {
    if (!playing) return;
    timer.current = setTimeout(() => {
      if (active >= hi) { if (loop) setActive(lo); else { setPlaying(false); } }
      else setActive(active + 1);
    }, (segs[active].sec * 1000) / speed);
    return () => clearTimeout(timer.current);
  }, [playing, active, speed, loop, lo, hi, segs]);

  useEffect(() => {
    if (!rec) return;
    const id = setInterval(() => setT((x) => x + 0.1), 100);
    return () => clearInterval(id);
  }, [rec]);

  const tap = (i: number) => {
    if (pick === null) { setPick(i); setSel([i, i]); setActive(i); }
    else { setSel([Math.min(pick, i), Math.max(pick, i)]); setPick(null); setLoop(true); setActive(Math.min(pick, i)); }
  };
  const toggleRec = () => {
    if (rec) { setReps((r) => [...r, { n: r.length + 1, sec: Math.round(t), err: Math.max(0, 3 - (r.length % 3)) }]); setRec(false); setPlaying(false); }
    else { setT(0); setRec(true); setActive(lo); setPlaying(true); }
  };
  const best = Math.min(...reps.map((r) => r.sec));

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 flex items-center gap-2 bg-background/90 px-3 py-2 backdrop-blur">
        <Link to="/piece/$pieceId" params={{ pieceId: p.id }} className="grid h-9 w-9 place-items-center rounded-md hover:bg-muted" aria-label="返回"><ChevronLeft /></Link>
        <div className="flex-1">
          <h1 className="font-serif text-base font-bold">《{p.title}》<span className="text-xs font-normal text-muted-foreground">{v.name}</span></h1>
        </div>
        <div className="text-right">
          <div className="font-mono text-lg font-bold leading-none text-primary">第{reps.length + (rec ? 1 : 0)}遍</div>
          <div className="text-[10px] text-muted-foreground">最好 {best}″</div>
        </div>
      </header>
      <div className="px-4 pb-2"><RhythmBar segs={segs} active={active} /></div>

      {sel && (
        <div className="mx-4 mb-1 flex items-center justify-between rounded-lg bg-accent px-3 py-1.5 text-xs">
          <span>{pick !== null ? "再点一段，选定片段终点" : `已框选第 ${lo + 1}–${hi + 1} 段 · ${loop ? "循环中" : "单遍"}`}</span>
          <button onClick={() => { setSel(null); setPick(null); setLoop(false); }} className="flex items-center gap-0.5 text-primary"><X size={12} />清除</button>
        </div>
      )}

      <div className="flex-1 overflow-y-auto px-5 py-4"><BreathText segs={segs} active={active} sel={sel} onTap={tap} /><div className="mt-6"><BreathLegend /></div></div>

      {/* 遍数记录 */}
      <div className="no-scrollbar flex gap-2 overflow-x-auto border-t bg-card/60 px-4 py-2">
        {reps.slice().reverse().map((r) => (
          <button key={r.n} onClick={() => setCompare(r.n)} className={`shrink-0 rounded-lg border px-2.5 py-1 text-center ${r.sec === best ? "border-primary" : ""} bg-card`}>
            <div className="text-[10px] text-muted-foreground">第{r.n}遍</div>
            <div className="font-mono text-sm font-bold">{r.sec}″</div>
          </button>
        ))}
      </div>

      {/* 控制台 */}
      <div className="ink-panel sticky bottom-0 space-y-3 rounded-t-2xl px-4 pb-6 pt-3 shadow-float">
        <div className="flex items-center justify-between gap-1">
          {speeds.map((s) => (
            <button key={s} onClick={() => setSpeed(s)} className={`flex-1 rounded-md py-1 font-mono text-xs ${s === speed ? "bg-gold text-ink" : "text-ink-foreground/60"}`}>{s}x</button>
          ))}
        </div>
        <div className="flex items-center justify-between">
          <button onClick={() => setLoop(!loop)} className={`grid h-11 w-11 place-items-center rounded-full ${loop ? "text-gold" : "text-ink-foreground/50"}`} aria-label="循环"><Repeat size={20} /></button>
          <button onClick={() => setPlaying(!playing)} className="grid h-14 w-14 place-items-center rounded-full bg-ink-foreground text-ink" aria-label="播放原声">{playing ? <Pause /> : <Play fill="currentColor" />}</button>
          <button onClick={toggleRec} className={`seal grid h-16 w-16 place-items-center rounded-full ${rec ? "recording" : ""}`} aria-label="录音">{rec ? <Square fill="currentColor" size={20} /> : <Mic size={24} />}</button>
          <div className="w-14 text-center"><div className="font-mono text-xl font-bold">{t.toFixed(1)}</div><div className="text-[10px] text-ink-foreground/60">秒</div></div>
          <span className="w-0" />
        </div>
        <p className="text-center text-[11px] text-ink-foreground/50">点台词框选片段 · 变速不变调 · 录音即计一遍</p>
      </div>

      {compare !== null && (
        <div className="fixed inset-0 z-30 flex items-end justify-center bg-ink/60" onClick={() => setCompare(null)}>
          <div className="w-full max-w-[430px] rounded-t-2xl bg-card p-5" onClick={(e) => e.stopPropagation()}>
            <h3 className="font-serif text-lg font-bold">第{compare}遍 · 对比原声</h3>
            {[["原声", "bg-foreground/70"], ["我的", "bg-primary"]].map(([l, c]) => (
              <div key={l} className="mt-4">
                <div className="mb-1 flex items-center gap-2 text-xs"><Headphones size={12} />{l}</div>
                <div className="flex h-10 items-center gap-[2px]">{Array.from({ length: 56 }).map((_, i) => <span key={i} className={`flex-1 rounded-full ${c}`} style={{ height: `${20 + Math.abs(Math.sin(i * (l === "我的" ? 0.9 : 0.7))) * 80}%` }} />)}</div>
              </div>
            ))}
            <p className="mt-4 text-xs text-muted-foreground">第 4、9 段气口偏早，"卤什件儿"重音不足。</p>
            <button onClick={() => setCompare(null)} className="seal mt-4 w-full rounded-xl py-3 font-serif tracking-widest">好</button>
          </div>
        </div>
      )}
    </div>
  );
}
