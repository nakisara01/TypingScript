# typingScript 개발 로그

## 2026-03-16 (10)

### 작업 내용
- 모든 레슨 설명 ID에 대한 키워드를 `app/data/explanationKeywords.ts`로 확장하고, `app/data/lessons.ts`가 해당 키워드를 설명 객체에 자동 주입하도록 처리해 LessonPlayer가 정확한 매칭 정보를 바로 사용할 수 있게 함
- LessonPlayer에 자동 힌트 상태를 메시지·키워드·추천 줄 번호까지 저장하는 구조를 도입하고, ExplanationPanel에서 "Diff에서 바로 보기" 버튼을 제공해 추천 줄을 즉시 하이라이트하도록 연결
- CodeDiffView가 외부에서 줄 포커스를 제어할 수 있게 하고, 자동 힌트가 있을 때 Diff 뷰를 열어 같은 줄을 강조하거나, 집중 모드/차이만 보기 등을 함께 사용할 수 있도록 상태 동기화를 추가

### 변경 이유
- 오류 메시지를 기반으로 어떤 설명을 참고해야 하는지 구체적으로 안내하고, 추천된 설명을 확인한 뒤 바로 Diff 뷰에서 해당 줄을 비교하도록 동선을 단축하기 위함

### 수정된 파일
- app/types/lesson.ts
- app/data/explanationKeywords.ts
- app/data/lessons.ts
- app/components/LessonPlayer.tsx
- app/components/ExplanationPanel.tsx
- app/components/CodeDiffView.tsx
- docs/dev-log-ko.md

### 확인 방법
- `npm run dev` 후 `/language/javascript`에서 의도적으로 오타를 내 Runtime 오류를 발생시키면, ExplanationPanel에 자동 힌트 배지와 "Diff에서 바로 보기" 버튼이 나타나고 클릭 시 Diff 뷰가 열리며 추천 줄이 하이라이트되는지 확인
- 같은 화면에서 키워드 맵이 없는 레슨(예: Python, Swift)에서도 힌트가 정상적으로 작동하며, Diff 뷰의 "선택 초기화" / "차이만 보기" 토글이 외부 포커스와 동기화되는지 확인

### 남은 과제
- 자동 힌트가 여러 줄을 추천하는 경우를 대비해 복수 줄 포커스나 히스토리 스택을 지원하고, 키워드 데이터가 레슨 파일에 직접 정의될 수 있도록 편집 워크플로를 정리할 필요가 있음

### 다음 작업 제안
- Console 로그 히스토리를 세션 단위로 저장해 실행 간 차이를 비교하거나, 자동 힌트 패널에서 추천 키워드 클릭 시 Monaco 에디터 내 해당 문자열을 탐색하는 기능을 추가해 수정 속도를 높이기

## 2026-03-16 (9)

### 작업 내용
- Explanation 데이터를 공식 키워드 맵(`app/data/explanationKeywords.ts`)으로 확장하고 LessonPlayer의 자동 힌트 매칭 로직이 해당 키워드를 우선 사용하도록 수정
- 자동 힌트가 발동되면 ExplanationPanel이 오류 메시지와 추천 키워드를 기반으로 단계별 가이드를 표시하고, LessonPlayer는 힌트 메시지를 저장·초기화하도록 상태 구조를 재정비
- LessonExplanation 타입에 `keywords` 필드를 추가해 향후 레슨 데이터에서도 명시적으로 키워드를 선언할 수 있게 준비

### 변경 이유
- 오류 메시지와 설명을 더 정확히 연결하고, 추천된 설명을 열었을 때 구체적인 다음 행동(키워드 재확인, Diff 집중 모드 활용 등)을 안내하기 위함

### 수정된 파일
- app/types/lesson.ts
- app/data/explanationKeywords.ts (신규)
- app/components/LessonPlayer.tsx
- app/components/ExplanationPanel.tsx

### 확인 방법
- `npm run dev` 후 JavaScript 레슨에서 `document.getElementById` 철자를 틀리게 입력하면 해당 오류 메시지가 ExplanationPanel을 자동으로 열고, 하단에 "자동 힌트 가이드" 박스가 나타나는지 확인
- 같은 화면에서 다른 설명을 수동으로 선택하면 힌트 배지가 사라지고, 오류를 다시 내면 최신 메시지와 키워드가 반영되는지 확인

### 남은 과제
- Python/Swift 등 다른 언어 레슨에도 키워드 맵을 확장하고, 키워드 정의를 레슨 데이터 소스에서 바로 편집할 수 있는 구조로 이전할 필요가 있음

### 다음 작업 제안
- Console 로그 히스토리를 저장해 실행 간 비교를 지원하거나, 자동 힌트에서 제안한 키워드에 바로 이동하는 퀵 링크를 추가해 학습 동선을 단축하기

## 2026-03-16 (8)

### 작업 내용
- ResultPreview가 runtime/console 오류 메시지를 부모로 전달하면 LessonPlayer가 해당 메시지를 토큰화해 가장 관련 있는 설명 카드를 자동으로 열고, ExplanationPanel에는 "오류 기반 힌트" 배지를 표시하도록 연동
- LessonPlayer에서 수동으로 설명을 선택하거나 레슨을 초기화하면 자동 힌트가 초기화되며, 로컬 상태로만 관리해 사용자가 직접 선택한 값이 항상 우선되도록 구성
- CodeDiffView에 줄 필터(차이만 보기), 줄 집중 모드, 인라인 문자 단위 하이라이트를 추가해 긴 코드에서도 필요한 부분만 확대해 비교할 수 있게 개선

### 변경 이유
- 오류를 만났을 때 어떤 설명을 참고해야 하는지 즉시 안내하고, diff 비교도 필요한 구간만 좁혀 볼 수 있게 해 초보자가 스스로 문제를 해결하는 흐름을 강화하기 위함

### 수정된 파일
- app/components/ExplanationPanel.tsx
- app/components/LessonPlayer.tsx
- app/components/ResultPreview.tsx
- app/components/CodeDiffView.tsx
- docs/dev-log-ko.md

### 확인 방법
- `npm run dev` 후 JavaScript 레슨에서 의도적으로 DOM 관련 오류를 내면 ExplanationPanel에서 해당 주제 카드가 자동으로 열리고, 배지에 "오류 기반 힌트" 문구가 표시되는지 확인
- 같은 화면에서 diff 카드의 "차이만 보기" 토글과 줄 번호 뱃지를 눌러 특정 줄만 표시되며, 변경된 줄은 문자 단위로 노란색 하이라이트가 적용되는지 확인

### 남은 과제
- 오류 메시지와 설명 매칭 로직이 간단한 키워드 기반이므로, 추후 레슨 데이터에 명시적인 `keywords` 메타데이터를 추가해 정확도를 높일 필요가 있음

### 다음 작업 제안
- Console 로그를 히스토리 형태로 저장해 실행 간 차이를 비교하거나, ExplanationPanel에 오류 해결 단계를 순차적으로 안내하는 멀티 단계 힌트를 도입

## 2026-03-16 (7)

### 작업 내용
- LessonPlayer에 "정답 대비 코드 차이" 카드와 CodeDiffView 컴포넌트를 추가해 타이핑 중에도 정답과 입력 코드를 줄 단위로 비교·하이라이트할 수 있도록 하고, 레슨이 바뀌면 자동으로 접히도록 처리
- ResultPreview iframe에 `console.log/info/warn/error` 가로채기 로직을 주입하고, 부모 컴포넌트에서 로그 패널·초기화 버튼·타임스탬프 표시를 제공해 JavaScript 레슨 디버깅 흐름을 개선
- 기존 runtime/console 오류 패널과 연동해 코드 변경·미리보기 새로고침 시 오류·로그 상태가 함께 초기화되도록 정리

### 변경 이유
- 정답과의 차이를 즉시 확인해 스스로 수정해야 하는 부분을 빠르게 파악하게 하고, console 출력/오류 메시지를 한 화면 안에서 확인하도록 해 타이핑 학습 피드백을 강화하기 위함

### 수정된 파일
- app/components/CodeDiffView.tsx (신규)
- app/components/LessonPlayer.tsx
- app/components/ResultPreview.tsx
- docs/dev-log-ko.md

### 확인 방법
- `npm run dev` 후 `/language/html` 레슨에서 Monaco 에디터 아래 "정답 대비 코드 차이" 버튼을 눌러 줄 단위 diff가 표시되고, 입력 변경 시 즉시 반영되는지 확인
- JavaScript 레슨 코드에 `console.log('hello')` 혹은 의도적 오류를 넣고 레슨 완료 시 미리보기 하단 Console 패널에 로그가 쌓이고, Runtime/Console 오류 패널이 동시에 나타나는지 확인
- "로그 지우기" 또는 "미리보기 새로고침"을 누르면 로그·오류 패널이 초기화되고 새 결과만 남는지 확인

### 남은 과제
- Diff 뷰가 줄 단위 비교만 제공하므로, 향후 문자 단위 하이라이트나 자동 수정 제안 등 추가 피드백을 연구할 필요가 있음

### 다음 작업 제안
- ExplanationPanel과 오류 메시지를 연동해 특정 오류 발생 시 해당 설명 카드가 자동 활성화되도록 연결하고, Console 로그 히스토리를 collapsible 리스트로 확장해 여러 오류를 순차적으로 복기할 수 있게 하기

## 2026-03-16 (6)

### 작업 내용
- ResultPreview iframe에 실행 중 오류를 전파하는 스크립트를 주입해 `window.onerror`와 `console.error`를 감지하고, 부모 컴포넌트로 postMessage를 보낸 뒤 UI에 오류 패널을 표시하도록 구현
- 미리보기를 새로고침하거나 코드가 바뀌면 이전 오류 상태가 자동으로 초기화되고, 오류가 있을 경우에는 타입(Runtime/Console)과 위치 정보를 함께 노출해 디버깅 단서를 제공

### 변경 이유
- 레슨을 완료했는데도 결과가 나오지 않을 때 학습자가 즉시 원인을 파악하고 수정할 수 있도록 피드백 루프를 단축하기 위함

### 수정된 파일
- app/components/ResultPreview.tsx
- docs/dev-log-ko.md

### 확인 방법
- `npm run dev` 후 `/language/html` 레슨에서 의도적으로 `undefined` 변수를 참조하는 스크립트를 작성하고, 레슨 완료 시 미리보기 하단에 Runtime 오류 메시지가 나타나는지 확인
- 오류 수정 후 "미리보기 새로고침" 버튼을 누르면 경고가 사라지고 정상 결과가 렌더링되는지 확인

### 남은 과제
- iframe에서 수집한 오류 메시지를 ExplanationPanel과 연동하거나, 여러 개의 오류 로그를 순차적으로 볼 수 있는 히스토리 UI가 필요

### 다음 작업 제안
- 사용자가 현재 입력 중인 코드와 정답 코드의 차이를 간단히 비교(diff)하는 기능을 설계해, 오류 메시지와 함께 보다 구체적인 가이드를 제공

## 2026-03-16 (5)

### 작업 내용
- ResultPreview를 iframe 기반 샌드박스로 바꿔 사용자가 타이핑한 실제 코드를 렌더링하고, 새 탭 열기·미리보기 새로고침 조작을 추가
- LessonPlayer가 Monaco 에디터 입력값을 미리보기로 전달하며, 완료된 레슨의 타이핑된 코드가 그대로 실행되도록 연결
- Monaco 입력 영역을 명시적으로 안내하고, 레슨 정답 코드는 필요 시 열어 보는 레퍼런스로 이동시켜 입력 영역이 곧 Monaco임을 분명히 함
- 페이지 입장 직후에도 Monaco 인라인 힌트가 자동으로 노출되도록 트리거를 추가해 첫 타자 전에 고스트 텍스트가 바로 보이게 조정

### 변경 이유
- 레슨을 완료했을 때 학습자가 직접 입력한 결과물을 즉시 확인하게 해 타이핑 경험의 보상을 높이기 위해

### 수정된 파일
- app/components/ResultPreview.tsx
- app/components/LessonPlayer.tsx
- docs/dev-log-ko.md

### 확인 방법
- `npm run dev` 후 `/language/html` 레슨을 완료하면 ResultPreview가 사용자가 입력한 코드로 렌더링되고 새 탭/새로고침 버튼이 동작하는지 확인
- 같은 화면에서 입력 섹션이 Monaco Editor로만 구성되고, "레슨 코드 참고" 토글을 열었을 때만 정답 코드가 표시되는지 확인
- 레슨 페이지에 진입하자마자 Monaco 에디터에 흐릿한 힌트 텍스트가 즉시 나타나는지 확인

### 남은 과제
- 샌드박스 미리보기에서 추가적인 보안 옵션(예: 콘솔 출력 보기, 오류 표시)을 노출해 학습 피드백을 강화할 필요가 있음

### 다음 작업 제안
- 결과 iframe에 오류 메시지를 캡처해 설명 패널과 연동하거나, 사용자가 원하는 경우 lesson 코드와 비교 diff를 제공하는 기능 설계

## 2026-03-16 (4)

### 작업 내용
- TypingInput을 Monaco Editor 기반으로 교체하고 언어별 하이라이트, 자동 완성, 다중 커서를 지원하도록 구성
- LessonPlayer에 타이핑할 레슨 코드를 별도 패널로 노출해 학습자가 참조하며 입력할 수 있도록 개선
- 언어별 레슨 페이지에서 LessonPlayer에 에디터 언어 정보를 전달해 Monaco가 올바른 모드를 적용하도록 연결

### 변경 이유
- 초보자가 실제 IDE와 유사한 환경에서 연습하면서도 코드 참고 영역을 분리해 학습 집중도를 높이기 위해

### 수정된 파일
- app/components/TypingInput.tsx
- app/components/LessonPlayer.tsx
- app/language/[languageId]/page.tsx
- docs/dev-log-ko.md

### 확인 방법
- `npm run dev` 실행 후 `/language/html`에 접속해 레슨 에디터가 Monaco UI로 표시되고 언어별 문법 하이라이트·자동 완성이 동작하는지 확인
- 같은 화면에서 "타이핑할 코드" 패널의 내용을 참고하며 에디터에 동일한 코드를 입력했을 때 진행률이 업데이트되는지 확인

### 남은 과제
- ResultPreview가 여전히 Lesson 데이터의 `expectedResult`만 보여 주므로, 사용자가 입력한 실제 코드를 안전하게 렌더링하는 개선이 필요

### 다음 작업 제안
- Monaco 에디터에서 제출 시 정답 비교/자동 정렬 옵션을 추가하고, 미완성 상태에서 차이를 시각화하는 피드백 UI를 설계

## 2026-03-14 (18)

### 작업 내용
- 랜딩/언어/레슨 단계 전환 시 페이드 인·아웃 애니메이션을 적용해 화면 전환이 부드럽게 느껴지도록 조정
- LandingInput에 고스트 텍스트를 추가해 "Hello typingScript" 및 현재 캐러셀 언어 이름을 채워 나가는 경험을 제공
- 언어 캐러셀이 강조 중인 언어명을 인풋 힌트로 자동 반영하고, 준비 중인 언어를 입력하면 Coming Soon 모달을 통해 안내

### 변경 이유
- 인터랙션을 타이핑 경험 중심으로 단순화하면서도 각 단계가 자연스럽게 이어지도록 시각적 완성도를 높이기 위해

### 수정된 파일
- app/page.tsx
- app/components/LandingInput.tsx
- app/components/LanguageCarousel.tsx
- docs/dev-log-ko.md

### 확인 방법
- 랜딩 → 언어 → 레슨 단계 이동 시 화면이 페이드되며 전환되는지 확인
- "Hello typingScript" 입력 시 고스트 텍스트가 채워지고, 언어 캐러셀 활성 카드 이름이 인풋 힌트로 표시되는지 확인
- 준비 중 언어 이름을 입력하면 모달이 나타나고 닫기 버튼으로 복귀할 수 있는지 확인

## 2026-03-14 (19)

### 작업 내용
- 레슨 화면 상단에 "랜딩으로 돌아가기" 버튼과 진행 현황(완료/총 레슨, 현재 순서) 정보를 추가해 전체 코스 상태를 즉시 파악하도록 함
- 언어 데이터에 샘플 코드/결과 설명을 추가하고 캐러셀 카드에 미리보기 블록을 표시해 선택 전 정보를 제공 (요청된 Swiper 라이브러리는 현재 환경상 설치 불가하여 기존 캐러셀을 확장하는 방식으로 처리)
- Coming Soon 모달에 이메일 입력란을 넣어 새 언어 오픈 알림 구독을 임시 리스트에 저장할 수 있도록 구현

### 변경 이유
- 언어/레슨 간 전환 유연성을 높이고, 언어 선택 단계에서 정보를 풍부하게 제공하며 향후 출시 알림 수요를 파악하기 위해

### 수정된 파일
- app/data/languages.ts
- app/components/LanguageCarousel.tsx
- app/page.tsx
- docs/dev-log-ko.md

### 확인 방법
- 레슨 화면에서 "랜딩으로 돌아가기" 버튼을 눌러 초기 인사 화면으로 이동되는지 확인
- 언어 캐러셀 카드에 샘플 코드와 설명이 표시되는지 확인
- 준비 중 언어를 입력한 뒤 모달에 이메일을 입력하고 닫기 버튼으로 정상 복귀되는지 확인

## 2026-03-15

### 작업 내용
- Swiper(Autoplay/Pagination 모듈)를 적용해 언어 캐러셀이 자동 슬라이드/페이지네이션을 지원하도록 교체
- Glass 스타일을 밝은 톤으로 리셋하고 Ant Design Card/Button/Modal/Typo/UI 요소로 레이아웃을 정돈
- Coming Soon 모달을 Ant Design Modal+Input+Button 조합으로 교체하고 이메일 저장 흐름을 개선

### 변경 이유
- 랜딩~레슨 전반의 경험을 typingScript 특유의 미래지향적 Glass UI로 통일하기 위함

## 2026-03-15 (2)

### 작업 내용
- Ant Design 카드/모달 기반 UI를 제거하고 초기 커스텀 레이아웃으로 복귀하면서도 Swiper 캐러셀은 유지
- 배경/패널 색상을 밝은 라이트 테마로 되돌리고 Coming Soon 모달도 커스텀 스타일로 정리

## 2026-03-15 (3)

### 작업 내용
- 다크 모드에서도 항상 밝은 배경이 유지되도록 `color-scheme: light`와 고정 배경 색을 설정
- 랜딩 헤더에 `public/logo.png` 이미지를 사용해 브랜드 로고를 표시하고 기존 텍스트 헤더를 대체

### 변경 이유
- 시스템 다크 모드와 관계없이 동일한 밝은 경험을 유지하고, 공식 로고를 통해 첫 화면의 브랜딩을 강화하기 위해

### 수정된 파일
- app/globals.css
- app/page.tsx
- docs/dev-log-ko.md

### 확인 방법
- 다크 모드/라이트 모드 전환 시에도 배경이 밝게 유지되는지 확인
- 랜딩 페이지 상단에 로고 이미지와 문구가 올바르게 표시되는지 확인

## 2026-03-15 (4)

### 작업 내용
- 언어 선택 캐러셀에 Python, Swift 카드를 추가해 향후 코스 확장 준비
- 각 카드에 샘플 코드/결과를 제공해 선택 전에 언어 특성을 미리 보여줌

### 변경 이유
- HTML 외 다른 언어를 예고해 사용자에게 로드맵을 전달하기 위해

### 수정된 파일
- app/data/languages.ts
- docs/dev-log-ko.md

### 확인 방법
- 언어 캐러셀에서 Python과 Swift 카드가 표시되고 Coming Soon 모달 안내가 정상 동작하는지 확인

## 2026-03-16 (3)

### 작업 내용
- 언어 카드에 진행률 바와 "계속하기" 버튼을 추가해 각 언어의 학습 상태를 요약
- 레슨 페이지 상단 카드에 레슨 수, 예상 소요, 추천 순서, 진행률을 함께 표시하고 모든 레슨을 완료하면 다음 언어로 이동하는 CTA를 노출
- LessonPlayer 진행 정보를 `localStorage`에 저장/로드하여 `/language` 페이지와 레슨 페이지에서 공유 링크를 생성할 때 최신 인덱스를 사용

### 변경 이유
- 여러 언어 레슨을 오가며 학습할 때 현재 위치를 분명히 알리고 흐름을 자연스럽게 이어가도록 하기 위해

### 수정된 파일
- app/language/page.tsx
- app/language/[languageId]/page.tsx
- app/components/LessonPlayer.tsx
- app/components/CourseCompletionSummary.tsx
- app/lib/progress.ts
- docs/codebase-overview-ko.md
- docs/dev-log-ko.md

### 확인 방법
- `/language` 페이지에서 각 언어 카드에 진행률 바와 버튼이 표시되는지 확인
- 언어 레슨을 마치면 다음 언어 CTA가 나타나는지, 카드 버튼으로 바로 이동할 수 있는지 확인

## 2026-03-16

### 작업 내용
- 라우팅을 `/`, `/language`, `/language/[언어]` 구조로 분리하여 각 화면을 독립 페이지로 구성
- 랜딩 페이지는 단순 인사 입력만 담당하고, 언어 선택 페이지는 캐러셀/입력 UI, 학습 페이지는 LessonPlayer 전용으로 변경
- 언어별 레슨 페이지에서 `?lesson=` 쿼리를 사용해 특정 레슨부터 시작할 수 있도록 `LessonPlayer`에 초기 인덱스 전달 기능 추가

### 변경 이유
- 멀티 스테이지 UI를 루트에 모두 넣지 않고 명확한 URL 구조를 제공해 네비게이션을 개선하기 위해

### 수정된 파일
- app/page.tsx
- app/language/page.tsx (신규)
- app/language/[languageId]/page.tsx (신규)
- app/components/LessonPlayer.tsx
- app/data/languages.ts
- docs/dev-log-ko.md

### 확인 방법
- `/`에서 Hello typingScript 입력 시 `/language`로 이동하는지 확인
- `/language`에서 언어 이름을 입력해 `/language/html`로 이동하는지, 준비 중 언어는 메시지가 표시되는지 확인
- `/language/html?lesson=2`처럼 직접 접근 시 해당 레슨부터 LessonPlayer가 시작되는지 확인

### 변경 이유
- Ant Design 적용 후 레이아웃이 무너진 문제를 해결하고 안정적인 디자인으로 되돌리기 위해

### 수정된 파일
- app/globals.css
- app/page.tsx
- app/components/LandingInput.tsx
- app/components/LanguageCarousel.tsx
- app/components/LessonPlayer.tsx
- app/components/CourseProgressSummary.tsx
- app/components/LessonNavigator.tsx
- app/components/CourseCompletionSummary.tsx
- app/components/ResultPreview.tsx
- app/components/ExplanationPanel.tsx
- app/components/TypingInput.tsx
- app/components/CompletionNotice.tsx
- app/components/ProgressIndicator.tsx
- docs/dev-log-ko.md

### 확인 방법
- 랜딩/레슨 화면이 커스텀 카드 스타일로 깨끗하게 렌더링되는지 확인
- 언어 캐러셀이 Swiper 슬라이드와 페이지네이션을 유지하며 정상 동작하는지 확인

### 수정된 파일
- app/globals.css
- app/page.tsx
- app/components/LandingInput.tsx
- app/components/LanguageCarousel.tsx
- app/components/LessonPlayer.tsx
- app/components/CourseProgressSummary.tsx
- app/components/LessonNavigator.tsx
- app/components/CourseCompletionSummary.tsx
- app/components/ResultPreview.tsx
- app/components/ExplanationPanel.tsx
- app/components/TypingInput.tsx
- app/components/CompletionNotice.tsx
- app/components/ProgressIndicator.tsx
- docs/dev-log-ko.md

### 확인 방법
- 랜딩/레슨/모달 등 모든 주요 패널이 반투명 + blur Glass 스타일로 표현되는지 확인
- 편집기/미리보기/설명 패널의 텍스트 대비가 충분하고 야간 톤에서도 가독성이 유지되는지 확인

## 2026-03-14 (17)

### 작업 내용
- 랜딩 화면을 대형 로고 + 단일 인풋과 단순 문구로 축소해 시선을 집중시키고, 언어 선택 단계에서만 캐러셀이 보이도록 변경
- 단계 전환 시 전반적 페이드 애니메이션 느낌을 추가해 부드러운 화면 전환이 이루어지도록 함

### 변경 이유
- 첫 방문 시 복잡한 설명을 제거하고 "Hello typingScript" → 언어 입력 흐름에만 집중하도록 UX를 단순화하기 위해

### 수정된 파일
- app/page.tsx
- docs/dev-log-ko.md

### 확인 방법
- 랜딩 페이지에 "TypingScript" 로고와 입력창, 짧은 안내만 남아 있는지 확인
- "Hello typingScript" 입력 후 언어 캐러셀로 전환될 때 부드럽게 전환되는지 확인

## 2026-03-14 (16)

### 작업 내용
- 랜딩 화면을 도입해 "Hello typingScript"를 직접 입력하면 언어 선택 단계로 이동하도록 구현
- 자동 재생 언어 캐러셀과 공용 인풋 UI를 추가하고, 언어 이름을 타이핑하면 해당 코스로 진입하도록 설계
- 언어 선택 후 LessonPlayer를 기존 플로우대로 렌더링하면서 다른 언어로 돌아갈 수 있는 버튼을 제공

### 변경 이유
- 지루한 리스트 대신 타이핑 중심의 체험형 랜딩 → 언어 선택 → 레슨 흐름을 만들어 첫인상을 강화하기 위해

### 수정된 파일
- app/page.tsx
- app/data/languages.ts (신규)
- app/components/LandingInput.tsx (신규)
- app/components/LanguageCarousel.tsx (신규)
- docs/dev-log-ko.md

### 확인 방법
- 첫 화면에서 "Hello typingScript"를 정확히 입력하면 언어 캐러셀 단계로 이동하는지 확인
- 언어 단계에서 "HTML"을 타이핑하면 코스가 시작되고, 다른 언어 선택 버튼으로 돌아갈 수 있는지 확인
- 준비되지 않은 언어 이름을 입력하면 안내 메시지가 표시되는지 확인

## 2026-03-14 (15)

### 작업 내용
- Lesson Workspace 영역에 "이 레슨 다시 하기" 버튼을 추가해 현재 레슨만 초기화할 수 있도록 함
- 자동 저장 상태를 알려주는 "저장됨" 배지를 추가하고 localStorage 저장 시각을 표시
- 모바일에서 입력/미리보기를 탭 형태로 전환해 화면 공간을 절약하고, Result Preview는 동일 UI를 재사용

### 변경 이유
- 학습자가 특정 레슨만 재시작하거나 저장 상황을 쉽게 파악하고, 모바일에서도 불필요한 스크롤 없이 편집/미리보기를 전환하도록 하기 위함

### 수정된 파일
- app/components/LessonPlayer.tsx
- docs/dev-log-ko.md

### 확인 방법
- 레슨 진행 중 "이 레슨 다시 하기" 버튼을 눌러 해당 레슨 입력/설명이 초기화되는지 확인
- 입력을 조금 한 뒤 저장 배지에 최근 시각이 표시되는지 확인
- 모바일 뷰에서 "입력/미리보기" 탭이 전환되며 각각의 영역이 표시되는지 확인

## 2026-03-14 (14)

### 작업 내용
- 모든 lesson 완료 시 상단에 CourseCompletionSummary 카드를 표시해 간단한 복습 목록을 제공
- LessonPlayer 진행 상태(currentIndex, 입력 내용, 설명 선택)를 localStorage에 저장/복원해 새로고침 후에도 이어서 학습 가능하도록 구현
- LessonNavigator를 client 컴포넌트로 전환하고 모바일에서 접힘/펼침 토글을 추가해 작은 화면 사용성을 개선

### 변경 이유
- 코스 완주 후 요약 정보를 제공해 학습 성취를 명확히 하고, 진척 데이터를 브라우저에 보존하며, 모바일 환경에서도 레슨 이동을 쉽게 하기 위해

### 수정된 파일
- app/components/CourseCompletionSummary.tsx (신규)
- app/components/LessonPlayer.tsx
- app/components/LessonNavigator.tsx
- docs/dev-log-ko.md

### 확인 방법
- 모든 레슨을 완료하면 상단에 CourseCompletionSummary 카드가 나타나는지 확인
- 레슨 중 새로고침 후에도 현재 레슨과 입력 내용이 유지되는지 확인
- 모바일 뷰에서 Lesson Flow 영역이 접히고 버튼으로 펼칠 수 있는지 확인

## 2026-03-14 (13)

### 작업 내용
- ResultPreview 새 탭 열기 기능을 버튼 + window.open 방식으로 전환해 data URL이 차단되어 about:blank만 뜨던 문제를 해결

### 변경 이유
- 브라우저 안전 정책으로 data URL 링크가 렌더되지 않던 이슈를 해결하기 위해

### 수정된 파일
- app/components/ResultPreview.tsx
- docs/dev-log-ko.md

### 확인 방법
- lesson을 완료한 뒤 "새 탭에서 열기" 버튼을 클릭해 실제 HTML이 새 창에서 제대로 표시되는지 확인

## 2026-03-14 (12)

### 작업 내용
- 모든 레슨을 완료했을 때 코스를 다시 시작할 수 있는 CTA 버튼을 추가해 학습 흐름을 반복할 수 있도록 함
- CourseProgressSummary에 "새로고침 시 진행 초기화" 안내 배지를 넣어 사용자의 기대치를 명확히 함
- ResultPreview에 "새 탭에서 열기" 링크를 추가해 결과를 별도 페이지에서도 확인할 수 있도록 개선

### 변경 이유
- 코스 완주 이후의 행동을 제시하고, 진행 데이터가 브라우저에 한정된다는 점과 미리보기 활용 방식을 명확히 설명하기 위해

### 수정된 파일
- app/components/LessonPlayer.tsx
- app/components/CourseProgressSummary.tsx
- app/components/ResultPreview.tsx
- docs/dev-log-ko.md

### 확인 방법
- 모든 레슨을 마치면 "코스 다시 시작하기" 버튼이 나타나고 누르면 첫 레슨 상태가 초기화되는지 확인
- 상단 진행 요약에 새로고침 안내 배지가 표시되는지 확인
- 결과 미리보기 완료 상태에서 "새 탭에서 열기" 링크가 동작하는지 확인

## 2026-03-14 (11)

### 작업 내용
- TypingInput에서 Tab 키를 입력하면 두 칸 들여쓰기가 삽입되도록 처리해 포커스가 다른 요소로 이동하지 않도록 변경
- 입력 중 스크롤 위치가 유지되도록 container scrollTop을 저장 후 복원해 한 줄을 다 입력해도 코드 영역이 위로 점프하지 않게 함

### 변경 이유
- 실제 에디터처럼 Tab 들여쓰기를 지원하고, 입력 시 화면이 튀는 현상을 방지해 타이핑 경험을 매끄럽게 만들기 위해

### 수정된 파일
- app/components/TypingInput.tsx
- docs/dev-log-ko.md

### 확인 방법
- lesson 편집기에서 Tab 키를 눌러 들여쓰기가 삽입되는지, 포커스가 이동하지 않고 스크롤도 그대로 유지되는지 확인

## 2026-03-14 (10)

### 작업 내용
- ResultPreview 아래에 안전 안내 문구를 추가해 렌더링되는 HTML이 그대로 실행된다는 점을 명시
- TypingInput의 힌트 텍스트 색상을 단일 회색으로 통일해 사용자가 아직 입력하지 않은 부분이 차분하게 보이도록 조정

### 변경 이유
- 결과 미리보기의 성격을 분명히 하여 신뢰하지 않는 코드 입력을 피하도록 돕고, 힌트 텍스트는 편안한 가독성을 유지하기 위해

### 수정된 파일
- app/components/ResultPreview.tsx
- app/components/TypingInput.tsx
- docs/dev-log-ko.md

### 확인 방법
- lesson 완료 후 결과 미리보기 아래에 안전 안내 문구가 표시되는지 확인
- 편집기에서 아직 입력하지 않은 텍스트가 일관된 회색으로 나타나는지 확인

## 2026-03-14 (9)

### 작업 내용
- ExplanationPanel 버튼에 현재 선택된 항목 뱃지를 추가하고, 아래 설명 영역에 "현재 설명" 라벨을 표시해 가시성을 강화

### 변경 이유
- 어떤 설명을 보고 있는지 분명하게 표현하여 학습자가 레슨 포인트를 더 쉽게 추적할 수 있도록 하기 위해

### 수정된 파일
- app/components/ExplanationPanel.tsx
- docs/dev-log-ko.md

### 확인 방법
- lesson player에서 설명 항목을 클릭하면 해당 버튼에 "선택됨" 뱃지가 나타나고, 하단 설명 상단에 "현재 설명" 라벨이 출력되는지 확인

## 2026-03-14 (8)

### 작업 내용
- CourseProgressSummary 컴포넌트를 추가해 총 레슨 수, 완료 수, 현재 위치, 퍼센트를 간결하게 보여주고 진행 바를 렌더링
- LessonPlayer에서 기존 완료 상태 계산을 재사용해 요약 컴포넌트에 전달하고 Lesson Navigator 위에 배치

### 변경 이유
- 여러 레슨을 진행할 때 전체 진척도를 상단에서 한눈에 확인할 수 있도록 하기 위해

### 수정된 파일
- app/components/CourseProgressSummary.tsx (신규)
- app/components/LessonPlayer.tsx
- docs/dev-log-ko.md

### 확인 방법
- `npm run dev` 실행 후 lesson player 상단에 총 레슨/완료 레슨 수와 진행 바가 정확한 숫자와 퍼센트로 표시되는지 확인

## 2026-03-14 (7)

### 작업 내용
- lesson 목록을 한눈에 볼 수 있는 LessonNavigator 컴포넌트를 추가해 레슨 순서, 제목, 설명을 카드 형태로 노출
- LessonPlayer에서 각 레슨의 진행 상태(현재/완료/예정)를 계산해 내비게이터에 전달하고 클릭 시 해당 레슨으로 이동하도록 핸들러 연결
- 기존 Next Lesson 버튼과 입력/설명 상태 보존 로직을 유지해 어디서든 학습 상태를 계속 이어갈 수 있도록 함

### 변경 이유
- 학습자가 전체 코스 흐름을 미리 파악하고 이미 완료한 레슨으로도 쉽게 돌아갈 수 있게 하기 위해

### 수정된 파일
- app/components/LessonNavigator.tsx (신규)
- app/components/LessonPlayer.tsx
- docs/dev-log-ko.md

### 확인 방법
- `npm run dev` 실행 후 상단 Lesson Flow 카드에서 레슨을 클릭해 즉시 이동 가능한지 확인
- 완료한 레슨은 초록색, 현재 레슨은 남색, 나머지는 흰색 카드로 표시되는지 확인
- Next Lesson 버튼과 완료 메시지가 기존과 동일하게 동작하는지 확인

## 2026-03-14 (6)

### 작업 내용
- lesson 데이터를 배열 형태로 확장하고 HTML/CSS 예제 3개를 정의
- LessonPlayer가 현재 레슨 인덱스를 상태로 관리하도록 리팩터링하고 입력/설명 상태를 레슨 ID별로 분리 저장
- 레슨 완료 시 "Next Lesson" 버튼을 노출하고 마지막 레슨 완료 시 전체 코스 축하 메시지를 보여줌
- 루트 페이지가 단일 레슨 대신 전체 lesson 배열을 전달하도록 변경

### 변경 이유
- 한 번의 방문으로 여러 lesson을 연속 학습할 수 있는 최소한의 플로우를 제공하기 위해

### 수정된 파일
- app/data/lessons.ts
- app/components/LessonPlayer.tsx
- app/page.tsx
- docs/dev-log-ko.md

### 확인 방법
- `npm run dev` 실행 후 첫 lesson을 완료하면 Next 버튼이 나타나고, 버튼 클릭 시 다음 lesson 내용과 입력 상태가 초기화되는지 확인
- 마지막 lesson까지 완료하면 코스 완료 메시지가 표시되는지 확인

## 2026-03-14 (5)

### 작업 내용
- HTML 태그/문자열/일반 텍스트를 구분하는 간단한 토크나이저를 TypingInput에 추가
- 토큰 타입별 색상 팔레트를 정의해 입력된 코드와 남은 힌트에 다른 색을 적용
- 커서 라인에 깜박이는 가이드와 기존 정답/오답 로직을 유지해 syntax highlighting만 확장

### 변경 이유
- 코드 에디터처럼 태그나 문자열이 색으로 구분되면 학습자가 구조를 더 쉽게 파악할 수 있기 때문

### 수정된 파일
- app/components/TypingInput.tsx
- docs/dev-log-ko.md

### 확인 방법
- `npm run dev` 실행 후 lesson player 편집기에서 HTML 태그가 파란 계열, 문자열이 주황 계열, 일반 텍스트가 기본색으로 표시되는지, 타이핑 시에도 동일하게 유지되는지 확인

## 2026-03-14 (4)

### 작업 내용
- 입력 컴포넌트를 editor 스타일 UI로 교체하고 lesson 코드 전체를 힌트 텍스트로 표시
- 입력된 문자, 남은 문자, 현재 커서 위치를 각각 다른 색상/요소로 구분
- 간단한 행 번호를 추가해 타이핑 경험을 코드 에디터에 가깝게 개선
- LessonPlayer 레이아웃에서 코드 표시 영역 없이 새로운 편집기만 사용하도록 정리

### 변경 이유
- 학습자가 실제 코드 편집기와 유사한 감각으로 lesson을 따라 입력할 수 있도록 하기 위함

### 수정된 파일
- app/components/TypingInput.tsx
- app/components/LessonPlayer.tsx
- docs/dev-log-ko.md

### 확인 방법
- `npm run dev` 실행 후 lesson player에서 편집 영역을 클릭하고 타이핑하여 입력된 부분이 녹색, 오타가 빨간색, 남은 힌트가 회색으로 보이며 행 번호가 표시되는지 확인

## 2026-03-14 (3)

### 작업 내용
- lesson schema에 `explanations` 배열과 각 항목의 `id`, `label`, `text` 필드를 추가
- starter lesson에 두 개의 설명 아이템을 작성
- `ExplanationPanel` 컴포넌트를 추가해 설명 목록과 선택 시 상세 내용을 보여주는 MVP UI 구현
- LessonPlayer에서 설명 선택 상태를 관리하고 결과 미리보기 아래에 패널을 렌더링

### 변경 이유
- 학습자가 코드의 의도를 빠르게 이해할 수 있도록 최소한의 안내 패널을 제공하기 위함

### 수정된 파일
- app/types/lesson.ts
- app/data/lessons.ts
- app/components/LessonPlayer.tsx
- app/components/ExplanationPanel.tsx (신규)
- docs/dev-log-ko.md

### 확인 방법
- `npm run dev` 실행 후 lesson player 화면에서 설명 버튼을 클릭해 각 라벨별 설명이 패널에 표시되는지 확인

## 2026-03-14 (2)

### 작업 내용
- `Lesson` 타입을 별도 파일로 추출하여 모든 컴포넌트가 공유할 수 있도록 정리
- starter lesson 데이터를 `app/data/lessons.ts`로 이동해 페이지와 분리
- 루트 페이지가 데이터 파일에서 lesson을 import하도록 수정

### 변경 이유
- lesson 구조와 데이터 소스를 분리해 이후 여러 lesson을 추가하거나 교체하기 쉽게 만들기 위해

### 수정된 파일
- app/types/lesson.ts (신규)
- app/data/lessons.ts (신규)
- app/components/LessonPlayer.tsx
- app/page.tsx
- docs/dev-log-ko.md

### 확인 방법
- `npm run dev`로 앱을 실행해 기존과 동일하게 lesson player가 보이고, 동작(입력/진행률/완료/미리보기)이 그대로인지 확인

## 2026-03-14

### 작업 내용
- 단일 lesson player 화면의 현재 구조를 정리하고 문서화
- 코드 표시, 타이핑 입력, 진행률, 완료/미리보기 동작을 확인하며 플로우를 요약
- 한국어 코드베이스 개요 문서를 추가해 파일 역할과 데이터 흐름 설명

### 변경 이유
- 새로운 기여자가 바로 MVP 상태를 이해하고 다음 작업을 고를 수 있도록 하기 위해

### 수정된 파일
- docs/dev-log-ko.md
- docs/codebase-overview-ko.md

### 확인 방법
- `docs/dev-log-ko.md` 최신 항목 확인
- `docs/codebase-overview-ko.md`에서 파일 구조, 데이터 플로우, 다음 단계 확인

## 2026-03-13

### 작업 내용
- 단일 lesson player MVP 화면 생성
- 기본 lesson mock 데이터 추가
- 코드 표시 / 입력창 / 진행률 / 완료 상태 / 결과 미리보기 컴포넌트 추가
- 메타데이터를 typingScript용으로 수정

### 변경 이유
- 첫 번째 vertical slice로 "한 개의 lesson이 실제로 동작하는가"를 확인하기 위해

### 수정된 파일
- app/page.tsx
- app/layout.tsx
- app/components/LessonPlayer.tsx
- app/components/CodeDisplay.tsx
- app/components/TypingInput.tsx
- app/components/ProgressIndicator.tsx
- app/components/CompletionNotice.tsx
- app/components/ResultPreview.tsx

### 확인 방법
- `npm run dev`
- 메인 페이지 접속
- 제시된 코드를 입력창에 따라 입력
- 진행률이 증가하는지 확인
- 완료 시 완료 문구와 결과 미리보기가 보이는지 확인

### 남은 점
- 현재는 단일 lesson만 존재
- explanation panel은 아직 placeholder 수준
- 실제 lesson schema 확장이 필요
- 타자 판정 로직은 더 정교해질 수 있음

### 다음 작업 제안
- lesson schema 분리
- mock lesson 데이터를 별도 파일로 이동
- explanation panel MVP 추가
- JavaScript 레슨을 `available` 상태로 열어 `/language/javascript`에서도 학습할 수 있도록 데이터와 맵핑을 업데이트
- `/language/[언어]` 헤더에 "공유 링크 복사" 버튼을 추가해 현재 진행 중인 레슨 URL을 손쉽게 복사할 수 있도록 개선

## 2026-03-16 (2)

### 작업 내용
- CSS, Python, Swift 카드 상태를 `available`로 전환해 `/language/css`, `/language/python`, `/language/swift` 경로에서도 곧 레슨을 붙일 수 있도록 준비
- `languageLessonsMap`은 이미 레슨 세트를 포함하고 있으므로, 상태만 바꿔도 학습 진입이 가능하게 설정

## 2026-03-16 (3)

### 작업 내용
- 언어 카드에 진행률 바와 "계속하기" 버튼을 추가해 각 언어의 학습 상태를 요약
- 레슨 페이지 상단 카드에 레슨 수, 예상 소요 시간, 추천 순서, 진행률을 함께 표시하고 모든 레슨을 완료하면 다음 언어로 이동하는 버튼을 노출
- 진행 정보를 `localStorage`에 저장/로드하여 `/language` 페이지와 레슨 페이지에서 공유 링크를 생성할 때 최신 인덱스를 사용

### 변경 이유
- 여러 언어를 오가며 학습할 때 어디까지 진행했는지 한눈에 파악하고, 자연스럽게 다음 언어로 이어지도록 하기 위해

### 수정된 파일
- app/language/page.tsx
- app/language/[languageId]/page.tsx
- app/components/LessonPlayer.tsx
- app/lib/progress.ts
- docs/codebase-overview-ko.md
- docs/dev-log-ko.md

### 확인 방법
- `/language` 페이지에서 각 언어 카드에 progress bar와 버튼이 나타나는지 확인
- `/language/html?lesson=10`처럼 완료 상태가 되면 다음 언어 CTA와 공유 링크 복사가 정상 작동하는지 확인

### 변경 이유
- 여러 언어 레슨 데이터를 미리 구축해 둔 만큼, 선택 화면에서도 동일하게 접근 가능하도록 하기 위해

### 수정된 파일
- app/data/languages.ts
- docs/dev-log-ko.md

### 확인 방법
- `/language/css`, `/language/javascript`, `/language/python`, `/language/swift` 경로가 모두 “준비 중”이 아닌 상태로 표시되고, HTML과 마찬가지로 LessonPlayer가 렌더링되는지 확인
- app/data/languages.ts
- app/data/lessons.ts
- app/language/[languageId]/page.tsx
- `/language/javascript` 경로로 이동해 LessonPlayer가 정상적으로 렌더링되는지, 공유 버튼 눌렀을 때 URL이 클립보드에 복사되는지 확인
