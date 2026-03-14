import { KeyboardEvent, ReactNode, useMemo, useRef } from "react";

type HighlightType = "text" | "tag" | "string";

const computeHighlightMap = (input: string): HighlightType[] => {
  const map: HighlightType[] = Array.from({ length: input.length }, () => "text");
  let inTag = false;
  let stringQuote: string | null = null;

  for (let index = 0; index < input.length; index += 1) {
    const char = input[index];

    if (inTag) {
      if (stringQuote) {
        map[index] = "string";
        if (char === stringQuote) {
          stringQuote = null;
        }
        continue;
      }

      map[index] = "tag";

      if (char === "\"" || char === "'") {
        map[index] = "string";
        stringQuote = char;
        continue;
      }

      if (char === ">") {
        inTag = false;
      }
      continue;
    }

    if (char === "<") {
      map[index] = "tag";
      inTag = true;
      continue;
    }
  }

  return map;
};

const getTokenClass = (type: HighlightType, variant: "typed" | "hint") => {
  if (variant === "hint") {
    return "text-zinc-500";
  }

  const colors: Record<HighlightType, string> = {
    tag: "text-sky-300",
    string: "text-amber-200",
    text: "text-zinc-100",
  };

  return colors[type];
};

type TypingInputProps = {
  value: string;
  onChange: (value: string) => void;
  targetCode: string;
  disabled?: boolean;
};

export default function TypingInput({
  value,
  onChange,
  targetCode,
  disabled = false,
}: TypingInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const lineNumbers = useMemo(() => {
    const lines = targetCode.split("\n").length;
    return Array.from({ length: lines }, (_, index) => index + 1);
  }, [targetCode]);

  const characters = useMemo(() => targetCode.split(""), [targetCode]);
  const highlightMap = useMemo(
    () => computeHighlightMap(targetCode),
    [targetCode],
  );
  const typedCharacters = value.split("");
  const caretIndex = typedCharacters.length;

  const applyValueChange = (nextValue: string) => {
    const container = containerRef.current;
    const scrollTop = container?.scrollTop ?? 0;
    const limitedValue = nextValue.slice(0, targetCode.length);
    onChange(limitedValue);
    requestAnimationFrame(() => {
      if (container) {
        container.scrollTop = scrollTop;
      }
    });
  };

  const handleValueChange = (nextValue: string) => {
    applyValueChange(nextValue);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Tab") {
      event.preventDefault();
      const target = textareaRef.current;
      if (!target) return;
      const { selectionStart, selectionEnd } = target;
      const insert = "  ";
      const updatedValue =
        value.slice(0, selectionStart) + insert + value.slice(selectionEnd);
      applyValueChange(updatedValue);
      requestAnimationFrame(() => {
        target.selectionStart = selectionStart + insert.length;
        target.selectionEnd = selectionStart + insert.length;
      });
    }
  };

  const renderedSpans = useMemo(() => {
    const spans: ReactNode[] = [];

    for (let index = 0; index < characters.length; index += 1) {
      const targetChar = characters[index];

      if (index < typedCharacters.length) {
        const typedChar = typedCharacters[index];
        const isMatch = typedChar === targetChar;
        spans.push(
          <span
            key={`typed-${index}`}
            className={
              isMatch
                ? getTokenClass(highlightMap[index] ?? "text", "typed")
                : "text-red-500"
            }
          >
            {typedChar === "\n" ? "\n" : typedChar || " "}
          </span>,
        );
        continue;
      }

      if (index === caretIndex) {
        spans.push(
          <span key={`caret-${index}`} className="relative inline-block">
            <span className="absolute -left-0.5 top-0 bottom-0 w-px animate-pulse bg-indigo-400" />
            <span className={getTokenClass(highlightMap[index] ?? "text", "hint")}>
              {targetChar === "\n" ? "\n" : targetChar || " "}
            </span>
          </span>,
        );
        continue;
      }

      spans.push(
        <span
          key={`hint-${index}`}
          className={getTokenClass(highlightMap[index] ?? "text", "hint")}
        >
          {targetChar === "\n" ? "\n" : targetChar || " "}
        </span>,
      );
    }

    if (caretIndex >= characters.length) {
      spans.push(
        <span key="caret-end" className="relative inline-block">
          <span className="absolute -left-0.5 top-0 bottom-0 w-px bg-indigo-500" />
        </span>,
      );
    }

    return spans;
  }, [characters, caretIndex, typedCharacters, highlightMap]);

  return (
    <div className="glass-soft border border-zinc-200 bg-white p-0.5">
      <div
        ref={containerRef}
        className="relative h-80 w-full overflow-auto rounded-[1rem] bg-zinc-950"
        onClick={() => textareaRef.current?.focus()}
      >
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(event) => handleValueChange(event.target.value)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          spellCheck={false}
          className="absolute inset-0 z-10 h-full w-full resize-none bg-transparent font-mono text-base leading-relaxed text-transparent caret-transparent focus:outline-none"
          aria-label="코드를 입력하세요"
        />
        <div className="pointer-events-none relative flex h-full w-full gap-4 px-5 py-4 font-mono text-base leading-relaxed text-emerald-100">
          <pre className="select-none text-right text-sm text-zinc-400">
            {lineNumbers.map((number) => (
              <span key={number} className="block">
                {number}
              </span>
            ))}
          </pre>
          <pre className="flex-1 whitespace-pre-wrap break-words text-base text-emerald-100">
            <code>{renderedSpans}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}
