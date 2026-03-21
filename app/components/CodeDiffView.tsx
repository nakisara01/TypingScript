'use client';

import { useMemo } from "react";

type CodeDiffViewProps = {
  expected: string;
  actual: string;
};

type DiffLine = {
  line: number;
  expected: string | null;
  actual: string | null;
  status: "match" | "changed" | "missing" | "extra";
};

export default function CodeDiffView({ expected, actual }: CodeDiffViewProps) {
  const diffLines = useMemo<DiffLine[]>(() => {
    const normalize = (value: string) => value.replace(/\r\n/g, "\n");
    const expectedLines = normalize(expected).split("\n");
    const actualLines = normalize(actual).split("\n");
    const maxLength = Math.max(expectedLines.length, actualLines.length);

    return Array.from({ length: maxLength }).map((_, index) => {
      const expectedLine = expectedLines[index] ?? null;
      const actualLine = actualLines[index] ?? null;

      let status: DiffLine["status"] = "match";
      if (expectedLine === null && actualLine !== null) {
        status = "extra";
      } else if (expectedLine !== null && actualLine === null) {
        status = "missing";
      } else if (expectedLine !== actualLine) {
        status = "changed";
      }

      return {
        line: index + 1,
        expected: expectedLine,
        actual: actualLine,
        status,
      };
    });
  }, [expected, actual]);

  const summary = useMemo(() => {
    const total = diffLines.length;
    const mismatch = diffLines.filter((line) => line.status !== "match").length;
    if (total === 0) {
      return "입력한 코드가 없습니다.";
    }
    if (mismatch === 0) {
      return "모든 줄이 일치합니다.";
    }
    return `${mismatch}개의 줄이 서로 다릅니다.`;
  }, [diffLines]);

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm font-semibold text-zinc-700">{summary}</p>
        <div className="flex flex-wrap gap-2 text-xs">
          <Legend color="bg-emerald-100 text-emerald-700" label="일치" />
          <Legend color="bg-amber-100 text-amber-700" label="수정 필요" />
          <Legend color="bg-rose-100 text-rose-700" label="누락/추가" />
        </div>
      </div>

      {diffLines.length === 0 ? (
        <p className="text-sm text-zinc-500">
          코드 입력을 시작하면 정답과의 차이가 표시됩니다.
        </p>
      ) : (
        <div className="rounded-2xl border border-zinc-200">
          <div className="grid grid-cols-2 gap-0 rounded-t-2xl bg-zinc-50 text-xs font-semibold uppercase tracking-wide text-zinc-500">
            <div className="px-4 py-2">정답 코드</div>
            <div className="px-4 py-2">내 입력</div>
          </div>
          <div className="divide-y divide-zinc-100">
            {diffLines.map((line) => (
              <div
                key={line.line}
                className="grid grid-cols-2 gap-0 text-sm"
              >
                <LineCell
                  position="expected"
                  line={line.line}
                  value={line.expected}
                  status={line.status === "extra" ? "match" : line.status}
                />
                <LineCell
                  position="actual"
                  line={line.line}
                  value={line.actual}
                  status={line.status === "missing" ? "match" : line.status}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

type LineCellProps = {
  position: "expected" | "actual";
  line: number;
  value: string | null;
  status: DiffLine["status"];
};

function LineCell({ position, line, value, status }: LineCellProps) {
  const base = "px-4 py-3 font-mono text-xs whitespace-pre-wrap";
  const statusClass = {
    match: "bg-white text-zinc-700",
    changed: "bg-amber-50 text-amber-900",
    missing: "bg-rose-50 text-rose-900",
    extra: "bg-rose-50 text-rose-900",
  }[status];

  const badge = position === "expected" ? "정답" : "내 입력";

  return (
    <div className={`${base} ${statusClass}`}>
      <p className="mb-1 flex items-center justify-between text-[10px] uppercase tracking-wide text-zinc-500">
        <span>
          {badge} · {line}행
        </span>
        {status !== "match" && (
          <span className="rounded-full bg-white/60 px-2 py-0.5 text-[10px] font-semibold text-zinc-600">
            {status === "changed"
              ? "수정"
              : position === "expected"
              ? "기대값"
              : "입력값"}
          </span>
        )}
      </p>
      {value !== null ? (
        <pre className="whitespace-pre-wrap break-words text-xs text-inherit">
          {value.length > 0 ? value : "(빈 줄)"}
        </pre>
      ) : (
        <p className="text-xs text-zinc-500">(줄 없음)</p>
      )}
    </div>
  );
}

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-semibold ${color}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {label}
    </span>
  );
}
