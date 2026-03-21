'use client';

import { useMemo, useState } from "react";

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
  const [showOnlyChanges, setShowOnlyChanges] = useState(false);
  const [focusedLine, setFocusedLine] = useState<number | null>(null);

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

  const visibleLines = useMemo(() => {
    if (focusedLine) {
      return diffLines.filter((line) => line.line === focusedLine);
    }
    if (showOnlyChanges) {
      return diffLines.filter((line) => line.status !== "match");
    }
    return diffLines;
  }, [diffLines, showOnlyChanges, focusedLine]);

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
      <div className="flex flex-wrap gap-2 text-xs">
        <button
          type="button"
          onClick={() => setShowOnlyChanges((prev) => !prev)}
          className={`rounded-full border px-3 py-1 font-semibold transition ${showOnlyChanges ? "border-indigo-400 bg-indigo-50 text-indigo-700" : "border-zinc-200 text-zinc-600 hover:border-indigo-200"}`}
        >
          {showOnlyChanges ? "모든 줄 보기" : "차이만 보기"}
        </button>
        <button
          type="button"
          onClick={() => setFocusedLine(null)}
          disabled={!focusedLine}
          className="rounded-full border border-zinc-200 px-3 py-1 font-semibold text-zinc-600 transition hover:border-indigo-200 disabled:cursor-not-allowed disabled:opacity-40"
        >
          선택 초기화
        </button>
        <p className="self-center text-[11px] text-zinc-500">
          줄 번호 뱃지를 눌러 해당 줄만 집중할 수 있습니다.
        </p>
      </div>
      {focusedLine && (
        <p className="text-xs text-indigo-500">
          {focusedLine}행만 표시 중입니다.
        </p>
      )}

      {diffLines.length === 0 ? (
        <p className="text-sm text-zinc-500">
          코드 입력을 시작하면 정답과의 차이가 표시됩니다.
        </p>
      ) : visibleLines.length === 0 ? (
        <p className="text-sm text-zinc-500">
          현재 조건에 해당하는 줄이 없습니다. 필터를 해제해 보세요.
        </p>
      ) : (
        <div className="rounded-2xl border border-zinc-200">
          <div className="grid grid-cols-2 gap-0 rounded-t-2xl bg-zinc-50 text-xs font-semibold uppercase tracking-wide text-zinc-500">
            <div className="px-4 py-2">정답 코드</div>
            <div className="px-4 py-2">내 입력</div>
          </div>
          <div className="divide-y divide-zinc-100">
            {visibleLines.map((line) => {
              const inlineDiff =
                line.status === "changed"
                  ? computeInlineDiff(line.expected, line.actual)
                  : null;
              const isFocused = focusedLine === line.line;
              const handleToggleFocus = () =>
                setFocusedLine((prev) => (prev === line.line ? null : line.line));
              return (
                <div
                  key={line.line}
                  className={`grid grid-cols-2 gap-0 text-sm ${
                    isFocused ? "bg-indigo-50/60" : ""
                  }`}
                >
                  <LineCell
                    position="expected"
                    line={line.line}
                    value={line.expected}
                    status={line.status === "extra" ? "match" : line.status}
                    inlineSegments={inlineDiff?.expected}
                    onToggleFocus={handleToggleFocus}
                    isFocused={isFocused}
                  />
                  <LineCell
                    position="actual"
                    line={line.line}
                    value={line.actual}
                    status={line.status === "missing" ? "match" : line.status}
                    inlineSegments={inlineDiff?.actual}
                    onToggleFocus={handleToggleFocus}
                    isFocused={isFocused}
                  />
                </div>
              );
            })}
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
  inlineSegments?: InlineSegment[] | null;
  onToggleFocus?: () => void;
  isFocused?: boolean;
};

type InlineSegment = {
  text: string;
  highlight: boolean;
};

function LineCell({
  position,
  line,
  value,
  status,
  inlineSegments,
  onToggleFocus,
  isFocused,
}: LineCellProps) {
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
        <button
          type="button"
          onClick={onToggleFocus}
          disabled={!onToggleFocus}
          className={`rounded-full border px-2 py-0.5 font-semibold ${
            isFocused
              ? "border-indigo-400 bg-indigo-50 text-indigo-700"
              : onToggleFocus
              ? "border-zinc-200 text-zinc-500 hover:border-indigo-200"
              : "border-transparent text-zinc-500"
          }`}
        >
          {badge} · {line}행
        </button>
        <div className="flex items-center gap-1">
          {status !== "match" && (
            <span className="rounded-full bg-white/60 px-2 py-0.5 text-[10px] font-semibold text-zinc-600">
              {status === "changed"
                ? "수정"
                : position === "expected"
                ? "기대값"
                : "입력값"}
            </span>
          )}
        </div>
      </p>
      {value !== null ? (
        inlineSegments && inlineSegments.length > 0 ? (
          <p className="whitespace-pre-wrap break-words text-xs text-inherit">
            {inlineSegments.map((segment, index) => (
              <span
                key={`${segment.text}-${index}`}
                className={segment.highlight ? "bg-amber-200/60 text-amber-900" : ""}
              >
                {segment.text || " "}
              </span>
            ))}
          </p>
        ) : (
          <pre className="whitespace-pre-wrap break-words text-xs text-inherit">
            {value.length > 0 ? value : "(빈 줄)"}
          </pre>
        )
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

function computeInlineDiff(
  expectedLine: string | null,
  actualLine: string | null,
): { expected: InlineSegment[]; actual: InlineSegment[] } | null {
  if (expectedLine === null || actualLine === null) {
    return null;
  }
  const expectedValue = expectedLine;
  const actualValue = actualLine;
  const minLength = Math.min(expectedValue.length, actualValue.length);
  let start = 0;
  while (start < minLength && expectedValue[start] === actualValue[start]) {
    start += 1;
  }
  let end = 0;
  while (
    end < minLength - start &&
    expectedValue[expectedValue.length - 1 - end] ===
      actualValue[actualValue.length - 1 - end]
  ) {
    end += 1;
  }

  const buildSegments = (value: string) => {
    const segments: InlineSegment[] = [];
    const prefix = value.slice(0, start);
    const middle = value.slice(start, value.length - end);
    const suffix = end > 0 ? value.slice(value.length - end) : "";
    if (prefix) {
      segments.push({ text: prefix, highlight: false });
    }
    if (middle) {
      segments.push({ text: middle, highlight: true });
    }
    if (suffix) {
      segments.push({ text: suffix, highlight: false });
    }
    if (segments.length === 0) {
      segments.push({ text: value, highlight: false });
    }
    return segments;
  };

  return {
    expected: buildSegments(expectedValue),
    actual: buildSegments(actualValue),
  };
}
