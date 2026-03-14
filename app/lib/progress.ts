export const LANGUAGE_PROGRESS_KEY = "typingscript.languageProgress";

export type LanguageProgress = Record<string, { completed: number; total: number }>;

export const loadLanguageProgress = (): LanguageProgress => {
  if (typeof window === "undefined") {
    return {};
  }
  try {
    const stored = window.localStorage.getItem(LANGUAGE_PROGRESS_KEY);
    return stored ? (JSON.parse(stored) as LanguageProgress) : {};
  } catch {
    return {};
  }
};

export const saveLanguageProgress = (
  languageId: string,
  progress: { completed: number; total: number },
) => {
  if (typeof window === "undefined") {
    return;
  }
  const map = loadLanguageProgress();
  map[languageId] = progress;
  window.localStorage.setItem(LANGUAGE_PROGRESS_KEY, JSON.stringify(map));
};
