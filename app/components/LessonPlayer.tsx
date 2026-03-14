"use client";

import { useEffect, useMemo, useState } from "react";
import TypingInput from "./TypingInput";
import ProgressIndicator from "./ProgressIndicator";
import CompletionNotice from "./CompletionNotice";
import ResultPreview from "./ResultPreview";
import { Lesson } from "../types/lesson";
import ExplanationPanel from "./ExplanationPanel";
import LessonNavigator from "./LessonNavigator";
import CourseProgressSummary from "./CourseProgressSummary";
import CourseCompletionSummary from "./CourseCompletionSummary";

type LessonPlayerProps = {
  lessons: Lesson[];
  onProgressUpdate?: (info: {
    completedCount: number;
    total: number;
    currentIndex: number;
    currentLessonId: string | null;
  }) => void;
  initialLessonIndex?: number;
};

const STORAGE_KEY = "typingscript.lessonProgress";

export default function LessonPlayer({
  lessons,
  onProgressUpdate,
  initialLessonIndex = 0,
}: LessonPlayerProps) {
  const [currentIndex, setCurrentIndex] = useState(() =>
    Math.min(Math.max(initialLessonIndex, 0), Math.max(lessons.length - 1, 0)),
  );
  const [typedEntries, setTypedEntries] = useState<Record<string, string>>({});
  const [explanationSelections, setExplanationSelections] = useState<
    Record<string, string | null>
  >({});
  const [hasHydrated, setHasHydrated] = useState(false);
  const [lastSavedTime, setLastSavedTime] = useState<number | null>(null);
  const [mobilePanel, setMobilePanel] = useState<"editor" | "preview">("editor");

  useEffect(() => {
    if (hasHydrated) {
      return;
    }
    if (typeof window === "undefined") {
      return;
    }

    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      setHasHydrated(true);
      return;
    }

    try {
      const parsed = JSON.parse(stored) as {
        currentIndex?: number;
        typedEntries?: Record<string, string>;
        explanationSelections?: Record<string, string | null>;
      };
      const validIds = new Set(lessons.map((lesson) => lesson.id));

      const filteredEntries: Record<string, string> = {};
      Object.entries(parsed.typedEntries ?? {}).forEach(([key, value]) => {
        if (validIds.has(key) && typeof value === "string") {
          filteredEntries[key] = value;
        }
      });

      const filteredExplanation: Record<string, string | null> = {};
      Object.entries(parsed.explanationSelections ?? {}).forEach(
        ([key, value]) => {
          if (validIds.has(key)) {
            filteredExplanation[key] =
              typeof value === "string" || value === null ? value : null;
          }
        },
      );

      if (Object.keys(filteredEntries).length > 0) {
        setTypedEntries(filteredEntries);
      }

      if (Object.keys(filteredExplanation).length > 0) {
        setExplanationSelections(filteredExplanation);
      }

      if (typeof parsed.currentIndex === "number" && lessons.length > 0) {
        const maxIndex = Math.max(lessons.length - 1, 0);
        const safeIndex = Math.min(
          Math.max(parsed.currentIndex, 0),
          maxIndex,
        );
        setCurrentIndex(safeIndex);
      }
    } catch {
      // ignore corrupted data
    } finally {
      setHasHydrated(true);
    }
  }, [hasHydrated, lessons]);

  useEffect(() => {
    if (!hasHydrated) {
      return;
    }
    if (typeof window === "undefined") {
      return;
    }
    const payload = {
      currentIndex,
      typedEntries,
      explanationSelections,
    };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    setLastSavedTime(Date.now());
  }, [currentIndex, typedEntries, explanationSelections, hasHydrated]);

  const currentLesson = lessons[currentIndex];

  const typedCode = currentLesson
    ? typedEntries[currentLesson.id] ?? ""
    : "";

  const totalCharacters = currentLesson?.code.length ?? 0;
  const progressValue = typedCode.length;
  const isComplete = currentLesson ? typedCode === currentLesson.code : false;

  const activeExplanationId = useMemo(() => {
    if (!currentLesson) {
      return null;
    }
    return (
      explanationSelections[currentLesson.id] ??
      currentLesson.explanations[0]?.id ??
      null
    );
  }, [currentLesson, explanationSelections]);

  const handleChange = (value: string) => {
    if (!currentLesson) return;
    setTypedEntries((prev) => ({
      ...prev,
      [currentLesson.id]: value.slice(0, currentLesson.code.length),
    }));
  };

  const handleExplanationSelect = (explanationId: string) => {
    if (!currentLesson) return;
    setExplanationSelections((prev) => ({
      ...prev,
      [currentLesson.id]: explanationId,
    }));
  };

  const handleNextLesson = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, lessons.length - 1));
  };

  const handleLessonSelect = (index: number) => {
    setCurrentIndex(() => Math.min(Math.max(index, 0), lessons.length - 1));
    setMobilePanel("editor");
  };

  const handleRestartCourse = () => {
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(STORAGE_KEY);
    }
    setTypedEntries({});
    setExplanationSelections({});
    setCurrentIndex(0);
    setMobilePanel("editor");
  };

  const handleResetCurrentLesson = () => {
    if (!currentLesson) return;
    setTypedEntries((prev) => {
      const clone = { ...prev };
      delete clone[currentLesson.id];
      return clone;
    });
    setExplanationSelections((prev) => {
      const clone = { ...prev };
      delete clone[currentLesson.id];
      return clone;
    });
    setMobilePanel("editor");
  };

  const lessonStatuses = lessons.map((lesson, index) => {
    const typedValue = typedEntries[lesson.id] ?? "";
    if (typedValue === lesson.code) {
      return "completed" as const;
    }
    if (index === currentIndex) {
      return "current" as const;
    }
    return "upcoming" as const;
  });

  const completedCount = lessonStatuses.filter(
    (status) => status === "completed",
  ).length;
  const allCompleted = lessons.length > 0 && completedCount === lessons.length;
  const savedLabel = useMemo(() => {
    if (!lastSavedTime) {
      return "자동 저장 준비 중";
    }
    return `저장됨 ${new Date(lastSavedTime).toLocaleTimeString("ko-KR", {
      hour: "2-digit",
      minute: "2-digit",
    })}`;
  }, [lastSavedTime]);

  useEffect(() => {
    onProgressUpdate?.({
      completedCount,
      total: lessons.length,
      currentIndex,
      currentLessonId: currentLesson?.id ?? null,
    });
  }, [completedCount, lessons.length, currentIndex, currentLesson?.id, onProgressUpdate]);

  if (!currentLesson) {
    return (
      <section className="mx-auto flex max-w-4xl flex-col gap-6 rounded-2xl border border-zinc-200 bg-white p-8 text-center text-zinc-700">
        준비된 lesson이 없습니다.
      </section>
    );
  }

  return (
    <section className="glass-panel mx-auto flex max-w-5xl flex-col gap-8 p-8 text-zinc-900">
      <CourseProgressSummary
        total={lessons.length}
        completed={completedCount}
        currentPosition={currentIndex + 1}
      />

      {allCompleted && <CourseCompletionSummary lessons={lessons} />}

      <LessonNavigator
        lessons={lessons}
        currentIndex={currentIndex}
        statusByIndex={lessonStatuses}
        onSelect={handleLessonSelect}
      />

      <header className="space-y-2">
        <p className="text-sm font-medium uppercase tracking-wide text-indigo-600">
          Lesson {currentLesson.id} · {currentIndex + 1}/{lessons.length}
        </p>
        <h1 className="text-3xl font-semibold text-zinc-900">
          {currentLesson.title}
        </h1>
        <p className="text-base text-zinc-600">{currentLesson.description}</p>
      </header>

      <ProgressIndicator current={progressValue} total={totalCharacters} />

      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-3">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-500">
            Lesson Workspace
          </h2>
          <div className="flex items-center gap-2 text-xs text-zinc-500">
            <span
              className={`h-2 w-2 rounded-full ${
                lastSavedTime ? "bg-emerald-500" : "bg-zinc-400"
              } ${lastSavedTime ? "animate-pulse" : ""}`}
            />
            <span>{savedLabel}</span>
          </div>
          <button
            type="button"
            onClick={handleResetCurrentLesson}
            disabled={
              !typedEntries[currentLesson.id]?.length &&
              !Object.prototype.hasOwnProperty.call(
                explanationSelections,
                currentLesson.id,
              )
            }
            className="ml-auto rounded-full border border-zinc-200 px-3 py-1 text-xs font-semibold text-zinc-700 transition-colors hover:border-zinc-300 disabled:cursor-not-allowed disabled:opacity-50"
          >
            이 레슨 다시 하기
          </button>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <button
            type="button"
            onClick={() => setMobilePanel("editor")}
            className={`flex-1 rounded-full border px-3 py-1 text-sm font-semibold ${
              mobilePanel === "editor"
                ? "border-indigo-400 bg-indigo-50 text-indigo-700"
                : "border-zinc-200 text-zinc-600"
            }`}
          >
            입력
          </button>
          <button
            type="button"
            onClick={() => setMobilePanel("preview")}
            className={`flex-1 rounded-full border px-3 py-1 text-sm font-semibold ${
              mobilePanel === "preview"
                ? "border-indigo-400 bg-indigo-50 text-indigo-700"
                : "border-zinc-200 text-zinc-600"
            }`}
          >
            미리보기
          </button>
        </div>

        <div className="space-y-4 md:grid md:grid-cols-2 md:gap-6 md:space-y-0">
          <div
            className={`${
              mobilePanel === "editor" ? "block" : "hidden"
            } space-y-3 md:block`}
          >
            <TypingInput
              value={typedCode}
              onChange={handleChange}
              targetCode={currentLesson.code}
              disabled={isComplete}
            />
            <CompletionNotice visible={isComplete} />
            {isComplete && currentIndex < lessons.length - 1 && (
              <button
                type="button"
                onClick={handleNextLesson}
                className="w-full rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-indigo-500"
              >
                Next Lesson
              </button>
            )}
            {isComplete && currentIndex === lessons.length - 1 && (
              <div className="space-y-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-4 text-center text-sm text-emerald-800">
                <p className="font-semibold">
                  모든 lesson을 완료했습니다! 이제 자유롭게 연습을 이어가 보세요.
                </p>
                <button
                  type="button"
                  onClick={handleRestartCourse}
                  className="w-full rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-emerald-500"
                >
                  코스 다시 시작하기
                </button>
              </div>
            )}
          </div>

          <div
            className={`${
              mobilePanel === "preview" ? "block" : "hidden"
            } md:block`}
          >
            <ResultPreview
              visible={isComplete}
              html={currentLesson.expectedResult}
              placeholder="Complete the lesson to preview the page."
            />
          </div>
        </div>
      </div>

      {currentLesson.explanations.length > 0 && (
        <ExplanationPanel
          items={currentLesson.explanations}
          selectedId={activeExplanationId}
          onSelect={handleExplanationSelect}
        />
      )}
    </section>
  );
}
