export type LanguageOption = {
  id: string;
  name: string;
  description: string;
  status: "available" | "upcoming";
  sampleCode?: string;
  sampleResult?: string;
};

export const languageOptions: LanguageOption[] = [
  {
    id: "html",
    name: "HTML",
    description: "구조를 만드는 첫 번째 언어",
    status: "available",
    sampleCode: `<h1>Hello typingScript</h1>\n<p>타이핑하면서 배우는 웹</p>`,
    sampleResult: "간단한 제목과 문단",
  },
  {
    id: "css",
    name: "CSS",
    description: "디자인과 레이아웃을 다루는 스타일 언어",
    status: "available",
    sampleCode: `button {\n  background:#2563eb;\n  border-radius:999px;\n}`,
    sampleResult: "버튼 스타일 커스터마이징",
  },
  {
    id: "javascript",
    name: "JavaScript",
    description: "동작과 인터랙션을 담당하는 언어",
    status: "available",
    sampleCode: `const greet = () => console.log('Ready to type!');\ngreet();`,
    sampleResult: "콘솔에 메시지 출력",
  },
  {
    id: "python",
    name: "Python",
    description: "간결한 문법으로 빠르게 로직을 구성",
    status: "available",
    sampleCode: `def greet(name):\n    return f"Hello {name}"\nprint(greet("typingScript"))`,
    sampleResult: "콘솔에 문자열 출력",
  },
  {
    id: "swift",
    name: "Swift",
    description: "iOS 앱을 위한 현대적인 언어",
    status: "available",
    sampleCode: `let greeting = "Hello typingScript"\nprint(greeting)`,
    sampleResult: "Xcode 콘솔 로그",
  },
  {
    id: "kotlin",
    name: "Kotlin",
    description: "Android 앱을 위한 현대적인 언어",
    status: "upcoming",
    sampleCode: `let greeting = "Hello typingScript"\nprint(greeting)`,
    sampleResult: "Xcode 콘솔 로그",
  },
];

import { lessonSets } from "./lessons";

export const languageLessonsMap = lessonSets;
