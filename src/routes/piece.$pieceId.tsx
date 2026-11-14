import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { Pencil, Plus, Play } from "lucide-react";
import { PageHeader, Section, Card, Empty, Stat } from "@/components/app/ui";
import { BreathLegend, BreathText, RhythmBar } from "@/components/app/BreathText";
import { getPiece, getVersion } from "@/lib/mock";

export const Route = createFileRoute("/piece/$pieceId")({
  loader: ({ params }) => { const p = getPiece(params.pieceId); if (!p) throw notFound(); return p; },
  head: ({ loaderData }) => ({ meta: [
    { title: `${loaderData?.title ?? "曲目"} · 练活儿` }, { name: "description", content: loaderData?.desc ?? "曲目详情" },
    { property: "og:title", content: `${loaderData?.title ?? "曲目"} · 练活儿` }, { property: "og:description", content: loaderData?.desc ?? "曲目详情" },
  ] }),
  component: PieceDetail,
});

function PieceDetail() {
  const p = Route.useLoaderData();
  const vs = p.versions.map((id) => getVersion(id)!);
  const [vid, setVid] = useState(vs[0]?.id);
  const v = vs.find((x) => x.id === vid);
  return (
    <div className="pb-6">
      <PageHeader title={`《${p.title}》`} sub={`${p.category} · ${p.desc}`} back="/" />
      <Section title="版本" extra={<button className="flex items-center gap-1 text-xs text-primary"><Plus size={14} />新建版本</button>}>
        {vs.length === 0 ? <Empty title="还没有版本" hint="上传原声或粘贴台词，切好气口就能练" /> : (
          <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4">
            {vs.map((x) => (
              <button key={x.id} onClick={() => setVid(x.id)} className={`shrink-0 rounded-xl border px-4 py-2.5 text-left transition ${x.id === vid ? "seal border-transparent" : "bg-card"}`}>
                <div className="font-serif font-bold">{x.name}</div>
                <div className="text-[11px] opacity-75">{x.segs.length} 段气口 · {x.duration}</div>
              </button>
            ))}
          </div>
        )}
      </Section>
      {v && (
        <>
          <div className="px-4"><Card className="grid grid-cols-3"><Stat v={p.todayReps} l="今日遍数" accent /><Stat v={`${p.best ?? "—"}″`} l="最好用时" /><Stat v={v.segs.length} l="气口段" /></Card></div>
          <Section title="台词预览" extra={v.mine && <Link to="/edit/$versionId" params={{ versionId: v.id }} className="flex items-center gap-1 text-xs text-primary"><Pencil size={13} />编辑气口</Link>}>
            <Card>
              <RhythmBar segs={v.segs} />
              <div className="mt-4 max-h-72 overflow-hidden [mask-image:linear-gradient(to_bottom,black_70%,transparent)]"><BreathText segs={v.segs} /></div>
              <div className="fret my-3" />
              <BreathLegend />
            </Card>
          </Section>
          <div className="sticky bottom-[68px] px-4 pt-2">
            <Link to="/drill/$versionId" params={{ versionId: v.id }} className="seal flex items-center justify-center gap-2 rounded-xl py-3.5 font-serif text-lg font-bold tracking-[0.3em]"><Play size={18} fill="currentColor" />开练</Link>
          </div>
        </>
      )}
    </div>
  );
}
