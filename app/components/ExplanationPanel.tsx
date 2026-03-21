import { LessonExplanation } from "../types/lesson";

type ExplanationPanelProps = {
  items: LessonExplanation[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  hintedId?: string | null;
};

export default function ExplanationPanel({
  items,
  selectedId,
  onSelect,
  hintedId,
}: ExplanationPanelProps) {
  const selected = items.find((item) => item.id === selectedId) ?? items[0];
  const isHintedActive = hintedId && selected && selected.id === hintedId;

  return (
    <section className="glass-soft space-y-4 p-5 text-zinc-900">
      <header>
        <p className="text-xs font-semibold uppercase tracking-wide text-indigo-500">
          Explanation
        </p>
        <h2 className="text-lg font-semibold">무엇을 배우고 있나요?</h2>
        {isHintedActive && (
          <p className="mt-1 text-xs text-indigo-500">
            최근 오류를 기반으로 추천된 설명입니다.
          </p>
        )}
      </header>
      <div className="flex flex-col gap-3">
        {items.map((item) => {
          const active = item.id === (selected?.id ?? selectedId);
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelect(item.id)}
              className={`flex w-full items-center justify-between rounded-xl border px-4 py-2 text-left text-sm transition-colors ${active ? "border-indigo-500 bg-indigo-50 text-indigo-900" : "border-zinc-200 bg-white text-zinc-700 hover:border-indigo-200"}`}
            >
              <span>{item.label}</span>
              {active && (
                <span className="rounded-full bg-indigo-100 px-2 py-0.5 text-xs font-semibold text-indigo-700">
                  선택됨
                </span>
              )}
              {!active && hintedId === item.id && (
                <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-semibold text-amber-700">
                  힌트 추천
                </span>
              )}
            </button>
          );
        })}
      </div>
      <div className="space-y-2 rounded-xl bg-zinc-50 p-4 text-sm leading-6 text-zinc-700">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-indigo-600">
          <span className="h-2 w-2 rounded-full bg-indigo-500" />
          현재 설명
        </div>
        <p>{selected ? selected.text : "설명을 선택해 내용을 확인하세요."}</p>
      </div>
    </section>
  );
}
