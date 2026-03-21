"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import LandingInput from "../components/LandingInput";
import LanguageCarousel from "../components/LanguageCarousel";
import { languageOptions, languageLessonsMap } from "../data/languages";
import { loadLanguageProgress } from "../lib/progress";

const baseMessage = "카드에 적힌 언어 이름을 입력하면 해당 코스로 이동합니다.";

export default function LanguageSelectionPage() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState("");
  const [message, setMessage] = useState(baseMessage);
  const [activeHint, setActiveHint] = useState(languageOptions[0]?.name ?? "");
  const [comingSoonLanguage, setComingSoonLanguage] = useState<string | null>(
    null,
  );
  const [progressMap] = useState<Record<string, { completed: number; total: number }>>(() =>
    loadLanguageProgress(),
  );

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleChange = (next: string) => {
    setValue(next);
    if (!next.trim()) {
      setMessage(baseMessage);
      return;
    }

    const match = languageOptions.find(
      (language) => language.name.toLowerCase() === next.trim().toLowerCase(),
    );

    if (!match) {
      setMessage("카드에 적힌 언어 이름을 그대로 입력해 주세요.");
      return;
    }

    if (match.status !== "available") {
      setComingSoonLanguage(match.name);
      setMessage(`${match.name} 코스는 준비 중입니다.`);
      return;
    }

    router.push(`/language/${match.id}`);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-slate-100 px-4 py-12 sm:px-6 lg:px-8">
      <section className="glass-panel mx-auto flex w-full max-w-5xl flex-col gap-10 p-10">
        <div className="flex flex-col gap-2 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.4em] text-indigo-500">
            Choose a language
          </p>
          <h1 className="text-4xl font-semibold text-zinc-900">
            타이핑하고 싶은 언어를 입력하세요
          </h1>
        </div>

        <div className="mx-auto w-full max-w-xl">
          <LandingInput
            ref={inputRef}
            label="학습할 언어를 입력하세요"
            value={value}
            placeholder="예: HTML"
            ghostText={activeHint}
            onChange={handleChange}
          />
          <p className="mt-3 text-sm text-zinc-600">{message}</p>
        </div>


        <div className="space-y-4">
          <LanguageCarousel
            languages={languageOptions}
            onActiveChange={(language) => setActiveHint(language.name)}
          />
          <div className="grid gap-3 md:grid-cols-2">
            {languageOptions.map((language) => {
              const lessons = languageLessonsMap[language.id] ?? [];
              const progress = progressMap[language.id];
              const percent = progress
                ? Math.round((progress.completed / progress.total) * 100)
                : 0;
              const nextLessonIndex = progress
                ? Math.min(progress.completed + 1, lessons.length || 1)
                : 1;
              const isAvailable = language.status === "available" && lessons.length;
              return (
                <div
                  key={language.id}
                  className="glass-panel flex flex-col gap-2 p-4 text-left"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold text-zinc-900">
                        {language.name}
                      </p>
                      {progress?.completed === progress?.total && progress?.total > 0 && (
                        <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-semibold text-emerald-700">
                          완료
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-zinc-500">
                      {lessons.length} lessons
                    </span>
                  </div>
                  <p className="text-sm text-zinc-500">{language.description}</p>
                  {lessons.length > 0 && (
                    <div className="space-y-1 text-xs text-zinc-500">
                      <div className="h-1.5 rounded-full bg-zinc-200">
                        <div
                          className="h-full rounded-full bg-indigo-500 transition-all"
                          style={{ width: `${progress ? percent : 0}%` }}
                        />
                      </div>
                      <p>
                        {progress ? `진행 ${progress.completed}/${progress.total}` : "아직 시작하지 않음"}
                      </p>
                    </div>
                  )}
                  <div className="mt-2 flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => router.push(`/language/${language.id}`)}
                      disabled={!isAvailable}
                      className="rounded-full border border-zinc-200 px-3 py-1 text-xs font-semibold text-zinc-700 transition hover:border-indigo-200 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {progress ? "처음부터" : "시작하기"}
                    </button>
                    {isAvailable && (
                      <button
                        type="button"
                        onClick={() =>
                          router.push(`/language/${language.id}?lesson=${nextLessonIndex}`)
                        }
                        className="rounded-full border border-indigo-200 px-3 py-1 text-xs font-semibold text-indigo-600 transition hover:border-indigo-300"
                      >
                        {progress ? `Lesson ${nextLessonIndex}로 계속` : "최신 레슨으로"}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {comingSoonLanguage && (
          <div className="rounded-2xl bg-amber-50 p-4 text-sm text-amber-700">
            {comingSoonLanguage} 코스는 준비 중입니다. 곧 소식을 전할게요.
          </div>
        )}
      </section>
    </main>
  );
}
