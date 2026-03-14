# typingScript 코드베이스 개요

## 주요 파일 설명
- `app/layout.tsx`: 글로벌 폰트와 메타데이터를 정의해 모든 페이지에 공통 레이아웃을 적용합니다.
- `app/globals.css`: 라이트 테마 배경과 공통 카드(Glass) 스타일을 지정합니다.
- `app/page.tsx`: 루트 랜딩 페이지로, "Hello typingScript" 문장을 입력하면 언어 선택 화면(`/language`)으로 이동합니다.
- `app/language/page.tsx`: 언어 선택 페이지로 캐러셀과 입력 UI, 각 언어의 진행률/레슨 수/계속하기 버튼이 포함되어 있습니다.
- `app/language/[languageId]/page.tsx`: 실제 레슨 화면을 담당하며 `LessonPlayer`, 진행 카드, 공유 버튼 및 "다음 언어로 이동" CTA를 렌더링합니다.
- `app/components/LessonPlayer.tsx`: lesson 배열과 초기 인덱스를 받아 입력 상태, 진행률, 완료 여부를 관리하고, 진행 상황을 부모에 전달합니다.
- `app/data/lessons.ts`: HTML/CSS/JavaScript/Python/Swift 각 10개 레슨 세트를 정의하고 `lessonSets`를 export합니다.
- `app/data/languages.ts`: 언어 카드 정보와 `languageLessonsMap`을 제공해 라우트에서 레슨 데이터를 찾을 수 있게 합니다.
- `app/components/CodeDisplay.tsx`: 제공된 lesson 코드를 읽기 전용으로 보여줍니다.
- `app/components/TypingInput.tsx`: 학습자가 코드를 입력하는 textarea이며 `onChange`로 상위 상태를 갱신합니다.
- `app/components/ProgressIndicator.tsx`: 전체 문자 수 대비 입력된 문자 수를 계산해 퍼센트 바를 렌더링합니다.
- `app/components/CompletionNotice.tsx`: lesson 완료 여부에 따라 안내 문구 또는 축하 메시지를 표시합니다.
- `app/components/ResultPreview.tsx`: lesson을 마치면 `dangerouslySetInnerHTML`로 결과 HTML을 미리 보여줍니다.
- `docs/dev-log-ko.md`: 한국어 개발 로그로, 하루 단위로 변경 사항과 확인 방법을 기록합니다.
- `docs/codebase-overview-ko.md`: 현재 문서로 전체 구조, 데이터 흐름, 다음 단계 제안을 담습니다.

## 데이터 흐름
1. `app/data/lessons.ts`에서 언어별 레슨 세트를 정의해 `lessonSets`에 담습니다.
2. `languageLessonsMap`이 언어 ID와 레슨 배열을 매핑하고, `/language/[id]` 페이지에서 이를 불러옵니다.
3. `/language` 페이지는 `languageLessonsMap`과 `loadLanguageProgress` 결과를 이용해 각 언어 카드에 레슨 수/진행률을 표시합니다.
4. `/language/[id]` 화면은 쿼리 파라미터(`?lesson=`)로 시작 레슨을 설정하고, `LessonPlayer`의 `onProgressUpdate`를 통해 진행을 localStorage에 저장합니다.
5. LessonPlayer 내부 상태가 변경되면 `ProgressIndicator`, `ResultPreview`, `ExplanationPanel` 등 서브 컴포넌트에 전달되어 UI가 갱신됩니다.

## Lesson Player 동작
- 헤더에서 lesson 메타 정보를 보여주고, 이어서 진행률 바를 그립니다.
- 좌측 패널은 목표 코드를, 우측 패널은 입력창과 완료 안내를 배치하여 시선을 좌→우로 유도합니다.
- 입력 텍스트 길이가 원본 코드와 일치하면 완료 상태로 전환되며, 입력창이 비활성화되고 축하 메시지가 나타납니다.
- 동일한 시점에 결과 프리뷰 영역이 placeholder에서 실제 HTML 렌더링으로 바뀌어 시각적 보상을 제공합니다.

## Placeholder 또는 MVP 수준인 부분
- lesson 데이터가 페이지 파일 안에 하드코딩되어 있어 여러 lesson 또는 난이도 구성이 없습니다.
- 타자 검증은 단순히 문자열 길이와 일치 여부만 확인해 오타 허용, 실시간 비교, 오류 표시가 없습니다.
- 설명 패널, 단계별 가이드, 키보드 단축키 등 학습 보조 UI가 없습니다.
- 결과 미리보기는 `dangerouslySetInnerHTML`로 직접 렌더링하며 스타일/보안 제약이 고려되지 않았습니다.

## 다음 구현 제안
- Coming soon 언어에 대한 알림/구독 관리 UI를 추가해 수집한 이메일을 확인/삭제할 수 있게 만들면 좋습니다.
