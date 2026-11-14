import type { Seg } from "@/lib/mock";

/** 气口可视化：小顿=灰点+窄空；偷气=金钩 ˇ；大气口=朱砂 ‖ + 换行留白；重音=着重号 */
export function BreathMark({ b }: { b: Seg["breath"] }) {
  if (b === "minor") return <span className="mx-1.5 inline-block align-middle text-breath-minor" aria-label="小顿">·</span>;
  if (b === "steal") return <span className="mx-1 inline-block -translate-y-2 align-middle text-base font-bold text-breath-steal" aria-label="偷气">ˇ</span>;
  if (b === "major") return <span className="mx-1.5 inline-block align-middle font-black text-breath-major" aria-label="大气口">‖</span>;
  return <span className="ml-1 text-breath-major">。</span>;
}

export function BreathText({ segs, active, sel, onTap }: { segs: Seg[]; active?: number; sel?: [number, number] | null; onTap?: (i: number) => void }) {
  return (
    <div className="font-serif text-cue">
      {segs.map((s, i) => {
        const inSel = sel && i >= sel[0] && i <= sel[1];
        const past = active !== undefined && i < active;
        const now = active === i;
        return (
          <span key={s.id}>
            <button
              onClick={() => onTap?.(i)}
              className={`rounded-md px-0.5 text-left transition ${now ? "bg-primary text-primary-foreground" : past ? "text-muted-foreground" : ""} ${inSel && !now ? "bg-accent underline decoration-gold decoration-2 underline-offset-8" : ""}`}
            >
              {[...s.text].map((c, j) => (
                <span key={j} className={s.stress?.includes(j) ? "stress font-black" : ""}>{c}</span>
              ))}
            </button>
            <BreathMark b={s.breath} />
            {s.breath === "major" && <span className="block h-4" />}
          </span>
        );
      })}
    </div>
  );
}

/** 节奏条：每段宽度∝时长，颜色=其后气口级别 */
export function RhythmBar({ segs, active }: { segs: Seg[]; active?: number }) {
  const total = segs.reduce((a, s) => a + s.sec, 0);
  return (
    <div className="flex h-3 w-full items-stretch gap-[2px]">
      {segs.map((s, i) => (
        <div key={s.id} className="flex items-stretch" style={{ width: `${(s.sec / total) * 100}%` }}>
          <div className={`flex-1 rounded-sm ${active === i ? "bg-primary" : active !== undefined && i < active ? "bg-foreground/60" : "bg-foreground/15"}`} />
          <div className={`${s.breath === "major" ? "w-1.5 bg-breath-major" : s.breath === "steal" ? "w-1 bg-breath-steal" : "w-0.5 bg-transparent"} rounded-sm`} />
        </div>
      ))}
    </div>
  );
}

export function BreathLegend() {
  return (
    <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
      <span><b className="text-breath-minor">·</b> 小顿</span>
      <span><b className="text-breath-steal">ˇ</b> 偷气</span>
      <span><b className="text-breath-major">‖</b> 大气口</span>
      <span><span className="stress font-serif">重</span> 重音</span>
    </div>
  );
}
