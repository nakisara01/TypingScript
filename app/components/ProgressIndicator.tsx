type ProgressIndicatorProps = {
  current: number;
  total: number;
};

export default function ProgressIndicator({
  current,
  total,
}: ProgressIndicatorProps) {
  const safeTotal = Math.max(total, 1);
  const percentage = Math.min(100, Math.round((current / safeTotal) * 100));

  return (
    <div className="space-y-2 text-zinc-900">
      <div className="flex items-center justify-between text-sm text-zinc-600">
        <span>Progress</span>
        <span>
          {current}/{safeTotal} chars · {percentage}%
        </span>
      </div>
      <div className="h-2 w-full rounded-full bg-zinc-200">
        <div
          className="h-full rounded-full bg-indigo-500 transition-all"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
