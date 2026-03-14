"use client";

import { useState } from "react";
import { Lesson } from "../types/lesson";

type LessonNavigatorProps = {
  lessons: Lesson[];
  currentIndex: number;
  statusByIndex: ("current" | "completed" | "upcoming")[];
  onSelect: (index: number) => void;
};

const statusClasses: Record<"current" | "completed" | "upcoming", string> = {
  current: "border-indigo-500 bg-indigo-50 text-indigo-900",
  completed: "border-emerald-200 bg-emerald-50 text-emerald-900",
  upcoming: "border-zinc-200 bg-white text-zinc-700",
};

export default function LessonNavigator({
  lessons,
  currentIndex,
  statusByIndex,
  onSelect,
}: LessonNavigatorProps) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const toggleMobile = () => {
    setIsMobileOpen((prev) => !prev);
  };

  return (
    <div className="glass-soft p-5 text-zinc-900">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-indigo-500">
          Lesson Flow
        </h2>
        <div className="flex items-center gap-2 text-xs text-zinc-500 sm:hidden">
          {currentIndex + 1}/{lessons.length} 진행 중
        </div>
        <button
          type="button"
          onClick={toggleMobile}
          className="rounded-full border border-zinc-200 px-3 py-1 text-xs font-semibold text-zinc-700 transition-colors hover:border-indigo-200 sm:hidden"
          aria-expanded={isMobileOpen}
        >
          {isMobileOpen ? "목록 닫기" : "목록 보기"}
        </button>
      </div>
      <div
        className={`${isMobileOpen ? "block" : "hidden"} space-y-3 sm:block`}
      >
        {lessons.map((lesson, index) => {
          const status = statusByIndex[index] ?? "upcoming";
          return (
            <button
              key={lesson.id}
              type="button"
              onClick={() => onSelect(index)}
              className={`flex w-full items-start gap-4 rounded-2xl border px-4 py-3 text-left transition-colors ${statusClasses[status]} ${index === currentIndex ? "shadow-lg" : "hover:border-white/50"}`}
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-sm font-semibold text-zinc-900">
                {index + 1}
              </div>
              <div>
                <p className="text-base font-semibold text-zinc-900">
                  {lesson.title}
                </p>
                <p className="text-sm text-zinc-600">{lesson.description}</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
