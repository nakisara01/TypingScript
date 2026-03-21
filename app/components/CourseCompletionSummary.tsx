import { Lesson } from "../types/lesson";

type CourseCompletionSummaryProps = {
  lessons: Lesson[];
  onRestart?: () => void;
  onExit?: () => void;
};

export default function CourseCompletionSummary({
  lessons,
  onRestart,
  onExit,
}: CourseCompletionSummaryProps) {
  return (
    <section className="glass-soft border border-emerald-100/40 p-5 text-zinc-900">
      <h2 className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
        Course Summary
      </h2>
      <p className="mt-1 text-base text-zinc-600">
        총 {lessons.length}개의 lesson을 모두 완료했습니다. 아래 개요를 다시 읽으며 복습해 보세요.
      </p>
      <ol className="mt-4 space-y-3 text-sm">
        {lessons.map((lesson, index) => (
          <li
            key={lesson.id}
            className="flex items-start gap-3 rounded-xl border border-zinc-200 bg-white p-3 text-zinc-800"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-100 text-xs font-semibold">
              {index + 1}
            </span>
            <div>
              <p className="font-semibold">{lesson.title}</p>
              <p className="text-emerald-200">{lesson.description}</p>
            </div>
          </li>
        ))}
      </ol>
      <div className="mt-4 flex flex-wrap gap-2 text-xs">
        {onRestart && (
          <button
            type="button"
            onClick={onRestart}
            className="rounded-full border border-zinc-200 px-3 py-1 font-semibold text-zinc-700 transition hover:border-indigo-200"
          >
            다시 시작하기
          </button>
        )}
        {onExit && (
          <button
            type="button"
            onClick={onExit}
            className="rounded-full border border-zinc-200 px-3 py-1 font-semibold text-zinc-700 transition hover:border-indigo-200"
          >
            언어 선택으로 돌아가기
          </button>
        )}
      </div>
    </section>
  );
}
