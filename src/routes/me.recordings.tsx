import { createFileRoute } from "@tanstack/react-router";
import { Play } from "lucide-react";
import { PageHeader } from "@/components/app/ui";
import { recordings } from "@/lib/mock";

export const Route = createFileRoute("/me/recordings")({
  head: () => ({ meta: [
    { title: "录音档案 · 练活儿" }, { name: "description", content: "每一遍练习的录音存档" },
    { property: "og:title", content: "录音档案 · 练活儿" }, { property: "og:description", content: "练习录音存档" },
  ] }),
  component: Recs,
});

function Recs() {
  return (
    <div className="pb-6">
      <PageHeader title="录音档案库" sub="每一遍都算数" back="/me" />
      <ul className="space-y-2 p-4">
        {recordings.map((r) => (
          <li key={r.id} className="flex items-center gap-3 rounded-xl border bg-card p-3 shadow-card">
            <button className="seal grid h-10 w-10 place-items-center rounded-full" aria-label="播放"><Play size={16} fill="currentColor" /></button>
            <div className="min-w-0 flex-1"><div className="truncate font-serif font-bold">{r.piece}</div><div className="text-[11px] text-muted-foreground">{r.date} · {r.sec}″</div></div>
            <span className={`font-mono text-lg font-bold ${r.score >= 90 ? "text-primary" : "text-muted-foreground"}`}>{r.score}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
