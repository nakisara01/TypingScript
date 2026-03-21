"use client";

import Editor, { OnMount } from "@monaco-editor/react";
import type * as Monaco from "monaco-editor";
import { useCallback, useEffect, useMemo, useRef } from "react";

type TypingInputProps = {
  value: string;
  onChange: (value: string) => void;
  targetCode: string;
  disabled?: boolean;
  language?: string;
};

const languageMap: Record<string, string> = {
  html: "html",
  css: "css",
  javascript: "javascript",
  typescript: "typescript",
  python: "python",
  swift: "swift",
};

export default function TypingInput({
  value,
  onChange,
  targetCode,
  disabled = false,
  language,
}: TypingInputProps) {
  const resolvedLanguage = useMemo(() => {
    if (!language) {
      return "html";
    }
    return languageMap[language] ?? "plaintext";
  }, [language]);

  const editorRef = useRef<Monaco.editor.IStandaloneCodeEditor | null>(null);
  const monacoRef = useRef<typeof Monaco | null>(null);
  const inlineProviderRef = useRef<Monaco.IDisposable | null>(null);

  const registerInlineHints = useCallback(() => {
    if (!monacoRef.current) {
      return;
    }
    inlineProviderRef.current?.dispose();
    const monaco = monacoRef.current;

    inlineProviderRef.current = monaco.languages.registerInlineCompletionsProvider(
      resolvedLanguage,
      {
        provideInlineCompletions(model, position) {
          const offset = model.getOffsetAt(position);
          const currentValue = model.getValue().slice(0, offset);
          const expectedValue = targetCode.slice(0, offset);
          if (currentValue !== expectedValue) {
            return { items: [], dispose() {} };
          }
          const remainder = targetCode.slice(offset);
          if (!remainder) {
            return { items: [], dispose() {} };
          }
          const range = new monaco.Range(
            position.lineNumber,
            position.column,
            position.lineNumber,
            position.column,
          );
          return {
            items: [
              {
                insertText: remainder,
                range,
              },
            ],
            dispose() {},
          };
        },
        freeInlineCompletions(completions) {
          completions.dispose();
        },
        disposeInlineCompletions() {},
      },
    );
  }, [resolvedLanguage, targetCode]);

  const handleChange = useCallback(
    (nextValue?: string) => {
      const limitedValue = (nextValue ?? "").slice(0, targetCode.length);
      onChange(limitedValue);
    },
    [onChange, targetCode],
  );

  useEffect(
    () => () => {
      inlineProviderRef.current?.dispose();
    },
    [],
  );

  useEffect(() => {
    registerInlineHints();
  }, [registerInlineHints]);

  const handleMount: OnMount = (editorInstance, monacoInstance) => {
    editorRef.current = editorInstance;
    monacoRef.current = monacoInstance;
    registerInlineHints();
  };

  return (
    <div className="glass-soft border border-zinc-200 bg-white p-1">
      <Editor
        value={value}
        language={resolvedLanguage}
        theme="vs-dark"
        onChange={handleChange}
        onMount={handleMount}
        height="34rem"
        options={{
          readOnly: disabled,
          minimap: { enabled: false },
          fontSize: 16,
          fontFamily:
            "'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
          smoothScrolling: true,
          scrollBeyondLastLine: false,
          wordWrap: "on",
          automaticLayout: true,
          renderLineHighlight: "line",
          renderWhitespace: "selection",
          inlineSuggest: { enabled: true },
          quickSuggestions: true,
          tabSize: 2,
        }}
      />
    </div>
  );
}
