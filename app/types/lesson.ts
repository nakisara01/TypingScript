export type LessonExplanation = {
  id: string;
  label: string;
  text: string;
  keywords?: string[];
};

export type Lesson = {
  id: string;
  title: string;
  description: string;
  code: string;
  expectedResult: string;
  explanations: LessonExplanation[];
};
