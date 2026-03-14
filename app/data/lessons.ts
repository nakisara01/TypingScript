import { Lesson } from "../types/lesson";

const htmlLessons: Lesson[] = [
  { id: "H01", title: "Welcome Heading", description: "제목과 문단으로 첫 화면을 구성합니다.", code: `<h1>Hello, web!</h1>
<p>You just typed your first lesson.</p>`, expectedResult: `<h1>Hello, web!</h1>
<p>You just typed your first lesson.</p>`, explanations: [{ id: "h01-title", label: "제목", text: "`<h1>` 태그는 가장 중요한 제목을 나타냅니다." }, { id: "h01-body", label: "본문", text: "`<p>`로 간단한 문장을 작성합니다." }] },
  { id: "H02", title: "Highlight Text", description: "문장 일부를 `<span>`으로 감싸 강조합니다.", code: `<p>Practice makes <span style="color:#ef4444;">perfect</span>.</p>`, expectedResult: `<p>Practice makes <span style="color:#ef4444;">perfect</span>.</p>`, explanations: [{ id: "h02-span", label: "span", text: "인라인 요소는 `<span>`으로 감쌉니다." }, { id: "h02-style", label: "색상", text: "`style` 속성으로 색상을 직접 지정합니다." }] },
  { id: "H03", title: "Mini Card", description: "테두리와 버튼이 있는 카드.", code: `<div style="padding:16px;border:1px solid #e4e4e7;border-radius:12px;">
  <h2>Daily Tip</h2>
  <a href="#" style="display:inline-block;padding:8px 16px;background:#2563eb;color:white;border-radius:8px;text-decoration:none;">Read</a>
</div>`, expectedResult: `<div style="padding:16px;border:1px solid #e4e4e7;border-radius:12px;">
  <h2>Daily Tip</h2>
  <a href="#" style="display:inline-block;padding:8px 16px;background:#2563eb;color:white;border-radius:8px;text-decoration:none;">Read</a>
</div>`, explanations: [{ id: "h03-card", label: "카드", text: "패딩과 테두리로 박스를 만듭니다." }, { id: "h03-cta", label: "버튼", text: "`<a>` 태그에 배경색과 둥근 모서리를 줍니다." }] },
  { id: "H04", title: "Simple List", description: "정렬되지 않은 목록을 작성합니다.", code: `<h3>Focus checklist</h3>
<ul>
  <li>Drink water</li>
  <li>Plan sprint</li>
  <li>Type the lesson</li>
</ul>`, expectedResult: `<h3>Focus checklist</h3>
<ul>
  <li>Drink water</li>
  <li>Plan sprint</li>
  <li>Type the lesson</li>
</ul>`, explanations: [{ id: "h04-ul", label: "ul", text: "`<ul>`은 불릿 목록을 만듭니다." }, { id: "h04-li", label: "li", text: "각 항목은 `<li>`로 감쌉니다." }] },
  { id: "H05", title: "Quote Block", description: "인용구와 출처를 표시합니다.", code: `<blockquote style="border-left:4px solid #38bdf8;padding:0 16px;color:#0f172a;">
  Practice is the shortcut to clarity.
</blockquote>
<cite>- typingScript</cite>`, expectedResult: `<blockquote style="border-left:4px solid #38bdf8;padding:0 16px;color:#0f172a;">
  Practice is the shortcut to clarity.
</blockquote>
<cite>- typingScript</cite>`, explanations: [{ id: "h05-blockquote", label: "blockquote", text: "긴 인용문은 `<blockquote>`로 구분합니다." }, { id: "h05-cite", label: "cite", text: "출처는 `<cite>`에 적습니다." }] },
  { id: "H06", title: "Profile Card", description: "이미지와 설명을 나란히 배치.", code: `<div style="display:flex;gap:16px;align-items:center;border:1px solid #e5e7eb;padding:16px;border-radius:16px;">
  <img src="https://placekitten.com/96/96" alt="avatar" style="width:96px;height:96px;border-radius:50%;object-fit:cover;">
  <div>
    <h3>Code Cat</h3>
    <p style="color:#475569;">타이핑으로 배우는 초보 개발자</p>
  </div>
</div>`, expectedResult: `고양이 이미지와 텍스트 카드가 보입니다.`, explanations: [{ id: "h06-flex", label: "flex", text: "`display:flex`로 가로 배치를 만듭니다." }, { id: "h06-img", label: "이미지", text: "원형 이미지는 `border-radius:50%`를 사용합니다." }] },
  { id: "H07", title: "Hero Banner", description: "큰 제목과 버튼을 가진 섹션.", code: `<section style="padding:40px;border-radius:20px;background:#eef2ff;text-align:center;">
  <h1>Build with Typing</h1>
  <p>배우고 싶은 코드를 직접 입력하며 익혀 보세요.</p>
  <button style="margin-top:12px;padding:10px 20px;border:none;border-radius:999px;background:#4f46e5;color:white;font-size:16px;">Start typing</button>
</section>`, expectedResult: `<section style="padding:40px;border-radius:20px;background:#eef2ff;text-align:center;">
  <h1>Build with Typing</h1>
  <p>배우고 싶은 코드를 직접 입력하며 익혀 보세요.</p>
  <button style="margin-top:12px;padding:10px 20px;border:none;border-radius:999px;background:#4f46e5;color:white;font-size:16px;">Start typing</button>
</section>`, explanations: [{ id: "h07-section", label: "section", text: "영역을 `<section>`으로 감쌉니다." }, { id: "h07-button", label: "CTA", text: "눈길을 끄는 버튼을 제공합니다." }] },
  { id: "H08", title: "Two Column Layout", description: "grid로 2열 카드 구성.", code: `<div style="display:grid;grid-template-columns:repeat(2,1fr);gap:16px;">
  <article style="border:1px solid #e2e8f0;padding:16px;border-radius:12px;">
    <h3>Column A</h3>
    <p>첫 번째 열입니다.</p>
  </article>
  <article style="border:1px solid #e2e8f0;padding:16px;border-radius:12px;">
    <h3>Column B</h3>
    <p>두 번째 열입니다.</p>
  </article>
</div>`, expectedResult: `<div style="display:grid;grid-template-columns:repeat(2,1fr);gap:16px;">
  <article style="border:1px solid #e2e8f0;padding:16px;border-radius:12px;">
    <h3>Column A</h3>
    <p>첫 번째 열입니다.</p>
  </article>
  <article style="border:1px solid #e2e8f0;padding:16px;border-radius:12px;">
    <h3>Column B</h3>
    <p>두 번째 열입니다.</p>
  </article>
</div>`, explanations: [{ id: "h08-grid", label: "grid", text: "`repeat(2,1fr)`로 두 열을 만듭니다." }, { id: "h08-article", label: "article", text: "각 콘텐츠는 독립된 `<article>`로 묶습니다." }] },
  { id: "H09", title: "Contact Form", description: "라벨과 입력 필드를 포함한 폼.", code: `<form style="display:flex;flex-direction:column;gap:12px;max-width:320px;">
  <label>Name
    <input type="text" placeholder="Your name" style="width:100%;padding:8px;border:1px solid #cbd5f5;border-radius:8px;" />
  </label>
  <label>Email
    <input type="email" placeholder="hello@example.com" style="width:100%;padding:8px;border:1px solid #cbd5f5;border-radius:8px;" />
  </label>
  <button style="padding:10px;border:none;border-radius:8px;background:#2563eb;color:white;">Send</button>
</form>`, expectedResult: `두 개의 입력과 버튼이 있는 폼이 나타납니다.`, explanations: [{ id: "h09-label", label: "label", text: "라벨과 입력을 한 덩어리로 묶어 접근성을 높입니다." }, { id: "h09-button", label: "버튼", text: "전송 버튼을 두드러지게 만듭니다." }] },
  { id: "H10", title: "Footer Strip", description: "푸터에 카피와 링크를 배치.", code: `<footer style="margin-top:24px;padding:16px;border-top:1px solid #e2e8f0;display:flex;justify-content:space-between;align-items:center;">
  <span>© 2026 typingScript</span>
  <nav style="display:flex;gap:12px;">
    <a href="#" style="color:#475569;">Docs</a>
    <a href="#" style="color:#475569;">Lessons</a>
  </nav>
</footer>`, expectedResult: `<footer style="margin-top:24px;padding:16px;border-top:1px solid #e2e8f0;display:flex;justify-content:space-between;align-items:center;">
  <span>© 2026 typingScript</span>
  <nav style="display:flex;gap:12px;">
    <a href="#" style="color:#475569;">Docs</a>
    <a href="#" style="color:#475569;">Lessons</a>
  </nav>
</footer>`, explanations: [{ id: "h10-footer", label: "footer", text: "하단 정보를 `<footer>`에 정리합니다." }, { id: "h10-nav", label: "nav", text: "링크 묶음을 `<nav>`로 감쌉니다." }] },
];

const cssLessons: Lesson[] = [
  { id: "C01", title: "Button Gradient", description: "그라디언트 버튼.", code: `<style>
.btn { padding: 12px 24px; border-radius: 999px; border: none; background: linear-gradient(135deg,#6366f1,#a855f7); color: white; font-weight: 600; }
</style>
<button class="btn">Gradient</button>`, expectedResult: `보라색 그라디언트 버튼이 렌더링됩니다.`, explanations: [{ id: "c01-grad", label: "gradient", text: "linear-gradient로 두 색을 섞습니다." }, { id: "c01-pill", label: "rounded", text: "999px radius로 모서리를 둥글게 합니다." }] },
  { id: "C02", title: "Soft Card", description: "그림자 카드.", code: `<style>
.card { padding:20px; border-radius:16px; background:#fff; box-shadow:0 10px 25px rgba(15,23,42,0.1); }
</style>
<div class="card">Glass inspired card</div>`, expectedResult: `흰색 그림자 카드가 보입니다.`, explanations: [{ id: "c02-shadow", label: "shadow", text: "box-shadow로 깊이를 제공합니다." }, { id: "c02-radius", label: "radius", text: "둥근 모서리는 부드러운 느낌을 줍니다." }] },
  { id: "C03", title: "Accent Badge", description: "태그 배지.", code: `<style>
.badge { display:inline-block; padding:6px 14px; border-radius:999px; background:#e0f2fe; color:#0369a1; font-weight:600; }
</style>
<span class="badge">New</span>`, expectedResult: `파란색 원형 배지가 보입니다.`, explanations: [{ id: "c03-pill", label: "pill", text: "999px radius로 태그를 둥글게 합니다." }, { id: "c03-color", label: "color", text: "배경과 글자색의 대비를 유지합니다." }] },
  { id: "C04", title: "Grid Showcase", description: "3열 카드.", code: `<style>
.grid { display:grid; grid-template-columns:repeat(3,1fr); gap:12px; }
.grid div { padding:16px; border-radius:12px; background:#f8fafc; }
</style>
<div class="grid">
  <div>Card A</div>
  <div>Card B</div>
  <div>Card C</div>
</div>`, expectedResult: `3개의 카드가 한 줄에 나열됩니다.`, explanations: [{ id: "c04-grid", label: "grid", text: "repeat(3,1fr)로 동일 너비 열을 만듭니다." }, { id: "c04-gap", label: "gap", text: "`gap` 속성으로 카드 간 간격을 설정합니다." }] },
  { id: "C05", title: "Hero Gradient", description: "그라디언트 배경 섹션.", code: `<style>
.hero { padding:40px; border-radius:24px; background:linear-gradient(135deg,#d8b4fe,#86efac); color:#0f172a; }
</style>
<section class="hero">
  <h2>Learn visually</h2>
  <p>색상 배경으로 눈길을 끕니다.</p>
</section>`, expectedResult: `보라-초록 그라디언트 섹션이 보입니다.`, explanations: [{ id: "c05-bg", label: "배경", text: "gradient로 영역을 강조합니다." }, { id: "c05-radius", label: "radius", text: "큰 radius는 현대적 느낌을 줍니다." }] },
  { id: "C06", title: "Navigation Hover", description: "호버 밑줄 애니메이션.", code: `<style>
.nav { display:flex; gap:16px; }
.nav a { position:relative; text-decoration:none; color:#475569; padding-bottom:4px; }
.nav a::after { content:""; position:absolute; left:0; bottom:0; width:100%; height:2px; background:#2563eb; transform:scaleX(0); transform-origin:left; transition:transform .2s ease; }
.nav a:hover::after { transform:scaleX(1); }
</style>
<nav class="nav">
  <a href="#">Home</a>
  <a href="#">Docs</a>
  <a href="#">Blog</a>
</nav>`, expectedResult: `링크에 마우스를 올리면 밑줄이 애니메이션으로 채워집니다.`, explanations: [{ id: "c06-after", label: "after", text: "의사 요소로 밑줄을 만듭니다." }, { id: "c06-transition", label: "transition", text: "scale 애니메이션으로 부드러운 효과를 줍니다." }] },
  { id: "C07", title: "Input Focus", description: "포커스 효과 입력.", code: `<style>
.input { width:100%; padding:12px; border:1px solid #cbd5f5; border-radius:10px; transition:border .2s, box-shadow .2s; }
.input:focus { outline:none; border-color:#6366f1; box-shadow:0 0 0 3px rgba(99,102,241,.2); }
</style>
<input class="input" placeholder="Focus me" />`, expectedResult: `입력 필드에 포커스하면 보라색 오라가 생깁니다.`, explanations: [{ id: "c07-border", label: "border", text: "기본 테두리를 은은하게 둡니다." }, { id: "c07-focus", label: "focus", text: "포커스 시 box-shadow로 강조합니다." }] },
  { id: "C08", title: "Avatar Stack", description: "원형 아바타 목록.", code: `<style>
.stack { display:flex; }
.stack img { width:48px; height:48px; border-radius:50%; border:2px solid white; margin-left:-12px; }
.stack img:first-child { margin-left:0; }
</style>
<div class="stack">
  <img src="https://placekitten.com/80/80" alt="A" />
  <img src="https://placekitten.com/81/80" alt="B" />
  <img src="https://placekitten.com/82/80" alt="C" />
</div>`, expectedResult: `겹쳐진 아바타 이미지가 표시됩니다.`, explanations: [{ id: "c08-overlap", label: "overlap", text: "음수 margin으로 아바타를 겹칩니다." }, { id: "c08-border", label: "border", text: "흰색 테두리로 겹치는 부분을 정리합니다." }] },
  { id: "C09", title: "Tag Row", description: "태그 여러 개를 한 줄에 배치.", code: `<style>
.tags { display:flex; gap:8px; flex-wrap:wrap; }
.tags span { padding:4px 10px; border-radius:999px; background:#f1f5f9; color:#475569; font-size:12px; }
</style>
<div class="tags">
  <span>HTML</span>
  <span>CSS</span>
  <span>JavaScript</span>
</div>`, expectedResult: `작은 태그들이 한 줄에 배치됩니다.`, explanations: [{ id: "c09-wrap", label: "wrap", text: "`flex-wrap`으로 태그가 줄바꿈될 수 있게 합니다." }, { id: "c09-style", label: "style", text: "둥근 배경으로 태그를 구분합니다." }] },
  { id: "C10", title: "Progress Bar", description: "width로 진행 바 구현.", code: `<style>
.bar { width:260px; height:8px; border-radius:999px; background:#e2e8f0; }
.bar span { display:block; height:100%; width:70%; border-radius:999px; background:#22c55e; }
</style>
<div class="bar"><span></span></div>`, expectedResult: `초록색 진행 바가 70%만큼 채워져 보입니다.`, explanations: [{ id: "c10-track", label: "track", text: "회색 배경으로 전체 영역을 표시합니다." }, { id: "c10-fill", label: "fill", text: "안쪽 span의 width로 진행률을 표현합니다." }] },
];

const javascriptLessons: Lesson[] = [
  { id: "J01", title: "DOM Text", description: "스크립트로 문구를 삽입.", code: `<div id="app"></div>
<script>
const target = document.getElementById('app');
target.style.padding = '12px';
target.style.background = '#dbeafe';
target.textContent = 'Hello from JavaScript';
</script>`, expectedResult: `하늘색 배경의 박스에 문구가 나타납니다.`, explanations: [{ id: "j01-dom", label: "DOM", text: "`getElementById`로 요소를 선택합니다." }, { id: "j01-text", label: "text", text: "`textContent`로 텍스트를 입력합니다." }] },
  { id: "J02", title: "Button Counter", description: "버튼을 클릭하면 숫자를 증가시킵니다.", code: `<button id="count">Clicks: 0</button>
<script>
let clicks = 0;
document.getElementById('count').addEventListener('click', () => {
  clicks += 1;
  document.getElementById('count').textContent = 'Clicks: ' + clicks;
});
</script>`, expectedResult: `버튼을 클릭할 때마다 숫자가 증가합니다.`, explanations: [{ id: "j02-event", label: "event", text: "`addEventListener`로 클릭을 감지합니다." }, { id: "j02-state", label: "state", text: "변수로 클릭 횟수를 저장합니다." }] },
  { id: "J03", title: "Live Time", description: "현재 시간을 표시합니다.", code: `<div id="clock" style="font-size:24px;"></div>
<script>
function tick() {
  document.getElementById('clock').textContent = new Date().toLocaleTimeString();
}
tick();
setInterval(tick, 1000);
</script>`, expectedResult: `초마다 갱신되는 디지털 시계가 표시됩니다.`, explanations: [{ id: "j03-date", label: "Date", text: "`Date` 객체로 현재 시간을 가져옵니다." }, { id: "j03-interval", label: "interval", text: "`setInterval`로 반복 업데이트합니다." }] },
  { id: "J04", title: "Toggle Theme", description: "버튼으로 배경색을 토글.", code: `<div id="panel" style="padding:16px;background:#fff;border:1px solid #e2e8f0;">
  <button id="toggle">Toggle theme</button>
</div>
<script>
const panel = document.getElementById('panel');
const btn = document.getElementById('toggle');
let dark = false;
btn.addEventListener('click', () => {
  dark = !dark;
  panel.style.background = dark ? '#0f172a' : '#fff';
  panel.style.color = dark ? '#fff' : '#0f172a';
});
</script>`, expectedResult: `버튼을 누르면 카드 배경/글자색이 바뀝니다.`, explanations: [{ id: "j04-boolean", label: "boolean", text: "불리언 값으로 상태를 전환합니다." }, { id: "j04-style", label: "style", text: "JS로 인라인 스타일을 조정합니다." }] },
  { id: "J05", title: "Render List", description: "배열 데이터를 목록으로 렌더링.", code: `<ul id="todos"></ul>
<script>
const tasks = ['Learn HTML', 'Practice CSS', 'Type JavaScript'];
const list = document.getElementById('todos');
list.innerHTML = tasks.map(task => '<li>' + task + '</li>').join('');
</script>`, expectedResult: `3개의 목록 항목이 동적으로 생성됩니다.`, explanations: [{ id: "j05-array", label: "Map", text: "배열을 map으로 순회합니다." }, { id: "j05-html", label: "innerHTML", text: "문자열을 HTML로 삽입합니다." }] },
  { id: "J06", title: "Input Mirror", description: "입력값을 실시간으로 표시.", code: `<input id="mirror" placeholder="Type here" />
<p id="preview"></p>
<script>
const input = document.getElementById('mirror');
const preview = document.getElementById('preview');
input.addEventListener('input', () => {
  preview.textContent = 'You typed: ' + input.value;
});
</script>`, expectedResult: `입력 필드에 타이핑하면 아래 문장이 동일하게 바뀝니다.`, explanations: [{ id: "j06-input", label: "input", text: "`input` 이벤트는 타이핑 중에도 발생합니다." }, { id: "j06-preview", label: "preview", text: "텍스트를 즉시 화면에 반영합니다." }] },
  { id: "J07", title: "Random Quote", description: "버튼을 눌러 랜덤 문구를 표시.", code: `<div id="quote" style="margin-bottom:12px;">Click for inspiration</div>
<button id="new-quote">New quote</button>
<script>
const quotes = ['Keep typing', 'Practice beats reading', 'Build vertical slices'];
document.getElementById('new-quote').addEventListener('click', () => {
  const pick = quotes[Math.floor(Math.random() * quotes.length)];
  document.getElementById('quote').textContent = pick;
});
</script>`, expectedResult: `버튼을 누를 때마다 다른 문구가 나타납니다.`, explanations: [{ id: "j07-random", label: "random", text: "Math.random으로 배열에서 항목을 고릅니다." }, { id: "j07-update", label: "update", text: "선택된 문장을 DOM에 반영합니다." }] },
  { id: "J08", title: "Progress Fill", description: "버튼 클릭 시 진행 바가 증가.", code: `<div style="width:200px;height:10px;border-radius:999px;background:#e2e8f0;">
  <div id="fill" style="height:100%;width:20%;border-radius:999px;background:#22c55e;"></div>
</div>
<button id="advance">Advance</button>
<script>
let percent = 20;
const fill = document.getElementById('fill');
document.getElementById('advance').addEventListener('click', () => {
  percent = Math.min(percent + 20, 100);
  fill.style.width = percent + '%';
});
</script>`, expectedResult: `버튼을 누르면 초록색 바가 조금씩 넓어집니다.`, explanations: [{ id: "j08-limit", label: "limit", text: "Math.min으로 100%를 넘지 않게 합니다." }, { id: "j08-style", label: "style", text: "width 조정으로 진행률을 표현합니다." }] },
  { id: "J09", title: "Tab Switcher", description: "버튼을 눌러 탭 콘텐츠를 전환.", code: `<div style="display:flex;gap:8px;margin-bottom:12px;">
  <button data-panel="one">Tab One</button>
  <button data-panel="two">Tab Two</button>
</div>
<div id="panel" style="padding:12px;border:1px solid #e2e8f0;border-radius:12px;">Tab One content</div>
<script>
document.querySelectorAll('[data-panel]').forEach(btn => {
  btn.addEventListener('click', () => {
    const target = btn.getAttribute('data-panel');
    document.getElementById('panel').textContent = target === 'one' ? 'Tab One content' : 'Tab Two content';
  });
});
</script>`, expectedResult: `각 버튼을 누르면 패널 텍스트가 해당 탭 내용으로 바뀝니다.`, explanations: [{ id: "j09-data", label: "data attribute", text: "`data-panel` 속성으로 탭을 구분합니다." }, { id: "j09-panel", label: "panel", text: "선택된 탭에 맞게 텍스트를 변경합니다." }] },
  { id: "J10", title: "JSON Render", description: "JSON 데이터를 포맷해서 보여 줍니다.", code: `<pre id="json" style="background:#0f172a;color:#a5f3fc;padding:16px;border-radius:12px;"></pre>
<script>
const data = { lesson: 'Typing', level: 1, complete: false };
document.getElementById('json').textContent = JSON.stringify(data, null, 2);
</script>`, expectedResult: `pre 요소 안에 들여쓰기 된 JSON이 표시됩니다.`, explanations: [{ id: "j10-json", label: "JSON", text: "`JSON.stringify`로 객체를 문자열화합니다." }, { id: "j10-pre", label: "pre", text: "`<pre>`는 공백을 유지하며 텍스트를 출력합니다." }] },
];

const pythonLessons: Lesson[] = [
  { id: "P01", title: "Print Greeting", description: "print 함수로 문자열 출력.", code: `print("Hello typingScript")`, expectedResult: `콘솔: Hello typingScript`, explanations: [{ id: "p01-print", label: "print", text: "콘솔에 텍스트를 출력합니다." }, { id: "p01-string", label: "문자열", text: "따옴표 안에 메시지를 작성합니다." }] },
  { id: "P02", title: "Variable Basics", description: "변수를 선언하고 사용.", code: `language = "Python"
print("Learning", language)`, expectedResult: `콘솔: Learning Python`, explanations: [{ id: "p02-var", label: "변수", text: "이름 = 값 형태로 변수를 선언합니다." }, { id: "p02-print", label: "출력", text: "print 함수는 쉼표로 값을 이어 붙입니다." }] },
  { id: "P03", title: "List Loop", description: "리스트 순회.", code: `tasks = ["HTML", "CSS", "JS"]
for task in tasks:
    print(task)`, expectedResult: `콘솔에 HTML, CSS, JS가 줄마다 출력됩니다.`, explanations: [{ id: "p03-list", label: "list", text: "대괄호로 리스트를 만듭니다." }, { id: "p03-loop", label: "for", text: "for-in 문으로 항목을 순회합니다." }] },
  { id: "P04", title: "Function Intro", description: "간단한 함수 정의.", code: `def greet(name):
    return f"Hello {name}!"

print(greet("typingScript"))`, expectedResult: `콘솔: Hello typingScript!`, explanations: [{ id: "p04-def", label: "def", text: "`def`로 함수를 정의합니다." }, { id: "p04-return", label: "return", text: "함수의 결과를 반환합니다." }] },
  { id: "P05", title: "Conditional", description: "if/else 분기.", code: `score = 85
if score >= 80:
    print("Pass")
else:
    print("Try again")`, expectedResult: `콘솔: Pass`, explanations: [{ id: "p05-if", label: "if", text: "조건이 참이면 들여쓴 블록이 실행됩니다." }, { id: "p05-else", label: "else", text: "조건이 거짓일 때 대체 블록을 실행합니다." }] },
  { id: "P06", title: "Dictionary", description: "키-값 구조 작성.", code: `profile = {"name": "Typist", "level": 2}
print(profile["name"])`, expectedResult: `콘솔: Typist`, explanations: [{ id: "p06-dict", label: "dict", text: "중괄호로 사전을 만듭니다." }, { id: "p06-access", label: "접근", text: "대괄호로 키를 통해 값을 읽습니다." }] },
  { id: "P07", title: "List Comprehension", description: "간단한 리스트 컴프리헨션.", code: `squares = [n * n for n in range(1, 4)]
print(squares)`, expectedResult: `콘솔: [1, 4, 9]`, explanations: [{ id: "p07-comp", label: "comprehension", text: "한 줄로 반복과 계산을 수행합니다." }, { id: "p07-range", label: "range", text: "range는 연속된 숫자를 생성합니다." }] },
  { id: "P08", title: "String Format", description: "f-string 사용.", code: `name = "typing"
lesson = 5
print(f"{name} lesson {lesson}")`, expectedResult: `콘솔: typing lesson 5`, explanations: [{ id: "p08-f", label: "f-string", text: "문자열 앞에 f를 붙여 변수 값을 삽입합니다." }, { id: "p08-vars", label: "변수", text: "중괄호 안에 변수 이름을 적습니다." }] },
  { id: "P09", title: "While Loop", description: "조건 반복.", code: `count = 3
while count > 0:
    print(count)
    count -= 1`, expectedResult: `콘솔: 3 2 1`, explanations: [{ id: "p09-while", label: "while", text: "조건이 참인 동안 반복합니다." }, { id: "p09-update", label: "update", text: "루프 안에서 변수 값을 변경해야 끝납니다." }] },
  { id: "P10", title: "Module Import", description: "표준 라이브러리 사용.", code: `import math
print(math.sqrt(16))`, expectedResult: `콘솔: 4.0`, explanations: [{ id: "p10-import", label: "import", text: "모듈을 불러와 기능을 사용할 수 있습니다." }, { id: "p10-math", label: "math", text: "`math.sqrt`는 제곱근을 반환합니다." }] },
];

const swiftLessons: Lesson[] = [
  { id: "S01", title: "Print", description: "print 함수로 문자열 출력.", code: `print("Hello typingScript")`, expectedResult: `콘솔: Hello typingScript`, explanations: [{ id: "s01-print", label: "print", text: "Swift에서도 print 함수로 콘솔에 출력합니다." }, { id: "s01-string", label: "문자열", text: "쌍따옴표로 문자열을 감쌉니다." }] },
  { id: "S02", title: "Let vs Var", description: "상수와 변수.", code: `let language = "Swift"
var level = 1
print(language, level)`, expectedResult: `콘솔: Swift 1`, explanations: [{ id: "s02-let", label: "let", text: "`let`은 변경 불가능한 상수를 선언합니다." }, { id: "s02-var", label: "var", text: "`var`는 나중에 값을 바꿀 수 있습니다." }] },
  { id: "S03", title: "String Interpolation", description: "\( ) 구문.", code: `let lesson = 3
print("Lesson \(lesson) in progress")`, expectedResult: `콘솔: Lesson 3 in progress`, explanations: [{ id: "s03-inter", label: "interpolation", text: "문자열 내부에 변수를 삽입합니다." }, { id: "s03-esc", label: "escape", text: "역슬래시와 괄호를 사용합니다." }] },
  { id: "S04", title: "Array Loop", description: "for-in 순회.", code: `let topics = ["HTML", "CSS", "JS"]
for topic in topics {
    print(topic)
}`, expectedResult: `콘솔에 세 가지 토픽이 줄마다 표시됩니다.`, explanations: [{ id: "s04-array", label: "배열", text: "대괄호로 배열을 선언합니다." }, { id: "s04-for", label: "for", text: "for-in 문으로 각 항목을 순회합니다." }] },
  { id: "S05", title: "Function", description: "함수 선언과 호출.", code: `func greet(name: String) -> String {
    return "Hello \(name)"
}
print(greet(name: "typing"))`, expectedResult: `콘솔: Hello typing`, explanations: [{ id: "s05-func", label: "func", text: "Swift 함수는 `func` 키워드로 정의합니다." }, { id: "s05-return", label: "return", text: "결과값을 반환합니다." }] },
  { id: "S06", title: "If Statement", description: "조건 분기.", code: `let score = 92
if score > 90 {
    print("Great job")
} else {
    print("Keep practicing")
}`, expectedResult: `콘솔: Great job`, explanations: [{ id: "s06-if", label: "if", text: "조건이 참일 때 블록이 실행됩니다." }, { id: "s06-else", label: "else", text: "그렇지 않을 때 대체 블록을 실행합니다." }] },
  { id: "S07", title: "Dictionary", description: "키-값 저장.", code: `var profile: [String: Any] = ["name": "Coder", "level": 2]
print(profile["name"] ?? "")`, expectedResult: `콘솔: Coder`, explanations: [{ id: "s07-dict", label: "Dictionary", text: "대괄호 안에 키 타입과 값 타입을 지정합니다." }, { id: "s07-nil", label: "nil", text: "값이 없을 수 있으므로 nil 병합 연산자를 사용합니다." }] },
  { id: "S08", title: "While Loop", description: "조건 반복.", code: `var countdown = 3
while countdown > 0 {
    print(countdown)
    countdown -= 1
}`, expectedResult: `콘솔: 3 2 1 순서 출력`, explanations: [{ id: "s08-while", label: "while", text: "조건이 참인 동안 반복합니다." }, { id: "s08-update", label: "update", text: "반복문 안에서 값을 줄여 종료시킵니다." }] },
  { id: "S09", title: "Struct Intro", description: "구조체 정의.", code: `struct Lesson {
    let title: String
    func start() {
        print("Starting \(title)")
    }
}
Lesson(title: "Typing").start()`, expectedResult: `콘솔: Starting Typing`, explanations: [{ id: "s09-struct", label: "struct", text: "Swift 구조체는 속성과 메서드를 가질 수 있습니다." }, { id: "s09-init", label: "인스턴스", text: "구조체 이름 뒤에 괄호를 사용해 생성합니다." }] },
  { id: "S10", title: "Enum Basics", description: "열거형을 정의하고 사용.", code: `enum LessonType {
    case html, css, js
}
let current: LessonType = .html
print(current)`, expectedResult: `콘솔: html`, explanations: [{ id: "s10-enum", label: "enum", text: "열거형은 고정된 선택지를 정의합니다." }, { id: "s10-case", label: "case", text: "점 표기법으로 값을 참조합니다." }] },
];

export const lessonSets: Record<string, Lesson[]> = {
  html: htmlLessons,
  css: cssLessons,
  javascript: javascriptLessons,
  python: pythonLessons,
  swift: swiftLessons,
};

export const lessons = htmlLessons;
export const starterLesson = htmlLessons[0];
