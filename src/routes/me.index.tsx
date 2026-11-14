import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronRight, Check } from "lucide-react";
import { Section, Card, Stat, Progress } from "@/components/app/ui";
import { user, tasks, heat, trend, badges } from "@/lib/mock";

export const Route = createFileRoute("/me/")({
  head: () => ({ meta: [
    { title: "我的 · 练活儿" }, { name: "description", content: "每日任务、打卡日历、练习数据与成就" },
    { property: "og:title", content: "我的 · 练活儿" }, { property: "og:description", content: "练习数据看板" },
  ] }),
  component: Me,
});

function Me() {
  const max = Math.max(...trend), min = Math.min(...trend);
  const pts = trend.map((v, i) => `${(i / (trend.length - 1)) * 300},${70 - ((v - min) / (max - min)) * 60}`).join(" ");
  return (
    <div className="pb-6">
      <div className="ink-panel px-5 pb-6 pt-8">
        <div className="flex items-center gap-4">
          <span className="seal grid h-14 w-14 place-items-center rounded-full font-serif text-2xl font-black">石</span>
          <div><h1 className="font-serif text-2xl font-black">{user.name}</h1><p className="text-xs text-gold">{user.title}</p></div>
        </div>
        <div className="mt-5 grid grid-cols-3">
          <div className="text-center"><div className="font-mono text-3xl font-bold text-gold">{user.streak}</div><div className="text-[11px] opacity-60">连续天数</div></div>
          <div className="text-center"><div className="font-mono text-3xl font-bold">{user.totalReps}</div><div className="text-[11px] opacity-60">总遍数</div></div>
          <div className="text-center"><div className="font-mono text-3xl font-bold">{user.todayMin}′</div><div className="text-[11px] opacity-60">今日时长</div></div>
        </div>
      </div>

      <Section title="每日任务">
        <Card className="space-y-3">
          {tasks.map((t) => (
            <div key={t.t} className="flex items-center gap-3">
              <span className={`grid h-5 w-5 place-items-center rounded-sm border ${t.cur >= t.max ? "seal border-transparent" : ""}`}>{t.cur >= t.max && <Check size={12} />}</span>
              <div className="flex-1"><div className="mb-1 flex justify-between text-sm"><span>{t.t}</span><span className="font-mono text-xs text-muted-foreground">{t.cur}/{t.max}</span></div><Progress v={t.cur} max={t.max} /></div>
            </div>
          ))}
        </Card>
      </Section>

      <Section title="打卡日历" extra={<span className="text-xs text-muted-foreground">近 15 周</span>}>
        <Card>
          <div className="grid grid-flow-col grid-rows-7 gap-[3px]">
            {heat.map((h, i) => <span key={i} className={`aspect-square rounded-[2px] ${["bg-heat-0", "bg-heat-1", "bg-heat-2", "bg-heat-3", "bg-heat-4"][h]}`} />)}
          </div>
          <div className="mt-2 flex items-center justify-end gap-1 text-[10px] text-muted-foreground">少{[0, 1, 2, 3, 4].map((h) => <span key={h} className={`h-2.5 w-2.5 rounded-[2px] ${["bg-heat-0", "bg-heat-1", "bg-heat-2", "bg-heat-3", "bg-heat-4"][h]}`} />)}多</div>
        </Card>
      </Section>

      <Section title="练习趋势" extra={<span className="text-xs text-muted-foreground">每日遍数 · 近两周</span>}>
        <Card>
          <svg viewBox="0 0 300 76" className="h-24 w-full overflow-visible">
            <polyline points={`0,76 ${pts} 300,76`} className="fill-primary/10" />
            <polyline points={pts} fill="none" className="stroke-primary" strokeWidth="2" strokeLinejoin="round" />
          </svg>
          <div className="mt-2 grid grid-cols-3 border-t pt-3"><Stat v="98″" l="报菜名最好" accent /><Stat v="-14%" l="较上周用时" /><Stat v="2.1" l="平均错字" /></div>
        </Card>
      </Section>

      <Section title="成就">
        <div className="grid grid-cols-3 gap-2">
          {badges.map((b) => (
            <div key={b.n} className={`flex flex-col items-center gap-1 rounded-xl border p-3 ${b.got ? "bg-card" : "opacity-40"}`}>
              <span className={`grid h-11 w-11 place-items-center rounded-full font-serif text-sm font-black ${b.got ? "seal" : "border-2 border-dashed"}`}>{b.n.slice(0, 2)}</span>
              <span className="font-serif text-xs font-bold">{b.n}</span><span className="text-[10px] text-muted-foreground">{b.d}</span>
            </div>
          ))}
        </div>
      </Section>

      <div className="px-4"><Link to="/me/recordings" className="flex items-center justify-between rounded-xl border bg-card p-4 shadow-card"><span className="font-serif font-bold">录音档案库</span><span className="flex items-center text-xs text-muted-foreground">128 条<ChevronRight size={16} /></span></Link></div>
    </div>
  );
}
