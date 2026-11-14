import { createFileRoute, Link } from "@tanstack/react-router";
import { BrandHeader, Progress } from "@/components/app/ui";
import { lessons } from "@/lib/mock";

export const Route = createFileRoute("/theory/")({
  head: () => ({ meta: [
    { title: "学理 · 练活儿" }, { name: "description", content: "相声常识小课程：逗捧、说学逗唱、简史、春典、师承" },
    { property: "og:title", content: "学理 · 练活儿" }, { property: "og:description", content: "相声常识卡片课程" },
  ] }),
  component: Theory,
});

function Theory() {
  const done = lessons.reduce((a, l) => a + l.done, 0), all = lessons.reduce((a, l) => a + l.cards, 0);
  return (
    <div className="pb-6">
      <BrandHeader title="学理" sub="知其然 · 知其所以然" mark="理" />
      <div className="mx-4 mb-4 rounded-xl border bg-card p-4 shadow-card">
        <div className="mb-2 flex justify-between text-sm"><span className="font-serif font-bold">已学 {done} / {all} 张卡</span><span className="font-mono text-primary">{Math.round((done / all) * 100)}%</span></div>
        <Progress v={done} max={all} />
      </div>
      <ul className="space-y-3 px-4">
        {lessons.map((l) => (
          <li key={l.id}>
            <Link to="/theory/$lessonId" params={{ lessonId: l.id }} className="flex items-center gap-4 rounded-xl border bg-card p-4 shadow-card">
              <span className={`grid h-14 w-14 shrink-0 place-items-center rounded-sm font-serif text-2xl font-black ${l.done === l.cards ? "seal" : "border-2 border-primary text-primary"}`}>{l.mark}</span>
              <div className="min-w-0 flex-1">
                <h3 className="font-serif text-lg font-bold">{l.title}</h3>
                <p className="truncate text-xs text-muted-foreground">{l.sub}</p>
                <div className="mt-2 flex items-center gap-2"><div className="flex-1"><Progress v={l.done} max={l.cards} /></div><span className="font-mono text-[11px] text-muted-foreground">{l.done}/{l.cards}</span></div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
