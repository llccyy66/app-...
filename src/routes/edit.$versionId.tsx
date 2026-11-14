import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader, Section } from "@/components/app/ui";
import { BreathMark, BreathLegend } from "@/components/app/BreathText";
import { getVersion, type Breath } from "@/lib/mock";

export const Route = createFileRoute("/edit/$versionId")({
  loader: ({ params }) => { const v = getVersion(params.versionId); if (!v) throw notFound(); return v; },
  head: () => ({ meta: [
    { title: "编辑气口 · 练活儿" }, { name: "description", content: "整理自己的版本，标注气口与重音" },
    { property: "og:title", content: "编辑气口 · 练活儿" }, { property: "og:description", content: "标注气口与重音" },
  ] }),
  component: Edit,
});

const order: Breath[] = ["minor", "steal", "major", "end"];
const names: Record<Breath, string> = { minor: "小顿", steal: "偷气", major: "大气口", end: "收" };

function Edit() {
  const v = Route.useLoaderData();
  const [segs, setSegs] = useState(v.segs);
  const cycle = (i: number) => setSegs((s) => s.map((x, j) => j === i ? { ...x, breath: order[(order.indexOf(x.breath) + 1) % 4] } : x));
  return (
    <div className="pb-8">
      <PageHeader title={`编辑 · ${v.name}`} sub="点气口符号切换级别" back="/piece/baocaiming" right={<Link to="/piece/$pieceId" params={{ pieceId: v.pieceId }} className="seal rounded-md px-3 py-1.5 text-sm">保存</Link>} />
      <Section title="气口段"><BreathLegend /></Section>
      <ol className="space-y-2 px-4">
        {segs.map((s, i) => (
          <li key={s.id} className="flex items-center gap-2 rounded-xl border bg-card p-3 shadow-card">
            <span className="w-5 font-mono text-xs text-muted-foreground">{i + 1}</span>
            <input defaultValue={s.text} className="min-w-0 flex-1 bg-transparent font-serif text-lg outline-none" />
            <button onClick={() => cycle(i)} className="flex items-center rounded-md border bg-secondary px-2 py-1 text-xs"><BreathMark b={s.breath} />{names[s.breath]}</button>
          </li>
        ))}
      </ol>
      <div className="px-4 pt-3"><button className="w-full rounded-xl border border-dashed py-3 text-sm text-muted-foreground">+ 添加一段</button></div>
    </div>
  );
}
