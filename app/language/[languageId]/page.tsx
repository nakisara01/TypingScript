"use client";

import { use, useMemo, useState, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import LessonPlayer from "../../components/LessonPlayer";
import { languageLessonsMap, languageOptions } from "../../data/languages";
import { loadLanguageProgress, saveLanguageProgress } from "../../lib/progress";

type PageProps = {
  params: { languageId: string };
};

export default function LanguageLessonsPage({ params }: PageProps) {
  const router = useRouter();
  const resolvedParams = use(params);
  const searchParams = useSearchParams();
  const language = languageOptions.find(
    (entry) => entry.id === resolvedParams.languageId,
  );
  const lessons = languageLessonsMap[resolvedParams.languageId];

  const initialLessonIndex = useMemo(() => {
    const lessonParam = Number(searchParams.get("lesson"));
    if (Number.isNaN(lessonParam) || lessonParam < 1) return 0;
    if (!lessons?.length) return 0;
    return Math.min(lessons.length - 1, lessonParam - 1);
  }, [lessons, searchParams]);

  const [lessonProgress, setLessonProgress] = useState(() => {
    const map = loadLanguageProgress();
    const existing = map[resolvedParams.languageId];
    return {
      currentIndex: initialLessonIndex,
      completedCount: existing?.completed ?? 0,
      total: existing?.total ?? lessons.length,
    };
  });

  const languageOrderIndex = languageOptions.findIndex(
    (entry) => entry.id === resolvedParams.languageId,
  );
  const nextLanguage = languageOptions
    .slice(languageOrderIndex + 1)
    .find(
      (entry) =>
        entry.status === "available" &&
        (languageLessonsMap[entry.id]?.length ?? 0) > 0,
    );

  const handleProgressUpdate = useCallback(
    ({ completedCount, total, currentIndex }: { completedCount: number; total: number; currentIndex: number }) => {
      setLessonProgress({ currentIndex, completedCount, total });
      saveLanguageProgress(resolvedParams.languageId, { completed: completedCount, total });
    },
    [resolvedParams.languageId],
  );

  if (!language) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-slate-100 px-4 py-12 sm:px-6 lg:px-8">
        <section className="glass-panel mx-auto w-full max-w-3xl p-8 text-center text-zinc-700">
          요청한 언어를 찾을 수 없습니다.
        </section>
      </main>
    );
  }

  if (language.status !== "available" || !lessons?.length) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-slate-100 px-4 py-12 sm:px-6 lg:px-8">
        <section className="glass-panel mx-auto w-full max-w-3xl space-y-4 p-8 text-center text-zinc-700">
          <h1 className="text-2xl font-semibold text-zinc-900">
            {language.name}는 준비 중입니다.
          </h1>
          <p className="text-sm text-zinc-600">조금만 기다려 주세요!</p>
          <button
            type="button"
            onClick={() => router.push("/language")}
            className="rounded-full border border-zinc-200 px-4 py-2 text-sm font-semibold text-zinc-700 transition hover:border-indigo-200"
          >
            언어 선택으로 돌아가기
          </button>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-slate-100 px-4 py-12 sm:px-6 lg:px-8">
      <section className="glass-panel mx-auto w-full max-w-6xl space-y-6 p-10">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-2">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-indigo-500">
                Language Selected
              </p>
              <h1 className="text-3xl font-semibold text-zinc-900">{language.name}</h1>
              <p className="text-sm text-zinc-600">{language.description}</p>
            </div>
            <div className="flex flex-wrap gap-3 text-sm text-zinc-600">
              <span>레슨 수: {lessons.length}개</span>
              <span>예상 소요: {lessons.length * 2}분</span>
              <span>
                추천 순서: {languageOptions.findIndex((entry) => entry.id === language.id) + 1}/
                {languageOptions.length}
              </span>
              <span>
                진행률: {lessonProgress.completedCount}/{lessonProgress.total}
              </span>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => router.push("/language")}
              className="rounded-full border border-zinc-200 px-4 py-2 text-sm font-semibold text-zinc-700 transition hover:border-indigo-200"
            >
              언어 선택으로 돌아가기
            </button>
            <button
              type="button"
              onClick={async () => {
                const baseUrl = `${window.location.origin}/language/${resolvedParams.languageId}`;
                const shareLessonIndex = lessonProgress.currentIndex + 1;
                const shareUrl = `${baseUrl}?lesson=${shareLessonIndex}`;
                await navigator.clipboard.writeText(shareUrl);
                alert("링크를 복사했습니다.");
              }}
              className="rounded-full border border-indigo-200 px-4 py-2 text-sm font-semibold text-indigo-600 transition hover:border-indigo-300"
            >
              공유 링크 복사
            </button>
          </div>
        </div>

        <LessonPlayer
          lessons={lessons}
          initialLessonIndex={initialLessonIndex}
          onProgressUpdate={handleProgressUpdate}
        />

        {nextLanguage &&
          lessonProgress.completedCount >= lessonProgress.total && (
            <div className="rounded-2xl bg-emerald-50 p-4 text-sm text-emerald-800">
              <p className="font-semibold">
                {nextLanguage.name} 레슨으로 넘어가 볼까요?
              </p>
              <button
                type="button"
                onClick={() => router.push(`/language/${nextLanguage.id}`)}
                className="mt-2 rounded-full border border-emerald-200 px-4 py-2 text-xs font-semibold text-emerald-700 transition hover:border-emerald-300"
              >
                다음 언어 학습하기
              </button>
            </div>
          )}
      </section>
    </main>
  );
}
