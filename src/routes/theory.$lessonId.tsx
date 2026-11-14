import { createFileRoute, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader, Empty } from "@/components/app/ui";
import { lessons, lessonCards } from "@/lib/mock";

export const Route = createFileRoute("/theory/$lessonId")({
  loader: ({ params }) => { const l = lessons.find((x) => x.id === params.lessonId); if (!l) throw notFound(); return l; },
  head: ({ loaderData }) => ({ meta: [
    { title: `${loaderData?.title ?? "课程"} · 练活儿` }, { name: "description", content: loaderData?.sub ?? "相声常识" },
    { property: "og:title", content: `${loaderData?.title ?? "课程"} · 练活儿` }, { property: "og:description", content: loaderData?.sub ?? "相声常识" },
  ] }),
  component: Lesson,
});

function Lesson() {
  const l = Route.useLoaderData();
  const cards = lessonCards[l.id] ?? [];
  const [i, setI] = useState(0);
  return (
    <div className="pb-6">
      <PageHeader title={l.title} sub={l.sub} back="/theory" />
      {cards.length === 0 ? <div className="pt-8"><Empty title="课程整理中" hint="这一课的卡片马上就来" /></div> : (
        <div className="px-4 pt-6">
          <div className="mb-3 flex gap-1">{cards.map((_, j) => <span key={j} className={`h-1 flex-1 rounded-full ${j <= i ? "bg-primary" : "bg-muted"}`} />)}</div>
          <div className="relative flex min-h-[380px] flex-col justify-between rounded-2xl border bg-card p-6 shadow-card">
            <span className="vertical absolute right-5 top-6 font-serif text-xs text-muted-foreground">{l.title} · 其{["一", "二", "三", "四", "五", "六"][i]}</span>
            <h2 className="font-serif text-4xl font-black text-primary">{cards[i].h}</h2>
            <p className="font-serif text-xl leading-loose">{cards[i].b}</p>
            <div className="fret" />
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <button disabled={i === 0} onClick={() => setI(i - 1)} className="rounded-xl border bg-card py-3 font-serif disabled:opacity-40">上一张</button>
            <button onClick={() => setI(Math.min(cards.length - 1, i + 1))} className="seal rounded-xl py-3 font-serif">{i === cards.length - 1 ? "学完了" : "下一张"}</button>
          </div>
        </div>
      )}
    </div>
  );
}
