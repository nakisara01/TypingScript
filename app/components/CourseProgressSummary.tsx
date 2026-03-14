type CourseProgressSummaryProps = {
  total: number;
  completed: number;
  currentPosition: number;
};

export default function CourseProgressSummary({
  total,
  completed,
  currentPosition,
}: CourseProgressSummaryProps) {
  const safeTotal = Math.max(total, 1);
  const percentage = Math.round((completed / safeTotal) * 100);

  return (
    <section className="glass-soft p-5 text-zinc-900">
      <header className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-indigo-500">
            Course Progress
          </p>
          <h2 className="text-2xl font-semibold">
            {completed} / {total} lessons completed
          </h2>
          <p className="text-sm text-zinc-600">
            현재 {currentPosition}/{total} · {percentage}% 완료
          </p>
        </div>
        <span className="rounded-full bg-zinc-900 px-4 py-1 text-sm font-medium text-white">
          {percentage}%
        </span>
      </header>
      <div className="mt-4 h-2 rounded-full bg-white/20">
        <div
          className="h-full rounded-full bg-indigo-500 transition-all"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <p className="mt-3 rounded-xl bg-white/60 px-4 py-2 text-xs text-zinc-600">
        브라우저를 새로 고치면 진행 상태가 초기화됩니다. 완료 후 dev log에 기록해 두세요.
      </p>
    </section>
  );
}
